<a name="BinaryQuadkey"></a>
## BinaryQuadkey
Node.js library to create an object to represent map tile [Quadkeys](https://msdn.microsoft.com/en-us/library/bb259689.aspx) in a [binary format](https://github.com/joekarl/binary-quadkey) using 64-bit integers via [long.js](https://github.com/dcodeIO/long.js)for the benefits of constant time comparsions, consistent byte-length storage, integer indexing, cache optimization, and potential space savings. Read more here: [Binary quadkeys](https://github.com/joekarl/binary-quadkey)

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The X coordinate of the tile |
| y | <code>number</code> | The Y coordinate of the tile |
| zoom | <code>number</code> | The zoomlevel or level of detail of the tile (1-23) |
| UInt64Quadkey | <code>object</code> | [long.js](https://github.com/dcodeIO/long.js) Long object representing an unsigned 64 bit integer |


* [BinaryQuadkey](#BinaryQuadkey)
  * [new BinaryQuadkey([x], [y], [zoom], [uint64quadkey])](#new_BinaryQuadkey_new)
  * _instance_
    * [.toQuadkey()](#BinaryQuadkey+toQuadkey) ⇒ <code>string</code>
    * [.toBuffer()](#BinaryQuadkey+toBuffer) ⇒ <code>Buffer</code>
    * [.toString([radix])](#BinaryQuadkey+toString) ⇒ <code>string</code>
    * [.isParentOf(other)](#BinaryQuadkey+isParentOf) ⇒ <code>boolean</code>
    * [.equals(other)](#BinaryQuadkey+equals) ⇒ <code>boolean</code>
    * [.getHighBits()](#BinaryQuadkey+getHighBits) ⇒ <code>number</code>
    * [.getLowBits()](#BinaryQuadkey+getLowBits) ⇒ <code>number</code>
    * [.getZoom()](#BinaryQuadkey+getZoom) ⇒ <code>string</code>
  * _static_
    * [.fromTileXY(x, y, zoom)](#BinaryQuadkey.fromTileXY) ⇒ <code>[BinaryQuadkey](#BinaryQuadkey)</code>
    * [.fromQuadkey(quadKeyString)](#BinaryQuadkey.fromQuadkey) ⇒ <code>[BinaryQuadkey](#BinaryQuadkey)</code>
    * [.fromUInt64(uint64quadkey, [zoom])](#BinaryQuadkey.fromUInt64) ⇒ <code>[BinaryQuadkey](#BinaryQuadkey)</code>
    * [.fromBits(low, high)](#BinaryQuadkey.fromBits) ⇒ <code>[BinaryQuadkey](#BinaryQuadkey)</code>
    * [.isBinaryQuadkey(obj)](#BinaryQuadkey.isBinaryQuadkey) ⇒ <code>boolean</code>

<a name="new_BinaryQuadkey_new"></a>
### new BinaryQuadkey([x], [y], [zoom], [uint64quadkey])
Constructs a BinaryQuadkey object that internally uses an unsigned 64-bit integer representation of Quadkey of a map tile at the given coordinates See the from* functions below for more convenient ways of constructing BinaryQuadkey objects.

**Returns**: <code>[BinaryQuadkey](#BinaryQuadkey)</code> - The corresponding BinaryQuadkey object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [x] | <code>number</code> | <code>0</code> | The X coordinate of the tile |
| [y] | <code>number</code> | <code>0</code> | The Y coordinate of the tile |
| [zoom] | <code>number</code> | <code>0</code> | The zoomlevel or level of detail of the tile (1-23) |
| [uint64quadkey] | <code>object</code> | <code>Long.fromInt(0)</code> | (Optional) [long.js](https://github.com/dcodeIO/long.js) Long object encapsulating an unsigned 64 bit integer representation of a binary Quadkey |

**Example**  
```js
var BinaryQuadkey = require("binaryquadkey");var binaryQuadkey = new BinaryQuadkey(35210, 21493, 16);
```
<a name="BinaryQuadkey+toQuadkey"></a>
### binaryQuadkey.toQuadkey() ⇒ <code>string</code>
Returns a Quadkey string that corresponds to the BinaryQuadkey

**Kind**: instance method of <code>[BinaryQuadkey](#BinaryQuadkey)</code>  
**Returns**: <code>string</code> - Quadkey string  
**Example**  
```js
var BinaryQuadkey = require("binaryquadkey");var binaryQuadkey = new BinaryQuadkey(35210, 21493, 16);console.log(binaryQuadkey.toQuadkey()); // "1202102332221212"
```
<a name="BinaryQuadkey+toBuffer"></a>
### binaryQuadkey.toBuffer() ⇒ <code>Buffer</code>
Returns a new Node.js Buffer() from BinaryQuadkey's internal unsigned 64 bit integer representation

**Kind**: instance method of <code>[BinaryQuadkey](#BinaryQuadkey)</code>  
**Returns**: <code>Buffer</code> - Node.js new Buffer()  
**Example**  
```js
var BinaryQuadkey = require("binaryquadkey");var binaryQuadkey = new BinaryQuadkey(35210, 21493, 16);console.log(binaryQuadkey.toBuffer()); // <Buffer 62 4b ea 66 00 00 00 10>
```
<a name="BinaryQuadkey+toString"></a>
### binaryQuadkey.toString([radix]) ⇒ <code>string</code>
Converts the BinaryQuadkey's internal 64bit integer representation to a string written in the specified radix.

**Kind**: instance method of <code>[BinaryQuadkey](#BinaryQuadkey)</code>  
**Returns**: <code>string</code> - unsigned 64bit integer string in radix frmat  
**Throws**:

- <code>RangeError</code> If `radix` is out of range


| Param | Type | Description |
| --- | --- | --- |
| [radix] | <code>number</code> | The radix in which the text is written (2-36), defaults to 10 |

**Example**  
```js
var BinaryQuadkey = require("binaryquadkey");var binaryQuadkey = new BinaryQuadkey(29, 50, 7);console.log(binaryQuadkey.toString()); // 3270739229377822727console.log(binaryQuadkey.toString(16)); // 2d64000000000007console.log(binaryQuadkey.toString(2)); // 10010011100001110010011011001000000000000000000000000000010000
```
<a name="BinaryQuadkey+isParentOf"></a>
### binaryQuadkey.isParentOf(other) ⇒ <code>boolean</code>
Determines weather the current BinaryQuadkey is a parent of the passed in BinaryQuadkey

**Kind**: instance method of <code>[BinaryQuadkey](#BinaryQuadkey)</code>  
**Returns**: <code>boolean</code> - if the BinaryQuadkey is a parent of the other BinaryQuadkey  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[BinaryQuadkey](#BinaryQuadkey)</code> | BinaryQuadkey object which may or may not be a child |

**Example**  
```js
var BinaryQuadkey = require("binaryquadkey");var binaryQuadkey1 = new BinaryQuadkey.fromQuadkey("120210");var binaryQuadkey2 = new BinaryQuadkey.fromQuadkey("1202102332221212");console.log(binaryQuadkey1.isParentOf(binaryQuadkey2)); // true
```
<a name="BinaryQuadkey+equals"></a>
### binaryQuadkey.equals(other) ⇒ <code>boolean</code>
Determines weather the current BinaryQuadkey identical to the passed in BinaryQuadkey

**Kind**: instance method of <code>[BinaryQuadkey](#BinaryQuadkey)</code>  
**Returns**: <code>boolean</code> - if the BinaryQuadkey represents the same tile as the other BinaryQuadkey  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[BinaryQuadkey](#BinaryQuadkey)</code> | BinaryQuadkey object which may or may not be identical |

**Example**  
```js
var BinaryQuadkey = require("binaryquadkey");var binaryQuadkey1 = new BinaryQuadkey(35210, 21493, 16); var binaryQuadkey2 = new BinaryQuadkey.fromQuadkey("1202102332221212");var binaryQuadkey3 = new BinaryQuadkey.fromQuadkey("120210");console.log(binaryQuadkey1.equals(binaryQuadkey2)); // trueconsole.log(binaryQuadkey1.equals(binaryQuadkey3)); // false
```
<a name="BinaryQuadkey+getHighBits"></a>
### binaryQuadkey.getHighBits() ⇒ <code>number</code>
Gets the high 32 bits as the 64 bit unsigned integer.

**Kind**: instance method of <code>[BinaryQuadkey](#BinaryQuadkey)</code>  
**Returns**: <code>number</code> - Unsigned high bits  
**Example**  
```js
var BinaryQuadkey = require("binaryquadkey");var binaryQuadkey = new BinaryQuadkey.fromBits(11, 618776576);console.log(binaryQuadkey.getHighBits()); // 618776576
```
<a name="BinaryQuadkey+getLowBits"></a>
### binaryQuadkey.getLowBits() ⇒ <code>number</code>
Gets the low 32 bits as the 64 bit unsigned integer.

**Kind**: instance method of <code>[BinaryQuadkey](#BinaryQuadkey)</code>  
**Returns**: <code>number</code> - Unsigned low bits  
**Example**  
```js
var BinaryQuadkey = require("binaryquadkey");var binaryQuadkey = new BinaryQuadkey.fromBits(11, 618776576);console.log(binaryQuadkey.getLowBits()); // 11
```
<a name="BinaryQuadkey+getZoom"></a>
### binaryQuadkey.getZoom() ⇒ <code>string</code>
Returns the zoom level / level of detail of the specific referenced tile.

**Kind**: instance method of <code>[BinaryQuadkey](#BinaryQuadkey)</code>  
**Returns**: <code>string</code> - zoom level of tile  
**Example**  
```js
var BinaryQuadkey = require("binaryquadkey");var binaryQuadkey = new BinaryQuadkey.fromQuadkey("021032013");console.log(binaryQuadkey.getZoom()); // 9
```
<a name="BinaryQuadkey.fromTileXY"></a>
### BinaryQuadkey.fromTileXY(x, y, zoom) ⇒ <code>[BinaryQuadkey](#BinaryQuadkey)</code>
Returns a BinaryQuadkey representation of the tile at the given coordinates

**Kind**: static method of <code>[BinaryQuadkey](#BinaryQuadkey)</code>  
**Returns**: <code>[BinaryQuadkey](#BinaryQuadkey)</code> - The corresponding BinaryQuadkey object  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The X coordinate of the tile |
| y | <code>number</code> | The Y coordinate of the tile |
| zoom | <code>number</code> | The zoomlevel or level of detail of the tile (1-23) |

**Example**  
```js
var BinaryQuadkey = require("binaryquadkey");var binaryQuadkey = new BinaryQuadkey.fromTileXY(35210, 21493, 16);
```
<a name="BinaryQuadkey.fromQuadkey"></a>
### BinaryQuadkey.fromQuadkey(quadKeyString) ⇒ <code>[BinaryQuadkey](#BinaryQuadkey)</code>
Returns a BinaryQuadkey representing the Quadkey string

**Kind**: static method of <code>[BinaryQuadkey](#BinaryQuadkey)</code>  
**Returns**: <code>[BinaryQuadkey](#BinaryQuadkey)</code> - The corresponding BinaryQuadkey object created from Quadkey string  

| Param | Type | Description |
| --- | --- | --- |
| quadKeyString | <code>string</code> | The string that corresponds to the Quadkey |

**Example**  
```js
var BinaryQuadkey = require("binaryquadkey");var binaryQuadkey = new BinaryQuadkey.fromQuadkey("1202102332221212");
```
<a name="BinaryQuadkey.fromUInt64"></a>
### BinaryQuadkey.fromUInt64(uint64quadkey, [zoom]) ⇒ <code>[BinaryQuadkey](#BinaryQuadkey)</code>
Returns a BinaryQuadkey representation of a [long.js](https://github.com/dcodeIO/long.js) unsigned int64 Long object

**Kind**: static method of <code>[BinaryQuadkey](#BinaryQuadkey)</code>  
**Returns**: <code>[BinaryQuadkey](#BinaryQuadkey)</code> - The corresponding BinaryQuadkey object  

| Param | Type | Description |
| --- | --- | --- |
| uint64quadkey | <code>object</code> | [long.js](https://github.com/dcodeIO/long.js) Long object representing an unsigned 64 bit integer |
| [zoom] | <code>number</code> | (Optional) The zoomlevel or level of detail of the tile (1-23) |

**Example**  
```js
var BinaryQuadkey = require("binaryquadkey");var binaryQuadkey1 = new BinaryQuadkey(35210, 21493, 16); var binaryQuadkey2 = new BinaryQuadkey.fromUInt64(binaryQuadkey1.UInt64Quadkey);...var Long = require("long"); //requires you to install long.jsvar uint64 = new Long.fromString("18446744073709289495");var binaryQuadkey = new BinaryQuadkey.fromUInt64(uint64);
```
<a name="BinaryQuadkey.fromBits"></a>
### BinaryQuadkey.fromBits(low, high) ⇒ <code>[BinaryQuadkey](#BinaryQuadkey)</code>
Returns a BinaryQuadkey representing the unsigned 64 bit integer that comes by concatenating the given low and high bits. Each isassumed to use 32 bits.

**Kind**: static method of <code>[BinaryQuadkey](#BinaryQuadkey)</code>  
**Returns**: <code>[BinaryQuadkey](#BinaryQuadkey)</code> - The corresponding BinaryQuadkey object created from the low and high bits  

| Param | Type | Description |
| --- | --- | --- |
| low | <code>number</code> | The low (unsigned) 32 bits of the long |
| high | <code>number</code> | The high (unsigned) 32 bits of the long |

**Example**  
```js
var BinaryQuadkey = require("binaryquadkey");var binaryQuadkey1 = new BinaryQuadkey.fromBits(11, 618776576);var binaryQuadkey2 = new BinaryQuadkey.fromBits(0xFFFFFFFF, 0x7FFFFFFF);
```
<a name="BinaryQuadkey.isBinaryQuadkey"></a>
### BinaryQuadkey.isBinaryQuadkey(obj) ⇒ <code>boolean</code>
Tests if the specified object is a BinaryQuadkey.

**Kind**: static method of <code>[BinaryQuadkey](#BinaryQuadkey)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Object |

