/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/d3-interpolate/src/transform/decompose.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-interpolate/src/transform/decompose.js ***!
  \****************************************************************/
/*! exports provided: identity, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
var degrees = 180 / Math.PI;

var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

/* harmony default export */ __webpack_exports__["default"] = (function(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
});


/***/ }),

/***/ "./node_modules/d3-interpolate/src/transform/parse.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-interpolate/src/transform/parse.js ***!
  \************************************************************/
/*! exports provided: parseCss, parseSvg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseCss", function() { return parseCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseSvg", function() { return parseSvg; });
/* harmony import */ var _decompose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decompose */ "./node_modules/d3-interpolate/src/transform/decompose.js");


var cssNode,
    cssRoot,
    cssView,
    svgNode;

function parseCss(value) {
  if (value === "none") return _decompose__WEBPACK_IMPORTED_MODULE_0__["identity"];
  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
  cssNode.style.transform = value;
  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
  cssRoot.removeChild(cssNode);
  value = value.slice(7, -1).split(",");
  return Object(_decompose__WEBPACK_IMPORTED_MODULE_0__["default"])(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}

function parseSvg(value) {
  if (value == null) return _decompose__WEBPACK_IMPORTED_MODULE_0__["identity"];
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return _decompose__WEBPACK_IMPORTED_MODULE_0__["identity"];
  value = value.matrix;
  return Object(_decompose__WEBPACK_IMPORTED_MODULE_0__["default"])(value.a, value.b, value.c, value.d, value.e, value.f);
}


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/bar_chart.js":
/*!**************************!*\
  !*** ./src/bar_chart.js ***!
  \**************************/
/*! exports provided: chart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chart", function() { return chart; });
var chart = function chart() {
  var margin = {
    left: 120,
    right: 20,
    top: 10,
    bottom: 130
  };
  var width = 1300 - margin.left - margin.right;
  var height = 700 - margin.top - margin.bottom;
  var g = d3.select("#chart").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")"); // X Label

  g.append("text").attr("y", height + 50).attr("x", width / 2).attr("font-size", "20px").attr("text-anchor", "middle").text("Year"); // Y Label

  g.append("text").attr("y", -60).attr("x", -(height / 2)).attr("font-size", "20px").attr("text-anchor", "middle").attr("transform", "rotate(-90)").text("Total Acquisitions, USD");
  d3.json("../data/acquisitions/object.json").then(function (data) {
    //console.log(data);
    data = data.slice().sort(function (a, b) {
      return d3.ascending(a.year, b.year);
    }); //console.log(data);

    data.forEach(function (d) {
      d.price = +d.price; //console.log(d.price);
    });
    var x = d3.scaleBand().domain(data.map(function (d) {
      return d.year;
    })).range([0, width]).padding(0.2);
    var y = d3.scaleLinear().domain([d3.min(data, function (d) {
      return 1e9 * Math.floor(d.price / 1e9);
    }), d3.max(data, function (d) {
      return 1e9 * Math.ceil(d.price / 1e9);
    })]).nice(7).range([height, 0]); //   { return 1e9*Math.floor(d["Tax Collection"]/1e9); },
    // d3.max( data, function(d){ return 1e9*Math.ceil(d["Tax Collection"]/1e9); }
    // X Axis

    var xAxisCall = d3.axisBottom(x);
    g.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxisCall); // Y Axis

    var yAxisCall = d3.axisLeft(y) // .ticks(7)
    .tickFormat(function (d) {
      if (d !== 0) {
        return "$" + d / 1000000000 + "B";
      }
    });
    g.append("g").attr("class", "y axis") // .attr("transform", "translate(0," - 50 + ")")
    .call(yAxisCall);
    var rects = g.selectAll("rect").data(data); //console.log(height);

    rects.enter().append("rect").attr("y", function (d) {
      return y(d.price);
    }).attr("x", function (d) {
      //console.log(x(d.year));
      return x(d.year);
    }).attr("height", function (d) {
      return height - y(d.price);
    }).attr("width", x.bandwidth).attr("fill", "orange");
  });
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bar_chart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bar_chart */ "./src/bar_chart.js");
/* harmony import */ var _interactive_chart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interactive_chart */ "./src/interactive_chart.js");


document.addEventListener("DOMContentLoaded", function () {
  // console.log("hello2");
  Object(_bar_chart__WEBPACK_IMPORTED_MODULE_0__["chart"])();
  Object(_interactive_chart__WEBPACK_IMPORTED_MODULE_1__["interactiveChart"])();
});

/***/ }),

/***/ "./src/interactive_chart.js":
/*!**********************************!*\
  !*** ./src/interactive_chart.js ***!
  \**********************************/
/*! exports provided: interactiveChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interactiveChart", function() { return interactiveChart; });
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(buffer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var d3_interpolate_src_transform_parse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-interpolate/src/transform/parse */ "./node_modules/d3-interpolate/src/transform/parse.js");


