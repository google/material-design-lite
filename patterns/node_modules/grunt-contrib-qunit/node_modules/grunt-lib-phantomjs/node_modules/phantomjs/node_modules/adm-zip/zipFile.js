var ZipEntry = require("./zipEntry"),
    Headers = require("./headers");
    Utils = require("./util");

module.exports = function(/*Buffer*/buf) {
    var entryList = [],
        entryTable = {},
        _comment = '',
        endHeader = new Headers.MainHeader();

    if (buf) {
        readMainHeader();
    }

    function readEntries() {
        entryTable = {};
        entryList = new Array(endHeader.diskEntries);  // total number of entries
        var index = endHeader.offset;  // offset of first CEN header
        for(var i = 0; i < entryList.length; i++) {

            var tmp = index,
                entry = new ZipEntry();

            entry.header = buf.slice(tmp, tmp += Utils.Constants.CENHDR);
            entry.entryName = buf.toString('utf8', tmp, tmp += entry.header.fileNameLength);

            if (entry.header.extraLength)
                entry.extra = buf.slice(tmp, tmp += entry.header.extraLength);

            if (entry.header.commentLength)
                entry.comment = buf.toString('utf8', tmp, tmp + entry.header.commentLength);

            index += entry.header.entryHeaderSize;

            if (!entry.isDirectory) {
                // read data
                //entry.setCompressedData(buf.slice(entry.header.offset, entry.header.offset + Utils.Constants.LOCHDR + entry.header.compressedSize + entry.entryName.length));
                entry.setCompressedData(buf.slice(entry.header.offset, entry.header.offset + Utils.Constants.LOCHDR + entry.header.compressedSize + entry.entryName.length + buf.readUInt16LE(entry.header.offset + Utils.Constants.LOCEXT)));
            }

            entryList[i] = entry;
            entryTable[entry.entryName] = entry;
        }
    }

    function readMainHeader() {
        var i = buf.length - Utils.Constants.ENDHDR, // END header size
            n = Math.max(0, i - 0xFFFF), // 0xFFFF is the max zip file comment length
            endOffset = 0; // Start offset of the END header

        for (i; i >= n; i--) {
            if (buf[i] != 0x50) continue; // quick check that the byte is 'P'
            if (buf.readUInt32LE(i) == Utils.Constants.ENDSIG) { // "PK\005\006"
                endOffset = i;
                break;
            }
        }
        if (!endOffset)
            throw Utils.Errors.INVALID_FORMAT;

        endHeader.loadFromBinary(buf.slice(endOffset, endOffset + Utils.Constants.ENDHDR));
        if (endHeader.commentLength) {
            _comment = buf.toString('utf8', endOffset + Utils.Constants.ENDHDR);
        }
        readEntries();
    }

    return {
        /**
         * Returns an array of ZipEntry objects existent in the current opened archive
         * @return Array
         */
        get entries () {
            return entryList;
        },

        /**
         * Archive comment
         * @return {String}
         */
        get comment () { return _comment; },
        set comment(val) {
            endHeader.commentLength = val.length;
            _comment = val;
        },

        /**
         * Returns a reference to the entry with the given name or null if entry is inexistent
         *
         * @param entryName
         * @return ZipEntry
         */
        getEntry : function(/*String*/entryName) {
            return entryTable[entryName] || null;
        },

        /**
         * Adds the given entry to the entry list
         *
         * @param entry
         */
        setEntry : function(/*ZipEntry*/entry) {
            entryList.push(entry);
            entryTable[entry.entryName] = entry;
            endHeader.totalEntries = entryList.length;
        },

        /**
         * Removes the entry with the given name from the entry list.
         *
         * If the entry is a directory, then all nested files and directories will be removed
         * @param entryName
         */
        deleteEntry : function(/*String*/entryName) {
            var entry = entryTable[entryName];
            if (entry && entry.isDirectory) {
                var _self = this;
                this.getEntryChildren(entry).forEach(function(child) {
                    if (child.entryName != entryName) {
                        _self.deleteEntry(child.entryName)
                    }
                })
            }
            entryList.slice(entryList.indexOf(entry), 1);
            delete(entryTable[entryName]);
            endHeader.totalEntries = entryList.length;
        },

        /**
         *  Iterates and returns all nested files and directories of the given entry
         *
         * @param entry
         * @return Array
         */
        getEntryChildren : function(/*ZipEntry*/entry) {
            if (entry.isDirectory) {
                var list = [],
                    name = entry.entryName,
                    len = name.length;

                entryList.forEach(function(zipEntry) {
                    if (zipEntry.entryName.substr(0, len) == name) {
                        list.push(zipEntry);
                    }
                });
                return list;
            }
            return []
        },

        /**
         * Returns the zip file
         *
         * @return Buffer
         */
        toBuffer : function() {
            entryList.sort(function(a, b) {
                var nameA = a.entryName.toLowerCase( );
                var nameB = b.entryName.toLowerCase( );
                if (nameA < nameB) {return -1}
                if (nameA > nameB) {return 1}
                return 0;
            });

            var totalSize = 0,
                data = [],
                header = [],
                dindex = 0;

            endHeader.size = 0;
            endHeader.offset = 0;

            entryList.forEach(function(entry) {
                entry.header.offset = dindex;
                var compressedData = entry.getCompressedData();
                dindex += compressedData.length;
                data.push(compressedData);

                var headerData = entry.packHeader();
                header.push(headerData);
                endHeader.size += headerData.length;
                totalSize += compressedData.length + headerData.length;
            });

            totalSize += endHeader.mainHeaderSize;
            // point to end of data and begining of central directory first record
            endHeader.offset = dindex;

            dindex = 0;
            var outBuffer = new Buffer(totalSize);
            data.forEach(function(content) {
                content.copy(outBuffer, dindex); // write data
                dindex += content.length;
            });
            header.forEach(function(content) {
                content.copy(outBuffer, dindex); // write data
                dindex += content.length;
            });

            var mainHeader = endHeader.toBinary();
            if (_comment) {
                mainHeader.write(_comment, Utils.Constants.ENDHDR);
            }

            mainHeader.copy(outBuffer, dindex);

            return outBuffer
        },

        toAsyncBuffer : function(/*Function*/callback) {

        }
    }
};
