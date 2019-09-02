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
    d3.selectAll("svg").remove();
    $("#reset-button").text("Go Back");
    $("#reset-button").on("click", function () {
      restore();
    });
    d3.select("#play-button").style("opacity", "0"); // d3.select("#reset-button").style("opacity", "0");

    d3.select("#slider-div").style("opacity", "0");
    d3.select("#industry-select").style("opacity", "0");
    d3.select("#year").style("opacity", "0");
    d3.selectAll("text").style("opacity", "0"); // g.selectAll("g.x.axis").remove();
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
      return "Largest ".concat(round, " rounds in the ").concat(placeholder, " inudstry in ").concat(time + 2000);
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
      return "Total Raised per Year in ".concat(round, " in the ").concat(placeholder, " Inudstry, 2000-2013");
    });
  }

  function restore() {
    d3.selectAll("svg").remove();
    svg = d3.select("#inter").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
    svg.append("text").attr("class", "label").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").style("font-weight", "bold").text("Value");
    $("#reset-button").text("Reset");
    $("#reset-button").on("click", function () {
      time = 0;
      update(cleanData[0]);
    });
    timeLabel = svg.append("text").attr("class", "label").attr("y", height + 50).attr("x", width - 40) // .attr("font-size", "40px")
    // .attr("opacity", "0.4")
    .attr("text-anchor", "middle").text("".concat(time + 2000));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvdHJhbnNmb3JtL2RlY29tcG9zZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3RyYW5zZm9ybS9wYXJzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9iYXJfY2hhcnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnRlcmFjdGl2ZV9jaGFydC5qcyJdLCJuYW1lcyI6WyJjaGFydCIsIm1hcmdpbiIsImxlZnQiLCJyaWdodCIsInRvcCIsImJvdHRvbSIsIndpZHRoIiwiaGVpZ2h0IiwiZyIsImQzIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsInRleHQiLCJqc29uIiwidGhlbiIsImRhdGEiLCJzbGljZSIsInNvcnQiLCJhIiwiYiIsImFzY2VuZGluZyIsInllYXIiLCJmb3JFYWNoIiwiZCIsInByaWNlIiwieCIsInNjYWxlQmFuZCIsImRvbWFpbiIsIm1hcCIsInJhbmdlIiwicGFkZGluZyIsInkiLCJzY2FsZUxpbmVhciIsIm1pbiIsIk1hdGgiLCJmbG9vciIsIm1heCIsImNlaWwiLCJuaWNlIiwieEF4aXNDYWxsIiwiYXhpc0JvdHRvbSIsImNhbGwiLCJ5QXhpc0NhbGwiLCJheGlzTGVmdCIsInRpY2tGb3JtYXQiLCJyZWN0cyIsInNlbGVjdEFsbCIsImVudGVyIiwiYmFuZHdpZHRoIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiaW50ZXJhY3RpdmVDaGFydCIsImNvbnNvbGUiLCJsb2ciLCJmbGFnIiwidCIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsInN2ZyIsIngwIiwieDEiLCJyYXdEYXRhIiwidGVzdERhdGEiLCJpbnRlcnZhbCIsImNsZWFuRGF0YSIsImJhclN0ZXAiLCJiYXJQYWRkaW5nIiwieEF4aXMiLCJ0aWNrU2l6ZSIsInlBeGlzIiwidGlwIiwiZGlyZWN0aW9uIiwib2Zmc2V0IiwiaHRtbCIsImNvbXBhbnkiLCJzZWN0b3IiLCJyb3VuZCIsImZvcm1hdCIsImFtb3VudFJhaXNlZCIsInRpbWVMYWJlbCIsInNlY3RvcnMiLCJyb3VuZHMiLCJyYW5nZVJvdW5kIiwiaW52ZXJ0Iiwic2NhbGUiLCJzY2FsZVF1YW50aXplIiwic3R5bGUiLCJjb2xvciIsInNjYWxlT3JkaW5hbCIsInNjaGVtZVNldDEiLCJ0aW1lIiwieDMiLCJ4QXhpczIiLCJheGlzVG9wIiwidGlja3MiLCJzZWxlY3Rpb24iLCJyZW1vdmUiLCJ5QXhpczIiLCJlbGVtZW50cyIsInZhbHVlcyIsImVsZSIsInVwZGF0ZSIsIiQiLCJvbiIsImJ1dHRvbiIsInNldEludGVydmFsIiwic3RlcCIsImNsZWFySW50ZXJ2YWwiLCJzbGlkZXIiLCJhbmltYXRlIiwic2xpZGUiLCJldmVudCIsInVpIiwidmFsdWUiLCJzbGljZTIiLCJrZXkiLCJmaWx0ZXIiLCJub2RlIiwiZGVsYXkiLCJyYW5kb20iLCJwYXJzZVN2ZyIsInBhcmVudE5vZGUiLCJ0cmFuc2xhdGVYIiwiZHJpbGxEb3duIiwicmdiIiwiZGFya2VyIiwicmVjdHMyIiwiYnV0dG9uMiIsImRyYXdMZWdlbmQiLCJpbm5lckhUTUwiLCJsZWdlbmQiLCJpIiwic3VtIiwiZSIsImoiLCJub2RlcyIsImdldEJCb3giLCJiYXIiLCJzdmcyIiwiZG93biIsInNlbGVjdG9yIiwiaW5zZXJ0Iiwiam9pbiIsInNob3ciLCJoaWRlIiwidW5zb3J0ZWREYXRhIiwidHJhbnNpdGlvbjEiLCJ0cmFuc2l0aW9uMiIsImFiIiwiT2JqZWN0IiwibmV3RGF0YSIsIm5ld0RhdGEyIiwibmV3RGF0YTMiLCJkZXNjZW5kaW5nIiwibGluZUNoYXJ0RGF0YSIsImdldERhdGEiLCJyZXN0b3JlIiwicHJldmVudERlZmF1bHQiLCJwbGFjZWhvbGRlciIsInN0YWNrIiwiaW5kZXgiLCJzdGFnZ2VyIiwiYnVpbGRMaW5lQ2hhcnQiLCJyZXN1bHRzIiwib2JqIiwidW5kZWZpbmVkIiwicHVzaCIsIm4iLCJzb3J0ZWREYXRhIiwieFNjYWxlMyIsInlTY2FsZSIsImRpdiIsImxpbmUiLCJjdXJ2ZSIsImN1cnZlTW9ub3RvbmVYIiwic3ZnMyIsImRhdHVtIiwicmVwbGFjZSIsInBhZ2VYIiwicGFnZVkiLCJleGl0Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZZOztBQUVaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBa0MsU0FBUztBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDLFVBQVU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN2SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRVk7O0FBRVosYUFBYSxtQkFBTyxDQUFDLG9EQUFXO0FBQ2hDLGNBQWMsbUJBQU8sQ0FBQyxnREFBUztBQUMvQixjQUFjLG1CQUFPLENBQUMsZ0RBQVM7O0FBRS9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsbURBQW1EO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsVUFBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLHVDQUF1QyxTQUFTO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxpQkFBaUI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELEVBQUU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGVBQWU7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQSxxQkFBcUIsZUFBZTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsT0FBTztBQUM5RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLFFBQVE7QUFDN0I7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixZQUFZO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FB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LEVBRUdVLFVBRkgsQ0FFYzJGLFdBRmQsRUFHR3hJLElBSEgsQ0FHUSxXQUhSLEVBR3FCLFVBQUNZLENBQUQsRUFBSTRHLENBQUo7QUFBQSxpQ0FBdUIsQ0FBQ2xFLE9BQUQsR0FBV2tFLENBQWxDO0FBQUEsS0FIckIsRUFJRTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBVEYsS0FVR25DLE1BVkg7QUFZQXhGLE1BQUUsQ0FBQ3NDLFNBQUgsQ0FBYSxVQUFiLEVBQXlCa0QsTUFBekI7QUFFQXhGLE1BQUUsQ0FBQ3NDLFNBQUgsQ0FBYSxVQUFiLEVBQXlCa0QsTUFBekI7QUFFQXRDLE9BQUcsQ0FDQWhELE1BREgsQ0FDVSxHQURWLEVBRUdDLElBRkgsQ0FFUSxPQUZSLEVBRWlCLFFBRmpCLEVBR0dBLElBSEgsQ0FHUSxXQUhSLEVBR3FCLGlCQUFpQkwsTUFBakIsR0FBMEIsR0FIL0MsRUFJR2tELFVBSkgsR0FLR2YsSUFMSCxDQUtRMEIsS0FMUjtBQU9BVCxPQUFHLENBQ0FoRCxNQURILENBQ1UsR0FEVixFQUVHQyxJQUZILENBRVEsT0FGUixFQUVpQixRQUZqQixFQUdHMkUsS0FISCxDQUdTLFNBSFQsRUFHb0IsR0FIcEI7QUFLQTlFLE1BQUUsQ0FBQ0MsTUFBSCxDQUFVLE9BQVYsRUFBbUI2RSxLQUFuQixDQUF5QixTQUF6QixFQUFvQyxHQUFwQztBQUVBZSxVQUFNLENBQUNyQyxTQUFTLENBQUMwQixJQUFELENBQVYsQ0FBTjtBQUNEO0FBQ0YsQ0F2N0JNLEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG4vLyBTdXBwb3J0IGRlY29kaW5nIFVSTC1zYWZlIGJhc2U2NCBzdHJpbmdzLCBhcyBOb2RlLmpzIGRvZXMuXG4vLyBTZWU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NCNVUkxfYXBwbGljYXRpb25zXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBnZXRMZW5zIChiNjQpIHtcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcblxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gVHJpbSBvZmYgZXh0cmEgYnl0ZXMgYWZ0ZXIgcGxhY2Vob2xkZXIgYnl0ZXMgYXJlIGZvdW5kXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2JlYXRnYW1taXQvYmFzZTY0LWpzL2lzc3Vlcy80MlxuICB2YXIgdmFsaWRMZW4gPSBiNjQuaW5kZXhPZignPScpXG4gIGlmICh2YWxpZExlbiA9PT0gLTEpIHZhbGlkTGVuID0gbGVuXG5cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IHZhbGlkTGVuID09PSBsZW5cbiAgICA/IDBcbiAgICA6IDQgLSAodmFsaWRMZW4gJSA0KVxuXG4gIHJldHVybiBbdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbl1cbn1cblxuLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gX2J5dGVMZW5ndGggKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikge1xuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cblxuICB2YXIgYXJyID0gbmV3IEFycihfYnl0ZUxlbmd0aChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pKVxuXG4gIHZhciBjdXJCeXRlID0gMFxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgdmFyIGxlbiA9IHBsYWNlSG9sZGVyc0xlbiA+IDBcbiAgICA/IHZhbGlkTGVuIC0gNFxuICAgIDogdmFsaWRMZW5cblxuICB2YXIgaVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTgpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildIDw8IDYpIHxcbiAgICAgIHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMyldXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDE2KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAyKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA+PiA0KVxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMSkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxMCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA+PiAyKVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcbiAgcmV0dXJuIGxvb2t1cFtudW0gPj4gMTggJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDYgJiAweDNGXSArXG4gICAgbG9va3VwW251bSAmIDB4M0ZdXG59XG5cbmZ1bmN0aW9uIGVuY29kZUNodW5rICh1aW50OCwgc3RhcnQsIGVuZCkge1xuICB2YXIgdG1wXG4gIHZhciBvdXRwdXQgPSBbXVxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMykge1xuICAgIHRtcCA9XG4gICAgICAoKHVpbnQ4W2ldIDw8IDE2KSAmIDB4RkYwMDAwKSArXG4gICAgICAoKHVpbnQ4W2kgKyAxXSA8PCA4KSAmIDB4RkYwMCkgK1xuICAgICAgKHVpbnQ4W2kgKyAyXSAmIDB4RkYpXG4gICAgb3V0cHV0LnB1c2godHJpcGxldFRvQmFzZTY0KHRtcCkpXG4gIH1cbiAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxufVxuXG5mdW5jdGlvbiBmcm9tQnl0ZUFycmF5ICh1aW50OCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW4gPSB1aW50OC5sZW5ndGhcbiAgdmFyIGV4dHJhQnl0ZXMgPSBsZW4gJSAzIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsoXG4gICAgICB1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpXG4gICAgKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDJdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl0gK1xuICAgICAgJz09J1xuICAgIClcbiAgfSBlbHNlIGlmIChleHRyYUJ5dGVzID09PSAyKSB7XG4gICAgdG1wID0gKHVpbnQ4W2xlbiAtIDJdIDw8IDgpICsgdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAxMF0gK1xuICAgICAgbG9va3VwWyh0bXAgPj4gNCkgJiAweDNGXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCAyKSAmIDB4M0ZdICtcbiAgICAgICc9J1xuICAgIClcbiAgfVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuIiwiLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0JylcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxuLyoqXG4gKiBJZiBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgVXNlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiAobW9zdCBjb21wYXRpYmxlLCBldmVuIElFNilcbiAqXG4gKiBCcm93c2VycyB0aGF0IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGFyZSBJRSAxMCssIEZpcmVmb3ggNCssIENocm9tZSA3KywgU2FmYXJpIDUuMSssXG4gKiBPcGVyYSAxMS42KywgaU9TIDQuMisuXG4gKlxuICogRHVlIHRvIHZhcmlvdXMgYnJvd3NlciBidWdzLCBzb21ldGltZXMgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiB3aWxsIGJlIHVzZWQgZXZlblxuICogd2hlbiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0eXBlZCBhcnJheXMuXG4gKlxuICogTm90ZTpcbiAqXG4gKiAgIC0gRmlyZWZveCA0LTI5IGxhY2tzIHN1cHBvcnQgZm9yIGFkZGluZyBuZXcgcHJvcGVydGllcyB0byBgVWludDhBcnJheWAgaW5zdGFuY2VzLFxuICogICAgIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4LlxuICpcbiAqICAgLSBDaHJvbWUgOS0xMCBpcyBtaXNzaW5nIHRoZSBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uLlxuICpcbiAqICAgLSBJRTEwIGhhcyBhIGJyb2tlbiBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYXJyYXlzIG9mXG4gKiAgICAgaW5jb3JyZWN0IGxlbmd0aCBpbiBzb21lIHNpdHVhdGlvbnMuXG5cbiAqIFdlIGRldGVjdCB0aGVzZSBidWdneSBicm93c2VycyBhbmQgc2V0IGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGAgdG8gYGZhbHNlYCBzbyB0aGV5XG4gKiBnZXQgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiwgd2hpY2ggaXMgc2xvd2VyIGJ1dCBiZWhhdmVzIGNvcnJlY3RseS5cbiAqL1xuQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgPSBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVCAhPT0gdW5kZWZpbmVkXG4gID8gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgOiB0eXBlZEFycmF5U3VwcG9ydCgpXG5cbi8qXG4gKiBFeHBvcnQga01heExlbmd0aCBhZnRlciB0eXBlZCBhcnJheSBzdXBwb3J0IGlzIGRldGVybWluZWQuXG4gKi9cbmV4cG9ydHMua01heExlbmd0aCA9IGtNYXhMZW5ndGgoKVxuXG5mdW5jdGlvbiB0eXBlZEFycmF5U3VwcG9ydCAoKSB7XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KDEpXG4gICAgYXJyLl9fcHJvdG9fXyA9IHtfX3Byb3RvX186IFVpbnQ4QXJyYXkucHJvdG90eXBlLCBmb286IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDQyIH19XG4gICAgcmV0dXJuIGFyci5mb28oKSA9PT0gNDIgJiYgLy8gdHlwZWQgYXJyYXkgaW5zdGFuY2VzIGNhbiBiZSBhdWdtZW50ZWRcbiAgICAgICAgdHlwZW9mIGFyci5zdWJhcnJheSA9PT0gJ2Z1bmN0aW9uJyAmJiAvLyBjaHJvbWUgOS0xMCBsYWNrIGBzdWJhcnJheWBcbiAgICAgICAgYXJyLnN1YmFycmF5KDEsIDEpLmJ5dGVMZW5ndGggPT09IDAgLy8gaWUxMCBoYXMgYnJva2VuIGBzdWJhcnJheWBcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmZ1bmN0aW9uIGtNYXhMZW5ndGggKCkge1xuICByZXR1cm4gQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgICA/IDB4N2ZmZmZmZmZcbiAgICA6IDB4M2ZmZmZmZmZcbn1cblxuZnVuY3Rpb24gY3JlYXRlQnVmZmVyICh0aGF0LCBsZW5ndGgpIHtcbiAgaWYgKGtNYXhMZW5ndGgoKSA8IGxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHR5cGVkIGFycmF5IGxlbmd0aCcpXG4gIH1cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgICB0aGF0Ll9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIGFuIG9iamVjdCBpbnN0YW5jZSBvZiB0aGUgQnVmZmVyIGNsYXNzXG4gICAgaWYgKHRoYXQgPT09IG51bGwpIHtcbiAgICAgIHRoYXQgPSBuZXcgQnVmZmVyKGxlbmd0aClcbiAgICB9XG4gICAgdGhhdC5sZW5ndGggPSBsZW5ndGhcbiAgfVxuXG4gIHJldHVybiB0aGF0XG59XG5cbi8qKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBoYXZlIHRoZWlyXG4gKiBwcm90b3R5cGUgY2hhbmdlZCB0byBgQnVmZmVyLnByb3RvdHlwZWAuIEZ1cnRoZXJtb3JlLCBgQnVmZmVyYCBpcyBhIHN1YmNsYXNzIG9mXG4gKiBgVWludDhBcnJheWAsIHNvIHRoZSByZXR1cm5lZCBpbnN0YW5jZXMgd2lsbCBoYXZlIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBtZXRob2RzXG4gKiBhbmQgdGhlIGBVaW50OEFycmF5YCBtZXRob2RzLiBTcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdFxuICogcmV0dXJucyBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBUaGUgYFVpbnQ4QXJyYXlgIHByb3RvdHlwZSByZW1haW5zIHVubW9kaWZpZWQuXG4gKi9cblxuZnVuY3Rpb24gQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmICEodGhpcyBpbnN0YW5jZW9mIEJ1ZmZlcikpIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcihhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIC8vIENvbW1vbiBjYXNlLlxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nT3JPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdJZiBlbmNvZGluZyBpcyBzcGVjaWZpZWQgdGhlbiB0aGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZydcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIGFsbG9jVW5zYWZlKHRoaXMsIGFyZylcbiAgfVxuICByZXR1cm4gZnJvbSh0aGlzLCBhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnBvb2xTaXplID0gODE5MiAvLyBub3QgdXNlZCBieSB0aGlzIGltcGxlbWVudGF0aW9uXG5cbi8vIFRPRE86IExlZ2FjeSwgbm90IG5lZWRlZCBhbnltb3JlLiBSZW1vdmUgaW4gbmV4dCBtYWpvciB2ZXJzaW9uLlxuQnVmZmVyLl9hdWdtZW50ID0gZnVuY3Rpb24gKGFycikge1xuICBhcnIuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIGZyb20gKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQpXG4gIH1cblxuICByZXR1cm4gZnJvbU9iamVjdCh0aGF0LCB2YWx1ZSlcbn1cblxuLyoqXG4gKiBGdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBCdWZmZXIoYXJnLCBlbmNvZGluZykgYnV0IHRocm93cyBhIFR5cGVFcnJvclxuICogaWYgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBCdWZmZXIuZnJvbShzdHJbLCBlbmNvZGluZ10pXG4gKiBCdWZmZXIuZnJvbShhcnJheSlcbiAqIEJ1ZmZlci5mcm9tKGJ1ZmZlcilcbiAqIEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyWywgYnl0ZU9mZnNldFssIGxlbmd0aF1dKVxuICoqL1xuQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gZnJvbShudWxsLCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5pZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgQnVmZmVyLnByb3RvdHlwZS5fX3Byb3RvX18gPSBVaW50OEFycmF5LnByb3RvdHlwZVxuICBCdWZmZXIuX19wcm90b19fID0gVWludDhBcnJheVxuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnNwZWNpZXMgJiZcbiAgICAgIEJ1ZmZlcltTeW1ib2wuc3BlY2llc10gPT09IEJ1ZmZlcikge1xuICAgIC8vIEZpeCBzdWJhcnJheSgpIGluIEVTMjAxNi4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzk3XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlciwgU3ltYm9sLnNwZWNpZXMsIHtcbiAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRTaXplIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfSBlbHNlIGlmIChzaXplIDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBuZWdhdGl2ZScpXG4gIH1cbn1cblxuZnVuY3Rpb24gYWxsb2MgKHRoYXQsIHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgaWYgKHNpemUgPD0gMCkge1xuICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbiAgfVxuICBpZiAoZmlsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT25seSBwYXkgYXR0ZW50aW9uIHRvIGVuY29kaW5nIGlmIGl0J3MgYSBzdHJpbmcuIFRoaXNcbiAgICAvLyBwcmV2ZW50cyBhY2NpZGVudGFsbHkgc2VuZGluZyBpbiBhIG51bWJlciB0aGF0IHdvdWxkXG4gICAgLy8gYmUgaW50ZXJwcmV0dGVkIGFzIGEgc3RhcnQgb2Zmc2V0LlxuICAgIHJldHVybiB0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnXG4gICAgICA/IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwsIGVuY29kaW5nKVxuICAgICAgOiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsKVxuICB9XG4gIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiBhbGxvYyhzaXplWywgZmlsbFssIGVuY29kaW5nXV0pXG4gKiovXG5CdWZmZXIuYWxsb2MgPSBmdW5jdGlvbiAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGFsbG9jKG51bGwsIHNpemUsIGZpbGwsIGVuY29kaW5nKVxufVxuXG5mdW5jdGlvbiBhbGxvY1Vuc2FmZSAodGhhdCwgc2l6ZSkge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSA8IDAgPyAwIDogY2hlY2tlZChzaXplKSB8IDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7ICsraSkge1xuICAgICAgdGhhdFtpXSA9IDBcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIEJ1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIFNsb3dCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuXG5mdW5jdGlvbiBmcm9tU3RyaW5nICh0aGF0LCBzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnIHx8IGVuY29kaW5nID09PSAnJykge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gIH1cblxuICBpZiAoIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiZW5jb2RpbmdcIiBtdXN0IGJlIGEgdmFsaWQgc3RyaW5nIGVuY29kaW5nJylcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBieXRlTGVuZ3RoKHN0cmluZywgZW5jb2RpbmcpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcblxuICB2YXIgYWN0dWFsID0gdGhhdC53cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuXG4gIGlmIChhY3R1YWwgIT09IGxlbmd0aCkge1xuICAgIC8vIFdyaXRpbmcgYSBoZXggc3RyaW5nLCBmb3IgZXhhbXBsZSwgdGhhdCBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMgd2lsbFxuICAgIC8vIGNhdXNlIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IGludmFsaWQgY2hhcmFjdGVyIHRvIGJlIGlnbm9yZWQuIChlLmcuXG4gICAgLy8gJ2FieHhjZCcgd2lsbCBiZSB0cmVhdGVkIGFzICdhYicpXG4gICAgdGhhdCA9IHRoYXQuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5TGlrZSAodGhhdCwgYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCA8IDAgPyAwIDogY2hlY2tlZChhcnJheS5sZW5ndGgpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIHRoYXRbaV0gPSBhcnJheVtpXSAmIDI1NVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUJ1ZmZlciAodGhhdCwgYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aCkge1xuICBhcnJheS5ieXRlTGVuZ3RoIC8vIHRoaXMgdGhyb3dzIGlmIGBhcnJheWAgaXMgbm90IGEgdmFsaWQgQXJyYXlCdWZmZXJcblxuICBpZiAoYnl0ZU9mZnNldCA8IDAgfHwgYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnb2Zmc2V0XFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0ICsgKGxlbmd0aCB8fCAwKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdsZW5ndGhcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYnl0ZU9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSlcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQpXG4gIH0gZWxzZSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IGFycmF5XG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIHRoYXQgPSBmcm9tQXJyYXlMaWtlKHRoYXQsIGFycmF5KVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKHRoYXQsIG9iaikge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iaikpIHtcbiAgICB2YXIgbGVuID0gY2hlY2tlZChvYmoubGVuZ3RoKSB8IDBcbiAgICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbilcblxuICAgIGlmICh0aGF0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoYXRcbiAgICB9XG5cbiAgICBvYmouY29weSh0aGF0LCAwLCAwLCBsZW4pXG4gICAgcmV0dXJuIHRoYXRcbiAgfVxuXG4gIGlmIChvYmopIHtcbiAgICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgb2JqLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB8fCAnbGVuZ3RoJyBpbiBvYmopIHtcbiAgICAgIGlmICh0eXBlb2Ygb2JqLmxlbmd0aCAhPT0gJ251bWJlcicgfHwgaXNuYW4ob2JqLmxlbmd0aCkpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCAwKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UodGhhdCwgb2JqKVxuICAgIH1cblxuICAgIGlmIChvYmoudHlwZSA9PT0gJ0J1ZmZlcicgJiYgaXNBcnJheShvYmouZGF0YSkpIHtcbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iai5kYXRhKVxuICAgIH1cbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCBvciBhcnJheS1saWtlIG9iamVjdC4nKVxufVxuXG5mdW5jdGlvbiBjaGVja2VkIChsZW5ndGgpIHtcbiAgLy8gTm90ZTogY2Fubm90IHVzZSBgbGVuZ3RoIDwga01heExlbmd0aCgpYCBoZXJlIGJlY2F1c2UgdGhhdCBmYWlscyB3aGVuXG4gIC8vIGxlbmd0aCBpcyBOYU4gKHdoaWNoIGlzIG90aGVyd2lzZSBjb2VyY2VkIHRvIHplcm8uKVxuICBpZiAobGVuZ3RoID49IGtNYXhMZW5ndGgoKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICdzaXplOiAweCcgKyBrTWF4TGVuZ3RoKCkudG9TdHJpbmcoMTYpICsgJyBieXRlcycpXG4gIH1cbiAgcmV0dXJuIGxlbmd0aCB8IDBcbn1cblxuZnVuY3Rpb24gU2xvd0J1ZmZlciAobGVuZ3RoKSB7XG4gIGlmICgrbGVuZ3RoICE9IGxlbmd0aCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICAgIGxlbmd0aCA9IDBcbiAgfVxuICByZXR1cm4gQnVmZmVyLmFsbG9jKCtsZW5ndGgpXG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyIChiKSB7XG4gIHJldHVybiAhIShiICE9IG51bGwgJiYgYi5faXNCdWZmZXIpXG59XG5cbkJ1ZmZlci5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAoYSwgYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihhKSB8fCAhQnVmZmVyLmlzQnVmZmVyKGIpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIG11c3QgYmUgQnVmZmVycycpXG4gIH1cblxuICBpZiAoYSA9PT0gYikgcmV0dXJuIDBcblxuICB2YXIgeCA9IGEubGVuZ3RoXG4gIHZhciB5ID0gYi5sZW5ndGhcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXVxuICAgICAgeSA9IGJbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIGlzRW5jb2RpbmcgKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0IChsaXN0LCBsZW5ndGgpIHtcbiAgaWYgKCFpc0FycmF5KGxpc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBCdWZmZXIuYWxsb2MoMClcbiAgfVxuXG4gIHZhciBpXG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgbGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgdmFyIGJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShsZW5ndGgpXG4gIHZhciBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGJ1ZiA9IGxpc3RbaV1cbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICAgIH1cbiAgICBidWYuY29weShidWZmZXIsIHBvcylcbiAgICBwb3MgKz0gYnVmLmxlbmd0aFxuICB9XG4gIHJldHVybiBidWZmZXJcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHN0cmluZykpIHtcbiAgICByZXR1cm4gc3RyaW5nLmxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBBcnJheUJ1ZmZlci5pc1ZpZXcgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIChBcnJheUJ1ZmZlci5pc1ZpZXcoc3RyaW5nKSB8fCBzdHJpbmcgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikpIHtcbiAgICByZXR1cm4gc3RyaW5nLmJ5dGVMZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICBzdHJpbmcgPSAnJyArIHN0cmluZ1xuICB9XG5cbiAgdmFyIGxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKGxlbiA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBVc2UgYSBmb3IgbG9vcCB0byBhdm9pZCByZWN1cnNpb25cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGVuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgICByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiBsZW4gKiAyXG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gbGVuID4+PiAxXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGggLy8gYXNzdW1lIHV0ZjhcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuXG5mdW5jdGlvbiBzbG93VG9TdHJpbmcgKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG5cbiAgLy8gTm8gbmVlZCB0byB2ZXJpZnkgdGhhdCBcInRoaXMubGVuZ3RoIDw9IE1BWF9VSU5UMzJcIiBzaW5jZSBpdCdzIGEgcmVhZC1vbmx5XG4gIC8vIHByb3BlcnR5IG9mIGEgdHlwZWQgYXJyYXkuXG5cbiAgLy8gVGhpcyBiZWhhdmVzIG5laXRoZXIgbGlrZSBTdHJpbmcgbm9yIFVpbnQ4QXJyYXkgaW4gdGhhdCB3ZSBzZXQgc3RhcnQvZW5kXG4gIC8vIHRvIHRoZWlyIHVwcGVyL2xvd2VyIGJvdW5kcyBpZiB0aGUgdmFsdWUgcGFzc2VkIGlzIG91dCBvZiByYW5nZS5cbiAgLy8gdW5kZWZpbmVkIGlzIGhhbmRsZWQgc3BlY2lhbGx5IGFzIHBlciBFQ01BLTI2MiA2dGggRWRpdGlvbixcbiAgLy8gU2VjdGlvbiAxMy4zLjMuNyBSdW50aW1lIFNlbWFudGljczogS2V5ZWRCaW5kaW5nSW5pdGlhbGl6YXRpb24uXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkIHx8IHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIC8vIFJldHVybiBlYXJseSBpZiBzdGFydCA+IHRoaXMubGVuZ3RoLiBEb25lIGhlcmUgdG8gcHJldmVudCBwb3RlbnRpYWwgdWludDMyXG4gIC8vIGNvZXJjaW9uIGZhaWwgYmVsb3cuXG4gIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKGVuZCA8PSAwKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICAvLyBGb3JjZSBjb2Vyc2lvbiB0byB1aW50MzIuIFRoaXMgd2lsbCBhbHNvIGNvZXJjZSBmYWxzZXkvTmFOIHZhbHVlcyB0byAwLlxuICBlbmQgPj4+PSAwXG4gIHN0YXJ0ID4+Pj0gMFxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdXRmMTZsZVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9IChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGUgcHJvcGVydHkgaXMgdXNlZCBieSBgQnVmZmVyLmlzQnVmZmVyYCBhbmQgYGlzLWJ1ZmZlcmAgKGluIFNhZmFyaSA1LTcpIHRvIGRldGVjdFxuLy8gQnVmZmVyIGluc3RhbmNlcy5cbkJ1ZmZlci5wcm90b3R5cGUuX2lzQnVmZmVyID0gdHJ1ZVxuXG5mdW5jdGlvbiBzd2FwIChiLCBuLCBtKSB7XG4gIHZhciBpID0gYltuXVxuICBiW25dID0gYlttXVxuICBiW21dID0gaVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAxNiA9IGZ1bmN0aW9uIHN3YXAxNiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgMiAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMTYtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gMikge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDEpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMzIgPSBmdW5jdGlvbiBzd2FwMzIgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDMyLWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAzKVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyAyKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDY0ID0gZnVuY3Rpb24gc3dhcDY0ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA4ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA2NC1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA4KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgNylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgNilcbiAgICBzd2FwKHRoaXMsIGkgKyAyLCBpICsgNSlcbiAgICBzd2FwKHRoaXMsIGkgKyAzLCBpICsgNClcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGggfCAwXG4gIGlmIChsZW5ndGggPT09IDApIHJldHVybiAnJ1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCAwLCBsZW5ndGgpXG4gIHJldHVybiBzbG93VG9TdHJpbmcuYXBwbHkodGhpcywgYXJndW1lbnRzKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyAoYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIGlmICh0aGlzID09PSBiKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYikgPT09IDBcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gIHZhciBzdHIgPSAnJ1xuICB2YXIgbWF4ID0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFU1xuICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgc3RyID0gdGhpcy50b1N0cmluZygnaGV4JywgMCwgbWF4KS5tYXRjaCgvLnsyfS9nKS5qb2luKCcgJylcbiAgICBpZiAodGhpcy5sZW5ndGggPiBtYXgpIHN0ciArPSAnIC4uLiAnXG4gIH1cbiAgcmV0dXJuICc8QnVmZmVyICcgKyBzdHIgKyAnPidcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAodGFyZ2V0LCBzdGFydCwgZW5kLCB0aGlzU3RhcnQsIHRoaXNFbmQpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGFyZ2V0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICB9XG5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICBpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmQgPSB0YXJnZXQgPyB0YXJnZXQubGVuZ3RoIDogMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNTdGFydCA9IDBcbiAgfVxuICBpZiAodGhpc0VuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc0VuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoc3RhcnQgPCAwIHx8IGVuZCA+IHRhcmdldC5sZW5ndGggfHwgdGhpc1N0YXJ0IDwgMCB8fCB0aGlzRW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCAmJiBzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCkge1xuICAgIHJldHVybiAtMVxuICB9XG4gIGlmIChzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMVxuICB9XG5cbiAgc3RhcnQgPj4+PSAwXG4gIGVuZCA+Pj49IDBcbiAgdGhpc1N0YXJ0ID4+Pj0gMFxuICB0aGlzRW5kID4+Pj0gMFxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQpIHJldHVybiAwXG5cbiAgdmFyIHggPSB0aGlzRW5kIC0gdGhpc1N0YXJ0XG4gIHZhciB5ID0gZW5kIC0gc3RhcnRcbiAgdmFyIGxlbiA9IE1hdGgubWluKHgsIHkpXG5cbiAgdmFyIHRoaXNDb3B5ID0gdGhpcy5zbGljZSh0aGlzU3RhcnQsIHRoaXNFbmQpXG4gIHZhciB0YXJnZXRDb3B5ID0gdGFyZ2V0LnNsaWNlKHN0YXJ0LCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIGlmICh0aGlzQ29weVtpXSAhPT0gdGFyZ2V0Q29weVtpXSkge1xuICAgICAgeCA9IHRoaXNDb3B5W2ldXG4gICAgICB5ID0gdGFyZ2V0Q29weVtpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbi8vIEZpbmRzIGVpdGhlciB0aGUgZmlyc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0ID49IGBieXRlT2Zmc2V0YCxcbi8vIE9SIHRoZSBsYXN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA8PSBgYnl0ZU9mZnNldGAuXG4vL1xuLy8gQXJndW1lbnRzOlxuLy8gLSBidWZmZXIgLSBhIEJ1ZmZlciB0byBzZWFyY2hcbi8vIC0gdmFsIC0gYSBzdHJpbmcsIEJ1ZmZlciwgb3IgbnVtYmVyXG4vLyAtIGJ5dGVPZmZzZXQgLSBhbiBpbmRleCBpbnRvIGBidWZmZXJgOyB3aWxsIGJlIGNsYW1wZWQgdG8gYW4gaW50MzJcbi8vIC0gZW5jb2RpbmcgLSBhbiBvcHRpb25hbCBlbmNvZGluZywgcmVsZXZhbnQgaXMgdmFsIGlzIGEgc3RyaW5nXG4vLyAtIGRpciAtIHRydWUgZm9yIGluZGV4T2YsIGZhbHNlIGZvciBsYXN0SW5kZXhPZlxuZnVuY3Rpb24gYmlkaXJlY3Rpb25hbEluZGV4T2YgKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIC8vIEVtcHR5IGJ1ZmZlciBtZWFucyBubyBtYXRjaFxuICBpZiAoYnVmZmVyLmxlbmd0aCA9PT0gMCkgcmV0dXJuIC0xXG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXRcbiAgaWYgKHR5cGVvZiBieXRlT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gYnl0ZU9mZnNldFxuICAgIGJ5dGVPZmZzZXQgPSAwXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA+IDB4N2ZmZmZmZmYpIHtcbiAgICBieXRlT2Zmc2V0ID0gMHg3ZmZmZmZmZlxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAtMHg4MDAwMDAwMCkge1xuICAgIGJ5dGVPZmZzZXQgPSAtMHg4MDAwMDAwMFxuICB9XG4gIGJ5dGVPZmZzZXQgPSArYnl0ZU9mZnNldCAgLy8gQ29lcmNlIHRvIE51bWJlci5cbiAgaWYgKGlzTmFOKGJ5dGVPZmZzZXQpKSB7XG4gICAgLy8gYnl0ZU9mZnNldDogaXQgaXQncyB1bmRlZmluZWQsIG51bGwsIE5hTiwgXCJmb29cIiwgZXRjLCBzZWFyY2ggd2hvbGUgYnVmZmVyXG4gICAgYnl0ZU9mZnNldCA9IGRpciA/IDAgOiAoYnVmZmVyLmxlbmd0aCAtIDEpXG4gIH1cblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldDogbmVnYXRpdmUgb2Zmc2V0cyBzdGFydCBmcm9tIHRoZSBlbmQgb2YgdGhlIGJ1ZmZlclxuICBpZiAoYnl0ZU9mZnNldCA8IDApIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoICsgYnl0ZU9mZnNldFxuICBpZiAoYnl0ZU9mZnNldCA+PSBidWZmZXIubGVuZ3RoKSB7XG4gICAgaWYgKGRpcikgcmV0dXJuIC0xXG4gICAgZWxzZSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCAtIDFcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgMCkge1xuICAgIGlmIChkaXIpIGJ5dGVPZmZzZXQgPSAwXG4gICAgZWxzZSByZXR1cm4gLTFcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSB2YWxcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsID0gQnVmZmVyLmZyb20odmFsLCBlbmNvZGluZylcbiAgfVxuXG4gIC8vIEZpbmFsbHksIHNlYXJjaCBlaXRoZXIgaW5kZXhPZiAoaWYgZGlyIGlzIHRydWUpIG9yIGxhc3RJbmRleE9mXG4gIGlmIChCdWZmZXIuaXNCdWZmZXIodmFsKSkge1xuICAgIC8vIFNwZWNpYWwgY2FzZTogbG9va2luZyBmb3IgZW1wdHkgc3RyaW5nL2J1ZmZlciBhbHdheXMgZmFpbHNcbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAweEZGIC8vIFNlYXJjaCBmb3IgYSBieXRlIHZhbHVlIFswLTI1NV1cbiAgICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiZcbiAgICAgICAgdHlwZW9mIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmIChkaXIpIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5sYXN0SW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgWyB2YWwgXSwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZhbCBtdXN0IGJlIHN0cmluZywgbnVtYmVyIG9yIEJ1ZmZlcicpXG59XG5cbmZ1bmN0aW9uIGFycmF5SW5kZXhPZiAoYXJyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgdmFyIGluZGV4U2l6ZSA9IDFcbiAgdmFyIGFyckxlbmd0aCA9IGFyci5sZW5ndGhcbiAgdmFyIHZhbExlbmd0aCA9IHZhbC5sZW5ndGhcblxuICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKGVuY29kaW5nID09PSAndWNzMicgfHwgZW5jb2RpbmcgPT09ICd1Y3MtMicgfHxcbiAgICAgICAgZW5jb2RpbmcgPT09ICd1dGYxNmxlJyB8fCBlbmNvZGluZyA9PT0gJ3V0Zi0xNmxlJykge1xuICAgICAgaWYgKGFyci5sZW5ndGggPCAyIHx8IHZhbC5sZW5ndGggPCAyKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfVxuICAgICAgaW5kZXhTaXplID0gMlxuICAgICAgYXJyTGVuZ3RoIC89IDJcbiAgICAgIHZhbExlbmd0aCAvPSAyXG4gICAgICBieXRlT2Zmc2V0IC89IDJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkIChidWYsIGkpIHtcbiAgICBpZiAoaW5kZXhTaXplID09PSAxKSB7XG4gICAgICByZXR1cm4gYnVmW2ldXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBidWYucmVhZFVJbnQxNkJFKGkgKiBpbmRleFNpemUpXG4gICAgfVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGRpcikge1xuICAgIHZhciBmb3VuZEluZGV4ID0gLTFcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChyZWFkKGFyciwgaSkgPT09IHJlYWQodmFsLCBmb3VuZEluZGV4ID09PSAtMSA/IDAgOiBpIC0gZm91bmRJbmRleCkpIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKSBmb3VuZEluZGV4ID0gaVxuICAgICAgICBpZiAoaSAtIGZvdW5kSW5kZXggKyAxID09PSB2YWxMZW5ndGgpIHJldHVybiBmb3VuZEluZGV4ICogaW5kZXhTaXplXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gLTEpIGkgLT0gaSAtIGZvdW5kSW5kZXhcbiAgICAgICAgZm91bmRJbmRleCA9IC0xXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChieXRlT2Zmc2V0ICsgdmFsTGVuZ3RoID4gYXJyTGVuZ3RoKSBieXRlT2Zmc2V0ID0gYXJyTGVuZ3RoIC0gdmFsTGVuZ3RoXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBmb3VuZCA9IHRydWVcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdmFsTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKHJlYWQoYXJyLCBpICsgaikgIT09IHJlYWQodmFsLCBqKSkge1xuICAgICAgICAgIGZvdW5kID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZm91bmQpIHJldHVybiBpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gdGhpcy5pbmRleE9mKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpICE9PSAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCB0cnVlKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmxhc3RJbmRleE9mID0gZnVuY3Rpb24gbGFzdEluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGZhbHNlKVxufVxuXG5mdW5jdGlvbiBoZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuXG4gIC8vIG11c3QgYmUgYW4gZXZlbiBudW1iZXIgb2YgZGlnaXRzXG4gIHZhciBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChzdHJMZW4gJSAyICE9PSAwKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGhleCBzdHJpbmcnKVxuXG4gIGlmIChsZW5ndGggPiBzdHJMZW4gLyAyKSB7XG4gICAgbGVuZ3RoID0gc3RyTGVuIC8gMlxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgcGFyc2VkID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGlmIChpc05hTihwYXJzZWQpKSByZXR1cm4gaVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHBhcnNlZFxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIHV0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGFzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gbGF0aW4xV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGJhc2U2NFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiB1Y3MyV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gd3JpdGUgKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKSB7XG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcpXG4gIGlmIChvZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBvZmZzZXRcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgb2Zmc2V0WywgbGVuZ3RoXVssIGVuY29kaW5nXSlcbiAgfSBlbHNlIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICAgIGlmIChpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBsZW5ndGggPSBsZW5ndGggfCAwXG4gICAgICBpZiAoZW5jb2RpbmcgPT09IHVuZGVmaW5lZCkgZW5jb2RpbmcgPSAndXRmOCdcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgLy8gbGVnYWN5IHdyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldCwgbGVuZ3RoKSAtIHJlbW92ZSBpbiB2MC4xM1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdCdWZmZXIud3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0WywgbGVuZ3RoXSkgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCdcbiAgICApXG4gIH1cblxuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGxlbmd0aCA+IHJlbWFpbmluZykgbGVuZ3RoID0gcmVtYWluaW5nXG5cbiAgaWYgKChzdHJpbmcubGVuZ3RoID4gMCAmJiAobGVuZ3RoIDwgMCB8fCBvZmZzZXQgPCAwKSkgfHwgb2Zmc2V0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIHZhciByZXMgPSBbXVxuXG4gIHZhciBpID0gc3RhcnRcbiAgd2hpbGUgKGkgPCBlbmQpIHtcbiAgICB2YXIgZmlyc3RCeXRlID0gYnVmW2ldXG4gICAgdmFyIGNvZGVQb2ludCA9IG51bGxcbiAgICB2YXIgYnl0ZXNQZXJTZXF1ZW5jZSA9IChmaXJzdEJ5dGUgPiAweEVGKSA/IDRcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4REYpID8gM1xuICAgICAgOiAoZmlyc3RCeXRlID4gMHhCRikgPyAyXG4gICAgICA6IDFcblxuICAgIGlmIChpICsgYnl0ZXNQZXJTZXF1ZW5jZSA8PSBlbmQpIHtcbiAgICAgIHZhciBzZWNvbmRCeXRlLCB0aGlyZEJ5dGUsIGZvdXJ0aEJ5dGUsIHRlbXBDb2RlUG9pbnRcblxuICAgICAgc3dpdGNoIChieXRlc1BlclNlcXVlbmNlKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBpZiAoZmlyc3RCeXRlIDwgMHg4MCkge1xuICAgICAgICAgICAgY29kZVBvaW50ID0gZmlyc3RCeXRlXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4MUYpIDw8IDB4NiB8IChzZWNvbmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3Rikge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweEMgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4NiB8ICh0aGlyZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGRiAmJiAodGVtcENvZGVQb2ludCA8IDB4RDgwMCB8fCB0ZW1wQ29kZVBvaW50ID4gMHhERkZGKSkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBmb3VydGhCeXRlID0gYnVmW2kgKyAzXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAoZm91cnRoQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHgxMiB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHhDIHwgKHRoaXJkQnl0ZSAmIDB4M0YpIDw8IDB4NiB8IChmb3VydGhCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHhGRkZGICYmIHRlbXBDb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2RlUG9pbnQgPT09IG51bGwpIHtcbiAgICAgIC8vIHdlIGRpZCBub3QgZ2VuZXJhdGUgYSB2YWxpZCBjb2RlUG9pbnQgc28gaW5zZXJ0IGFcbiAgICAgIC8vIHJlcGxhY2VtZW50IGNoYXIgKFUrRkZGRCkgYW5kIGFkdmFuY2Ugb25seSAxIGJ5dGVcbiAgICAgIGNvZGVQb2ludCA9IDB4RkZGRFxuICAgICAgYnl0ZXNQZXJTZXF1ZW5jZSA9IDFcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA+IDB4RkZGRikge1xuICAgICAgLy8gZW5jb2RlIHRvIHV0ZjE2IChzdXJyb2dhdGUgcGFpciBkYW5jZSlcbiAgICAgIGNvZGVQb2ludCAtPSAweDEwMDAwXG4gICAgICByZXMucHVzaChjb2RlUG9pbnQgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApXG4gICAgICBjb2RlUG9pbnQgPSAweERDMDAgfCBjb2RlUG9pbnQgJiAweDNGRlxuICAgIH1cblxuICAgIHJlcy5wdXNoKGNvZGVQb2ludClcbiAgICBpICs9IGJ5dGVzUGVyU2VxdWVuY2VcbiAgfVxuXG4gIHJldHVybiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkocmVzKVxufVxuXG4vLyBCYXNlZCBvbiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMjc0NzI3Mi82ODA3NDIsIHRoZSBicm93c2VyIHdpdGhcbi8vIHRoZSBsb3dlc3QgbGltaXQgaXMgQ2hyb21lLCB3aXRoIDB4MTAwMDAgYXJncy5cbi8vIFdlIGdvIDEgbWFnbml0dWRlIGxlc3MsIGZvciBzYWZldHlcbnZhciBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgdmFyIGxlbiA9IGNvZGVQb2ludHMubGVuZ3RoXG4gIGlmIChsZW4gPD0gTUFYX0FSR1VNRU5UU19MRU5HVEgpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNvZGVQb2ludHMpIC8vIGF2b2lkIGV4dHJhIHNsaWNlKClcbiAgfVxuXG4gIC8vIERlY29kZSBpbiBjaHVua3MgdG8gYXZvaWQgXCJjYWxsIHN0YWNrIHNpemUgZXhjZWVkZWRcIi5cbiAgdmFyIHJlcyA9ICcnXG4gIHZhciBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFxuICAgICAgU3RyaW5nLFxuICAgICAgY29kZVBvaW50cy5zbGljZShpLCBpICs9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKVxuICAgIClcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldICYgMHg3RilcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGxhdGluMVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGhleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICB2YXIgb3V0ID0gJydcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHZhciByZXMgPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyBieXRlc1tpICsgMV0gKiAyNTYpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgdmFyIG5ld0J1ZlxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBuZXdCdWYgPSB0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpXG4gICAgbmV3QnVmLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xpY2VMZW4gPSBlbmQgLSBzdGFydFxuICAgIG5ld0J1ZiA9IG5ldyBCdWZmZXIoc2xpY2VMZW4sIHVuZGVmaW5lZClcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlTGVuOyArK2kpIHtcbiAgICAgIG5ld0J1ZltpXSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdCdWZcbn1cblxuLypcbiAqIE5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgYnVmZmVyIGlzbid0IHRyeWluZyB0byB3cml0ZSBvdXQgb2YgYm91bmRzLlxuICovXG5mdW5jdGlvbiBjaGVja09mZnNldCAob2Zmc2V0LCBleHQsIGxlbmd0aCkge1xuICBpZiAoKG9mZnNldCAlIDEpICE9PSAwIHx8IG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdvZmZzZXQgaXMgbm90IHVpbnQnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gbGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVHJ5aW5nIHRvIGFjY2VzcyBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRMRSA9IGZ1bmN0aW9uIHJlYWRVSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG4gIH1cblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdXG4gIHZhciBtdWwgPSAxXG4gIHdoaWxlIChieXRlTGVuZ3RoID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiByZWFkVUludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgOCkgfCB0aGlzW29mZnNldCArIDFdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICgodGhpc1tvZmZzZXRdKSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikpICtcbiAgICAgICh0aGlzW29mZnNldCArIDNdICogMHgxMDAwMDAwKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludExFID0gZnVuY3Rpb24gcmVhZEludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludEJFID0gZnVuY3Rpb24gcmVhZEludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoXG4gIHZhciBtdWwgPSAxXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0taV1cbiAgd2hpbGUgKGkgPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1pXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiByZWFkSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICBpZiAoISh0aGlzW29mZnNldF0gJiAweDgwKSkgcmV0dXJuICh0aGlzW29mZnNldF0pXG4gIHJldHVybiAoKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gcmVhZEludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIDFdIHwgKHRoaXNbb2Zmc2V0XSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiByZWFkSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdKSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10gPDwgMjQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiByZWFkSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiByZWFkRmxvYXRMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiByZWFkRmxvYXRCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gcmVhZERvdWJsZUJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpXG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJidWZmZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyIGluc3RhbmNlJylcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IGlzIG91dCBvZiBib3VuZHMnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uIHdyaXRlVUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHhmZiwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQxNiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCAyKTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSAmICgweGZmIDw8ICg4ICogKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkpKSkgPj4+XG4gICAgICAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSAqIDhcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQzMiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgNCk7IGkgPCBqOyArK2kpIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgPj4+IChsaXR0bGVFbmRpYW4gPyBpIDogMyAtIGkpICogOCkgJiAweGZmXG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50TEUgPSBmdW5jdGlvbiB3cml0ZUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gMFxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgLSAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50QkUgPSBmdW5jdGlvbiB3cml0ZUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgKyAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uIHdyaXRlSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweDdmLCAtMHg4MClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuZnVuY3Rpb24gY2hlY2tJRUVFNzU0IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxuICBpZiAob2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvYXQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgNCwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gd3JpdGVGbG9hdExFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgOCwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbiAgcmV0dXJuIG9mZnNldCArIDhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiBjb3B5ICh0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXRTdGFydCA+PSB0YXJnZXQubGVuZ3RoKSB0YXJnZXRTdGFydCA9IHRhcmdldC5sZW5ndGhcbiAgaWYgKCF0YXJnZXRTdGFydCkgdGFyZ2V0U3RhcnQgPSAwXG4gIGlmIChlbmQgPiAwICYmIGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuIDBcbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgdGhpcy5sZW5ndGggPT09IDApIHJldHVybiAwXG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBpZiAodGFyZ2V0U3RhcnQgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICB9XG4gIGlmIChzdGFydCA8IDAgfHwgc3RhcnQgPj0gdGhpcy5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgaWYgKGVuZCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0IDwgZW5kIC0gc3RhcnQpIHtcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgKyBzdGFydFxuICB9XG5cbiAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0XG4gIHZhciBpXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCAmJiBzdGFydCA8IHRhcmdldFN0YXJ0ICYmIHRhcmdldFN0YXJ0IDwgZW5kKSB7XG4gICAgLy8gZGVzY2VuZGluZyBjb3B5IGZyb20gZW5kXG4gICAgZm9yIChpID0gbGVuIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2UgaWYgKGxlbiA8IDEwMDAgfHwgIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gYXNjZW5kaW5nIGNvcHkgZnJvbSBzdGFydFxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoXG4gICAgICB0YXJnZXQsXG4gICAgICB0aGlzLnN1YmFycmF5KHN0YXJ0LCBzdGFydCArIGxlbiksXG4gICAgICB0YXJnZXRTdGFydFxuICAgIClcbiAgfVxuXG4gIHJldHVybiBsZW5cbn1cblxuLy8gVXNhZ2U6XG4vLyAgICBidWZmZXIuZmlsbChudW1iZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKGJ1ZmZlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoc3RyaW5nWywgb2Zmc2V0WywgZW5kXV1bLCBlbmNvZGluZ10pXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiBmaWxsICh2YWwsIHN0YXJ0LCBlbmQsIGVuY29kaW5nKSB7XG4gIC8vIEhhbmRsZSBzdHJpbmcgY2FzZXM6XG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IHN0YXJ0XG4gICAgICBzdGFydCA9IDBcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBlbmRcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfVxuICAgIGlmICh2YWwubGVuZ3RoID09PSAxKSB7XG4gICAgICB2YXIgY29kZSA9IHZhbC5jaGFyQ29kZUF0KDApXG4gICAgICBpZiAoY29kZSA8IDI1Nikge1xuICAgICAgICB2YWwgPSBjb2RlXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2VuY29kaW5nIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJyAmJiAhQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMjU1XG4gIH1cblxuICAvLyBJbnZhbGlkIHJhbmdlcyBhcmUgbm90IHNldCB0byBhIGRlZmF1bHQsIHNvIGNhbiByYW5nZSBjaGVjayBlYXJseS5cbiAgaWYgKHN0YXJ0IDwgMCB8fCB0aGlzLmxlbmd0aCA8IHN0YXJ0IHx8IHRoaXMubGVuZ3RoIDwgZW5kKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ091dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHN0YXJ0ID0gc3RhcnQgPj4+IDBcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyB0aGlzLmxlbmd0aCA6IGVuZCA+Pj4gMFxuXG4gIGlmICghdmFsKSB2YWwgPSAwXG5cbiAgdmFyIGlcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgICAgdGhpc1tpXSA9IHZhbFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgYnl0ZXMgPSBCdWZmZXIuaXNCdWZmZXIodmFsKVxuICAgICAgPyB2YWxcbiAgICAgIDogdXRmOFRvQnl0ZXMobmV3IEJ1ZmZlcih2YWwsIGVuY29kaW5nKS50b1N0cmluZygpKVxuICAgIHZhciBsZW4gPSBieXRlcy5sZW5ndGhcbiAgICBmb3IgKGkgPSAwOyBpIDwgZW5kIC0gc3RhcnQ7ICsraSkge1xuICAgICAgdGhpc1tpICsgc3RhcnRdID0gYnl0ZXNbaSAlIGxlbl1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbnZhciBJTlZBTElEX0JBU0U2NF9SRSA9IC9bXitcXC8wLTlBLVphLXotX10vZ1xuXG5mdW5jdGlvbiBiYXNlNjRjbGVhbiAoc3RyKSB7XG4gIC8vIE5vZGUgc3RyaXBzIG91dCBpbnZhbGlkIGNoYXJhY3RlcnMgbGlrZSBcXG4gYW5kIFxcdCBmcm9tIHRoZSBzdHJpbmcsIGJhc2U2NC1qcyBkb2VzIG5vdFxuICBzdHIgPSBzdHJpbmd0cmltKHN0cikucmVwbGFjZShJTlZBTElEX0JBU0U2NF9SRSwgJycpXG4gIC8vIE5vZGUgY29udmVydHMgc3RyaW5ncyB3aXRoIGxlbmd0aCA8IDIgdG8gJydcbiAgaWYgKHN0ci5sZW5ndGggPCAyKSByZXR1cm4gJydcbiAgLy8gTm9kZSBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgYmFzZTY0IHN0cmluZ3MgKG1pc3NpbmcgdHJhaWxpbmcgPT09KSwgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHdoaWxlIChzdHIubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgIHN0ciA9IHN0ciArICc9J1xuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZnVuY3Rpb24gc3RyaW5ndHJpbSAoc3RyKSB7XG4gIGlmIChzdHIudHJpbSkgcmV0dXJuIHN0ci50cmltKClcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxuZnVuY3Rpb24gdG9IZXggKG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpXG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KVxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIHZhciBjb2RlUG9pbnRcbiAgdmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGhcbiAgdmFyIGxlYWRTdXJyb2dhdGUgPSBudWxsXG4gIHZhciBieXRlcyA9IFtdXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvZGVQb2ludCA9IHN0cmluZy5jaGFyQ29kZUF0KGkpXG5cbiAgICAvLyBpcyBzdXJyb2dhdGUgY29tcG9uZW50XG4gICAgaWYgKGNvZGVQb2ludCA+IDB4RDdGRiAmJiBjb2RlUG9pbnQgPCAweEUwMDApIHtcbiAgICAgIC8vIGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoIWxlYWRTdXJyb2dhdGUpIHtcbiAgICAgICAgLy8gbm8gbGVhZCB5ZXRcbiAgICAgICAgaWYgKGNvZGVQb2ludCA+IDB4REJGRikge1xuICAgICAgICAgIC8vIHVuZXhwZWN0ZWQgdHJhaWxcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2UgaWYgKGkgKyAxID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAvLyB1bnBhaXJlZCBsZWFkXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkIGxlYWRcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIDIgbGVhZHMgaW4gYSByb3dcbiAgICAgIGlmIChjb2RlUG9pbnQgPCAweERDMDApIHtcbiAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gdmFsaWQgc3Vycm9nYXRlIHBhaXJcbiAgICAgIGNvZGVQb2ludCA9IChsZWFkU3Vycm9nYXRlIC0gMHhEODAwIDw8IDEwIHwgY29kZVBvaW50IC0gMHhEQzAwKSArIDB4MTAwMDBcbiAgICB9IGVsc2UgaWYgKGxlYWRTdXJyb2dhdGUpIHtcbiAgICAgIC8vIHZhbGlkIGJtcCBjaGFyLCBidXQgbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgIH1cblxuICAgIGxlYWRTdXJyb2dhdGUgPSBudWxsXG5cbiAgICAvLyBlbmNvZGUgdXRmOFxuICAgIGlmIChjb2RlUG9pbnQgPCAweDgwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDEpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goY29kZVBvaW50KVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHg4MDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiB8IDB4QzAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDMpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgfCAweEUwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSA0KSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHgxMiB8IDB4RjAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29kZSBwb2ludCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIHZhciBjLCBoaSwgbG9cbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG5cbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShiYXNlNjRjbGVhbihzdHIpKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSkgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiBpc25hbiAodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IHZhbCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNlbGYtY29tcGFyZVxufVxuIiwidmFyIGRlZ3JlZXMgPSAxODAgLyBNYXRoLlBJO1xuXG5leHBvcnQgdmFyIGlkZW50aXR5ID0ge1xuICB0cmFuc2xhdGVYOiAwLFxuICB0cmFuc2xhdGVZOiAwLFxuICByb3RhdGU6IDAsXG4gIHNrZXdYOiAwLFxuICBzY2FsZVg6IDEsXG4gIHNjYWxlWTogMVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYiwgYywgZCwgZSwgZikge1xuICB2YXIgc2NhbGVYLCBzY2FsZVksIHNrZXdYO1xuICBpZiAoc2NhbGVYID0gTWF0aC5zcXJ0KGEgKiBhICsgYiAqIGIpKSBhIC89IHNjYWxlWCwgYiAvPSBzY2FsZVg7XG4gIGlmIChza2V3WCA9IGEgKiBjICsgYiAqIGQpIGMgLT0gYSAqIHNrZXdYLCBkIC09IGIgKiBza2V3WDtcbiAgaWYgKHNjYWxlWSA9IE1hdGguc3FydChjICogYyArIGQgKiBkKSkgYyAvPSBzY2FsZVksIGQgLz0gc2NhbGVZLCBza2V3WCAvPSBzY2FsZVk7XG4gIGlmIChhICogZCA8IGIgKiBjKSBhID0gLWEsIGIgPSAtYiwgc2tld1ggPSAtc2tld1gsIHNjYWxlWCA9IC1zY2FsZVg7XG4gIHJldHVybiB7XG4gICAgdHJhbnNsYXRlWDogZSxcbiAgICB0cmFuc2xhdGVZOiBmLFxuICAgIHJvdGF0ZTogTWF0aC5hdGFuMihiLCBhKSAqIGRlZ3JlZXMsXG4gICAgc2tld1g6IE1hdGguYXRhbihza2V3WCkgKiBkZWdyZWVzLFxuICAgIHNjYWxlWDogc2NhbGVYLFxuICAgIHNjYWxlWTogc2NhbGVZXG4gIH07XG59XG4iLCJpbXBvcnQgZGVjb21wb3NlLCB7aWRlbnRpdHl9IGZyb20gXCIuL2RlY29tcG9zZVwiO1xuXG52YXIgY3NzTm9kZSxcbiAgICBjc3NSb290LFxuICAgIGNzc1ZpZXcsXG4gICAgc3ZnTm9kZTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ3NzKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gXCJub25lXCIpIHJldHVybiBpZGVudGl0eTtcbiAgaWYgKCFjc3NOb2RlKSBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKSwgY3NzUm9vdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgY3NzVmlldyA9IGRvY3VtZW50LmRlZmF1bHRWaWV3O1xuICBjc3NOb2RlLnN0eWxlLnRyYW5zZm9ybSA9IHZhbHVlO1xuICB2YWx1ZSA9IGNzc1ZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShjc3NSb290LmFwcGVuZENoaWxkKGNzc05vZGUpLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKFwidHJhbnNmb3JtXCIpO1xuICBjc3NSb290LnJlbW92ZUNoaWxkKGNzc05vZGUpO1xuICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDcsIC0xKS5zcGxpdChcIixcIik7XG4gIHJldHVybiBkZWNvbXBvc2UoK3ZhbHVlWzBdLCArdmFsdWVbMV0sICt2YWx1ZVsyXSwgK3ZhbHVlWzNdLCArdmFsdWVbNF0sICt2YWx1ZVs1XSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVN2Zyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIGlkZW50aXR5O1xuICBpZiAoIXN2Z05vZGUpIHN2Z05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XG4gIHN2Z05vZGUuc2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIsIHZhbHVlKTtcbiAgaWYgKCEodmFsdWUgPSBzdmdOb2RlLnRyYW5zZm9ybS5iYXNlVmFsLmNvbnNvbGlkYXRlKCkpKSByZXR1cm4gaWRlbnRpdHk7XG4gIHZhbHVlID0gdmFsdWUubWF0cml4O1xuICByZXR1cm4gZGVjb21wb3NlKHZhbHVlLmEsIHZhbHVlLmIsIHZhbHVlLmMsIHZhbHVlLmQsIHZhbHVlLmUsIHZhbHVlLmYpO1xufVxuIiwiZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSAoZSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSAobSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICgodmFsdWUgKiBjKSAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJleHBvcnQgY29uc3QgY2hhcnQgPSAoKSA9PiB7XG4gIGxldCBtYXJnaW4gPSB7IGxlZnQ6IDEyMCwgcmlnaHQ6IDIwLCB0b3A6IDEwLCBib3R0b206IDEzMCB9O1xuXG4gIGxldCB3aWR0aCA9IDEzMDAgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodDtcbiAgbGV0IGhlaWdodCA9IDcwMCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xuXG4gIGxldCBnID0gZDNcbiAgICAuc2VsZWN0KFwiI2NoYXJ0XCIpXG4gICAgLmFwcGVuZChcInN2Z1wiKVxuICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGggKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodClcbiAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSlcbiAgICAuYXBwZW5kKFwiZ1wiKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgbWFyZ2luLmxlZnQgKyBcIiwgXCIgKyBtYXJnaW4udG9wICsgXCIpXCIpO1xuXG4gIC8vIFggTGFiZWxcbiAgZy5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgLmF0dHIoXCJ5XCIsIGhlaWdodCArIDUwKVxuICAgIC5hdHRyKFwieFwiLCB3aWR0aCAvIDIpXG4gICAgLmF0dHIoXCJmb250LXNpemVcIiwgXCIyMHB4XCIpXG4gICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgIC50ZXh0KFwiWWVhclwiKTtcblxuICAvLyBZIExhYmVsXG4gIGcuYXBwZW5kKFwidGV4dFwiKVxuICAgIC5hdHRyKFwieVwiLCAtNjApXG4gICAgLmF0dHIoXCJ4XCIsIC0oaGVpZ2h0IC8gMikpXG4gICAgLmF0dHIoXCJmb250LXNpemVcIiwgXCIyMHB4XCIpXG4gICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwicm90YXRlKC05MClcIilcbiAgICAudGV4dChcIlRvdGFsIEFjcXVpc2l0aW9ucywgVVNEXCIpO1xuXG4gIGQzLmpzb24oXCIuLi9kYXRhL2FjcXVpc2l0aW9ucy9vYmplY3QuanNvblwiKS50aGVuKGRhdGEgPT4ge1xuICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICBkYXRhID0gZGF0YS5zbGljZSgpLnNvcnQoKGEsIGIpID0+IGQzLmFzY2VuZGluZyhhLnllYXIsIGIueWVhcikpO1xuXG4gICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcblxuICAgIGRhdGEuZm9yRWFjaChkID0+IHtcbiAgICAgIGQucHJpY2UgPSArZC5wcmljZTtcbiAgICAgIC8vY29uc29sZS5sb2coZC5wcmljZSk7XG4gICAgfSk7XG5cbiAgICBsZXQgeCA9IGQzXG4gICAgICAuc2NhbGVCYW5kKClcbiAgICAgIC5kb21haW4oXG4gICAgICAgIGRhdGEubWFwKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4gZC55ZWFyO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnJhbmdlKFswLCB3aWR0aF0pXG4gICAgICAucGFkZGluZygwLjIpO1xuXG4gICAgbGV0IHkgPSBkM1xuICAgICAgLnNjYWxlTGluZWFyKClcbiAgICAgIC5kb21haW4oW1xuICAgICAgICBkMy5taW4oZGF0YSwgZCA9PiB7XG4gICAgICAgICAgcmV0dXJuIDFlOSAqIE1hdGguZmxvb3IoZC5wcmljZSAvIDFlOSk7XG4gICAgICAgIH0pLFxuICAgICAgICBkMy5tYXgoZGF0YSwgZCA9PiB7XG4gICAgICAgICAgcmV0dXJuIDFlOSAqIE1hdGguY2VpbChkLnByaWNlIC8gMWU5KTtcbiAgICAgICAgfSlcbiAgICAgIF0pXG4gICAgICAubmljZSg3KVxuICAgICAgLnJhbmdlKFtoZWlnaHQsIDBdKTtcblxuICAgIC8vICAgeyByZXR1cm4gMWU5Kk1hdGguZmxvb3IoZFtcIlRheCBDb2xsZWN0aW9uXCJdLzFlOSk7IH0sXG4gICAgLy8gZDMubWF4KCBkYXRhLCBmdW5jdGlvbihkKXsgcmV0dXJuIDFlOSpNYXRoLmNlaWwoZFtcIlRheCBDb2xsZWN0aW9uXCJdLzFlOSk7IH1cblxuICAgIC8vIFggQXhpc1xuICAgIGxldCB4QXhpc0NhbGwgPSBkMy5heGlzQm90dG9tKHgpO1xuICAgIGcuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInggYXhpc1wiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCxcIiArIGhlaWdodCArIFwiKVwiKVxuICAgICAgLmNhbGwoeEF4aXNDYWxsKTtcblxuICAgIC8vIFkgQXhpc1xuICAgIGxldCB5QXhpc0NhbGwgPSBkM1xuICAgICAgLmF4aXNMZWZ0KHkpXG4gICAgICAvLyAudGlja3MoNylcbiAgICAgIC50aWNrRm9ybWF0KGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgaWYgKGQgIT09IDApIHtcbiAgICAgICAgICByZXR1cm4gXCIkXCIgKyBkIC8gMTAwMDAwMDAwMCArIFwiQlwiO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICBnLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ5IGF4aXNcIilcbiAgICAgIC8vIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsXCIgLSA1MCArIFwiKVwiKVxuICAgICAgLmNhbGwoeUF4aXNDYWxsKTtcblxuICAgIGxldCByZWN0cyA9IGcuc2VsZWN0QWxsKFwicmVjdFwiKS5kYXRhKGRhdGEpO1xuXG4gICAgLy9jb25zb2xlLmxvZyhoZWlnaHQpO1xuXG4gICAgcmVjdHNcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgLmF0dHIoXCJ5XCIsIGQgPT4ge1xuICAgICAgICByZXR1cm4geShkLnByaWNlKTtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcInhcIiwgZCA9PiB7XG4gICAgICAgIC8vY29uc29sZS5sb2coeChkLnllYXIpKTtcbiAgICAgICAgcmV0dXJuIHgoZC55ZWFyKTtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcImhlaWdodFwiLCBkID0+IHtcbiAgICAgICAgcmV0dXJuIGhlaWdodCAtIHkoZC5wcmljZSk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB4LmJhbmR3aWR0aClcbiAgICAgIC5hdHRyKFwiZmlsbFwiLCBcIm9yYW5nZVwiKTtcbiAgfSk7XG59O1xuIiwiaW1wb3J0IHsgY2hhcnQgfSBmcm9tIFwiLi9iYXJfY2hhcnRcIjtcbmltcG9ydCB7IGludGVyYWN0aXZlQ2hhcnQgfSBmcm9tIFwiLi9pbnRlcmFjdGl2ZV9jaGFydFwiO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIC8vIGNvbnNvbGUubG9nKFwiaGVsbG8yXCIpO1xuICBjaGFydCgpO1xuICBpbnRlcmFjdGl2ZUNoYXJ0KCk7XG59KTtcbiIsImltcG9ydCB7IFNsb3dCdWZmZXIgfSBmcm9tIFwiYnVmZmVyXCI7XG5pbXBvcnQgeyBwYXJzZVN2ZyB9IGZyb20gXCJkMy1pbnRlcnBvbGF0ZS9zcmMvdHJhbnNmb3JtL3BhcnNlXCI7XG5cbmV4cG9ydCBjb25zdCBpbnRlcmFjdGl2ZUNoYXJ0ID0gKCkgPT4ge1xuICBjb25zb2xlLmxvZyhcImdpdGh1YiB0ZXN0XCIpO1xuICBsZXQgbWFyZ2luID0geyBsZWZ0OiA4MCwgcmlnaHQ6IDIwLCB0b3A6IDUwLCBib3R0b206IDEwMCB9O1xuXG4gIGxldCB3aWR0aCA9IDkwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuICBsZXQgaGVpZ2h0ID0gNzAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG5cbiAgbGV0IGZsYWcgPSB0cnVlO1xuXG4gIHZhciB0ID0gZDMudHJhbnNpdGlvbigpLmR1cmF0aW9uKDc1MCk7XG5cbiAgbGV0IHN2ZyA9IGQzXG4gICAgLnNlbGVjdChcIiNpbnRlclwiKVxuICAgIC5hcHBlbmQoXCJzdmdcIilcbiAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXG4gICAgLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsIFwiICsgbWFyZ2luLnRvcCArIFwiKVwiKTtcblxuICAvLyAgIC8vIFggU2NhbGVcbiAgbGV0IHgwID0gZDNcbiAgICAuc2NhbGVCYW5kKClcbiAgICAucmFuZ2UoWzAsIHdpZHRoXSlcbiAgICAucGFkZGluZygwLjEpO1xuXG4gIGxldCB4MSA9IGQzLnNjYWxlQmFuZCgpO1xuXG4gIGxldCByYXdEYXRhO1xuICBsZXQgdGVzdERhdGE7XG5cbiAgbGV0IGludGVydmFsO1xuICBsZXQgY2xlYW5EYXRhO1xuXG4gIGxldCBiYXJTdGVwID0gMjc7XG5cbiAgbGV0IGJhclBhZGRpbmcgPSAzIC8gYmFyU3RlcDtcblxuICAvLyAgIC8vIFkgU2NhbGVcbiAgbGV0IHkgPSBkM1xuICAgIC5zY2FsZUxpbmVhcigpXG4gICAgLnJhbmdlKFtoZWlnaHQsIDBdKVxuICAgIC5uaWNlKDcpO1xuXG4gIGxldCB4QXhpcyA9IGQzLmF4aXNCb3R0b20oeDApLnRpY2tTaXplKDApO1xuXG4gIGxldCB5QXhpcyA9IGQzLmF4aXNMZWZ0KHkpLnRpY2tGb3JtYXQoZnVuY3Rpb24oZCkge1xuICAgIGlmIChkICE9PSAwICYmIGQgPCAxMDAwMDAwMDAwKSB7XG4gICAgICByZXR1cm4gXCIkXCIgKyBkIC8gMTAwMDAwMCArIFwiTVwiO1xuICAgIH0gZWxzZSBpZiAoZCAhPT0gMCkge1xuICAgICAgcmV0dXJuIFwiJFwiICsgZCAvIDEwMDAwMDAwMDAgKyBcIkJcIjtcbiAgICB9XG4gIH0pO1xuXG4gIGxldCB0aXAgPSBkM1xuICAgIC50aXAoKVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJkMy10aXBcIilcbiAgICAuZGlyZWN0aW9uKFwiZVwiKSAvLyBQb3NpdGlvbiB0aGUgdG9vbHRpcCB0byB0aGUgcmlnaHQgb2YgYSB0YXJnZXQgZWxlbWVudFxuICAgIC5vZmZzZXQoWy0xMCwgMF0pXG4gICAgLmh0bWwoZnVuY3Rpb24oZCkge1xuICAgICAgbGV0IHRleHQgPVxuICAgICAgICBcIjxzdHJvbmc+Q29tcGFueTo8L3N0cm9uZz4gPHNwYW4gc3R5bGU9J2NvbG9yOnJlZCc+XCIgK1xuICAgICAgICBkLmNvbXBhbnkgK1xuICAgICAgICBcIjwvc3Bhbj48YnI+XCI7XG4gICAgICB0ZXh0ICs9XG4gICAgICAgIFwiPHN0cm9uZz5TZWN0b3I6PC9zdHJvbmc+IDxzcGFuIHN0eWxlPSdjb2xvcjpyZWQ7dGV4dC10cmFuc2Zvcm06Y2FwaXRhbGl6ZSc+XCIgK1xuICAgICAgICBkLnNlY3RvciArXG4gICAgICAgIFwiPC9zcGFuPjxicj5cIjtcbiAgICAgIHRleHQgKz1cbiAgICAgICAgXCI8c3Ryb25nPlJvdW5kOjwvc3Ryb25nPiA8c3BhbiBzdHlsZT0nY29sb3I6cmVkJz5cIiArXG4gICAgICAgIGQucm91bmQgK1xuICAgICAgICBcIjwvc3Bhbj48YnI+XCI7XG4gICAgICB0ZXh0ICs9XG4gICAgICAgIFwiPHN0cm9uZz5BbW91bnQgUmFpc2VkOjwvc3Ryb25nPiA8c3BhbiBzdHlsZT0nY29sb3I6cmVkJz5cIiArXG4gICAgICAgIGQzLmZvcm1hdChcIiQsLjBmXCIpKGQuYW1vdW50UmFpc2VkKSArXG4gICAgICAgIFwiPC9zcGFuPjxicj5cIjtcbiAgICAgIHJldHVybiB0ZXh0O1xuICAgIH0pO1xuXG4gIGxldCB0aW1lTGFiZWwgPSBzdmdcbiAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJsYWJlbFwiKVxuICAgIC5hdHRyKFwieVwiLCBoZWlnaHQgKyA1MClcbiAgICAuYXR0cihcInhcIiwgd2lkdGggLSA0MClcbiAgICAvLyAuYXR0cihcImZvbnQtc2l6ZVwiLCBcIjQwcHhcIilcbiAgICAvLyAuYXR0cihcIm9wYWNpdHlcIiwgXCIwLjRcIilcbiAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgLnRleHQoXCIyMDAwXCIpO1xuXG4gIGxldCBzZWN0b3JzID0gW1wibW9iaWxlXCIsIFwic29mdHdhcmVcIiwgXCJ3ZWJcIiwgXCJlY29tbWVyY2VcIiwgXCJtZWRpY2FsXCJdO1xuICBsZXQgcm91bmRzID0gW1wic2VyaWVzLWFcIiwgXCJzZXJpZXMtYlwiLCBcImFuZ2VsXCIsIFwic2VyaWVzLWMrXCIsIFwidmVudHVyZVwiXTtcblxuICB4MC5kb21haW4ocm91bmRzKTtcbiAgeDEuZG9tYWluKHNlY3RvcnMpLnJhbmdlUm91bmQoWzAsIHgwLmJhbmR3aWR0aCgpXSk7XG5cbiAgeDAuaW52ZXJ0ID0gZnVuY3Rpb24oeCkge1xuICAgIHZhciBkb21haW4gPSB4MC5kb21haW4oKTtcbiAgICB2YXIgcmFuZ2UgPSB4MC5yYW5nZSgpO1xuICAgIHZhciBzY2FsZSA9IGQzXG4gICAgICAuc2NhbGVRdWFudGl6ZSgpXG4gICAgICAucmFuZ2UoZG9tYWluKVxuICAgICAgLmRvbWFpbihyYW5nZSk7XG4gICAgcmV0dXJuIHNjYWxlKHgpO1xuICB9O1xuXG4gIHN2Z1xuICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBcInkgYXhpc1wiKVxuICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xuICAvLy5jYWxsKHlBeGlzKTtcblxuICBzdmdcbiAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJsYWJlbFwiKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwicm90YXRlKC05MClcIilcbiAgICAuYXR0cihcInlcIiwgNilcbiAgICAuYXR0cihcImR5XCIsIFwiLjcxZW1cIilcbiAgICAuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcImVuZFwiKVxuICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwiYm9sZFwiKVxuICAgIC50ZXh0KFwiVmFsdWVcIik7XG5cbiAgLy8gdmFyIHhBeGlzR3JvdXAgPSBnXG4gIC8vICAgICAuYXBwZW5kKFwiZ1wiKVxuICAvLyAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInggYXhpc1wiKVxuICAvLyAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCxcIiArIGhlaWdodCArIFwiKVwiKTtcblxuICAvLyAgIHZhciB5QXhpc0dyb3VwID0gZy5hcHBlbmQoXCJnXCIpLmF0dHIoXCJjbGFzc1wiLCBcInkgYXhpc1wiKTtcblxuICAvLyB2YXIgY29sb3IgPSBkMy5zY2FsZVxuICAvLyAgIC5vcmRpbmFsKClcbiAgLy8gICAucmFuZ2UoW1wiI2NhMDAyMFwiLCBcIiNmNGE1ODJcIiwgXCIjZDVkNWQ1XCIsIFwiIzkyYzVkZVwiLCBcIiMwNTcxYjBcIl0pO1xuXG4gIHZhciBjb2xvciA9IGQzLnNjYWxlT3JkaW5hbChkMy5zY2hlbWVTZXQxKTtcblxuICBsZXQgdGltZSA9IDA7XG5cbiAgbGV0IHgzID0gZDMuc2NhbGVMaW5lYXIoKS5yYW5nZShbbWFyZ2luLmxlZnQsIHdpZHRoIC0gbWFyZ2luLnJpZ2h0XSk7XG5cbiAgbGV0IHhBeGlzMiA9IGcgPT5cbiAgICBnXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwieC1heGlzXCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKDAgLCR7bWFyZ2luLnRvcH0pYClcbiAgICAgIC5jYWxsKGQzLmF4aXNUb3AoeDMpLnRpY2tzKHdpZHRoIC8gMTUwLCBcInNcIikpXG4gICAgICAuY2FsbChnID0+IChnLnNlbGVjdGlvbiA/IGcuc2VsZWN0aW9uKCkgOiBnKS5zZWxlY3QoXCIuZG9tYWluXCIpLnJlbW92ZSgpKTtcblxuICBsZXQgeUF4aXMyID0gZyA9PlxuICAgIGdcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ5LWF4aXNcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHttYXJnaW4ubGVmdCArIDAuNX0sMClgKVxuICAgICAgLmNhbGwoZyA9PlxuICAgICAgICBnXG4gICAgICAgICAgLmFwcGVuZChcImxpbmVcIilcbiAgICAgICAgICAuYXR0cihcInN0cm9rZVwiLCBcImN1cnJlbnRDb2xvclwiKVxuICAgICAgICAgIC5hdHRyKFwieTFcIiwgbWFyZ2luLnRvcClcbiAgICAgICAgICAuYXR0cihcInkyXCIsIGhlaWdodCAtIG1hcmdpbi5ib3R0b20gLSA1MClcbiAgICAgICk7XG5cbiAgZDMuanNvbihcIi4vZGF0YS9mdW5kaW5nL3Rlc3RfZGF0YS5qc29uXCIpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgIHRlc3REYXRhID0gZGF0YTtcbiAgfSk7XG5cbiAgZDMuanNvbihcIi4vZGF0YS9mdW5kaW5nL2NsZWFuX25ld19mdW5kaW5nLmpzb25cIikudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICAvLyByYXdEYXRhID0gZGF0YTtcblxuICAgIC8vIGNsZWFuRGF0YSA9IGQzXG4gICAgLy8gICAubmVzdCgpXG4gICAgLy8gICAvLyAgICAgLy8gLmtleShmdW5jdGlvbihkKSB7XG4gICAgLy8gICAvLyAgICAgLy8gICByZXR1cm4gZC5mdW5kZWQ7XG4gICAgLy8gICAvLyAgICAgLy8gfSlcbiAgICAvLyAgIC5rZXkoZnVuY3Rpb24oZCkge1xuICAgIC8vICAgICByZXR1cm4gZC5mdW5kZWQ7XG4gICAgLy8gICB9KVxuICAgIC8vICAgLnNvcnRLZXlzKGQzLmFzY2VuZGluZylcbiAgICAvLyAgIC5rZXkoZnVuY3Rpb24oZCkge1xuICAgIC8vICAgICByZXR1cm4gZC5yb3VuZDtcbiAgICAvLyAgIH0pXG4gICAgLy8gICAua2V5KGZ1bmN0aW9uKGQpIHtcbiAgICAvLyAgICAgcmV0dXJuIGQuc2VjdG9yO1xuICAgIC8vICAgfSlcbiAgICAvLyAgIC5yb2xsdXAoZnVuY3Rpb24odikge1xuICAgIC8vICAgICByZXR1cm4gZDMuc3VtKHYsIGZ1bmN0aW9uKGQpIHtcbiAgICAvLyAgICAgICByZXR1cm4gZC5hbW91bnRSYWlzZWQ7XG4gICAgLy8gICAgIH0pO1xuICAgIC8vICAgfSlcbiAgICAvLyAgIC5lbnRyaWVzKHJhd0RhdGEpO1xuXG4gICAgY2xlYW5EYXRhID0gZGF0YTtcblxuICAgIGNvbnNvbGUubG9nKHRlc3REYXRhKTtcblxuICAgIC8vIHZhciByb3VuZHMgPSBjbGVhbkRhdGEubWFwKGZ1bmN0aW9uKGQpIHtcbiAgICAvLyAgIHJldHVybiBkLnZhbHVlc1xuICAgIC8vICAgICAuZmlsdGVyKGVsZSA9PiB7XG4gICAgLy8gICAgICAgaWYgKGVsZS5rZXkpIHJldHVybiBlbGUua2V5O1xuICAgIC8vICAgICB9KVxuICAgIC8vICAgICAubWFwKGVsZTIgPT4ge1xuICAgIC8vICAgICAgIHJldHVybiBlbGUyLmtleTtcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfSk7XG5cbiAgICBsZXQgZWxlbWVudHMgPSBjbGVhbkRhdGFbMF0udmFsdWVzLm1hcChlbGUgPT4ge1xuICAgICAgcmV0dXJuIGVsZTtcbiAgICB9KTtcblxuICAgIC8vIHgxLmRvbWFpbihzZWN0b3JzKS5yYW5nZVJvdW5kKFswLCB4MC5iYW5kd2lkdGgoKV0pO1xuXG4gICAgLy8geDEuZG9tYWluKFxuICAgIC8vICAgY2xlYW5EYXRhWzBdLnZhbHVlc1swXS52YWx1ZXMubWFwKGVsZSA9PiB7XG4gICAgLy8gICAgIHJldHVybiBlbGUua2V5O1xuICAgIC8vICAgfSlcbiAgICAvLyApLnJhbmdlUm91bmQoWzAsIHgwLmJhbmR3aWR0aCgpXSk7XG5cbiAgICAvLyB5LmRvbWFpbihbXG4gICAgLy8gICAwLFxuICAgIC8vICAgZDMubWF4KGNsZWFuRGF0YVswXS52YWx1ZXMsIGZ1bmN0aW9uKHJvdW5kcykge1xuICAgIC8vICAgICByZXR1cm4gZDMubWF4KHJvdW5kcy52YWx1ZXMsIGZ1bmN0aW9uKGQpIHtcbiAgICAvLyAgICAgICByZXR1cm4gZC52YWx1ZTtcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gICB9KVxuICAgIC8vIF0pO1xuXG4gICAgc3ZnXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInggYXhpc1wiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCxcIiArIGhlaWdodCArIFwiKVwiKVxuICAgICAgLmNhbGwoeEF4aXMpO1xuXG4gICAgLy8gZDMuaW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgLy8gICAvLyBBdCB0aGUgZW5kIG9mIG91ciBkYXRhLCBsb29wIGJhY2tcbiAgICAvLyAgIHRpbWUgPSB0aW1lIDwgMTQgPyB0aW1lICsgMSA6IDA7XG4gICAgLy8gICB1cGRhdGUoY2xlYW5EYXRhW3RpbWVdKTtcbiAgICAvLyB9LCA1MDAwKTtcblxuICAgIC8vIEZpcnN0IHJ1biBvZiB0aGUgdmlzdWFsaXphdGlvblxuICAgIHVwZGF0ZShjbGVhbkRhdGFbMF0pO1xuICB9KTtcblxuICAvLyBsZXQgYnV0dG9uID0gZDMuc2VsZWN0KFwiI3BsYXktYnV0dG9uXCIpO1xuICAvLyBjb25zb2xlLmxvZyhidXR0b24pO1xuXG4gICQoXCIjcGxheS1idXR0b25cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgYnV0dG9uID0gJCh0aGlzKTtcbiAgICBpZiAoYnV0dG9uLnRleHQoKSA9PSBcIlBsYXlcIikge1xuICAgICAgYnV0dG9uLnRleHQoXCJQYXVzZVwiKTtcbiAgICAgIGludGVydmFsID0gc2V0SW50ZXJ2YWwoc3RlcCwgMzAwMCk7XG4gICAgICBzdGVwKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1dHRvbi50ZXh0KFwiUGxheVwiKTtcbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIH1cbiAgfSk7XG5cbiAgJChcIiNyZXNldC1idXR0b25cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICB0aW1lID0gMDtcbiAgICB1cGRhdGUoY2xlYW5EYXRhWzBdKTtcbiAgfSk7XG5cbiAgJChcIiNpbmR1c3RyeS1zZWxlY3RcIikub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XG4gICAgdXBkYXRlKGNsZWFuRGF0YVt0aW1lXSk7XG4gIH0pO1xuXG4gICQoXCIjZGF0ZS1zbGlkZXJcIikuc2xpZGVyKHtcbiAgICBtYXg6IDIwMTMsXG4gICAgbWluOiAyMDAwLFxuICAgIHN0ZXA6IDEsXG4gICAgYW5pbWF0ZTogXCJzbG93XCIsXG4gICAgc2xpZGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuICAgICAgdGltZSA9IHVpLnZhbHVlIC0gMjAwMDtcbiAgICAgIHVwZGF0ZShjbGVhbkRhdGFbdGltZV0pO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gc3RlcCgpIHtcbiAgICAvLyBBdCB0aGUgZW5kIG9mIG91ciBkYXRhLCBsb29wIGJhY2tcbiAgICB0aW1lID0gdGltZSA8IDE0ID8gdGltZSArIDEgOiAwO1xuICAgIHVwZGF0ZShjbGVhbkRhdGFbdGltZV0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKGRhdGEpIHtcbiAgICBsZXQgZWxlbWVudHMgPSBkYXRhLnZhbHVlcy5tYXAoZWxlID0+IHtcbiAgICAgIHJldHVybiBlbGU7XG4gICAgfSk7XG5cbiAgICAvLyBkYXRhID0gZGF0YS5zbGljZSgpLmFycmF5LmZvckVhY2goZWxlbWVudCA9PiB7fSk7XG5cbiAgICB5LmRvbWFpbihbXG4gICAgICAwLFxuICAgICAgZDMubWF4KGRhdGEudmFsdWVzLCBmdW5jdGlvbihyb3VuZHMpIHtcbiAgICAgICAgcmV0dXJuIGQzLm1heChyb3VuZHMudmFsdWVzLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIGQudmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICBdKTtcblxuICAgIC8vLmNhbGwoeUF4aXMpO1xuXG4gICAgbGV0IHNsaWNlMiA9IHN2Z1xuICAgICAgLnNlbGVjdEFsbChcIi5zbGljZVwiKVxuICAgICAgLmRhdGEoZGF0YS52YWx1ZXMpXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJnXCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBcInRyYW5zbGF0ZShcIiArIHgwKGQua2V5KSArIFwiLDApXCI7XG4gICAgICB9KTtcblxuICAgIGxldCByZWN0cyA9IHNsaWNlMi5zZWxlY3RBbGwoXCJyZWN0XCIpLmRhdGEoZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIGQudmFsdWVzLmZpbHRlcihmdW5jdGlvbihkKSB7XG4gICAgICAgIGlmIChkMy5zZWxlY3QoXCIjaW5kdXN0cnktc2VsZWN0XCIpLm5vZGUoKS52YWx1ZSA9PSBcImFsbFwiKSB7XG4gICAgICAgICAgcmV0dXJuIGQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGQua2V5ID09IGQzLnNlbGVjdChcIiNpbmR1c3RyeS1zZWxlY3RcIikubm9kZSgpLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHN2Z1xuICAgICAgLnNlbGVjdEFsbChcInJlY3RcIilcbiAgICAgIC50cmFuc2l0aW9uKHQpXG4gICAgICAuZGVsYXkoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIDUwO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIHkoMCk7XG4gICAgICB9KVxuICAgICAgLnJlbW92ZSgpO1xuXG4gICAgY29uc29sZS5sb2cocmVjdHMpO1xuXG4gICAgcmVjdHNcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgLy8gLmF0dHIoXCJjbGFzc1wiLCBcImVudGVyXCIpXG4gICAgICAuYXR0cihcIndpZHRoXCIsIHgxLmJhbmR3aWR0aClcbiAgICAgIC5hdHRyKFwieFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coeDEoZC5rZXkpLCBkLmtleSk7XG4gICAgICAgIHJldHVybiB4MShkLmtleSk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJkYXRhLWxlZ2VuZFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBkLmtleTtcbiAgICAgIH0pXG4gICAgICAuc3R5bGUoXCJmaWxsXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGNvbG9yKGQua2V5KTtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4geSgwKTtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSlcbiAgICAgIC5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgbGV0IHJvdW5kID0geDAuaW52ZXJ0KFxuICAgICAgICAgIHBhcnNlU3ZnKGQzLnNlbGVjdCh0aGlzLnBhcmVudE5vZGUpLmF0dHIoXCJ0cmFuc2Zvcm1cIikpLnRyYW5zbGF0ZVhcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBkMy5zZWxlY3QoXCJnXCIpLlxuICAgICAgICAvLyB0cmFuc2l0aW9uKHQpLnJlbW92ZSgpO1xuICAgICAgICBkcmlsbERvd24oZCwgc2xpY2UyLCByb3VuZCk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICBkMy5zZWxlY3QodGhpcykuc3R5bGUoXCJmaWxsXCIsIGQzLnJnYihjb2xvcihkLmtleSkpLmRhcmtlcigyKSk7XG4gICAgICB9KVxuICAgICAgLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICBkMy5zZWxlY3QodGhpcykuc3R5bGUoXCJmaWxsXCIsIGNvbG9yKGQua2V5KSk7XG4gICAgICB9KVxuICAgICAgLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgaWYgKGQzLnNlbGVjdChcIiNwbGF5LWJ1dHRvblwiKS50ZXh0KCkgPT09IFwiUGxheVwiKSB7XG4gICAgICAgICAgZDMuc2VsZWN0QWxsKFwicmVjdFwiKVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDEwMClcbiAgICAgICAgICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgIHJldHVybiB5KGQudmFsdWUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhlaWdodCAtIHkoZC52YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgLy8ubWVyZ2UocmVjdHMpXG4gICAgICAudHJhbnNpdGlvbih0KVxuICAgICAgLmRlbGF5KGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAxMDAwO1xuICAgICAgfSlcbiAgICAgIC8vLmR1cmF0aW9uKDUwMClcbiAgICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiB5KGQudmFsdWUpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGhlaWdodCAtIHkoZC52YWx1ZSk7XG4gICAgICB9KTtcblxuICAgIGxldCByZWN0czIgPSBzbGljZTIuc2VsZWN0QWxsKFwicmVjdFwiKTtcbiAgICBsZXQgYnV0dG9uMiA9IGQzLnNlbGVjdChcIiNwbGF5LWJ1dHRvblwiKTtcblxuICAgIHN2Z1xuICAgICAgLnNlbGVjdEFsbChcImcueS5heGlzXCIpXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgIC5kZWxheSgzMDApXG4gICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKVxuICAgICAgLmNhbGwoeUF4aXMpO1xuICAgIHN2Zy5zZWxlY3RBbGwoXCJnLmxlZ2VuZFwiKS5yZW1vdmUoKTtcblxuICAgIGRyYXdMZWdlbmQuY2FsbCh0aGlzKTtcblxuICAgIC8vIGQzLnNlbGVjdEFsbChcIi55XCIpXG4gICAgLy8gICAudHJhbnNpdGlvbigpXG4gICAgLy8gICAuZHVyYXRpb24oMTAwMClcbiAgICAvLyAgIC5kZWxheSgzMDApXG4gICAgLy8gICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKTtcblxuICAgIHRpbWVMYWJlbC50ZXh0KCsodGltZSArIDIwMDApKTtcblxuICAgICQoXCIjeWVhclwiKVswXS5pbm5lckhUTUwgPSArKHRpbWUgKyAyMDAwKTtcblxuICAgICQoXCIjZGF0ZS1zbGlkZXJcIikuc2xpZGVyKFwidmFsdWVcIiwgKyh0aW1lICsgMjAwMCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZHJhd0xlZ2VuZCgpIHtcbiAgICBjb25zdCBsZWdlbmQgPSBkM1xuICAgICAgLnNlbGVjdChcImdcIilcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIixcbiAgICAgICAgXCJ0cmFuc2xhdGUoXCIgK1xuICAgICAgICAgIChtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodCArIDYwKSArXG4gICAgICAgICAgXCIsXCIgK1xuICAgICAgICAgIChoZWlnaHQgKyAzMCkgK1xuICAgICAgICAgIFwiKVwiXG4gICAgICApXG4gICAgICAuc2VsZWN0QWxsKFwiZ1wiKVxuICAgICAgLmRhdGEoc2VjdG9ycylcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImxlZ2VuZFwiKTtcblxuICAgIGxlZ2VuZFxuICAgICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAgIC5hdHRyKFwiZmlsbFwiLCAoZCwgaSkgPT4gY29sb3IoZCkpIC8vICAgY29uc3QgY29sb3IgPSBkMy5zY2FsZU9yZGluYWwoZDMuc2NoZW1lQ2F0ZWdvcnkxMCk7XG4gICAgICAuYXR0cihcImhlaWdodFwiLCAxNSlcbiAgICAgIC5hdHRyKFwid2lkdGhcIiwgMTUpO1xuXG4gICAgbGVnZW5kXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLmF0dHIoXCJ4XCIsIDE4KVxuICAgICAgLmF0dHIoXCJ5XCIsIDEwKVxuICAgICAgLmF0dHIoXCJkeVwiLCBcIi4xNWVtXCIpXG4gICAgICAudGV4dCgoZCwgaSkgPT4gZClcbiAgICAgIC5zdHlsZShcInRleHQtYW5jaG9yXCIsIFwic3RhcnRcIilcbiAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCAxMik7XG5cbiAgICAvLyBOb3cgc3BhY2UgdGhlIGdyb3VwcyBvdXQgYWZ0ZXIgdGhleSBoYXZlIGJlZW4gYXBwZW5kZWQ6XG4gICAgY29uc3QgcGFkZGluZyA9IDEwO1xuICAgIGxlZ2VuZC5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIFwidHJhbnNsYXRlKFwiICtcbiAgICAgICAgKGQzLnN1bShzZWN0b3JzLCBmdW5jdGlvbihlLCBqKSB7XG4gICAgICAgICAgaWYgKGogPCBpKSB7XG4gICAgICAgICAgICByZXR1cm4gbGVnZW5kLm5vZGVzKClbal0uZ2V0QkJveCgpLndpZHRoO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pICtcbiAgICAgICAgICBwYWRkaW5nICogaSkgK1xuICAgICAgICBcIiwwKVwiXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gYmFyKHN2ZzIsIGRvd24sIGRhdGEsIHNlbGVjdG9yKSB7XG4gICAgY29uc3QgZyA9IHN2ZzJcbiAgICAgIC5pbnNlcnQoXCJnXCIsIHNlbGVjdG9yKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImVudGVyXCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKDAsJHs1MCArIGJhclN0ZXAgKiBiYXJQYWRkaW5nfSlgKVxuICAgICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcImVuZFwiKVxuICAgICAgLnN0eWxlKFwiZm9udFwiLCBcIjE4cHggc2Fucy1zZXJpZlwiKTtcblxuICAgIGNvbnN0IGJhciA9IGdcbiAgICAgIC5zZWxlY3RBbGwoXCJnXCIpXG4gICAgICAuZGF0YShkYXRhKVxuICAgICAgLmpvaW4oXCJnXCIpXG4gICAgICAuYXR0cihcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgIC8vICAub24oXCJjbGlja1wiLCBkID0+IHVwZGF0ZShjbGVhbkRhdGFbdGltZV0pKVxuICAgICAgLm9uKFwibW91c2VvdmVyXCIsIHRpcC5zaG93KVxuICAgICAgLm9uKFwibW91c2VvdXRcIiwgdGlwLmhpZGUpO1xuXG4gICAgYmFyXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLmF0dHIoXCJ4XCIsIDgwIC0gMilcbiAgICAgIC5hdHRyKFwieVwiLCAoMjcgKiAoMSAtIDAuMSkpIC8gMilcbiAgICAgIC5hdHRyKFwiZHlcIiwgXCIuMzVlbVwiKVxuICAgICAgLnRleHQoZCA9PiBkLmNvbXBhbnkpO1xuXG4gICAgYmFyXG4gICAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgLmF0dHIoXCJ4XCIsIHgzKDApKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImJhclwiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHgzKDApKTtcbiAgICAgICAgcmV0dXJuIHgzKGQuYW1vdW50UmFpc2VkKSAtIHgzKDApO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIDI3ICogKDEgLSAwLjMpKTtcblxuICAgIHJldHVybiBnO1xuICB9XG5cbiAgZnVuY3Rpb24gZHJpbGxEb3duKGQsIHNsaWNlLCByb3VuZCkge1xuICAgIGxldCB1bnNvcnRlZERhdGEgPSB0ZXN0RGF0YVt0aW1lXTtcbiAgICBjb25zdCBkdXJhdGlvbiA9IDcwMDtcbiAgICBjb25zdCB0cmFuc2l0aW9uMSA9IGQzLnRyYW5zaXRpb24oKS5kdXJhdGlvbihkdXJhdGlvbik7XG4gICAgY29uc3QgdHJhbnNpdGlvbjIgPSB0cmFuc2l0aW9uMS50cmFuc2l0aW9uKCk7XG5cbiAgICBjb25zb2xlLmxvZyh1bnNvcnRlZERhdGEpO1xuICAgIGNvbnNvbGUubG9nKGQpO1xuICAgIGNvbnNvbGUubG9nKHJvdW5kKTtcbiAgICBjb25zb2xlLmxvZyh0ZXN0RGF0YSk7XG5cbiAgICBsZXQgYWIgPSB0ZXN0RGF0YS5tYXAoZWxlID0+IE9iamVjdC52YWx1ZXMoZWxlKSk7XG5cbiAgICBsZXQgbmV3RGF0YSA9IHVuc29ydGVkRGF0YS52YWx1ZXMuZmlsdGVyKGVsZSA9PiB7XG4gICAgICBpZiAoZWxlLmtleSA9PT0gZC5rZXkpIHtcbiAgICAgICAgcmV0dXJuIGVsZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBuZXdEYXRhMiA9IG5ld0RhdGFbMF0udmFsdWVzLmZpbHRlcihlbGUgPT4ge1xuICAgICAgaWYgKGVsZS5yb3VuZCA9PT0gcm91bmQpIHtcbiAgICAgICAgcmV0dXJuIGVsZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBuZXdEYXRhMyA9IG5ld0RhdGEyXG4gICAgICAuc2xpY2UoKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IGQzLmRlc2NlbmRpbmcoYS5hbW91bnRSYWlzZWQsIGIuYW1vdW50UmFpc2VkKSlcbiAgICAgIC5zbGljZSgwLCAxMCk7XG5cbiAgICBsZXQgbGluZUNoYXJ0RGF0YSA9IGdldERhdGEoZCwgcm91bmQpO1xuXG4gICAgY29uc29sZS5sb2cobGluZUNoYXJ0RGF0YSk7XG5cbiAgICBjb25zb2xlLmxvZyhuZXdEYXRhMyk7XG5cbiAgICBjb25zb2xlLmxvZyhuZXdEYXRhMik7XG5cbiAgICAvLyBsZXQgcmVjdHMgPSBnLnNlbGVjdEFsbChcInJlY3RcIikuZGF0YShuZXdEYXRhKTtcbiAgICBsZXQgZGF0YSA9IG5ld0RhdGEzO1xuXG4gICAgZDMuc2VsZWN0QWxsKFwic3ZnXCIpLnJlbW92ZSgpO1xuXG4gICAgJChcIiNyZXNldC1idXR0b25cIikudGV4dChcIkdvIEJhY2tcIik7XG4gICAgJChcIiNyZXNldC1idXR0b25cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgIHJlc3RvcmUoKTtcbiAgICB9KTtcblxuICAgIGQzLnNlbGVjdChcIiNwbGF5LWJ1dHRvblwiKS5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xuICAgIC8vIGQzLnNlbGVjdChcIiNyZXNldC1idXR0b25cIikuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcbiAgICBkMy5zZWxlY3QoXCIjc2xpZGVyLWRpdlwiKS5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xuICAgIGQzLnNlbGVjdChcIiNpbmR1c3RyeS1zZWxlY3RcIikuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcbiAgICBkMy5zZWxlY3QoXCIjeWVhclwiKS5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xuICAgIGQzLnNlbGVjdEFsbChcInRleHRcIikuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcblxuICAgIC8vIGcuc2VsZWN0QWxsKFwiZy54LmF4aXNcIikucmVtb3ZlKCk7XG4gICAgLy8gc2xpY2UucmVtb3ZlKCk7XG5cbiAgICBjb25zdCBzdmcyID0gZDNcbiAgICAgIC5zZWxlY3QoXCIjZHJpbGxkb3duXCIpXG4gICAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXG4gICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSlcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsIFwiICsgbWFyZ2luLnRvcCArIFwiKVwiKTtcblxuICAgIHN2ZzIuY2FsbCh0aXApO1xuXG4gICAgeDMuZG9tYWluKFswLCBkYXRhWzBdLmFtb3VudFJhaXNlZF0pO1xuICAgIGNvbnNvbGUubG9nKHgzLmRvbWFpbigpKTtcblxuICAgIHN2ZzJcbiAgICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwiYmFja2dyb3VuZFwiKVxuICAgICAgLmF0dHIoXCJmaWxsXCIsIFwibm9uZVwiKVxuICAgICAgLmF0dHIoXCJwb2ludGVyLWV2ZW50c1wiLCBcImFsbFwiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcbiAgICAgIC5hdHRyKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgLm9uKFwiZGJsY2xpY2tcIiwgZCA9PiB7XG4gICAgICAgIGQzLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJlc3RvcmUoZCk7XG4gICAgICB9KTtcbiAgICAvLyAub24oXCJjbGlja1wiLCBkID0+IHVwKHN2ZywgZCkpO1xuXG4gICAgc3ZnMi5hcHBlbmQoXCJnXCIpLmNhbGwoeEF4aXMyKTtcblxuICAgIHN2ZzIuYXBwZW5kKFwiZ1wiKS5jYWxsKHlBeGlzMik7XG5cbiAgICBsZXQgcGxhY2Vob2xkZXIgPSBkLmtleTtcblxuICAgIHN2ZzJcbiAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwidGl0bGVcIilcbiAgICAgIC5hdHRyKFwieFwiLCB3aWR0aCAvIDIpXG4gICAgICAuYXR0cihcInlcIiwgLTEwKVxuICAgICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgICAgLnRleHQoXG4gICAgICAgIGQgPT5cbiAgICAgICAgICBgTGFyZ2VzdCAke3JvdW5kfSByb3VuZHMgaW4gdGhlICR7cGxhY2Vob2xkZXJ9IGludWRzdHJ5IGluICR7dGltZSArXG4gICAgICAgICAgICAyMDAwfWBcbiAgICAgICk7XG5cbiAgICAvLyBzdmcyLmNhbGwodGlwKVxuXG4gICAgLy8gLm9uKFwiY2xpY2tcIiwgZCA9PiB1cChzdmcsIGQpKTtcblxuICAgIGNvbnN0IGVudGVyID0gYmFyKHN2ZzIsIGRyaWxsRG93biwgZGF0YSwgXCIueS1heGlzXCIpLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgMCk7XG4gICAgY29uc29sZS5sb2coZW50ZXIpO1xuICAgIGVudGVyLnRyYW5zaXRpb24odHJhbnNpdGlvbjEpLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgMSk7XG5cbiAgICAvLyBUcmFuc2l0aW9uIGVudGVyaW5nIGJhcnMgdG8gdGhlaXIgbmV3IHktcG9zaXRpb24uXG4gICAgZW50ZXJcbiAgICAgIC5zZWxlY3RBbGwoXCJnXCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBzdGFjayhkLmluZGV4KSlcbiAgICAgIC50cmFuc2l0aW9uKHRyYW5zaXRpb24xKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgc3RhZ2dlcigpKTtcblxuICAgIC8vIFVwZGF0ZSB0aGUgeC1zY2FsZSBkb21haW4uXG5cbiAgICAvLyBVcGRhdGUgdGhlIHgtYXhpcy5cbiAgICBzdmcyXG4gICAgICAuc2VsZWN0QWxsKFwiLngtYXhpc1wiKVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmNhbGwoeEF4aXMyKTtcblxuICAgIC8vIFRyYW5zaXRpb24gZW50ZXJpbmcgYmFycyB0byB0aGUgbmV3IHgtc2NhbGUuXG4gICAgZW50ZXJcbiAgICAgIC5zZWxlY3RBbGwoXCJnXCIpXG4gICAgICAudHJhbnNpdGlvbih0cmFuc2l0aW9uMilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIChkLCBpKSA9PiBgdHJhbnNsYXRlKDAsJHtiYXJTdGVwICogaX0pYCk7XG5cbiAgICAvLyBDb2xvciB0aGUgYmFycyBhcyBwYXJlbnRzOyB0aGV5IHdpbGwgZmFkZSB0byBjaGlsZHJlbiBpZiBhcHByb3ByaWF0ZS5cbiAgICBlbnRlclxuICAgICAgLnNlbGVjdEFsbChcInJlY3RcIilcbiAgICAgIC50cmFuc2l0aW9uKHQpXG4gICAgICAuYXR0cihcImZpbGxcIiwgZCA9PiBjb2xvcihkLnNlY3RvcikpXG4gICAgICAuYXR0cihcImZpbGwtb3BhY2l0eVwiLCAxKVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmF0dHIoXCJmaWxsXCIsIGQgPT4gY29sb3IoZC5zZWN0b3IpKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCBkID0+IHgzKGQuYW1vdW50UmFpc2VkKSk7XG5cbiAgICBidWlsZExpbmVDaGFydChsaW5lQ2hhcnREYXRhLCBwbGFjZWhvbGRlciwgcm91bmQpO1xuXG4gICAgLy8gZDMuc2VsZWN0QWxsKFwic3ZnXCIpXG4gICAgLy8gICAuYXR0cihcImNsYXNzXCIsIFwiYmFja2dyb3VuZFwiKVxuICAgIC8vICAgLy8gLmF0dHIoXCJmaWxsXCIsIFwibm9uZVwiKVxuICAgIC8vICAgLmF0dHIoXCJwb2ludGVyLWV2ZW50c1wiLCBcImFsbFwiKVxuICAgIC8vICAgLy8gLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCArIG1hcmdpbi5yaWdodCArIG1hcmdpbi5sZWZ0KVxuICAgIC8vICAgLy8gLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgIC8vICAgLmF0dHIoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgLy8gICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtMjUwLCAtMzApXCIpXG4gICAgLy8gICAub24oXCJkYmxjbGlja1wiLCBkID0+IHtcbiAgICAvLyAgICAgZDMuZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyAgICAgcmVzdG9yZShkKTtcbiAgICAvLyAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhY2soaSkge1xuICAgIGxldCB2YWx1ZSA9IDA7XG4gICAgcmV0dXJuIGQgPT4ge1xuICAgICAgY29uc3QgdCA9IGB0cmFuc2xhdGUoJHt4Myh2YWx1ZSl9LCR7YmFyU3RlcCAqIGl9KWA7XG4gICAgICB2YWx1ZSArPSBkLmFtb3VudFJhaXNlZDtcbiAgICAgIHJldHVybiB0O1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBzdGFnZ2VyKCkge1xuICAgIGxldCB2YWx1ZSA9IDA7XG4gICAgcmV0dXJuIChkLCBpKSA9PiB7XG4gICAgICBjb25zdCB0ID0gYHRyYW5zbGF0ZSgke3gzKHZhbHVlKX0sJHtiYXJTdGVwICogaX0pYDtcbiAgICAgIHZhbHVlICs9IGQuYW1vdW50UmFpc2VkO1xuICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldERhdGEoZCwgcm91bmQpIHtcbiAgICBsZXQgcmVzdWx0cyA9IFtdO1xuXG4gICAgbGV0IGkgPSAwO1xuXG4gICAgd2hpbGUgKGkgPCAxNCkge1xuICAgICAgbGV0IG9iaiA9IHt9O1xuICAgICAgbGV0IHVuc29ydGVkRGF0YSA9IHRlc3REYXRhW2ldO1xuXG4gICAgICBsZXQgbmV3RGF0YSA9IHVuc29ydGVkRGF0YS52YWx1ZXMuZmlsdGVyKGVsZSA9PiB7XG4gICAgICAgIGlmIChlbGUua2V5ID09PSBkLmtleSkge1xuICAgICAgICAgIHJldHVybiBlbGU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAobmV3RGF0YVswXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaCh7IHk6IDAgfSk7XG4gICAgICAgIGkrKztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGxldCBuZXdEYXRhMiA9IG5ld0RhdGFbMF0udmFsdWVzLmZpbHRlcihlbGUgPT4ge1xuICAgICAgICBpZiAoZWxlLnJvdW5kID09PSByb3VuZCkge1xuICAgICAgICAgIHJldHVybiBlbGU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBsZXQgc3VtID0gMDtcblxuICAgICAgbmV3RGF0YTIuZm9yRWFjaChlbGUgPT4ge1xuICAgICAgICBzdW0gKz0gZWxlLmFtb3VudFJhaXNlZDtcbiAgICAgIH0pO1xuICAgICAgb2JqW1wieVwiXSA9IHN1bTtcbiAgICAgIHJlc3VsdHMucHVzaChvYmopO1xuICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1aWxkTGluZUNoYXJ0KGxpbmVDaGFydERhdGEsIHBsYWNlaG9sZGVyLCByb3VuZCkge1xuICAgIGxldCBuID0gMTM7XG4gICAgbGV0IHNvcnRlZERhdGEgPSBsaW5lQ2hhcnREYXRhXG4gICAgICAuc2xpY2UoKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IGQzLmRlc2NlbmRpbmcoYS55LCBiLnkpKTtcblxuICAgIGNvbnNvbGUubG9nKHNvcnRlZERhdGEpO1xuXG4gICAgbGV0IHhTY2FsZTMgPSBkM1xuICAgICAgLnNjYWxlTGluZWFyKClcbiAgICAgIC5kb21haW4oWzIwMDAsIDIwMTNdKSAvLyBpbnB1dFxuICAgICAgLnJhbmdlKFswLCB3aWR0aF0pO1xuICAgIC8vIG9cblxuICAgIGxldCB5U2NhbGUgPSBkM1xuICAgICAgLnNjYWxlTGluZWFyKClcbiAgICAgIC5kb21haW4oWzAsIHNvcnRlZERhdGFbMF0ueV0pIC8vIGlucHV0XG4gICAgICAucmFuZ2UoW2hlaWdodCwgMF0pO1xuXG4gICAgY29uc29sZS5sb2coeVNjYWxlLmRvbWFpbigpKTtcblxuICAgIGxldCBkaXYgPSBkM1xuICAgICAgLnNlbGVjdChcImJvZHlcIilcbiAgICAgIC5hcHBlbmQoXCJkaXZcIikgLy8gZGVjbGFyZSB0aGUgdG9vbHRpcCBkaXZcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ0b29sdGlwXCIpIC8vIGFwcGx5IHRoZSAndG9vbHRpcCcgY2xhc3NcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG5cbiAgICBsZXQgbGluZSA9IGQzXG4gICAgICAubGluZSgpXG4gICAgICAueChmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiB4U2NhbGUzKGkgKyAyMDAwKTtcbiAgICAgIH0pIC8vIHNldCB0aGUgeCB2YWx1ZXMgZm9yIHRoZSBsaW5lIGdlbmVyYXRvclxuICAgICAgLnkoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4geVNjYWxlKGQueSk7XG4gICAgICB9KSAvLyBzZXQgdGhlIHkgdmFsdWVzIGZvciB0aGUgbGluZSBnZW5lcmF0b3JcbiAgICAgIC5jdXJ2ZShkMy5jdXJ2ZU1vbm90b25lWCk7IC8vIGFwcGx5IHNtb290aGluZyB0byB0aGUgbGluZVxuXG4gICAgY29uc3Qgc3ZnMyA9IGQzXG4gICAgICAuc2VsZWN0KFwiI2xpbmVjaGFydFwiKVxuICAgICAgLmFwcGVuZChcInN2Z1wiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXG4gICAgICAuYXR0cihcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgIC5vbihcImRibGNsaWNrXCIsIGQgPT4ge1xuICAgICAgICBkMy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXN0b3JlKGQpO1xuICAgICAgfSlcblxuICAgICAgLmFwcGVuZChcImdcIilcblxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyA4MCArIFwiLCBcIiArIG1hcmdpbi50b3AgKyBcIilcIik7XG5cbiAgICBjb25zb2xlLmxvZyhzdmczKTtcblxuICAgIHN2ZzNcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwieCBheGlzXCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwLFwiICsgaGVpZ2h0ICsgXCIpXCIpXG4gICAgICAuY2FsbChkMy5heGlzQm90dG9tKHhTY2FsZTMpLnRpY2tGb3JtYXQoZDMuZm9ybWF0KFwiZFwiKSkpO1xuXG4gICAgc3ZnM1xuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ5IGF4aXNcIilcbiAgICAgIC5jYWxsKFxuICAgICAgICBkMy5heGlzTGVmdCh5U2NhbGUpLnRpY2tGb3JtYXQoZnVuY3Rpb24oZCkge1xuICAgICAgICAgIGlmIChkICE9PSAwICYmIGQgPCAxMDAwMDAwMDAwKSB7XG4gICAgICAgICAgICByZXR1cm4gXCIkXCIgKyBkIC8gMTAwMDAwMCArIFwiTVwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZCAhPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiJFwiICsgZCAvIDEwMDAwMDAwMDAgKyBcIkJcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgc3ZnM1xuICAgICAgLmFwcGVuZChcInBhdGhcIilcbiAgICAgIC5kYXR1bShsaW5lQ2hhcnREYXRhKSAvLyAxMC4gQmluZHMgZGF0YSB0byB0aGUgbGluZVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImxpbmVcIikgLy8gQXNzaWduIGEgY2xhc3MgZm9yIHN0eWxpbmdcbiAgICAgIC5hdHRyKFwiZFwiLCBsaW5lKTtcblxuICAgIHN2ZzNcbiAgICAgIC5zZWxlY3RBbGwoXCIuZG90XCIpXG4gICAgICAuZGF0YShsaW5lQ2hhcnREYXRhKVxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoXCJjaXJjbGVcIikgLy8gVXNlcyB0aGUgZW50ZXIoKS5hcHBlbmQoKSBtZXRob2RcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJkb3RcIikgLy8gQXNzaWduIGEgY2xhc3MgZm9yIHN0eWxpbmdcbiAgICAgIC5hdHRyKFwiY3hcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4geFNjYWxlMyhpICsgMjAwMCk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJjeVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiB5U2NhbGUoZC55KTtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcInJcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICBpZiAoaSA9PT0gdGltZSkge1xuICAgICAgICAgIHJldHVybiA3O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiA1O1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnN0eWxlKFwiZmlsbFwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIGlmIChpID09PSB0aW1lKSByZXR1cm4gXCJyZWRcIjtcbiAgICAgIH0pXG4gICAgICAub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICBkaXZcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDAuOSk7XG4gICAgICAgIGRpdlxuICAgICAgICAgIC5odG1sKFxuICAgICAgICAgICAgaSArXG4gICAgICAgICAgICAgIDIwMDAgK1xuICAgICAgICAgICAgICBcIjogXCIgK1xuICAgICAgICAgICAgICBcIiAkXCIgK1xuICAgICAgICAgICAgICBkM1xuICAgICAgICAgICAgICAgIC5mb3JtYXQoXCIuMnNcIikoZFtcInlcIl0pXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL0cvLCBcIkJcIilcbiAgICAgICAgICApXG4gICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBkMy5ldmVudC5wYWdlWCArIFwicHhcIilcbiAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgZDMuZXZlbnQucGFnZVkgLSAyOCArIFwicHhcIik7XG4gICAgICB9KVxuICAgICAgLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICBkaXZcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuICAgICAgfSk7XG5cbiAgICBzdmczXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInRpdGxlXCIpXG4gICAgICAuYXR0cihcInhcIiwgd2lkdGggLyAyKVxuICAgICAgLmF0dHIoXCJ5XCIsIC0zMClcbiAgICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAgIC50ZXh0KFxuICAgICAgICBkID0+XG4gICAgICAgICAgYFRvdGFsIFJhaXNlZCBwZXIgWWVhciBpbiAke3JvdW5kfSBpbiB0aGUgJHtwbGFjZWhvbGRlcn0gSW51ZHN0cnksIDIwMDAtMjAxM2BcbiAgICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiByZXN0b3JlKCkge1xuICAgIGQzLnNlbGVjdEFsbChcInN2Z1wiKS5yZW1vdmUoKTtcblxuICAgIHN2ZyA9IGQzXG4gICAgICAuc2VsZWN0KFwiI2ludGVyXCIpXG4gICAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXG4gICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSlcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsIFwiICsgbWFyZ2luLnRvcCArIFwiKVwiKTtcblxuICAgIHN2Z1xuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJsYWJlbFwiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGUoLTkwKVwiKVxuICAgICAgLmF0dHIoXCJ5XCIsIDYpXG4gICAgICAuYXR0cihcImR5XCIsIFwiLjcxZW1cIilcbiAgICAgIC5zdHlsZShcInRleHQtYW5jaG9yXCIsIFwiZW5kXCIpXG4gICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcImJvbGRcIilcbiAgICAgIC50ZXh0KFwiVmFsdWVcIik7XG5cbiAgICAkKFwiI3Jlc2V0LWJ1dHRvblwiKS50ZXh0KFwiUmVzZXRcIik7XG5cbiAgICAkKFwiI3Jlc2V0LWJ1dHRvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgdGltZSA9IDA7XG4gICAgICB1cGRhdGUoY2xlYW5EYXRhWzBdKTtcbiAgICB9KTtcblxuICAgIHRpbWVMYWJlbCA9IHN2Z1xuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJsYWJlbFwiKVxuICAgICAgLmF0dHIoXCJ5XCIsIGhlaWdodCArIDUwKVxuICAgICAgLmF0dHIoXCJ4XCIsIHdpZHRoIC0gNDApXG4gICAgICAvLyAuYXR0cihcImZvbnQtc2l6ZVwiLCBcIjQwcHhcIilcbiAgICAgIC8vIC5hdHRyKFwib3BhY2l0eVwiLCBcIjAuNFwiKVxuICAgICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgICAgLnRleHQoYCR7dGltZSArIDIwMDB9YCk7XG5cbiAgICBkMy5zZWxlY3QoXCIjcGxheS1idXR0b25cIikuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKTtcbiAgICBkMy5zZWxlY3QoXCIjcmVzZXQtYnV0dG9uXCIpLnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIik7XG4gICAgZDMuc2VsZWN0KFwiI3NsaWRlci1kaXZcIikuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKTtcbiAgICBkMy5zZWxlY3QoXCIjaW5kdXN0cnktc2VsZWN0XCIpLnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIik7XG4gICAgZDMuc2VsZWN0QWxsKFwidGV4dFwiKS5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpO1xuXG4gICAgY29uc3QgZHVyYXRpb24gPSA3NTA7XG4gICAgY29uc3QgdHJhbnNpdGlvbjEgPSBkMy50cmFuc2l0aW9uKCkuZHVyYXRpb24oZHVyYXRpb24pO1xuICAgIGNvbnN0IHRyYW5zaXRpb24yID0gdHJhbnNpdGlvbjEudHJhbnNpdGlvbigpO1xuXG4gICAgY29uc3QgZXhpdCA9IHN2Zy5zZWxlY3RBbGwoXCIuZW50ZXJcIikuYXR0cihcImNsYXNzXCIsIFwiZXhpdFwiKTtcbiAgICBleGl0LnNlbGVjdEFsbChcInRleHRcIikucmVtb3ZlKCk7XG4gICAgLy8gRW50ZXJpbmcgbm9kZXMgaW1tZWRpYXRlbHkgb2JzY3VyZSB0aGUgY2xpY2tlZC1vbiBiYXIsIHNvIGhpZGUgaXQuXG4gICAgLy8gZXhpdC5zZWxlY3RBbGwoXCJyZWN0XCIpLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgcCA9PiAocCA9PT0gZCA/IDAgOiBudWxsKSk7XG5cbiAgICAvLyBUcmFuc2l0aW9uIGV4aXRpbmcgYmFycyB0byBmYWRlIG91dC5cbiAgICBleGl0XG4gICAgICAuc2VsZWN0QWxsKFwicmVjdHNcIilcbiAgICAgIC50cmFuc2l0aW9uKHRyYW5zaXRpb24yKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgKGQsIGkpID0+IGB0cmFuc2xhdGUoJHstYmFyU3RlcCAqIGl9LCAwKWApXG4gICAgICAvLy5hdHRyKFwid2lkdGhcIiwgZCA9PiAwKVxuICAgICAgLy8gLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgMClcblxuICAgICAgLy8gLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgc3RhY2soZC5pbmRleCkpXG4gICAgICAvLyAudHJhbnNpdGlvbih0cmFuc2l0aW9uMSlcbiAgICAgIC8vIC5hdHRyKFwidHJhbnNmb3JtXCIsIHN0YWdnZXIoKSlcbiAgICAgIC5yZW1vdmUoKTtcblxuICAgIGQzLnNlbGVjdEFsbChcImcueS1heGlzXCIpLnJlbW92ZSgpO1xuXG4gICAgZDMuc2VsZWN0QWxsKFwiZy54LWF4aXNcIikucmVtb3ZlKCk7XG5cbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwieCBheGlzXCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwLFwiICsgaGVpZ2h0ICsgXCIpXCIpXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuY2FsbCh4QXhpcyk7XG5cbiAgICBzdmdcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwieSBheGlzXCIpXG4gICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcblxuICAgIGQzLnNlbGVjdChcIiN5ZWFyXCIpLnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIik7XG5cbiAgICB1cGRhdGUoY2xlYW5EYXRhW3RpbWVdKTtcbiAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=