var interactiveChart = function interactiveChart() {
  console.log("github test");
  var margin = {
    left: 80,
    right: 20,
    top: 50,
    bottom: 100
  };
  var width = 900 - margin.left - margin.right;
  var height = 700 - margin.top - margin.bottom;
  var flag = true;
  var t = d3.transition().duration(750);
  var svg = d3.select("#inter").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")"); //   // X Scale

  var x0 = d3.scaleBand().range([0, width]).padding(0.1);
  var x1 = d3.scaleBand();
  d3.select("#goback-button").style("opacity", "0");
  var rawData;
  var testData;
  var interval;
  var cleanData;
  var barStep = 27;
  var barPadding = 3 / barStep; //   // Y Scale

  var y = d3.scaleLinear().range([height, 0]).nice(7);
  var xAxis = d3.axisBottom(x0).tickSize(0);
  var yAxis = d3.axisLeft(y).tickFormat(function (d) {
    if (d !== 0 && d < 1000000000) {
      return "$" + d / 1000000 + "M";
    } else if (d !== 0) {
      return "$" + d / 1000000000 + "B";
    }
  });
  var tip = d3.tip().attr("class", "d3-tip").direction("e") // Position the tooltip to the right of a target element
  .offset([-10, 0]).html(function (d) {
    var text = "<strong>Company:</strong> <span style='color:red'>" + d.company + "</span><br>";
    text += "<strong>Sector:</strong> <span style='color:red;text-transform:capitalize'>" + d.sector + "</span><br>";
    text += "<strong>Round:</strong> <span style='color:red'>" + d.round + "</span><br>";
    text += "<strong>Amount Raised:</strong> <span style='color:red'>" + d3.format("$,.0f")(d.amountRaised) + "</span><br>";
    return text;
  });
  var timeLabel = svg.append("text").attr("class", "label").attr("y", height + 50).attr("x", width - 40) // .attr("font-size", "40px")
  // .attr("opacity", "0.4")
  .attr("text-anchor", "middle").text("2000");
  var sectors = ["mobile", "software", "web", "ecommerce", "medical"];
  var rounds = ["series-a", "series-b", "angel", "series-c+", "venture"];
  x0.domain(rounds);
  x1.domain(sectors).rangeRound([0, x0.bandwidth()]);

  x0.invert = function (x) {
    var domain = x0.domain();
    var range = x0.range();
    var scale = d3.scaleQuantize().range(domain).domain(range);
    return scale(x);
  };

  svg.append("g").attr("class", "y axis").style("opacity", "0"); //.call(yAxis);

  svg.append("text").attr("class", "label").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").style("font-weight", "bold").text("Value"); // var xAxisGroup = g
  //     .append("g")
  //     .attr("class", "x axis")
  //     .attr("transform", "translate(0," + height + ")");
  //   var yAxisGroup = g.append("g").attr("class", "y axis");
  // var color = d3.scale
  //   .ordinal()
  //   .range(["#ca0020", "#f4a582", "#d5d5d5", "#92c5de", "#0571b0"]);

  var color = d3.scaleOrdinal(d3.schemeSet1);
  var time = 0;
  var x3 = d3.scaleLinear().range([margin.left, width - margin.right]);

  var xAxis2 = function xAxis2(g) {
    return g.attr("class", "x-axis").attr("transform", "translate(0 ,".concat(margin.top, ")")).call(d3.axisTop(x3).ticks(width / 150, "s")).call(function (g) {
      return (g.selection ? g.selection() : g).select(".domain").remove();
    });
  };

  var yAxis2 = function yAxis2(g) {
    return g.attr("class", "y-axis").attr("transform", "translate(".concat(margin.left + 0.5, ",0)")).call(function (g) {
      return g.append("line").attr("stroke", "currentColor").attr("y1", margin.top).attr("y2", height - margin.bottom - 50);
    });
  };

  d3.json("./data/funding/test_data.json").then(function (data) {
    testData = data;
  });
  d3.json("./data/funding/clean_new_funding.json").then(function (data) {
    // console.log(data);
    // rawData = data;
    // cleanData = d3
    //   .nest()
    //   //     // .key(function(d) {
    //   //     //   return d.funded;
    //   //     // })
    //   .key(function(d) {
    //     return d.funded;
    //   })
    //   .sortKeys(d3.ascending)
    //   .key(function(d) {
    //     return d.round;
    //   })
    //   .key(function(d) {
    //     return d.sector;
    //   })
    //   .rollup(function(v) {
    //     return d3.sum(v, function(d) {
    //       return d.amountRaised;
    //     });
    //   })
    //   .entries(rawData);
    cleanData = data;
    console.log(testData); // var rounds = cleanData.map(function(d) {
    //   return d.values
    //     .filter(ele => {
    //       if (ele.key) return ele.key;
    //     })
    //     .map(ele2 => {
    //       return ele2.key;
    //     });
    // });

    var elements = cleanData[0].values.map(function (ele) {
      return ele;
    }); // x1.domain(sectors).rangeRound([0, x0.bandwidth()]);
    // x1.domain(
    //   cleanData[0].values[0].values.map(ele => {
    //     return ele.key;
    //   })
    // ).rangeRound([0, x0.bandwidth()]);
    // y.domain([
    //   0,
    //   d3.max(cleanData[0].values, function(rounds) {
    //     return d3.max(rounds.values, function(d) {
    //       return d.value;
    //     });
    //   })
    // ]);

    svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis); // d3.interval(function() {
    //   // At the end of our data, loop back
    //   time = time < 14 ? time + 1 : 0;
    //   update(cleanData[time]);
    // }, 5000);
    // First run of the visualization

    update(cleanData[0]);
  }); // let button = d3.select("#play-button");
  // console.log(button);

  $("#play-button").on("click", function () {
    var button = $(this);

    if (button.text() == "Play") {
      button.text("Pause");
      interval = setInterval(step, 3000);
      step();
    } else {
      button.text("Play");
      clearInterval(interval);
    }
  });
  $("#reset-button").on("click", function () {
    time = 0;
    update(cleanData[0]);
  });
  $("#goback-button").on("click", function () {
    restore();
  });
  $("#industry-select").on("change", function () {
    update(cleanData[time]);
  });
  $("#date-slider").slider({
    max: 2013,
    min: 2000,
    step: 1,
    animate: "slow",
    slide: function slide(event, ui) {
      time = ui.value - 2000;
      update(cleanData[time]);
    }
  });

  function step() {
    // At the end of our data, loop back
    time = time < 14 ? time + 1 : 0;
    update(cleanData[time]);
  }

  function update(data) {
    var elements = data.values.map(function (ele) {
      return ele;
    }); // data = data.slice().array.forEach(element => {});

    y.domain([0, d3.max(data.values, function (rounds) {
      return d3.max(rounds.values, function (d) {
        return d.value;
      });
    })]); //.call(yAxis);

    var slice2 = svg.selectAll(".slice").data(data.values).enter().append("g").attr("class", "g").attr("transform", function (d) {
      return "translate(" + x0(d.key) + ",0)";
    });
    var rects = slice2.selectAll("rect").data(function (d) {
      return d.values.filter(function (d) {
        if (d3.select("#industry-select").node().value == "all") {
          return d;
        } else {
          return d.key == d3.select("#industry-select").node().value;
        }
      });
    });
    svg.selectAll("rect").transition(t).delay(function (d) {
      return Math.random() * 50;
    }).attr("height", function (d) {
      return 0;
    }).attr("y", function (d) {
      return y(0);
    }).remove();
    console.log(rects);
    rects.enter().append("rect") // .attr("class", "enter")
    .attr("width", x1.bandwidth).attr("x", function (d) {
      //console.log(x1(d.key), d.key);
      return x1(d.key);
    }).attr("data-legend", function (d) {
      return d.key;
    }).style("fill", function (d) {
      return color(d.key);
    }).attr("y", function (d) {
      return y(0);
    }).attr("height", function (d) {
      return 0;
    }).on("click", function (d) {
      var round = x0.invert(Object(d3_interpolate_src_transform_parse__WEBPACK_IMPORTED_MODULE_1__["parseSvg"])(d3.select(this.parentNode).attr("transform")).translateX); // d3.select("g").
      // transition(t).remove();

      drillDown(d, slice2, round);
    }).attr("cursor", "pointer").on("mouseover", function (d) {
      d3.select(this).style("fill", d3.rgb(color(d.key)).darker(2));
    }).on("mouseout", function (d) {
      d3.select(this).style("fill", color(d.key));
    }).on("change", function (d) {
      if (d3.select("#play-button").text() === "Play") {
        d3.selectAll("rect").transition().duration(100).attr("y", function (d) {
          return y(d.value);
        }).attr("height", function (d) {
          return height - y(d.value);
        });
      }
    }) //.merge(rects)
    .transition(t).delay(function (d) {
      return Math.random() * 1000;
    }) //.duration(500)
    .attr("y", function (d) {
      return y(d.value);
    }).attr("height", function (d) {
      return height - y(d.value);
    });
    var rects2 = slice2.selectAll("rect");
    var button2 = d3.select("#play-button");
    svg.selectAll("g.y.axis").transition().duration(1000).delay(300).style("opacity", "1").call(yAxis);
    svg.selectAll("g.legend").remove();
    drawLegend.call(this); // d3.selectAll(".y")
    //   .transition()
    //   .duration(1000)
    //   .delay(300)
    //   .style("opacity", "1");

    timeLabel.text(+(time + 2000));
    $("#year")[0].innerHTML = +(time + 2000);
    $("#date-slider").slider("value", +(time + 2000));
  }

  function drawLegend() {
    var legend = d3.select("g").append("g").attr("transform", "translate(" + (margin.left + margin.right + 60) + "," + (height + 30) + ")").selectAll("g").data(sectors).enter().append("g").attr("class", "legend");
    legend.append("rect").attr("fill", function (d, i) {
      return color(d);
    }) //   const color = d3.scaleOrdinal(d3.schemeCategory10);
    .attr("height", 15).attr("width", 15);
    legend.append("text").attr("x", 18).attr("y", 10).attr("dy", ".15em").text(function (d, i) {
      return d;
    }).style("text-anchor", "start").style("font-size", 12); // Now space the groups out after they have been appended:

    var padding = 10;
    legend.attr("transform", function (d, i) {
      return "translate(" + (d3.sum(sectors, function (e, j) {
        if (j < i) {
          return legend.nodes()[j].getBBox().width;
        } else {
          return 0;
        }
      }) + padding * i) + ",0)";
    });
  }

  function bar(svg2, down, data, selector) {
    var g = svg2.insert("g", selector).attr("class", "enter").attr("transform", "translate(0,".concat(50 + barStep * barPadding, ")")).attr("text-anchor", "end").style("font", "18px sans-serif");
    var bar = g.selectAll("g").data(data).join("g").attr("cursor", "pointer") //  .on("click", d => update(cleanData[time]))
    .on("mouseover", tip.show).on("mouseout", tip.hide);
    bar.append("text").attr("x", 80 - 2).attr("y", 27 * (1 - 0.1) / 2).attr("dy", ".35em").text(function (d) {
      return d.company;
    });
    bar.append("rect").attr("x", x3(0)).attr("class", "bar").attr("width", function (d) {
      console.log(x3(0));
      return x3(d.amountRaised) - x3(0);
    }).attr("height", 27 * (1 - 0.3));
    return g;
  }

  function drillDown(d, slice, round) {
    var unsortedData = testData[time];
    var duration = 700;
    var transition1 = d3.transition().duration(duration);
    var transition2 = transition1.transition();
    console.log(unsortedData);
    console.log(d);
    console.log(round);
    console.log(testData);
    var ab = testData.map(function (ele) {
      return Object.values(ele);
    });
    var newData = unsortedData.values.filter(function (ele) {
      if (ele.key === d.key) {
        return ele;
      }
    });
    var newData2 = newData[0].values.filter(function (ele) {
      if (ele.round === round) {
        return ele;
      }
    });
    var newData3 = newData2.slice().sort(function (a, b) {
      return d3.descending(a.amountRaised, b.amountRaised);
    }).slice(0, 10);
    var lineChartData = getData(d, round);
    console.log(lineChartData);
    console.log(newData3);
    console.log(newData2); // let rects = g.selectAll("rect").data(newData);

    var data = newData3;
    d3.selectAll("svg").remove(); // $("#play-button").text("Go Back");
    // $("#play-button").on("click", function() {
    //   let button = $(this);
    //   button.text("Play");
    //   restore();
    // });

    d3.select("#play-button").style("opacity", "0");
    d3.select("#reset-button").style("opacity", "0");
    d3.select("#slider-div").style("opacity", "0");
    d3.select("#industry-select").style("opacity", "0");
    d3.select("#year").style("opacity", "0");
    d3.selectAll("text").style("opacity", "0");
    d3.select("#goback-button").style("opacity", "1"); // g.selectAll("g.x.axis").remove();
    // slice.remove();

    var svg2 = d3.select("#drilldown").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
    svg2.call(tip);
    x3.domain([0, data[0].amountRaised]);
    console.log(x3.domain());
    svg2.append("rect").attr("class", "background").attr("fill", "none").attr("pointer-events", "all").attr("width", width).attr("height", height).attr("cursor", "pointer").on("dblclick", function (d) {
      d3.event.preventDefault();
      restore(d);
    }); // .on("click", d => up(svg, d));

    svg2.append("g").call(xAxis2);
    svg2.append("g").call(yAxis2);
    var placeholder = d.key;
    svg2.append("text").attr("class", "title").attr("x", width / 2).attr("y", -10).attr("text-anchor", "middle").text(function (d) {
      return "Largest ".concat(round, " rounds in the ").concat(placeholder, " Industry in ").concat(time + 2000);
    }); // svg2.call(tip)
    // .on("click", d => up(svg, d));

    var enter = bar(svg2, drillDown, data, ".y-axis").attr("fill-opacity", 0);
    console.log(enter);
    enter.transition(transition1).attr("fill-opacity", 1); // Transition entering bars to their new y-position.

    enter.selectAll("g").attr("transform", stack(d.index)).transition(transition1).attr("transform", stagger()); // Update the x-scale domain.
    // Update the x-axis.

    svg2.selectAll(".x-axis").transition().call(xAxis2); // Transition entering bars to the new x-scale.

    enter.selectAll("g").transition(transition2).attr("transform", function (d, i) {
      return "translate(0,".concat(barStep * i, ")");
    }); // Color the bars as parents; they will fade to children if appropriate.

    enter.selectAll("rect").transition(t).attr("fill", function (d) {
      return color(d.sector);
    }).attr("fill-opacity", 1).transition().attr("fill", function (d) {
      return color(d.sector);
    }).attr("width", function (d) {
      return x3(d.amountRaised);
    });
    buildLineChart(lineChartData, placeholder, round); // d3.selectAll("svg")
    //   .attr("class", "background")
    //   // .attr("fill", "none")
    //   .attr("pointer-events", "all")
    //   // .attr("width", width + margin.right + margin.left)
    //   // .attr("height", height)
    //   .attr("cursor", "pointer")
    //   .attr("transform", "translate(-250, -30)")
    //   .on("dblclick", d => {
    //     d3.event.preventDefault();
    //     restore(d);
    //   });
  }

  function stack(i) {
    var value = 0;
    return function (d) {
      var t = "translate(".concat(x3(value), ",").concat(barStep * i, ")");
      value += d.amountRaised;
      return t;
    };
  }

  function stagger() {
    var value = 0;
    return function (d, i) {
      var t = "translate(".concat(x3(value), ",").concat(barStep * i, ")");
      value += d.amountRaised;
      return t;
    };
  }

  function getData(d, round) {
    var results = [];
    var i = 0;

    while (i < 14) {
      var obj = {};
      var unsortedData = testData[i];
      var newData = unsortedData.values.filter(function (ele) {
        if (ele.key === d.key) {
          return ele;
        }
      });

      if (newData[0] === undefined) {
        results.push({
          y: 0
        });
        i++;
        continue;
      }

      var newData2 = newData[0].values.filter(function (ele) {
        if (ele.round === round) {
          return ele;
        }
      });
      var sum = 0;
      newData2.forEach(function (ele) {
        sum += ele.amountRaised;
      });
      obj["y"] = sum;
      results.push(obj);
      i++;
    }

    return results;
  }

  function buildLineChart(lineChartData, placeholder, round) {
    var n = 13;
    var sortedData = lineChartData.slice().sort(function (a, b) {
      return d3.descending(a.y, b.y);
    });
    console.log(sortedData);
    var xScale3 = d3.scaleLinear().domain([2000, 2013]) // input
    .range([0, width]); // o

    var yScale = d3.scaleLinear().domain([0, sortedData[0].y]) // input
    .range([height, 0]);
    console.log(yScale.domain());
    var div = d3.select("body").append("div") // declare the tooltip div
    .attr("class", "tooltip") // apply the 'tooltip' class
    .style("opacity", 0);
    var line = d3.line().x(function (d, i) {
      return xScale3(i + 2000);
    }) // set the x values for the line generator
    .y(function (d) {
      return yScale(d.y);
    }) // set the y values for the line generator
    .curve(d3.curveMonotoneX); // apply smoothing to the line

    var svg3 = d3.select("#linechart").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).attr("cursor", "pointer").on("dblclick", function (d) {
      d3.event.preventDefault();
      restore(d);
    }).append("g").attr("transform", "translate(" + 80 + ", " + margin.top + ")");
    console.log(svg3);
    svg3.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(xScale3).tickFormat(d3.format("d")));
    svg3.append("g").attr("class", "y axis").call(d3.axisLeft(yScale).tickFormat(function (d) {
      if (d !== 0 && d < 1000000000) {
        return "$" + d / 1000000 + "M";
      } else if (d !== 0) {
        return "$" + d / 1000000000 + "B";
      }
    }));
    svg3.append("path").datum(lineChartData) // 10. Binds data to the line
    .attr("class", "line") // Assign a class for styling
    .attr("d", line);
    svg3.selectAll(".dot").data(lineChartData).enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function (d, i) {
      return xScale3(i + 2000);
    }).attr("cy", function (d) {
      return yScale(d.y);
    }).attr("r", function (d, i) {
      if (i === time) {
        return 7;
      } else {
        return 5;
      }
    }).style("fill", function (d, i) {
      if (i === time) return "red";
    }).on("mouseover", function (d, i) {
      div.transition().duration(200).style("opacity", 0.9);
      div.html(i + 2000 + ": " + " $" + d3.format(".2s")(d["y"]).replace(/G/, "B")).style("left", d3.event.pageX + "px").style("top", d3.event.pageY - 28 + "px");
    }).on("mouseout", function (d) {
      div.transition().duration(500).style("opacity", 0);
    });
    svg3.append("text").attr("class", "title").attr("x", width / 2).attr("y", -30).attr("text-anchor", "middle").text(function (d) {
      return "Total Raised per Year in ".concat(round, " in the ").concat(placeholder, " Industry, 2000-2013");
    });
  }

  function restore() {
    d3.selectAll("svg").remove();
    svg = d3.select("#inter").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
    svg.append("text").attr("class", "label").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").style("font-weight", "bold").text("Value");
    timeLabel = svg.append("text").attr("class", "label").attr("y", height + 50).attr("x", width - 40) // .attr("font-size", "40px")
    // .attr("opacity", "0.4")
    .attr("text-anchor", "middle").text("".concat(time + 2000));
    d3.select("#goback-button").style("opacity", "0");
    d3.select("#play-button").style("opacity", "1");
    d3.select("#reset-button").style("opacity", "1");
    d3.select("#slider-div").style("opacity", "1");
    d3.select("#industry-select").style("opacity", "1");
    d3.selectAll("text").style("opacity", "1");
    var duration = 750;
    var transition1 = d3.transition().duration(duration);
    var transition2 = transition1.transition();
    var exit = svg.selectAll(".enter").attr("class", "exit");
    exit.selectAll("text").remove(); // Entering nodes immediately obscure the clicked-on bar, so hide it.
    // exit.selectAll("rect").attr("fill-opacity", p => (p === d ? 0 : null));
    // Transition exiting bars to fade out.

    exit.selectAll("rects").transition(transition2).attr("transform", function (d, i) {
      return "translate(".concat(-barStep * i, ", 0)");
    }) //.attr("width", d => 0)
    // .attr("fill-opacity", 0)
    // .attr("transform", stack(d.index))
    // .transition(transition1)
    // .attr("transform", stagger())
    .remove();
    d3.selectAll("g.y-axis").remove();
    d3.selectAll("g.x-axis").remove();
    svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").transition().call(xAxis);
    svg.append("g").attr("class", "y axis").style("opacity", "0");
    d3.select("#year").style("opacity", "1");
    update(cleanData[time]);
  }
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvdHJhbnNmb3JtL2RlY29tcG9zZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3RyYW5zZm9ybS9wYXJzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9iYXJfY2hhcnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnRlcmFjdGl2ZV9jaGFydC5qcyJdLCJuYW1lcyI6WyJjaGFydCIsIm1hcmdpbiIsImxlZnQiLCJyaWdodCIsInRvcCIsImJvdHRvbSIsIndpZHRoIiwiaGVpZ2h0IiwiZyIsImQzIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsInRleHQiLCJqc29uIiwidGhlbiIsImRhdGEiLCJzbGljZSIsInNvcnQiLCJhIiwiYiIsImFzY2VuZGluZyIsInllYXIiLCJmb3JFYWNoIiwiZCIsInByaWNlIiwieCIsInNjYWxlQmFuZCIsImRvbWFpbiIsIm1hcCIsInJhbmdlIiwicGFkZGluZyIsInkiLCJzY2FsZUxpbmVhciIsIm1pbiIsIk1hdGgiLCJmbG9vciIsIm1heCIsImNlaWwiLCJuaWNlIiwieEF4aXNDYWxsIiwiYXhpc0JvdHRvbSIsImNhbGwiLCJ5QXhpc0NhbGwiLCJheGlzTGVmdCIsInRpY2tGb3JtYXQiLCJyZWN0cyIsInNlbGVjdEFsbCIsImVudGVyIiwiYmFuZHdpZHRoIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiaW50ZXJhY3RpdmVDaGFydCIsImNvbnNvbGUiLCJsb2ciLCJmbGFnIiwidCIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsInN2ZyIsIngwIiwieDEiLCJzdHlsZSIsInJhd0RhdGEiLCJ0ZXN0RGF0YSIsImludGVydmFsIiwiY2xlYW5EYXRhIiwiYmFyU3RlcCIsImJhclBhZGRpbmciLCJ4QXhpcyIsInRpY2tTaXplIiwieUF4aXMiLCJ0aXAiLCJkaXJlY3Rpb24iLCJvZmZzZXQiLCJodG1sIiwiY29tcGFueSIsInNlY3RvciIsInJvdW5kIiwiZm9ybWF0IiwiYW1vdW50UmFpc2VkIiwidGltZUxhYmVsIiwic2VjdG9ycyIsInJvdW5kcyIsInJhbmdlUm91bmQiLCJpbnZlcnQiLCJzY2FsZSIsInNjYWxlUXVhbnRpemUiLCJjb2xvciIsInNjYWxlT3JkaW5hbCIsInNjaGVtZVNldDEiLCJ0aW1lIiwieDMiLCJ4QXhpczIiLCJheGlzVG9wIiwidGlja3MiLCJzZWxlY3Rpb24iLCJyZW1vdmUiLCJ5QXhpczIiLCJlbGVtZW50cyIsInZhbHVlcyIsImVsZSIsInVwZGF0ZSIsIiQiLCJvbiIsImJ1dHRvbiIsInNldEludGVydmFsIiwic3RlcCIsImNsZWFySW50ZXJ2YWwiLCJyZXN0b3JlIiwic2xpZGVyIiwiYW5pbWF0ZSIsInNsaWRlIiwiZXZlbnQiLCJ1aSIsInZhbHVlIiwic2xpY2UyIiwia2V5IiwiZmlsdGVyIiwibm9kZSIsImRlbGF5IiwicmFuZG9tIiwicGFyc2VTdmciLCJwYXJlbnROb2RlIiwidHJhbnNsYXRlWCIsImRyaWxsRG93biIsInJnYiIsImRhcmtlciIsInJlY3RzMiIsImJ1dHRvbjIiLCJkcmF3TGVnZW5kIiwiaW5uZXJIVE1MIiwibGVnZW5kIiwiaSIsInN1bSIsImUiLCJqIiwibm9kZXMiLCJnZXRCQm94IiwiYmFyIiwic3ZnMiIsImRvd24iLCJzZWxlY3RvciIsImluc2VydCIsImpvaW4iLCJzaG93IiwiaGlkZSIsInVuc29ydGVkRGF0YSIsInRyYW5zaXRpb24xIiwidHJhbnNpdGlvbjIiLCJhYiIsIk9iamVjdCIsIm5ld0RhdGEiLCJuZXdEYXRhMiIsIm5ld0RhdGEzIiwiZGVzY2VuZGluZyIsImxpbmVDaGFydERhdGEiLCJnZXREYXRhIiwicHJldmVudERlZmF1bHQiLCJwbGFjZWhvbGRlciIsInN0YWNrIiwiaW5kZXgiLCJzdGFnZ2VyIiwiYnVpbGRMaW5lQ2hhcnQiLCJyZXN1bHRzIiwib2JqIiwidW5kZWZpbmVkIiwicHVzaCIsIm4iLCJzb3J0ZWREYXRhIiwieFNjYWxlMyIsInlTY2FsZSIsImRpdiIsImxpbmUiLCJjdXJ2ZSIsImN1cnZlTW9ub3RvbmVYIiwic3ZnMyIsImRhdHVtIiwicmVwbGFjZSIsInBhZ2VYIiwicGFnZVkiLCJleGl0Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZZOztBQUVaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBa0MsU0FBUztBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDLFVBQVU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN2SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRVk7O0FBRVosYUFBYSxtQkFBTyxDQUFDLG9EQUFXO0FBQ2hDLGNBQWMsbUJBQU8sQ0FBQyxnREFBUztBQUMvQixjQUFjLG1CQUFPLENBQUMsZ0RBQVM7O0FBRS9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsbURBQW1EO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsVUFBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLHVDQUF1QyxTQUFTO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxpQkFBaUI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELEVBQUU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGVBQWU7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQSxxQkFBcUIsZUFBZTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsT0FBTztBQUM5RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLFFBQVE7QUFDN0I7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixZQUFZO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FB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QUF1QmtELE1BQXZCLEdBNUNpQixDQTZDakI7QUFDQTtBQUVBOztBQUNBb0YsUUFBSSxDQUNEdEksU0FESCxDQUNhLE9BRGIsRUFFR1UsVUFGSCxDQUVjNEYsV0FGZCxFQUdHekksSUFISCxDQUdRLFdBSFIsRUFHcUIsVUFBQ1ksQ0FBRCxFQUFJNkcsQ0FBSjtBQUFBLGlDQUF1QixDQUFDbEUsT0FBRCxHQUFXa0UsQ0FBbEM7QUFBQSxLQUhyQixFQUlFO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFURixLQVVHcEMsTUFWSDtBQVlBeEYsTUFBRSxDQUFDc0MsU0FBSCxDQUFhLFVBQWIsRUFBeUJrRCxNQUF6QjtBQUVBeEYsTUFBRSxDQUFDc0MsU0FBSCxDQUFhLFVBQWIsRUFBeUJrRCxNQUF6QjtBQUVBdEMsT0FBRyxDQUNBaEQsTUFESCxDQUNVLEdBRFYsRUFFR0MsSUFGSCxDQUVRLE9BRlIsRUFFaUIsUUFGakIsRUFHR0EsSUFISCxDQUdRLFdBSFIsRUFHcUIsaUJBQWlCTCxNQUFqQixHQUEwQixHQUgvQyxFQUlHa0QsVUFKSCxHQUtHZixJQUxILENBS1EyQixLQUxSO0FBT0FWLE9BQUcsQ0FDQWhELE1BREgsQ0FDVSxHQURWLEVBRUdDLElBRkgsQ0FFUSxPQUZSLEVBRWlCLFFBRmpCLEVBR0drRCxLQUhILENBR1MsU0FIVCxFQUdvQixHQUhwQjtBQUtBckQsTUFBRSxDQUFDQyxNQUFILENBQVUsT0FBVixFQUFtQm9ELEtBQW5CLENBQXlCLFNBQXpCLEVBQW9DLEdBQXBDO0FBRUF3QyxVQUFNLENBQUNwQyxTQUFTLENBQUN5QixJQUFELENBQVYsQ0FBTjtBQUNEO0FBQ0YsQ0E3N0JNLEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG4vLyBTdXBwb3J0IGRlY29kaW5nIFVSTC1zYWZlIGJhc2U2NCBzdHJpbmdzLCBhcyBOb2RlLmpzIGRvZXMuXG4vLyBTZWU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NCNVUkxfYXBwbGljYXRpb25zXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBnZXRMZW5zIChiNjQpIHtcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcblxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gVHJpbSBvZmYgZXh0cmEgYnl0ZXMgYWZ0ZXIgcGxhY2Vob2xkZXIgYnl0ZXMgYXJlIGZvdW5kXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2JlYXRnYW1taXQvYmFzZTY0LWpzL2lzc3Vlcy80MlxuICB2YXIgdmFsaWRMZW4gPSBiNjQuaW5kZXhPZignPScpXG4gIGlmICh2YWxpZExlbiA9PT0gLTEpIHZhbGlkTGVuID0gbGVuXG5cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IHZhbGlkTGVuID09PSBsZW5cbiAgICA/IDBcbiAgICA6IDQgLSAodmFsaWRMZW4gJSA0KVxuXG4gIHJldHVybiBbdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbl1cbn1cblxuLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gX2J5dGVMZW5ndGggKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikge1xuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cblxuICB2YXIgYXJyID0gbmV3IEFycihfYnl0ZUxlbmd0aChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pKVxuXG4gIHZhciBjdXJCeXRlID0gMFxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgdmFyIGxlbiA9IHBsYWNlSG9sZGVyc0xlbiA+IDBcbiAgICA/IHZhbGlkTGVuIC0gNFxuICAgIDogdmFsaWRMZW5cblxuICB2YXIgaVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTgpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildIDw8IDYpIHxcbiAgICAgIHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMyldXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDE2KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAyKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA+PiA0KVxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMSkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxMCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA+PiAyKVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcbiAgcmV0dXJuIGxvb2t1cFtudW0gPj4gMTggJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDYgJiAweDNGXSArXG4gICAgbG9va3VwW251bSAmIDB4M0ZdXG59XG5cbmZ1bmN0aW9uIGVuY29kZUNodW5rICh1aW50OCwgc3RhcnQsIGVuZCkge1xuICB2YXIgdG1wXG4gIHZhciBvdXRwdXQgPSBbXVxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMykge1xuICAgIHRtcCA9XG4gICAgICAoKHVpbnQ4W2ldIDw8IDE2KSAmIDB4RkYwMDAwKSArXG4gICAgICAoKHVpbnQ4W2kgKyAxXSA8PCA4KSAmIDB4RkYwMCkgK1xuICAgICAgKHVpbnQ4W2kgKyAyXSAmIDB4RkYpXG4gICAgb3V0cHV0LnB1c2godHJpcGxldFRvQmFzZTY0KHRtcCkpXG4gIH1cbiAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxufVxuXG5mdW5jdGlvbiBmcm9tQnl0ZUFycmF5ICh1aW50OCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW4gPSB1aW50OC5sZW5ndGhcbiAgdmFyIGV4dHJhQnl0ZXMgPSBsZW4gJSAzIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsoXG4gICAgICB1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpXG4gICAgKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDJdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl0gK1xuICAgICAgJz09J1xuICAgIClcbiAgfSBlbHNlIGlmIChleHRyYUJ5dGVzID09PSAyKSB7XG4gICAgdG1wID0gKHVpbnQ4W2xlbiAtIDJdIDw8IDgpICsgdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAxMF0gK1xuICAgICAgbG9va3VwWyh0bXAgPj4gNCkgJiAweDNGXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCAyKSAmIDB4M0ZdICtcbiAgICAgICc9J1xuICAgIClcbiAgfVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuIiwiLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0JylcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxuLyoqXG4gKiBJZiBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgVXNlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiAobW9zdCBjb21wYXRpYmxlLCBldmVuIElFNilcbiAqXG4gKiBCcm93c2VycyB0aGF0IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGFyZSBJRSAxMCssIEZpcmVmb3ggNCssIENocm9tZSA3KywgU2FmYXJpIDUuMSssXG4gKiBPcGVyYSAxMS42KywgaU9TIDQuMisuXG4gKlxuICogRHVlIHRvIHZhcmlvdXMgYnJvd3NlciBidWdzLCBzb21ldGltZXMgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiB3aWxsIGJlIHVzZWQgZXZlblxuICogd2hlbiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0eXBlZCBhcnJheXMuXG4gKlxuICogTm90ZTpcbiAqXG4gKiAgIC0gRmlyZWZveCA0LTI5IGxhY2tzIHN1cHBvcnQgZm9yIGFkZGluZyBuZXcgcHJvcGVydGllcyB0byBgVWludDhBcnJheWAgaW5zdGFuY2VzLFxuICogICAgIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4LlxuICpcbiAqICAgLSBDaHJvbWUgOS0xMCBpcyBtaXNzaW5nIHRoZSBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uLlxuICpcbiAqICAgLSBJRTEwIGhhcyBhIGJyb2tlbiBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYXJyYXlzIG9mXG4gKiAgICAgaW5jb3JyZWN0IGxlbmd0aCBpbiBzb21lIHNpdHVhdGlvbnMuXG5cbiAqIFdlIGRldGVjdCB0aGVzZSBidWdneSBicm93c2VycyBhbmQgc2V0IGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGAgdG8gYGZhbHNlYCBzbyB0aGV5XG4gKiBnZXQgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiwgd2hpY2ggaXMgc2xvd2VyIGJ1dCBiZWhhdmVzIGNvcnJlY3RseS5cbiAqL1xuQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgPSBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVCAhPT0gdW5kZWZpbmVkXG4gID8gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgOiB0eXBlZEFycmF5U3VwcG9ydCgpXG5cbi8qXG4gKiBFeHBvcnQga01heExlbmd0aCBhZnRlciB0eXBlZCBhcnJheSBzdXBwb3J0IGlzIGRldGVybWluZWQuXG4gKi9cbmV4cG9ydHMua01heExlbmd0aCA9IGtNYXhMZW5ndGgoKVxuXG5mdW5jdGlvbiB0eXBlZEFycmF5U3VwcG9ydCAoKSB7XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KDEpXG4gICAgYXJyLl9fcHJvdG9fXyA9IHtfX3Byb3RvX186IFVpbnQ4QXJyYXkucHJvdG90eXBlLCBmb286IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDQyIH19XG4gICAgcmV0dXJuIGFyci5mb28oKSA9PT0gNDIgJiYgLy8gdHlwZWQgYXJyYXkgaW5zdGFuY2VzIGNhbiBiZSBhdWdtZW50ZWRcbiAgICAgICAgdHlwZW9mIGFyci5zdWJhcnJheSA9PT0gJ2Z1bmN0aW9uJyAmJiAvLyBjaHJvbWUgOS0xMCBsYWNrIGBzdWJhcnJheWBcbiAgICAgICAgYXJyLnN1YmFycmF5KDEsIDEpLmJ5dGVMZW5ndGggPT09IDAgLy8gaWUxMCBoYXMgYnJva2VuIGBzdWJhcnJheWBcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmZ1bmN0aW9uIGtNYXhMZW5ndGggKCkge1xuICByZXR1cm4gQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgICA/IDB4N2ZmZmZmZmZcbiAgICA6IDB4M2ZmZmZmZmZcbn1cblxuZnVuY3Rpb24gY3JlYXRlQnVmZmVyICh0aGF0LCBsZW5ndGgpIHtcbiAgaWYgKGtNYXhMZW5ndGgoKSA8IGxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHR5cGVkIGFycmF5IGxlbmd0aCcpXG4gIH1cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgICB0aGF0Ll9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIGFuIG9iamVjdCBpbnN0YW5jZSBvZiB0aGUgQnVmZmVyIGNsYXNzXG4gICAgaWYgKHRoYXQgPT09IG51bGwpIHtcbiAgICAgIHRoYXQgPSBuZXcgQnVmZmVyKGxlbmd0aClcbiAgICB9XG4gICAgdGhhdC5sZW5ndGggPSBsZW5ndGhcbiAgfVxuXG4gIHJldHVybiB0aGF0XG59XG5cbi8qKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBoYXZlIHRoZWlyXG4gKiBwcm90b3R5cGUgY2hhbmdlZCB0byBgQnVmZmVyLnByb3RvdHlwZWAuIEZ1cnRoZXJtb3JlLCBgQnVmZmVyYCBpcyBhIHN1YmNsYXNzIG9mXG4gKiBgVWludDhBcnJheWAsIHNvIHRoZSByZXR1cm5lZCBpbnN0YW5jZXMgd2lsbCBoYXZlIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBtZXRob2RzXG4gKiBhbmQgdGhlIGBVaW50OEFycmF5YCBtZXRob2RzLiBTcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdFxuICogcmV0dXJucyBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBUaGUgYFVpbnQ4QXJyYXlgIHByb3RvdHlwZSByZW1haW5zIHVubW9kaWZpZWQuXG4gKi9cblxuZnVuY3Rpb24gQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmICEodGhpcyBpbnN0YW5jZW9mIEJ1ZmZlcikpIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcihhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIC8vIENvbW1vbiBjYXNlLlxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nT3JPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdJZiBlbmNvZGluZyBpcyBzcGVjaWZpZWQgdGhlbiB0aGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZydcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIGFsbG9jVW5zYWZlKHRoaXMsIGFyZylcbiAgfVxuICByZXR1cm4gZnJvbSh0aGlzLCBhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnBvb2xTaXplID0gODE5MiAvLyBub3QgdXNlZCBieSB0aGlzIGltcGxlbWVudGF0aW9uXG5cbi8vIFRPRE86IExlZ2FjeSwgbm90IG5lZWRlZCBhbnltb3JlLiBSZW1vdmUgaW4gbmV4dCBtYWpvciB2ZXJzaW9uLlxuQnVmZmVyLl9hdWdtZW50ID0gZnVuY3Rpb24gKGFycikge1xuICBhcnIuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIGZyb20gKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQpXG4gIH1cblxuICByZXR1cm4gZnJvbU9iamVjdCh0aGF0LCB2YWx1ZSlcbn1cblxuLyoqXG4gKiBGdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBCdWZmZXIoYXJnLCBlbmNvZGluZykgYnV0IHRocm93cyBhIFR5cGVFcnJvclxuICogaWYgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBCdWZmZXIuZnJvbShzdHJbLCBlbmNvZGluZ10pXG4gKiBCdWZmZXIuZnJvbShhcnJheSlcbiAqIEJ1ZmZlci5mcm9tKGJ1ZmZlcilcbiAqIEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyWywgYnl0ZU9mZnNldFssIGxlbmd0aF1dKVxuICoqL1xuQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gZnJvbShudWxsLCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5pZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgQnVmZmVyLnByb3RvdHlwZS5fX3Byb3RvX18gPSBVaW50OEFycmF5LnByb3RvdHlwZVxuICBCdWZmZXIuX19wcm90b19fID0gVWludDhBcnJheVxuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnNwZWNpZXMgJiZcbiAgICAgIEJ1ZmZlcltTeW1ib2wuc3BlY2llc10gPT09IEJ1ZmZlcikge1xuICAgIC8vIEZpeCBzdWJhcnJheSgpIGluIEVTMjAxNi4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzk3XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlciwgU3ltYm9sLnNwZWNpZXMsIHtcbiAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRTaXplIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfSBlbHNlIGlmIChzaXplIDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBuZWdhdGl2ZScpXG4gIH1cbn1cblxuZnVuY3Rpb24gYWxsb2MgKHRoYXQsIHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgaWYgKHNpemUgPD0gMCkge1xuICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbiAgfVxuICBpZiAoZmlsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT25seSBwYXkgYXR0ZW50aW9uIHRvIGVuY29kaW5nIGlmIGl0J3MgYSBzdHJpbmcuIFRoaXNcbiAgICAvLyBwcmV2ZW50cyBhY2NpZGVudGFsbHkgc2VuZGluZyBpbiBhIG51bWJlciB0aGF0IHdvdWxkXG4gICAgLy8gYmUgaW50ZXJwcmV0dGVkIGFzIGEgc3RhcnQgb2Zmc2V0LlxuICAgIHJldHVybiB0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnXG4gICAgICA/IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwsIGVuY29kaW5nKVxuICAgICAgOiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsKVxuICB9XG4gIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiBhbGxvYyhzaXplWywgZmlsbFssIGVuY29kaW5nXV0pXG4gKiovXG5CdWZmZXIuYWxsb2MgPSBmdW5jdGlvbiAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGFsbG9jKG51bGwsIHNpemUsIGZpbGwsIGVuY29kaW5nKVxufVxuXG5mdW5jdGlvbiBhbGxvY1Vuc2FmZSAodGhhdCwgc2l6ZSkge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSA8IDAgPyAwIDogY2hlY2tlZChzaXplKSB8IDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7ICsraSkge1xuICAgICAgdGhhdFtpXSA9IDBcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIEJ1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIFNsb3dCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuXG5mdW5jdGlvbiBmcm9tU3RyaW5nICh0aGF0LCBzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnIHx8IGVuY29kaW5nID09PSAnJykge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gIH1cblxuICBpZiAoIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiZW5jb2RpbmdcIiBtdXN0IGJlIGEgdmFsaWQgc3RyaW5nIGVuY29kaW5nJylcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBieXRlTGVuZ3RoKHN0cmluZywgZW5jb2RpbmcpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcblxuICB2YXIgYWN0dWFsID0gdGhhdC53cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuXG4gIGlmIChhY3R1YWwgIT09IGxlbmd0aCkge1xuICAgIC8vIFdyaXRpbmcgYSBoZXggc3RyaW5nLCBmb3IgZXhhbXBsZSwgdGhhdCBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMgd2lsbFxuICAgIC8vIGNhdXNlIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IGludmFsaWQgY2hhcmFjdGVyIHRvIGJlIGlnbm9yZWQuIChlLmcuXG4gICAgLy8gJ2FieHhjZCcgd2lsbCBiZSB0cmVhdGVkIGFzICdhYicpXG4gICAgdGhhdCA9IHRoYXQuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5TGlrZSAodGhhdCwgYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCA8IDAgPyAwIDogY2hlY2tlZChhcnJheS5sZW5ndGgpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIHRoYXRbaV0gPSBhcnJheVtpXSAmIDI1NVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUJ1ZmZlciAodGhhdCwgYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aCkge1xuICBhcnJheS5ieXRlTGVuZ3RoIC8vIHRoaXMgdGhyb3dzIGlmIGBhcnJheWAgaXMgbm90IGEgdmFsaWQgQXJyYXlCdWZmZXJcblxuICBpZiAoYnl0ZU9mZnNldCA8IDAgfHwgYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnb2Zmc2V0XFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0ICsgKGxlbmd0aCB8fCAwKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdsZW5ndGhcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYnl0ZU9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSlcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQpXG4gIH0gZWxzZSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IGFycmF5XG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIHRoYXQgPSBmcm9tQXJyYXlMaWtlKHRoYXQsIGFycmF5KVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKHRoYXQsIG9iaikge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iaikpIHtcbiAgICB2YXIgbGVuID0gY2hlY2tlZChvYmoubGVuZ3RoKSB8IDBcbiAgICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbilcblxuICAgIGlmICh0aGF0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoYXRcbiAgICB9XG5cbiAgICBvYmouY29weSh0aGF0LCAwLCAwLCBsZW4pXG4gICAgcmV0dXJuIHRoYXRcbiAgfVxuXG4gIGlmIChvYmopIHtcbiAgICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgb2JqLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB8fCAnbGVuZ3RoJyBpbiBvYmopIHtcbiAgICAgIGlmICh0eXBlb2Ygb2JqLmxlbmd0aCAhPT0gJ251bWJlcicgfHwgaXNuYW4ob2JqLmxlbmd0aCkpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCAwKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UodGhhdCwgb2JqKVxuICAgIH1cblxuICAgIGlmIChvYmoudHlwZSA9PT0gJ0J1ZmZlcicgJiYgaXNBcnJheShvYmouZGF0YSkpIHtcbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iai5kYXRhKVxuICAgIH1cbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCBvciBhcnJheS1saWtlIG9iamVjdC4nKVxufVxuXG5mdW5jdGlvbiBjaGVja2VkIChsZW5ndGgpIHtcbiAgLy8gTm90ZTogY2Fubm90IHVzZSBgbGVuZ3RoIDwga01heExlbmd0aCgpYCBoZXJlIGJlY2F1c2UgdGhhdCBmYWlscyB3aGVuXG4gIC8vIGxlbmd0aCBpcyBOYU4gKHdoaWNoIGlzIG90aGVyd2lzZSBjb2VyY2VkIHRvIHplcm8uKVxuICBpZiAobGVuZ3RoID49IGtNYXhMZW5ndGgoKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICdzaXplOiAweCcgKyBrTWF4TGVuZ3RoKCkudG9TdHJpbmcoMTYpICsgJyBieXRlcycpXG4gIH1cbiAgcmV0dXJuIGxlbmd0aCB8IDBcbn1cblxuZnVuY3Rpb24gU2xvd0J1ZmZlciAobGVuZ3RoKSB7XG4gIGlmICgrbGVuZ3RoICE9IGxlbmd0aCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICAgIGxlbmd0aCA9IDBcbiAgfVxuICByZXR1cm4gQnVmZmVyLmFsbG9jKCtsZW5ndGgpXG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyIChiKSB7XG4gIHJldHVybiAhIShiICE9IG51bGwgJiYgYi5faXNCdWZmZXIpXG59XG5cbkJ1ZmZlci5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAoYSwgYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihhKSB8fCAhQnVmZmVyLmlzQnVmZmVyKGIpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIG11c3QgYmUgQnVmZmVycycpXG4gIH1cblxuICBpZiAoYSA9PT0gYikgcmV0dXJuIDBcblxuICB2YXIgeCA9IGEubGVuZ3RoXG4gIHZhciB5ID0gYi5sZW5ndGhcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXVxuICAgICAgeSA9IGJbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIGlzRW5jb2RpbmcgKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0IChsaXN0LCBsZW5ndGgpIHtcbiAgaWYgKCFpc0FycmF5KGxpc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBCdWZmZXIuYWxsb2MoMClcbiAgfVxuXG4gIHZhciBpXG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgbGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgdmFyIGJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShsZW5ndGgpXG4gIHZhciBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGJ1ZiA9IGxpc3RbaV1cbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICAgIH1cbiAgICBidWYuY29weShidWZmZXIsIHBvcylcbiAgICBwb3MgKz0gYnVmLmxlbmd0aFxuICB9XG4gIHJldHVybiBidWZmZXJcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHN0cmluZykpIHtcbiAgICByZXR1cm4gc3RyaW5nLmxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBBcnJheUJ1ZmZlci5pc1ZpZXcgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIChBcnJheUJ1ZmZlci5pc1ZpZXcoc3RyaW5nKSB8fCBzdHJpbmcgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikpIHtcbiAgICByZXR1cm4gc3RyaW5nLmJ5dGVMZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICBzdHJpbmcgPSAnJyArIHN0cmluZ1xuICB9XG5cbiAgdmFyIGxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKGxlbiA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBVc2UgYSBmb3IgbG9vcCB0byBhdm9pZCByZWN1cnNpb25cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGVuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgICByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiBsZW4gKiAyXG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gbGVuID4+PiAxXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGggLy8gYXNzdW1lIHV0ZjhcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuXG5mdW5jdGlvbiBzbG93VG9TdHJpbmcgKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG5cbiAgLy8gTm8gbmVlZCB0byB2ZXJpZnkgdGhhdCBcInRoaXMubGVuZ3RoIDw9IE1BWF9VSU5UMzJcIiBzaW5jZSBpdCdzIGEgcmVhZC1vbmx5XG4gIC8vIHByb3BlcnR5IG9mIGEgdHlwZWQgYXJyYXkuXG5cbiAgLy8gVGhpcyBiZWhhdmVzIG5laXRoZXIgbGlrZSBTdHJpbmcgbm9yIFVpbnQ4QXJyYXkgaW4gdGhhdCB3ZSBzZXQgc3RhcnQvZW5kXG4gIC8vIHRvIHRoZWlyIHVwcGVyL2xvd2VyIGJvdW5kcyBpZiB0aGUgdmFsdWUgcGFzc2VkIGlzIG91dCBvZiByYW5nZS5cbiAgLy8gdW5kZWZpbmVkIGlzIGhhbmRsZWQgc3BlY2lhbGx5IGFzIHBlciBFQ01BLTI2MiA2dGggRWRpdGlvbixcbiAgLy8gU2VjdGlvbiAxMy4zLjMuNyBSdW50aW1lIFNlbWFudGljczogS2V5ZWRCaW5kaW5nSW5pdGlhbGl6YXRpb24uXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkIHx8IHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIC8vIFJldHVybiBlYXJseSBpZiBzdGFydCA+IHRoaXMubGVuZ3RoLiBEb25lIGhlcmUgdG8gcHJldmVudCBwb3RlbnRpYWwgdWludDMyXG4gIC8vIGNvZXJjaW9uIGZhaWwgYmVsb3cuXG4gIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKGVuZCA8PSAwKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICAvLyBGb3JjZSBjb2Vyc2lvbiB0byB1aW50MzIuIFRoaXMgd2lsbCBhbHNvIGNvZXJjZSBmYWxzZXkvTmFOIHZhbHVlcyB0byAwLlxuICBlbmQgPj4+PSAwXG4gIHN0YXJ0ID4+Pj0gMFxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdXRmMTZsZVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9IChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGUgcHJvcGVydHkgaXMgdXNlZCBieSBgQnVmZmVyLmlzQnVmZmVyYCBhbmQgYGlzLWJ1ZmZlcmAgKGluIFNhZmFyaSA1LTcpIHRvIGRldGVjdFxuLy8gQnVmZmVyIGluc3RhbmNlcy5cbkJ1ZmZlci5wcm90b3R5cGUuX2lzQnVmZmVyID0gdHJ1ZVxuXG5mdW5jdGlvbiBzd2FwIChiLCBuLCBtKSB7XG4gIHZhciBpID0gYltuXVxuICBiW25dID0gYlttXVxuICBiW21dID0gaVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAxNiA9IGZ1bmN0aW9uIHN3YXAxNiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgMiAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMTYtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gMikge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDEpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMzIgPSBmdW5jdGlvbiBzd2FwMzIgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDMyLWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAzKVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyAyKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDY0ID0gZnVuY3Rpb24gc3dhcDY0ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA4ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA2NC1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA4KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgNylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgNilcbiAgICBzd2FwKHRoaXMsIGkgKyAyLCBpICsgNSlcbiAgICBzd2FwKHRoaXMsIGkgKyAzLCBpICsgNClcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGggfCAwXG4gIGlmIChsZW5ndGggPT09IDApIHJldHVybiAnJ1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCAwLCBsZW5ndGgpXG4gIHJldHVybiBzbG93VG9TdHJpbmcuYXBwbHkodGhpcywgYXJndW1lbnRzKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyAoYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIGlmICh0aGlzID09PSBiKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYikgPT09IDBcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gIHZhciBzdHIgPSAnJ1xuICB2YXIgbWF4ID0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFU1xuICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgc3RyID0gdGhpcy50b1N0cmluZygnaGV4JywgMCwgbWF4KS5tYXRjaCgvLnsyfS9nKS5qb2luKCcgJylcbiAgICBpZiAodGhpcy5sZW5ndGggPiBtYXgpIHN0ciArPSAnIC4uLiAnXG4gIH1cbiAgcmV0dXJuICc8QnVmZmVyICcgKyBzdHIgKyAnPidcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAodGFyZ2V0LCBzdGFydCwgZW5kLCB0aGlzU3RhcnQsIHRoaXNFbmQpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGFyZ2V0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICB9XG5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICBpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmQgPSB0YXJnZXQgPyB0YXJnZXQubGVuZ3RoIDogMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNTdGFydCA9IDBcbiAgfVxuICBpZiAodGhpc0VuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc0VuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoc3RhcnQgPCAwIHx8IGVuZCA+IHRhcmdldC5sZW5ndGggfHwgdGhpc1N0YXJ0IDwgMCB8fCB0aGlzRW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCAmJiBzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCkge1xuICAgIHJldHVybiAtMVxuICB9XG4gIGlmIChzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMVxuICB9XG5cbiAgc3RhcnQgPj4+PSAwXG4gIGVuZCA+Pj49IDBcbiAgdGhpc1N0YXJ0ID4+Pj0gMFxuICB0aGlzRW5kID4+Pj0gMFxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQpIHJldHVybiAwXG5cbiAgdmFyIHggPSB0aGlzRW5kIC0gdGhpc1N0YXJ0XG4gIHZhciB5ID0gZW5kIC0gc3RhcnRcbiAgdmFyIGxlbiA9IE1hdGgubWluKHgsIHkpXG5cbiAgdmFyIHRoaXNDb3B5ID0gdGhpcy5zbGljZSh0aGlzU3RhcnQsIHRoaXNFbmQpXG4gIHZhciB0YXJnZXRDb3B5ID0gdGFyZ2V0LnNsaWNlKHN0YXJ0LCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIGlmICh0aGlzQ29weVtpXSAhPT0gdGFyZ2V0Q29weVtpXSkge1xuICAgICAgeCA9IHRoaXNDb3B5W2ldXG4gICAgICB5ID0gdGFyZ2V0Q29weVtpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbi8vIEZpbmRzIGVpdGhlciB0aGUgZmlyc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0ID49IGBieXRlT2Zmc2V0YCxcbi8vIE9SIHRoZSBsYXN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA8PSBgYnl0ZU9mZnNldGAuXG4vL1xuLy8gQXJndW1lbnRzOlxuLy8gLSBidWZmZXIgLSBhIEJ1ZmZlciB0byBzZWFyY2hcbi8vIC0gdmFsIC0gYSBzdHJpbmcsIEJ1ZmZlciwgb3IgbnVtYmVyXG4vLyAtIGJ5dGVPZmZzZXQgLSBhbiBpbmRleCBpbnRvIGBidWZmZXJgOyB3aWxsIGJlIGNsYW1wZWQgdG8gYW4gaW50MzJcbi8vIC0gZW5jb2RpbmcgLSBhbiBvcHRpb25hbCBlbmNvZGluZywgcmVsZXZhbnQgaXMgdmFsIGlzIGEgc3RyaW5nXG4vLyAtIGRpciAtIHRydWUgZm9yIGluZGV4T2YsIGZhbHNlIGZvciBsYXN0SW5kZXhPZlxuZnVuY3Rpb24gYmlkaXJlY3Rpb25hbEluZGV4T2YgKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIC8vIEVtcHR5IGJ1ZmZlciBtZWFucyBubyBtYXRjaFxuICBpZiAoYnVmZmVyLmxlbmd0aCA9PT0gMCkgcmV0dXJuIC0xXG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXRcbiAgaWYgKHR5cGVvZiBieXRlT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gYnl0ZU9mZnNldFxuICAgIGJ5dGVPZmZzZXQgPSAwXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA+IDB4N2ZmZmZmZmYpIHtcbiAgICBieXRlT2Zmc2V0ID0gMHg3ZmZmZmZmZlxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAtMHg4MDAwMDAwMCkge1xuICAgIGJ5dGVPZmZzZXQgPSAtMHg4MDAwMDAwMFxuICB9XG4gIGJ5dGVPZmZzZXQgPSArYnl0ZU9mZnNldCAgLy8gQ29lcmNlIHRvIE51bWJlci5cbiAgaWYgKGlzTmFOKGJ5dGVPZmZzZXQpKSB7XG4gICAgLy8gYnl0ZU9mZnNldDogaXQgaXQncyB1bmRlZmluZWQsIG51bGwsIE5hTiwgXCJmb29cIiwgZXRjLCBzZWFyY2ggd2hvbGUgYnVmZmVyXG4gICAgYnl0ZU9mZnNldCA9IGRpciA/IDAgOiAoYnVmZmVyLmxlbmd0aCAtIDEpXG4gIH1cblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldDogbmVnYXRpdmUgb2Zmc2V0cyBzdGFydCBmcm9tIHRoZSBlbmQgb2YgdGhlIGJ1ZmZlclxuICBpZiAoYnl0ZU9mZnNldCA8IDApIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoICsgYnl0ZU9mZnNldFxuICBpZiAoYnl0ZU9mZnNldCA+PSBidWZmZXIubGVuZ3RoKSB7XG4gICAgaWYgKGRpcikgcmV0dXJuIC0xXG4gICAgZWxzZSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCAtIDFcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgMCkge1xuICAgIGlmIChkaXIpIGJ5dGVPZmZzZXQgPSAwXG4gICAgZWxzZSByZXR1cm4gLTFcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSB2YWxcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsID0gQnVmZmVyLmZyb20odmFsLCBlbmNvZGluZylcbiAgfVxuXG4gIC8vIEZpbmFsbHksIHNlYXJjaCBlaXRoZXIgaW5kZXhPZiAoaWYgZGlyIGlzIHRydWUpIG9yIGxhc3RJbmRleE9mXG4gIGlmIChCdWZmZXIuaXNCdWZmZXIodmFsKSkge1xuICAgIC8vIFNwZWNpYWwgY2FzZTogbG9va2luZyBmb3IgZW1wdHkgc3RyaW5nL2J1ZmZlciBhbHdheXMgZmFpbHNcbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAweEZGIC8vIFNlYXJjaCBmb3IgYSBieXRlIHZhbHVlIFswLTI1NV1cbiAgICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiZcbiAgICAgICAgdHlwZW9mIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmIChkaXIpIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5sYXN0SW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgWyB2YWwgXSwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZhbCBtdXN0IGJlIHN0cmluZywgbnVtYmVyIG9yIEJ1ZmZlcicpXG59XG5cbmZ1bmN0aW9uIGFycmF5SW5kZXhPZiAoYXJyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgdmFyIGluZGV4U2l6ZSA9IDFcbiAgdmFyIGFyckxlbmd0aCA9IGFyci5sZW5ndGhcbiAgdmFyIHZhbExlbmd0aCA9IHZhbC5sZW5ndGhcblxuICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKGVuY29kaW5nID09PSAndWNzMicgfHwgZW5jb2RpbmcgPT09ICd1Y3MtMicgfHxcbiAgICAgICAgZW5jb2RpbmcgPT09ICd1dGYxNmxlJyB8fCBlbmNvZGluZyA9PT0gJ3V0Zi0xNmxlJykge1xuICAgICAgaWYgKGFyci5sZW5ndGggPCAyIHx8IHZhbC5sZW5ndGggPCAyKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfVxuICAgICAgaW5kZXhTaXplID0gMlxuICAgICAgYXJyTGVuZ3RoIC89IDJcbiAgICAgIHZhbExlbmd0aCAvPSAyXG4gICAgICBieXRlT2Zmc2V0IC89IDJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkIChidWYsIGkpIHtcbiAgICBpZiAoaW5kZXhTaXplID09PSAxKSB7XG4gICAgICByZXR1cm4gYnVmW2ldXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBidWYucmVhZFVJbnQxNkJFKGkgKiBpbmRleFNpemUpXG4gICAgfVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGRpcikge1xuICAgIHZhciBmb3VuZEluZGV4ID0gLTFcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChyZWFkKGFyciwgaSkgPT09IHJlYWQodmFsLCBmb3VuZEluZGV4ID09PSAtMSA/IDAgOiBpIC0gZm91bmRJbmRleCkpIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKSBmb3VuZEluZGV4ID0gaVxuICAgICAgICBpZiAoaSAtIGZvdW5kSW5kZXggKyAxID09PSB2YWxMZW5ndGgpIHJldHVybiBmb3VuZEluZGV4ICogaW5kZXhTaXplXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gLTEpIGkgLT0gaSAtIGZvdW5kSW5kZXhcbiAgICAgICAgZm91bmRJbmRleCA9IC0xXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChieXRlT2Zmc2V0ICsgdmFsTGVuZ3RoID4gYXJyTGVuZ3RoKSBieXRlT2Zmc2V0ID0gYXJyTGVuZ3RoIC0gdmFsTGVuZ3RoXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBmb3VuZCA9IHRydWVcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdmFsTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKHJlYWQoYXJyLCBpICsgaikgIT09IHJlYWQodmFsLCBqKSkge1xuICAgICAgICAgIGZvdW5kID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZm91bmQpIHJldHVybiBpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gdGhpcy5pbmRleE9mKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpICE9PSAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCB0cnVlKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmxhc3RJbmRleE9mID0gZnVuY3Rpb24gbGFzdEluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGZhbHNlKVxufVxuXG5mdW5jdGlvbiBoZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuXG4gIC8vIG11c3QgYmUgYW4gZXZlbiBudW1iZXIgb2YgZGlnaXRzXG4gIHZhciBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChzdHJMZW4gJSAyICE9PSAwKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGhleCBzdHJpbmcnKVxuXG4gIGlmIChsZW5ndGggPiBzdHJMZW4gLyAyKSB7XG4gICAgbGVuZ3RoID0gc3RyTGVuIC8gMlxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgcGFyc2VkID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGlmIChpc05hTihwYXJzZWQpKSByZXR1cm4gaVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHBhcnNlZFxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIHV0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGFzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gbGF0aW4xV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGJhc2U2NFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiB1Y3MyV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gd3JpdGUgKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKSB7XG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcpXG4gIGlmIChvZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBvZmZzZXRcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgb2Zmc2V0WywgbGVuZ3RoXVssIGVuY29kaW5nXSlcbiAgfSBlbHNlIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICAgIGlmIChpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBsZW5ndGggPSBsZW5ndGggfCAwXG4gICAgICBpZiAoZW5jb2RpbmcgPT09IHVuZGVmaW5lZCkgZW5jb2RpbmcgPSAndXRmOCdcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgLy8gbGVnYWN5IHdyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldCwgbGVuZ3RoKSAtIHJlbW92ZSBpbiB2MC4xM1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdCdWZmZXIud3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0WywgbGVuZ3RoXSkgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCdcbiAgICApXG4gIH1cblxuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGxlbmd0aCA+IHJlbWFpbmluZykgbGVuZ3RoID0gcmVtYWluaW5nXG5cbiAgaWYgKChzdHJpbmcubGVuZ3RoID4gMCAmJiAobGVuZ3RoIDwgMCB8fCBvZmZzZXQgPCAwKSkgfHwgb2Zmc2V0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIHZhciByZXMgPSBbXVxuXG4gIHZhciBpID0gc3RhcnRcbiAgd2hpbGUgKGkgPCBlbmQpIHtcbiAgICB2YXIgZmlyc3RCeXRlID0gYnVmW2ldXG4gICAgdmFyIGNvZGVQb2ludCA9IG51bGxcbiAgICB2YXIgYnl0ZXNQZXJTZXF1ZW5jZSA9IChmaXJzdEJ5dGUgPiAweEVGKSA/IDRcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4REYpID8gM1xuICAgICAgOiAoZmlyc3RCeXRlID4gMHhCRikgPyAyXG4gICAgICA6IDFcblxuICAgIGlmIChpICsgYnl0ZXNQZXJTZXF1ZW5jZSA8PSBlbmQpIHtcbiAgICAgIHZhciBzZWNvbmRCeXRlLCB0aGlyZEJ5dGUsIGZvdXJ0aEJ5dGUsIHRlbXBDb2RlUG9pbnRcblxuICAgICAgc3dpdGNoIChieXRlc1BlclNlcXVlbmNlKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBpZiAoZmlyc3RCeXRlIDwgMHg4MCkge1xuICAgICAgICAgICAgY29kZVBvaW50ID0gZmlyc3RCeXRlXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4MUYpIDw8IDB4NiB8IChzZWNvbmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3Rikge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweEMgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4NiB8ICh0aGlyZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGRiAmJiAodGVtcENvZGVQb2ludCA8IDB4RDgwMCB8fCB0ZW1wQ29kZVBvaW50ID4gMHhERkZGKSkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBmb3VydGhCeXRlID0gYnVmW2kgKyAzXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAoZm91cnRoQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHgxMiB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHhDIHwgKHRoaXJkQnl0ZSAmIDB4M0YpIDw8IDB4NiB8IChmb3VydGhCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHhGRkZGICYmIHRlbXBDb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2RlUG9pbnQgPT09IG51bGwpIHtcbiAgICAgIC8vIHdlIGRpZCBub3QgZ2VuZXJhdGUgYSB2YWxpZCBjb2RlUG9pbnQgc28gaW5zZXJ0IGFcbiAgICAgIC8vIHJlcGxhY2VtZW50IGNoYXIgKFUrRkZGRCkgYW5kIGFkdmFuY2Ugb25seSAxIGJ5dGVcbiAgICAgIGNvZGVQb2ludCA9IDB4RkZGRFxuICAgICAgYnl0ZXNQZXJTZXF1ZW5jZSA9IDFcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA+IDB4RkZGRikge1xuICAgICAgLy8gZW5jb2RlIHRvIHV0ZjE2IChzdXJyb2dhdGUgcGFpciBkYW5jZSlcbiAgICAgIGNvZGVQb2ludCAtPSAweDEwMDAwXG4gICAgICByZXMucHVzaChjb2RlUG9pbnQgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApXG4gICAgICBjb2RlUG9pbnQgPSAweERDMDAgfCBjb2RlUG9pbnQgJiAweDNGRlxuICAgIH1cblxuICAgIHJlcy5wdXNoKGNvZGVQb2ludClcbiAgICBpICs9IGJ5dGVzUGVyU2VxdWVuY2VcbiAgfVxuXG4gIHJldHVybiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkocmVzKVxufVxuXG4vLyBCYXNlZCBvbiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMjc0NzI3Mi82ODA3NDIsIHRoZSBicm93c2VyIHdpdGhcbi8vIHRoZSBsb3dlc3QgbGltaXQgaXMgQ2hyb21lLCB3aXRoIDB4MTAwMDAgYXJncy5cbi8vIFdlIGdvIDEgbWFnbml0dWRlIGxlc3MsIGZvciBzYWZldHlcbnZhciBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgdmFyIGxlbiA9IGNvZGVQb2ludHMubGVuZ3RoXG4gIGlmIChsZW4gPD0gTUFYX0FSR1VNRU5UU19MRU5HVEgpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNvZGVQb2ludHMpIC8vIGF2b2lkIGV4dHJhIHNsaWNlKClcbiAgfVxuXG4gIC8vIERlY29kZSBpbiBjaHVua3MgdG8gYXZvaWQgXCJjYWxsIHN0YWNrIHNpemUgZXhjZWVkZWRcIi5cbiAgdmFyIHJlcyA9ICcnXG4gIHZhciBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFxuICAgICAgU3RyaW5nLFxuICAgICAgY29kZVBvaW50cy5zbGljZShpLCBpICs9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKVxuICAgIClcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldICYgMHg3RilcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGxhdGluMVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGhleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICB2YXIgb3V0ID0gJydcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHZhciByZXMgPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyBieXRlc1tpICsgMV0gKiAyNTYpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgdmFyIG5ld0J1ZlxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBuZXdCdWYgPSB0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpXG4gICAgbmV3QnVmLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xpY2VMZW4gPSBlbmQgLSBzdGFydFxuICAgIG5ld0J1ZiA9IG5ldyBCdWZmZXIoc2xpY2VMZW4sIHVuZGVmaW5lZClcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlTGVuOyArK2kpIHtcbiAgICAgIG5ld0J1ZltpXSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdCdWZcbn1cblxuLypcbiAqIE5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgYnVmZmVyIGlzbid0IHRyeWluZyB0byB3cml0ZSBvdXQgb2YgYm91bmRzLlxuICovXG5mdW5jdGlvbiBjaGVja09mZnNldCAob2Zmc2V0LCBleHQsIGxlbmd0aCkge1xuICBpZiAoKG9mZnNldCAlIDEpICE9PSAwIHx8IG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdvZmZzZXQgaXMgbm90IHVpbnQnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gbGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVHJ5aW5nIHRvIGFjY2VzcyBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRMRSA9IGZ1bmN0aW9uIHJlYWRVSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG4gIH1cblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdXG4gIHZhciBtdWwgPSAxXG4gIHdoaWxlIChieXRlTGVuZ3RoID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiByZWFkVUludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgOCkgfCB0aGlzW29mZnNldCArIDFdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICgodGhpc1tvZmZzZXRdKSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikpICtcbiAgICAgICh0aGlzW29mZnNldCArIDNdICogMHgxMDAwMDAwKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludExFID0gZnVuY3Rpb24gcmVhZEludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludEJFID0gZnVuY3Rpb24gcmVhZEludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoXG4gIHZhciBtdWwgPSAxXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0taV1cbiAgd2hpbGUgKGkgPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1pXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiByZWFkSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICBpZiAoISh0aGlzW29mZnNldF0gJiAweDgwKSkgcmV0dXJuICh0aGlzW29mZnNldF0pXG4gIHJldHVybiAoKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gcmVhZEludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIDFdIHwgKHRoaXNbb2Zmc2V0XSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiByZWFkSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdKSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10gPDwgMjQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiByZWFkSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiByZWFkRmxvYXRMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiByZWFkRmxvYXRCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gcmVhZERvdWJsZUJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpXG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJidWZmZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyIGluc3RhbmNlJylcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IGlzIG91dCBvZiBib3VuZHMnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uIHdyaXRlVUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHhmZiwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQxNiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCAyKTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSAmICgweGZmIDw8ICg4ICogKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkpKSkgPj4+XG4gICAgICAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSAqIDhcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQzMiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgNCk7IGkgPCBqOyArK2kpIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgPj4+IChsaXR0bGVFbmRpYW4gPyBpIDogMyAtIGkpICogOCkgJiAweGZmXG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50TEUgPSBmdW5jdGlvbiB3cml0ZUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gMFxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgLSAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50QkUgPSBmdW5jdGlvbiB3cml0ZUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgKyAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uIHdyaXRlSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweDdmLCAtMHg4MClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuZnVuY3Rpb24gY2hlY2tJRUVFNzU0IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxuICBpZiAob2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvYXQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgNCwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gd3JpdGVGbG9hdExFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgOCwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbiAgcmV0dXJuIG9mZnNldCArIDhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiBjb3B5ICh0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXRTdGFydCA+PSB0YXJnZXQubGVuZ3RoKSB0YXJnZXRTdGFydCA9IHRhcmdldC5sZW5ndGhcbiAgaWYgKCF0YXJnZXRTdGFydCkgdGFyZ2V0U3RhcnQgPSAwXG4gIGlmIChlbmQgPiAwICYmIGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuIDBcbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgdGhpcy5sZW5ndGggPT09IDApIHJldHVybiAwXG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBpZiAodGFyZ2V0U3RhcnQgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICB9XG4gIGlmIChzdGFydCA8IDAgfHwgc3RhcnQgPj0gdGhpcy5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgaWYgKGVuZCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0IDwgZW5kIC0gc3RhcnQpIHtcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgKyBzdGFydFxuICB9XG5cbiAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0XG4gIHZhciBpXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCAmJiBzdGFydCA8IHRhcmdldFN0YXJ0ICYmIHRhcmdldFN0YXJ0IDwgZW5kKSB7XG4gICAgLy8gZGVzY2VuZGluZyBjb3B5IGZyb20gZW5kXG4gICAgZm9yIChpID0gbGVuIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2UgaWYgKGxlbiA8IDEwMDAgfHwgIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gYXNjZW5kaW5nIGNvcHkgZnJvbSBzdGFydFxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoXG4gICAgICB0YXJnZXQsXG4gICAgICB0aGlzLnN1YmFycmF5KHN0YXJ0LCBzdGFydCArIGxlbiksXG4gICAgICB0YXJnZXRTdGFydFxuICAgIClcbiAgfVxuXG4gIHJldHVybiBsZW5cbn1cblxuLy8gVXNhZ2U6XG4vLyAgICBidWZmZXIuZmlsbChudW1iZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKGJ1ZmZlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoc3RyaW5nWywgb2Zmc2V0WywgZW5kXV1bLCBlbmNvZGluZ10pXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiBmaWxsICh2YWwsIHN0YXJ0LCBlbmQsIGVuY29kaW5nKSB7XG4gIC8vIEhhbmRsZSBzdHJpbmcgY2FzZXM6XG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IHN0YXJ0XG4gICAgICBzdGFydCA9IDBcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBlbmRcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfVxuICAgIGlmICh2YWwubGVuZ3RoID09PSAxKSB7XG4gICAgICB2YXIgY29kZSA9IHZhbC5jaGFyQ29kZUF0KDApXG4gICAgICBpZiAoY29kZSA8IDI1Nikge1xuICAgICAgICB2YWwgPSBjb2RlXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2VuY29kaW5nIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJyAmJiAhQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMjU1XG4gIH1cblxuICAvLyBJbnZhbGlkIHJhbmdlcyBhcmUgbm90IHNldCB0byBhIGRlZmF1bHQsIHNvIGNhbiByYW5nZSBjaGVjayBlYXJseS5cbiAgaWYgKHN0YXJ0IDwgMCB8fCB0aGlzLmxlbmd0aCA8IHN0YXJ0IHx8IHRoaXMubGVuZ3RoIDwgZW5kKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ091dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHN0YXJ0ID0gc3RhcnQgPj4+IDBcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyB0aGlzLmxlbmd0aCA6IGVuZCA+Pj4gMFxuXG4gIGlmICghdmFsKSB2YWwgPSAwXG5cbiAgdmFyIGlcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgICAgdGhpc1tpXSA9IHZhbFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgYnl0ZXMgPSBCdWZmZXIuaXNCdWZmZXIodmFsKVxuICAgICAgPyB2YWxcbiAgICAgIDogdXRmOFRvQnl0ZXMobmV3IEJ1ZmZlcih2YWwsIGVuY29kaW5nKS50b1N0cmluZygpKVxuICAgIHZhciBsZW4gPSBieXRlcy5sZW5ndGhcbiAgICBmb3IgKGkgPSAwOyBpIDwgZW5kIC0gc3RhcnQ7ICsraSkge1xuICAgICAgdGhpc1tpICsgc3RhcnRdID0gYnl0ZXNbaSAlIGxlbl1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbnZhciBJTlZBTElEX0JBU0U2NF9SRSA9IC9bXitcXC8wLTlBLVphLXotX10vZ1xuXG5mdW5jdGlvbiBiYXNlNjRjbGVhbiAoc3RyKSB7XG4gIC8vIE5vZGUgc3RyaXBzIG91dCBpbnZhbGlkIGNoYXJhY3RlcnMgbGlrZSBcXG4gYW5kIFxcdCBmcm9tIHRoZSBzdHJpbmcsIGJhc2U2NC1qcyBkb2VzIG5vdFxuICBzdHIgPSBzdHJpbmd0cmltKHN0cikucmVwbGFjZShJTlZBTElEX0JBU0U2NF9SRSwgJycpXG4gIC8vIE5vZGUgY29udmVydHMgc3RyaW5ncyB3aXRoIGxlbmd0aCA8IDIgdG8gJydcbiAgaWYgKHN0ci5sZW5ndGggPCAyKSByZXR1cm4gJydcbiAgLy8gTm9kZSBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgYmFzZTY0IHN0cmluZ3MgKG1pc3NpbmcgdHJhaWxpbmcgPT09KSwgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHdoaWxlIChzdHIubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgIHN0ciA9IHN0ciArICc9J1xuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZnVuY3Rpb24gc3RyaW5ndHJpbSAoc3RyKSB7XG4gIGlmIChzdHIudHJpbSkgcmV0dXJuIHN0ci50cmltKClcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxuZnVuY3Rpb24gdG9IZXggKG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpXG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KVxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIHZhciBjb2RlUG9pbnRcbiAgdmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGhcbiAgdmFyIGxlYWRTdXJyb2dhdGUgPSBudWxsXG4gIHZhciBieXRlcyA9IFtdXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvZGVQb2ludCA9IHN0cmluZy5jaGFyQ29kZUF0KGkpXG5cbiAgICAvLyBpcyBzdXJyb2dhdGUgY29tcG9uZW50XG4gICAgaWYgKGNvZGVQb2ludCA+IDB4RDdGRiAmJiBjb2RlUG9pbnQgPCAweEUwMDApIHtcbiAgICAgIC8vIGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoIWxlYWRTdXJyb2dhdGUpIHtcbiAgICAgICAgLy8gbm8gbGVhZCB5ZXRcbiAgICAgICAgaWYgKGNvZGVQb2ludCA+IDB4REJGRikge1xuICAgICAgICAgIC8vIHVuZXhwZWN0ZWQgdHJhaWxcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2UgaWYgKGkgKyAxID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAvLyB1bnBhaXJlZCBsZWFkXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkIGxlYWRcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIDIgbGVhZHMgaW4gYSByb3dcbiAgICAgIGlmIChjb2RlUG9pbnQgPCAweERDMDApIHtcbiAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gdmFsaWQgc3Vycm9nYXRlIHBhaXJcbiAgICAgIGNvZGVQb2ludCA9IChsZWFkU3Vycm9nYXRlIC0gMHhEODAwIDw8IDEwIHwgY29kZVBvaW50IC0gMHhEQzAwKSArIDB4MTAwMDBcbiAgICB9IGVsc2UgaWYgKGxlYWRTdXJyb2dhdGUpIHtcbiAgICAgIC8vIHZhbGlkIGJtcCBjaGFyLCBidXQgbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgIH1cblxuICAgIGxlYWRTdXJyb2dhdGUgPSBudWxsXG5cbiAgICAvLyBlbmNvZGUgdXRmOFxuICAgIGlmIChjb2RlUG9pbnQgPCAweDgwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDEpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goY29kZVBvaW50KVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHg4MDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiB8IDB4QzAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDMpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgfCAweEUwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSA0KSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHgxMiB8IDB4RjAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29kZSBwb2ludCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIHZhciBjLCBoaSwgbG9cbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG5cbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShiYXNlNjRjbGVhbihzdHIpKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSkgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiBpc25hbiAodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IHZhbCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNlbGYtY29tcGFyZVxufVxuIiwidmFyIGRlZ3JlZXMgPSAxODAgLyBNYXRoLlBJO1xuXG5leHBvcnQgdmFyIGlkZW50aXR5ID0ge1xuICB0cmFuc2xhdGVYOiAwLFxuICB0cmFuc2xhdGVZOiAwLFxuICByb3RhdGU6IDAsXG4gIHNrZXdYOiAwLFxuICBzY2FsZVg6IDEsXG4gIHNjYWxlWTogMVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYiwgYywgZCwgZSwgZikge1xuICB2YXIgc2NhbGVYLCBzY2FsZVksIHNrZXdYO1xuICBpZiAoc2NhbGVYID0gTWF0aC5zcXJ0KGEgKiBhICsgYiAqIGIpKSBhIC89IHNjYWxlWCwgYiAvPSBzY2FsZVg7XG4gIGlmIChza2V3WCA9IGEgKiBjICsgYiAqIGQpIGMgLT0gYSAqIHNrZXdYLCBkIC09IGIgKiBza2V3WDtcbiAgaWYgKHNjYWxlWSA9IE1hdGguc3FydChjICogYyArIGQgKiBkKSkgYyAvPSBzY2FsZVksIGQgLz0gc2NhbGVZLCBza2V3WCAvPSBzY2FsZVk7XG4gIGlmIChhICogZCA8IGIgKiBjKSBhID0gLWEsIGIgPSAtYiwgc2tld1ggPSAtc2tld1gsIHNjYWxlWCA9IC1zY2FsZVg7XG4gIHJldHVybiB7XG4gICAgdHJhbnNsYXRlWDogZSxcbiAgICB0cmFuc2xhdGVZOiBmLFxuICAgIHJvdGF0ZTogTWF0aC5hdGFuMihiLCBhKSAqIGRlZ3JlZXMsXG4gICAgc2tld1g6IE1hdGguYXRhbihza2V3WCkgKiBkZWdyZWVzLFxuICAgIHNjYWxlWDogc2NhbGVYLFxuICAgIHNjYWxlWTogc2NhbGVZXG4gIH07XG59XG4iLCJpbXBvcnQgZGVjb21wb3NlLCB7aWRlbnRpdHl9IGZyb20gXCIuL2RlY29tcG9zZVwiO1xuXG52YXIgY3NzTm9kZSxcbiAgICBjc3NSb290LFxuICAgIGNzc1ZpZXcsXG4gICAgc3ZnTm9kZTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ3NzKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gXCJub25lXCIpIHJldHVybiBpZGVudGl0eTtcbiAgaWYgKCFjc3NOb2RlKSBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKSwgY3NzUm9vdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgY3NzVmlldyA9IGRvY3VtZW50LmRlZmF1bHRWaWV3O1xuICBjc3NOb2RlLnN0eWxlLnRyYW5zZm9ybSA9IHZhbHVlO1xuICB2YWx1ZSA9IGNzc1ZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShjc3NSb290LmFwcGVuZENoaWxkKGNzc05vZGUpLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKFwidHJhbnNmb3JtXCIpO1xuICBjc3NSb290LnJlbW92ZUNoaWxkKGNzc05vZGUpO1xuICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDcsIC0xKS5zcGxpdChcIixcIik7XG4gIHJldHVybiBkZWNvbXBvc2UoK3ZhbHVlWzBdLCArdmFsdWVbMV0sICt2YWx1ZVsyXSwgK3ZhbHVlWzNdLCArdmFsdWVbNF0sICt2YWx1ZVs1XSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVN2Zyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIGlkZW50aXR5O1xuICBpZiAoIXN2Z05vZGUpIHN2Z05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XG4gIHN2Z05vZGUuc2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIsIHZhbHVlKTtcbiAgaWYgKCEodmFsdWUgPSBzdmdOb2RlLnRyYW5zZm9ybS5iYXNlVmFsLmNvbnNvbGlkYXRlKCkpKSByZXR1cm4gaWRlbnRpdHk7XG4gIHZhbHVlID0gdmFsdWUubWF0cml4O1xuICByZXR1cm4gZGVjb21wb3NlKHZhbHVlLmEsIHZhbHVlLmIsIHZhbHVlLmMsIHZhbHVlLmQsIHZhbHVlLmUsIHZhbHVlLmYpO1xufVxuIiwiZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSAoZSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSAobSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICgodmFsdWUgKiBjKSAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJleHBvcnQgY29uc3QgY2hhcnQgPSAoKSA9PiB7XG4gIGxldCBtYXJnaW4gPSB7IGxlZnQ6IDEyMCwgcmlnaHQ6IDIwLCB0b3A6IDEwLCBib3R0b206IDEzMCB9O1xuXG4gIGxldCB3aWR0aCA9IDEzMDAgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodDtcbiAgbGV0IGhlaWdodCA9IDcwMCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xuXG4gIGxldCBnID0gZDNcbiAgICAuc2VsZWN0KFwiI2NoYXJ0XCIpXG4gICAgLmFwcGVuZChcInN2Z1wiKVxuICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGggKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodClcbiAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSlcbiAgICAuYXBwZW5kKFwiZ1wiKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgbWFyZ2luLmxlZnQgKyBcIiwgXCIgKyBtYXJnaW4udG9wICsgXCIpXCIpO1xuXG4gIC8vIFggTGFiZWxcbiAgZy5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgLmF0dHIoXCJ5XCIsIGhlaWdodCArIDUwKVxuICAgIC5hdHRyKFwieFwiLCB3aWR0aCAvIDIpXG4gICAgLmF0dHIoXCJmb250LXNpemVcIiwgXCIyMHB4XCIpXG4gICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgIC50ZXh0KFwiWWVhclwiKTtcblxuICAvLyBZIExhYmVsXG4gIGcuYXBwZW5kKFwidGV4dFwiKVxuICAgIC5hdHRyKFwieVwiLCAtNjApXG4gICAgLmF0dHIoXCJ4XCIsIC0oaGVpZ2h0IC8gMikpXG4gICAgLmF0dHIoXCJmb250LXNpemVcIiwgXCIyMHB4XCIpXG4gICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwicm90YXRlKC05MClcIilcbiAgICAudGV4dChcIlRvdGFsIEFjcXVpc2l0aW9ucywgVVNEXCIpO1xuXG4gIGQzLmpzb24oXCIuLi9kYXRhL2FjcXVpc2l0aW9ucy9vYmplY3QuanNvblwiKS50aGVuKGRhdGEgPT4ge1xuICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICBkYXRhID0gZGF0YS5zbGljZSgpLnNvcnQoKGEsIGIpID0+IGQzLmFzY2VuZGluZyhhLnllYXIsIGIueWVhcikpO1xuXG4gICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcblxuICAgIGRhdGEuZm9yRWFjaChkID0+IHtcbiAgICAgIGQucHJpY2UgPSArZC5wcmljZTtcbiAgICAgIC8vY29uc29sZS5sb2coZC5wcmljZSk7XG4gICAgfSk7XG5cbiAgICBsZXQgeCA9IGQzXG4gICAgICAuc2NhbGVCYW5kKClcbiAgICAgIC5kb21haW4oXG4gICAgICAgIGRhdGEubWFwKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4gZC55ZWFyO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnJhbmdlKFswLCB3aWR0aF0pXG4gICAgICAucGFkZGluZygwLjIpO1xuXG4gICAgbGV0IHkgPSBkM1xuICAgICAgLnNjYWxlTGluZWFyKClcbiAgICAgIC5kb21haW4oW1xuICAgICAgICBkMy5taW4oZGF0YSwgZCA9PiB7XG4gICAgICAgICAgcmV0dXJuIDFlOSAqIE1hdGguZmxvb3IoZC5wcmljZSAvIDFlOSk7XG4gICAgICAgIH0pLFxuICAgICAgICBkMy5tYXgoZGF0YSwgZCA9PiB7XG4gICAgICAgICAgcmV0dXJuIDFlOSAqIE1hdGguY2VpbChkLnByaWNlIC8gMWU5KTtcbiAgICAgICAgfSlcbiAgICAgIF0pXG4gICAgICAubmljZSg3KVxuICAgICAgLnJhbmdlKFtoZWlnaHQsIDBdKTtcblxuICAgIC8vICAgeyByZXR1cm4gMWU5Kk1hdGguZmxvb3IoZFtcIlRheCBDb2xsZWN0aW9uXCJdLzFlOSk7IH0sXG4gICAgLy8gZDMubWF4KCBkYXRhLCBmdW5jdGlvbihkKXsgcmV0dXJuIDFlOSpNYXRoLmNlaWwoZFtcIlRheCBDb2xsZWN0aW9uXCJdLzFlOSk7IH1cblxuICAgIC8vIFggQXhpc1xuICAgIGxldCB4QXhpc0NhbGwgPSBkMy5heGlzQm90dG9tKHgpO1xuICAgIGcuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInggYXhpc1wiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCxcIiArIGhlaWdodCArIFwiKVwiKVxuICAgICAgLmNhbGwoeEF4aXNDYWxsKTtcblxuICAgIC8vIFkgQXhpc1xuICAgIGxldCB5QXhpc0NhbGwgPSBkM1xuICAgICAgLmF4aXNMZWZ0KHkpXG4gICAgICAvLyAudGlja3MoNylcbiAgICAgIC50aWNrRm9ybWF0KGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgaWYgKGQgIT09IDApIHtcbiAgICAgICAgICByZXR1cm4gXCIkXCIgKyBkIC8gMTAwMDAwMDAwMCArIFwiQlwiO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICBnLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ5IGF4aXNcIilcbiAgICAgIC8vIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsXCIgLSA1MCArIFwiKVwiKVxuICAgICAgLmNhbGwoeUF4aXNDYWxsKTtcblxuICAgIGxldCByZWN0cyA9IGcuc2VsZWN0QWxsKFwicmVjdFwiKS5kYXRhKGRhdGEpO1xuXG4gICAgLy9jb25zb2xlLmxvZyhoZWlnaHQpO1xuXG4gICAgcmVjdHNcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgLmF0dHIoXCJ5XCIsIGQgPT4ge1xuICAgICAgICByZXR1cm4geShkLnByaWNlKTtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcInhcIiwgZCA9PiB7XG4gICAgICAgIC8vY29uc29sZS5sb2coeChkLnllYXIpKTtcbiAgICAgICAgcmV0dXJuIHgoZC55ZWFyKTtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcImhlaWdodFwiLCBkID0+IHtcbiAgICAgICAgcmV0dXJuIGhlaWdodCAtIHkoZC5wcmljZSk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB4LmJhbmR3aWR0aClcbiAgICAgIC5hdHRyKFwiZmlsbFwiLCBcIm9yYW5nZVwiKTtcbiAgfSk7XG59O1xuIiwiaW1wb3J0IHsgY2hhcnQgfSBmcm9tIFwiLi9iYXJfY2hhcnRcIjtcbmltcG9ydCB7IGludGVyYWN0aXZlQ2hhcnQgfSBmcm9tIFwiLi9pbnRlcmFjdGl2ZV9jaGFydFwiO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIC8vIGNvbnNvbGUubG9nKFwiaGVsbG8yXCIpO1xuICBjaGFydCgpO1xuICBpbnRlcmFjdGl2ZUNoYXJ0KCk7XG59KTtcbiIsImltcG9ydCB7IFNsb3dCdWZmZXIgfSBmcm9tIFwiYnVmZmVyXCI7XG5pbXBvcnQgeyBwYXJzZVN2ZyB9IGZyb20gXCJkMy1pbnRlcnBvbGF0ZS9zcmMvdHJhbnNmb3JtL3BhcnNlXCI7XG5cbmV4cG9ydCBjb25zdCBpbnRlcmFjdGl2ZUNoYXJ0ID0gKCkgPT4ge1xuICBjb25zb2xlLmxvZyhcImdpdGh1YiB0ZXN0XCIpO1xuICBsZXQgbWFyZ2luID0geyBsZWZ0OiA4MCwgcmlnaHQ6IDIwLCB0b3A6IDUwLCBib3R0b206IDEwMCB9O1xuXG4gIGxldCB3aWR0aCA9IDkwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuICBsZXQgaGVpZ2h0ID0gNzAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG5cbiAgbGV0IGZsYWcgPSB0cnVlO1xuXG4gIHZhciB0ID0gZDMudHJhbnNpdGlvbigpLmR1cmF0aW9uKDc1MCk7XG5cbiAgbGV0IHN2ZyA9IGQzXG4gICAgLnNlbGVjdChcIiNpbnRlclwiKVxuICAgIC5hcHBlbmQoXCJzdmdcIilcbiAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXG4gICAgLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsIFwiICsgbWFyZ2luLnRvcCArIFwiKVwiKTtcblxuICAvLyAgIC8vIFggU2NhbGVcbiAgbGV0IHgwID0gZDNcbiAgICAuc2NhbGVCYW5kKClcbiAgICAucmFuZ2UoWzAsIHdpZHRoXSlcbiAgICAucGFkZGluZygwLjEpO1xuXG4gIGxldCB4MSA9IGQzLnNjYWxlQmFuZCgpO1xuXG4gIGQzLnNlbGVjdChcIiNnb2JhY2stYnV0dG9uXCIpLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIik7XG5cbiAgbGV0IHJhd0RhdGE7XG4gIGxldCB0ZXN0RGF0YTtcblxuICBsZXQgaW50ZXJ2YWw7XG4gIGxldCBjbGVhbkRhdGE7XG5cbiAgbGV0IGJhclN0ZXAgPSAyNztcblxuICBsZXQgYmFyUGFkZGluZyA9IDMgLyBiYXJTdGVwO1xuXG4gIC8vICAgLy8gWSBTY2FsZVxuICBsZXQgeSA9IGQzXG4gICAgLnNjYWxlTGluZWFyKClcbiAgICAucmFuZ2UoW2hlaWdodCwgMF0pXG4gICAgLm5pY2UoNyk7XG5cbiAgbGV0IHhBeGlzID0gZDMuYXhpc0JvdHRvbSh4MCkudGlja1NpemUoMCk7XG5cbiAgbGV0IHlBeGlzID0gZDMuYXhpc0xlZnQoeSkudGlja0Zvcm1hdChmdW5jdGlvbihkKSB7XG4gICAgaWYgKGQgIT09IDAgJiYgZCA8IDEwMDAwMDAwMDApIHtcbiAgICAgIHJldHVybiBcIiRcIiArIGQgLyAxMDAwMDAwICsgXCJNXCI7XG4gICAgfSBlbHNlIGlmIChkICE9PSAwKSB7XG4gICAgICByZXR1cm4gXCIkXCIgKyBkIC8gMTAwMDAwMDAwMCArIFwiQlwiO1xuICAgIH1cbiAgfSk7XG5cbiAgbGV0IHRpcCA9IGQzXG4gICAgLnRpcCgpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBcImQzLXRpcFwiKVxuICAgIC5kaXJlY3Rpb24oXCJlXCIpIC8vIFBvc2l0aW9uIHRoZSB0b29sdGlwIHRvIHRoZSByaWdodCBvZiBhIHRhcmdldCBlbGVtZW50XG4gICAgLm9mZnNldChbLTEwLCAwXSlcbiAgICAuaHRtbChmdW5jdGlvbihkKSB7XG4gICAgICBsZXQgdGV4dCA9XG4gICAgICAgIFwiPHN0cm9uZz5Db21wYW55Ojwvc3Ryb25nPiA8c3BhbiBzdHlsZT0nY29sb3I6cmVkJz5cIiArXG4gICAgICAgIGQuY29tcGFueSArXG4gICAgICAgIFwiPC9zcGFuPjxicj5cIjtcbiAgICAgIHRleHQgKz1cbiAgICAgICAgXCI8c3Ryb25nPlNlY3Rvcjo8L3N0cm9uZz4gPHNwYW4gc3R5bGU9J2NvbG9yOnJlZDt0ZXh0LXRyYW5zZm9ybTpjYXBpdGFsaXplJz5cIiArXG4gICAgICAgIGQuc2VjdG9yICtcbiAgICAgICAgXCI8L3NwYW4+PGJyPlwiO1xuICAgICAgdGV4dCArPVxuICAgICAgICBcIjxzdHJvbmc+Um91bmQ6PC9zdHJvbmc+IDxzcGFuIHN0eWxlPSdjb2xvcjpyZWQnPlwiICtcbiAgICAgICAgZC5yb3VuZCArXG4gICAgICAgIFwiPC9zcGFuPjxicj5cIjtcbiAgICAgIHRleHQgKz1cbiAgICAgICAgXCI8c3Ryb25nPkFtb3VudCBSYWlzZWQ6PC9zdHJvbmc+IDxzcGFuIHN0eWxlPSdjb2xvcjpyZWQnPlwiICtcbiAgICAgICAgZDMuZm9ybWF0KFwiJCwuMGZcIikoZC5hbW91bnRSYWlzZWQpICtcbiAgICAgICAgXCI8L3NwYW4+PGJyPlwiO1xuICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfSk7XG5cbiAgbGV0IHRpbWVMYWJlbCA9IHN2Z1xuICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBcImxhYmVsXCIpXG4gICAgLmF0dHIoXCJ5XCIsIGhlaWdodCArIDUwKVxuICAgIC5hdHRyKFwieFwiLCB3aWR0aCAtIDQwKVxuICAgIC8vIC5hdHRyKFwiZm9udC1zaXplXCIsIFwiNDBweFwiKVxuICAgIC8vIC5hdHRyKFwib3BhY2l0eVwiLCBcIjAuNFwiKVxuICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAudGV4dChcIjIwMDBcIik7XG5cbiAgbGV0IHNlY3RvcnMgPSBbXCJtb2JpbGVcIiwgXCJzb2Z0d2FyZVwiLCBcIndlYlwiLCBcImVjb21tZXJjZVwiLCBcIm1lZGljYWxcIl07XG4gIGxldCByb3VuZHMgPSBbXCJzZXJpZXMtYVwiLCBcInNlcmllcy1iXCIsIFwiYW5nZWxcIiwgXCJzZXJpZXMtYytcIiwgXCJ2ZW50dXJlXCJdO1xuXG4gIHgwLmRvbWFpbihyb3VuZHMpO1xuICB4MS5kb21haW4oc2VjdG9ycykucmFuZ2VSb3VuZChbMCwgeDAuYmFuZHdpZHRoKCldKTtcblxuICB4MC5pbnZlcnQgPSBmdW5jdGlvbih4KSB7XG4gICAgdmFyIGRvbWFpbiA9IHgwLmRvbWFpbigpO1xuICAgIHZhciByYW5nZSA9IHgwLnJhbmdlKCk7XG4gICAgdmFyIHNjYWxlID0gZDNcbiAgICAgIC5zY2FsZVF1YW50aXplKClcbiAgICAgIC5yYW5nZShkb21haW4pXG4gICAgICAuZG9tYWluKHJhbmdlKTtcbiAgICByZXR1cm4gc2NhbGUoeCk7XG4gIH07XG5cbiAgc3ZnXG4gICAgLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIFwieSBheGlzXCIpXG4gICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIik7XG4gIC8vLmNhbGwoeUF4aXMpO1xuXG4gIHN2Z1xuICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBcImxhYmVsXCIpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGUoLTkwKVwiKVxuICAgIC5hdHRyKFwieVwiLCA2KVxuICAgIC5hdHRyKFwiZHlcIiwgXCIuNzFlbVwiKVxuICAgIC5zdHlsZShcInRleHQtYW5jaG9yXCIsIFwiZW5kXCIpXG4gICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCJib2xkXCIpXG4gICAgLnRleHQoXCJWYWx1ZVwiKTtcblxuICAvLyB2YXIgeEF4aXNHcm91cCA9IGdcbiAgLy8gICAgIC5hcHBlbmQoXCJnXCIpXG4gIC8vICAgICAuYXR0cihcImNsYXNzXCIsIFwieCBheGlzXCIpXG4gIC8vICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwLFwiICsgaGVpZ2h0ICsgXCIpXCIpO1xuXG4gIC8vICAgdmFyIHlBeGlzR3JvdXAgPSBnLmFwcGVuZChcImdcIikuYXR0cihcImNsYXNzXCIsIFwieSBheGlzXCIpO1xuXG4gIC8vIHZhciBjb2xvciA9IGQzLnNjYWxlXG4gIC8vICAgLm9yZGluYWwoKVxuICAvLyAgIC5yYW5nZShbXCIjY2EwMDIwXCIsIFwiI2Y0YTU4MlwiLCBcIiNkNWQ1ZDVcIiwgXCIjOTJjNWRlXCIsIFwiIzA1NzFiMFwiXSk7XG5cbiAgdmFyIGNvbG9yID0gZDMuc2NhbGVPcmRpbmFsKGQzLnNjaGVtZVNldDEpO1xuXG4gIGxldCB0aW1lID0gMDtcblxuICBsZXQgeDMgPSBkMy5zY2FsZUxpbmVhcigpLnJhbmdlKFttYXJnaW4ubGVmdCwgd2lkdGggLSBtYXJnaW4ucmlnaHRdKTtcblxuICBsZXQgeEF4aXMyID0gZyA9PlxuICAgIGdcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ4LWF4aXNcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoMCAsJHttYXJnaW4udG9wfSlgKVxuICAgICAgLmNhbGwoZDMuYXhpc1RvcCh4MykudGlja3Mod2lkdGggLyAxNTAsIFwic1wiKSlcbiAgICAgIC5jYWxsKGcgPT4gKGcuc2VsZWN0aW9uID8gZy5zZWxlY3Rpb24oKSA6IGcpLnNlbGVjdChcIi5kb21haW5cIikucmVtb3ZlKCkpO1xuXG4gIGxldCB5QXhpczIgPSBnID0+XG4gICAgZ1xuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInktYXhpc1wiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgke21hcmdpbi5sZWZ0ICsgMC41fSwwKWApXG4gICAgICAuY2FsbChnID0+XG4gICAgICAgIGdcbiAgICAgICAgICAuYXBwZW5kKFwibGluZVwiKVxuICAgICAgICAgIC5hdHRyKFwic3Ryb2tlXCIsIFwiY3VycmVudENvbG9yXCIpXG4gICAgICAgICAgLmF0dHIoXCJ5MVwiLCBtYXJnaW4udG9wKVxuICAgICAgICAgIC5hdHRyKFwieTJcIiwgaGVpZ2h0IC0gbWFyZ2luLmJvdHRvbSAtIDUwKVxuICAgICAgKTtcblxuICBkMy5qc29uKFwiLi9kYXRhL2Z1bmRpbmcvdGVzdF9kYXRhLmpzb25cIikudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgdGVzdERhdGEgPSBkYXRhO1xuICB9KTtcblxuICBkMy5qc29uKFwiLi9kYXRhL2Z1bmRpbmcvY2xlYW5fbmV3X2Z1bmRpbmcuanNvblwiKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcblxuICAgIC8vIHJhd0RhdGEgPSBkYXRhO1xuXG4gICAgLy8gY2xlYW5EYXRhID0gZDNcbiAgICAvLyAgIC5uZXN0KClcbiAgICAvLyAgIC8vICAgICAvLyAua2V5KGZ1bmN0aW9uKGQpIHtcbiAgICAvLyAgIC8vICAgICAvLyAgIHJldHVybiBkLmZ1bmRlZDtcbiAgICAvLyAgIC8vICAgICAvLyB9KVxuICAgIC8vICAgLmtleShmdW5jdGlvbihkKSB7XG4gICAgLy8gICAgIHJldHVybiBkLmZ1bmRlZDtcbiAgICAvLyAgIH0pXG4gICAgLy8gICAuc29ydEtleXMoZDMuYXNjZW5kaW5nKVxuICAgIC8vICAgLmtleShmdW5jdGlvbihkKSB7XG4gICAgLy8gICAgIHJldHVybiBkLnJvdW5kO1xuICAgIC8vICAgfSlcbiAgICAvLyAgIC5rZXkoZnVuY3Rpb24oZCkge1xuICAgIC8vICAgICByZXR1cm4gZC5zZWN0b3I7XG4gICAgLy8gICB9KVxuICAgIC8vICAgLnJvbGx1cChmdW5jdGlvbih2KSB7XG4gICAgLy8gICAgIHJldHVybiBkMy5zdW0odiwgZnVuY3Rpb24oZCkge1xuICAgIC8vICAgICAgIHJldHVybiBkLmFtb3VudFJhaXNlZDtcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gICB9KVxuICAgIC8vICAgLmVudHJpZXMocmF3RGF0YSk7XG5cbiAgICBjbGVhbkRhdGEgPSBkYXRhO1xuXG4gICAgY29uc29sZS5sb2codGVzdERhdGEpO1xuXG4gICAgLy8gdmFyIHJvdW5kcyA9IGNsZWFuRGF0YS5tYXAoZnVuY3Rpb24oZCkge1xuICAgIC8vICAgcmV0dXJuIGQudmFsdWVzXG4gICAgLy8gICAgIC5maWx0ZXIoZWxlID0+IHtcbiAgICAvLyAgICAgICBpZiAoZWxlLmtleSkgcmV0dXJuIGVsZS5rZXk7XG4gICAgLy8gICAgIH0pXG4gICAgLy8gICAgIC5tYXAoZWxlMiA9PiB7XG4gICAgLy8gICAgICAgcmV0dXJuIGVsZTIua2V5O1xuICAgIC8vICAgICB9KTtcbiAgICAvLyB9KTtcblxuICAgIGxldCBlbGVtZW50cyA9IGNsZWFuRGF0YVswXS52YWx1ZXMubWFwKGVsZSA9PiB7XG4gICAgICByZXR1cm4gZWxlO1xuICAgIH0pO1xuXG4gICAgLy8geDEuZG9tYWluKHNlY3RvcnMpLnJhbmdlUm91bmQoWzAsIHgwLmJhbmR3aWR0aCgpXSk7XG5cbiAgICAvLyB4MS5kb21haW4oXG4gICAgLy8gICBjbGVhbkRhdGFbMF0udmFsdWVzWzBdLnZhbHVlcy5tYXAoZWxlID0+IHtcbiAgICAvLyAgICAgcmV0dXJuIGVsZS5rZXk7XG4gICAgLy8gICB9KVxuICAgIC8vICkucmFuZ2VSb3VuZChbMCwgeDAuYmFuZHdpZHRoKCldKTtcblxuICAgIC8vIHkuZG9tYWluKFtcbiAgICAvLyAgIDAsXG4gICAgLy8gICBkMy5tYXgoY2xlYW5EYXRhWzBdLnZhbHVlcywgZnVuY3Rpb24ocm91bmRzKSB7XG4gICAgLy8gICAgIHJldHVybiBkMy5tYXgocm91bmRzLnZhbHVlcywgZnVuY3Rpb24oZCkge1xuICAgIC8vICAgICAgIHJldHVybiBkLnZhbHVlO1xuICAgIC8vICAgICB9KTtcbiAgICAvLyAgIH0pXG4gICAgLy8gXSk7XG5cbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwieCBheGlzXCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwLFwiICsgaGVpZ2h0ICsgXCIpXCIpXG4gICAgICAuY2FsbCh4QXhpcyk7XG5cbiAgICAvLyBkMy5pbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAvLyAgIC8vIEF0IHRoZSBlbmQgb2Ygb3VyIGRhdGEsIGxvb3AgYmFja1xuICAgIC8vICAgdGltZSA9IHRpbWUgPCAxNCA/IHRpbWUgKyAxIDogMDtcbiAgICAvLyAgIHVwZGF0ZShjbGVhbkRhdGFbdGltZV0pO1xuICAgIC8vIH0sIDUwMDApO1xuXG4gICAgLy8gRmlyc3QgcnVuIG9mIHRoZSB2aXN1YWxpemF0aW9uXG4gICAgdXBkYXRlKGNsZWFuRGF0YVswXSk7XG4gIH0pO1xuXG4gIC8vIGxldCBidXR0b24gPSBkMy5zZWxlY3QoXCIjcGxheS1idXR0b25cIik7XG4gIC8vIGNvbnNvbGUubG9nKGJ1dHRvbik7XG5cbiAgJChcIiNwbGF5LWJ1dHRvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgIGxldCBidXR0b24gPSAkKHRoaXMpO1xuICAgIGlmIChidXR0b24udGV4dCgpID09IFwiUGxheVwiKSB7XG4gICAgICBidXR0b24udGV4dChcIlBhdXNlXCIpO1xuICAgICAgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChzdGVwLCAzMDAwKTtcbiAgICAgIHN0ZXAoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnV0dG9uLnRleHQoXCJQbGF5XCIpO1xuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgfVxuICB9KTtcblxuICAkKFwiI3Jlc2V0LWJ1dHRvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgIHRpbWUgPSAwO1xuICAgIHVwZGF0ZShjbGVhbkRhdGFbMF0pO1xuICB9KTtcblxuICAkKFwiI2dvYmFjay1idXR0b25cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICByZXN0b3JlKCk7XG4gIH0pO1xuXG4gICQoXCIjaW5kdXN0cnktc2VsZWN0XCIpLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKCkge1xuICAgIHVwZGF0ZShjbGVhbkRhdGFbdGltZV0pO1xuICB9KTtcblxuICAkKFwiI2RhdGUtc2xpZGVyXCIpLnNsaWRlcih7XG4gICAgbWF4OiAyMDEzLFxuICAgIG1pbjogMjAwMCxcbiAgICBzdGVwOiAxLFxuICAgIGFuaW1hdGU6IFwic2xvd1wiLFxuICAgIHNsaWRlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcbiAgICAgIHRpbWUgPSB1aS52YWx1ZSAtIDIwMDA7XG4gICAgICB1cGRhdGUoY2xlYW5EYXRhW3RpbWVdKTtcbiAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHN0ZXAoKSB7XG4gICAgLy8gQXQgdGhlIGVuZCBvZiBvdXIgZGF0YSwgbG9vcCBiYWNrXG4gICAgdGltZSA9IHRpbWUgPCAxNCA/IHRpbWUgKyAxIDogMDtcbiAgICB1cGRhdGUoY2xlYW5EYXRhW3RpbWVdKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZShkYXRhKSB7XG4gICAgbGV0IGVsZW1lbnRzID0gZGF0YS52YWx1ZXMubWFwKGVsZSA9PiB7XG4gICAgICByZXR1cm4gZWxlO1xuICAgIH0pO1xuXG4gICAgLy8gZGF0YSA9IGRhdGEuc2xpY2UoKS5hcnJheS5mb3JFYWNoKGVsZW1lbnQgPT4ge30pO1xuXG4gICAgeS5kb21haW4oW1xuICAgICAgMCxcbiAgICAgIGQzLm1heChkYXRhLnZhbHVlcywgZnVuY3Rpb24ocm91bmRzKSB7XG4gICAgICAgIHJldHVybiBkMy5tYXgocm91bmRzLnZhbHVlcywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiBkLnZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgXSk7XG5cbiAgICAvLy5jYWxsKHlBeGlzKTtcblxuICAgIGxldCBzbGljZTIgPSBzdmdcbiAgICAgIC5zZWxlY3RBbGwoXCIuc2xpY2VcIilcbiAgICAgIC5kYXRhKGRhdGEudmFsdWVzKVxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwiZ1wiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gXCJ0cmFuc2xhdGUoXCIgKyB4MChkLmtleSkgKyBcIiwwKVwiO1xuICAgICAgfSk7XG5cbiAgICBsZXQgcmVjdHMgPSBzbGljZTIuc2VsZWN0QWxsKFwicmVjdFwiKS5kYXRhKGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBkLnZhbHVlcy5maWx0ZXIoZnVuY3Rpb24oZCkge1xuICAgICAgICBpZiAoZDMuc2VsZWN0KFwiI2luZHVzdHJ5LXNlbGVjdFwiKS5ub2RlKCkudmFsdWUgPT0gXCJhbGxcIikge1xuICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBkLmtleSA9PSBkMy5zZWxlY3QoXCIjaW5kdXN0cnktc2VsZWN0XCIpLm5vZGUoKS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzdmdcbiAgICAgIC5zZWxlY3RBbGwoXCJyZWN0XCIpXG4gICAgICAudHJhbnNpdGlvbih0KVxuICAgICAgLmRlbGF5KGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiA1MDtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiB5KDApO1xuICAgICAgfSlcbiAgICAgIC5yZW1vdmUoKTtcblxuICAgIGNvbnNvbGUubG9nKHJlY3RzKTtcblxuICAgIHJlY3RzXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAgIC8vIC5hdHRyKFwiY2xhc3NcIiwgXCJlbnRlclwiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB4MS5iYW5kd2lkdGgpXG4gICAgICAuYXR0cihcInhcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKHgxKGQua2V5KSwgZC5rZXkpO1xuICAgICAgICByZXR1cm4geDEoZC5rZXkpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiZGF0YS1sZWdlbmRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC5rZXk7XG4gICAgICB9KVxuICAgICAgLnN0eWxlKFwiZmlsbFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBjb2xvcihkLmtleSk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIHkoMCk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0pXG4gICAgICAub24oXCJjbGlja1wiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIGxldCByb3VuZCA9IHgwLmludmVydChcbiAgICAgICAgICBwYXJzZVN2ZyhkMy5zZWxlY3QodGhpcy5wYXJlbnROb2RlKS5hdHRyKFwidHJhbnNmb3JtXCIpKS50cmFuc2xhdGVYXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gZDMuc2VsZWN0KFwiZ1wiKS5cbiAgICAgICAgLy8gdHJhbnNpdGlvbih0KS5yZW1vdmUoKTtcbiAgICAgICAgZHJpbGxEb3duKGQsIHNsaWNlMiwgcm91bmQpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnN0eWxlKFwiZmlsbFwiLCBkMy5yZ2IoY29sb3IoZC5rZXkpKS5kYXJrZXIoMikpO1xuICAgICAgfSlcbiAgICAgIC5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnN0eWxlKFwiZmlsbFwiLCBjb2xvcihkLmtleSkpO1xuICAgICAgfSlcbiAgICAgIC5vbihcImNoYW5nZVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIGlmIChkMy5zZWxlY3QoXCIjcGxheS1idXR0b25cIikudGV4dCgpID09PSBcIlBsYXlcIikge1xuICAgICAgICAgIGQzLnNlbGVjdEFsbChcInJlY3RcIilcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigxMDApXG4gICAgICAgICAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICByZXR1cm4geShkLnZhbHVlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoZWlnaHQgLSB5KGQudmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIC8vLm1lcmdlKHJlY3RzKVxuICAgICAgLnRyYW5zaXRpb24odClcbiAgICAgIC5kZWxheShmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogMTAwMDtcbiAgICAgIH0pXG4gICAgICAvLy5kdXJhdGlvbig1MDApXG4gICAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4geShkLnZhbHVlKTtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBoZWlnaHQgLSB5KGQudmFsdWUpO1xuICAgICAgfSk7XG5cbiAgICBsZXQgcmVjdHMyID0gc2xpY2UyLnNlbGVjdEFsbChcInJlY3RcIik7XG4gICAgbGV0IGJ1dHRvbjIgPSBkMy5zZWxlY3QoXCIjcGxheS1idXR0b25cIik7XG5cbiAgICBzdmdcbiAgICAgIC5zZWxlY3RBbGwoXCJnLnkuYXhpc1wiKVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAuZGVsYXkoMzAwKVxuICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIilcbiAgICAgIC5jYWxsKHlBeGlzKTtcbiAgICBzdmcuc2VsZWN0QWxsKFwiZy5sZWdlbmRcIikucmVtb3ZlKCk7XG5cbiAgICBkcmF3TGVnZW5kLmNhbGwodGhpcyk7XG5cbiAgICAvLyBkMy5zZWxlY3RBbGwoXCIueVwiKVxuICAgIC8vICAgLnRyYW5zaXRpb24oKVxuICAgIC8vICAgLmR1cmF0aW9uKDEwMDApXG4gICAgLy8gICAuZGVsYXkoMzAwKVxuICAgIC8vICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIik7XG5cbiAgICB0aW1lTGFiZWwudGV4dCgrKHRpbWUgKyAyMDAwKSk7XG5cbiAgICAkKFwiI3llYXJcIilbMF0uaW5uZXJIVE1MID0gKyh0aW1lICsgMjAwMCk7XG5cbiAgICAkKFwiI2RhdGUtc2xpZGVyXCIpLnNsaWRlcihcInZhbHVlXCIsICsodGltZSArIDIwMDApKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdMZWdlbmQoKSB7XG4gICAgY29uc3QgbGVnZW5kID0gZDNcbiAgICAgIC5zZWxlY3QoXCJnXCIpXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXG4gICAgICAgIFwidHJhbnNmb3JtXCIsXG4gICAgICAgIFwidHJhbnNsYXRlKFwiICtcbiAgICAgICAgICAobWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQgKyA2MCkgK1xuICAgICAgICAgIFwiLFwiICtcbiAgICAgICAgICAoaGVpZ2h0ICsgMzApICtcbiAgICAgICAgICBcIilcIlxuICAgICAgKVxuICAgICAgLnNlbGVjdEFsbChcImdcIilcbiAgICAgIC5kYXRhKHNlY3RvcnMpXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJsZWdlbmRcIik7XG5cbiAgICBsZWdlbmRcbiAgICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgICAuYXR0cihcImZpbGxcIiwgKGQsIGkpID0+IGNvbG9yKGQpKSAvLyAgIGNvbnN0IGNvbG9yID0gZDMuc2NhbGVPcmRpbmFsKGQzLnNjaGVtZUNhdGVnb3J5MTApO1xuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgMTUpXG4gICAgICAuYXR0cihcIndpZHRoXCIsIDE1KTtcblxuICAgIGxlZ2VuZFxuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5hdHRyKFwieFwiLCAxOClcbiAgICAgIC5hdHRyKFwieVwiLCAxMClcbiAgICAgIC5hdHRyKFwiZHlcIiwgXCIuMTVlbVwiKVxuICAgICAgLnRleHQoKGQsIGkpID0+IGQpXG4gICAgICAuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcInN0YXJ0XCIpXG4gICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgMTIpO1xuXG4gICAgLy8gTm93IHNwYWNlIHRoZSBncm91cHMgb3V0IGFmdGVyIHRoZXkgaGF2ZSBiZWVuIGFwcGVuZGVkOlxuICAgIGNvbnN0IHBhZGRpbmcgPSAxMDtcbiAgICBsZWdlbmQuYXR0cihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBcInRyYW5zbGF0ZShcIiArXG4gICAgICAgIChkMy5zdW0oc2VjdG9ycywgZnVuY3Rpb24oZSwgaikge1xuICAgICAgICAgIGlmIChqIDwgaSkge1xuICAgICAgICAgICAgcmV0dXJuIGxlZ2VuZC5ub2RlcygpW2pdLmdldEJCb3goKS53aWR0aDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgfVxuICAgICAgICB9KSArXG4gICAgICAgICAgcGFkZGluZyAqIGkpICtcbiAgICAgICAgXCIsMClcIlxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJhcihzdmcyLCBkb3duLCBkYXRhLCBzZWxlY3Rvcikge1xuICAgIGNvbnN0IGcgPSBzdmcyXG4gICAgICAuaW5zZXJ0KFwiZ1wiLCBzZWxlY3RvcilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJlbnRlclwiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgwLCR7NTAgKyBiYXJTdGVwICogYmFyUGFkZGluZ30pYClcbiAgICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJlbmRcIilcbiAgICAgIC5zdHlsZShcImZvbnRcIiwgXCIxOHB4IHNhbnMtc2VyaWZcIik7XG5cbiAgICBjb25zdCBiYXIgPSBnXG4gICAgICAuc2VsZWN0QWxsKFwiZ1wiKVxuICAgICAgLmRhdGEoZGF0YSlcbiAgICAgIC5qb2luKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAvLyAgLm9uKFwiY2xpY2tcIiwgZCA9PiB1cGRhdGUoY2xlYW5EYXRhW3RpbWVdKSlcbiAgICAgIC5vbihcIm1vdXNlb3ZlclwiLCB0aXAuc2hvdylcbiAgICAgIC5vbihcIm1vdXNlb3V0XCIsIHRpcC5oaWRlKTtcblxuICAgIGJhclxuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5hdHRyKFwieFwiLCA4MCAtIDIpXG4gICAgICAuYXR0cihcInlcIiwgKDI3ICogKDEgLSAwLjEpKSAvIDIpXG4gICAgICAuYXR0cihcImR5XCIsIFwiLjM1ZW1cIilcbiAgICAgIC50ZXh0KGQgPT4gZC5jb21wYW55KTtcblxuICAgIGJhclxuICAgICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAgIC5hdHRyKFwieFwiLCB4MygwKSlcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJiYXJcIilcbiAgICAgIC5hdHRyKFwid2lkdGhcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICBjb25zb2xlLmxvZyh4MygwKSk7XG4gICAgICAgIHJldHVybiB4MyhkLmFtb3VudFJhaXNlZCkgLSB4MygwKTtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcImhlaWdodFwiLCAyNyAqICgxIC0gMC4zKSk7XG5cbiAgICByZXR1cm4gZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyaWxsRG93bihkLCBzbGljZSwgcm91bmQpIHtcbiAgICBsZXQgdW5zb3J0ZWREYXRhID0gdGVzdERhdGFbdGltZV07XG4gICAgY29uc3QgZHVyYXRpb24gPSA3MDA7XG4gICAgY29uc3QgdHJhbnNpdGlvbjEgPSBkMy50cmFuc2l0aW9uKCkuZHVyYXRpb24oZHVyYXRpb24pO1xuICAgIGNvbnN0IHRyYW5zaXRpb24yID0gdHJhbnNpdGlvbjEudHJhbnNpdGlvbigpO1xuXG4gICAgY29uc29sZS5sb2codW5zb3J0ZWREYXRhKTtcbiAgICBjb25zb2xlLmxvZyhkKTtcbiAgICBjb25zb2xlLmxvZyhyb3VuZCk7XG4gICAgY29uc29sZS5sb2codGVzdERhdGEpO1xuXG4gICAgbGV0IGFiID0gdGVzdERhdGEubWFwKGVsZSA9PiBPYmplY3QudmFsdWVzKGVsZSkpO1xuXG4gICAgbGV0IG5ld0RhdGEgPSB1bnNvcnRlZERhdGEudmFsdWVzLmZpbHRlcihlbGUgPT4ge1xuICAgICAgaWYgKGVsZS5rZXkgPT09IGQua2V5KSB7XG4gICAgICAgIHJldHVybiBlbGU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgbmV3RGF0YTIgPSBuZXdEYXRhWzBdLnZhbHVlcy5maWx0ZXIoZWxlID0+IHtcbiAgICAgIGlmIChlbGUucm91bmQgPT09IHJvdW5kKSB7XG4gICAgICAgIHJldHVybiBlbGU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgbmV3RGF0YTMgPSBuZXdEYXRhMlxuICAgICAgLnNsaWNlKClcbiAgICAgIC5zb3J0KChhLCBiKSA9PiBkMy5kZXNjZW5kaW5nKGEuYW1vdW50UmFpc2VkLCBiLmFtb3VudFJhaXNlZCkpXG4gICAgICAuc2xpY2UoMCwgMTApO1xuXG4gICAgbGV0IGxpbmVDaGFydERhdGEgPSBnZXREYXRhKGQsIHJvdW5kKTtcblxuICAgIGNvbnNvbGUubG9nKGxpbmVDaGFydERhdGEpO1xuXG4gICAgY29uc29sZS5sb2cobmV3RGF0YTMpO1xuXG4gICAgY29uc29sZS5sb2cobmV3RGF0YTIpO1xuXG4gICAgLy8gbGV0IHJlY3RzID0gZy5zZWxlY3RBbGwoXCJyZWN0XCIpLmRhdGEobmV3RGF0YSk7XG4gICAgbGV0IGRhdGEgPSBuZXdEYXRhMztcblxuICAgIGQzLnNlbGVjdEFsbChcInN2Z1wiKS5yZW1vdmUoKTtcblxuICAgIC8vICQoXCIjcGxheS1idXR0b25cIikudGV4dChcIkdvIEJhY2tcIik7XG4gICAgLy8gJChcIiNwbGF5LWJ1dHRvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgIC8vICAgbGV0IGJ1dHRvbiA9ICQodGhpcyk7XG4gICAgLy8gICBidXR0b24udGV4dChcIlBsYXlcIik7XG5cbiAgICAvLyAgIHJlc3RvcmUoKTtcbiAgICAvLyB9KTtcblxuICAgIGQzLnNlbGVjdChcIiNwbGF5LWJ1dHRvblwiKS5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xuICAgIGQzLnNlbGVjdChcIiNyZXNldC1idXR0b25cIikuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcbiAgICBkMy5zZWxlY3QoXCIjc2xpZGVyLWRpdlwiKS5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xuICAgIGQzLnNlbGVjdChcIiNpbmR1c3RyeS1zZWxlY3RcIikuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcbiAgICBkMy5zZWxlY3QoXCIjeWVhclwiKS5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xuICAgIGQzLnNlbGVjdEFsbChcInRleHRcIikuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcblxuICAgIGQzLnNlbGVjdChcIiNnb2JhY2stYnV0dG9uXCIpLnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIik7XG5cbiAgICAvLyBnLnNlbGVjdEFsbChcImcueC5heGlzXCIpLnJlbW92ZSgpO1xuICAgIC8vIHNsaWNlLnJlbW92ZSgpO1xuXG4gICAgY29uc3Qgc3ZnMiA9IGQzXG4gICAgICAuc2VsZWN0KFwiI2RyaWxsZG93blwiKVxuICAgICAgLmFwcGVuZChcInN2Z1wiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLCBcIiArIG1hcmdpbi50b3AgKyBcIilcIik7XG5cbiAgICBzdmcyLmNhbGwodGlwKTtcblxuICAgIHgzLmRvbWFpbihbMCwgZGF0YVswXS5hbW91bnRSYWlzZWRdKTtcbiAgICBjb25zb2xlLmxvZyh4My5kb21haW4oKSk7XG5cbiAgICBzdmcyXG4gICAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImJhY2tncm91bmRcIilcbiAgICAgIC5hdHRyKFwiZmlsbFwiLCBcIm5vbmVcIilcbiAgICAgIC5hdHRyKFwicG9pbnRlci1ldmVudHNcIiwgXCJhbGxcIilcbiAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXG4gICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG4gICAgICAuYXR0cihcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgIC5vbihcImRibGNsaWNrXCIsIGQgPT4ge1xuICAgICAgICBkMy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXN0b3JlKGQpO1xuICAgICAgfSk7XG4gICAgLy8gLm9uKFwiY2xpY2tcIiwgZCA9PiB1cChzdmcsIGQpKTtcblxuICAgIHN2ZzIuYXBwZW5kKFwiZ1wiKS5jYWxsKHhBeGlzMik7XG5cbiAgICBzdmcyLmFwcGVuZChcImdcIikuY2FsbCh5QXhpczIpO1xuXG4gICAgbGV0IHBsYWNlaG9sZGVyID0gZC5rZXk7XG5cbiAgICBzdmcyXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInRpdGxlXCIpXG4gICAgICAuYXR0cihcInhcIiwgd2lkdGggLyAyKVxuICAgICAgLmF0dHIoXCJ5XCIsIC0xMClcbiAgICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAgIC50ZXh0KFxuICAgICAgICBkID0+XG4gICAgICAgICAgYExhcmdlc3QgJHtyb3VuZH0gcm91bmRzIGluIHRoZSAke3BsYWNlaG9sZGVyfSBJbmR1c3RyeSBpbiAke3RpbWUgK1xuICAgICAgICAgICAgMjAwMH1gXG4gICAgICApO1xuXG4gICAgLy8gc3ZnMi5jYWxsKHRpcClcblxuICAgIC8vIC5vbihcImNsaWNrXCIsIGQgPT4gdXAoc3ZnLCBkKSk7XG5cbiAgICBjb25zdCBlbnRlciA9IGJhcihzdmcyLCBkcmlsbERvd24sIGRhdGEsIFwiLnktYXhpc1wiKS5hdHRyKFwiZmlsbC1vcGFjaXR5XCIsIDApO1xuICAgIGNvbnNvbGUubG9nKGVudGVyKTtcbiAgICBlbnRlci50cmFuc2l0aW9uKHRyYW5zaXRpb24xKS5hdHRyKFwiZmlsbC1vcGFjaXR5XCIsIDEpO1xuXG4gICAgLy8gVHJhbnNpdGlvbiBlbnRlcmluZyBiYXJzIHRvIHRoZWlyIG5ldyB5LXBvc2l0aW9uLlxuICAgIGVudGVyXG4gICAgICAuc2VsZWN0QWxsKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgc3RhY2soZC5pbmRleCkpXG4gICAgICAudHJhbnNpdGlvbih0cmFuc2l0aW9uMSlcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIHN0YWdnZXIoKSk7XG5cbiAgICAvLyBVcGRhdGUgdGhlIHgtc2NhbGUgZG9tYWluLlxuXG4gICAgLy8gVXBkYXRlIHRoZSB4LWF4aXMuXG4gICAgc3ZnMlxuICAgICAgLnNlbGVjdEFsbChcIi54LWF4aXNcIilcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5jYWxsKHhBeGlzMik7XG5cbiAgICAvLyBUcmFuc2l0aW9uIGVudGVyaW5nIGJhcnMgdG8gdGhlIG5ldyB4LXNjYWxlLlxuICAgIGVudGVyXG4gICAgICAuc2VsZWN0QWxsKFwiZ1wiKVxuICAgICAgLnRyYW5zaXRpb24odHJhbnNpdGlvbjIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCAoZCwgaSkgPT4gYHRyYW5zbGF0ZSgwLCR7YmFyU3RlcCAqIGl9KWApO1xuXG4gICAgLy8gQ29sb3IgdGhlIGJhcnMgYXMgcGFyZW50czsgdGhleSB3aWxsIGZhZGUgdG8gY2hpbGRyZW4gaWYgYXBwcm9wcmlhdGUuXG4gICAgZW50ZXJcbiAgICAgIC5zZWxlY3RBbGwoXCJyZWN0XCIpXG4gICAgICAudHJhbnNpdGlvbih0KVxuICAgICAgLmF0dHIoXCJmaWxsXCIsIGQgPT4gY29sb3IoZC5zZWN0b3IpKVxuICAgICAgLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgMSlcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5hdHRyKFwiZmlsbFwiLCBkID0+IGNvbG9yKGQuc2VjdG9yKSlcbiAgICAgIC5hdHRyKFwid2lkdGhcIiwgZCA9PiB4MyhkLmFtb3VudFJhaXNlZCkpO1xuXG4gICAgYnVpbGRMaW5lQ2hhcnQobGluZUNoYXJ0RGF0YSwgcGxhY2Vob2xkZXIsIHJvdW5kKTtcblxuICAgIC8vIGQzLnNlbGVjdEFsbChcInN2Z1wiKVxuICAgIC8vICAgLmF0dHIoXCJjbGFzc1wiLCBcImJhY2tncm91bmRcIilcbiAgICAvLyAgIC8vIC5hdHRyKFwiZmlsbFwiLCBcIm5vbmVcIilcbiAgICAvLyAgIC5hdHRyKFwicG9pbnRlci1ldmVudHNcIiwgXCJhbGxcIilcbiAgICAvLyAgIC8vIC5hdHRyKFwid2lkdGhcIiwgd2lkdGggKyBtYXJnaW4ucmlnaHQgKyBtYXJnaW4ubGVmdClcbiAgICAvLyAgIC8vIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcbiAgICAvLyAgIC5hdHRyKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgIC8vICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoLTI1MCwgLTMwKVwiKVxuICAgIC8vICAgLm9uKFwiZGJsY2xpY2tcIiwgZCA9PiB7XG4gICAgLy8gICAgIGQzLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gICAgIHJlc3RvcmUoZCk7XG4gICAgLy8gICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YWNrKGkpIHtcbiAgICBsZXQgdmFsdWUgPSAwO1xuICAgIHJldHVybiBkID0+IHtcbiAgICAgIGNvbnN0IHQgPSBgdHJhbnNsYXRlKCR7eDModmFsdWUpfSwke2JhclN0ZXAgKiBpfSlgO1xuICAgICAgdmFsdWUgKz0gZC5hbW91bnRSYWlzZWQ7XG4gICAgICByZXR1cm4gdDtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhZ2dlcigpIHtcbiAgICBsZXQgdmFsdWUgPSAwO1xuICAgIHJldHVybiAoZCwgaSkgPT4ge1xuICAgICAgY29uc3QgdCA9IGB0cmFuc2xhdGUoJHt4Myh2YWx1ZSl9LCR7YmFyU3RlcCAqIGl9KWA7XG4gICAgICB2YWx1ZSArPSBkLmFtb3VudFJhaXNlZDtcbiAgICAgIHJldHVybiB0O1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBnZXREYXRhKGQsIHJvdW5kKSB7XG4gICAgbGV0IHJlc3VsdHMgPSBbXTtcblxuICAgIGxldCBpID0gMDtcblxuICAgIHdoaWxlIChpIDwgMTQpIHtcbiAgICAgIGxldCBvYmogPSB7fTtcbiAgICAgIGxldCB1bnNvcnRlZERhdGEgPSB0ZXN0RGF0YVtpXTtcblxuICAgICAgbGV0IG5ld0RhdGEgPSB1bnNvcnRlZERhdGEudmFsdWVzLmZpbHRlcihlbGUgPT4ge1xuICAgICAgICBpZiAoZWxlLmtleSA9PT0gZC5rZXkpIHtcbiAgICAgICAgICByZXR1cm4gZWxlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKG5ld0RhdGFbMF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXN1bHRzLnB1c2goeyB5OiAwIH0pO1xuICAgICAgICBpKys7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgbmV3RGF0YTIgPSBuZXdEYXRhWzBdLnZhbHVlcy5maWx0ZXIoZWxlID0+IHtcbiAgICAgICAgaWYgKGVsZS5yb3VuZCA9PT0gcm91bmQpIHtcbiAgICAgICAgICByZXR1cm4gZWxlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgbGV0IHN1bSA9IDA7XG5cbiAgICAgIG5ld0RhdGEyLmZvckVhY2goZWxlID0+IHtcbiAgICAgICAgc3VtICs9IGVsZS5hbW91bnRSYWlzZWQ7XG4gICAgICB9KTtcbiAgICAgIG9ialtcInlcIl0gPSBzdW07XG4gICAgICByZXN1bHRzLnB1c2gob2JqKTtcbiAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICBmdW5jdGlvbiBidWlsZExpbmVDaGFydChsaW5lQ2hhcnREYXRhLCBwbGFjZWhvbGRlciwgcm91bmQpIHtcbiAgICBsZXQgbiA9IDEzO1xuICAgIGxldCBzb3J0ZWREYXRhID0gbGluZUNoYXJ0RGF0YVxuICAgICAgLnNsaWNlKClcbiAgICAgIC5zb3J0KChhLCBiKSA9PiBkMy5kZXNjZW5kaW5nKGEueSwgYi55KSk7XG5cbiAgICBjb25zb2xlLmxvZyhzb3J0ZWREYXRhKTtcblxuICAgIGxldCB4U2NhbGUzID0gZDNcbiAgICAgIC5zY2FsZUxpbmVhcigpXG4gICAgICAuZG9tYWluKFsyMDAwLCAyMDEzXSkgLy8gaW5wdXRcbiAgICAgIC5yYW5nZShbMCwgd2lkdGhdKTtcbiAgICAvLyBvXG5cbiAgICBsZXQgeVNjYWxlID0gZDNcbiAgICAgIC5zY2FsZUxpbmVhcigpXG4gICAgICAuZG9tYWluKFswLCBzb3J0ZWREYXRhWzBdLnldKSAvLyBpbnB1dFxuICAgICAgLnJhbmdlKFtoZWlnaHQsIDBdKTtcblxuICAgIGNvbnNvbGUubG9nKHlTY2FsZS5kb21haW4oKSk7XG5cbiAgICBsZXQgZGl2ID0gZDNcbiAgICAgIC5zZWxlY3QoXCJib2R5XCIpXG4gICAgICAuYXBwZW5kKFwiZGl2XCIpIC8vIGRlY2xhcmUgdGhlIHRvb2x0aXAgZGl2XG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwidG9vbHRpcFwiKSAvLyBhcHBseSB0aGUgJ3Rvb2x0aXAnIGNsYXNzXG4gICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuXG4gICAgbGV0IGxpbmUgPSBkM1xuICAgICAgLmxpbmUoKVxuICAgICAgLngoZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4geFNjYWxlMyhpICsgMjAwMCk7XG4gICAgICB9KSAvLyBzZXQgdGhlIHggdmFsdWVzIGZvciB0aGUgbGluZSBnZW5lcmF0b3JcbiAgICAgIC55KGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIHlTY2FsZShkLnkpO1xuICAgICAgfSkgLy8gc2V0IHRoZSB5IHZhbHVlcyBmb3IgdGhlIGxpbmUgZ2VuZXJhdG9yXG4gICAgICAuY3VydmUoZDMuY3VydmVNb25vdG9uZVgpOyAvLyBhcHBseSBzbW9vdGhpbmcgdG8gdGhlIGxpbmVcblxuICAgIGNvbnN0IHN2ZzMgPSBkM1xuICAgICAgLnNlbGVjdChcIiNsaW5lY2hhcnRcIilcbiAgICAgIC5hcHBlbmQoXCJzdmdcIilcbiAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGggKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodClcbiAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCArIG1hcmdpbi50b3AgKyBtYXJnaW4uYm90dG9tKVxuICAgICAgLmF0dHIoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAub24oXCJkYmxjbGlja1wiLCBkID0+IHtcbiAgICAgICAgZDMuZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmVzdG9yZShkKTtcbiAgICAgIH0pXG5cbiAgICAgIC5hcHBlbmQoXCJnXCIpXG5cbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgODAgKyBcIiwgXCIgKyBtYXJnaW4udG9wICsgXCIpXCIpO1xuXG4gICAgY29uc29sZS5sb2coc3ZnMyk7XG5cbiAgICBzdmczXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInggYXhpc1wiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCxcIiArIGhlaWdodCArIFwiKVwiKVxuICAgICAgLmNhbGwoZDMuYXhpc0JvdHRvbSh4U2NhbGUzKS50aWNrRm9ybWF0KGQzLmZvcm1hdChcImRcIikpKTtcblxuICAgIHN2ZzNcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwieSBheGlzXCIpXG4gICAgICAuY2FsbChcbiAgICAgICAgZDMuYXhpc0xlZnQoeVNjYWxlKS50aWNrRm9ybWF0KGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICBpZiAoZCAhPT0gMCAmJiBkIDwgMTAwMDAwMDAwMCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiJFwiICsgZCAvIDEwMDAwMDAgKyBcIk1cIjtcbiAgICAgICAgICB9IGVsc2UgaWYgKGQgIT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcIiRcIiArIGQgLyAxMDAwMDAwMDAwICsgXCJCXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIHN2ZzNcbiAgICAgIC5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAuZGF0dW0obGluZUNoYXJ0RGF0YSkgLy8gMTAuIEJpbmRzIGRhdGEgdG8gdGhlIGxpbmVcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJsaW5lXCIpIC8vIEFzc2lnbiBhIGNsYXNzIGZvciBzdHlsaW5nXG4gICAgICAuYXR0cihcImRcIiwgbGluZSk7XG5cbiAgICBzdmczXG4gICAgICAuc2VsZWN0QWxsKFwiLmRvdFwiKVxuICAgICAgLmRhdGEobGluZUNoYXJ0RGF0YSlcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKFwiY2lyY2xlXCIpIC8vIFVzZXMgdGhlIGVudGVyKCkuYXBwZW5kKCkgbWV0aG9kXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwiZG90XCIpIC8vIEFzc2lnbiBhIGNsYXNzIGZvciBzdHlsaW5nXG4gICAgICAuYXR0cihcImN4XCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgcmV0dXJuIHhTY2FsZTMoaSArIDIwMDApO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiY3lcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4geVNjYWxlKGQueSk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJyXCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgaWYgKGkgPT09IHRpbWUpIHtcbiAgICAgICAgICByZXR1cm4gNztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gNTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5zdHlsZShcImZpbGxcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICBpZiAoaSA9PT0gdGltZSkgcmV0dXJuIFwicmVkXCI7XG4gICAgICB9KVxuICAgICAgLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgZGl2XG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwLjkpO1xuICAgICAgICBkaXZcbiAgICAgICAgICAuaHRtbChcbiAgICAgICAgICAgIGkgK1xuICAgICAgICAgICAgICAyMDAwICtcbiAgICAgICAgICAgICAgXCI6IFwiICtcbiAgICAgICAgICAgICAgXCIgJFwiICtcbiAgICAgICAgICAgICAgZDNcbiAgICAgICAgICAgICAgICAuZm9ybWF0KFwiLjJzXCIpKGRbXCJ5XCJdKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9HLywgXCJCXCIpXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgZDMuZXZlbnQucGFnZVggKyBcInB4XCIpXG4gICAgICAgICAgLnN0eWxlKFwidG9wXCIsIGQzLmV2ZW50LnBhZ2VZIC0gMjggKyBcInB4XCIpO1xuICAgICAgfSlcbiAgICAgIC5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgZGl2XG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcbiAgICAgIH0pO1xuXG4gICAgc3ZnM1xuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ0aXRsZVwiKVxuICAgICAgLmF0dHIoXCJ4XCIsIHdpZHRoIC8gMilcbiAgICAgIC5hdHRyKFwieVwiLCAtMzApXG4gICAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgICAudGV4dChcbiAgICAgICAgZCA9PlxuICAgICAgICAgIGBUb3RhbCBSYWlzZWQgcGVyIFllYXIgaW4gJHtyb3VuZH0gaW4gdGhlICR7cGxhY2Vob2xkZXJ9IEluZHVzdHJ5LCAyMDAwLTIwMTNgXG4gICAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzdG9yZSgpIHtcbiAgICBkMy5zZWxlY3RBbGwoXCJzdmdcIikucmVtb3ZlKCk7XG5cbiAgICBzdmcgPSBkM1xuICAgICAgLnNlbGVjdChcIiNpbnRlclwiKVxuICAgICAgLmFwcGVuZChcInN2Z1wiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLCBcIiArIG1hcmdpbi50b3AgKyBcIilcIik7XG5cbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwibGFiZWxcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwicm90YXRlKC05MClcIilcbiAgICAgIC5hdHRyKFwieVwiLCA2KVxuICAgICAgLmF0dHIoXCJkeVwiLCBcIi43MWVtXCIpXG4gICAgICAuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcImVuZFwiKVxuICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCJib2xkXCIpXG4gICAgICAudGV4dChcIlZhbHVlXCIpO1xuXG4gICAgdGltZUxhYmVsID0gc3ZnXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImxhYmVsXCIpXG4gICAgICAuYXR0cihcInlcIiwgaGVpZ2h0ICsgNTApXG4gICAgICAuYXR0cihcInhcIiwgd2lkdGggLSA0MClcbiAgICAgIC8vIC5hdHRyKFwiZm9udC1zaXplXCIsIFwiNDBweFwiKVxuICAgICAgLy8gLmF0dHIoXCJvcGFjaXR5XCIsIFwiMC40XCIpXG4gICAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgICAudGV4dChgJHt0aW1lICsgMjAwMH1gKTtcblxuICAgIGQzLnNlbGVjdChcIiNnb2JhY2stYnV0dG9uXCIpLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIik7XG5cbiAgICBkMy5zZWxlY3QoXCIjcGxheS1idXR0b25cIikuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKTtcbiAgICBkMy5zZWxlY3QoXCIjcmVzZXQtYnV0dG9uXCIpLnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIik7XG4gICAgZDMuc2VsZWN0KFwiI3NsaWRlci1kaXZcIikuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKTtcbiAgICBkMy5zZWxlY3QoXCIjaW5kdXN0cnktc2VsZWN0XCIpLnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIik7XG4gICAgZDMuc2VsZWN0QWxsKFwidGV4dFwiKS5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpO1xuXG4gICAgY29uc3QgZHVyYXRpb24gPSA3NTA7XG4gICAgY29uc3QgdHJhbnNpdGlvbjEgPSBkMy50cmFuc2l0aW9uKCkuZHVyYXRpb24oZHVyYXRpb24pO1xuICAgIGNvbnN0IHRyYW5zaXRpb24yID0gdHJhbnNpdGlvbjEudHJhbnNpdGlvbigpO1xuXG4gICAgY29uc3QgZXhpdCA9IHN2Zy5zZWxlY3RBbGwoXCIuZW50ZXJcIikuYXR0cihcImNsYXNzXCIsIFwiZXhpdFwiKTtcbiAgICBleGl0LnNlbGVjdEFsbChcInRleHRcIikucmVtb3ZlKCk7XG4gICAgLy8gRW50ZXJpbmcgbm9kZXMgaW1tZWRpYXRlbHkgb2JzY3VyZSB0aGUgY2xpY2tlZC1vbiBiYXIsIHNvIGhpZGUgaXQuXG4gICAgLy8gZXhpdC5zZWxlY3RBbGwoXCJyZWN0XCIpLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgcCA9PiAocCA9PT0gZCA/IDAgOiBudWxsKSk7XG5cbiAgICAvLyBUcmFuc2l0aW9uIGV4aXRpbmcgYmFycyB0byBmYWRlIG91dC5cbiAgICBleGl0XG4gICAgICAuc2VsZWN0QWxsKFwicmVjdHNcIilcbiAgICAgIC50cmFuc2l0aW9uKHRyYW5zaXRpb24yKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgKGQsIGkpID0+IGB0cmFuc2xhdGUoJHstYmFyU3RlcCAqIGl9LCAwKWApXG4gICAgICAvLy5hdHRyKFwid2lkdGhcIiwgZCA9PiAwKVxuICAgICAgLy8gLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgMClcblxuICAgICAgLy8gLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgc3RhY2soZC5pbmRleCkpXG4gICAgICAvLyAudHJhbnNpdGlvbih0cmFuc2l0aW9uMSlcbiAgICAgIC8vIC5hdHRyKFwidHJhbnNmb3JtXCIsIHN0YWdnZXIoKSlcbiAgICAgIC5yZW1vdmUoKTtcblxuICAgIGQzLnNlbGVjdEFsbChcImcueS1heGlzXCIpLnJlbW92ZSgpO1xuXG4gICAgZDMuc2VsZWN0QWxsKFwiZy54LWF4aXNcIikucmVtb3ZlKCk7XG5cbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwieCBheGlzXCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwLFwiICsgaGVpZ2h0ICsgXCIpXCIpXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuY2FsbCh4QXhpcyk7XG5cbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwieSBheGlzXCIpXG4gICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcblxuICAgIGQzLnNlbGVjdChcIiN5ZWFyXCIpLnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIik7XG5cbiAgICB1cGRhdGUoY2xlYW5EYXRhW3RpbWVdKTtcbiAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=