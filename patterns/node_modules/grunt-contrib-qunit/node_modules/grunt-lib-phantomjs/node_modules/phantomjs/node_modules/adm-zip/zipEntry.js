var Utils = require("./util"),
    Headers = require("./headers"),
    Methods = require("./methods");

module.exports = function () {

    var _entryHeader = new Headers.EntryHeader(),
        _dataHeader = new Headers.DataHeader(),

        _entryName = "",
        _isDirectory = false,
        _extra = null,
        _compressedData = null,
        _data = null,
        _comment = "",
        _needDeflate = false;

    function decompress(/*Boolean*/async, /*Function*/callback) {
       // if (_data == null)   {
        if (true) {
            if (_compressedData == null) {
                if (_isDirectory) {
                    if (async && callback) {
                        callback(new Buffer(), "directory"); //si added error.
                    }
                    return;
                }
                //throw 'Noting to decompress';
				callback(new Buffer(), "Nothing to decompress");//si added error.
            }
            switch (_dataHeader.method) {
                case Utils.Constants.STORED:
                    _data = new Buffer(_dataHeader.size);
                    _compressedData.copy(_data, 0, _dataHeader.fileHeaderSize);
                    if (Utils.crc32(_data) != _dataHeader.crc) {
                        //throw Utils.Errors.BAD_CRC
						callback(_data, Utils.Errors.BAD_CRC);//si added error
						return Utils.Errors.BAD_CRC;
                    } else {//si added otherwise did not seem to return data.
						if (callback) callback(_data);
						return 'ok';
					}
                    break;
                case Utils.Constants.DEFLATED:
                    var inflater = new Methods.Inflater(_compressedData.slice(_dataHeader.fileHeaderSize));
                    if (!async) {
                        _data = new Buffer(_entryHeader.size);
                        _data.fill(0);
                        inflater.inflate(_data);
                        if (Utils.crc32(_data) != _dataHeader.crc) {
                            console.warn( Utils.Errors.BAD_CRC + " " + _entryName)
                        }
                    } else {
                        inflater.inflateAsync(function(data) {
                            _data = new Buffer(_entryHeader.size);
                            _data.fill(0);
                            data.copy(_data, 0);
                            if (Utils.crc32(_data) != _dataHeader.crc) {
                                //throw Utils.Errors.BAD_CRC
								callback(_data,Utils.Errors.BAD_CRC); //avoid throw it would bring down node.
								return Utils.Errors.BAD_CRC
                            } else {
								callback(_data);
								return 'ok';
							}
                        })
                    }
                    break;
                default:
                    // throw Utils.Errors.UNKNOWN_METHOD;
					callback(new Buffer(),Utils.Errors.BAD_CRC); //avoid throw it would bring down node.
					return Utils.Errors.UNKNOWN_METHOD;        
            }
        } else {
            if (async && callback) {
                callback(_data);
            }
        }
    }

    function compress(/*Boolean*/async, /*Function*/callback) {
        if ( _needDeflate) {
            _compressedData = null;
        }
        if (_compressedData == null) {
            if (_isDirectory || !_data) {
                _data = new Buffer(0);
                _compressedData = new Buffer(0);
                return;
            }
            // Local file header
            _dataHeader.version = 10;
            _dataHeader.flags = 0;
            _dataHeader.time = _entryHeader.time;
            _dataHeader.compressedSize = _data.length;
            _dataHeader.fileNameLength = _entryName.length;
            _dataHeader.method = 8;
            switch (_dataHeader.method) {
                case Utils.Constants.STORED:
                    _dataHeader.method = Utils.Constants.STORED;
                    _compressedData = new Buffer(Utils.Constants.LOCHDR + _entryName.length + _data.length);
                    _dataHeader.toBinary().copy(_compressedData);
                    _compressedData.write(_entryName, Utils.Constants.LOCHDR);
                    _data.copy(_compressedData, Utils.Constants.LOCHDR + _entryName.length);
                    break;
                default:
                case Utils.Constants.DEFLATED:
                    _dataHeader.method = Utils.Constants.DEFLATED;
                    _entryHeader.method = Utils.Constants.DEFLATED;

                    var deflater = new Methods.Deflater(_data);
                    if (!async) {
                        var deflated = deflater.deflate();
                        _compressedData = new Buffer(deflated.length + Utils.Constants.LOCHDR + _entryName.length);
                        _compressedData.fill(0);

                        _dataHeader.toBinary().copy(_compressedData);
                        _compressedData.write(_entryName, Utils.Constants.LOCHDR);
                        deflated.copy(_compressedData, Utils.Constants.LOCHDR + _entryName.length);

                        deflated = null;
                    } else {
                        deflater.deflateAsync(function(data) {
                            _compressedData = new Buffer(data.length + Utils.Constants.LOCHDR + _entryName.length);
                            _dataHeader.toBinary().copy(_compressedData);
                            _compressedData.write(_entryName, Utils.Constants.LOCHDR);
                            data.copy(_compressedData, Utils.Constants.LOCHDR + _entryName.length);
                            callback(_compressedData);
                        })
                    }
                    deflater = null;
                    break;
            }
            _needDeflate = false;
        } else {
            if (async && callback) {
                callback(_compressedData);
            }
        }
    }

    return {
        get entryName () { return _entryName; },
        set entryName (val) {
            _compressedData && (_needDeflate = true);
            _entryName = val;
            _isDirectory = val.charAt(_entryName.length - 1) == "/";
            _entryHeader.fileNameLength = val.length;
            _dataHeader.fileNameLenght = val.length;
        },

        get extra () { return _extra; },
        set extra (val) {
            _extra = val;
            _entryHeader.extraLength = val.length;
        },

        get comment () { return _comment; },
        set comment (val) {
            _comment = val;
            _entryHeader.commentLength = val.length;
        },

        get name () { return _entryName.split("/").pop(); },
        get isDirectory () { return _isDirectory },

        setCompressedData : function(value) {
            _compressedData = value;
            _dataHeader.loadFromBinary(_compressedData.slice(0, Utils.Constants.LOCHDR));
            _data = null;
            _needDeflate = false;
        },

        getCompressedData : function() {
            compress(false, null);
            return _compressedData
        },
        getCompressedDataAsync : function(/*Function*/callback) {
            compress(true, callback)
        },

        setData : function(value) {
            if (typeof value == "string") {
                value = new Buffer(value);
            }
            _needDeflate = true;
            _compressedData = null;
            _dataHeader.time = +new Date();
            _entryHeader.size = _dataHeader.size;

            if (value && value.length) {
                _dataHeader.compressedSize = value.length;
                _entryHeader.compressedSize = _dataHeader.compressedSize;
                _dataHeader.size = value.length;
                _entryHeader.size = value.length;
                _dataHeader.crc = Utils.crc32(value);
                _entryHeader.crc = _dataHeader.crc;
            }
            //_entryHeader.method = _dataHeader.method;

            _data = value;
        },

        getData : function() {
            decompress(false, null);
            return _data
        },

        getDataAsync : function(/*Function*/callback) {
            decompress(true, callback)
        },

        set header(/*Buffer*/data) {
            _entryHeader.loadFromBinary(data);
        },

        get header() {
            return _entryHeader;
        },

        packHeader : function() {
            var header = _entryHeader.toBinary();
            header.write(_entryName, Utils.Constants.CENHDR);
            if (_entryHeader.extraLength) {
                _extra.copy(header, Utils.Constants.CENHDR + _entryName.length)
            }
            if (_entryHeader.commentLength) {
                header.write(_comment, Utils.Constants.CENHDR + _entryName.length + _entryHeader.extraLength, _comment.length, 'utf8');
            }
            return header;
        },

        toString : function() {
            return '{\n' +
                '\t"entryName" : "' + _entryName + "\",\n" +
                '\t"name" : "' + _entryName.split("/").pop() + "\",\n" +
                '\t"comment" : "' + _comment + "\",\n" +
                '\t"isDirectory" : ' + _isDirectory + ",\n" +
                '\t"header" : ' + _entryHeader.toString().replace(/\t/mg, "\t\t") + ",\n" +
                '\t"compressedData" : <' + (_compressedData && _compressedData.length  + " bytes buffer" || "null") + ">\n" +
                '\t"data" : <' + (_data && _data.length  + " bytes buffer" || "null") + ">\n" +
                '}';
        }
    }
};