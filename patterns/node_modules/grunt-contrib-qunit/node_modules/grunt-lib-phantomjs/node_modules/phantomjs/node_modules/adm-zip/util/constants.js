module.exports = {
    /* The local file header */
    LOCHDR : 30, // LOC header size
    LOCSIG : 0x04034b50, // "PK\003\004"
    LOCVER : 4,	// version needed to extract
    LOCFLG : 6, // general purpose bit flag
    LOCHOW : 8, // compression method
    LOCTIM : 10, // modification time (2 bytes time, 2 bytes date)
    LOCCRC : 14, // uncompressed file crc-32 value
    LOCSIZ : 18, // compressed size
    LOCLEN : 22, // uncompressed size
    LOCNAM : 26, // filename length
    LOCEXT : 28, // extra field length

    /* The Data descriptor */
    EXTSIG : 0x08074b50, // "PK\007\008"
    EXTHDR : 16, // EXT header size
    EXTCRC : 4, // uncompressed file crc-32 value
    EXTSIZ : 8, // compressed size
    EXTLEN : 12, // uncompressed size

    /* The central directory file header */
    CENHDR : 46, // CEN header size
    CENSIG : 0x02014b50, // "PK\001\002"
    CENVEM : 4, // version made by
    CENVER : 6, // version needed to extract
    CENFLG : 8, // encrypt, decrypt flags
    CENHOW : 10, // compression method
    CENTIM : 12, // modification time (2 bytes time, 2 bytes date)
    CENCRC : 16, // uncompressed file crc-32 value
    CENSIZ : 20, // compressed size
    CENLEN : 24, // uncompressed size
    CENNAM : 28, // filename length
    CENEXT : 30, // extra field length
    CENCOM : 32, // file comment length
    CENDSK : 34, // volume number start
    CENATT : 36, // internal file attributes
    CENATX : 38, // external file attributes
    CENOFF : 42, // LOC header offset

    /* The entries in the end of central directory */
    ENDHDR : 22, // END header size
    ENDSIG : 0x06054b50, // "PK\005\006"
    ENDSUB : 8, // number of entries on this disk
    ENDTOT : 10, // total number of entries
    ENDSIZ : 12, // central directory size in bytes
    ENDOFF : 16, // offset of first CEN header
    ENDCOM : 20, // zip file comment length

    /* Compression methods */
    STORED : 0,
    DEFLATED : 8
};