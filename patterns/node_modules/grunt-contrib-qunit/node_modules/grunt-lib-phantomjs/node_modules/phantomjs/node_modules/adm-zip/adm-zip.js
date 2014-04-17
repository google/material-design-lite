var fs = require("fs"),
    buffer = require("buffer"),
    pth = require("path");

fs.existsSync = fs.existsSync || pth.existsSync;

var ZipEntry = require("./zipEntry"),
    ZipFile =  require("./zipFile"),
    Utils = require("./util");

module.exports = function(/*String*/inPath) {
    var _zip = undefined,
        _filename = "";

    if (inPath && typeof inPath === "string") { // load zip file
        if (fs.existsSync(inPath)) {
            _filename = inPath;
            _zip = new ZipFile(fs.readFileSync(inPath));
        } else {
           throw Utils.Errors.INVALID_FILENAME;
        }
    } else if(inPath && Buffer.isBuffer(inPath)) { // load buffer
        _zip = new ZipFile(inPath);
    } else { // create new zip file
        _zip = new ZipFile();
    }

    function getEntry(/*Object*/entry) {
        if (entry && _zip) {
            var item;
            // If entry was given as a file name
            if (typeof entry === "string")
                item = _zip.getEntry(entry);
            // if entry was given as a ZipEntry object
            if (typeof entry === "object" && entry.entryName != undefined && entry.header != undefined)
                item =  _zip.getEntry(entry.entryName);

            if (item) {
                return item;
            }
        }
        return null;
    }

    //process.on('uncaughtException', function (err) {
    //    console.log('Caught exception: ' + err);
    //});

    return {
        /**
         * Extracts the given entry from the archive and returns the content as a Buffer object
         * @param entry ZipEntry object or String with the full path of the entry
         *
         * @return Buffer or Null in case of error
         */
        readFile : function(/*Object*/entry) {
            var item = getEntry(entry);
            return item && item.getData() || null;
        },
        /**
         * Asynchronous readFile
         * @param entry ZipEntry object or String with the full path of the entry
         * @param callback
         *
         * @return Buffer or Null in case of error
         */
        readFileAsync : function(/*Object*/entry, /*Function*/callback) {
            var item = getEntry(entry);
            if (item) {
                item.getDataAsync(callback);
            } else {
                callback(null,"getEntry failed for:" + entry)
            }
        },
        /**
         * Extracts the given entry from the archive and returns the content as plain text in the given encoding
         * @param entry ZipEntry object or String with the full path of the entry
         * @param encoding Optional. If no encoding is specified utf8 is used
         *
         * @return String
         */
        readAsText : function(/*Object*/entry, /*String - Optional*/encoding) {
            var item = getEntry(entry);
            if (item) {
                var data = item.getData();
                if (data && data.length) {
                    return data.toString(encoding || "utf8");
                }
            }
            return "";
        },
        /**
         * Asynchronous readAsText
         * @param entry ZipEntry object or String with the full path of the entry
         * @param callback
         * @param encoding Optional. If no encoding is specified utf8 is used
         *
         * @return String
         */
        readAsTextAsync : function(/*Object*/entry, /*Function*/callback, /*String - Optional*/encoding) {
            var item = getEntry(entry);
            if (item) {
                item.getDataAsync(function(data) {
                    if (data && data.length) {
                        callback(data.toString(encoding || "utf8"));
                    } else {
                        callback("");
                    }
                })
            } else {
                callback("");
            }
        },

        /**
         * Remove the entry from the file or the entry and all it's nested directories and files if the given entry is a directory
         *
         * @param entry
         */
        deleteFile : function(/*Object*/entry) { // @TODO: test deleteFile
            var item = getEntry(entry);
            if (item) {
                _zip.deleteEntry(item.entryName);
            }
        },

        /**
         * Adds a comment to the zip. The zip must be rewritten after adding the comment.
         *
         * @param comment
         */
        addZipComment : function(/*String*/comment) { // @TODO: test addZipComment
            _zip.comment = comment;
        },

        /**
         * Returns the zip comment
         *
         * @return String
         */
        getZipComment : function() {
            return _zip.comment || '';
        },

        /**
         * Adds a comment to a specified zipEntry. The zip must be rewritten after adding the comment
         * The comment cannot exceed 65535 characters in length
         *
         * @param entry
         * @param comment
         */
        addZipEntryComment : function(/*Object*/entry,/*String*/comment) {
            var item = getEntry(entry);
            if (item) {
                item.comment = comment;
            }
        },

        /**
         * Returns the comment of the specified entry
         *
         * @param entry
         * @return String
         */
        getZipEntryComment : function(/*Object*/entry) {
            var item = getEntry(entry);
            if (item) {
                return item.comment || '';
            }
            return ''
        },

        /**
         * Updates the content of an existing entry inside the archive. The zip must be rewritten after updating the content
         *
         * @param entry
         * @param content
         */
        updateFile : function(/*Object*/entry, /*Buffer*/content) {
            var item = getEntry(entry);
            if (item) {
                item.setData(content);
            }
        },

        /**
         * Adds a file from the disk to the archive
         *
         * @param localPath
         */
        addLocalFile : function(/*String*/localPath) {
             if (fs.existsSync(localPath)) {
                 var entry = new ZipEntry();
                 entry.entryName = localPath.split("\\").join("/"); //windows fix
                 var stats = fs.statSync(localPath);
                 entry.setData(fs.readFileSync(localPath));
                 entry.header.inAttr = stats.mode;
                 entry.header.attr = stats.mode;
                 entry.attr = stats.mode;
                 entry.header.time = stats.mtime;
                 _zip.setEntry(entry);
             } else {
                 throw Utils.Errors.FILE_NOT_FOUND.replace("%s", localPath);
             }
        },

        /**
         * Adds a local directory and all its nested files and directories to the archive
         *
         * @param localPath
         */
        addLocalFolder : function(/*String*/localPath) {
			localPath = localPath.split("\\").join("/"); //windows fix
            if (localPath.charAt(localPath.length - 1) != "/")
                localPath += "/";

            if (fs.existsSync(localPath)) {
                var items = Utils.findFiles(localPath);
                if (items.length) {
                    items.forEach(function(path) {
                        var entry = new ZipEntry();
						entry.entryName = path.split("\\").join("/").replace(localPath, ""); //windows fix
                        var stats = fs.statSync(path);
                        if (stats.isDirectory()) {
                            entry.setData("");
                            entry.header.inAttr = stats.mode;
                            entry.header.attr = stats.mode
                        } else {
                            entry.setData(fs.readFileSync(path));
                            entry.header.inAttr = stats.mode;
                            entry.header.attr = stats.mode
                        }
                        entry.attr = stats.mode;
                        entry.header.time = stats.mtime;
                        _zip.setEntry(entry);
                    });
                }
            } else {
                throw Utils.Errors.FILE_NOT_FOUND.replace("%s", localPath);
            }
        },

        /**
         * Allows you to create a entry (file or directory) in the zip file.
         * If you want to create a directory the entryName must end in / and a null buffer should be provided.
         * Comment and attributes are optional
         *
         * @param entryName
         * @param content
         * @param comment
         * @param attr
         */
        addFile : function(/*String*/entryName, /*Buffer*/content, /*String*/comment, /*Number*/attr) {
            var entry = new ZipEntry();
            entry.entryName = entryName;
            entry.comment = comment || "";
            entry.attr = attr || 0666;
            if (entry.isDirectory && content.length) {
                throw Utils.Errors.DIRECTORY_CONTENT_ERROR;
            }
            entry.setData(content);
            entry.header.time = new Date();
            _zip.setEntry(entry);
        },

        /**
         * Returns an array of ZipEntry objects representing the files and folders inside the archive
         *
         * @return Array
         */
        getEntries : function() {
            if (_zip) {
               return _zip.entries;
            } else {
                return [];
            }
        },

        /**
         * Returns a ZipEntry object representing the file or folder specified by ``name``.
         *
         * @param name
         * @return ZipEntry
         */
        getEntry : function(/*String*/name) {
            return getEntry(name);
        },

        /**
         * Extracts the given entry to the given targetPath
         * If the entry is a directory inside the archive, the entire directory and it's subdirectories will be extracted
         *
         * @param entry ZipEntry object or String with the full path of the entry
         * @param targetPath Target folder where to write the file
         * @param maintainEntryPath If maintainEntryPath is true and the entry is inside a folder, the entry folder
         *                          will be created in targetPath as well. Default is TRUE
         * @param overwrite If the file already exists at the target path, the file will be overwriten if this is true.
         *                  Default is FALSE
         *
         * @return Boolean
         */
        extractEntryTo : function(/*Object*/entry, /*String*/targetPath, /*Boolean*/maintainEntryPath, /*Boolean*/overwrite) {
            overwrite = overwrite || false;
            maintainEntryPath = typeof maintainEntryPath == "undefined" ? true : maintainEntryPath;

            var item = getEntry(entry);
            if (!item) {
                throw Utils.Errors.NO_ENTRY;
            }

            var target = pth.resolve(targetPath, maintainEntryPath ? item.entryName : pth.basename(item.entryName));

            if (item.isDirectory) {
                target = pth.resolve(target, "..");
                var children = _zip.getEntryChildren(item);
                children.forEach(function(child) {
                    if (child.isDirectory) return;
                    var content = child.getData();
                    if (!content) {
                        throw Utils.Errors.CANT_EXTRACT_FILE;
                    }
                    Utils.writeFileTo(pth.resolve(targetPath, maintainEntryPath ? child.entryName : child.entryName.substr(item.entryName.length)), content, overwrite);
                });
                return true;
            }

            var content = item.getData();
            if (!content) throw Utils.Errors.CANT_EXTRACT_FILE;

            if (fs.existsSync(targetPath) && !overwrite) {
                throw Utils.Errors.CANT_OVERRIDE;
            }
            Utils.writeFileTo(target, content, overwrite);

            return true;
        },

        /**
         * Extracts the entire archive to the given location
         *
         * @param targetPath Target location
         * @param overwrite If the file already exists at the target path, the file will be overwriten if this is true.
         *                  Default is FALSE
         */
        extractAllTo : function(/*String*/targetPath, /*Boolean*/overwrite) {
            overwrite = overwrite || false;
            if (!_zip) {
                throw Utils.Errors.NO_ZIP;
            }

            _zip.entries.forEach(function(entry) {
                if (entry.isDirectory) return;
                var content = entry.getData();
                if (!content) {
                    throw Utils.Errors.CANT_EXTRACT_FILE + "2";
                }
                Utils.writeFileTo(pth.resolve(targetPath, entry.entryName), content, overwrite);
            })
        },

        /**
         * Writes the newly created zip file to disk at the specified location or if a zip was opened and no ``targetFileName`` is provided, it will overwrite the opened zip
         *
         * @param targetFileName
         */
        writeZip : function(/*String*/targetFileName, /*Function*/callback) {
            if (arguments.length == 1) {
                if (typeof targetFileName == "function") {
                    callback = targetFileName;
                    targetFileName = "";
                }
            }

            if (!targetFileName && _filename) {
                targetFileName = _filename;
            }
            if (!targetFileName) return;

            var zipData = _zip.toBuffer();
            if (zipData) {
                Utils.writeFileTo(targetFileName, zipData, true);
            }
        },

        /**
         * Returns the content of the entire zip file as a Buffer object
         *
         * @return Buffer
         */
        toBuffer : function(/*Function*/callback) {
            this.valueOf = 2;
            if (typeof callback == "function") {
                _zip.toAsyncBuffer(callback);
                return null;
            }
            return _zip.toBuffer()
        }

        /*get lastError () {
            var x = function() { console.log("2", arguments); };
            x.prototype = 2
            return x; //
        } */
    }
};
