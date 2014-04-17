var Utils = require("../util"),
    Constants = Utils.Constants;

/* The local file header */
module.exports = function () {
    var _version = 0x0A,
        _flags = 0,
        _method = 0,
        _time = 0,
        _crc = 0,
        _compressedSize = 0,
        _size = 0,
        _fnameLen = 0,
        _extraLen = 0;

    return {
        get version () { return _version; },
        set version (val) { _version = 0x0A },

        get flags () { return _flags },
        set flags (val) { _flags = val; },

        get method () { return _method; },
        set method (val) { _method = val; },

        get time () {
            return new Date(
                ((_time >> 25) & 0x7f) + 1980,
                ((_time >> 21) & 0x0f) - 1,
                (_time >> 16) & 0x1f,
                (_time >> 11) & 0x1f,
                (_time >> 5) & 0x3f,
                (_time & 0x1f) << 1
            );
        },
        set time (val) {
            val = new Date(val);
            _time = (val.getFullYear() - 1980 & 0x7f) << 25
                | (val.getMonth() + 1) << 21
                | val.getDay() << 16
                | val.getHours() << 11
                | val.getMinutes() << 5
                | val.getSeconds() >> 1;
        },

        get crc () { return _crc; },
        set crc (val) { _crc = val; },

        get compressedSize () { return _compressedSize; },
        set compressedSize (val) { _compressedSize = val; },

        get size () { return _size; },
        set size (val) { _size = val; },

        get fileNameLength () { return _fnameLen; },
        set fileNameLenght (val) { _fnameLen = val; },

        get extraLength () { return _extraLen },
        set extraLength (val) { _extraLen = val; },

        get encripted () { return (_flags & 1) == 1 },

        get fileHeaderSize () {
            return Constants.LOCHDR + _fnameLen + _extraLen;
        },

        loadFromBinary : function(/*Buffer*/data) {
            // 30 bytes and should start with "PK\003\004"
            if (data.length != Constants.LOCHDR || data.readUInt32LE(0) != Constants.LOCSIG) {
                throw Utils.Errors.INVALID_LOC;
            }
            // version needed to extract
            _version = data.readUInt16LE(Constants.LOCVER);
            // general purpose bit flag
            _flags = data.readUInt16LE(Constants.LOCFLG);
            // compression method
            _method = data.readUInt16LE(Constants.LOCHOW);
            // modification time (2 bytes time, 2 bytes date)
            _time = data.readUInt32LE(Constants.LOCTIM);
            // uncompressed file crc-32 value
            _crc = data.readUInt32LE(Constants.LOCCRC);
            // compressed size
            _compressedSize = data.readUInt32LE(Constants.LOCSIZ);
            // uncompressed size
            _size = data.readUInt32LE(Constants.LOCLEN);
            // filename length
            _fnameLen = data.readUInt16LE(Constants.LOCNAM);
            // extra field length
            _extraLen = data.readUInt16LE(Constants.LOCEXT);
        },

        toBinary : function() {
            // LOC header size (30 bytes)
            var data = new Buffer(Constants.LOCHDR);
            // "PK\003\004"
            data.writeUInt32LE(Constants.LOCSIG, 0);
            // version needed to extract
            data.writeUInt16LE(_version, Constants.LOCVER);
            // general purpose bit flag
            data.writeUInt16LE(_flags, Constants.LOCFLG);
            // compression method
            data.writeUInt16LE(_method, Constants.LOCHOW);
            // modification time (2 bytes time, 2 bytes date)
            data.writeUInt32LE(_time, Constants.LOCTIM);
            // uncompressed file crc-32 value
            data.writeUInt32LE(_crc, Constants.LOCCRC);
            // compressed size
            data.writeUInt32LE(_compressedSize, Constants.LOCSIZ);
            // uncompressed size
            data.writeUInt32LE(_size, Constants.LOCLEN);
            // filename length
            data.writeUInt16LE(_fnameLen, Constants.LOCNAM);
            // extra field length
            data.writeUInt16LE(_extraLen, Constants.LOCEXT);
            return data;
        },

        toString : function() {
            return '{\n' +
                '\t"version" : ' + _version + ",\n" +
                '\t"flags" : ' + _flags + ",\n" +
                '\t"method" : ' + Utils.methodToString(_method) + ",\n" +
                '\t"time" : ' + _time + ",\n" +
                '\t"crc" : 0x' + _crc.toString(16).toUpperCase() + ",\n" +
                '\t"compressedSize" : ' + _compressedSize + " bytes,\n" +
                '\t"size" : ' + _size + " bytes,\n" +
                '\t"fnameLen" : ' + _fnameLen + ",\n" +
                '\t"extraLen" : ' + _extraLen + " bytes,\n" +
                '\t"fileHeaderSize" : ' + (Constants.LOCHDR + _fnameLen + _extraLen) + " bytes\n" +
                '}';
        }
    }
};