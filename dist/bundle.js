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
  var abc = "Thanks for checking out my D3 visualization powered by the Crunchbase dataset!  ";
  var abd = " The bar chart above represents venture funding rounds for the period between 2000 and 2013.";
  var hero = "Rounds and Fundings Data";
  var abc2 = "The data is segmented by industries (web, mobile, software, web, medical), rounds (series A, series B, Angel, Series C+, Venture) and years.";
  var abc3 = " Press on the Play button to watch an animated show of inudstries' aggregated funding rounds over these years. Interested in learning more?";
  var abc4 = "Click on the Pause button to put animation on hold, then click any bar to drill down to the industry and round that caught your attention.";
  d3.select("#intro").append("span"); // .text(function(d) {
  //   return hero;
  // });

  d3.selectAll("span").append("h1") // .attr("class", "paragraph")
  .text(function (d) {
    return hero;
  });
  d3.selectAll("span").append("p").attr("dy", "0em").attr("class", "paragraph").text(function (d) {
    return abc + "  " + " " + abd + " " + abc2 + " " + abc3 + " " + abc4;
  }); // d3.selectAll("span")
  //   .append("p")
  //   .attr("dy", "1em")
  //   .attr("class", "paragraph")
  //   .text(function(d) {
  //     return abc2;
  //   });
  // d3.selectAll("span")
  //   .append("p")
  //   .attr("dy", "2em")
  //   .attr("class", "paragraph")
  //   .text(function(d) {
  //     return abc3;
  //   });
  // d3.selectAll("span")
  //   .append("p")
  //   .attr("dy", "2em")
  //   .attr("class", "paragraph")
  //   .text(function(d) {
  //     return abc4;
  //   });

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
  }); // let intro = "Explore";
  // document.getElementById("text").innerHTML = intro;

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
    svg.selectAll("rect").transition(750).delay(function (d) {
      return Math.random() * 100;
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
    var legend = d3.select("g").append("g") // .attr(
    //   "transform",
    //   "translate(" +
    //     (margin.left + margin.right + 60) +
    //     "," +
    //     (height + 30) +
    //     ")"
    // )
    .selectAll("g").data(sectors).enter().append("g").attr("class", "legend").attr("transform", function (d, i) {
      return "translate(14," + 25 * i + ")";
    }); // legend
    //   .append("rect")
    //   .attr("fill", (d, i) => color(d)) //   const color = d3.scaleOrdinal(d3.schemeCategory10);
    //   .attr("height", 18)
    //   .attr("width", 18);

    legend.append("rect").attr("x", width - 10).attr("width", 14).attr("height", 14).style("fill", function (d) {
      return color(d);
    });
    legend.append("text").attr("x", width - 15).attr("y", 9).attr("dy", ".35em").style("text-anchor", "end").text(function (d) {
      return d;
    }); // legend
    //   .append("text")
    //   // .attr("x", 18)
    //   // .attr("y", 10)
    //   .attr("x", width - 24)
    //   .attr("y", 9)
    //   .attr("dy", ".15em")
    //   .text((d, i) => d)
    //   .style("text-anchor", "start")
    //   .style("font-size", 12);
    // Now space the groups out after they have been appended:
    // const padding = 10;
    // legend.attr("transform", function(d, i) {
    //   return (
    //     "translate(" +
    //     (d3.sum(sectors, function(e, j) {
    //       if (j < i) {
    //         return legend.nodes()[j].getBBox().width;
    //       } else {
    //         return 0;
    //       }
    //     }) +
    //       padding * i) +
    //     ",0)"
    //   );
    // });
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
    d3.select("#intro").style("opacity", "0");
    d3.selectAll("text").style("opacity", "0");
    d3.select("#goback-button").style("opacity", "1"); // g.selectAll("g.x.axis").remove();
    // slice.remove();

    var svg2 = d3.select("#drilldown").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
    svg2.call(tip);
    x3.domain([0, data[0].amountRaised]);
    console.log(x3.domain());
    svg2.append("rect").attr("class", "background").attr("fill", "none").attr("pointer-events", "all").attr("width", width).attr("height", height).attr("cursor", "pointer"); // .on("click", d => up(svg, d));

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

    var svg3 = d3.select("#linechart").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).attr("cursor", "pointer").append("g").attr("transform", "translate(" + 80 + ", " + margin.top + ")");
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
    d3.select("#intro").style("opacity", "1");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvdHJhbnNmb3JtL2RlY29tcG9zZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3RyYW5zZm9ybS9wYXJzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9iYXJfY2hhcnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnRlcmFjdGl2ZV9jaGFydC5qcyJdLCJuYW1lcyI6WyJjaGFydCIsIm1hcmdpbiIsImxlZnQiLCJyaWdodCIsInRvcCIsImJvdHRvbSIsIndpZHRoIiwiaGVpZ2h0IiwiZyIsImQzIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsInRleHQiLCJqc29uIiwidGhlbiIsImRhdGEiLCJzbGljZSIsInNvcnQiLCJhIiwiYiIsImFzY2VuZGluZyIsInllYXIiLCJmb3JFYWNoIiwiZCIsInByaWNlIiwieCIsInNjYWxlQmFuZCIsImRvbWFpbiIsIm1hcCIsInJhbmdlIiwicGFkZGluZyIsInkiLCJzY2FsZUxpbmVhciIsIm1pbiIsIk1hdGgiLCJmbG9vciIsIm1heCIsImNlaWwiLCJuaWNlIiwieEF4aXNDYWxsIiwiYXhpc0JvdHRvbSIsImNhbGwiLCJ5QXhpc0NhbGwiLCJheGlzTGVmdCIsInRpY2tGb3JtYXQiLCJyZWN0cyIsInNlbGVjdEFsbCIsImVudGVyIiwiYmFuZHdpZHRoIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiaW50ZXJhY3RpdmVDaGFydCIsImNvbnNvbGUiLCJsb2ciLCJmbGFnIiwidCIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsImFiYyIsImFiZCIsImhlcm8iLCJhYmMyIiwiYWJjMyIsImFiYzQiLCJzdmciLCJ4MCIsIngxIiwic3R5bGUiLCJyYXdEYXRhIiwidGVzdERhdGEiLCJpbnRlcnZhbCIsImNsZWFuRGF0YSIsImJhclN0ZXAiLCJiYXJQYWRkaW5nIiwieEF4aXMiLCJ0aWNrU2l6ZSIsInlBeGlzIiwidGlwIiwiZGlyZWN0aW9uIiwib2Zmc2V0IiwiaHRtbCIsImNvbXBhbnkiLCJzZWN0b3IiLCJyb3VuZCIsImZvcm1hdCIsImFtb3VudFJhaXNlZCIsInRpbWVMYWJlbCIsInNlY3RvcnMiLCJyb3VuZHMiLCJyYW5nZVJvdW5kIiwiaW52ZXJ0Iiwic2NhbGUiLCJzY2FsZVF1YW50aXplIiwiY29sb3IiLCJzY2FsZU9yZGluYWwiLCJzY2hlbWVTZXQxIiwidGltZSIsIngzIiwieEF4aXMyIiwiYXhpc1RvcCIsInRpY2tzIiwic2VsZWN0aW9uIiwicmVtb3ZlIiwieUF4aXMyIiwiZWxlbWVudHMiLCJ2YWx1ZXMiLCJlbGUiLCJ1cGRhdGUiLCIkIiwib24iLCJidXR0b24iLCJzZXRJbnRlcnZhbCIsInN0ZXAiLCJjbGVhckludGVydmFsIiwicmVzdG9yZSIsInNsaWRlciIsImFuaW1hdGUiLCJzbGlkZSIsImV2ZW50IiwidWkiLCJ2YWx1ZSIsInNsaWNlMiIsImtleSIsImZpbHRlciIsIm5vZGUiLCJkZWxheSIsInJhbmRvbSIsInBhcnNlU3ZnIiwicGFyZW50Tm9kZSIsInRyYW5zbGF0ZVgiLCJkcmlsbERvd24iLCJyZ2IiLCJkYXJrZXIiLCJyZWN0czIiLCJidXR0b24yIiwiZHJhd0xlZ2VuZCIsImlubmVySFRNTCIsImxlZ2VuZCIsImkiLCJiYXIiLCJzdmcyIiwiZG93biIsInNlbGVjdG9yIiwiaW5zZXJ0Iiwiam9pbiIsInNob3ciLCJoaWRlIiwidW5zb3J0ZWREYXRhIiwidHJhbnNpdGlvbjEiLCJ0cmFuc2l0aW9uMiIsImFiIiwiT2JqZWN0IiwibmV3RGF0YSIsIm5ld0RhdGEyIiwibmV3RGF0YTMiLCJkZXNjZW5kaW5nIiwibGluZUNoYXJ0RGF0YSIsImdldERhdGEiLCJwbGFjZWhvbGRlciIsInN0YWNrIiwiaW5kZXgiLCJzdGFnZ2VyIiwiYnVpbGRMaW5lQ2hhcnQiLCJyZXN1bHRzIiwib2JqIiwidW5kZWZpbmVkIiwicHVzaCIsInN1bSIsIm4iLCJzb3J0ZWREYXRhIiwieFNjYWxlMyIsInlTY2FsZSIsImRpdiIsImxpbmUiLCJjdXJ2ZSIsImN1cnZlTW9ub3RvbmVYIiwic3ZnMyIsImRhdHVtIiwicmVwbGFjZSIsInBhZ2VYIiwicGFnZVkiLCJleGl0Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZZOztBQUVaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBa0MsU0FBUztBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDLFVBQVU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN2SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRVk7O0FBRVosYUFBYSxtQkFBTyxDQUFDLG9EQUFXO0FBQ2hDLGNBQWMsbUJBQU8sQ0FBQyxnREFBUztBQUMvQixjQUFjLG1CQUFPLENBQUMsZ0RBQVM7O0FBRS9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsbURBQW1EO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsVUFBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLHVDQUF1QyxTQUFTO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxpQkFBaUI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELEVBQUU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGVBQWU7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQSxxQkFBcUIsZUFBZTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsT0FBTztBQUM5RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLFFBQVE7QUFDN0I7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixZQUFZO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7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RkgsQ0FFUSxPQUZSLEVBRWlCLFFBRmpCLEVBR0dBLElBSEgsQ0FHUSxXQUhSLEVBR3FCLGlCQUFpQkwsTUFBakIsR0FBMEIsR0FIL0MsRUFJR2tELFVBSkgsR0FLR2YsSUFMSCxDQUtRaUMsS0FMUjtBQU9BVixPQUFHLENBQ0F0RCxNQURILENBQ1UsR0FEVixFQUVHQyxJQUZILENBRVEsT0FGUixFQUVpQixRQUZqQixFQUdHd0QsS0FISCxDQUdTLFNBSFQsRUFHb0IsR0FIcEI7QUFLQTNELE1BQUUsQ0FBQ0MsTUFBSCxDQUFVLE9BQVYsRUFBbUIwRCxLQUFuQixDQUF5QixTQUF6QixFQUFvQyxHQUFwQztBQUVBd0MsVUFBTSxDQUFDcEMsU0FBUyxDQUFDeUIsSUFBRCxDQUFWLENBQU47QUFDRDtBQUNGLENBL2dDTSxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydHMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcbmV4cG9ydHMudG9CeXRlQXJyYXkgPSB0b0J5dGVBcnJheVxuZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gZnJvbUJ5dGVBcnJheVxuXG52YXIgbG9va3VwID0gW11cbnZhciByZXZMb29rdXAgPSBbXVxudmFyIEFyciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyA/IFVpbnQ4QXJyYXkgOiBBcnJheVxuXG52YXIgY29kZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJ1xuZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvZGUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgbG9va3VwW2ldID0gY29kZVtpXVxuICByZXZMb29rdXBbY29kZS5jaGFyQ29kZUF0KGkpXSA9IGlcbn1cblxuLy8gU3VwcG9ydCBkZWNvZGluZyBVUkwtc2FmZSBiYXNlNjQgc3RyaW5ncywgYXMgTm9kZS5qcyBkb2VzLlxuLy8gU2VlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CYXNlNjQjVVJMX2FwcGxpY2F0aW9uc1xucmV2TG9va3VwWyctJy5jaGFyQ29kZUF0KDApXSA9IDYyXG5yZXZMb29rdXBbJ18nLmNoYXJDb2RlQXQoMCldID0gNjNcblxuZnVuY3Rpb24gZ2V0TGVucyAoYjY0KSB7XG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG5cbiAgaWYgKGxlbiAlIDQgPiAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0JylcbiAgfVxuXG4gIC8vIFRyaW0gb2ZmIGV4dHJhIGJ5dGVzIGFmdGVyIHBsYWNlaG9sZGVyIGJ5dGVzIGFyZSBmb3VuZFxuICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9iZWF0Z2FtbWl0L2Jhc2U2NC1qcy9pc3N1ZXMvNDJcbiAgdmFyIHZhbGlkTGVuID0gYjY0LmluZGV4T2YoJz0nKVxuICBpZiAodmFsaWRMZW4gPT09IC0xKSB2YWxpZExlbiA9IGxlblxuXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSB2YWxpZExlbiA9PT0gbGVuXG4gICAgPyAwXG4gICAgOiA0IC0gKHZhbGlkTGVuICUgNClcblxuICByZXR1cm4gW3ZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW5dXG59XG5cbi8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoYjY0KSB7XG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cbiAgcmV0dXJuICgodmFsaWRMZW4gKyBwbGFjZUhvbGRlcnNMZW4pICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzTGVuXG59XG5cbmZ1bmN0aW9uIF9ieXRlTGVuZ3RoIChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pIHtcbiAgcmV0dXJuICgodmFsaWRMZW4gKyBwbGFjZUhvbGRlcnNMZW4pICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzTGVuXG59XG5cbmZ1bmN0aW9uIHRvQnl0ZUFycmF5IChiNjQpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVucyA9IGdldExlbnMoYjY0KVxuICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdXG5cbiAgdmFyIGFyciA9IG5ldyBBcnIoX2J5dGVMZW5ndGgoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSlcblxuICB2YXIgY3VyQnl0ZSA9IDBcblxuICAvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG4gIHZhciBsZW4gPSBwbGFjZUhvbGRlcnNMZW4gPiAwXG4gICAgPyB2YWxpZExlbiAtIDRcbiAgICA6IHZhbGlkTGVuXG5cbiAgdmFyIGlcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgMTIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA8PCA2KSB8XG4gICAgICByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMikge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPj4gNClcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDEpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCA0KSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPj4gMilcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NCAobnVtKSB7XG4gIHJldHVybiBsb29rdXBbbnVtID4+IDE4ICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gMTIgJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gJiAweDNGXVxufVxuXG5mdW5jdGlvbiBlbmNvZGVDaHVuayAodWludDgsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHRtcFxuICB2YXIgb3V0cHV0ID0gW11cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IDMpIHtcbiAgICB0bXAgPVxuICAgICAgKCh1aW50OFtpXSA8PCAxNikgJiAweEZGMDAwMCkgK1xuICAgICAgKCh1aW50OFtpICsgMV0gPDwgOCkgJiAweEZGMDApICtcbiAgICAgICh1aW50OFtpICsgMl0gJiAweEZGKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgcGFydHMgPSBbXVxuICB2YXIgbWF4Q2h1bmtMZW5ndGggPSAxNjM4MyAvLyBtdXN0IGJlIG11bHRpcGxlIG9mIDNcblxuICAvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG4gIGZvciAodmFyIGkgPSAwLCBsZW4yID0gbGVuIC0gZXh0cmFCeXRlczsgaSA8IGxlbjI7IGkgKz0gbWF4Q2h1bmtMZW5ndGgpIHtcbiAgICBwYXJ0cy5wdXNoKGVuY29kZUNodW5rKFxuICAgICAgdWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKVxuICAgICkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAyXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdICtcbiAgICAgICc9PSdcbiAgICApXG4gIH0gZWxzZSBpZiAoZXh0cmFCeXRlcyA9PT0gMikge1xuICAgIHRtcCA9ICh1aW50OFtsZW4gLSAyXSA8PCA4KSArIHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMTBdICtcbiAgICAgIGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXSArXG4gICAgICAnPSdcbiAgICApXG4gIH1cblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cbiIsIi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5cbid1c2Ugc3RyaWN0J1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJylcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKVxuXG5leHBvcnRzLkJ1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5TbG93QnVmZmVyID0gU2xvd0J1ZmZlclxuZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUyA9IDUwXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFVzZSBPYmplY3QgaW1wbGVtZW50YXRpb24gKG1vc3QgY29tcGF0aWJsZSwgZXZlbiBJRTYpXG4gKlxuICogQnJvd3NlcnMgdGhhdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLCBDaHJvbWUgNyssIFNhZmFyaSA1LjErLFxuICogT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICpcbiAqIER1ZSB0byB2YXJpb3VzIGJyb3dzZXIgYnVncywgc29tZXRpbWVzIHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24gd2lsbCBiZSB1c2VkIGV2ZW5cbiAqIHdoZW4gdGhlIGJyb3dzZXIgc3VwcG9ydHMgdHlwZWQgYXJyYXlzLlxuICpcbiAqIE5vdGU6XG4gKlxuICogICAtIEZpcmVmb3ggNC0yOSBsYWNrcyBzdXBwb3J0IGZvciBhZGRpbmcgbmV3IHByb3BlcnRpZXMgdG8gYFVpbnQ4QXJyYXlgIGluc3RhbmNlcyxcbiAqICAgICBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOC5cbiAqXG4gKiAgIC0gQ2hyb21lIDktMTAgaXMgbWlzc2luZyB0aGUgYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbi5cbiAqXG4gKiAgIC0gSUUxMCBoYXMgYSBicm9rZW4gYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFycmF5cyBvZlxuICogICAgIGluY29ycmVjdCBsZW5ndGggaW4gc29tZSBzaXR1YXRpb25zLlxuXG4gKiBXZSBkZXRlY3QgdGhlc2UgYnVnZ3kgYnJvd3NlcnMgYW5kIHNldCBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgIHRvIGBmYWxzZWAgc28gdGhleVxuICogZ2V0IHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24sIHdoaWNoIGlzIHNsb3dlciBidXQgYmVoYXZlcyBjb3JyZWN0bHkuXG4gKi9cbkJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUID0gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlQgIT09IHVuZGVmaW5lZFxuICA/IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gIDogdHlwZWRBcnJheVN1cHBvcnQoKVxuXG4vKlxuICogRXhwb3J0IGtNYXhMZW5ndGggYWZ0ZXIgdHlwZWQgYXJyYXkgc3VwcG9ydCBpcyBkZXRlcm1pbmVkLlxuICovXG5leHBvcnRzLmtNYXhMZW5ndGggPSBrTWF4TGVuZ3RoKClcblxuZnVuY3Rpb24gdHlwZWRBcnJheVN1cHBvcnQgKCkge1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheSgxKVxuICAgIGFyci5fX3Byb3RvX18gPSB7X19wcm90b19fOiBVaW50OEFycmF5LnByb3RvdHlwZSwgZm9vOiBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9fVxuICAgIHJldHVybiBhcnIuZm9vKCkgPT09IDQyICYmIC8vIHR5cGVkIGFycmF5IGluc3RhbmNlcyBjYW4gYmUgYXVnbWVudGVkXG4gICAgICAgIHR5cGVvZiBhcnIuc3ViYXJyYXkgPT09ICdmdW5jdGlvbicgJiYgLy8gY2hyb21lIDktMTAgbGFjayBgc3ViYXJyYXlgXG4gICAgICAgIGFyci5zdWJhcnJheSgxLCAxKS5ieXRlTGVuZ3RoID09PSAwIC8vIGllMTAgaGFzIGJyb2tlbiBgc3ViYXJyYXlgXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBrTWF4TGVuZ3RoICgpIHtcbiAgcmV0dXJuIEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gICAgPyAweDdmZmZmZmZmXG4gICAgOiAweDNmZmZmZmZmXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1ZmZlciAodGhhdCwgbGVuZ3RoKSB7XG4gIGlmIChrTWF4TGVuZ3RoKCkgPCBsZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCB0eXBlZCBhcnJheSBsZW5ndGgnKVxuICB9XG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlLCBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoYXQgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIGlmICh0aGF0ID09PSBudWxsKSB7XG4gICAgICB0aGF0ID0gbmV3IEJ1ZmZlcihsZW5ndGgpXG4gICAgfVxuICAgIHRoYXQubGVuZ3RoID0gbGVuZ3RoXG4gIH1cblxuICByZXR1cm4gdGhhdFxufVxuXG4vKipcbiAqIFRoZSBCdWZmZXIgY29uc3RydWN0b3IgcmV0dXJucyBpbnN0YW5jZXMgb2YgYFVpbnQ4QXJyYXlgIHRoYXQgaGF2ZSB0aGVpclxuICogcHJvdG90eXBlIGNoYW5nZWQgdG8gYEJ1ZmZlci5wcm90b3R5cGVgLiBGdXJ0aGVybW9yZSwgYEJ1ZmZlcmAgaXMgYSBzdWJjbGFzcyBvZlxuICogYFVpbnQ4QXJyYXlgLCBzbyB0aGUgcmV0dXJuZWQgaW5zdGFuY2VzIHdpbGwgaGF2ZSBhbGwgdGhlIG5vZGUgYEJ1ZmZlcmAgbWV0aG9kc1xuICogYW5kIHRoZSBgVWludDhBcnJheWAgbWV0aG9kcy4gU3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXRcbiAqIHJldHVybnMgYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogVGhlIGBVaW50OEFycmF5YCBwcm90b3R5cGUgcmVtYWlucyB1bm1vZGlmaWVkLlxuICovXG5cbmZ1bmN0aW9uIEJ1ZmZlciAoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJiAhKHRoaXMgaW5zdGFuY2VvZiBCdWZmZXIpKSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICAvLyBDb21tb24gY2FzZS5cbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZ09yT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnSWYgZW5jb2RpbmcgaXMgc3BlY2lmaWVkIHRoZW4gdGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcnXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBhbGxvY1Vuc2FmZSh0aGlzLCBhcmcpXG4gIH1cbiAgcmV0dXJuIGZyb20odGhpcywgYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG4vLyBUT0RPOiBMZWdhY3ksIG5vdCBuZWVkZWQgYW55bW9yZS4gUmVtb3ZlIGluIG5leHQgbWFqb3IgdmVyc2lvbi5cbkJ1ZmZlci5fYXVnbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgYXJyLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiBmcm9tICh0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIGEgbnVtYmVyJylcbiAgfVxuXG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5QnVmZmVyKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmcm9tU3RyaW5nKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0KVxuICB9XG5cbiAgcmV0dXJuIGZyb21PYmplY3QodGhhdCwgdmFsdWUpXG59XG5cbi8qKlxuICogRnVuY3Rpb25hbGx5IGVxdWl2YWxlbnQgdG8gQnVmZmVyKGFyZywgZW5jb2RpbmcpIGJ1dCB0aHJvd3MgYSBUeXBlRXJyb3JcbiAqIGlmIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQnVmZmVyLmZyb20oc3RyWywgZW5jb2RpbmddKVxuICogQnVmZmVyLmZyb20oYXJyYXkpXG4gKiBCdWZmZXIuZnJvbShidWZmZXIpXG4gKiBCdWZmZXIuZnJvbShhcnJheUJ1ZmZlclssIGJ5dGVPZmZzZXRbLCBsZW5ndGhdXSlcbiAqKi9cbkJ1ZmZlci5mcm9tID0gZnVuY3Rpb24gKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGZyb20obnVsbCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gIEJ1ZmZlci5wcm90b3R5cGUuX19wcm90b19fID0gVWludDhBcnJheS5wcm90b3R5cGVcbiAgQnVmZmVyLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXlcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC5zcGVjaWVzICYmXG4gICAgICBCdWZmZXJbU3ltYm9sLnNwZWNpZXNdID09PSBCdWZmZXIpIHtcbiAgICAvLyBGaXggc3ViYXJyYXkoKSBpbiBFUzIwMTYuIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvcHVsbC85N1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdWZmZXIsIFN5bWJvbC5zcGVjaWVzLCB7XG4gICAgICB2YWx1ZTogbnVsbCxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0U2l6ZSAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpXG4gIH0gZWxzZSBpZiAoc2l6ZSA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgbmVnYXRpdmUnKVxuICB9XG59XG5cbmZ1bmN0aW9uIGFsbG9jICh0aGF0LCBzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIGlmIChzaXplIDw9IDApIHtcbiAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpXG4gIH1cbiAgaWYgKGZpbGwgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9ubHkgcGF5IGF0dGVudGlvbiB0byBlbmNvZGluZyBpZiBpdCdzIGEgc3RyaW5nLiBUaGlzXG4gICAgLy8gcHJldmVudHMgYWNjaWRlbnRhbGx5IHNlbmRpbmcgaW4gYSBudW1iZXIgdGhhdCB3b3VsZFxuICAgIC8vIGJlIGludGVycHJldHRlZCBhcyBhIHN0YXJ0IG9mZnNldC5cbiAgICByZXR1cm4gdHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJ1xuICAgICAgPyBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICAgIDogY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpLmZpbGwoZmlsbClcbiAgfVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBmaWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogYWxsb2Moc2l6ZVssIGZpbGxbLCBlbmNvZGluZ11dKVxuICoqL1xuQnVmZmVyLmFsbG9jID0gZnVuY3Rpb24gKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIHJldHVybiBhbGxvYyhudWxsLCBzaXplLCBmaWxsLCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gYWxsb2NVbnNhZmUgKHRoYXQsIHNpemUpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUgPCAwID8gMCA6IGNoZWNrZWQoc2l6ZSkgfCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyArK2kpIHtcbiAgICAgIHRoYXRbaV0gPSAwXG4gICAgfVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbi8qKlxuICogRXF1aXZhbGVudCB0byBCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqICovXG5CdWZmZXIuYWxsb2NVbnNhZmUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUobnVsbCwgc2l6ZSlcbn1cbi8qKlxuICogRXF1aXZhbGVudCB0byBTbG93QnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3cgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUobnVsbCwgc2l6ZSlcbn1cblxuZnVuY3Rpb24gZnJvbVN0cmluZyAodGhhdCwgc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAodHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJyB8fCBlbmNvZGluZyA9PT0gJycpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICB9XG5cbiAgaWYgKCFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImVuY29kaW5nXCIgbXVzdCBiZSBhIHZhbGlkIHN0cmluZyBlbmNvZGluZycpXG4gIH1cblxuICB2YXIgbGVuZ3RoID0gYnl0ZUxlbmd0aChzdHJpbmcsIGVuY29kaW5nKSB8IDBcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW5ndGgpXG5cbiAgdmFyIGFjdHVhbCA9IHRoYXQud3JpdGUoc3RyaW5nLCBlbmNvZGluZylcblxuICBpZiAoYWN0dWFsICE9PSBsZW5ndGgpIHtcbiAgICAvLyBXcml0aW5nIGEgaGV4IHN0cmluZywgZm9yIGV4YW1wbGUsIHRoYXQgY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzIHdpbGxcbiAgICAvLyBjYXVzZSBldmVyeXRoaW5nIGFmdGVyIHRoZSBmaXJzdCBpbnZhbGlkIGNoYXJhY3RlciB0byBiZSBpZ25vcmVkLiAoZS5nLlxuICAgIC8vICdhYnh4Y2QnIHdpbGwgYmUgdHJlYXRlZCBhcyAnYWInKVxuICAgIHRoYXQgPSB0aGF0LnNsaWNlKDAsIGFjdHVhbClcbiAgfVxuXG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUxpa2UgKHRoYXQsIGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGggPCAwID8gMCA6IGNoZWNrZWQoYXJyYXkubGVuZ3RoKSB8IDBcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW5ndGgpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICB0aGF0W2ldID0gYXJyYXlbaV0gJiAyNTVcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlCdWZmZXIgKHRoYXQsIGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpIHtcbiAgYXJyYXkuYnl0ZUxlbmd0aCAvLyB0aGlzIHRocm93cyBpZiBgYXJyYXlgIGlzIG5vdCBhIHZhbGlkIEFycmF5QnVmZmVyXG5cbiAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ29mZnNldFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCArIChsZW5ndGggfHwgMCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnbGVuZ3RoXFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGJ5dGVPZmZzZXQgPT09IHVuZGVmaW5lZCAmJiBsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0KVxuICB9IGVsc2Uge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlLCBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoYXQgPSBhcnJheVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICB0aGF0ID0gZnJvbUFycmF5TGlrZSh0aGF0LCBhcnJheSlcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tT2JqZWN0ICh0aGF0LCBvYmopIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihvYmopKSB7XG4gICAgdmFyIGxlbiA9IGNoZWNrZWQob2JqLmxlbmd0aCkgfCAwXG4gICAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW4pXG5cbiAgICBpZiAodGhhdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGF0XG4gICAgfVxuXG4gICAgb2JqLmNvcHkodGhhdCwgMCwgMCwgbGVuKVxuICAgIHJldHVybiB0aGF0XG4gIH1cblxuICBpZiAob2JqKSB7XG4gICAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIG9iai5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikgfHwgJ2xlbmd0aCcgaW4gb2JqKSB7XG4gICAgICBpZiAodHlwZW9mIG9iai5sZW5ndGggIT09ICdudW1iZXInIHx8IGlzbmFuKG9iai5sZW5ndGgpKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgMClcbiAgICAgIH1cbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iailcbiAgICB9XG5cbiAgICBpZiAob2JqLnR5cGUgPT09ICdCdWZmZXInICYmIGlzQXJyYXkob2JqLmRhdGEpKSB7XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmouZGF0YSlcbiAgICB9XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nLCBCdWZmZXIsIEFycmF5QnVmZmVyLCBBcnJheSwgb3IgYXJyYXktbGlrZSBvYmplY3QuJylcbn1cblxuZnVuY3Rpb24gY2hlY2tlZCAobGVuZ3RoKSB7XG4gIC8vIE5vdGU6IGNhbm5vdCB1c2UgYGxlbmd0aCA8IGtNYXhMZW5ndGgoKWAgaGVyZSBiZWNhdXNlIHRoYXQgZmFpbHMgd2hlblxuICAvLyBsZW5ndGggaXMgTmFOICh3aGljaCBpcyBvdGhlcndpc2UgY29lcmNlZCB0byB6ZXJvLilcbiAgaWYgKGxlbmd0aCA+PSBrTWF4TGVuZ3RoKCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byBhbGxvY2F0ZSBCdWZmZXIgbGFyZ2VyIHRoYW4gbWF4aW11bSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAnc2l6ZTogMHgnICsga01heExlbmd0aCgpLnRvU3RyaW5nKDE2KSArICcgYnl0ZXMnKVxuICB9XG4gIHJldHVybiBsZW5ndGggfCAwXG59XG5cbmZ1bmN0aW9uIFNsb3dCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAoK2xlbmd0aCAhPSBsZW5ndGgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBlcWVxZXFcbiAgICBsZW5ndGggPSAwXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlci5hbGxvYygrbGVuZ3RoKVxufVxuXG5CdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlciAoYikge1xuICByZXR1cm4gISEoYiAhPSBudWxsICYmIGIuX2lzQnVmZmVyKVxufVxuXG5CdWZmZXIuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKGEsIGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYSkgfHwgIUJ1ZmZlci5pc0J1ZmZlcihiKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyBtdXN0IGJlIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGEgPT09IGIpIHJldHVybiAwXG5cbiAgdmFyIHggPSBhLmxlbmd0aFxuICB2YXIgeSA9IGIubGVuZ3RoXG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IE1hdGgubWluKHgsIHkpOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgeCA9IGFbaV1cbiAgICAgIHkgPSBiW2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiBpc0VuY29kaW5nIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdsYXRpbjEnOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIGNvbmNhdCAobGlzdCwgbGVuZ3RoKSB7XG4gIGlmICghaXNBcnJheShsaXN0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gIH1cblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gQnVmZmVyLmFsbG9jKDApXG4gIH1cblxuICB2YXIgaVxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBsZW5ndGggPSAwXG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgIGxlbmd0aCArPSBsaXN0W2ldLmxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIHZhciBidWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUobGVuZ3RoKVxuICB2YXIgcG9zID0gMFxuICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgIHZhciBidWYgPSBsaXN0W2ldXG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgICB9XG4gICAgYnVmLmNvcHkoYnVmZmVyLCBwb3MpXG4gICAgcG9zICs9IGJ1Zi5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAoQXJyYXlCdWZmZXIuaXNWaWV3KHN0cmluZykgfHwgc3RyaW5nIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5ieXRlTGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmdcbiAgfVxuXG4gIHZhciBsZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChsZW4gPT09IDApIHJldHVybiAwXG5cbiAgLy8gVXNlIGEgZm9yIGxvb3AgdG8gYXZvaWQgcmVjdXJzaW9uXG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxlblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gbGVuICogMlxuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGxlbiA+Pj4gMVxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoIC8vIGFzc3VtZSB1dGY4XG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5CdWZmZXIuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcblxuZnVuY3Rpb24gc2xvd1RvU3RyaW5nIChlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuXG4gIC8vIE5vIG5lZWQgdG8gdmVyaWZ5IHRoYXQgXCJ0aGlzLmxlbmd0aCA8PSBNQVhfVUlOVDMyXCIgc2luY2UgaXQncyBhIHJlYWQtb25seVxuICAvLyBwcm9wZXJ0eSBvZiBhIHR5cGVkIGFycmF5LlxuXG4gIC8vIFRoaXMgYmVoYXZlcyBuZWl0aGVyIGxpa2UgU3RyaW5nIG5vciBVaW50OEFycmF5IGluIHRoYXQgd2Ugc2V0IHN0YXJ0L2VuZFxuICAvLyB0byB0aGVpciB1cHBlci9sb3dlciBib3VuZHMgaWYgdGhlIHZhbHVlIHBhc3NlZCBpcyBvdXQgb2YgcmFuZ2UuXG4gIC8vIHVuZGVmaW5lZCBpcyBoYW5kbGVkIHNwZWNpYWxseSBhcyBwZXIgRUNNQS0yNjIgNnRoIEVkaXRpb24sXG4gIC8vIFNlY3Rpb24gMTMuMy4zLjcgUnVudGltZSBTZW1hbnRpY3M6IEtleWVkQmluZGluZ0luaXRpYWxpemF0aW9uLlxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCB8fCBzdGFydCA8IDApIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICAvLyBSZXR1cm4gZWFybHkgaWYgc3RhcnQgPiB0aGlzLmxlbmd0aC4gRG9uZSBoZXJlIHRvIHByZXZlbnQgcG90ZW50aWFsIHVpbnQzMlxuICAvLyBjb2VyY2lvbiBmYWlsIGJlbG93LlxuICBpZiAoc3RhcnQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkIHx8IGVuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChlbmQgPD0gMCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgLy8gRm9yY2UgY29lcnNpb24gdG8gdWludDMyLiBUaGlzIHdpbGwgYWxzbyBjb2VyY2UgZmFsc2V5L05hTiB2YWx1ZXMgdG8gMC5cbiAgZW5kID4+Pj0gMFxuICBzdGFydCA+Pj49IDBcblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHV0ZjE2bGVTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoZW5jb2RpbmcgKyAnJykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuLy8gVGhlIHByb3BlcnR5IGlzIHVzZWQgYnkgYEJ1ZmZlci5pc0J1ZmZlcmAgYW5kIGBpcy1idWZmZXJgIChpbiBTYWZhcmkgNS03KSB0byBkZXRlY3Rcbi8vIEJ1ZmZlciBpbnN0YW5jZXMuXG5CdWZmZXIucHJvdG90eXBlLl9pc0J1ZmZlciA9IHRydWVcblxuZnVuY3Rpb24gc3dhcCAoYiwgbiwgbSkge1xuICB2YXIgaSA9IGJbbl1cbiAgYltuXSA9IGJbbV1cbiAgYlttXSA9IGlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMTYgPSBmdW5jdGlvbiBzd2FwMTYgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDIgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDE2LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAxKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDMyID0gZnVuY3Rpb24gc3dhcDMyICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA0ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAzMi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgMilcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXA2NCA9IGZ1bmN0aW9uIHN3YXA2NCAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgOCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNjQtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gOCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDcpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDYpXG4gICAgc3dhcCh0aGlzLCBpICsgMiwgaSArIDUpXG4gICAgc3dhcCh0aGlzLCBpICsgMywgaSArIDQpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoIHwgMFxuICBpZiAobGVuZ3RoID09PSAwKSByZXR1cm4gJydcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB1dGY4U2xpY2UodGhpcywgMCwgbGVuZ3RoKVxuICByZXR1cm4gc2xvd1RvU3RyaW5nLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMgKGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICBpZiAodGhpcyA9PT0gYikgcmV0dXJuIHRydWVcbiAgcmV0dXJuIEJ1ZmZlci5jb21wYXJlKHRoaXMsIGIpID09PSAwXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICB2YXIgc3RyID0gJydcbiAgdmFyIG1heCA9IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVNcbiAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgIHN0ciA9IHRoaXMudG9TdHJpbmcoJ2hleCcsIDAsIG1heCkubWF0Y2goLy57Mn0vZykuam9pbignICcpXG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbWF4KSBzdHIgKz0gJyAuLi4gJ1xuICB9XG4gIHJldHVybiAnPEJ1ZmZlciAnICsgc3RyICsgJz4nXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKHRhcmdldCwgc3RhcnQsIGVuZCwgdGhpc1N0YXJ0LCB0aGlzRW5kKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKHRhcmdldCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgfVxuXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5kID0gdGFyZ2V0ID8gdGFyZ2V0Lmxlbmd0aCA6IDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzU3RhcnQgPSAwXG4gIH1cbiAgaWYgKHRoaXNFbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNFbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKHN0YXJ0IDwgMCB8fCBlbmQgPiB0YXJnZXQubGVuZ3RoIHx8IHRoaXNTdGFydCA8IDAgfHwgdGhpc0VuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ291dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQgJiYgc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuICBpZiAoc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIHN0YXJ0ID4+Pj0gMFxuICBlbmQgPj4+PSAwXG4gIHRoaXNTdGFydCA+Pj49IDBcbiAgdGhpc0VuZCA+Pj49IDBcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0KSByZXR1cm4gMFxuXG4gIHZhciB4ID0gdGhpc0VuZCAtIHRoaXNTdGFydFxuICB2YXIgeSA9IGVuZCAtIHN0YXJ0XG4gIHZhciBsZW4gPSBNYXRoLm1pbih4LCB5KVxuXG4gIHZhciB0aGlzQ29weSA9IHRoaXMuc2xpY2UodGhpc1N0YXJ0LCB0aGlzRW5kKVxuICB2YXIgdGFyZ2V0Q29weSA9IHRhcmdldC5zbGljZShzdGFydCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAodGhpc0NvcHlbaV0gIT09IHRhcmdldENvcHlbaV0pIHtcbiAgICAgIHggPSB0aGlzQ29weVtpXVxuICAgICAgeSA9IHRhcmdldENvcHlbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG4vLyBGaW5kcyBlaXRoZXIgdGhlIGZpcnN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA+PSBgYnl0ZU9mZnNldGAsXG4vLyBPUiB0aGUgbGFzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPD0gYGJ5dGVPZmZzZXRgLlxuLy9cbi8vIEFyZ3VtZW50czpcbi8vIC0gYnVmZmVyIC0gYSBCdWZmZXIgdG8gc2VhcmNoXG4vLyAtIHZhbCAtIGEgc3RyaW5nLCBCdWZmZXIsIG9yIG51bWJlclxuLy8gLSBieXRlT2Zmc2V0IC0gYW4gaW5kZXggaW50byBgYnVmZmVyYDsgd2lsbCBiZSBjbGFtcGVkIHRvIGFuIGludDMyXG4vLyAtIGVuY29kaW5nIC0gYW4gb3B0aW9uYWwgZW5jb2RpbmcsIHJlbGV2YW50IGlzIHZhbCBpcyBhIHN0cmluZ1xuLy8gLSBkaXIgLSB0cnVlIGZvciBpbmRleE9mLCBmYWxzZSBmb3IgbGFzdEluZGV4T2ZcbmZ1bmN0aW9uIGJpZGlyZWN0aW9uYWxJbmRleE9mIChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICAvLyBFbXB0eSBidWZmZXIgbWVhbnMgbm8gbWF0Y2hcbiAgaWYgKGJ1ZmZlci5sZW5ndGggPT09IDApIHJldHVybiAtMVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0XG4gIGlmICh0eXBlb2YgYnl0ZU9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IGJ5dGVPZmZzZXRcbiAgICBieXRlT2Zmc2V0ID0gMFxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPiAweDdmZmZmZmZmKSB7XG4gICAgYnl0ZU9mZnNldCA9IDB4N2ZmZmZmZmZcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgLTB4ODAwMDAwMDApIHtcbiAgICBieXRlT2Zmc2V0ID0gLTB4ODAwMDAwMDBcbiAgfVxuICBieXRlT2Zmc2V0ID0gK2J5dGVPZmZzZXQgIC8vIENvZXJjZSB0byBOdW1iZXIuXG4gIGlmIChpc05hTihieXRlT2Zmc2V0KSkge1xuICAgIC8vIGJ5dGVPZmZzZXQ6IGl0IGl0J3MgdW5kZWZpbmVkLCBudWxsLCBOYU4sIFwiZm9vXCIsIGV0Yywgc2VhcmNoIHdob2xlIGJ1ZmZlclxuICAgIGJ5dGVPZmZzZXQgPSBkaXIgPyAwIDogKGJ1ZmZlci5sZW5ndGggLSAxKVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXQ6IG5lZ2F0aXZlIG9mZnNldHMgc3RhcnQgZnJvbSB0aGUgZW5kIG9mIHRoZSBidWZmZXJcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwKSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCArIGJ5dGVPZmZzZXRcbiAgaWYgKGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgIGlmIChkaXIpIHJldHVybiAtMVxuICAgIGVsc2UgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggLSAxXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IDApIHtcbiAgICBpZiAoZGlyKSBieXRlT2Zmc2V0ID0gMFxuICAgIGVsc2UgcmV0dXJuIC0xXG4gIH1cblxuICAvLyBOb3JtYWxpemUgdmFsXG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gIH1cblxuICAvLyBGaW5hbGx5LCBzZWFyY2ggZWl0aGVyIGluZGV4T2YgKGlmIGRpciBpcyB0cnVlKSBvciBsYXN0SW5kZXhPZlxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbCkpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2U6IGxvb2tpbmcgZm9yIGVtcHR5IHN0cmluZy9idWZmZXIgYWx3YXlzIGZhaWxzXG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMHhGRiAvLyBTZWFyY2ggZm9yIGEgYnl0ZSB2YWx1ZSBbMC0yNTVdXG4gICAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmXG4gICAgICAgIHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZGlyKSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIFsgdmFsIF0sIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2YWwgbXVzdCBiZSBzdHJpbmcsIG51bWJlciBvciBCdWZmZXInKVxufVxuXG5mdW5jdGlvbiBhcnJheUluZGV4T2YgKGFyciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIHZhciBpbmRleFNpemUgPSAxXG4gIHZhciBhcnJMZW5ndGggPSBhcnIubGVuZ3RoXG4gIHZhciB2YWxMZW5ndGggPSB2YWwubGVuZ3RoXG5cbiAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgIGlmIChlbmNvZGluZyA9PT0gJ3VjczInIHx8IGVuY29kaW5nID09PSAndWNzLTInIHx8XG4gICAgICAgIGVuY29kaW5nID09PSAndXRmMTZsZScgfHwgZW5jb2RpbmcgPT09ICd1dGYtMTZsZScpIHtcbiAgICAgIGlmIChhcnIubGVuZ3RoIDwgMiB8fCB2YWwubGVuZ3RoIDwgMikge1xuICAgICAgICByZXR1cm4gLTFcbiAgICAgIH1cbiAgICAgIGluZGV4U2l6ZSA9IDJcbiAgICAgIGFyckxlbmd0aCAvPSAyXG4gICAgICB2YWxMZW5ndGggLz0gMlxuICAgICAgYnl0ZU9mZnNldCAvPSAyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZCAoYnVmLCBpKSB7XG4gICAgaWYgKGluZGV4U2l6ZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIGJ1ZltpXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYnVmLnJlYWRVSW50MTZCRShpICogaW5kZXhTaXplKVxuICAgIH1cbiAgfVxuXG4gIHZhciBpXG4gIGlmIChkaXIpIHtcbiAgICB2YXIgZm91bmRJbmRleCA9IC0xXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA8IGFyckxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocmVhZChhcnIsIGkpID09PSByZWFkKHZhbCwgZm91bmRJbmRleCA9PT0gLTEgPyAwIDogaSAtIGZvdW5kSW5kZXgpKSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSkgZm91bmRJbmRleCA9IGlcbiAgICAgICAgaWYgKGkgLSBmb3VuZEluZGV4ICsgMSA9PT0gdmFsTGVuZ3RoKSByZXR1cm4gZm91bmRJbmRleCAqIGluZGV4U2l6ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSBpIC09IGkgLSBmb3VuZEluZGV4XG4gICAgICAgIGZvdW5kSW5kZXggPSAtMVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoYnl0ZU9mZnNldCArIHZhbExlbmd0aCA+IGFyckxlbmd0aCkgYnl0ZU9mZnNldCA9IGFyckxlbmd0aCAtIHZhbExlbmd0aFxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZm91bmQgPSB0cnVlXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHZhbExlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChyZWFkKGFyciwgaSArIGopICE9PSByZWFkKHZhbCwgaikpIHtcbiAgICAgICAgICBmb3VuZCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gaVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXMgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIHRoaXMuaW5kZXhPZih2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSAhPT0gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgdHJ1ZSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5sYXN0SW5kZXhPZiA9IGZ1bmN0aW9uIGxhc3RJbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBmYWxzZSlcbn1cblxuZnVuY3Rpb24gaGV4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICAvLyBtdXN0IGJlIGFuIGV2ZW4gbnVtYmVyIG9mIGRpZ2l0c1xuICB2YXIgc3RyTGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAoc3RyTGVuICUgMiAhPT0gMCkgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBoZXggc3RyaW5nJylcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDJcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgdmFyIHBhcnNlZCA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNilcbiAgICBpZiAoaXNOYU4ocGFyc2VkKSkgcmV0dXJuIGlcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBwYXJzZWRcbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiB1dGY4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBhc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGxhdGluMVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGFzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBiYXNlNjRXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gdWNzMldyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIHdyaXRlIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nKVxuICBpZiAob2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBlbmNvZGluZylcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gb2Zmc2V0XG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIG9mZnNldFssIGxlbmd0aF1bLCBlbmNvZGluZ10pXG4gIH0gZWxzZSBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgICBpZiAoaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoIHwgMFxuICAgICAgaWYgKGVuY29kaW5nID09PSB1bmRlZmluZWQpIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgfSBlbHNlIHtcbiAgICAgIGVuY29kaW5nID0gbGVuZ3RoXG4gICAgICBsZW5ndGggPSB1bmRlZmluZWRcbiAgICB9XG4gIC8vIGxlZ2FjeSB3cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXQsIGxlbmd0aCkgLSByZW1vdmUgaW4gdjAuMTNcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQnVmZmVyLndyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldFssIGxlbmd0aF0pIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQnXG4gICAgKVxuICB9XG5cbiAgdmFyIHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCB8fCBsZW5ndGggPiByZW1haW5pbmcpIGxlbmd0aCA9IHJlbWFpbmluZ1xuXG4gIGlmICgoc3RyaW5nLmxlbmd0aCA+IDAgJiYgKGxlbmd0aCA8IDAgfHwgb2Zmc2V0IDwgMCkpIHx8IG9mZnNldCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gd3JpdGUgb3V0c2lkZSBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgLy8gV2FybmluZzogbWF4TGVuZ3RoIG5vdCB0YWtlbiBpbnRvIGFjY291bnQgaW4gYmFzZTY0V3JpdGVcbiAgICAgICAgcmV0dXJuIGJhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1Y3MyV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfVxufVxuXG5mdW5jdGlvbiBiYXNlNjRTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXRmOFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuICB2YXIgcmVzID0gW11cblxuICB2YXIgaSA9IHN0YXJ0XG4gIHdoaWxlIChpIDwgZW5kKSB7XG4gICAgdmFyIGZpcnN0Qnl0ZSA9IGJ1ZltpXVxuICAgIHZhciBjb2RlUG9pbnQgPSBudWxsXG4gICAgdmFyIGJ5dGVzUGVyU2VxdWVuY2UgPSAoZmlyc3RCeXRlID4gMHhFRikgPyA0XG4gICAgICA6IChmaXJzdEJ5dGUgPiAweERGKSA/IDNcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4QkYpID8gMlxuICAgICAgOiAxXG5cbiAgICBpZiAoaSArIGJ5dGVzUGVyU2VxdWVuY2UgPD0gZW5kKSB7XG4gICAgICB2YXIgc2Vjb25kQnl0ZSwgdGhpcmRCeXRlLCBmb3VydGhCeXRlLCB0ZW1wQ29kZVBvaW50XG5cbiAgICAgIHN3aXRjaCAoYnl0ZXNQZXJTZXF1ZW5jZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaWYgKGZpcnN0Qnl0ZSA8IDB4ODApIHtcbiAgICAgICAgICAgIGNvZGVQb2ludCA9IGZpcnN0Qnl0ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweDFGKSA8PCAweDYgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0YpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHhDIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAodGhpcmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3RkYgJiYgKHRlbXBDb2RlUG9pbnQgPCAweEQ4MDAgfHwgdGVtcENvZGVQb2ludCA+IDB4REZGRikpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgZm91cnRoQnl0ZSA9IGJ1ZltpICsgM11cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKGZvdXJ0aEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4MTIgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4QyB8ICh0aGlyZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAoZm91cnRoQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4RkZGRiAmJiB0ZW1wQ29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZVBvaW50ID09PSBudWxsKSB7XG4gICAgICAvLyB3ZSBkaWQgbm90IGdlbmVyYXRlIGEgdmFsaWQgY29kZVBvaW50IHNvIGluc2VydCBhXG4gICAgICAvLyByZXBsYWNlbWVudCBjaGFyIChVK0ZGRkQpIGFuZCBhZHZhbmNlIG9ubHkgMSBieXRlXG4gICAgICBjb2RlUG9pbnQgPSAweEZGRkRcbiAgICAgIGJ5dGVzUGVyU2VxdWVuY2UgPSAxXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPiAweEZGRkYpIHtcbiAgICAgIC8vIGVuY29kZSB0byB1dGYxNiAoc3Vycm9nYXRlIHBhaXIgZGFuY2UpXG4gICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMFxuICAgICAgcmVzLnB1c2goY29kZVBvaW50ID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKVxuICAgICAgY29kZVBvaW50ID0gMHhEQzAwIHwgY29kZVBvaW50ICYgMHgzRkZcbiAgICB9XG5cbiAgICByZXMucHVzaChjb2RlUG9pbnQpXG4gICAgaSArPSBieXRlc1BlclNlcXVlbmNlXG4gIH1cblxuICByZXR1cm4gZGVjb2RlQ29kZVBvaW50c0FycmF5KHJlcylcbn1cblxuLy8gQmFzZWQgb24gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjI3NDcyNzIvNjgwNzQyLCB0aGUgYnJvd3NlciB3aXRoXG4vLyB0aGUgbG93ZXN0IGxpbWl0IGlzIENocm9tZSwgd2l0aCAweDEwMDAwIGFyZ3MuXG4vLyBXZSBnbyAxIG1hZ25pdHVkZSBsZXNzLCBmb3Igc2FmZXR5XG52YXIgTUFYX0FSR1VNRU5UU19MRU5HVEggPSAweDEwMDBcblxuZnVuY3Rpb24gZGVjb2RlQ29kZVBvaW50c0FycmF5IChjb2RlUG9pbnRzKSB7XG4gIHZhciBsZW4gPSBjb2RlUG9pbnRzLmxlbmd0aFxuICBpZiAobGVuIDw9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjb2RlUG9pbnRzKSAvLyBhdm9pZCBleHRyYSBzbGljZSgpXG4gIH1cblxuICAvLyBEZWNvZGUgaW4gY2h1bmtzIHRvIGF2b2lkIFwiY2FsbCBzdGFjayBzaXplIGV4Y2VlZGVkXCIuXG4gIHZhciByZXMgPSAnJ1xuICB2YXIgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShcbiAgICAgIFN0cmluZyxcbiAgICAgIGNvZGVQb2ludHMuc2xpY2UoaSwgaSArPSBNQVhfQVJHVU1FTlRTX0xFTkdUSClcbiAgICApXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSAmIDB4N0YpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBsYXRpbjFTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBoZXhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgdmFyIG91dCA9ICcnXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgb3V0ICs9IHRvSGV4KGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKVxuICB2YXIgcmVzID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgYnl0ZXNbaSArIDFdICogMjU2KVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBzdGFydCA9IH5+c3RhcnRcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiB+fmVuZFxuXG4gIGlmIChzdGFydCA8IDApIHtcbiAgICBzdGFydCArPSBsZW5cbiAgICBpZiAoc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgfSBlbHNlIGlmIChzdGFydCA+IGxlbikge1xuICAgIHN0YXJ0ID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgMCkge1xuICAgIGVuZCArPSBsZW5cbiAgICBpZiAoZW5kIDwgMCkgZW5kID0gMFxuICB9IGVsc2UgaWYgKGVuZCA+IGxlbikge1xuICAgIGVuZCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIHZhciBuZXdCdWZcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgbmV3QnVmID0gdGhpcy5zdWJhcnJheShzdGFydCwgZW5kKVxuICAgIG5ld0J1Zi5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgdmFyIHNsaWNlTGVuID0gZW5kIC0gc3RhcnRcbiAgICBuZXdCdWYgPSBuZXcgQnVmZmVyKHNsaWNlTGVuLCB1bmRlZmluZWQpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGljZUxlbjsgKytpKSB7XG4gICAgICBuZXdCdWZbaV0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3QnVmXG59XG5cbi8qXG4gKiBOZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IGJ1ZmZlciBpc24ndCB0cnlpbmcgdG8gd3JpdGUgb3V0IG9mIGJvdW5kcy5cbiAqL1xuZnVuY3Rpb24gY2hlY2tPZmZzZXQgKG9mZnNldCwgZXh0LCBsZW5ndGgpIHtcbiAgaWYgKChvZmZzZXQgJSAxKSAhPT0gMCB8fCBvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb2Zmc2V0IGlzIG5vdCB1aW50JylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RyeWluZyB0byBhY2Nlc3MgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50TEUgPSBmdW5jdGlvbiByZWFkVUludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50QkUgPSBmdW5jdGlvbiByZWFkVUludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuICB9XG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXVxuICB2YXIgbXVsID0gMVxuICB3aGlsZSAoYnl0ZUxlbmd0aCA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gcmVhZFVJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2TEUgPSBmdW5jdGlvbiByZWFkVUludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkJFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDgpIHwgdGhpc1tvZmZzZXQgKyAxXVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAoKHRoaXNbb2Zmc2V0XSkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpKSArXG4gICAgICAodGhpc1tvZmZzZXQgKyAzXSAqIDB4MTAwMDAwMClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiByZWFkVUludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSAqIDB4MTAwMDAwMCkgK1xuICAgICgodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICB0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRMRSA9IGZ1bmN0aW9uIHJlYWRJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRCRSA9IGZ1bmN0aW9uIHJlYWRJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aFxuICB2YXIgbXVsID0gMVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWldXG4gIHdoaWxlIChpID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0taV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gcmVhZEludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgaWYgKCEodGhpc1tvZmZzZXRdICYgMHg4MCkpIHJldHVybiAodGhpc1tvZmZzZXRdKVxuICByZXR1cm4gKCgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiByZWFkSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAxXSB8ICh0aGlzW29mZnNldF0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gcmVhZEludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDNdIDw8IDI0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkJFID0gZnVuY3Rpb24gcmVhZEludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCAyNCkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gcmVhZEZsb2F0TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gcmVhZEZsb2F0QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiByZWFkRG91YmxlTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDUyLCA4KVxufVxuXG5mdW5jdGlvbiBjaGVja0ludCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYnVmZmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlciBpbnN0YW5jZScpXG4gIGlmICh2YWx1ZSA+IG1heCB8fCB2YWx1ZSA8IG1pbikgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBpcyBvdXQgb2YgYm91bmRzJylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludExFID0gZnVuY3Rpb24gd3JpdGVVSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludEJFID0gZnVuY3Rpb24gd3JpdGVVSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiB3cml0ZVVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4ZmYsIDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MTYgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgMik7IGkgPCBqOyArK2kpIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgJiAoMHhmZiA8PCAoOCAqIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpKSkpID4+PlxuICAgICAgKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkgKiA4XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDQpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDMgLSBpKSAqIDgpICYgMHhmZlxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludExFID0gZnVuY3Rpb24gd3JpdGVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IDBcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpIC0gMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludEJFID0gZnVuY3Rpb24gd3JpdGVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpICsgMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDggPSBmdW5jdGlvbiB3cml0ZUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHg3ZiwgLTB4ODApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmICsgdmFsdWUgKyAxXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbmZ1bmN0aW9uIGNoZWNrSUVFRTc1NCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5mdW5jdGlvbiB3cml0ZUZsb2F0IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDQsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gd3JpdGVGbG9hdEJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDgsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gY29weSAodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCkge1xuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0U3RhcnQgPj0gdGFyZ2V0Lmxlbmd0aCkgdGFyZ2V0U3RhcnQgPSB0YXJnZXQubGVuZ3RoXG4gIGlmICghdGFyZ2V0U3RhcnQpIHRhcmdldFN0YXJ0ID0gMFxuICBpZiAoZW5kID4gMCAmJiBlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybiAwXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgaWYgKHRhcmdldFN0YXJ0IDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgfVxuICBpZiAoc3RhcnQgPCAwIHx8IHN0YXJ0ID49IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlU3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChlbmQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlRW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCA8IGVuZCAtIHN0YXJ0KSB7XG4gICAgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0ICsgc3RhcnRcbiAgfVxuXG4gIHZhciBsZW4gPSBlbmQgLSBzdGFydFxuICB2YXIgaVxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQgJiYgc3RhcnQgPCB0YXJnZXRTdGFydCAmJiB0YXJnZXRTdGFydCA8IGVuZCkge1xuICAgIC8vIGRlc2NlbmRpbmcgY29weSBmcm9tIGVuZFxuICAgIGZvciAoaSA9IGxlbiAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIGlmIChsZW4gPCAxMDAwIHx8ICFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIGFzY2VuZGluZyBjb3B5IGZyb20gc3RhcnRcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIFVpbnQ4QXJyYXkucHJvdG90eXBlLnNldC5jYWxsKFxuICAgICAgdGFyZ2V0LFxuICAgICAgdGhpcy5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBsZW4pLFxuICAgICAgdGFyZ2V0U3RhcnRcbiAgICApXG4gIH1cblxuICByZXR1cm4gbGVuXG59XG5cbi8vIFVzYWdlOlxuLy8gICAgYnVmZmVyLmZpbGwobnVtYmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChidWZmZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKHN0cmluZ1ssIG9mZnNldFssIGVuZF1dWywgZW5jb2RpbmddKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gZmlsbCAodmFsLCBzdGFydCwgZW5kLCBlbmNvZGluZykge1xuICAvLyBIYW5kbGUgc3RyaW5nIGNhc2VzOlxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBzdGFydFxuICAgICAgc3RhcnQgPSAwXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVuZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gZW5kXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH1cbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdmFyIGNvZGUgPSB2YWwuY2hhckNvZGVBdCgwKVxuICAgICAgaWYgKGNvZGUgPCAyNTYpIHtcbiAgICAgICAgdmFsID0gY29kZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdlbmNvZGluZyBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZycgJiYgIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDI1NVxuICB9XG5cbiAgLy8gSW52YWxpZCByYW5nZXMgYXJlIG5vdCBzZXQgdG8gYSBkZWZhdWx0LCBzbyBjYW4gcmFuZ2UgY2hlY2sgZWFybHkuXG4gIGlmIChzdGFydCA8IDAgfHwgdGhpcy5sZW5ndGggPCBzdGFydCB8fCB0aGlzLmxlbmd0aCA8IGVuZCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdPdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdGFydCA9IHN0YXJ0ID4+PiAwXG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gdGhpcy5sZW5ndGggOiBlbmQgPj4+IDBcblxuICBpZiAoIXZhbCkgdmFsID0gMFxuXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICAgIHRoaXNbaV0gPSB2YWxcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGJ5dGVzID0gQnVmZmVyLmlzQnVmZmVyKHZhbClcbiAgICAgID8gdmFsXG4gICAgICA6IHV0ZjhUb0J5dGVzKG5ldyBCdWZmZXIodmFsLCBlbmNvZGluZykudG9TdHJpbmcoKSlcbiAgICB2YXIgbGVuID0gYnl0ZXMubGVuZ3RoXG4gICAgZm9yIChpID0gMDsgaSA8IGVuZCAtIHN0YXJ0OyArK2kpIHtcbiAgICAgIHRoaXNbaSArIHN0YXJ0XSA9IGJ5dGVzW2kgJSBsZW5dXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG52YXIgSU5WQUxJRF9CQVNFNjRfUkUgPSAvW14rXFwvMC05QS1aYS16LV9dL2dcblxuZnVuY3Rpb24gYmFzZTY0Y2xlYW4gKHN0cikge1xuICAvLyBOb2RlIHN0cmlwcyBvdXQgaW52YWxpZCBjaGFyYWN0ZXJzIGxpa2UgXFxuIGFuZCBcXHQgZnJvbSB0aGUgc3RyaW5nLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgc3RyID0gc3RyaW5ndHJpbShzdHIpLnJlcGxhY2UoSU5WQUxJRF9CQVNFNjRfUkUsICcnKVxuICAvLyBOb2RlIGNvbnZlcnRzIHN0cmluZ3Mgd2l0aCBsZW5ndGggPCAyIHRvICcnXG4gIGlmIChzdHIubGVuZ3RoIDwgMikgcmV0dXJuICcnXG4gIC8vIE5vZGUgYWxsb3dzIGZvciBub24tcGFkZGVkIGJhc2U2NCBzdHJpbmdzIChtaXNzaW5nIHRyYWlsaW5nID09PSksIGJhc2U2NC1qcyBkb2VzIG5vdFxuICB3aGlsZSAoc3RyLmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICBzdHIgPSBzdHIgKyAnPSdcbiAgfVxuICByZXR1cm4gc3RyXG59XG5cbmZ1bmN0aW9uIHN0cmluZ3RyaW0gKHN0cikge1xuICBpZiAoc3RyLnRyaW0pIHJldHVybiBzdHIudHJpbSgpXG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXG59XG5cbmZ1bmN0aW9uIHRvSGV4IChuKSB7XG4gIGlmIChuIDwgMTYpIHJldHVybiAnMCcgKyBuLnRvU3RyaW5nKDE2KVxuICByZXR1cm4gbi50b1N0cmluZygxNilcbn1cblxuZnVuY3Rpb24gdXRmOFRvQnl0ZXMgKHN0cmluZywgdW5pdHMpIHtcbiAgdW5pdHMgPSB1bml0cyB8fCBJbmZpbml0eVxuICB2YXIgY29kZVBvaW50XG4gIHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoXG4gIHZhciBsZWFkU3Vycm9nYXRlID0gbnVsbFxuICB2YXIgYnl0ZXMgPSBbXVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb2RlUG9pbnQgPSBzdHJpbmcuY2hhckNvZGVBdChpKVxuXG4gICAgLy8gaXMgc3Vycm9nYXRlIGNvbXBvbmVudFxuICAgIGlmIChjb2RlUG9pbnQgPiAweEQ3RkYgJiYgY29kZVBvaW50IDwgMHhFMDAwKSB7XG4gICAgICAvLyBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCFsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAgIC8vIG5vIGxlYWQgeWV0XG4gICAgICAgIGlmIChjb2RlUG9pbnQgPiAweERCRkYpIHtcbiAgICAgICAgICAvLyB1bmV4cGVjdGVkIHRyYWlsXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmIChpICsgMSA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgLy8gdW5wYWlyZWQgbGVhZFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWxpZCBsZWFkXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyAyIGxlYWRzIGluIGEgcm93XG4gICAgICBpZiAoY29kZVBvaW50IDwgMHhEQzAwKSB7XG4gICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIHZhbGlkIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICBjb2RlUG9pbnQgPSAobGVhZFN1cnJvZ2F0ZSAtIDB4RDgwMCA8PCAxMCB8IGNvZGVQb2ludCAtIDB4REMwMCkgKyAweDEwMDAwXG4gICAgfSBlbHNlIGlmIChsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAvLyB2YWxpZCBibXAgY2hhciwgYnV0IGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICB9XG5cbiAgICBsZWFkU3Vycm9nYXRlID0gbnVsbFxuXG4gICAgLy8gZW5jb2RlIHV0ZjhcbiAgICBpZiAoY29kZVBvaW50IDwgMHg4MCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAxKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKGNvZGVQb2ludClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4ODAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgfCAweEMwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAzKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDIHwgMHhFMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gNCkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4MTIgfCAweEYwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvZGUgcG9pbnQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBieXRlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyAoc3RyLCB1bml0cykge1xuICB2YXIgYywgaGksIGxvXG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuXG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaGkgPSBjID4+IDhcbiAgICBsbyA9IGMgJSAyNTZcbiAgICBieXRlQXJyYXkucHVzaChsbylcbiAgICBieXRlQXJyYXkucHVzaChoaSlcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyAoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoYmFzZTY0Y2xlYW4oc3RyKSlcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlciAoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gaXNuYW4gKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSB2YWwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbn1cbiIsInZhciBkZWdyZWVzID0gMTgwIC8gTWF0aC5QSTtcblxuZXhwb3J0IHZhciBpZGVudGl0eSA9IHtcbiAgdHJhbnNsYXRlWDogMCxcbiAgdHJhbnNsYXRlWTogMCxcbiAgcm90YXRlOiAwLFxuICBza2V3WDogMCxcbiAgc2NhbGVYOiAxLFxuICBzY2FsZVk6IDFcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgdmFyIHNjYWxlWCwgc2NhbGVZLCBza2V3WDtcbiAgaWYgKHNjYWxlWCA9IE1hdGguc3FydChhICogYSArIGIgKiBiKSkgYSAvPSBzY2FsZVgsIGIgLz0gc2NhbGVYO1xuICBpZiAoc2tld1ggPSBhICogYyArIGIgKiBkKSBjIC09IGEgKiBza2V3WCwgZCAtPSBiICogc2tld1g7XG4gIGlmIChzY2FsZVkgPSBNYXRoLnNxcnQoYyAqIGMgKyBkICogZCkpIGMgLz0gc2NhbGVZLCBkIC89IHNjYWxlWSwgc2tld1ggLz0gc2NhbGVZO1xuICBpZiAoYSAqIGQgPCBiICogYykgYSA9IC1hLCBiID0gLWIsIHNrZXdYID0gLXNrZXdYLCBzY2FsZVggPSAtc2NhbGVYO1xuICByZXR1cm4ge1xuICAgIHRyYW5zbGF0ZVg6IGUsXG4gICAgdHJhbnNsYXRlWTogZixcbiAgICByb3RhdGU6IE1hdGguYXRhbjIoYiwgYSkgKiBkZWdyZWVzLFxuICAgIHNrZXdYOiBNYXRoLmF0YW4oc2tld1gpICogZGVncmVlcyxcbiAgICBzY2FsZVg6IHNjYWxlWCxcbiAgICBzY2FsZVk6IHNjYWxlWVxuICB9O1xufVxuIiwiaW1wb3J0IGRlY29tcG9zZSwge2lkZW50aXR5fSBmcm9tIFwiLi9kZWNvbXBvc2VcIjtcblxudmFyIGNzc05vZGUsXG4gICAgY3NzUm9vdCxcbiAgICBjc3NWaWV3LFxuICAgIHN2Z05vZGU7XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUNzcyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT09IFwibm9uZVwiKSByZXR1cm4gaWRlbnRpdHk7XG4gIGlmICghY3NzTm9kZSkgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJESVZcIiksIGNzc1Jvb3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGNzc1ZpZXcgPSBkb2N1bWVudC5kZWZhdWx0VmlldztcbiAgY3NzTm9kZS5zdHlsZS50cmFuc2Zvcm0gPSB2YWx1ZTtcbiAgdmFsdWUgPSBjc3NWaWV3LmdldENvbXB1dGVkU3R5bGUoY3NzUm9vdC5hcHBlbmRDaGlsZChjc3NOb2RlKSwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShcInRyYW5zZm9ybVwiKTtcbiAgY3NzUm9vdC5yZW1vdmVDaGlsZChjc3NOb2RlKTtcbiAgdmFsdWUgPSB2YWx1ZS5zbGljZSg3LCAtMSkuc3BsaXQoXCIsXCIpO1xuICByZXR1cm4gZGVjb21wb3NlKCt2YWx1ZVswXSwgK3ZhbHVlWzFdLCArdmFsdWVbMl0sICt2YWx1ZVszXSwgK3ZhbHVlWzRdLCArdmFsdWVbNV0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTdmcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiBpZGVudGl0eTtcbiAgaWYgKCFzdmdOb2RlKSBzdmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJnXCIpO1xuICBzdmdOb2RlLnNldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiLCB2YWx1ZSk7XG4gIGlmICghKHZhbHVlID0gc3ZnTm9kZS50cmFuc2Zvcm0uYmFzZVZhbC5jb25zb2xpZGF0ZSgpKSkgcmV0dXJuIGlkZW50aXR5O1xuICB2YWx1ZSA9IHZhbHVlLm1hdHJpeDtcbiAgcmV0dXJuIGRlY29tcG9zZSh2YWx1ZS5hLCB2YWx1ZS5iLCB2YWx1ZS5jLCB2YWx1ZS5kLCB2YWx1ZS5lLCB2YWx1ZS5mKTtcbn1cbiIsImV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBuQml0cyA9IC03XG4gIHZhciBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDBcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxXG4gIHZhciBzID0gYnVmZmVyW29mZnNldCArIGldXG5cbiAgaSArPSBkXG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgcyA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gZUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gKGUgKiAyNTYpICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgbSA9IGUgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgZSA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gbUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gKG0gKiAyNTYpICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzXG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKChzID8gLTEgOiAxKSAqIEluZmluaXR5KVxuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbilcbiAgICBlID0gZSAtIGVCaWFzXG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbilcbn1cblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgY1xuICB2YXIgZUxlbiA9IChuQnl0ZXMgKiA4KSAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApXG4gIHZhciBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSlcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xXG4gIHZhciBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwXG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSlcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMFxuICAgIGUgPSBlTWF4XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpXG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tXG4gICAgICBjICo9IDJcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpXG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrXG4gICAgICBjIC89IDJcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwXG4gICAgICBlID0gZU1heFxuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAoKHZhbHVlICogYykgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gZSArIGVCaWFzXG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IDBcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG1cbiAgZUxlbiArPSBtTGVuXG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCkge31cblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjhcbn1cbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiZXhwb3J0IGNvbnN0IGNoYXJ0ID0gKCkgPT4ge1xuICBsZXQgbWFyZ2luID0geyBsZWZ0OiAxMjAsIHJpZ2h0OiAyMCwgdG9wOiAxMCwgYm90dG9tOiAxMzAgfTtcblxuICBsZXQgd2lkdGggPSAxMzAwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQ7XG4gIGxldCBoZWlnaHQgPSA3MDAgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcblxuICBsZXQgZyA9IGQzXG4gICAgLnNlbGVjdChcIiNjaGFydFwiKVxuICAgIC5hcHBlbmQoXCJzdmdcIilcbiAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXG4gICAgLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsIFwiICsgbWFyZ2luLnRvcCArIFwiKVwiKTtcblxuICAvLyBYIExhYmVsXG4gIGcuYXBwZW5kKFwidGV4dFwiKVxuICAgIC5hdHRyKFwieVwiLCBoZWlnaHQgKyA1MClcbiAgICAuYXR0cihcInhcIiwgd2lkdGggLyAyKVxuICAgIC5hdHRyKFwiZm9udC1zaXplXCIsIFwiMjBweFwiKVxuICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAudGV4dChcIlllYXJcIik7XG5cbiAgLy8gWSBMYWJlbFxuICBnLmFwcGVuZChcInRleHRcIilcbiAgICAuYXR0cihcInlcIiwgLTYwKVxuICAgIC5hdHRyKFwieFwiLCAtKGhlaWdodCAvIDIpKVxuICAgIC5hdHRyKFwiZm9udC1zaXplXCIsIFwiMjBweFwiKVxuICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInJvdGF0ZSgtOTApXCIpXG4gICAgLnRleHQoXCJUb3RhbCBBY3F1aXNpdGlvbnMsIFVTRFwiKTtcblxuICBkMy5qc29uKFwiLi4vZGF0YS9hY3F1aXNpdGlvbnMvb2JqZWN0Lmpzb25cIikudGhlbihkYXRhID0+IHtcbiAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xuXG4gICAgZGF0YSA9IGRhdGEuc2xpY2UoKS5zb3J0KChhLCBiKSA9PiBkMy5hc2NlbmRpbmcoYS55ZWFyLCBiLnllYXIpKTtcblxuICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICBkYXRhLmZvckVhY2goZCA9PiB7XG4gICAgICBkLnByaWNlID0gK2QucHJpY2U7XG4gICAgICAvL2NvbnNvbGUubG9nKGQucHJpY2UpO1xuICAgIH0pO1xuXG4gICAgbGV0IHggPSBkM1xuICAgICAgLnNjYWxlQmFuZCgpXG4gICAgICAuZG9tYWluKFxuICAgICAgICBkYXRhLm1hcChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIGQueWVhcjtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5yYW5nZShbMCwgd2lkdGhdKVxuICAgICAgLnBhZGRpbmcoMC4yKTtcblxuICAgIGxldCB5ID0gZDNcbiAgICAgIC5zY2FsZUxpbmVhcigpXG4gICAgICAuZG9tYWluKFtcbiAgICAgICAgZDMubWluKGRhdGEsIGQgPT4ge1xuICAgICAgICAgIHJldHVybiAxZTkgKiBNYXRoLmZsb29yKGQucHJpY2UgLyAxZTkpO1xuICAgICAgICB9KSxcbiAgICAgICAgZDMubWF4KGRhdGEsIGQgPT4ge1xuICAgICAgICAgIHJldHVybiAxZTkgKiBNYXRoLmNlaWwoZC5wcmljZSAvIDFlOSk7XG4gICAgICAgIH0pXG4gICAgICBdKVxuICAgICAgLm5pY2UoNylcbiAgICAgIC5yYW5nZShbaGVpZ2h0LCAwXSk7XG5cbiAgICAvLyAgIHsgcmV0dXJuIDFlOSpNYXRoLmZsb29yKGRbXCJUYXggQ29sbGVjdGlvblwiXS8xZTkpOyB9LFxuICAgIC8vIGQzLm1heCggZGF0YSwgZnVuY3Rpb24oZCl7IHJldHVybiAxZTkqTWF0aC5jZWlsKGRbXCJUYXggQ29sbGVjdGlvblwiXS8xZTkpOyB9XG5cbiAgICAvLyBYIEF4aXNcbiAgICBsZXQgeEF4aXNDYWxsID0gZDMuYXhpc0JvdHRvbSh4KTtcbiAgICBnLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ4IGF4aXNcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsXCIgKyBoZWlnaHQgKyBcIilcIilcbiAgICAgIC5jYWxsKHhBeGlzQ2FsbCk7XG5cbiAgICAvLyBZIEF4aXNcbiAgICBsZXQgeUF4aXNDYWxsID0gZDNcbiAgICAgIC5heGlzTGVmdCh5KVxuICAgICAgLy8gLnRpY2tzKDcpXG4gICAgICAudGlja0Zvcm1hdChmdW5jdGlvbihkKSB7XG4gICAgICAgIGlmIChkICE9PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIFwiJFwiICsgZCAvIDEwMDAwMDAwMDAgKyBcIkJcIjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgZy5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwieSBheGlzXCIpXG4gICAgICAvLyAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwLFwiIC0gNTAgKyBcIilcIilcbiAgICAgIC5jYWxsKHlBeGlzQ2FsbCk7XG5cbiAgICBsZXQgcmVjdHMgPSBnLnNlbGVjdEFsbChcInJlY3RcIikuZGF0YShkYXRhKTtcblxuICAgIC8vY29uc29sZS5sb2coaGVpZ2h0KTtcblxuICAgIHJlY3RzXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAgIC5hdHRyKFwieVwiLCBkID0+IHtcbiAgICAgICAgcmV0dXJuIHkoZC5wcmljZSk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJ4XCIsIGQgPT4ge1xuICAgICAgICAvL2NvbnNvbGUubG9nKHgoZC55ZWFyKSk7XG4gICAgICAgIHJldHVybiB4KGQueWVhcik7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgZCA9PiB7XG4gICAgICAgIHJldHVybiBoZWlnaHQgLSB5KGQucHJpY2UpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwid2lkdGhcIiwgeC5iYW5kd2lkdGgpXG4gICAgICAuYXR0cihcImZpbGxcIiwgXCJvcmFuZ2VcIik7XG4gIH0pO1xufTtcbiIsImltcG9ydCB7IGNoYXJ0IH0gZnJvbSBcIi4vYmFyX2NoYXJ0XCI7XG5pbXBvcnQgeyBpbnRlcmFjdGl2ZUNoYXJ0IH0gZnJvbSBcIi4vaW50ZXJhY3RpdmVfY2hhcnRcIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAvLyBjb25zb2xlLmxvZyhcImhlbGxvMlwiKTtcbiAgY2hhcnQoKTtcbiAgaW50ZXJhY3RpdmVDaGFydCgpO1xufSk7XG4iLCJpbXBvcnQgeyBTbG93QnVmZmVyIH0gZnJvbSBcImJ1ZmZlclwiO1xuaW1wb3J0IHsgcGFyc2VTdmcgfSBmcm9tIFwiZDMtaW50ZXJwb2xhdGUvc3JjL3RyYW5zZm9ybS9wYXJzZVwiO1xuXG5leHBvcnQgY29uc3QgaW50ZXJhY3RpdmVDaGFydCA9ICgpID0+IHtcbiAgY29uc29sZS5sb2coXCJnaXRodWIgdGVzdFwiKTtcbiAgbGV0IG1hcmdpbiA9IHsgbGVmdDogODAsIHJpZ2h0OiAyMCwgdG9wOiA1MCwgYm90dG9tOiAxMDAgfTtcblxuICBsZXQgd2lkdGggPSA5MDAgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodDtcbiAgbGV0IGhlaWdodCA9IDcwMCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xuXG4gIGxldCBmbGFnID0gdHJ1ZTtcblxuICB2YXIgdCA9IGQzLnRyYW5zaXRpb24oKS5kdXJhdGlvbig3NTApO1xuXG4gIGxldCBhYmMgPVxuICAgIFwiVGhhbmtzIGZvciBjaGVja2luZyBvdXQgbXkgRDMgdmlzdWFsaXphdGlvbiBwb3dlcmVkIGJ5IHRoZSBDcnVuY2hiYXNlIGRhdGFzZXQhICBcIjtcblxuICBsZXQgYWJkID1cbiAgICBcIiBUaGUgYmFyIGNoYXJ0IGFib3ZlIHJlcHJlc2VudHMgdmVudHVyZSBmdW5kaW5nIHJvdW5kcyBmb3IgdGhlIHBlcmlvZCBiZXR3ZWVuIDIwMDAgYW5kIDIwMTMuXCI7XG5cbiAgbGV0IGhlcm8gPSBcIlJvdW5kcyBhbmQgRnVuZGluZ3MgRGF0YVwiO1xuXG4gIGxldCBhYmMyID1cbiAgICBcIlRoZSBkYXRhIGlzIHNlZ21lbnRlZCBieSBpbmR1c3RyaWVzICh3ZWIsIG1vYmlsZSwgc29mdHdhcmUsIHdlYiwgbWVkaWNhbCksIHJvdW5kcyAoc2VyaWVzIEEsIHNlcmllcyBCLCBBbmdlbCwgU2VyaWVzIEMrLCBWZW50dXJlKSBhbmQgeWVhcnMuXCI7XG5cbiAgbGV0IGFiYzMgPVxuICAgIFwiIFByZXNzIG9uIHRoZSBQbGF5IGJ1dHRvbiB0byB3YXRjaCBhbiBhbmltYXRlZCBzaG93IG9mIGludWRzdHJpZXMnIGFnZ3JlZ2F0ZWQgZnVuZGluZyByb3VuZHMgb3ZlciB0aGVzZSB5ZWFycy4gSW50ZXJlc3RlZCBpbiBsZWFybmluZyBtb3JlP1wiO1xuXG4gIGxldCBhYmM0ID1cbiAgICBcIkNsaWNrIG9uIHRoZSBQYXVzZSBidXR0b24gdG8gcHV0IGFuaW1hdGlvbiBvbiBob2xkLCB0aGVuIGNsaWNrIGFueSBiYXIgdG8gZHJpbGwgZG93biB0byB0aGUgaW5kdXN0cnkgYW5kIHJvdW5kIHRoYXQgY2F1Z2h0IHlvdXIgYXR0ZW50aW9uLlwiO1xuICBkMy5zZWxlY3QoXCIjaW50cm9cIikuYXBwZW5kKFwic3BhblwiKTtcblxuICAvLyAudGV4dChmdW5jdGlvbihkKSB7XG4gIC8vICAgcmV0dXJuIGhlcm87XG4gIC8vIH0pO1xuXG4gIGQzLnNlbGVjdEFsbChcInNwYW5cIilcbiAgICAuYXBwZW5kKFwiaDFcIilcblxuICAgIC8vIC5hdHRyKFwiY2xhc3NcIiwgXCJwYXJhZ3JhcGhcIilcbiAgICAudGV4dChmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gaGVybztcbiAgICB9KTtcbiAgZDMuc2VsZWN0QWxsKFwic3BhblwiKVxuICAgIC5hcHBlbmQoXCJwXCIpXG4gICAgLmF0dHIoXCJkeVwiLCBcIjBlbVwiKVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJwYXJhZ3JhcGhcIilcbiAgICAudGV4dChmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gYWJjICsgXCIgIFwiICsgXCIgXCIgKyBhYmQgKyBcIiBcIiArIGFiYzIgKyBcIiBcIiArIGFiYzMgKyBcIiBcIiArIGFiYzQ7XG4gICAgfSk7XG5cbiAgLy8gZDMuc2VsZWN0QWxsKFwic3BhblwiKVxuICAvLyAgIC5hcHBlbmQoXCJwXCIpXG4gIC8vICAgLmF0dHIoXCJkeVwiLCBcIjFlbVwiKVxuICAvLyAgIC5hdHRyKFwiY2xhc3NcIiwgXCJwYXJhZ3JhcGhcIilcbiAgLy8gICAudGV4dChmdW5jdGlvbihkKSB7XG4gIC8vICAgICByZXR1cm4gYWJjMjtcbiAgLy8gICB9KTtcbiAgLy8gZDMuc2VsZWN0QWxsKFwic3BhblwiKVxuICAvLyAgIC5hcHBlbmQoXCJwXCIpXG4gIC8vICAgLmF0dHIoXCJkeVwiLCBcIjJlbVwiKVxuICAvLyAgIC5hdHRyKFwiY2xhc3NcIiwgXCJwYXJhZ3JhcGhcIilcbiAgLy8gICAudGV4dChmdW5jdGlvbihkKSB7XG4gIC8vICAgICByZXR1cm4gYWJjMztcbiAgLy8gICB9KTtcbiAgLy8gZDMuc2VsZWN0QWxsKFwic3BhblwiKVxuICAvLyAgIC5hcHBlbmQoXCJwXCIpXG4gIC8vICAgLmF0dHIoXCJkeVwiLCBcIjJlbVwiKVxuICAvLyAgIC5hdHRyKFwiY2xhc3NcIiwgXCJwYXJhZ3JhcGhcIilcbiAgLy8gICAudGV4dChmdW5jdGlvbihkKSB7XG4gIC8vICAgICByZXR1cm4gYWJjNDtcbiAgLy8gICB9KTtcblxuICBsZXQgc3ZnID0gZDNcbiAgICAuc2VsZWN0KFwiI2ludGVyXCIpXG4gICAgLmFwcGVuZChcInN2Z1wiKVxuICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGggKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodClcbiAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSlcbiAgICAuYXBwZW5kKFwiZ1wiKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgbWFyZ2luLmxlZnQgKyBcIiwgXCIgKyBtYXJnaW4udG9wICsgXCIpXCIpO1xuXG4gIC8vICAgLy8gWCBTY2FsZVxuICBsZXQgeDAgPSBkM1xuICAgIC5zY2FsZUJhbmQoKVxuICAgIC5yYW5nZShbMCwgd2lkdGhdKVxuICAgIC5wYWRkaW5nKDAuMSk7XG5cbiAgbGV0IHgxID0gZDMuc2NhbGVCYW5kKCk7XG5cbiAgZDMuc2VsZWN0KFwiI2dvYmFjay1idXR0b25cIikuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcblxuICBsZXQgcmF3RGF0YTtcbiAgbGV0IHRlc3REYXRhO1xuXG4gIGxldCBpbnRlcnZhbDtcbiAgbGV0IGNsZWFuRGF0YTtcblxuICBsZXQgYmFyU3RlcCA9IDI3O1xuXG4gIGxldCBiYXJQYWRkaW5nID0gMyAvIGJhclN0ZXA7XG5cbiAgLy8gICAvLyBZIFNjYWxlXG4gIGxldCB5ID0gZDNcbiAgICAuc2NhbGVMaW5lYXIoKVxuICAgIC5yYW5nZShbaGVpZ2h0LCAwXSlcbiAgICAubmljZSg3KTtcblxuICBsZXQgeEF4aXMgPSBkMy5heGlzQm90dG9tKHgwKS50aWNrU2l6ZSgwKTtcblxuICBsZXQgeUF4aXMgPSBkMy5heGlzTGVmdCh5KS50aWNrRm9ybWF0KGZ1bmN0aW9uKGQpIHtcbiAgICBpZiAoZCAhPT0gMCAmJiBkIDwgMTAwMDAwMDAwMCkge1xuICAgICAgcmV0dXJuIFwiJFwiICsgZCAvIDEwMDAwMDAgKyBcIk1cIjtcbiAgICB9IGVsc2UgaWYgKGQgIT09IDApIHtcbiAgICAgIHJldHVybiBcIiRcIiArIGQgLyAxMDAwMDAwMDAwICsgXCJCXCI7XG4gICAgfVxuICB9KTtcblxuICBsZXQgdGlwID0gZDNcbiAgICAudGlwKClcbiAgICAuYXR0cihcImNsYXNzXCIsIFwiZDMtdGlwXCIpXG4gICAgLmRpcmVjdGlvbihcImVcIikgLy8gUG9zaXRpb24gdGhlIHRvb2x0aXAgdG8gdGhlIHJpZ2h0IG9mIGEgdGFyZ2V0IGVsZW1lbnRcbiAgICAub2Zmc2V0KFstMTAsIDBdKVxuICAgIC5odG1sKGZ1bmN0aW9uKGQpIHtcbiAgICAgIGxldCB0ZXh0ID1cbiAgICAgICAgXCI8c3Ryb25nPkNvbXBhbnk6PC9zdHJvbmc+IDxzcGFuIHN0eWxlPSdjb2xvcjpyZWQnPlwiICtcbiAgICAgICAgZC5jb21wYW55ICtcbiAgICAgICAgXCI8L3NwYW4+PGJyPlwiO1xuICAgICAgdGV4dCArPVxuICAgICAgICBcIjxzdHJvbmc+U2VjdG9yOjwvc3Ryb25nPiA8c3BhbiBzdHlsZT0nY29sb3I6cmVkO3RleHQtdHJhbnNmb3JtOmNhcGl0YWxpemUnPlwiICtcbiAgICAgICAgZC5zZWN0b3IgK1xuICAgICAgICBcIjwvc3Bhbj48YnI+XCI7XG4gICAgICB0ZXh0ICs9XG4gICAgICAgIFwiPHN0cm9uZz5Sb3VuZDo8L3N0cm9uZz4gPHNwYW4gc3R5bGU9J2NvbG9yOnJlZCc+XCIgK1xuICAgICAgICBkLnJvdW5kICtcbiAgICAgICAgXCI8L3NwYW4+PGJyPlwiO1xuICAgICAgdGV4dCArPVxuICAgICAgICBcIjxzdHJvbmc+QW1vdW50IFJhaXNlZDo8L3N0cm9uZz4gPHNwYW4gc3R5bGU9J2NvbG9yOnJlZCc+XCIgK1xuICAgICAgICBkMy5mb3JtYXQoXCIkLC4wZlwiKShkLmFtb3VudFJhaXNlZCkgK1xuICAgICAgICBcIjwvc3Bhbj48YnI+XCI7XG4gICAgICByZXR1cm4gdGV4dDtcbiAgICB9KTtcblxuICBsZXQgdGltZUxhYmVsID0gc3ZnXG4gICAgLmFwcGVuZChcInRleHRcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIFwibGFiZWxcIilcbiAgICAuYXR0cihcInlcIiwgaGVpZ2h0ICsgNTApXG4gICAgLmF0dHIoXCJ4XCIsIHdpZHRoIC0gNDApXG4gICAgLy8gLmF0dHIoXCJmb250LXNpemVcIiwgXCI0MHB4XCIpXG4gICAgLy8gLmF0dHIoXCJvcGFjaXR5XCIsIFwiMC40XCIpXG4gICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgIC50ZXh0KFwiMjAwMFwiKTtcblxuICBsZXQgc2VjdG9ycyA9IFtcIm1vYmlsZVwiLCBcInNvZnR3YXJlXCIsIFwid2ViXCIsIFwiZWNvbW1lcmNlXCIsIFwibWVkaWNhbFwiXTtcbiAgbGV0IHJvdW5kcyA9IFtcInNlcmllcy1hXCIsIFwic2VyaWVzLWJcIiwgXCJhbmdlbFwiLCBcInNlcmllcy1jK1wiLCBcInZlbnR1cmVcIl07XG5cbiAgeDAuZG9tYWluKHJvdW5kcyk7XG4gIHgxLmRvbWFpbihzZWN0b3JzKS5yYW5nZVJvdW5kKFswLCB4MC5iYW5kd2lkdGgoKV0pO1xuXG4gIHgwLmludmVydCA9IGZ1bmN0aW9uKHgpIHtcbiAgICB2YXIgZG9tYWluID0geDAuZG9tYWluKCk7XG4gICAgdmFyIHJhbmdlID0geDAucmFuZ2UoKTtcbiAgICB2YXIgc2NhbGUgPSBkM1xuICAgICAgLnNjYWxlUXVhbnRpemUoKVxuICAgICAgLnJhbmdlKGRvbWFpbilcbiAgICAgIC5kb21haW4ocmFuZ2UpO1xuICAgIHJldHVybiBzY2FsZSh4KTtcbiAgfTtcblxuICBzdmdcbiAgICAuYXBwZW5kKFwiZ1wiKVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ5IGF4aXNcIilcbiAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcbiAgLy8uY2FsbCh5QXhpcyk7XG5cbiAgc3ZnXG4gICAgLmFwcGVuZChcInRleHRcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIFwibGFiZWxcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInJvdGF0ZSgtOTApXCIpXG4gICAgLmF0dHIoXCJ5XCIsIDYpXG4gICAgLmF0dHIoXCJkeVwiLCBcIi43MWVtXCIpXG4gICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJlbmRcIilcbiAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcImJvbGRcIilcbiAgICAudGV4dChcIlZhbHVlXCIpO1xuXG4gIC8vIHZhciB4QXhpc0dyb3VwID0gZ1xuICAvLyAgICAgLmFwcGVuZChcImdcIilcbiAgLy8gICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ4IGF4aXNcIilcbiAgLy8gICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsXCIgKyBoZWlnaHQgKyBcIilcIik7XG5cbiAgLy8gICB2YXIgeUF4aXNHcm91cCA9IGcuYXBwZW5kKFwiZ1wiKS5hdHRyKFwiY2xhc3NcIiwgXCJ5IGF4aXNcIik7XG5cbiAgLy8gdmFyIGNvbG9yID0gZDMuc2NhbGVcbiAgLy8gICAub3JkaW5hbCgpXG4gIC8vICAgLnJhbmdlKFtcIiNjYTAwMjBcIiwgXCIjZjRhNTgyXCIsIFwiI2Q1ZDVkNVwiLCBcIiM5MmM1ZGVcIiwgXCIjMDU3MWIwXCJdKTtcblxuICB2YXIgY29sb3IgPSBkMy5zY2FsZU9yZGluYWwoZDMuc2NoZW1lU2V0MSk7XG5cbiAgbGV0IHRpbWUgPSAwO1xuXG4gIGxldCB4MyA9IGQzLnNjYWxlTGluZWFyKCkucmFuZ2UoW21hcmdpbi5sZWZ0LCB3aWR0aCAtIG1hcmdpbi5yaWdodF0pO1xuXG4gIGxldCB4QXhpczIgPSBnID0+XG4gICAgZ1xuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcIngtYXhpc1wiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgwICwke21hcmdpbi50b3B9KWApXG4gICAgICAuY2FsbChkMy5heGlzVG9wKHgzKS50aWNrcyh3aWR0aCAvIDE1MCwgXCJzXCIpKVxuICAgICAgLmNhbGwoZyA9PiAoZy5zZWxlY3Rpb24gPyBnLnNlbGVjdGlvbigpIDogZykuc2VsZWN0KFwiLmRvbWFpblwiKS5yZW1vdmUoKSk7XG5cbiAgbGV0IHlBeGlzMiA9IGcgPT5cbiAgICBnXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwieS1heGlzXCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKCR7bWFyZ2luLmxlZnQgKyAwLjV9LDApYClcbiAgICAgIC5jYWxsKGcgPT5cbiAgICAgICAgZ1xuICAgICAgICAgIC5hcHBlbmQoXCJsaW5lXCIpXG4gICAgICAgICAgLmF0dHIoXCJzdHJva2VcIiwgXCJjdXJyZW50Q29sb3JcIilcbiAgICAgICAgICAuYXR0cihcInkxXCIsIG1hcmdpbi50b3ApXG4gICAgICAgICAgLmF0dHIoXCJ5MlwiLCBoZWlnaHQgLSBtYXJnaW4uYm90dG9tIC0gNTApXG4gICAgICApO1xuXG4gIGQzLmpzb24oXCIuL2RhdGEvZnVuZGluZy90ZXN0X2RhdGEuanNvblwiKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB0ZXN0RGF0YSA9IGRhdGE7XG4gIH0pO1xuXG4gIGQzLmpzb24oXCIuL2RhdGEvZnVuZGluZy9jbGVhbl9uZXdfZnVuZGluZy5qc29uXCIpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4gICAgLy8gcmF3RGF0YSA9IGRhdGE7XG5cbiAgICAvLyBjbGVhbkRhdGEgPSBkM1xuICAgIC8vICAgLm5lc3QoKVxuICAgIC8vICAgLy8gICAgIC8vIC5rZXkoZnVuY3Rpb24oZCkge1xuICAgIC8vICAgLy8gICAgIC8vICAgcmV0dXJuIGQuZnVuZGVkO1xuICAgIC8vICAgLy8gICAgIC8vIH0pXG4gICAgLy8gICAua2V5KGZ1bmN0aW9uKGQpIHtcbiAgICAvLyAgICAgcmV0dXJuIGQuZnVuZGVkO1xuICAgIC8vICAgfSlcbiAgICAvLyAgIC5zb3J0S2V5cyhkMy5hc2NlbmRpbmcpXG4gICAgLy8gICAua2V5KGZ1bmN0aW9uKGQpIHtcbiAgICAvLyAgICAgcmV0dXJuIGQucm91bmQ7XG4gICAgLy8gICB9KVxuICAgIC8vICAgLmtleShmdW5jdGlvbihkKSB7XG4gICAgLy8gICAgIHJldHVybiBkLnNlY3RvcjtcbiAgICAvLyAgIH0pXG4gICAgLy8gICAucm9sbHVwKGZ1bmN0aW9uKHYpIHtcbiAgICAvLyAgICAgcmV0dXJuIGQzLnN1bSh2LCBmdW5jdGlvbihkKSB7XG4gICAgLy8gICAgICAgcmV0dXJuIGQuYW1vdW50UmFpc2VkO1xuICAgIC8vICAgICB9KTtcbiAgICAvLyAgIH0pXG4gICAgLy8gICAuZW50cmllcyhyYXdEYXRhKTtcblxuICAgIGNsZWFuRGF0YSA9IGRhdGE7XG5cbiAgICBjb25zb2xlLmxvZyh0ZXN0RGF0YSk7XG5cbiAgICAvLyB2YXIgcm91bmRzID0gY2xlYW5EYXRhLm1hcChmdW5jdGlvbihkKSB7XG4gICAgLy8gICByZXR1cm4gZC52YWx1ZXNcbiAgICAvLyAgICAgLmZpbHRlcihlbGUgPT4ge1xuICAgIC8vICAgICAgIGlmIChlbGUua2V5KSByZXR1cm4gZWxlLmtleTtcbiAgICAvLyAgICAgfSlcbiAgICAvLyAgICAgLm1hcChlbGUyID0+IHtcbiAgICAvLyAgICAgICByZXR1cm4gZWxlMi5rZXk7XG4gICAgLy8gICAgIH0pO1xuICAgIC8vIH0pO1xuXG4gICAgbGV0IGVsZW1lbnRzID0gY2xlYW5EYXRhWzBdLnZhbHVlcy5tYXAoZWxlID0+IHtcbiAgICAgIHJldHVybiBlbGU7XG4gICAgfSk7XG5cbiAgICAvLyB4MS5kb21haW4oc2VjdG9ycykucmFuZ2VSb3VuZChbMCwgeDAuYmFuZHdpZHRoKCldKTtcblxuICAgIC8vIHgxLmRvbWFpbihcbiAgICAvLyAgIGNsZWFuRGF0YVswXS52YWx1ZXNbMF0udmFsdWVzLm1hcChlbGUgPT4ge1xuICAgIC8vICAgICByZXR1cm4gZWxlLmtleTtcbiAgICAvLyAgIH0pXG4gICAgLy8gKS5yYW5nZVJvdW5kKFswLCB4MC5iYW5kd2lkdGgoKV0pO1xuXG4gICAgLy8geS5kb21haW4oW1xuICAgIC8vICAgMCxcbiAgICAvLyAgIGQzLm1heChjbGVhbkRhdGFbMF0udmFsdWVzLCBmdW5jdGlvbihyb3VuZHMpIHtcbiAgICAvLyAgICAgcmV0dXJuIGQzLm1heChyb3VuZHMudmFsdWVzLCBmdW5jdGlvbihkKSB7XG4gICAgLy8gICAgICAgcmV0dXJuIGQudmFsdWU7XG4gICAgLy8gICAgIH0pO1xuICAgIC8vICAgfSlcbiAgICAvLyBdKTtcblxuICAgIHN2Z1xuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ4IGF4aXNcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsXCIgKyBoZWlnaHQgKyBcIilcIilcbiAgICAgIC5jYWxsKHhBeGlzKTtcblxuICAgIC8vIGQzLmludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgIC8vICAgLy8gQXQgdGhlIGVuZCBvZiBvdXIgZGF0YSwgbG9vcCBiYWNrXG4gICAgLy8gICB0aW1lID0gdGltZSA8IDE0ID8gdGltZSArIDEgOiAwO1xuICAgIC8vICAgdXBkYXRlKGNsZWFuRGF0YVt0aW1lXSk7XG4gICAgLy8gfSwgNTAwMCk7XG5cbiAgICAvLyBGaXJzdCBydW4gb2YgdGhlIHZpc3VhbGl6YXRpb25cbiAgICB1cGRhdGUoY2xlYW5EYXRhWzBdKTtcbiAgfSk7XG5cbiAgLy8gbGV0IGJ1dHRvbiA9IGQzLnNlbGVjdChcIiNwbGF5LWJ1dHRvblwiKTtcbiAgLy8gY29uc29sZS5sb2coYnV0dG9uKTtcblxuICAkKFwiI3BsYXktYnV0dG9uXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgbGV0IGJ1dHRvbiA9ICQodGhpcyk7XG4gICAgaWYgKGJ1dHRvbi50ZXh0KCkgPT0gXCJQbGF5XCIpIHtcbiAgICAgIGJ1dHRvbi50ZXh0KFwiUGF1c2VcIik7XG4gICAgICBpbnRlcnZhbCA9IHNldEludGVydmFsKHN0ZXAsIDMwMDApO1xuICAgICAgc3RlcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidXR0b24udGV4dChcIlBsYXlcIik7XG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICB9XG4gIH0pO1xuXG4gICQoXCIjcmVzZXQtYnV0dG9uXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgdGltZSA9IDA7XG4gICAgdXBkYXRlKGNsZWFuRGF0YVswXSk7XG4gIH0pO1xuXG4gICQoXCIjZ29iYWNrLWJ1dHRvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgIHJlc3RvcmUoKTtcbiAgfSk7XG5cbiAgJChcIiNpbmR1c3RyeS1zZWxlY3RcIikub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XG4gICAgdXBkYXRlKGNsZWFuRGF0YVt0aW1lXSk7XG4gIH0pO1xuXG4gICQoXCIjZGF0ZS1zbGlkZXJcIikuc2xpZGVyKHtcbiAgICBtYXg6IDIwMTMsXG4gICAgbWluOiAyMDAwLFxuICAgIHN0ZXA6IDEsXG4gICAgYW5pbWF0ZTogXCJzbG93XCIsXG4gICAgc2xpZGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuICAgICAgdGltZSA9IHVpLnZhbHVlIC0gMjAwMDtcbiAgICAgIHVwZGF0ZShjbGVhbkRhdGFbdGltZV0pO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gbGV0IGludHJvID0gXCJFeHBsb3JlXCI7XG4gIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGV4dFwiKS5pbm5lckhUTUwgPSBpbnRybztcblxuICBmdW5jdGlvbiBzdGVwKCkge1xuICAgIC8vIEF0IHRoZSBlbmQgb2Ygb3VyIGRhdGEsIGxvb3AgYmFja1xuICAgIHRpbWUgPSB0aW1lIDwgMTQgPyB0aW1lICsgMSA6IDA7XG4gICAgdXBkYXRlKGNsZWFuRGF0YVt0aW1lXSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoZGF0YSkge1xuICAgIGxldCBlbGVtZW50cyA9IGRhdGEudmFsdWVzLm1hcChlbGUgPT4ge1xuICAgICAgcmV0dXJuIGVsZTtcbiAgICB9KTtcblxuICAgIC8vIGRhdGEgPSBkYXRhLnNsaWNlKCkuYXJyYXkuZm9yRWFjaChlbGVtZW50ID0+IHt9KTtcblxuICAgIHkuZG9tYWluKFtcbiAgICAgIDAsXG4gICAgICBkMy5tYXgoZGF0YS52YWx1ZXMsIGZ1bmN0aW9uKHJvdW5kcykge1xuICAgICAgICByZXR1cm4gZDMubWF4KHJvdW5kcy52YWx1ZXMsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4gZC52YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgIF0pO1xuXG4gICAgLy8uY2FsbCh5QXhpcyk7XG5cbiAgICBsZXQgc2xpY2UyID0gc3ZnXG4gICAgICAuc2VsZWN0QWxsKFwiLnNsaWNlXCIpXG4gICAgICAuZGF0YShkYXRhLnZhbHVlcylcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImdcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgeDAoZC5rZXkpICsgXCIsMClcIjtcbiAgICAgIH0pO1xuXG4gICAgbGV0IHJlY3RzID0gc2xpY2UyLnNlbGVjdEFsbChcInJlY3RcIikuZGF0YShmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gZC52YWx1ZXMuZmlsdGVyKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgaWYgKGQzLnNlbGVjdChcIiNpbmR1c3RyeS1zZWxlY3RcIikubm9kZSgpLnZhbHVlID09IFwiYWxsXCIpIHtcbiAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZC5rZXkgPT0gZDMuc2VsZWN0KFwiI2luZHVzdHJ5LXNlbGVjdFwiKS5ub2RlKCkudmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc3ZnXG4gICAgICAuc2VsZWN0QWxsKFwicmVjdFwiKVxuICAgICAgLnRyYW5zaXRpb24oNzUwKVxuICAgICAgLmRlbGF5KGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAxMDA7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4geSgwKTtcbiAgICAgIH0pXG4gICAgICAucmVtb3ZlKCk7XG5cbiAgICBjb25zb2xlLmxvZyhyZWN0cyk7XG5cbiAgICByZWN0c1xuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgICAvLyAuYXR0cihcImNsYXNzXCIsIFwiZW50ZXJcIilcbiAgICAgIC5hdHRyKFwid2lkdGhcIiwgeDEuYmFuZHdpZHRoKVxuICAgICAgLmF0dHIoXCJ4XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh4MShkLmtleSksIGQua2V5KTtcbiAgICAgICAgcmV0dXJuIHgxKGQua2V5KTtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcImRhdGEtbGVnZW5kXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGQua2V5O1xuICAgICAgfSlcbiAgICAgIC5zdHlsZShcImZpbGxcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gY29sb3IoZC5rZXkpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiB5KDApO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9KVxuICAgICAgLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICBsZXQgcm91bmQgPSB4MC5pbnZlcnQoXG4gICAgICAgICAgcGFyc2VTdmcoZDMuc2VsZWN0KHRoaXMucGFyZW50Tm9kZSkuYXR0cihcInRyYW5zZm9ybVwiKSkudHJhbnNsYXRlWFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIGQzLnNlbGVjdChcImdcIikuXG4gICAgICAgIC8vIHRyYW5zaXRpb24odCkucmVtb3ZlKCk7XG4gICAgICAgIGRyaWxsRG93bihkLCBzbGljZTIsIHJvdW5kKTtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgIC5vbihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIGQzLnNlbGVjdCh0aGlzKS5zdHlsZShcImZpbGxcIiwgZDMucmdiKGNvbG9yKGQua2V5KSkuZGFya2VyKDIpKTtcbiAgICAgIH0pXG4gICAgICAub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIGQzLnNlbGVjdCh0aGlzKS5zdHlsZShcImZpbGxcIiwgY29sb3IoZC5rZXkpKTtcbiAgICAgIH0pXG4gICAgICAub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICBpZiAoZDMuc2VsZWN0KFwiI3BsYXktYnV0dG9uXCIpLnRleHQoKSA9PT0gXCJQbGF5XCIpIHtcbiAgICAgICAgICBkMy5zZWxlY3RBbGwoXCJyZWN0XCIpXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMTAwKVxuICAgICAgICAgICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHkoZC52YWx1ZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICByZXR1cm4gaGVpZ2h0IC0geShkLnZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICAvLy5tZXJnZShyZWN0cylcbiAgICAgIC50cmFuc2l0aW9uKHQpXG4gICAgICAuZGVsYXkoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIDEwMDA7XG4gICAgICB9KVxuICAgICAgLy8uZHVyYXRpb24oNTAwKVxuICAgICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIHkoZC52YWx1ZSk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gaGVpZ2h0IC0geShkLnZhbHVlKTtcbiAgICAgIH0pO1xuXG4gICAgbGV0IHJlY3RzMiA9IHNsaWNlMi5zZWxlY3RBbGwoXCJyZWN0XCIpO1xuICAgIGxldCBidXR0b24yID0gZDMuc2VsZWN0KFwiI3BsYXktYnV0dG9uXCIpO1xuXG4gICAgc3ZnXG4gICAgICAuc2VsZWN0QWxsKFwiZy55LmF4aXNcIilcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5kdXJhdGlvbigxMDAwKVxuICAgICAgLmRlbGF5KDMwMClcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpXG4gICAgICAuY2FsbCh5QXhpcyk7XG4gICAgc3ZnLnNlbGVjdEFsbChcImcubGVnZW5kXCIpLnJlbW92ZSgpO1xuXG4gICAgZHJhd0xlZ2VuZC5jYWxsKHRoaXMpO1xuXG4gICAgLy8gZDMuc2VsZWN0QWxsKFwiLnlcIilcbiAgICAvLyAgIC50cmFuc2l0aW9uKClcbiAgICAvLyAgIC5kdXJhdGlvbigxMDAwKVxuICAgIC8vICAgLmRlbGF5KDMwMClcbiAgICAvLyAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpO1xuXG4gICAgdGltZUxhYmVsLnRleHQoKyh0aW1lICsgMjAwMCkpO1xuXG4gICAgJChcIiN5ZWFyXCIpWzBdLmlubmVySFRNTCA9ICsodGltZSArIDIwMDApO1xuXG4gICAgJChcIiNkYXRlLXNsaWRlclwiKS5zbGlkZXIoXCJ2YWx1ZVwiLCArKHRpbWUgKyAyMDAwKSk7XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3TGVnZW5kKCkge1xuICAgIGNvbnN0IGxlZ2VuZCA9IGQzXG4gICAgICAuc2VsZWN0KFwiZ1wiKVxuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC8vIC5hdHRyKFxuICAgICAgLy8gICBcInRyYW5zZm9ybVwiLFxuICAgICAgLy8gICBcInRyYW5zbGF0ZShcIiArXG4gICAgICAvLyAgICAgKG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0ICsgNjApICtcbiAgICAgIC8vICAgICBcIixcIiArXG4gICAgICAvLyAgICAgKGhlaWdodCArIDMwKSArXG4gICAgICAvLyAgICAgXCIpXCJcbiAgICAgIC8vIClcblxuICAgICAgLnNlbGVjdEFsbChcImdcIilcbiAgICAgIC5kYXRhKHNlY3RvcnMpXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJsZWdlbmRcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgcmV0dXJuIFwidHJhbnNsYXRlKDE0LFwiICsgMjUgKiBpICsgXCIpXCI7XG4gICAgICB9KTtcblxuICAgIC8vIGxlZ2VuZFxuICAgIC8vICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAvLyAgIC5hdHRyKFwiZmlsbFwiLCAoZCwgaSkgPT4gY29sb3IoZCkpIC8vICAgY29uc3QgY29sb3IgPSBkMy5zY2FsZU9yZGluYWwoZDMuc2NoZW1lQ2F0ZWdvcnkxMCk7XG4gICAgLy8gICAuYXR0cihcImhlaWdodFwiLCAxOClcbiAgICAvLyAgIC5hdHRyKFwid2lkdGhcIiwgMTgpO1xuXG4gICAgbGVnZW5kXG4gICAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgLmF0dHIoXCJ4XCIsIHdpZHRoIC0gMTApXG4gICAgICAuYXR0cihcIndpZHRoXCIsIDE0KVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgMTQpXG4gICAgICAuc3R5bGUoXCJmaWxsXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGNvbG9yKGQpO1xuICAgICAgfSk7XG5cbiAgICBsZWdlbmRcbiAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAuYXR0cihcInhcIiwgd2lkdGggLSAxNSlcbiAgICAgIC5hdHRyKFwieVwiLCA5KVxuICAgICAgLmF0dHIoXCJkeVwiLCBcIi4zNWVtXCIpXG4gICAgICAuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcImVuZFwiKVxuICAgICAgLnRleHQoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZDtcbiAgICAgIH0pO1xuXG4gICAgLy8gbGVnZW5kXG4gICAgLy8gICAuYXBwZW5kKFwidGV4dFwiKVxuICAgIC8vICAgLy8gLmF0dHIoXCJ4XCIsIDE4KVxuICAgIC8vICAgLy8gLmF0dHIoXCJ5XCIsIDEwKVxuICAgIC8vICAgLmF0dHIoXCJ4XCIsIHdpZHRoIC0gMjQpXG4gICAgLy8gICAuYXR0cihcInlcIiwgOSlcbiAgICAvLyAgIC5hdHRyKFwiZHlcIiwgXCIuMTVlbVwiKVxuICAgIC8vICAgLnRleHQoKGQsIGkpID0+IGQpXG4gICAgLy8gICAuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcInN0YXJ0XCIpXG4gICAgLy8gICAuc3R5bGUoXCJmb250LXNpemVcIiwgMTIpO1xuXG4gICAgLy8gTm93IHNwYWNlIHRoZSBncm91cHMgb3V0IGFmdGVyIHRoZXkgaGF2ZSBiZWVuIGFwcGVuZGVkOlxuICAgIC8vIGNvbnN0IHBhZGRpbmcgPSAxMDtcbiAgICAvLyBsZWdlbmQuYXR0cihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgLy8gICByZXR1cm4gKFxuICAgIC8vICAgICBcInRyYW5zbGF0ZShcIiArXG4gICAgLy8gICAgIChkMy5zdW0oc2VjdG9ycywgZnVuY3Rpb24oZSwgaikge1xuICAgIC8vICAgICAgIGlmIChqIDwgaSkge1xuICAgIC8vICAgICAgICAgcmV0dXJuIGxlZ2VuZC5ub2RlcygpW2pdLmdldEJCb3goKS53aWR0aDtcbiAgICAvLyAgICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgcmV0dXJuIDA7XG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICB9KSArXG4gICAgLy8gICAgICAgcGFkZGluZyAqIGkpICtcbiAgICAvLyAgICAgXCIsMClcIlxuICAgIC8vICAgKTtcbiAgICAvLyB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJhcihzdmcyLCBkb3duLCBkYXRhLCBzZWxlY3Rvcikge1xuICAgIGNvbnN0IGcgPSBzdmcyXG4gICAgICAuaW5zZXJ0KFwiZ1wiLCBzZWxlY3RvcilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJlbnRlclwiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgwLCR7NTAgKyBiYXJTdGVwICogYmFyUGFkZGluZ30pYClcbiAgICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJlbmRcIilcbiAgICAgIC5zdHlsZShcImZvbnRcIiwgXCIxOHB4IHNhbnMtc2VyaWZcIik7XG5cbiAgICBjb25zdCBiYXIgPSBnXG4gICAgICAuc2VsZWN0QWxsKFwiZ1wiKVxuICAgICAgLmRhdGEoZGF0YSlcbiAgICAgIC5qb2luKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAvLyAgLm9uKFwiY2xpY2tcIiwgZCA9PiB1cGRhdGUoY2xlYW5EYXRhW3RpbWVdKSlcbiAgICAgIC5vbihcIm1vdXNlb3ZlclwiLCB0aXAuc2hvdylcbiAgICAgIC5vbihcIm1vdXNlb3V0XCIsIHRpcC5oaWRlKTtcblxuICAgIGJhclxuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5hdHRyKFwieFwiLCA4MCAtIDIpXG4gICAgICAuYXR0cihcInlcIiwgKDI3ICogKDEgLSAwLjEpKSAvIDIpXG4gICAgICAuYXR0cihcImR5XCIsIFwiLjM1ZW1cIilcbiAgICAgIC50ZXh0KGQgPT4gZC5jb21wYW55KTtcblxuICAgIGJhclxuICAgICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAgIC5hdHRyKFwieFwiLCB4MygwKSlcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJiYXJcIilcbiAgICAgIC5hdHRyKFwid2lkdGhcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICBjb25zb2xlLmxvZyh4MygwKSk7XG4gICAgICAgIHJldHVybiB4MyhkLmFtb3VudFJhaXNlZCkgLSB4MygwKTtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcImhlaWdodFwiLCAyNyAqICgxIC0gMC4zKSk7XG5cbiAgICByZXR1cm4gZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyaWxsRG93bihkLCBzbGljZSwgcm91bmQpIHtcbiAgICBsZXQgdW5zb3J0ZWREYXRhID0gdGVzdERhdGFbdGltZV07XG4gICAgY29uc3QgZHVyYXRpb24gPSA3MDA7XG4gICAgY29uc3QgdHJhbnNpdGlvbjEgPSBkMy50cmFuc2l0aW9uKCkuZHVyYXRpb24oZHVyYXRpb24pO1xuICAgIGNvbnN0IHRyYW5zaXRpb24yID0gdHJhbnNpdGlvbjEudHJhbnNpdGlvbigpO1xuXG4gICAgY29uc29sZS5sb2codW5zb3J0ZWREYXRhKTtcbiAgICBjb25zb2xlLmxvZyhkKTtcbiAgICBjb25zb2xlLmxvZyhyb3VuZCk7XG4gICAgY29uc29sZS5sb2codGVzdERhdGEpO1xuXG4gICAgbGV0IGFiID0gdGVzdERhdGEubWFwKGVsZSA9PiBPYmplY3QudmFsdWVzKGVsZSkpO1xuXG4gICAgbGV0IG5ld0RhdGEgPSB1bnNvcnRlZERhdGEudmFsdWVzLmZpbHRlcihlbGUgPT4ge1xuICAgICAgaWYgKGVsZS5rZXkgPT09IGQua2V5KSB7XG4gICAgICAgIHJldHVybiBlbGU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgbmV3RGF0YTIgPSBuZXdEYXRhWzBdLnZhbHVlcy5maWx0ZXIoZWxlID0+IHtcbiAgICAgIGlmIChlbGUucm91bmQgPT09IHJvdW5kKSB7XG4gICAgICAgIHJldHVybiBlbGU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgbmV3RGF0YTMgPSBuZXdEYXRhMlxuICAgICAgLnNsaWNlKClcbiAgICAgIC5zb3J0KChhLCBiKSA9PiBkMy5kZXNjZW5kaW5nKGEuYW1vdW50UmFpc2VkLCBiLmFtb3VudFJhaXNlZCkpXG4gICAgICAuc2xpY2UoMCwgMTApO1xuXG4gICAgbGV0IGxpbmVDaGFydERhdGEgPSBnZXREYXRhKGQsIHJvdW5kKTtcblxuICAgIGNvbnNvbGUubG9nKGxpbmVDaGFydERhdGEpO1xuXG4gICAgY29uc29sZS5sb2cobmV3RGF0YTMpO1xuXG4gICAgY29uc29sZS5sb2cobmV3RGF0YTIpO1xuXG4gICAgLy8gbGV0IHJlY3RzID0gZy5zZWxlY3RBbGwoXCJyZWN0XCIpLmRhdGEobmV3RGF0YSk7XG4gICAgbGV0IGRhdGEgPSBuZXdEYXRhMztcblxuICAgIGQzLnNlbGVjdEFsbChcInN2Z1wiKS5yZW1vdmUoKTtcblxuICAgIC8vICQoXCIjcGxheS1idXR0b25cIikudGV4dChcIkdvIEJhY2tcIik7XG4gICAgLy8gJChcIiNwbGF5LWJ1dHRvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgIC8vICAgbGV0IGJ1dHRvbiA9ICQodGhpcyk7XG4gICAgLy8gICBidXR0b24udGV4dChcIlBsYXlcIik7XG5cbiAgICAvLyAgIHJlc3RvcmUoKTtcbiAgICAvLyB9KTtcblxuICAgIGQzLnNlbGVjdChcIiNwbGF5LWJ1dHRvblwiKS5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xuICAgIGQzLnNlbGVjdChcIiNyZXNldC1idXR0b25cIikuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcbiAgICBkMy5zZWxlY3QoXCIjc2xpZGVyLWRpdlwiKS5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xuICAgIGQzLnNlbGVjdChcIiNpbmR1c3RyeS1zZWxlY3RcIikuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcbiAgICBkMy5zZWxlY3QoXCIjeWVhclwiKS5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xuICAgIGQzLnNlbGVjdChcIiNpbnRyb1wiKS5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xuICAgIGQzLnNlbGVjdEFsbChcInRleHRcIikuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcblxuICAgIGQzLnNlbGVjdChcIiNnb2JhY2stYnV0dG9uXCIpLnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIik7XG5cbiAgICAvLyBnLnNlbGVjdEFsbChcImcueC5heGlzXCIpLnJlbW92ZSgpO1xuICAgIC8vIHNsaWNlLnJlbW92ZSgpO1xuXG4gICAgY29uc3Qgc3ZnMiA9IGQzXG4gICAgICAuc2VsZWN0KFwiI2RyaWxsZG93blwiKVxuICAgICAgLmFwcGVuZChcInN2Z1wiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLCBcIiArIG1hcmdpbi50b3AgKyBcIilcIik7XG5cbiAgICBzdmcyLmNhbGwodGlwKTtcblxuICAgIHgzLmRvbWFpbihbMCwgZGF0YVswXS5hbW91bnRSYWlzZWRdKTtcbiAgICBjb25zb2xlLmxvZyh4My5kb21haW4oKSk7XG5cbiAgICBzdmcyXG4gICAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImJhY2tncm91bmRcIilcbiAgICAgIC5hdHRyKFwiZmlsbFwiLCBcIm5vbmVcIilcbiAgICAgIC5hdHRyKFwicG9pbnRlci1ldmVudHNcIiwgXCJhbGxcIilcbiAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXG4gICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG4gICAgICAuYXR0cihcImN1cnNvclwiLCBcInBvaW50ZXJcIik7XG5cbiAgICAvLyAub24oXCJjbGlja1wiLCBkID0+IHVwKHN2ZywgZCkpO1xuXG4gICAgc3ZnMi5hcHBlbmQoXCJnXCIpLmNhbGwoeEF4aXMyKTtcblxuICAgIHN2ZzIuYXBwZW5kKFwiZ1wiKS5jYWxsKHlBeGlzMik7XG5cbiAgICBsZXQgcGxhY2Vob2xkZXIgPSBkLmtleTtcblxuICAgIHN2ZzJcbiAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwidGl0bGVcIilcbiAgICAgIC5hdHRyKFwieFwiLCB3aWR0aCAvIDIpXG4gICAgICAuYXR0cihcInlcIiwgLTEwKVxuICAgICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgICAgLnRleHQoXG4gICAgICAgIGQgPT5cbiAgICAgICAgICBgTGFyZ2VzdCAke3JvdW5kfSByb3VuZHMgaW4gdGhlICR7cGxhY2Vob2xkZXJ9IEluZHVzdHJ5IGluICR7dGltZSArXG4gICAgICAgICAgICAyMDAwfWBcbiAgICAgICk7XG5cbiAgICAvLyBzdmcyLmNhbGwodGlwKVxuXG4gICAgLy8gLm9uKFwiY2xpY2tcIiwgZCA9PiB1cChzdmcsIGQpKTtcblxuICAgIGNvbnN0IGVudGVyID0gYmFyKHN2ZzIsIGRyaWxsRG93biwgZGF0YSwgXCIueS1heGlzXCIpLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgMCk7XG4gICAgY29uc29sZS5sb2coZW50ZXIpO1xuICAgIGVudGVyLnRyYW5zaXRpb24odHJhbnNpdGlvbjEpLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgMSk7XG5cbiAgICAvLyBUcmFuc2l0aW9uIGVudGVyaW5nIGJhcnMgdG8gdGhlaXIgbmV3IHktcG9zaXRpb24uXG4gICAgZW50ZXJcbiAgICAgIC5zZWxlY3RBbGwoXCJnXCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBzdGFjayhkLmluZGV4KSlcbiAgICAgIC50cmFuc2l0aW9uKHRyYW5zaXRpb24xKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgc3RhZ2dlcigpKTtcblxuICAgIC8vIFVwZGF0ZSB0aGUgeC1zY2FsZSBkb21haW4uXG5cbiAgICAvLyBVcGRhdGUgdGhlIHgtYXhpcy5cbiAgICBzdmcyXG4gICAgICAuc2VsZWN0QWxsKFwiLngtYXhpc1wiKVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmNhbGwoeEF4aXMyKTtcblxuICAgIC8vIFRyYW5zaXRpb24gZW50ZXJpbmcgYmFycyB0byB0aGUgbmV3IHgtc2NhbGUuXG4gICAgZW50ZXJcbiAgICAgIC5zZWxlY3RBbGwoXCJnXCIpXG4gICAgICAudHJhbnNpdGlvbih0cmFuc2l0aW9uMilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIChkLCBpKSA9PiBgdHJhbnNsYXRlKDAsJHtiYXJTdGVwICogaX0pYCk7XG5cbiAgICAvLyBDb2xvciB0aGUgYmFycyBhcyBwYXJlbnRzOyB0aGV5IHdpbGwgZmFkZSB0byBjaGlsZHJlbiBpZiBhcHByb3ByaWF0ZS5cbiAgICBlbnRlclxuICAgICAgLnNlbGVjdEFsbChcInJlY3RcIilcbiAgICAgIC50cmFuc2l0aW9uKHQpXG4gICAgICAuYXR0cihcImZpbGxcIiwgZCA9PiBjb2xvcihkLnNlY3RvcikpXG4gICAgICAuYXR0cihcImZpbGwtb3BhY2l0eVwiLCAxKVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmF0dHIoXCJmaWxsXCIsIGQgPT4gY29sb3IoZC5zZWN0b3IpKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCBkID0+IHgzKGQuYW1vdW50UmFpc2VkKSk7XG5cbiAgICBidWlsZExpbmVDaGFydChsaW5lQ2hhcnREYXRhLCBwbGFjZWhvbGRlciwgcm91bmQpO1xuXG4gICAgLy8gZDMuc2VsZWN0QWxsKFwic3ZnXCIpXG4gICAgLy8gICAuYXR0cihcImNsYXNzXCIsIFwiYmFja2dyb3VuZFwiKVxuICAgIC8vICAgLy8gLmF0dHIoXCJmaWxsXCIsIFwibm9uZVwiKVxuICAgIC8vICAgLmF0dHIoXCJwb2ludGVyLWV2ZW50c1wiLCBcImFsbFwiKVxuICAgIC8vICAgLy8gLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCArIG1hcmdpbi5yaWdodCArIG1hcmdpbi5sZWZ0KVxuICAgIC8vICAgLy8gLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgIC8vICAgLmF0dHIoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgLy8gICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtMjUwLCAtMzApXCIpXG4gICAgLy8gICAub24oXCJkYmxjbGlja1wiLCBkID0+IHtcbiAgICAvLyAgICAgZDMuZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyAgICAgcmVzdG9yZShkKTtcbiAgICAvLyAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhY2soaSkge1xuICAgIGxldCB2YWx1ZSA9IDA7XG4gICAgcmV0dXJuIGQgPT4ge1xuICAgICAgY29uc3QgdCA9IGB0cmFuc2xhdGUoJHt4Myh2YWx1ZSl9LCR7YmFyU3RlcCAqIGl9KWA7XG4gICAgICB2YWx1ZSArPSBkLmFtb3VudFJhaXNlZDtcbiAgICAgIHJldHVybiB0O1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBzdGFnZ2VyKCkge1xuICAgIGxldCB2YWx1ZSA9IDA7XG4gICAgcmV0dXJuIChkLCBpKSA9PiB7XG4gICAgICBjb25zdCB0ID0gYHRyYW5zbGF0ZSgke3gzKHZhbHVlKX0sJHtiYXJTdGVwICogaX0pYDtcbiAgICAgIHZhbHVlICs9IGQuYW1vdW50UmFpc2VkO1xuICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldERhdGEoZCwgcm91bmQpIHtcbiAgICBsZXQgcmVzdWx0cyA9IFtdO1xuXG4gICAgbGV0IGkgPSAwO1xuXG4gICAgd2hpbGUgKGkgPCAxNCkge1xuICAgICAgbGV0IG9iaiA9IHt9O1xuICAgICAgbGV0IHVuc29ydGVkRGF0YSA9IHRlc3REYXRhW2ldO1xuXG4gICAgICBsZXQgbmV3RGF0YSA9IHVuc29ydGVkRGF0YS52YWx1ZXMuZmlsdGVyKGVsZSA9PiB7XG4gICAgICAgIGlmIChlbGUua2V5ID09PSBkLmtleSkge1xuICAgICAgICAgIHJldHVybiBlbGU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAobmV3RGF0YVswXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaCh7IHk6IDAgfSk7XG4gICAgICAgIGkrKztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGxldCBuZXdEYXRhMiA9IG5ld0RhdGFbMF0udmFsdWVzLmZpbHRlcihlbGUgPT4ge1xuICAgICAgICBpZiAoZWxlLnJvdW5kID09PSByb3VuZCkge1xuICAgICAgICAgIHJldHVybiBlbGU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBsZXQgc3VtID0gMDtcblxuICAgICAgbmV3RGF0YTIuZm9yRWFjaChlbGUgPT4ge1xuICAgICAgICBzdW0gKz0gZWxlLmFtb3VudFJhaXNlZDtcbiAgICAgIH0pO1xuICAgICAgb2JqW1wieVwiXSA9IHN1bTtcbiAgICAgIHJlc3VsdHMucHVzaChvYmopO1xuICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1aWxkTGluZUNoYXJ0KGxpbmVDaGFydERhdGEsIHBsYWNlaG9sZGVyLCByb3VuZCkge1xuICAgIGxldCBuID0gMTM7XG4gICAgbGV0IHNvcnRlZERhdGEgPSBsaW5lQ2hhcnREYXRhXG4gICAgICAuc2xpY2UoKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IGQzLmRlc2NlbmRpbmcoYS55LCBiLnkpKTtcblxuICAgIGNvbnNvbGUubG9nKHNvcnRlZERhdGEpO1xuXG4gICAgbGV0IHhTY2FsZTMgPSBkM1xuICAgICAgLnNjYWxlTGluZWFyKClcbiAgICAgIC5kb21haW4oWzIwMDAsIDIwMTNdKSAvLyBpbnB1dFxuICAgICAgLnJhbmdlKFswLCB3aWR0aF0pO1xuICAgIC8vIG9cblxuICAgIGxldCB5U2NhbGUgPSBkM1xuICAgICAgLnNjYWxlTGluZWFyKClcbiAgICAgIC5kb21haW4oWzAsIHNvcnRlZERhdGFbMF0ueV0pIC8vIGlucHV0XG4gICAgICAucmFuZ2UoW2hlaWdodCwgMF0pO1xuXG4gICAgY29uc29sZS5sb2coeVNjYWxlLmRvbWFpbigpKTtcblxuICAgIGxldCBkaXYgPSBkM1xuICAgICAgLnNlbGVjdChcImJvZHlcIilcbiAgICAgIC5hcHBlbmQoXCJkaXZcIikgLy8gZGVjbGFyZSB0aGUgdG9vbHRpcCBkaXZcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ0b29sdGlwXCIpIC8vIGFwcGx5IHRoZSAndG9vbHRpcCcgY2xhc3NcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG5cbiAgICBsZXQgbGluZSA9IGQzXG4gICAgICAubGluZSgpXG4gICAgICAueChmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiB4U2NhbGUzKGkgKyAyMDAwKTtcbiAgICAgIH0pIC8vIHNldCB0aGUgeCB2YWx1ZXMgZm9yIHRoZSBsaW5lIGdlbmVyYXRvclxuICAgICAgLnkoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4geVNjYWxlKGQueSk7XG4gICAgICB9KSAvLyBzZXQgdGhlIHkgdmFsdWVzIGZvciB0aGUgbGluZSBnZW5lcmF0b3JcbiAgICAgIC5jdXJ2ZShkMy5jdXJ2ZU1vbm90b25lWCk7IC8vIGFwcGx5IHNtb290aGluZyB0byB0aGUgbGluZVxuXG4gICAgY29uc3Qgc3ZnMyA9IGQzXG4gICAgICAuc2VsZWN0KFwiI2xpbmVjaGFydFwiKVxuICAgICAgLmFwcGVuZChcInN2Z1wiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXG4gICAgICAuYXR0cihcImN1cnNvclwiLCBcInBvaW50ZXJcIilcblxuICAgICAgLmFwcGVuZChcImdcIilcblxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyA4MCArIFwiLCBcIiArIG1hcmdpbi50b3AgKyBcIilcIik7XG5cbiAgICBjb25zb2xlLmxvZyhzdmczKTtcblxuICAgIHN2ZzNcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwieCBheGlzXCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwLFwiICsgaGVpZ2h0ICsgXCIpXCIpXG4gICAgICAuY2FsbChkMy5heGlzQm90dG9tKHhTY2FsZTMpLnRpY2tGb3JtYXQoZDMuZm9ybWF0KFwiZFwiKSkpO1xuXG4gICAgc3ZnM1xuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ5IGF4aXNcIilcbiAgICAgIC5jYWxsKFxuICAgICAgICBkMy5heGlzTGVmdCh5U2NhbGUpLnRpY2tGb3JtYXQoZnVuY3Rpb24oZCkge1xuICAgICAgICAgIGlmIChkICE9PSAwICYmIGQgPCAxMDAwMDAwMDAwKSB7XG4gICAgICAgICAgICByZXR1cm4gXCIkXCIgKyBkIC8gMTAwMDAwMCArIFwiTVwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZCAhPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiJFwiICsgZCAvIDEwMDAwMDAwMDAgKyBcIkJcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgc3ZnM1xuICAgICAgLmFwcGVuZChcInBhdGhcIilcbiAgICAgIC5kYXR1bShsaW5lQ2hhcnREYXRhKSAvLyAxMC4gQmluZHMgZGF0YSB0byB0aGUgbGluZVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImxpbmVcIikgLy8gQXNzaWduIGEgY2xhc3MgZm9yIHN0eWxpbmdcbiAgICAgIC5hdHRyKFwiZFwiLCBsaW5lKTtcblxuICAgIHN2ZzNcbiAgICAgIC5zZWxlY3RBbGwoXCIuZG90XCIpXG4gICAgICAuZGF0YShsaW5lQ2hhcnREYXRhKVxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoXCJjaXJjbGVcIikgLy8gVXNlcyB0aGUgZW50ZXIoKS5hcHBlbmQoKSBtZXRob2RcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJkb3RcIikgLy8gQXNzaWduIGEgY2xhc3MgZm9yIHN0eWxpbmdcbiAgICAgIC5hdHRyKFwiY3hcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4geFNjYWxlMyhpICsgMjAwMCk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJjeVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiB5U2NhbGUoZC55KTtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcInJcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICBpZiAoaSA9PT0gdGltZSkge1xuICAgICAgICAgIHJldHVybiA3O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiA1O1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnN0eWxlKFwiZmlsbFwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIGlmIChpID09PSB0aW1lKSByZXR1cm4gXCJyZWRcIjtcbiAgICAgIH0pXG4gICAgICAub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICBkaXZcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDAuOSk7XG4gICAgICAgIGRpdlxuICAgICAgICAgIC5odG1sKFxuICAgICAgICAgICAgaSArXG4gICAgICAgICAgICAgIDIwMDAgK1xuICAgICAgICAgICAgICBcIjogXCIgK1xuICAgICAgICAgICAgICBcIiAkXCIgK1xuICAgICAgICAgICAgICBkM1xuICAgICAgICAgICAgICAgIC5mb3JtYXQoXCIuMnNcIikoZFtcInlcIl0pXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL0cvLCBcIkJcIilcbiAgICAgICAgICApXG4gICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBkMy5ldmVudC5wYWdlWCArIFwicHhcIilcbiAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgZDMuZXZlbnQucGFnZVkgLSAyOCArIFwicHhcIik7XG4gICAgICB9KVxuICAgICAgLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICBkaXZcbiAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuICAgICAgfSk7XG5cbiAgICBzdmczXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInRpdGxlXCIpXG4gICAgICAuYXR0cihcInhcIiwgd2lkdGggLyAyKVxuICAgICAgLmF0dHIoXCJ5XCIsIC0zMClcbiAgICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAgIC50ZXh0KFxuICAgICAgICBkID0+XG4gICAgICAgICAgYFRvdGFsIFJhaXNlZCBwZXIgWWVhciBpbiAke3JvdW5kfSBpbiB0aGUgJHtwbGFjZWhvbGRlcn0gSW5kdXN0cnksIDIwMDAtMjAxM2BcbiAgICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiByZXN0b3JlKCkge1xuICAgIGQzLnNlbGVjdEFsbChcInN2Z1wiKS5yZW1vdmUoKTtcblxuICAgIHN2ZyA9IGQzXG4gICAgICAuc2VsZWN0KFwiI2ludGVyXCIpXG4gICAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXG4gICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSlcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsIFwiICsgbWFyZ2luLnRvcCArIFwiKVwiKTtcblxuICAgIHN2Z1xuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJsYWJlbFwiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGUoLTkwKVwiKVxuICAgICAgLmF0dHIoXCJ5XCIsIDYpXG4gICAgICAuYXR0cihcImR5XCIsIFwiLjcxZW1cIilcbiAgICAgIC5zdHlsZShcInRleHQtYW5jaG9yXCIsIFwiZW5kXCIpXG4gICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcImJvbGRcIilcbiAgICAgIC50ZXh0KFwiVmFsdWVcIik7XG5cbiAgICB0aW1lTGFiZWwgPSBzdmdcbiAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwibGFiZWxcIilcbiAgICAgIC5hdHRyKFwieVwiLCBoZWlnaHQgKyA1MClcbiAgICAgIC5hdHRyKFwieFwiLCB3aWR0aCAtIDQwKVxuICAgICAgLy8gLmF0dHIoXCJmb250LXNpemVcIiwgXCI0MHB4XCIpXG4gICAgICAvLyAuYXR0cihcIm9wYWNpdHlcIiwgXCIwLjRcIilcbiAgICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAgIC50ZXh0KGAke3RpbWUgKyAyMDAwfWApO1xuXG4gICAgZDMuc2VsZWN0KFwiI2dvYmFjay1idXR0b25cIikuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcblxuICAgIGQzLnNlbGVjdChcIiNwbGF5LWJ1dHRvblwiKS5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpO1xuICAgIGQzLnNlbGVjdChcIiNyZXNldC1idXR0b25cIikuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKTtcbiAgICBkMy5zZWxlY3QoXCIjc2xpZGVyLWRpdlwiKS5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpO1xuICAgIGQzLnNlbGVjdChcIiNpbmR1c3RyeS1zZWxlY3RcIikuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKTtcbiAgICBkMy5zZWxlY3RBbGwoXCJ0ZXh0XCIpLnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIik7XG4gICAgZDMuc2VsZWN0KFwiI2ludHJvXCIpLnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIik7XG5cbiAgICBjb25zdCBkdXJhdGlvbiA9IDc1MDtcbiAgICBjb25zdCB0cmFuc2l0aW9uMSA9IGQzLnRyYW5zaXRpb24oKS5kdXJhdGlvbihkdXJhdGlvbik7XG4gICAgY29uc3QgdHJhbnNpdGlvbjIgPSB0cmFuc2l0aW9uMS50cmFuc2l0aW9uKCk7XG5cbiAgICBjb25zdCBleGl0ID0gc3ZnLnNlbGVjdEFsbChcIi5lbnRlclwiKS5hdHRyKFwiY2xhc3NcIiwgXCJleGl0XCIpO1xuICAgIGV4aXQuc2VsZWN0QWxsKFwidGV4dFwiKS5yZW1vdmUoKTtcbiAgICAvLyBFbnRlcmluZyBub2RlcyBpbW1lZGlhdGVseSBvYnNjdXJlIHRoZSBjbGlja2VkLW9uIGJhciwgc28gaGlkZSBpdC5cbiAgICAvLyBleGl0LnNlbGVjdEFsbChcInJlY3RcIikuYXR0cihcImZpbGwtb3BhY2l0eVwiLCBwID0+IChwID09PSBkID8gMCA6IG51bGwpKTtcblxuICAgIC8vIFRyYW5zaXRpb24gZXhpdGluZyBiYXJzIHRvIGZhZGUgb3V0LlxuICAgIGV4aXRcbiAgICAgIC5zZWxlY3RBbGwoXCJyZWN0c1wiKVxuICAgICAgLnRyYW5zaXRpb24odHJhbnNpdGlvbjIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCAoZCwgaSkgPT4gYHRyYW5zbGF0ZSgkey1iYXJTdGVwICogaX0sIDApYClcbiAgICAgIC8vLmF0dHIoXCJ3aWR0aFwiLCBkID0+IDApXG4gICAgICAvLyAuYXR0cihcImZpbGwtb3BhY2l0eVwiLCAwKVxuXG4gICAgICAvLyAuYXR0cihcInRyYW5zZm9ybVwiLCBzdGFjayhkLmluZGV4KSlcbiAgICAgIC8vIC50cmFuc2l0aW9uKHRyYW5zaXRpb24xKVxuICAgICAgLy8gLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgc3RhZ2dlcigpKVxuICAgICAgLnJlbW92ZSgpO1xuXG4gICAgZDMuc2VsZWN0QWxsKFwiZy55LWF4aXNcIikucmVtb3ZlKCk7XG5cbiAgICBkMy5zZWxlY3RBbGwoXCJnLngtYXhpc1wiKS5yZW1vdmUoKTtcblxuICAgIHN2Z1xuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ4IGF4aXNcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsXCIgKyBoZWlnaHQgKyBcIilcIilcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5jYWxsKHhBeGlzKTtcblxuICAgIHN2Z1xuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ5IGF4aXNcIilcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xuXG4gICAgZDMuc2VsZWN0KFwiI3llYXJcIikuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKTtcblxuICAgIHVwZGF0ZShjbGVhbkRhdGFbdGltZV0pO1xuICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==