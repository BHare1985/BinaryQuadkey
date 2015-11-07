"use strict";
var Long = require("long");

(function(global, factory) {
    module["exports"] = factory();
})(this, function() {
    /**
    * Constructs a BinaryQuadkey object that internally uses an unsigned 64-bit integer 
    * representation of Quadkey of a map tile at the given coordinates
    *  See the from* functions below for more convenient ways of constructing BinaryQuadkey objects.
    * @exports BinaryQuadkey
    * @class Node.js library to create an object to represent map tile {@link https://msdn.microsoft.com/en-us/library/bb259689.aspx|Quadkeys} in a {@link https://github.com/joekarl/binary-quadkey|binary format} using 64-bit integers via {@link https://github.com/dcodeIO/long.js|long.js}
    * for the benefits of constant time comparsions, consistent byte-length storage, integer indexing, cache optimization, and potential space savings. Read more here: {@link https://github.com/joekarl/binary-quadkey|Binary quadkeys}
    * @param {number} [x=0] The X coordinate of the tile
    * @param {number} [y=0] The Y coordinate of the tile
    * @param {number} [zoom=0] The zoomlevel or level of detail of the tile (1-23)
    * @param {object} [uint64quadkey=Long.fromInt(0)] (Optional) {@link https://github.com/dcodeIO/long.js|long.js} Long object encapsulating an unsigned 64 bit integer representation of a binary Quadkey
    * @returns {!BinaryQuadkey} The corresponding BinaryQuadkey object    
    * @constructor
    * @property {number}  x The X coordinate of the tile
    * @property {number}  y The Y coordinate of the tile
    * @property {number}  zoom The zoomlevel or level of detail of the tile (1-23)
    * @property {object}  UInt64Quadkey {@link https://github.com/dcodeIO/long.js|long.js} Long object representing an unsigned 64 bit integer
    * @example var BinaryQuadkey = require("binaryquadkey");
    * var binaryQuadkey = new BinaryQuadkey(35210, 21493, 16);
    */
    function BinaryQuadkey(x, y, zoom, uint64quadkey) {
        this.x = x || 0;
        this.y = y || 0;
        this.zoom = zoom || 0;
        this.UInt64Quadkey = uint64quadkey || BinaryQuadkey.fromTileXY(this.x, this.y, this.zoom);
    }

    /**
    * Returns a BinaryQuadkey representation of the tile at the given coordinates
    * @param {number} x The X coordinate of the tile
    * @param {number} y The Y coordinate of the tile
    * @param {number} zoom The zoomlevel or level of detail of the tile (1-23)
    * @returns {!BinaryQuadkey} The corresponding BinaryQuadkey object
    * @example var BinaryQuadkey = require("binaryquadkey");
    * var binaryQuadkey = new BinaryQuadkey.fromTileXY(35210, 21493, 16);
    */
    BinaryQuadkey.fromTileXY = function fromTileXY(x, y, zoom) {
        var result = Long.UZERO;
        for (var i = zoom; i > 0; --i) {
            var mask = 1 << (i - 1);
            var bitLocation = (64 - ((zoom - i + 1) * 2) + 1);
            if ((x & mask) != 0) {
                result = result.or(Long.UONE.shiftLeft(bitLocation - 1))
            }
            if ((y & mask) != 0) {
                result = result.or(Long.UONE.shiftLeft(bitLocation))
            }
        }
        return result.or(zoom);
    };

    /**
    * Returns a BinaryQuadkey representing the Quadkey string
    * @param {string} quadKeyString The string that corresponds to the Quadkey
    * @returns {!BinaryQuadkey} The corresponding BinaryQuadkey object created from Quadkey string
    * @example var BinaryQuadkey = require("binaryquadkey");
    * var binaryQuadkey = new BinaryQuadkey.fromQuadkey("1202102332221212");
    */
    BinaryQuadkey.fromQuadkey = function fromQuadkey(quadKeyString) {
        var zoom = quadKeyString.length;
        var result = Long.UZERO;
        for (var i = 0; i < zoom; ++i) {
            var bitLocation = (64 - ((i + 1) * 2));
            var num = parseInt(quadKeyString.charAt(i), 10);
            result = result.or(Long.fromInt(num).shiftLeft(bitLocation))
        }
        return BinaryQuadkey.fromUInt64(result.or(zoom), zoom);
    };
    
    /**
    * Returns a BinaryQuadkey representation of a {@link https://github.com/dcodeIO/long.js|long.js} unsigned int64 Long object
    * @param {object} uint64quadkey {@link https://github.com/dcodeIO/long.js|long.js} Long object representing an unsigned 64 bit integer
    * @param {number=} zoom (Optional) The zoomlevel or level of detail of the tile (1-23)
    * @returns {!BinaryQuadkey} The corresponding BinaryQuadkey object
    * @example var BinaryQuadkey = require("binaryquadkey");
    * var binaryQuadkey1 = new BinaryQuadkey(35210, 21493, 16); 
    * var binaryQuadkey2 = new BinaryQuadkey.fromUInt64(binaryQuadkey1.UInt64Quadkey);
    * ...
    * var Long = require("long"); //requires you to install long.js
    * var uint64 = new Long.fromString("18446744073709289495");
    * var binaryQuadkey = new BinaryQuadkey.fromUInt64(uint64);
    */
    BinaryQuadkey.fromUInt64 = function fromUInt64(uint64quadkey, zoom) {
        var zoom = zoom || uint64quadkey.and(31).toInt();
        return new BinaryQuadkey(undefined, undefined, zoom, uint64quadkey);
    }

    /**
    * Returns a BinaryQuadkey representing the unsigned 64 bit integer that comes by concatenating the given low and high bits. Each is
    * assumed to use 32 bits.
    * @param {number} low The low (unsigned) 32 bits of the long
    * @param {number} high The high (unsigned) 32 bits of the long
    * @returns {!BinaryQuadkey} The corresponding BinaryQuadkey object created from the low and high bits
    * @example var BinaryQuadkey = require("binaryquadkey");
    * var binaryQuadkey1 = new BinaryQuadkey.fromBits(11, 618776576);
    * var binaryQuadkey2 = new BinaryQuadkey.fromBits(0xFFFFFFFF, 0x7FFFFFFF);
    */
    BinaryQuadkey.fromBits = function fromBits(low, high) {
       return BinaryQuadkey.fromUInt64(new Long(low, high, true));
    }
    
    /**
    * An indicator used to reliably determine if an object is a BinaryQuadkey or not.
    * @type {boolean}
    * @const
    * @private
    */
    BinaryQuadkey.__isBinaryQuadKey__;

    Object.defineProperty(BinaryQuadkey.prototype, "__isBinaryQuadKey__", {
        value: true,
        enumerable: false,
        configurable: false
    });

    /**
    * Tests if the specified object is a BinaryQuadkey.
    * @param {*} obj Object
    * @returns {boolean}
    */
    BinaryQuadkey.isBinaryQuadkey = function isBinaryQuadkey(obj) {
        return (obj && obj["__isBinaryQuadKey__"]) === true;
    };

    var PREFIX_MASKS = new Object();
    PREFIX_MASKS[0] =  new Long.fromBits( parseInt('00000000000000000000000000000000', 2), parseInt('00000000000000000000000000000000', 2), true);
    PREFIX_MASKS[1] =  new Long.fromBits( parseInt('00000000000000000000000000000000', 2), parseInt('11000000000000000000000000000000', 2), true);
    PREFIX_MASKS[2] =  new Long.fromBits( parseInt('00000000000000000000000000000000', 2), parseInt('11110000000000000000000000000000', 2), true);
    PREFIX_MASKS[3] =  new Long.fromBits( parseInt('00000000000000000000000000000000', 2), parseInt('11111100000000000000000000000000', 2), true);
    PREFIX_MASKS[4] =  new Long.fromBits( parseInt('00000000000000000000000000000000', 2), parseInt('11111111000000000000000000000000', 2), true);
    PREFIX_MASKS[5] =  new Long.fromBits( parseInt('00000000000000000000000000000000', 2), parseInt('11111111110000000000000000000000', 2), true);
    PREFIX_MASKS[6] =  new Long.fromBits( parseInt('00000000000000000000000000000000', 2), parseInt('11111111111100000000000000000000', 2), true);
    PREFIX_MASKS[7] =  new Long.fromBits( parseInt('00000000000000000000000000000000', 2), parseInt('11111111111111000000000000000000', 2), true);
    PREFIX_MASKS[8] =  new Long.fromBits( parseInt('00000000000000000000000000000000', 2), parseInt('11111111111111110000000000000000', 2), true);
    PREFIX_MASKS[9] =  new Long.fromBits( parseInt('00000000000000000000000000000000', 2), parseInt('11111111111111111100000000000000', 2), true);
    PREFIX_MASKS[10] = new Long.fromBits( parseInt('00000000000000000000000000000000', 2), parseInt('11111111111111111111000000000000', 2), true);
    PREFIX_MASKS[11] = new Long.fromBits( parseInt('00000000000000000000000000000000', 2), parseInt('11111111111111111111110000000000', 2), true);
    PREFIX_MASKS[12] = new Long.fromBits( parseInt('00000000000000000000000000000000', 2), parseInt('11111111111111111111111100000000', 2), true);
    PREFIX_MASKS[13] = new Long.fromBits( parseInt('00000000000000000000000000000000', 2), parseInt('11111111111111111111111111000000', 2), true);
    PREFIX_MASKS[14] = new Long.fromBits( parseInt('00000000000000000000000000000000', 2), parseInt('11111111111111111111111111110000', 2), true);
    PREFIX_MASKS[15] = new Long.fromBits( parseInt('00000000000000000000000000000000', 2), parseInt('11111111111111111111111111111100', 2), true);
    PREFIX_MASKS[16] = new Long.fromBits( parseInt('00000000000000000000000000000000', 2), parseInt('11111111111111111111111111111111', 2), true);
    PREFIX_MASKS[17] = new Long.fromBits( parseInt('11000000000000000000000000000000', 2), parseInt('11111111111111111111111111111111', 2), true);
    PREFIX_MASKS[18] = new Long.fromBits( parseInt('11110000000000000000000000000000', 2), parseInt('11111111111111111111111111111111', 2), true);
    PREFIX_MASKS[19] = new Long.fromBits( parseInt('11111100000000000000000000000000', 2), parseInt('11111111111111111111111111111111', 2), true);
    PREFIX_MASKS[20] = new Long.fromBits( parseInt('11111111000000000000000000000000', 2), parseInt('11111111111111111111111111111111', 2), true);
    PREFIX_MASKS[21] = new Long.fromBits( parseInt('11111111110000000000000000000000', 2), parseInt('11111111111111111111111111111111', 2), true);
    PREFIX_MASKS[22] = new Long.fromBits( parseInt('11111111111100000000000000000000', 2), parseInt('11111111111111111111111111111111', 2), true);
    PREFIX_MASKS[23] = new Long.fromBits( parseInt('11111111111111000000000000000000', 2), parseInt('11111111111111111111111111111111', 2), true);

    Long.UTHREE = Long.fromInt(3, true);
    

    /**
    * Returns a Quadkey string that corresponds to the BinaryQuadkey
    * @returns {string} Quadkey string
    * @override
    * @example var BinaryQuadkey = require("binaryquadkey");
    * var binaryQuadkey = new BinaryQuadkey(35210, 21493, 16);
    * console.log(binaryQuadkey.toQuadkey()); // "1202102332221212"
    */
    BinaryQuadkey.prototype.toQuadkey = function toString() {
        var quadkeyChars = "";
        for (var i = 0; i < this.zoom; ++i) {
            var bitLocation = (64 - ((i + 1) * 2));
            var charBits = this.UInt64Quadkey.and(Long.UTHREE.shiftLeft(bitLocation)).shiftRight(bitLocation).toInt()
            
            quadkeyChars = quadkeyChars + charBits;
        }
        return quadkeyChars;
    };
    
    /**
    * Returns a new Node.js Buffer() from BinaryQuadkey's internal unsigned 64 bit integer representation
    * @returns {Buffer} Node.js new Buffer() 
    * @override
    * @example var BinaryQuadkey = require("binaryquadkey");
    * var binaryQuadkey = new BinaryQuadkey(35210, 21493, 16);
    * console.log(binaryQuadkey.toBuffer()); // <Buffer 62 4b ea 66 00 00 00 10>
    */
    BinaryQuadkey.prototype.toBuffer = function toBuffer() {
        var ret = [ 
             this.UInt64Quadkey.low & 0xff,
            (this.UInt64Quadkey.low  >>  8) & 0xff,
            (this.UInt64Quadkey.low  >> 16) & 0xff,
            (this.UInt64Quadkey.low  >> 24) & 0xff,
             this.UInt64Quadkey.high & 0xff,
            (this.UInt64Quadkey.high >>  8) & 0xff,
            (this.UInt64Quadkey.high >> 16) & 0xff,
            (this.UInt64Quadkey.high >> 24) & 0xff
        ];
        ret.reverse();
        return new Buffer(ret);
    };

    /**
    * Converts the BinaryQuadkey's internal 64bit integer representation to a string written in the specified radix.
    * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
    * @returns {string} unsigned 64bit integer string in radix frmat
    * @override
    * @throws {RangeError} If `radix` is out of range
    * @example var BinaryQuadkey = require("binaryquadkey");
    * var binaryQuadkey = new BinaryQuadkey(29, 50, 7);
    * console.log(binaryQuadkey.toString()); // 3270739229377822727
    * console.log(binaryQuadkey.toString(16)); // 2d64000000000007
    * console.log(binaryQuadkey.toString(2)); // 10010011100001110010011011001000000000000000000000000000010000
    */
     BinaryQuadkey.prototype.toString = function toString(radix) {
        return this.UInt64Quadkey.toString(radix);
    };

    /**
    * Determines weather the current BinaryQuadkey is a parent of the passed in BinaryQuadkey
    * @param {BinaryQuadkey} other BinaryQuadkey object which may or may not be a child
    * @returns {boolean} if the BinaryQuadkey is a parent of the other BinaryQuadkey
    * @override
    * @example var BinaryQuadkey = require("binaryquadkey");
    * var binaryQuadkey1 = new BinaryQuadkey.fromQuadkey("120210");
    * var binaryQuadkey2 = new BinaryQuadkey.fromQuadkey("1202102332221212");
    * console.log(binaryQuadkey1.isParentOf(binaryQuadkey2)); // true
    */
    BinaryQuadkey.prototype.isParentOf = function isParentOf(other) {
        if (other.getZoom() <= this.zoom) {
            return false;
        }
        var mask = PREFIX_MASKS[this.zoom];
        return (this.UInt64Quadkey.and(mask)).equals(other.UInt64Quadkey.and(mask));
    }

    /**
    * Determines weather the current BinaryQuadkey identical to the passed in BinaryQuadkey
    * @param {BinaryQuadkey} other BinaryQuadkey object which may or may not be identical
    * @returns {boolean} if the BinaryQuadkey represents the same tile as the other BinaryQuadkey
    * @override
    * @example var BinaryQuadkey = require("binaryquadkey");
    * var binaryQuadkey1 = new BinaryQuadkey(35210, 21493, 16); 
    * var binaryQuadkey2 = new BinaryQuadkey.fromQuadkey("1202102332221212");
    * var binaryQuadkey3 = new BinaryQuadkey.fromQuadkey("120210");
    * console.log(binaryQuadkey1.equals(binaryQuadkey2)); // true
    * console.log(binaryQuadkey1.equals(binaryQuadkey3)); // false
    */
    BinaryQuadkey.prototype.equals = function equals(other) {
        return this.UInt64Quadkey.equals(other.UInt64Quadkey);
    };
    
    /**
    * Gets the high 32 bits as the 64 bit unsigned integer.
    * @returns {number} Unsigned high bits
    * @example var BinaryQuadkey = require("binaryquadkey");
    * var binaryQuadkey = new BinaryQuadkey.fromBits(11, 618776576);
    * console.log(binaryQuadkey.getHighBits()); // 618776576
    */
    BinaryQuadkey.prototype.getHighBits = function getHighBitsUnsigned() {
        return this.UInt64Quadkey.getHighBitsUnsigned();
    };

    /**
    * Gets the low 32 bits as the 64 bit unsigned integer.
    * @returns {number} Unsigned low bits
    * @example var BinaryQuadkey = require("binaryquadkey");
    * var binaryQuadkey = new BinaryQuadkey.fromBits(11, 618776576);
    * console.log(binaryQuadkey.getLowBits()); // 11
    */
    BinaryQuadkey.prototype.getLowBits = function getLowBitsUnsigned() {
        return this.UInt64Quadkey.getLowBitsUnsigned();
    };

    /**
    * Returns the zoom level / level of detail of the specific referenced tile.
    * @returns {string} zoom level of tile
    * @override
    * @example var BinaryQuadkey = require("binaryquadkey");
    * var binaryQuadkey = new BinaryQuadkey.fromQuadkey("021032013");
    * console.log(binaryQuadkey.getZoom()); // 9
    */
    BinaryQuadkey.prototype.getZoom = function getZoom() {
        return this.UInt64Quadkey.and(31).toInt();
    }

    return BinaryQuadkey;
});
