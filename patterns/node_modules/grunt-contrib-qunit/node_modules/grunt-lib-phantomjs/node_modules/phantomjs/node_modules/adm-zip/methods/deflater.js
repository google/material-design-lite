function JSDeflater(/*inbuff*/inbuf) {

    var WSIZE = 0x8000,		// Sliding Window size
        WINDOW_SIZE = 0x10000,

         /* for deflate */
        MIN_MATCH = 0x03,
        MAX_MATCH = 0x102,
        LIT_BUFSIZE = 0x2000,
        MAX_DIST = 0x7EFA,
        MAX_BITS = 0x0F,
        MAX_BL_BITS = 0x07,
        L_CODES = 0x11E,
        D_CODES = 0x1E,
        BL_CODES = 0x13,
        REP_3_6 = 0x10,
        REPZ_3_10 = 0x11,
        REPZ_11_138 = 0x12,
        HEAP_SIZE = 2 * L_CODES + 1,
        H_SHIFT = parseInt((0x10 + MIN_MATCH - 1) / MIN_MATCH),

        /* variables */
        freeQueue,
        qHead, qTail,
        initFlag,
        outbuf = null,
        outcnt, outoff,
        complete,
        window,
        dBuf,
        lBuf,
        prev,
        biBuf,
        biValid,
        blockStart,
        zip_ins_h,
        hashHead,
        prevMatch,
        matchAvailable,
        matchLength,
        matchStart,
        prevLength,
        dataStart,
        eofile,
        lookahead,
        maxChainLength,
        maxLazyMatch,
        compression_level,
        goodMatch,
        dynLTree = [],
        dynDTree = [],
        staticLTree = [],
        staticDTree = [],
        blTree = [],
        lDesc,
        dDesc,
        blDesc,
        blCount,
        zip_heap,
        heapLen,
        heapMax,
        depth,
        lengthCode,
        distCode,
        baseLength,
        baseDist,
        flagBuf,
        lastLit,
        lastDist,
        lastFlags,
        flags,
        flagBit,
        optLen,
        staticLen,
        deflateData,
        deflatePos,

        elbits = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
        edbits = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
        eblbits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
        blorder = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];

    function deflateTreeDesc() {
        return {
            dyn_tree : null,	// the dynamic tree
            static_tree : null,	// corresponding static tree or NULL
            extra_bits : null,	// extra bits for each code or NULL
            extra_base : 0,	    // base index for extra_bits
            elems : 0,		    // max number of elements in the tree
            max_length : 0,	    // max bit length for the codes
            max_code : 0
        }
    }

    function deflateStart(level) {
        var i;
        compression_level = !level && 9 || level > 9 && 9 || level;
        initFlag = false;
        eofile = false;

        if(outbuf != null)
            return;

        freeQueue = qHead = qTail = null;
        outbuf = new Buffer(LIT_BUFSIZE);
        window = new Buffer(WINDOW_SIZE);

        dBuf = new Array(LIT_BUFSIZE);
        lBuf = new Array(inbuf.length + 0x64); // 0x64 extra buffer length
        prev = new Array(0x10000);

        for(i = 0; i < HEAP_SIZE; i++) dynLTree[i] = {fc:0, dl:0};
        for(i = 0; i < 2 * D_CODES + 1; i++) dynDTree[i] = {fc:0, dl:0};
        for(i = 0; i < L_CODES + 2; i++) staticLTree[i] = {fc:0, dl:0};
        for(i = 0; i < D_CODES; i++) staticDTree[i] = {fc:0, dl:0};
        for(i = 0; i < 2 * BL_CODES + 1; i++) blTree[i] = {fc:0, dl:0};

        lDesc = deflateTreeDesc();
        dDesc = deflateTreeDesc();
        blDesc = deflateTreeDesc();

        blCount = new Buffer(MAX_BITS + 1);
        zip_heap = new Array(2 * L_CODES + 1);
        depth = new Buffer(2 * L_CODES + 1);
        lengthCode = new Buffer(MAX_MATCH - MIN_MATCH + 1);
        distCode = new Buffer(0x200);
        baseLength = new Buffer(0x1D);
        baseDist = new Buffer(D_CODES);
        flagBuf = new Buffer(parseInt(LIT_BUFSIZE / 8));
    }

    function cleanup() {
        freeQueue = qHead = qTail = null;
        outbuf = null;
        window = null;
        dBuf = null;
        lBuf = null;
        prev = null;
        dynLTree = null;
        dynDTree = null;
        staticLTree = null;
        staticDTree = null;
        blTree = null;
        lDesc = null;
        dDesc = null;
        blDesc = null;
        blCount = null;
        zip_heap = null;
        depth = null;
        lengthCode = null;
        distCode = null;
        baseLength = null;
        baseDist = null;
        flagBuf = null;
    }

    function writeByte(c) {
        outbuf[outoff + outcnt++] = c;
        if(outoff + outcnt == LIT_BUFSIZE) {
            if(outcnt != 0) {
                var q, i;
                if (freeQueue != null) {
                    q = freeQueue;
                    freeQueue = freeQueue.next;
                } else {
                    q = {
                          "next" : null,
                          "len" : 0,
                          "ptr" : new Buffer(LIT_BUFSIZE),
                          "off" : 0
                       }
                }
                q.next = null;
                q.len = q.off = 0;

                if(qHead == null)
                    qHead = qTail = q;
                else
                    qTail = qTail.next = q;

                q.len = outcnt - outoff;
                for(i = 0; i < q.len; i++)
                    q.ptr[i] = outbuf[outoff + i];
                outcnt = outoff = 0;
            }
        }
    }

    function writeShort(w) {
        w &= 0xffff;
        if(outoff + outcnt < LIT_BUFSIZE - 2) {
            outbuf[outoff + outcnt++] = (w & 0xff);
            outbuf[outoff + outcnt++] = (w >>> 8);
        } else {
            writeByte(w & 0xff);
            writeByte(w >>> 8);
        }
        return true;
    }

    function insertString() {
        zip_ins_h = ((zip_ins_h << H_SHIFT) ^ (window[dataStart + MIN_MATCH - 1] & 0xff)) & 0x1FFF;
        hashHead = prev[WSIZE + zip_ins_h];
        prev[dataStart & 0x7FFF] = hashHead;
        prev[WSIZE + zip_ins_h] = dataStart;
    }

    function sendCode(c, tree) {
        sendBits(tree[c].fc, tree[c].dl);
    }

    function zip_D_CODE(dist) {
        return (dist < 256 ? distCode[dist]
            : distCode[256 + (dist>>7)]) & 0xff;
    }

    function smaller(tree, n, m) {
        return tree[n].fc < tree[m].fc ||
            (tree[n].fc == tree[m].fc && depth[n] <= depth[m]);
    }

    function readBuff(buff, offset, n) {
        var i, len = deflateData.length;
        for(i = 0; i < n && deflatePos < len; i++) {
            buff[offset + i] = deflateData[deflatePos++];
        }
        return i;
    }

    function lmInit() {
        var j;

        for(j = 0; j < 0x2000; j++) prev[WSIZE + j] = 0;

        goodMatch      = [0x0, 0x4, 0x4, 0x4, 0x4, 0x8, 0x8, 0x8, 0x20, 0x20][compression_level];
        maxLazyMatch   = [0x0, 0x4, 0x5, 0x6, 0x4, 0x10, 0x10, 0x20, 0x80, 0x102][compression_level];
        maxChainLength = [0x0, 0x4, 0x8, 0x20, 0x10, 0x20, 0x80, 0x100, 0x400, 0x1000][compression_level];

        dataStart = 0;
        blockStart = 0;

        lookahead = readBuff(window, 0, 2 * WSIZE);
        if(lookahead <= 0) {
            eofile = true;
            lookahead = 0;
            return;
        }
        eofile = false;

        while(lookahead < 0x106 && !eofile)
            fillWindow();

        zip_ins_h = 0;
        for(j = 0; j < MIN_MATCH - 1; j++) {
            zip_ins_h = ((zip_ins_h << H_SHIFT) ^ (window[j] & 0xFF)) & 0x1FFF;
        }
    }

    function longestMatch(cur_match) {
        var chain_length = maxChainLength, // max hash chain length
            scanp = dataStart, // current string
            matchp,		// matched string
            len,		// length of current match
            best_len = prevLength,	// best match length so far
            limit = (dataStart > MAX_DIST ? dataStart - MAX_DIST : 0),
            strendp = dataStart + MAX_MATCH,
            scan_end1 = window[scanp + best_len - 1],
            scan_end  = window[scanp + best_len];

        prevLength >= goodMatch && (chain_length >>= 2);
        do {
            matchp = cur_match;
            if(window[matchp + best_len] != scan_end  ||
                window[matchp + best_len - 1] != scan_end1 ||
                window[matchp] != window[scanp] ||
                window[++matchp] != window[scanp + 1]) {
                continue;
            }

            scanp += 2;
            matchp++;

            do {} while(window[++scanp] == window[++matchp] &&
                        window[++scanp] == window[++matchp] &&
                        window[++scanp] == window[++matchp] &&
                        window[++scanp] == window[++matchp] &&
                        window[++scanp] == window[++matchp] &&
                        window[++scanp] == window[++matchp] &&
                        window[++scanp] == window[++matchp] &&
                        window[++scanp] == window[++matchp] &&
                        scanp < strendp);

            len = MAX_MATCH - (strendp - scanp);
            scanp = strendp - MAX_MATCH;

            if(len > best_len) {
                matchStart = cur_match;
                best_len = len;
                if(len >= MAX_MATCH) break;

                scan_end1  = window[scanp + best_len-1];
                scan_end   = window[scanp + best_len];
            }
        } while((cur_match = prev[cur_match & 0x7FFF]) > limit && --chain_length != 0);

        return best_len;
    }

    function fillWindow() {
        var n, m,
            more = WINDOW_SIZE - lookahead - dataStart;

        if(more == -1) {
            more--;
        } else if(dataStart >= WSIZE + MAX_DIST) {

            for(n = 0; n < WSIZE; n++)
                window[n] = window[n + WSIZE];

            matchStart -= WSIZE;
            dataStart  -= WSIZE;
            blockStart -= WSIZE;

            for(n = 0; n < 0x2000; n++) {
                m = prev[WSIZE + n];
                prev[WSIZE + n] = m >= WSIZE ? m - WSIZE : 0;
            }
            for(n = 0; n < WSIZE; n++) {
                m = prev[n];
                prev[n] = (m >= WSIZE ? m - WSIZE : 0);
            }
            more += WSIZE;
        }
        if(!eofile) {
            n = readBuff(window, dataStart + lookahead, more);
            n <= 0 && (eofile = true) || (lookahead += n);
        }
    }

    function deflateFast() {
        while(lookahead != 0 && qHead == null) {
            var flush; // set if current block must be flushed

            insertString();

            if(hashHead != 0 && dataStart - hashHead <= MAX_DIST) {
                matchLength = longestMatch(hashHead);
                matchLength > lookahead && (matchLength = lookahead);
            }
            if(matchLength >= MIN_MATCH) {
                flush = ctTally(dataStart - matchStart, matchLength - MIN_MATCH);
                lookahead -= matchLength;

                if(matchLength <= maxLazyMatch) {
                    matchLength--;
                    do {
                        dataStart++;
                        insertString();
                    } while(--matchLength != 0);
                    dataStart++;
                } else {
                    dataStart += matchLength;
                    matchLength = 0;
                    zip_ins_h = (((window[dataStart] & 0xFF) << H_SHIFT) ^ (window[dataStart + 1] & 0xFF)) & 0x1FFF;
                }
            } else {
                flush = ctTally(0, window[dataStart] & 0xFF);
                lookahead--;
                dataStart++;
            }
            if(flush) {
                flushBlock(0);
                blockStart = dataStart;
            }

            while(lookahead < 0x106 && !eofile)
                fillWindow();
        }
    }

    function deflateBetter() {
        while(lookahead != 0 && qHead == null) {
            insertString();
            prevLength = matchLength;
            prevMatch = matchStart;
            matchLength = MIN_MATCH - 1;

            if(hashHead != 0 && prevLength < maxLazyMatch && dataStart - hashHead <= MAX_DIST) {
                matchLength = longestMatch(hashHead);
                matchLength > lookahead && (matchLength = lookahead);
                (matchLength == MIN_MATCH && dataStart - matchStart > 0x1000) && matchLength--;
            }
            if(prevLength >= MIN_MATCH && matchLength <= prevLength) {
                var flush; // set if current block must be flushed
                flush = ctTally(dataStart - 1 - prevMatch, prevLength - MIN_MATCH);
                lookahead -= prevLength - 1;
                prevLength -= 2;
                do {
                    dataStart++;
                    insertString();
                } while(--prevLength != 0);
                 matchAvailable = 0;
                matchLength = MIN_MATCH - 1;
                dataStart++;
                if(flush) {
                    flushBlock(0);
                    blockStart = dataStart;
                }
            } else if( matchAvailable != 0) {
                if(ctTally(0, window[dataStart - 1] & 0xff)) {
                    flushBlock(0);
                    blockStart = dataStart;
                }
                dataStart++;
                lookahead--;
            } else {
                matchAvailable = 1;
                dataStart++;
                lookahead--;
            }

            while(lookahead < 0x106 && !eofile)
                fillWindow();
        }
    }

    function initDeflate() {
        if(eofile) return;

        biBuf = 0;
        biValid = 0;
        ctInit();
        lmInit();

        qHead = null;
        outcnt = 0;
        outoff = 0;

        if(compression_level <= 3) {
            prevLength = MIN_MATCH - 1;
            matchLength = 0;
        } else {
            matchLength = MIN_MATCH - 1;
            matchAvailable = 0;
        }

        complete = false;
    }

    function internalDeflate(buff, off, buff_size) {
        var n;
        if(!initFlag) {
            initDeflate();
            initFlag = true;
            if(lookahead == 0) { // empty
                complete = true;
                return 0;
            }
        }
        if((n = qCopy(buff, off, buff_size)) == buff_size) return buff_size;
        if(complete) return n;
        if(compression_level <= 3) // optimized for speed
            deflateFast();
        else
            deflateBetter();
        if(lookahead == 0) {
            matchAvailable != 0 && ctTally(0, window[dataStart - 1] & 0xff);
            flushBlock(1);
            complete = true;
        }
        return n + qCopy(buff, n + off, buff_size - n);
    }

    function qCopy(buff, off, buff_size) {
        var n = 0, i, j;

        while(qHead != null && n < buff_size) {
            i = buff_size - n;
            i > qHead.len && (i = qHead.len);
            for(j = 0; j < i; j++) buff[off + n + j] = qHead.ptr[qHead.off + j];
            qHead.off += i;
            qHead.len -= i;
            n += i;
            if(qHead.len == 0) {
                var p;
                p = qHead;
                qHead = qHead.next;
                p.next = freeQueue;
                freeQueue = p;
            }
        }

        if(n == buff_size) return n;

        if(outoff < outcnt) {
            i = buff_size - n;
            if(i > outcnt - outoff)
                i = outcnt - outoff;
            for(j = 0; j < i; j++)
                buff[off + n + j] = outbuf[outoff + j];
            outoff += i;
            n += i;
            if(outcnt == outoff)
                outcnt = outoff = 0;
        }
        return n;
    }

    function ctInit() {
        var n,	    // iterates over tree elements
            bits,	// bit counter
            length,	// length value
            code,	// code value
            dist;	// distance index

        if(staticDTree[0].dl != 0) return; // ct_init already called

        lDesc.dyn_tree		= dynLTree;
        lDesc.static_tree	= staticLTree;
        lDesc.extra_bits	= elbits;
        lDesc.extra_base	= 0x101;
        lDesc.elems		    = L_CODES;
        lDesc.max_length	= MAX_BITS;
        lDesc.max_code		= 0;

        dDesc.dyn_tree		= dynDTree;
        dDesc.static_tree	= staticDTree;
        dDesc.extra_bits	= edbits;
        dDesc.extra_base	= 0;
        dDesc.elems		    = D_CODES;
        dDesc.max_length	= MAX_BITS;
        dDesc.max_code		= 0;

        blDesc.dyn_tree 	= blTree;
        blDesc.static_tree	= null;
        blDesc.extra_bits	= eblbits;
        blDesc.extra_base	= 0;
        blDesc.elems		= BL_CODES;
        blDesc.max_length	= MAX_BL_BITS;
        blDesc.max_code 	= 0;

        // Initialize the mapping length (0..255) -> length code (0..28)
        length = 0;
        for(code = 0; code < 0x1E; code++) {
            baseLength[code] = length;
            for(n = 0; n < (1 << elbits[code]); n++)
                lengthCode[length++] = code;
        }
        lengthCode[length - 1] = code;
        dist = 0;
        for(code = 0 ; code < 16; code++) {
            baseDist[code] = dist;
            for(n = 0; n < (1 << edbits[code]); n++)
                distCode[dist++] = code;
        }
        dist >>= 7; // from now on, all distances are divided by 128
        for( ; code < D_CODES; code++) {
            baseDist[code] = dist << 7;
            for(n = 0; n < (1<<(edbits[code]-7)); n++)
                distCode[256 + dist++] = code;
        }
        for(bits = 0; bits <= MAX_BITS; bits++) blCount[bits] = 0;

        n = 0;
        while(n <= 143) { staticLTree[n++].dl = 8; blCount[8]++; }
        while(n <= 255) { staticLTree[n++].dl = 9; blCount[9]++; }
        while(n <= 279) { staticLTree[n++].dl = 7; blCount[7]++; }
        while(n <= 287) { staticLTree[n++].dl = 8; blCount[8]++; }

        genCodes(staticLTree, L_CODES + 1);

        for(n = 0; n < D_CODES; n++) {
            staticDTree[n].dl = 5;
            staticDTree[n].fc = reverse(n, 5);
        }
        initBlock();
    }

    function initBlock() {
        var n;

        for(n = 0; n < L_CODES;  n++) dynLTree[n].fc = 0;
        for(n = 0; n < D_CODES;  n++) dynDTree[n].fc = 0;
        for(n = 0; n < BL_CODES; n++) blTree[n].fc = 0;

        dynLTree[0x100].fc = flagBit = 1; // end block
        flags = optLen = staticLen = lastLit = lastDist = lastFlags = 0;
    }

    function pqDownHeap(tree, k) {
        var v = zip_heap[k],
            j = k << 1;

        while(j <= heapLen) {
            (j < heapLen && smaller(tree, zip_heap[j + 1], zip_heap[j])) && j++;
            if(smaller(tree, v, zip_heap[j])) break;
            zip_heap[k] = zip_heap[j];
            k = j;
            j <<= 1;
        }
        zip_heap[k] = v;
    }


    function genBitLen(desc) {
        var tree		= desc.dyn_tree,
            extra		= desc.extra_bits,
            base		= desc.extra_base,
            max_code	= desc.max_code,
            max_length	= desc.max_length,
            stree		= desc.static_tree,
            h,		    // heap index
            n, m,		// iterate over the tree elements
            bits,		// bit length
            xbits,		// extra bits
            f,		    // frequency
            overflow = 0;	// number of elements with bit length too large

        for(bits = 0; bits <= MAX_BITS; bits++)
            blCount[bits] = 0;

        tree[zip_heap[heapMax]].dl = 0; // root of the heap

        for(h = heapMax + 1; h < HEAP_SIZE; h++) {
            n = zip_heap[h];
            bits = tree[tree[n].dl].dl + 1;
            if(bits > max_length) {
                bits = max_length;
                overflow++;
            }
            tree[n].dl = bits;

            if(n > max_code) continue; // not a leaf node

            blCount[bits]++;
            xbits = 0;
            n >= base && (xbits = extra[n - base]);
            f = tree[n].fc;
            optLen += f * (bits + xbits);
            stree != null && (staticLen += f * (stree[n].dl + xbits));
        }
        if (!overflow) return;
        do {
            bits = max_length - 1;
            while(blCount[bits] == 0) bits--;
            blCount[bits]--;		// move one leaf down the tree
            blCount[bits + 1] += 2;	// move one overflow item as its brother
            blCount[max_length]--;
            overflow -= 2;
        } while(overflow > 0);

        for(bits = max_length; bits != 0; bits--) {
            n = blCount[bits];
            while(n != 0) {
                m = zip_heap[--h];
                if(m > max_code) continue;
                if(tree[m].dl != bits) {
                    optLen += (bits - tree[m].dl) * tree[m].fc;
                    tree[m].fc = bits;
                }
                n--;
            }
        }
    }

    function genCodes(tree, max_code) {
        var next_code = new Array(MAX_BITS + 1), // next code value for each bit length
            code = 0,		// running code value
            bits,			// bit index
            n;			    // code index

        for(bits = 1; bits <= MAX_BITS; bits++) {
            code = ((code + blCount[bits-1]) << 1);
            next_code[bits] = code;
        }

        for(n = 0; n <= max_code; n++) {
            var len = tree[n].dl;
            if (len == 0)
                continue;
            tree[n].fc = reverse(next_code[len]++, len);
        }
    }

    function buildTree(desc) { // the tree descriptor
        var tree	= desc.dyn_tree,
            stree	= desc.static_tree,
            elems	= desc.elems,
            n, m,		    // iterate over heap elements
            max_code = -1,	// largest code with non zero frequency
            node = elems;	// next internal node of the tree
        heapLen = 0;
        heapMax = HEAP_SIZE;

        for(n = 0; n < elems; n++) {
            if(tree[n].fc != 0) {
                zip_heap[++heapLen] = max_code = n;
                depth[n] = 0;
            } else
                tree[n].dl = 0;
        }

        while(heapLen < 2) {
            var xnew = zip_heap[++heapLen] = (max_code < 2 ? ++max_code : 0);
            tree[xnew].fc = 1;
            depth[xnew] = 0;
            optLen--;
            stree != null && (staticLen -= stree[xnew].dl);
        }
        desc.max_code = max_code;

        for(n = heapLen >> 1; n >= 1; n--) pqDownHeap(tree, n);

        do {
            n = zip_heap[1];
            zip_heap[1] = zip_heap[heapLen--];
            pqDownHeap(tree, 1);

            m = zip_heap[1];  // m = node of next least frequency

            // keep the nodes sorted by frequency
            zip_heap[--heapMax] = n;
            zip_heap[--heapMax] = m;

            // Create a new node father of n and m
            tree[node].fc = tree[n].fc + tree[m].fc;

            if(depth[n] > depth[m] + 1)
                depth[node] = depth[n];
            else
                depth[node] = depth[m] + 1;

            tree[n].dl = tree[m].dl = node;

            // and insert the new node in the heap
            zip_heap[1] = node++;
            pqDownHeap(tree, 1);

        } while(heapLen >= 2);

        zip_heap[--heapMax] = zip_heap[1];

        genBitLen(desc);
        genCodes(tree, max_code);
    }

    function scanTree(tree, max_code) {
        var n,			            // iterates over all tree elements
            prevlen = -1,		    // last emitted length
            curlen,			        // length of current code
            nextlen = tree[0].dl,	// length of next code
            count = 0,		        // repeat count of the current code
            max_count = 7,		    // max repeat count
            min_count = 4;		    // min repeat count

        if(nextlen == 0) {
            max_count = 138;
            min_count = 3;
        }
        tree[max_code + 1].dl = 0xffff; // guard

        for(n = 0; n <= max_code; n++) {
            curlen = nextlen;
            nextlen = tree[n + 1].dl;
            if(++count < max_count && curlen == nextlen)
                continue;
            else if(count < min_count)
                blTree[curlen].fc += count;
            else if(curlen != 0) {
                if(curlen != prevlen)
                    blTree[curlen].fc++;
                blTree[REP_3_6].fc++;
            } else if(count <= 10)
                blTree[REPZ_3_10].fc++;
            else
                blTree[REPZ_11_138].fc++;
            count = 0; prevlen = curlen;
            if(nextlen == 0) {
                max_count = 138;
                min_count = 3;
            } else if(curlen == nextlen) {
                max_count = 6;
                min_count = 3;
            } else {
                max_count = 7;
                min_count = 4;
            }
        }
    }

    function sendTree(tree, max_code) {
        var n,			            // iterates over all tree elements
            prevlen = -1,		    // last emitted length
            curlen,			        // length of current code
            nextlen = tree[0].dl,	// length of next code
            count = 0,		        // repeat count of the current code
            max_count = 7,		    // max repeat count
            min_count = 4;		    // min repeat count

        if(nextlen == 0) {
            max_count = 138;
            min_count = 3;
        }

        for(n = 0; n <= max_code; n++) {
            curlen = nextlen;
            nextlen = tree[n+1].dl;
            if(++count < max_count && curlen == nextlen) {
                continue;
            } else if(count < min_count) {
                do { sendCode(curlen, blTree); } while(--count != 0);
            } else if(curlen != 0) {
                if(curlen != prevlen) {
                    sendCode(curlen, blTree);
                    count--;
                }
                sendCode(REP_3_6, blTree);
                sendBits(count - 3, 2);
            } else if(count <= 10) {
                sendCode(REPZ_3_10, blTree);
                sendBits(count-3, 3);
            } else {
                sendCode(REPZ_11_138, blTree);
                sendBits(count-11, 7);
            }
            count = 0;
            prevlen = curlen;
            if(nextlen == 0) {
                max_count = 138;
                min_count = 3;
            } else if(curlen == nextlen) {
                max_count = 6;
                min_count = 3;
            } else {
                max_count = 7;
                min_count = 4;
            }
        }
    }

    function buildBLTree() {
        var max_blindex;  // index of last bit length code of non zero freq
        scanTree(dynLTree, lDesc.max_code);
        scanTree(dynDTree, dDesc.max_code);
        buildTree(blDesc);
        for(max_blindex = BL_CODES-1; max_blindex >= 3; max_blindex--) {
            if(blTree[blorder[max_blindex]].dl != 0) break;
        }
        /* Update opt_len to include the bit length tree and counts */
        optLen += 3 * (max_blindex + 1) + 0xE;

        return max_blindex;
    }

    function sendTrees(lcodes, dcodes, blcodes) {
        var rank; // index in bl_order
        sendBits(lcodes - 0x101, 5);
        sendBits(dcodes - 1, 5);
        sendBits(blcodes - 4, 4);
        for(rank = 0; rank < blcodes; rank++)
            sendBits(blTree[blorder[rank]].dl, 3);

        sendTree(dynLTree, lcodes - 1);
        sendTree(dynDTree, dcodes - 1);
    }

    function flushBlock(eof) { // true if this is the last block for a file
        var opt_lenb, static_lenb, // opt_len and static_len in bytes
            max_blindex,	// index of last bit length code of non zero freq
            stored_len = dataStart - blockStart;	// length of input block

        flagBuf[lastFlags] = flags; // Save the flags for the last 8 items

        buildTree(lDesc);
        buildTree(dDesc);

        max_blindex = buildBLTree();

        // Determine the best encoding. Compute first the block length in bytes
        opt_lenb = (optLen + 3 + 7) >> 3;
        static_lenb = (staticLen + 3 + 7) >> 3;

        static_lenb <= opt_lenb && (opt_lenb = static_lenb);

        if(stored_len + 4 <= opt_lenb && blockStart >= 0) {
            var i;
            sendBits(eof, 3);  /* send block type */
            biValid && writeShort(biBuf) && (biBuf = biValid = 0);	/* align on byte boundary */
            writeShort(stored_len);
            writeShort(~stored_len);
            for(i = 0; i < stored_len; i++) writeByte(window[blockStart + i]);

        } else if(static_lenb == opt_lenb) {
            sendBits(eof + 2, 3);
            compress(staticLTree, staticDTree);
        } else {
            sendBits(eof + 4, 3);
            sendTrees(lDesc.max_code + 1, dDesc.max_code + 1, max_blindex + 1);
            compress(dynLTree, dynDTree);
        }

        initBlock();

        (eof != 0) && (biValid && writeShort(biBuf) && (biBuf = biValid = 0));
    }

    function ctTally(dist, lc) {
        lBuf[lastLit++] = lc;
        if(dist == 0) {
            dynLTree[lc].fc++;
        } else {
            dist--;
            dynLTree[lengthCode[lc] + 0x101].fc++;
            dynDTree[zip_D_CODE(dist)].fc++;
            dBuf[lastDist++] = dist;
            flags |= flagBit;
        }
        flagBit <<= 1;
        if((lastLit & 7) == 0) {
            flagBuf[lastFlags++] = flags;
            flags = 0;
            flagBit = 1;
        }
        if(compression_level > 2 && (lastLit & 0xfff) == 0) {
            var out_length = lastLit * 8,
                in_length = dataStart - blockStart,
                dcode;

            for(dcode = 0; dcode < D_CODES; dcode++) {
                out_length += dynDTree[dcode].fc * (5 + edbits[dcode]);
            }
            out_length >>= 3;
            if(lastDist < parseInt(lastLit / 2) && out_length < parseInt(in_length / 2))
                return true;
        }
        return (lastLit == LIT_BUFSIZE - 1 || lastDist == LIT_BUFSIZE);
    }

    function compress(ltree, dtree) {
        var dist,		// distance of matched string
            lc,	    	// match length or unmatched char (if dist == 0)
            lx = 0,		// running index in l_buf
            dx = 0,		// running index in d_buf
            fx = 0,		// running index in flag_buf
            flag = 0,	// current flags
            code,		// the code to send
            extra;		// number of extra bits to send

        if (lastLit != 0) do {
            (lx & 7) == 0 && (flag = flagBuf[fx++]);
            lc = lBuf[lx++] & 0xff;
            if ((flag & 1) == 0) {
                sendCode(lc, ltree); /* send a literal byte */
            } else {
                code = lengthCode[lc];
                sendCode(code + 0x101, ltree); // send the length code
                extra = elbits[code];
                if(extra != 0) {
                    lc -= baseLength[code];
                    sendBits(lc, extra); // send the extra length bits
                }
                dist = dBuf[dx++];
                code = zip_D_CODE(dist);
                sendCode(code, dtree);	  // send the distance code
                extra = edbits[code];
                if(extra != 0) {
                    dist -= baseDist[code];
                    sendBits(dist, extra);   // send the extra distance bits
                }
            } // literal or match pair ?
            flag >>= 1;
        } while(lx < lastLit);

        sendCode(0x100, ltree); // end block
    }

    function sendBits(value, length) {
        if(biValid > 0x10 - length) {
            biBuf |= (value << biValid);
            writeShort(biBuf);
            biBuf = (value >> (0x10 - biValid));
            biValid += length - 0x10;
        } else {
            biBuf |= value << biValid;
            biValid += length;
        }
    }

    function reverse(code, len) {
        var res = 0;
        do {
            res |= code & 1;
            code >>= 1;
            res <<= 1;
        } while(--len > 0);
        return res >> 1;
    }

    function deflate(buffData, level) {
        deflateData = buffData;
        deflatePos = 0;
        deflateStart(level);

        var buff = new Array(1024),
            pages = [],
            totalSize = 0,
            i;

        for (i = 0; i < 1024; i++) buff[i] = 0;

        while((i = internalDeflate(buff, 0, buff.length)) > 0) {
            var buf = new Buffer(buff.slice(0, i));
            pages.push(buf);
            totalSize += buf.length;
        }
        var result = new Buffer(totalSize),
            index = 0;

        for (i = 0; i < pages.length; i++) {
            pages[i].copy(result, index);
            index = index + pages[i].length
        }

        return result;
    }

    return {
        deflate : function() {
            return deflate(inbuf, 8);
        }
    }
}

module.exports = function(/*Buffer*/inbuf) {

    var zlib = require("zlib");

    return {
        deflate : function() {
            return new JSDeflater(inbuf).deflate();
        },

        deflateAsync : function(/*Function*/callback) {
            var tmp = zlib.createDeflateRaw();
            tmp.on('data', function(data) {
                callback(data);
            });
            tmp.end(inbuf)
        }
    }
};
