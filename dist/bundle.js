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

  d3.json("../data/funding/test_data.json").then(function (data) {
    testData = data;
  });
  d3.json("../data/funding/clean_new_funding.json").then(function (data) {
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
    d3.select("#play-button").style("opacity", "0");
    d3.select("#reset-button").style("opacity", "0");
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

  function restore(d) {
    d3.selectAll("svg").remove();
    svg = d3.select("#inter").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
    svg.append("text").attr("class", "label").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").style("font-weight", "bold").text("Value");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvdHJhbnNmb3JtL2RlY29tcG9zZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3RyYW5zZm9ybS9wYXJzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9iYXJfY2hhcnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnRlcmFjdGl2ZV9jaGFydC5qcyJdLCJuYW1lcyI6WyJjaGFydCIsIm1hcmdpbiIsImxlZnQiLCJyaWdodCIsInRvcCIsImJvdHRvbSIsIndpZHRoIiwiaGVpZ2h0IiwiZyIsImQzIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsInRleHQiLCJqc29uIiwidGhlbiIsImRhdGEiLCJzbGljZSIsInNvcnQiLCJhIiwiYiIsImFzY2VuZGluZyIsInllYXIiLCJmb3JFYWNoIiwiZCIsInByaWNlIiwieCIsInNjYWxlQmFuZCIsImRvbWFpbiIsIm1hcCIsInJhbmdlIiwicGFkZGluZyIsInkiLCJzY2FsZUxpbmVhciIsIm1pbiIsIk1hdGgiLCJmbG9vciIsIm1heCIsImNlaWwiLCJuaWNlIiwieEF4aXNDYWxsIiwiYXhpc0JvdHRvbSIsImNhbGwiLCJ5QXhpc0NhbGwiLCJheGlzTGVmdCIsInRpY2tGb3JtYXQiLCJyZWN0cyIsInNlbGVjdEFsbCIsImVudGVyIiwiYmFuZHdpZHRoIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiaW50ZXJhY3RpdmVDaGFydCIsImNvbnNvbGUiLCJsb2ciLCJmbGFnIiwidCIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsInN2ZyIsIngwIiwieDEiLCJyYXdEYXRhIiwidGVzdERhdGEiLCJpbnRlcnZhbCIsImNsZWFuRGF0YSIsImJhclN0ZXAiLCJiYXJQYWRkaW5nIiwieEF4aXMiLCJ0aWNrU2l6ZSIsInlBeGlzIiwidGlwIiwiZGlyZWN0aW9uIiwib2Zmc2V0IiwiaHRtbCIsImNvbXBhbnkiLCJzZWN0b3IiLCJyb3VuZCIsImZvcm1hdCIsImFtb3VudFJhaXNlZCIsInRpbWVMYWJlbCIsInNlY3RvcnMiLCJyb3VuZHMiLCJyYW5nZVJvdW5kIiwiaW52ZXJ0Iiwic2NhbGUiLCJzY2FsZVF1YW50aXplIiwic3R5bGUiLCJjb2xvciIsInNjYWxlT3JkaW5hbCIsInNjaGVtZVNldDEiLCJ0aW1lIiwieDMiLCJ4QXhpczIiLCJheGlzVG9wIiwidGlja3MiLCJzZWxlY3Rpb24iLCJyZW1vdmUiLCJ5QXhpczIiLCJlbGVtZW50cyIsInZhbHVlcyIsImVsZSIsInVwZGF0ZSIsIiQiLCJvbiIsImJ1dHRvbiIsInNldEludGVydmFsIiwic3RlcCIsImNsZWFySW50ZXJ2YWwiLCJzbGlkZXIiLCJhbmltYXRlIiwic2xpZGUiLCJldmVudCIsInVpIiwidmFsdWUiLCJzbGljZTIiLCJrZXkiLCJmaWx0ZXIiLCJub2RlIiwiZGVsYXkiLCJyYW5kb20iLCJwYXJzZVN2ZyIsInBhcmVudE5vZGUiLCJ0cmFuc2xhdGVYIiwiZHJpbGxEb3duIiwicmdiIiwiZGFya2VyIiwicmVjdHMyIiwiYnV0dG9uMiIsImRyYXdMZWdlbmQiLCJpbm5lckhUTUwiLCJsZWdlbmQiLCJpIiwic3VtIiwiZSIsImoiLCJub2RlcyIsImdldEJCb3giLCJiYXIiLCJzdmcyIiwiZG93biIsInNlbGVjdG9yIiwiaW5zZXJ0Iiwiam9pbiIsInNob3ciLCJoaWRlIiwidW5zb3J0ZWREYXRhIiwidHJhbnNpdGlvbjEiLCJ0cmFuc2l0aW9uMiIsImFiIiwiT2JqZWN0IiwibmV3RGF0YSIsIm5ld0RhdGEyIiwibmV3RGF0YTMiLCJkZXNjZW5kaW5nIiwibGluZUNoYXJ0RGF0YSIsImdldERhdGEiLCJwcmV2ZW50RGVmYXVsdCIsInJlc3RvcmUiLCJwbGFjZWhvbGRlciIsInN0YWNrIiwiaW5kZXgiLCJzdGFnZ2VyIiwiYnVpbGRMaW5lQ2hhcnQiLCJyZXN1bHRzIiwib2JqIiwidW5kZWZpbmVkIiwicHVzaCIsIm4iLCJzb3J0ZWREYXRhIiwieFNjYWxlMyIsInlTY2FsZSIsImRpdiIsImxpbmUiLCJjdXJ2ZSIsImN1cnZlTW9ub3RvbmVYIiwic3ZnMyIsImRhdHVtIiwicmVwbGFjZSIsInBhZ2VYIiwicGFnZVkiLCJleGl0Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZZOztBQUVaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBa0MsU0FBUztBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDLFVBQVU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN2SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRVk7O0FBRVosYUFBYSxtQkFBTyxDQUFDLG9EQUFXO0FBQ2hDLGNBQWMsbUJBQU8sQ0FBQyxnREFBUztBQUMvQixjQUFjLG1CQUFPLENBQUMsZ0RBQVM7O0FBRS9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsbURBQW1EO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsVUFBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLHVDQUF1QyxTQUFTO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxpQkFBaUI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELEVBQUU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGVBQWU7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQSxxQkFBcUIsZUFBZTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsT0FBTztBQUM5RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLFFBQVE7QUFDN0I7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixZQUFZO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FB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QjtBQUVBdEMsT0FBRyxDQUNBaEQsTUFESCxDQUNVLEdBRFYsRUFFR0MsSUFGSCxDQUVRLE9BRlIsRUFFaUIsUUFGakIsRUFHR0EsSUFISCxDQUdRLFdBSFIsRUFHcUIsaUJBQWlCTCxNQUFqQixHQUEwQixHQUgvQyxFQUlHa0QsVUFKSCxHQUtHZixJQUxILENBS1EwQixLQUxSO0FBT0FULE9BQUcsQ0FDQWhELE1BREgsQ0FDVSxHQURWLEVBRUdDLElBRkgsQ0FFUSxPQUZSLEVBRWlCLFFBRmpCLEVBR0cyRSxLQUhILENBR1MsU0FIVCxFQUdvQixHQUhwQjtBQUtBOUUsTUFBRSxDQUFDQyxNQUFILENBQVUsT0FBVixFQUFtQjZFLEtBQW5CLENBQXlCLFNBQXpCLEVBQW9DLEdBQXBDO0FBRUFlLFVBQU0sQ0FBQ3JDLFNBQVMsQ0FBQzBCLElBQUQsQ0FBVixDQUFOO0FBQ0Q7QUFDRixDQW43Qk0sQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnRzLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5leHBvcnRzLnRvQnl0ZUFycmF5ID0gdG9CeXRlQXJyYXlcbmV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IGZyb21CeXRlQXJyYXlcblxudmFyIGxvb2t1cCA9IFtdXG52YXIgcmV2TG9va3VwID0gW11cbnZhciBBcnIgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgPyBVaW50OEFycmF5IDogQXJyYXlcblxudmFyIGNvZGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLydcbmZvciAodmFyIGkgPSAwLCBsZW4gPSBjb2RlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gIGxvb2t1cFtpXSA9IGNvZGVbaV1cbiAgcmV2TG9va3VwW2NvZGUuY2hhckNvZGVBdChpKV0gPSBpXG59XG5cbi8vIFN1cHBvcnQgZGVjb2RpbmcgVVJMLXNhZmUgYmFzZTY0IHN0cmluZ3MsIGFzIE5vZGUuanMgZG9lcy5cbi8vIFNlZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQmFzZTY0I1VSTF9hcHBsaWNhdGlvbnNcbnJldkxvb2t1cFsnLScuY2hhckNvZGVBdCgwKV0gPSA2MlxucmV2TG9va3VwWydfJy5jaGFyQ29kZUF0KDApXSA9IDYzXG5cbmZ1bmN0aW9uIGdldExlbnMgKGI2NCkge1xuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyBUcmltIG9mZiBleHRyYSBieXRlcyBhZnRlciBwbGFjZWhvbGRlciBieXRlcyBhcmUgZm91bmRcbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vYmVhdGdhbW1pdC9iYXNlNjQtanMvaXNzdWVzLzQyXG4gIHZhciB2YWxpZExlbiA9IGI2NC5pbmRleE9mKCc9JylcbiAgaWYgKHZhbGlkTGVuID09PSAtMSkgdmFsaWRMZW4gPSBsZW5cblxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gdmFsaWRMZW4gPT09IGxlblxuICAgID8gMFxuICAgIDogNCAtICh2YWxpZExlbiAlIDQpXG5cbiAgcmV0dXJuIFt2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuXVxufVxuXG4vLyBiYXNlNjQgaXMgNC8zICsgdXAgdG8gdHdvIGNoYXJhY3RlcnMgb2YgdGhlIG9yaWdpbmFsIGRhdGFcbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKGI2NCkge1xuICB2YXIgbGVucyA9IGdldExlbnMoYjY0KVxuICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdXG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiBfYnl0ZUxlbmd0aCAoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSB7XG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiB0b0J5dGVBcnJheSAoYjY0KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuXG4gIHZhciBhcnIgPSBuZXcgQXJyKF9ieXRlTGVuZ3RoKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikpXG5cbiAgdmFyIGN1ckJ5dGUgPSAwXG5cbiAgLy8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuICB2YXIgbGVuID0gcGxhY2VIb2xkZXJzTGVuID4gMFxuICAgID8gdmFsaWRMZW4gLSA0XG4gICAgOiB2YWxpZExlblxuXG4gIHZhciBpXG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxOCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDEyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfFxuICAgICAgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAzKV1cbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gMTYpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDIpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAxKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDEwKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgNCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDEyICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gNiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID1cbiAgICAgICgodWludDhbaV0gPDwgMTYpICYgMHhGRjAwMDApICtcbiAgICAgICgodWludDhbaSArIDFdIDw8IDgpICYgMHhGRjAwKSArXG4gICAgICAodWludDhbaSArIDJdICYgMHhGRilcbiAgICBvdXRwdXQucHVzaCh0cmlwbGV0VG9CYXNlNjQodG1wKSlcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGZyb21CeXRlQXJyYXkgKHVpbnQ4KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbiA9IHVpbnQ4Lmxlbmd0aFxuICB2YXIgZXh0cmFCeXRlcyA9IGxlbiAlIDMgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayhcbiAgICAgIHVpbnQ4LCBpLCAoaSArIG1heENodW5rTGVuZ3RoKSA+IGxlbjIgPyBsZW4yIDogKGkgKyBtYXhDaHVua0xlbmd0aClcbiAgICApKVxuICB9XG5cbiAgLy8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuICBpZiAoZXh0cmFCeXRlcyA9PT0gMSkge1xuICAgIHRtcCA9IHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgNCkgJiAweDNGXSArXG4gICAgICAnPT0nXG4gICAgKVxuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDEwXSArXG4gICAgICBsb29rdXBbKHRtcCA+PiA0KSAmIDB4M0ZdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDIpICYgMHgzRl0gK1xuICAgICAgJz0nXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzLmpvaW4oJycpXG59XG4iLCIvKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xuXG4ndXNlIHN0cmljdCdcblxudmFyIGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG52YXIgaWVlZTc1NCA9IHJlcXVpcmUoJ2llZWU3NTQnKVxudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5JylcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IFNsb3dCdWZmZXJcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MFxuXG4vKipcbiAqIElmIGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGA6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBVc2UgT2JqZWN0IGltcGxlbWVudGF0aW9uIChtb3N0IGNvbXBhdGlibGUsIGV2ZW4gSUU2KVxuICpcbiAqIEJyb3dzZXJzIHRoYXQgc3VwcG9ydCB0eXBlZCBhcnJheXMgYXJlIElFIDEwKywgRmlyZWZveCA0KywgQ2hyb21lIDcrLCBTYWZhcmkgNS4xKyxcbiAqIE9wZXJhIDExLjYrLCBpT1MgNC4yKy5cbiAqXG4gKiBEdWUgdG8gdmFyaW91cyBicm93c2VyIGJ1Z3MsIHNvbWV0aW1lcyB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uIHdpbGwgYmUgdXNlZCBldmVuXG4gKiB3aGVuIHRoZSBicm93c2VyIHN1cHBvcnRzIHR5cGVkIGFycmF5cy5cbiAqXG4gKiBOb3RlOlxuICpcbiAqICAgLSBGaXJlZm94IDQtMjkgbGFja3Mgc3VwcG9ydCBmb3IgYWRkaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YCBpbnN0YW5jZXMsXG4gKiAgICAgU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02OTU0MzguXG4gKlxuICogICAtIENocm9tZSA5LTEwIGlzIG1pc3NpbmcgdGhlIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24uXG4gKlxuICogICAtIElFMTAgaGFzIGEgYnJva2VuIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhcnJheXMgb2ZcbiAqICAgICBpbmNvcnJlY3QgbGVuZ3RoIGluIHNvbWUgc2l0dWF0aW9ucy5cblxuICogV2UgZGV0ZWN0IHRoZXNlIGJ1Z2d5IGJyb3dzZXJzIGFuZCBzZXQgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYCB0byBgZmFsc2VgIHNvIHRoZXlcbiAqIGdldCB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uLCB3aGljaCBpcyBzbG93ZXIgYnV0IGJlaGF2ZXMgY29ycmVjdGx5LlxuICovXG5CdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCA9IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUICE9PSB1bmRlZmluZWRcbiAgPyBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVFxuICA6IHR5cGVkQXJyYXlTdXBwb3J0KClcblxuLypcbiAqIEV4cG9ydCBrTWF4TGVuZ3RoIGFmdGVyIHR5cGVkIGFycmF5IHN1cHBvcnQgaXMgZGV0ZXJtaW5lZC5cbiAqL1xuZXhwb3J0cy5rTWF4TGVuZ3RoID0ga01heExlbmd0aCgpXG5cbmZ1bmN0aW9uIHR5cGVkQXJyYXlTdXBwb3J0ICgpIHtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMSlcbiAgICBhcnIuX19wcm90b19fID0ge19fcHJvdG9fXzogVWludDhBcnJheS5wcm90b3R5cGUsIGZvbzogZnVuY3Rpb24gKCkgeyByZXR1cm4gNDIgfX1cbiAgICByZXR1cm4gYXJyLmZvbygpID09PSA0MiAmJiAvLyB0eXBlZCBhcnJheSBpbnN0YW5jZXMgY2FuIGJlIGF1Z21lbnRlZFxuICAgICAgICB0eXBlb2YgYXJyLnN1YmFycmF5ID09PSAnZnVuY3Rpb24nICYmIC8vIGNocm9tZSA5LTEwIGxhY2sgYHN1YmFycmF5YFxuICAgICAgICBhcnIuc3ViYXJyYXkoMSwgMSkuYnl0ZUxlbmd0aCA9PT0gMCAvLyBpZTEwIGhhcyBicm9rZW4gYHN1YmFycmF5YFxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZnVuY3Rpb24ga01heExlbmd0aCAoKSB7XG4gIHJldHVybiBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVFxuICAgID8gMHg3ZmZmZmZmZlxuICAgIDogMHgzZmZmZmZmZlxufVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIgKHRoYXQsIGxlbmd0aCkge1xuICBpZiAoa01heExlbmd0aCgpIDwgbGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgdHlwZWQgYXJyYXkgbGVuZ3RoJylcbiAgfVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICBpZiAodGhhdCA9PT0gbnVsbCkge1xuICAgICAgdGhhdCA9IG5ldyBCdWZmZXIobGVuZ3RoKVxuICAgIH1cbiAgICB0aGF0Lmxlbmd0aCA9IGxlbmd0aFxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGhhdmUgdGhlaXJcbiAqIHByb3RvdHlwZSBjaGFuZ2VkIHRvIGBCdWZmZXIucHJvdG90eXBlYC4gRnVydGhlcm1vcmUsIGBCdWZmZXJgIGlzIGEgc3ViY2xhc3Mgb2ZcbiAqIGBVaW50OEFycmF5YCwgc28gdGhlIHJldHVybmVkIGluc3RhbmNlcyB3aWxsIGhhdmUgYWxsIHRoZSBub2RlIGBCdWZmZXJgIG1ldGhvZHNcbiAqIGFuZCB0aGUgYFVpbnQ4QXJyYXlgIG1ldGhvZHMuIFNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0XG4gKiByZXR1cm5zIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIFRoZSBgVWludDhBcnJheWAgcHJvdG90eXBlIHJlbWFpbnMgdW5tb2RpZmllZC5cbiAqL1xuXG5mdW5jdGlvbiBCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiYgISh0aGlzIGluc3RhbmNlb2YgQnVmZmVyKSkge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgLy8gQ29tbW9uIGNhc2UuXG4gIGlmICh0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuICAgIGlmICh0eXBlb2YgZW5jb2RpbmdPck9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0lmIGVuY29kaW5nIGlzIHNwZWNpZmllZCB0aGVuIHRoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nJ1xuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gYWxsb2NVbnNhZmUodGhpcywgYXJnKVxuICB9XG4gIHJldHVybiBmcm9tKHRoaXMsIGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucG9vbFNpemUgPSA4MTkyIC8vIG5vdCB1c2VkIGJ5IHRoaXMgaW1wbGVtZW50YXRpb25cblxuLy8gVE9ETzogTGVnYWN5LCBub3QgbmVlZGVkIGFueW1vcmUuIFJlbW92ZSBpbiBuZXh0IG1ham9yIHZlcnNpb24uXG5CdWZmZXIuX2F1Z21lbnQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGFyci5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gZnJvbSAodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlcicpXG4gIH1cblxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZnJvbVN0cmluZyh0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldClcbiAgfVxuXG4gIHJldHVybiBmcm9tT2JqZWN0KHRoYXQsIHZhbHVlKVxufVxuXG4vKipcbiAqIEZ1bmN0aW9uYWxseSBlcXVpdmFsZW50IHRvIEJ1ZmZlcihhcmcsIGVuY29kaW5nKSBidXQgdGhyb3dzIGEgVHlwZUVycm9yXG4gKiBpZiB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEJ1ZmZlci5mcm9tKHN0clssIGVuY29kaW5nXSlcbiAqIEJ1ZmZlci5mcm9tKGFycmF5KVxuICogQnVmZmVyLmZyb20oYnVmZmVyKVxuICogQnVmZmVyLmZyb20oYXJyYXlCdWZmZXJbLCBieXRlT2Zmc2V0WywgbGVuZ3RoXV0pXG4gKiovXG5CdWZmZXIuZnJvbSA9IGZ1bmN0aW9uICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBmcm9tKG51bGwsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbmlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICBCdWZmZXIucHJvdG90eXBlLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXkucHJvdG90eXBlXG4gIEJ1ZmZlci5fX3Byb3RvX18gPSBVaW50OEFycmF5XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wuc3BlY2llcyAmJlxuICAgICAgQnVmZmVyW1N5bWJvbC5zcGVjaWVzXSA9PT0gQnVmZmVyKSB7XG4gICAgLy8gRml4IHN1YmFycmF5KCkgaW4gRVMyMDE2LiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL3B1bGwvOTdcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLCBTeW1ib2wuc3BlY2llcywge1xuICAgICAgdmFsdWU6IG51bGwsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2VydFNpemUgKHNpemUpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9IGVsc2UgaWYgKHNpemUgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIG5lZ2F0aXZlJylcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxvYyAodGhhdCwgc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKVxuICB9XG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPbmx5IHBheSBhdHRlbnRpb24gdG8gZW5jb2RpbmcgaWYgaXQncyBhIHN0cmluZy4gVGhpc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWxseSBzZW5kaW5nIGluIGEgbnVtYmVyIHRoYXQgd291bGRcbiAgICAvLyBiZSBpbnRlcnByZXR0ZWQgYXMgYSBzdGFydCBvZmZzZXQuXG4gICAgcmV0dXJuIHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZydcbiAgICAgID8gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpLmZpbGwoZmlsbCwgZW5jb2RpbmcpXG4gICAgICA6IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwpXG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqIGFsbG9jKHNpemVbLCBmaWxsWywgZW5jb2RpbmddXSlcbiAqKi9cbkJ1ZmZlci5hbGxvYyA9IGZ1bmN0aW9uIChzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICByZXR1cm4gYWxsb2MobnVsbCwgc2l6ZSwgZmlsbCwgZW5jb2RpbmcpXG59XG5cbmZ1bmN0aW9uIGFsbG9jVW5zYWZlICh0aGF0LCBzaXplKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplIDwgMCA/IDAgOiBjaGVja2VkKHNpemUpIHwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgKytpKSB7XG4gICAgICB0aGF0W2ldID0gMFxuICAgIH1cbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gQnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKG51bGwsIHNpemUpXG59XG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gU2xvd0J1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICovXG5CdWZmZXIuYWxsb2NVbnNhZmVTbG93ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKG51bGwsIHNpemUpXG59XG5cbmZ1bmN0aW9uIGZyb21TdHJpbmcgKHRoYXQsIHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycgfHwgZW5jb2RpbmcgPT09ICcnKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgfVxuXG4gIGlmICghQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJlbmNvZGluZ1wiIG11c3QgYmUgYSB2YWxpZCBzdHJpbmcgZW5jb2RpbmcnKVxuICB9XG5cbiAgdmFyIGxlbmd0aCA9IGJ5dGVMZW5ndGgoc3RyaW5nLCBlbmNvZGluZykgfCAwXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuZ3RoKVxuXG4gIHZhciBhY3R1YWwgPSB0aGF0LndyaXRlKHN0cmluZywgZW5jb2RpbmcpXG5cbiAgaWYgKGFjdHVhbCAhPT0gbGVuZ3RoKSB7XG4gICAgLy8gV3JpdGluZyBhIGhleCBzdHJpbmcsIGZvciBleGFtcGxlLCB0aGF0IGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycyB3aWxsXG4gICAgLy8gY2F1c2UgZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3QgaW52YWxpZCBjaGFyYWN0ZXIgdG8gYmUgaWdub3JlZC4gKGUuZy5cbiAgICAvLyAnYWJ4eGNkJyB3aWxsIGJlIHRyZWF0ZWQgYXMgJ2FiJylcbiAgICB0aGF0ID0gdGhhdC5zbGljZSgwLCBhY3R1YWwpXG4gIH1cblxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlMaWtlICh0aGF0LCBhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoIDwgMCA/IDAgOiBjaGVja2VkKGFycmF5Lmxlbmd0aCkgfCAwXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuZ3RoKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgdGhhdFtpXSA9IGFycmF5W2ldICYgMjU1XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5QnVmZmVyICh0aGF0LCBhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gIGFycmF5LmJ5dGVMZW5ndGggLy8gdGhpcyB0aHJvd3MgaWYgYGFycmF5YCBpcyBub3QgYSB2YWxpZCBBcnJheUJ1ZmZlclxuXG4gIGlmIChieXRlT2Zmc2V0IDwgMCB8fCBhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdvZmZzZXRcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQgKyAobGVuZ3RoIHx8IDApKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ2xlbmd0aFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChieXRlT2Zmc2V0ID09PSB1bmRlZmluZWQgJiYgbGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5KVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gYXJyYXlcbiAgICB0aGF0Ll9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIGFuIG9iamVjdCBpbnN0YW5jZSBvZiB0aGUgQnVmZmVyIGNsYXNzXG4gICAgdGhhdCA9IGZyb21BcnJheUxpa2UodGhhdCwgYXJyYXkpXG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbU9iamVjdCAodGhhdCwgb2JqKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIob2JqKSkge1xuICAgIHZhciBsZW4gPSBjaGVja2VkKG9iai5sZW5ndGgpIHwgMFxuICAgIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuKVxuXG4gICAgaWYgKHRoYXQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhhdFxuICAgIH1cblxuICAgIG9iai5jb3B5KHRoYXQsIDAsIDAsIGxlbilcbiAgICByZXR1cm4gdGhhdFxuICB9XG5cbiAgaWYgKG9iaikge1xuICAgIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICBvYmouYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHx8ICdsZW5ndGgnIGluIG9iaikge1xuICAgICAgaWYgKHR5cGVvZiBvYmoubGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBpc25hbihvYmoubGVuZ3RoKSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIDApXG4gICAgICB9XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmopXG4gICAgfVxuXG4gICAgaWYgKG9iai50eXBlID09PSAnQnVmZmVyJyAmJiBpc0FycmF5KG9iai5kYXRhKSkge1xuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UodGhhdCwgb2JqLmRhdGEpXG4gICAgfVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksIG9yIGFycmF5LWxpa2Ugb2JqZWN0LicpXG59XG5cbmZ1bmN0aW9uIGNoZWNrZWQgKGxlbmd0aCkge1xuICAvLyBOb3RlOiBjYW5ub3QgdXNlIGBsZW5ndGggPCBrTWF4TGVuZ3RoKClgIGhlcmUgYmVjYXVzZSB0aGF0IGZhaWxzIHdoZW5cbiAgLy8gbGVuZ3RoIGlzIE5hTiAod2hpY2ggaXMgb3RoZXJ3aXNlIGNvZXJjZWQgdG8gemVyby4pXG4gIGlmIChsZW5ndGggPj0ga01heExlbmd0aCgpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gYWxsb2NhdGUgQnVmZmVyIGxhcmdlciB0aGFuIG1heGltdW0gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3NpemU6IDB4JyArIGtNYXhMZW5ndGgoKS50b1N0cmluZygxNikgKyAnIGJ5dGVzJylcbiAgfVxuICByZXR1cm4gbGVuZ3RoIHwgMFxufVxuXG5mdW5jdGlvbiBTbG93QnVmZmVyIChsZW5ndGgpIHtcbiAgaWYgKCtsZW5ndGggIT0gbGVuZ3RoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxXG4gICAgbGVuZ3RoID0gMFxuICB9XG4gIHJldHVybiBCdWZmZXIuYWxsb2MoK2xlbmd0aClcbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIgKGIpIHtcbiAgcmV0dXJuICEhKGIgIT0gbnVsbCAmJiBiLl9pc0J1ZmZlcilcbn1cblxuQnVmZmVyLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlIChhLCBiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGEpIHx8ICFCdWZmZXIuaXNCdWZmZXIoYikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgbXVzdCBiZSBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChhID09PSBiKSByZXR1cm4gMFxuXG4gIHZhciB4ID0gYS5sZW5ndGhcbiAgdmFyIHkgPSBiLmxlbmd0aFxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBNYXRoLm1pbih4LCB5KTsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHggPSBhW2ldXG4gICAgICB5ID0gYltpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gaXNFbmNvZGluZyAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnbGF0aW4xJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiBjb25jYXQgKGxpc3QsIGxlbmd0aCkge1xuICBpZiAoIWlzQXJyYXkobGlzdCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5hbGxvYygwKVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICBsZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKGxlbmd0aClcbiAgdmFyIHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYnVmID0gbGlzdFtpXVxuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gICAgfVxuICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgIHBvcyArPSBidWYubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIGJ1ZmZlclxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIoc3RyaW5nKSkge1xuICAgIHJldHVybiBzdHJpbmcubGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgKEFycmF5QnVmZmVyLmlzVmlldyhzdHJpbmcpIHx8IHN0cmluZyBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSkge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHN0cmluZyA9ICcnICsgc3RyaW5nXG4gIH1cblxuICB2YXIgbGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAobGVuID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIFVzZSBhIGZvciBsb29wIHRvIGF2b2lkIHJlY3Vyc2lvblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsZW5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIGxlbiAqIDJcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBsZW4gPj4+IDFcbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aCAvLyBhc3N1bWUgdXRmOFxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuQnVmZmVyLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5cbmZ1bmN0aW9uIHNsb3dUb1N0cmluZyAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcblxuICAvLyBObyBuZWVkIHRvIHZlcmlmeSB0aGF0IFwidGhpcy5sZW5ndGggPD0gTUFYX1VJTlQzMlwiIHNpbmNlIGl0J3MgYSByZWFkLW9ubHlcbiAgLy8gcHJvcGVydHkgb2YgYSB0eXBlZCBhcnJheS5cblxuICAvLyBUaGlzIGJlaGF2ZXMgbmVpdGhlciBsaWtlIFN0cmluZyBub3IgVWludDhBcnJheSBpbiB0aGF0IHdlIHNldCBzdGFydC9lbmRcbiAgLy8gdG8gdGhlaXIgdXBwZXIvbG93ZXIgYm91bmRzIGlmIHRoZSB2YWx1ZSBwYXNzZWQgaXMgb3V0IG9mIHJhbmdlLlxuICAvLyB1bmRlZmluZWQgaXMgaGFuZGxlZCBzcGVjaWFsbHkgYXMgcGVyIEVDTUEtMjYyIDZ0aCBFZGl0aW9uLFxuICAvLyBTZWN0aW9uIDEzLjMuMy43IFJ1bnRpbWUgU2VtYW50aWNzOiBLZXllZEJpbmRpbmdJbml0aWFsaXphdGlvbi5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQgfHwgc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgLy8gUmV0dXJuIGVhcmx5IGlmIHN0YXJ0ID4gdGhpcy5sZW5ndGguIERvbmUgaGVyZSB0byBwcmV2ZW50IHBvdGVudGlhbCB1aW50MzJcbiAgLy8gY29lcmNpb24gZmFpbCBiZWxvdy5cbiAgaWYgKHN0YXJ0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCB8fCBlbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoZW5kIDw9IDApIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIC8vIEZvcmNlIGNvZXJzaW9uIHRvIHVpbnQzMi4gVGhpcyB3aWxsIGFsc28gY29lcmNlIGZhbHNleS9OYU4gdmFsdWVzIHRvIDAuXG4gIGVuZCA+Pj49IDBcbiAgc3RhcnQgPj4+PSAwXG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1dGYxNmxlU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKGVuY29kaW5nICsgJycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbi8vIFRoZSBwcm9wZXJ0eSBpcyB1c2VkIGJ5IGBCdWZmZXIuaXNCdWZmZXJgIGFuZCBgaXMtYnVmZmVyYCAoaW4gU2FmYXJpIDUtNykgdG8gZGV0ZWN0XG4vLyBCdWZmZXIgaW5zdGFuY2VzLlxuQnVmZmVyLnByb3RvdHlwZS5faXNCdWZmZXIgPSB0cnVlXG5cbmZ1bmN0aW9uIHN3YXAgKGIsIG4sIG0pIHtcbiAgdmFyIGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSAyICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAxNi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMSlcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAzMiA9IGZ1bmN0aW9uIHN3YXAzMiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgNCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMzItYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDMpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDIpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwNjQgPSBmdW5jdGlvbiBzd2FwNjQgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aCB8IDBcbiAgaWYgKGxlbmd0aCA9PT0gMCkgcmV0dXJuICcnXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIDAsIGxlbmd0aClcbiAgcmV0dXJuIHNsb3dUb1N0cmluZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzIChiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgaWYgKHRoaXMgPT09IGIpIHJldHVybiB0cnVlXG4gIHJldHVybiBCdWZmZXIuY29tcGFyZSh0aGlzLCBiKSA9PT0gMFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiBpbnNwZWN0ICgpIHtcbiAgdmFyIHN0ciA9ICcnXG4gIHZhciBtYXggPSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTXG4gIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICBzdHIgPSB0aGlzLnRvU3RyaW5nKCdoZXgnLCAwLCBtYXgpLm1hdGNoKC8uezJ9L2cpLmpvaW4oJyAnKVxuICAgIGlmICh0aGlzLmxlbmd0aCA+IG1heCkgc3RyICs9ICcgLi4uICdcbiAgfVxuICByZXR1cm4gJzxCdWZmZXIgJyArIHN0ciArICc+J1xufVxuXG5CdWZmZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlICh0YXJnZXQsIHN0YXJ0LCBlbmQsIHRoaXNTdGFydCwgdGhpc0VuZCkge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIH1cblxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHRhcmdldCA/IHRhcmdldC5sZW5ndGggOiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1N0YXJ0ID0gMFxuICB9XG4gIGlmICh0aGlzRW5kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzRW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChzdGFydCA8IDAgfHwgZW5kID4gdGFyZ2V0Lmxlbmd0aCB8fCB0aGlzU3RhcnQgPCAwIHx8IHRoaXNFbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kICYmIHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGFydCA+Pj49IDBcbiAgZW5kID4+Pj0gMFxuICB0aGlzU3RhcnQgPj4+PSAwXG4gIHRoaXNFbmQgPj4+PSAwXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCkgcmV0dXJuIDBcblxuICB2YXIgeCA9IHRoaXNFbmQgLSB0aGlzU3RhcnRcbiAgdmFyIHkgPSBlbmQgLSBzdGFydFxuICB2YXIgbGVuID0gTWF0aC5taW4oeCwgeSlcblxuICB2YXIgdGhpc0NvcHkgPSB0aGlzLnNsaWNlKHRoaXNTdGFydCwgdGhpc0VuZClcbiAgdmFyIHRhcmdldENvcHkgPSB0YXJnZXQuc2xpY2Uoc3RhcnQsIGVuZClcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKHRoaXNDb3B5W2ldICE9PSB0YXJnZXRDb3B5W2ldKSB7XG4gICAgICB4ID0gdGhpc0NvcHlbaV1cbiAgICAgIHkgPSB0YXJnZXRDb3B5W2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuLy8gRmluZHMgZWl0aGVyIHRoZSBmaXJzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPj0gYGJ5dGVPZmZzZXRgLFxuLy8gT1IgdGhlIGxhc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0IDw9IGBieXRlT2Zmc2V0YC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAtIGJ1ZmZlciAtIGEgQnVmZmVyIHRvIHNlYXJjaFxuLy8gLSB2YWwgLSBhIHN0cmluZywgQnVmZmVyLCBvciBudW1iZXJcbi8vIC0gYnl0ZU9mZnNldCAtIGFuIGluZGV4IGludG8gYGJ1ZmZlcmA7IHdpbGwgYmUgY2xhbXBlZCB0byBhbiBpbnQzMlxuLy8gLSBlbmNvZGluZyAtIGFuIG9wdGlvbmFsIGVuY29kaW5nLCByZWxldmFudCBpcyB2YWwgaXMgYSBzdHJpbmdcbi8vIC0gZGlyIC0gdHJ1ZSBmb3IgaW5kZXhPZiwgZmFsc2UgZm9yIGxhc3RJbmRleE9mXG5mdW5jdGlvbiBiaWRpcmVjdGlvbmFsSW5kZXhPZiAoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgLy8gRW1wdHkgYnVmZmVyIG1lYW5zIG5vIG1hdGNoXG4gIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSByZXR1cm4gLTFcblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldFxuICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBieXRlT2Zmc2V0XG4gICAgYnl0ZU9mZnNldCA9IDBcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikge1xuICAgIGJ5dGVPZmZzZXQgPSAweDdmZmZmZmZmXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSB7XG4gICAgYnl0ZU9mZnNldCA9IC0weDgwMDAwMDAwXG4gIH1cbiAgYnl0ZU9mZnNldCA9ICtieXRlT2Zmc2V0ICAvLyBDb2VyY2UgdG8gTnVtYmVyLlxuICBpZiAoaXNOYU4oYnl0ZU9mZnNldCkpIHtcbiAgICAvLyBieXRlT2Zmc2V0OiBpdCBpdCdzIHVuZGVmaW5lZCwgbnVsbCwgTmFOLCBcImZvb1wiLCBldGMsIHNlYXJjaCB3aG9sZSBidWZmZXJcbiAgICBieXRlT2Zmc2V0ID0gZGlyID8gMCA6IChidWZmZXIubGVuZ3RoIC0gMSlcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0OiBuZWdhdGl2ZSBvZmZzZXRzIHN0YXJ0IGZyb20gdGhlIGVuZCBvZiB0aGUgYnVmZmVyXG4gIGlmIChieXRlT2Zmc2V0IDwgMCkgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggKyBieXRlT2Zmc2V0XG4gIGlmIChieXRlT2Zmc2V0ID49IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICBpZiAoZGlyKSByZXR1cm4gLTFcbiAgICBlbHNlIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoIC0gMVxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAwKSB7XG4gICAgaWYgKGRpcikgYnl0ZU9mZnNldCA9IDBcbiAgICBlbHNlIHJldHVybiAtMVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIHZhbFxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWwgPSBCdWZmZXIuZnJvbSh2YWwsIGVuY29kaW5nKVxuICB9XG5cbiAgLy8gRmluYWxseSwgc2VhcmNoIGVpdGhlciBpbmRleE9mIChpZiBkaXIgaXMgdHJ1ZSkgb3IgbGFzdEluZGV4T2ZcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2YWwpKSB7XG4gICAgLy8gU3BlY2lhbCBjYXNlOiBsb29raW5nIGZvciBlbXB0eSBzdHJpbmcvYnVmZmVyIGFsd2F5cyBmYWlsc1xuICAgIGlmICh2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDB4RkYgLy8gU2VhcmNoIGZvciBhIGJ5dGUgdmFsdWUgWzAtMjU1XVxuICAgIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJlxuICAgICAgICB0eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKGRpcikge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCBbIHZhbCBdLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsIG11c3QgYmUgc3RyaW5nLCBudW1iZXIgb3IgQnVmZmVyJylcbn1cblxuZnVuY3Rpb24gYXJyYXlJbmRleE9mIChhcnIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICB2YXIgaW5kZXhTaXplID0gMVxuICB2YXIgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aFxuICB2YXIgdmFsTGVuZ3RoID0gdmFsLmxlbmd0aFxuXG4gIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICBpZiAoZW5jb2RpbmcgPT09ICd1Y3MyJyB8fCBlbmNvZGluZyA9PT0gJ3Vjcy0yJyB8fFxuICAgICAgICBlbmNvZGluZyA9PT0gJ3V0ZjE2bGUnIHx8IGVuY29kaW5nID09PSAndXRmLTE2bGUnKSB7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA8IDIgfHwgdmFsLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgICBpbmRleFNpemUgPSAyXG4gICAgICBhcnJMZW5ndGggLz0gMlxuICAgICAgdmFsTGVuZ3RoIC89IDJcbiAgICAgIGJ5dGVPZmZzZXQgLz0gMlxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGJ1ZiwgaSkge1xuICAgIGlmIChpbmRleFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBidWZbaV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJ1Zi5yZWFkVUludDE2QkUoaSAqIGluZGV4U2l6ZSlcbiAgICB9XG4gIH1cblxuICB2YXIgaVxuICBpZiAoZGlyKSB7XG4gICAgdmFyIGZvdW5kSW5kZXggPSAtMVxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJlYWQoYXJyLCBpKSA9PT0gcmVhZCh2YWwsIGZvdW5kSW5kZXggPT09IC0xID8gMCA6IGkgLSBmb3VuZEluZGV4KSkge1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIGZvdW5kSW5kZXggPSBpXG4gICAgICAgIGlmIChpIC0gZm91bmRJbmRleCArIDEgPT09IHZhbExlbmd0aCkgcmV0dXJuIGZvdW5kSW5kZXggKiBpbmRleFNpemVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkgaSAtPSBpIC0gZm91bmRJbmRleFxuICAgICAgICBmb3VuZEluZGV4ID0gLTFcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJ5dGVPZmZzZXQgKyB2YWxMZW5ndGggPiBhcnJMZW5ndGgpIGJ5dGVPZmZzZXQgPSBhcnJMZW5ndGggLSB2YWxMZW5ndGhcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGZvdW5kID0gdHJ1ZVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWxMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVhZChhcnIsIGkgKyBqKSAhPT0gcmVhZCh2YWwsIGopKSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0aGlzLmluZGV4T2YodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykgIT09IC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIHRydWUpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGhleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG5cbiAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciBvZiBkaWdpdHNcbiAgdmFyIHN0ckxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKHN0ckxlbiAlIDIgIT09IDApIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgaGV4IHN0cmluZycpXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIHZhciBwYXJzZWQgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgaWYgKGlzTmFOKHBhcnNlZCkpIHJldHVybiBpXG4gICAgYnVmW29mZnNldCArIGldID0gcGFyc2VkXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gdXRmOFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYXNjaWlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBsYXRpbjFXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBhc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHVjczJXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiB3cml0ZSAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZylcbiAgaWYgKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBvZmZzZXRbLCBsZW5ndGhdWywgZW5jb2RpbmddKVxuICB9IGVsc2UgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gICAgaWYgKGlzRmluaXRlKGxlbmd0aCkpIHtcbiAgICAgIGxlbmd0aCA9IGxlbmd0aCB8IDBcbiAgICAgIGlmIChlbmNvZGluZyA9PT0gdW5kZWZpbmVkKSBlbmNvZGluZyA9ICd1dGY4J1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkXG4gICAgfVxuICAvLyBsZWdhY3kgd3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0LCBsZW5ndGgpIC0gcmVtb3ZlIGluIHYwLjEzXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ0J1ZmZlci53cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXRbLCBsZW5ndGhdKSBpcyBubyBsb25nZXIgc3VwcG9ydGVkJ1xuICAgIClcbiAgfVxuXG4gIHZhciByZW1haW5pbmcgPSB0aGlzLmxlbmd0aCAtIG9mZnNldFxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgfHwgbGVuZ3RoID4gcmVtYWluaW5nKSBsZW5ndGggPSByZW1haW5pbmdcblxuICBpZiAoKHN0cmluZy5sZW5ndGggPiAwICYmIChsZW5ndGggPCAwIHx8IG9mZnNldCA8IDApKSB8fCBvZmZzZXQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIHdyaXRlIG91dHNpZGUgYnVmZmVyIGJvdW5kcycpXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIC8vIFdhcm5pbmc6IG1heExlbmd0aCBub3QgdGFrZW4gaW50byBhY2NvdW50IGluIGJhc2U2NFdyaXRlXG4gICAgICAgIHJldHVybiBiYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdWNzMldyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTiAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0J1ZmZlcicsXG4gICAgZGF0YTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyIHx8IHRoaXMsIDApXG4gIH1cbn1cblxuZnVuY3Rpb24gYmFzZTY0U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBpZiAoc3RhcnQgPT09IDAgJiYgZW5kID09PSBidWYubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1ZilcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmLnNsaWNlKHN0YXJ0LCBlbmQpKVxuICB9XG59XG5cbmZ1bmN0aW9uIHV0ZjhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcbiAgdmFyIHJlcyA9IFtdXG5cbiAgdmFyIGkgPSBzdGFydFxuICB3aGlsZSAoaSA8IGVuZCkge1xuICAgIHZhciBmaXJzdEJ5dGUgPSBidWZbaV1cbiAgICB2YXIgY29kZVBvaW50ID0gbnVsbFxuICAgIHZhciBieXRlc1BlclNlcXVlbmNlID0gKGZpcnN0Qnl0ZSA+IDB4RUYpID8gNFxuICAgICAgOiAoZmlyc3RCeXRlID4gMHhERikgPyAzXG4gICAgICA6IChmaXJzdEJ5dGUgPiAweEJGKSA/IDJcbiAgICAgIDogMVxuXG4gICAgaWYgKGkgKyBieXRlc1BlclNlcXVlbmNlIDw9IGVuZCkge1xuICAgICAgdmFyIHNlY29uZEJ5dGUsIHRoaXJkQnl0ZSwgZm91cnRoQnl0ZSwgdGVtcENvZGVQb2ludFxuXG4gICAgICBzd2l0Y2ggKGJ5dGVzUGVyU2VxdWVuY2UpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGlmIChmaXJzdEJ5dGUgPCAweDgwKSB7XG4gICAgICAgICAgICBjb2RlUG9pbnQgPSBmaXJzdEJ5dGVcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHgxRikgPDwgMHg2IHwgKHNlY29uZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4QyB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKHRoaXJkQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0ZGICYmICh0ZW1wQ29kZVBvaW50IDwgMHhEODAwIHx8IHRlbXBDb2RlUG9pbnQgPiAweERGRkYpKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGZvdXJ0aEJ5dGUgPSBidWZbaSArIDNdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwICYmIChmb3VydGhCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweDEyIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweEMgfCAodGhpcmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKGZvdXJ0aEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweEZGRkYgJiYgdGVtcENvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvZGVQb2ludCA9PT0gbnVsbCkge1xuICAgICAgLy8gd2UgZGlkIG5vdCBnZW5lcmF0ZSBhIHZhbGlkIGNvZGVQb2ludCBzbyBpbnNlcnQgYVxuICAgICAgLy8gcmVwbGFjZW1lbnQgY2hhciAoVStGRkZEKSBhbmQgYWR2YW5jZSBvbmx5IDEgYnl0ZVxuICAgICAgY29kZVBvaW50ID0gMHhGRkZEXG4gICAgICBieXRlc1BlclNlcXVlbmNlID0gMVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50ID4gMHhGRkZGKSB7XG4gICAgICAvLyBlbmNvZGUgdG8gdXRmMTYgKHN1cnJvZ2F0ZSBwYWlyIGRhbmNlKVxuICAgICAgY29kZVBvaW50IC09IDB4MTAwMDBcbiAgICAgIHJlcy5wdXNoKGNvZGVQb2ludCA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMClcbiAgICAgIGNvZGVQb2ludCA9IDB4REMwMCB8IGNvZGVQb2ludCAmIDB4M0ZGXG4gICAgfVxuXG4gICAgcmVzLnB1c2goY29kZVBvaW50KVxuICAgIGkgKz0gYnl0ZXNQZXJTZXF1ZW5jZVxuICB9XG5cbiAgcmV0dXJuIGRlY29kZUNvZGVQb2ludHNBcnJheShyZXMpXG59XG5cbi8vIEJhc2VkIG9uIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIyNzQ3MjcyLzY4MDc0MiwgdGhlIGJyb3dzZXIgd2l0aFxuLy8gdGhlIGxvd2VzdCBsaW1pdCBpcyBDaHJvbWUsIHdpdGggMHgxMDAwMCBhcmdzLlxuLy8gV2UgZ28gMSBtYWduaXR1ZGUgbGVzcywgZm9yIHNhZmV0eVxudmFyIE1BWF9BUkdVTUVOVFNfTEVOR1RIID0gMHgxMDAwXG5cbmZ1bmN0aW9uIGRlY29kZUNvZGVQb2ludHNBcnJheSAoY29kZVBvaW50cykge1xuICB2YXIgbGVuID0gY29kZVBvaW50cy5sZW5ndGhcbiAgaWYgKGxlbiA8PSBNQVhfQVJHVU1FTlRTX0xFTkdUSCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY29kZVBvaW50cykgLy8gYXZvaWQgZXh0cmEgc2xpY2UoKVxuICB9XG5cbiAgLy8gRGVjb2RlIGluIGNodW5rcyB0byBhdm9pZCBcImNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZFwiLlxuICB2YXIgcmVzID0gJydcbiAgdmFyIGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoXG4gICAgICBTdHJpbmcsXG4gICAgICBjb2RlUG9pbnRzLnNsaWNlKGksIGkgKz0gTUFYX0FSR1VNRU5UU19MRU5HVEgpXG4gICAgKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0gJiAweDdGKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gbGF0aW4xU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgfHwgZW5kIDwgMCB8fCBlbmQgPiBsZW4pIGVuZCA9IGxlblxuXG4gIHZhciBvdXQgPSAnJ1xuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIG91dCArPSB0b0hleChidWZbaV0pXG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiB1dGYxNmxlU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgdmFyIHJlcyA9ICcnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIGJ5dGVzW2kgKyAxXSAqIDI1NilcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgc3RhcnQgPSB+fnN0YXJ0XG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogfn5lbmRcblxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgKz0gbGVuXG4gICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIH0gZWxzZSBpZiAoc3RhcnQgPiBsZW4pIHtcbiAgICBzdGFydCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuXG4gICAgaWYgKGVuZCA8IDApIGVuZCA9IDBcbiAgfSBlbHNlIGlmIChlbmQgPiBsZW4pIHtcbiAgICBlbmQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICB2YXIgbmV3QnVmXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIG5ld0J1ZiA9IHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZClcbiAgICBuZXdCdWYuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIHZhciBzbGljZUxlbiA9IGVuZCAtIHN0YXJ0XG4gICAgbmV3QnVmID0gbmV3IEJ1ZmZlcihzbGljZUxlbiwgdW5kZWZpbmVkKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpY2VMZW47ICsraSkge1xuICAgICAgbmV3QnVmW2ldID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ld0J1ZlxufVxuXG4vKlxuICogTmVlZCB0byBtYWtlIHN1cmUgdGhhdCBidWZmZXIgaXNuJ3QgdHJ5aW5nIHRvIHdyaXRlIG91dCBvZiBib3VuZHMuXG4gKi9cbmZ1bmN0aW9uIGNoZWNrT2Zmc2V0IChvZmZzZXQsIGV4dCwgbGVuZ3RoKSB7XG4gIGlmICgob2Zmc2V0ICUgMSkgIT09IDAgfHwgb2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ29mZnNldCBpcyBub3QgdWludCcpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBsZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdUcnlpbmcgdG8gYWNjZXNzIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludExFID0gZnVuY3Rpb24gcmVhZFVJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludEJFID0gZnVuY3Rpb24gcmVhZFVJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcbiAgfVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF1cbiAgdmFyIG11bCA9IDFcbiAgd2hpbGUgKGJ5dGVMZW5ndGggPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIHJlYWRVSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCA4KSB8IHRoaXNbb2Zmc2V0ICsgMV1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiByZWFkVUludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gKiAweDEwMDAwMDApICtcbiAgICAoKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgdGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50TEUgPSBmdW5jdGlvbiByZWFkSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50QkUgPSBmdW5jdGlvbiByZWFkSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgaSA9IGJ5dGVMZW5ndGhcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1pXVxuICB3aGlsZSAoaSA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIHJlYWRJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIGlmICghKHRoaXNbb2Zmc2V0XSAmIDB4ODApKSByZXR1cm4gKHRoaXNbb2Zmc2V0XSlcbiAgcmV0dXJuICgoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTEpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiByZWFkSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gcmVhZEludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgMV0gfCAodGhpc1tvZmZzZXRdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgMjQpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdExFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdEJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gcmVhZERvdWJsZUxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiByZWFkRG91YmxlQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCA1MiwgOClcbn1cblxuZnVuY3Rpb24gY2hlY2tJbnQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImJ1ZmZlclwiIGFyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXIgaW5zdGFuY2UnKVxuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgaXMgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlVUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlVUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVVSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweGZmLCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDIpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlICYgKDB4ZmYgPDwgKDggKiAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSkpKSA+Pj5cbiAgICAgIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpICogOFxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDMyIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCA0KTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAzIC0gaSkgKiA4KSAmIDB4ZmZcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSAwXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSAtIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSArIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5mdW5jdGlvbiBjaGVja0lFRUU3NTQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG4gIGlmIChvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA0LCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiB3cml0ZURvdWJsZSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA4LCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxuICByZXR1cm4gb2Zmc2V0ICsgOFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIGNvcHkgKHRhcmdldCwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldFN0YXJ0ID49IHRhcmdldC5sZW5ndGgpIHRhcmdldFN0YXJ0ID0gdGFyZ2V0Lmxlbmd0aFxuICBpZiAoIXRhcmdldFN0YXJ0KSB0YXJnZXRTdGFydCA9IDBcbiAgaWYgKGVuZCA+IDAgJiYgZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm4gMFxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCB0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGlmICh0YXJnZXRTdGFydCA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcigndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIH1cbiAgaWYgKHN0YXJ0IDwgMCB8fCBzdGFydCA+PSB0aGlzLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBpZiAoZW5kIDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgPCBlbmQgLSBzdGFydCkge1xuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCArIHN0YXJ0XG4gIH1cblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnRcbiAgdmFyIGlcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHN0YXJ0IDwgdGFyZ2V0U3RhcnQgJiYgdGFyZ2V0U3RhcnQgPCBlbmQpIHtcbiAgICAvLyBkZXNjZW5kaW5nIGNvcHkgZnJvbSBlbmRcbiAgICBmb3IgKGkgPSBsZW4gLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSBpZiAobGVuIDwgMTAwMCB8fCAhQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBhc2NlbmRpbmcgY29weSBmcm9tIHN0YXJ0XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgIHRhcmdldCxcbiAgICAgIHRoaXMuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuKSxcbiAgICAgIHRhcmdldFN0YXJ0XG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIGxlblxufVxuXG4vLyBVc2FnZTpcbi8vICAgIGJ1ZmZlci5maWxsKG51bWJlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoYnVmZmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChzdHJpbmdbLCBvZmZzZXRbLCBlbmRdXVssIGVuY29kaW5nXSlcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uIGZpbGwgKHZhbCwgc3RhcnQsIGVuZCwgZW5jb2RpbmcpIHtcbiAgLy8gSGFuZGxlIHN0cmluZyBjYXNlczpcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gc3RhcnRcbiAgICAgIHN0YXJ0ID0gMFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IGVuZFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9XG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHZhciBjb2RlID0gdmFsLmNoYXJDb2RlQXQoMClcbiAgICAgIGlmIChjb2RlIDwgMjU2KSB7XG4gICAgICAgIHZhbCA9IGNvZGVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZW5jb2RpbmcgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnICYmICFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAyNTVcbiAgfVxuXG4gIC8vIEludmFsaWQgcmFuZ2VzIGFyZSBub3Qgc2V0IHRvIGEgZGVmYXVsdCwgc28gY2FuIHJhbmdlIGNoZWNrIGVhcmx5LlxuICBpZiAoc3RhcnQgPCAwIHx8IHRoaXMubGVuZ3RoIDwgc3RhcnQgfHwgdGhpcy5sZW5ndGggPCBlbmQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCF2YWwpIHZhbCA9IDBcblxuICB2YXIgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gdmFsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBieXRlcyA9IEJ1ZmZlci5pc0J1ZmZlcih2YWwpXG4gICAgICA/IHZhbFxuICAgICAgOiB1dGY4VG9CeXRlcyhuZXcgQnVmZmVyKHZhbCwgZW5jb2RpbmcpLnRvU3RyaW5nKCkpXG4gICAgdmFyIGxlbiA9IGJ5dGVzLmxlbmd0aFxuICAgIGZvciAoaSA9IDA7IGkgPCBlbmQgLSBzdGFydDsgKytpKSB7XG4gICAgICB0aGlzW2kgKyBzdGFydF0gPSBieXRlc1tpICUgbGVuXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxudmFyIElOVkFMSURfQkFTRTY0X1JFID0gL1teK1xcLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSBzdHJpcHMgb3V0IGludmFsaWQgY2hhcmFjdGVycyBsaWtlIFxcbiBhbmQgXFx0IGZyb20gdGhlIHN0cmluZywgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHN0ciA9IHN0cmluZ3RyaW0oc3RyKS5yZXBsYWNlKElOVkFMSURfQkFTRTY0X1JFLCAnJylcbiAgLy8gTm9kZSBjb252ZXJ0cyBzdHJpbmdzIHdpdGggbGVuZ3RoIDwgMiB0byAnJ1xuICBpZiAoc3RyLmxlbmd0aCA8IDIpIHJldHVybiAnJ1xuICAvLyBOb2RlIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBiYXNlNjQgc3RyaW5ncyAobWlzc2luZyB0cmFpbGluZyA9PT0pLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgd2hpbGUgKHN0ci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgc3RyID0gc3RyICsgJz0nXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiBzdHJpbmd0cmltIChzdHIpIHtcbiAgaWYgKHN0ci50cmltKSByZXR1cm4gc3RyLnRyaW0oKVxuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxufVxuXG5mdW5jdGlvbiB0b0hleCAobikge1xuICBpZiAobiA8IDE2KSByZXR1cm4gJzAnICsgbi50b1N0cmluZygxNilcbiAgcmV0dXJuIG4udG9TdHJpbmcoMTYpXG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzIChzdHJpbmcsIHVuaXRzKSB7XG4gIHVuaXRzID0gdW5pdHMgfHwgSW5maW5pdHlcbiAgdmFyIGNvZGVQb2ludFxuICB2YXIgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aFxuICB2YXIgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcbiAgdmFyIGJ5dGVzID0gW11cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29kZVBvaW50ID0gc3RyaW5nLmNoYXJDb2RlQXQoaSlcblxuICAgIC8vIGlzIHN1cnJvZ2F0ZSBjb21wb25lbnRcbiAgICBpZiAoY29kZVBvaW50ID4gMHhEN0ZGICYmIGNvZGVQb2ludCA8IDB4RTAwMCkge1xuICAgICAgLy8gbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICghbGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgICAvLyBubyBsZWFkIHlldFxuICAgICAgICBpZiAoY29kZVBvaW50ID4gMHhEQkZGKSB7XG4gICAgICAgICAgLy8gdW5leHBlY3RlZCB0cmFpbFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSBpZiAoaSArIDEgPT09IGxlbmd0aCkge1xuICAgICAgICAgIC8vIHVucGFpcmVkIGxlYWRcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFsaWQgbGVhZFxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gMiBsZWFkcyBpbiBhIHJvd1xuICAgICAgaWYgKGNvZGVQb2ludCA8IDB4REMwMCkge1xuICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyB2YWxpZCBzdXJyb2dhdGUgcGFpclxuICAgICAgY29kZVBvaW50ID0gKGxlYWRTdXJyb2dhdGUgLSAweEQ4MDAgPDwgMTAgfCBjb2RlUG9pbnQgLSAweERDMDApICsgMHgxMDAwMFxuICAgIH0gZWxzZSBpZiAobGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgLy8gdmFsaWQgYm1wIGNoYXIsIGJ1dCBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgfVxuXG4gICAgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcblxuICAgIC8vIGVuY29kZSB1dGY4XG4gICAgaWYgKGNvZGVQb2ludCA8IDB4ODApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMSkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChjb2RlUG9pbnQpXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDgwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2IHwgMHhDMCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyB8IDB4RTAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDQpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDEyIHwgMHhGMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb2RlIHBvaW50JylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnl0ZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMgKHN0ciwgdW5pdHMpIHtcbiAgdmFyIGMsIGhpLCBsb1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcblxuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KGJhc2U2NGNsZWFuKHN0cikpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgaWYgKChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGgpIHx8IChpID49IHNyYy5sZW5ndGgpKSBicmVha1xuICAgIGRzdFtpICsgb2Zmc2V0XSA9IHNyY1tpXVxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIGlzbmFuICh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gdmFsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2VsZi1jb21wYXJlXG59XG4iLCJ2YXIgZGVncmVlcyA9IDE4MCAvIE1hdGguUEk7XG5cbmV4cG9ydCB2YXIgaWRlbnRpdHkgPSB7XG4gIHRyYW5zbGF0ZVg6IDAsXG4gIHRyYW5zbGF0ZVk6IDAsXG4gIHJvdGF0ZTogMCxcbiAgc2tld1g6IDAsXG4gIHNjYWxlWDogMSxcbiAgc2NhbGVZOiAxXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIHZhciBzY2FsZVgsIHNjYWxlWSwgc2tld1g7XG4gIGlmIChzY2FsZVggPSBNYXRoLnNxcnQoYSAqIGEgKyBiICogYikpIGEgLz0gc2NhbGVYLCBiIC89IHNjYWxlWDtcbiAgaWYgKHNrZXdYID0gYSAqIGMgKyBiICogZCkgYyAtPSBhICogc2tld1gsIGQgLT0gYiAqIHNrZXdYO1xuICBpZiAoc2NhbGVZID0gTWF0aC5zcXJ0KGMgKiBjICsgZCAqIGQpKSBjIC89IHNjYWxlWSwgZCAvPSBzY2FsZVksIHNrZXdYIC89IHNjYWxlWTtcbiAgaWYgKGEgKiBkIDwgYiAqIGMpIGEgPSAtYSwgYiA9IC1iLCBza2V3WCA9IC1za2V3WCwgc2NhbGVYID0gLXNjYWxlWDtcbiAgcmV0dXJuIHtcbiAgICB0cmFuc2xhdGVYOiBlLFxuICAgIHRyYW5zbGF0ZVk6IGYsXG4gICAgcm90YXRlOiBNYXRoLmF0YW4yKGIsIGEpICogZGVncmVlcyxcbiAgICBza2V3WDogTWF0aC5hdGFuKHNrZXdYKSAqIGRlZ3JlZXMsXG4gICAgc2NhbGVYOiBzY2FsZVgsXG4gICAgc2NhbGVZOiBzY2FsZVlcbiAgfTtcbn1cbiIsImltcG9ydCBkZWNvbXBvc2UsIHtpZGVudGl0eX0gZnJvbSBcIi4vZGVjb21wb3NlXCI7XG5cbnZhciBjc3NOb2RlLFxuICAgIGNzc1Jvb3QsXG4gICAgY3NzVmlldyxcbiAgICBzdmdOb2RlO1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VDc3ModmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSBcIm5vbmVcIikgcmV0dXJuIGlkZW50aXR5O1xuICBpZiAoIWNzc05vZGUpIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiRElWXCIpLCBjc3NSb290ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBjc3NWaWV3ID0gZG9jdW1lbnQuZGVmYXVsdFZpZXc7XG4gIGNzc05vZGUuc3R5bGUudHJhbnNmb3JtID0gdmFsdWU7XG4gIHZhbHVlID0gY3NzVmlldy5nZXRDb21wdXRlZFN0eWxlKGNzc1Jvb3QuYXBwZW5kQ2hpbGQoY3NzTm9kZSksIG51bGwpLmdldFByb3BlcnR5VmFsdWUoXCJ0cmFuc2Zvcm1cIik7XG4gIGNzc1Jvb3QucmVtb3ZlQ2hpbGQoY3NzTm9kZSk7XG4gIHZhbHVlID0gdmFsdWUuc2xpY2UoNywgLTEpLnNwbGl0KFwiLFwiKTtcbiAgcmV0dXJuIGRlY29tcG9zZSgrdmFsdWVbMF0sICt2YWx1ZVsxXSwgK3ZhbHVlWzJdLCArdmFsdWVbM10sICt2YWx1ZVs0XSwgK3ZhbHVlWzVdKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlU3ZnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gaWRlbnRpdHk7XG4gIGlmICghc3ZnTm9kZSkgc3ZnTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiZ1wiKTtcbiAgc3ZnTm9kZS5zZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIiwgdmFsdWUpO1xuICBpZiAoISh2YWx1ZSA9IHN2Z05vZGUudHJhbnNmb3JtLmJhc2VWYWwuY29uc29saWRhdGUoKSkpIHJldHVybiBpZGVudGl0eTtcbiAgdmFsdWUgPSB2YWx1ZS5tYXRyaXg7XG4gIHJldHVybiBkZWNvbXBvc2UodmFsdWUuYSwgdmFsdWUuYiwgdmFsdWUuYywgdmFsdWUuZCwgdmFsdWUuZSwgdmFsdWUuZik7XG59XG4iLCJleHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbVxuICB2YXIgZUxlbiA9IChuQnl0ZXMgKiA4KSAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgbkJpdHMgPSAtN1xuICB2YXIgaSA9IGlzTEUgPyAobkJ5dGVzIC0gMSkgOiAwXG4gIHZhciBkID0gaXNMRSA/IC0xIDogMVxuICB2YXIgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXVxuXG4gIGkgKz0gZFxuXG4gIGUgPSBzICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIHMgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IGVMZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgZSA9IChlICogMjU2KSArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIGUgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IG1MZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IChtICogMjU2KSArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhc1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6ICgocyA/IC0xIDogMSkgKiBJbmZpbml0eSlcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pXG4gICAgZSA9IGUgLSBlQmlhc1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pXG59XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbiAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGNcbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIHJ0ID0gKG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwKVxuICB2YXIgaSA9IGlzTEUgPyAwIDogKG5CeXRlcyAtIDEpXG4gIHZhciBkID0gaXNMRSA/IDEgOiAtMVxuICB2YXIgcyA9IHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCkgPyAxIDogMFxuXG4gIHZhbHVlID0gTWF0aC5hYnModmFsdWUpXG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDBcbiAgICBlID0gZU1heFxuICB9IGVsc2Uge1xuICAgIGUgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGguTE4yKVxuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLVxuICAgICAgYyAqPSAyXG4gICAgfVxuICAgIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgdmFsdWUgKz0gcnQgLyBjXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKVxuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrK1xuICAgICAgYyAvPSAyXG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMFxuICAgICAgZSA9IGVNYXhcbiAgICB9IGVsc2UgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICBtID0gKCh2YWx1ZSAqIGMpIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IGUgKyBlQmlhc1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSAwXG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCkge31cblxuICBlID0gKGUgPDwgbUxlbikgfCBtXG4gIGVMZW4gKz0gbUxlblxuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpIHt9XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4XG59XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoYXJyKSA9PSAnW29iamVjdCBBcnJheV0nO1xufTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsImV4cG9ydCBjb25zdCBjaGFydCA9ICgpID0+IHtcbiAgbGV0IG1hcmdpbiA9IHsgbGVmdDogMTIwLCByaWdodDogMjAsIHRvcDogMTAsIGJvdHRvbTogMTMwIH07XG5cbiAgbGV0IHdpZHRoID0gMTMwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuICBsZXQgaGVpZ2h0ID0gNzAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG5cbiAgbGV0IGcgPSBkM1xuICAgIC5zZWxlY3QoXCIjY2hhcnRcIilcbiAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCArIG1hcmdpbi50b3AgKyBtYXJnaW4uYm90dG9tKVxuICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLCBcIiArIG1hcmdpbi50b3AgKyBcIilcIik7XG5cbiAgLy8gWCBMYWJlbFxuICBnLmFwcGVuZChcInRleHRcIilcbiAgICAuYXR0cihcInlcIiwgaGVpZ2h0ICsgNTApXG4gICAgLmF0dHIoXCJ4XCIsIHdpZHRoIC8gMilcbiAgICAuYXR0cihcImZvbnQtc2l6ZVwiLCBcIjIwcHhcIilcbiAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgLnRleHQoXCJZZWFyXCIpO1xuXG4gIC8vIFkgTGFiZWxcbiAgZy5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgLmF0dHIoXCJ5XCIsIC02MClcbiAgICAuYXR0cihcInhcIiwgLShoZWlnaHQgLyAyKSlcbiAgICAuYXR0cihcImZvbnQtc2l6ZVwiLCBcIjIwcHhcIilcbiAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGUoLTkwKVwiKVxuICAgIC50ZXh0KFwiVG90YWwgQWNxdWlzaXRpb25zLCBVU0RcIik7XG5cbiAgZDMuanNvbihcIi4uL2RhdGEvYWNxdWlzaXRpb25zL29iamVjdC5qc29uXCIpLnRoZW4oZGF0YSA9PiB7XG4gICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcblxuICAgIGRhdGEgPSBkYXRhLnNsaWNlKCkuc29ydCgoYSwgYikgPT4gZDMuYXNjZW5kaW5nKGEueWVhciwgYi55ZWFyKSk7XG5cbiAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xuXG4gICAgZGF0YS5mb3JFYWNoKGQgPT4ge1xuICAgICAgZC5wcmljZSA9ICtkLnByaWNlO1xuICAgICAgLy9jb25zb2xlLmxvZyhkLnByaWNlKTtcbiAgICB9KTtcblxuICAgIGxldCB4ID0gZDNcbiAgICAgIC5zY2FsZUJhbmQoKVxuICAgICAgLmRvbWFpbihcbiAgICAgICAgZGF0YS5tYXAoZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiBkLnllYXI7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAucmFuZ2UoWzAsIHdpZHRoXSlcbiAgICAgIC5wYWRkaW5nKDAuMik7XG5cbiAgICBsZXQgeSA9IGQzXG4gICAgICAuc2NhbGVMaW5lYXIoKVxuICAgICAgLmRvbWFpbihbXG4gICAgICAgIGQzLm1pbihkYXRhLCBkID0+IHtcbiAgICAgICAgICByZXR1cm4gMWU5ICogTWF0aC5mbG9vcihkLnByaWNlIC8gMWU5KTtcbiAgICAgICAgfSksXG4gICAgICAgIGQzLm1heChkYXRhLCBkID0+IHtcbiAgICAgICAgICByZXR1cm4gMWU5ICogTWF0aC5jZWlsKGQucHJpY2UgLyAxZTkpO1xuICAgICAgICB9KVxuICAgICAgXSlcbiAgICAgIC5uaWNlKDcpXG4gICAgICAucmFuZ2UoW2hlaWdodCwgMF0pO1xuXG4gICAgLy8gICB7IHJldHVybiAxZTkqTWF0aC5mbG9vcihkW1wiVGF4IENvbGxlY3Rpb25cIl0vMWU5KTsgfSxcbiAgICAvLyBkMy5tYXgoIGRhdGEsIGZ1bmN0aW9uKGQpeyByZXR1cm4gMWU5Kk1hdGguY2VpbChkW1wiVGF4IENvbGxlY3Rpb25cIl0vMWU5KTsgfVxuXG4gICAgLy8gWCBBeGlzXG4gICAgbGV0IHhBeGlzQ2FsbCA9IGQzLmF4aXNCb3R0b20oeCk7XG4gICAgZy5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwieCBheGlzXCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwLFwiICsgaGVpZ2h0ICsgXCIpXCIpXG4gICAgICAuY2FsbCh4QXhpc0NhbGwpO1xuXG4gICAgLy8gWSBBeGlzXG4gICAgbGV0IHlBeGlzQ2FsbCA9IGQzXG4gICAgICAuYXhpc0xlZnQoeSlcbiAgICAgIC8vIC50aWNrcyg3KVxuICAgICAgLnRpY2tGb3JtYXQoZnVuY3Rpb24oZCkge1xuICAgICAgICBpZiAoZCAhPT0gMCkge1xuICAgICAgICAgIHJldHVybiBcIiRcIiArIGQgLyAxMDAwMDAwMDAwICsgXCJCXCI7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIGcuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInkgYXhpc1wiKVxuICAgICAgLy8gLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCxcIiAtIDUwICsgXCIpXCIpXG4gICAgICAuY2FsbCh5QXhpc0NhbGwpO1xuXG4gICAgbGV0IHJlY3RzID0gZy5zZWxlY3RBbGwoXCJyZWN0XCIpLmRhdGEoZGF0YSk7XG5cbiAgICAvL2NvbnNvbGUubG9nKGhlaWdodCk7XG5cbiAgICByZWN0c1xuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgICAuYXR0cihcInlcIiwgZCA9PiB7XG4gICAgICAgIHJldHVybiB5KGQucHJpY2UpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwieFwiLCBkID0+IHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh4KGQueWVhcikpO1xuICAgICAgICByZXR1cm4geChkLnllYXIpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGQgPT4ge1xuICAgICAgICByZXR1cm4gaGVpZ2h0IC0geShkLnByaWNlKTtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcIndpZHRoXCIsIHguYmFuZHdpZHRoKVxuICAgICAgLmF0dHIoXCJmaWxsXCIsIFwib3JhbmdlXCIpO1xuICB9KTtcbn07XG4iLCJpbXBvcnQgeyBjaGFydCB9IGZyb20gXCIuL2Jhcl9jaGFydFwiO1xuaW1wb3J0IHsgaW50ZXJhY3RpdmVDaGFydCB9IGZyb20gXCIuL2ludGVyYWN0aXZlX2NoYXJ0XCI7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgLy8gY29uc29sZS5sb2coXCJoZWxsbzJcIik7XG4gIGNoYXJ0KCk7XG4gIGludGVyYWN0aXZlQ2hhcnQoKTtcbn0pO1xuIiwiaW1wb3J0IHsgU2xvd0J1ZmZlciB9IGZyb20gXCJidWZmZXJcIjtcbmltcG9ydCB7IHBhcnNlU3ZnIH0gZnJvbSBcImQzLWludGVycG9sYXRlL3NyYy90cmFuc2Zvcm0vcGFyc2VcIjtcblxuZXhwb3J0IGNvbnN0IGludGVyYWN0aXZlQ2hhcnQgPSAoKSA9PiB7XG5cbiAgY29uc29sZS5sb2coXCJnaXRodWIgdGVzdFwiKVxuICBsZXQgbWFyZ2luID0geyBsZWZ0OiA4MCwgcmlnaHQ6IDIwLCB0b3A6IDUwLCBib3R0b206IDEwMCB9O1xuXG4gIGxldCB3aWR0aCA9IDkwMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuICBsZXQgaGVpZ2h0ID0gNzAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG5cbiAgbGV0IGZsYWcgPSB0cnVlO1xuXG4gIHZhciB0ID0gZDMudHJhbnNpdGlvbigpLmR1cmF0aW9uKDc1MCk7XG5cbiAgbGV0IHN2ZyA9IGQzXG4gICAgLnNlbGVjdChcIiNpbnRlclwiKVxuICAgIC5hcHBlbmQoXCJzdmdcIilcbiAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXG4gICAgLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsIFwiICsgbWFyZ2luLnRvcCArIFwiKVwiKTtcblxuICAvLyAgIC8vIFggU2NhbGVcbiAgbGV0IHgwID0gZDNcbiAgICAuc2NhbGVCYW5kKClcbiAgICAucmFuZ2UoWzAsIHdpZHRoXSlcbiAgICAucGFkZGluZygwLjEpO1xuXG4gIGxldCB4MSA9IGQzLnNjYWxlQmFuZCgpO1xuXG4gIGxldCByYXdEYXRhO1xuICBsZXQgdGVzdERhdGE7XG5cbiAgbGV0IGludGVydmFsO1xuICBsZXQgY2xlYW5EYXRhO1xuXG4gIGxldCBiYXJTdGVwID0gMjc7XG5cbiAgbGV0IGJhclBhZGRpbmcgPSAzIC8gYmFyU3RlcDtcblxuICAvLyAgIC8vIFkgU2NhbGVcbiAgbGV0IHkgPSBkM1xuICAgIC5zY2FsZUxpbmVhcigpXG4gICAgLnJhbmdlKFtoZWlnaHQsIDBdKVxuICAgIC5uaWNlKDcpO1xuXG5cblxuICBsZXQgeEF4aXMgPSBkMy5heGlzQm90dG9tKHgwKS50aWNrU2l6ZSgwKTtcblxuICBsZXQgeUF4aXMgPSBkMy5heGlzTGVmdCh5KS50aWNrRm9ybWF0KGZ1bmN0aW9uKGQpIHtcbiAgICBpZiAoZCAhPT0gMCAmJiBkIDwgMTAwMDAwMDAwMCkge1xuICAgICAgcmV0dXJuIFwiJFwiICsgZCAvIDEwMDAwMDAgKyBcIk1cIjtcbiAgICB9IGVsc2UgaWYgKGQgIT09IDApIHtcbiAgICAgIHJldHVybiBcIiRcIiArIGQgLyAxMDAwMDAwMDAwICsgXCJCXCI7XG4gICAgfVxuICB9KTtcblxuICBsZXQgdGlwID0gZDNcbiAgICAudGlwKClcbiAgICAuYXR0cihcImNsYXNzXCIsIFwiZDMtdGlwXCIpXG4gICAgLmRpcmVjdGlvbihcImVcIikgLy8gUG9zaXRpb24gdGhlIHRvb2x0aXAgdG8gdGhlIHJpZ2h0IG9mIGEgdGFyZ2V0IGVsZW1lbnRcbiAgICAub2Zmc2V0KFstMTAsIDBdKVxuICAgIC5odG1sKGZ1bmN0aW9uKGQpIHtcbiAgICAgIGxldCB0ZXh0ID1cbiAgICAgICAgXCI8c3Ryb25nPkNvbXBhbnk6PC9zdHJvbmc+IDxzcGFuIHN0eWxlPSdjb2xvcjpyZWQnPlwiICtcbiAgICAgICAgZC5jb21wYW55ICtcbiAgICAgICAgXCI8L3NwYW4+PGJyPlwiO1xuICAgICAgdGV4dCArPVxuICAgICAgICBcIjxzdHJvbmc+U2VjdG9yOjwvc3Ryb25nPiA8c3BhbiBzdHlsZT0nY29sb3I6cmVkO3RleHQtdHJhbnNmb3JtOmNhcGl0YWxpemUnPlwiICtcbiAgICAgICAgZC5zZWN0b3IgK1xuICAgICAgICBcIjwvc3Bhbj48YnI+XCI7XG4gICAgICB0ZXh0ICs9XG4gICAgICAgIFwiPHN0cm9uZz5Sb3VuZDo8L3N0cm9uZz4gPHNwYW4gc3R5bGU9J2NvbG9yOnJlZCc+XCIgK1xuICAgICAgICBkLnJvdW5kICtcbiAgICAgICAgXCI8L3NwYW4+PGJyPlwiO1xuICAgICAgdGV4dCArPVxuICAgICAgICBcIjxzdHJvbmc+QW1vdW50IFJhaXNlZDo8L3N0cm9uZz4gPHNwYW4gc3R5bGU9J2NvbG9yOnJlZCc+XCIgK1xuICAgICAgICBkMy5mb3JtYXQoXCIkLC4wZlwiKShkLmFtb3VudFJhaXNlZCkgK1xuICAgICAgICBcIjwvc3Bhbj48YnI+XCI7XG4gICAgICByZXR1cm4gdGV4dDtcbiAgICB9KTtcblxuICBsZXQgdGltZUxhYmVsID0gc3ZnXG4gICAgLmFwcGVuZChcInRleHRcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIFwibGFiZWxcIilcbiAgICAuYXR0cihcInlcIiwgaGVpZ2h0ICsgNTApXG4gICAgLmF0dHIoXCJ4XCIsIHdpZHRoIC0gNDApXG4gICAgLy8gLmF0dHIoXCJmb250LXNpemVcIiwgXCI0MHB4XCIpXG4gICAgLy8gLmF0dHIoXCJvcGFjaXR5XCIsIFwiMC40XCIpXG4gICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgIC50ZXh0KFwiMjAwMFwiKTtcblxuICBsZXQgc2VjdG9ycyA9IFtcIm1vYmlsZVwiLCBcInNvZnR3YXJlXCIsIFwid2ViXCIsIFwiZWNvbW1lcmNlXCIsIFwibWVkaWNhbFwiXTtcbiAgbGV0IHJvdW5kcyA9IFtcInNlcmllcy1hXCIsIFwic2VyaWVzLWJcIiwgXCJhbmdlbFwiLCBcInNlcmllcy1jK1wiLCBcInZlbnR1cmVcIl07XG5cbiAgeDAuZG9tYWluKHJvdW5kcyk7XG4gIHgxLmRvbWFpbihzZWN0b3JzKS5yYW5nZVJvdW5kKFswLCB4MC5iYW5kd2lkdGgoKV0pO1xuXG4gIHgwLmludmVydCA9IGZ1bmN0aW9uKHgpIHtcbiAgICB2YXIgZG9tYWluID0geDAuZG9tYWluKCk7XG4gICAgdmFyIHJhbmdlID0geDAucmFuZ2UoKTtcbiAgICB2YXIgc2NhbGUgPSBkM1xuICAgICAgLnNjYWxlUXVhbnRpemUoKVxuICAgICAgLnJhbmdlKGRvbWFpbilcbiAgICAgIC5kb21haW4ocmFuZ2UpO1xuICAgIHJldHVybiBzY2FsZSh4KTtcbiAgfTtcblxuICBzdmdcbiAgICAuYXBwZW5kKFwiZ1wiKVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ5IGF4aXNcIilcbiAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcbiAgLy8uY2FsbCh5QXhpcyk7XG5cbiAgc3ZnXG4gICAgLmFwcGVuZChcInRleHRcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIFwibGFiZWxcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInJvdGF0ZSgtOTApXCIpXG4gICAgLmF0dHIoXCJ5XCIsIDYpXG4gICAgLmF0dHIoXCJkeVwiLCBcIi43MWVtXCIpXG4gICAgLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJlbmRcIilcbiAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcImJvbGRcIilcbiAgICAudGV4dChcIlZhbHVlXCIpO1xuXG4gIC8vIHZhciB4QXhpc0dyb3VwID0gZ1xuICAvLyAgICAgLmFwcGVuZChcImdcIilcbiAgLy8gICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ4IGF4aXNcIilcbiAgLy8gICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsXCIgKyBoZWlnaHQgKyBcIilcIik7XG5cbiAgLy8gICB2YXIgeUF4aXNHcm91cCA9IGcuYXBwZW5kKFwiZ1wiKS5hdHRyKFwiY2xhc3NcIiwgXCJ5IGF4aXNcIik7XG5cbiAgLy8gdmFyIGNvbG9yID0gZDMuc2NhbGVcbiAgLy8gICAub3JkaW5hbCgpXG4gIC8vICAgLnJhbmdlKFtcIiNjYTAwMjBcIiwgXCIjZjRhNTgyXCIsIFwiI2Q1ZDVkNVwiLCBcIiM5MmM1ZGVcIiwgXCIjMDU3MWIwXCJdKTtcblxuICB2YXIgY29sb3IgPSBkMy5zY2FsZU9yZGluYWwoZDMuc2NoZW1lU2V0MSk7XG5cbiAgbGV0IHRpbWUgPSAwO1xuXG4gIGxldCB4MyA9IGQzLnNjYWxlTGluZWFyKCkucmFuZ2UoW21hcmdpbi5sZWZ0LCB3aWR0aCAtIG1hcmdpbi5yaWdodF0pO1xuXG4gIGxldCB4QXhpczIgPSBnID0+XG4gICAgZ1xuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcIngtYXhpc1wiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgwICwke21hcmdpbi50b3B9KWApXG4gICAgICAuY2FsbChkMy5heGlzVG9wKHgzKS50aWNrcyh3aWR0aCAvIDE1MCwgXCJzXCIpKVxuICAgICAgLmNhbGwoZyA9PiAoZy5zZWxlY3Rpb24gPyBnLnNlbGVjdGlvbigpIDogZykuc2VsZWN0KFwiLmRvbWFpblwiKS5yZW1vdmUoKSk7XG5cbiAgbGV0IHlBeGlzMiA9IGcgPT5cbiAgICBnXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwieS1heGlzXCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKCR7bWFyZ2luLmxlZnQgKyAwLjV9LDApYClcbiAgICAgIC5jYWxsKGcgPT5cbiAgICAgICAgZ1xuICAgICAgICAgIC5hcHBlbmQoXCJsaW5lXCIpXG4gICAgICAgICAgLmF0dHIoXCJzdHJva2VcIiwgXCJjdXJyZW50Q29sb3JcIilcbiAgICAgICAgICAuYXR0cihcInkxXCIsIG1hcmdpbi50b3ApXG4gICAgICAgICAgLmF0dHIoXCJ5MlwiLCBoZWlnaHQgLSBtYXJnaW4uYm90dG9tIC0gNTApXG4gICAgICApO1xuXG4gICAgICBkMy5qc29uKFwiLi4vZGF0YS9mdW5kaW5nL3Rlc3RfZGF0YS5qc29uXCIpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICB0ZXN0RGF0YSA9IGRhdGFcbiAgICAgIH0pXG5cbiAgZDMuanNvbihcIi4uL2RhdGEvZnVuZGluZy9jbGVhbl9uZXdfZnVuZGluZy5qc29uXCIpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICAvLyByYXdEYXRhID0gZGF0YTtcblxuICAgIC8vIGNsZWFuRGF0YSA9IGQzXG4gICAgLy8gICAubmVzdCgpXG4gICAgLy8gICAvLyAgICAgLy8gLmtleShmdW5jdGlvbihkKSB7XG4gICAgLy8gICAvLyAgICAgLy8gICByZXR1cm4gZC5mdW5kZWQ7XG4gICAgLy8gICAvLyAgICAgLy8gfSlcbiAgICAvLyAgIC5rZXkoZnVuY3Rpb24oZCkge1xuICAgIC8vICAgICByZXR1cm4gZC5mdW5kZWQ7XG4gICAgLy8gICB9KVxuICAgIC8vICAgLnNvcnRLZXlzKGQzLmFzY2VuZGluZylcbiAgICAvLyAgIC5rZXkoZnVuY3Rpb24oZCkge1xuICAgIC8vICAgICByZXR1cm4gZC5yb3VuZDtcbiAgICAvLyAgIH0pXG4gICAgLy8gICAua2V5KGZ1bmN0aW9uKGQpIHtcbiAgICAvLyAgICAgcmV0dXJuIGQuc2VjdG9yO1xuICAgIC8vICAgfSlcbiAgICAvLyAgIC5yb2xsdXAoZnVuY3Rpb24odikge1xuICAgIC8vICAgICByZXR1cm4gZDMuc3VtKHYsIGZ1bmN0aW9uKGQpIHtcbiAgICAvLyAgICAgICByZXR1cm4gZC5hbW91bnRSYWlzZWQ7XG4gICAgLy8gICAgIH0pO1xuICAgIC8vICAgfSlcbiAgICAvLyAgIC5lbnRyaWVzKHJhd0RhdGEpO1xuXG4gICAgY2xlYW5EYXRhID0gZGF0YTtcblxuICAgICAgXG5cbiAgICBcblxuICAgIGNvbnNvbGUubG9nKHRlc3REYXRhKTtcblxuICAgIC8vIHZhciByb3VuZHMgPSBjbGVhbkRhdGEubWFwKGZ1bmN0aW9uKGQpIHtcbiAgICAvLyAgIHJldHVybiBkLnZhbHVlc1xuICAgIC8vICAgICAuZmlsdGVyKGVsZSA9PiB7XG4gICAgLy8gICAgICAgaWYgKGVsZS5rZXkpIHJldHVybiBlbGUua2V5O1xuICAgIC8vICAgICB9KVxuICAgIC8vICAgICAubWFwKGVsZTIgPT4ge1xuICAgIC8vICAgICAgIHJldHVybiBlbGUyLmtleTtcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfSk7XG5cbiAgICBsZXQgZWxlbWVudHMgPSBjbGVhbkRhdGFbMF0udmFsdWVzLm1hcChlbGUgPT4ge1xuICAgICAgcmV0dXJuIGVsZTtcbiAgICB9KTtcblxuICAgIC8vIHgxLmRvbWFpbihzZWN0b3JzKS5yYW5nZVJvdW5kKFswLCB4MC5iYW5kd2lkdGgoKV0pO1xuXG4gICAgLy8geDEuZG9tYWluKFxuICAgIC8vICAgY2xlYW5EYXRhWzBdLnZhbHVlc1swXS52YWx1ZXMubWFwKGVsZSA9PiB7XG4gICAgLy8gICAgIHJldHVybiBlbGUua2V5O1xuICAgIC8vICAgfSlcbiAgICAvLyApLnJhbmdlUm91bmQoWzAsIHgwLmJhbmR3aWR0aCgpXSk7XG5cbiAgICAvLyB5LmRvbWFpbihbXG4gICAgLy8gICAwLFxuICAgIC8vICAgZDMubWF4KGNsZWFuRGF0YVswXS52YWx1ZXMsIGZ1bmN0aW9uKHJvdW5kcykge1xuICAgIC8vICAgICByZXR1cm4gZDMubWF4KHJvdW5kcy52YWx1ZXMsIGZ1bmN0aW9uKGQpIHtcbiAgICAvLyAgICAgICByZXR1cm4gZC52YWx1ZTtcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gICB9KVxuICAgIC8vIF0pO1xuXG4gICAgc3ZnXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInggYXhpc1wiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCxcIiArIGhlaWdodCArIFwiKVwiKVxuICAgICAgLmNhbGwoeEF4aXMpO1xuXG4gICAgLy8gZDMuaW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgLy8gICAvLyBBdCB0aGUgZW5kIG9mIG91ciBkYXRhLCBsb29wIGJhY2tcbiAgICAvLyAgIHRpbWUgPSB0aW1lIDwgMTQgPyB0aW1lICsgMSA6IDA7XG4gICAgLy8gICB1cGRhdGUoY2xlYW5EYXRhW3RpbWVdKTtcbiAgICAvLyB9LCA1MDAwKTtcblxuICAgIC8vIEZpcnN0IHJ1biBvZiB0aGUgdmlzdWFsaXphdGlvblxuICAgIHVwZGF0ZShjbGVhbkRhdGFbMF0pO1xuICB9KTtcblxuICAvLyBsZXQgYnV0dG9uID0gZDMuc2VsZWN0KFwiI3BsYXktYnV0dG9uXCIpO1xuICAvLyBjb25zb2xlLmxvZyhidXR0b24pO1xuXG4gICQoXCIjcGxheS1idXR0b25cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgYnV0dG9uID0gJCh0aGlzKTtcbiAgICBpZiAoYnV0dG9uLnRleHQoKSA9PSBcIlBsYXlcIikge1xuICAgICAgYnV0dG9uLnRleHQoXCJQYXVzZVwiKTtcbiAgICAgIGludGVydmFsID0gc2V0SW50ZXJ2YWwoc3RlcCwgMzAwMCk7XG4gICAgICBzdGVwKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1dHRvbi50ZXh0KFwiUGxheVwiKTtcbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIH1cbiAgfSk7XG5cbiAgJChcIiNyZXNldC1idXR0b25cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICB0aW1lID0gMDtcbiAgICB1cGRhdGUoY2xlYW5EYXRhWzBdKTtcbiAgfSk7XG5cbiAgJChcIiNpbmR1c3RyeS1zZWxlY3RcIikub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XG4gICAgdXBkYXRlKGNsZWFuRGF0YVt0aW1lXSk7XG4gIH0pO1xuXG4gICQoXCIjZGF0ZS1zbGlkZXJcIikuc2xpZGVyKHtcbiAgICBtYXg6IDIwMTMsXG4gICAgbWluOiAyMDAwLFxuICAgIHN0ZXA6IDEsXG4gICAgYW5pbWF0ZTogXCJzbG93XCIsXG4gICAgc2xpZGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuICAgICAgdGltZSA9IHVpLnZhbHVlIC0gMjAwMDtcbiAgICAgIHVwZGF0ZShjbGVhbkRhdGFbdGltZV0pO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gc3RlcCgpIHtcbiAgICAvLyBBdCB0aGUgZW5kIG9mIG91ciBkYXRhLCBsb29wIGJhY2tcbiAgICB0aW1lID0gdGltZSA8IDE0ID8gdGltZSArIDEgOiAwO1xuICAgIHVwZGF0ZShjbGVhbkRhdGFbdGltZV0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKGRhdGEpIHtcbiAgICBsZXQgZWxlbWVudHMgPSBkYXRhLnZhbHVlcy5tYXAoZWxlID0+IHtcbiAgICAgIHJldHVybiBlbGU7XG4gICAgfSk7XG5cbiAgICAvLyBkYXRhID0gZGF0YS5zbGljZSgpLmFycmF5LmZvckVhY2goZWxlbWVudCA9PiB7fSk7XG5cbiAgICB5LmRvbWFpbihbXG4gICAgICAwLFxuICAgICAgZDMubWF4KGRhdGEudmFsdWVzLCBmdW5jdGlvbihyb3VuZHMpIHtcbiAgICAgICAgcmV0dXJuIGQzLm1heChyb3VuZHMudmFsdWVzLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIGQudmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICBdKTtcblxuICAgIC8vLmNhbGwoeUF4aXMpO1xuXG4gICAgbGV0IHNsaWNlMiA9IHN2Z1xuICAgICAgLnNlbGVjdEFsbChcIi5zbGljZVwiKVxuICAgICAgLmRhdGEoZGF0YS52YWx1ZXMpXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJnXCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBcInRyYW5zbGF0ZShcIiArIHgwKGQua2V5KSArIFwiLDApXCI7XG4gICAgICB9KTtcblxuICAgIGxldCByZWN0cyA9IHNsaWNlMi5zZWxlY3RBbGwoXCJyZWN0XCIpLmRhdGEoZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIGQudmFsdWVzLmZpbHRlcihmdW5jdGlvbihkKSB7XG4gICAgICAgIGlmIChkMy5zZWxlY3QoXCIjaW5kdXN0cnktc2VsZWN0XCIpLm5vZGUoKS52YWx1ZSA9PSBcImFsbFwiKSB7XG4gICAgICAgICAgcmV0dXJuIGQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGQua2V5ID09IGQzLnNlbGVjdChcIiNpbmR1c3RyeS1zZWxlY3RcIikubm9kZSgpLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHN2Z1xuICAgICAgLnNlbGVjdEFsbChcInJlY3RcIilcbiAgICAgIC50cmFuc2l0aW9uKHQpXG4gICAgICAuZGVsYXkoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIDUwO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIHkoMCk7XG4gICAgICB9KVxuICAgICAgLnJlbW92ZSgpO1xuXG4gICAgY29uc29sZS5sb2cocmVjdHMpO1xuXG4gICAgcmVjdHNcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgLy8gLmF0dHIoXCJjbGFzc1wiLCBcImVudGVyXCIpXG4gICAgICAuYXR0cihcIndpZHRoXCIsIHgxLmJhbmR3aWR0aClcbiAgICAgIC5hdHRyKFwieFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coeDEoZC5rZXkpLCBkLmtleSk7XG4gICAgICAgIHJldHVybiB4MShkLmtleSk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJkYXRhLWxlZ2VuZFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBkLmtleTtcbiAgICAgIH0pXG4gICAgICAuc3R5bGUoXCJmaWxsXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGNvbG9yKGQua2V5KTtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4geSgwKTtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSlcbiAgICAgIC5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgbGV0IHJvdW5kID0geDAuaW52ZXJ0KFxuICAgICAgICAgIHBhcnNlU3ZnKGQzLnNlbGVjdCh0aGlzLnBhcmVudE5vZGUpLmF0dHIoXCJ0cmFuc2Zvcm1cIikpLnRyYW5zbGF0ZVhcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBkMy5zZWxlY3QoXCJnXCIpLlxuICAgICAgICAvLyB0cmFuc2l0aW9uKHQpLnJlbW92ZSgpO1xuICAgICAgICBkcmlsbERvd24oZCwgc2xpY2UyLCByb3VuZCk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICBkMy5zZWxlY3QodGhpcykuc3R5bGUoXCJmaWxsXCIsIGQzLnJnYihjb2xvcihkLmtleSkpLmRhcmtlcigyKSk7XG4gICAgICB9KVxuICAgICAgLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICBkMy5zZWxlY3QodGhpcykuc3R5bGUoXCJmaWxsXCIsIGNvbG9yKGQua2V5KSk7XG4gICAgICB9KVxuICAgICAgLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgaWYgKGQzLnNlbGVjdChcIiNwbGF5LWJ1dHRvblwiKS50ZXh0KCkgPT09IFwiUGxheVwiKSB7XG4gICAgICAgICAgZDMuc2VsZWN0QWxsKFwicmVjdFwiKVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDEwMClcbiAgICAgICAgICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgIHJldHVybiB5KGQudmFsdWUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhlaWdodCAtIHkoZC52YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgLy8ubWVyZ2UocmVjdHMpXG4gICAgICAudHJhbnNpdGlvbih0KVxuICAgICAgLmRlbGF5KGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAxMDAwO1xuICAgICAgfSlcbiAgICAgIC8vLmR1cmF0aW9uKDUwMClcbiAgICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiB5KGQudmFsdWUpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGhlaWdodCAtIHkoZC52YWx1ZSk7XG4gICAgICB9KTtcblxuICAgIGxldCByZWN0czIgPSBzbGljZTIuc2VsZWN0QWxsKFwicmVjdFwiKTtcbiAgICBsZXQgYnV0dG9uMiA9IGQzLnNlbGVjdChcIiNwbGF5LWJ1dHRvblwiKTtcblxuICAgIHN2Z1xuICAgICAgLnNlbGVjdEFsbChcImcueS5heGlzXCIpXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgIC5kZWxheSgzMDApXG4gICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKVxuICAgICAgLmNhbGwoeUF4aXMpO1xuICAgIHN2Zy5zZWxlY3RBbGwoXCJnLmxlZ2VuZFwiKS5yZW1vdmUoKTtcblxuICAgIGRyYXdMZWdlbmQuY2FsbCh0aGlzKTtcblxuICAgIC8vIGQzLnNlbGVjdEFsbChcIi55XCIpXG4gICAgLy8gICAudHJhbnNpdGlvbigpXG4gICAgLy8gICAuZHVyYXRpb24oMTAwMClcbiAgICAvLyAgIC5kZWxheSgzMDApXG4gICAgLy8gICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKTtcblxuICAgIHRpbWVMYWJlbC50ZXh0KCsodGltZSArIDIwMDApKTtcblxuICAgICQoXCIjeWVhclwiKVswXS5pbm5lckhUTUwgPSArKHRpbWUgKyAyMDAwKTtcblxuICAgICQoXCIjZGF0ZS1zbGlkZXJcIikuc2xpZGVyKFwidmFsdWVcIiwgKyh0aW1lICsgMjAwMCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZHJhd0xlZ2VuZCgpIHtcbiAgICBjb25zdCBsZWdlbmQgPSBkM1xuICAgICAgLnNlbGVjdChcImdcIilcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIixcbiAgICAgICAgXCJ0cmFuc2xhdGUoXCIgK1xuICAgICAgICAgIChtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodCArIDYwKSArXG4gICAgICAgICAgXCIsXCIgK1xuICAgICAgICAgIChoZWlnaHQgKyAzMCkgK1xuICAgICAgICAgIFwiKVwiXG4gICAgICApXG4gICAgICAuc2VsZWN0QWxsKFwiZ1wiKVxuICAgICAgLmRhdGEoc2VjdG9ycylcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImxlZ2VuZFwiKTtcblxuICAgIGxlZ2VuZFxuICAgICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAgIC5hdHRyKFwiZmlsbFwiLCAoZCwgaSkgPT4gY29sb3IoZCkpIC8vICAgY29uc3QgY29sb3IgPSBkMy5zY2FsZU9yZGluYWwoZDMuc2NoZW1lQ2F0ZWdvcnkxMCk7XG4gICAgICAuYXR0cihcImhlaWdodFwiLCAxNSlcbiAgICAgIC5hdHRyKFwid2lkdGhcIiwgMTUpO1xuXG4gICAgbGVnZW5kXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLmF0dHIoXCJ4XCIsIDE4KVxuICAgICAgLmF0dHIoXCJ5XCIsIDEwKVxuICAgICAgLmF0dHIoXCJkeVwiLCBcIi4xNWVtXCIpXG4gICAgICAudGV4dCgoZCwgaSkgPT4gZClcbiAgICAgIC5zdHlsZShcInRleHQtYW5jaG9yXCIsIFwic3RhcnRcIilcbiAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCAxMik7XG5cbiAgICAvLyBOb3cgc3BhY2UgdGhlIGdyb3VwcyBvdXQgYWZ0ZXIgdGhleSBoYXZlIGJlZW4gYXBwZW5kZWQ6XG4gICAgY29uc3QgcGFkZGluZyA9IDEwO1xuICAgIGxlZ2VuZC5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIFwidHJhbnNsYXRlKFwiICtcbiAgICAgICAgKGQzLnN1bShzZWN0b3JzLCBmdW5jdGlvbihlLCBqKSB7XG4gICAgICAgICAgaWYgKGogPCBpKSB7XG4gICAgICAgICAgICByZXR1cm4gbGVnZW5kLm5vZGVzKClbal0uZ2V0QkJveCgpLndpZHRoO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pICtcbiAgICAgICAgICBwYWRkaW5nICogaSkgK1xuICAgICAgICBcIiwwKVwiXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gYmFyKHN2ZzIsIGRvd24sIGRhdGEsIHNlbGVjdG9yKSB7XG4gICAgY29uc3QgZyA9IHN2ZzJcbiAgICAgIC5pbnNlcnQoXCJnXCIsIHNlbGVjdG9yKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImVudGVyXCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKDAsJHs1MCArIGJhclN0ZXAgKiBiYXJQYWRkaW5nfSlgKVxuICAgICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcImVuZFwiKVxuICAgICAgLnN0eWxlKFwiZm9udFwiLCBcIjE4cHggc2Fucy1zZXJpZlwiKTtcblxuICAgIGNvbnN0IGJhciA9IGdcbiAgICAgIC5zZWxlY3RBbGwoXCJnXCIpXG4gICAgICAuZGF0YShkYXRhKVxuICAgICAgLmpvaW4oXCJnXCIpXG4gICAgICAuYXR0cihcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgIC8vICAub24oXCJjbGlja1wiLCBkID0+IHVwZGF0ZShjbGVhbkRhdGFbdGltZV0pKVxuICAgICAgLm9uKFwibW91c2VvdmVyXCIsIHRpcC5zaG93KVxuICAgICAgLm9uKFwibW91c2VvdXRcIiwgdGlwLmhpZGUpO1xuXG4gICAgYmFyXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLmF0dHIoXCJ4XCIsIDgwIC0gMilcbiAgICAgIC5hdHRyKFwieVwiLCAoMjcgKiAoMSAtIDAuMSkpIC8gMilcbiAgICAgIC5hdHRyKFwiZHlcIiwgXCIuMzVlbVwiKVxuICAgICAgLnRleHQoZCA9PiBkLmNvbXBhbnkpO1xuXG4gICAgYmFyXG4gICAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgLmF0dHIoXCJ4XCIsIHgzKDApKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImJhclwiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHgzKDApKTtcbiAgICAgICAgcmV0dXJuIHgzKGQuYW1vdW50UmFpc2VkKSAtIHgzKDApO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIDI3ICogKDEgLSAwLjMpKTtcblxuICAgIHJldHVybiBnO1xuICB9XG5cbiAgZnVuY3Rpb24gZHJpbGxEb3duKGQsIHNsaWNlLCByb3VuZCkge1xuICAgIGxldCB1bnNvcnRlZERhdGEgPSB0ZXN0RGF0YVt0aW1lXTtcbiAgICBjb25zdCBkdXJhdGlvbiA9IDcwMDtcbiAgICBjb25zdCB0cmFuc2l0aW9uMSA9IGQzLnRyYW5zaXRpb24oKS5kdXJhdGlvbihkdXJhdGlvbik7XG4gICAgY29uc3QgdHJhbnNpdGlvbjIgPSB0cmFuc2l0aW9uMS50cmFuc2l0aW9uKCk7XG5cbiAgICBjb25zb2xlLmxvZyh1bnNvcnRlZERhdGEpO1xuICAgIGNvbnNvbGUubG9nKGQpO1xuICAgIGNvbnNvbGUubG9nKHJvdW5kKTtcbiAgICBjb25zb2xlLmxvZyh0ZXN0RGF0YSk7XG5cbiAgICBsZXQgYWIgPSB0ZXN0RGF0YS5tYXAoZWxlID0+IE9iamVjdC52YWx1ZXMoZWxlKSk7XG5cbiAgICBsZXQgbmV3RGF0YSA9IHVuc29ydGVkRGF0YS52YWx1ZXMuZmlsdGVyKGVsZSA9PiB7XG4gICAgICBpZiAoZWxlLmtleSA9PT0gZC5rZXkpIHtcbiAgICAgICAgcmV0dXJuIGVsZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBuZXdEYXRhMiA9IG5ld0RhdGFbMF0udmFsdWVzLmZpbHRlcihlbGUgPT4ge1xuICAgICAgaWYgKGVsZS5yb3VuZCA9PT0gcm91bmQpIHtcbiAgICAgICAgcmV0dXJuIGVsZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBuZXdEYXRhMyA9IG5ld0RhdGEyXG4gICAgICAuc2xpY2UoKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IGQzLmRlc2NlbmRpbmcoYS5hbW91bnRSYWlzZWQsIGIuYW1vdW50UmFpc2VkKSlcbiAgICAgIC5zbGljZSgwLCAxMCk7XG5cbiAgICBsZXQgbGluZUNoYXJ0RGF0YSA9IGdldERhdGEoZCwgcm91bmQpO1xuXG4gICAgY29uc29sZS5sb2cobGluZUNoYXJ0RGF0YSk7XG5cbiAgICBjb25zb2xlLmxvZyhuZXdEYXRhMyk7XG5cbiAgICBjb25zb2xlLmxvZyhuZXdEYXRhMik7XG5cbiAgICAvLyBsZXQgcmVjdHMgPSBnLnNlbGVjdEFsbChcInJlY3RcIikuZGF0YShuZXdEYXRhKTtcbiAgICBsZXQgZGF0YSA9IG5ld0RhdGEzO1xuXG4gICAgZDMuc2VsZWN0QWxsKFwic3ZnXCIpLnJlbW92ZSgpO1xuXG4gICAgZDMuc2VsZWN0KFwiI3BsYXktYnV0dG9uXCIpLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIik7XG4gICAgZDMuc2VsZWN0KFwiI3Jlc2V0LWJ1dHRvblwiKS5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xuICAgIGQzLnNlbGVjdChcIiNzbGlkZXItZGl2XCIpLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIik7XG4gICAgZDMuc2VsZWN0KFwiI2luZHVzdHJ5LXNlbGVjdFwiKS5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xuICAgIGQzLnNlbGVjdChcIiN5ZWFyXCIpLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIik7XG4gICAgZDMuc2VsZWN0QWxsKFwidGV4dFwiKS5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xuXG4gICAgLy8gZy5zZWxlY3RBbGwoXCJnLnguYXhpc1wiKS5yZW1vdmUoKTtcbiAgICAvLyBzbGljZS5yZW1vdmUoKTtcblxuICAgIGNvbnN0IHN2ZzIgPSBkM1xuICAgICAgLnNlbGVjdChcIiNkcmlsbGRvd25cIilcbiAgICAgIC5hcHBlbmQoXCJzdmdcIilcbiAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGggKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodClcbiAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCArIG1hcmdpbi50b3AgKyBtYXJnaW4uYm90dG9tKVxuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgbWFyZ2luLmxlZnQgKyBcIiwgXCIgKyBtYXJnaW4udG9wICsgXCIpXCIpO1xuXG4gICAgc3ZnMi5jYWxsKHRpcCk7XG5cbiAgICB4My5kb21haW4oWzAsIGRhdGFbMF0uYW1vdW50UmFpc2VkXSk7XG4gICAgY29uc29sZS5sb2coeDMuZG9tYWluKCkpO1xuXG4gICAgc3ZnMlxuICAgICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJiYWNrZ3JvdW5kXCIpXG4gICAgICAuYXR0cihcImZpbGxcIiwgXCJub25lXCIpXG4gICAgICAuYXR0cihcInBvaW50ZXItZXZlbnRzXCIsIFwiYWxsXCIpXG4gICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuICAgICAgLmF0dHIoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAub24oXCJkYmxjbGlja1wiLCBkID0+IHtcbiAgICAgICAgZDMuZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmVzdG9yZShkKTtcbiAgICAgIH0pO1xuICAgIC8vIC5vbihcImNsaWNrXCIsIGQgPT4gdXAoc3ZnLCBkKSk7XG5cbiAgICBzdmcyLmFwcGVuZChcImdcIikuY2FsbCh4QXhpczIpO1xuXG4gICAgc3ZnMi5hcHBlbmQoXCJnXCIpLmNhbGwoeUF4aXMyKTtcblxuICAgIGxldCBwbGFjZWhvbGRlciA9IGQua2V5O1xuXG4gICAgc3ZnMlxuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ0aXRsZVwiKVxuICAgICAgLmF0dHIoXCJ4XCIsIHdpZHRoIC8gMilcbiAgICAgIC5hdHRyKFwieVwiLCAtMTApXG4gICAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgICAudGV4dChcbiAgICAgICAgZCA9PlxuICAgICAgICAgIGBMYXJnZXN0ICR7cm91bmR9IHJvdW5kcyBpbiB0aGUgJHtwbGFjZWhvbGRlcn0gaW51ZHN0cnkgaW4gJHt0aW1lICtcbiAgICAgICAgICAgIDIwMDB9YFxuICAgICAgKTtcblxuICAgIC8vIHN2ZzIuY2FsbCh0aXApXG5cbiAgICAvLyAub24oXCJjbGlja1wiLCBkID0+IHVwKHN2ZywgZCkpO1xuXG4gICAgY29uc3QgZW50ZXIgPSBiYXIoc3ZnMiwgZHJpbGxEb3duLCBkYXRhLCBcIi55LWF4aXNcIikuYXR0cihcImZpbGwtb3BhY2l0eVwiLCAwKTtcbiAgICBjb25zb2xlLmxvZyhlbnRlcik7XG4gICAgZW50ZXIudHJhbnNpdGlvbih0cmFuc2l0aW9uMSkuYXR0cihcImZpbGwtb3BhY2l0eVwiLCAxKTtcblxuICAgIC8vIFRyYW5zaXRpb24gZW50ZXJpbmcgYmFycyB0byB0aGVpciBuZXcgeS1wb3NpdGlvbi5cbiAgICBlbnRlclxuICAgICAgLnNlbGVjdEFsbChcImdcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIHN0YWNrKGQuaW5kZXgpKVxuICAgICAgLnRyYW5zaXRpb24odHJhbnNpdGlvbjEpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBzdGFnZ2VyKCkpO1xuXG4gICAgLy8gVXBkYXRlIHRoZSB4LXNjYWxlIGRvbWFpbi5cblxuICAgIC8vIFVwZGF0ZSB0aGUgeC1heGlzLlxuICAgIHN2ZzJcbiAgICAgIC5zZWxlY3RBbGwoXCIueC1heGlzXCIpXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuY2FsbCh4QXhpczIpO1xuXG4gICAgLy8gVHJhbnNpdGlvbiBlbnRlcmluZyBiYXJzIHRvIHRoZSBuZXcgeC1zY2FsZS5cbiAgICBlbnRlclxuICAgICAgLnNlbGVjdEFsbChcImdcIilcbiAgICAgIC50cmFuc2l0aW9uKHRyYW5zaXRpb24yKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgKGQsIGkpID0+IGB0cmFuc2xhdGUoMCwke2JhclN0ZXAgKiBpfSlgKTtcblxuICAgIC8vIENvbG9yIHRoZSBiYXJzIGFzIHBhcmVudHM7IHRoZXkgd2lsbCBmYWRlIHRvIGNoaWxkcmVuIGlmIGFwcHJvcHJpYXRlLlxuICAgIGVudGVyXG4gICAgICAuc2VsZWN0QWxsKFwicmVjdFwiKVxuICAgICAgLnRyYW5zaXRpb24odClcbiAgICAgIC5hdHRyKFwiZmlsbFwiLCBkID0+IGNvbG9yKGQuc2VjdG9yKSlcbiAgICAgIC5hdHRyKFwiZmlsbC1vcGFjaXR5XCIsIDEpXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuYXR0cihcImZpbGxcIiwgZCA9PiBjb2xvcihkLnNlY3RvcikpXG4gICAgICAuYXR0cihcIndpZHRoXCIsIGQgPT4geDMoZC5hbW91bnRSYWlzZWQpKTtcblxuICAgIGJ1aWxkTGluZUNoYXJ0KGxpbmVDaGFydERhdGEsIHBsYWNlaG9sZGVyLCByb3VuZCk7XG5cbiAgICAvLyBkMy5zZWxlY3RBbGwoXCJzdmdcIilcbiAgICAvLyAgIC5hdHRyKFwiY2xhc3NcIiwgXCJiYWNrZ3JvdW5kXCIpXG4gICAgLy8gICAvLyAuYXR0cihcImZpbGxcIiwgXCJub25lXCIpXG4gICAgLy8gICAuYXR0cihcInBvaW50ZXItZXZlbnRzXCIsIFwiYWxsXCIpXG4gICAgLy8gICAvLyAuYXR0cihcIndpZHRoXCIsIHdpZHRoICsgbWFyZ2luLnJpZ2h0ICsgbWFyZ2luLmxlZnQpXG4gICAgLy8gICAvLyAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG4gICAgLy8gICAuYXR0cihcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAvLyAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKC0yNTAsIC0zMClcIilcbiAgICAvLyAgIC5vbihcImRibGNsaWNrXCIsIGQgPT4ge1xuICAgIC8vICAgICBkMy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vICAgICByZXN0b3JlKGQpO1xuICAgIC8vICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFjayhpKSB7XG4gICAgbGV0IHZhbHVlID0gMDtcbiAgICByZXR1cm4gZCA9PiB7XG4gICAgICBjb25zdCB0ID0gYHRyYW5zbGF0ZSgke3gzKHZhbHVlKX0sJHtiYXJTdGVwICogaX0pYDtcbiAgICAgIHZhbHVlICs9IGQuYW1vdW50UmFpc2VkO1xuICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YWdnZXIoKSB7XG4gICAgbGV0IHZhbHVlID0gMDtcbiAgICByZXR1cm4gKGQsIGkpID0+IHtcbiAgICAgIGNvbnN0IHQgPSBgdHJhbnNsYXRlKCR7eDModmFsdWUpfSwke2JhclN0ZXAgKiBpfSlgO1xuICAgICAgdmFsdWUgKz0gZC5hbW91bnRSYWlzZWQ7XG4gICAgICByZXR1cm4gdDtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RGF0YShkLCByb3VuZCkge1xuICAgIGxldCByZXN1bHRzID0gW107XG5cbiAgICBsZXQgaSA9IDA7XG5cbiAgICB3aGlsZSAoaSA8IDE0KSB7XG4gICAgICBsZXQgb2JqID0ge307XG4gICAgICBsZXQgdW5zb3J0ZWREYXRhID0gdGVzdERhdGFbaV07XG5cbiAgICAgIGxldCBuZXdEYXRhID0gdW5zb3J0ZWREYXRhLnZhbHVlcy5maWx0ZXIoZWxlID0+IHtcbiAgICAgICAgaWYgKGVsZS5rZXkgPT09IGQua2V5KSB7XG4gICAgICAgICAgcmV0dXJuIGVsZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChuZXdEYXRhWzBdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKHsgeTogMCB9KTtcbiAgICAgICAgaSsrO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IG5ld0RhdGEyID0gbmV3RGF0YVswXS52YWx1ZXMuZmlsdGVyKGVsZSA9PiB7XG4gICAgICAgIGlmIChlbGUucm91bmQgPT09IHJvdW5kKSB7XG4gICAgICAgICAgcmV0dXJuIGVsZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGxldCBzdW0gPSAwO1xuXG4gICAgICBuZXdEYXRhMi5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgIHN1bSArPSBlbGUuYW1vdW50UmFpc2VkO1xuICAgICAgfSk7XG4gICAgICBvYmpbXCJ5XCJdID0gc3VtO1xuICAgICAgcmVzdWx0cy5wdXNoKG9iaik7XG4gICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgZnVuY3Rpb24gYnVpbGRMaW5lQ2hhcnQobGluZUNoYXJ0RGF0YSwgcGxhY2Vob2xkZXIsIHJvdW5kKSB7XG4gICAgbGV0IG4gPSAxMztcbiAgICBsZXQgc29ydGVkRGF0YSA9IGxpbmVDaGFydERhdGFcbiAgICAgIC5zbGljZSgpXG4gICAgICAuc29ydCgoYSwgYikgPT4gZDMuZGVzY2VuZGluZyhhLnksIGIueSkpO1xuXG4gICAgY29uc29sZS5sb2coc29ydGVkRGF0YSk7XG5cbiAgICBsZXQgeFNjYWxlMyA9IGQzXG4gICAgICAuc2NhbGVMaW5lYXIoKVxuICAgICAgLmRvbWFpbihbMjAwMCwgMjAxM10pIC8vIGlucHV0XG4gICAgICAucmFuZ2UoWzAsIHdpZHRoXSk7XG4gICAgLy8gb1xuXG4gICAgbGV0IHlTY2FsZSA9IGQzXG4gICAgICAuc2NhbGVMaW5lYXIoKVxuICAgICAgLmRvbWFpbihbMCwgc29ydGVkRGF0YVswXS55XSkgLy8gaW5wdXRcbiAgICAgIC5yYW5nZShbaGVpZ2h0LCAwXSk7XG5cbiAgICBjb25zb2xlLmxvZyh5U2NhbGUuZG9tYWluKCkpO1xuXG4gICAgbGV0IGRpdiA9IGQzXG4gICAgICAuc2VsZWN0KFwiYm9keVwiKVxuICAgICAgLmFwcGVuZChcImRpdlwiKSAvLyBkZWNsYXJlIHRoZSB0b29sdGlwIGRpdlxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInRvb2x0aXBcIikgLy8gYXBwbHkgdGhlICd0b29sdGlwJyBjbGFzc1xuICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcblxuICAgIGxldCBsaW5lID0gZDNcbiAgICAgIC5saW5lKClcbiAgICAgIC54KGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgcmV0dXJuIHhTY2FsZTMoaSArIDIwMDApO1xuICAgICAgfSkgLy8gc2V0IHRoZSB4IHZhbHVlcyBmb3IgdGhlIGxpbmUgZ2VuZXJhdG9yXG4gICAgICAueShmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiB5U2NhbGUoZC55KTtcbiAgICAgIH0pIC8vIHNldCB0aGUgeSB2YWx1ZXMgZm9yIHRoZSBsaW5lIGdlbmVyYXRvclxuICAgICAgLmN1cnZlKGQzLmN1cnZlTW9ub3RvbmVYKTsgLy8gYXBwbHkgc21vb3RoaW5nIHRvIHRoZSBsaW5lXG5cbiAgICBjb25zdCBzdmczID0gZDNcbiAgICAgIC5zZWxlY3QoXCIjbGluZWNoYXJ0XCIpXG4gICAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXG4gICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSlcbiAgICAgIC5hdHRyKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgLm9uKFwiZGJsY2xpY2tcIiwgZCA9PiB7XG4gICAgICAgIGQzLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJlc3RvcmUoZCk7XG4gICAgICB9KVxuXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIDgwICsgXCIsIFwiICsgbWFyZ2luLnRvcCArIFwiKVwiKTtcblxuICAgIGNvbnNvbGUubG9nKHN2ZzMpO1xuXG4gICAgc3ZnM1xuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ4IGF4aXNcIilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsXCIgKyBoZWlnaHQgKyBcIilcIilcbiAgICAgIC5jYWxsKGQzLmF4aXNCb3R0b20oeFNjYWxlMykudGlja0Zvcm1hdChkMy5mb3JtYXQoXCJkXCIpKSk7XG5cbiAgICBzdmczXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInkgYXhpc1wiKVxuICAgICAgLmNhbGwoXG4gICAgICAgIGQzLmF4aXNMZWZ0KHlTY2FsZSkudGlja0Zvcm1hdChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgaWYgKGQgIT09IDAgJiYgZCA8IDEwMDAwMDAwMDApIHtcbiAgICAgICAgICAgIHJldHVybiBcIiRcIiArIGQgLyAxMDAwMDAwICsgXCJNXCI7XG4gICAgICAgICAgfSBlbHNlIGlmIChkICE9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gXCIkXCIgKyBkIC8gMTAwMDAwMDAwMCArIFwiQlwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBzdmczXG4gICAgICAuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgLmRhdHVtKGxpbmVDaGFydERhdGEpIC8vIDEwLiBCaW5kcyBkYXRhIHRvIHRoZSBsaW5lXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwibGluZVwiKSAvLyBBc3NpZ24gYSBjbGFzcyBmb3Igc3R5bGluZ1xuICAgICAgLmF0dHIoXCJkXCIsIGxpbmUpO1xuXG4gICAgc3ZnM1xuICAgICAgLnNlbGVjdEFsbChcIi5kb3RcIilcbiAgICAgIC5kYXRhKGxpbmVDaGFydERhdGEpXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZChcImNpcmNsZVwiKSAvLyBVc2VzIHRoZSBlbnRlcigpLmFwcGVuZCgpIG1ldGhvZFxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImRvdFwiKSAvLyBBc3NpZ24gYSBjbGFzcyBmb3Igc3R5bGluZ1xuICAgICAgLmF0dHIoXCJjeFwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiB4U2NhbGUzKGkgKyAyMDAwKTtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcImN5XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIHlTY2FsZShkLnkpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiclwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIGlmIChpID09PSB0aW1lKSB7XG4gICAgICAgICAgcmV0dXJuIDc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIDU7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuc3R5bGUoXCJmaWxsXCIsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgaWYgKGkgPT09IHRpbWUpIHJldHVybiBcInJlZFwiO1xuICAgICAgfSlcbiAgICAgIC5vbihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIGRpdlxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMC45KTtcbiAgICAgICAgZGl2XG4gICAgICAgICAgLmh0bWwoXG4gICAgICAgICAgICBpICtcbiAgICAgICAgICAgICAgMjAwMCArXG4gICAgICAgICAgICAgIFwiOiBcIiArXG4gICAgICAgICAgICAgIFwiICRcIiArXG4gICAgICAgICAgICAgIGQzXG4gICAgICAgICAgICAgICAgLmZvcm1hdChcIi4yc1wiKShkW1wieVwiXSlcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvRy8sIFwiQlwiKVxuICAgICAgICAgIClcbiAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIGQzLmV2ZW50LnBhZ2VYICsgXCJweFwiKVxuICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBkMy5ldmVudC5wYWdlWSAtIDI4ICsgXCJweFwiKTtcbiAgICAgIH0pXG4gICAgICAub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIGRpdlxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG4gICAgICB9KTtcblxuICAgIHN2ZzNcbiAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwidGl0bGVcIilcbiAgICAgIC5hdHRyKFwieFwiLCB3aWR0aCAvIDIpXG4gICAgICAuYXR0cihcInlcIiwgLTMwKVxuICAgICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgICAgLnRleHQoXG4gICAgICAgIGQgPT5cbiAgICAgICAgICBgVG90YWwgUmFpc2VkIHBlciBZZWFyIGluICR7cm91bmR9IGluIHRoZSAke3BsYWNlaG9sZGVyfSBJbnVkc3RyeSwgMjAwMC0yMDEzYFxuICAgICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc3RvcmUoZCkge1xuICAgIGQzLnNlbGVjdEFsbChcInN2Z1wiKS5yZW1vdmUoKTtcblxuICAgIHN2ZyA9IGQzXG4gICAgICAuc2VsZWN0KFwiI2ludGVyXCIpXG4gICAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXG4gICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSlcbiAgICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIG1hcmdpbi5sZWZ0ICsgXCIsIFwiICsgbWFyZ2luLnRvcCArIFwiKVwiKTtcblxuICAgIHN2Z1xuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJsYWJlbFwiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGUoLTkwKVwiKVxuICAgICAgLmF0dHIoXCJ5XCIsIDYpXG4gICAgICAuYXR0cihcImR5XCIsIFwiLjcxZW1cIilcbiAgICAgIC5zdHlsZShcInRleHQtYW5jaG9yXCIsIFwiZW5kXCIpXG4gICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcImJvbGRcIilcbiAgICAgIC50ZXh0KFwiVmFsdWVcIik7XG5cbiAgICB0aW1lTGFiZWwgPSBzdmdcbiAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwibGFiZWxcIilcbiAgICAgIC5hdHRyKFwieVwiLCBoZWlnaHQgKyA1MClcbiAgICAgIC5hdHRyKFwieFwiLCB3aWR0aCAtIDQwKVxuICAgICAgLy8gLmF0dHIoXCJmb250LXNpemVcIiwgXCI0MHB4XCIpXG4gICAgICAvLyAuYXR0cihcIm9wYWNpdHlcIiwgXCIwLjRcIilcbiAgICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAgIC50ZXh0KGAke3RpbWUgKyAyMDAwfWApO1xuXG4gICAgZDMuc2VsZWN0KFwiI3BsYXktYnV0dG9uXCIpLnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIik7XG4gICAgZDMuc2VsZWN0KFwiI3Jlc2V0LWJ1dHRvblwiKS5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpO1xuICAgIGQzLnNlbGVjdChcIiNzbGlkZXItZGl2XCIpLnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIik7XG4gICAgZDMuc2VsZWN0KFwiI2luZHVzdHJ5LXNlbGVjdFwiKS5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpO1xuICAgIGQzLnNlbGVjdEFsbChcInRleHRcIikuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKTtcblxuICAgIGNvbnN0IGR1cmF0aW9uID0gNzUwO1xuICAgIGNvbnN0IHRyYW5zaXRpb24xID0gZDMudHJhbnNpdGlvbigpLmR1cmF0aW9uKGR1cmF0aW9uKTtcbiAgICBjb25zdCB0cmFuc2l0aW9uMiA9IHRyYW5zaXRpb24xLnRyYW5zaXRpb24oKTtcblxuICAgIGNvbnN0IGV4aXQgPSBzdmcuc2VsZWN0QWxsKFwiLmVudGVyXCIpLmF0dHIoXCJjbGFzc1wiLCBcImV4aXRcIik7XG4gICAgZXhpdC5zZWxlY3RBbGwoXCJ0ZXh0XCIpLnJlbW92ZSgpO1xuICAgIC8vIEVudGVyaW5nIG5vZGVzIGltbWVkaWF0ZWx5IG9ic2N1cmUgdGhlIGNsaWNrZWQtb24gYmFyLCBzbyBoaWRlIGl0LlxuICAgIC8vIGV4aXQuc2VsZWN0QWxsKFwicmVjdFwiKS5hdHRyKFwiZmlsbC1vcGFjaXR5XCIsIHAgPT4gKHAgPT09IGQgPyAwIDogbnVsbCkpO1xuXG4gICAgLy8gVHJhbnNpdGlvbiBleGl0aW5nIGJhcnMgdG8gZmFkZSBvdXQuXG4gICAgZXhpdFxuICAgICAgLnNlbGVjdEFsbChcInJlY3RzXCIpXG4gICAgICAudHJhbnNpdGlvbih0cmFuc2l0aW9uMilcbiAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIChkLCBpKSA9PiBgdHJhbnNsYXRlKCR7LWJhclN0ZXAgKiBpfSwgMClgKVxuICAgICAgLy8uYXR0cihcIndpZHRoXCIsIGQgPT4gMClcbiAgICAgIC8vIC5hdHRyKFwiZmlsbC1vcGFjaXR5XCIsIDApXG5cbiAgICAgIC8vIC5hdHRyKFwidHJhbnNmb3JtXCIsIHN0YWNrKGQuaW5kZXgpKVxuICAgICAgLy8gLnRyYW5zaXRpb24odHJhbnNpdGlvbjEpXG4gICAgICAvLyAuYXR0cihcInRyYW5zZm9ybVwiLCBzdGFnZ2VyKCkpXG4gICAgICAucmVtb3ZlKCk7XG5cbiAgICBkMy5zZWxlY3RBbGwoXCJnLnktYXhpc1wiKS5yZW1vdmUoKTtcblxuICAgIGQzLnNlbGVjdEFsbChcImcueC1heGlzXCIpLnJlbW92ZSgpO1xuXG4gICAgc3ZnXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInggYXhpc1wiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCxcIiArIGhlaWdodCArIFwiKVwiKVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmNhbGwoeEF4aXMpO1xuXG4gICAgc3ZnXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInkgYXhpc1wiKVxuICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIik7XG5cbiAgICBkMy5zZWxlY3QoXCIjeWVhclwiKS5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpO1xuXG4gICAgdXBkYXRlKGNsZWFuRGF0YVt0aW1lXSk7XG4gIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9