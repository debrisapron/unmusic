(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Unmusic"] = factory();
	else
		root["Unmusic"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(4).runInContext();
module.exports = __webpack_require__(7)(_, _);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return clean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return concat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return lengthOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return wrap; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_fp__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_fp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__umlang_eval__ = __webpack_require__(11);



function nudge(amount, actions) {
  return actions.map((action) => {
    return __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.set('payload.time', action.payload.time + amount, action)
  })
}

function endOf(action) {
  return action.payload.time + (action.payload.dur || 0)
}

////////////////////////////////////////////////////////////////////////////////

function wrap(actions) {
  return { actions }
}

function lengthOf(actions) {
  return endOf(__WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.last(actions))
}

function get(thing) {
  return (Array.isArray(thing) && thing) || thing.actions || Object(__WEBPACK_IMPORTED_MODULE_1__umlang_eval__["a" /* default */])(thing)
}

function concat(actionLists) {
  return actionLists.reduce((acc, curr) => {
    return acc.concat(nudge(lengthOf(acc), curr))
  })
}

// Remove any redundant NOOP actions
function clean(actions) {
  let lastIndex = actions.length - 1
  return actions.filter((action, i) => {
    // Include all non-NOOP actions
    if (action.type !== 'NOOP') { return true }
    // Reject NOOP actions unless they are at the end
    if (i !== lastIndex) { return false }
    // Reject redundant NOOP actions (i.e. onset during another NOOP action)
    let prevAction = actions[i - 1]
    return action.payload.time > endOf(prevAction)
  })
}




/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory){

	//UMD
	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return factory();
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module === "object") {
		module.exports = factory();
 	} else {
		root.Tone = factory();
	}

}(this, function(){

	"use strict";
	
	var Tone;
	//constructs the main Tone object
	function Main(func){
		Tone = func();
	}
	//invokes each of the modules with the main Tone object as the argument
	function Module(func){
		func(Tone);
	}	/**
	 *  Tone.js
	 *  @author Yotam Mann
	 *  @license http://opensource.org/licenses/MIT MIT License
	 *  @copyright 2014-2017 Yotam Mann
	 */
	Main(function () {
	    
	    ///////////////////////////////////////////////////////////////////////////
	    //	TONE
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 *  @class  Tone is the base class of all other classes.
		 *  @constructor
		 */
	    var Tone = function () {
	    };
	    /**
		 *  @memberOf Tone#
		 *  @returns {string} returns the name of the class as a string
		 */
	    Tone.prototype.toString = function () {
	        for (var className in Tone) {
	            var isLetter = className[0].match(/^[A-Z]$/);
	            var sameConstructor = Tone[className] === this.constructor;
	            if (Tone.isFunction(Tone[className]) && isLetter && sameConstructor) {
	                return className;
	            }
	        }
	        return 'Tone';
	    };
	    /**
		 *  @memberOf Tone#
		 *  disconnect and dispose
		 *  @returns {Tone} this
		 */
	    Tone.prototype.dispose = function () {
	        return this;
	    };
	    ///////////////////////////////////////////////////////////////////////////
	    //	GET/SET
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 *  Set the parameters at once. Either pass in an
		 *  object mapping parameters to values, or to set a
		 *  single parameter, by passing in a string and value.
		 *  The last argument is an optional ramp time which
		 *  will ramp any signal values to their destination value
		 *  over the duration of the rampTime.
		 *  @param {Object|string} params
		 *  @param {number=} value
		 *  @param {Time=} rampTime
		 *  @returns {Tone} this
		 *  @memberOf Tone#
		 *  @example
		 * //set values using an object
		 * filter.set({
		 * 	"frequency" : 300,
		 * 	"type" : highpass
		 * });
		 *  @example
		 * filter.set("type", "highpass");
		 *  @example
		 * //ramp to the value 220 over 3 seconds.
		 * oscillator.set({
		 * 	"frequency" : 220
		 * }, 3);
		 */
	    Tone.prototype.set = function (params, value, rampTime) {
	        if (Tone.isObject(params)) {
	            rampTime = value;
	        } else if (Tone.isString(params)) {
	            var tmpObj = {};
	            tmpObj[params] = value;
	            params = tmpObj;
	        }
	        paramLoop:
	            for (var attr in params) {
	                value = params[attr];
	                var parent = this;
	                if (attr.indexOf('.') !== -1) {
	                    var attrSplit = attr.split('.');
	                    for (var i = 0; i < attrSplit.length - 1; i++) {
	                        parent = parent[attrSplit[i]];
	                        if (parent instanceof Tone) {
	                            attrSplit.splice(0, i + 1);
	                            var innerParam = attrSplit.join('.');
	                            parent.set(innerParam, value);
	                            continue paramLoop;
	                        }
	                    }
	                    attr = attrSplit[attrSplit.length - 1];
	                }
	                var param = parent[attr];
	                if (Tone.isUndef(param)) {
	                    continue;
	                }
	                if (Tone.Signal && param instanceof Tone.Signal || Tone.Param && param instanceof Tone.Param) {
	                    if (param.value !== value) {
	                        if (Tone.isUndef(rampTime)) {
	                            param.value = value;
	                        } else {
	                            param.rampTo(value, rampTime);
	                        }
	                    }
	                } else if (param instanceof AudioParam) {
	                    if (param.value !== value) {
	                        param.value = value;
	                    }
	                } else if (param instanceof Tone) {
	                    param.set(value);
	                } else if (param !== value) {
	                    parent[attr] = value;
	                }
	            }
	        return this;
	    };
	    /**
		 *  Get the object's attributes. Given no arguments get
		 *  will return all available object properties and their corresponding
		 *  values. Pass in a single attribute to retrieve or an array
		 *  of attributes. The attribute strings can also include a "."
		 *  to access deeper properties.
		 *  @memberOf Tone#
		 *  @example
		 * osc.get();
		 * //returns {"type" : "sine", "frequency" : 440, ...etc}
		 *  @example
		 * osc.get("type");
		 * //returns { "type" : "sine"}
		 * @example
		 * //use dot notation to access deep properties
		 * synth.get(["envelope.attack", "envelope.release"]);
		 * //returns {"envelope" : {"attack" : 0.2, "release" : 0.4}}
		 *  @param {Array=|string|undefined} params the parameters to get, otherwise will return
		 *  					                  all available.
		 *  @returns {Object}
		 */
	    Tone.prototype.get = function (params) {
	        if (Tone.isUndef(params)) {
	            params = this._collectDefaults(this.constructor);
	        } else if (Tone.isString(params)) {
	            params = [params];
	        }
	        var ret = {};
	        for (var i = 0; i < params.length; i++) {
	            var attr = params[i];
	            var parent = this;
	            var subRet = ret;
	            if (attr.indexOf('.') !== -1) {
	                var attrSplit = attr.split('.');
	                for (var j = 0; j < attrSplit.length - 1; j++) {
	                    var subAttr = attrSplit[j];
	                    subRet[subAttr] = subRet[subAttr] || {};
	                    subRet = subRet[subAttr];
	                    parent = parent[subAttr];
	                }
	                attr = attrSplit[attrSplit.length - 1];
	            }
	            var param = parent[attr];
	            if (Tone.isObject(params[attr])) {
	                subRet[attr] = param.get();
	            } else if (Tone.Signal && param instanceof Tone.Signal) {
	                subRet[attr] = param.value;
	            } else if (Tone.Param && param instanceof Tone.Param) {
	                subRet[attr] = param.value;
	            } else if (param instanceof AudioParam) {
	                subRet[attr] = param.value;
	            } else if (param instanceof Tone) {
	                subRet[attr] = param.get();
	            } else if (!Tone.isFunction(param) && !Tone.isUndef(param)) {
	                subRet[attr] = param;
	            }
	        }
	        return ret;
	    };
	    /**
		 *  collect all of the default attributes in one
		 *  @private
		 *  @param {function} constr the constructor to find the defaults from
		 *  @return {Array} all of the attributes which belong to the class
		 */
	    Tone.prototype._collectDefaults = function (constr) {
	        var ret = [];
	        if (!Tone.isUndef(constr.defaults)) {
	            ret = Object.keys(constr.defaults);
	        }
	        if (!Tone.isUndef(constr._super)) {
	            var superDefs = this._collectDefaults(constr._super);
	            //filter out repeats
	            for (var i = 0; i < superDefs.length; i++) {
	                if (ret.indexOf(superDefs[i]) === -1) {
	                    ret.push(superDefs[i]);
	                }
	            }
	        }
	        return ret;
	    };
	    ///////////////////////////////////////////////////////////////////////////
	    //	DEFAULTS
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 *  @memberOf Tone
		 *  @param  {Array}  values  The arguments array
		 *  @param  {Array}  keys    The names of the arguments
		 *  @param {Function|Object} constr The class constructor
		 *  @return  {Object}  An object composed of the  defaults between the class' defaults
		 *                        and the passed in arguments.
		 */
	    Tone.defaults = function (values, keys, constr) {
	        var options = {};
	        if (values.length === 1 && Tone.isObject(values[0])) {
	            options = values[0];
	        } else {
	            for (var i = 0; i < keys.length; i++) {
	                options[keys[i]] = values[i];
	            }
	        }
	        if (!Tone.isUndef(constr.defaults)) {
	            return Tone.defaultArg(options, constr.defaults);
	        } else if (Tone.isObject(constr)) {
	            return Tone.defaultArg(options, constr);
	        } else {
	            return options;
	        }
	    };
	    /**
		 *  If the `given` parameter is undefined, use the `fallback`.
		 *  If both `given` and `fallback` are object literals, it will
		 *  return a deep copy which includes all of the parameters from both
		 *  objects. If a parameter is undefined in given, it will return
		 *  the fallback property.
		 *  <br><br>
		 *  WARNING: if object is self referential, it will go into an an
		 *  infinite recursive loop.
		 *  @memberOf Tone
		 *  @param  {*} given
		 *  @param  {*} fallback
		 *  @return {*}
		 */
	    Tone.defaultArg = function (given, fallback) {
	        if (Tone.isObject(given) && Tone.isObject(fallback)) {
	            var ret = {};
	            //make a deep copy of the given object
	            for (var givenProp in given) {
	                ret[givenProp] = Tone.defaultArg(fallback[givenProp], given[givenProp]);
	            }
	            for (var fallbackProp in fallback) {
	                ret[fallbackProp] = Tone.defaultArg(given[fallbackProp], fallback[fallbackProp]);
	            }
	            return ret;
	        } else {
	            return Tone.isUndef(given) ? fallback : given;
	        }
	    };
	    ///////////////////////////////////////////////////////////////////////////
	    //	CONNECTIONS
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 *  connect together all of the arguments in series
		 *  @param {...AudioParam|Tone|AudioNode} nodes
		 *  @returns {Tone}
		 *  @memberOf Tone
		 *  @static
		 */
	    Tone.connectSeries = function () {
	        var currentUnit = arguments[0];
	        for (var i = 1; i < arguments.length; i++) {
	            var toUnit = arguments[i];
	            currentUnit.connect(toUnit);
	            currentUnit = toUnit;
	        }
	        return Tone;
	    };
	    ///////////////////////////////////////////////////////////////////////////
	    // TYPE CHECKING
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 *  test if the arg is undefined
		 *  @param {*} arg the argument to test
		 *  @returns {boolean} true if the arg is undefined
		 *  @static
		 *  @memberOf Tone
		 */
	    Tone.isUndef = function (val) {
	        return typeof val === 'undefined';
	    };
	    /**
		 *  test if the arg is a function
		 *  @param {*} arg the argument to test
		 *  @returns {boolean} true if the arg is a function
		 *  @static
		 *  @memberOf Tone
		 */
	    Tone.isFunction = function (val) {
	        return typeof val === 'function';
	    };
	    /**
		 *  Test if the argument is a number.
		 *  @param {*} arg the argument to test
		 *  @returns {boolean} true if the arg is a number
		 *  @static
		 *  @memberOf Tone
		 */
	    Tone.isNumber = function (arg) {
	        return typeof arg === 'number';
	    };
	    /**
		 *  Test if the given argument is an object literal (i.e. `{}`);
		 *  @param {*} arg the argument to test
		 *  @returns {boolean} true if the arg is an object literal.
		 *  @static
		 *  @memberOf Tone
		 */
	    Tone.isObject = function (arg) {
	        return Object.prototype.toString.call(arg) === '[object Object]' && arg.constructor === Object;
	    };
	    /**
		 *  Test if the argument is a boolean.
		 *  @param {*} arg the argument to test
		 *  @returns {boolean} true if the arg is a boolean
		 *  @static
		 *  @memberOf Tone
		 */
	    Tone.isBoolean = function (arg) {
	        return typeof arg === 'boolean';
	    };
	    /**
		 *  Test if the argument is an Array
		 *  @param {*} arg the argument to test
		 *  @returns {boolean} true if the arg is an array
		 *  @static
		 *  @memberOf Tone
		 */
	    Tone.isArray = function (arg) {
	        return Array.isArray(arg);
	    };
	    /**
		 *  Test if the argument is a string.
		 *  @param {*} arg the argument to test
		 *  @returns {boolean} true if the arg is a string
		 *  @static
		 *  @memberOf Tone
		 */
	    Tone.isString = function (arg) {
	        return typeof arg === 'string';
	    };
	    /**
		 *  Test if the argument is in the form of a note in scientific pitch notation.
		 *  e.g. "C4"
		 *  @param {*} arg the argument to test
		 *  @returns {boolean} true if the arg is a string
		 *  @static
		 *  @memberOf Tone
		 */
	    Tone.isNote = function (arg) {
	        return Tone.isString(arg) && /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i.test(arg);
	    };
	    /**
		 *  An empty function.
		 *  @static
		 */
	    Tone.noOp = function () {
	    };
	    /**
		 *  Make the property not writable. Internal use only.
		 *  @private
		 *  @param  {string}  property  the property to make not writable
		 */
	    Tone.prototype._readOnly = function (property) {
	        if (Array.isArray(property)) {
	            for (var i = 0; i < property.length; i++) {
	                this._readOnly(property[i]);
	            }
	        } else {
	            Object.defineProperty(this, property, {
	                writable: false,
	                enumerable: true
	            });
	        }
	    };
	    /**
		 *  Make an attribute writeable. Interal use only.
		 *  @private
		 *  @param  {string}  property  the property to make writable
		 */
	    Tone.prototype._writable = function (property) {
	        if (Array.isArray(property)) {
	            for (var i = 0; i < property.length; i++) {
	                this._writable(property[i]);
	            }
	        } else {
	            Object.defineProperty(this, property, { writable: true });
	        }
	    };
	    /**
		 * Possible play states.
		 * @enum {string}
		 */
	    Tone.State = {
	        Started: 'started',
	        Stopped: 'stopped',
	        Paused: 'paused'
	    };
	    ///////////////////////////////////////////////////////////////////////////
	    // CONVERSIONS
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 *  Equal power gain scale. Good for cross-fading.
		 *  @param  {NormalRange} percent (0-1)
		 *  @return {Number}         output gain (0-1)
		 *  @static
		 *  @memberOf Tone
		 */
	    Tone.equalPowerScale = function (percent) {
	        var piFactor = 0.5 * Math.PI;
	        return Math.sin(percent * piFactor);
	    };
	    /**
		 *  Convert decibels into gain.
		 *  @param  {Decibels} db
		 *  @return {Number}
		 *  @static
		 *  @memberOf Tone
		 */
	    Tone.dbToGain = function (db) {
	        return Math.pow(2, db / 6);
	    };
	    /**
		 *  Convert gain to decibels.
		 *  @param  {Number} gain (0-1)
		 *  @return {Decibels}
		 *  @static
		 *  @memberOf Tone
		 */
	    Tone.gainToDb = function (gain) {
	        return 20 * (Math.log(gain) / Math.LN10);
	    };
	    /**
		 *  Convert an interval (in semitones) to a frequency ratio.
		 *  @param  {Interval} interval the number of semitones above the base note
		 *  @return {number}          the frequency ratio
		 *  @static
		 *  @memberOf Tone
		 *  @example
		 * tone.intervalToFrequencyRatio(0); // 1
		 * tone.intervalToFrequencyRatio(12); // 2
		 * tone.intervalToFrequencyRatio(-12); // 0.5
		 */
	    Tone.intervalToFrequencyRatio = function (interval) {
	        return Math.pow(2, interval / 12);
	    };
	    ///////////////////////////////////////////////////////////////////////////
	    //	TIMING
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 *  Return the current time of the AudioContext clock.
		 *  @return {Number} the currentTime from the AudioContext
		 *  @memberOf Tone#
		 */
	    Tone.prototype.now = function () {
	        return Tone.context.now();
	    };
	    /**
		 *  Return the current time of the AudioContext clock.
		 *  @return {Number} the currentTime from the AudioContext
		 *  @static
		 *  @memberOf Tone
		 */
	    Tone.now = function () {
	        return Tone.context.now();
	    };
	    /**
		 * Adds warning in the console if the scheduled time has passed.
		 * @type {Time}
		 */
	    Tone.isPast = function (time) {
	        if (time < Tone.context.currentTime) {
	            console.warn('Time \'' + time + '\' is in the past. Scheduled time must be \u2265 AudioContext.currentTime');
	        }
	    };
	    ///////////////////////////////////////////////////////////////////////////
	    //	INHERITANCE
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 *  have a child inherit all of Tone's (or a parent's) prototype
		 *  to inherit the parent's properties, make sure to call
		 *  Parent.call(this) in the child's constructor
		 *
		 *  based on closure library's inherit function
		 *
		 *  @memberOf Tone
		 *  @static
		 *  @param  {function} 	child
		 *  @param  {function=} parent (optional) parent to inherit from
		 *                             if no parent is supplied, the child
		 *                             will inherit from Tone
		 */
	    Tone.extend = function (child, parent) {
	        if (Tone.isUndef(parent)) {
	            parent = Tone;
	        }
	        function TempConstructor() {
	        }
	        TempConstructor.prototype = parent.prototype;
	        child.prototype = new TempConstructor();
	        /** @override */
	        child.prototype.constructor = child;
	        child._super = parent;
	    };
	    ///////////////////////////////////////////////////////////////////////////
	    //	CONTEXT
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 *  The private audio context shared by all Tone Nodes.
		 *  @private
		 *  @type {Tone.Context}
		 */
	    var audioContext = null;
	    /**
		 *  A static pointer to the audio context accessible as Tone.context.
		 *  @type {Tone.Context}
		 *  @name context
		 *  @memberOf Tone
		 */
	    Object.defineProperty(Tone, 'context', {
	        get: function () {
	            return audioContext;
	        },
	        set: function (context) {
	            if (Tone.Context && context instanceof Tone.Context) {
	                audioContext = context;
	            } else {
	                audioContext = new Tone.Context(context);
	            }
	            //initialize the new audio context
	            Tone.Context.emit('init', audioContext);
	        }
	    });
	    /**
		 *  The AudioContext
		 *  @type {Tone.Context}
		 *  @name context
		 *  @memberOf Tone#
		 *  @readOnly
		 */
	    Object.defineProperty(Tone.prototype, 'context', {
	        get: function () {
	            return Tone.context;
	        }
	    });
	    /**
		 *  Tone automatically creates a context on init, but if you are working
		 *  with other libraries which also create an AudioContext, it can be
		 *  useful to set your own. If you are going to set your own context,
		 *  be sure to do it at the start of your code, before creating any objects.
		 *  @static
		 *  @param {AudioContext} ctx The new audio context to set
		 */
	    Tone.setContext = function (ctx) {
	        Tone.context = ctx;
	    };
	    ///////////////////////////////////////////////////////////////////////////
	    //	ATTRIBUTES
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 *  The number of seconds of 1 processing block (128 samples)
		 *  @type {Number}
		 *  @name blockTime
		 *  @memberOf Tone
		 *  @static
		 *  @readOnly
		 */
	    Object.defineProperty(Tone.prototype, 'blockTime', {
	        get: function () {
	            return 128 / this.context.sampleRate;
	        }
	    });
	    /**
		 *  The duration in seconds of one sample.
		 *  @type {Number}
		 *  @name sampleTime
		 *  @memberOf Tone
		 *  @static
		 *  @readOnly
		 */
	    Object.defineProperty(Tone.prototype, 'sampleTime', {
	        get: function () {
	            return 1 / this.context.sampleRate;
	        }
	    });
	    /**
		 *  Whether or not all the technologies that Tone.js relies on are supported by the current browser.
		 *  @type {Boolean}
		 *  @name supported
		 *  @memberOf Tone
		 *  @readOnly
		 *  @static
		 */
	    Object.defineProperty(Tone, 'supported', {
	        get: function () {
	            var hasAudioContext = window.hasOwnProperty('AudioContext') || window.hasOwnProperty('webkitAudioContext');
	            var hasPromises = window.hasOwnProperty('Promise');
	            var hasWorkers = window.hasOwnProperty('Worker');
	            return hasAudioContext && hasPromises && hasWorkers;
	        }
	    });
	    /**
		 *  Boolean value if the audio context has been initialized.
		 *  @type {Boolean}
		 *  @memberOf Tone
		 *  @static
		 *  @name initialized
		 */
	    Object.defineProperty(Tone, 'initialized', {
	        get: function () {
	            return audioContext !== null;
	        }
	    });
	    /**
		 *  Get the context when it becomes available
		 *  @param  {Function}  resolve  Callback when the context is initialized
		 *  @return  {Tone}
		 */
	    Tone.getContext = function (resolve) {
	        if (Tone.initialized) {
	            resolve(Tone.context);
	        } else {
	            var resCallback = function () {
	                resolve(Tone.context);
	                Tone.Context.off('init', resCallback);
	            };
	            Tone.Context.on('init', resCallback);
	        }
	        return Tone;
	    };
	    /**
		 * The version number
		 * @type {String}
		 * @static
		 */
	    Tone.version = 'r11';
	    // allow optional silencing of this log
	    if (!window.TONE_SILENCE_VERSION_LOGGING) {
	        console.log('%c * Tone.js ' + Tone.version + ' * ', 'background: #000; color: #fff');
	    }
	    return Tone;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.Emitter gives classes which extend it
		 *         the ability to listen for and emit events. 
		 *         Inspiration and reference from Jerome Etienne's [MicroEvent](https://github.com/jeromeetienne/microevent.js).
		 *         MIT (c) 2011 Jerome Etienne.
		 *         
		 *  @extends {Tone}
		 */
	    Tone.Emitter = function () {
	        Tone.call(this);
	        /**
			 *  Contains all of the events.
			 *  @private
			 *  @type  {Object}
			 */
	        this._events = {};
	    };
	    Tone.extend(Tone.Emitter);
	    /**
		 *  Bind a callback to a specific event.
		 *  @param  {String}    event     The name of the event to listen for.
		 *  @param  {Function}  callback  The callback to invoke when the
		 *                                event is emitted
		 *  @return  {Tone.Emitter}    this
		 */
	    Tone.Emitter.prototype.on = function (event, callback) {
	        //split the event
	        var events = event.split(/\W+/);
	        for (var i = 0; i < events.length; i++) {
	            var eventName = events[i];
	            if (!this._events.hasOwnProperty(eventName)) {
	                this._events[eventName] = [];
	            }
	            this._events[eventName].push(callback);
	        }
	        return this;
	    };
	    /**
		 *  Remove the event listener.
		 *  @param  {String}    event     The event to stop listening to.
		 *  @param  {Function=}  callback  The callback which was bound to 
		 *                                the event with Tone.Emitter.on.
		 *                                If no callback is given, all callbacks
		 *                                events are removed.
		 *  @return  {Tone.Emitter}    this
		 */
	    Tone.Emitter.prototype.off = function (event, callback) {
	        var events = event.split(/\W+/);
	        for (var ev = 0; ev < events.length; ev++) {
	            event = events[ev];
	            if (this._events.hasOwnProperty(event)) {
	                if (Tone.isUndef(callback)) {
	                    this._events[event] = [];
	                } else {
	                    var eventList = this._events[event];
	                    for (var i = 0; i < eventList.length; i++) {
	                        if (eventList[i] === callback) {
	                            eventList.splice(i, 1);
	                        }
	                    }
	                }
	            }
	        }
	        return this;
	    };
	    /**
		 *  Invoke all of the callbacks bound to the event
		 *  with any arguments passed in. 
		 *  @param  {String}  event  The name of the event.
		 *  @param {*} args... The arguments to pass to the functions listening.
		 *  @return  {Tone.Emitter}  this
		 */
	    Tone.Emitter.prototype.emit = function (event) {
	        if (this._events) {
	            var args = Array.apply(null, arguments).slice(1);
	            if (this._events.hasOwnProperty(event)) {
	                var eventList = this._events[event];
	                for (var i = 0, len = eventList.length; i < len; i++) {
	                    eventList[i].apply(this, args);
	                }
	            }
	        }
	        return this;
	    };
	    /**
		 *  Add Emitter functions (on/off/emit) to the object
		 *  @param  {Object|Function}  object  The object or class to extend.
		 *  @returns {Tone.Emitter}
		 */
	    Tone.Emitter.mixin = function (object) {
	        var functions = [
	            'on',
	            'off',
	            'emit'
	        ];
	        object._events = {};
	        for (var i = 0; i < functions.length; i++) {
	            var func = functions[i];
	            var emitterFunc = Tone.Emitter.prototype[func];
	            object[func] = emitterFunc;
	        }
	        return Tone.Emitter;
	    };
	    /**
		 *  Clean up
		 *  @return  {Tone.Emitter}  this
		 */
	    Tone.Emitter.prototype.dispose = function () {
	        Tone.prototype.dispose.call(this);
	        this._events = null;
	        return this;
	    };
	    return Tone.Emitter;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class A Timeline class for scheduling and maintaining state
		 *         along a timeline. All events must have a "time" property.
		 *         Internally, events are stored in time order for fast
		 *         retrieval.
		 *  @extends {Tone}
		 *  @param {Positive} [memory=Infinity] The number of previous events that are retained.
		 */
	    Tone.Timeline = function () {
	        var options = Tone.defaults(arguments, ['memory'], Tone.Timeline);
	        Tone.call(this);
	        /**
			 *  The array of scheduled timeline events
			 *  @type  {Array}
			 *  @private
			 */
	        this._timeline = [];
	        /**
			 *  An array of items to remove from the list.
			 *  @type {Array}
			 *  @private
			 */
	        this._toRemove = [];
	        /**
			 *  An array of items to add from the list (once it's done iterating)
			 *  @type {Array}
			 *  @private
			 */
	        this._toAdd = [];
	        /**
			 *  Flag if the timeline is mid iteration
			 *  @private
			 *  @type {Boolean}
			 */
	        this._iterating = false;
	        /**
			 *  The memory of the timeline, i.e.
			 *  how many events in the past it will retain
			 *  @type {Positive}
			 */
	        this.memory = options.memory;
	    };
	    Tone.extend(Tone.Timeline);
	    /**
		 *  the default parameters
		 *  @static
		 *  @const
		 */
	    Tone.Timeline.defaults = { 'memory': Infinity };
	    /**
		 *  The number of items in the timeline.
		 *  @type {Number}
		 *  @memberOf Tone.Timeline#
		 *  @name length
		 *  @readOnly
		 */
	    Object.defineProperty(Tone.Timeline.prototype, 'length', {
	        get: function () {
	            return this._timeline.length;
	        }
	    });
	    /**
		 *  Insert an event object onto the timeline. Events must have a "time" attribute.
		 *  @param  {Object}  event  The event object to insert into the
		 *                           timeline.
		 *  @returns {Tone.Timeline} this
		 */
	    Tone.Timeline.prototype.add = function (event) {
	        //the event needs to have a time attribute
	        if (Tone.isUndef(event.time)) {
	            throw new Error('Tone.Timeline: events must have a time attribute');
	        }
	        if (this._iterating) {
	            this._toAdd.push(event);
	        } else {
	            var index = this._search(event.time);
	            this._timeline.splice(index + 1, 0, event);
	            //if the length is more than the memory, remove the previous ones
	            if (this.length > this.memory) {
	                var diff = this.length - this.memory;
	                this._timeline.splice(0, diff);
	            }
	        }
	        return this;
	    };
	    /**
		 *  Remove an event from the timeline.
		 *  @param  {Object}  event  The event object to remove from the list.
		 *  @returns {Tone.Timeline} this
		 */
	    Tone.Timeline.prototype.remove = function (event) {
	        if (this._iterating) {
	            this._toRemove.push(event);
	        } else {
	            var index = this._timeline.indexOf(event);
	            if (index !== -1) {
	                this._timeline.splice(index, 1);
	            }
	        }
	        return this;
	    };
	    /**
		 *  Get the nearest event whose time is less than or equal to the given time.
		 *  @param  {Number}  time  The time to query.
		 *  @param  {String}  comparator Which value in the object to compare
		 *  @returns {Object} The event object set after that time.
		 */
	    Tone.Timeline.prototype.get = function (time, comparator) {
	        comparator = Tone.defaultArg(comparator, 'time');
	        var index = this._search(time, comparator);
	        if (index !== -1) {
	            return this._timeline[index];
	        } else {
	            return null;
	        }
	    };
	    /**
		 *  Return the first event in the timeline without removing it
		 *  @returns {Object} The first event object
		 */
	    Tone.Timeline.prototype.peek = function () {
	        return this._timeline[0];
	    };
	    /**
		 *  Return the first event in the timeline and remove it
		 *  @returns {Object} The first event object
		 */
	    Tone.Timeline.prototype.shift = function () {
	        return this._timeline.shift();
	    };
	    /**
		 *  Get the event which is scheduled after the given time.
		 *  @param  {Number}  time  The time to query.
		 *  @param  {String}  comparator Which value in the object to compare
		 *  @returns {Object} The event object after the given time
		 */
	    Tone.Timeline.prototype.getAfter = function (time, comparator) {
	        comparator = Tone.defaultArg(comparator, 'time');
	        var index = this._search(time, comparator);
	        if (index + 1 < this._timeline.length) {
	            return this._timeline[index + 1];
	        } else {
	            return null;
	        }
	    };
	    /**
		 *  Get the event before the event at the given time.
		 *  @param  {Number}  time  The time to query.
		 *  @param  {String}  comparator Which value in the object to compare
		 *  @returns {Object} The event object before the given time
		 */
	    Tone.Timeline.prototype.getBefore = function (time, comparator) {
	        comparator = Tone.defaultArg(comparator, 'time');
	        var len = this._timeline.length;
	        //if it's after the last item, return the last item
	        if (len > 0 && this._timeline[len - 1][comparator] < time) {
	            return this._timeline[len - 1];
	        }
	        var index = this._search(time, comparator);
	        if (index - 1 >= 0) {
	            return this._timeline[index - 1];
	        } else {
	            return null;
	        }
	    };
	    /**
		 *  Cancel events after the given time
		 *  @param  {Number}  time  The time to query.
		 *  @returns {Tone.Timeline} this
		 */
	    Tone.Timeline.prototype.cancel = function (after) {
	        if (this._timeline.length > 1) {
	            var index = this._search(after);
	            if (index >= 0) {
	                if (this._timeline[index].time === after) {
	                    //get the first item with that time
	                    for (var i = index; i >= 0; i--) {
	                        if (this._timeline[i].time === after) {
	                            index = i;
	                        } else {
	                            break;
	                        }
	                    }
	                    this._timeline = this._timeline.slice(0, index);
	                } else {
	                    this._timeline = this._timeline.slice(0, index + 1);
	                }
	            } else {
	                this._timeline = [];
	            }
	        } else if (this._timeline.length === 1) {
	            //the first item's time
	            if (this._timeline[0].time >= after) {
	                this._timeline = [];
	            }
	        }
	        return this;
	    };
	    /**
		 *  Cancel events before or equal to the given time.
		 *  @param  {Number}  time  The time to cancel before.
		 *  @returns {Tone.Timeline} this
		 */
	    Tone.Timeline.prototype.cancelBefore = function (time) {
	        var index = this._search(time);
	        if (index >= 0) {
	            this._timeline = this._timeline.slice(index + 1);
	        }
	        return this;
	    };
	    /**
		 * Returns the previous event if there is one. null otherwise
		 * @param  {Object} event The event to find the previous one of
		 * @return {Object}       The event right before the given event
		 */
	    Tone.Timeline.prototype.previousEvent = function (event) {
	        var index = this._timeline.indexOf(event);
	        if (index > 0) {
	            return this._timeline[index - 1];
	        } else {
	            return null;
	        }
	    };
	    /**
		 *  Does a binary search on the timeline array and returns the
		 *  nearest event index whose time is after or equal to the given time.
		 *  If a time is searched before the first index in the timeline, -1 is returned.
		 *  If the time is after the end, the index of the last item is returned.
		 *  @param  {Number}  time
		 *  @param  {String}  comparator Which value in the object to compare
		 *  @return  {Number} the index in the timeline array
		 *  @private
		 */
	    Tone.Timeline.prototype._search = function (time, comparator) {
	        if (this._timeline.length === 0) {
	            return -1;
	        }
	        comparator = Tone.defaultArg(comparator, 'time');
	        var beginning = 0;
	        var len = this._timeline.length;
	        var end = len;
	        if (len > 0 && this._timeline[len - 1][comparator] <= time) {
	            return len - 1;
	        }
	        while (beginning < end) {
	            // calculate the midpoint for roughly equal partition
	            var midPoint = Math.floor(beginning + (end - beginning) / 2);
	            var event = this._timeline[midPoint];
	            var nextEvent = this._timeline[midPoint + 1];
	            if (event[comparator] === time) {
	                //choose the last one that has the same time
	                for (var i = midPoint; i < this._timeline.length; i++) {
	                    var testEvent = this._timeline[i];
	                    if (testEvent[comparator] === time) {
	                        midPoint = i;
	                    }
	                }
	                return midPoint;
	            } else if (event[comparator] < time && nextEvent[comparator] > time) {
	                return midPoint;
	            } else if (event[comparator] > time) {
	                //search lower
	                end = midPoint;
	            } else {
	                //search upper
	                beginning = midPoint + 1;
	            }
	        }
	        return -1;
	    };
	    /**
		 *  Internal iterator. Applies extra safety checks for
		 *  removing items from the array.
		 *  @param  {Function}  callback
		 *  @param  {Number=}    lowerBound
		 *  @param  {Number=}    upperBound
		 *  @private
		 */
	    Tone.Timeline.prototype._iterate = function (callback, lowerBound, upperBound) {
	        this._iterating = true;
	        lowerBound = Tone.defaultArg(lowerBound, 0);
	        upperBound = Tone.defaultArg(upperBound, this._timeline.length - 1);
	        for (var i = lowerBound; i <= upperBound; i++) {
	            callback.call(this, this._timeline[i]);
	        }
	        this._iterating = false;
	        this._toRemove.forEach(function (event) {
	            this.remove(event);
	        }.bind(this));
	        this._toRemove = [];
	        this._toAdd.forEach(function (event) {
	            this.add(event);
	        }.bind(this));
	        this._toAdd = [];
	    };
	    /**
		 *  Iterate over everything in the array
		 *  @param  {Function}  callback The callback to invoke with every item
		 *  @returns {Tone.Timeline} this
		 */
	    Tone.Timeline.prototype.forEach = function (callback) {
	        this._iterate(callback);
	        return this;
	    };
	    /**
		 *  Iterate over everything in the array at or before the given time.
		 *  @param  {Number}  time The time to check if items are before
		 *  @param  {Function}  callback The callback to invoke with every item
		 *  @returns {Tone.Timeline} this
		 */
	    Tone.Timeline.prototype.forEachBefore = function (time, callback) {
	        //iterate over the items in reverse so that removing an item doesn't break things
	        var upperBound = this._search(time);
	        if (upperBound !== -1) {
	            this._iterate(callback, 0, upperBound);
	        }
	        return this;
	    };
	    /**
		 *  Iterate over everything in the array after the given time.
		 *  @param  {Number}  time The time to check if items are before
		 *  @param  {Function}  callback The callback to invoke with every item
		 *  @returns {Tone.Timeline} this
		 */
	    Tone.Timeline.prototype.forEachAfter = function (time, callback) {
	        //iterate over the items in reverse so that removing an item doesn't break things
	        var lowerBound = this._search(time);
	        this._iterate(callback, lowerBound + 1);
	        return this;
	    };
	    /**
		 *  Iterate over everything in the array at or after the given time. Similar to
		 *  forEachAfter, but includes the item(s) at the given time.
		 *  @param  {Number}  time The time to check if items are before
		 *  @param  {Function}  callback The callback to invoke with every item
		 *  @returns {Tone.Timeline} this
		 */
	    Tone.Timeline.prototype.forEachFrom = function (time, callback) {
	        //iterate over the items in reverse so that removing an item doesn't break things
	        var lowerBound = this._search(time);
	        //work backwards until the event time is less than time
	        while (lowerBound >= 0 && this._timeline[lowerBound].time >= time) {
	            lowerBound--;
	        }
	        this._iterate(callback, lowerBound + 1);
	        return this;
	    };
	    /**
		 *  Iterate over everything in the array at the given time
		 *  @param  {Number}  time The time to check if items are before
		 *  @param  {Function}  callback The callback to invoke with every item
		 *  @returns {Tone.Timeline} this
		 */
	    Tone.Timeline.prototype.forEachAtTime = function (time, callback) {
	        //iterate over the items in reverse so that removing an item doesn't break things
	        var upperBound = this._search(time);
	        if (upperBound !== -1) {
	            this._iterate(function (event) {
	                if (event.time === time) {
	                    callback.call(this, event);
	                }
	            }, 0, upperBound);
	        }
	        return this;
	    };
	    /**
		 *  Clean up.
		 *  @return  {Tone.Timeline}  this
		 */
	    Tone.Timeline.prototype.dispose = function () {
	        Tone.prototype.dispose.call(this);
	        this._timeline = null;
	        this._toRemove = null;
	        this._toAdd = null;
	        return this;
	    };
	    return Tone.Timeline;
	});
	Module(function (Tone) {
	    /**
		 *  shim
		 *  @private
		 */
	    if (!window.hasOwnProperty('AudioContext') && window.hasOwnProperty('webkitAudioContext')) {
	        window.AudioContext = window.webkitAudioContext;
	    }
	    /**
		 *  @class Wrapper around the native AudioContext.
		 *  @extends {Tone.Emitter}
		 *  @param {AudioContext=} context optionally pass in a context
		 */
	    Tone.Context = function () {
	        Tone.Emitter.call(this);
	        var options = Tone.defaults(arguments, ['context'], Tone.Context);
	        if (!options.context) {
	            options.context = new window.AudioContext();
	        }
	        this._context = options.context;
	        // extend all of the methods
	        for (var prop in this._context) {
	            this._defineProperty(this._context, prop);
	        }
	        /**
			 *  The default latency hint
			 *  @type  {String}
			 *  @private
			 */
	        this._latencyHint = options.latencyHint;
	        /**
			 *  An object containing all of the constants AudioBufferSourceNodes
			 *  @type  {Object}
			 *  @private
			 */
	        this._constants = {};
	        ///////////////////////////////////////////////////////////////////////
	        // WORKER
	        ///////////////////////////////////////////////////////////////////////
	        /**
			 *  The amount of time events are scheduled
			 *  into the future
			 *  @type  {Number}
			 *  @private
			 */
	        this.lookAhead = options.lookAhead;
	        /**
			 *  A reference to the actual computed update interval
			 *  @type  {Number}
			 *  @private
			 */
	        this._computedUpdateInterval = 0;
	        /**
			 *  A reliable callback method
			 *  @private
			 *  @type  {Ticker}
			 */
	        this._ticker = new Ticker(this.emit.bind(this, 'tick'), options.clockSource, options.updateInterval);
	        ///////////////////////////////////////////////////////////////////////
	        // TIMEOUTS
	        ///////////////////////////////////////////////////////////////////////
	        /**
			 *  All of the setTimeout events.
			 *  @type  {Tone.Timeline}
			 *  @private
			 */
	        this._timeouts = new Tone.Timeline();
	        /**
			 *  The timeout id counter
			 *  @private
			 *  @type {Number}
			 */
	        this._timeoutIds = 0;
	        this.on('tick', this._timeoutLoop.bind(this));
	    };
	    Tone.extend(Tone.Context, Tone.Emitter);
	    Tone.Emitter.mixin(Tone.Context);
	    /**
		 * defaults
		 * @static
		 * @type {Object}
		 */
	    Tone.Context.defaults = {
	        'clockSource': 'worker',
	        'latencyHint': 'interactive',
	        'lookAhead': 0.1,
	        'updateInterval': 0.03
	    };
	    /**
		 *  Define a property on this Tone.Context. 
		 *  This is used to extend the native AudioContext
		 *  @param  {AudioContext}  context
		 *  @param  {String}  prop 
		 *  @private
		 */
	    Tone.Context.prototype._defineProperty = function (context, prop) {
	        if (Tone.isUndef(this[prop])) {
	            Object.defineProperty(this, prop, {
	                get: function () {
	                    if (typeof context[prop] === 'function') {
	                        return context[prop].bind(context);
	                    } else {
	                        return context[prop];
	                    }
	                },
	                set: function (val) {
	                    context[prop] = val;
	                }
	            });
	        }
	    };
	    /**
		 *  The current audio context time
		 *  @return  {Number}
		 */
	    Tone.Context.prototype.now = function () {
	        return this._context.currentTime + this.lookAhead;
	    };
	    /**
		 *  Generate a looped buffer at some constant value.
		 *  @param  {Number}  val
		 *  @return  {BufferSourceNode}
		 */
	    Tone.Context.prototype.getConstant = function (val) {
	        if (this._constants[val]) {
	            return this._constants[val];
	        } else {
	            var buffer = this._context.createBuffer(1, 128, this._context.sampleRate);
	            var arr = buffer.getChannelData(0);
	            for (var i = 0; i < arr.length; i++) {
	                arr[i] = val;
	            }
	            var constant = this._context.createBufferSource();
	            constant.channelCount = 1;
	            constant.channelCountMode = 'explicit';
	            constant.buffer = buffer;
	            constant.loop = true;
	            constant.start(0);
	            this._constants[val] = constant;
	            return constant;
	        }
	    };
	    /**
		 *  The private loop which keeps track of the context scheduled timeouts
		 *  Is invoked from the clock source
		 *  @private
		 */
	    Tone.Context.prototype._timeoutLoop = function () {
	        var now = this.now();
	        while (this._timeouts && this._timeouts.length && this._timeouts.peek().time <= now) {
	            this._timeouts.shift().callback();
	        }
	    };
	    /**
		 *  A setTimeout which is gaurenteed by the clock source. 
		 *  Also runs in the offline context.
		 *  @param  {Function}  fn       The callback to invoke
		 *  @param  {Seconds}    timeout  The timeout in seconds
		 *  @returns {Number} ID to use when invoking Tone.Context.clearTimeout
		 */
	    Tone.Context.prototype.setTimeout = function (fn, timeout) {
	        this._timeoutIds++;
	        var now = this.now();
	        this._timeouts.add({
	            callback: fn,
	            time: now + timeout,
	            id: this._timeoutIds
	        });
	        return this._timeoutIds;
	    };
	    /**
		 *  Clears a previously scheduled timeout with Tone.context.setTimeout
		 *  @param  {Number}  id  The ID returned from setTimeout
		 *  @return  {Tone.Context}  this
		 */
	    Tone.Context.prototype.clearTimeout = function (id) {
	        this._timeouts.forEach(function (event) {
	            if (event.id === id) {
	                this.remove(event);
	            }
	        });
	        return this;
	    };
	    /**
		 *  How often the Web Worker callback is invoked.
		 *  This number corresponds to how responsive the scheduling
		 *  can be. Context.updateInterval + Context.lookAhead gives you the
		 *  total latency between scheduling an event and hearing it.
		 *  @type {Number}
		 *  @memberOf Tone.Context#
		 *  @name updateInterval
		 */
	    Object.defineProperty(Tone.Context.prototype, 'updateInterval', {
	        get: function () {
	            return this._ticker.updateInterval;
	        },
	        set: function (interval) {
	            this._ticker.updateInterval = interval;
	        }
	    });
	    /**
		 *  What the source of the clock is, either "worker" (Web Worker [default]), 
		 *  "timeout" (setTimeout), or "offline" (none). 
		 *  @type {String}
		 *  @memberOf Tone.Context#
		 *  @name clockSource
		 */
	    Object.defineProperty(Tone.Context.prototype, 'clockSource', {
	        get: function () {
	            return this._ticker.type;
	        },
	        set: function (type) {
	            this._ticker.type = type;
	        }
	    });
	    /**
		 *  The type of playback, which affects tradeoffs between audio 
		 *  output latency and responsiveness. 
		 *  
		 *  In addition to setting the value in seconds, the latencyHint also
		 *  accepts the strings "interactive" (prioritizes low latency), 
		 *  "playback" (prioritizes sustained playback), "balanced" (balances
		 *  latency and performance), and "fastest" (lowest latency, might glitch more often). 
		 *  @type {String|Seconds}
		 *  @memberOf Tone.Context#
		 *  @name latencyHint
		 *  @example
		 * //set the lookAhead to 0.3 seconds
		 * Tone.context.latencyHint = 0.3;
		 */
	    Object.defineProperty(Tone.Context.prototype, 'latencyHint', {
	        get: function () {
	            return this._latencyHint;
	        },
	        set: function (hint) {
	            var lookAhead = hint;
	            this._latencyHint = hint;
	            if (Tone.isString(hint)) {
	                switch (hint) {
	                case 'interactive':
	                    lookAhead = 0.1;
	                    this._context.latencyHint = hint;
	                    break;
	                case 'playback':
	                    lookAhead = 0.8;
	                    this._context.latencyHint = hint;
	                    break;
	                case 'balanced':
	                    lookAhead = 0.25;
	                    this._context.latencyHint = hint;
	                    break;
	                case 'fastest':
	                    this._context.latencyHint = 'interactive';
	                    lookAhead = 0.01;
	                    break;
	                }
	            }
	            this.lookAhead = lookAhead;
	            this.updateInterval = lookAhead / 3;
	        }
	    });
	    /**
		 *  Clean up
		 *  @returns {Tone.Context} this
		 */
	    Tone.Context.prototype.dispose = function () {
	        Tone.Context.emit('close', this);
	        Tone.Emitter.prototype.dispose.call(this);
	        this._ticker.dispose();
	        this._ticker = null;
	        this._timeouts.dispose();
	        this._timeouts = null;
	        for (var con in this._constants) {
	            this._constants[con].disconnect();
	        }
	        this._constants = null;
	        this.close();
	        return this;
	    };
	    /**
		 * @class A class which provides a reliable callback using either
		 *        a Web Worker, or if that isn't supported, falls back to setTimeout.
		 * @private
		 */
	    var Ticker = function (callback, type, updateInterval) {
	        /**
			 * Either "worker" or "timeout"
			 * @type {String}
			 * @private
			 */
	        this._type = type;
	        /**
			 * The update interval of the worker
			 * @private
			 * @type {Number}
			 */
	        this._updateInterval = updateInterval;
	        /**
			 * The callback to invoke at regular intervals
			 * @type {Function}
			 * @private
			 */
	        this._callback = Tone.defaultArg(callback, Tone.noOp);
	        //create the clock source for the first time
	        this._createClock();
	    };
	    /**
		 * The possible ticker types
		 * @private
		 * @type {Object}
		 */
	    Ticker.Type = {
	        Worker: 'worker',
	        Timeout: 'timeout',
	        Offline: 'offline'
	    };
	    /**
		 *  Generate a web worker
		 *  @return  {WebWorker}
		 *  @private
		 */
	    Ticker.prototype._createWorker = function () {
	        //URL Shim
	        window.URL = window.URL || window.webkitURL;
	        var blob = new Blob([//the initial timeout time
	            'var timeoutTime = ' + (this._updateInterval * 1000).toFixed(1) + ';' + //onmessage callback
	            'self.onmessage = function(msg){' + '\ttimeoutTime = parseInt(msg.data);' + '};' + //the tick function which posts a message
	            //and schedules a new tick
	            'function tick(){' + '\tsetTimeout(tick, timeoutTime);' + '\tself.postMessage(\'tick\');' + '}' + //call tick initially
	            'tick();']);
	        var blobUrl = URL.createObjectURL(blob);
	        var worker = new Worker(blobUrl);
	        worker.onmessage = this._callback.bind(this);
	        this._worker = worker;
	    };
	    /**
		 * Create a timeout loop
		 * @private
		 */
	    Ticker.prototype._createTimeout = function () {
	        this._timeout = setTimeout(function () {
	            this._createTimeout();
	            this._callback();
	        }.bind(this), this._updateInterval * 1000);
	    };
	    /**
		 * Create the clock source.
		 * @private
		 */
	    Ticker.prototype._createClock = function () {
	        if (this._type === Ticker.Type.Worker) {
	            try {
	                this._createWorker();
	            } catch (e) {
	                // workers not supported, fallback to timeout
	                this._type = Ticker.Type.Timeout;
	                this._createClock();
	            }
	        } else if (this._type === Ticker.Type.Timeout) {
	            this._createTimeout();
	        }
	    };
	    /**
		 * @memberOf Ticker#
		 * @type {Number}
		 * @name updateInterval
		 * @private
		 */
	    Object.defineProperty(Ticker.prototype, 'updateInterval', {
	        get: function () {
	            return this._updateInterval;
	        },
	        set: function (interval) {
	            this._updateInterval = Math.max(interval, 128 / 44100);
	            if (this._type === Ticker.Type.Worker) {
	                this._worker.postMessage(Math.max(interval * 1000, 1));
	            }
	        }
	    });
	    /**
		 * The type of the ticker, either a worker or a timeout
		 * @memberOf Ticker#
		 * @type {Number}
		 * @name type
		 * @private
		 */
	    Object.defineProperty(Ticker.prototype, 'type', {
	        get: function () {
	            return this._type;
	        },
	        set: function (type) {
	            this._disposeClock();
	            this._type = type;
	            this._createClock();
	        }
	    });
	    /**
		 * Clean up the current clock source
		 * @private
		 */
	    Ticker.prototype._disposeClock = function () {
	        if (this._timeout) {
	            clearTimeout(this._timeout);
	            this._timeout = null;
	        }
	        if (this._worker) {
	            this._worker.terminate();
	            this._worker.onmessage = null;
	            this._worker = null;
	        }
	    };
	    /**
		 * Clean up
		 * @private
		 */
	    Ticker.prototype.dispose = function () {
	        this._disposeClock();
	        this._callback = null;
	    };
	    /**
		 *  Shim all connect/disconnect and some deprecated methods which are still in
		 *  some older implementations.
		 *  @private
		 */
	    Tone.getContext(function () {
	        var nativeConnect = AudioNode.prototype.connect;
	        var nativeDisconnect = AudioNode.prototype.disconnect;
	        //replace the old connect method
	        function toneConnect(B, outNum, inNum) {
	            if (B.input) {
	                inNum = Tone.defaultArg(inNum, 0);
	                if (Tone.isArray(B.input)) {
	                    this.connect(B.input[inNum]);
	                } else {
	                    this.connect(B.input, outNum, inNum);
	                }
	            } else {
	                try {
	                    if (B instanceof AudioNode) {
	                        nativeConnect.call(this, B, outNum, inNum);
	                    } else {
	                        nativeConnect.call(this, B, outNum);
	                    }
	                } catch (e) {
	                    throw new Error('error connecting to node: ' + B + '\n' + e);
	                }
	            }
	        }
	        //replace the old disconnect method
	        function toneDisconnect(B, outNum, inNum) {
	            if (B && B.input && Tone.isArray(B.input)) {
	                inNum = Tone.defaultArg(inNum, 0);
	                this.disconnect(B.input[inNum], outNum, 0);
	            } else if (B && B.input) {
	                this.disconnect(B.input, outNum, inNum);
	            } else {
	                try {
	                    nativeDisconnect.apply(this, arguments);
	                } catch (e) {
	                    throw new Error('error disconnecting node: ' + B + '\n' + e);
	                }
	            }
	        }
	        if (AudioNode.prototype.connect !== toneConnect) {
	            AudioNode.prototype.connect = toneConnect;
	            AudioNode.prototype.disconnect = toneDisconnect;
	        }
	    });
	    // set the audio context initially
	    if (Tone.supported) {
	        Tone.context = new Tone.Context();
	    } else {
	        console.warn('This browser does not support Tone.js');
	    }
	    return Tone.Context;
	});
	Module(function (Tone) {
	    /**
		 *  @class Tone.AudioNode is the base class for classes which process audio.
		 *         AudioNodes have inputs and outputs.
		 *  @param	{AudioContext=} context	The audio context to use with the class
		 *  @extends {Tone}
		 */
	    Tone.AudioNode = function () {
	        Tone.call(this);
	        //use the default context if one is not passed in
	        var options = Tone.defaults(arguments, ['context'], { 'context': Tone.context });
	        /**
			 * The AudioContext of this instance
			 * @private
			 * @type {AudioContext}
			 */
	        this._context = options.context;
	    };
	    Tone.extend(Tone.AudioNode);
	    /**
		 * Get the audio context belonging to this instance.
		 * @type {Tone.Context}
		 * @memberOf Tone.AudioNode#
		 * @name context
		 * @readOnly
		 */
	    Object.defineProperty(Tone.AudioNode.prototype, 'context', {
	        get: function () {
	            return this._context;
	        }
	    });
	    /**
		 *  Create input and outputs for this object.
		 *  @param  {Number}  [input=0]   The number of inputs
		 *  @param  {Number}  [outputs=0]  The number of outputs
		 *  @return  {Tone.AudioNode}  this
		 *  @private
		 */
	    Tone.AudioNode.prototype.createInsOuts = function (inputs, outputs) {
	        if (inputs === 1) {
	            this.input = this.context.createGain();
	        } else if (inputs > 1) {
	            this.input = new Array(inputs);
	        }
	        if (outputs === 1) {
	            this.output = this.context.createGain();
	        } else if (outputs > 1) {
	            this.output = new Array(outputs);
	        }
	    };
	    /**
		 *  The number of inputs feeding into the AudioNode.
		 *  For source nodes, this will be 0.
		 *  @type {Number}
		 *  @name numberOfInputs
		 *  @readOnly
		 */
	    Object.defineProperty(Tone.AudioNode.prototype, 'numberOfInputs', {
	        get: function () {
	            if (this.input) {
	                if (Tone.isArray(this.input)) {
	                    return this.input.length;
	                } else {
	                    return 1;
	                }
	            } else {
	                return 0;
	            }
	        }
	    });
	    /**
		 *  The number of outputs coming out of the AudioNode.
		 *  @type {Number}
		 *  @name numberOfOutputs
		 *  @readOnly
		 */
	    Object.defineProperty(Tone.AudioNode.prototype, 'numberOfOutputs', {
	        get: function () {
	            if (this.output) {
	                if (Tone.isArray(this.output)) {
	                    return this.output.length;
	                } else {
	                    return 1;
	                }
	            } else {
	                return 0;
	            }
	        }
	    });
	    /**
		 *  connect the output of a ToneNode to an AudioParam, AudioNode, or ToneNode
		 *  @param  {Tone | AudioParam | AudioNode} unit
		 *  @param {number} [outputNum=0] optionally which output to connect from
		 *  @param {number} [inputNum=0] optionally which input to connect to
		 *  @returns {Tone.AudioNode} this
		 */
	    Tone.AudioNode.prototype.connect = function (unit, outputNum, inputNum) {
	        if (Tone.isArray(this.output)) {
	            outputNum = Tone.defaultArg(outputNum, 0);
	            this.output[outputNum].connect(unit, 0, inputNum);
	        } else {
	            this.output.connect(unit, outputNum, inputNum);
	        }
	        return this;
	    };
	    /**
		 *  disconnect the output
		 *  @param {Number|AudioNode} output Either the output index to disconnect
		 *                                   if the output is an array, or the
		 *                                   node to disconnect from.
		 *  @returns {Tone.AudioNode} this
		 */
	    Tone.AudioNode.prototype.disconnect = function (destination, outputNum, inputNum) {
	        if (Tone.isArray(this.output)) {
	            if (Tone.isNumber(destination)) {
	                this.output[destination].disconnect();
	            } else {
	                outputNum = Tone.defaultArg(outputNum, 0);
	                this.output[outputNum].disconnect(destination, 0, inputNum);
	            }
	        } else {
	            this.output.disconnect.apply(this.output, arguments);
	        }
	    };
	    /**
		 *  Connect the output of this node to the rest of the nodes in series.
		 *  @example
		 *  //connect a node to an effect, panVol and then to the master output
		 *  node.chain(effect, panVol, Tone.Master);
		 *  @param {...AudioParam|Tone|AudioNode} nodes
		 *  @returns {Tone.AudioNode} this
		 *  @private
		 */
	    Tone.AudioNode.prototype.chain = function () {
	        var currentUnit = this;
	        for (var i = 0; i < arguments.length; i++) {
	            var toUnit = arguments[i];
	            currentUnit.connect(toUnit);
	            currentUnit = toUnit;
	        }
	        return this;
	    };
	    /**
		 *  connect the output of this node to the rest of the nodes in parallel.
		 *  @param {...AudioParam|Tone|AudioNode} nodes
		 *  @returns {Tone.AudioNode} this
		 *  @private
		 */
	    Tone.AudioNode.prototype.fan = function () {
	        for (var i = 0; i < arguments.length; i++) {
	            this.connect(arguments[i]);
	        }
	        return this;
	    };
	    if (window.AudioNode) {
	        //give native nodes chain and fan methods
	        AudioNode.prototype.chain = Tone.AudioNode.prototype.chain;
	        AudioNode.prototype.fan = Tone.AudioNode.prototype.fan;
	    }
	    /**
		 * Dispose and disconnect
		 * @return {Tone.AudioNode} this
		 */
	    Tone.AudioNode.prototype.dispose = function () {
	        if (!Tone.isUndef(this.input)) {
	            if (this.input instanceof AudioNode) {
	                this.input.disconnect();
	            }
	            this.input = null;
	        }
	        if (!Tone.isUndef(this.output)) {
	            if (this.output instanceof AudioNode) {
	                this.output.disconnect();
	            }
	            this.output = null;
	        }
	        this._context = null;
	        return this;
	    };
	    return Tone.AudioNode;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Base class for all Signals. Used Internally.
		 *
		 *  @constructor
		 *  @extends {Tone}
		 */
	    Tone.SignalBase = function () {
	        Tone.AudioNode.call(this);
	    };
	    Tone.extend(Tone.SignalBase, Tone.AudioNode);
	    /**
		 *  When signals connect to other signals or AudioParams,
		 *  they take over the output value of that signal or AudioParam.
		 *  For all other nodes, the behavior is the same as a default <code>connect</code>.
		 *
		 *  @override
		 *  @param {AudioParam|AudioNode|Tone.Signal|Tone} node
		 *  @param {number} [outputNumber=0] The output number to connect from.
		 *  @param {number} [inputNumber=0] The input number to connect to.
		 *  @returns {Tone.SignalBase} this
		 */
	    Tone.SignalBase.prototype.connect = function (node, outputNumber, inputNumber) {
	        //zero it out so that the signal can have full control
	        if (Tone.Signal && Tone.Signal === node.constructor || Tone.Param && Tone.Param === node.constructor || Tone.TimelineSignal && Tone.TimelineSignal === node.constructor) {
	            //cancel changes
	            node._param.cancelScheduledValues(0);
	            //reset the value
	            node._param.value = 0;
	            //mark the value as overridden
	            node.overridden = true;
	        } else if (node instanceof AudioParam) {
	            node.cancelScheduledValues(0);
	            node.value = 0;
	        }
	        Tone.AudioNode.prototype.connect.call(this, node, outputNumber, inputNumber);
	        return this;
	    };
	    return Tone.SignalBase;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Wraps the native Web Audio API 
		 *         [WaveShaperNode](http://webaudio.github.io/web-audio-api/#the-waveshapernode-interface).
		 *
		 *  @extends {Tone.SignalBase}
		 *  @constructor
		 *  @param {function|Array|Number} mapping The function used to define the values. 
		 *                                    The mapping function should take two arguments: 
		 *                                    the first is the value at the current position 
		 *                                    and the second is the array position. 
		 *                                    If the argument is an array, that array will be
		 *                                    set as the wave shaping function. The input
		 *                                    signal is an AudioRange [-1, 1] value and the output
		 *                                    signal can take on any numerical values. 
		 *                                    
		 *  @param {Number} [bufferLen=1024] The length of the WaveShaperNode buffer.
		 *  @example
		 * var timesTwo = new Tone.WaveShaper(function(val){
		 * 	return val * 2;
		 * }, 2048);
		 *  @example
		 * //a waveshaper can also be constructed with an array of values
		 * var invert = new Tone.WaveShaper([1, -1]);
		 */
	    Tone.WaveShaper = function (mapping, bufferLen) {
	        Tone.SignalBase.call(this);
	        /**
			 *  the waveshaper
			 *  @type {WaveShaperNode}
			 *  @private
			 */
	        this._shaper = this.input = this.output = this.context.createWaveShaper();
	        /**
			 *  the waveshapers curve
			 *  @type {Float32Array}
			 *  @private
			 */
	        this._curve = null;
	        if (Array.isArray(mapping)) {
	            this.curve = mapping;
	        } else if (isFinite(mapping) || Tone.isUndef(mapping)) {
	            this._curve = new Float32Array(Tone.defaultArg(mapping, 1024));
	        } else if (Tone.isFunction(mapping)) {
	            this._curve = new Float32Array(Tone.defaultArg(bufferLen, 1024));
	            this.setMap(mapping);
	        }
	    };
	    Tone.extend(Tone.WaveShaper, Tone.SignalBase);
	    /**
		 *  Uses a mapping function to set the value of the curve. 
		 *  @param {function} mapping The function used to define the values. 
		 *                            The mapping function take two arguments: 
		 *                            the first is the value at the current position 
		 *                            which goes from -1 to 1 over the number of elements
		 *                            in the curve array. The second argument is the array position. 
		 *  @returns {Tone.WaveShaper} this
		 *  @example
		 * //map the input signal from [-1, 1] to [0, 10]
		 * shaper.setMap(function(val, index){
		 * 	return (val + 1) * 5;
		 * })
		 */
	    Tone.WaveShaper.prototype.setMap = function (mapping) {
	        for (var i = 0, len = this._curve.length; i < len; i++) {
	            var normalized = i / (len - 1) * 2 - 1;
	            this._curve[i] = mapping(normalized, i);
	        }
	        this._shaper.curve = this._curve;
	        return this;
	    };
	    /**
		 * The array to set as the waveshaper curve. For linear curves
		 * array length does not make much difference, but for complex curves
		 * longer arrays will provide smoother interpolation. 
		 * @memberOf Tone.WaveShaper#
		 * @type {Array}
		 * @name curve
		 */
	    Object.defineProperty(Tone.WaveShaper.prototype, 'curve', {
	        get: function () {
	            return this._shaper.curve;
	        },
	        set: function (mapping) {
	            this._curve = new Float32Array(mapping);
	            this._shaper.curve = this._curve;
	        }
	    });
	    /**
		 * Specifies what type of oversampling (if any) should be used when 
		 * applying the shaping curve. Can either be "none", "2x" or "4x". 
		 * @memberOf Tone.WaveShaper#
		 * @type {string}
		 * @name oversample
		 */
	    Object.defineProperty(Tone.WaveShaper.prototype, 'oversample', {
	        get: function () {
	            return this._shaper.oversample;
	        },
	        set: function (oversampling) {
	            if ([
	                    'none',
	                    '2x',
	                    '4x'
	                ].indexOf(oversampling) !== -1) {
	                this._shaper.oversample = oversampling;
	            } else {
	                throw new RangeError('Tone.WaveShaper: oversampling must be either \'none\', \'2x\', or \'4x\'');
	            }
	        }
	    });
	    /**
		 *  Clean up.
		 *  @returns {Tone.WaveShaper} this
		 */
	    Tone.WaveShaper.prototype.dispose = function () {
	        Tone.SignalBase.prototype.dispose.call(this);
	        this._shaper.disconnect();
	        this._shaper = null;
	        this._curve = null;
	        return this;
	    };
	    return Tone.WaveShaper;
	});
	Module(function (Tone) {
	    /**
		 *  @class Tone.TimeBase is a flexible encoding of time
		 *         which can be evaluated to and from a string.
		 *         Parsing code modified from https://code.google.com/p/tapdigit/
		 *         Copyright 2011 2012 Ariya Hidayat, New BSD License
		 *  @extends {Tone}
		 *  @param  {Time}  val    The time value as a number or string
		 *  @param  {String=}  units  Unit values
		 *  @example
		 * Tone.TimeBase(4, "n")
		 * Tone.TimeBase(2, "t")
		 * Tone.TimeBase("2t").add("1m")
		 * Tone.TimeBase("2t + 1m");
		 */
	    Tone.TimeBase = function (val, units) {
	        //allows it to be constructed with or without 'new'
	        if (this instanceof Tone.TimeBase) {
	            /**
				 *  Any expressions parsed from the Time
				 *  @type  {Array}
				 *  @private
				 */
	            this._expr = this._noOp;
	            if (val instanceof Tone.TimeBase) {
	                this.copy(val);
	            } else if (!Tone.isUndef(units) || Tone.isNumber(val)) {
	                //default units
	                units = Tone.defaultArg(units, this._defaultUnits);
	                var method = this._primaryExpressions[units].method;
	                this._expr = method.bind(this, val);
	            } else if (Tone.isString(val)) {
	                this.set(val);
	            } else if (Tone.isUndef(val)) {
	                //default expression
	                this._expr = this._defaultExpr();
	            }
	        } else {
	            return new Tone.TimeBase(val, units);
	        }
	    };
	    Tone.extend(Tone.TimeBase);
	    /**
		 *  Repalce the current time value with the value
		 *  given by the expression string.
		 *  @param  {String}  exprString
		 *  @return {Tone.TimeBase} this
		 */
	    Tone.TimeBase.prototype.set = function (exprString) {
	        this._expr = this._parseExprString(exprString);
	        return this;
	    };
	    /**
		 *  Return a clone of the TimeBase object.
		 *  @return  {Tone.TimeBase} The new cloned Tone.TimeBase
		 */
	    Tone.TimeBase.prototype.clone = function () {
	        var instance = new this.constructor();
	        instance.copy(this);
	        return instance;
	    };
	    /**
		 *  Copies the value of time to this Time
		 *  @param {Tone.TimeBase} time
		 *  @return  {TimeBase}
		 */
	    Tone.TimeBase.prototype.copy = function (time) {
	        var val = time._expr();
	        return this.set(val);
	    };
	    ///////////////////////////////////////////////////////////////////////////
	    //	ABSTRACT SYNTAX TREE PARSER
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 *  All the primary expressions.
		 *  @private
		 *  @type  {Object}
		 */
	    Tone.TimeBase.prototype._primaryExpressions = {
	        'n': {
	            regexp: /^(\d+)n/i,
	            method: function (value) {
	                value = parseInt(value);
	                if (value === 1) {
	                    return this._beatsToUnits(this._timeSignature());
	                } else {
	                    return this._beatsToUnits(4 / value);
	                }
	            }
	        },
	        't': {
	            regexp: /^(\d+)t/i,
	            method: function (value) {
	                value = parseInt(value);
	                return this._beatsToUnits(8 / (parseInt(value) * 3));
	            }
	        },
	        'm': {
	            regexp: /^(\d+)m/i,
	            method: function (value) {
	                return this._beatsToUnits(parseInt(value) * this._timeSignature());
	            }
	        },
	        'i': {
	            regexp: /^(\d+)i/i,
	            method: function (value) {
	                return this._ticksToUnits(parseInt(value));
	            }
	        },
	        'hz': {
	            regexp: /^(\d+(?:\.\d+)?)hz/i,
	            method: function (value) {
	                return this._frequencyToUnits(parseFloat(value));
	            }
	        },
	        'tr': {
	            regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,
	            method: function (m, q, s) {
	                var total = 0;
	                if (m && m !== '0') {
	                    total += this._beatsToUnits(this._timeSignature() * parseFloat(m));
	                }
	                if (q && q !== '0') {
	                    total += this._beatsToUnits(parseFloat(q));
	                }
	                if (s && s !== '0') {
	                    total += this._beatsToUnits(parseFloat(s) / 4);
	                }
	                return total;
	            }
	        },
	        's': {
	            regexp: /^(\d+(?:\.\d+)?s)/,
	            method: function (value) {
	                return this._secondsToUnits(parseFloat(value));
	            }
	        },
	        'samples': {
	            regexp: /^(\d+)samples/,
	            method: function (value) {
	                return parseInt(value) / this.context.sampleRate;
	            }
	        },
	        'default': {
	            regexp: /^(\d+(?:\.\d+)?)/,
	            method: function (value) {
	                return this._primaryExpressions[this._defaultUnits].method.call(this, value);
	            }
	        }
	    };
	    /**
		 *  All the binary expressions that TimeBase can accept.
		 *  @private
		 *  @type  {Object}
		 */
	    Tone.TimeBase.prototype._binaryExpressions = {
	        '+': {
	            regexp: /^\+/,
	            precedence: 2,
	            method: function (lh, rh) {
	                return lh() + rh();
	            }
	        },
	        '-': {
	            regexp: /^\-/,
	            precedence: 2,
	            method: function (lh, rh) {
	                return lh() - rh();
	            }
	        },
	        '*': {
	            regexp: /^\*/,
	            precedence: 1,
	            method: function (lh, rh) {
	                return lh() * rh();
	            }
	        },
	        '/': {
	            regexp: /^\//,
	            precedence: 1,
	            method: function (lh, rh) {
	                return lh() / rh();
	            }
	        }
	    };
	    /**
		 *  All the unary expressions.
		 *  @private
		 *  @type  {Object}
		 */
	    Tone.TimeBase.prototype._unaryExpressions = {
	        'neg': {
	            regexp: /^\-/,
	            method: function (lh) {
	                return -lh();
	            }
	        }
	    };
	    /**
		 *  Syntactic glue which holds expressions together
		 *  @private
		 *  @type  {Object}
		 */
	    Tone.TimeBase.prototype._syntaxGlue = {
	        '(': { regexp: /^\(/ },
	        ')': { regexp: /^\)/ }
	    };
	    /**
		 *  tokenize the expression based on the Expressions object
		 *  @param   {string} expr 
		 *  @return  {Object}      returns two methods on the tokenized list, next and peek
		 *  @private
		 */
	    Tone.TimeBase.prototype._tokenize = function (expr) {
	        var position = -1;
	        var tokens = [];
	        while (expr.length > 0) {
	            expr = expr.trim();
	            var token = getNextToken(expr, this);
	            tokens.push(token);
	            expr = expr.substr(token.value.length);
	        }
	        function getNextToken(expr, context) {
	            var expressions = [
	                '_binaryExpressions',
	                '_unaryExpressions',
	                '_primaryExpressions',
	                '_syntaxGlue'
	            ];
	            for (var i = 0; i < expressions.length; i++) {
	                var group = context[expressions[i]];
	                for (var opName in group) {
	                    var op = group[opName];
	                    var reg = op.regexp;
	                    var match = expr.match(reg);
	                    if (match !== null) {
	                        return {
	                            method: op.method,
	                            precedence: op.precedence,
	                            regexp: op.regexp,
	                            value: match[0]
	                        };
	                    }
	                }
	            }
	            throw new SyntaxError('Tone.TimeBase: Unexpected token ' + expr);
	        }
	        return {
	            next: function () {
	                return tokens[++position];
	            },
	            peek: function () {
	                return tokens[position + 1];
	            }
	        };
	    };
	    /**
		 *  Given a token, find the value within the groupName
		 *  @param {Object} token
		 *  @param {String} groupName
		 *  @param {Number} precedence
		 *  @private
		 */
	    Tone.TimeBase.prototype._matchGroup = function (token, group, prec) {
	        var ret = false;
	        if (!Tone.isUndef(token)) {
	            for (var opName in group) {
	                var op = group[opName];
	                if (op.regexp.test(token.value)) {
	                    if (!Tone.isUndef(prec)) {
	                        if (op.precedence === prec) {
	                            return op;
	                        }
	                    } else {
	                        return op;
	                    }
	                }
	            }
	        }
	        return ret;
	    };
	    /**
		 *  Match a binary expression given the token and the precedence
		 *  @param {Lexer} lexer
		 *  @param {Number} precedence
		 *  @private
		 */
	    Tone.TimeBase.prototype._parseBinary = function (lexer, precedence) {
	        if (Tone.isUndef(precedence)) {
	            precedence = 2;
	        }
	        var expr;
	        if (precedence < 0) {
	            expr = this._parseUnary(lexer);
	        } else {
	            expr = this._parseBinary(lexer, precedence - 1);
	        }
	        var token = lexer.peek();
	        while (token && this._matchGroup(token, this._binaryExpressions, precedence)) {
	            token = lexer.next();
	            expr = token.method.bind(this, expr, this._parseBinary(lexer, precedence - 1));
	            token = lexer.peek();
	        }
	        return expr;
	    };
	    /**
		 *  Match a unary expression.
		 *  @param {Lexer} lexer
		 *  @private
		 */
	    Tone.TimeBase.prototype._parseUnary = function (lexer) {
	        var token, expr;
	        token = lexer.peek();
	        var op = this._matchGroup(token, this._unaryExpressions);
	        if (op) {
	            token = lexer.next();
	            expr = this._parseUnary(lexer);
	            return op.method.bind(this, expr);
	        }
	        return this._parsePrimary(lexer);
	    };
	    /**
		 *  Match a primary expression (a value).
		 *  @param {Lexer} lexer
		 *  @private
		 */
	    Tone.TimeBase.prototype._parsePrimary = function (lexer) {
	        var token, expr;
	        token = lexer.peek();
	        if (Tone.isUndef(token)) {
	            throw new SyntaxError('Tone.TimeBase: Unexpected end of expression');
	        }
	        if (this._matchGroup(token, this._primaryExpressions)) {
	            token = lexer.next();
	            var matching = token.value.match(token.regexp);
	            return token.method.bind(this, matching[1], matching[2], matching[3]);
	        }
	        if (token && token.value === '(') {
	            lexer.next();
	            expr = this._parseBinary(lexer);
	            token = lexer.next();
	            if (!(token && token.value === ')')) {
	                throw new SyntaxError('Expected )');
	            }
	            return expr;
	        }
	        throw new SyntaxError('Tone.TimeBase: Cannot process token ' + token.value);
	    };
	    /**
		 *  Recursively parse the string expression into a syntax tree.
		 *  @param   {string} expr 
		 *  @return  {Function} the bound method to be evaluated later
		 *  @private
		 */
	    Tone.TimeBase.prototype._parseExprString = function (exprString) {
	        if (!Tone.isString(exprString)) {
	            exprString = exprString.toString();
	        }
	        var lexer = this._tokenize(exprString);
	        var tree = this._parseBinary(lexer);
	        return tree;
	    };
	    ///////////////////////////////////////////////////////////////////////////
	    //	DEFAULTS
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 *  The initial expression value
		 *  @return  {Number}  The initial value 0
		 *  @private
		 */
	    Tone.TimeBase.prototype._noOp = function () {
	        return 0;
	    };
	    /**
		 *  The default expression value if no arguments are given
		 *  @private
		 */
	    Tone.TimeBase.prototype._defaultExpr = function () {
	        return this._noOp;
	    };
	    /**
		 *  The default units if none are given.
		 *  @private
		 */
	    Tone.TimeBase.prototype._defaultUnits = 's';
	    ///////////////////////////////////////////////////////////////////////////
	    //	UNIT CONVERSIONS
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 *  Returns the value of a frequency in the current units
		 *  @param {Frequency} freq
		 *  @return  {Number}
		 *  @private
		 */
	    Tone.TimeBase.prototype._frequencyToUnits = function (freq) {
	        return 1 / freq;
	    };
	    /**
		 *  Return the value of the beats in the current units
		 *  @param {Number} beats
		 *  @return  {Number}
		 *  @private
		 */
	    Tone.TimeBase.prototype._beatsToUnits = function (beats) {
	        return 60 / Tone.Transport.bpm.value * beats;
	    };
	    /**
		 *  Returns the value of a second in the current units
		 *  @param {Seconds} seconds
		 *  @return  {Number}
		 *  @private
		 */
	    Tone.TimeBase.prototype._secondsToUnits = function (seconds) {
	        return seconds;
	    };
	    /**
		 *  Returns the value of a tick in the current time units
		 *  @param {Ticks} ticks
		 *  @return  {Number}
		 *  @private
		 */
	    Tone.TimeBase.prototype._ticksToUnits = function (ticks) {
	        return ticks * (this._beatsToUnits(1) / Tone.Transport.PPQ);
	    };
	    /**
		 *  Return the time signature.
		 *  @return  {Number}
		 *  @private
		 */
	    Tone.TimeBase.prototype._timeSignature = function () {
	        return Tone.Transport.timeSignature;
	    };
	    ///////////////////////////////////////////////////////////////////////////
	    //	EXPRESSIONS
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 *  Push an expression onto the expression list
		 *  @param  {Time}  val
		 *  @param  {String}  type
		 *  @param  {String}  units
		 *  @return  {Tone.TimeBase} 
		 *  @private
		 */
	    Tone.TimeBase.prototype._pushExpr = function (val, name, units) {
	        //create the expression
	        if (!(val instanceof Tone.TimeBase)) {
	            val = new this.constructor(val, units);
	        }
	        this._expr = this._binaryExpressions[name].method.bind(this, this._expr, val._expr);
	        return this;
	    };
	    /**
		 *  Add to the current value.
		 *  @param  {Time}  val    The value to add
		 *  @param  {String=}  units  Optional units to use with the value.
		 *  @return  {Tone.TimeBase}  this
		 *  @example
		 * Tone.TimeBase("2m").add("1m"); //"3m"
		 */
	    Tone.TimeBase.prototype.add = function (val, units) {
	        return this._pushExpr(val, '+', units);
	    };
	    /**
		 *  Subtract the value from the current time.
		 *  @param  {Time}  val    The value to subtract
		 *  @param  {String=}  units  Optional units to use with the value.
		 *  @return  {Tone.TimeBase}  this
		 *  @example
		 * Tone.TimeBase("2m").sub("1m"); //"1m"
		 */
	    Tone.TimeBase.prototype.sub = function (val, units) {
	        return this._pushExpr(val, '-', units);
	    };
	    /**
		 *  Multiply the current value by the given time.
		 *  @param  {Time}  val    The value to multiply
		 *  @param  {String=}  units  Optional units to use with the value.
		 *  @return  {Tone.TimeBase}  this
		 *  @example
		 * Tone.TimeBase("2m").mult("2"); //"4m"
		 */
	    Tone.TimeBase.prototype.mult = function (val, units) {
	        return this._pushExpr(val, '*', units);
	    };
	    /**
		 *  Divide the current value by the given time.
		 *  @param  {Time}  val    The value to divide by
		 *  @param  {String=}  units  Optional units to use with the value.
		 *  @return  {Tone.TimeBase}  this
		 *  @example
		 * Tone.TimeBase("2m").div(2); //"1m"
		 */
	    Tone.TimeBase.prototype.div = function (val, units) {
	        return this._pushExpr(val, '/', units);
	    };
	    /**
		 *  Evaluate the time value. Returns the time
		 *  in seconds.
		 *  @return  {Seconds} 
		 */
	    Tone.TimeBase.prototype.valueOf = function () {
	        return this._expr();
	    };
	    /**
		 *  Clean up
		 *  @return {Tone.TimeBase} this
		 */
	    Tone.TimeBase.prototype.dispose = function () {
	        this._expr = null;
	    };
	    return Tone.TimeBase;
	});
	Module(function (Tone) {
	    /**
		 *  @class Tone.Time is a primitive type for encoding Time values. 
		 *         Eventually all time values are evaluated to seconds
		 *         using the `eval` method. Tone.Time can be constructed
		 *         with or without the `new` keyword. Tone.Time can be passed
		 *         into the parameter of any method which takes time as an argument. 
		 *  @constructor
		 *  @extends {Tone.TimeBase}
		 *  @param  {String|Number}  val    The time value.
		 *  @param  {String=}  units  The units of the value.
		 *  @example
		 * var t = Tone.Time("4n");//encodes a quarter note
		 * t.mult(4); // multiply that value by 4
		 * t.toNotation(); //returns "1m"
		 */
	    Tone.Time = function (val, units) {
	        if (this instanceof Tone.Time) {
	            /**
				 *  If the current clock time should
				 *  be added to the output
				 *  @type  {Boolean}
				 *  @private
				 */
	            this._plusNow = false;
	            Tone.TimeBase.call(this, val, units);
	        } else {
	            return new Tone.Time(val, units);
	        }
	    };
	    Tone.extend(Tone.Time, Tone.TimeBase);
	    //clone the expressions so that 
	    //we can add more without modifying the original
	    Tone.Time.prototype._unaryExpressions = Object.create(Tone.TimeBase.prototype._unaryExpressions);
	    /*
		 *  Adds an additional unary expression
		 *  which quantizes values to the next subdivision
		 *  @type {Object}
		 *  @private
		 */
	    Tone.Time.prototype._unaryExpressions.quantize = {
	        regexp: /^@/,
	        method: function (rh) {
	            return Tone.Transport.nextSubdivision(rh());
	        }
	    };
	    /*
		 *  Adds an additional unary expression
		 *  which adds the current clock time.
		 *  @type {Object}
		 *  @private
		 */
	    Tone.Time.prototype._unaryExpressions.now = {
	        regexp: /^\+/,
	        method: function (lh) {
	            this._plusNow = true;
	            return lh();
	        }
	    };
	    /**
		 *  Quantize the time by the given subdivision. Optionally add a
		 *  percentage which will move the time value towards the ideal
		 *  quantized value by that percentage. 
		 *  @param  {Number|Time}  val    The subdivision to quantize to
		 *  @param  {NormalRange}  [percent=1]  Move the time value
		 *                                   towards the quantized value by
		 *                                   a percentage.
		 *  @return  {Tone.Time}  this
		 *  @example
		 * Tone.Time(21).quantize(2) //returns 22
		 * Tone.Time(0.6).quantize("4n", 0.5) //returns 0.55
		 */
	    Tone.Time.prototype.quantize = function (subdiv, percent) {
	        percent = Tone.defaultArg(percent, 1);
	        this._expr = function (expr, subdivision, percent) {
	            expr = expr();
	            subdivision = subdivision.toSeconds();
	            var multiple = Math.round(expr / subdivision);
	            var ideal = multiple * subdivision;
	            var diff = ideal - expr;
	            return expr + diff * percent;
	        }.bind(this, this._expr, new this.constructor(subdiv), percent);
	        return this;
	    };
	    /**
		 *  Adds the clock time to the time expression at the 
		 *  moment of evaluation. 
		 *  @return  {Tone.Time}  this
		 */
	    Tone.Time.prototype.addNow = function () {
	        this._plusNow = true;
	        return this;
	    };
	    /**
		 *  Override the default value return when no arguments are passed in.
		 *  The default value is 'now'
		 *  @override
		 *  @private
		 */
	    Tone.Time.prototype._defaultExpr = function () {
	        this._plusNow = true;
	        return this._noOp;
	    };
	    /**
		 *  Copies the value of time to this Time
		 *  @param {Tone.Time} time
		 *  @return  {Time}
		 */
	    Tone.Time.prototype.copy = function (time) {
	        Tone.TimeBase.prototype.copy.call(this, time);
	        this._plusNow = time._plusNow;
	        return this;
	    };
	    //CONVERSIONS//////////////////////////////////////////////////////////////
	    /**
		 *  Convert a Time to Notation. Values will be thresholded to the nearest 128th note. 
		 *  @return {Notation} 
		 *  @example
		 * //if the Transport is at 120bpm:
		 * Tone.Time(2).toNotation();//returns "1m"
		 */
	    Tone.Time.prototype.toNotation = function () {
	        var time = this.toSeconds();
	        var testNotations = [
	            '1m',
	            '2n',
	            '4n',
	            '8n',
	            '16n',
	            '32n',
	            '64n',
	            '128n'
	        ];
	        var retNotation = this._toNotationHelper(time, testNotations);
	        //try the same thing but with tripelets
	        var testTripletNotations = [
	            '1m',
	            '2n',
	            '2t',
	            '4n',
	            '4t',
	            '8n',
	            '8t',
	            '16n',
	            '16t',
	            '32n',
	            '32t',
	            '64n',
	            '64t',
	            '128n'
	        ];
	        var retTripletNotation = this._toNotationHelper(time, testTripletNotations);
	        //choose the simpler expression of the two
	        if (retTripletNotation.split('+').length < retNotation.split('+').length) {
	            return retTripletNotation;
	        } else {
	            return retNotation;
	        }
	    };
	    /**
		 *  Helper method for Tone.toNotation
		 *  @param {Number} units 
		 *  @param {Array} testNotations
		 *  @return {String}
		 *  @private
		 */
	    Tone.Time.prototype._toNotationHelper = function (units, testNotations) {
	        //the threshold is the last value in the array
	        var threshold = this._notationToUnits(testNotations[testNotations.length - 1]);
	        var retNotation = '';
	        for (var i = 0; i < testNotations.length; i++) {
	            var notationTime = this._notationToUnits(testNotations[i]);
	            //account for floating point errors (i.e. round up if the value is 0.999999)
	            var multiple = units / notationTime;
	            var floatingPointError = 0.000001;
	            if (1 - multiple % 1 < floatingPointError) {
	                multiple += floatingPointError;
	            }
	            multiple = Math.floor(multiple);
	            if (multiple > 0) {
	                if (multiple === 1) {
	                    retNotation += testNotations[i];
	                } else {
	                    retNotation += multiple.toString() + '*' + testNotations[i];
	                }
	                units -= multiple * notationTime;
	                if (units < threshold) {
	                    break;
	                } else {
	                    retNotation += ' + ';
	                }
	            }
	        }
	        if (retNotation === '') {
	            retNotation = '0';
	        }
	        return retNotation;
	    };
	    /**
		 *  Convert a notation value to the current units
		 *  @param  {Notation}  notation 
		 *  @return  {Number} 
		 *  @private
		 */
	    Tone.Time.prototype._notationToUnits = function (notation) {
	        var primaryExprs = this._primaryExpressions;
	        var notationExprs = [
	            primaryExprs.n,
	            primaryExprs.t,
	            primaryExprs.m
	        ];
	        for (var i = 0; i < notationExprs.length; i++) {
	            var expr = notationExprs[i];
	            var match = notation.match(expr.regexp);
	            if (match) {
	                return expr.method.call(this, match[1]);
	            }
	        }
	    };
	    /**
		 *  Return the time encoded as Bars:Beats:Sixteenths.
		 *  @return  {BarsBeatsSixteenths}
		 */
	    Tone.Time.prototype.toBarsBeatsSixteenths = function () {
	        var quarterTime = this._beatsToUnits(1);
	        var quarters = this.toSeconds() / quarterTime;
	        var measures = Math.floor(quarters / this._timeSignature());
	        var sixteenths = quarters % 1 * 4;
	        quarters = Math.floor(quarters) % this._timeSignature();
	        sixteenths = sixteenths.toString();
	        if (sixteenths.length > 3) {
	            // the additional parseFloat removes insignificant trailing zeroes
	            sixteenths = parseFloat(parseFloat(sixteenths).toFixed(3));
	        }
	        var progress = [
	            measures,
	            quarters,
	            sixteenths
	        ];
	        return progress.join(':');
	    };
	    /**
		 *  Return the time in ticks.
		 *  @return  {Ticks}
		 */
	    Tone.Time.prototype.toTicks = function () {
	        var quarterTime = this._beatsToUnits(1);
	        var quarters = this.valueOf() / quarterTime;
	        return Math.floor(quarters * Tone.Transport.PPQ);
	    };
	    /**
		 *  Return the time in samples
		 *  @return  {Samples}  
		 */
	    Tone.Time.prototype.toSamples = function () {
	        return this.toSeconds() * this.context.sampleRate;
	    };
	    /**
		 *  Return the time as a frequency value
		 *  @return  {Frequency} 
		 *  @example
		 * Tone.Time(2).toFrequency(); //0.5
		 */
	    Tone.Time.prototype.toFrequency = function () {
	        return 1 / this.toSeconds();
	    };
	    /**
		 *  Return the time in seconds.
		 *  @return  {Seconds} 
		 */
	    Tone.Time.prototype.toSeconds = function () {
	        return this.valueOf();
	    };
	    /**
		 *  Return the time in milliseconds.
		 *  @return  {Milliseconds} 
		 */
	    Tone.Time.prototype.toMilliseconds = function () {
	        return this.toSeconds() * 1000;
	    };
	    /**
		 *  Return the time in seconds.
		 *  @return  {Seconds} 
		 */
	    Tone.Time.prototype.valueOf = function () {
	        var val = this._expr();
	        return val + (this._plusNow ? this.now() : 0);
	    };
	    return Tone.Time;
	});
	Module(function (Tone) {
	    /**
		 *  @class Tone.Frequency is a primitive type for encoding Frequency values.
		 *         Eventually all time values are evaluated to hertz
		 *         using the `eval` method.
		 *  @constructor
		 *  @extends {Tone.TimeBase}
		 *  @param  {String|Number}  val    The time value.
		 *  @param  {String=}  units  The units of the value.
		 *  @example
		 * Tone.Frequency("C3") // 261
		 * Tone.Frequency(38, "midi") //
		 * Tone.Frequency("C3").transpose(4);
		 */
	    Tone.Frequency = function (val, units) {
	        if (this instanceof Tone.Frequency) {
	            Tone.TimeBase.call(this, val, units);
	        } else {
	            return new Tone.Frequency(val, units);
	        }
	    };
	    Tone.extend(Tone.Frequency, Tone.TimeBase);
	    ///////////////////////////////////////////////////////////////////////////
	    //	AUGMENT BASE EXPRESSIONS
	    ///////////////////////////////////////////////////////////////////////////
	    //clone the expressions so that
	    //we can add more without modifying the original
	    Tone.Frequency.prototype._primaryExpressions = Object.create(Tone.TimeBase.prototype._primaryExpressions);
	    /*
		 *  midi type primary expression
		 *  @type {Object}
		 *  @private
		 */
	    Tone.Frequency.prototype._primaryExpressions.midi = {
	        regexp: /^(\d+(?:\.\d+)?midi)/,
	        method: function (value) {
	            return this.midiToFrequency(value);
	        }
	    };
	    /*
		 *  note type primary expression
		 *  @type {Object}
		 *  @private
		 */
	    Tone.Frequency.prototype._primaryExpressions.note = {
	        regexp: /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i,
	        method: function (pitch, octave) {
	            var index = noteToScaleIndex[pitch.toLowerCase()];
	            var noteNumber = index + (parseInt(octave) + 1) * 12;
	            return this.midiToFrequency(noteNumber);
	        }
	    };
	    /*
		 *  BeatsBarsSixteenths type primary expression
		 *  @type {Object}
		 *  @private
		 */
	    Tone.Frequency.prototype._primaryExpressions.tr = {
	        regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,
	        method: function (m, q, s) {
	            var total = 1;
	            if (m && m !== '0') {
	                total *= this._beatsToUnits(this._timeSignature() * parseFloat(m));
	            }
	            if (q && q !== '0') {
	                total *= this._beatsToUnits(parseFloat(q));
	            }
	            if (s && s !== '0') {
	                total *= this._beatsToUnits(parseFloat(s) / 4);
	            }
	            return total;
	        }
	    };
	    ///////////////////////////////////////////////////////////////////////////
	    //	EXPRESSIONS
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 *  Transposes the frequency by the given number of semitones.
		 *  @param  {Interval}  interval
		 *  @return  {Tone.Frequency} this
		 *  @example
		 * Tone.Frequency("A4").transpose(3); //"C5"
		 */
	    Tone.Frequency.prototype.transpose = function (interval) {
	        this._expr = function (expr, interval) {
	            var val = expr();
	            return val * Tone.intervalToFrequencyRatio(interval);
	        }.bind(this, this._expr, interval);
	        return this;
	    };
	    /**
		 *  Takes an array of semitone intervals and returns
		 *  an array of frequencies transposed by those intervals.
		 *  @param  {Array}  intervals
		 *  @return  {Tone.Frequency} this
		 *  @example
		 * Tone.Frequency("A4").harmonize([0, 3, 7]); //["A4", "C5", "E5"]
		 */
	    Tone.Frequency.prototype.harmonize = function (intervals) {
	        this._expr = function (expr, intervals) {
	            var val = expr();
	            var ret = [];
	            for (var i = 0; i < intervals.length; i++) {
	                ret[i] = val * Tone.intervalToFrequencyRatio(intervals[i]);
	            }
	            return ret;
	        }.bind(this, this._expr, intervals);
	        return this;
	    };
	    ///////////////////////////////////////////////////////////////////////////
	    //	UNIT CONVERSIONS
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 *  Return the value of the frequency as a MIDI note
		 *  @return  {MIDI}
		 *  @example
		 * Tone.Frequency("C4").toMidi(); //60
		 */
	    Tone.Frequency.prototype.toMidi = function () {
	        return this.frequencyToMidi(this.valueOf());
	    };
	    /**
		 *  Return the value of the frequency in Scientific Pitch Notation
		 *  @return  {Note}
		 *  @example
		 * Tone.Frequency(69, "midi").toNote(); //"A4"
		 */
	    Tone.Frequency.prototype.toNote = function () {
	        var freq = this.valueOf();
	        var log = Math.log(freq / Tone.Frequency.A4) / Math.LN2;
	        var noteNumber = Math.round(12 * log) + 57;
	        var octave = Math.floor(noteNumber / 12);
	        if (octave < 0) {
	            noteNumber += -12 * octave;
	        }
	        var noteName = scaleIndexToNote[noteNumber % 12];
	        return noteName + octave.toString();
	    };
	    /**
		 *  Return the duration of one cycle in seconds.
		 *  @return  {Seconds}
		 */
	    Tone.Frequency.prototype.toSeconds = function () {
	        return 1 / this.valueOf();
	    };
	    /**
		 *  Return the value in Hertz
		 *  @return  {Frequency}
		 */
	    Tone.Frequency.prototype.toFrequency = function () {
	        return this.valueOf();
	    };
	    /**
		 *  Return the duration of one cycle in ticks
		 *  @return  {Ticks}
		 */
	    Tone.Frequency.prototype.toTicks = function () {
	        var quarterTime = this._beatsToUnits(1);
	        var quarters = this.valueOf() / quarterTime;
	        return Math.floor(quarters * Tone.Transport.PPQ);
	    };
	    ///////////////////////////////////////////////////////////////////////////
	    //	UNIT CONVERSIONS HELPERS
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 *  Returns the value of a frequency in the current units
		 *  @param {Frequency} freq
		 *  @return  {Number}
		 *  @private
		 */
	    Tone.Frequency.prototype._frequencyToUnits = function (freq) {
	        return freq;
	    };
	    /**
		 *  Returns the value of a tick in the current time units
		 *  @param {Ticks} ticks
		 *  @return  {Number}
		 *  @private
		 */
	    Tone.Frequency.prototype._ticksToUnits = function (ticks) {
	        return 1 / (ticks * 60 / (Tone.Transport.bpm.value * Tone.Transport.PPQ));
	    };
	    /**
		 *  Return the value of the beats in the current units
		 *  @param {Number} beats
		 *  @return  {Number}
		 *  @private
		 */
	    Tone.Frequency.prototype._beatsToUnits = function (beats) {
	        return 1 / Tone.TimeBase.prototype._beatsToUnits.call(this, beats);
	    };
	    /**
		 *  Returns the value of a second in the current units
		 *  @param {Seconds} seconds
		 *  @return  {Number}
		 *  @private
		 */
	    Tone.Frequency.prototype._secondsToUnits = function (seconds) {
	        return 1 / seconds;
	    };
	    /**
		 *  The default units if none are given.
		 *  @private
		 */
	    Tone.Frequency.prototype._defaultUnits = 'hz';
	    ///////////////////////////////////////////////////////////////////////////
	    //	FREQUENCY CONVERSIONS
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 *  Note to scale index
		 *  @type  {Object}
		 */
	    var noteToScaleIndex = {
	        'cbb': -2,
	        'cb': -1,
	        'c': 0,
	        'c#': 1,
	        'cx': 2,
	        'dbb': 0,
	        'db': 1,
	        'd': 2,
	        'd#': 3,
	        'dx': 4,
	        'ebb': 2,
	        'eb': 3,
	        'e': 4,
	        'e#': 5,
	        'ex': 6,
	        'fbb': 3,
	        'fb': 4,
	        'f': 5,
	        'f#': 6,
	        'fx': 7,
	        'gbb': 5,
	        'gb': 6,
	        'g': 7,
	        'g#': 8,
	        'gx': 9,
	        'abb': 7,
	        'ab': 8,
	        'a': 9,
	        'a#': 10,
	        'ax': 11,
	        'bbb': 9,
	        'bb': 10,
	        'b': 11,
	        'b#': 12,
	        'bx': 13
	    };
	    /**
		 *  scale index to note (sharps)
		 *  @type  {Array}
		 */
	    var scaleIndexToNote = [
	        'C',
	        'C#',
	        'D',
	        'D#',
	        'E',
	        'F',
	        'F#',
	        'G',
	        'G#',
	        'A',
	        'A#',
	        'B'
	    ];
	    /**
		 *  The [concert pitch](https://en.wikipedia.org/wiki/Concert_pitch)
		 *  A4's values in Hertz.
		 *  @type {Frequency}
		 *  @static
		 */
	    Tone.Frequency.A4 = 440;
	    /**
		 *  Convert a MIDI note to frequency value.
		 *  @param  {MIDI} midi The midi number to convert.
		 *  @return {Frequency} the corresponding frequency value
		 *  @example
		 * tone.midiToFrequency(69); // returns 440
		 */
	    Tone.Frequency.prototype.midiToFrequency = function (midi) {
	        return Tone.Frequency.A4 * Math.pow(2, (midi - 69) / 12);
	    };
	    /**
		 *  Convert a frequency value to a MIDI note.
		 *  @param {Frequency} frequency The value to frequency value to convert.
		 *  @returns  {MIDI}
		 *  @example
		 * tone.midiToFrequency(440); // returns 69
		 */
	    Tone.Frequency.prototype.frequencyToMidi = function (frequency) {
	        return 69 + Math.round(12 * Math.log(frequency / Tone.Frequency.A4) / Math.LN2);
	    };
	    return Tone.Frequency;
	});
	Module(function (Tone) {
	    /**
		 *  @class Tone.TransportTime is a the time along the Transport's
		 *         timeline. It is similar to Tone.Time, but instead of evaluating
		 *         against the AudioContext's clock, it is evaluated against
		 *         the Transport's position. See [TransportTime wiki](https://github.com/Tonejs/Tone.js/wiki/TransportTime).
		 *  @constructor
		 *  @param  {Time}  val    The time value as a number or string
		 *  @param  {String=}  units  Unit values
		 *  @extends {Tone.Time}
		 */
	    Tone.TransportTime = function (val, units) {
	        if (this instanceof Tone.TransportTime) {
	            Tone.Time.call(this, val, units);
	        } else {
	            return new Tone.TransportTime(val, units);
	        }
	    };
	    Tone.extend(Tone.TransportTime, Tone.Time);
	    //clone the expressions so that 
	    //we can add more without modifying the original
	    Tone.TransportTime.prototype._unaryExpressions = Object.create(Tone.Time.prototype._unaryExpressions);
	    /**
		 *  Adds an additional unary expression
		 *  which quantizes values to the next subdivision
		 *  @type {Object}
		 *  @private
		 */
	    Tone.TransportTime.prototype._unaryExpressions.quantize = {
	        regexp: /^@/,
	        method: function (rh) {
	            var subdivision = this._secondsToTicks(rh());
	            var multiple = Math.ceil(Tone.Transport.ticks / subdivision);
	            return this._ticksToUnits(multiple * subdivision);
	        }
	    };
	    /**
		 *  Convert seconds into ticks
		 *  @param {Seconds} seconds
		 *  @return  {Ticks}
		 *  @private
		 */
	    Tone.TransportTime.prototype._secondsToTicks = function (seconds) {
	        var quarterTime = this._beatsToUnits(1);
	        var quarters = seconds / quarterTime;
	        return Math.round(quarters * Tone.Transport.PPQ);
	    };
	    /**
		 *  Evaluate the time expression. Returns values in ticks
		 *  @return {Ticks}
		 */
	    Tone.TransportTime.prototype.valueOf = function () {
	        var val = this._secondsToTicks(this._expr());
	        return val + (this._plusNow ? Tone.Transport.ticks : 0);
	    };
	    /**
		 *  Return the time in ticks.
		 *  @return  {Ticks}
		 */
	    Tone.TransportTime.prototype.toTicks = function () {
	        return this.valueOf();
	    };
	    /**
		 *  Return the time in seconds.
		 *  @return  {Seconds}
		 */
	    Tone.TransportTime.prototype.toSeconds = function () {
	        var val = this._expr();
	        return val + (this._plusNow ? Tone.Transport.seconds : 0);
	    };
	    /**
		 *  Return the time as a frequency value
		 *  @return  {Frequency} 
		 */
	    Tone.TransportTime.prototype.toFrequency = function () {
	        return 1 / this.toSeconds();
	    };
	    return Tone.TransportTime;
	});
	Module(function (Tone) {
	    ///////////////////////////////////////////////////////////////////////////
	    //	TYPES
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 * Units which a value can take on.
		 * @enum {String}
		 */
	    Tone.Type = {
	        /**
			 *  Default units
			 *  @typedef {Default}
			 */
	        Default: 'number',
	        /**
			 *  Time can be described in a number of ways. Read more [Time](https://github.com/Tonejs/Tone.js/wiki/Time).
			 *
			 *  * Numbers, which will be taken literally as the time (in seconds).
			 *  * Notation, ("4n", "8t") describes time in BPM and time signature relative values.
			 *  * TransportTime, ("4:3:2") will also provide tempo and time signature relative times
			 *  in the form BARS:QUARTERS:SIXTEENTHS.
			 *  * Frequency, ("8hz") is converted to the length of the cycle in seconds.
			 *  * Now-Relative, ("+1") prefix any of the above with "+" and it will be interpreted as
			 *  "the current time plus whatever expression follows".
			 *  * Expressions, ("3:0 + 2 - (1m / 7)") any of the above can also be combined
			 *  into a mathematical expression which will be evaluated to compute the desired time.
			 *  * No Argument, for methods which accept time, no argument will be interpreted as
			 *  "now" (i.e. the currentTime).
			 *
			 *  @typedef {Time}
			 */
	        Time: 'time',
	        /**
			 *  Frequency can be described similar to time, except ultimately the
			 *  values are converted to frequency instead of seconds. A number
			 *  is taken literally as the value in hertz. Additionally any of the
			 *  Time encodings can be used. Note names in the form
			 *  of NOTE OCTAVE (i.e. C4) are also accepted and converted to their
			 *  frequency value.
			 *  @typedef {Frequency}
			 */
	        Frequency: 'frequency',
	        /**
			 *  TransportTime describes a position along the Transport's timeline. It is
			 *  similar to Time in that it uses all the same encodings, but TransportTime specifically
			 *  pertains to the Transport's timeline, which is startable, stoppable, loopable, and seekable.
			 *  [Read more](https://github.com/Tonejs/Tone.js/wiki/TransportTime)
			 *  @typedef {TransportTime}
			 */
	        TransportTime: 'transportTime',
	        /**
			 *  Ticks are the basic subunit of the Transport. They are
			 *  the smallest unit of time that the Transport supports.
			 *  @typedef {Ticks}
			 */
	        Ticks: 'ticks',
	        /**
			 *  Normal values are within the range [0, 1].
			 *  @typedef {NormalRange}
			 */
	        NormalRange: 'normalRange',
	        /**
			 *  AudioRange values are between [-1, 1].
			 *  @typedef {AudioRange}
			 */
	        AudioRange: 'audioRange',
	        /**
			 *  Decibels are a logarithmic unit of measurement which is useful for volume
			 *  because of the logarithmic way that we perceive loudness. 0 decibels
			 *  means no change in volume. -10db is approximately half as loud and 10db
			 *  is twice is loud.
			 *  @typedef {Decibels}
			 */
	        Decibels: 'db',
	        /**
			 *  Half-step note increments, i.e. 12 is an octave above the root. and 1 is a half-step up.
			 *  @typedef {Interval}
			 */
	        Interval: 'interval',
	        /**
			 *  Beats per minute.
			 *  @typedef {BPM}
			 */
	        BPM: 'bpm',
	        /**
			 *  The value must be greater than or equal to 0.
			 *  @typedef {Positive}
			 */
	        Positive: 'positive',
	        /**
			 *  Gain is the ratio between input and output of a signal.
			 *  A gain of 0 is the same as silencing the signal. A gain of
			 *  1, causes no change to the incoming signal.
			 *  @typedef {Gain}
			 */
	        Gain: 'gain',
	        /**
			 *  A cent is a hundredth of a semitone.
			 *  @typedef {Cents}
			 */
	        Cents: 'cents',
	        /**
			 *  Angle between 0 and 360.
			 *  @typedef {Degrees}
			 */
	        Degrees: 'degrees',
	        /**
			 *  A number representing a midi note.
			 *  @typedef {MIDI}
			 */
	        MIDI: 'midi',
	        /**
			 *  A colon-separated representation of time in the form of
			 *  Bars:Beats:Sixteenths.
			 *  @typedef {BarsBeatsSixteenths}
			 */
	        BarsBeatsSixteenths: 'barsBeatsSixteenths',
	        /**
			 *  Sampling is the reduction of a continuous signal to a discrete signal.
			 *  Audio is typically sampled 44100 times per second.
			 *  @typedef {Samples}
			 */
	        Samples: 'samples',
	        /**
			 *  Hertz are a frequency representation defined as one cycle per second.
			 *  @typedef {Hertz}
			 */
	        Hertz: 'hertz',
	        /**
			 *  A frequency represented by a letter name,
			 *  accidental and octave. This system is known as
			 *  [Scientific Pitch Notation](https://en.wikipedia.org/wiki/Scientific_pitch_notation).
			 *  @typedef {Note}
			 */
	        Note: 'note',
	        /**
			 *  One millisecond is a thousandth of a second.
			 *  @typedef {Milliseconds}
			 */
	        Milliseconds: 'milliseconds',
	        /**
			 *  Seconds are the time unit of the AudioContext. In the end,
			 *  all values need to be evaluated to seconds.
			 *  @typedef {Seconds}
			 */
	        Seconds: 'seconds',
	        /**
			 *  A string representing a duration relative to a measure.
			 *  * "4n" = quarter note
			 *  * "2m" = two measures
			 *  * "8t" = eighth-note triplet
			 *  @typedef {Notation}
			 */
	        Notation: 'notation'
	    };
	    ///////////////////////////////////////////////////////////////////////////
	    // AUGMENT TONE's PROTOTYPE
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 *  Convert Time into seconds.
		 *
		 *  Unlike the method which it overrides, this takes into account
		 *  transporttime and musical notation.
		 *
		 *  Time : 1.40
		 *  Notation: 4n or 1m or 2t
		 *  Now Relative: +3n
		 *  Math: 3n+16n or even complicated expressions ((3n*2)/6 + 1)
		 *
		 *  @param  {Time} time
		 *  @return {Seconds}
		 */
	    Tone.prototype.toSeconds = function (time) {
	        if (Tone.isNumber(time)) {
	            return time;
	        } else if (Tone.isUndef(time)) {
	            return this.now();
	        } else if (Tone.isString(time)) {
	            return new Tone.Time(time).toSeconds();
	        } else if (time instanceof Tone.TimeBase) {
	            return time.toSeconds();
	        }
	    };
	    /**
		 *  Convert a frequency representation into a number.
		 *  @param  {Frequency} freq
		 *  @return {Hertz}      the frequency in hertz
		 */
	    Tone.prototype.toFrequency = function (freq) {
	        if (Tone.isNumber(freq)) {
	            return freq;
	        } else if (Tone.isString(freq) || Tone.isUndef(freq)) {
	            return new Tone.Frequency(freq).valueOf();
	        } else if (freq instanceof Tone.TimeBase) {
	            return freq.toFrequency();
	        }
	    };
	    /**
		 *  Convert a time representation into ticks.
		 *  @param  {Time} time
		 *  @return {Ticks}  the time in ticks
		 */
	    Tone.prototype.toTicks = function (time) {
	        if (Tone.isNumber(time) || Tone.isString(time)) {
	            return new Tone.TransportTime(time).toTicks();
	        } else if (Tone.isUndef(time)) {
	            return Tone.Transport.ticks;
	        } else if (time instanceof Tone.TimeBase) {
	            return time.toTicks();
	        }
	    };
	    return Tone;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.Param wraps the native Web Audio's AudioParam to provide
		 *         additional unit conversion functionality. It also
		 *         serves as a base-class for classes which have a single,
		 *         automatable parameter.
		 *  @extends {Tone.AudioNode}
		 *  @param  {AudioParam}  param  The parameter to wrap.
		 *  @param  {Tone.Type} units The units of the audio param.
		 *  @param  {Boolean} convert If the param should be converted.
		 */
	    Tone.Param = function () {
	        var options = Tone.defaults(arguments, [
	            'param',
	            'units',
	            'convert'
	        ], Tone.Param);
	        Tone.AudioNode.call(this);
	        /**
			 *  The native parameter to control
			 *  @type  {AudioParam}
			 *  @private
			 */
	        this._param = this.input = options.param;
	        /**
			 *  The units of the parameter
			 *  @type {Tone.Type}
			 */
	        this.units = options.units;
	        /**
			 *  If the value should be converted or not
			 *  @type {Boolean}
			 */
	        this.convert = options.convert;
	        /**
			 *  True if the signal value is being overridden by
			 *  a connected signal.
			 *  @readOnly
			 *  @type  {boolean}
			 *  @private
			 */
	        this.overridden = false;
	        /**
			 *  If there is an LFO, this is where it is held.
			 *  @type  {Tone.LFO}
			 *  @private
			 */
	        this._lfo = null;
	        if (Tone.isObject(options.lfo)) {
	            this.value = options.lfo;
	        } else if (!Tone.isUndef(options.value)) {
	            this.value = options.value;
	        }
	    };
	    Tone.extend(Tone.Param, Tone.AudioNode);
	    /**
		 *  Defaults
		 *  @type  {Object}
		 *  @const
		 */
	    Tone.Param.defaults = {
	        'units': Tone.Type.Default,
	        'convert': true,
	        'param': undefined
	    };
	    /**
		 * The current value of the parameter.
		 * @memberOf Tone.Param#
		 * @type {Number}
		 * @name value
		 */
	    Object.defineProperty(Tone.Param.prototype, 'value', {
	        get: function () {
	            return this._toUnits(this._param.value);
	        },
	        set: function (value) {
	            if (Tone.isObject(value)) {
	                //throw an error if the LFO needs to be included
	                if (Tone.isUndef(Tone.LFO)) {
	                    throw new Error('Include \'Tone.LFO\' to use an LFO as a Param value.');
	                }
	                //remove the old one
	                if (this._lfo) {
	                    this._lfo.dispose();
	                }
	                this._lfo = new Tone.LFO(value).start();
	                this._lfo.connect(this.input);
	            } else {
	                var convertedVal = this._fromUnits(value);
	                this._param.cancelScheduledValues(0);
	                this._param.value = convertedVal;
	            }
	        }
	    });
	    /**
		 *  Convert the given value from the type specified by Tone.Param.units
		 *  into the destination value (such as Gain or Frequency).
		 *  @private
		 *  @param  {*} val the value to convert
		 *  @return {number}     the number which the value should be set to
		 */
	    Tone.Param.prototype._fromUnits = function (val) {
	        if (this.convert || Tone.isUndef(this.convert)) {
	            switch (this.units) {
	            case Tone.Type.Time:
	                return this.toSeconds(val);
	            case Tone.Type.Frequency:
	                return this.toFrequency(val);
	            case Tone.Type.Decibels:
	                return Tone.dbToGain(val);
	            case Tone.Type.NormalRange:
	                return Math.min(Math.max(val, 0), 1);
	            case Tone.Type.AudioRange:
	                return Math.min(Math.max(val, -1), 1);
	            case Tone.Type.Positive:
	                return Math.max(val, 0);
	            default:
	                return val;
	            }
	        } else {
	            return val;
	        }
	    };
	    /**
		 * Convert the parameters value into the units specified by Tone.Param.units.
		 * @private
		 * @param  {number} val the value to convert
		 * @return {number}
		 */
	    Tone.Param.prototype._toUnits = function (val) {
	        if (this.convert || Tone.isUndef(this.convert)) {
	            switch (this.units) {
	            case Tone.Type.Decibels:
	                return Tone.gainToDb(val);
	            default:
	                return val;
	            }
	        } else {
	            return val;
	        }
	    };
	    /**
		 *  the minimum output value
		 *  @type {Number}
		 *  @private
		 */
	    Tone.Param.prototype._minOutput = 0.00001;
	    /**
		 *  Schedules a parameter value change at the given time.
		 *  @param {*}	value The value to set the signal.
		 *  @param {Time}  time The time when the change should occur.
		 *  @returns {Tone.Param} this
		 *  @example
		 * //set the frequency to "G4" in exactly 1 second from now.
		 * freq.setValueAtTime("G4", "+1");
		 */
	    Tone.Param.prototype.setValueAtTime = function (value, time) {
	        time = this.toSeconds(time);
	        Tone.isPast(time);
	        this._param.setValueAtTime(this._fromUnits(value), time);
	        return this;
	    };
	    /**
		 *  Creates a schedule point with the current value at the current time.
		 *  This is useful for creating an automation anchor point in order to
		 *  schedule changes from the current value.
		 *
		 *  @param {number=} now (Optionally) pass the now value in.
		 *  @returns {Tone.Param} this
		 */
	    Tone.Param.prototype.setRampPoint = function (now) {
	        now = Tone.defaultArg(now, this.now());
	        this.cancelAndHoldAtTime(this.context.currentTime);
	        var currentVal = this._param.value;
	        if (currentVal === 0) {
	            currentVal = this._minOutput;
	        }
	        // cancel and hold at the given time
	        this._param.setValueAtTime(currentVal, now);
	        return this;
	    };
	    /**
		 *  Schedules a linear continuous change in parameter value from the
		 *  previous scheduled parameter value to the given value.
		 *
		 *  @param  {number} value
		 *  @param  {Time} endTime
		 *  @returns {Tone.Param} this
		 */
	    Tone.Param.prototype.linearRampToValueAtTime = function (value, endTime) {
	        value = this._fromUnits(value);
	        endTime = this.toSeconds(endTime);
	        Tone.isPast(endTime);
	        this._param.linearRampToValueAtTime(value, endTime);
	        return this;
	    };
	    /**
		 *  Schedules an exponential continuous change in parameter value from
		 *  the previous scheduled parameter value to the given value.
		 *
		 *  @param  {number} value
		 *  @param  {Time} endTime
		 *  @returns {Tone.Param} this
		 */
	    Tone.Param.prototype.exponentialRampToValueAtTime = function (value, endTime) {
	        value = this._fromUnits(value);
	        value = Math.max(this._minOutput, value);
	        endTime = this.toSeconds(endTime);
	        Tone.isPast(endTime);
	        this._param.exponentialRampToValueAtTime(value, endTime);
	        return this;
	    };
	    /**
		 *  Schedules an exponential continuous change in parameter value from
		 *  the current time and current value to the given value over the
		 *  duration of the rampTime.
		 *
		 *  @param  {number} value   The value to ramp to.
		 *  @param  {Time} rampTime the time that it takes the
		 *                               value to ramp from it's current value
		 *  @param {Time}	[startTime=now] 	When the ramp should start.
		 *  @returns {Tone.Param} this
		 *  @example
		 * //exponentially ramp to the value 2 over 4 seconds.
		 * signal.exponentialRampTo(2, 4);
		 */
	    Tone.Param.prototype.exponentialRampTo = function (value, rampTime, startTime) {
	        startTime = this.toSeconds(startTime);
	        this.setRampPoint(startTime);
	        this.exponentialRampToValueAtTime(value, startTime + this.toSeconds(rampTime));
	        return this;
	    };
	    /**
		 *  Schedules an linear continuous change in parameter value from
		 *  the current time and current value to the given value over the
		 *  duration of the rampTime.
		 *
		 *  @param  {number} value   The value to ramp to.
		 *  @param  {Time} rampTime the time that it takes the
		 *                               value to ramp from it's current value
		 *  @param {Time}	[startTime=now] 	When the ramp should start.
		 *  @returns {Tone.Param} this
		 *  @example
		 * //linearly ramp to the value 4 over 3 seconds.
		 * signal.linearRampTo(4, 3);
		 */
	    Tone.Param.prototype.linearRampTo = function (value, rampTime, startTime) {
	        startTime = this.toSeconds(startTime);
	        this.setRampPoint(startTime);
	        this.linearRampToValueAtTime(value, startTime + this.toSeconds(rampTime));
	        return this;
	    };
	    /**
		 * Convert between Time and time constant. The time
		 * constant returned can be used in setTargetAtTime.
		 * @param  {Time} time The time to convert
		 * @return {Number}      The time constant to get an exponentially approaching
		 *                           curve to over 99% of towards the target value.
		 */
	    Tone.Param.prototype.getTimeConstant = function (time) {
	        return Math.log(this.toSeconds(time) + 1) / Math.log(200);
	    };
	    /**
		 *  Start exponentially approaching the target value at the given time. Since it
		 *  is an exponential approach it will continue approaching after the ramp duration. The
		 *  rampTime is the time that it takes to reach over 99% of the way towards the value.
		 *  @param  {number} value   The value to ramp to.
		 *  @param  {Time} rampTime the time that it takes the
		 *                               value to ramp from it's current value
		 *  @param {Time}	[startTime=now] 	When the ramp should start.
		 *  @returns {Tone.Param} this
		 *  @example
		 * //exponentially ramp to the value 2 over 4 seconds.
		 * signal.exponentialRampTo(2, 4);
		 */
	    Tone.Param.prototype.targetRampTo = function (value, rampTime, startTime) {
	        startTime = this.toSeconds(startTime);
	        this.setRampPoint(startTime);
	        this.setTargetAtTime(value, startTime, this.getTimeConstant(rampTime));
	        return this;
	    };
	    /**
		 *  Start exponentially approaching the target value at the given time with
		 *  a rate having the given time constant.
		 *  @param {number} value
		 *  @param {Time} startTime
		 *  @param {number} timeConstant
		 *  @returns {Tone.Param} this
		 */
	    Tone.Param.prototype.setTargetAtTime = function (value, startTime, timeConstant) {
	        value = this._fromUnits(value);
	        // The value will never be able to approach without timeConstant > 0.
	        // http://www.w3.org/TR/webaudio/#dfn-setTargetAtTime, where the equation
	        // is described. 0 results in a division by 0.
	        value = Math.max(this._minOutput, value);
	        timeConstant = Math.max(this._minOutput, timeConstant);
	        this._param.setTargetAtTime(value, this.toSeconds(startTime), timeConstant);
	        return this;
	    };
	    /**
		 *  Sets an array of arbitrary parameter values starting at the given time
		 *  for the given duration.
		 *
		 *  @param {Array} values
		 *  @param {Time} startTime
		 *  @param {Time} duration
		 *  @returns {Tone.Param} this
		 */
	    Tone.Param.prototype.setValueCurveAtTime = function (values, startTime, duration) {
	        duration = this.toSeconds(duration);
	        startTime = this.toSeconds(startTime);
	        this.setValueAtTime(values[0], startTime);
	        var segTime = duration / (values.length - 1);
	        for (var i = 1; i < values.length; i++) {
	            this._param.linearRampToValueAtTime(this._fromUnits(values[i]), startTime + i * segTime);
	        }
	        return this;
	    };
	    /**
		 *  Cancels all scheduled parameter changes with times greater than or
		 *  equal to startTime.
		 *
		 *  @param  {Time} startTime
		 *  @returns {Tone.Param} this
		 */
	    Tone.Param.prototype.cancelScheduledValues = function (startTime) {
	        this._param.cancelScheduledValues(this.toSeconds(startTime));
	        return this;
	    };
	    /**
		 *  This is similar to [cancelScheduledValues](#cancelScheduledValues) except
		 *  it holds the automated value at cancelTime until the next automated event.
		 *  @param  {Time} cancelTime
		 *  @returns {Tone.Param} this
		 */
	    Tone.Param.prototype.cancelAndHoldAtTime = function (cancelTime) {
	        cancelTime = this.toSeconds(cancelTime);
	        if (this._param.cancelAndHoldAtTime) {
	            this._param.cancelAndHoldAtTime(cancelTime);
	        } else {
	            //fallback for unsupported browsers
	            //can't cancel and hold at any time in the future
	            //just do it immediately for gapless automation curves
	            var now = this.context.currentTime;
	            this._param.cancelScheduledValues(now);
	            var currentVal = this._param.value;
	            if (currentVal === 0) {
	                currentVal = this._minOutput;
	            }
	            this._param.setValueAtTime(currentVal, now + this.sampleTime);
	        }
	        return this;
	    };
	    /**
		 *  Ramps to the given value over the duration of the rampTime.
		 *  Automatically selects the best ramp type (exponential or linear)
		 *  depending on the `units` of the signal
		 *
		 *  @param  {number} value
		 *  @param  {Time} rampTime 	The time that it takes the
		 *                              value to ramp from it's current value
		 *  @param {Time}	[startTime=now] 	When the ramp should start.
		 *  @returns {Tone.Param} this
		 *  @example
		 * //ramp to the value either linearly or exponentially
		 * //depending on the "units" value of the signal
		 * signal.rampTo(0, 10);
		 *  @example
		 * //schedule it to ramp starting at a specific time
		 * signal.rampTo(0, 10, 5)
		 */
	    Tone.Param.prototype.rampTo = function (value, rampTime, startTime) {
	        rampTime = Tone.defaultArg(rampTime, 0.1);
	        if (this.units === Tone.Type.Frequency || this.units === Tone.Type.BPM || this.units === Tone.Type.Decibels) {
	            this.exponentialRampTo(value, rampTime, startTime);
	        } else {
	            this.linearRampTo(value, rampTime, startTime);
	        }
	        return this;
	    };
	    /**
		 *  The LFO created by the signal instance. If none
		 *  was created, this is null.
		 *  @type {Tone.LFO}
		 *  @readOnly
		 *  @memberOf Tone.Param#
		 *  @name lfo
		 */
	    Object.defineProperty(Tone.Param.prototype, 'lfo', {
	        get: function () {
	            return this._lfo;
	        }
	    });
	    /**
		 *  Clean up
		 *  @returns {Tone.Param} this
		 */
	    Tone.Param.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._param = null;
	        if (this._lfo) {
	            this._lfo.dispose();
	            this._lfo = null;
	        }
	        return this;
	    };
	    return Tone.Param;
	});
	Module(function (Tone) {
	    
	    /**
		 *  createGain shim
		 *  @private
		 */
	    if (window.GainNode && !AudioContext.prototype.createGain) {
	        AudioContext.prototype.createGain = AudioContext.prototype.createGainNode;
	    }
	    /**
		 *  @class A thin wrapper around the Native Web Audio GainNode.
		 *         The GainNode is a basic building block of the Web Audio
		 *         API and is useful for routing audio and adjusting gains.
		 *  @extends {Tone}
		 *  @param  {Number=}  gain  The initial gain of the GainNode
		 *  @param {Tone.Type=} units The units of the gain parameter.
		 */
	    Tone.Gain = function () {
	        var options = Tone.defaults(arguments, [
	            'gain',
	            'units'
	        ], Tone.Gain);
	        Tone.AudioNode.call(this);
	        /**
			 *  The GainNode
			 *  @type  {GainNode}
			 *  @private
			 */
	        this.input = this.output = this._gainNode = this.context.createGain();
	        /**
			 *  The gain parameter of the gain node.
			 *  @type {Gain}
			 *  @signal
			 */
	        this.gain = new Tone.Param({
	            'param': this._gainNode.gain,
	            'units': options.units,
	            'value': options.gain,
	            'convert': options.convert
	        });
	        this._readOnly('gain');
	    };
	    Tone.extend(Tone.Gain, Tone.AudioNode);
	    /**
		 *  The defaults
		 *  @const
		 *  @type  {Object}
		 */
	    Tone.Gain.defaults = {
	        'gain': 1,
	        'convert': true
	    };
	    /**
		 *  Clean up.
		 *  @return  {Tone.Gain}  this
		 */
	    Tone.Gain.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._gainNode.disconnect();
	        this._gainNode = null;
	        this._writable('gain');
	        this.gain.dispose();
	        this.gain = null;
	    };
	    return Tone.Gain;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  A signal is an audio-rate value. Tone.Signal is a core component of the library.
		 *          Unlike a number, Signals can be scheduled with sample-level accuracy. Tone.Signal
		 *          has all of the methods available to native Web Audio 
		 *          [AudioParam](http://webaudio.github.io/web-audio-api/#the-audioparam-interface)
		 *          as well as additional conveniences. Read more about working with signals 
		 *          [here](https://github.com/Tonejs/Tone.js/wiki/Signals).
		 *
		 *  @constructor
		 *  @extends {Tone.Param}
		 *  @param {Number|AudioParam} [value] Initial value of the signal. If an AudioParam
		 *                                     is passed in, that parameter will be wrapped
		 *                                     and controlled by the Signal. 
		 *  @param {string} [units=Number] unit The units the signal is in. 
		 *  @example
		 * var signal = new Tone.Signal(10);
		 */
	    Tone.Signal = function () {
	        var options = Tone.defaults(arguments, [
	            'value',
	            'units'
	        ], Tone.Signal);
	        var gainNode = Tone.context.createGain();
	        options.param = gainNode.gain;
	        Tone.Param.call(this, options);
	        /**
			 * The node where the constant signal value is scaled.
			 * @type {GainNode}
			 * @private
			 */
	        this.output = gainNode;
	        /**
			 * The node where the value is set.
			 * @type {Tone.Param}
			 * @private
			 */
	        this.input = this._param = this.output.gain;
	        //connect the const output to the node output
	        this.context.getConstant(1).connect(this.output);
	    };
	    Tone.extend(Tone.Signal, Tone.Param);
	    /**
		 *  The default values
		 *  @type  {Object}
		 *  @static
		 *  @const
		 */
	    Tone.Signal.defaults = {
	        'value': 0,
	        'units': Tone.Type.Default,
	        'convert': true
	    };
	    /**
		 *  When signals connect to other signals or AudioParams, 
		 *  they take over the output value of that signal or AudioParam. 
		 *  For all other nodes, the behavior is the same as a default <code>connect</code>. 
		 *
		 *  @override
		 *  @param {AudioParam|AudioNode|Tone.Signal|Tone} node 
		 *  @param {number} [outputNumber=0] The output number to connect from.
		 *  @param {number} [inputNumber=0] The input number to connect to.
		 *  @returns {Tone.SignalBase} this
		 *  @method
		 */
	    Tone.Signal.prototype.connect = Tone.SignalBase.prototype.connect;
	    /**
		 *  dispose and disconnect
		 *  @returns {Tone.Signal} this
		 */
	    Tone.Signal.prototype.dispose = function () {
	        Tone.Param.prototype.dispose.call(this);
	        return this;
	    };
	    return Tone.Signal;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class A signal which adds the method getValueAtTime.
		 *         Code and inspiration from https://github.com/jsantell/web-audio-automation-timeline
		 *  @extends {Tone.Signal}
		 *  @param {Number=} value The initial value of the signal
		 *  @param {String=} units The conversion units of the signal.
		 */
	    Tone.TimelineSignal = function () {
	        var options = Tone.defaults(arguments, [
	            'value',
	            'units'
	        ], Tone.Signal);
	        Tone.Signal.call(this, options);
	        /**
			 *  The scheduled events
			 *  @type {Tone.Timeline}
			 *  @private
			 */
	        this._events = new Tone.Timeline(100);
	        /**
			 *  The initial scheduled value
			 *  @type {Number}
			 *  @private
			 */
	        this._initial = this._fromUnits(this._param.value);
	        this.value = options.value;
	        //delete the input node so that nothing can overwrite the signal value
	        delete this.input;
	    };
	    Tone.extend(Tone.TimelineSignal, Tone.Signal);
	    /**
		 *  The event types of a schedulable signal.
		 *  @enum {String}
		 *  @private
		 */
	    Tone.TimelineSignal.Type = {
	        Linear: 'linear',
	        Exponential: 'exponential',
	        Target: 'target',
	        Set: 'set'
	    };
	    /**
		 * The current value of the signal.
		 * @memberOf Tone.TimelineSignal#
		 * @type {Number}
		 * @name value
		 */
	    Object.defineProperty(Tone.TimelineSignal.prototype, 'value', {
	        get: function () {
	            var now = this.now();
	            var val = this.getValueAtTime(now);
	            return this._toUnits(val);
	        },
	        set: function (value) {
	            if (this._events) {
	                var convertedVal = this._fromUnits(value);
	                this._initial = convertedVal;
	                this.cancelScheduledValues();
	                this._param.value = convertedVal;
	            }
	        }
	    });
	    ///////////////////////////////////////////////////////////////////////////
	    //	SCHEDULING
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 *  Schedules a parameter value change at the given time.
		 *  @param {*}	value The value to set the signal.
		 *  @param {Time}  time The time when the change should occur.
		 *  @returns {Tone.TimelineSignal} this
		 *  @example
		 * //set the frequency to "G4" in exactly 1 second from now.
		 * freq.setValueAtTime("G4", "+1");
		 */
	    Tone.TimelineSignal.prototype.setValueAtTime = function (value, startTime) {
	        value = this._fromUnits(value);
	        startTime = this.toSeconds(startTime);
	        this._events.add({
	            'type': Tone.TimelineSignal.Type.Set,
	            'value': value,
	            'time': startTime
	        });
	        //invoke the original event
	        this._param.setValueAtTime(value, startTime);
	        return this;
	    };
	    /**
		 *  Schedules a linear continuous change in parameter value from the
		 *  previous scheduled parameter value to the given value.
		 *
		 *  @param  {number} value
		 *  @param  {Time} endTime
		 *  @returns {Tone.TimelineSignal} this
		 */
	    Tone.TimelineSignal.prototype.linearRampToValueAtTime = function (value, endTime) {
	        value = this._fromUnits(value);
	        endTime = this.toSeconds(endTime);
	        this._events.add({
	            'type': Tone.TimelineSignal.Type.Linear,
	            'value': value,
	            'time': endTime
	        });
	        this._param.linearRampToValueAtTime(value, endTime);
	        return this;
	    };
	    /**
		 *  Schedules an exponential continuous change in parameter value from
		 *  the previous scheduled parameter value to the given value.
		 *
		 *  @param  {number} value
		 *  @param  {Time} endTime
		 *  @returns {Tone.TimelineSignal} this
		 */
	    Tone.TimelineSignal.prototype.exponentialRampToValueAtTime = function (value, endTime) {
	        //get the previous event and make sure it's not starting from 0
	        endTime = this.toSeconds(endTime);
	        var beforeEvent = this._searchBefore(endTime);
	        if (beforeEvent && beforeEvent.value === 0) {
	            //reschedule that event
	            this.setValueAtTime(this._minOutput, beforeEvent.time);
	        }
	        value = this._fromUnits(value);
	        var setValue = Math.max(value, this._minOutput);
	        this._events.add({
	            'type': Tone.TimelineSignal.Type.Exponential,
	            'value': setValue,
	            'time': endTime
	        });
	        //if the ramped to value is 0, make it go to the min output, and then set to 0.
	        if (value < this._minOutput) {
	            this._param.exponentialRampToValueAtTime(this._minOutput, endTime - this.sampleTime);
	            this.setValueAtTime(0, endTime);
	        } else {
	            this._param.exponentialRampToValueAtTime(value, endTime);
	        }
	        return this;
	    };
	    /**
		 *  Start exponentially approaching the target value at the given time with
		 *  a rate having the given time constant.
		 *  @param {number} value
		 *  @param {Time} startTime
		 *  @param {number} timeConstant
		 *  @returns {Tone.TimelineSignal} this
		 */
	    Tone.TimelineSignal.prototype.setTargetAtTime = function (value, startTime, timeConstant) {
	        value = this._fromUnits(value);
	        value = Math.max(this._minOutput, value);
	        timeConstant = Math.max(this._minOutput, timeConstant);
	        startTime = this.toSeconds(startTime);
	        this._events.add({
	            'type': Tone.TimelineSignal.Type.Target,
	            'value': value,
	            'time': startTime,
	            'constant': timeConstant
	        });
	        this._param.setTargetAtTime(value, startTime, timeConstant);
	        return this;
	    };
	    /**
		 *  Set an array of arbitrary values starting at the given time for the given duration.
		 *  @param {Float32Array} values
		 *  @param {Time} startTime
		 *  @param {Time} duration
		 *  @param {NormalRange} [scaling=1] If the values in the curve should be scaled by some value
		 *  @returns {Tone.TimelineSignal} this
		 */
	    Tone.TimelineSignal.prototype.setValueCurveAtTime = function (values, startTime, duration, scaling) {
	        scaling = Tone.defaultArg(scaling, 1);
	        duration = this.toSeconds(duration);
	        startTime = this.toSeconds(startTime);
	        var segTime = duration / (values.length - 1);
	        this.setValueAtTime(values[0] * scaling, startTime);
	        for (var i = 1; i < values.length; i++) {
	            this.linearRampToValueAtTime(values[i] * scaling, startTime + i * segTime);
	        }
	        return this;
	    };
	    /**
		 *  Cancels all scheduled parameter changes with times greater than or
		 *  equal to startTime.
		 *  @param  {Time} startTime
		 *  @returns {Tone.TimelineSignal} this
		 */
	    Tone.TimelineSignal.prototype.cancelScheduledValues = function (after) {
	        after = this.toSeconds(after);
	        this._events.cancel(after);
	        this._param.cancelScheduledValues(after);
	        return this;
	    };
	    /**
		 *  Cancels all scheduled parameter changes with times greater than or
		 *  equal to cancelTime and sets the output of the signal to be the value
		 *  at cancelTime. Similar to (cancelScheduledValues)[#cancelscheduledvalues].
		 *  @param  {Time} cancelTime
		 *  @returns {Tone.TimelineSignal} this
		 */
	    Tone.TimelineSignal.prototype.cancelAndHoldAtTime = function (cancelTime) {
	        this.setRampPoint(this.toSeconds(cancelTime));
	        return this;
	    };
	    /**
		 *  Sets the computed value at the given time. This provides
		 *  a point from which a linear or exponential curve
		 *  can be scheduled after. Will cancel events after
		 *  the given time and shorten the currently scheduled
		 *  linear or exponential ramp so that it ends at `time` .
		 *  This is to avoid discontinuities and clicks in envelopes.
		 *  @param {Time} time When to set the ramp point
		 *  @returns {Tone.TimelineSignal} this
		 */
	    Tone.TimelineSignal.prototype.setRampPoint = function (time) {
	        time = this.toSeconds(time);
	        //get the value at the given time
	        var val = this._toUnits(this.getValueAtTime(time));
	        //if there is an event at the given time
	        //and that even is not a "set"
	        var before = this._searchBefore(time);
	        if (before && before.time === time) {
	            //remove everything after
	            this.cancelScheduledValues(time + this.sampleTime);
	        } else {
	            //reschedule the next event to end at the given time
	            var after = this._searchAfter(time);
	            if (after) {
	                //cancel the next event(s)
	                this.cancelScheduledValues(time);
	                if (after.type === Tone.TimelineSignal.Type.Linear) {
	                    this.linearRampToValueAtTime(val, time);
	                } else if (after.type === Tone.TimelineSignal.Type.Exponential) {
	                    this.exponentialRampToValueAtTime(val, time);
	                }
	            }
	        }
	        this.setValueAtTime(val, time);
	        return this;
	    };
	    /**
		 *  Do a linear ramp to the given value between the start and finish times.
		 *  @param {Number} value The value to ramp to.
		 *  @param {Time} start The beginning anchor point to do the linear ramp
		 *  @param {Time} finish The ending anchor point by which the value of
		 *                       the signal will equal the given value.
		 *  @returns {Tone.TimelineSignal} this
		 */
	    Tone.TimelineSignal.prototype.linearRampToValueBetween = function (value, start, finish) {
	        this.setRampPoint(start);
	        this.linearRampToValueAtTime(value, finish);
	        return this;
	    };
	    /**
		 *  Do a exponential ramp to the given value between the start and finish times.
		 *  @param {Number} value The value to ramp to.
		 *  @param {Time} start The beginning anchor point to do the exponential ramp
		 *  @param {Time} finish The ending anchor point by which the value of
		 *                       the signal will equal the given value.
		 *  @returns {Tone.TimelineSignal} this
		 */
	    Tone.TimelineSignal.prototype.exponentialRampToValueBetween = function (value, start, finish) {
	        this.setRampPoint(start);
	        this.exponentialRampToValueAtTime(value, finish);
	        return this;
	    };
	    ///////////////////////////////////////////////////////////////////////////
	    //	GETTING SCHEDULED VALUES
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 *  Returns the value before or equal to the given time
		 *  @param  {Number}  time  The time to query
		 *  @return  {Object}  The event at or before the given time.
		 *  @private
		 */
	    Tone.TimelineSignal.prototype._searchBefore = function (time) {
	        return this._events.get(time);
	    };
	    /**
		 *  The event after the given time
		 *  @param  {Number}  time  The time to query.
		 *  @return  {Object}  The next event after the given time
		 *  @private
		 */
	    Tone.TimelineSignal.prototype._searchAfter = function (time) {
	        return this._events.getAfter(time);
	    };
	    /**
		 *  Get the scheduled value at the given time. This will
		 *  return the unconverted (raw) value.
		 *  @param  {Number}  time  The time in seconds.
		 *  @return  {Number}  The scheduled value at the given time.
		 */
	    Tone.TimelineSignal.prototype.getValueAtTime = function (time) {
	        time = this.toSeconds(time);
	        var after = this._searchAfter(time);
	        var before = this._searchBefore(time);
	        var value = this._initial;
	        //if it was set by
	        if (before === null) {
	            value = this._initial;
	        } else if (before.type === Tone.TimelineSignal.Type.Target) {
	            var previous = this._events.getBefore(before.time);
	            var previousVal;
	            if (previous === null) {
	                previousVal = this._initial;
	            } else {
	                previousVal = previous.value;
	            }
	            value = this._exponentialApproach(before.time, previousVal, before.value, before.constant, time);
	        } else if (after === null) {
	            value = before.value;
	        } else if (after.type === Tone.TimelineSignal.Type.Linear) {
	            value = this._linearInterpolate(before.time, before.value, after.time, after.value, time);
	        } else if (after.type === Tone.TimelineSignal.Type.Exponential) {
	            value = this._exponentialInterpolate(before.time, before.value, after.time, after.value, time);
	        } else {
	            value = before.value;
	        }
	        return value;
	    };
	    /**
		 *  When signals connect to other signals or AudioParams,
		 *  they take over the output value of that signal or AudioParam.
		 *  For all other nodes, the behavior is the same as a default <code>connect</code>.
		 *
		 *  @override
		 *  @param {AudioParam|AudioNode|Tone.Signal|Tone} node
		 *  @param {number} [outputNumber=0] The output number to connect from.
		 *  @param {number} [inputNumber=0] The input number to connect to.
		 *  @returns {Tone.TimelineSignal} this
		 *  @method
		 */
	    Tone.TimelineSignal.prototype.connect = Tone.SignalBase.prototype.connect;
	    ///////////////////////////////////////////////////////////////////////////
	    //	AUTOMATION CURVE CALCULATIONS
	    //	MIT License, copyright (c) 2014 Jordan Santell
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 *  Calculates the the value along the curve produced by setTargetAtTime
		 *  @private
		 */
	    Tone.TimelineSignal.prototype._exponentialApproach = function (t0, v0, v1, timeConstant, t) {
	        return v1 + (v0 - v1) * Math.exp(-(t - t0) / timeConstant);
	    };
	    /**
		 *  Calculates the the value along the curve produced by linearRampToValueAtTime
		 *  @private
		 */
	    Tone.TimelineSignal.prototype._linearInterpolate = function (t0, v0, t1, v1, t) {
	        return v0 + (v1 - v0) * ((t - t0) / (t1 - t0));
	    };
	    /**
		 *  Calculates the the value along the curve produced by exponentialRampToValueAtTime
		 *  @private
		 */
	    Tone.TimelineSignal.prototype._exponentialInterpolate = function (t0, v0, t1, v1, t) {
	        v0 = Math.max(this._minOutput, v0);
	        return v0 * Math.pow(v1 / v0, (t - t0) / (t1 - t0));
	    };
	    /**
		 *  Clean up.
		 *  @return {Tone.TimelineSignal} this
		 */
	    Tone.TimelineSignal.prototype.dispose = function () {
	        Tone.Signal.prototype.dispose.call(this);
	        this._events.dispose();
	        this._events = null;
	    };
	    return Tone.TimelineSignal;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Pow applies an exponent to the incoming signal. The incoming signal
		 *         must be AudioRange.
		 *
		 *  @extends {Tone.SignalBase}
		 *  @constructor
		 *  @param {Positive} exp The exponent to apply to the incoming signal, must be at least 2. 
		 *  @example
		 * var pow = new Tone.Pow(2);
		 * var sig = new Tone.Signal(0.5).connect(pow);
		 * //output of pow is 0.25. 
		 */
	    Tone.Pow = function (exp) {
	        Tone.SignalBase.call(this);
	        /**
			 * the exponent
			 * @private
			 * @type {number}
			 */
	        this._exp = Tone.defaultArg(exp, 1);
	        /**
			 *  @type {WaveShaperNode}
			 *  @private
			 */
	        this._expScaler = this.input = this.output = new Tone.WaveShaper(this._expFunc(this._exp), 8192);
	    };
	    Tone.extend(Tone.Pow, Tone.SignalBase);
	    /**
		 * The value of the exponent.
		 * @memberOf Tone.Pow#
		 * @type {number}
		 * @name value
		 */
	    Object.defineProperty(Tone.Pow.prototype, 'value', {
	        get: function () {
	            return this._exp;
	        },
	        set: function (exp) {
	            this._exp = exp;
	            this._expScaler.setMap(this._expFunc(this._exp));
	        }
	    });
	    /**
		 *  the function which maps the waveshaper
		 *  @param   {number} exp
		 *  @return {function}
		 *  @private
		 */
	    Tone.Pow.prototype._expFunc = function (exp) {
	        return function (val) {
	            return Math.pow(Math.abs(val), exp);
	        };
	    };
	    /**
		 *  Clean up.
		 *  @returns {Tone.Pow} this
		 */
	    Tone.Pow.prototype.dispose = function () {
	        Tone.SignalBase.prototype.dispose.call(this);
	        this._expScaler.dispose();
	        this._expScaler = null;
	        return this;
	    };
	    return Tone.Pow;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Tone.Envelope is an [ADSR](https://en.wikipedia.org/wiki/Synthesizer#ADSR_envelope)
		 *          envelope generator. Tone.Envelope outputs a signal which
		 *          can be connected to an AudioParam or Tone.Signal.
		 *          <img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/ADSR_parameter.svg">
		 *
		 *  @constructor
		 *  @extends {Tone.AudioNode}
		 *  @param {Time} [attack] The amount of time it takes for the envelope to go from
		 *                         0 to it's maximum value.
		 *  @param {Time} [decay]	The period of time after the attack that it takes for the envelope
		 *                       	to fall to the sustain value.
		 *  @param {NormalRange} [sustain]	The percent of the maximum value that the envelope rests at until
		 *                                	the release is triggered.
		 *  @param {Time} [release]	The amount of time after the release is triggered it takes to reach 0.
		 *  @example
		 * //an amplitude envelope
		 * var gainNode = Tone.context.createGain();
		 * var env = new Tone.Envelope({
		 * 	"attack" : 0.1,
		 * 	"decay" : 0.2,
		 * 	"sustain" : 1,
		 * 	"release" : 0.8,
		 * });
		 * env.connect(gainNode.gain);
		 */
	    Tone.Envelope = function () {
	        //get all of the defaults
	        var options = Tone.defaults(arguments, [
	            'attack',
	            'decay',
	            'sustain',
	            'release'
	        ], Tone.Envelope);
	        Tone.AudioNode.call(this);
	        /**
			 *  When triggerAttack is called, the attack time is the amount of
			 *  time it takes for the envelope to reach it's maximum value.
			 *  @type {Time}
			 */
	        this.attack = options.attack;
	        /**
			 *  After the attack portion of the envelope, the value will fall
			 *  over the duration of the decay time to it's sustain value.
			 *  @type {Time}
			 */
	        this.decay = options.decay;
	        /**
			 * 	The sustain value is the value
			 * 	which the envelope rests at after triggerAttack is
			 * 	called, but before triggerRelease is invoked.
			 *  @type {NormalRange}
			 */
	        this.sustain = options.sustain;
	        /**
			 *  After triggerRelease is called, the envelope's
			 *  value will fall to it's miminum value over the
			 *  duration of the release time.
			 *  @type {Time}
			 */
	        this.release = options.release;
	        /**
			 *  the next time the envelope is at standby
			 *  @type {number}
			 *  @private
			 */
	        this._attackCurve = 'linear';
	        /**
			 *  the next time the envelope is at standby
			 *  @type {number}
			 *  @private
			 */
	        this._releaseCurve = 'exponential';
	        /**
			 *  the signal
			 *  @type {Tone.TimelineSignal}
			 *  @private
			 */
	        this._sig = this.output = new Tone.TimelineSignal();
	        this._sig.setValueAtTime(0, 0);
	        //set the attackCurve initially
	        this.attackCurve = options.attackCurve;
	        this.releaseCurve = options.releaseCurve;
	    };
	    Tone.extend(Tone.Envelope, Tone.AudioNode);
	    /**
		 *  the default parameters
		 *  @static
		 *  @const
		 */
	    Tone.Envelope.defaults = {
	        'attack': 0.01,
	        'decay': 0.1,
	        'sustain': 0.5,
	        'release': 1,
	        'attackCurve': 'linear',
	        'releaseCurve': 'exponential'
	    };
	    /**
		 * Read the current value of the envelope. Useful for
		 * syncronizing visual output to the envelope.
		 * @memberOf Tone.Envelope#
		 * @type {Number}
		 * @name value
		 * @readOnly
		 */
	    Object.defineProperty(Tone.Envelope.prototype, 'value', {
	        get: function () {
	            return this.getValueAtTime(this.now());
	        }
	    });
	    /**
		 * The shape of the attack.
		 * Can be any of these strings:
		 * <ul>
		 *   <li>linear</li>
		 *   <li>exponential</li>
		 *   <li>sine</li>
		 *   <li>cosine</li>
		 *   <li>bounce</li>
		 *   <li>ripple</li>
		 *   <li>step</li>
		 * </ul>
		 * Can also be an array which describes the curve. Values
		 * in the array are evenly subdivided and linearly
		 * interpolated over the duration of the attack.
		 * @memberOf Tone.Envelope#
		 * @type {String|Array}
		 * @name attackCurve
		 * @example
		 * env.attackCurve = "linear";
		 * @example
		 * //can also be an array
		 * env.attackCurve = [0, 0.2, 0.3, 0.4, 1]
		 */
	    Object.defineProperty(Tone.Envelope.prototype, 'attackCurve', {
	        get: function () {
	            if (Tone.isString(this._attackCurve)) {
	                return this._attackCurve;
	            } else if (Tone.isArray(this._attackCurve)) {
	                //look up the name in the curves array
	                for (var type in Tone.Envelope.Type) {
	                    if (Tone.Envelope.Type[type].In === this._attackCurve) {
	                        return type;
	                    }
	                }
	                //otherwise just return the array
	                return this._attackCurve;
	            }
	        },
	        set: function (curve) {
	            //check if it's a valid type
	            if (Tone.Envelope.Type.hasOwnProperty(curve)) {
	                var curveDef = Tone.Envelope.Type[curve];
	                if (Tone.isObject(curveDef)) {
	                    this._attackCurve = curveDef.In;
	                } else {
	                    this._attackCurve = curveDef;
	                }
	            } else if (Tone.isArray(curve)) {
	                this._attackCurve = curve;
	            } else {
	                throw new Error('Tone.Envelope: invalid curve: ' + curve);
	            }
	        }
	    });
	    /**
		 * The shape of the release. See the attack curve types.
		 * @memberOf Tone.Envelope#
		 * @type {String|Array}
		 * @name releaseCurve
		 * @example
		 * env.releaseCurve = "linear";
		 */
	    Object.defineProperty(Tone.Envelope.prototype, 'releaseCurve', {
	        get: function () {
	            if (Tone.isString(this._releaseCurve)) {
	                return this._releaseCurve;
	            } else if (Tone.isArray(this._releaseCurve)) {
	                //look up the name in the curves array
	                for (var type in Tone.Envelope.Type) {
	                    if (Tone.Envelope.Type[type].Out === this._releaseCurve) {
	                        return type;
	                    }
	                }
	                //otherwise just return the array
	                return this._releaseCurve;
	            }
	        },
	        set: function (curve) {
	            //check if it's a valid type
	            if (Tone.Envelope.Type.hasOwnProperty(curve)) {
	                var curveDef = Tone.Envelope.Type[curve];
	                if (Tone.isObject(curveDef)) {
	                    this._releaseCurve = curveDef.Out;
	                } else {
	                    this._releaseCurve = curveDef;
	                }
	            } else if (Tone.isArray(curve)) {
	                this._releaseCurve = curve;
	            } else {
	                throw new Error('Tone.Envelope: invalid curve: ' + curve);
	            }
	        }
	    });
	    /**
		 *  Trigger the attack/decay portion of the ADSR envelope.
		 *  @param  {Time} [time=now] When the attack should start.
		 *  @param {NormalRange} [velocity=1] The velocity of the envelope scales the vales.
		 *                               number between 0-1
		 *  @returns {Tone.Envelope} this
		 *  @example
		 *  //trigger the attack 0.5 seconds from now with a velocity of 0.2
		 *  env.triggerAttack("+0.5", 0.2);
		 */
	    Tone.Envelope.prototype.triggerAttack = function (time, velocity) {
	        time = this.toSeconds(time);
	        var originalAttack = this.toSeconds(this.attack);
	        var attack = originalAttack;
	        var decay = this.toSeconds(this.decay);
	        velocity = Tone.defaultArg(velocity, 1);
	        //check if it's not a complete attack
	        var currentValue = this.getValueAtTime(time);
	        if (currentValue > 0) {
	            //subtract the current value from the attack time
	            var attackRate = 1 / attack;
	            var remainingDistance = 1 - currentValue;
	            //the attack is now the remaining time
	            attack = remainingDistance / attackRate;
	        }
	        //attack
	        if (this._attackCurve === 'linear') {
	            this._sig.linearRampTo(velocity, attack, time);
	        } else if (this._attackCurve === 'exponential') {
	            this._sig.targetRampTo(velocity, attack, time);
	        } else if (attack > 0) {
	            this._sig.setRampPoint(time);
	            var curve = this._attackCurve;
	            //take only a portion of the curve
	            if (attack < originalAttack) {
	                var percentComplete = 1 - attack / originalAttack;
	                var sliceIndex = Math.floor(percentComplete * this._attackCurve.length);
	                curve = this._attackCurve.slice(sliceIndex);
	                //the first index is the current value
	                curve[0] = currentValue;
	            }
	            this._sig.setValueCurveAtTime(curve, time, attack, velocity);
	        }
	        //decay
	        this._sig.targetRampTo(velocity * this.sustain, decay, attack + time);
	        return this;
	    };
	    /**
		 *  Triggers the release of the envelope.
		 *  @param  {Time} [time=now] When the release portion of the envelope should start.
		 *  @returns {Tone.Envelope} this
		 *  @example
		 *  //trigger release immediately
		 *  env.triggerRelease();
		 */
	    Tone.Envelope.prototype.triggerRelease = function (time) {
	        time = this.toSeconds(time);
	        var currentValue = this.getValueAtTime(time);
	        if (currentValue > 0) {
	            var release = this.toSeconds(this.release);
	            if (this._releaseCurve === 'linear') {
	                this._sig.linearRampTo(0, release, time);
	            } else if (this._releaseCurve === 'exponential') {
	                this._sig.targetRampTo(0, release, time);
	            } else {
	                var curve = this._releaseCurve;
	                if (Tone.isArray(curve)) {
	                    this._sig.setRampPoint(time);
	                    this._sig.setValueCurveAtTime(curve, time, release, currentValue);
	                }
	            }
	        }
	        return this;
	    };
	    /**
		 *  Get the scheduled value at the given time. This will
		 *  return the unconverted (raw) value.
		 *  @param  {Number}  time  The time in seconds.
		 *  @return  {Number}  The scheduled value at the given time.
		 */
	    Tone.Envelope.prototype.getValueAtTime = function (time) {
	        return this._sig.getValueAtTime(time);
	    };
	    /**
		 *  triggerAttackRelease is shorthand for triggerAttack, then waiting
		 *  some duration, then triggerRelease.
		 *  @param {Time} duration The duration of the sustain.
		 *  @param {Time} [time=now] When the attack should be triggered.
		 *  @param {number} [velocity=1] The velocity of the envelope.
		 *  @returns {Tone.Envelope} this
		 *  @example
		 * //trigger the attack and then the release after 0.6 seconds.
		 * env.triggerAttackRelease(0.6);
		 */
	    Tone.Envelope.prototype.triggerAttackRelease = function (duration, time, velocity) {
	        time = this.toSeconds(time);
	        this.triggerAttack(time, velocity);
	        this.triggerRelease(time + this.toSeconds(duration));
	        return this;
	    };
	    /**
		 *  Cancels all scheduled envelope changes after the given time.
		 *  @param  {Time} after
		 *  @returns {Tone.Envelope} this
		 */
	    Tone.Envelope.prototype.cancel = function (after) {
	        this._sig.cancelScheduledValues(after);
	        return this;
	    };
	    /**
		 *  Borrows the connect method from Tone.Signal.
		 *  @function
		 *  @private
		 */
	    Tone.Envelope.prototype.connect = Tone.Signal.prototype.connect;
	    /**
	 	 *  Generate some complex envelope curves.
	 	 */
	    (function _createCurves() {
	        var curveLen = 128;
	        var i, k;
	        //cosine curve
	        var cosineCurve = [];
	        for (i = 0; i < curveLen; i++) {
	            cosineCurve[i] = Math.sin(i / (curveLen - 1) * (Math.PI / 2));
	        }
	        //ripple curve
	        var rippleCurve = [];
	        var rippleCurveFreq = 6.4;
	        for (i = 0; i < curveLen - 1; i++) {
	            k = i / (curveLen - 1);
	            var sineWave = Math.sin(k * (Math.PI * 2) * rippleCurveFreq - Math.PI / 2) + 1;
	            rippleCurve[i] = sineWave / 10 + k * 0.83;
	        }
	        rippleCurve[curveLen - 1] = 1;
	        //stairs curve
	        var stairsCurve = [];
	        var steps = 5;
	        for (i = 0; i < curveLen; i++) {
	            stairsCurve[i] = Math.ceil(i / (curveLen - 1) * steps) / steps;
	        }
	        //in-out easing curve
	        var sineCurve = [];
	        for (i = 0; i < curveLen; i++) {
	            k = i / (curveLen - 1);
	            sineCurve[i] = 0.5 * (1 - Math.cos(Math.PI * k));
	        }
	        //a bounce curve
	        var bounceCurve = [];
	        for (i = 0; i < curveLen; i++) {
	            k = i / (curveLen - 1);
	            var freq = Math.pow(k, 3) * 4 + 0.2;
	            var val = Math.cos(freq * Math.PI * 2 * k);
	            bounceCurve[i] = Math.abs(val * (1 - k));
	        }
	        /**
			 *  Invert a value curve to make it work for the release
			 *  @private
			 */
	        function invertCurve(curve) {
	            var out = new Array(curve.length);
	            for (var j = 0; j < curve.length; j++) {
	                out[j] = 1 - curve[j];
	            }
	            return out;
	        }
	        /**
			 *  reverse the curve
			 *  @private
			 */
	        function reverseCurve(curve) {
	            return curve.slice(0).reverse();
	        }
	        /**
			 *  attack and release curve arrays
			 *  @type  {Object}
			 *  @private
			 */
	        Tone.Envelope.Type = {
	            'linear': 'linear',
	            'exponential': 'exponential',
	            'bounce': {
	                In: invertCurve(bounceCurve),
	                Out: bounceCurve
	            },
	            'cosine': {
	                In: cosineCurve,
	                Out: reverseCurve(cosineCurve)
	            },
	            'step': {
	                In: stairsCurve,
	                Out: invertCurve(stairsCurve)
	            },
	            'ripple': {
	                In: rippleCurve,
	                Out: invertCurve(rippleCurve)
	            },
	            'sine': {
	                In: sineCurve,
	                Out: invertCurve(sineCurve)
	            }
	        };
	    }());
	    /**
		 *  Disconnect and dispose.
		 *  @returns {Tone.Envelope} this
		 */
	    Tone.Envelope.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._sig.dispose();
	        this._sig = null;
	        this._attackCurve = null;
	        this._releaseCurve = null;
	        return this;
	    };
	    return Tone.Envelope;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Tone.AmplitudeEnvelope is a Tone.Envelope connected to a gain node.
		 *          Unlike Tone.Envelope, which outputs the envelope's value, Tone.AmplitudeEnvelope accepts
		 *          an audio signal as the input and will apply the envelope to the amplitude
		 *          of the signal. Read more about ADSR Envelopes on [Wikipedia](https://en.wikipedia.org/wiki/Synthesizer#ADSR_envelope).
		 *
		 *  @constructor
		 *  @extends {Tone.Envelope}
		 *  @param {Time|Object} [attack] The amount of time it takes for the envelope to go from
		 *                               0 to it's maximum value.
		 *  @param {Time} [decay]	The period of time after the attack that it takes for the envelope
		 *                       	to fall to the sustain value.
		 *  @param {NormalRange} [sustain]	The percent of the maximum value that the envelope rests at until
		 *                                	the release is triggered.
		 *  @param {Time} [release]	The amount of time after the release is triggered it takes to reach 0.
		 *  @example
		 * var ampEnv = new Tone.AmplitudeEnvelope({
		 * 	"attack": 0.1,
		 * 	"decay": 0.2,
		 * 	"sustain": 1.0,
		 * 	"release": 0.8
		 * }).toMaster();
		 * //create an oscillator and connect it
		 * var osc = new Tone.Oscillator().connect(ampEnv).start();
		 * //trigger the envelopes attack and release "8t" apart
		 * ampEnv.triggerAttackRelease("8t");
		 */
	    Tone.AmplitudeEnvelope = function () {
	        Tone.Envelope.apply(this, arguments);
	        /**
			 *  the input node
			 *  @type {GainNode}
			 *  @private
			 */
	        this.input = this.output = new Tone.Gain();
	        this._sig.connect(this.output.gain);
	    };
	    Tone.extend(Tone.AmplitudeEnvelope, Tone.Envelope);
	    /**
		 *  Clean up
		 *  @return  {Tone.AmplitudeEnvelope}  this
		 */
	    Tone.AmplitudeEnvelope.prototype.dispose = function () {
	        Tone.Envelope.prototype.dispose.call(this);
	        return this;
	    };
	    return Tone.AmplitudeEnvelope;
	});
	Module(function (Tone) {
	    
	    /**
		 *  AnalyserNode.getFloatTimeDomainData polyfill
		 *  @private
		 */
	    if (window.AnalyserNode && !AnalyserNode.prototype.getFloatTimeDomainData) {
	        //referenced https://github.com/mohayonao/get-float-time-domain-data
	        AnalyserNode.prototype.getFloatTimeDomainData = function (array) {
	            var uint8 = new Uint8Array(array.length);
	            this.getByteTimeDomainData(uint8);
	            for (var i = 0; i < uint8.length; i++) {
	                array[i] = (uint8[i] - 128) / 128;
	            }
	        };
	    }
	    /**
		 *  @class  Wrapper around the native Web Audio's
		 *          [AnalyserNode](http://webaudio.github.io/web-audio-api/#idl-def-AnalyserNode).
		 *          Extracts FFT or Waveform data from the incoming signal.
		 *  @extends {Tone.AudioNode}
		 *  @param {String=} type The return type of the analysis, either "fft", or "waveform".
		 *  @param {Number=} size The size of the FFT. Value must be a power of
		 *                       two in the range 32 to 32768.
		 */
	    Tone.Analyser = function () {
	        var options = Tone.defaults(arguments, [
	            'type',
	            'size'
	        ], Tone.Analyser);
	        Tone.AudioNode.call(this);
	        /**
			 *  The analyser node.
			 *  @private
			 *  @type {AnalyserNode}
			 */
	        this._analyser = this.input = this.output = this.context.createAnalyser();
	        /**
			 *  The analysis type
			 *  @type {String}
			 *  @private
			 */
	        this._type = options.type;
	        /**
			 *  The buffer that the FFT data is written to
			 *  @type {TypedArray}
			 *  @private
			 */
	        this._buffer = null;
	        //set the values initially
	        this.size = options.size;
	        this.type = options.type;
	    };
	    Tone.extend(Tone.Analyser, Tone.AudioNode);
	    /**
		 *  The default values.
		 *  @type {Object}
		 *  @const
		 */
	    Tone.Analyser.defaults = {
	        'size': 1024,
	        'type': 'fft',
	        'smoothing': 0.8
	    };
	    /**
		 *  Possible return types of analyser.getValue()
		 *  @enum {String}
		 */
	    Tone.Analyser.Type = {
	        Waveform: 'waveform',
	        FFT: 'fft'
	    };
	    /**
		 *  Run the analysis given the current settings and return the
		 *  result as a TypedArray.
		 *  @returns {TypedArray}
		 */
	    Tone.Analyser.prototype.getValue = function () {
	        if (this._type === Tone.Analyser.Type.FFT) {
	            this._analyser.getFloatFrequencyData(this._buffer);
	        } else if (this._type === Tone.Analyser.Type.Waveform) {
	            this._analyser.getFloatTimeDomainData(this._buffer);
	        }
	        return this._buffer;
	    };
	    /**
		 *  The size of analysis. This must be a power of two in the range 32 to 32768.
		 *  @memberOf Tone.Analyser#
		 *  @type {Number}
		 *  @name size
		 */
	    Object.defineProperty(Tone.Analyser.prototype, 'size', {
	        get: function () {
	            return this._analyser.frequencyBinCount;
	        },
	        set: function (size) {
	            this._analyser.fftSize = size * 2;
	            this._buffer = new Float32Array(size);
	        }
	    });
	    /**
		 *  The analysis function returned by analyser.getValue(), either "fft" or "waveform".
		 *  @memberOf Tone.Analyser#
		 *  @type {String}
		 *  @name type
		 */
	    Object.defineProperty(Tone.Analyser.prototype, 'type', {
	        get: function () {
	            return this._type;
	        },
	        set: function (type) {
	            if (type !== Tone.Analyser.Type.Waveform && type !== Tone.Analyser.Type.FFT) {
	                throw new TypeError('Tone.Analyser: invalid type: ' + type);
	            }
	            this._type = type;
	        }
	    });
	    /**
		 *  0 represents no time averaging with the last analysis frame.
		 *  @memberOf Tone.Analyser#
		 *  @type {NormalRange}
		 *  @name smoothing
		 */
	    Object.defineProperty(Tone.Analyser.prototype, 'smoothing', {
	        get: function () {
	            return this._analyser.smoothingTimeConstant;
	        },
	        set: function (val) {
	            this._analyser.smoothingTimeConstant = val;
	        }
	    });
	    /**
		 *  Clean up.
		 *  @return  {Tone.Analyser}  this
		 */
	    Tone.Analyser.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._analyser.disconnect();
	        this._analyser = null;
	        this._buffer = null;
	    };
	    return Tone.Analyser;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.Compressor is a thin wrapper around the Web Audio
		 *         [DynamicsCompressorNode](http://webaudio.github.io/web-audio-api/#the-dynamicscompressornode-interface).
		 *         Compression reduces the volume of loud sounds or amplifies quiet sounds
		 *         by narrowing or "compressing" an audio signal's dynamic range.
		 *         Read more on [Wikipedia](https://en.wikipedia.org/wiki/Dynamic_range_compression).
		 *
		 *  @extends {Tone.AudioNode}
		 *  @constructor
		 *  @param {Decibels|Object} [threshold] The value above which the compression starts to be applied.
		 *  @param {Positive} [ratio] The gain reduction ratio.
		 *  @example
		 * var comp = new Tone.Compressor(-30, 3);
		 */
	    Tone.Compressor = function () {
	        var options = Tone.defaults(arguments, [
	            'threshold',
	            'ratio'
	        ], Tone.Compressor);
	        Tone.AudioNode.call(this);
	        /**
			 *  the compressor node
			 *  @type {DynamicsCompressorNode}
			 *  @private
			 */
	        this._compressor = this.input = this.output = this.context.createDynamicsCompressor();
	        /**
			 *  the threshold vaue
			 *  @type {Decibels}
			 *  @signal
			 */
	        this.threshold = new Tone.Param({
	            'param': this._compressor.threshold,
	            'units': Tone.Type.Decibels,
	            'convert': false
	        });
	        /**
			 *  The attack parameter
			 *  @type {Time}
			 *  @signal
			 */
	        this.attack = new Tone.Param(this._compressor.attack, Tone.Type.Time);
	        /**
			 *  The release parameter
			 *  @type {Time}
			 *  @signal
			 */
	        this.release = new Tone.Param(this._compressor.release, Tone.Type.Time);
	        /**
			 *  The knee parameter
			 *  @type {Decibels}
			 *  @signal
			 */
	        this.knee = new Tone.Param({
	            'param': this._compressor.knee,
	            'units': Tone.Type.Decibels,
	            'convert': false
	        });
	        /**
			 *  The ratio value
			 *  @type {Number}
			 *  @signal
			 */
	        this.ratio = new Tone.Param({
	            'param': this._compressor.ratio,
	            'convert': false
	        });
	        //set the defaults
	        this._readOnly([
	            'knee',
	            'release',
	            'attack',
	            'ratio',
	            'threshold'
	        ]);
	        this.set(options);
	    };
	    Tone.extend(Tone.Compressor, Tone.AudioNode);
	    /**
		 *  @static
		 *  @const
		 *  @type {Object}
		 */
	    Tone.Compressor.defaults = {
	        'ratio': 12,
	        'threshold': -24,
	        'release': 0.25,
	        'attack': 0.003,
	        'knee': 30
	    };
	    /**
		 *  clean up
		 *  @returns {Tone.Compressor} this
		 */
	    Tone.Compressor.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._writable([
	            'knee',
	            'release',
	            'attack',
	            'ratio',
	            'threshold'
	        ]);
	        this._compressor.disconnect();
	        this._compressor = null;
	        this.attack.dispose();
	        this.attack = null;
	        this.release.dispose();
	        this.release = null;
	        this.threshold.dispose();
	        this.threshold = null;
	        this.ratio.dispose();
	        this.ratio = null;
	        this.knee.dispose();
	        this.knee = null;
	        return this;
	    };
	    return Tone.Compressor;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Add a signal and a number or two signals. When no value is
		 *         passed into the constructor, Tone.Add will sum <code>input[0]</code>
		 *         and <code>input[1]</code>. If a value is passed into the constructor, 
		 *         the it will be added to the input.
		 *  
		 *  @constructor
		 *  @extends {Tone.Signal}
		 *  @param {number=} value If no value is provided, Tone.Add will sum the first
		 *                         and second inputs. 
		 *  @example
		 * var signal = new Tone.Signal(2);
		 * var add = new Tone.Add(2);
		 * signal.connect(add);
		 * //the output of add equals 4
		 *  @example
		 * //if constructed with no arguments
		 * //it will add the first and second inputs
		 * var add = new Tone.Add();
		 * var sig0 = new Tone.Signal(3).connect(add, 0, 0);
		 * var sig1 = new Tone.Signal(4).connect(add, 0, 1);
		 * //the output of add equals 7. 
		 */
	    Tone.Add = function (value) {
	        Tone.Signal.call(this);
	        this.createInsOuts(2, 0);
	        /**
			 *  the summing node
			 *  @type {GainNode}
			 *  @private
			 */
	        this._sum = this.input[0] = this.input[1] = this.output = new Tone.Gain();
	        /**
			 *  @private
			 *  @type {Tone.Signal}
			 */
	        this._param = this.input[1] = new Tone.Signal(value);
	        this._param.connect(this._sum);
	    };
	    Tone.extend(Tone.Add, Tone.Signal);
	    /**
		 *  Clean up.
		 *  @returns {Tone.Add} this
		 */
	    Tone.Add.prototype.dispose = function () {
	        Tone.Signal.prototype.dispose.call(this);
	        this._sum.dispose();
	        this._sum = null;
	        return this;
	    };
	    return Tone.Add;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Multiply two incoming signals. Or, if a number is given in the constructor, 
		 *          multiplies the incoming signal by that value. 
		 *
		 *  @constructor
		 *  @extends {Tone.Signal}
		 *  @param {number=} value Constant value to multiple. If no value is provided,
		 *                         it will return the product of the first and second inputs
		 *  @example
		 * var mult = new Tone.Multiply();
		 * var sigA = new Tone.Signal(3);
		 * var sigB = new Tone.Signal(4);
		 * sigA.connect(mult, 0, 0);
		 * sigB.connect(mult, 0, 1);
		 * //output of mult is 12.
		 *  @example
		 * var mult = new Tone.Multiply(10);
		 * var sig = new Tone.Signal(2).connect(mult);
		 * //the output of mult is 20. 
		 */
	    Tone.Multiply = function (value) {
	        Tone.Signal.call(this);
	        this.createInsOuts(2, 0);
	        /**
			 *  the input node is the same as the output node
			 *  it is also the GainNode which handles the scaling of incoming signal
			 *  
			 *  @type {GainNode}
			 *  @private
			 */
	        this._mult = this.input[0] = this.output = new Tone.Gain();
	        /**
			 *  the scaling parameter
			 *  @type {AudioParam}
			 *  @private
			 */
	        this._param = this.input[1] = this.output.gain;
	        this._param.value = Tone.defaultArg(value, 0);
	    };
	    Tone.extend(Tone.Multiply, Tone.Signal);
	    /**
		 *  clean up
		 *  @returns {Tone.Multiply} this
		 */
	    Tone.Multiply.prototype.dispose = function () {
	        Tone.Signal.prototype.dispose.call(this);
	        this._mult.dispose();
	        this._mult = null;
	        this._param = null;
	        return this;
	    };
	    return Tone.Multiply;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Negate the incoming signal. i.e. an input signal of 10 will output -10
		 *
		 *  @constructor
		 *  @extends {Tone.SignalBase}
		 *  @example
		 * var neg = new Tone.Negate();
		 * var sig = new Tone.Signal(-2).connect(neg);
		 * //output of neg is positive 2. 
		 */
	    Tone.Negate = function () {
	        Tone.SignalBase.call(this);
	        /**
			 *  negation is done by multiplying by -1
			 *  @type {Tone.Multiply}
			 *  @private
			 */
	        this._multiply = this.input = this.output = new Tone.Multiply(-1);
	    };
	    Tone.extend(Tone.Negate, Tone.SignalBase);
	    /**
		 *  clean up
		 *  @returns {Tone.Negate} this
		 */
	    Tone.Negate.prototype.dispose = function () {
	        Tone.SignalBase.prototype.dispose.call(this);
	        this._multiply.dispose();
	        this._multiply = null;
	        return this;
	    };
	    return Tone.Negate;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Subtract the signal connected to <code>input[1]</code> from the signal connected 
		 *         to <code>input[0]</code>. If an argument is provided in the constructor, the 
		 *         signals <code>.value</code> will be subtracted from the incoming signal.
		 *
		 *  @extends {Tone.Signal}
		 *  @constructor
		 *  @param {number=} value The value to subtract from the incoming signal. If the value
		 *                         is omitted, it will subtract the second signal from the first.
		 *  @example
		 * var sub = new Tone.Subtract(1);
		 * var sig = new Tone.Signal(4).connect(sub);
		 * //the output of sub is 3. 
		 *  @example
		 * var sub = new Tone.Subtract();
		 * var sigA = new Tone.Signal(10);
		 * var sigB = new Tone.Signal(2.5);
		 * sigA.connect(sub, 0, 0);
		 * sigB.connect(sub, 0, 1);
		 * //output of sub is 7.5
		 */
	    Tone.Subtract = function (value) {
	        Tone.Signal.call(this);
	        this.createInsOuts(2, 0);
	        /**
			 *  the summing node
			 *  @type {GainNode}
			 *  @private
			 */
	        this._sum = this.input[0] = this.output = new Tone.Gain();
	        /**
			 *  negate the input of the second input before connecting it
			 *  to the summing node.
			 *  @type {Tone.Negate}
			 *  @private
			 */
	        this._neg = new Tone.Negate();
	        /**
			 *  the node where the value is set
			 *  @private
			 *  @type {Tone.Signal}
			 */
	        this._param = this.input[1] = new Tone.Signal(value);
	        this._param.chain(this._neg, this._sum);
	    };
	    Tone.extend(Tone.Subtract, Tone.Signal);
	    /**
		 *  Clean up.
		 *  @returns {Tone.SignalBase} this
		 */
	    Tone.Subtract.prototype.dispose = function () {
	        Tone.Signal.prototype.dispose.call(this);
	        this._neg.dispose();
	        this._neg = null;
	        this._sum.disconnect();
	        this._sum = null;
	        return this;
	    };
	    return Tone.Subtract;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  GreaterThanZero outputs 1 when the input is strictly greater than zero
		 *  
		 *  @constructor
		 *  @extends {Tone.SignalBase}
		 *  @example
		 * var gt0 = new Tone.GreaterThanZero();
		 * var sig = new Tone.Signal(0.01).connect(gt0);
		 * //the output of gt0 is 1. 
		 * sig.value = 0;
		 * //the output of gt0 is 0. 
		 */
	    Tone.GreaterThanZero = function () {
	        Tone.SignalBase.call(this);
	        /**
			 *  @type {Tone.WaveShaper}
			 *  @private
			 */
	        this._thresh = this.output = new Tone.WaveShaper(function (val) {
	            if (val <= 0) {
	                return 0;
	            } else {
	                return 1;
	            }
	        }, 127);
	        /**
			 *  scale the first thresholded signal by a large value.
			 *  this will help with values which are very close to 0
			 *  @type {Tone.Multiply}
			 *  @private
			 */
	        this._scale = this.input = new Tone.Multiply(10000);
	        //connections
	        this._scale.connect(this._thresh);
	    };
	    Tone.extend(Tone.GreaterThanZero, Tone.SignalBase);
	    /**
		 *  dispose method
		 *  @returns {Tone.GreaterThanZero} this
		 */
	    Tone.GreaterThanZero.prototype.dispose = function () {
	        Tone.SignalBase.prototype.dispose.call(this);
	        this._scale.dispose();
	        this._scale = null;
	        this._thresh.dispose();
	        this._thresh = null;
	        return this;
	    };
	    return Tone.GreaterThanZero;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Output 1 if the signal is greater than the value, otherwise outputs 0.
		 *          can compare two signals or a signal and a number. 
		 *  
		 *  @constructor
		 *  @extends {Tone.Signal}
		 *  @param {number} [value=0] the value to compare to the incoming signal
		 *  @example
		 * var gt = new Tone.GreaterThan(2);
		 * var sig = new Tone.Signal(4).connect(gt);
		 * //output of gt is equal 1. 
		 */
	    Tone.GreaterThan = function (value) {
	        Tone.Signal.call(this);
	        this.createInsOuts(2, 0);
	        /**
			 *  subtract the amount from the incoming signal
			 *  @type {Tone.Subtract}
			 *  @private
			 */
	        this._param = this.input[0] = new Tone.Subtract(value);
	        this.input[1] = this._param.input[1];
	        /**
			 *  compare that amount to zero
			 *  @type {Tone.GreaterThanZero}
			 *  @private
			 */
	        this._gtz = this.output = new Tone.GreaterThanZero();
	        //connect
	        this._param.connect(this._gtz);
	    };
	    Tone.extend(Tone.GreaterThan, Tone.Signal);
	    /**
		 *  dispose method
		 *  @returns {Tone.GreaterThan} this
		 */
	    Tone.GreaterThan.prototype.dispose = function () {
	        Tone.Signal.prototype.dispose.call(this);
	        this._gtz.dispose();
	        this._gtz = null;
	        return this;
	    };
	    return Tone.GreaterThan;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Return the absolute value of an incoming signal. 
		 *  
		 *  @constructor
		 *  @extends {Tone.SignalBase}
		 *  @example
		 * var signal = new Tone.Signal(-1);
		 * var abs = new Tone.Abs();
		 * signal.connect(abs);
		 * //the output of abs is 1. 
		 */
	    Tone.Abs = function () {
	        Tone.SignalBase.call(this);
	        /**
			 *  @type {Tone.LessThan}
			 *  @private
			 */
	        this._abs = this.input = this.output = new Tone.WaveShaper(function (val) {
	            if (val === 0) {
	                return 0;
	            } else {
	                return Math.abs(val);
	            }
	        }, 127);
	    };
	    Tone.extend(Tone.Abs, Tone.SignalBase);
	    /**
		 *  dispose method
		 *  @returns {Tone.Abs} this
		 */
	    Tone.Abs.prototype.dispose = function () {
	        Tone.SignalBase.prototype.dispose.call(this);
	        this._abs.dispose();
	        this._abs = null;
	        return this;
	    };
	    return Tone.Abs;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Signal-rate modulo operator. Only works in AudioRange [-1, 1] and for modulus
		 *         values in the NormalRange. 
		 *
		 *  @constructor
		 *  @extends {Tone.SignalBase}
		 *  @param {NormalRange} modulus The modulus to apply.
		 *  @example
		 * var mod = new Tone.Modulo(0.2)
		 * var sig = new Tone.Signal(0.5).connect(mod);
		 * //mod outputs 0.1
		 */
	    Tone.Modulo = function (modulus) {
	        Tone.SignalBase.call(this);
	        this.createInsOuts(1, 0);
	        /**
			 *  A waveshaper gets the integer multiple of 
			 *  the input signal and the modulus.
			 *  @private
			 *  @type {Tone.WaveShaper}
			 */
	        this._shaper = new Tone.WaveShaper(Math.pow(2, 16));
	        /**
			 *  the integer multiple is multiplied by the modulus
			 *  @type  {Tone.Multiply}
			 *  @private
			 */
	        this._multiply = new Tone.Multiply();
	        /**
			 *  and subtracted from the input signal
			 *  @type  {Tone.Subtract}
			 *  @private
			 */
	        this._subtract = this.output = new Tone.Subtract();
	        /**
			 *  the modulus signal
			 *  @type  {Tone.Signal}
			 *  @private
			 */
	        this._modSignal = new Tone.Signal(modulus);
	        //connections
	        this.input.fan(this._shaper, this._subtract);
	        this._modSignal.connect(this._multiply, 0, 0);
	        this._shaper.connect(this._multiply, 0, 1);
	        this._multiply.connect(this._subtract, 0, 1);
	        this._setWaveShaper(modulus);
	    };
	    Tone.extend(Tone.Modulo, Tone.SignalBase);
	    /**
		 *  @param  {number}  mod  the modulus to apply
		 *  @private
		 */
	    Tone.Modulo.prototype._setWaveShaper = function (mod) {
	        this._shaper.setMap(function (val) {
	            var multiple = Math.floor((val + 0.0001) / mod);
	            return multiple;
	        });
	    };
	    /**
		 * The modulus value.
		 * @memberOf Tone.Modulo#
		 * @type {NormalRange}
		 * @name value
		 */
	    Object.defineProperty(Tone.Modulo.prototype, 'value', {
	        get: function () {
	            return this._modSignal.value;
	        },
	        set: function (mod) {
	            this._modSignal.value = mod;
	            this._setWaveShaper(mod);
	        }
	    });
	    /**
		 * clean up
		 *  @returns {Tone.Modulo} this
		 */
	    Tone.Modulo.prototype.dispose = function () {
	        Tone.SignalBase.prototype.dispose.call(this);
	        this._shaper.dispose();
	        this._shaper = null;
	        this._multiply.dispose();
	        this._multiply = null;
	        this._subtract.dispose();
	        this._subtract = null;
	        this._modSignal.dispose();
	        this._modSignal = null;
	        return this;
	    };
	    return Tone.Modulo;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class AudioToGain converts an input in AudioRange [-1,1] to NormalRange [0,1]. 
		 *         See Tone.GainToAudio.
		 *
		 *  @extends {Tone.SignalBase}
		 *  @constructor
		 *  @example
		 *  var a2g = new Tone.AudioToGain();
		 */
	    Tone.AudioToGain = function () {
	        Tone.SignalBase.call(this);
	        /**
			 *  @type {WaveShaperNode}
			 *  @private
			 */
	        this._norm = this.input = this.output = new Tone.WaveShaper(function (x) {
	            return (x + 1) / 2;
	        });
	    };
	    Tone.extend(Tone.AudioToGain, Tone.SignalBase);
	    /**
		 *  clean up
		 *  @returns {Tone.AudioToGain} this
		 */
	    Tone.AudioToGain.prototype.dispose = function () {
	        Tone.SignalBase.prototype.dispose.call(this);
	        this._norm.dispose();
	        this._norm = null;
	        return this;
	    };
	    return Tone.AudioToGain;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Evaluate an expression at audio rate. <br><br>
		 *         Parsing code modified from https://code.google.com/p/tapdigit/
		 *         Copyright 2011 2012 Ariya Hidayat, New BSD License
		 *
		 *  @extends {Tone.SignalBase}
		 *  @constructor
		 *  @param {string} expr the expression to generate
		 *  @example
		 * //adds the signals from input[0] and input[1].
		 * var expr = new Tone.Expr("$0 + $1");
		 */
	    Tone.Expr = function () {
	        Tone.SignalBase.call(this);
	        var expr = this._replacements(Array.prototype.slice.call(arguments));
	        var inputCount = this._parseInputs(expr);
	        /**
			 *  hold onto all of the nodes for disposal
			 *  @type {Array}
			 *  @private
			 */
	        this._nodes = [];
	        /**
			 *  The inputs. The length is determined by the expression. 
			 *  @type {Array}
			 */
	        this.input = new Array(inputCount);
	        //create a gain for each input
	        for (var i = 0; i < inputCount; i++) {
	            this.input[i] = this.context.createGain();
	        }
	        //parse the syntax tree
	        var tree = this._parseTree(expr);
	        //evaluate the results
	        var result;
	        try {
	            result = this._eval(tree);
	        } catch (e) {
	            this._disposeNodes();
	            throw new Error('Tone.Expr: Could evaluate expression: ' + expr);
	        }
	        /**
			 *  The output node is the result of the expression
			 *  @type {Tone}
			 */
	        this.output = result;
	    };
	    Tone.extend(Tone.Expr, Tone.SignalBase);
	    //some helpers to cut down the amount of code
	    function applyBinary(Constructor, args, self) {
	        var op = new Constructor();
	        self._eval(args[0]).connect(op, 0, 0);
	        self._eval(args[1]).connect(op, 0, 1);
	        return op;
	    }
	    function applyUnary(Constructor, args, self) {
	        var op = new Constructor();
	        self._eval(args[0]).connect(op, 0, 0);
	        return op;
	    }
	    function getNumber(arg) {
	        return arg ? parseFloat(arg) : undefined;
	    }
	    function literalNumber(arg) {
	        return arg && arg.args ? parseFloat(arg.args) : undefined;
	    }
	    /*
		 *  the Expressions that Tone.Expr can parse.
		 *
		 *  each expression belongs to a group and contains a regexp 
		 *  for selecting the operator as well as that operators method
		 *  
		 *  @type {Object}
		 *  @private
		 */
	    Tone.Expr._Expressions = {
	        //values
	        'value': {
	            'signal': {
	                regexp: /^\d+\.\d+|^\d+/,
	                method: function (arg) {
	                    var sig = new Tone.Signal(getNumber(arg));
	                    return sig;
	                }
	            },
	            'input': {
	                regexp: /^\$\d/,
	                method: function (arg, self) {
	                    return self.input[getNumber(arg.substr(1))];
	                }
	            }
	        },
	        //syntactic glue
	        'glue': {
	            '(': { regexp: /^\(/ },
	            ')': { regexp: /^\)/ },
	            ',': { regexp: /^,/ }
	        },
	        //functions
	        'func': {
	            'abs': {
	                regexp: /^abs/,
	                method: applyUnary.bind(this, Tone.Abs)
	            },
	            'mod': {
	                regexp: /^mod/,
	                method: function (args, self) {
	                    var modulus = literalNumber(args[1]);
	                    var op = new Tone.Modulo(modulus);
	                    self._eval(args[0]).connect(op);
	                    return op;
	                }
	            },
	            'pow': {
	                regexp: /^pow/,
	                method: function (args, self) {
	                    var exp = literalNumber(args[1]);
	                    var op = new Tone.Pow(exp);
	                    self._eval(args[0]).connect(op);
	                    return op;
	                }
	            },
	            'a2g': {
	                regexp: /^a2g/,
	                method: function (args, self) {
	                    var op = new Tone.AudioToGain();
	                    self._eval(args[0]).connect(op);
	                    return op;
	                }
	            }
	        },
	        //binary expressions
	        'binary': {
	            '+': {
	                regexp: /^\+/,
	                precedence: 1,
	                method: applyBinary.bind(this, Tone.Add)
	            },
	            '-': {
	                regexp: /^\-/,
	                precedence: 1,
	                method: function (args, self) {
	                    //both unary and binary op
	                    if (args.length === 1) {
	                        return applyUnary(Tone.Negate, args, self);
	                    } else {
	                        return applyBinary(Tone.Subtract, args, self);
	                    }
	                }
	            },
	            '*': {
	                regexp: /^\*/,
	                precedence: 0,
	                method: applyBinary.bind(this, Tone.Multiply)
	            }
	        },
	        //unary expressions
	        'unary': {
	            '-': {
	                regexp: /^\-/,
	                method: applyUnary.bind(this, Tone.Negate)
	            },
	            '!': {
	                regexp: /^\!/,
	                method: applyUnary.bind(this, Tone.NOT)
	            }
	        }
	    };
	    /**
		 *  @param   {string} expr the expression string
		 *  @return  {number}      the input count
		 *  @private
		 */
	    Tone.Expr.prototype._parseInputs = function (expr) {
	        var inputArray = expr.match(/\$\d/g);
	        var inputMax = 0;
	        if (inputArray !== null) {
	            for (var i = 0; i < inputArray.length; i++) {
	                var inputNum = parseInt(inputArray[i].substr(1)) + 1;
	                inputMax = Math.max(inputMax, inputNum);
	            }
	        }
	        return inputMax;
	    };
	    /**
		 *  @param   {Array} args 	an array of arguments
		 *  @return  {string} the results of the replacements being replaced
		 *  @private
		 */
	    Tone.Expr.prototype._replacements = function (args) {
	        var expr = args.shift();
	        for (var i = 0; i < args.length; i++) {
	            expr = expr.replace(/\%/i, args[i]);
	        }
	        return expr;
	    };
	    /**
		 *  tokenize the expression based on the Expressions object
		 *  @param   {string} expr 
		 *  @return  {Object}      returns two methods on the tokenized list, next and peek
		 *  @private
		 */
	    Tone.Expr.prototype._tokenize = function (expr) {
	        var position = -1;
	        var tokens = [];
	        while (expr.length > 0) {
	            expr = expr.trim();
	            var token = getNextToken(expr);
	            tokens.push(token);
	            expr = expr.substr(token.value.length);
	        }
	        function getNextToken(expr) {
	            for (var type in Tone.Expr._Expressions) {
	                var group = Tone.Expr._Expressions[type];
	                for (var opName in group) {
	                    var op = group[opName];
	                    var reg = op.regexp;
	                    var match = expr.match(reg);
	                    if (match !== null) {
	                        return {
	                            type: type,
	                            value: match[0],
	                            method: op.method
	                        };
	                    }
	                }
	            }
	            throw new SyntaxError('Tone.Expr: Unexpected token ' + expr);
	        }
	        return {
	            next: function () {
	                return tokens[++position];
	            },
	            peek: function () {
	                return tokens[position + 1];
	            }
	        };
	    };
	    /**
		 *  recursively parse the string expression into a syntax tree
		 *  
		 *  @param   {string} expr 
		 *  @return  {Object}
		 *  @private
		 */
	    Tone.Expr.prototype._parseTree = function (expr) {
	        var lexer = this._tokenize(expr);
	        var isUndef = Tone.isUndef.bind(this);
	        function matchSyntax(token, syn) {
	            return !isUndef(token) && token.type === 'glue' && token.value === syn;
	        }
	        function matchGroup(token, groupName, prec) {
	            var ret = false;
	            var group = Tone.Expr._Expressions[groupName];
	            if (!isUndef(token)) {
	                for (var opName in group) {
	                    var op = group[opName];
	                    if (op.regexp.test(token.value)) {
	                        if (!isUndef(prec)) {
	                            if (op.precedence === prec) {
	                                return true;
	                            }
	                        } else {
	                            return true;
	                        }
	                    }
	                }
	            }
	            return ret;
	        }
	        function parseExpression(precedence) {
	            if (isUndef(precedence)) {
	                precedence = 5;
	            }
	            var expr;
	            if (precedence < 0) {
	                expr = parseUnary();
	            } else {
	                expr = parseExpression(precedence - 1);
	            }
	            var token = lexer.peek();
	            while (matchGroup(token, 'binary', precedence)) {
	                token = lexer.next();
	                expr = {
	                    operator: token.value,
	                    method: token.method,
	                    args: [
	                        expr,
	                        parseExpression(precedence - 1)
	                    ]
	                };
	                token = lexer.peek();
	            }
	            return expr;
	        }
	        function parseUnary() {
	            var token, expr;
	            token = lexer.peek();
	            if (matchGroup(token, 'unary')) {
	                token = lexer.next();
	                expr = parseUnary();
	                return {
	                    operator: token.value,
	                    method: token.method,
	                    args: [expr]
	                };
	            }
	            return parsePrimary();
	        }
	        function parsePrimary() {
	            var token, expr;
	            token = lexer.peek();
	            if (isUndef(token)) {
	                throw new SyntaxError('Tone.Expr: Unexpected termination of expression');
	            }
	            if (token.type === 'func') {
	                token = lexer.next();
	                return parseFunctionCall(token);
	            }
	            if (token.type === 'value') {
	                token = lexer.next();
	                return {
	                    method: token.method,
	                    args: token.value
	                };
	            }
	            if (matchSyntax(token, '(')) {
	                lexer.next();
	                expr = parseExpression();
	                token = lexer.next();
	                if (!matchSyntax(token, ')')) {
	                    throw new SyntaxError('Expected )');
	                }
	                return expr;
	            }
	            throw new SyntaxError('Tone.Expr: Parse error, cannot process token ' + token.value);
	        }
	        function parseFunctionCall(func) {
	            var token, args = [];
	            token = lexer.next();
	            if (!matchSyntax(token, '(')) {
	                throw new SyntaxError('Tone.Expr: Expected ( in a function call "' + func.value + '"');
	            }
	            token = lexer.peek();
	            if (!matchSyntax(token, ')')) {
	                args = parseArgumentList();
	            }
	            token = lexer.next();
	            if (!matchSyntax(token, ')')) {
	                throw new SyntaxError('Tone.Expr: Expected ) in a function call "' + func.value + '"');
	            }
	            return {
	                method: func.method,
	                args: args,
	                name: name
	            };
	        }
	        function parseArgumentList() {
	            var token, expr, args = [];
	            while (true) {
	                expr = parseExpression();
	                if (isUndef(expr)) {
	                    // TODO maybe throw exception?
	                    break;
	                }
	                args.push(expr);
	                token = lexer.peek();
	                if (!matchSyntax(token, ',')) {
	                    break;
	                }
	                lexer.next();
	            }
	            return args;
	        }
	        return parseExpression();
	    };
	    /**
		 *  recursively evaluate the expression tree
		 *  @param   {Object} tree 
		 *  @return  {AudioNode}      the resulting audio node from the expression
		 *  @private
		 */
	    Tone.Expr.prototype._eval = function (tree) {
	        if (!Tone.isUndef(tree)) {
	            var node = tree.method(tree.args, this);
	            this._nodes.push(node);
	            return node;
	        }
	    };
	    /**
		 *  dispose all the nodes
		 *  @private
		 */
	    Tone.Expr.prototype._disposeNodes = function () {
	        for (var i = 0; i < this._nodes.length; i++) {
	            var node = this._nodes[i];
	            if (Tone.isFunction(node.dispose)) {
	                node.dispose();
	            } else if (Tone.isFunction(node.disconnect)) {
	                node.disconnect();
	            }
	            node = null;
	            this._nodes[i] = null;
	        }
	        this._nodes = null;
	    };
	    /**
		 *  clean up
		 */
	    Tone.Expr.prototype.dispose = function () {
	        Tone.SignalBase.prototype.dispose.call(this);
	        this._disposeNodes();
	    };
	    return Tone.Expr;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Convert an incoming signal between 0, 1 to an equal power gain scale.
		 *
		 *  @extends {Tone.SignalBase}
		 *  @constructor
		 *  @example
		 * var eqPowGain = new Tone.EqualPowerGain();
		 */
	    Tone.EqualPowerGain = function () {
	        Tone.SignalBase.call(this);
	        /**
			 *  @type {Tone.WaveShaper}
			 *  @private
			 */
	        this._eqPower = this.input = this.output = new Tone.WaveShaper(function (val) {
	            if (Math.abs(val) < 0.001) {
	                //should output 0 when input is 0
	                return 0;
	            } else {
	                return Tone.equalPowerScale(val);
	            }
	        }.bind(this), 4096);
	    };
	    Tone.extend(Tone.EqualPowerGain, Tone.SignalBase);
	    /**
		 *  clean up
		 *  @returns {Tone.EqualPowerGain} this
		 */
	    Tone.EqualPowerGain.prototype.dispose = function () {
	        Tone.SignalBase.prototype.dispose.call(this);
	        this._eqPower.dispose();
	        this._eqPower = null;
	        return this;
	    };
	    return Tone.EqualPowerGain;
	});
	Module(function (Tone) {
	    
	    /**
		 * @class  Tone.Crossfade provides equal power fading between two inputs.
		 *         More on crossfading technique [here](https://en.wikipedia.org/wiki/Fade_(audio_engineering)#Crossfading).
		 *
		 * @constructor
		 * @extends {Tone.AudioNode}
		 * @param {NormalRange} [initialFade=0.5]
		 * @example
		 * var crossFade = new Tone.CrossFade(0.5);
		 * //connect effect A to crossfade from
		 * //effect output 0 to crossfade input 0
		 * effectA.connect(crossFade, 0, 0);
		 * //connect effect B to crossfade from
		 * //effect output 0 to crossfade input 1
		 * effectB.connect(crossFade, 0, 1);
		 * crossFade.fade.value = 0;
		 * // ^ only effectA is output
		 * crossFade.fade.value = 1;
		 * // ^ only effectB is output
		 * crossFade.fade.value = 0.5;
		 * // ^ the two signals are mixed equally.
		 */
	    Tone.CrossFade = function (initialFade) {
	        Tone.AudioNode.call(this);
	        this.createInsOuts(2, 1);
	        /**
			 *  Alias for <code>input[0]</code>.
			 *  @type {Tone.Gain}
			 */
	        this.a = this.input[0] = new Tone.Gain();
	        /**
			 *  Alias for <code>input[1]</code>.
			 *  @type {Tone.Gain}
			 */
	        this.b = this.input[1] = new Tone.Gain();
	        /**
			 * 	The mix between the two inputs. A fade value of 0
			 * 	will output 100% <code>input[0]</code> and
			 * 	a value of 1 will output 100% <code>input[1]</code>.
			 *  @type {NormalRange}
			 *  @signal
			 */
	        this.fade = new Tone.Signal(Tone.defaultArg(initialFade, 0.5), Tone.Type.NormalRange);
	        /**
			 *  equal power gain cross fade
			 *  @private
			 *  @type {Tone.EqualPowerGain}
			 */
	        this._equalPowerA = new Tone.EqualPowerGain();
	        /**
			 *  equal power gain cross fade
			 *  @private
			 *  @type {Tone.EqualPowerGain}
			 */
	        this._equalPowerB = new Tone.EqualPowerGain();
	        /**
			 *  invert the incoming signal
			 *  @private
			 *  @type {Tone}
			 */
	        this._invert = new Tone.Expr('1 - $0');
	        //connections
	        this.a.connect(this.output);
	        this.b.connect(this.output);
	        this.fade.chain(this._equalPowerB, this.b.gain);
	        this.fade.chain(this._invert, this._equalPowerA, this.a.gain);
	        this._readOnly('fade');
	    };
	    Tone.extend(Tone.CrossFade, Tone.AudioNode);
	    /**
		 *  clean up
		 *  @returns {Tone.CrossFade} this
		 */
	    Tone.CrossFade.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._writable('fade');
	        this._equalPowerA.dispose();
	        this._equalPowerA = null;
	        this._equalPowerB.dispose();
	        this._equalPowerB = null;
	        this.fade.dispose();
	        this.fade = null;
	        this._invert.dispose();
	        this._invert = null;
	        this.a.dispose();
	        this.a = null;
	        this.b.dispose();
	        this.b = null;
	        return this;
	    };
	    return Tone.CrossFade;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Tone.Filter is a filter which allows for all of the same native methods
		 *          as the [BiquadFilterNode](http://webaudio.github.io/web-audio-api/#the-biquadfilternode-interface).
		 *          Tone.Filter has the added ability to set the filter rolloff at -12
		 *          (default), -24 and -48.
		 *
		 *  @constructor
		 *  @extends {Tone.AudioNode}
		 *  @param {Frequency|Object} [frequency] The cutoff frequency of the filter.
		 *  @param {string=} type The type of filter.
		 *  @param {number=} rolloff The drop in decibels per octave after the cutoff frequency.
		 *                            3 choices: -12, -24, and -48
		 *  @example
		 *  var filter = new Tone.Filter(200, "highpass");
		 */
	    Tone.Filter = function () {
	        var options = Tone.defaults(arguments, [
	            'frequency',
	            'type',
	            'rolloff'
	        ], Tone.Filter);
	        Tone.AudioNode.call(this);
	        this.createInsOuts(1, 1);
	        /**
			 *  the filter(s)
			 *  @type {Array}
			 *  @private
			 */
	        this._filters = [];
	        /**
			 *  The cutoff frequency of the filter.
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.frequency = new Tone.Signal(options.frequency, Tone.Type.Frequency);
	        /**
			 *  The detune parameter
			 *  @type {Cents}
			 *  @signal
			 */
	        this.detune = new Tone.Signal(0, Tone.Type.Cents);
	        /**
			 *  The gain of the filter, only used in certain filter types
			 *  @type {Number}
			 *  @signal
			 */
	        this.gain = new Tone.Signal({
	            'value': options.gain,
	            'convert': false
	        });
	        /**
			 *  The Q or Quality of the filter
			 *  @type {Positive}
			 *  @signal
			 */
	        this.Q = new Tone.Signal(options.Q);
	        /**
			 *  the type of the filter
			 *  @type {string}
			 *  @private
			 */
	        this._type = options.type;
	        /**
			 *  the rolloff value of the filter
			 *  @type {number}
			 *  @private
			 */
	        this._rolloff = options.rolloff;
	        //set the rolloff;
	        this.rolloff = options.rolloff;
	        this._readOnly([
	            'detune',
	            'frequency',
	            'gain',
	            'Q'
	        ]);
	    };
	    Tone.extend(Tone.Filter, Tone.AudioNode);
	    /**
		 *  the default parameters
		 *
		 *  @static
		 *  @type {Object}
		 */
	    Tone.Filter.defaults = {
	        'type': 'lowpass',
	        'frequency': 350,
	        'rolloff': -12,
	        'Q': 1,
	        'gain': 0
	    };
	    /**
		 * The type of the filter. Types: "lowpass", "highpass",
		 * "bandpass", "lowshelf", "highshelf", "notch", "allpass", or "peaking".
		 * @memberOf Tone.Filter#
		 * @type {string}
		 * @name type
		 */
	    Object.defineProperty(Tone.Filter.prototype, 'type', {
	        get: function () {
	            return this._type;
	        },
	        set: function (type) {
	            var types = [
	                'lowpass',
	                'highpass',
	                'bandpass',
	                'lowshelf',
	                'highshelf',
	                'notch',
	                'allpass',
	                'peaking'
	            ];
	            if (types.indexOf(type) === -1) {
	                throw new TypeError('Tone.Filter: invalid type ' + type);
	            }
	            this._type = type;
	            for (var i = 0; i < this._filters.length; i++) {
	                this._filters[i].type = type;
	            }
	        }
	    });
	    /**
		 * The rolloff of the filter which is the drop in db
		 * per octave. Implemented internally by cascading filters.
		 * Only accepts the values -12, -24, -48 and -96.
		 * @memberOf Tone.Filter#
		 * @type {number}
		 * @name rolloff
		 */
	    Object.defineProperty(Tone.Filter.prototype, 'rolloff', {
	        get: function () {
	            return this._rolloff;
	        },
	        set: function (rolloff) {
	            rolloff = parseInt(rolloff, 10);
	            var possibilities = [
	                -12,
	                -24,
	                -48,
	                -96
	            ];
	            var cascadingCount = possibilities.indexOf(rolloff);
	            //check the rolloff is valid
	            if (cascadingCount === -1) {
	                throw new RangeError('Tone.Filter: rolloff can only be -12, -24, -48 or -96');
	            }
	            cascadingCount += 1;
	            this._rolloff = rolloff;
	            //first disconnect the filters and throw them away
	            this.input.disconnect();
	            for (var i = 0; i < this._filters.length; i++) {
	                this._filters[i].disconnect();
	                this._filters[i] = null;
	            }
	            this._filters = new Array(cascadingCount);
	            for (var count = 0; count < cascadingCount; count++) {
	                var filter = this.context.createBiquadFilter();
	                filter.type = this._type;
	                this.frequency.connect(filter.frequency);
	                this.detune.connect(filter.detune);
	                this.Q.connect(filter.Q);
	                this.gain.connect(filter.gain);
	                this._filters[count] = filter;
	            }
	            //connect them up
	            var connectionChain = [this.input].concat(this._filters).concat([this.output]);
	            Tone.connectSeries.apply(Tone, connectionChain);
	        }
	    });
	    /**
		 *  Clean up.
		 *  @return {Tone.Filter} this
		 */
	    Tone.Filter.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        for (var i = 0; i < this._filters.length; i++) {
	            this._filters[i].disconnect();
	            this._filters[i] = null;
	        }
	        this._filters = null;
	        this._writable([
	            'detune',
	            'frequency',
	            'gain',
	            'Q'
	        ]);
	        this.frequency.dispose();
	        this.Q.dispose();
	        this.frequency = null;
	        this.Q = null;
	        this.detune.dispose();
	        this.detune = null;
	        this.gain.dispose();
	        this.gain = null;
	        return this;
	    };
	    return Tone.Filter;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Split the incoming signal into three bands (low, mid, high)
		 *         with two crossover frequency controls.
		 *
		 *  @extends {Tone.AudioNode}
		 *  @constructor
		 *  @param {Frequency|Object} [lowFrequency] the low/mid crossover frequency
		 *  @param {Frequency} [highFrequency] the mid/high crossover frequency
		 */
	    Tone.MultibandSplit = function () {
	        var options = Tone.defaults(arguments, [
	            'lowFrequency',
	            'highFrequency'
	        ], Tone.MultibandSplit);
	        Tone.AudioNode.call(this);
	        /**
			 *  the input
			 *  @type {Tone.Gain}
			 *  @private
			 */
	        this.input = new Tone.Gain();
	        /**
			 *  the outputs
			 *  @type {Array}
			 *  @private
			 */
	        this.output = new Array(3);
	        /**
			 *  The low band. Alias for <code>output[0]</code>
			 *  @type {Tone.Filter}
			 */
	        this.low = this.output[0] = new Tone.Filter(0, 'lowpass');
	        /**
			 *  the lower filter of the mid band
			 *  @type {Tone.Filter}
			 *  @private
			 */
	        this._lowMidFilter = new Tone.Filter(0, 'highpass');
	        /**
			 *  The mid band output. Alias for <code>output[1]</code>
			 *  @type {Tone.Filter}
			 */
	        this.mid = this.output[1] = new Tone.Filter(0, 'lowpass');
	        /**
			 *  The high band output. Alias for <code>output[2]</code>
			 *  @type {Tone.Filter}
			 */
	        this.high = this.output[2] = new Tone.Filter(0, 'highpass');
	        /**
			 *  The low/mid crossover frequency.
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.lowFrequency = new Tone.Signal(options.lowFrequency, Tone.Type.Frequency);
	        /**
			 *  The mid/high crossover frequency.
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.highFrequency = new Tone.Signal(options.highFrequency, Tone.Type.Frequency);
	        /**
			 *  The quality of all the filters
			 *  @type {Number}
			 *  @signal
			 */
	        this.Q = new Tone.Signal(options.Q);
	        this.input.fan(this.low, this.high);
	        this.input.chain(this._lowMidFilter, this.mid);
	        //the frequency control signal
	        this.lowFrequency.connect(this.low.frequency);
	        this.lowFrequency.connect(this._lowMidFilter.frequency);
	        this.highFrequency.connect(this.mid.frequency);
	        this.highFrequency.connect(this.high.frequency);
	        //the Q value
	        this.Q.connect(this.low.Q);
	        this.Q.connect(this._lowMidFilter.Q);
	        this.Q.connect(this.mid.Q);
	        this.Q.connect(this.high.Q);
	        this._readOnly([
	            'high',
	            'mid',
	            'low',
	            'highFrequency',
	            'lowFrequency'
	        ]);
	    };
	    Tone.extend(Tone.MultibandSplit, Tone.AudioNode);
	    /**
		 *  @private
		 *  @static
		 *  @type {Object}
		 */
	    Tone.MultibandSplit.defaults = {
	        'lowFrequency': 400,
	        'highFrequency': 2500,
	        'Q': 1
	    };
	    /**
		 *  Clean up.
		 *  @returns {Tone.MultibandSplit} this
		 */
	    Tone.MultibandSplit.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._writable([
	            'high',
	            'mid',
	            'low',
	            'highFrequency',
	            'lowFrequency'
	        ]);
	        this.low.dispose();
	        this.low = null;
	        this._lowMidFilter.dispose();
	        this._lowMidFilter = null;
	        this.mid.dispose();
	        this.mid = null;
	        this.high.dispose();
	        this.high = null;
	        this.lowFrequency.dispose();
	        this.lowFrequency = null;
	        this.highFrequency.dispose();
	        this.highFrequency = null;
	        this.Q.dispose();
	        this.Q = null;
	        return this;
	    };
	    return Tone.MultibandSplit;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.EQ3 is a three band EQ with control over low, mid, and high gain as
		 *         well as the low and high crossover frequencies.
		 *
		 *  @constructor
		 *  @extends {Tone.AudioNode}
		 *
		 *  @param {Decibels|Object} [lowLevel] The gain applied to the lows.
		 *  @param {Decibels} [midLevel] The gain applied to the mid.
		 *  @param {Decibels} [highLevel] The gain applied to the high.
		 *  @example
		 * var eq = new Tone.EQ3(-10, 3, -20);
		 */
	    Tone.EQ3 = function () {
	        var options = Tone.defaults(arguments, [
	            'low',
	            'mid',
	            'high'
	        ], Tone.EQ3);
	        Tone.AudioNode.call(this);
	        /**
			 *  the output node
			 *  @type {GainNode}
			 *  @private
			 */
	        this.output = new Tone.Gain();
	        /**
			 *  the multiband split
			 *  @type {Tone.MultibandSplit}
			 *  @private
			 */
	        this._multibandSplit = this.input = new Tone.MultibandSplit({
	            'lowFrequency': options.lowFrequency,
	            'highFrequency': options.highFrequency
	        });
	        /**
			 *  The gain for the lower signals
			 *  @type  {Tone.Gain}
			 *  @private
			 */
	        this._lowGain = new Tone.Gain(options.low, Tone.Type.Decibels);
	        /**
			 *  The gain for the mid signals
			 *  @type  {Tone.Gain}
			 *  @private
			 */
	        this._midGain = new Tone.Gain(options.mid, Tone.Type.Decibels);
	        /**
			 * The gain in decibels of the high part
			 * @type {Tone.Gain}
			 * @private
			 */
	        this._highGain = new Tone.Gain(options.high, Tone.Type.Decibels);
	        /**
			 * The gain in decibels of the low part
			 * @type {Decibels}
			 * @signal
			 */
	        this.low = this._lowGain.gain;
	        /**
			 * The gain in decibels of the mid part
			 * @type {Decibels}
			 * @signal
			 */
	        this.mid = this._midGain.gain;
	        /**
			 * The gain in decibels of the high part
			 * @type {Decibels}
			 * @signal
			 */
	        this.high = this._highGain.gain;
	        /**
			 *  The Q value for all of the filters.
			 *  @type {Positive}
			 *  @signal
			 */
	        this.Q = this._multibandSplit.Q;
	        /**
			 *  The low/mid crossover frequency.
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.lowFrequency = this._multibandSplit.lowFrequency;
	        /**
			 *  The mid/high crossover frequency.
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.highFrequency = this._multibandSplit.highFrequency;
	        //the frequency bands
	        this._multibandSplit.low.chain(this._lowGain, this.output);
	        this._multibandSplit.mid.chain(this._midGain, this.output);
	        this._multibandSplit.high.chain(this._highGain, this.output);
	        this._readOnly([
	            'low',
	            'mid',
	            'high',
	            'lowFrequency',
	            'highFrequency'
	        ]);
	    };
	    Tone.extend(Tone.EQ3, Tone.AudioNode);
	    /**
		 *  the default values
		 */
	    Tone.EQ3.defaults = {
	        'low': 0,
	        'mid': 0,
	        'high': 0,
	        'lowFrequency': 400,
	        'highFrequency': 2500
	    };
	    /**
		 *  clean up
		 *  @returns {Tone.EQ3} this
		 */
	    Tone.EQ3.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._writable([
	            'low',
	            'mid',
	            'high',
	            'lowFrequency',
	            'highFrequency'
	        ]);
	        this._multibandSplit.dispose();
	        this._multibandSplit = null;
	        this.lowFrequency = null;
	        this.highFrequency = null;
	        this._lowGain.dispose();
	        this._lowGain = null;
	        this._midGain.dispose();
	        this._midGain = null;
	        this._highGain.dispose();
	        this._highGain = null;
	        this.low = null;
	        this.mid = null;
	        this.high = null;
	        this.Q = null;
	        return this;
	    };
	    return Tone.EQ3;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Performs a linear scaling on an input signal.
		 *          Scales a NormalRange input to between
		 *          outputMin and outputMax.
		 *
		 *  @constructor
		 *  @extends {Tone.SignalBase}
		 *  @param {number} [outputMin=0] The output value when the input is 0. 
		 *  @param {number} [outputMax=1]	The output value when the input is 1. 
		 *  @example
		 * var scale = new Tone.Scale(50, 100);
		 * var signal = new Tone.Signal(0.5).connect(scale);
		 * //the output of scale equals 75
		 */
	    Tone.Scale = function (outputMin, outputMax) {
	        Tone.SignalBase.call(this);
	        /** 
			 *  @private
			 *  @type {number}
			 */
	        this._outputMin = Tone.defaultArg(outputMin, 0);
	        /** 
			 *  @private
			 *  @type {number}
			 */
	        this._outputMax = Tone.defaultArg(outputMax, 1);
	        /** 
			 *  @private
			 *  @type {Tone.Multiply}
			 *  @private
			 */
	        this._scale = this.input = new Tone.Multiply(1);
	        /** 
			 *  @private
			 *  @type {Tone.Add}
			 *  @private
			 */
	        this._add = this.output = new Tone.Add(0);
	        this._scale.connect(this._add);
	        this._setRange();
	    };
	    Tone.extend(Tone.Scale, Tone.SignalBase);
	    /**
		 * The minimum output value. This number is output when 
		 * the value input value is 0. 
		 * @memberOf Tone.Scale#
		 * @type {number}
		 * @name min
		 */
	    Object.defineProperty(Tone.Scale.prototype, 'min', {
	        get: function () {
	            return this._outputMin;
	        },
	        set: function (min) {
	            this._outputMin = min;
	            this._setRange();
	        }
	    });
	    /**
		 * The maximum output value. This number is output when 
		 * the value input value is 1. 
		 * @memberOf Tone.Scale#
		 * @type {number}
		 * @name max
		 */
	    Object.defineProperty(Tone.Scale.prototype, 'max', {
	        get: function () {
	            return this._outputMax;
	        },
	        set: function (max) {
	            this._outputMax = max;
	            this._setRange();
	        }
	    });
	    /**
		 *  set the values
		 *  @private
		 */
	    Tone.Scale.prototype._setRange = function () {
	        this._add.value = this._outputMin;
	        this._scale.value = this._outputMax - this._outputMin;
	    };
	    /**
		 *  Clean up.
		 *  @returns {Tone.Scale} this
		 */
	    Tone.Scale.prototype.dispose = function () {
	        Tone.SignalBase.prototype.dispose.call(this);
	        this._add.dispose();
	        this._add = null;
	        this._scale.dispose();
	        this._scale = null;
	        return this;
	    };
	    return Tone.Scale;
	});
	Module(function (Tone) {
	    /**
		 *  @class  Performs an exponential scaling on an input signal.
		 *          Scales a NormalRange value [0,1] exponentially
		 *          to the output range of outputMin to outputMax.
		 *
		 *  @constructor
		 *  @extends {Tone.SignalBase}
		 *  @param {number} [outputMin=0] The output value when the input is 0. 
		 *  @param {number} [outputMax=1]	The output value when the input is 1. 
		 *  @param {number} [exponent=2] The exponent which scales the incoming signal.
		 *  @example
		 * var scaleExp = new Tone.ScaleExp(0, 100, 2);
		 * var signal = new Tone.Signal(0.5).connect(scaleExp);
		 */
	    Tone.ScaleExp = function (outputMin, outputMax, exponent) {
	        Tone.SignalBase.call(this);
	        /**
			 *  scale the input to the output range
			 *  @type {Tone.Scale}
			 *  @private
			 */
	        this._scale = this.output = new Tone.Scale(outputMin, outputMax);
	        /**
			 *  @private
			 *  @type {Tone.Pow}
			 *  @private
			 */
	        this._exp = this.input = new Tone.Pow(Tone.defaultArg(exponent, 2));
	        this._exp.connect(this._scale);
	    };
	    Tone.extend(Tone.ScaleExp, Tone.SignalBase);
	    /**
		 * Instead of interpolating linearly between the <code>min</code> and 
		 * <code>max</code> values, setting the exponent will interpolate between
		 * the two values with an exponential curve. 
		 * @memberOf Tone.ScaleExp#
		 * @type {number}
		 * @name exponent
		 */
	    Object.defineProperty(Tone.ScaleExp.prototype, 'exponent', {
	        get: function () {
	            return this._exp.value;
	        },
	        set: function (exp) {
	            this._exp.value = exp;
	        }
	    });
	    /**
		 * The minimum output value. This number is output when 
		 * the value input value is 0. 
		 * @memberOf Tone.ScaleExp#
		 * @type {number}
		 * @name min
		 */
	    Object.defineProperty(Tone.ScaleExp.prototype, 'min', {
	        get: function () {
	            return this._scale.min;
	        },
	        set: function (min) {
	            this._scale.min = min;
	        }
	    });
	    /**
		 * The maximum output value. This number is output when 
		 * the value input value is 1. 
		 * @memberOf Tone.ScaleExp#
		 * @type {number}
		 * @name max
		 */
	    Object.defineProperty(Tone.ScaleExp.prototype, 'max', {
	        get: function () {
	            return this._scale.max;
	        },
	        set: function (max) {
	            this._scale.max = max;
	        }
	    });
	    /**
		 *  Clean up.
		 *  @returns {Tone.ScaleExp} this
		 */
	    Tone.ScaleExp.prototype.dispose = function () {
	        Tone.SignalBase.prototype.dispose.call(this);
	        this._scale.dispose();
	        this._scale = null;
	        this._exp.dispose();
	        this._exp = null;
	        return this;
	    };
	    return Tone.ScaleExp;
	});
	Module(function (Tone) {
	    
	    /**
		 *  createDelay shim
		 *  @private
		 */
	    if (window.DelayNode && !AudioContext.prototype.createDelay) {
	        AudioContext.prototype.createDelay = AudioContext.prototype.createDelayNode;
	    }
	    /**
		 *  @class Wrapper around Web Audio's native [DelayNode](http://webaudio.github.io/web-audio-api/#the-delaynode-interface).
		 *  @extends {Tone}
		 *  @param {Time=} delayTime The delay applied to the incoming signal.
		 *  @param {Time=} maxDelay The maximum delay time.
		 */
	    Tone.Delay = function () {
	        var options = Tone.defaults(arguments, [
	            'delayTime',
	            'maxDelay'
	        ], Tone.Delay);
	        Tone.AudioNode.call(this);
	        /**
			 *  The native delay node
			 *  @type {DelayNode}
			 *  @private
			 */
	        this._delayNode = this.input = this.output = this.context.createDelay(this.toSeconds(options.maxDelay));
	        /**
			 *  The amount of time the incoming signal is
			 *  delayed.
			 *  @type {Time}
			 *  @signal
			 */
	        this.delayTime = new Tone.Param({
	            'param': this._delayNode.delayTime,
	            'units': Tone.Type.Time,
	            'value': options.delayTime
	        });
	        this._readOnly('delayTime');
	    };
	    Tone.extend(Tone.Delay, Tone.AudioNode);
	    /**
		 *  The defaults
		 *  @const
		 *  @type  {Object}
		 */
	    Tone.Delay.defaults = {
	        'maxDelay': 1,
	        'delayTime': 0
	    };
	    /**
		 *  Clean up.
		 *  @return  {Tone.Delay}  this
		 */
	    Tone.Delay.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._delayNode.disconnect();
	        this._delayNode = null;
	        this._writable('delayTime');
	        this.delayTime = null;
	        return this;
	    };
	    return Tone.Delay;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Comb filters are basic building blocks for physical modeling. Read more
		 *         about comb filters on [CCRMA's website](https://ccrma.stanford.edu/~jos/pasp/Feedback_Comb_Filters.html).
		 *
		 *  @extends {Tone.AudioNode}
		 *  @constructor
		 *  @param {Time|Object} [delayTime] The delay time of the filter.
		 *  @param {NormalRange=} resonance The amount of feedback the filter has.
		 */
	    Tone.FeedbackCombFilter = function () {
	        var options = Tone.defaults(arguments, [
	            'delayTime',
	            'resonance'
	        ], Tone.FeedbackCombFilter);
	        Tone.AudioNode.call(this);
	        /**
			 *  the delay node
			 *  @type {DelayNode}
			 *  @private
			 */
	        this._delay = this.input = this.output = new Tone.Delay(options.delayTime);
	        /**
			 *  The amount of delay of the comb filter.
			 *  @type {Time}
			 *  @signal
			 */
	        this.delayTime = this._delay.delayTime;
	        /**
			 *  the feedback node
			 *  @type {GainNode}
			 *  @private
			 */
	        this._feedback = new Tone.Gain(options.resonance, Tone.Type.NormalRange);
	        /**
			 *  The amount of feedback of the delayed signal.
			 *  @type {NormalRange}
			 *  @signal
			 */
	        this.resonance = this._feedback.gain;
	        this._delay.chain(this._feedback, this._delay);
	        this._readOnly([
	            'resonance',
	            'delayTime'
	        ]);
	    };
	    Tone.extend(Tone.FeedbackCombFilter, Tone.AudioNode);
	    /**
		 *  the default parameters
		 *  @static
		 *  @const
		 *  @type {Object}
		 */
	    Tone.FeedbackCombFilter.defaults = {
	        'delayTime': 0.1,
	        'resonance': 0.5
	    };
	    /**
		 *  clean up
		 *  @returns {Tone.FeedbackCombFilter} this
		 */
	    Tone.FeedbackCombFilter.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._writable([
	            'resonance',
	            'delayTime'
	        ]);
	        this._delay.dispose();
	        this._delay = null;
	        this.delayTime = null;
	        this._feedback.dispose();
	        this._feedback = null;
	        this.resonance = null;
	        return this;
	    };
	    return Tone.FeedbackCombFilter;
	});
	Module(function (Tone) {
	    /**
		 *  @class  Get the current waveform data of the connected audio source.
		 *  @extends {Tone.AudioNode}
		 *  @param {Number=} size The size of the FFT. Value must be a power of
		 *                       two in the range 32 to 32768.
		 */
	    Tone.FFT = function () {
	        var options = Tone.defaults(arguments, ['size'], Tone.FFT);
	        options.type = Tone.Analyser.Type.FFT;
	        Tone.AudioNode.call(this);
	        /**
			 *  The analyser node.
			 *  @private
			 *  @type {Tone.Analyser}
			 */
	        this._analyser = this.input = this.output = new Tone.Analyser(options);
	    };
	    Tone.extend(Tone.FFT, Tone.AudioNode);
	    /**
		 *  The default values.
		 *  @type {Object}
		 *  @const
		 */
	    Tone.FFT.defaults = { 'size': 1024 };
	    /**
		 *  Gets the waveform of the audio source. Returns the waveform data
		 *  of length [size](#size) as a Float32Array with values between -1 and 1.
		 *  @returns {TypedArray}
		 */
	    Tone.FFT.prototype.getValue = function () {
	        return this._analyser.getValue();
	    };
	    /**
		 *  The size of analysis. This must be a power of two in the range 32 to 32768.
		 *  @memberOf Tone.FFT#
		 *  @type {Number}
		 *  @name size
		 */
	    Object.defineProperty(Tone.FFT.prototype, 'size', {
	        get: function () {
	            return this._analyser.size;
	        },
	        set: function (size) {
	            this._analyser.size = size;
	        }
	    });
	    /**
		 *  Clean up.
		 *  @return  {Tone.FFT}  this
		 */
	    Tone.FFT.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._analyser.dispose();
	        this._analyser = null;
	    };
	    return Tone.FFT;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Tone.Follower is a  crude envelope follower which will follow
		 *          the amplitude of an incoming signal.
		 *          Take care with small (< 0.02) attack or decay values
		 *          as follower has some ripple which is exaggerated
		 *          at these values. Read more about envelope followers (also known
		 *          as envelope detectors) on [Wikipedia](https://en.wikipedia.org/wiki/Envelope_detector).
		 *
		 *  @constructor
		 *  @extends {Tone.AudioNode}
		 *  @param {Time|Object} [attack] The rate at which the follower rises.
		 *  @param {Time=} release The rate at which the folower falls.
		 *  @example
		 * var follower = new Tone.Follower(0.2, 0.4);
		 */
	    Tone.Follower = function () {
	        var options = Tone.defaults(arguments, [
	            'attack',
	            'release'
	        ], Tone.Follower);
	        Tone.AudioNode.call(this);
	        this.createInsOuts(1, 1);
	        /**
			 *  @type {Tone.Abs}
			 *  @private
			 */
	        this._abs = new Tone.Abs();
	        /**
			 *  the lowpass filter which smooths the input
			 *  @type {BiquadFilterNode}
			 *  @private
			 */
	        this._filter = this.context.createBiquadFilter();
	        this._filter.type = 'lowpass';
	        this._filter.frequency.value = 0;
	        this._filter.Q.value = -100;
	        /**
			 *  @type {WaveShaperNode}
			 *  @private
			 */
	        this._frequencyValues = new Tone.WaveShaper();
	        /**
			 *  @type {Tone.Subtract}
			 *  @private
			 */
	        this._sub = new Tone.Subtract();
	        /**
			 *  @type {Tone.Delay}
			 *  @private
			 */
	        this._delay = new Tone.Delay(this.blockTime);
	        /**
			 *  this keeps it far from 0, even for very small differences
			 *  @type {Tone.Multiply}
			 *  @private
			 */
	        this._mult = new Tone.Multiply(10000);
	        /**
			 *  @private
			 *  @type {number}
			 */
	        this._attack = options.attack;
	        /**
			 *  @private
			 *  @type {number}
			 */
	        this._release = options.release;
	        //the smoothed signal to get the values
	        this.input.chain(this._abs, this._filter, this.output);
	        //the difference path
	        this._abs.connect(this._sub, 0, 1);
	        this._filter.chain(this._delay, this._sub);
	        //threshold the difference and use the thresh to set the frequency
	        this._sub.chain(this._mult, this._frequencyValues, this._filter.frequency);
	        //set the attack and release values in the table
	        this._setAttackRelease(this._attack, this._release);
	    };
	    Tone.extend(Tone.Follower, Tone.AudioNode);
	    /**
		 *  @static
		 *  @type {Object}
		 */
	    Tone.Follower.defaults = {
	        'attack': 0.05,
	        'release': 0.5
	    };
	    /**
		 *  sets the attack and release times in the wave shaper
		 *  @param   {Time} attack
		 *  @param   {Time} release
		 *  @private
		 */
	    Tone.Follower.prototype._setAttackRelease = function (attack, release) {
	        var minTime = this.blockTime;
	        attack = Tone.Time(attack).toFrequency();
	        release = Tone.Time(release).toFrequency();
	        attack = Math.max(attack, minTime);
	        release = Math.max(release, minTime);
	        this._frequencyValues.setMap(function (val) {
	            if (val <= 0) {
	                return attack;
	            } else {
	                return release;
	            }
	        });
	    };
	    /**
		 * The attack time.
		 * @memberOf Tone.Follower#
		 * @type {Time}
		 * @name attack
		 */
	    Object.defineProperty(Tone.Follower.prototype, 'attack', {
	        get: function () {
	            return this._attack;
	        },
	        set: function (attack) {
	            this._attack = attack;
	            this._setAttackRelease(this._attack, this._release);
	        }
	    });
	    /**
		 * The release time.
		 * @memberOf Tone.Follower#
		 * @type {Time}
		 * @name release
		 */
	    Object.defineProperty(Tone.Follower.prototype, 'release', {
	        get: function () {
	            return this._release;
	        },
	        set: function (release) {
	            this._release = release;
	            this._setAttackRelease(this._attack, this._release);
	        }
	    });
	    /**
		 *  Borrows the connect method from Signal so that the output can be used
		 *  as a Tone.Signal control signal.
		 *  @function
		 */
	    Tone.Follower.prototype.connect = Tone.Signal.prototype.connect;
	    /**
		 *  dispose
		 *  @returns {Tone.Follower} this
		 */
	    Tone.Follower.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._filter.disconnect();
	        this._filter = null;
	        this._frequencyValues.disconnect();
	        this._frequencyValues = null;
	        this._delay.dispose();
	        this._delay = null;
	        this._sub.disconnect();
	        this._sub = null;
	        this._abs.dispose();
	        this._abs = null;
	        this._mult.dispose();
	        this._mult = null;
	        this._curve = null;
	        return this;
	    };
	    return Tone.Follower;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.ScaledEnvelop is an envelope which can be scaled 
		 *         to any range. It's useful for applying an envelope 
		 *         to a frequency or any other non-NormalRange signal 
		 *         parameter. 
		 *
		 *  @extends {Tone.Envelope}
		 *  @constructor
		 *  @param {Time|Object} [attack]	the attack time in seconds
		 *  @param {Time} [decay]	the decay time in seconds
		 *  @param {number} [sustain] 	a percentage (0-1) of the full amplitude
		 *  @param {Time} [release]	the release time in seconds
		 *  @example
		 *  var scaledEnv = new Tone.ScaledEnvelope({
		 *  	"attack" : 0.2,
		 *  	"min" : 200,
		 *  	"max" : 2000
		 *  });
		 *  scaledEnv.connect(oscillator.frequency);
		 */
	    Tone.ScaledEnvelope = function () {
	        //get all of the defaults
	        var options = Tone.defaults(arguments, [
	            'attack',
	            'decay',
	            'sustain',
	            'release'
	        ], Tone.Envelope);
	        Tone.Envelope.call(this, options);
	        options = Tone.defaultArg(options, Tone.ScaledEnvelope.defaults);
	        /** 
			 *  scale the incoming signal by an exponent
			 *  @type {Tone.Pow}
			 *  @private
			 */
	        this._exp = this.output = new Tone.Pow(options.exponent);
	        /**
			 *  scale the signal to the desired range
			 *  @type {Tone.Multiply}
			 *  @private
			 */
	        this._scale = this.output = new Tone.Scale(options.min, options.max);
	        this._sig.chain(this._exp, this._scale);
	    };
	    Tone.extend(Tone.ScaledEnvelope, Tone.Envelope);
	    /**
		 *  the default parameters
		 *  @static
		 */
	    Tone.ScaledEnvelope.defaults = {
	        'min': 0,
	        'max': 1,
	        'exponent': 1
	    };
	    /**
		 * The envelope's min output value. This is the value which it
		 * starts at. 
		 * @memberOf Tone.ScaledEnvelope#
		 * @type {number}
		 * @name min
		 */
	    Object.defineProperty(Tone.ScaledEnvelope.prototype, 'min', {
	        get: function () {
	            return this._scale.min;
	        },
	        set: function (min) {
	            this._scale.min = min;
	        }
	    });
	    /**
		 * The envelope's max output value. In other words, the value
		 * at the peak of the attack portion of the envelope. 
		 * @memberOf Tone.ScaledEnvelope#
		 * @type {number}
		 * @name max
		 */
	    Object.defineProperty(Tone.ScaledEnvelope.prototype, 'max', {
	        get: function () {
	            return this._scale.max;
	        },
	        set: function (max) {
	            this._scale.max = max;
	        }
	    });
	    /**
		 * The envelope's exponent value. 
		 * @memberOf Tone.ScaledEnvelope#
		 * @type {number}
		 * @name exponent
		 */
	    Object.defineProperty(Tone.ScaledEnvelope.prototype, 'exponent', {
	        get: function () {
	            return this._exp.value;
	        },
	        set: function (exp) {
	            this._exp.value = exp;
	        }
	    });
	    /**
		 *  clean up
		 *  @returns {Tone.ScaledEnvelope} this
		 */
	    Tone.ScaledEnvelope.prototype.dispose = function () {
	        Tone.Envelope.prototype.dispose.call(this);
	        this._scale.dispose();
	        this._scale = null;
	        this._exp.dispose();
	        this._exp = null;
	        return this;
	    };
	    return Tone.ScaledEnvelope;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.FrequencyEnvelope is a Tone.ScaledEnvelope, but instead of `min` and `max`
		 *         it's got a `baseFrequency` and `octaves` parameter. 
		 *
		 *  @extends {Tone.Envelope}
		 *  @constructor
		 *  @param {Time|Object} [attack]	the attack time in seconds
		 *  @param {Time} [decay]	the decay time in seconds
		 *  @param {number} [sustain] 	a percentage (0-1) of the full amplitude
		 *  @param {Time} [release]	the release time in seconds
		 *  @example
		 *  var env = new Tone.FrequencyEnvelope({
		 *  	"attack" : 0.2,
		 *  	"baseFrequency" : "C2",
		 *  	"octaves" : 4
		 *  });
		 *  scaledEnv.connect(oscillator.frequency);
		 */
	    Tone.FrequencyEnvelope = function () {
	        var options = Tone.defaults(arguments, [
	            'attack',
	            'decay',
	            'sustain',
	            'release'
	        ], Tone.Envelope);
	        Tone.ScaledEnvelope.call(this, options);
	        //merge it with the frequency envelope defaults
	        options = Tone.defaultArg(options, Tone.FrequencyEnvelope.defaults);
	        /**
			 *  Stores the octave value
			 *  @type {Positive}
			 *  @private
			 */
	        this._octaves = options.octaves;
	        //setup
	        this.baseFrequency = options.baseFrequency;
	        this.octaves = options.octaves;
	    };
	    Tone.extend(Tone.FrequencyEnvelope, Tone.Envelope);
	    /**
		 *  the default parameters
		 *  @static
		 */
	    Tone.FrequencyEnvelope.defaults = {
	        'baseFrequency': 200,
	        'octaves': 4,
	        'exponent': 2
	    };
	    /**
		 * The envelope's mininum output value. This is the value which it
		 * starts at. 
		 * @memberOf Tone.FrequencyEnvelope#
		 * @type {Frequency}
		 * @name baseFrequency
		 */
	    Object.defineProperty(Tone.FrequencyEnvelope.prototype, 'baseFrequency', {
	        get: function () {
	            return this._scale.min;
	        },
	        set: function (min) {
	            this._scale.min = this.toFrequency(min);
	            //also update the octaves
	            this.octaves = this._octaves;
	        }
	    });
	    /**
		 * The number of octaves above the baseFrequency that the
		 * envelope will scale to.
		 * @memberOf Tone.FrequencyEnvelope#
		 * @type {Positive}
		 * @name octaves
		 */
	    Object.defineProperty(Tone.FrequencyEnvelope.prototype, 'octaves', {
	        get: function () {
	            return this._octaves;
	        },
	        set: function (octaves) {
	            this._octaves = octaves;
	            this._scale.max = this.baseFrequency * Math.pow(2, octaves);
	        }
	    });
	    /**
		 * The envelope's exponent value. 
		 * @memberOf Tone.FrequencyEnvelope#
		 * @type {number}
		 * @name exponent
		 */
	    Object.defineProperty(Tone.FrequencyEnvelope.prototype, 'exponent', {
	        get: function () {
	            return this._exp.value;
	        },
	        set: function (exp) {
	            this._exp.value = exp;
	        }
	    });
	    /**
		 *  clean up
		 *  @returns {Tone.FrequencyEnvelope} this
		 */
	    Tone.FrequencyEnvelope.prototype.dispose = function () {
	        Tone.ScaledEnvelope.prototype.dispose.call(this);
	        return this;
	    };
	    return Tone.FrequencyEnvelope;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Tone.Gate only passes a signal through when the incoming
		 *          signal exceeds a specified threshold. To do this, Gate uses
		 *          a Tone.Follower to follow the amplitude of the incoming signal.
		 *          A common implementation of this class is a [Noise Gate](https://en.wikipedia.org/wiki/Noise_gate).
		 *
		 *  @constructor
		 *  @extends {Tone.AudioNode}
		 *  @param {Decibels|Object} [threshold] The threshold above which the gate will open.
		 *  @param {Time=} attack The follower's attack time
		 *  @param {Time=} release The follower's release time
		 *  @example
		 * var gate = new Tone.Gate(-30, 0.2, 0.3).toMaster();
		 * var mic = new Tone.UserMedia().connect(gate);
		 * //the gate will only pass through the incoming
		 * //signal when it's louder than -30db
		 */
	    Tone.Gate = function () {
	        var options = Tone.defaults(arguments, [
	            'threshold',
	            'attack',
	            'release'
	        ], Tone.Gate);
	        Tone.AudioNode.call(this);
	        this.createInsOuts(1, 1);
	        /**
			 *  @type {Tone.Follower}
			 *  @private
			 */
	        this._follower = new Tone.Follower(options.attack, options.release);
	        /**
			 *  @type {Tone.GreaterThan}
			 *  @private
			 */
	        this._gt = new Tone.GreaterThan(Tone.dbToGain(options.threshold));
	        //the connections
	        this.input.connect(this.output);
	        //the control signal
	        this.input.chain(this._gt, this._follower, this.output.gain);
	    };
	    Tone.extend(Tone.Gate, Tone.AudioNode);
	    /**
		 *  @const
		 *  @static
		 *  @type {Object}
		 */
	    Tone.Gate.defaults = {
	        'attack': 0.1,
	        'release': 0.1,
	        'threshold': -40
	    };
	    /**
		 * The threshold of the gate in decibels
		 * @memberOf Tone.Gate#
		 * @type {Decibels}
		 * @name threshold
		 */
	    Object.defineProperty(Tone.Gate.prototype, 'threshold', {
	        get: function () {
	            return Tone.gainToDb(this._gt.value);
	        },
	        set: function (thresh) {
	            this._gt.value = Tone.dbToGain(thresh);
	        }
	    });
	    /**
		 * The attack speed of the gate
		 * @memberOf Tone.Gate#
		 * @type {Time}
		 * @name attack
		 */
	    Object.defineProperty(Tone.Gate.prototype, 'attack', {
	        get: function () {
	            return this._follower.attack;
	        },
	        set: function (attackTime) {
	            this._follower.attack = attackTime;
	        }
	    });
	    /**
		 * The release speed of the gate
		 * @memberOf Tone.Gate#
		 * @type {Time}
		 * @name release
		 */
	    Object.defineProperty(Tone.Gate.prototype, 'release', {
	        get: function () {
	            return this._follower.release;
	        },
	        set: function (releaseTime) {
	            this._follower.release = releaseTime;
	        }
	    });
	    /**
		 *  Clean up.
		 *  @returns {Tone.Gate} this
		 */
	    Tone.Gate.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._follower.dispose();
	        this._gt.dispose();
	        this._follower = null;
	        this._gt = null;
	        return this;
	    };
	    return Tone.Gate;
	});
	Module(function (Tone) {
	    /**
		 * @class Tone.TickSignal extends Tone.TimelineSignal, but adds the capability
		 *        to calculate the number of elapsed ticks. exponential and target curves
		 *        are approximated with multiple linear ramps.
		 *
		 *        Thank you Bruno Dias, H. Sofia Pinto, and David M. Matos, for your [WAC paper](https://smartech.gatech.edu/bitstream/handle/1853/54588/WAC2016-49.pdf)
		 *        describing integrating timing functions for tempo calculations.
		 *
		 * @param {Number} value The initial value of the signal
		 * @extends {Tone.TimelineSignal}
		 */
	    Tone.TickSignal = function (value) {
	        value = Tone.defaultArg(value, 1);
	        Tone.TimelineSignal.call(this, {
	            'units': Tone.Type.Ticks,
	            'value': value
	        });
	        //extend the memory
	        this._events.memory = Infinity;
	    };
	    Tone.extend(Tone.TickSignal, Tone.TimelineSignal);
	    /**
		 * Wraps Tone.TimelineSignal methods so that they also
		 * record the ticks.
		 * @param  {Function} method
		 * @return {Function}
		 * @private
		 */
	    function _wrapScheduleMethods(method) {
	        return function (value, time) {
	            time = this.toSeconds(time);
	            method.apply(this, arguments);
	            var event = this._events.get(time);
	            var previousEvent = this._events.previousEvent(event);
	            var ticksUntilTime = this._getTickUntilEvent(previousEvent, time - this.sampleTime);
	            event.ticks = Math.max(ticksUntilTime, 0);
	            return this;
	        };
	    }
	    Tone.TickSignal.prototype.setValueAtTime = _wrapScheduleMethods(Tone.TimelineSignal.prototype.setValueAtTime);
	    Tone.TickSignal.prototype.linearRampToValueAtTime = _wrapScheduleMethods(Tone.TimelineSignal.prototype.linearRampToValueAtTime);
	    /**
		 *  Start exponentially approaching the target value at the given time with
		 *  a rate having the given time constant.
		 *  @param {number} value
		 *  @param {Time} startTime
		 *  @param {number} timeConstant
		 *  @returns {Tone.TickSignal} this
		 */
	    Tone.TickSignal.prototype.setTargetAtTime = function (value, time, constant) {
	        //aproximate it with multiple linear ramps
	        time = this.toSeconds(time);
	        this.setRampPoint(time);
	        value = this._fromUnits(value);
	        //start from previously scheduled value
	        var prevEvent = this._events.get(time);
	        var segments = 5;
	        for (var i = 0; i <= segments; i++) {
	            var segTime = constant * i + time;
	            var rampVal = this._exponentialApproach(prevEvent.time, prevEvent.value, value, constant, segTime);
	            this.linearRampToValueAtTime(this._toUnits(rampVal), segTime);
	        }
	        return this;
	    };
	    /**
		 *  Schedules an exponential continuous change in parameter value from
		 *  the previous scheduled parameter value to the given value.
		 *  @param  {number} value
		 *  @param  {Time} endTime
		 *  @returns {Tone.TickSignal} this
		 */
	    Tone.TickSignal.prototype.exponentialRampToValueAtTime = function (value, time) {
	        //aproximate it with multiple linear ramps
	        time = this.toSeconds(time);
	        value = this._fromUnits(value);
	        //start from previously scheduled value
	        var prevEvent = this._events.get(time);
	        if (prevEvent === null) {
	            prevEvent = {
	                'value': this._initial,
	                'time': 0
	            };
	        }
	        var segments = 5;
	        var segmentDur = (time - prevEvent.time) / segments;
	        for (var i = 0; i <= segments; i++) {
	            var segTime = segmentDur * i + prevEvent.time;
	            var rampVal = this._exponentialInterpolate(prevEvent.time, prevEvent.value, time, value, segTime);
	            this.linearRampToValueAtTime(this._toUnits(rampVal), segTime);
	        }
	        return this;
	    };
	    /**
		 * Returns the tick value at the time. Takes into account
		 * any automation curves scheduled on the signal.
		 * @private
		 * @param  {Time} time The time to get the tick count at
		 * @return {Ticks}      The number of ticks which have elapsed at the time
		 *                          given any automations.
		 */
	    Tone.TickSignal.prototype._getTickUntilEvent = function (event, time) {
	        if (event === null) {
	            event = {
	                'ticks': 0,
	                'time': 0
	            };
	        }
	        var val0 = this.getValueAtTime(event.time);
	        var val1 = this.getValueAtTime(time);
	        return 0.5 * (time - event.time) * (val0 + val1) + event.ticks;
	    };
	    /**
		 * Returns the tick value at the time. Takes into account
		 * any automation curves scheduled on the signal.
		 * @param  {Time} time The time to get the tick count at
		 * @return {Ticks}      The number of ticks which have elapsed at the time
		 *                          given any automations.
		 */
	    Tone.TickSignal.prototype.getTickAtTime = function (time) {
	        time = this.toSeconds(time);
	        var event = this._events.get(time);
	        return this._getTickUntilEvent(event, time);
	    };
	    /**
		 * Return the elapsed time of the number of ticks from the given time
		 * @param {Ticks} ticks The number of ticks to calculate
		 * @param  {Time} time The time to get the next tick from
		 * @return {Seconds} The duration of the number of ticks from the given time in seconds
		 */
	    Tone.TickSignal.prototype.getDurationOfTicks = function (ticks, time) {
	        time = this.toSeconds(time);
	        var currentTick = this.getTickAtTime(time);
	        return this.getTimeOfTick(currentTick + ticks) - time;
	    };
	    /**
		 * Given a tick, returns the time that tick occurs at.
		 * @param  {Ticks} tick
		 * @return {Time}      The time that the tick occurs.
		 */
	    Tone.TickSignal.prototype.getTimeOfTick = function (tick) {
	        var before = this._events.get(tick, 'ticks');
	        var after = this._events.getAfter(tick, 'ticks');
	        if (before && before.ticks === tick) {
	            return before.time;
	        } else if (before && after && after.type === Tone.TimelineSignal.Type.Linear && before.value !== after.value) {
	            var val0 = this.getValueAtTime(before.time);
	            var val1 = this.getValueAtTime(after.time);
	            var delta = (val1 - val0) / (after.time - before.time);
	            var k = Math.sqrt(Math.pow(val0, 2) - 2 * delta * (before.ticks - tick));
	            var sol1 = (-val0 + k) / delta;
	            var sol2 = (-val0 - k) / delta;
	            return (sol1 > 0 ? sol1 : sol2) + before.time;
	        } else if (before) {
	            if (before.value === 0) {
	                return Infinity;
	            } else {
	                return before.time + (tick - before.ticks) / before.value;
	            }
	        } else {
	            return tick / this._initial;
	        }
	    };
	    return Tone.TickSignal;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  A Timeline State. Provides the methods: <code>setStateAtTime("state", time)</code>
		 *          and <code>getValueAtTime(time)</code>.
		 *
		 *  @extends {Tone.Timeline}
		 *  @param {String} initial The initial state of the TimelineState. 
		 *                          Defaults to <code>undefined</code>
		 */
	    Tone.TimelineState = function (initial) {
	        Tone.Timeline.call(this);
	        /**
			 *  The initial state
			 *  @private
			 *  @type {String}
			 */
	        this._initial = initial;
	    };
	    Tone.extend(Tone.TimelineState, Tone.Timeline);
	    /**
		 *  Returns the scheduled state scheduled before or at
		 *  the given time.
		 *  @param  {Number}  time  The time to query.
		 *  @return  {String}  The name of the state input in setStateAtTime.
		 */
	    Tone.TimelineState.prototype.getValueAtTime = function (time) {
	        var event = this.get(time);
	        if (event !== null) {
	            return event.state;
	        } else {
	            return this._initial;
	        }
	    };
	    /**
		 *  Add a state to the timeline.
		 *  @param  {String}  state The name of the state to set.
		 *  @param  {Number}  time  The time to query.
		 *  @returns {Tone.TimelineState} this
		 */
	    Tone.TimelineState.prototype.setStateAtTime = function (state, time) {
	        this.add({
	            'state': state,
	            'time': time
	        });
	        return this;
	    };
	    return Tone.TimelineState;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  A sample accurate clock which provides a callback at the given rate. 
		 *          While the callback is not sample-accurate (it is still susceptible to
		 *          loose JS timing), the time passed in as the argument to the callback
		 *          is precise. For most applications, it is better to use Tone.Transport
		 *          instead of the Clock by itself since you can synchronize multiple callbacks.
		 *
		 * 	@constructor
		 *  @extends {Tone.Emitter}
		 * 	@param {function} callback The callback to be invoked with the time of the audio event
		 * 	@param {Frequency} frequency The rate of the callback
		 * 	@example
		 * //the callback will be invoked approximately once a second
		 * //and will print the time exactly once a second apart.
		 * var clock = new Tone.Clock(function(time){
		 * 	console.log(time);
		 * }, 1);
		 */
	    Tone.Clock = function () {
	        var options = Tone.defaults(arguments, [
	            'callback',
	            'frequency'
	        ], Tone.Clock);
	        Tone.Emitter.call(this);
	        /**
			 *  The callback function to invoke at the scheduled tick.
			 *  @type  {Function}
			 */
	        this.callback = options.callback;
	        /**
			 *  The next time the callback is scheduled.
			 *  @type {Number}
			 *  @private
			 */
	        this._nextTick = 0;
	        /**
			 *  The last state of the clock.
			 *  @type  {State}
			 *  @private
			 */
	        this._lastState = Tone.State.Stopped;
	        /**
			 *  The rate the callback function should be invoked. 
			 *  @type  {BPM}
			 *  @signal
			 */
	        this.frequency = new Tone.TickSignal(options.frequency, Tone.Type.Frequency);
	        this._readOnly('frequency');
	        /**
			 *  The number of times the callback was invoked. Starts counting at 0
			 *  and increments after the callback was invoked. 
			 *  @type {Ticks}
			 *  @readOnly
			 */
	        this.ticks = 0;
	        /**
			 *  The state timeline
			 *  @type {Tone.TimelineState}
			 *  @private
			 */
	        this._state = new Tone.TimelineState(Tone.State.Stopped);
	        /**
			 *  The loop function bound to its context. 
			 *  This is necessary to remove the event in the end.
			 *  @type {Function}
			 *  @private
			 */
	        this._boundLoop = this._loop.bind(this);
	        //bind a callback to the worker thread
	        this.context.on('tick', this._boundLoop);
	    };
	    Tone.extend(Tone.Clock, Tone.Emitter);
	    /**
		 *  The defaults
		 *  @const
		 *  @type  {Object}
		 */
	    Tone.Clock.defaults = {
	        'callback': Tone.noOp,
	        'frequency': 1
	    };
	    /**
		 *  Returns the playback state of the source, either "started", "stopped" or "paused".
		 *  @type {Tone.State}
		 *  @readOnly
		 *  @memberOf Tone.Clock#
		 *  @name state
		 */
	    Object.defineProperty(Tone.Clock.prototype, 'state', {
	        get: function () {
	            return this._state.getValueAtTime(this.now());
	        }
	    });
	    /**
		 *  Start the clock at the given time. Optionally pass in an offset
		 *  of where to start the tick counter from.
		 *  @param  {Time=}  time    The time the clock should start
		 *  @param  {Ticks=}  offset  Where the tick counter starts counting from.
		 *  @return  {Tone.Clock}  this
		 */
	    Tone.Clock.prototype.start = function (time, offset) {
	        time = this.toSeconds(time);
	        if (this._state.getValueAtTime(time) !== Tone.State.Started) {
	            this._state.setStateAtTime(Tone.State.Started, time);
	            this._state.get(time).offset = offset;
	        }
	        return this;
	    };
	    /**
		 *  Stop the clock. Stopping the clock resets the tick counter to 0.
		 *  @param {Time} [time=now] The time when the clock should stop.
		 *  @returns {Tone.Clock} this
		 *  @example
		 * clock.stop();
		 */
	    Tone.Clock.prototype.stop = function (time) {
	        time = this.toSeconds(time);
	        this._state.cancel(time);
	        this._state.setStateAtTime(Tone.State.Stopped, time);
	        return this;
	    };
	    /**
		 *  Pause the clock. Pausing does not reset the tick counter.
		 *  @param {Time} [time=now] The time when the clock should stop.
		 *  @returns {Tone.Clock} this
		 */
	    Tone.Clock.prototype.pause = function (time) {
	        time = this.toSeconds(time);
	        if (this._state.getValueAtTime(time) === Tone.State.Started) {
	            this._state.setStateAtTime(Tone.State.Paused, time);
	        }
	        return this;
	    };
	    /**
		 *  The scheduling loop.
		 *  @private
		 */
	    Tone.Clock.prototype._loop = function () {
	        //the end of the update interval
	        var endTime = this.now() + this.context.updateInterval;
	        //the current event at the time of the loop
	        var event = this._state.get(endTime);
	        if (event) {
	            //state change events
	            if (event.state !== this._lastState) {
	                this._lastState = event.state;
	                switch (event.state) {
	                case Tone.State.Started:
	                    if (!Tone.isUndef(event.offset)) {
	                        this.ticks = event.offset;
	                    }
	                    this._nextTick = event.time;
	                    this.emit('start', event.time, this.ticks);
	                    break;
	                case Tone.State.Stopped:
	                    this.ticks = 0;
	                    this.emit('stop', event.time);
	                    break;
	                case Tone.State.Paused:
	                    this.emit('pause', event.time);
	                    break;
	                }
	            }
	            //all the tick events
	            while (endTime > this._nextTick && this._state) {
	                var tickTime = this._nextTick;
	                if (this.frequency) {
	                    this._nextTick += this.frequency.getDurationOfTicks(1, this._nextTick);
	                    if (event.state === Tone.State.Started) {
	                        try {
	                            this.callback(tickTime);
	                            this.ticks++;
	                        } catch (e) {
	                            this.ticks++;
	                            throw e;
	                        }
	                    }
	                }
	            }
	        }
	    };
	    /**
		 *  Returns the scheduled state at the given time.
		 *  @param  {Time}  time  The time to query.
		 *  @return  {String}  The name of the state input in setStateAtTime.
		 *  @example
		 * clock.start("+0.1");
		 * clock.getStateAtTime("+0.1"); //returns "started"
		 */
	    Tone.Clock.prototype.getStateAtTime = function (time) {
	        time = this.toSeconds(time);
	        return this._state.getValueAtTime(time);
	    };
	    /**
		 *  Clean up
		 *  @returns {Tone.Clock} this
		 */
	    Tone.Clock.prototype.dispose = function () {
	        Tone.Emitter.prototype.dispose.call(this);
	        this.context.off('tick', this._boundLoop);
	        this._writable('frequency');
	        this.frequency.dispose();
	        this.frequency = null;
	        this._boundLoop = null;
	        this._nextTick = Infinity;
	        this.callback = null;
	        this._state.dispose();
	        this._state = null;
	    };
	    return Tone.Clock;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Similar to Tone.Timeline, but all events represent
		 *         intervals with both "time" and "duration" times. The 
		 *         events are placed in a tree structure optimized
		 *         for querying an intersection point with the timeline
		 *         events. Internally uses an [Interval Tree](https://en.wikipedia.org/wiki/Interval_tree)
		 *         to represent the data.
		 *  @extends {Tone}
		 */
	    Tone.IntervalTimeline = function () {
	        Tone.call(this);
	        /**
			 *  The root node of the inteval tree
			 *  @type  {IntervalNode}
			 *  @private
			 */
	        this._root = null;
	        /**
			 *  Keep track of the length of the timeline.
			 *  @type  {Number}
			 *  @private
			 */
	        this._length = 0;
	    };
	    Tone.extend(Tone.IntervalTimeline);
	    /**
		 *  The event to add to the timeline. All events must 
		 *  have a time and duration value
		 *  @param  {Object}  event  The event to add to the timeline
		 *  @return  {Tone.IntervalTimeline}  this
		 */
	    Tone.IntervalTimeline.prototype.add = function (event) {
	        if (Tone.isUndef(event.time) || Tone.isUndef(event.duration)) {
	            throw new Error('Tone.IntervalTimeline: events must have time and duration parameters');
	        }
	        var node = new IntervalNode(event.time, event.time + event.duration, event);
	        if (this._root === null) {
	            this._root = node;
	        } else {
	            this._root.insert(node);
	        }
	        this._length++;
	        // Restructure tree to be balanced
	        while (node !== null) {
	            node.updateHeight();
	            node.updateMax();
	            this._rebalance(node);
	            node = node.parent;
	        }
	        return this;
	    };
	    /**
		 *  Remove an event from the timeline.
		 *  @param  {Object}  event  The event to remove from the timeline
		 *  @return  {Tone.IntervalTimeline}  this
		 */
	    Tone.IntervalTimeline.prototype.remove = function (event) {
	        if (this._root !== null) {
	            var results = [];
	            this._root.search(event.time, results);
	            for (var i = 0; i < results.length; i++) {
	                var node = results[i];
	                if (node.event === event) {
	                    this._removeNode(node);
	                    this._length--;
	                    break;
	                }
	            }
	        }
	        return this;
	    };
	    /**
		 *  The number of items in the timeline.
		 *  @type {Number}
		 *  @memberOf Tone.IntervalTimeline#
		 *  @name length
		 *  @readOnly
		 */
	    Object.defineProperty(Tone.IntervalTimeline.prototype, 'length', {
	        get: function () {
	            return this._length;
	        }
	    });
	    /**
		 *  Remove events whose time time is after the given time
		 *  @param  {Number}  time  The time to query.
		 *  @returns {Tone.IntervalTimeline} this
		 */
	    Tone.IntervalTimeline.prototype.cancel = function (after) {
	        this.forEachAfter(after, function (event) {
	            this.remove(event);
	        }.bind(this));
	        return this;
	    };
	    /**
		 *  Set the root node as the given node
		 *  @param {IntervalNode} node
		 *  @private
		 */
	    Tone.IntervalTimeline.prototype._setRoot = function (node) {
	        this._root = node;
	        if (this._root !== null) {
	            this._root.parent = null;
	        }
	    };
	    /**
		 *  Replace the references to the node in the node's parent
		 *  with the replacement node.
		 *  @param  {IntervalNode}  node        
		 *  @param  {IntervalNode}  replacement 
		 *  @private
		 */
	    Tone.IntervalTimeline.prototype._replaceNodeInParent = function (node, replacement) {
	        if (node.parent !== null) {
	            if (node.isLeftChild()) {
	                node.parent.left = replacement;
	            } else {
	                node.parent.right = replacement;
	            }
	            this._rebalance(node.parent);
	        } else {
	            this._setRoot(replacement);
	        }
	    };
	    /**
		 *  Remove the node from the tree and replace it with 
		 *  a successor which follows the schema.
		 *  @param  {IntervalNode}  node
		 *  @private
		 */
	    Tone.IntervalTimeline.prototype._removeNode = function (node) {
	        if (node.left === null && node.right === null) {
	            this._replaceNodeInParent(node, null);
	        } else if (node.right === null) {
	            this._replaceNodeInParent(node, node.left);
	        } else if (node.left === null) {
	            this._replaceNodeInParent(node, node.right);
	        } else {
	            var balance = node.getBalance();
	            var replacement, temp;
	            if (balance > 0) {
	                if (node.left.right === null) {
	                    replacement = node.left;
	                    replacement.right = node.right;
	                    temp = replacement;
	                } else {
	                    replacement = node.left.right;
	                    while (replacement.right !== null) {
	                        replacement = replacement.right;
	                    }
	                    replacement.parent.right = replacement.left;
	                    temp = replacement.parent;
	                    replacement.left = node.left;
	                    replacement.right = node.right;
	                }
	            } else {
	                if (node.right.left === null) {
	                    replacement = node.right;
	                    replacement.left = node.left;
	                    temp = replacement;
	                } else {
	                    replacement = node.right.left;
	                    while (replacement.left !== null) {
	                        replacement = replacement.left;
	                    }
	                    replacement.parent = replacement.parent;
	                    replacement.parent.left = replacement.right;
	                    temp = replacement.parent;
	                    replacement.left = node.left;
	                    replacement.right = node.right;
	                }
	            }
	            if (node.parent !== null) {
	                if (node.isLeftChild()) {
	                    node.parent.left = replacement;
	                } else {
	                    node.parent.right = replacement;
	                }
	            } else {
	                this._setRoot(replacement);
	            }
	            // this._replaceNodeInParent(node, replacement);
	            this._rebalance(temp);
	        }
	        node.dispose();
	    };
	    /**
		 *  Rotate the tree to the left
		 *  @param  {IntervalNode}  node
		 *  @private
		 */
	    Tone.IntervalTimeline.prototype._rotateLeft = function (node) {
	        var parent = node.parent;
	        var isLeftChild = node.isLeftChild();
	        // Make node.right the new root of this sub tree (instead of node)
	        var pivotNode = node.right;
	        node.right = pivotNode.left;
	        pivotNode.left = node;
	        if (parent !== null) {
	            if (isLeftChild) {
	                parent.left = pivotNode;
	            } else {
	                parent.right = pivotNode;
	            }
	        } else {
	            this._setRoot(pivotNode);
	        }
	    };
	    /**
		 *  Rotate the tree to the right
		 *  @param  {IntervalNode}  node
		 *  @private
		 */
	    Tone.IntervalTimeline.prototype._rotateRight = function (node) {
	        var parent = node.parent;
	        var isLeftChild = node.isLeftChild();
	        // Make node.left the new root of this sub tree (instead of node)
	        var pivotNode = node.left;
	        node.left = pivotNode.right;
	        pivotNode.right = node;
	        if (parent !== null) {
	            if (isLeftChild) {
	                parent.left = pivotNode;
	            } else {
	                parent.right = pivotNode;
	            }
	        } else {
	            this._setRoot(pivotNode);
	        }
	    };
	    /**
		 *  Balance the BST
		 *  @param  {IntervalNode}  node
		 *  @private
		 */
	    Tone.IntervalTimeline.prototype._rebalance = function (node) {
	        var balance = node.getBalance();
	        if (balance > 1) {
	            if (node.left.getBalance() < 0) {
	                this._rotateLeft(node.left);
	            } else {
	                this._rotateRight(node);
	            }
	        } else if (balance < -1) {
	            if (node.right.getBalance() > 0) {
	                this._rotateRight(node.right);
	            } else {
	                this._rotateLeft(node);
	            }
	        }
	    };
	    /**
		 *  Get an event whose time and duration span the give time. Will
		 *  return the match whose "time" value is closest to the given time.
		 *  @param  {Object}  event  The event to add to the timeline
		 *  @return  {Object}  The event which spans the desired time
		 */
	    Tone.IntervalTimeline.prototype.get = function (time) {
	        if (this._root !== null) {
	            var results = [];
	            this._root.search(time, results);
	            if (results.length > 0) {
	                var max = results[0];
	                for (var i = 1; i < results.length; i++) {
	                    if (results[i].low > max.low) {
	                        max = results[i];
	                    }
	                }
	                return max.event;
	            }
	        }
	        return null;
	    };
	    /**
		 *  Iterate over everything in the timeline.
		 *  @param  {Function}  callback The callback to invoke with every item
		 *  @returns {Tone.IntervalTimeline} this
		 */
	    Tone.IntervalTimeline.prototype.forEach = function (callback) {
	        if (this._root !== null) {
	            var allNodes = [];
	            this._root.traverse(function (node) {
	                allNodes.push(node);
	            });
	            for (var i = 0; i < allNodes.length; i++) {
	                var ev = allNodes[i].event;
	                if (ev) {
	                    callback(ev);
	                }
	            }
	        }
	        return this;
	    };
	    /**
		 *  Iterate over everything in the array in which the given time
		 *  overlaps with the time and duration time of the event.
		 *  @param  {Number}  time The time to check if items are overlapping
		 *  @param  {Function}  callback The callback to invoke with every item
		 *  @returns {Tone.IntervalTimeline} this
		 */
	    Tone.IntervalTimeline.prototype.forEachAtTime = function (time, callback) {
	        if (this._root !== null) {
	            var results = [];
	            this._root.search(time, results);
	            for (var i = results.length - 1; i >= 0; i--) {
	                var ev = results[i].event;
	                if (ev) {
	                    callback(ev);
	                }
	            }
	        }
	        return this;
	    };
	    /**
		 *  Iterate over everything in the array in which the time is greater
		 *  than the given time.
		 *  @param  {Number}  time The time to check if items are before
		 *  @param  {Function}  callback The callback to invoke with every item
		 *  @returns {Tone.IntervalTimeline} this
		 */
	    Tone.IntervalTimeline.prototype.forEachAfter = function (time, callback) {
	        if (this._root !== null) {
	            var results = [];
	            this._root.searchAfter(time, results);
	            for (var i = results.length - 1; i >= 0; i--) {
	                var ev = results[i].event;
	                callback(ev);
	            }
	        }
	        return this;
	    };
	    /**
		 *  Clean up
		 *  @return  {Tone.IntervalTimeline}  this
		 */
	    Tone.IntervalTimeline.prototype.dispose = function () {
	        var allNodes = [];
	        if (this._root !== null) {
	            this._root.traverse(function (node) {
	                allNodes.push(node);
	            });
	        }
	        for (var i = 0; i < allNodes.length; i++) {
	            allNodes[i].dispose();
	        }
	        allNodes = null;
	        this._root = null;
	        return this;
	    };
	    ///////////////////////////////////////////////////////////////////////////
	    //	INTERVAL NODE HELPER
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 *  Represents a node in the binary search tree, with the addition
		 *  of a "high" value which keeps track of the highest value of
		 *  its children. 
		 *  References: 
		 *  https://brooknovak.wordpress.com/2013/12/07/augmented-interval-tree-in-c/
		 *  http://www.mif.vu.lt/~valdas/ALGORITMAI/LITERATURA/Cormen/Cormen.pdf
		 *  @param {Number} low
		 *  @param {Number} high
		 *  @private
		 */
	    var IntervalNode = function (low, high, event) {
	        //the event container
	        this.event = event;
	        //the low value
	        this.low = low;
	        //the high value
	        this.high = high;
	        //the high value for this and all child nodes
	        this.max = this.high;
	        //the nodes to the left
	        this._left = null;
	        //the nodes to the right
	        this._right = null;
	        //the parent node
	        this.parent = null;
	        //the number of child nodes
	        this.height = 0;
	    };
	    /** 
		 *  Insert a node into the correct spot in the tree
		 *  @param  {IntervalNode}  node
		 */
	    IntervalNode.prototype.insert = function (node) {
	        if (node.low <= this.low) {
	            if (this.left === null) {
	                this.left = node;
	            } else {
	                this.left.insert(node);
	            }
	        } else {
	            if (this.right === null) {
	                this.right = node;
	            } else {
	                this.right.insert(node);
	            }
	        }
	    };
	    /**
		 *  Search the tree for nodes which overlap 
		 *  with the given point
		 *  @param  {Number}  point  The point to query
		 *  @param  {Array}  results  The array to put the results
		 */
	    IntervalNode.prototype.search = function (point, results) {
	        // If p is to the right of the rightmost point of any interval
	        // in this node and all children, there won't be any matches.
	        if (point > this.max) {
	            return;
	        }
	        // Search left children
	        if (this.left !== null) {
	            this.left.search(point, results);
	        }
	        // Check this node
	        if (this.low <= point && this.high > point) {
	            results.push(this);
	        }
	        // If p is to the left of the time of this interval,
	        // then it can't be in any child to the right.
	        if (this.low > point) {
	            return;
	        }
	        // Search right children
	        if (this.right !== null) {
	            this.right.search(point, results);
	        }
	    };
	    /**
		 *  Search the tree for nodes which are less 
		 *  than the given point
		 *  @param  {Number}  point  The point to query
		 *  @param  {Array}  results  The array to put the results
		 */
	    IntervalNode.prototype.searchAfter = function (point, results) {
	        // Check this node
	        if (this.low >= point) {
	            results.push(this);
	            if (this.left !== null) {
	                this.left.searchAfter(point, results);
	            }
	        }
	        // search the right side
	        if (this.right !== null) {
	            this.right.searchAfter(point, results);
	        }
	    };
	    /**
		 *  Invoke the callback on this element and both it's branches
		 *  @param  {Function}  callback
		 */
	    IntervalNode.prototype.traverse = function (callback) {
	        callback(this);
	        if (this.left !== null) {
	            this.left.traverse(callback);
	        }
	        if (this.right !== null) {
	            this.right.traverse(callback);
	        }
	    };
	    /**
		 *  Update the height of the node
		 */
	    IntervalNode.prototype.updateHeight = function () {
	        if (this.left !== null && this.right !== null) {
	            this.height = Math.max(this.left.height, this.right.height) + 1;
	        } else if (this.right !== null) {
	            this.height = this.right.height + 1;
	        } else if (this.left !== null) {
	            this.height = this.left.height + 1;
	        } else {
	            this.height = 0;
	        }
	    };
	    /**
		 *  Update the height of the node
		 */
	    IntervalNode.prototype.updateMax = function () {
	        this.max = this.high;
	        if (this.left !== null) {
	            this.max = Math.max(this.max, this.left.max);
	        }
	        if (this.right !== null) {
	            this.max = Math.max(this.max, this.right.max);
	        }
	    };
	    /**
		 *  The balance is how the leafs are distributed on the node
		 *  @return  {Number}  Negative numbers are balanced to the right
		 */
	    IntervalNode.prototype.getBalance = function () {
	        var balance = 0;
	        if (this.left !== null && this.right !== null) {
	            balance = this.left.height - this.right.height;
	        } else if (this.left !== null) {
	            balance = this.left.height + 1;
	        } else if (this.right !== null) {
	            balance = -(this.right.height + 1);
	        }
	        return balance;
	    };
	    /**
		 *  @returns {Boolean} true if this node is the left child
		 *  of its parent
		 */
	    IntervalNode.prototype.isLeftChild = function () {
	        return this.parent !== null && this.parent.left === this;
	    };
	    /**
		 *  get/set the left node
		 *  @type {IntervalNode}
		 */
	    Object.defineProperty(IntervalNode.prototype, 'left', {
	        get: function () {
	            return this._left;
	        },
	        set: function (node) {
	            this._left = node;
	            if (node !== null) {
	                node.parent = this;
	            }
	            this.updateHeight();
	            this.updateMax();
	        }
	    });
	    /**
		 *  get/set the right node
		 *  @type {IntervalNode}
		 */
	    Object.defineProperty(IntervalNode.prototype, 'right', {
	        get: function () {
	            return this._right;
	        },
	        set: function (node) {
	            this._right = node;
	            if (node !== null) {
	                node.parent = this;
	            }
	            this.updateHeight();
	            this.updateMax();
	        }
	    });
	    /**
		 *  null out references.
		 */
	    IntervalNode.prototype.dispose = function () {
	        this.parent = null;
	        this._left = null;
	        this._right = null;
	        this.event = null;
	    };
	    ///////////////////////////////////////////////////////////////////////////
	    //	END INTERVAL NODE HELPER
	    ///////////////////////////////////////////////////////////////////////////
	    return Tone.IntervalTimeline;
	});
	Module(function (Tone) {
	    /**
		 *  @class Tone.TransportEvent is an internal class used by (Tone.Transport)[Transport]
		 *         to schedule events. Do no invoke this class directly, it is
		 *         handled from within Tone.Transport.
		 *  @extends {Tone}
		 *  @param {Object} options
		 */
	    Tone.TransportEvent = function (Transport, options) {
	        options = Tone.defaultArg(options, Tone.TransportEvent.defaults);
	        Tone.call(this);
	        /**
			 * Reference to the Transport that created it
			 * @type {Tone.Transport}
			 */
	        this.Transport = Transport;
	        /**
			 * The unique id of the event
			 * @type {Number}
			 */
	        this.id = Tone.TransportEvent._eventId++;
	        /**
			 * The time the event starts
			 * @type {Ticks}
			 */
	        this.time = options.time;
	        /**
			 * The callback to invoke
			 * @type {Function}
			 */
	        this.callback = options.callback;
	        /**
			 * If the event should be removed after being created.
			 * @type {Boolean}
			 * @private
			 */
	        this._once = options.once;
	    };
	    Tone.extend(Tone.TransportEvent);
	    /**
		 * The defaults
		 * @static
		 * @type {Object}
		 */
	    Tone.TransportEvent.defaults = {
	        'once': false,
	        'callback': Tone.noOp
	    };
	    /**
		 * Current ID counter
		 * @private
		 * @static
		 * @type {Number}
		 */
	    Tone.TransportEvent._eventId = 0;
	    /**
		 * Invoke the callback even callback.
		 * @param  {Time} time  The AudioContext time in seconds of the event
		 */
	    Tone.TransportEvent.prototype.invoke = function (time) {
	        if (this.callback) {
	            this.callback(time);
	            if (this._once && this.Transport) {
	                this.Transport.clear(this.id);
	            }
	        }
	    };
	    /**
		 * Clean up
		 * @return {Tone.TransportEvent} this
		 */
	    Tone.TransportEvent.prototype.dispose = function () {
	        Tone.prototype.dispose.call(this);
	        this.Transport = null;
	        this.callback = null;
	        return this;
	    };
	    return Tone.TransportEvent;
	});
	Module(function (Tone) {
	    /**
		 *  @class Tone.TransportRepeatEvent is an internal class used by Tone.Transport
		 *         to schedule repeat events. This class should not be instantiated directly.
		 *  @extends {Tone.TransportEvent}
		 *  @param {Object} options
		 */
	    Tone.TransportRepeatEvent = function (Transport, options) {
	        Tone.TransportEvent.call(this, Transport, options);
	        options = Tone.defaultArg(options, Tone.TransportRepeatEvent.defaults);
	        /**
			 * When the event should stop repeating
			 * @type {Ticks}
			 * @private
			 */
	        this.duration = options.duration;
	        /**
			 * The interval of the repeated event
			 * @type {Ticks}
			 * @private
			 */
	        this._interval = options.interval;
	        /**
			 * The ID of the current timeline event
			 * @type {Number}
			 * @private
			 */
	        this._currentId = -1;
	        /**
			 * The ID of the next timeline event
			 * @type {Number}
			 * @private
			 */
	        this._nextId = -1;
	        /**
			  * The time of the next event
			  * @type {Ticks}
			  * @private
			  */
	        this._nextTick = this.time;
	        /**
			 * a reference to the bound start method
			 * @type {Function}
			 * @private
			 */
	        this._boundRestart = this._restart.bind(this);
	        this.Transport.on('start loopStart', this._boundRestart);
	        this._restart();
	    };
	    Tone.extend(Tone.TransportRepeatEvent, Tone.TransportEvent);
	    /**
		 * The defaults
		 * @static
		 * @type {Object}
		 */
	    Tone.TransportRepeatEvent.defaults = {
	        'duration': Infinity,
	        'interval': 1
	    };
	    /**
		 * Invoke the callback. Returns the tick time which
		 * the next event should be scheduled at.
		 * @param  {Number} time  The AudioContext time in seconds of the event
		 */
	    Tone.TransportRepeatEvent.prototype.invoke = function (time) {
	        //create more events if necessary
	        this._createEvents();
	        //call the super class
	        Tone.TransportEvent.prototype.invoke.call(this, time);
	    };
	    /**
		 * Push more events onto the timeline to keep up with the position of the timeline
		 * @private
		 */
	    Tone.TransportRepeatEvent.prototype._createEvents = function () {
	        // schedule the next event
	        var ticks = this.Transport.ticks;
	        if (ticks >= this.time && ticks >= this._nextTick && this._nextTick + this._interval < this.time + this.duration) {
	            this._nextTick += this._interval;
	            this._currentId = this._nextId;
	            this._nextId = this.Transport.scheduleOnce(this.invoke.bind(this), Tone.TransportTime(this._nextTick, 'i'));
	        }
	    };
	    /**
		 * Push more events onto the timeline to keep up with the position of the timeline
		 * @private
		 */
	    Tone.TransportRepeatEvent.prototype._restart = function () {
	        this.Transport.clear(this._currentId);
	        this.Transport.clear(this._nextId);
	        var ticks = this.Transport.ticks;
	        this._nextTick = this.time;
	        if (ticks > this.time) {
	            this._nextTick = this.time + Math.ceil((ticks - this.time) / this._interval) * this._interval;
	        }
	        this._currentId = this.Transport.scheduleOnce(this.invoke.bind(this), Tone.TransportTime(this._nextTick, 'i'));
	        this._nextTick += this._interval;
	        this._nextId = this.Transport.scheduleOnce(this.invoke.bind(this), Tone.TransportTime(this._nextTick, 'i'));
	    };
	    /**
		 * Clean up
		 * @return {Tone.TransportRepeatEvent} this
		 */
	    Tone.TransportRepeatEvent.prototype.dispose = function () {
	        this.Transport.clear(this._currentId);
	        this.Transport.clear(this._nextId);
	        this.Transport.off('start loopStart', this._boundRestart);
	        this._boundCreateEvents = null;
	        Tone.TransportEvent.prototype.dispose.call(this);
	        return this;
	    };
	    return Tone.TransportRepeatEvent;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Transport for timing musical events.
		 *          Supports tempo curves and time changes. Unlike browser-based timing (setInterval, requestAnimationFrame)
		 *          Tone.Transport timing events pass in the exact time of the scheduled event
		 *          in the argument of the callback function. Pass that time value to the object
		 *          you're scheduling. <br><br>
		 *          A single transport is created for you when the library is initialized.
		 *          <br><br>
		 *          The transport emits the events: "start", "stop", "pause", and "loop" which are
		 *          called with the time of that event as the argument.
		 *
		 *  @extends {Tone.Emitter}
		 *  @singleton
		 *  @example
		 * //repeated event every 8th note
		 * Tone.Transport.scheduleRepeat(function(time){
		 * 	//do something with the time
		 * }, "8n");
		 *  @example
		 * //schedule an event on the 16th measure
		 * Tone.Transport.schedule(function(time){
		 * 	//do something with the time
		 * }, "16:0:0");
		 */
	    Tone.Transport = function () {
	        Tone.Emitter.call(this);
	        Tone.getContext(function () {
	            ///////////////////////////////////////////////////////////////////////
	            //	LOOPING
	            //////////////////////////////////////////////////////////////////////
	            /**
				 * 	If the transport loops or not.
				 *  @type {boolean}
				 */
	            this.loop = false;
	            /**
				 * 	The loop start position in ticks
				 *  @type {Ticks}
				 *  @private
				 */
	            this._loopStart = 0;
	            /**
				 * 	The loop end position in ticks
				 *  @type {Ticks}
				 *  @private
				 */
	            this._loopEnd = 0;
	            ///////////////////////////////////////////////////////////////////////
	            //	CLOCK/TEMPO
	            //////////////////////////////////////////////////////////////////////
	            /**
				 *  Pulses per quarter is the number of ticks per quarter note.
				 *  @private
				 *  @type  {Number}
				 */
	            this._ppq = TransportConstructor.defaults.PPQ;
	            /**
				 *  watches the main oscillator for timing ticks
				 *  initially starts at 120bpm
				 *  @private
				 *  @type {Tone.Clock}
				 */
	            this._clock = new Tone.Clock({
	                'callback': this._processTick.bind(this),
	                'frequency': 0
	            });
	            this._bindClockEvents();
	            /**
				 *  The Beats Per Minute of the Transport.
				 *  @type {BPM}
				 *  @signal
				 *  @example
				 * Tone.Transport.bpm.value = 80;
				 * //ramp the bpm to 120 over 10 seconds
				 * Tone.Transport.bpm.rampTo(120, 10);
				 */
	            this.bpm = this._clock.frequency;
	            this.bpm._toUnits = this._toUnits.bind(this);
	            this.bpm._fromUnits = this._fromUnits.bind(this);
	            this.bpm.units = Tone.Type.BPM;
	            this.bpm.value = TransportConstructor.defaults.bpm;
	            this._readOnly('bpm');
	            /**
				 *  The time signature, or more accurately the numerator
				 *  of the time signature over a denominator of 4.
				 *  @type {Number}
				 *  @private
				 */
	            this._timeSignature = TransportConstructor.defaults.timeSignature;
	            ///////////////////////////////////////////////////////////////////////
	            //	TIMELINE EVENTS
	            //////////////////////////////////////////////////////////////////////
	            /**
				 *  All the events in an object to keep track by ID
				 *  @type {Object}
				 *  @private
				 */
	            this._scheduledEvents = {};
	            /**
				 * 	The scheduled events.
				 *  @type {Tone.Timeline}
				 *  @private
				 */
	            this._timeline = new Tone.Timeline();
	            /**
				 *  Repeated events
				 *  @type {Array}
				 *  @private
				 */
	            this._repeatedEvents = new Tone.IntervalTimeline();
	            /**
				 *  All of the synced Signals
				 *  @private
				 *  @type {Array}
				 */
	            this._syncedSignals = [];
	            ///////////////////////////////////////////////////////////////////////
	            //	SWING
	            //////////////////////////////////////////////////////////////////////
	            /**
				 *  The subdivision of the swing
				 *  @type  {Ticks}
				 *  @private
				 */
	            this._swingTicks = TransportConstructor.defaults.PPQ / 2;
	            //8n
	            /**
				 *  The swing amount
				 *  @type {NormalRange}
				 *  @private
				 */
	            this._swingAmount = 0;
	        }.bind(this));
	    };
	    Tone.extend(Tone.Transport, Tone.Emitter);
	    /**
		 *  the defaults
		 *  @type {Object}
		 *  @const
		 *  @static
		 */
	    Tone.Transport.defaults = {
	        'bpm': 120,
	        'swing': 0,
	        'swingSubdivision': '8n',
	        'timeSignature': 4,
	        'loopStart': 0,
	        'loopEnd': '4m',
	        'PPQ': 192
	    };
	    ///////////////////////////////////////////////////////////////////////////////
	    //	TICKS
	    ///////////////////////////////////////////////////////////////////////////////
	    /**
		 *  called on every tick
		 *  @param   {number} tickTime clock relative tick time
		 *  @private
		 */
	    Tone.Transport.prototype._processTick = function (tickTime) {
	        var ticks = this._clock.ticks;
	        //handle swing
	        if (this._swingAmount > 0 && ticks % this._ppq !== 0 && //not on a downbeat
	            ticks % (this._swingTicks * 2) !== 0) {
	            //add some swing
	            var progress = ticks % (this._swingTicks * 2) / (this._swingTicks * 2);
	            var amount = Math.sin(progress * Math.PI) * this._swingAmount;
	            tickTime += Tone.Time(this._swingTicks * 2 / 3, 'i') * amount;
	        }
	        //do the loop test
	        if (this.loop) {
	            if (ticks >= this._loopEnd) {
	                this.emit('loopEnd', tickTime);
	                this._clock.ticks = this._loopStart;
	                ticks = this._loopStart;
	                this.emit('loopStart', tickTime, this.seconds);
	                this.emit('loop', tickTime);
	            }
	        }
	        //invoke the timeline events scheduled on this tick
	        this._timeline.forEachAtTime(ticks, function (event) {
	            event.invoke(tickTime);
	        });
	    };
	    ///////////////////////////////////////////////////////////////////////////////
	    //	SCHEDULABLE EVENTS
	    ///////////////////////////////////////////////////////////////////////////////
	    /**
		 *  Schedule an event along the timeline.
		 *  @param {Function} callback The callback to be invoked at the time.
		 *  @param {TransportTime}  time The time to invoke the callback at.
		 *  @return {Number} The id of the event which can be used for canceling the event.
		 *  @example
		 * //trigger the callback when the Transport reaches the desired time
		 * Tone.Transport.schedule(function(time){
		 * 	envelope.triggerAttack(time);
		 * }, "128i");
		 */
	    Tone.Transport.prototype.schedule = function (callback, time) {
	        var event = new Tone.TransportEvent(this, {
	            'time': this.toTicks(time),
	            'callback': callback
	        });
	        return this._addEvent(event, this._timeline);
	    };
	    /**
		 *  Schedule a repeated event along the timeline. The event will fire
		 *  at the `interval` starting at the `startTime` and for the specified
		 *  `duration`.
		 *  @param  {Function}  callback   The callback to invoke.
		 *  @param  {Time}    interval   The duration between successive
		 *                               callbacks. Must be a positive number.
		 *  @param  {TimelinePosition=}    startTime  When along the timeline the events should
		 *                               start being invoked.
		 *  @param {Time} [duration=Infinity] How long the event should repeat.
		 *  @return  {Number}    The ID of the scheduled event. Use this to cancel
		 *                           the event.
		 *  @example
		 * //a callback invoked every eighth note after the first measure
		 * Tone.Transport.scheduleRepeat(callback, "8n", "1m");
		 */
	    Tone.Transport.prototype.scheduleRepeat = function (callback, interval, startTime, duration) {
	        var event = new Tone.TransportRepeatEvent(this, {
	            'callback': callback,
	            'interval': this.toTicks(interval),
	            'time': this.toTicks(startTime),
	            'duration': this.toTicks(Tone.defaultArg(duration, Infinity))
	        });
	        //kick it off if the Transport is started
	        return this._addEvent(event, this._repeatedEvents);
	    };
	    /**
		 *  Schedule an event that will be removed after it is invoked.
		 *  Note that if the given time is less than the current transport time,
		 *  the event will be invoked immediately.
		 *  @param {Function} callback The callback to invoke once.
		 *  @param {TransportTime} time The time the callback should be invoked.
		 *  @returns {Number} The ID of the scheduled event.
		 */
	    Tone.Transport.prototype.scheduleOnce = function (callback, time) {
	        var event = new Tone.TransportEvent(this, {
	            'time': this.toTicks(time),
	            'callback': callback,
	            'once': true
	        });
	        return this._addEvent(event, this._timeline);
	    };
	    /**
		 *  Clear the passed in event id from the timeline
		 *  @param {Number} eventId The id of the event.
		 *  @returns {Tone.Transport} this
		 */
	    Tone.Transport.prototype.clear = function (eventId) {
	        if (this._scheduledEvents.hasOwnProperty(eventId)) {
	            var item = this._scheduledEvents[eventId.toString()];
	            item.timeline.remove(item.event);
	            item.event.dispose();
	            delete this._scheduledEvents[eventId.toString()];
	        }
	        return this;
	    };
	    /**
		 * Add an event to the correct timeline. Keep track of the
		 * timeline it was added to.
		 * @param {Tone.TransportEvent}	event
		 * @param {Tone.Timeline} timeline
		 * @returns {Number} the event id which was just added
		 * @private
		 */
	    Tone.Transport.prototype._addEvent = function (event, timeline) {
	        this._scheduledEvents[event.id.toString()] = {
	            'event': event,
	            'timeline': timeline
	        };
	        timeline.add(event);
	        return event.id;
	    };
	    /**
		 *  Remove scheduled events from the timeline after
		 *  the given time. Repeated events will be removed
		 *  if their startTime is after the given time
		 *  @param {TransportTime} [after=0] Clear all events after
		 *                          this time.
		 *  @returns {Tone.Transport} this
		 */
	    Tone.Transport.prototype.cancel = function (after) {
	        after = Tone.defaultArg(after, 0);
	        after = this.toTicks(after);
	        this._timeline.cancel(after);
	        this._repeatedEvents.cancel(after);
	        return this;
	    };
	    ///////////////////////////////////////////////////////////////////////////////
	    //	START/STOP/PAUSE
	    ///////////////////////////////////////////////////////////////////////////////
	    /**
		 *  Bind start/stop/pause events from the clock and emit them.
		 *  @private
		 */
	    Tone.Transport.prototype._bindClockEvents = function () {
	        this._clock.on('start', function (time, offset) {
	            offset = Tone.Time(this._clock.ticks, 'i').toSeconds();
	            this.emit('start', time, offset);
	        }.bind(this));
	        this._clock.on('stop', function (time) {
	            this.emit('stop', time);
	        }.bind(this));
	        this._clock.on('pause', function (time) {
	            this.emit('pause', time);
	        }.bind(this));
	    };
	    /**
		 *  Returns the playback state of the source, either "started", "stopped", or "paused"
		 *  @type {Tone.State}
		 *  @readOnly
		 *  @memberOf Tone.Transport#
		 *  @name state
		 */
	    Object.defineProperty(Tone.Transport.prototype, 'state', {
	        get: function () {
	            return this._clock.getStateAtTime(this.now());
	        }
	    });
	    /**
		 *  Start the transport and all sources synced to the transport.
		 *  @param  {Time} [time=now] The time when the transport should start.
		 *  @param  {TransportTime=} offset The timeline offset to start the transport.
		 *  @returns {Tone.Transport} this
		 *  @example
		 * //start the transport in one second starting at beginning of the 5th measure.
		 * Tone.Transport.start("+1", "4:0:0");
		 */
	    Tone.Transport.prototype.start = function (time, offset) {
	        //start the clock
	        if (!Tone.isUndef(offset)) {
	            offset = this.toTicks(offset);
	        }
	        this._clock.start(time, offset);
	        return this;
	    };
	    /**
		 *  Stop the transport and all sources synced to the transport.
		 *  @param  {Time} [time=now] The time when the transport should stop.
		 *  @returns {Tone.Transport} this
		 *  @example
		 * Tone.Transport.stop();
		 */
	    Tone.Transport.prototype.stop = function (time) {
	        this._clock.stop(time);
	        return this;
	    };
	    /**
		 *  Pause the transport and all sources synced to the transport.
		 *  @param  {Time} [time=now]
		 *  @returns {Tone.Transport} this
		 */
	    Tone.Transport.prototype.pause = function (time) {
	        this._clock.pause(time);
	        return this;
	    };
	    /**
		 * Toggle the current state of the transport. If it is
		 * started, it will stop it, otherwise it will start the Transport.
		 * @param  {Time=} time The time of the event
		 * @return {Tone.Transport}      this
		 */
	    Tone.Transport.prototype.toggle = function (time) {
	        time = this.toSeconds(time);
	        if (this._clock.getStateAtTime(time) !== Tone.State.Started) {
	            this.start(time);
	        } else {
	            this.stop(time);
	        }
	        return this;
	    };
	    ///////////////////////////////////////////////////////////////////////////////
	    //	SETTERS/GETTERS
	    ///////////////////////////////////////////////////////////////////////////////
	    /**
		 *  The time signature as just the numerator over 4.
		 *  For example 4/4 would be just 4 and 6/8 would be 3.
		 *  @memberOf Tone.Transport#
		 *  @type {Number|Array}
		 *  @name timeSignature
		 *  @example
		 * //common time
		 * Tone.Transport.timeSignature = 4;
		 * // 7/8
		 * Tone.Transport.timeSignature = [7, 8];
		 * //this will be reduced to a single number
		 * Tone.Transport.timeSignature; //returns 3.5
		 */
	    Object.defineProperty(Tone.Transport.prototype, 'timeSignature', {
	        get: function () {
	            return this._timeSignature;
	        },
	        set: function (timeSig) {
	            if (Tone.isArray(timeSig)) {
	                timeSig = timeSig[0] / timeSig[1] * 4;
	            }
	            this._timeSignature = timeSig;
	        }
	    });
	    /**
		 * When the Tone.Transport.loop = true, this is the starting position of the loop.
		 * @memberOf Tone.Transport#
		 * @type {TransportTime}
		 * @name loopStart
		 */
	    Object.defineProperty(Tone.Transport.prototype, 'loopStart', {
	        get: function () {
	            return Tone.TransportTime(this._loopStart, 'i').toSeconds();
	        },
	        set: function (startPosition) {
	            this._loopStart = this.toTicks(startPosition);
	        }
	    });
	    /**
		 * When the Tone.Transport.loop = true, this is the ending position of the loop.
		 * @memberOf Tone.Transport#
		 * @type {TransportTime}
		 * @name loopEnd
		 */
	    Object.defineProperty(Tone.Transport.prototype, 'loopEnd', {
	        get: function () {
	            return Tone.TransportTime(this._loopEnd, 'i').toSeconds();
	        },
	        set: function (endPosition) {
	            this._loopEnd = this.toTicks(endPosition);
	        }
	    });
	    /**
		 *  Set the loop start and stop at the same time.
		 *  @param {TransportTime} startPosition
		 *  @param {TransportTime} endPosition
		 *  @returns {Tone.Transport} this
		 *  @example
		 * //loop over the first measure
		 * Tone.Transport.setLoopPoints(0, "1m");
		 * Tone.Transport.loop = true;
		 */
	    Tone.Transport.prototype.setLoopPoints = function (startPosition, endPosition) {
	        this.loopStart = startPosition;
	        this.loopEnd = endPosition;
	        return this;
	    };
	    /**
		 *  The swing value. Between 0-1 where 1 equal to
		 *  the note + half the subdivision.
		 *  @memberOf Tone.Transport#
		 *  @type {NormalRange}
		 *  @name swing
		 */
	    Object.defineProperty(Tone.Transport.prototype, 'swing', {
	        get: function () {
	            return this._swingAmount;
	        },
	        set: function (amount) {
	            //scale the values to a normal range
	            this._swingAmount = amount;
	        }
	    });
	    /**
		 *  Set the subdivision which the swing will be applied to.
		 *  The default value is an 8th note. Value must be less
		 *  than a quarter note.
		 *
		 *  @memberOf Tone.Transport#
		 *  @type {Time}
		 *  @name swingSubdivision
		 */
	    Object.defineProperty(Tone.Transport.prototype, 'swingSubdivision', {
	        get: function () {
	            return Tone.Time(this._swingTicks, 'i').toNotation();
	        },
	        set: function (subdivision) {
	            this._swingTicks = this.toTicks(subdivision);
	        }
	    });
	    /**
		 *  The Transport's position in Bars:Beats:Sixteenths.
		 *  Setting the value will jump to that position right away.
		 *  @memberOf Tone.Transport#
		 *  @type {BarsBeatsSixteenths}
		 *  @name position
		 */
	    Object.defineProperty(Tone.Transport.prototype, 'position', {
	        get: function () {
	            return Tone.TransportTime(this.ticks, 'i').toBarsBeatsSixteenths();
	        },
	        set: function (progress) {
	            var ticks = this.toTicks(progress);
	            this.ticks = ticks;
	        }
	    });
	    /**
		 *  The Transport's position in seconds
		 *  Setting the value will jump to that position right away.
		 *  @memberOf Tone.Transport#
		 *  @type {Seconds}
		 *  @name seconds
		 */
	    Object.defineProperty(Tone.Transport.prototype, 'seconds', {
	        get: function () {
	            return Tone.TransportTime(this.ticks, 'i').toSeconds();
	        },
	        set: function (progress) {
	            var ticks = this.toTicks(progress);
	            this.ticks = ticks;
	        }
	    });
	    /**
		 *  The Transport's loop position as a normalized value. Always
		 *  returns 0 if the transport if loop is not true.
		 *  @memberOf Tone.Transport#
		 *  @name progress
		 *  @type {NormalRange}
		 */
	    Object.defineProperty(Tone.Transport.prototype, 'progress', {
	        get: function () {
	            if (this.loop) {
	                return (this.ticks - this._loopStart) / (this._loopEnd - this._loopStart);
	            } else {
	                return 0;
	            }
	        }
	    });
	    /**
		 *  The transports current tick position.
		 *
		 *  @memberOf Tone.Transport#
		 *  @type {Ticks}
		 *  @name ticks
		 */
	    Object.defineProperty(Tone.Transport.prototype, 'ticks', {
	        get: function () {
	            return this._clock.ticks;
	        },
	        set: function (t) {
	            if (this._clock.ticks !== t) {
	                var now = this.now();
	                //stop everything synced to the transport
	                if (this.state === Tone.State.Started) {
	                    this.emit('stop', now);
	                    this._clock.ticks = t;
	                    //restart it with the new time
	                    this.emit('start', now, this.seconds);
	                } else {
	                    this._clock.ticks = t;
	                }
	            }
	        }
	    });
	    /**
		 *  Pulses Per Quarter note. This is the smallest resolution
		 *  the Transport timing supports. This should be set once
		 *  on initialization and not set again. Changing this value
		 *  after other objects have been created can cause problems.
		 *
		 *  @memberOf Tone.Transport#
		 *  @type {Number}
		 *  @name PPQ
		 */
	    Object.defineProperty(Tone.Transport.prototype, 'PPQ', {
	        get: function () {
	            return this._ppq;
	        },
	        set: function (ppq) {
	            var bpm = this.bpm.value;
	            this._ppq = ppq;
	            this.bpm.value = bpm;
	        }
	    });
	    /**
		 *  Convert from BPM to frequency (factoring in PPQ)
		 *  @param  {BPM}  bpm The BPM value to convert to frequency
		 *  @return  {Frequency}  The BPM as a frequency with PPQ factored in.
		 *  @private
		 */
	    Tone.Transport.prototype._fromUnits = function (bpm) {
	        return 1 / (60 / bpm / this.PPQ);
	    };
	    /**
		 *  Convert from frequency (with PPQ) into BPM
		 *  @param  {Frequency}  freq The clocks frequency to convert to BPM
		 *  @return  {BPM}  The frequency value as BPM.
		 *  @private
		 */
	    Tone.Transport.prototype._toUnits = function (freq) {
	        return freq / this.PPQ * 60;
	    };
	    ///////////////////////////////////////////////////////////////////////////////
	    //	SYNCING
	    ///////////////////////////////////////////////////////////////////////////////
	    /**
		 *  Returns the time aligned to the next subdivision
		 *  of the Transport. If the Transport is not started,
		 *  it will return 0.
		 *  Note: this will not work precisely during tempo ramps.
		 *  @param  {Time}  subdivision  The subdivision to quantize to
		 *  @return  {Number}  The context time of the next subdivision.
		 *  @example
		 * Tone.Transport.start(); //the transport must be started
		 * Tone.Transport.nextSubdivision("4n");
		 */
	    Tone.Transport.prototype.nextSubdivision = function (subdivision) {
	        subdivision = this.toSeconds(subdivision);
	        //if the transport's not started, return 0
	        var now;
	        if (this.state === Tone.State.Started) {
	            now = this._clock._nextTick;
	        } else {
	            return 0;
	        }
	        var transportPos = Tone.Time(this.ticks, 'i');
	        var remainingTime = subdivision - transportPos % subdivision;
	        if (remainingTime === 0) {
	            remainingTime = subdivision;
	        }
	        return now + remainingTime;
	    };
	    /**
		 *  Attaches the signal to the tempo control signal so that
		 *  any changes in the tempo will change the signal in the same
		 *  ratio.
		 *
		 *  @param  {Tone.Signal} signal
		 *  @param {number=} ratio Optionally pass in the ratio between
		 *                         the two signals. Otherwise it will be computed
		 *                         based on their current values.
		 *  @returns {Tone.Transport} this
		 */
	    Tone.Transport.prototype.syncSignal = function (signal, ratio) {
	        if (!ratio) {
	            //get the sync ratio
	            if (signal._param.value !== 0) {
	                ratio = signal._param.value / this.bpm._param.value;
	            } else {
	                ratio = 0;
	            }
	        }
	        var ratioSignal = new Tone.Gain(ratio);
	        this.bpm.chain(ratioSignal, signal._param);
	        this._syncedSignals.push({
	            'ratio': ratioSignal,
	            'signal': signal,
	            'initial': signal._param.value
	        });
	        signal._param.value = 0;
	        return this;
	    };
	    /**
		 *  Unsyncs a previously synced signal from the transport's control.
		 *  See Tone.Transport.syncSignal.
		 *  @param  {Tone.Signal} signal
		 *  @returns {Tone.Transport} this
		 */
	    Tone.Transport.prototype.unsyncSignal = function (signal) {
	        for (var i = this._syncedSignals.length - 1; i >= 0; i--) {
	            var syncedSignal = this._syncedSignals[i];
	            if (syncedSignal.signal === signal) {
	                syncedSignal.ratio.dispose();
	                syncedSignal.signal._param.value = syncedSignal.initial;
	                this._syncedSignals.splice(i, 1);
	            }
	        }
	        return this;
	    };
	    /**
		 *  Clean up.
		 *  @returns {Tone.Transport} this
		 *  @private
		 */
	    Tone.Transport.prototype.dispose = function () {
	        Tone.Emitter.prototype.dispose.call(this);
	        this._clock.dispose();
	        this._clock = null;
	        this._writable('bpm');
	        this.bpm = null;
	        this._timeline.dispose();
	        this._timeline = null;
	        this._repeatedEvents.dispose();
	        this._repeatedEvents = null;
	        return this;
	    };
	    ///////////////////////////////////////////////////////////////////////////////
	    //	INITIALIZATION
	    ///////////////////////////////////////////////////////////////////////////////
	    var TransportConstructor = Tone.Transport;
	    Tone.Transport = new TransportConstructor();
	    Tone.Context.on('init', function (context) {
	        if (context.Transport instanceof TransportConstructor) {
	            Tone.Transport = context.Transport;
	        } else {
	            Tone.Transport = new TransportConstructor();
	        }
	        //store the Transport on the context so it can be retrieved later
	        context.Transport = Tone.Transport;
	    });
	    Tone.Context.on('close', function (context) {
	        if (context.Transport instanceof TransportConstructor) {
	            context.Transport.dispose();
	        }
	    });
	    return Tone.Transport;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.Volume is a simple volume node, useful for creating a volume fader.
		 *
		 *  @extends {Tone.AudioNode}
		 *  @constructor
		 *  @param {Decibels} [volume=0] the initial volume
		 *  @example
		 * var vol = new Tone.Volume(-12);
		 * instrument.chain(vol, Tone.Master);
		 */
	    Tone.Volume = function () {
	        var options = Tone.defaults(arguments, ['volume'], Tone.Volume);
	        Tone.AudioNode.call(this);
	        /**
			 * the output node
			 * @type {GainNode}
			 * @private
			 */
	        this.output = this.input = new Tone.Gain(options.volume, Tone.Type.Decibels);
	        /**
			 * The unmuted volume
			 * @type {Decibels}
			 * @private
			 */
	        this._unmutedVolume = options.volume;
	        /**
			 *  The volume control in decibels.
			 *  @type {Decibels}
			 *  @signal
			 */
	        this.volume = this.output.gain;
	        this._readOnly('volume');
	        //set the mute initially
	        this.mute = options.mute;
	    };
	    Tone.extend(Tone.Volume, Tone.AudioNode);
	    /**
		 *  Defaults
		 *  @type  {Object}
		 *  @const
		 *  @static
		 */
	    Tone.Volume.defaults = {
	        'volume': 0,
	        'mute': false
	    };
	    /**
		 * Mute the output.
		 * @memberOf Tone.Volume#
		 * @type {boolean}
		 * @name mute
		 * @example
		 * //mute the output
		 * volume.mute = true;
		 */
	    Object.defineProperty(Tone.Volume.prototype, 'mute', {
	        get: function () {
	            return this.volume.value === -Infinity;
	        },
	        set: function (mute) {
	            if (!this.mute && mute) {
	                this._unmutedVolume = this.volume.value;
	                //maybe it should ramp here?
	                this.volume.value = -Infinity;
	            } else if (this.mute && !mute) {
	                this.volume.value = this._unmutedVolume;
	            }
	        }
	    });
	    /**
		 *  clean up
		 *  @returns {Tone.Volume} this
		 */
	    Tone.Volume.prototype.dispose = function () {
	        this.input.dispose();
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._writable('volume');
	        this.volume.dispose();
	        this.volume = null;
	        return this;
	    };
	    return Tone.Volume;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  A single master output which is connected to the
		 *          AudioDestinationNode (aka your speakers).
		 *          It provides useful conveniences such as the ability
		 *          to set the volume and mute the entire application.
		 *          It also gives you the ability to apply master effects to your application.
		 *          <br><br>
		 *          Like Tone.Transport, A single Tone.Master is created
		 *          on initialization and you do not need to explicitly construct one.
		 *
		 *  @constructor
		 *  @extends {Tone}
		 *  @singleton
		 *  @example
		 * //the audio will go from the oscillator to the speakers
		 * oscillator.connect(Tone.Master);
		 * //a convenience for connecting to the master output is also provided:
		 * oscillator.toMaster();
		 * //the above two examples are equivalent.
		 */
	    Tone.Master = function () {
	        Tone.AudioNode.call(this);
	        Tone.getContext(function () {
	            this.createInsOuts(1, 0);
	            /**
				 *  The private volume node
				 *  @type  {Tone.Volume}
				 *  @private
				 */
	            this._volume = this.output = new Tone.Volume();
	            /**
				 * The volume of the master output.
				 * @type {Decibels}
				 * @signal
				 */
	            this.volume = this._volume.volume;
	            this._readOnly('volume');
	            //connections
	            this.input.chain(this.output, this.context.destination);
	        }.bind(this));
	    };
	    Tone.extend(Tone.Master, Tone.AudioNode);
	    /**
		 *  @type {Object}
		 *  @const
		 */
	    Tone.Master.defaults = {
	        'volume': 0,
	        'mute': false
	    };
	    /**
		 * Mute the output.
		 * @memberOf Tone.Master#
		 * @type {boolean}
		 * @name mute
		 * @example
		 * //mute the output
		 * Tone.Master.mute = true;
		 */
	    Object.defineProperty(Tone.Master.prototype, 'mute', {
	        get: function () {
	            return this._volume.mute;
	        },
	        set: function (mute) {
	            this._volume.mute = mute;
	        }
	    });
	    /**
		 *  Add a master effects chain. NOTE: this will disconnect any nodes which were previously
		 *  chained in the master effects chain.
		 *  @param {AudioNode|Tone} args... All arguments will be connected in a row
		 *                                  and the Master will be routed through it.
		 *  @return  {Tone.Master}  this
		 *  @example
		 * //some overall compression to keep the levels in check
		 * var masterCompressor = new Tone.Compressor({
		 * 	"threshold" : -6,
		 * 	"ratio" : 3,
		 * 	"attack" : 0.5,
		 * 	"release" : 0.1
		 * });
		 * //give a little boost to the lows
		 * var lowBump = new Tone.Filter(200, "lowshelf");
		 * //route everything through the filter
		 * //and compressor before going to the speakers
		 * Tone.Master.chain(lowBump, masterCompressor);
		 */
	    Tone.Master.prototype.chain = function () {
	        this.input.disconnect();
	        this.input.chain.apply(this.input, arguments);
	        arguments[arguments.length - 1].connect(this.output);
	    };
	    /**
		 *  Clean up
		 *  @return  {Tone.Master}  this
		 */
	    Tone.Master.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._writable('volume');
	        this._volume.dispose();
	        this._volume = null;
	        this.volume = null;
	    };
	    ///////////////////////////////////////////////////////////////////////////
	    //	AUGMENT TONE's PROTOTYPE
	    ///////////////////////////////////////////////////////////////////////////
	    /**
		 *  Connect 'this' to the master output. Shorthand for this.connect(Tone.Master)
		 *  @returns {Tone.AudioNode} this
		 *  @example
		 * //connect an oscillator to the master output
		 * var osc = new Tone.Oscillator().toMaster();
		 */
	    Tone.AudioNode.prototype.toMaster = function () {
	        this.connect(Tone.Master);
	        return this;
	    };
	    if (window.AudioNode) {
	        // Also augment AudioNode's prototype to include toMaster as a convenience
	        AudioNode.prototype.toMaster = function () {
	            this.connect(Tone.Master);
	            return this;
	        };
	    }
	    /**
		 *  initialize the module and listen for new audio contexts
		 */
	    var MasterConstructor = Tone.Master;
	    Tone.Master = new MasterConstructor();
	    Tone.Context.on('init', function (context) {
	        // if it already exists, just restore it
	        if (context.Master instanceof MasterConstructor) {
	            Tone.Master = context.Master;
	        } else {
	            Tone.Master = new MasterConstructor();
	        }
	        context.Master = Tone.Master;
	    });
	    Tone.Context.on('close', function (context) {
	        if (context.Master instanceof MasterConstructor) {
	            context.Master.dispose();
	        }
	    });
	    return Tone.Master;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Base class for sources. Sources have start/stop methods
		 *          and the ability to be synced to the
		 *          start/stop of Tone.Transport.
		 *
		 *  @constructor
		 *  @extends {Tone.AudioNode}
		 *  @example
		 * //Multiple state change events can be chained together,
		 * //but must be set in the correct order and with ascending times
		 *
		 * // OK
		 * state.start().stop("+0.2");
		 * // AND
		 * state.start().stop("+0.2").start("+0.4").stop("+0.7")
		 *
		 * // BAD
		 * state.stop("+0.2").start();
		 * // OR
		 * state.start("+0.3").stop("+0.2");
		 *
		 */
	    Tone.Source = function (options) {
	        options = Tone.defaultArg(options, Tone.Source.defaults);
	        Tone.AudioNode.call(this);
	        /**
			 *  The output volume node
			 *  @type  {Tone.Volume}
			 *  @private
			 */
	        this._volume = this.output = new Tone.Volume(options.volume);
	        /**
			 * The volume of the output in decibels.
			 * @type {Decibels}
			 * @signal
			 * @example
			 * source.volume.value = -6;
			 */
	        this.volume = this._volume.volume;
	        this._readOnly('volume');
	        /**
			 * 	Keep track of the scheduled state.
			 *  @type {Tone.TimelineState}
			 *  @private
			 */
	        this._state = new Tone.TimelineState(Tone.State.Stopped);
	        this._state.memory = 10;
	        /**
			 *  The synced `start` callback function from the transport
			 *  @type {Function}
			 *  @private
			 */
	        this._synced = false;
	        /**
			 *  Keep track of all of the scheduled event ids
			 *  @type  {Array}
			 *  @private
			 */
	        this._scheduled = [];
	        //make the output explicitly stereo
	        this._volume.output.output.channelCount = 2;
	        this._volume.output.output.channelCountMode = 'explicit';
	        //mute initially
	        this.mute = options.mute;
	    };
	    Tone.extend(Tone.Source, Tone.AudioNode);
	    /**
		 *  The default parameters
		 *  @static
		 *  @const
		 *  @type {Object}
		 */
	    Tone.Source.defaults = {
	        'volume': 0,
	        'mute': false
	    };
	    /**
		 *  Returns the playback state of the source, either "started" or "stopped".
		 *  @type {Tone.State}
		 *  @readOnly
		 *  @memberOf Tone.Source#
		 *  @name state
		 */
	    Object.defineProperty(Tone.Source.prototype, 'state', {
	        get: function () {
	            if (this._synced) {
	                if (Tone.Transport.state === Tone.State.Started) {
	                    return this._state.getValueAtTime(Tone.Transport.seconds);
	                } else {
	                    return Tone.State.Stopped;
	                }
	            } else {
	                return this._state.getValueAtTime(this.now());
	            }
	        }
	    });
	    /**
		 * Mute the output.
		 * @memberOf Tone.Source#
		 * @type {boolean}
		 * @name mute
		 * @example
		 * //mute the output
		 * source.mute = true;
		 */
	    Object.defineProperty(Tone.Source.prototype, 'mute', {
	        get: function () {
	            return this._volume.mute;
	        },
	        set: function (mute) {
	            this._volume.mute = mute;
	        }
	    });
	    //overwrite these functions
	    Tone.Source.prototype._start = Tone.noOp;
	    Tone.Source.prototype._stop = Tone.noOp;
	    /**
		 *  Start the source at the specified time. If no time is given,
		 *  start the source now.
		 *  @param  {Time} [time=now] When the source should be started.
		 *  @returns {Tone.Source} this
		 *  @example
		 * source.start("+0.5"); //starts the source 0.5 seconds from now
		 */
	    Tone.Source.prototype.start = function (time, offset, duration) {
	        if (Tone.isUndef(time) && this._synced) {
	            time = Tone.Transport.seconds;
	        } else {
	            time = this.toSeconds(time);
	        }
	        //if it's started, stop it and restart it
	        if (!this.retrigger && this._state.getValueAtTime(time) === Tone.State.Started) {
	            this.stop(time);
	        }
	        this._state.setStateAtTime(Tone.State.Started, time);
	        if (this._synced) {
	            // add the offset time to the event
	            var event = this._state.get(time);
	            event.offset = Tone.defaultArg(offset, 0);
	            event.duration = duration;
	            var sched = Tone.Transport.schedule(function (t) {
	                this._start(t, offset, duration);
	            }.bind(this), time);
	            this._scheduled.push(sched);
	        } else {
	            this._start.apply(this, arguments);
	        }
	        return this;
	    };
	    /**
		 *  Stop the source at the specified time. If no time is given,
		 *  stop the source now.
		 *  @param  {Time} [time=now] When the source should be stopped.
		 *  @returns {Tone.Source} this
		 *  @example
		 * source.stop(); // stops the source immediately
		 */
	    Tone.Source.prototype.stop = function (time) {
	        if (Tone.isUndef(time) && this._synced) {
	            time = Tone.Transport.seconds;
	        } else {
	            time = this.toSeconds(time);
	        }
	        this._state.cancel(time);
	        this._state.setStateAtTime(Tone.State.Stopped, time);
	        if (!this._synced) {
	            this._stop.apply(this, arguments);
	        } else {
	            var sched = Tone.Transport.schedule(this._stop.bind(this), time);
	            this._scheduled.push(sched);
	        }
	        return this;
	    };
	    /**
		 *  Sync the source to the Transport so that all subsequent
		 *  calls to `start` and `stop` are synced to the TransportTime
		 *  instead of the AudioContext time.
		 *
		 *  @returns {Tone.Source} this
		 *  @example
		 * //sync the source so that it plays between 0 and 0.3 on the Transport's timeline
		 * source.sync().start(0).stop(0.3);
		 * //start the transport.
		 * Tone.Transport.start();
		 *
		 *  @example
		 * //start the transport with an offset and the sync'ed sources
		 * //will start in the correct position
		 * source.sync().start(0.1);
		 * //the source will be invoked with an offset of 0.4
		 * Tone.Transport.start("+0.5", 0.5);
		 */
	    Tone.Source.prototype.sync = function () {
	        this._synced = true;
	        this._syncedStart = function (time, offset) {
	            if (offset > 0) {
	                // get the playback state at that time
	                var stateEvent = this._state.get(offset);
	                // listen for start events which may occur in the middle of the sync'ed time
	                if (stateEvent && stateEvent.state === Tone.State.Started && stateEvent.time !== offset) {
	                    // get the offset
	                    var startOffset = offset - this.toSeconds(stateEvent.time);
	                    var duration;
	                    if (stateEvent.duration) {
	                        duration = this.toSeconds(stateEvent.duration) - startOffset;
	                    }
	                    this._start(time, this.toSeconds(stateEvent.offset) + startOffset, duration);
	                }
	            }
	        }.bind(this);
	        this._syncedStop = function (time) {
	            if (this._state.getValueAtTime(Tone.Transport.seconds) === Tone.State.Started) {
	                this._stop(time);
	            }
	        }.bind(this);
	        Tone.Transport.on('start loopStart', this._syncedStart);
	        Tone.Transport.on('stop pause loopEnd', this._syncedStop);
	        return this;
	    };
	    /**
		 *  Unsync the source to the Transport. See Tone.Source.sync
		 *  @returns {Tone.Source} this
		 */
	    Tone.Source.prototype.unsync = function () {
	        if (this._synced) {
	            Tone.Transport.off('stop pause loopEnd', this._syncedStop);
	            Tone.Transport.off('start loopStart', this._syncedStart);
	        }
	        this._synced = false;
	        // clear all of the scheduled ids
	        for (var i = 0; i < this._scheduled.length; i++) {
	            var id = this._scheduled[i];
	            Tone.Transport.clear(id);
	        }
	        this._scheduled = [];
	        this._state.cancel(0);
	        return this;
	    };
	    /**
		 *	Clean up.
		 *  @return {Tone.Source} this
		 */
	    Tone.Source.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this.unsync();
	        this._scheduled = null;
	        this._writable('volume');
	        this._volume.dispose();
	        this._volume = null;
	        this.volume = null;
	        this._state.dispose();
	        this._state = null;
	    };
	    return Tone.Source;
	});
	Module(function (Tone) {
	    
	    /**
		 *  OscillatorNode shim
		 *  @private
		 */
	    if (window.OscillatorNode && !OscillatorNode.prototype.start) {
	        OscillatorNode.prototype.start = OscillatorNode.prototype.noteOn;
	        OscillatorNode.prototype.stop = OscillatorNode.prototype.noteOff;
	        if (!OscillatorNode.prototype.setPeriodicWave) {
	            OscillatorNode.prototype.setPeriodicWave = OscillatorNode.prototype.setWaveTable;
	        }
	        if (!AudioContext.prototype.createPeriodicWave) {
	            AudioContext.prototype.createPeriodicWave = AudioContext.prototype.createWaveTable;
	        }
	    }
	    /**
		 *  @class Tone.Oscillator supports a number of features including
		 *         phase rotation, multiple oscillator types (see Tone.Oscillator.type),
		 *         and Transport syncing (see Tone.Oscillator.syncFrequency).
		 *
		 *  @constructor
		 *  @extends {Tone.Source}
		 *  @param {Frequency} [frequency] Starting frequency
		 *  @param {string} [type] The oscillator type. Read more about type below.
		 *  @example
		 * //make and start a 440hz sine tone
		 * var osc = new Tone.Oscillator(440, "sine").toMaster().start();
		 */
	    Tone.Oscillator = function () {
	        var options = Tone.defaults(arguments, [
	            'frequency',
	            'type'
	        ], Tone.Oscillator);
	        Tone.Source.call(this, options);
	        /**
			 *  the main oscillator
			 *  @type {OscillatorNode}
			 *  @private
			 */
	        this._oscillator = null;
	        /**
			 *  The frequency control.
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.frequency = new Tone.Signal(options.frequency, Tone.Type.Frequency);
	        /**
			 *  The detune control signal.
			 *  @type {Cents}
			 *  @signal
			 */
	        this.detune = new Tone.Signal(options.detune, Tone.Type.Cents);
	        /**
			 *  the periodic wave
			 *  @type {PeriodicWave}
			 *  @private
			 */
	        this._wave = null;
	        /**
			 *  The partials of the oscillator
			 *  @type {Array}
			 *  @private
			 */
	        this._partials = Tone.defaultArg(options.partials, [1]);
	        /**
			 *  the phase of the oscillator
			 *  between 0 - 360
			 *  @type {number}
			 *  @private
			 */
	        this._phase = options.phase;
	        /**
			 *  the type of the oscillator
			 *  @type {string}
			 *  @private
			 */
	        this._type = null;
	        //setup
	        this.type = options.type;
	        this.phase = this._phase;
	        this._readOnly([
	            'frequency',
	            'detune'
	        ]);
	    };
	    Tone.extend(Tone.Oscillator, Tone.Source);
	    /**
		 *  the default parameters
		 *  @type {Object}
		 */
	    Tone.Oscillator.defaults = {
	        'type': 'sine',
	        'frequency': 440,
	        'detune': 0,
	        'phase': 0,
	        'partials': []
	    };
	    /**
		 *  The Oscillator types
		 *  @enum {String}
		 */
	    Tone.Oscillator.Type = {
	        Sine: 'sine',
	        Triangle: 'triangle',
	        Sawtooth: 'sawtooth',
	        Square: 'square',
	        Custom: 'custom'
	    };
	    /**
		 *  start the oscillator
		 *  @param  {Time} [time=now]
		 *  @private
		 */
	    Tone.Oscillator.prototype._start = function (time) {
	        //new oscillator with previous values
	        this._oscillator = this.context.createOscillator();
	        this._oscillator.setPeriodicWave(this._wave);
	        //connect the control signal to the oscillator frequency & detune
	        this._oscillator.connect(this.output);
	        this.frequency.connect(this._oscillator.frequency);
	        this.detune.connect(this._oscillator.detune);
	        //start the oscillator
	        time = this.toSeconds(time);
	        Tone.isPast(time);
	        this._oscillator.start(time);
	    };
	    /**
		 *  stop the oscillator
		 *  @private
		 *  @param  {Time} [time=now] (optional) timing parameter
		 *  @returns {Tone.Oscillator} this
		 */
	    Tone.Oscillator.prototype._stop = function (time) {
	        if (this._oscillator) {
	            time = this.toSeconds(time);
	            Tone.isPast(time);
	            this._oscillator.stop(time);
	            this._oscillator = null;
	        }
	        return this;
	    };
	    /**
		 *  Sync the signal to the Transport's bpm. Any changes to the transports bpm,
		 *  will also affect the oscillators frequency.
		 *  @returns {Tone.Oscillator} this
		 *  @example
		 * Tone.Transport.bpm.value = 120;
		 * osc.frequency.value = 440;
		 * //the ration between the bpm and the frequency will be maintained
		 * osc.syncFrequency();
		 * Tone.Transport.bpm.value = 240;
		 * // the frequency of the oscillator is doubled to 880
		 */
	    Tone.Oscillator.prototype.syncFrequency = function () {
	        Tone.Transport.syncSignal(this.frequency);
	        return this;
	    };
	    /**
		 *  Unsync the oscillator's frequency from the Transport.
		 *  See Tone.Oscillator.syncFrequency
		 *  @returns {Tone.Oscillator} this
		 */
	    Tone.Oscillator.prototype.unsyncFrequency = function () {
	        Tone.Transport.unsyncSignal(this.frequency);
	        return this;
	    };
	    /**
		 * The type of the oscillator: either sine, square, triangle, or sawtooth. Also capable of
		 * setting the first x number of partials of the oscillator. For example: "sine4" would
		 * set be the first 4 partials of the sine wave and "triangle8" would set the first
		 * 8 partials of the triangle wave.
		 * <br><br>
		 * Uses PeriodicWave internally even for native types so that it can set the phase.
		 * PeriodicWave equations are from the
		 * [Webkit Web Audio implementation](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/modules/webaudio/PeriodicWave.cpp&sq=package:chromium).
		 *
		 * @memberOf Tone.Oscillator#
		 * @type {string}
		 * @name type
		 * @example
		 * //set it to a square wave
		 * osc.type = "square";
		 * @example
		 * //set the first 6 partials of a sawtooth wave
		 * osc.type = "sawtooth6";
		 */
	    Object.defineProperty(Tone.Oscillator.prototype, 'type', {
	        get: function () {
	            return this._type;
	        },
	        set: function (type) {
	            var coefs = this._getRealImaginary(type, this._phase);
	            var periodicWave = this.context.createPeriodicWave(coefs[0], coefs[1]);
	            this._wave = periodicWave;
	            if (this._oscillator !== null) {
	                this._oscillator.setPeriodicWave(this._wave);
	            }
	            this._type = type;
	        }
	    });
	    /**
		 *  Returns the real and imaginary components based
		 *  on the oscillator type.
		 *  @returns {Array} [real, imaginary]
		 *  @private
		 */
	    Tone.Oscillator.prototype._getRealImaginary = function (type, phase) {
	        var fftSize = 4096;
	        var periodicWaveSize = fftSize / 2;
	        var real = new Float32Array(periodicWaveSize);
	        var imag = new Float32Array(periodicWaveSize);
	        var partialCount = 1;
	        if (type === Tone.Oscillator.Type.Custom) {
	            partialCount = this._partials.length + 1;
	            periodicWaveSize = partialCount;
	        } else {
	            var partial = /^(sine|triangle|square|sawtooth)(\d+)$/.exec(type);
	            if (partial) {
	                partialCount = parseInt(partial[2]) + 1;
	                type = partial[1];
	                partialCount = Math.max(partialCount, 2);
	                periodicWaveSize = partialCount;
	            }
	        }
	        for (var n = 1; n < periodicWaveSize; ++n) {
	            var piFactor = 2 / (n * Math.PI);
	            var b;
	            switch (type) {
	            case Tone.Oscillator.Type.Sine:
	                b = n <= partialCount ? 1 : 0;
	                break;
	            case Tone.Oscillator.Type.Square:
	                b = n & 1 ? 2 * piFactor : 0;
	                break;
	            case Tone.Oscillator.Type.Sawtooth:
	                b = piFactor * (n & 1 ? 1 : -1);
	                break;
	            case Tone.Oscillator.Type.Triangle:
	                if (n & 1) {
	                    b = 2 * (piFactor * piFactor) * (n - 1 >> 1 & 1 ? -1 : 1);
	                } else {
	                    b = 0;
	                }
	                break;
	            case Tone.Oscillator.Type.Custom:
	                b = this._partials[n - 1];
	                break;
	            default:
	                throw new TypeError('Tone.Oscillator: invalid type: ' + type);
	            }
	            if (b !== 0) {
	                real[n] = -b * Math.sin(phase * n);
	                imag[n] = b * Math.cos(phase * n);
	            } else {
	                real[n] = 0;
	                imag[n] = 0;
	            }
	        }
	        return [
	            real,
	            imag
	        ];
	    };
	    /**
		 *  Compute the inverse FFT for a given phase.
		 *  @param  {Float32Array}  real
		 *  @param  {Float32Array}  imag
		 *  @param  {NormalRange}  phase
		 *  @return  {AudioRange}
		 *  @private
		 */
	    Tone.Oscillator.prototype._inverseFFT = function (real, imag, phase) {
	        var sum = 0;
	        var len = real.length;
	        for (var i = 0; i < len; i++) {
	            sum += real[i] * Math.cos(i * phase) + imag[i] * Math.sin(i * phase);
	        }
	        return sum;
	    };
	    /**
		 *  Returns the initial value of the oscillator.
		 *  @return  {AudioRange}
		 *  @private
		 */
	    Tone.Oscillator.prototype._getInitialValue = function () {
	        var coefs = this._getRealImaginary(this._type, 0);
	        var real = coefs[0];
	        var imag = coefs[1];
	        var maxValue = 0;
	        var twoPi = Math.PI * 2;
	        //check for peaks in 8 places
	        for (var i = 0; i < 8; i++) {
	            maxValue = Math.max(this._inverseFFT(real, imag, i / 8 * twoPi), maxValue);
	        }
	        return -this._inverseFFT(real, imag, this._phase) / maxValue;
	    };
	    /**
		 * The partials of the waveform. A partial represents
		 * the amplitude at a harmonic. The first harmonic is the
		 * fundamental frequency, the second is the octave and so on
		 * following the harmonic series.
		 * Setting this value will automatically set the type to "custom".
		 * The value is an empty array when the type is not "custom".
		 * @memberOf Tone.Oscillator#
		 * @type {Array}
		 * @name partials
		 * @example
		 * osc.partials = [1, 0.2, 0.01];
		 */
	    Object.defineProperty(Tone.Oscillator.prototype, 'partials', {
	        get: function () {
	            if (this._type !== Tone.Oscillator.Type.Custom) {
	                return [];
	            } else {
	                return this._partials;
	            }
	        },
	        set: function (partials) {
	            this._partials = partials;
	            this.type = Tone.Oscillator.Type.Custom;
	        }
	    });
	    /**
		 * The phase of the oscillator in degrees.
		 * @memberOf Tone.Oscillator#
		 * @type {Degrees}
		 * @name phase
		 * @example
		 * osc.phase = 180; //flips the phase of the oscillator
		 */
	    Object.defineProperty(Tone.Oscillator.prototype, 'phase', {
	        get: function () {
	            return this._phase * (180 / Math.PI);
	        },
	        set: function (phase) {
	            this._phase = phase * Math.PI / 180;
	            //reset the type
	            this.type = this._type;
	        }
	    });
	    /**
		 *  Dispose and disconnect.
		 *  @return {Tone.Oscillator} this
		 */
	    Tone.Oscillator.prototype.dispose = function () {
	        Tone.Source.prototype.dispose.call(this);
	        if (this._oscillator !== null) {
	            this._oscillator.disconnect();
	            this._oscillator = null;
	        }
	        this._wave = null;
	        this._writable([
	            'frequency',
	            'detune'
	        ]);
	        this.frequency.dispose();
	        this.frequency = null;
	        this.detune.dispose();
	        this.detune = null;
	        this._partials = null;
	        return this;
	    };
	    return Tone.Oscillator;
	});
	Module(function (Tone) {
	    /**
		 *  @class Tone.Zero outputs 0's at audio-rate. The reason this has to be
		 *         it's own class is that many browsers optimize out Tone.Signal
		 *         with a value of 0 and will not process nodes further down the graph.
		 *  @extends {Tone.SignalBase}
		 */
	    Tone.Zero = function () {
	        Tone.SignalBase.call(this);
	        /**
			 *  The gain node
			 *  @type  {Tone.Gain}
			 *  @private
			 */
	        this._gain = this.input = this.output = new Tone.Gain();
	        this.context.getConstant(0).connect(this._gain);
	    };
	    Tone.extend(Tone.Zero, Tone.SignalBase);
	    /**
		 *  clean up
		 *  @return  {Tone.Zero}  this
		 */
	    Tone.Zero.prototype.dispose = function () {
	        Tone.SignalBase.prototype.dispose.call(this);
	        this._gain.dispose();
	        this._gain = null;
	        return this;
	    };
	    return Tone.Zero;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  LFO stands for low frequency oscillator. Tone.LFO produces an output signal
		 *          which can be attached to an AudioParam or Tone.Signal
		 *          in order to modulate that parameter with an oscillator. The LFO can
		 *          also be synced to the transport to start/stop and change when the tempo changes.
		 *
		 *  @constructor
		 *  @extends {Tone.AudioNode}
		 *  @param {Frequency|Object} [frequency] The frequency of the oscillation. Typically, LFOs will be
		 *                               in the frequency range of 0.1 to 10 hertz.
		 *  @param {number=} min The minimum output value of the LFO.
		 *  @param {number=} max The maximum value of the LFO.
		 *  @example
		 * var lfo = new Tone.LFO("4n", 400, 4000);
		 * lfo.connect(filter.frequency);
		 */
	    Tone.LFO = function () {
	        var options = Tone.defaults(arguments, [
	            'frequency',
	            'min',
	            'max'
	        ], Tone.LFO);
	        Tone.AudioNode.call(this);
	        /**
			 *  The oscillator.
			 *  @type {Tone.Oscillator}
			 *  @private
			 */
	        this._oscillator = new Tone.Oscillator({
	            'frequency': options.frequency,
	            'type': options.type
	        });
	        /**
			 *  the lfo's frequency
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.frequency = this._oscillator.frequency;
	        /**
			 * The amplitude of the LFO, which controls the output range between
			 * the min and max output. For example if the min is -10 and the max
			 * is 10, setting the amplitude to 0.5 would make the LFO modulate
			 * between -5 and 5.
			 * @type {Number}
			 * @signal
			 */
	        this.amplitude = this._oscillator.volume;
	        this.amplitude.units = Tone.Type.NormalRange;
	        this.amplitude.value = options.amplitude;
	        /**
			 *  The signal which is output when the LFO is stopped
			 *  @type  {Tone.Signal}
			 *  @private
			 */
	        this._stoppedSignal = new Tone.Signal(0, Tone.Type.AudioRange);
	        /**
			 *  Just outputs zeros.
			 *  @type {Tone.Zero}
			 *  @private
			 */
	        this._zeros = new Tone.Zero();
	        /**
			 *  The value that the LFO outputs when it's stopped
			 *  @type {AudioRange}
			 *  @private
			 */
	        this._stoppedValue = 0;
	        /**
			 *  @type {Tone.AudioToGain}
			 *  @private
			 */
	        this._a2g = new Tone.AudioToGain();
	        /**
			 *  @type {Tone.Scale}
			 *  @private
			 */
	        this._scaler = this.output = new Tone.Scale(options.min, options.max);
	        /**
			 *  the units of the LFO (used for converting)
			 *  @type {Tone.Type}
			 *  @private
			 */
	        this._units = Tone.Type.Default;
	        this.units = options.units;
	        //connect it up
	        this._oscillator.chain(this._a2g, this._scaler);
	        this._zeros.connect(this._a2g);
	        this._stoppedSignal.connect(this._a2g);
	        this._readOnly([
	            'amplitude',
	            'frequency'
	        ]);
	        this.phase = options.phase;
	    };
	    Tone.extend(Tone.LFO, Tone.AudioNode);
	    /**
		 *  the default parameters
		 *
		 *  @static
		 *  @const
		 *  @type {Object}
		 */
	    Tone.LFO.defaults = {
	        'type': 'sine',
	        'min': 0,
	        'max': 1,
	        'phase': 0,
	        'frequency': '4n',
	        'amplitude': 1,
	        'units': Tone.Type.Default
	    };
	    /**
		 *  Start the LFO.
		 *  @param  {Time} [time=now] the time the LFO will start
		 *  @returns {Tone.LFO} this
		 */
	    Tone.LFO.prototype.start = function (time) {
	        time = this.toSeconds(time);
	        this._stoppedSignal.setValueAtTime(0, time);
	        this._oscillator.start(time);
	        return this;
	    };
	    /**
		 *  Stop the LFO.
		 *  @param  {Time} [time=now] the time the LFO will stop
		 *  @returns {Tone.LFO} this
		 */
	    Tone.LFO.prototype.stop = function (time) {
	        time = this.toSeconds(time);
	        this._stoppedSignal.setValueAtTime(this._stoppedValue, time);
	        this._oscillator.stop(time);
	        return this;
	    };
	    /**
		 *  Sync the start/stop/pause to the transport
		 *  and the frequency to the bpm of the transport
		 *  @returns {Tone.LFO} this
		 *  @example
		 *  lfo.frequency.value = "8n";
		 *  lfo.sync().start(0)
		 *  //the rate of the LFO will always be an eighth note,
		 *  //even as the tempo changes
		 */
	    Tone.LFO.prototype.sync = function () {
	        this._oscillator.sync();
	        this._oscillator.syncFrequency();
	        return this;
	    };
	    /**
		 *  unsync the LFO from transport control
		 *  @returns {Tone.LFO} this
		 */
	    Tone.LFO.prototype.unsync = function () {
	        this._oscillator.unsync();
	        this._oscillator.unsyncFrequency();
	        return this;
	    };
	    /**
		 * The miniumum output of the LFO.
		 * @memberOf Tone.LFO#
		 * @type {number}
		 * @name min
		 */
	    Object.defineProperty(Tone.LFO.prototype, 'min', {
	        get: function () {
	            return this._toUnits(this._scaler.min);
	        },
	        set: function (min) {
	            min = this._fromUnits(min);
	            this._scaler.min = min;
	        }
	    });
	    /**
		 * The maximum output of the LFO.
		 * @memberOf Tone.LFO#
		 * @type {number}
		 * @name max
		 */
	    Object.defineProperty(Tone.LFO.prototype, 'max', {
	        get: function () {
	            return this._toUnits(this._scaler.max);
	        },
	        set: function (max) {
	            max = this._fromUnits(max);
	            this._scaler.max = max;
	        }
	    });
	    /**
		 * The type of the oscillator: sine, square, sawtooth, triangle.
		 * @memberOf Tone.LFO#
		 * @type {string}
		 * @name type
		 */
	    Object.defineProperty(Tone.LFO.prototype, 'type', {
	        get: function () {
	            return this._oscillator.type;
	        },
	        set: function (type) {
	            this._oscillator.type = type;
	            this._stoppedValue = this._oscillator._getInitialValue();
	            this._stoppedSignal.value = this._stoppedValue;
	        }
	    });
	    /**
		 * The phase of the LFO.
		 * @memberOf Tone.LFO#
		 * @type {number}
		 * @name phase
		 */
	    Object.defineProperty(Tone.LFO.prototype, 'phase', {
	        get: function () {
	            return this._oscillator.phase;
	        },
	        set: function (phase) {
	            this._oscillator.phase = phase;
	            this._stoppedValue = this._oscillator._getInitialValue();
	            this._stoppedSignal.value = this._stoppedValue;
	        }
	    });
	    /**
		 * The output units of the LFO.
		 * @memberOf Tone.LFO#
		 * @type {Tone.Type}
		 * @name units
		 */
	    Object.defineProperty(Tone.LFO.prototype, 'units', {
	        get: function () {
	            return this._units;
	        },
	        set: function (val) {
	            var currentMin = this.min;
	            var currentMax = this.max;
	            //convert the min and the max
	            this._units = val;
	            this.min = currentMin;
	            this.max = currentMax;
	        }
	    });
	    /**
		 * Mute the output.
		 * @memberOf Tone.LFO#
		 * @type {Boolean}
		 * @name mute
		 */
	    Object.defineProperty(Tone.LFO.prototype, 'mute', {
	        get: function () {
	            return this._oscillator.mute;
	        },
	        set: function (mute) {
	            this._oscillator.mute = mute;
	        }
	    });
	    /**
		 *  Returns the playback state of the source, either "started" or "stopped".
		 *  @type {Tone.State}
		 *  @readOnly
		 *  @memberOf Tone.LFO#
		 *  @name state
		 */
	    Object.defineProperty(Tone.LFO.prototype, 'state', {
	        get: function () {
	            return this._oscillator.state;
	        }
	    });
	    /**
		 *  Connect the output of the LFO to an AudioParam, AudioNode, or Tone Node.
		 *  Tone.LFO will automatically convert to the destination units of the
		 *  will get the units from the connected node.
		 *  @param  {Tone | AudioParam | AudioNode} node
		 *  @param {number} [outputNum=0] optionally which output to connect from
		 *  @param {number} [inputNum=0] optionally which input to connect to
		 *  @returns {Tone.LFO} this
		 *  @private
		 */
	    Tone.LFO.prototype.connect = function (node) {
	        if (node.constructor === Tone.Signal || node.constructor === Tone.Param || node.constructor === Tone.TimelineSignal) {
	            this.convert = node.convert;
	            this.units = node.units;
	        }
	        Tone.Signal.prototype.connect.apply(this, arguments);
	        return this;
	    };
	    /**
		 *  private method borrowed from Param converts
		 *  units from their destination value
		 *  @function
		 *  @private
		 */
	    Tone.LFO.prototype._fromUnits = Tone.Param.prototype._fromUnits;
	    /**
		 *  private method borrowed from Param converts
		 *  units to their destination value
		 *  @function
		 *  @private
		 */
	    Tone.LFO.prototype._toUnits = Tone.Param.prototype._toUnits;
	    /**
		 *  disconnect and dispose
		 *  @returns {Tone.LFO} this
		 */
	    Tone.LFO.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._writable([
	            'amplitude',
	            'frequency'
	        ]);
	        this._oscillator.dispose();
	        this._oscillator = null;
	        this._stoppedSignal.dispose();
	        this._stoppedSignal = null;
	        this._zeros.dispose();
	        this._zeros = null;
	        this._scaler.dispose();
	        this._scaler = null;
	        this._a2g.dispose();
	        this._a2g = null;
	        this.frequency = null;
	        this.amplitude = null;
	        return this;
	    };
	    return Tone.LFO;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.Limiter will limit the loudness of an incoming signal.
		 *         It is composed of a Tone.Compressor with a fast attack
		 *         and release. Limiters are commonly used to safeguard against
		 *         signal clipping. Unlike a compressor, limiters do not provide
		 *         smooth gain reduction and almost completely prevent
		 *         additional gain above the threshold.
		 *
		 *  @extends {Tone.AudioNode}
		 *  @constructor
		 *  @param {number} threshold The theshold above which the limiting is applied.
		 *  @example
		 *  var limiter = new Tone.Limiter(-6);
		 */
	    Tone.Limiter = function () {
	        var options = Tone.defaults(arguments, ['threshold'], Tone.Limiter);
	        Tone.AudioNode.call(this);
	        /**
			 *  the compressor
			 *  @private
			 *  @type {Tone.Compressor}
			 */
	        this._compressor = this.input = this.output = new Tone.Compressor({
	            'attack': 0.001,
	            'decay': 0.001,
	            'threshold': options.threshold
	        });
	        /**
			 * The threshold of of the limiter
			 * @type {Decibel}
			 * @signal
			 */
	        this.threshold = this._compressor.threshold;
	        this._readOnly('threshold');
	    };
	    Tone.extend(Tone.Limiter, Tone.AudioNode);
	    /**
		 *  The default value
		 *  @type {Object}
		 *  @const
		 *  @static
		 */
	    Tone.Limiter.defaults = { 'threshold': -12 };
	    /**
		 *  Clean up.
		 *  @returns {Tone.Limiter} this
		 */
	    Tone.Limiter.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._compressor.dispose();
	        this._compressor = null;
	        this._writable('threshold');
	        this.threshold = null;
	        return this;
	    };
	    return Tone.Limiter;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.Lowpass is a lowpass feedback comb filter. It is similar to
		 *         Tone.FeedbackCombFilter, but includes a lowpass filter.
		 *
		 *  @extends {Tone.AudioNode}
		 *  @constructor
		 *  @param {Time|Object} [delayTime] The delay time of the comb filter
		 *  @param {NormalRange=} resonance The resonance (feedback) of the comb filter
		 *  @param {Frequency=} dampening The cutoff of the lowpass filter dampens the
		 *                                signal as it is fedback.
		 */
	    Tone.LowpassCombFilter = function () {
	        var options = Tone.defaults(arguments, [
	            'delayTime',
	            'resonance',
	            'dampening'
	        ], Tone.LowpassCombFilter);
	        Tone.AudioNode.call(this);
	        this.createInsOuts(1, 1);
	        /**
			 *  the delay node
			 *  @type {DelayNode}
			 *  @private
			 */
	        this._delay = this.input = new Tone.Delay(options.delayTime);
	        /**
			 *  The delayTime of the comb filter.
			 *  @type {Time}
			 *  @signal
			 */
	        this.delayTime = this._delay.delayTime;
	        /**
			 *  the lowpass filter
			 *  @type  {BiquadFilterNode}
			 *  @private
			 */
	        this._lowpass = this.output = this.context.createBiquadFilter();
	        this._lowpass.Q.value = -3.0102999566398125;
	        this._lowpass.type = 'lowpass';
	        /**
			 *  The dampening control of the feedback
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.dampening = new Tone.Param({
	            'param': this._lowpass.frequency,
	            'units': Tone.Type.Frequency,
	            'value': options.dampening
	        });
	        /**
			 *  the feedback gain
			 *  @type {Tone.Gain}
			 *  @private
			 */
	        this._feedback = new Tone.Gain(options.resonance, Tone.Type.NormalRange);
	        /**
			 *  The amount of feedback of the delayed signal.
			 *  @type {NormalRange}
			 *  @signal
			 */
	        this.resonance = this._feedback.gain;
	        //connections
	        this._delay.chain(this._lowpass, this._feedback, this._delay);
	        this._readOnly([
	            'dampening',
	            'resonance',
	            'delayTime'
	        ]);
	    };
	    Tone.extend(Tone.LowpassCombFilter, Tone.AudioNode);
	    /**
		 *  the default parameters
		 *  @static
		 *  @const
		 *  @type {Object}
		 */
	    Tone.LowpassCombFilter.defaults = {
	        'delayTime': 0.1,
	        'resonance': 0.5,
	        'dampening': 3000
	    };
	    /**
		 *  Clean up.
		 *  @returns {Tone.LowpassCombFilter} this
		 */
	    Tone.LowpassCombFilter.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._writable([
	            'dampening',
	            'resonance',
	            'delayTime'
	        ]);
	        this.dampening.dispose();
	        this.dampening = null;
	        this.resonance.dispose();
	        this.resonance = null;
	        this._delay.dispose();
	        this._delay = null;
	        this.delayTime = null;
	        this._lowpass.disconnect();
	        this._lowpass = null;
	        this._feedback.disconnect();
	        this._feedback = null;
	        return this;
	    };
	    return Tone.LowpassCombFilter;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Tone.Merge brings two signals into the left and right
		 *          channels of a single stereo channel.
		 *
		 *  @constructor
		 *  @extends {Tone.AudioNode}
		 *  @example
		 * var merge = new Tone.Merge().toMaster();
		 * //routing a sine tone in the left channel
		 * //and noise in the right channel
		 * var osc = new Tone.Oscillator().connect(merge.left);
		 * var noise = new Tone.Noise().connect(merge.right);
		 * //starting our oscillators
		 * noise.start();
		 * osc.start();
		 */
	    Tone.Merge = function () {
	        Tone.AudioNode.call(this);
	        this.createInsOuts(2, 0);
	        /**
			 *  The left input channel.
			 *  Alias for <code>input[0]</code>
			 *  @type {GainNode}
			 */
	        this.left = this.input[0] = new Tone.Gain();
	        /**
			 *  The right input channel.
			 *  Alias for <code>input[1]</code>.
			 *  @type {GainNode}
			 */
	        this.right = this.input[1] = new Tone.Gain();
	        /**
			 *  the merger node for the two channels
			 *  @type {ChannelMergerNode}
			 *  @private
			 */
	        this._merger = this.output = this.context.createChannelMerger(2);
	        //connections
	        this.left.connect(this._merger, 0, 0);
	        this.right.connect(this._merger, 0, 1);
	        this.left.channelCount = 1;
	        this.right.channelCount = 1;
	        this.left.channelCountMode = 'explicit';
	        this.right.channelCountMode = 'explicit';
	    };
	    Tone.extend(Tone.Merge, Tone.AudioNode);
	    /**
		 *  Clean up.
		 *  @returns {Tone.Merge} this
		 */
	    Tone.Merge.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this.left.dispose();
	        this.left = null;
	        this.right.dispose();
	        this.right = null;
	        this._merger.disconnect();
	        this._merger = null;
	        return this;
	    };
	    return Tone.Merge;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Tone.Meter gets the [RMS](https://en.wikipedia.org/wiki/Root_mean_square)
		 *          of an input signal with some averaging applied. It can also get the raw
		 *          value of the input signal.
		 *
		 *  @constructor
		 *  @extends {Tone.AudioNode}
		 *  @param {Number} smoothing The amount of smoothing applied between frames.
		 *  @example
		 * var meter = new Tone.Meter();
		 * var mic = new Tone.UserMedia().open();
		 * //connect mic to the meter
		 * mic.connect(meter);
		 * //the current level of the mic input in decibels
		 * var level = meter.getValue();
		 */
	    Tone.Meter = function () {
	        var options = Tone.defaults(arguments, ['smoothing'], Tone.Meter);
	        Tone.AudioNode.call(this);
	        /**
			 *  The analyser node which computes the levels.
			 *  @private
			 *  @type  {Tone.Analyser}
			 */
	        this.input = this.output = this._analyser = new Tone.Analyser('waveform', 1024);
	        /**
			 *  The amount of carryover between the current and last frame.
			 *  Only applied meter for "level" type.
			 *  @type  {Number}
			 */
	        this.smoothing = options.smoothing;
	    };
	    Tone.extend(Tone.Meter, Tone.AudioNode);
	    /**
		 *  The defaults
		 *  @type {Object}
		 *  @static
		 *  @const
		 */
	    Tone.Meter.defaults = { 'smoothing': 0.8 };
	    /**
		 *  Get the current decibel value of the incoming signal
		 *  @returns {Decibels}
		 */
	    Tone.Meter.prototype.getLevel = function () {
	        this._analyser.type = 'fft';
	        var values = this._analyser.getValue();
	        var offset = 28;
	        // normalizes most signal levels
	        // TODO: compute loudness from FFT
	        return Math.max.apply(this, values) + offset;
	    };
	    /**
		 *  Get the signal value of the incoming signal
		 *  @returns {Number}
		 */
	    Tone.Meter.prototype.getValue = function () {
	        this._analyser.type = 'waveform';
	        var value = this._analyser.getValue();
	        return value[0];
	    };
	    /**
		 * A value from 0 -> 1 where 0 represents no time averaging with the last analysis frame.
		 * @memberOf Tone.Meter#
		 * @type {Number}
		 * @name smoothing
		 * @readOnly
		 */
	    Object.defineProperty(Tone.Meter.prototype, 'smoothing', {
	        get: function () {
	            return this._analyser.smoothing;
	        },
	        set: function (val) {
	            this._analyser.smoothing = val;
	        }
	    });
	    /**
		 *  Clean up.
		 *  @returns {Tone.Meter} this
		 */
	    Tone.Meter.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._analyser.dispose();
	        this._analyser = null;
	        return this;
	    };
	    return Tone.Meter;
	});
	Module(function (Tone) {
	    
	    /**
		 *	@class  Tone.Split splits an incoming signal into left and right channels.
		 *
		 *  @constructor
		 *  @extends {Tone.AudioNode}
		 *  @example
		 * var split = new Tone.Split();
		 * stereoSignal.connect(split);
		 */
	    Tone.Split = function () {
	        Tone.AudioNode.call(this);
	        this.createInsOuts(0, 2);
	        /**
			 *  @type {ChannelSplitterNode}
			 *  @private
			 */
	        this._splitter = this.input = this.context.createChannelSplitter(2);
	        this._splitter.channelCount = 2;
	        this._splitter.channelCountMode = 'explicit';
	        /**
			 *  Left channel output.
			 *  Alias for <code>output[0]</code>
			 *  @type {Tone.Gain}
			 */
	        this.left = this.output[0] = new Tone.Gain();
	        /**
			 *  Right channel output.
			 *  Alias for <code>output[1]</code>
			 *  @type {Tone.Gain}
			 */
	        this.right = this.output[1] = new Tone.Gain();
	        //connections
	        this._splitter.connect(this.left, 0, 0);
	        this._splitter.connect(this.right, 1, 0);
	    };
	    Tone.extend(Tone.Split, Tone.AudioNode);
	    /**
		 *  Clean up.
		 *  @returns {Tone.Split} this
		 */
	    Tone.Split.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._splitter.disconnect();
	        this.left.dispose();
	        this.left = null;
	        this.right.dispose();
	        this.right = null;
	        this._splitter = null;
	        return this;
	    };
	    return Tone.Split;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Mid/Side processing separates the the 'mid' signal
		 *         (which comes out of both the left and the right channel)
		 *         and the 'side' (which only comes out of the the side channels). <br><br>
		 *         <code>
		 *         Mid = (Left+Right)/sqrt(2);   // obtain mid-signal from left and right<br>
		 *         Side = (Left-Right)/sqrt(2);   // obtain side-signal from left and righ<br>
		 *         </code>
		 *
		 *  @extends {Tone.AudioNode}
		 *  @constructor
		 */
	    Tone.MidSideSplit = function () {
	        Tone.AudioNode.call(this);
	        this.createInsOuts(0, 2);
	        /**
			 *  split the incoming signal into left and right channels
			 *  @type  {Tone.Split}
			 *  @private
			 */
	        this._split = this.input = new Tone.Split();
	        /**
			 *  The mid send. Connect to mid processing. Alias for
			 *  <code>output[0]</code>
			 *  @type {Tone.Expr}
			 */
	        this.mid = this.output[0] = new Tone.Expr('($0 + $1) * $2');
	        /**
			 *  The side output. Connect to side processing. Alias for
			 *  <code>output[1]</code>
			 *  @type {Tone.Expr}
			 */
	        this.side = this.output[1] = new Tone.Expr('($0 - $1) * $2');
	        this._split.connect(this.mid, 0, 0);
	        this._split.connect(this.mid, 1, 1);
	        this._split.connect(this.side, 0, 0);
	        this._split.connect(this.side, 1, 1);
	        this.context.getConstant(Math.SQRT1_2).connect(this.mid, 0, 2);
	        this.context.getConstant(Math.SQRT1_2).connect(this.side, 0, 2);
	    };
	    Tone.extend(Tone.MidSideSplit, Tone.AudioNode);
	    /**
		 *  clean up
		 *  @returns {Tone.MidSideSplit} this
		 */
	    Tone.MidSideSplit.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this.mid.dispose();
	        this.mid = null;
	        this.side.dispose();
	        this.side = null;
	        this._split.dispose();
	        this._split = null;
	        return this;
	    };
	    return Tone.MidSideSplit;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Mid/Side processing separates the the 'mid' signal
		 *         (which comes out of both the left and the right channel)
		 *         and the 'side' (which only comes out of the the side channels).
		 *         MidSideMerge merges the mid and side signal after they've been seperated
		 *         by Tone.MidSideSplit.<br><br>
		 *         <code>
		 *         Left = (Mid+Side)/sqrt(2);   // obtain left signal from mid and side<br>
		 *         Right = (Mid-Side)/sqrt(2);   // obtain right signal from mid and side<br>
		 *         </code>
		 *
		 *  @extends {Tone.AudioNode}
		 *  @constructor
		 */
	    Tone.MidSideMerge = function () {
	        Tone.AudioNode.call(this);
	        this.createInsOuts(2, 0);
	        /**
			 *  The mid signal input. Alias for
			 *  <code>input[0]</code>
			 *  @type  {Tone.Gain}
			 */
	        this.mid = this.input[0] = new Tone.Gain();
	        /**
			 *  recombine the mid/side into Left
			 *  @type {Tone.Expr}
			 *  @private
			 */
	        this._left = new Tone.Expr('($0 + $1) * $2');
	        /**
			 *  The side signal input. Alias for
			 *  <code>input[1]</code>
			 *  @type  {Tone.Gain}
			 */
	        this.side = this.input[1] = new Tone.Gain();
	        /**
			 *  recombine the mid/side into Right
			 *  @type {Tone.Expr}
			 *  @private
			 */
	        this._right = new Tone.Expr('($0 - $1) * $2');
	        /**
			 *  Merge the left/right signal back into a stereo signal.
			 *  @type {Tone.Merge}
			 *  @private
			 */
	        this._merge = this.output = new Tone.Merge();
	        this.mid.connect(this._left, 0, 0);
	        this.side.connect(this._left, 0, 1);
	        this.mid.connect(this._right, 0, 0);
	        this.side.connect(this._right, 0, 1);
	        this._left.connect(this._merge, 0, 0);
	        this._right.connect(this._merge, 0, 1);
	        this.context.getConstant(Math.SQRT1_2).connect(this._left, 0, 2);
	        this.context.getConstant(Math.SQRT1_2).connect(this._right, 0, 2);
	    };
	    Tone.extend(Tone.MidSideMerge, Tone.AudioNode);
	    /**
		 *  clean up
		 *  @returns {Tone.MidSideMerge} this
		 */
	    Tone.MidSideMerge.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this.mid.dispose();
	        this.mid = null;
	        this.side.dispose();
	        this.side = null;
	        this._left.dispose();
	        this._left = null;
	        this._right.dispose();
	        this._right = null;
	        this._merge.dispose();
	        this._merge = null;
	        return this;
	    };
	    return Tone.MidSideMerge;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.MidSideCompressor applies two different compressors to the mid
		 *         and side signal components. See Tone.MidSideSplit.
		 *
		 *  @extends {Tone.AudioNode}
		 *  @param {Object} options The options that are passed to the mid and side
		 *                          compressors.
		 *  @constructor
		 */
	    Tone.MidSideCompressor = function (options) {
	        Tone.AudioNode.call(this);
	        options = Tone.defaultArg(options, Tone.MidSideCompressor.defaults);
	        /**
			 *  the mid/side split
			 *  @type  {Tone.MidSideSplit}
			 *  @private
			 */
	        this._midSideSplit = this.input = new Tone.MidSideSplit();
	        /**
			 *  the mid/side recombination
			 *  @type  {Tone.MidSideMerge}
			 *  @private
			 */
	        this._midSideMerge = this.output = new Tone.MidSideMerge();
	        /**
			 *  The compressor applied to the mid signal
			 *  @type  {Tone.Compressor}
			 */
	        this.mid = new Tone.Compressor(options.mid);
	        /**
			 *  The compressor applied to the side signal
			 *  @type  {Tone.Compressor}
			 */
	        this.side = new Tone.Compressor(options.side);
	        this._midSideSplit.mid.chain(this.mid, this._midSideMerge.mid);
	        this._midSideSplit.side.chain(this.side, this._midSideMerge.side);
	        this._readOnly([
	            'mid',
	            'side'
	        ]);
	    };
	    Tone.extend(Tone.MidSideCompressor, Tone.AudioNode);
	    /**
		 *  @const
		 *  @static
		 *  @type {Object}
		 */
	    Tone.MidSideCompressor.defaults = {
	        'mid': {
	            'ratio': 3,
	            'threshold': -24,
	            'release': 0.03,
	            'attack': 0.02,
	            'knee': 16
	        },
	        'side': {
	            'ratio': 6,
	            'threshold': -30,
	            'release': 0.25,
	            'attack': 0.03,
	            'knee': 10
	        }
	    };
	    /**
		 *  Clean up.
		 *  @returns {Tone.MidSideCompressor} this
		 */
	    Tone.MidSideCompressor.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._writable([
	            'mid',
	            'side'
	        ]);
	        this.mid.dispose();
	        this.mid = null;
	        this.side.dispose();
	        this.side = null;
	        this._midSideSplit.dispose();
	        this._midSideSplit = null;
	        this._midSideMerge.dispose();
	        this._midSideMerge = null;
	        return this;
	    };
	    return Tone.MidSideCompressor;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.Mono coerces the incoming mono or stereo signal into a mono signal
		 *         where both left and right channels have the same value. This can be useful
		 *         for [stereo imaging](https://en.wikipedia.org/wiki/Stereo_imaging).
		 *
		 *  @extends {Tone.AudioNode}
		 *  @constructor
		 */
	    Tone.Mono = function () {
	        Tone.AudioNode.call(this);
	        this.createInsOuts(1, 0);
	        /**
			 *  merge the signal
			 *  @type {Tone.Merge}
			 *  @private
			 */
	        this._merge = this.output = new Tone.Merge();
	        this.input.connect(this._merge, 0, 0);
	        this.input.connect(this._merge, 0, 1);
	        this.input.gain.value = Tone.dbToGain(-10);
	    };
	    Tone.extend(Tone.Mono);
	    /**
		 *  clean up
		 *  @returns {Tone.Mono} this
		 */
	    Tone.Mono.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._merge.dispose();
	        this._merge = null;
	        return this;
	    };
	    return Tone.Mono;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class A compressor with seperate controls over low/mid/high dynamics
		 *
		 *  @extends {Tone.AudioNode}
		 *  @constructor
		 *  @param {Object} options The low/mid/high compressor settings.
		 *  @example
		 *  var multiband = new Tone.MultibandCompressor({
		 *  	"lowFrequency" : 200,
		 *  	"highFrequency" : 1300
		 *  	"low" : {
		 *  		"threshold" : -12
		 *  	}
		 *  })
		 */
	    Tone.MultibandCompressor = function (options) {
	        Tone.AudioNode.call(this);
	        options = Tone.defaultArg(arguments, Tone.MultibandCompressor.defaults);
	        /**
			 *  split the incoming signal into high/mid/low
			 *  @type {Tone.MultibandSplit}
			 *  @private
			 */
	        this._splitter = this.input = new Tone.MultibandSplit({
	            'lowFrequency': options.lowFrequency,
	            'highFrequency': options.highFrequency
	        });
	        /**
			 *  low/mid crossover frequency.
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.lowFrequency = this._splitter.lowFrequency;
	        /**
			 *  mid/high crossover frequency.
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.highFrequency = this._splitter.highFrequency;
	        /**
			 *  the output
			 *  @type {Tone.Gain}
			 *  @private
			 */
	        this.output = new Tone.Gain();
	        /**
			 *  The compressor applied to the low frequencies.
			 *  @type {Tone.Compressor}
			 */
	        this.low = new Tone.Compressor(options.low);
	        /**
			 *  The compressor applied to the mid frequencies.
			 *  @type {Tone.Compressor}
			 */
	        this.mid = new Tone.Compressor(options.mid);
	        /**
			 *  The compressor applied to the high frequencies.
			 *  @type {Tone.Compressor}
			 */
	        this.high = new Tone.Compressor(options.high);
	        //connect the compressor
	        this._splitter.low.chain(this.low, this.output);
	        this._splitter.mid.chain(this.mid, this.output);
	        this._splitter.high.chain(this.high, this.output);
	        this._readOnly([
	            'high',
	            'mid',
	            'low',
	            'highFrequency',
	            'lowFrequency'
	        ]);
	    };
	    Tone.extend(Tone.MultibandCompressor, Tone.AudioNode);
	    /**
		 *  @const
		 *  @static
		 *  @type {Object}
		 */
	    Tone.MultibandCompressor.defaults = {
	        'low': Tone.Compressor.defaults,
	        'mid': Tone.Compressor.defaults,
	        'high': Tone.Compressor.defaults,
	        'lowFrequency': 250,
	        'highFrequency': 2000
	    };
	    /**
		 *  clean up
		 *  @returns {Tone.MultibandCompressor} this
		 */
	    Tone.MultibandCompressor.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._splitter.dispose();
	        this._writable([
	            'high',
	            'mid',
	            'low',
	            'highFrequency',
	            'lowFrequency'
	        ]);
	        this.low.dispose();
	        this.mid.dispose();
	        this.high.dispose();
	        this._splitter = null;
	        this.low = null;
	        this.mid = null;
	        this.high = null;
	        this.lowFrequency = null;
	        this.highFrequency = null;
	        return this;
	    };
	    return Tone.MultibandCompressor;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Tone.Panner is an equal power Left/Right Panner and does not
		 *          support 3D. Panner uses the StereoPannerNode when available.
		 *
		 *  @constructor
		 *  @extends {Tone.AudioNode}
		 *  @param {NormalRange} [initialPan=0] The initail panner value (center).
		 *  @example
		 *  //pan the input signal hard right.
		 *  var panner = new Tone.Panner(1);
		 */
	    Tone.Panner = function (initialPan) {
	        Tone.AudioNode.call(this);
	        if (Tone.Panner.hasStereoPanner) {
	            /**
				 *  the panner node
				 *  @type {StereoPannerNode}
				 *  @private
				 */
	            this._panner = this.input = this.output = this.context.createStereoPanner();
	            /**
				 *  The pan control. -1 = hard left, 1 = hard right.
				 *  @type {NormalRange}
				 *  @signal
				 */
	            this.pan = this._panner.pan;
	        } else {
	            /**
				 *  the dry/wet knob
				 *  @type {Tone.CrossFade}
				 *  @private
				 */
	            this._crossFade = new Tone.CrossFade();
	            /**
				 *  @type {Tone.Merge}
				 *  @private
				 */
	            this._merger = this.output = new Tone.Merge();
	            /**
				 *  @type {Tone.Split}
				 *  @private
				 */
	            this._splitter = this.input = new Tone.Split();
	            /**
				 *  The pan control. -1 = hard left, 1 = hard right.
				 *  @type {AudioRange}
				 *  @signal
				 */
	            this.pan = new Tone.Signal(0, Tone.Type.AudioRange);
	            /**
				 *  always sends 0
				 *  @type {Tone.Zero}
				 *  @private
				 */
	            this._zero = new Tone.Zero();
	            /**
				 *  The analog to gain conversion
				 *  @type  {Tone.AudioToGain}
				 *  @private
				 */
	            this._a2g = new Tone.AudioToGain();
	            //CONNECTIONS:
	            this._zero.connect(this._a2g);
	            this.pan.chain(this._a2g, this._crossFade.fade);
	            //left channel is a, right channel is b
	            this._splitter.connect(this._crossFade, 0, 0);
	            this._splitter.connect(this._crossFade, 1, 1);
	            //merge it back together
	            this._crossFade.a.connect(this._merger, 0, 0);
	            this._crossFade.b.connect(this._merger, 0, 1);
	        }
	        //initial value
	        this.pan.value = Tone.defaultArg(initialPan, 0);
	        this._readOnly('pan');
	    };
	    Tone.extend(Tone.Panner, Tone.AudioNode);
	    /**
		 *  Indicates if the panner is using the new StereoPannerNode internally
		 *  @type  {Boolean}
		 *  @static
		 *  @private
		 *  @readOnly
		 */
	    Tone.Panner.hasStereoPanner = Tone.context && Tone.isFunction(Tone.context.createStereoPanner);
	    /**
		 *  Clean up.
		 *  @returns {Tone.Panner} this
		 */
	    Tone.Panner.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._writable('pan');
	        if (Tone.Panner.hasStereoPanner) {
	            this._panner.disconnect();
	            this._panner = null;
	            this.pan = null;
	        } else {
	            this._zero.dispose();
	            this._zero = null;
	            this._crossFade.dispose();
	            this._crossFade = null;
	            this._splitter.dispose();
	            this._splitter = null;
	            this._merger.dispose();
	            this._merger = null;
	            this.pan.dispose();
	            this.pan = null;
	            this._a2g.dispose();
	            this._a2g = null;
	        }
	        return this;
	    };
	    return Tone.Panner;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  A spatialized panner node which supports equalpower or HRTF panning.
		 *          Tries to normalize the API across various browsers. See Tone.Listener
		 *
		 *  @constructor
		 *  @extends {Tone.AudioNode}
		 *  @param {Number} positionX The initial x position.
		 *  @param {Number} positionY The initial y position.
		 *  @param {Number} positionZ The initial z position.
		 */
	    Tone.Panner3D = function () {
	        var options = Tone.defaults(arguments, [
	            'positionX',
	            'positionY',
	            'positionZ'
	        ], Tone.Panner3D);
	        Tone.AudioNode.call(this);
	        /**
			 *  The panner node
			 *  @type {PannerNode}
			 *  @private
			 */
	        this._panner = this.input = this.output = this.context.createPanner();
	        //set some values
	        this._panner.panningModel = options.panningModel;
	        this._panner.maxDistance = options.maxDistance;
	        this._panner.distanceModel = options.distanceModel;
	        this._panner.coneOuterGain = options.coneOuterGain;
	        this._panner.coneOuterAngle = options.coneOuterAngle;
	        this._panner.coneInnerAngle = options.coneInnerAngle;
	        this._panner.refDistance = options.refDistance;
	        this._panner.rolloffFactor = options.rolloffFactor;
	        /**
			 *  Holds the current orientation
			 *  @type  {Array}
			 *  @private
			 */
	        this._orientation = [
	            options.orientationX,
	            options.orientationY,
	            options.orientationZ
	        ];
	        /**
			 *  Holds the current position
			 *  @type  {Array}
			 *  @private
			 */
	        this._position = [
	            options.positionX,
	            options.positionY,
	            options.positionZ
	        ];
	        // set the default position/orientation
	        this.orientationX = options.orientationX;
	        this.orientationY = options.orientationY;
	        this.orientationZ = options.orientationZ;
	        this.positionX = options.positionX;
	        this.positionY = options.positionY;
	        this.positionZ = options.positionZ;
	    };
	    Tone.extend(Tone.Panner3D, Tone.AudioNode);
	    /**
		 *  Defaults according to the specification
		 *  @static
		 *  @const
		 *  @type {Object}
		 */
	    Tone.Panner3D.defaults = {
	        'positionX': 0,
	        'positionY': 0,
	        'positionZ': 0,
	        'orientationX': 0,
	        'orientationY': 0,
	        'orientationZ': 0,
	        'panningModel': 'equalpower',
	        'maxDistance': 10000,
	        'distanceModel': 'inverse',
	        'coneOuterGain': 0,
	        'coneOuterAngle': 360,
	        'coneInnerAngle': 360,
	        'refDistance': 1,
	        'rolloffFactor': 1
	    };
	    /**
		 * The ramp time which is applied to the setTargetAtTime
		 * @type {Number}
		 * @private
		 */
	    Tone.Panner3D.prototype._rampTimeConstant = 0.01;
	    /**
		 *  Sets the position of the source in 3d space.
		 *  @param  {Number}  x
		 *  @param  {Number}  y
		 *  @param  {Number}  z
		 *  @return {Tone.Panner3D} this
		 */
	    Tone.Panner3D.prototype.setPosition = function (x, y, z) {
	        if (this._panner.positionX) {
	            var now = this.now();
	            this._panner.positionX.setTargetAtTime(x, now, this._rampTimeConstant);
	            this._panner.positionY.setTargetAtTime(y, now, this._rampTimeConstant);
	            this._panner.positionZ.setTargetAtTime(z, now, this._rampTimeConstant);
	        } else {
	            this._panner.setPosition(x, y, z);
	        }
	        this._position = Array.prototype.slice.call(arguments);
	        return this;
	    };
	    /**
		 *  Sets the orientation of the source in 3d space.
		 *  @param  {Number}  x
		 *  @param  {Number}  y
		 *  @param  {Number}  z
		 *  @return {Tone.Panner3D} this
		 */
	    Tone.Panner3D.prototype.setOrientation = function (x, y, z) {
	        if (this._panner.orientationX) {
	            var now = this.now();
	            this._panner.orientationX.setTargetAtTime(x, now, this._rampTimeConstant);
	            this._panner.orientationY.setTargetAtTime(y, now, this._rampTimeConstant);
	            this._panner.orientationZ.setTargetAtTime(z, now, this._rampTimeConstant);
	        } else {
	            this._panner.setOrientation(x, y, z);
	        }
	        this._orientation = Array.prototype.slice.call(arguments);
	        return this;
	    };
	    /**
		 *  The x position of the panner object.
		 *  @type {Number}
		 *  @memberOf Tone.Panner3D#
		 *  @name positionX
		 */
	    Object.defineProperty(Tone.Panner3D.prototype, 'positionX', {
	        set: function (pos) {
	            this._position[0] = pos;
	            this.setPosition.apply(this, this._position);
	        },
	        get: function () {
	            return this._position[0];
	        }
	    });
	    /**
		 *  The y position of the panner object.
		 *  @type {Number}
		 *  @memberOf Tone.Panner3D#
		 *  @name positionY
		 */
	    Object.defineProperty(Tone.Panner3D.prototype, 'positionY', {
	        set: function (pos) {
	            this._position[1] = pos;
	            this.setPosition.apply(this, this._position);
	        },
	        get: function () {
	            return this._position[1];
	        }
	    });
	    /**
		 *  The z position of the panner object.
		 *  @type {Number}
		 *  @memberOf Tone.Panner3D#
		 *  @name positionZ
		 */
	    Object.defineProperty(Tone.Panner3D.prototype, 'positionZ', {
	        set: function (pos) {
	            this._position[2] = pos;
	            this.setPosition.apply(this, this._position);
	        },
	        get: function () {
	            return this._position[2];
	        }
	    });
	    /**
		 *  The x orientation of the panner object.
		 *  @type {Number}
		 *  @memberOf Tone.Panner3D#
		 *  @name orientationX
		 */
	    Object.defineProperty(Tone.Panner3D.prototype, 'orientationX', {
	        set: function (pos) {
	            this._orientation[0] = pos;
	            this.setOrientation.apply(this, this._orientation);
	        },
	        get: function () {
	            return this._orientation[0];
	        }
	    });
	    /**
		 *  The y orientation of the panner object.
		 *  @type {Number}
		 *  @memberOf Tone.Panner3D#
		 *  @name orientationY
		 */
	    Object.defineProperty(Tone.Panner3D.prototype, 'orientationY', {
	        set: function (pos) {
	            this._orientation[1] = pos;
	            this.setOrientation.apply(this, this._orientation);
	        },
	        get: function () {
	            return this._orientation[1];
	        }
	    });
	    /**
		 *  The z orientation of the panner object.
		 *  @type {Number}
		 *  @memberOf Tone.Panner3D#
		 *  @name orientationZ
		 */
	    Object.defineProperty(Tone.Panner3D.prototype, 'orientationZ', {
	        set: function (pos) {
	            this._orientation[2] = pos;
	            this.setOrientation.apply(this, this._orientation);
	        },
	        get: function () {
	            return this._orientation[2];
	        }
	    });
	    /**
		 *  Proxy a property on the panner to an exposed public propery
		 *  @param  {String}  prop
		 *  @private
		 */
	    Tone.Panner3D._aliasProperty = function (prop) {
	        Object.defineProperty(Tone.Panner3D.prototype, prop, {
	            set: function (val) {
	                this._panner[prop] = val;
	            },
	            get: function () {
	                return this._panner[prop];
	            }
	        });
	    };
	    /**
		 *  The panning model. Either "equalpower" or "HRTF".
		 *  @type {String}
		 *  @memberOf Tone.Panner3D#
		 *  @name panningModel
		 */
	    Tone.Panner3D._aliasProperty('panningModel');
	    /**
		 *  A reference distance for reducing volume as source move further from the listener
		 *  @type {Number}
		 *  @memberOf Tone.Panner3D#
		 *  @name refDistance
		 */
	    Tone.Panner3D._aliasProperty('refDistance');
	    /**
		 *  Describes how quickly the volume is reduced as source moves away from listener.
		 *  @type {Number}
		 *  @memberOf Tone.Panner3D#
		 *  @name rolloffFactor
		 */
	    Tone.Panner3D._aliasProperty('rolloffFactor');
	    /**
		 *  The distance model used by,  "linear", "inverse", or "exponential".
		 *  @type {String}
		 *  @memberOf Tone.Panner3D#
		 *  @name distanceModel
		 */
	    Tone.Panner3D._aliasProperty('distanceModel');
	    /**
		 *  The angle, in degrees, inside of which there will be no volume reduction
		 *  @type {Degrees}
		 *  @memberOf Tone.Panner3D#
		 *  @name coneInnerAngle
		 */
	    Tone.Panner3D._aliasProperty('coneInnerAngle');
	    /**
		 *  The angle, in degrees, outside of which the volume will be reduced
		 *  to a constant value of coneOuterGain
		 *  @type {Degrees}
		 *  @memberOf Tone.Panner3D#
		 *  @name coneOuterAngle
		 */
	    Tone.Panner3D._aliasProperty('coneOuterAngle');
	    /**
		 *  The gain outside of the coneOuterAngle
		 *  @type {Gain}
		 *  @memberOf Tone.Panner3D#
		 *  @name coneOuterGain
		 */
	    Tone.Panner3D._aliasProperty('coneOuterGain');
	    /**
		 *  The maximum distance between source and listener,
		 *  after which the volume will not be reduced any further.
		 *  @type {Positive}
		 *  @memberOf Tone.Panner3D#
		 *  @name maxDistance
		 */
	    Tone.Panner3D._aliasProperty('maxDistance');
	    /**
		 *  Clean up.
		 *  @returns {Tone.Panner3D} this
		 */
	    Tone.Panner3D.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._panner.disconnect();
	        this._panner = null;
	        this._orientation = null;
	        this._position = null;
	        return this;
	    };
	    return Tone.Panner3D;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.PanVol is a Tone.Panner and Tone.Volume in one.
		 *
		 *  @extends {Tone.AudioNode}
		 *  @constructor
		 *  @param {AudioRange} pan the initial pan
		 *  @param {number} volume The output volume.
		 *  @example
		 * //pan the incoming signal left and drop the volume
		 * var panVol = new Tone.PanVol(-0.25, -12);
		 */
	    Tone.PanVol = function () {
	        var options = Tone.defaults(arguments, [
	            'pan',
	            'volume'
	        ], Tone.PanVol);
	        Tone.AudioNode.call(this);
	        /**
			 *  The panning node
			 *  @type {Tone.Panner}
			 *  @private
			 */
	        this._panner = this.input = new Tone.Panner(options.pan);
	        /**
			 *  The L/R panning control.
			 *  @type {AudioRange}
			 *  @signal
			 */
	        this.pan = this._panner.pan;
	        /**
			 *  The volume node
			 *  @type {Tone.Volume}
			 *  @private
			 */
	        this._volume = this.output = new Tone.Volume(options.volume);
	        /**
			 *  The volume control in decibels.
			 *  @type {Decibels}
			 *  @signal
			 */
	        this.volume = this._volume.volume;
	        //connections
	        this._panner.connect(this._volume);
	        this.mute = options.mute;
	        this._readOnly([
	            'pan',
	            'volume'
	        ]);
	    };
	    Tone.extend(Tone.PanVol, Tone.AudioNode);
	    /**
		 *  The defaults
		 *  @type  {Object}
		 *  @const
		 *  @static
		 */
	    Tone.PanVol.defaults = {
	        'pan': 0,
	        'volume': 0,
	        'mute': false
	    };
	    /**
		 * Mute/unmute the volume
		 * @memberOf Tone.PanVol#
		 * @name mute
		 * @type {Boolean}
		 */
	    Object.defineProperty(Tone.PanVol.prototype, 'mute', {
	        get: function () {
	            return this._volume.mute;
	        },
	        set: function (mute) {
	            this._volume.mute = mute;
	        }
	    });
	    /**
		 *  clean up
		 *  @returns {Tone.PanVol} this
		 */
	    Tone.PanVol.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._writable([
	            'pan',
	            'volume'
	        ]);
	        this._panner.dispose();
	        this._panner = null;
	        this.pan = null;
	        this._volume.dispose();
	        this._volume = null;
	        this.volume = null;
	        return this;
	    };
	    return Tone.PanVol;
	});
	Module(function (Tone) {
	    /**
		 *  @class Tone.Solo lets you isolate a specific audio stream. When
		 *         an instance is set to `solo=true`, it will mute all other instances.
		 *  @extends {Tone.AudioNode}
		 *  @example
		 * var soloA = new Tone.Solo()
		 * var soloB = new Tone.Solo()
		 * soloA.solo = true
		 * //no audio will pass through soloB
		 */
	    Tone.Solo = function () {
	        var options = Tone.defaults(arguments, ['solo'], Tone.Solo);
	        Tone.AudioNode.call(this);
	        /**
			 *  The input and output node
			 *  @type  {Tone.Gain}
			 */
	        this.input = this.output = new Tone.Gain();
	        /**
			 *  A bound _soloed method
			 *  @type  {Function}
			 *  @private
			 */
	        this._soloBind = this._soloed.bind(this);
	        //listen for solo events class-wide.
	        this.context.on('solo', this._soloBind);
	        //set initially
	        this.solo = options.solo;
	    };
	    Tone.extend(Tone.Solo, Tone.AudioNode);
	    /**
		 *  The defaults
		 *  @type  {Object}
		 *  @static
		 */
	    Tone.Solo.defaults = { solo: false };
	    /**
		 *  Isolates this instance and mutes all other instances of Tone.Solo.
		 *  Only one instance can be soloed at a time. A soloed
		 *  instance will report `solo=false` when another instance is soloed.
		 *  @memberOf Tone.Solo#
		 *  @type {Boolean}
		 *  @name solo
		 */
	    Object.defineProperty(Tone.Solo.prototype, 'solo', {
	        get: function () {
	            return this._isSoloed();
	        },
	        set: function (solo) {
	            if (solo) {
	                this._addSolo();
	            } else {
	                this._removeSolo();
	            }
	            this.context.emit('solo', this);
	        }
	    });
	    /**
		 *  If the current instance is muted, i.e. another instance is soloed
		 *  @memberOf Tone.Solo#
		 *  @type {Boolean}
		 *  @name muted
		 *  @readOnly
		 */
	    Object.defineProperty(Tone.Solo.prototype, 'muted', {
	        get: function () {
	            return this.input.gain.value === 0;
	        }
	    });
	    /**
		 * Add this to the soloed array
		 * @private
		 */
	    Tone.Solo.prototype._addSolo = function () {
	        if (!Tone.isArray(this.context._currentSolo)) {
	            this.context._currentSolo = [];
	        }
	        if (!this._isSoloed()) {
	            this.context._currentSolo.push(this);
	        }
	    };
	    /**
		 * Remove this from the soloed array
		 * @private
		 */
	    Tone.Solo.prototype._removeSolo = function () {
	        if (this._isSoloed()) {
	            var index = this.context._currentSolo.indexOf(this);
	            this.context._currentSolo.splice(index, 1);
	        }
	    };
	    /**
		 * @return {Boolean} Is this on the soloed array
		 * @private
		 */
	    Tone.Solo.prototype._isSoloed = function () {
	        if (Tone.isArray(this.context._currentSolo)) {
	            return this.context._currentSolo.length !== 0 && this.context._currentSolo.indexOf(this) !== -1;
	        } else {
	            return false;
	        }
	    };
	    /**
		 * @return {Boolean} Returns true if no one is soloed
		 * @private
		 */
	    Tone.Solo.prototype._noSolos = function () {
	        return !Tone.isArray(this.context._currentSolo) || this.context._currentSolo.length === 0;
	    };
	    /**
		 *  Solo the current instance and unsolo all other instances.
		 *  @param  {Tone.Solo}  instance  The instance which is being soloed/unsoloed.
		 *  @private
		 */
	    Tone.Solo.prototype._soloed = function () {
	        if (this._isSoloed()) {
	            this.input.gain.value = 1;
	        } else if (this._noSolos()) {
	            //no one is soloed
	            this.input.gain.value = 1;
	        } else {
	            this.input.gain.value = 0;
	        }
	    };
	    /**
		 *  Clean up
		 *  @return  {Tone.Solo}  this
		 */
	    Tone.Solo.prototype.dispose = function () {
	        this.context.off('solo', this._soloBind);
	        this._removeSolo();
	        this._soloBind = null;
	        Tone.AudioNode.prototype.dispose.call(this);
	        return this;
	    };
	    return Tone.Solo;
	});
	Module(function (Tone) {
	    /**
		 *  @class  Get the current waveform data of the connected audio source.
		 *  @extends {Tone.AudioNode}
		 *  @param {Number=} size The size of the FFT. Value must be a power of
		 *                       two in the range 32 to 32768.
		 */
	    Tone.Waveform = function () {
	        var options = Tone.defaults(arguments, ['size'], Tone.Waveform);
	        options.type = Tone.Analyser.Type.Waveform;
	        Tone.AudioNode.call(this);
	        /**
			 *  The analyser node.
			 *  @private
			 *  @type {Tone.Analyser}
			 */
	        this._analyser = this.input = this.output = new Tone.Analyser(options);
	    };
	    Tone.extend(Tone.Waveform, Tone.AudioNode);
	    /**
		 *  The default values.
		 *  @type {Object}
		 *  @const
		 */
	    Tone.Waveform.defaults = { 'size': 1024 };
	    /**
		 *  Gets the waveform of the audio source. Returns the waveform data
		 *  of length [size](#size) as a Float32Array with values between -1 and 1.
		 *  @returns {TypedArray}
		 */
	    Tone.Waveform.prototype.getValue = function () {
	        return this._analyser.getValue();
	    };
	    /**
		 *  The size of analysis. This must be a power of two in the range 32 to 32768.
		 *  @memberOf Tone.Waveform#
		 *  @type {Number}
		 *  @name size
		 */
	    Object.defineProperty(Tone.Waveform.prototype, 'size', {
	        get: function () {
	            return this._analyser.size;
	        },
	        set: function (size) {
	            this._analyser.size = size;
	        }
	    });
	    /**
		 *  Clean up.
		 *  @return  {Tone.Waveform}  this
		 */
	    Tone.Waveform.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._analyser.dispose();
	        this._analyser = null;
	    };
	    return Tone.Waveform;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.CtrlInterpolate will interpolate between given values based
		 *         on the "index" property. Passing in an array or object literal
		 *         will interpolate each of the parameters. Note (i.e. "C3")
		 *         and Time (i.e. "4n + 2") can be interpolated. All other values are
		 *         assumed to be numbers. 
		 *  @example
		 * var interp = new Tone.CtrlInterpolate([0, 2, 9, 4]);
		 * interp.index = 0.75;
		 * interp.value; //returns 1.5
		 *
		 *  @example
		 * var interp = new Tone.CtrlInterpolate([
		 * 	[2, 4, 5],
		 * 	[9, 3, 2],
		 * ]);
		 * @param {Array} values The array of values to interpolate over
		 * @param {Positive} index The initial interpolation index.
		 * @extends {Tone}
		 */
	    Tone.CtrlInterpolate = function () {
	        var options = Tone.defaults(arguments, [
	            'values',
	            'index'
	        ], Tone.CtrlInterpolate);
	        Tone.call(this);
	        /**
			 *  The values to interpolate between
			 *  @type  {Array}
			 */
	        this.values = options.values;
	        /**
			 *  The interpolated index between values. For example: a value of 1.5
			 *  would interpolate equally between the value at index 1
			 *  and the value at index 2. 
			 *  @example
			 * interp.index = 0; 
			 * interp.value; //returns the value at 0
			 * interp.index = 0.5;
			 * interp.value; //returns the value between indices 0 and 1. 
			 *  @type  {Positive}
			 */
	        this.index = options.index;
	    };
	    Tone.extend(Tone.CtrlInterpolate);
	    /**
		 *  The defaults
		 *  @const
		 *  @type  {Object}
		 */
	    Tone.CtrlInterpolate.defaults = {
	        'index': 0,
	        'values': []
	    };
	    /**
		 *  The current interpolated value based on the index
		 *  @readOnly
		 *  @memberOf Tone.CtrlInterpolate#
		 *  @type {*}
		 *  @name value
		 */
	    Object.defineProperty(Tone.CtrlInterpolate.prototype, 'value', {
	        get: function () {
	            var index = this.index;
	            index = Math.min(index, this.values.length - 1);
	            var lowerPosition = Math.floor(index);
	            var lower = this.values[lowerPosition];
	            var upper = this.values[Math.ceil(index)];
	            return this._interpolate(index - lowerPosition, lower, upper);
	        }
	    });
	    /**
		 *  Internal interpolation routine
		 *  @param  {NormalRange}  index  The index between the lower and upper
		 *  @param  {*}  lower 
		 *  @param  {*}  upper 
		 *  @return  {*}  The interpolated value
		 *  @private
		 */
	    Tone.CtrlInterpolate.prototype._interpolate = function (index, lower, upper) {
	        if (Tone.isArray(lower)) {
	            var retArray = [];
	            for (var i = 0; i < lower.length; i++) {
	                retArray[i] = this._interpolate(index, lower[i], upper[i]);
	            }
	            return retArray;
	        } else if (Tone.isObject(lower)) {
	            var retObj = {};
	            for (var attr in lower) {
	                retObj[attr] = this._interpolate(index, lower[attr], upper[attr]);
	            }
	            return retObj;
	        } else {
	            lower = this._toNumber(lower);
	            upper = this._toNumber(upper);
	            return (1 - index) * lower + index * upper;
	        }
	    };
	    /**
		 *  Convert from the given type into a number
		 *  @param  {Number|String}  value
		 *  @return  {Number}
		 *  @private
		 */
	    Tone.CtrlInterpolate.prototype._toNumber = function (val) {
	        if (Tone.isNumber(val)) {
	            return val;
	        } else {
	            //otherwise assume that it's Time...
	            return this.toSeconds(val);
	        }
	    };
	    /**
		 *  Clean up
		 *  @return  {Tone.CtrlInterpolate}  this
		 */
	    Tone.CtrlInterpolate.prototype.dispose = function () {
	        this.values = null;
	    };
	    return Tone.CtrlInterpolate;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.CtrlMarkov represents a Markov Chain where each call
		 *         to Tone.CtrlMarkov.next will move to the next state. If the next
		 *         state choice is an array, the next state is chosen randomly with
		 *         even probability for all of the choices. For a weighted probability
		 *         of the next choices, pass in an object with "state" and "probability" attributes. 
		 *         The probabilities will be normalized and then chosen. If no next options
		 *         are given for the current state, the state will stay there. 
		 *  @extends {Tone}
		 *  @example
		 * var chain = new Tone.CtrlMarkov({
		 * 	"beginning" : ["end", "middle"],
		 * 	"middle" : "end"
		 * });
		 * chain.value = "beginning";
		 * chain.next(); //returns "end" or "middle" with 50% probability
		 *
		 *  @example
		 * var chain = new Tone.CtrlMarkov({
		 * 	"beginning" : [{"value" : "end", "probability" : 0.8}, 
		 * 					{"value" : "middle", "probability" : 0.2}],
		 * 	"middle" : "end"
		 * });
		 * chain.value = "beginning";
		 * chain.next(); //returns "end" with 80% probability or "middle" with 20%.
		 *  @param {Object} values An object with the state names as the keys
		 *                         and the next state(s) as the values. 
		 */
	    Tone.CtrlMarkov = function (values, initial) {
	        Tone.call(this);
	        /**
			 *  The Markov values with states as the keys
			 *  and next state(s) as the values. 
			 *  @type {Object}
			 */
	        this.values = Tone.defaultArg(values, {});
	        /**
			 *  The current state of the Markov values. The next
			 *  state will be evaluated and returned when Tone.CtrlMarkov.next
			 *  is invoked.
			 *  @type {String}
			 */
	        this.value = Tone.defaultArg(initial, Object.keys(this.values)[0]);
	    };
	    Tone.extend(Tone.CtrlMarkov);
	    /**
		 *  Returns the next state of the Markov values. 
		 *  @return  {String}
		 */
	    Tone.CtrlMarkov.prototype.next = function () {
	        if (this.values.hasOwnProperty(this.value)) {
	            var next = this.values[this.value];
	            if (Tone.isArray(next)) {
	                var distribution = this._getProbDistribution(next);
	                var rand = Math.random();
	                var total = 0;
	                for (var i = 0; i < distribution.length; i++) {
	                    var dist = distribution[i];
	                    if (rand > total && rand < total + dist) {
	                        var chosen = next[i];
	                        if (Tone.isObject(chosen)) {
	                            this.value = chosen.value;
	                        } else {
	                            this.value = chosen;
	                        }
	                    }
	                    total += dist;
	                }
	            } else {
	                this.value = next;
	            }
	        }
	        return this.value;
	    };
	    /**
		 *  Choose randomly from an array weighted options in the form 
		 *  {"state" : string, "probability" : number} or an array of values
		 *  @param  {Array}  options 
		 *  @return  {Array}  The randomly selected choice
		 *  @private
		 */
	    Tone.CtrlMarkov.prototype._getProbDistribution = function (options) {
	        var distribution = [];
	        var total = 0;
	        var needsNormalizing = false;
	        for (var i = 0; i < options.length; i++) {
	            var option = options[i];
	            if (Tone.isObject(option)) {
	                needsNormalizing = true;
	                distribution[i] = option.probability;
	            } else {
	                distribution[i] = 1 / options.length;
	            }
	            total += distribution[i];
	        }
	        if (needsNormalizing) {
	            //normalize the values
	            for (var j = 0; j < distribution.length; j++) {
	                distribution[j] = distribution[j] / total;
	            }
	        }
	        return distribution;
	    };
	    /**
		 *  Clean up
		 *  @return  {Tone.CtrlMarkov}  this
		 */
	    Tone.CtrlMarkov.prototype.dispose = function () {
	        this.values = null;
	    };
	    return Tone.CtrlMarkov;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Generate patterns from an array of values.
		 *         Has a number of arpeggiation and randomized
		 *         selection patterns. 
		 *           <ul>
		 *  	        <li>"up" - cycles upward</li>
		 *  			<li>"down" - cycles downward</li>
		 *  			<li>"upDown" - up then and down</li>
		 *  			<li>"downUp" - cycles down then and up</li>
		 *  			<li>"alternateUp" - jump up two and down one</li>
		 *  			<li>"alternateDown" - jump down two and up one</li>
		 *  			<li>"random" - randomly select an index</li>
		 *  			<li>"randomWalk" - randomly moves one index away from the current position</li>
		 *  			<li>"randomOnce" - randomly select an index without repeating until all values have been chosen.</li>
		 *     		</ul>
		 *  @param  {Array}  values   An array of options to choose from.
		 *  @param  {Tone.CtrlPattern.Type=}  type  The name of the pattern.
		 *  @extends {Tone}
		 */
	    Tone.CtrlPattern = function () {
	        var options = Tone.defaults(arguments, [
	            'values',
	            'type'
	        ], Tone.CtrlPattern);
	        Tone.call(this);
	        /**
			 *  The array of values to arpeggiate over
			 *  @type {Array}
			 */
	        this.values = options.values;
	        /**
			 *  The current position in the values array
			 *  @type  {Number}
			 */
	        this.index = 0;
	        /**
			 *  The type placeholder
			 *  @type {Tone.CtrlPattern.Type}
			 *  @private
			 */
	        this._type = null;
	        /**
			 *  Shuffled values for the RandomOnce type
			 *  @type {Array}
			 *  @private
			 */
	        this._shuffled = null;
	        /**
			 *  The direction of the movement
			 *  @type {String}
			 *  @private
			 */
	        this._direction = null;
	        this.type = options.type;
	    };
	    Tone.extend(Tone.CtrlPattern);
	    /**
		 *  The Control Patterns
		 *  @type  {Object}
		 *  @static
		 */
	    Tone.CtrlPattern.Type = {
	        Up: 'up',
	        Down: 'down',
	        UpDown: 'upDown',
	        DownUp: 'downUp',
	        AlternateUp: 'alternateUp',
	        AlternateDown: 'alternateDown',
	        Random: 'random',
	        RandomWalk: 'randomWalk',
	        RandomOnce: 'randomOnce'
	    };
	    /**
		 *  The default values. 
		 *  @type  {Object}
		 */
	    Tone.CtrlPattern.defaults = {
	        'type': Tone.CtrlPattern.Type.Up,
	        'values': []
	    };
	    /**
		 *  The value at the current index of the pattern.
		 *  @readOnly
		 *  @memberOf Tone.CtrlPattern#
		 *  @type {*}
		 *  @name value
		 */
	    Object.defineProperty(Tone.CtrlPattern.prototype, 'value', {
	        get: function () {
	            //some safeguards
	            if (this.values.length === 0) {
	                return;
	            } else if (this.values.length === 1) {
	                return this.values[0];
	            }
	            this.index = Math.min(this.index, this.values.length - 1);
	            var val = this.values[this.index];
	            if (this.type === Tone.CtrlPattern.Type.RandomOnce) {
	                if (this.values.length !== this._shuffled.length) {
	                    this._shuffleValues();
	                }
	                val = this.values[this._shuffled[this.index]];
	            }
	            return val;
	        }
	    });
	    /**
		 *  The pattern used to select the next
		 *  item from the values array
		 *  @memberOf Tone.CtrlPattern#
		 *  @type {Tone.CtrlPattern.Type}
		 *  @name type
		 */
	    Object.defineProperty(Tone.CtrlPattern.prototype, 'type', {
	        get: function () {
	            return this._type;
	        },
	        set: function (type) {
	            this._type = type;
	            this._shuffled = null;
	            //the first index
	            if (this._type === Tone.CtrlPattern.Type.Up || this._type === Tone.CtrlPattern.Type.UpDown || this._type === Tone.CtrlPattern.Type.RandomOnce || this._type === Tone.CtrlPattern.Type.AlternateUp) {
	                this.index = 0;
	            } else if (this._type === Tone.CtrlPattern.Type.Down || this._type === Tone.CtrlPattern.Type.DownUp || this._type === Tone.CtrlPattern.Type.AlternateDown) {
	                this.index = this.values.length - 1;
	            }
	            //the direction
	            if (this._type === Tone.CtrlPattern.Type.UpDown || this._type === Tone.CtrlPattern.Type.AlternateUp) {
	                this._direction = Tone.CtrlPattern.Type.Up;
	            } else if (this._type === Tone.CtrlPattern.Type.DownUp || this._type === Tone.CtrlPattern.Type.AlternateDown) {
	                this._direction = Tone.CtrlPattern.Type.Down;
	            }
	            //randoms
	            if (this._type === Tone.CtrlPattern.Type.RandomOnce) {
	                this._shuffleValues();
	            } else if (this._type === Tone.CtrlPattern.Random) {
	                this.index = Math.floor(Math.random() * this.values.length);
	            }
	        }
	    });
	    /**
		 *  Return the next value given the current position
		 *  and pattern.
		 *  @return {*} The next value
		 */
	    Tone.CtrlPattern.prototype.next = function () {
	        var type = this.type;
	        //choose the next index
	        if (type === Tone.CtrlPattern.Type.Up) {
	            this.index++;
	            if (this.index >= this.values.length) {
	                this.index = 0;
	            }
	        } else if (type === Tone.CtrlPattern.Type.Down) {
	            this.index--;
	            if (this.index < 0) {
	                this.index = this.values.length - 1;
	            }
	        } else if (type === Tone.CtrlPattern.Type.UpDown || type === Tone.CtrlPattern.Type.DownUp) {
	            if (this._direction === Tone.CtrlPattern.Type.Up) {
	                this.index++;
	            } else {
	                this.index--;
	            }
	            if (this.index < 0) {
	                this.index = 1;
	                this._direction = Tone.CtrlPattern.Type.Up;
	            } else if (this.index >= this.values.length) {
	                this.index = this.values.length - 2;
	                this._direction = Tone.CtrlPattern.Type.Down;
	            }
	        } else if (type === Tone.CtrlPattern.Type.Random) {
	            this.index = Math.floor(Math.random() * this.values.length);
	        } else if (type === Tone.CtrlPattern.Type.RandomWalk) {
	            if (Math.random() < 0.5) {
	                this.index--;
	                this.index = Math.max(this.index, 0);
	            } else {
	                this.index++;
	                this.index = Math.min(this.index, this.values.length - 1);
	            }
	        } else if (type === Tone.CtrlPattern.Type.RandomOnce) {
	            this.index++;
	            if (this.index >= this.values.length) {
	                this.index = 0;
	                //reshuffle the values for next time
	                this._shuffleValues();
	            }
	        } else if (type === Tone.CtrlPattern.Type.AlternateUp) {
	            if (this._direction === Tone.CtrlPattern.Type.Up) {
	                this.index += 2;
	                this._direction = Tone.CtrlPattern.Type.Down;
	            } else {
	                this.index -= 1;
	                this._direction = Tone.CtrlPattern.Type.Up;
	            }
	            if (this.index >= this.values.length) {
	                this.index = 0;
	                this._direction = Tone.CtrlPattern.Type.Up;
	            }
	        } else if (type === Tone.CtrlPattern.Type.AlternateDown) {
	            if (this._direction === Tone.CtrlPattern.Type.Up) {
	                this.index += 1;
	                this._direction = Tone.CtrlPattern.Type.Down;
	            } else {
	                this.index -= 2;
	                this._direction = Tone.CtrlPattern.Type.Up;
	            }
	            if (this.index < 0) {
	                this.index = this.values.length - 1;
	                this._direction = Tone.CtrlPattern.Type.Down;
	            }
	        }
	        return this.value;
	    };
	    /**
		 *  Shuffles the values and places the results into the _shuffled
		 *  @private
		 */
	    Tone.CtrlPattern.prototype._shuffleValues = function () {
	        var copy = [];
	        this._shuffled = [];
	        for (var i = 0; i < this.values.length; i++) {
	            copy[i] = i;
	        }
	        while (copy.length > 0) {
	            var randVal = copy.splice(Math.floor(copy.length * Math.random()), 1);
	            this._shuffled.push(randVal[0]);
	        }
	    };
	    /**
		 *  Clean up
		 *  @returns {Tone.CtrlPattern} this
		 */
	    Tone.CtrlPattern.prototype.dispose = function () {
	        this._shuffled = null;
	        this.values = null;
	    };
	    return Tone.CtrlPattern;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Choose a random value.
		 *  @extends {Tone}
		 *  @example
		 * var randomWalk = new Tone.CtrlRandom({
		 * 	"min" : 0,
		 * 	"max" : 10,
		 * 	"integer" : true
		 * });
		 * randomWalk.eval();
		 *
		 *  @param {Number|Time=} min The minimum return value.
		 *  @param {Number|Time=} max The maximum return value.
		 */
	    Tone.CtrlRandom = function () {
	        var options = Tone.defaults(arguments, [
	            'min',
	            'max'
	        ], Tone.CtrlRandom);
	        Tone.call(this);
	        /**
			 *  The minimum return value
			 *  @type  {Number|Time}
			 */
	        this.min = options.min;
	        /**
			 *  The maximum return value
			 *  @type  {Number|Time}
			 */
	        this.max = options.max;
	        /**
			 *  If the return value should be an integer
			 *  @type  {Boolean}
			 */
	        this.integer = options.integer;
	    };
	    Tone.extend(Tone.CtrlRandom);
	    /**
		 *  The defaults
		 *  @const
		 *  @type  {Object}
		 */
	    Tone.CtrlRandom.defaults = {
	        'min': 0,
	        'max': 1,
	        'integer': false
	    };
	    /**
		 *  Return a random value between min and max. 
		 *  @readOnly
		 *  @memberOf Tone.CtrlRandom#
		 *  @type {*}
		 *  @name value
		 */
	    Object.defineProperty(Tone.CtrlRandom.prototype, 'value', {
	        get: function () {
	            var min = this.toSeconds(this.min);
	            var max = this.toSeconds(this.max);
	            var rand = Math.random();
	            var val = rand * min + (1 - rand) * max;
	            if (this.integer) {
	                val = Math.floor(val);
	            }
	            return val;
	        }
	    });
	    return Tone.CtrlRandom;
	});
	Module(function (Tone) {
	    
	    /**
		 *  AudioBuffer.copyToChannel polyfill
		 *  @private
		 */
	    if (window.AudioBuffer && !AudioBuffer.prototype.copyToChannel) {
	        AudioBuffer.prototype.copyToChannel = function (src, chanNum, start) {
	            var channel = this.getChannelData(chanNum);
	            start = start || 0;
	            for (var i = 0; i < channel.length; i++) {
	                channel[i + start] = src[i];
	            }
	        };
	        AudioBuffer.prototype.copyFromChannel = function (dest, chanNum, start) {
	            var channel = this.getChannelData(chanNum);
	            start = start || 0;
	            for (var i = 0; i < dest.length; i++) {
	                dest[i] = channel[i + start];
	            }
	        };
	    }
	    /**
		 *  @class  Buffer loading and storage. Tone.Buffer is used internally by all 
		 *          classes that make requests for audio files such as Tone.Player,
		 *          Tone.Sampler and Tone.Convolver.
		 *          
		 *          Aside from load callbacks from individual buffers, Tone.Buffer 
		 *  		provides events which keep track of the loading progress 
		 *  		of _all_ of the buffers. These are Tone.Buffer.on("load" / "progress" / "error")
		 *
		 *  @constructor 
		 *  @extends {Tone}
		 *  @param {AudioBuffer|String} url The url to load, or the audio buffer to set. 
		 *  @param {Function=} onload A callback which is invoked after the buffer is loaded. 
		 *                            It's recommended to use `Tone.Buffer.on('load', callback)` instead 
		 *                            since it will give you a callback when _all_ buffers are loaded.
		 *  @param {Function=} onerror The callback to invoke if there is an error
		 *  @example
		 * var buffer = new Tone.Buffer("path/to/sound.mp3", function(){
		 * 	//the buffer is now available.
		 * 	var buff = buffer.get();
		 * });
		 *  @example
		 * //can load provide fallback extension types if the first type is not supported.
		 * var buffer = new Tone.Buffer("path/to/sound.[mp3|ogg|wav]");
		 */
	    Tone.Buffer = function () {
	        var options = Tone.defaults(arguments, [
	            'url',
	            'onload',
	            'onerror'
	        ], Tone.Buffer);
	        Tone.call(this);
	        /**
			 *  stores the loaded AudioBuffer
			 *  @type {AudioBuffer}
			 *  @private
			 */
	        this._buffer = null;
	        /**
			 *  indicates if the buffer should be reversed or not
			 *  @type {Boolean}
			 *  @private
			 */
	        this._reversed = options.reverse;
	        /**
			 *  The XHR
			 *  @type  {XMLHttpRequest}
			 *  @private
			 */
	        this._xhr = null;
	        if (options.url instanceof AudioBuffer || options.url instanceof Tone.Buffer) {
	            this.set(options.url);
	            // invoke the onload callback
	            if (options.onload) {
	                options.onload(this);
	            }
	        } else if (Tone.isString(options.url)) {
	            this.load(options.url, options.onload, options.onerror);
	        }
	    };
	    Tone.extend(Tone.Buffer);
	    /**
		 *  the default parameters
		 *  @type {Object}
		 */
	    Tone.Buffer.defaults = {
	        'url': undefined,
	        'reverse': false
	    };
	    /**
		 *  Pass in an AudioBuffer or Tone.Buffer to set the value
		 *  of this buffer.
		 *  @param {AudioBuffer|Tone.Buffer} buffer the buffer
		 *  @returns {Tone.Buffer} this
		 */
	    Tone.Buffer.prototype.set = function (buffer) {
	        if (buffer instanceof Tone.Buffer) {
	            this._buffer = buffer.get();
	        } else {
	            this._buffer = buffer;
	        }
	        return this;
	    };
	    /**
		 *  @return {AudioBuffer} The audio buffer stored in the object.
		 */
	    Tone.Buffer.prototype.get = function () {
	        return this._buffer;
	    };
	    /**
		 *  Makes an xhr reqest for the selected url then decodes
		 *  the file as an audio buffer. Invokes
		 *  the callback once the audio buffer loads.
		 *  @param {String} url The url of the buffer to load.
		 *                      filetype support depends on the
		 *                      browser.
		 *  @returns {Promise} returns a Promise which resolves with the Tone.Buffer
		 */
	    Tone.Buffer.prototype.load = function (url, onload, onerror) {
	        var promise = new Promise(function (load, error) {
	            this._xhr = Tone.Buffer.load(url, //success
	            function (buff) {
	                this._xhr = null;
	                this.set(buff);
	                load(this);
	                if (onload) {
	                    onload(this);
	                }
	            }.bind(this), //error
	            function (err) {
	                this._xhr = null;
	                error(err);
	                if (onerror) {
	                    onerror(err);
	                }
	            }.bind(this));
	        }.bind(this));
	        return promise;
	    };
	    /**
		 *  dispose and disconnect
		 *  @returns {Tone.Buffer} this
		 */
	    Tone.Buffer.prototype.dispose = function () {
	        Tone.prototype.dispose.call(this);
	        this._buffer = null;
	        if (this._xhr) {
	            Tone.Buffer._removeFromDownloadQueue(this._xhr);
	            this._xhr.abort();
	            this._xhr = null;
	        }
	        return this;
	    };
	    /**
		 * If the buffer is loaded or not
		 * @memberOf Tone.Buffer#
		 * @type {Boolean}
		 * @name loaded
		 * @readOnly
		 */
	    Object.defineProperty(Tone.Buffer.prototype, 'loaded', {
	        get: function () {
	            return this.length > 0;
	        }
	    });
	    /**
		 * The duration of the buffer. 
		 * @memberOf Tone.Buffer#
		 * @type {Number}
		 * @name duration
		 * @readOnly
		 */
	    Object.defineProperty(Tone.Buffer.prototype, 'duration', {
	        get: function () {
	            if (this._buffer) {
	                return this._buffer.duration;
	            } else {
	                return 0;
	            }
	        }
	    });
	    /**
		 * The length of the buffer in samples
		 * @memberOf Tone.Buffer#
		 * @type {Number}
		 * @name length
		 * @readOnly
		 */
	    Object.defineProperty(Tone.Buffer.prototype, 'length', {
	        get: function () {
	            if (this._buffer) {
	                return this._buffer.length;
	            } else {
	                return 0;
	            }
	        }
	    });
	    /**
		 * The number of discrete audio channels. Returns 0 if no buffer
		 * is loaded.
		 * @memberOf Tone.Buffer#
		 * @type {Number}
		 * @name numberOfChannels
		 * @readOnly
		 */
	    Object.defineProperty(Tone.Buffer.prototype, 'numberOfChannels', {
	        get: function () {
	            if (this._buffer) {
	                return this._buffer.numberOfChannels;
	            } else {
	                return 0;
	            }
	        }
	    });
	    /**
		 *  Set the audio buffer from the array. To create a multichannel AudioBuffer,
		 *  pass in a multidimensional array. 
		 *  @param {Float32Array} array The array to fill the audio buffer
		 *  @return {Tone.Buffer} this
		 */
	    Tone.Buffer.prototype.fromArray = function (array) {
	        var isMultidimensional = array[0].length > 0;
	        var channels = isMultidimensional ? array.length : 1;
	        var len = isMultidimensional ? array[0].length : array.length;
	        var buffer = this.context.createBuffer(channels, len, this.context.sampleRate);
	        if (!isMultidimensional && channels === 1) {
	            array = [array];
	        }
	        for (var c = 0; c < channels; c++) {
	            buffer.copyToChannel(array[c], c);
	        }
	        this._buffer = buffer;
	        return this;
	    };
	    /**
		 * 	Sums muliple channels into 1 channel
		 *  @param {Number=} channel Optionally only copy a single channel from the array.
		 *  @return {Array}
		 */
	    Tone.Buffer.prototype.toMono = function (chanNum) {
	        if (Tone.isNumber(chanNum)) {
	            this.fromArray(this.toArray(chanNum));
	        } else {
	            var outputArray = new Float32Array(this.length);
	            var numChannels = this.numberOfChannels;
	            for (var channel = 0; channel < numChannels; channel++) {
	                var channelArray = this.toArray(channel);
	                for (var i = 0; i < channelArray.length; i++) {
	                    outputArray[i] += channelArray[i];
	                }
	            }
	            //divide by the number of channels
	            outputArray = outputArray.map(function (sample) {
	                return sample / numChannels;
	            });
	            this.fromArray(outputArray);
	        }
	        return this;
	    };
	    /**
		 * 	Get the buffer as an array. Single channel buffers will return a 1-dimensional 
		 * 	Float32Array, and multichannel buffers will return multidimensional arrays.
		 *  @param {Number=} channel Optionally only copy a single channel from the array.
		 *  @return {Array}
		 */
	    Tone.Buffer.prototype.toArray = function (channel) {
	        if (Tone.isNumber(channel)) {
	            return this.getChannelData(channel);
	        } else if (this.numberOfChannels === 1) {
	            return this.toArray(0);
	        } else {
	            var ret = [];
	            for (var c = 0; c < this.numberOfChannels; c++) {
	                ret[c] = this.getChannelData(c);
	            }
	            return ret;
	        }
	    };
	    /**
		 *  Returns the Float32Array representing the PCM audio data for the specific channel.
		 *  @param  {Number}  channel  The channel number to return
		 *  @return  {Float32Array}  The audio as a TypedArray
		 */
	    Tone.Buffer.prototype.getChannelData = function (channel) {
	        return this._buffer.getChannelData(channel);
	    };
	    /**
		 *  Cut a subsection of the array and return a buffer of the
		 *  subsection. Does not modify the original buffer
		 *  @param {Time} start The time to start the slice
		 *  @param {Time=} end The end time to slice. If none is given
		 *                     will default to the end of the buffer
		 *  @return {Tone.Buffer} this
		 */
	    Tone.Buffer.prototype.slice = function (start, end) {
	        end = Tone.defaultArg(end, this.duration);
	        var startSamples = Math.floor(this.context.sampleRate * this.toSeconds(start));
	        var endSamples = Math.floor(this.context.sampleRate * this.toSeconds(end));
	        var replacement = [];
	        for (var i = 0; i < this.numberOfChannels; i++) {
	            replacement[i] = this.toArray(i).slice(startSamples, endSamples);
	        }
	        var retBuffer = new Tone.Buffer().fromArray(replacement);
	        return retBuffer;
	    };
	    /**
		 *  Reverse the buffer.
		 *  @private
		 *  @return {Tone.Buffer} this
		 */
	    Tone.Buffer.prototype._reverse = function () {
	        if (this.loaded) {
	            for (var i = 0; i < this.numberOfChannels; i++) {
	                Array.prototype.reverse.call(this.getChannelData(i));
	            }
	        }
	        return this;
	    };
	    /**
		 * Reverse the buffer.
		 * @memberOf Tone.Buffer#
		 * @type {Boolean}
		 * @name reverse
		 */
	    Object.defineProperty(Tone.Buffer.prototype, 'reverse', {
	        get: function () {
	            return this._reversed;
	        },
	        set: function (rev) {
	            if (this._reversed !== rev) {
	                this._reversed = rev;
	                this._reverse();
	            }
	        }
	    });
	    ///////////////////////////////////////////////////////////////////////////
	    // STATIC METHODS
	    ///////////////////////////////////////////////////////////////////////////
	    //statically inherits Emitter methods
	    Tone.Emitter.mixin(Tone.Buffer);
	    /**
		 *  the static queue for all of the xhr requests
		 *  @type {Array}
		 *  @private
		 */
	    Tone.Buffer._downloadQueue = [];
	    /**
		 *  A path which is prefixed before every url.
		 *  @type  {String}
		 *  @static
		 */
	    Tone.Buffer.baseUrl = '';
	    /**
		 *  Create a Tone.Buffer from the array. To create a multichannel AudioBuffer,
		 *  pass in a multidimensional array. 
		 *  @param {Float32Array} array The array to fill the audio buffer
		 *  @return {Tone.Buffer} A Tone.Buffer created from the array
		 */
	    Tone.Buffer.fromArray = function (array) {
	        return new Tone.Buffer().fromArray(array);
	    };
	    /**
		 * Remove an xhr request from the download queue
		 * @private
		 */
	    Tone.Buffer._removeFromDownloadQueue = function (request) {
	        var index = Tone.Buffer._downloadQueue.indexOf(request);
	        if (index !== -1) {
	            Tone.Buffer._downloadQueue.splice(index, 1);
	        }
	    };
	    /**
		 *  Loads a url using XMLHttpRequest.
		 *  @param {String} url
		 *  @param {Function} onload
		 *  @param {Function} onerror
		 *  @param {Function} onprogress
		 *  @return {XMLHttpRequest}
		 */
	    Tone.Buffer.load = function (url, onload, onerror) {
	        //default
	        onload = Tone.defaultArg(onload, Tone.noOp);
	        // test if the url contains multiple extensions
	        var matches = url.match(/\[(.+\|?)+\]$/);
	        if (matches) {
	            var extensions = matches[1].split('|');
	            var extension = extensions[0];
	            for (var i = 0; i < extensions.length; i++) {
	                if (Tone.Buffer.supportsType(extensions[i])) {
	                    extension = extensions[i];
	                    break;
	                }
	            }
	            url = url.replace(matches[0], extension);
	        }
	        function onError(e) {
	            Tone.Buffer._removeFromDownloadQueue(request);
	            Tone.Buffer.emit('error', e);
	            if (onerror) {
	                onerror(e);
	            } else {
	                throw e;
	            }
	        }
	        function onProgress() {
	            //calculate the progress
	            var totalProgress = 0;
	            for (var i = 0; i < Tone.Buffer._downloadQueue.length; i++) {
	                totalProgress += Tone.Buffer._downloadQueue[i].progress;
	            }
	            Tone.Buffer.emit('progress', totalProgress / Tone.Buffer._downloadQueue.length);
	        }
	        var request = new XMLHttpRequest();
	        request.open('GET', Tone.Buffer.baseUrl + url, true);
	        request.responseType = 'arraybuffer';
	        //start out as 0
	        request.progress = 0;
	        Tone.Buffer._downloadQueue.push(request);
	        request.addEventListener('load', function () {
	            if (request.status === 200) {
	                Tone.context.decodeAudioData(request.response, function (buff) {
	                    request.progress = 1;
	                    onProgress();
	                    onload(buff);
	                    Tone.Buffer._removeFromDownloadQueue(request);
	                    if (Tone.Buffer._downloadQueue.length === 0) {
	                        //emit the event at the end
	                        Tone.Buffer.emit('load');
	                    }
	                }, function () {
	                    Tone.Buffer._removeFromDownloadQueue(request);
	                    onError('Tone.Buffer: could not decode audio data: ' + url);
	                });
	            } else {
	                onError('Tone.Buffer: could not locate file: ' + url);
	            }
	        });
	        request.addEventListener('error', onError);
	        request.addEventListener('progress', function (event) {
	            if (event.lengthComputable) {
	                //only go to 95%, the last 5% is when the audio is decoded
	                request.progress = event.loaded / event.total * 0.95;
	                onProgress();
	            }
	        });
	        request.send();
	        return request;
	    };
	    /**
		 *  Stop all of the downloads in progress
		 *  @return {Tone.Buffer}
		 *  @static
		 */
	    Tone.Buffer.cancelDownloads = function () {
	        Tone.Buffer._downloadQueue.slice().forEach(function (request) {
	            Tone.Buffer._removeFromDownloadQueue(request);
	            request.abort();
	        });
	        return Tone.Buffer;
	    };
	    /**
		 *  Checks a url's extension to see if the current browser can play that file type.
		 *  @param {String} url The url/extension to test
		 *  @return {Boolean} If the file extension can be played
		 *  @static
		 *  @example
		 * Tone.Buffer.supportsType("wav"); //returns true
		 * Tone.Buffer.supportsType("path/to/file.wav"); //returns true
		 */
	    Tone.Buffer.supportsType = function (url) {
	        var extension = url.split('.');
	        extension = extension[extension.length - 1];
	        var response = document.createElement('audio').canPlayType('audio/' + extension);
	        return response !== '';
	    };
	    /**
		 *  Returns a Promise which resolves when all of the buffers have loaded
		 *  @return {Promise}
		 */
	    Tone.loaded = function () {
	        var onload, onerror;
	        function removeEvents() {
	            //remove the events when it's resolved
	            Tone.Buffer.off('load', onload);
	            Tone.Buffer.off('error', onerror);
	        }
	        return new Promise(function (success, fail) {
	            onload = function () {
	                success();
	            };
	            onerror = function () {
	                fail();
	            };
	            //add the event listeners
	            Tone.Buffer.on('load', onload);
	            Tone.Buffer.on('error', onerror);
	        }).then(removeEvents).catch(function (e) {
	            removeEvents();
	            throw new Error(e);
	        });
	    };
	    return Tone.Buffer;
	});
	Module(function (Tone) {
	    /**
		 *  @class A data structure for holding multiple buffers.
		 *  
		 *  @param  {Object|Array}    urls      An object literal or array
		 *                                      of urls to load.
		 *  @param  {Function=}  callback  The callback to invoke when
		 *                                 the buffers are loaded. 
		 *  @extends {Tone}
		 *  @example
		 * //load a whole bank of piano samples
		 * var pianoSamples = new Tone.Buffers({
		 * 	"C4" : "path/to/C4.mp3"
		 * 	"C#4" : "path/to/C#4.mp3"
		 * 	"D4" : "path/to/D4.mp3"
		 * 	"D#4" : "path/to/D#4.mp3"
		 * 	...
		 * }, function(){
		 * 	//play one of the samples when they all load
		 * 	player.buffer = pianoSamples.get("C4");
		 * 	player.start();
		 * });
		 * 	@example
		 * //To pass in additional parameters in the second parameter
		 * var buffers = new Tone.Buffers(urls, {
		 * 	"onload" : callback,
		 * 	"baseUrl" : "../path/to/audio/"
		 * })
		 */
	    Tone.Buffers = function (urls) {
	        //remove the urls from the options
	        var args = Array.prototype.slice.call(arguments);
	        args.shift();
	        var options = Tone.defaults(args, [
	            'onload',
	            'baseUrl'
	        ], Tone.Buffers);
	        Tone.call(this);
	        /**
			 *  All of the buffers
			 *  @type  {Object}
			 *  @private
			 */
	        this._buffers = {};
	        /**
			 *  A path which is prefixed before every url.
			 *  @type  {String}
			 */
	        this.baseUrl = options.baseUrl;
	        this._loadingCount = 0;
	        //add each one
	        for (var key in urls) {
	            this._loadingCount++;
	            this.add(key, urls[key], this._bufferLoaded.bind(this, options.onload));
	        }
	    };
	    Tone.extend(Tone.Buffers);
	    /**
		 *  Defaults
		 *  @type  {Object}
		 */
	    Tone.Buffers.defaults = {
	        'onload': Tone.noOp,
	        'baseUrl': ''
	    };
	    /**
		 *  True if the buffers object has a buffer by that name.
		 *  @param  {String|Number}  name  The key or index of the 
		 *                                 buffer.
		 *  @return  {Boolean}
		 */
	    Tone.Buffers.prototype.has = function (name) {
	        return this._buffers.hasOwnProperty(name);
	    };
	    /**
		 *  Get a buffer by name. If an array was loaded, 
		 *  then use the array index.
		 *  @param  {String|Number}  name  The key or index of the 
		 *                                 buffer.
		 *  @return  {Tone.Buffer}
		 */
	    Tone.Buffers.prototype.get = function (name) {
	        if (this.has(name)) {
	            return this._buffers[name];
	        } else {
	            throw new Error('Tone.Buffers: no buffer named ' + name);
	        }
	    };
	    /**
		 *  A buffer was loaded. decrement the counter.
		 *  @param  {Function}  callback 
		 *  @private
		 */
	    Tone.Buffers.prototype._bufferLoaded = function (callback) {
	        this._loadingCount--;
	        if (this._loadingCount === 0 && callback) {
	            callback(this);
	        }
	    };
	    /**
		 * If the buffers are loaded or not
		 * @memberOf Tone.Buffers#
		 * @type {Boolean}
		 * @name loaded
		 * @readOnly
		 */
	    Object.defineProperty(Tone.Buffers.prototype, 'loaded', {
	        get: function () {
	            var isLoaded = true;
	            for (var buffName in this._buffers) {
	                var buff = this.get(buffName);
	                isLoaded = isLoaded && buff.loaded;
	            }
	            return isLoaded;
	        }
	    });
	    /**
		 *  Add a buffer by name and url to the Buffers
		 *  @param  {String}    name      A unique name to give
		 *                                the buffer
		 *  @param  {String|Tone.Buffer|Audiobuffer}  url  Either the url of the bufer, 
		 *                                                 or a buffer which will be added
		 *                                                 with the given name.
		 *  @param  {Function=}  callback  The callback to invoke 
		 *                                 when the url is loaded.
		 */
	    Tone.Buffers.prototype.add = function (name, url, callback) {
	        callback = Tone.defaultArg(callback, Tone.noOp);
	        if (url instanceof Tone.Buffer) {
	            this._buffers[name] = url;
	            callback(this);
	        } else if (url instanceof AudioBuffer) {
	            this._buffers[name] = new Tone.Buffer(url);
	            callback(this);
	        } else if (Tone.isString(url)) {
	            this._buffers[name] = new Tone.Buffer(this.baseUrl + url, callback);
	        }
	        return this;
	    };
	    /**
		 *  Clean up.
		 *  @return  {Tone.Buffers} this
		 */
	    Tone.Buffers.prototype.dispose = function () {
	        Tone.prototype.dispose.call(this);
	        for (var name in this._buffers) {
	            this._buffers[name].dispose();
	        }
	        this._buffers = null;
	        return this;
	    };
	    return Tone.Buffers;
	});
	Module(function (Tone) {
	    
	    /**
		 *  buses are another way of routing audio
		 *
		 *  augments Tone.prototype to include send and recieve
		 */
	    /**
		  *  All of the routes
		  *  
		  *  @type {Object}
		  *  @static
		  *  @private
		  */
	    var Buses = {};
	    /**
		 *  Send this signal to the channel name. 
		 *  @param  {String} channelName A named channel to send the signal to.
		 *  @param  {Decibels} amount The amount of the source to send to the bus. 
		 *  @return {GainNode} The gain node which connects this node to the desired channel. 
		 *                     Can be used to adjust the levels of the send.
		 *  @example
		 * source.send("reverb", -12);
		 */
	    Tone.prototype.send = function (channelName, amount) {
	        if (!Buses.hasOwnProperty(channelName)) {
	            Buses[channelName] = this.context.createGain();
	        }
	        amount = Tone.defaultArg(amount, 0);
	        var sendKnob = new Tone.Gain(amount, Tone.Type.Decibels);
	        this.output.chain(sendKnob, Buses[channelName]);
	        return sendKnob;
	    };
	    /**
		 *  Recieve the input from the desired channelName to the input
		 *
		 *  @param  {String} channelName A named channel to send the signal to.
		 *  @param  {Number=} channelNumber The channel to connect to
		 *  @returns {Tone} this
		 *  @example
		 * reverbEffect.receive("reverb");
		 */
	    Tone.prototype.receive = function (channelName, inputNum) {
	        if (!Buses.hasOwnProperty(channelName)) {
	            Buses[channelName] = this.context.createGain();
	        }
	        Buses[channelName].connect(this, 0, inputNum);
	        return this;
	    };
	    //remove all the send/receives when a new audio context is passed in
	    Tone.Context.on('init', function (context) {
	        if (context.Buses) {
	            Buses = context.Buses;
	        } else {
	            Buses = {};
	            context.Buses = Buses;
	        }
	    });
	    return Tone;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.Draw is useful for synchronizing visuals and audio events.
		 *         Callbacks from Tone.Transport or any of the Tone.Event classes
		 *         always happen _before_ the scheduled time and are not synchronized
		 *         to the animation frame so they are not good for triggering tightly
		 *         synchronized visuals and sound. Tone.Draw makes it easy to schedule
		 *         callbacks using the AudioContext time and uses requestAnimationFrame.
		 *         
		 *  @singleton
		 *  @extends {Tone}
		 *  @example
		 * Tone.Transport.schedule(function(time){
		 * 	//use the time argument to schedule a callback with Tone.Draw
		 * 	Tone.Draw.schedule(function(){
		 * 		//do drawing or DOM manipulation here
		 * 	}, time)
		 * }, "+0.5")
		 */
	    Tone.Draw = function () {
	        Tone.call(this);
	        /**
			 *  All of the events.
			 *  @type  {Tone.Timeline}
			 *  @private
			 */
	        this._events = new Tone.Timeline();
	        /**
			 *  The duration after which events are not invoked.
			 *  @type  {Number}
			 *  @default 0.25
			 */
	        this.expiration = 0.25;
	        /**
			 *  The amount of time before the scheduled time 
			 *  that the callback can be invoked. Default is
			 *  half the time of an animation frame (0.008 seconds).
			 *  @type  {Number}
			 *  @default 0.008
			 */
	        this.anticipation = 0.008;
	        /**
			 *  The draw loop
			 *  @type  {Function}
			 *  @private
			 */
	        this._boundDrawLoop = this._drawLoop.bind(this);
	    };
	    Tone.extend(Tone.Draw);
	    /**
		 *  Schedule a function at the given time to be invoked
		 *  on the nearest animation frame.
		 *  @param  {Function}  callback  Callback is invoked at the given time.
		 *  @param  {Time}    time      The time relative to the AudioContext time
		 *                              to invoke the callback.
		 *  @return  {Tone.Draw}    this
		 */
	    Tone.Draw.prototype.schedule = function (callback, time) {
	        this._events.add({
	            callback: callback,
	            time: this.toSeconds(time)
	        });
	        //start the draw loop on the first event
	        if (this._events.length === 1) {
	            requestAnimationFrame(this._boundDrawLoop);
	        }
	        return this;
	    };
	    /**
		 *  Cancel events scheduled after the given time
		 *  @param  {Time=}  after  Time after which scheduled events will 
		 *                          be removed from the scheduling timeline.
		 *  @return  {Tone.Draw}  this
		 */
	    Tone.Draw.prototype.cancel = function (after) {
	        this._events.cancel(this.toSeconds(after));
	        return this;
	    };
	    /**
		 *  The draw loop
		 *  @private
		 */
	    Tone.Draw.prototype._drawLoop = function () {
	        var now = Tone.now();
	        while (this._events.length && this._events.peek().time - this.anticipation <= now) {
	            var event = this._events.shift();
	            if (now - event.time <= this.expiration) {
	                event.callback();
	            }
	        }
	        if (this._events.length > 0) {
	            requestAnimationFrame(this._boundDrawLoop);
	        }
	    };
	    //make a singleton
	    Tone.Draw = new Tone.Draw();
	    return Tone.Draw;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Both Tone.Panner3D and Tone.Listener have a position in 3D space 
		 *          using a right-handed cartesian coordinate system. 
		 *          The units used in the coordinate system are not defined; 
		 *          these coordinates are independent/invariant of any particular 
		 *          units such as meters or feet. Tone.Panner3D objects have an forward 
		 *          vector representing the direction the sound is projecting. Additionally, 
		 *          they have a sound cone representing how directional the sound is. 
		 *          For example, the sound could be omnidirectional, in which case it would 
		 *          be heard anywhere regardless of its forward, or it can be more directional 
		 *          and heard only if it is facing the listener. Tone.Listener objects 
		 *          (representing a person's ears) have an forward and up vector 
		 *          representing in which direction the person is facing. Because both the 
		 *          source stream and the listener can be moving, they both have a velocity 
		 *          vector representing both the speed and direction of movement. Taken together, 
		 *          these two velocities can be used to generate a doppler shift effect which changes the pitch.
		 *          <br><br>
		 *          Note: the position of the Listener will have no effect on nodes not connected to a Tone.Panner3D
		 *  
		 *  @constructor
		 *  @extends {Tone}
		 *  @singleton
		 */
	    Tone.Listener = function () {
	        Tone.call(this);
	        /**
			 *  Holds the current forward orientation
			 *  @type  {Array}
			 *  @private
			 */
	        this._orientation = [
	            0,
	            0,
	            0,
	            0,
	            0,
	            0
	        ];
	        /**
			 *  Holds the current position
			 *  @type  {Array}
			 *  @private
			 */
	        this._position = [
	            0,
	            0,
	            0
	        ];
	        Tone.getContext(function () {
	            // set the default position/forward
	            this.set(ListenerConstructor.defaults);
	        }.bind(this));
	    };
	    Tone.extend(Tone.Listener);
	    /**
		 *  Defaults according to the specification
		 *  @static
		 *  @const
		 *  @type {Object}
		 */
	    Tone.Listener.defaults = {
	        'positionX': 0,
	        'positionY': 0,
	        'positionZ': 0,
	        'forwardX': 0,
	        'forwardY': 0,
	        'forwardZ': 1,
	        'upX': 0,
	        'upY': 1,
	        'upZ': 0
	    };
	    /**
		 * The ramp time which is applied to the setTargetAtTime
		 * @type {Number}
		 * @private
		 */
	    Tone.Listener.prototype._rampTimeConstant = 0.01;
	    /**
		 *  Sets the position of the listener in 3d space.	
		 *  @param  {Number}  x
		 *  @param  {Number}  y
		 *  @param  {Number}  z
		 *  @return {Tone.Listener} this
		 */
	    Tone.Listener.prototype.setPosition = function (x, y, z) {
	        if (this.context.listener.positionX) {
	            var now = this.now();
	            this.context.listener.positionX.setTargetAtTime(x, now, this._rampTimeConstant);
	            this.context.listener.positionY.setTargetAtTime(y, now, this._rampTimeConstant);
	            this.context.listener.positionZ.setTargetAtTime(z, now, this._rampTimeConstant);
	        } else {
	            this.context.listener.setPosition(x, y, z);
	        }
	        this._position = Array.prototype.slice.call(arguments);
	        return this;
	    };
	    /**
		 *  Sets the orientation of the listener using two vectors, the forward
		 *  vector (which direction the listener is facing) and the up vector 
		 *  (which the up direction of the listener). An up vector
		 *  of 0, 0, 1 is equivalent to the listener standing up in the Z direction. 
		 *  @param  {Number}  x
		 *  @param  {Number}  y
		 *  @param  {Number}  z
		 *  @param  {Number}  upX
		 *  @param  {Number}  upY
		 *  @param  {Number}  upZ
		 *  @return {Tone.Listener} this
		 */
	    Tone.Listener.prototype.setOrientation = function (x, y, z, upX, upY, upZ) {
	        if (this.context.listener.forwardX) {
	            var now = this.now();
	            this.context.listener.forwardX.setTargetAtTime(x, now, this._rampTimeConstant);
	            this.context.listener.forwardY.setTargetAtTime(y, now, this._rampTimeConstant);
	            this.context.listener.forwardZ.setTargetAtTime(z, now, this._rampTimeConstant);
	            this.context.listener.upX.setTargetAtTime(upX, now, this._rampTimeConstant);
	            this.context.listener.upY.setTargetAtTime(upY, now, this._rampTimeConstant);
	            this.context.listener.upZ.setTargetAtTime(upZ, now, this._rampTimeConstant);
	        } else {
	            this.context.listener.setOrientation(x, y, z, upX, upY, upZ);
	        }
	        this._orientation = Array.prototype.slice.call(arguments);
	        return this;
	    };
	    /**
		 *  The x position of the panner object.
		 *  @type {Number}
		 *  @memberOf Tone.Listener#
		 *  @name positionX
		 */
	    Object.defineProperty(Tone.Listener.prototype, 'positionX', {
	        set: function (pos) {
	            this._position[0] = pos;
	            this.setPosition.apply(this, this._position);
	        },
	        get: function () {
	            return this._position[0];
	        }
	    });
	    /**
		 *  The y position of the panner object.
		 *  @type {Number}
		 *  @memberOf Tone.Listener#
		 *  @name positionY
		 */
	    Object.defineProperty(Tone.Listener.prototype, 'positionY', {
	        set: function (pos) {
	            this._position[1] = pos;
	            this.setPosition.apply(this, this._position);
	        },
	        get: function () {
	            return this._position[1];
	        }
	    });
	    /**
		 *  The z position of the panner object.
		 *  @type {Number}
		 *  @memberOf Tone.Listener#
		 *  @name positionZ
		 */
	    Object.defineProperty(Tone.Listener.prototype, 'positionZ', {
	        set: function (pos) {
	            this._position[2] = pos;
	            this.setPosition.apply(this, this._position);
	        },
	        get: function () {
	            return this._position[2];
	        }
	    });
	    /**
		 *  The x coordinate of the listeners front direction. i.e. 
		 *  which way they are facing.
		 *  @type {Number}
		 *  @memberOf Tone.Listener#
		 *  @name forwardX
		 */
	    Object.defineProperty(Tone.Listener.prototype, 'forwardX', {
	        set: function (pos) {
	            this._orientation[0] = pos;
	            this.setOrientation.apply(this, this._orientation);
	        },
	        get: function () {
	            return this._orientation[0];
	        }
	    });
	    /**
		 *  The y coordinate of the listeners front direction. i.e. 
		 *  which way they are facing.
		 *  @type {Number}
		 *  @memberOf Tone.Listener#
		 *  @name forwardY
		 */
	    Object.defineProperty(Tone.Listener.prototype, 'forwardY', {
	        set: function (pos) {
	            this._orientation[1] = pos;
	            this.setOrientation.apply(this, this._orientation);
	        },
	        get: function () {
	            return this._orientation[1];
	        }
	    });
	    /**
		 *  The z coordinate of the listeners front direction. i.e. 
		 *  which way they are facing.
		 *  @type {Number}
		 *  @memberOf Tone.Listener#
		 *  @name forwardZ
		 */
	    Object.defineProperty(Tone.Listener.prototype, 'forwardZ', {
	        set: function (pos) {
	            this._orientation[2] = pos;
	            this.setOrientation.apply(this, this._orientation);
	        },
	        get: function () {
	            return this._orientation[2];
	        }
	    });
	    /**
		 *  The x coordinate of the listener's up direction. i.e.
		 *  the direction the listener is standing in.
		 *  @type {Number}
		 *  @memberOf Tone.Listener#
		 *  @name upX
		 */
	    Object.defineProperty(Tone.Listener.prototype, 'upX', {
	        set: function (pos) {
	            this._orientation[3] = pos;
	            this.setOrientation.apply(this, this._orientation);
	        },
	        get: function () {
	            return this._orientation[3];
	        }
	    });
	    /**
		 *  The y coordinate of the listener's up direction. i.e.
		 *  the direction the listener is standing in.
		 *  @type {Number}
		 *  @memberOf Tone.Listener#
		 *  @name upY
		 */
	    Object.defineProperty(Tone.Listener.prototype, 'upY', {
	        set: function (pos) {
	            this._orientation[4] = pos;
	            this.setOrientation.apply(this, this._orientation);
	        },
	        get: function () {
	            return this._orientation[4];
	        }
	    });
	    /**
		 *  The z coordinate of the listener's up direction. i.e.
		 *  the direction the listener is standing in.
		 *  @type {Number}
		 *  @memberOf Tone.Listener#
		 *  @name upZ
		 */
	    Object.defineProperty(Tone.Listener.prototype, 'upZ', {
	        set: function (pos) {
	            this._orientation[5] = pos;
	            this.setOrientation.apply(this, this._orientation);
	        },
	        get: function () {
	            return this._orientation[5];
	        }
	    });
	    /**
		 *  Clean up.
		 *  @returns {Tone.Listener} this
		 */
	    Tone.Listener.prototype.dispose = function () {
	        this._orientation = null;
	        this._position = null;
	        return this;
	    };
	    //SINGLETON SETUP
	    var ListenerConstructor = Tone.Listener;
	    Tone.Listener = new ListenerConstructor();
	    Tone.Context.on('init', function (context) {
	        if (context.Listener instanceof ListenerConstructor) {
	            //a single listener object
	            Tone.Listener = context.Listener;
	        } else {
	            //make new Listener insides
	            Tone.Listener = new ListenerConstructor();
	        }
	        context.Listener = Tone.Listener;
	    });
	    //END SINGLETON SETUP
	    return Tone.Listener;
	});
	Module(function (Tone) {
	    /**
		 *  shim
		 *  @private
		 */
	    if (!window.hasOwnProperty('OfflineAudioContext') && window.hasOwnProperty('webkitOfflineAudioContext')) {
	        window.OfflineAudioContext = window.webkitOfflineAudioContext;
	    }
	    /**
		 *  @class Wrapper around the OfflineAudioContext
		 *  @extends {Tone.Context}
		 *  @param  {Number}  channels  The number of channels to render
		 *  @param  {Number}  duration  The duration to render in samples
		 *  @param {Number} sampleRate the sample rate to render at
		 */
	    Tone.OfflineContext = function (channels, duration, sampleRate) {
	        /**
			 *  The offline context
			 *  @private
			 *  @type  {OfflineAudioContext}
			 */
	        var offlineContext = new OfflineAudioContext(channels, duration * sampleRate, sampleRate);
	        //wrap the methods/members
	        Tone.Context.call(this, {
	            'context': offlineContext,
	            'clockSource': 'offline',
	            'lookAhead': 0,
	            'updateInterval': 128 / sampleRate
	        });
	        /**
			 *  A private reference to the duration
			 *  @private
			 *  @type  {Number}
			 */
	        this._duration = duration;
	        /**
			 *  An artificial clock source
			 *  @type  {Number}
			 *  @private
			 */
	        this._currentTime = 0;
	    };
	    Tone.extend(Tone.OfflineContext, Tone.Context);
	    /**
		 *  Override the now method to point to the internal clock time
		 *  @return  {Number}
		 */
	    Tone.OfflineContext.prototype.now = function () {
	        return this._currentTime;
	    };
	    /**
		 *  Render the output of the OfflineContext
		 *  @return  {Promise}
		 */
	    Tone.OfflineContext.prototype.render = function () {
	        while (this._duration - this._currentTime >= 0) {
	            //invoke all the callbacks on that time
	            this.emit('tick');
	            //increment the clock
	            this._currentTime += this.blockTime;
	        }
	        //promise returned is not yet implemented in all browsers
	        return new Promise(function (done) {
	            this._context.oncomplete = function (e) {
	                done(e.renderedBuffer);
	            };
	            this._context.startRendering();
	        }.bind(this));
	    };
	    /**
		 *  Close the context
		 *  @return  {Number}
		 */
	    Tone.OfflineContext.prototype.close = function () {
	        this._context = null;
	    };
	    return Tone.OfflineContext;
	});
	Module(function (Tone) {
	    /**
		 *  Generate a buffer by rendering all of the Tone.js code within the callback using the OfflineAudioContext. 
		 *  The OfflineAudioContext is capable of rendering much faster than real time in many cases. 
		 *  The callback function also passes in an offline instance of Tone.Transport which can be used
		 *  to schedule events along the Transport. 
		 *  @param  {Function}  callback  All Tone.js nodes which are created and scheduled within this callback are recorded into the output Buffer.
		 *  @param  {Time}  duration     the amount of time to record for.
		 *  @return  {Promise}  The promise which is invoked with the Tone.Buffer of the recorded output.
		 *  @example
		 * //render 2 seconds of the oscillator
		 * Tone.Offline(function(){
		 * 	//only nodes created in this callback will be recorded
		 * 	var oscillator = new Tone.Oscillator().toMaster().start(0)
		 * 	//schedule their events
		 * }, 2).then(function(buffer){
		 * 	//do something with the output buffer
		 * })
		 * @example
		 * //can also schedule events along the Transport
		 * //using the passed in Offline Transport
		 * Tone.Offline(function(Transport){
		 * 	var osc = new Tone.Oscillator().toMaster()
		 * 	Transport.schedule(function(time){
		 * 		osc.start(time).stop(time + 0.1)
		 * 	}, 1)
		 * 	Transport.start(0.2)
		 * }, 4).then(function(buffer){
		 * 	//do something with the output buffer
		 * })
		 */
	    Tone.Offline = function (callback, duration) {
	        //set the OfflineAudioContext
	        var sampleRate = Tone.context.sampleRate;
	        var originalContext = Tone.context;
	        var context = new Tone.OfflineContext(2, duration, sampleRate);
	        Tone.context = context;
	        //invoke the callback/scheduling
	        callback(Tone.Transport);
	        //process the audio
	        var rendered = context.render();
	        //return the original AudioContext
	        Tone.context = originalContext;
	        //return the audio
	        return rendered.then(function (buffer) {
	            //wrap it in a Tone.Buffer
	            return new Tone.Buffer(buffer);
	        });
	    };
	    return Tone.Offline;
	});
	Module(function (Tone) {
	    
	    /**
		 * 	@class  Tone.Effect is the base class for effects. Connect the effect between
		 * 	        the effectSend and effectReturn GainNodes, then control the amount of
		 * 	        effect which goes to the output using the wet control.
		 *
		 *  @constructor
		 *  @extends {Tone.AudioNode}
		 *  @param {NormalRange|Object} [wet] The starting wet value.
		 */
	    Tone.Effect = function () {
	        var options = Tone.defaults(arguments, ['wet'], Tone.Effect);
	        Tone.AudioNode.call(this);
	        this.createInsOuts(1, 1);
	        /**
			 *  the drywet knob to control the amount of effect
			 *  @type {Tone.CrossFade}
			 *  @private
			 */
	        this._dryWet = new Tone.CrossFade(options.wet);
	        /**
			 *  The wet control is how much of the effected
			 *  will pass through to the output. 1 = 100% effected
			 *  signal, 0 = 100% dry signal.
			 *  @type {NormalRange}
			 *  @signal
			 */
	        this.wet = this._dryWet.fade;
	        /**
			 *  connect the effectSend to the input of hte effect
			 *  @type {Tone.Gain}
			 *  @private
			 */
	        this.effectSend = new Tone.Gain();
	        /**
			 *  connect the output of the effect to the effectReturn
			 *  @type {Tone.Gain}
			 *  @private
			 */
	        this.effectReturn = new Tone.Gain();
	        //connections
	        this.input.connect(this._dryWet.a);
	        this.input.connect(this.effectSend);
	        this.effectReturn.connect(this._dryWet.b);
	        this._dryWet.connect(this.output);
	        this._readOnly(['wet']);
	    };
	    Tone.extend(Tone.Effect, Tone.AudioNode);
	    /**
		 *  @static
		 *  @type {Object}
		 */
	    Tone.Effect.defaults = { 'wet': 1 };
	    /**
		 *  chains the effect in between the effectSend and effectReturn
		 *  @param  {Tone} effect
		 *  @private
		 *  @returns {Tone.Effect} this
		 */
	    Tone.Effect.prototype.connectEffect = function (effect) {
	        this.effectSend.chain(effect, this.effectReturn);
	        return this;
	    };
	    /**
		 *  Clean up.
		 *  @returns {Tone.Effect} this
		 */
	    Tone.Effect.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._dryWet.dispose();
	        this._dryWet = null;
	        this.effectSend.dispose();
	        this.effectSend = null;
	        this.effectReturn.dispose();
	        this.effectReturn = null;
	        this._writable(['wet']);
	        this.wet = null;
	        return this;
	    };
	    return Tone.Effect;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.AutoFilter is a Tone.Filter with a Tone.LFO connected to the filter cutoff frequency.
		 *         Setting the LFO rate and depth allows for control over the filter modulation rate 
		 *         and depth.
		 *
		 *  @constructor
		 *  @extends {Tone.Effect}
		 *  @param {Time|Object} [frequency] The rate of the LFO.
		 *  @param {Frequency=} baseFrequency The lower value of the LFOs oscillation
	 	 *  @param {Frequency=} octaves The number of octaves above the baseFrequency
		 *  @example
		 * //create an autofilter and start it's LFO
		 * var autoFilter = new Tone.AutoFilter("4n").toMaster().start();
		 * //route an oscillator through the filter and start it
		 * var oscillator = new Tone.Oscillator().connect(autoFilter).start();
		 */
	    Tone.AutoFilter = function () {
	        var options = Tone.defaults(arguments, [
	            'frequency',
	            'baseFrequency',
	            'octaves'
	        ], Tone.AutoFilter);
	        Tone.Effect.call(this, options);
	        /**
			 *  the lfo which drives the filter cutoff
			 *  @type {Tone.LFO}
			 *  @private
			 */
	        this._lfo = new Tone.LFO({
	            'frequency': options.frequency,
	            'amplitude': options.depth
	        });
	        /**
			 * The range of the filter modulating between the min and max frequency. 
			 * 0 = no modulation. 1 = full modulation.
			 * @type {NormalRange}
			 * @signal
			 */
	        this.depth = this._lfo.amplitude;
	        /**
			 * How fast the filter modulates between min and max. 
			 * @type {Frequency}
			 * @signal
			 */
	        this.frequency = this._lfo.frequency;
	        /**
			 *  The filter node
			 *  @type {Tone.Filter}
			 */
	        this.filter = new Tone.Filter(options.filter);
	        /**
			 *  The octaves placeholder
			 *  @type {Positive}
			 *  @private
			 */
	        this._octaves = 0;
	        //connections
	        this.connectEffect(this.filter);
	        this._lfo.connect(this.filter.frequency);
	        this.type = options.type;
	        this._readOnly([
	            'frequency',
	            'depth'
	        ]);
	        this.octaves = options.octaves;
	        this.baseFrequency = options.baseFrequency;
	    };
	    //extend Effect
	    Tone.extend(Tone.AutoFilter, Tone.Effect);
	    /**
		 *  defaults
		 *  @static
		 *  @type {Object}
		 */
	    Tone.AutoFilter.defaults = {
	        'frequency': 1,
	        'type': 'sine',
	        'depth': 1,
	        'baseFrequency': 200,
	        'octaves': 2.6,
	        'filter': {
	            'type': 'lowpass',
	            'rolloff': -12,
	            'Q': 1
	        }
	    };
	    /**
		 * Start the effect.
		 * @param {Time} [time=now] When the LFO will start. 
		 * @returns {Tone.AutoFilter} this
		 */
	    Tone.AutoFilter.prototype.start = function (time) {
	        this._lfo.start(time);
	        return this;
	    };
	    /**
		 * Stop the effect.
		 * @param {Time} [time=now] When the LFO will stop. 
		 * @returns {Tone.AutoFilter} this
		 */
	    Tone.AutoFilter.prototype.stop = function (time) {
	        this._lfo.stop(time);
	        return this;
	    };
	    /**
		 * Sync the filter to the transport.
		 * @param {Time} [delay=0] Delay time before starting the effect after the
		 *                               Transport has started. 
		 * @returns {Tone.AutoFilter} this
		 */
	    Tone.AutoFilter.prototype.sync = function (delay) {
	        this._lfo.sync(delay);
	        return this;
	    };
	    /**
		 * Unsync the filter from the transport.
		 * @returns {Tone.AutoFilter} this
		 */
	    Tone.AutoFilter.prototype.unsync = function () {
	        this._lfo.unsync();
	        return this;
	    };
	    /**
		 * Type of oscillator attached to the AutoFilter. 
		 * Possible values: "sine", "square", "triangle", "sawtooth".
		 * @memberOf Tone.AutoFilter#
		 * @type {string}
		 * @name type
		 */
	    Object.defineProperty(Tone.AutoFilter.prototype, 'type', {
	        get: function () {
	            return this._lfo.type;
	        },
	        set: function (type) {
	            this._lfo.type = type;
	        }
	    });
	    /**
		 * The minimum value of the filter's cutoff frequency.
		 * @memberOf Tone.AutoFilter#
		 * @type {Frequency}
		 * @name min
		 */
	    Object.defineProperty(Tone.AutoFilter.prototype, 'baseFrequency', {
	        get: function () {
	            return this._lfo.min;
	        },
	        set: function (freq) {
	            this._lfo.min = this.toFrequency(freq);
	            //and set the max
	            this.octaves = this._octaves;
	        }
	    });
	    /**
		 * The maximum value of the filter's cutoff frequency. 
		 * @memberOf Tone.AutoFilter#
		 * @type {Positive}
		 * @name octaves
		 */
	    Object.defineProperty(Tone.AutoFilter.prototype, 'octaves', {
	        get: function () {
	            return this._octaves;
	        },
	        set: function (oct) {
	            this._octaves = oct;
	            this._lfo.max = this.baseFrequency * Math.pow(2, oct);
	        }
	    });
	    /**
		 *  Clean up. 
		 *  @returns {Tone.AutoFilter} this
		 */
	    Tone.AutoFilter.prototype.dispose = function () {
	        Tone.Effect.prototype.dispose.call(this);
	        this._lfo.dispose();
	        this._lfo = null;
	        this.filter.dispose();
	        this.filter = null;
	        this._writable([
	            'frequency',
	            'depth'
	        ]);
	        this.frequency = null;
	        this.depth = null;
	        return this;
	    };
	    return Tone.AutoFilter;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.AutoPanner is a Tone.Panner with an LFO connected to the pan amount. 
		 *         More on using autopanners [here](https://www.ableton.com/en/blog/autopan-chopper-effect-and-more-liveschool/).
		 *
		 *  @constructor
		 *  @extends {Tone.Effect}
		 *  @param {Frequency|Object} [frequency] Rate of left-right oscillation. 
		 *  @example
		 * //create an autopanner and start it's LFO
		 * var autoPanner = new Tone.AutoPanner("4n").toMaster().start();
		 * //route an oscillator through the panner and start it
		 * var oscillator = new Tone.Oscillator().connect(autoPanner).start();
		 */
	    Tone.AutoPanner = function () {
	        var options = Tone.defaults(arguments, ['frequency'], Tone.AutoPanner);
	        Tone.Effect.call(this, options);
	        /**
			 *  the lfo which drives the panning
			 *  @type {Tone.LFO}
			 *  @private
			 */
	        this._lfo = new Tone.LFO({
	            'frequency': options.frequency,
	            'amplitude': options.depth,
	            'min': -1,
	            'max': 1
	        });
	        /**
			 * The amount of panning between left and right. 
			 * 0 = always center. 1 = full range between left and right. 
			 * @type {NormalRange}
			 * @signal
			 */
	        this.depth = this._lfo.amplitude;
	        /**
			 *  the panner node which does the panning
			 *  @type {Tone.Panner}
			 *  @private
			 */
	        this._panner = new Tone.Panner();
	        /**
			 * How fast the panner modulates between left and right. 
			 * @type {Frequency}
			 * @signal
			 */
	        this.frequency = this._lfo.frequency;
	        //connections
	        this.connectEffect(this._panner);
	        this._lfo.connect(this._panner.pan);
	        this.type = options.type;
	        this._readOnly([
	            'depth',
	            'frequency'
	        ]);
	    };
	    //extend Effect
	    Tone.extend(Tone.AutoPanner, Tone.Effect);
	    /**
		 *  defaults
		 *  @static
		 *  @type {Object}
		 */
	    Tone.AutoPanner.defaults = {
	        'frequency': 1,
	        'type': 'sine',
	        'depth': 1
	    };
	    /**
		 * Start the effect.
		 * @param {Time} [time=now] When the LFO will start. 
		 * @returns {Tone.AutoPanner} this
		 */
	    Tone.AutoPanner.prototype.start = function (time) {
	        this._lfo.start(time);
	        return this;
	    };
	    /**
		 * Stop the effect.
		 * @param {Time} [time=now] When the LFO will stop. 
		 * @returns {Tone.AutoPanner} this
		 */
	    Tone.AutoPanner.prototype.stop = function (time) {
	        this._lfo.stop(time);
	        return this;
	    };
	    /**
		 * Sync the panner to the transport.
		 * @param {Time} [delay=0] Delay time before starting the effect after the
		 *                               Transport has started. 
		 * @returns {Tone.AutoPanner} this
		 */
	    Tone.AutoPanner.prototype.sync = function (delay) {
	        this._lfo.sync(delay);
	        return this;
	    };
	    /**
		 * Unsync the panner from the transport
		 * @returns {Tone.AutoPanner} this
		 */
	    Tone.AutoPanner.prototype.unsync = function () {
	        this._lfo.unsync();
	        return this;
	    };
	    /**
		 * Type of oscillator attached to the AutoFilter. 
		 * Possible values: "sine", "square", "triangle", "sawtooth".
		 * @memberOf Tone.AutoFilter#
		 * @type {string}
		 * @name type
		 */
	    Object.defineProperty(Tone.AutoPanner.prototype, 'type', {
	        get: function () {
	            return this._lfo.type;
	        },
	        set: function (type) {
	            this._lfo.type = type;
	        }
	    });
	    /**
		 *  clean up
		 *  @returns {Tone.AutoPanner} this
		 */
	    Tone.AutoPanner.prototype.dispose = function () {
	        Tone.Effect.prototype.dispose.call(this);
	        this._lfo.dispose();
	        this._lfo = null;
	        this._panner.dispose();
	        this._panner = null;
	        this._writable([
	            'depth',
	            'frequency'
	        ]);
	        this.frequency = null;
	        this.depth = null;
	        return this;
	    };
	    return Tone.AutoPanner;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Tone.AutoWah connects a Tone.Follower to a bandpass filter (Tone.Filter).
		 *          The frequency of the filter is adjusted proportionally to the 
		 *          incoming signal's amplitude. Inspiration from [Tuna.js](https://github.com/Dinahmoe/tuna).
		 *
		 *  @constructor
		 *  @extends {Tone.Effect}
		 *  @param {Frequency|Object} [baseFrequency] The frequency the filter is set 
		 *                                            to at the low point of the wah
		 *  @param {Positive} [octaves] The number of octaves above the baseFrequency
		 *                                the filter will sweep to when fully open
		 *  @param {Decibels} [sensitivity] The decibel threshold sensitivity for 
		 *                                   the incoming signal. Normal range of -40 to 0. 
		 *  @example
		 * var autoWah = new Tone.AutoWah(50, 6, -30).toMaster();
		 * //initialize the synth and connect to autowah
		 * var synth = new Synth.connect(autoWah);
		 * //Q value influences the effect of the wah - default is 2
		 * autoWah.Q.value = 6;
		 * //more audible on higher notes
		 * synth.triggerAttackRelease("C4", "8n")
		 */
	    Tone.AutoWah = function () {
	        var options = Tone.defaults(arguments, [
	            'baseFrequency',
	            'octaves',
	            'sensitivity'
	        ], Tone.AutoWah);
	        Tone.Effect.call(this, options);
	        /**
			 *  The envelope follower. Set the attack/release
			 *  timing to adjust how the envelope is followed. 
			 *  @type {Tone.Follower}
			 *  @private
			 */
	        this.follower = new Tone.Follower(options.follower);
	        /**
			 *  scales the follower value to the frequency domain
			 *  @type {Tone}
			 *  @private
			 */
	        this._sweepRange = new Tone.ScaleExp(0, 1, 0.5);
	        /**
			 *  @type {number}
			 *  @private
			 */
	        this._baseFrequency = options.baseFrequency;
	        /**
			 *  @type {number}
			 *  @private
			 */
	        this._octaves = options.octaves;
	        /**
			 *  the input gain to adjust the sensitivity
			 *  @type {Tone.Gain}
			 *  @private
			 */
	        this._inputBoost = new Tone.Gain();
	        /**
			 *  @type {BiquadFilterNode}
			 *  @private
			 */
	        this._bandpass = new Tone.Filter({
	            'rolloff': -48,
	            'frequency': 0,
	            'Q': options.Q
	        });
	        /**
			 *  @type {Tone.Filter}
			 *  @private
			 */
	        this._peaking = new Tone.Filter(0, 'peaking');
	        this._peaking.gain.value = options.gain;
	        /**
			 * The gain of the filter.
			 * @type {Number}
			 * @signal
			 */
	        this.gain = this._peaking.gain;
	        /**
			 * The quality of the filter.
			 * @type {Positive}
			 * @signal
			 */
	        this.Q = this._bandpass.Q;
	        //the control signal path
	        this.effectSend.chain(this._inputBoost, this.follower, this._sweepRange);
	        this._sweepRange.connect(this._bandpass.frequency);
	        this._sweepRange.connect(this._peaking.frequency);
	        //the filtered path
	        this.effectSend.chain(this._bandpass, this._peaking, this.effectReturn);
	        //set the initial value
	        this._setSweepRange();
	        this.sensitivity = options.sensitivity;
	        this._readOnly([
	            'gain',
	            'Q'
	        ]);
	    };
	    Tone.extend(Tone.AutoWah, Tone.Effect);
	    /**
		 *  @static
		 *  @type {Object}
		 */
	    Tone.AutoWah.defaults = {
	        'baseFrequency': 100,
	        'octaves': 6,
	        'sensitivity': 0,
	        'Q': 2,
	        'gain': 2,
	        'follower': {
	            'attack': 0.3,
	            'release': 0.5
	        }
	    };
	    /**
		 * The number of octaves that the filter will sweep above the 
		 * baseFrequency. 
		 * @memberOf Tone.AutoWah#
		 * @type {Number}
		 * @name octaves
		 */
	    Object.defineProperty(Tone.AutoWah.prototype, 'octaves', {
	        get: function () {
	            return this._octaves;
	        },
	        set: function (octaves) {
	            this._octaves = octaves;
	            this._setSweepRange();
	        }
	    });
	    /**
		 * The base frequency from which the sweep will start from.
		 * @memberOf Tone.AutoWah#
		 * @type {Frequency}
		 * @name baseFrequency
		 */
	    Object.defineProperty(Tone.AutoWah.prototype, 'baseFrequency', {
	        get: function () {
	            return this._baseFrequency;
	        },
	        set: function (baseFreq) {
	            this._baseFrequency = baseFreq;
	            this._setSweepRange();
	        }
	    });
	    /**
		 * The sensitivity to control how responsive to the input signal the filter is. 
		 * @memberOf Tone.AutoWah#
		 * @type {Decibels}
		 * @name sensitivity
		 */
	    Object.defineProperty(Tone.AutoWah.prototype, 'sensitivity', {
	        get: function () {
	            return Tone.gainToDb(1 / this._inputBoost.gain.value);
	        },
	        set: function (sensitivy) {
	            this._inputBoost.gain.value = 1 / Tone.dbToGain(sensitivy);
	        }
	    });
	    /**
		 *  sets the sweep range of the scaler
		 *  @private
		 */
	    Tone.AutoWah.prototype._setSweepRange = function () {
	        this._sweepRange.min = this._baseFrequency;
	        this._sweepRange.max = Math.min(this._baseFrequency * Math.pow(2, this._octaves), this.context.sampleRate / 2);
	    };
	    /**
		 *  Clean up.
		 *  @returns {Tone.AutoWah} this
		 */
	    Tone.AutoWah.prototype.dispose = function () {
	        Tone.Effect.prototype.dispose.call(this);
	        this.follower.dispose();
	        this.follower = null;
	        this._sweepRange.dispose();
	        this._sweepRange = null;
	        this._bandpass.dispose();
	        this._bandpass = null;
	        this._peaking.dispose();
	        this._peaking = null;
	        this._inputBoost.dispose();
	        this._inputBoost = null;
	        this._writable([
	            'gain',
	            'Q'
	        ]);
	        this.gain = null;
	        this.Q = null;
	        return this;
	    };
	    return Tone.AutoWah;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.Bitcrusher downsamples the incoming signal to a different bitdepth. 
		 *         Lowering the bitdepth of the signal creates distortion. Read more about Bitcrushing
		 *         on [Wikipedia](https://en.wikipedia.org/wiki/Bitcrusher).
		 *
		 *  @constructor
		 *  @extends {Tone.Effect}
		 *  @param {Number} bits The number of bits to downsample the signal. Nominal range
		 *                       of 1 to 8. 
		 *  @example
		 * //initialize crusher and route a synth through it
		 * var crusher = new Tone.BitCrusher(4).toMaster();
		 * var synth = new Tone.MonoSynth().connect(crusher);
		 */
	    Tone.BitCrusher = function () {
	        var options = Tone.defaults(arguments, ['bits'], Tone.BitCrusher);
	        Tone.Effect.call(this, options);
	        var invStepSize = 1 / Math.pow(2, options.bits - 1);
	        /**
			 *  Subtract the input signal and the modulus of the input signal
			 *  @type {Tone.Subtract}
			 *  @private
			 */
	        this._subtract = new Tone.Subtract();
	        /**
			 *  The mod function
			 *  @type  {Tone.Modulo}
			 *  @private
			 */
	        this._modulo = new Tone.Modulo(invStepSize);
	        /**
			 *  keeps track of the bits
			 *  @type {number}
			 *  @private
			 */
	        this._bits = options.bits;
	        //connect it up
	        this.effectSend.fan(this._subtract, this._modulo);
	        this._modulo.connect(this._subtract, 0, 1);
	        this._subtract.connect(this.effectReturn);
	    };
	    Tone.extend(Tone.BitCrusher, Tone.Effect);
	    /**
		 *  the default values
		 *  @static
		 *  @type {Object}
		 */
	    Tone.BitCrusher.defaults = { 'bits': 4 };
	    /**
		 * The bit depth of the effect. Nominal range of 1-8. 
		 * @memberOf Tone.BitCrusher#
		 * @type {number}
		 * @name bits
		 */
	    Object.defineProperty(Tone.BitCrusher.prototype, 'bits', {
	        get: function () {
	            return this._bits;
	        },
	        set: function (bits) {
	            this._bits = bits;
	            var invStepSize = 1 / Math.pow(2, bits - 1);
	            this._modulo.value = invStepSize;
	        }
	    });
	    /**
		 *  Clean up. 
		 *  @returns {Tone.BitCrusher} this
		 */
	    Tone.BitCrusher.prototype.dispose = function () {
	        Tone.Effect.prototype.dispose.call(this);
	        this._subtract.dispose();
	        this._subtract = null;
	        this._modulo.dispose();
	        this._modulo = null;
	        return this;
	    };
	    return Tone.BitCrusher;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.ChebyShev is a Chebyshev waveshaper, an effect which is good 
		 *         for making different types of distortion sounds.
		 *         Note that odd orders sound very different from even ones, 
		 *         and order = 1 is no change. 
		 *         Read more at [music.columbia.edu](http://music.columbia.edu/cmc/musicandcomputers/chapter4/04_06.php).
		 *
		 *  @extends {Tone.Effect}
		 *  @constructor
		 *  @param {Positive|Object} [order] The order of the chebyshev polynomial. Normal range between 1-100. 
		 *  @example
		 * //create a new cheby
		 * var cheby = new Tone.Chebyshev(50);
		 * //create a monosynth connected to our cheby
		 * synth = new Tone.MonoSynth().connect(cheby);
		 */
	    Tone.Chebyshev = function () {
	        var options = Tone.defaults(arguments, ['order'], Tone.Chebyshev);
	        Tone.Effect.call(this, options);
	        /**
			 *  @type {WaveShaperNode}
			 *  @private
			 */
	        this._shaper = new Tone.WaveShaper(4096);
	        /**
			 * holds onto the order of the filter
			 * @type {number}
			 * @private
			 */
	        this._order = options.order;
	        this.connectEffect(this._shaper);
	        this.order = options.order;
	        this.oversample = options.oversample;
	    };
	    Tone.extend(Tone.Chebyshev, Tone.Effect);
	    /**
		 *  @static
		 *  @const
		 *  @type {Object}
		 */
	    Tone.Chebyshev.defaults = {
	        'order': 1,
	        'oversample': 'none'
	    };
	    /**
		 *  get the coefficient for that degree
		 *  @param {number} x the x value
		 *  @param   {number} degree 
		 *  @param {Object} memo memoize the computed value. 
		 *                       this speeds up computation greatly. 
		 *  @return  {number}       the coefficient 
		 *  @private
		 */
	    Tone.Chebyshev.prototype._getCoefficient = function (x, degree, memo) {
	        if (memo.hasOwnProperty(degree)) {
	            return memo[degree];
	        } else if (degree === 0) {
	            memo[degree] = 0;
	        } else if (degree === 1) {
	            memo[degree] = x;
	        } else {
	            memo[degree] = 2 * x * this._getCoefficient(x, degree - 1, memo) - this._getCoefficient(x, degree - 2, memo);
	        }
	        return memo[degree];
	    };
	    /**
		 * The order of the Chebyshev polynomial which creates
		 * the equation which is applied to the incoming 
		 * signal through a Tone.WaveShaper. The equations
		 * are in the form:<br>
		 * order 2: 2x^2 + 1<br>
		 * order 3: 4x^3 + 3x <br>
		 * @memberOf Tone.Chebyshev#
		 * @type {Positive}
		 * @name order
		 */
	    Object.defineProperty(Tone.Chebyshev.prototype, 'order', {
	        get: function () {
	            return this._order;
	        },
	        set: function (order) {
	            this._order = order;
	            var curve = new Array(4096);
	            var len = curve.length;
	            for (var i = 0; i < len; ++i) {
	                var x = i * 2 / len - 1;
	                if (x === 0) {
	                    //should output 0 when input is 0
	                    curve[i] = 0;
	                } else {
	                    curve[i] = this._getCoefficient(x, order, {});
	                }
	            }
	            this._shaper.curve = curve;
	        }
	    });
	    /**
		 * The oversampling of the effect. Can either be "none", "2x" or "4x".
		 * @memberOf Tone.Chebyshev#
		 * @type {string}
		 * @name oversample
		 */
	    Object.defineProperty(Tone.Chebyshev.prototype, 'oversample', {
	        get: function () {
	            return this._shaper.oversample;
	        },
	        set: function (oversampling) {
	            this._shaper.oversample = oversampling;
	        }
	    });
	    /**
		 *  Clean up. 
		 *  @returns {Tone.Chebyshev} this
		 */
	    Tone.Chebyshev.prototype.dispose = function () {
	        Tone.Effect.prototype.dispose.call(this);
	        this._shaper.dispose();
	        this._shaper = null;
	        return this;
	    };
	    return Tone.Chebyshev;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Base class for Stereo effects. Provides effectSendL/R and effectReturnL/R.
		 *
		 *	@constructor
		 *	@extends {Tone.Effect}
		 */
	    Tone.StereoEffect = function () {
	        //get the defaults
	        Tone.AudioNode.call(this);
	        var options = Tone.defaults(arguments, ['wet'], Tone.Effect);
	        this.createInsOuts(1, 1);
	        /**
			 *  the drywet knob to control the amount of effect
			 *  @type {Tone.CrossFade}
			 *  @private
			 */
	        this._dryWet = new Tone.CrossFade(options.wet);
	        /**
			 *  The wet control, i.e. how much of the effected
			 *  will pass through to the output.
			 *  @type {NormalRange}
			 *  @signal
			 */
	        this.wet = this._dryWet.fade;
	        /**
			 *  then split it
			 *  @type {Tone.Split}
			 *  @private
			 */
	        this._split = new Tone.Split();
	        /**
			 *  the effects send LEFT
			 *  @type {GainNode}
			 *  @private
			 */
	        this.effectSendL = this._split.left;
	        /**
			 *  the effects send RIGHT
			 *  @type {GainNode}
			 *  @private
			 */
	        this.effectSendR = this._split.right;
	        /**
			 *  the stereo effect merger
			 *  @type {Tone.Merge}
			 *  @private
			 */
	        this._merge = new Tone.Merge();
	        /**
			 *  the effect return LEFT
			 *  @type {GainNode}
			 *  @private
			 */
	        this.effectReturnL = this._merge.left;
	        /**
			 *  the effect return RIGHT
			 *  @type {GainNode}
			 *  @private
			 */
	        this.effectReturnR = this._merge.right;
	        //connections
	        this.input.connect(this._split);
	        //dry wet connections
	        this.input.connect(this._dryWet, 0, 0);
	        this._merge.connect(this._dryWet, 0, 1);
	        this._dryWet.connect(this.output);
	        this._readOnly(['wet']);
	    };
	    Tone.extend(Tone.StereoEffect, Tone.Effect);
	    /**
		 *  Clean up.
		 *  @returns {Tone.StereoEffect} this
		 */
	    Tone.StereoEffect.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._dryWet.dispose();
	        this._dryWet = null;
	        this._split.dispose();
	        this._split = null;
	        this._merge.dispose();
	        this._merge = null;
	        this.effectSendL = null;
	        this.effectSendR = null;
	        this.effectReturnL = null;
	        this.effectReturnR = null;
	        this._writable(['wet']);
	        this.wet = null;
	        return this;
	    };
	    return Tone.StereoEffect;
	});
	Module(function (Tone) {
	    
	    /**
		 * 	@class  Tone.FeedbackEffect provides a loop between an 
		 * 	        audio source and its own output. This is a base-class
		 * 	        for feedback effects. 
		 *
		 *  @constructor
		 *  @extends {Tone.Effect}
		 *  @param {NormalRange|Object} [feedback] The initial feedback value.
		 */
	    Tone.FeedbackEffect = function () {
	        var options = Tone.defaults(arguments, ['feedback'], Tone.FeedbackEffect);
	        Tone.Effect.call(this, options);
	        /**
			 *  the gain which controls the feedback
			 *  @type {Tone.Gain}
			 *  @private
			 */
	        this._feedbackGain = new Tone.Gain(options.feedback, Tone.Type.NormalRange);
	        /**
			 *  The amount of signal which is fed back into the effect input. 
			 *  @type {NormalRange}
			 *  @signal
			 */
	        this.feedback = this._feedbackGain.gain;
	        //the feedback loop
	        this.effectReturn.chain(this._feedbackGain, this.effectSend);
	        this._readOnly(['feedback']);
	    };
	    Tone.extend(Tone.FeedbackEffect, Tone.Effect);
	    /**
		 *  @static
		 *  @type {Object}
		 */
	    Tone.FeedbackEffect.defaults = { 'feedback': 0.125 };
	    /**
		 *  Clean up. 
		 *  @returns {Tone.FeedbackEffect} this
		 */
	    Tone.FeedbackEffect.prototype.dispose = function () {
	        Tone.Effect.prototype.dispose.call(this);
	        this._writable(['feedback']);
	        this._feedbackGain.dispose();
	        this._feedbackGain = null;
	        this.feedback = null;
	        return this;
	    };
	    return Tone.FeedbackEffect;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Just like a stereo feedback effect, but the feedback is routed from left to right
		 *         and right to left instead of on the same channel.
		 *
		 *	@constructor
		 *	@extends {Tone.StereoEffect}
		 */
	    Tone.StereoXFeedbackEffect = function () {
	        var options = Tone.defaults(arguments, ['feedback'], Tone.FeedbackEffect);
	        Tone.StereoEffect.call(this, options);
	        /**
			 *  The amount of feedback from the output
			 *  back into the input of the effect (routed
			 *  across left and right channels).
			 *  @type {NormalRange}
			 *  @signal
			 */
	        this.feedback = new Tone.Signal(options.feedback, Tone.Type.NormalRange);
	        /**
			 *  the left side feeback
			 *  @type {Tone.Gain}
			 *  @private
			 */
	        this._feedbackLR = new Tone.Gain();
	        /**
			 *  the right side feeback
			 *  @type {Tone.Gain}
			 *  @private
			 */
	        this._feedbackRL = new Tone.Gain();
	        //connect it up
	        this.effectReturnL.chain(this._feedbackLR, this.effectSendR);
	        this.effectReturnR.chain(this._feedbackRL, this.effectSendL);
	        this.feedback.fan(this._feedbackLR.gain, this._feedbackRL.gain);
	        this._readOnly(['feedback']);
	    };
	    Tone.extend(Tone.StereoXFeedbackEffect, Tone.StereoEffect);
	    /**
		 *  clean up
		 *  @returns {Tone.StereoXFeedbackEffect} this
		 */
	    Tone.StereoXFeedbackEffect.prototype.dispose = function () {
	        Tone.StereoEffect.prototype.dispose.call(this);
	        this._writable(['feedback']);
	        this.feedback.dispose();
	        this.feedback = null;
	        this._feedbackLR.dispose();
	        this._feedbackLR = null;
	        this._feedbackRL.dispose();
	        this._feedbackRL = null;
	        return this;
	    };
	    return Tone.StereoXFeedbackEffect;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.Chorus is a stereo chorus effect with feedback composed of 
		 *         a left and right delay with a Tone.LFO applied to the delayTime of each channel. 
		 *         Inspiration from [Tuna.js](https://github.com/Dinahmoe/tuna/blob/master/tuna.js).
		 *         Read more on the chorus effect on [SoundOnSound](http://www.soundonsound.com/sos/jun04/articles/synthsecrets.htm).
		 *
		 *	@constructor
		 *	@extends {Tone.StereoXFeedbackEffect}
		 *	@param {Frequency|Object} [frequency] The frequency of the LFO.
		 *	@param {Milliseconds} [delayTime] The delay of the chorus effect in ms. 
		 *	@param {NormalRange} [depth] The depth of the chorus.
		 *	@example
		 * var chorus = new Tone.Chorus(4, 2.5, 0.5);
		 * var synth = new Tone.PolySynth(4, Tone.MonoSynth).connect(chorus);
		 * synth.triggerAttackRelease(["C3","E3","G3"], "8n");
		 */
	    Tone.Chorus = function () {
	        var options = Tone.defaults(arguments, [
	            'frequency',
	            'delayTime',
	            'depth'
	        ], Tone.Chorus);
	        Tone.StereoXFeedbackEffect.call(this, options);
	        /**
			 *  the depth of the chorus
			 *  @type {number}
			 *  @private
			 */
	        this._depth = options.depth;
	        /**
			 *  the delayTime
			 *  @type {number}
			 *  @private
			 */
	        this._delayTime = options.delayTime / 1000;
	        /**
			 *  the lfo which controls the delayTime
			 *  @type {Tone.LFO}
			 *  @private
			 */
	        this._lfoL = new Tone.LFO({
	            'frequency': options.frequency,
	            'min': 0,
	            'max': 1
	        });
	        /**
			 *  another LFO for the right side with a 180 degree phase diff
			 *  @type {Tone.LFO}
			 *  @private
			 */
	        this._lfoR = new Tone.LFO({
	            'frequency': options.frequency,
	            'min': 0,
	            'max': 1,
	            'phase': 180
	        });
	        /**
			 *  delay for left
			 *  @type {Tone.Delay}
			 *  @private
			 */
	        this._delayNodeL = new Tone.Delay();
	        /**
			 *  delay for right
			 *  @type {Tone.Delay}
			 *  @private
			 */
	        this._delayNodeR = new Tone.Delay();
	        /**
			 * The frequency of the LFO which modulates the delayTime. 
			 * @type {Frequency}
			 * @signal
			 */
	        this.frequency = this._lfoL.frequency;
	        //connections
	        this.effectSendL.chain(this._delayNodeL, this.effectReturnL);
	        this.effectSendR.chain(this._delayNodeR, this.effectReturnR);
	        //and pass through to make the detune apparent
	        this.effectSendL.connect(this.effectReturnL);
	        this.effectSendR.connect(this.effectReturnR);
	        //lfo setup
	        this._lfoL.connect(this._delayNodeL.delayTime);
	        this._lfoR.connect(this._delayNodeR.delayTime);
	        //start the lfo
	        this._lfoL.start();
	        this._lfoR.start();
	        //have one LFO frequency control the other
	        this._lfoL.frequency.connect(this._lfoR.frequency);
	        //set the initial values
	        this.depth = this._depth;
	        this.frequency.value = options.frequency;
	        this.type = options.type;
	        this._readOnly(['frequency']);
	        this.spread = options.spread;
	    };
	    Tone.extend(Tone.Chorus, Tone.StereoXFeedbackEffect);
	    /**
		 *  @static
		 *  @type {Object}
		 */
	    Tone.Chorus.defaults = {
	        'frequency': 1.5,
	        'delayTime': 3.5,
	        'depth': 0.7,
	        'feedback': 0.1,
	        'type': 'sine',
	        'spread': 180
	    };
	    /**
		 * The depth of the effect. A depth of 1 makes the delayTime
		 * modulate between 0 and 2*delayTime (centered around the delayTime). 
		 * @memberOf Tone.Chorus#
		 * @type {NormalRange}
		 * @name depth
		 */
	    Object.defineProperty(Tone.Chorus.prototype, 'depth', {
	        get: function () {
	            return this._depth;
	        },
	        set: function (depth) {
	            this._depth = depth;
	            var deviation = this._delayTime * depth;
	            this._lfoL.min = Math.max(this._delayTime - deviation, 0);
	            this._lfoL.max = this._delayTime + deviation;
	            this._lfoR.min = Math.max(this._delayTime - deviation, 0);
	            this._lfoR.max = this._delayTime + deviation;
	        }
	    });
	    /**
		 * The delayTime in milliseconds of the chorus. A larger delayTime
		 * will give a more pronounced effect. Nominal range a delayTime
		 * is between 2 and 20ms. 
		 * @memberOf Tone.Chorus#
		 * @type {Milliseconds}
		 * @name delayTime
		 */
	    Object.defineProperty(Tone.Chorus.prototype, 'delayTime', {
	        get: function () {
	            return this._delayTime * 1000;
	        },
	        set: function (delayTime) {
	            this._delayTime = delayTime / 1000;
	            this.depth = this._depth;
	        }
	    });
	    /**
		 * The oscillator type of the LFO. 
		 * @memberOf Tone.Chorus#
		 * @type {string}
		 * @name type
		 */
	    Object.defineProperty(Tone.Chorus.prototype, 'type', {
	        get: function () {
	            return this._lfoL.type;
	        },
	        set: function (type) {
	            this._lfoL.type = type;
	            this._lfoR.type = type;
	        }
	    });
	    /** 
		 * Amount of stereo spread. When set to 0, both LFO's will be panned centrally.
		 * When set to 180, LFO's will be panned hard left and right respectively.
		 * @memberOf Tone.Chorus#
		 * @type {Degrees}
		 * @name spread
		 */
	    Object.defineProperty(Tone.Chorus.prototype, 'spread', {
	        get: function () {
	            return this._lfoR.phase - this._lfoL.phase;
	        },
	        set: function (spread) {
	            this._lfoL.phase = 90 - spread / 2;
	            this._lfoR.phase = spread / 2 + 90;
	        }
	    });
	    /**
		 *  Clean up. 
		 *  @returns {Tone.Chorus} this
		 */
	    Tone.Chorus.prototype.dispose = function () {
	        Tone.StereoXFeedbackEffect.prototype.dispose.call(this);
	        this._lfoL.dispose();
	        this._lfoL = null;
	        this._lfoR.dispose();
	        this._lfoR = null;
	        this._delayNodeL.dispose();
	        this._delayNodeL = null;
	        this._delayNodeR.dispose();
	        this._delayNodeR = null;
	        this._writable('frequency');
	        this.frequency = null;
	        return this;
	    };
	    return Tone.Chorus;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Tone.Convolver is a wrapper around the Native Web Audio 
		 *          [ConvolverNode](http://webaudio.github.io/web-audio-api/#the-convolvernode-interface).
		 *          Convolution is useful for reverb and filter emulation. Read more about convolution reverb on
		 *          [Wikipedia](https://en.wikipedia.org/wiki/Convolution_reverb).
		 *  
		 *  @constructor
		 *  @extends {Tone.Effect}
		 *  @param {string|Tone.Buffer|Object} [url] The URL of the impulse response or the Tone.Buffer
		 *                                           contianing the impulse response. 
		 *  @param {Function} onload The callback to invoke when the url is loaded.
		 *  @example
		 * //initializing the convolver with an impulse response
		 * var convolver = new Tone.Convolver("./path/to/ir.wav").toMaster();
		 */
	    Tone.Convolver = function () {
	        var options = Tone.defaults(arguments, [
	            'url',
	            'onload'
	        ], Tone.Convolver);
	        Tone.Effect.call(this, options);
	        /**
			 *  convolver node
			 *  @type {ConvolverNode}
			 *  @private
			 */
	        this._convolver = this.context.createConvolver();
	        /**
			 *  the convolution buffer
			 *  @type {Tone.Buffer}
			 *  @private
			 */
	        this._buffer = new Tone.Buffer();
	        if (Tone.isString(options.url)) {
	            this._buffer.load(options.url, function (buffer) {
	                this.buffer = buffer;
	                options.onload();
	            }.bind(this));
	        } else if (options.url) {
	            this.buffer = options.url;
	            options.onload();
	        }
	        this.connectEffect(this._convolver);
	    };
	    Tone.extend(Tone.Convolver, Tone.Effect);
	    /**
		 *  @static
		 *  @const
		 *  @type  {Object}
		 */
	    Tone.Convolver.defaults = { 'onload': Tone.noOp };
	    /**
		 *  The convolver's buffer
		 *  @memberOf Tone.Convolver#
		 *  @type {AudioBuffer}
		 *  @name buffer
		 */
	    Object.defineProperty(Tone.Convolver.prototype, 'buffer', {
	        get: function () {
	            return this._buffer.get();
	        },
	        set: function (buffer) {
	            this._buffer.set(buffer);
	            this._convolver.buffer = this._buffer.get();
	        }
	    });
	    /**
		 *  Load an impulse response url as an audio buffer.
		 *  Decodes the audio asynchronously and invokes
		 *  the callback once the audio buffer loads.
		 *  @param {string} url The url of the buffer to load.
		 *                      filetype support depends on the
		 *                      browser.
		 *  @param  {function=} callback
		 *  @returns {Promise}
		 */
	    Tone.Convolver.prototype.load = function (url, callback) {
	        return this._buffer.load(url, function (buff) {
	            this.buffer = buff;
	            if (callback) {
	                callback();
	            }
	        }.bind(this));
	    };
	    /**
		 *  Clean up. 
		 *  @returns {Tone.Convolver} this
		 */
	    Tone.Convolver.prototype.dispose = function () {
	        Tone.Effect.prototype.dispose.call(this);
	        this._convolver.disconnect();
	        this._convolver = null;
	        this._buffer.dispose();
	        this._buffer = null;
	        return this;
	    };
	    return Tone.Convolver;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.Distortion is a simple distortion effect using Tone.WaveShaper.
		 *         Algorithm from [a stackoverflow answer](http://stackoverflow.com/a/22313408).
		 *
		 *  @extends {Tone.Effect}
		 *  @constructor
		 *  @param {Number|Object} [distortion] The amount of distortion (nominal range of 0-1)
		 *  @example
		 * var dist = new Tone.Distortion(0.8).toMaster();
		 * var fm = new Tone.SimpleFM().connect(dist);
		 * //this sounds good on bass notes
		 * fm.triggerAttackRelease("A1", "8n");
		 */
	    Tone.Distortion = function () {
	        var options = Tone.defaults(arguments, ['distortion'], Tone.Distortion);
	        Tone.Effect.call(this, options);
	        /**
			 *  @type {Tone.WaveShaper}
			 *  @private
			 */
	        this._shaper = new Tone.WaveShaper(4096);
	        /**
			 * holds the distortion amount
			 * @type {number}
			 * @private
			 */
	        this._distortion = options.distortion;
	        this.connectEffect(this._shaper);
	        this.distortion = options.distortion;
	        this.oversample = options.oversample;
	    };
	    Tone.extend(Tone.Distortion, Tone.Effect);
	    /**
		 *  @static
		 *  @const
		 *  @type {Object}
		 */
	    Tone.Distortion.defaults = {
	        'distortion': 0.4,
	        'oversample': 'none'
	    };
	    /**
		 * The amount of distortion.
		 * @memberOf Tone.Distortion#
		 * @type {NormalRange}
		 * @name distortion
		 */
	    Object.defineProperty(Tone.Distortion.prototype, 'distortion', {
	        get: function () {
	            return this._distortion;
	        },
	        set: function (amount) {
	            this._distortion = amount;
	            var k = amount * 100;
	            var deg = Math.PI / 180;
	            this._shaper.setMap(function (x) {
	                if (Math.abs(x) < 0.001) {
	                    //should output 0 when input is 0
	                    return 0;
	                } else {
	                    return (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
	                }
	            });
	        }
	    });
	    /**
		 * The oversampling of the effect. Can either be "none", "2x" or "4x".
		 * @memberOf Tone.Distortion#
		 * @type {string}
		 * @name oversample
		 */
	    Object.defineProperty(Tone.Distortion.prototype, 'oversample', {
	        get: function () {
	            return this._shaper.oversample;
	        },
	        set: function (oversampling) {
	            this._shaper.oversample = oversampling;
	        }
	    });
	    /**
		 *  Clean up. 
		 *  @returns {Tone.Distortion} this
		 */
	    Tone.Distortion.prototype.dispose = function () {
	        Tone.Effect.prototype.dispose.call(this);
	        this._shaper.dispose();
	        this._shaper = null;
	        return this;
	    };
	    return Tone.Distortion;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Tone.FeedbackDelay is a DelayNode in which part of output
		 *          signal is fed back into the delay. 
		 *
		 *  @constructor
		 *  @extends {Tone.FeedbackEffect}
		 *  @param {Time|Object} [delayTime] The delay applied to the incoming signal. 
		 *  @param {NormalRange=} feedback The amount of the effected signal which 
		 *                            is fed back through the delay.
		 *  @example
		 * var feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toMaster();
		 * var tom = new Tone.DrumSynth({
		 * 	"octaves" : 4,
		 * 	"pitchDecay" : 0.1
		 * }).connect(feedbackDelay);
		 * tom.triggerAttackRelease("A2","32n");
		 */
	    Tone.FeedbackDelay = function () {
	        var options = Tone.defaults(arguments, [
	            'delayTime',
	            'feedback'
	        ], Tone.FeedbackDelay);
	        Tone.FeedbackEffect.call(this, options);
	        /**
			 *  the delay node
			 *  @type {Tone.Delay}
			 *  @private
			 */
	        this._delayNode = new Tone.Delay(options.delayTime);
	        /**
			 *  The delayTime of the DelayNode. 
			 *  @type {Time}
			 *  @signal
			 */
	        this.delayTime = this._delayNode.delayTime;
	        // connect it up
	        this.connectEffect(this._delayNode);
	        this._readOnly(['delayTime']);
	    };
	    Tone.extend(Tone.FeedbackDelay, Tone.FeedbackEffect);
	    /**
		 *  The default values. 
		 *  @const
		 *  @static
		 *  @type {Object}
		 */
	    Tone.FeedbackDelay.defaults = { 'delayTime': 0.25 };
	    /**
		 *  clean up
		 *  @returns {Tone.FeedbackDelay} this
		 */
	    Tone.FeedbackDelay.prototype.dispose = function () {
	        Tone.FeedbackEffect.prototype.dispose.call(this);
	        this._delayNode.dispose();
	        this._delayNode = null;
	        this._writable(['delayTime']);
	        this.delayTime = null;
	        return this;
	    };
	    return Tone.FeedbackDelay;
	});
	Module(function (Tone) {
	    
	    /**
		 *  an array of comb filter delay values from Freeverb implementation
		 *  @static
		 *  @private
		 *  @type {Array}
		 */
	    var combFilterTunings = [
	        1557 / 44100,
	        1617 / 44100,
	        1491 / 44100,
	        1422 / 44100,
	        1277 / 44100,
	        1356 / 44100,
	        1188 / 44100,
	        1116 / 44100
	    ];
	    /**
		 *  an array of allpass filter frequency values from Freeverb implementation
		 *  @private
		 *  @static
		 *  @type {Array}
		 */
	    var allpassFilterFrequencies = [
	        225,
	        556,
	        441,
	        341
	    ];
	    /**
		 *  @class Tone.Freeverb is a reverb based on [Freeverb](https://ccrma.stanford.edu/~jos/pasp/Freeverb.html).
		 *         Read more on reverb on [Sound On Sound](https://web.archive.org/web/20160404083902/http://www.soundonsound.com:80/sos/feb01/articles/synthsecrets.asp).
		 *
		 *  @extends {Tone.Effect}
		 *  @constructor
		 *  @param {NormalRange|Object} [roomSize] Correlated to the decay time.
		 *  @param {Frequency} [dampening] The cutoff frequency of a lowpass filter as part
		 *                                 of the reverb.
		 *  @example
		 * var freeverb = new Tone.Freeverb().toMaster();
		 * freeverb.dampening.value = 1000;
		 * //routing synth through the reverb
		 * var synth = new Tone.AMSynth().connect(freeverb);
		 */
	    Tone.Freeverb = function () {
	        var options = Tone.defaults(arguments, [
	            'roomSize',
	            'dampening'
	        ], Tone.Freeverb);
	        Tone.StereoEffect.call(this, options);
	        /**
			 *  The roomSize value between. A larger roomSize
			 *  will result in a longer decay.
			 *  @type {NormalRange}
			 *  @signal
			 */
	        this.roomSize = new Tone.Signal(options.roomSize, Tone.Type.NormalRange);
	        /**
			 *  The amount of dampening of the reverberant signal.
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.dampening = new Tone.Signal(options.dampening, Tone.Type.Frequency);
	        /**
			 *  the comb filters
			 *  @type {Array}
			 *  @private
			 */
	        this._combFilters = [];
	        /**
			 *  the allpass filters on the left
			 *  @type {Array}
			 *  @private
			 */
	        this._allpassFiltersL = [];
	        /**
			 *  the allpass filters on the right
			 *  @type {Array}
			 *  @private
			 */
	        this._allpassFiltersR = [];
	        //make the allpass filters on the right
	        for (var l = 0; l < allpassFilterFrequencies.length; l++) {
	            var allpassL = this.context.createBiquadFilter();
	            allpassL.type = 'allpass';
	            allpassL.frequency.value = allpassFilterFrequencies[l];
	            this._allpassFiltersL.push(allpassL);
	        }
	        //make the allpass filters on the left
	        for (var r = 0; r < allpassFilterFrequencies.length; r++) {
	            var allpassR = this.context.createBiquadFilter();
	            allpassR.type = 'allpass';
	            allpassR.frequency.value = allpassFilterFrequencies[r];
	            this._allpassFiltersR.push(allpassR);
	        }
	        //make the comb filters
	        for (var c = 0; c < combFilterTunings.length; c++) {
	            var lfpf = new Tone.LowpassCombFilter(combFilterTunings[c]);
	            if (c < combFilterTunings.length / 2) {
	                this.effectSendL.chain(lfpf, this._allpassFiltersL[0]);
	            } else {
	                this.effectSendR.chain(lfpf, this._allpassFiltersR[0]);
	            }
	            this.roomSize.connect(lfpf.resonance);
	            this.dampening.connect(lfpf.dampening);
	            this._combFilters.push(lfpf);
	        }
	        //chain the allpass filters togetehr
	        Tone.connectSeries.apply(Tone, this._allpassFiltersL);
	        Tone.connectSeries.apply(Tone, this._allpassFiltersR);
	        this._allpassFiltersL[this._allpassFiltersL.length - 1].connect(this.effectReturnL);
	        this._allpassFiltersR[this._allpassFiltersR.length - 1].connect(this.effectReturnR);
	        this._readOnly([
	            'roomSize',
	            'dampening'
	        ]);
	    };
	    Tone.extend(Tone.Freeverb, Tone.StereoEffect);
	    /**
		 *  @static
		 *  @type {Object}
		 */
	    Tone.Freeverb.defaults = {
	        'roomSize': 0.7,
	        'dampening': 3000
	    };
	    /**
		 *  Clean up.
		 *  @returns {Tone.Freeverb} this
		 */
	    Tone.Freeverb.prototype.dispose = function () {
	        Tone.StereoEffect.prototype.dispose.call(this);
	        for (var al = 0; al < this._allpassFiltersL.length; al++) {
	            this._allpassFiltersL[al].disconnect();
	            this._allpassFiltersL[al] = null;
	        }
	        this._allpassFiltersL = null;
	        for (var ar = 0; ar < this._allpassFiltersR.length; ar++) {
	            this._allpassFiltersR[ar].disconnect();
	            this._allpassFiltersR[ar] = null;
	        }
	        this._allpassFiltersR = null;
	        for (var cf = 0; cf < this._combFilters.length; cf++) {
	            this._combFilters[cf].dispose();
	            this._combFilters[cf] = null;
	        }
	        this._combFilters = null;
	        this._writable([
	            'roomSize',
	            'dampening'
	        ]);
	        this.roomSize.dispose();
	        this.roomSize = null;
	        this.dampening.dispose();
	        this.dampening = null;
	        return this;
	    };
	    return Tone.Freeverb;
	});
	Module(function (Tone) {
	    
	    /**
		 *  an array of the comb filter delay time values
		 *  @private
		 *  @static
		 *  @type {Array}
		 */
	    var combFilterDelayTimes = [
	        1687 / 25000,
	        1601 / 25000,
	        2053 / 25000,
	        2251 / 25000
	    ];
	    /**
		 *  the resonances of each of the comb filters
		 *  @private
		 *  @static
		 *  @type {Array}
		 */
	    var combFilterResonances = [
	        0.773,
	        0.802,
	        0.753,
	        0.733
	    ];
	    /**
		 *  the allpass filter frequencies
		 *  @private
		 *  @static
		 *  @type {Array}
		 */
	    var allpassFilterFreqs = [
	        347,
	        113,
	        37
	    ];
	    /**
		 *  @class Tone.JCReverb is a simple [Schroeder Reverberator](https://ccrma.stanford.edu/~jos/pasp/Schroeder_Reverberators.html)
		 *         tuned by John Chowning in 1970.
		 *         It is made up of three allpass filters and four Tone.FeedbackCombFilter. 
		 *         
		 *
		 *  @extends {Tone.Effect}
		 *  @constructor
		 *  @param {NormalRange|Object} [roomSize] Coorelates to the decay time.
		 *  @example
		 * var reverb = new Tone.JCReverb(0.4).connect(Tone.Master);
		 * var delay = new Tone.FeedbackDelay(0.5); 
		 * //connecting the synth to reverb through delay
		 * var synth = new Tone.DuoSynth().chain(delay, reverb);
		 * synth.triggerAttackRelease("A4","8n");
		 */
	    Tone.JCReverb = function () {
	        var options = Tone.defaults(arguments, ['roomSize'], Tone.JCReverb);
	        Tone.StereoEffect.call(this, options);
	        /**
			 *  room size control values between [0,1]
			 *  @type {NormalRange}
			 *  @signal
			 */
	        this.roomSize = new Tone.Signal(options.roomSize, Tone.Type.NormalRange);
	        /**
			 *  scale the room size
			 *  @type {Tone.Scale}
			 *  @private
			 */
	        this._scaleRoomSize = new Tone.Scale(-0.733, 0.197);
	        /**
			 *  a series of allpass filters
			 *  @type {Array}
			 *  @private
			 */
	        this._allpassFilters = [];
	        /**
			 *  parallel feedback comb filters
			 *  @type {Array}
			 *  @private
			 */
	        this._feedbackCombFilters = [];
	        //make the allpass filters
	        for (var af = 0; af < allpassFilterFreqs.length; af++) {
	            var allpass = this.context.createBiquadFilter();
	            allpass.type = 'allpass';
	            allpass.frequency.value = allpassFilterFreqs[af];
	            this._allpassFilters.push(allpass);
	        }
	        //and the comb filters
	        for (var cf = 0; cf < combFilterDelayTimes.length; cf++) {
	            var fbcf = new Tone.FeedbackCombFilter(combFilterDelayTimes[cf], 0.1);
	            this._scaleRoomSize.connect(fbcf.resonance);
	            fbcf.resonance.value = combFilterResonances[cf];
	            this._allpassFilters[this._allpassFilters.length - 1].connect(fbcf);
	            if (cf < combFilterDelayTimes.length / 2) {
	                fbcf.connect(this.effectReturnL);
	            } else {
	                fbcf.connect(this.effectReturnR);
	            }
	            this._feedbackCombFilters.push(fbcf);
	        }
	        //chain the allpass filters together
	        this.roomSize.connect(this._scaleRoomSize);
	        Tone.connectSeries.apply(Tone, this._allpassFilters);
	        this.effectSendL.connect(this._allpassFilters[0]);
	        this.effectSendR.connect(this._allpassFilters[0]);
	        this._readOnly(['roomSize']);
	    };
	    Tone.extend(Tone.JCReverb, Tone.StereoEffect);
	    /**
		 *  the default values
		 *  @static
		 *  @const
		 *  @type {Object}
		 */
	    Tone.JCReverb.defaults = { 'roomSize': 0.5 };
	    /**
		 *  Clean up. 
		 *  @returns {Tone.JCReverb} this
		 */
	    Tone.JCReverb.prototype.dispose = function () {
	        Tone.StereoEffect.prototype.dispose.call(this);
	        for (var apf = 0; apf < this._allpassFilters.length; apf++) {
	            this._allpassFilters[apf].disconnect();
	            this._allpassFilters[apf] = null;
	        }
	        this._allpassFilters = null;
	        for (var fbcf = 0; fbcf < this._feedbackCombFilters.length; fbcf++) {
	            this._feedbackCombFilters[fbcf].dispose();
	            this._feedbackCombFilters[fbcf] = null;
	        }
	        this._feedbackCombFilters = null;
	        this._writable(['roomSize']);
	        this.roomSize.dispose();
	        this.roomSize = null;
	        this._scaleRoomSize.dispose();
	        this._scaleRoomSize = null;
	        return this;
	    };
	    return Tone.JCReverb;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Mid/Side processing separates the the 'mid' signal 
		 *         (which comes out of both the left and the right channel) 
		 *         and the 'side' (which only comes out of the the side channels) 
		 *         and effects them separately before being recombined.
		 *         Applies a Mid/Side seperation and recombination.
		 *         Algorithm found in [kvraudio forums](http://www.kvraudio.com/forum/viewtopic.php?t=212587).
		 *         <br><br>
		 *         This is a base-class for Mid/Side Effects. 
		 *
		 *  @extends {Tone.Effect}
		 *  @constructor
		 */
	    Tone.MidSideEffect = function () {
	        Tone.Effect.apply(this, arguments);
	        /**
			 *  The mid/side split
			 *  @type  {Tone.MidSideSplit}
			 *  @private
			 */
	        this._midSideSplit = new Tone.MidSideSplit();
	        /**
			 *  The mid/side merge
			 *  @type  {Tone.MidSideMerge}
			 *  @private
			 */
	        this._midSideMerge = new Tone.MidSideMerge();
	        /**
			 *  The mid send. Connect to mid processing
			 *  @type {Tone.Expr}
			 *  @private
			 */
	        this.midSend = this._midSideSplit.mid;
	        /**
			 *  The side send. Connect to side processing
			 *  @type {Tone.Expr}
			 *  @private
			 */
	        this.sideSend = this._midSideSplit.side;
	        /**
			 *  The mid return connection
			 *  @type {GainNode}
			 *  @private
			 */
	        this.midReturn = this._midSideMerge.mid;
	        /**
			 *  The side return connection
			 *  @type {GainNode}
			 *  @private
			 */
	        this.sideReturn = this._midSideMerge.side;
	        //the connections
	        this.effectSend.connect(this._midSideSplit);
	        this._midSideMerge.connect(this.effectReturn);
	    };
	    Tone.extend(Tone.MidSideEffect, Tone.Effect);
	    /**
		 *  Clean up. 
		 *  @returns {Tone.MidSideEffect} this
		 */
	    Tone.MidSideEffect.prototype.dispose = function () {
	        Tone.Effect.prototype.dispose.call(this);
	        this._midSideSplit.dispose();
	        this._midSideSplit = null;
	        this._midSideMerge.dispose();
	        this._midSideMerge = null;
	        this.midSend = null;
	        this.sideSend = null;
	        this.midReturn = null;
	        this.sideReturn = null;
	        return this;
	    };
	    return Tone.MidSideEffect;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.Phaser is a phaser effect. Phasers work by changing the phase
		 *         of different frequency components of an incoming signal. Read more on 
		 *         [Wikipedia](https://en.wikipedia.org/wiki/Phaser_(effect)). 
		 *         Inspiration for this phaser comes from [Tuna.js](https://github.com/Dinahmoe/tuna/).
		 *
		 *	@extends {Tone.StereoEffect}
		 *	@constructor
		 *	@param {Frequency|Object} [frequency] The speed of the phasing. 
		 *	@param {number} [octaves] The octaves of the effect. 
		 *	@param {Frequency} [baseFrequency] The base frequency of the filters. 
		 *	@example
		 * var phaser = new Tone.Phaser({
		 * 	"frequency" : 15, 
		 * 	"octaves" : 5, 
		 * 	"baseFrequency" : 1000
		 * }).toMaster();
		 * var synth = new Tone.FMSynth().connect(phaser);
		 * synth.triggerAttackRelease("E3", "2n");
		 */
	    Tone.Phaser = function () {
	        //set the defaults
	        var options = Tone.defaults(arguments, [
	            'frequency',
	            'octaves',
	            'baseFrequency'
	        ], Tone.Phaser);
	        Tone.StereoEffect.call(this, options);
	        /**
			 *  the lfo which controls the frequency on the left side
			 *  @type {Tone.LFO}
			 *  @private
			 */
	        this._lfoL = new Tone.LFO(options.frequency, 0, 1);
	        /**
			 *  the lfo which controls the frequency on the right side
			 *  @type {Tone.LFO}
			 *  @private
			 */
	        this._lfoR = new Tone.LFO(options.frequency, 0, 1);
	        this._lfoR.phase = 180;
	        /**
			 *  the base modulation frequency
			 *  @type {number}
			 *  @private
			 */
	        this._baseFrequency = options.baseFrequency;
	        /**
			 *  the octaves of the phasing
			 *  @type {number}
			 *  @private
			 */
	        this._octaves = options.octaves;
	        /**
			 *  The quality factor of the filters
			 *  @type {Positive}
			 *  @signal
			 */
	        this.Q = new Tone.Signal(options.Q, Tone.Type.Positive);
	        /**
			 *  the array of filters for the left side
			 *  @type {Array}
			 *  @private
			 */
	        this._filtersL = this._makeFilters(options.stages, this._lfoL, this.Q);
	        /**
			 *  the array of filters for the left side
			 *  @type {Array}
			 *  @private
			 */
	        this._filtersR = this._makeFilters(options.stages, this._lfoR, this.Q);
	        /**
			 * the frequency of the effect
			 * @type {Tone.Signal}
			 */
	        this.frequency = this._lfoL.frequency;
	        this.frequency.value = options.frequency;
	        //connect them up
	        this.effectSendL.connect(this._filtersL[0]);
	        this.effectSendR.connect(this._filtersR[0]);
	        this._filtersL[options.stages - 1].connect(this.effectReturnL);
	        this._filtersR[options.stages - 1].connect(this.effectReturnR);
	        //control the frequency with one LFO
	        this._lfoL.frequency.connect(this._lfoR.frequency);
	        //set the options
	        this.baseFrequency = options.baseFrequency;
	        this.octaves = options.octaves;
	        //start the lfo
	        this._lfoL.start();
	        this._lfoR.start();
	        this._readOnly([
	            'frequency',
	            'Q'
	        ]);
	    };
	    Tone.extend(Tone.Phaser, Tone.StereoEffect);
	    /**
		 *  defaults
		 *  @static
		 *  @type {object}
		 */
	    Tone.Phaser.defaults = {
	        'frequency': 0.5,
	        'octaves': 3,
	        'stages': 10,
	        'Q': 10,
	        'baseFrequency': 350
	    };
	    /**
		 *  @param {number} stages
		 *  @returns {Array} the number of filters all connected together
		 *  @private
		 */
	    Tone.Phaser.prototype._makeFilters = function (stages, connectToFreq, Q) {
	        var filters = new Array(stages);
	        //make all the filters
	        for (var i = 0; i < stages; i++) {
	            var filter = this.context.createBiquadFilter();
	            filter.type = 'allpass';
	            Q.connect(filter.Q);
	            connectToFreq.connect(filter.frequency);
	            filters[i] = filter;
	        }
	        Tone.connectSeries.apply(Tone, filters);
	        return filters;
	    };
	    /**
		 * The number of octaves the phase goes above
		 * the baseFrequency
		 * @memberOf Tone.Phaser#
		 * @type {Positive}
		 * @name octaves
		 */
	    Object.defineProperty(Tone.Phaser.prototype, 'octaves', {
	        get: function () {
	            return this._octaves;
	        },
	        set: function (octaves) {
	            this._octaves = octaves;
	            var max = this._baseFrequency * Math.pow(2, octaves);
	            this._lfoL.max = max;
	            this._lfoR.max = max;
	        }
	    });
	    /**
		 * The the base frequency of the filters. 
		 * @memberOf Tone.Phaser#
		 * @type {number}
		 * @name baseFrequency
		 */
	    Object.defineProperty(Tone.Phaser.prototype, 'baseFrequency', {
	        get: function () {
	            return this._baseFrequency;
	        },
	        set: function (freq) {
	            this._baseFrequency = freq;
	            this._lfoL.min = freq;
	            this._lfoR.min = freq;
	            this.octaves = this._octaves;
	        }
	    });
	    /**
		 *  clean up
		 *  @returns {Tone.Phaser} this
		 */
	    Tone.Phaser.prototype.dispose = function () {
	        Tone.StereoEffect.prototype.dispose.call(this);
	        this._writable([
	            'frequency',
	            'Q'
	        ]);
	        this.Q.dispose();
	        this.Q = null;
	        this._lfoL.dispose();
	        this._lfoL = null;
	        this._lfoR.dispose();
	        this._lfoR = null;
	        for (var i = 0; i < this._filtersL.length; i++) {
	            this._filtersL[i].disconnect();
	            this._filtersL[i] = null;
	        }
	        this._filtersL = null;
	        for (var j = 0; j < this._filtersR.length; j++) {
	            this._filtersR[j].disconnect();
	            this._filtersR[j] = null;
	        }
	        this._filtersR = null;
	        this.frequency = null;
	        return this;
	    };
	    return Tone.Phaser;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Tone.PingPongDelay is a feedback delay effect where the echo is heard
		 *          first in one channel and next in the opposite channel. In a stereo
		 *          system these are the right and left channels.
		 *          PingPongDelay in more simplified terms is two Tone.FeedbackDelays 
		 *          with independent delay values. Each delay is routed to one channel
		 *          (left or right), and the channel triggered second will always 
		 *          trigger at the same interval after the first.
		 *
		 * 	@constructor
		 * 	@extends {Tone.StereoXFeedbackEffect}
		 *  @param {Time|Object} [delayTime] The delayTime between consecutive echos.
		 *  @param {NormalRange=} feedback The amount of the effected signal which 
		 *                                 is fed back through the delay.
		 *  @example
		 * var pingPong = new Tone.PingPongDelay("4n", 0.2).toMaster();
		 * var drum = new Tone.DrumSynth().connect(pingPong);
		 * drum.triggerAttackRelease("C4", "32n");
		 */
	    Tone.PingPongDelay = function () {
	        var options = Tone.defaults(arguments, [
	            'delayTime',
	            'feedback'
	        ], Tone.PingPongDelay);
	        Tone.StereoXFeedbackEffect.call(this, options);
	        /**
			 *  the delay node on the left side
			 *  @type {Tone.Delay}
			 *  @private
			 */
	        this._leftDelay = new Tone.Delay(0, options.maxDelayTime);
	        /**
			 *  the delay node on the right side
			 *  @type {Tone.Delay}
			 *  @private
			 */
	        this._rightDelay = new Tone.Delay(0, options.maxDelayTime);
	        /**
			 *  the predelay on the right side
			 *  @type {Tone.Delay}
			 *  @private
			 */
	        this._rightPreDelay = new Tone.Delay(0, options.maxDelayTime);
	        /**
			 *  the delay time signal
			 *  @type {Time}
			 *  @signal
			 */
	        this.delayTime = new Tone.Signal(options.delayTime, Tone.Type.Time);
	        //connect it up
	        this.effectSendL.chain(this._leftDelay, this.effectReturnL);
	        this.effectSendR.chain(this._rightPreDelay, this._rightDelay, this.effectReturnR);
	        this.delayTime.fan(this._leftDelay.delayTime, this._rightDelay.delayTime, this._rightPreDelay.delayTime);
	        //rearranged the feedback to be after the rightPreDelay
	        this._feedbackLR.disconnect();
	        this._feedbackLR.connect(this._rightDelay);
	        this._readOnly(['delayTime']);
	    };
	    Tone.extend(Tone.PingPongDelay, Tone.StereoXFeedbackEffect);
	    /**
		 *  @static
		 *  @type {Object}
		 */
	    Tone.PingPongDelay.defaults = {
	        'delayTime': 0.25,
	        'maxDelayTime': 1
	    };
	    /**
		 *  Clean up. 
		 *  @returns {Tone.PingPongDelay} this
		 */
	    Tone.PingPongDelay.prototype.dispose = function () {
	        Tone.StereoXFeedbackEffect.prototype.dispose.call(this);
	        this._leftDelay.dispose();
	        this._leftDelay = null;
	        this._rightDelay.dispose();
	        this._rightDelay = null;
	        this._rightPreDelay.dispose();
	        this._rightPreDelay = null;
	        this._writable(['delayTime']);
	        this.delayTime.dispose();
	        this.delayTime = null;
	        return this;
	    };
	    return Tone.PingPongDelay;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.PitchShift does near-realtime pitch shifting to the incoming signal. 
		 *         The effect is achieved by speeding up or slowing down the delayTime
		 *         of a DelayNode using a sawtooth wave. 
		 *         Algorithm found in [this pdf](http://dsp-book.narod.ru/soundproc.pdf).
		 *         Additional reference by [Miller Pucket](http://msp.ucsd.edu/techniques/v0.11/book-html/node115.html).
		 *         
		 *  @extends {Tone.FeedbackEffect}
		 *  @param {Interval=} pitch The interval to transpose the incoming signal by. 
		 */
	    Tone.PitchShift = function () {
	        var options = Tone.defaults(arguments, ['pitch'], Tone.PitchShift);
	        Tone.FeedbackEffect.call(this, options);
	        /**
			 *  The pitch signal
			 *  @type  {Tone.Signal}
			 *  @private
			 */
	        this._frequency = new Tone.Signal(0);
	        /**
			 *  Uses two DelayNodes to cover up the jump in
			 *  the sawtooth wave. 
			 *  @type  {DelayNode}
			 *  @private
			 */
	        this._delayA = new Tone.Delay(0, 1);
	        /**
			 *  The first LFO.
			 *  @type  {Tone.LFO}
			 *  @private
			 */
	        this._lfoA = new Tone.LFO({
	            'min': 0,
	            'max': 0.1,
	            'type': 'sawtooth'
	        }).connect(this._delayA.delayTime);
	        /**
			 *  The second DelayNode
			 *  @type  {DelayNode}
			 *  @private
			 */
	        this._delayB = new Tone.Delay(0, 1);
	        /**
			 *  The first LFO.
			 *  @type  {Tone.LFO}
			 *  @private
			 */
	        this._lfoB = new Tone.LFO({
	            'min': 0,
	            'max': 0.1,
	            'type': 'sawtooth',
	            'phase': 180
	        }).connect(this._delayB.delayTime);
	        /**
			 *  Crossfade quickly between the two delay lines
			 *  to cover up the jump in the sawtooth wave
			 *  @type  {Tone.CrossFade}
			 *  @private
			 */
	        this._crossFade = new Tone.CrossFade();
	        /**
			 *  LFO which alternates between the two
			 *  delay lines to cover up the disparity in the
			 *  sawtooth wave. 
			 *  @type  {Tone.LFO}
			 *  @private
			 */
	        this._crossFadeLFO = new Tone.LFO({
	            'min': 0,
	            'max': 1,
	            'type': 'triangle',
	            'phase': 90
	        }).connect(this._crossFade.fade);
	        /**
			 *  The delay node
			 *  @type {Tone.Delay}
			 *  @private
			 */
	        this._feedbackDelay = new Tone.Delay(options.delayTime);
	        /**
			 *  The amount of delay on the input signal
			 *  @type {Time}
			 *  @signal
			 */
	        this.delayTime = this._feedbackDelay.delayTime;
	        this._readOnly('delayTime');
	        /**
			 *  Hold the current pitch
			 *  @type {Number}
			 *  @private
			 */
	        this._pitch = options.pitch;
	        /**
			 *  Hold the current windowSize
			 *  @type {Number}
			 *  @private
			 */
	        this._windowSize = options.windowSize;
	        //connect the two delay lines up
	        this._delayA.connect(this._crossFade.a);
	        this._delayB.connect(this._crossFade.b);
	        //connect the frequency
	        this._frequency.fan(this._lfoA.frequency, this._lfoB.frequency, this._crossFadeLFO.frequency);
	        //route the input
	        this.effectSend.fan(this._delayA, this._delayB);
	        this._crossFade.chain(this._feedbackDelay, this.effectReturn);
	        //start the LFOs at the same time
	        var now = this.now();
	        this._lfoA.start(now);
	        this._lfoB.start(now);
	        this._crossFadeLFO.start(now);
	        //set the initial value
	        this.windowSize = this._windowSize;
	    };
	    Tone.extend(Tone.PitchShift, Tone.FeedbackEffect);
	    /**
		 *  default values
		 *  @static
		 *  @type {Object}
		 *  @const
		 */
	    Tone.PitchShift.defaults = {
	        'pitch': 0,
	        'windowSize': 0.1,
	        'delayTime': 0,
	        'feedback': 0
	    };
	    /**
		 * Repitch the incoming signal by some interval (measured
		 * in semi-tones). 
		 * @memberOf Tone.PitchShift#
		 * @type {Interval}
		 * @name pitch
		 * @example
		 * pitchShift.pitch = -12; //down one octave
		 * pitchShift.pitch = 7; //up a fifth
		 */
	    Object.defineProperty(Tone.PitchShift.prototype, 'pitch', {
	        get: function () {
	            return this._pitch;
	        },
	        set: function (interval) {
	            this._pitch = interval;
	            var factor = 0;
	            if (interval < 0) {
	                this._lfoA.min = 0;
	                this._lfoA.max = this._windowSize;
	                this._lfoB.min = 0;
	                this._lfoB.max = this._windowSize;
	                factor = Tone.intervalToFrequencyRatio(interval - 1) + 1;
	            } else {
	                this._lfoA.min = this._windowSize;
	                this._lfoA.max = 0;
	                this._lfoB.min = this._windowSize;
	                this._lfoB.max = 0;
	                factor = Tone.intervalToFrequencyRatio(interval) - 1;
	            }
	            this._frequency.value = factor * (1.2 / this._windowSize);
	        }
	    });
	    /**
		 * The window size corresponds roughly to the sample length in a looping sampler. 
		 * Smaller values are desirable for a less noticeable delay time of the pitch shifted
		 * signal, but larger values will result in smoother pitch shifting for larger intervals. 
		 * A nominal range of 0.03 to 0.1 is recommended. 
		 * @memberOf Tone.PitchShift#
		 * @type {Time}
		 * @name windowSize
		 * @example
		 * pitchShift.windowSize = 0.1;
		 */
	    Object.defineProperty(Tone.PitchShift.prototype, 'windowSize', {
	        get: function () {
	            return this._windowSize;
	        },
	        set: function (size) {
	            this._windowSize = this.toSeconds(size);
	            this.pitch = this._pitch;
	        }
	    });
	    /**
		 *  Clean up.
		 *  @return  {Tone.PitchShift}  this
		 */
	    Tone.PitchShift.prototype.dispose = function () {
	        Tone.FeedbackEffect.prototype.dispose.call(this);
	        this._frequency.dispose();
	        this._frequency = null;
	        this._delayA.disconnect();
	        this._delayA = null;
	        this._delayB.disconnect();
	        this._delayB = null;
	        this._lfoA.dispose();
	        this._lfoA = null;
	        this._lfoB.dispose();
	        this._lfoB = null;
	        this._crossFade.dispose();
	        this._crossFade = null;
	        this._crossFadeLFO.dispose();
	        this._crossFadeLFO = null;
	        this._writable('delayTime');
	        this._feedbackDelay.dispose();
	        this._feedbackDelay = null;
	        this.delayTime = null;
	        return this;
	    };
	    return Tone.PitchShift;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Base class for stereo feedback effects where the effectReturn
		 *         is fed back into the same channel. 
		 *
		 *	@constructor
		 *	@extends {Tone.StereoEffect}
		 */
	    Tone.StereoFeedbackEffect = function () {
	        var options = Tone.defaults(arguments, ['feedback'], Tone.FeedbackEffect);
	        Tone.StereoEffect.call(this, options);
	        /**
			 *  controls the amount of feedback
			 *  @type {NormalRange}
			 *  @signal
			 */
	        this.feedback = new Tone.Signal(options.feedback, Tone.Type.NormalRange);
	        /**
			 *  the left side feeback
			 *  @type {Tone.Gain}
			 *  @private
			 */
	        this._feedbackL = new Tone.Gain();
	        /**
			 *  the right side feeback
			 *  @type {Tone.Gain}
			 *  @private
			 */
	        this._feedbackR = new Tone.Gain();
	        //connect it up
	        this.effectReturnL.chain(this._feedbackL, this.effectSendL);
	        this.effectReturnR.chain(this._feedbackR, this.effectSendR);
	        this.feedback.fan(this._feedbackL.gain, this._feedbackR.gain);
	        this._readOnly(['feedback']);
	    };
	    Tone.extend(Tone.StereoFeedbackEffect, Tone.StereoEffect);
	    /**
		 *  clean up
		 *  @returns {Tone.StereoFeedbackEffect} this
		 */
	    Tone.StereoFeedbackEffect.prototype.dispose = function () {
	        Tone.StereoEffect.prototype.dispose.call(this);
	        this._writable(['feedback']);
	        this.feedback.dispose();
	        this.feedback = null;
	        this._feedbackL.dispose();
	        this._feedbackL = null;
	        this._feedbackR.dispose();
	        this._feedbackR = null;
	        return this;
	    };
	    return Tone.StereoFeedbackEffect;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Applies a width factor to the mid/side seperation. 
		 *         0 is all mid and 1 is all side.
		 *         Algorithm found in [kvraudio forums](http://www.kvraudio.com/forum/viewtopic.php?t=212587).
		 *         <br><br>
		 *         <code>
		 *         Mid *= 2*(1-width)<br>
		 *         Side *= 2*width
		 *         </code>
		 *
		 *  @extends {Tone.MidSideEffect}
		 *  @constructor
		 *  @param {NormalRange|Object} [width] The stereo width. A width of 0 is mono and 1 is stereo. 0.5 is no change.
		 */
	    Tone.StereoWidener = function () {
	        var options = Tone.defaults(arguments, ['width'], Tone.StereoWidener);
	        Tone.MidSideEffect.call(this, options);
	        /**
			 *  The width control. 0 = 100% mid. 1 = 100% side. 0.5 = no change. 
			 *  @type {NormalRange}
			 *  @signal
			 */
	        this.width = new Tone.Signal(options.width, Tone.Type.NormalRange);
	        /**
			 *  Mid multiplier
			 *  @type {Tone.Expr}
			 *  @private
			 */
	        this._midMult = new Tone.Expr('$0 * ($1 * (1 - $2))');
	        /**
			 *  Side multiplier
			 *  @type {Tone.Expr}
			 *  @private
			 */
	        this._sideMult = new Tone.Expr('$0 * ($1 * $2)');
	        /**
			 *  constant output of 2
			 *  @type {Tone}
			 *  @private
			 */
	        this._two = new Tone.Signal(2);
	        //the mid chain
	        this._two.connect(this._midMult, 0, 1);
	        this.width.connect(this._midMult, 0, 2);
	        //the side chain
	        this._two.connect(this._sideMult, 0, 1);
	        this.width.connect(this._sideMult, 0, 2);
	        //connect it to the effect send/return
	        this.midSend.chain(this._midMult, this.midReturn);
	        this.sideSend.chain(this._sideMult, this.sideReturn);
	        this._readOnly(['width']);
	    };
	    Tone.extend(Tone.StereoWidener, Tone.MidSideEffect);
	    /**
		 *  the default values
		 *  @static
		 *  @type {Object}
		 */
	    Tone.StereoWidener.defaults = { 'width': 0.5 };
	    /**
		 *  Clean up. 
		 *  @returns {Tone.StereoWidener} this
		 */
	    Tone.StereoWidener.prototype.dispose = function () {
	        Tone.MidSideEffect.prototype.dispose.call(this);
	        this._writable(['width']);
	        this.width.dispose();
	        this.width = null;
	        this._midMult.dispose();
	        this._midMult = null;
	        this._sideMult.dispose();
	        this._sideMult = null;
	        this._two.dispose();
	        this._two = null;
	        return this;
	    };
	    return Tone.StereoWidener;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.Tremolo modulates the amplitude of an incoming signal using a Tone.LFO.
		 *         The type, frequency, and depth of the LFO is controllable.
		 *
		 *  @extends {Tone.StereoEffect}
		 *  @constructor
		 *  @param {Frequency} [frequency] The rate of the effect.
		 *  @param {NormalRange} [depth] The depth of the effect.
		 *  @example
		 * //create a tremolo and start it's LFO
		 * var tremolo = new Tone.Tremolo(9, 0.75).toMaster().start();
		 * //route an oscillator through the tremolo and start it
		 * var oscillator = new Tone.Oscillator().connect(tremolo).start();
		 */
	    Tone.Tremolo = function () {
	        var options = Tone.defaults(arguments, [
	            'frequency',
	            'depth'
	        ], Tone.Tremolo);
	        Tone.StereoEffect.call(this, options);
	        /**
			 *  The tremelo LFO in the left channel
			 *  @type  {Tone.LFO}
			 *  @private
			 */
	        this._lfoL = new Tone.LFO({
	            'phase': options.spread,
	            'min': 1,
	            'max': 0
	        });
	        /**
			 *  The tremelo LFO in the left channel
			 *  @type  {Tone.LFO}
			 *  @private
			 */
	        this._lfoR = new Tone.LFO({
	            'phase': options.spread,
	            'min': 1,
	            'max': 0
	        });
	        /**
			 *  Where the gain is multiplied
			 *  @type  {Tone.Gain}
			 *  @private
			 */
	        this._amplitudeL = new Tone.Gain();
	        /**
			 *  Where the gain is multiplied
			 *  @type  {Tone.Gain}
			 *  @private
			 */
	        this._amplitudeR = new Tone.Gain();
	        /**
			 *  The frequency of the tremolo.
			 *  @type  {Frequency}
			 *  @signal
			 */
	        this.frequency = new Tone.Signal(options.frequency, Tone.Type.Frequency);
	        /**
			 *  The depth of the effect. A depth of 0, has no effect
			 *  on the amplitude, and a depth of 1 makes the amplitude
			 *  modulate fully between 0 and 1.
			 *  @type  {NormalRange}
			 *  @signal
			 */
	        this.depth = new Tone.Signal(options.depth, Tone.Type.NormalRange);
	        this._readOnly([
	            'frequency',
	            'depth'
	        ]);
	        this.effectSendL.chain(this._amplitudeL, this.effectReturnL);
	        this.effectSendR.chain(this._amplitudeR, this.effectReturnR);
	        this._lfoL.connect(this._amplitudeL.gain);
	        this._lfoR.connect(this._amplitudeR.gain);
	        this.frequency.fan(this._lfoL.frequency, this._lfoR.frequency);
	        this.depth.fan(this._lfoR.amplitude, this._lfoL.amplitude);
	        this.type = options.type;
	        this.spread = options.spread;
	    };
	    Tone.extend(Tone.Tremolo, Tone.StereoEffect);
	    /**
		 *  @static
		 *  @const
		 *  @type {Object}
		 */
	    Tone.Tremolo.defaults = {
	        'frequency': 10,
	        'type': 'sine',
	        'depth': 0.5,
	        'spread': 180
	    };
	    /**
		 * Start the tremolo.
		 * @param {Time} [time=now] When the tremolo begins.
		 * @returns {Tone.Tremolo} this
		 */
	    Tone.Tremolo.prototype.start = function (time) {
	        this._lfoL.start(time);
	        this._lfoR.start(time);
	        return this;
	    };
	    /**
		 * Stop the tremolo.
		 * @param {Time} [time=now] When the tremolo stops.
		 * @returns {Tone.Tremolo} this
		 */
	    Tone.Tremolo.prototype.stop = function (time) {
	        this._lfoL.stop(time);
	        this._lfoR.stop(time);
	        return this;
	    };
	    /**
		 * Sync the effect to the transport.
		 * @param {Time} [delay=0] Delay time before starting the effect after the
		 *                              Transport has started.
		 * @returns {Tone.AutoFilter} this
		 */
	    Tone.Tremolo.prototype.sync = function (delay) {
	        this._lfoL.sync(delay);
	        this._lfoR.sync(delay);
	        return this;
	    };
	    /**
		 * Unsync the filter from the transport
		 * @returns {Tone.Tremolo} this
		 */
	    Tone.Tremolo.prototype.unsync = function () {
	        this._lfoL.unsync();
	        this._lfoR.unsync();
	        return this;
	    };
	    /**
		 * The Tremolo's oscillator type.
		 * @memberOf Tone.Tremolo#
		 * @type {string}
		 * @name type
		 */
	    Object.defineProperty(Tone.Tremolo.prototype, 'type', {
	        get: function () {
	            return this._lfoL.type;
	        },
	        set: function (type) {
	            this._lfoL.type = type;
	            this._lfoR.type = type;
	        }
	    });
	    /** 
		 * Amount of stereo spread. When set to 0, both LFO's will be panned centrally.
		 * When set to 180, LFO's will be panned hard left and right respectively.
		 * @memberOf Tone.Tremolo#
		 * @type {Degrees}
		 * @name spread
		 */
	    Object.defineProperty(Tone.Tremolo.prototype, 'spread', {
	        get: function () {
	            return this._lfoR.phase - this._lfoL.phase;    //180
	        },
	        set: function (spread) {
	            this._lfoL.phase = 90 - spread / 2;
	            this._lfoR.phase = spread / 2 + 90;
	        }
	    });
	    /**
		 *  clean up
		 *  @returns {Tone.Tremolo} this
		 */
	    Tone.Tremolo.prototype.dispose = function () {
	        Tone.StereoEffect.prototype.dispose.call(this);
	        this._writable([
	            'frequency',
	            'depth'
	        ]);
	        this._lfoL.dispose();
	        this._lfoL = null;
	        this._lfoR.dispose();
	        this._lfoR = null;
	        this._amplitudeL.dispose();
	        this._amplitudeL = null;
	        this._amplitudeR.dispose();
	        this._amplitudeR = null;
	        this.frequency = null;
	        this.depth = null;
	        return this;
	    };
	    return Tone.Tremolo;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class A Vibrato effect composed of a Tone.Delay and a Tone.LFO. The LFO
		 *         modulates the delayTime of the delay, causing the pitch to rise
		 *         and fall. 
		 *  @extends {Tone.Effect}
		 *  @param {Frequency} frequency The frequency of the vibrato.
		 *  @param {NormalRange} depth The amount the pitch is modulated.
		 */
	    Tone.Vibrato = function () {
	        var options = Tone.defaults(arguments, [
	            'frequency',
	            'depth'
	        ], Tone.Vibrato);
	        Tone.Effect.call(this, options);
	        /**
			 *  The delay node used for the vibrato effect
			 *  @type {Tone.Delay}
			 *  @private
			 */
	        this._delayNode = new Tone.Delay(0, options.maxDelay);
	        /**
			 *  The LFO used to control the vibrato
			 *  @type {Tone.LFO}
			 *  @private
			 */
	        this._lfo = new Tone.LFO({
	            'type': options.type,
	            'min': 0,
	            'max': options.maxDelay,
	            'frequency': options.frequency,
	            'phase': -90    //offse the phase so the resting position is in the center
	        }).start().connect(this._delayNode.delayTime);
	        /**
			 *  The frequency of the vibrato
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.frequency = this._lfo.frequency;
	        /**
			 *  The depth of the vibrato. 
			 *  @type {NormalRange}
			 *  @signal
			 */
	        this.depth = this._lfo.amplitude;
	        this.depth.value = options.depth;
	        this._readOnly([
	            'frequency',
	            'depth'
	        ]);
	        this.effectSend.chain(this._delayNode, this.effectReturn);
	    };
	    Tone.extend(Tone.Vibrato, Tone.Effect);
	    /**
		 *  The defaults
		 *  @type  {Object}
		 *  @const
		 */
	    Tone.Vibrato.defaults = {
	        'maxDelay': 0.005,
	        'frequency': 5,
	        'depth': 0.1,
	        'type': 'sine'
	    };
	    /**
		 * Type of oscillator attached to the Vibrato.
		 * @memberOf Tone.Vibrato#
		 * @type {string}
		 * @name type
		 */
	    Object.defineProperty(Tone.Vibrato.prototype, 'type', {
	        get: function () {
	            return this._lfo.type;
	        },
	        set: function (type) {
	            this._lfo.type = type;
	        }
	    });
	    /**
		 *  Clean up.
		 *  @returns {Tone.Vibrato} this
		 */
	    Tone.Vibrato.prototype.dispose = function () {
	        Tone.Effect.prototype.dispose.call(this);
	        this._delayNode.dispose();
	        this._delayNode = null;
	        this._lfo.dispose();
	        this._lfo = null;
	        this._writable([
	            'frequency',
	            'depth'
	        ]);
	        this.frequency = null;
	        this.depth = null;
	    };
	    return Tone.Vibrato;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Tone.Event abstracts away Tone.Transport.schedule and provides a schedulable
		 *          callback for a single or repeatable events along the timeline. 
		 *
		 *  @extends {Tone}
		 *  @param {function} callback The callback to invoke at the time. 
		 *  @param {*} value The value or values which should be passed to
		 *                      the callback function on invocation.  
		 *  @example
		 * var chord = new Tone.Event(function(time, chord){
		 * 	//the chord as well as the exact time of the event
		 * 	//are passed in as arguments to the callback function
		 * }, ["D4", "E4", "F4"]);
		 * //start the chord at the beginning of the transport timeline
		 * chord.start();
		 * //loop it every measure for 8 measures
		 * chord.loop = 8;
		 * chord.loopEnd = "1m";
		 */
	    Tone.Event = function () {
	        var options = Tone.defaults(arguments, [
	            'callback',
	            'value'
	        ], Tone.Event);
	        Tone.call(this);
	        /**
			 *  Loop value
			 *  @type  {Boolean|Positive}
			 *  @private
			 */
	        this._loop = options.loop;
	        /**
			 *  The callback to invoke. 
			 *  @type  {Function}
			 */
	        this.callback = options.callback;
	        /**
			 *  The value which is passed to the
			 *  callback function.
			 *  @type  {*}
			 *  @private
			 */
	        this.value = options.value;
	        /**
			 *  When the note is scheduled to start.
			 *  @type  {Number}
			 *  @private
			 */
	        this._loopStart = this.toTicks(options.loopStart);
	        /**
			 *  When the note is scheduled to start.
			 *  @type  {Number}
			 *  @private
			 */
	        this._loopEnd = this.toTicks(options.loopEnd);
	        /**
			 *  Tracks the scheduled events
			 *  @type {Tone.TimelineState}
			 *  @private
			 */
	        this._state = new Tone.TimelineState(Tone.State.Stopped);
	        /**
			 *  The playback speed of the note. A speed of 1
			 *  is no change. 
			 *  @private
			 *  @type {Positive}
			 */
	        this._playbackRate = 1;
	        /**
			 *  A delay time from when the event is scheduled to start
			 *  @type {Ticks}
			 *  @private
			 */
	        this._startOffset = 0;
	        /**
			 *  private holder of probability value
			 *  @type {NormalRange}
			 *  @private
			 */
	        this._probability = options.probability;
	        /**
			 *  the amount of variation from the
			 *  given time. 
			 *  @type {Boolean|Time}
			 *  @private
			 */
	        this._humanize = options.humanize;
	        /**
			 *  If mute is true, the callback won't be
			 *  invoked.
			 *  @type {Boolean}
			 */
	        this.mute = options.mute;
	        //set the initial values
	        this.playbackRate = options.playbackRate;
	    };
	    Tone.extend(Tone.Event);
	    /**
		 *  The default values
		 *  @type  {Object}
		 *  @const
		 */
	    Tone.Event.defaults = {
	        'callback': Tone.noOp,
	        'loop': false,
	        'loopEnd': '1m',
	        'loopStart': 0,
	        'playbackRate': 1,
	        'value': null,
	        'probability': 1,
	        'mute': false,
	        'humanize': false
	    };
	    /**
		 *  Reschedule all of the events along the timeline
		 *  with the updated values.
		 *  @param {Time} after Only reschedules events after the given time.
		 *  @return  {Tone.Event}  this
		 *  @private
		 */
	    Tone.Event.prototype._rescheduleEvents = function (after) {
	        //if no argument is given, schedules all of the events
	        after = Tone.defaultArg(after, -1);
	        this._state.forEachFrom(after, function (event) {
	            var duration;
	            if (event.state === Tone.State.Started) {
	                if (!Tone.isUndef(event.id)) {
	                    Tone.Transport.clear(event.id);
	                }
	                var startTick = event.time + Math.round(this.startOffset / this._playbackRate);
	                if (this._loop) {
	                    duration = Infinity;
	                    if (Tone.isNumber(this._loop)) {
	                        duration = this._loop * this._getLoopDuration();
	                    }
	                    var nextEvent = this._state.getAfter(startTick);
	                    if (nextEvent !== null) {
	                        duration = Math.min(duration, nextEvent.time - startTick);
	                    }
	                    if (duration !== Infinity) {
	                        //schedule a stop since it's finite duration
	                        this._state.setStateAtTime(Tone.State.Stopped, startTick + duration + 1);
	                        duration = Tone.Time(duration, 'i');
	                    }
	                    var interval = Tone.Time(this._getLoopDuration(), 'i');
	                    event.id = Tone.Transport.scheduleRepeat(this._tick.bind(this), interval, Tone.TransportTime(startTick, 'i'), duration);
	                } else {
	                    event.id = Tone.Transport.schedule(this._tick.bind(this), startTick + 'i');
	                }
	            }
	        }.bind(this));
	        return this;
	    };
	    /**
		 *  Returns the playback state of the note, either "started" or "stopped".
		 *  @type {String}
		 *  @readOnly
		 *  @memberOf Tone.Event#
		 *  @name state
		 */
	    Object.defineProperty(Tone.Event.prototype, 'state', {
	        get: function () {
	            return this._state.getValueAtTime(Tone.Transport.ticks);
	        }
	    });
	    /**
		 *  The start from the scheduled start time
		 *  @type {Ticks}
		 *  @memberOf Tone.Event#
		 *  @name startOffset
		 *  @private
		 */
	    Object.defineProperty(Tone.Event.prototype, 'startOffset', {
	        get: function () {
	            return this._startOffset;
	        },
	        set: function (offset) {
	            this._startOffset = offset;
	        }
	    });
	    /**
		 *  The probability of the notes being triggered.
		 *  @memberOf Tone.Event#
		 *  @type {NormalRange}
		 *  @name probability
		 */
	    Object.defineProperty(Tone.Event.prototype, 'probability', {
	        get: function () {
	            return this._probability;
	        },
	        set: function (prob) {
	            this._probability = prob;
	        }
	    });
	    /**
		 *  If set to true, will apply small random variation
		 *  to the callback time. If the value is given as a time, it will randomize
		 *  by that amount.
		 *  @example
		 * event.humanize = true;
		 *  @type {Boolean|Time}
		 *  @name humanize
		 */
	    Object.defineProperty(Tone.Event.prototype, 'humanize', {
	        get: function () {
	            return this._humanize;
	        },
	        set: function (variation) {
	            this._humanize = variation;
	        }
	    });
	    /**
		 *  Start the note at the given time. 
		 *  @param  {TimelinePosition}  time  When the note should start.
		 *  @return  {Tone.Event}  this
		 */
	    Tone.Event.prototype.start = function (time) {
	        time = this.toTicks(time);
	        if (this._state.getValueAtTime(time) === Tone.State.Stopped) {
	            this._state.add({
	                'state': Tone.State.Started,
	                'time': time,
	                'id': undefined
	            });
	            this._rescheduleEvents(time);
	        }
	        return this;
	    };
	    /**
		 *  Stop the Event at the given time.
		 *  @param  {TimelinePosition}  time  When the note should stop.
		 *  @return  {Tone.Event}  this
		 */
	    Tone.Event.prototype.stop = function (time) {
	        this.cancel(time);
	        time = this.toTicks(time);
	        if (this._state.getValueAtTime(time) === Tone.State.Started) {
	            this._state.setStateAtTime(Tone.State.Stopped, time);
	            var previousEvent = this._state.getBefore(time);
	            var reschedulTime = time;
	            if (previousEvent !== null) {
	                reschedulTime = previousEvent.time;
	            }
	            this._rescheduleEvents(reschedulTime);
	        }
	        return this;
	    };
	    /**
		 *  Cancel all scheduled events greater than or equal to the given time
		 *  @param  {TimelinePosition}  [time=0]  The time after which events will be cancel.
		 *  @return  {Tone.Event}  this
		 */
	    Tone.Event.prototype.cancel = function (time) {
	        time = Tone.defaultArg(time, -Infinity);
	        time = this.toTicks(time);
	        this._state.forEachFrom(time, function (event) {
	            Tone.Transport.clear(event.id);
	        });
	        this._state.cancel(time);
	        return this;
	    };
	    /**
		 *  The callback function invoker. Also 
		 *  checks if the Event is done playing
		 *  @param  {Number}  time  The time of the event in seconds
		 *  @private
		 */
	    Tone.Event.prototype._tick = function (time) {
	        if (!this.mute && this._state.getValueAtTime(Tone.Transport.ticks) === Tone.State.Started) {
	            if (this.probability < 1 && Math.random() > this.probability) {
	                return;
	            }
	            if (this.humanize) {
	                var variation = 0.02;
	                if (!Tone.isBoolean(this.humanize)) {
	                    variation = this.toSeconds(this.humanize);
	                }
	                time += (Math.random() * 2 - 1) * variation;
	            }
	            this.callback(time, this.value);
	        }
	    };
	    /**
		 *  Get the duration of the loop.
		 *  @return  {Ticks}
		 *  @private
		 */
	    Tone.Event.prototype._getLoopDuration = function () {
	        return Math.round((this._loopEnd - this._loopStart) / this._playbackRate);
	    };
	    /**
		 *  If the note should loop or not
		 *  between Tone.Event.loopStart and 
		 *  Tone.Event.loopEnd. An integer
		 *  value corresponds to the number of
		 *  loops the Event does after it starts.
		 *  @memberOf Tone.Event#
		 *  @type {Boolean|Positive}
		 *  @name loop
		 */
	    Object.defineProperty(Tone.Event.prototype, 'loop', {
	        get: function () {
	            return this._loop;
	        },
	        set: function (loop) {
	            this._loop = loop;
	            this._rescheduleEvents();
	        }
	    });
	    /**
		 * 	The playback rate of the note. Defaults to 1.
		 *  @memberOf Tone.Event#
		 *  @type {Positive}
		 *  @name playbackRate
		 *  @example
		 * note.loop = true;
		 * //repeat the note twice as fast
		 * note.playbackRate = 2;
		 */
	    Object.defineProperty(Tone.Event.prototype, 'playbackRate', {
	        get: function () {
	            return this._playbackRate;
	        },
	        set: function (rate) {
	            this._playbackRate = rate;
	            this._rescheduleEvents();
	        }
	    });
	    /**
		 *  The loopEnd point is the time the event will loop
		 *  if Tone.Event.loop is true.
		 *  @memberOf Tone.Event#
		 *  @type {TransportTime}
		 *  @name loopEnd
		 */
	    Object.defineProperty(Tone.Event.prototype, 'loopEnd', {
	        get: function () {
	            return Tone.TransportTime(this._loopEnd, 'i').toNotation();
	        },
	        set: function (loopEnd) {
	            this._loopEnd = this.toTicks(loopEnd);
	            if (this._loop) {
	                this._rescheduleEvents();
	            }
	        }
	    });
	    /**
		 *  The time when the loop should start. 
		 *  @memberOf Tone.Event#
		 *  @type {TransportTime}
		 *  @name loopStart
		 */
	    Object.defineProperty(Tone.Event.prototype, 'loopStart', {
	        get: function () {
	            return Tone.TransportTime(this._loopStart, 'i').toNotation();
	        },
	        set: function (loopStart) {
	            this._loopStart = this.toTicks(loopStart);
	            if (this._loop) {
	                this._rescheduleEvents();
	            }
	        }
	    });
	    /**
		 *  The current progress of the loop interval.
		 *  Returns 0 if the event is not started yet or
		 *  it is not set to loop.
		 *  @memberOf Tone.Event#
		 *  @type {NormalRange}
		 *  @name progress
		 *  @readOnly
		 */
	    Object.defineProperty(Tone.Event.prototype, 'progress', {
	        get: function () {
	            if (this._loop) {
	                var ticks = Tone.Transport.ticks;
	                var lastEvent = this._state.get(ticks);
	                if (lastEvent !== null && lastEvent.state === Tone.State.Started) {
	                    var loopDuration = this._getLoopDuration();
	                    var progress = (ticks - lastEvent.time) % loopDuration;
	                    return progress / loopDuration;
	                } else {
	                    return 0;
	                }
	            } else {
	                return 0;
	            }
	        }
	    });
	    /**
		 *  Clean up
		 *  @return  {Tone.Event}  this
		 */
	    Tone.Event.prototype.dispose = function () {
	        this.cancel();
	        this._state.dispose();
	        this._state = null;
	        this.callback = null;
	        this.value = null;
	    };
	    return Tone.Event;
	});
	Module(function (Tone) {
	    /**
		 *  @class Tone.Loop creates a looped callback at the 
		 *         specified interval. The callback can be 
		 *         started, stopped and scheduled along
		 *         the Transport's timeline. 
		 *  @example
		 * var loop = new Tone.Loop(function(time){
		 * 	//triggered every eighth note. 
		 * 	console.log(time);
		 * }, "8n").start(0);
		 * Tone.Transport.start();
		 *  @extends {Tone}
		 *  @param {Function} callback The callback to invoke with the event.
		 *  @param {Time} interval The time between successive callback calls. 
		 */
	    Tone.Loop = function () {
	        var options = Tone.defaults(arguments, [
	            'callback',
	            'interval'
	        ], Tone.Loop);
	        Tone.call(this);
	        /**
			 *  The event which produces the callbacks
			 */
	        this._event = new Tone.Event({
	            'callback': this._tick.bind(this),
	            'loop': true,
	            'loopEnd': options.interval,
	            'playbackRate': options.playbackRate,
	            'probability': options.probability
	        });
	        /**
			 *  The callback to invoke with the next event in the pattern
			 *  @type {Function}
			 */
	        this.callback = options.callback;
	        //set the iterations
	        this.iterations = options.iterations;
	    };
	    Tone.extend(Tone.Loop);
	    /**
		 *  The defaults
		 *  @const
		 *  @type  {Object}
		 */
	    Tone.Loop.defaults = {
	        'interval': '4n',
	        'callback': Tone.noOp,
	        'playbackRate': 1,
	        'iterations': Infinity,
	        'probability': true,
	        'mute': false
	    };
	    /**
		 *  Start the loop at the specified time along the Transport's
		 *  timeline.
		 *  @param  {TimelinePosition=}  time  When to start the Loop.
		 *  @return  {Tone.Loop}  this
		 */
	    Tone.Loop.prototype.start = function (time) {
	        this._event.start(time);
	        return this;
	    };
	    /**
		 *  Stop the loop at the given time.
		 *  @param  {TimelinePosition=}  time  When to stop the Arpeggio
		 *  @return  {Tone.Loop}  this
		 */
	    Tone.Loop.prototype.stop = function (time) {
	        this._event.stop(time);
	        return this;
	    };
	    /**
		 *  Cancel all scheduled events greater than or equal to the given time
		 *  @param  {TimelinePosition}  [time=0]  The time after which events will be cancel.
		 *  @return  {Tone.Loop}  this
		 */
	    Tone.Loop.prototype.cancel = function (time) {
	        this._event.cancel(time);
	        return this;
	    };
	    /**
		 *  Internal function called when the notes should be called
		 *  @param  {Number}  time  The time the event occurs
		 *  @private
		 */
	    Tone.Loop.prototype._tick = function (time) {
	        this.callback(time);
	    };
	    /**
		 *  The state of the Loop, either started or stopped.
		 *  @memberOf Tone.Loop#
		 *  @type {String}
		 *  @name state
		 *  @readOnly
		 */
	    Object.defineProperty(Tone.Loop.prototype, 'state', {
	        get: function () {
	            return this._event.state;
	        }
	    });
	    /**
		 *  The progress of the loop as a value between 0-1. 0, when
		 *  the loop is stopped or done iterating. 
		 *  @memberOf Tone.Loop#
		 *  @type {NormalRange}
		 *  @name progress
		 *  @readOnly
		 */
	    Object.defineProperty(Tone.Loop.prototype, 'progress', {
	        get: function () {
	            return this._event.progress;
	        }
	    });
	    /**
		 *  The time between successive callbacks. 
		 *  @example
		 * loop.interval = "8n"; //loop every 8n
		 *  @memberOf Tone.Loop#
		 *  @type {Time}
		 *  @name interval
		 */
	    Object.defineProperty(Tone.Loop.prototype, 'interval', {
	        get: function () {
	            return this._event.loopEnd;
	        },
	        set: function (interval) {
	            this._event.loopEnd = interval;
	        }
	    });
	    /**
		 *  The playback rate of the loop. The normal playback rate is 1 (no change). 
		 *  A `playbackRate` of 2 would be twice as fast. 
		 *  @memberOf Tone.Loop#
		 *  @type {Time}
		 *  @name playbackRate
		 */
	    Object.defineProperty(Tone.Loop.prototype, 'playbackRate', {
	        get: function () {
	            return this._event.playbackRate;
	        },
	        set: function (rate) {
	            this._event.playbackRate = rate;
	        }
	    });
	    /**
		 *  Random variation +/-0.01s to the scheduled time. 
		 *  Or give it a time value which it will randomize by.
		 *  @type {Boolean|Time}
		 *  @memberOf Tone.Loop#
		 *  @name humanize
		 */
	    Object.defineProperty(Tone.Loop.prototype, 'humanize', {
	        get: function () {
	            return this._event.humanize;
	        },
	        set: function (variation) {
	            this._event.humanize = variation;
	        }
	    });
	    /**
		 *  The probably of the callback being invoked.
		 *  @memberOf Tone.Loop#
		 *  @type {NormalRange}
		 *  @name probability
		 */
	    Object.defineProperty(Tone.Loop.prototype, 'probability', {
	        get: function () {
	            return this._event.probability;
	        },
	        set: function (prob) {
	            this._event.probability = prob;
	        }
	    });
	    /**
		 *  Muting the Loop means that no callbacks are invoked.
		 *  @memberOf Tone.Loop#
		 *  @type {Boolean}
		 *  @name mute
		 */
	    Object.defineProperty(Tone.Loop.prototype, 'mute', {
	        get: function () {
	            return this._event.mute;
	        },
	        set: function (mute) {
	            this._event.mute = mute;
	        }
	    });
	    /**
		 *  The number of iterations of the loop. The default
		 *  value is Infinity (loop forever).
		 *  @memberOf Tone.Loop#
		 *  @type {Positive}
		 *  @name iterations
		 */
	    Object.defineProperty(Tone.Loop.prototype, 'iterations', {
	        get: function () {
	            if (this._event.loop === true) {
	                return Infinity;
	            } else {
	                return this._event.loop;
	            }
	        },
	        set: function (iters) {
	            if (iters === Infinity) {
	                this._event.loop = true;
	            } else {
	                this._event.loop = iters;
	            }
	        }
	    });
	    /**
		 *  Clean up
		 *  @return  {Tone.Loop}  this
		 */
	    Tone.Loop.prototype.dispose = function () {
	        this._event.dispose();
	        this._event = null;
	        this.callback = null;
	    };
	    return Tone.Loop;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.Part is a collection Tone.Events which can be
		 *         started/stopped and looped as a single unit.
		 *
		 *  @extends {Tone.Event}
		 *  @param {Function} callback The callback to invoke on each event
		 *  @param {Array} events the array of events
		 *  @example
		 * var part = new Tone.Part(function(time, note){
		 * 	//the notes given as the second element in the array
		 * 	//will be passed in as the second argument
		 * 	synth.triggerAttackRelease(note, "8n", time);
		 * }, [[0, "C2"], ["0:2", "C3"], ["0:3:2", "G2"]]);
		 *  @example
		 * //use an array of objects as long as the object has a "time" attribute
		 * var part = new Tone.Part(function(time, value){
		 * 	//the value is an object which contains both the note and the velocity
		 * 	synth.triggerAttackRelease(value.note, "8n", time, value.velocity);
		 * }, [{"time" : 0, "note" : "C3", "velocity": 0.9}, 
		 * 	   {"time" : "0:2", "note" : "C4", "velocity": 0.5}
		 * ]).start(0);
		 */
	    Tone.Part = function () {
	        var options = Tone.defaults(arguments, [
	            'callback',
	            'events'
	        ], Tone.Part);
	        Tone.Event.call(this, options);
	        /**
			 *  An array of Objects. 
			 *  @type  {Array}
			 *  @private
			 */
	        this._events = [];
	        //add the events
	        for (var i = 0; i < options.events.length; i++) {
	            if (Array.isArray(options.events[i])) {
	                this.add(options.events[i][0], options.events[i][1]);
	            } else {
	                this.add(options.events[i]);
	            }
	        }
	    };
	    Tone.extend(Tone.Part, Tone.Event);
	    /**
		 *  The default values
		 *  @type  {Object}
		 *  @const
		 */
	    Tone.Part.defaults = {
	        'callback': Tone.noOp,
	        'loop': false,
	        'loopEnd': '1m',
	        'loopStart': 0,
	        'playbackRate': 1,
	        'probability': 1,
	        'humanize': false,
	        'mute': false,
	        'events': []
	    };
	    /**
		 *  Start the part at the given time. 
		 *  @param  {TransportTime}  time    When to start the part.
		 *  @param  {Time=}  offset  The offset from the start of the part
		 *                           to begin playing at.
		 *  @return  {Tone.Part}  this
		 */
	    Tone.Part.prototype.start = function (time, offset) {
	        var ticks = this.toTicks(time);
	        if (this._state.getValueAtTime(ticks) !== Tone.State.Started) {
	            if (this._loop) {
	                offset = Tone.defaultArg(offset, this._loopStart);
	            } else {
	                offset = Tone.defaultArg(offset, 0);
	            }
	            offset = this.toTicks(offset);
	            this._state.add({
	                'state': Tone.State.Started,
	                'time': ticks,
	                'offset': offset
	            });
	            this._forEach(function (event) {
	                this._startNote(event, ticks, offset);
	            });
	        }
	        return this;
	    };
	    /**
		 *  Start the event in the given event at the correct time given
		 *  the ticks and offset and looping.
		 *  @param  {Tone.Event}  event 
		 *  @param  {Ticks}  ticks
		 *  @param  {Ticks}  offset
		 *  @private
		 */
	    Tone.Part.prototype._startNote = function (event, ticks, offset) {
	        ticks -= offset;
	        if (this._loop) {
	            if (event.startOffset >= this._loopStart && event.startOffset < this._loopEnd) {
	                if (event.startOffset < offset) {
	                    //start it on the next loop
	                    ticks += this._getLoopDuration();
	                }
	                event.start(Tone.TransportTime(ticks, 'i'));
	            } else if (event.startOffset < this._loopStart && event.startOffset >= offset) {
	                event.loop = false;
	                event.start(Tone.TransportTime(ticks, 'i'));
	            }
	        } else {
	            if (event.startOffset >= offset) {
	                event.start(Tone.TransportTime(ticks, 'i'));
	            }
	        }
	    };
	    /**
		 *  The start from the scheduled start time
		 *  @type {Ticks}
		 *  @memberOf Tone.Part#
		 *  @name startOffset
		 *  @private
		 */
	    Object.defineProperty(Tone.Part.prototype, 'startOffset', {
	        get: function () {
	            return this._startOffset;
	        },
	        set: function (offset) {
	            this._startOffset = offset;
	            this._forEach(function (event) {
	                event.startOffset += this._startOffset;
	            });
	        }
	    });
	    /**
		 *  Stop the part at the given time.
		 *  @param  {TimelinePosition}  time  When to stop the part.
		 *  @return  {Tone.Part}  this
		 */
	    Tone.Part.prototype.stop = function (time) {
	        var ticks = this.toTicks(time);
	        this._state.cancel(ticks);
	        this._state.setStateAtTime(Tone.State.Stopped, ticks);
	        this._forEach(function (event) {
	            event.stop(time);
	        });
	        return this;
	    };
	    /**
		 *  Get/Set an Event's value at the given time. 
		 *  If a value is passed in and no event exists at
		 *  the given time, one will be created with that value. 
		 *  If two events are at the same time, the first one will
		 *  be returned.
		 *  @example
		 * part.at("1m"); //returns the part at the first measure
		 *
		 * part.at("2m", "C2"); //set the value at "2m" to C2. 
		 * //if an event didn't exist at that time, it will be created.
		 *  @param {TransportTime} time The time of the event to get or set.
		 *  @param {*=} value If a value is passed in, the value of the
		 *                    event at the given time will be set to it.
		 *  @return {Tone.Event} the event at the time
		 */
	    Tone.Part.prototype.at = function (time, value) {
	        time = Tone.TransportTime(time);
	        var tickTime = Tone.Time(1, 'i').toSeconds();
	        for (var i = 0; i < this._events.length; i++) {
	            var event = this._events[i];
	            if (Math.abs(time.toTicks() - event.startOffset) < tickTime) {
	                if (!Tone.isUndef(value)) {
	                    event.value = value;
	                }
	                return event;
	            }
	        }
	        //if there was no event at that time, create one
	        if (!Tone.isUndef(value)) {
	            this.add(time, value);
	            //return the new event
	            return this._events[this._events.length - 1];
	        } else {
	            return null;
	        }
	    };
	    /**
		 *  Add a an event to the part. 
		 *  @param {Time} time The time the note should start.
		 *                            If an object is passed in, it should
		 *                            have a 'time' attribute and the rest
		 *                            of the object will be used as the 'value'.
		 *  @param  {Tone.Event|*}  value 
		 *  @returns {Tone.Part} this
		 *  @example
		 * part.add("1m", "C#+11");
		 */
	    Tone.Part.prototype.add = function (time, value) {
	        //extract the parameters
	        if (time.hasOwnProperty('time')) {
	            value = time;
	            time = value.time;
	        }
	        time = this.toTicks(time);
	        var event;
	        if (value instanceof Tone.Event) {
	            event = value;
	            event.callback = this._tick.bind(this);
	        } else {
	            event = new Tone.Event({
	                'callback': this._tick.bind(this),
	                'value': value
	            });
	        }
	        //the start offset
	        event.startOffset = time;
	        //initialize the values
	        event.set({
	            'loopEnd': this.loopEnd,
	            'loopStart': this.loopStart,
	            'loop': this.loop,
	            'humanize': this.humanize,
	            'playbackRate': this.playbackRate,
	            'probability': this.probability
	        });
	        this._events.push(event);
	        //start the note if it should be played right now
	        this._restartEvent(event);
	        return this;
	    };
	    /**
		 *  Restart the given event
		 *  @param  {Tone.Event}  event 
		 *  @private
		 */
	    Tone.Part.prototype._restartEvent = function (event) {
	        this._state.forEach(function (stateEvent) {
	            if (stateEvent.state === Tone.State.Started) {
	                this._startNote(event, stateEvent.time, stateEvent.offset);
	            } else {
	                //stop the note
	                event.stop(Tone.TransportTime(stateEvent.time, 'i'));
	            }
	        }.bind(this));
	    };
	    /**
		 *  Remove an event from the part. Will recursively iterate
		 *  into nested parts to find the event.
		 *  @param {Time} time The time of the event
		 *  @param {*} value Optionally select only a specific event value
		 *  @return  {Tone.Part}  this
		 */
	    Tone.Part.prototype.remove = function (time, value) {
	        //extract the parameters
	        if (time.hasOwnProperty('time')) {
	            value = time;
	            time = value.time;
	        }
	        time = this.toTicks(time);
	        for (var i = this._events.length - 1; i >= 0; i--) {
	            var event = this._events[i];
	            if (event instanceof Tone.Part) {
	                event.remove(time, value);
	            } else {
	                if (event.startOffset === time) {
	                    if (Tone.isUndef(value) || !Tone.isUndef(value) && event.value === value) {
	                        this._events.splice(i, 1);
	                        event.dispose();
	                    }
	                }
	            }
	        }
	        return this;
	    };
	    /**
		 *  Remove all of the notes from the group. 
		 *  @return  {Tone.Part}  this
		 */
	    Tone.Part.prototype.removeAll = function () {
	        this._forEach(function (event) {
	            event.dispose();
	        });
	        this._events = [];
	        return this;
	    };
	    /**
		 *  Cancel scheduled state change events: i.e. "start" and "stop".
		 *  @param {TimelinePosition} after The time after which to cancel the scheduled events.
		 *  @return  {Tone.Part}  this
		 */
	    Tone.Part.prototype.cancel = function (after) {
	        this._forEach(function (event) {
	            event.cancel(after);
	        });
	        this._state.cancel(this.toTicks(after));
	        return this;
	    };
	    /**
		 *  Iterate over all of the events
		 *  @param {Function} callback
		 *  @param {Object} ctx The context
		 *  @private
		 */
	    Tone.Part.prototype._forEach = function (callback, ctx) {
	        if (this._events) {
	            ctx = Tone.defaultArg(ctx, this);
	            for (var i = this._events.length - 1; i >= 0; i--) {
	                var e = this._events[i];
	                if (e instanceof Tone.Part) {
	                    e._forEach(callback, ctx);
	                } else {
	                    callback.call(ctx, e);
	                }
	            }
	        }
	        return this;
	    };
	    /**
		 *  Set the attribute of all of the events
		 *  @param  {String}  attr  the attribute to set
		 *  @param  {*}  value      The value to set it to
		 *  @private
		 */
	    Tone.Part.prototype._setAll = function (attr, value) {
	        this._forEach(function (event) {
	            event[attr] = value;
	        });
	    };
	    /**
		 *  Internal tick method
		 *  @param  {Number}  time  The time of the event in seconds
		 *  @private
		 */
	    Tone.Part.prototype._tick = function (time, value) {
	        if (!this.mute) {
	            this.callback(time, value);
	        }
	    };
	    /**
		 *  Determine if the event should be currently looping
		 *  given the loop boundries of this Part.
		 *  @param  {Tone.Event}  event  The event to test
		 *  @private
		 */
	    Tone.Part.prototype._testLoopBoundries = function (event) {
	        if (event.startOffset < this._loopStart || event.startOffset >= this._loopEnd) {
	            event.cancel(0);
	        } else {
	            //reschedule it if it's stopped
	            if (event.state === Tone.State.Stopped) {
	                this._restartEvent(event);
	            }
	        }
	    };
	    /**
		 *  The probability of the notes being triggered.
		 *  @memberOf Tone.Part#
		 *  @type {NormalRange}
		 *  @name probability
		 */
	    Object.defineProperty(Tone.Part.prototype, 'probability', {
	        get: function () {
	            return this._probability;
	        },
	        set: function (prob) {
	            this._probability = prob;
	            this._setAll('probability', prob);
	        }
	    });
	    /**
		 *  If set to true, will apply small random variation
		 *  to the callback time. If the value is given as a time, it will randomize
		 *  by that amount.
		 *  @example
		 * event.humanize = true;
		 *  @type {Boolean|Time}
		 *  @name humanize
		 */
	    Object.defineProperty(Tone.Part.prototype, 'humanize', {
	        get: function () {
	            return this._humanize;
	        },
	        set: function (variation) {
	            this._humanize = variation;
	            this._setAll('humanize', variation);
	        }
	    });
	    /**
		 *  If the part should loop or not
		 *  between Tone.Part.loopStart and 
		 *  Tone.Part.loopEnd. An integer
		 *  value corresponds to the number of
		 *  loops the Part does after it starts.
		 *  @memberOf Tone.Part#
		 *  @type {Boolean|Positive}
		 *  @name loop
		 *  @example
		 * //loop the part 8 times
		 * part.loop = 8;
		 */
	    Object.defineProperty(Tone.Part.prototype, 'loop', {
	        get: function () {
	            return this._loop;
	        },
	        set: function (loop) {
	            this._loop = loop;
	            this._forEach(function (event) {
	                event._loopStart = this._loopStart;
	                event._loopEnd = this._loopEnd;
	                event.loop = loop;
	                this._testLoopBoundries(event);
	            });
	        }
	    });
	    /**
		 *  The loopEnd point determines when it will 
		 *  loop if Tone.Part.loop is true.
		 *  @memberOf Tone.Part#
		 *  @type {TransportTime}
		 *  @name loopEnd
		 */
	    Object.defineProperty(Tone.Part.prototype, 'loopEnd', {
	        get: function () {
	            return Tone.TransportTime(this._loopEnd, 'i').toNotation();
	        },
	        set: function (loopEnd) {
	            this._loopEnd = this.toTicks(loopEnd);
	            if (this._loop) {
	                this._forEach(function (event) {
	                    event.loopEnd = loopEnd;
	                    this._testLoopBoundries(event);
	                });
	            }
	        }
	    });
	    /**
		 *  The loopStart point determines when it will 
		 *  loop if Tone.Part.loop is true.
		 *  @memberOf Tone.Part#
		 *  @type {TransportTime}
		 *  @name loopStart
		 */
	    Object.defineProperty(Tone.Part.prototype, 'loopStart', {
	        get: function () {
	            return Tone.TransportTime(this._loopStart, 'i').toNotation();
	        },
	        set: function (loopStart) {
	            this._loopStart = this.toTicks(loopStart);
	            if (this._loop) {
	                this._forEach(function (event) {
	                    event.loopStart = this.loopStart;
	                    this._testLoopBoundries(event);
	                });
	            }
	        }
	    });
	    /**
		 * 	The playback rate of the part
		 *  @memberOf Tone.Part#
		 *  @type {Positive}
		 *  @name playbackRate
		 */
	    Object.defineProperty(Tone.Part.prototype, 'playbackRate', {
	        get: function () {
	            return this._playbackRate;
	        },
	        set: function (rate) {
	            this._playbackRate = rate;
	            this._setAll('playbackRate', rate);
	        }
	    });
	    /**
		 * 	The number of scheduled notes in the part. 
		 *  @memberOf Tone.Part#
		 *  @type {Positive}
		 *  @name length
		 *  @readOnly
		 */
	    Object.defineProperty(Tone.Part.prototype, 'length', {
	        get: function () {
	            return this._events.length;
	        }
	    });
	    /**
		 *  Clean up
		 *  @return  {Tone.Part}  this
		 */
	    Tone.Part.prototype.dispose = function () {
	        this.removeAll();
	        this._state.dispose();
	        this._state = null;
	        this.callback = null;
	        this._events = null;
	        return this;
	    };
	    return Tone.Part;
	});
	Module(function (Tone) {
	    /**
		 *  @class Tone.Pattern arpeggiates between the given notes
		 *         in a number of patterns. See Tone.CtrlPattern for
		 *         a full list of patterns.
		 *  @example
		 * var pattern = new Tone.Pattern(function(time, note){
		 *   //the order of the notes passed in depends on the pattern
		 * }, ["C2", "D4", "E5", "A6"], "upDown");
		 *  @extends {Tone.Loop}
		 *  @param {Function} callback The callback to invoke with the
		 *                             event.
		 *  @param {Array} values The values to arpeggiate over.
		 */
	    Tone.Pattern = function () {
	        var options = Tone.defaults(arguments, [
	            'callback',
	            'values',
	            'pattern'
	        ], Tone.Pattern);
	        Tone.Loop.call(this, options);
	        /**
			 *  The pattern manager
			 *  @type {Tone.CtrlPattern}
			 *  @private
			 */
	        this._pattern = new Tone.CtrlPattern({
	            'values': options.values,
	            'type': options.pattern,
	            'index': options.index
	        });
	    };
	    Tone.extend(Tone.Pattern, Tone.Loop);
	    /**
		 *  The defaults
		 *  @const
		 *  @type  {Object}
		 */
	    Tone.Pattern.defaults = {
	        'pattern': Tone.CtrlPattern.Type.Up,
	        'callback': Tone.noOp,
	        'values': []
	    };
	    /**
		 *  Internal function called when the notes should be called
		 *  @param  {Number}  time  The time the event occurs
		 *  @private
		 */
	    Tone.Pattern.prototype._tick = function (time) {
	        this.callback(time, this._pattern.value);
	        this._pattern.next();
	    };
	    /**
		 *  The current index in the values array.
		 *  @memberOf Tone.Pattern#
		 *  @type {Positive}
		 *  @name index
		 */
	    Object.defineProperty(Tone.Pattern.prototype, 'index', {
	        get: function () {
	            return this._pattern.index;
	        },
	        set: function (i) {
	            this._pattern.index = i;
	        }
	    });
	    /**
		 *  The array of events.
		 *  @memberOf Tone.Pattern#
		 *  @type {Array}
		 *  @name values
		 */
	    Object.defineProperty(Tone.Pattern.prototype, 'values', {
	        get: function () {
	            return this._pattern.values;
	        },
	        set: function (vals) {
	            this._pattern.values = vals;
	        }
	    });
	    /**
		 *  The current value of the pattern.
		 *  @memberOf Tone.Pattern#
		 *  @type {*}
		 *  @name value
		 *  @readOnly
		 */
	    Object.defineProperty(Tone.Pattern.prototype, 'value', {
	        get: function () {
	            return this._pattern.value;
	        }
	    });
	    /**
		 *  The pattern type. See Tone.CtrlPattern for the full list of patterns.
		 *  @memberOf Tone.Pattern#
		 *  @type {String}
		 *  @name pattern
		 */
	    Object.defineProperty(Tone.Pattern.prototype, 'pattern', {
	        get: function () {
	            return this._pattern.type;
	        },
	        set: function (pattern) {
	            this._pattern.type = pattern;
	        }
	    });
	    /**
		 *  Clean up
		 *  @return  {Tone.Pattern}  this
		 */
	    Tone.Pattern.prototype.dispose = function () {
	        Tone.Loop.prototype.dispose.call(this);
	        this._pattern.dispose();
	        this._pattern = null;
	    };
	    return Tone.Pattern;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class A sequence is an alternate notation of a part. Instead
		 *         of passing in an array of [time, event] pairs, pass
		 *         in an array of events which will be spaced at the
		 *         given subdivision. Sub-arrays will subdivide that beat
		 *         by the number of items are in the array. 
		 *         Sequence notation inspiration from [Tidal](http://yaxu.org/tidal/)
		 *  @param  {Function}  callback  The callback to invoke with every note
		 *  @param  {Array}    events  The sequence
		 *  @param  {Time} subdivision  The subdivision between which events are placed. 
		 *  @extends {Tone.Part}
		 *  @example
		 * var seq = new Tone.Sequence(function(time, note){
		 * 	console.log(note);
		 * //straight quater notes
		 * }, ["C4", "E4", "G4", "A4"], "4n");
		 *  @example
		 * var seq = new Tone.Sequence(function(time, note){
		 * 	console.log(note);
		 * //subdivisions are given as subarrays
		 * }, ["C4", ["E4", "D4", "E4"], "G4", ["A4", "G4"]]);
		 */
	    Tone.Sequence = function () {
	        var options = Tone.defaults(arguments, [
	            'callback',
	            'events',
	            'subdivision'
	        ], Tone.Sequence);
	        //remove the events
	        var events = options.events;
	        delete options.events;
	        Tone.Part.call(this, options);
	        /**
			 *  The subdivison of each note
			 *  @type  {Ticks}
			 *  @private
			 */
	        this._subdivision = this.toTicks(options.subdivision);
	        //if no time was passed in, the loop end is the end of the cycle
	        if (Tone.isUndef(options.loopEnd) && !Tone.isUndef(events)) {
	            this._loopEnd = events.length * this._subdivision;
	        }
	        //defaults to looping
	        this._loop = true;
	        //add all of the events
	        if (!Tone.isUndef(events)) {
	            for (var i = 0; i < events.length; i++) {
	                this.add(i, events[i]);
	            }
	        }
	    };
	    Tone.extend(Tone.Sequence, Tone.Part);
	    /**
		 *  The default values.
		 *  @type  {Object}
		 */
	    Tone.Sequence.defaults = { 'subdivision': '4n' };
	    /**
		 *  The subdivision of the sequence. This can only be 
		 *  set in the constructor. The subdivision is the 
		 *  interval between successive steps. 
		 *  @type {Time}
		 *  @memberOf Tone.Sequence#
		 *  @name subdivision
		 *  @readOnly
		 */
	    Object.defineProperty(Tone.Sequence.prototype, 'subdivision', {
	        get: function () {
	            return Tone.Time(this._subdivision, 'i').toNotation();
	        }
	    });
	    /**
		 *  Get/Set an index of the sequence. If the index contains a subarray, 
		 *  a Tone.Sequence representing that sub-array will be returned. 
		 *  @example
		 * var sequence = new Tone.Sequence(playNote, ["E4", "C4", "F#4", ["A4", "Bb3"]])
		 * sequence.at(0)// => returns "E4"
		 * //set a value
		 * sequence.at(0, "G3");
		 * //get a nested sequence
		 * sequence.at(3).at(1)// => returns "Bb3"
		 * @param {Positive} index The index to get or set
		 * @param {*} value Optionally pass in the value to set at the given index.
		 */
	    Tone.Sequence.prototype.at = function (index, value) {
	        //if the value is an array, 
	        if (Tone.isArray(value)) {
	            //remove the current event at that index
	            this.remove(index);
	        }
	        //call the parent's method
	        return Tone.Part.prototype.at.call(this, this._indexTime(index), value);
	    };
	    /**
		 *  Add an event at an index, if there's already something
		 *  at that index, overwrite it. If `value` is an array, 
		 *  it will be parsed as a subsequence.
		 *  @param {Number} index The index to add the event to
		 *  @param {*} value The value to add at that index
		 *  @returns {Tone.Sequence} this
		 */
	    Tone.Sequence.prototype.add = function (index, value) {
	        if (value === null) {
	            return this;
	        }
	        if (Tone.isArray(value)) {
	            //make a subsequence and add that to the sequence
	            var subSubdivision = Math.round(this._subdivision / value.length);
	            value = new Tone.Sequence(this._tick.bind(this), value, Tone.Time(subSubdivision, 'i'));
	        }
	        Tone.Part.prototype.add.call(this, this._indexTime(index), value);
	        return this;
	    };
	    /**
		 *  Remove a value from the sequence by index
		 *  @param {Number} index The index of the event to remove
		 *  @returns {Tone.Sequence} this
		 */
	    Tone.Sequence.prototype.remove = function (index, value) {
	        Tone.Part.prototype.remove.call(this, this._indexTime(index), value);
	        return this;
	    };
	    /**
		 *  Get the time of the index given the Sequence's subdivision
		 *  @param  {Number}  index 
		 *  @return  {Time}  The time of that index
		 *  @private
		 */
	    Tone.Sequence.prototype._indexTime = function (index) {
	        if (index instanceof Tone.TransportTime) {
	            return index;
	        } else {
	            return Tone.TransportTime(index * this._subdivision + this.startOffset, 'i');
	        }
	    };
	    /**
		 *  Clean up.
		 *  @return {Tone.Sequence} this
		 */
	    Tone.Sequence.prototype.dispose = function () {
	        Tone.Part.prototype.dispose.call(this);
	        return this;
	    };
	    return Tone.Sequence;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.PulseOscillator is a pulse oscillator with control over pulse width,
		 *         also known as the duty cycle. At 50% duty cycle (width = 0.5) the wave is 
		 *         a square and only odd-numbered harmonics are present. At all other widths 
		 *         even-numbered harmonics are present. Read more 
		 *         [here](https://wigglewave.wordpress.com/2014/08/16/pulse-waveforms-and-harmonics/).
		 *
		 *  @constructor
		 *  @extends {Tone.Source}
		 *  @param {Frequency} [frequency] The frequency of the oscillator
		 *  @param {NormalRange} [width] The width of the pulse
		 *  @example
		 * var pulse = new Tone.PulseOscillator("E5", 0.4).toMaster().start();
		 */
	    Tone.PulseOscillator = function () {
	        var options = Tone.defaults(arguments, [
	            'frequency',
	            'width'
	        ], Tone.Oscillator);
	        Tone.Source.call(this, options);
	        /**
			 *  The width of the pulse. 
			 *  @type {NormalRange}
			 *  @signal
			 */
	        this.width = new Tone.Signal(options.width, Tone.Type.NormalRange);
	        /**
			 *  gate the width amount
			 *  @type {Tone.Gain}
			 *  @private
			 */
	        this._widthGate = new Tone.Gain();
	        /**
			 *  the sawtooth oscillator
			 *  @type {Tone.Oscillator}
			 *  @private
			 */
	        this._sawtooth = new Tone.Oscillator({
	            frequency: options.frequency,
	            detune: options.detune,
	            type: 'sawtooth',
	            phase: options.phase
	        });
	        /**
			 *  The frequency control.
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.frequency = this._sawtooth.frequency;
	        /**
			 *  The detune in cents. 
			 *  @type {Cents}
			 *  @signal
			 */
	        this.detune = this._sawtooth.detune;
	        /**
			 *  Threshold the signal to turn it into a square
			 *  @type {Tone.WaveShaper}
			 *  @private
			 */
	        this._thresh = new Tone.WaveShaper(function (val) {
	            if (val < 0) {
	                return -1;
	            } else {
	                return 1;
	            }
	        });
	        //connections
	        this._sawtooth.chain(this._thresh, this.output);
	        this.width.chain(this._widthGate, this._thresh);
	        this._readOnly([
	            'width',
	            'frequency',
	            'detune'
	        ]);
	    };
	    Tone.extend(Tone.PulseOscillator, Tone.Source);
	    /**
		 *  The default parameters.
		 *  @static
		 *  @const
		 *  @type {Object}
		 */
	    Tone.PulseOscillator.defaults = {
	        'frequency': 440,
	        'detune': 0,
	        'phase': 0,
	        'width': 0.2
	    };
	    /**
		 *  start the oscillator
		 *  @param  {Time} time 
		 *  @private
		 */
	    Tone.PulseOscillator.prototype._start = function (time) {
	        time = this.toSeconds(time);
	        this._sawtooth.start(time);
	        this._widthGate.gain.setValueAtTime(1, time);
	    };
	    /**
		 *  stop the oscillator
		 *  @param  {Time} time 
		 *  @private
		 */
	    Tone.PulseOscillator.prototype._stop = function (time) {
	        time = this.toSeconds(time);
	        this._sawtooth.stop(time);
	        //the width is still connected to the output. 
	        //that needs to be stopped also
	        this._widthGate.gain.setValueAtTime(0, time);
	    };
	    /**
		 * The phase of the oscillator in degrees.
		 * @memberOf Tone.PulseOscillator#
		 * @type {Degrees}
		 * @name phase
		 */
	    Object.defineProperty(Tone.PulseOscillator.prototype, 'phase', {
	        get: function () {
	            return this._sawtooth.phase;
	        },
	        set: function (phase) {
	            this._sawtooth.phase = phase;
	        }
	    });
	    /**
		 * The type of the oscillator. Always returns "pulse".
		 * @readOnly
		 * @memberOf Tone.PulseOscillator#
		 * @type {string}
		 * @name type
		 */
	    Object.defineProperty(Tone.PulseOscillator.prototype, 'type', {
	        get: function () {
	            return 'pulse';
	        }
	    });
	    /**
		 * The partials of the waveform. Cannot set partials for this waveform type
		 * @memberOf Tone.PulseOscillator#
		 * @type {Array}
		 * @name partials
		 * @private
		 */
	    Object.defineProperty(Tone.PulseOscillator.prototype, 'partials', {
	        get: function () {
	            return [];
	        }
	    });
	    /**
		 *  Clean up method.
		 *  @return {Tone.PulseOscillator} this
		 */
	    Tone.PulseOscillator.prototype.dispose = function () {
	        Tone.Source.prototype.dispose.call(this);
	        this._sawtooth.dispose();
	        this._sawtooth = null;
	        this._writable([
	            'width',
	            'frequency',
	            'detune'
	        ]);
	        this.width.dispose();
	        this.width = null;
	        this._widthGate.dispose();
	        this._widthGate = null;
	        this._thresh.dispose();
	        this._thresh = null;
	        this.frequency = null;
	        this.detune = null;
	        return this;
	    };
	    return Tone.PulseOscillator;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.PWMOscillator modulates the width of a Tone.PulseOscillator 
		 *         at the modulationFrequency. This has the effect of continuously
		 *         changing the timbre of the oscillator by altering the harmonics 
		 *         generated.
		 *
		 *  @extends {Tone.Source}
		 *  @constructor
		 *  @param {Frequency} frequency The starting frequency of the oscillator. 
		 *  @param {Frequency} modulationFrequency The modulation frequency of the width of the pulse. 
		 *  @example
		 *  var pwm = new Tone.PWMOscillator("Ab3", 0.3).toMaster().start();
		 */
	    Tone.PWMOscillator = function () {
	        var options = Tone.defaults(arguments, [
	            'frequency',
	            'modulationFrequency'
	        ], Tone.PWMOscillator);
	        Tone.Source.call(this, options);
	        /**
			 *  the pulse oscillator
			 *  @type {Tone.PulseOscillator}
			 *  @private
			 */
	        this._pulse = new Tone.PulseOscillator(options.modulationFrequency);
	        //change the pulse oscillator type
	        this._pulse._sawtooth.type = 'sine';
	        /**
			 *  the modulator
			 *  @type {Tone.Oscillator}
			 *  @private
			 */
	        this._modulator = new Tone.Oscillator({
	            'frequency': options.frequency,
	            'detune': options.detune,
	            'phase': options.phase
	        });
	        /**
			 *  Scale the oscillator so it doesn't go silent 
			 *  at the extreme values.
			 *  @type {Tone.Multiply}
			 *  @private
			 */
	        this._scale = new Tone.Multiply(2);
	        /**
			 *  The frequency control.
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.frequency = this._modulator.frequency;
	        /**
			 *  The detune of the oscillator.
			 *  @type {Cents}
			 *  @signal
			 */
	        this.detune = this._modulator.detune;
	        /**
			 *  The modulation rate of the oscillator. 
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.modulationFrequency = this._pulse.frequency;
	        //connections
	        this._modulator.chain(this._scale, this._pulse.width);
	        this._pulse.connect(this.output);
	        this._readOnly([
	            'modulationFrequency',
	            'frequency',
	            'detune'
	        ]);
	    };
	    Tone.extend(Tone.PWMOscillator, Tone.Source);
	    /**
		 *  default values
		 *  @static
		 *  @type {Object}
		 *  @const
		 */
	    Tone.PWMOscillator.defaults = {
	        'frequency': 440,
	        'detune': 0,
	        'phase': 0,
	        'modulationFrequency': 0.4
	    };
	    /**
		 *  start the oscillator
		 *  @param  {Time} [time=now]
		 *  @private
		 */
	    Tone.PWMOscillator.prototype._start = function (time) {
	        time = this.toSeconds(time);
	        this._modulator.start(time);
	        this._pulse.start(time);
	    };
	    /**
		 *  stop the oscillator
		 *  @param  {Time} time (optional) timing parameter
		 *  @private
		 */
	    Tone.PWMOscillator.prototype._stop = function (time) {
	        time = this.toSeconds(time);
	        this._modulator.stop(time);
	        this._pulse.stop(time);
	    };
	    /**
		 * The type of the oscillator. Always returns "pwm".
		 * @readOnly
		 * @memberOf Tone.PWMOscillator#
		 * @type {string}
		 * @name type
		 */
	    Object.defineProperty(Tone.PWMOscillator.prototype, 'type', {
	        get: function () {
	            return 'pwm';
	        }
	    });
	    /**
		 * The partials of the waveform. Cannot set partials for this waveform type
		 * @memberOf Tone.PWMOscillator#
		 * @type {Array}
		 * @name partials
		 * @private
		 */
	    Object.defineProperty(Tone.PWMOscillator.prototype, 'partials', {
	        get: function () {
	            return [];
	        }
	    });
	    /**
		 * The phase of the oscillator in degrees.
		 * @memberOf Tone.PWMOscillator#
		 * @type {number}
		 * @name phase
		 */
	    Object.defineProperty(Tone.PWMOscillator.prototype, 'phase', {
	        get: function () {
	            return this._modulator.phase;
	        },
	        set: function (phase) {
	            this._modulator.phase = phase;
	        }
	    });
	    /**
		 *  Clean up.
		 *  @return {Tone.PWMOscillator} this
		 */
	    Tone.PWMOscillator.prototype.dispose = function () {
	        Tone.Source.prototype.dispose.call(this);
	        this._pulse.dispose();
	        this._pulse = null;
	        this._scale.dispose();
	        this._scale = null;
	        this._modulator.dispose();
	        this._modulator = null;
	        this._writable([
	            'modulationFrequency',
	            'frequency',
	            'detune'
	        ]);
	        this.frequency = null;
	        this.detune = null;
	        this.modulationFrequency = null;
	        return this;
	    };
	    return Tone.PWMOscillator;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.FMOscillator 
		 *
		 *  @extends {Tone.Source}
		 *  @constructor
		 *  @param {Frequency} frequency The starting frequency of the oscillator. 
		 *  @param {String} type The type of the carrier oscillator.
		 *  @param {String} modulationType The type of the modulator oscillator.
		 *  @example
		 * //a sine oscillator frequency-modulated by a square wave
		 * var fmOsc = new Tone.FMOscillator("Ab3", "sine", "square").toMaster().start();
		 */
	    Tone.FMOscillator = function () {
	        var options = Tone.defaults(arguments, [
	            'frequency',
	            'type',
	            'modulationType'
	        ], Tone.FMOscillator);
	        Tone.Source.call(this, options);
	        /**
			 *  The carrier oscillator
			 *  @type {Tone.Oscillator}
			 *  @private
			 */
	        this._carrier = new Tone.Oscillator(options.frequency, options.type);
	        /**
			 *  The oscillator's frequency
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.frequency = new Tone.Signal(options.frequency, Tone.Type.Frequency);
	        /**
			 *  The detune control signal.
			 *  @type {Cents}
			 *  @signal
			 */
	        this.detune = this._carrier.detune;
	        this.detune.value = options.detune;
	        /**
			 *  The modulation index which is in essence the depth or amount of the modulation. In other terms it is the 
			 *  ratio of the frequency of the modulating signal (mf) to the amplitude of the 
			 *  modulating signal (ma) -- as in ma/mf. 
			 *	@type {Positive}
			 *	@signal
			 */
	        this.modulationIndex = new Tone.Multiply(options.modulationIndex);
	        this.modulationIndex.units = Tone.Type.Positive;
	        /**
			 *  The modulating oscillator
			 *  @type  {Tone.Oscillator}
			 *  @private
			 */
	        this._modulator = new Tone.Oscillator(options.frequency, options.modulationType);
	        /**
			 *  Harmonicity is the frequency ratio between the carrier and the modulator oscillators. 
			 *  A harmonicity of 1 gives both oscillators the same frequency. 
			 *  Harmonicity = 2 means a change of an octave. 
			 *  @type {Positive}
			 *  @signal
			 *  @example
			 * //pitch the modulator an octave below carrier
			 * synth.harmonicity.value = 0.5;
			 */
	        this.harmonicity = new Tone.Multiply(options.harmonicity);
	        this.harmonicity.units = Tone.Type.Positive;
	        /**
			 *  the node where the modulation happens
			 *  @type {Tone.Gain}
			 *  @private
			 */
	        this._modulationNode = new Tone.Gain(0);
	        //connections
	        this.frequency.connect(this._carrier.frequency);
	        this.frequency.chain(this.harmonicity, this._modulator.frequency);
	        this.frequency.chain(this.modulationIndex, this._modulationNode);
	        this._modulator.connect(this._modulationNode.gain);
	        this._modulationNode.connect(this._carrier.frequency);
	        this._carrier.connect(this.output);
	        this.detune.connect(this._modulator.detune);
	        this.phase = options.phase;
	        this._readOnly([
	            'modulationIndex',
	            'frequency',
	            'detune',
	            'harmonicity'
	        ]);
	    };
	    Tone.extend(Tone.FMOscillator, Tone.Source);
	    /**
		 *  default values
		 *  @static
		 *  @type {Object}
		 *  @const
		 */
	    Tone.FMOscillator.defaults = {
	        'frequency': 440,
	        'detune': 0,
	        'phase': 0,
	        'modulationIndex': 2,
	        'modulationType': 'square',
	        'harmonicity': 1
	    };
	    /**
		 *  start the oscillator
		 *  @param  {Time} [time=now]
		 *  @private
		 */
	    Tone.FMOscillator.prototype._start = function (time) {
	        time = this.toSeconds(time);
	        this._modulator.start(time);
	        this._carrier.start(time);
	    };
	    /**
		 *  stop the oscillator
		 *  @param  {Time} time (optional) timing parameter
		 *  @private
		 */
	    Tone.FMOscillator.prototype._stop = function (time) {
	        time = this.toSeconds(time);
	        this._modulator.stop(time);
	        this._carrier.stop(time);
	    };
	    /**
		 * The type of the carrier oscillator
		 * @memberOf Tone.FMOscillator#
		 * @type {string}
		 * @name type
		 */
	    Object.defineProperty(Tone.FMOscillator.prototype, 'type', {
	        get: function () {
	            return this._carrier.type;
	        },
	        set: function (type) {
	            this._carrier.type = type;
	        }
	    });
	    /**
		 * The type of the modulator oscillator
		 * @memberOf Tone.FMOscillator#
		 * @type {String}
		 * @name modulationType
		 */
	    Object.defineProperty(Tone.FMOscillator.prototype, 'modulationType', {
	        get: function () {
	            return this._modulator.type;
	        },
	        set: function (type) {
	            this._modulator.type = type;
	        }
	    });
	    /**
		 * The phase of the oscillator in degrees.
		 * @memberOf Tone.FMOscillator#
		 * @type {number}
		 * @name phase
		 */
	    Object.defineProperty(Tone.FMOscillator.prototype, 'phase', {
	        get: function () {
	            return this._carrier.phase;
	        },
	        set: function (phase) {
	            this._carrier.phase = phase;
	            this._modulator.phase = phase;
	        }
	    });
	    /**
		 * The partials of the carrier waveform. A partial represents 
		 * the amplitude at a harmonic. The first harmonic is the 
		 * fundamental frequency, the second is the octave and so on
		 * following the harmonic series. 
		 * Setting this value will automatically set the type to "custom". 
		 * The value is an empty array when the type is not "custom". 
		 * @memberOf Tone.FMOscillator#
		 * @type {Array}
		 * @name partials
		 * @example
		 * osc.partials = [1, 0.2, 0.01];
		 */
	    Object.defineProperty(Tone.FMOscillator.prototype, 'partials', {
	        get: function () {
	            return this._carrier.partials;
	        },
	        set: function (partials) {
	            this._carrier.partials = partials;
	        }
	    });
	    /**
		 *  Clean up.
		 *  @return {Tone.FMOscillator} this
		 */
	    Tone.FMOscillator.prototype.dispose = function () {
	        Tone.Source.prototype.dispose.call(this);
	        this._writable([
	            'modulationIndex',
	            'frequency',
	            'detune',
	            'harmonicity'
	        ]);
	        this.frequency.dispose();
	        this.frequency = null;
	        this.detune = null;
	        this.harmonicity.dispose();
	        this.harmonicity = null;
	        this._carrier.dispose();
	        this._carrier = null;
	        this._modulator.dispose();
	        this._modulator = null;
	        this._modulationNode.dispose();
	        this._modulationNode = null;
	        this.modulationIndex.dispose();
	        this.modulationIndex = null;
	        return this;
	    };
	    return Tone.FMOscillator;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.AMOscillator 
		 *
		 *  @extends {Tone.Oscillator}
		 *  @constructor
		 *  @param {Frequency} frequency The starting frequency of the oscillator. 
		 *  @param {String} type The type of the carrier oscillator.
		 *  @param {String} modulationType The type of the modulator oscillator.
		 *  @example
		 * //a sine oscillator frequency-modulated by a square wave
		 * var fmOsc = new Tone.AMOscillator("Ab3", "sine", "square").toMaster().start();
		 */
	    Tone.AMOscillator = function () {
	        var options = Tone.defaults(arguments, [
	            'frequency',
	            'type',
	            'modulationType'
	        ], Tone.AMOscillator);
	        Tone.Source.call(this, options);
	        /**
			 *  The carrier oscillator
			 *  @type {Tone.Oscillator}
			 *  @private
			 */
	        this._carrier = new Tone.Oscillator(options.frequency, options.type);
	        /**
			 *  The oscillator's frequency
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.frequency = this._carrier.frequency;
	        /**
			 *  The detune control signal.
			 *  @type {Cents}
			 *  @signal
			 */
	        this.detune = this._carrier.detune;
	        this.detune.value = options.detune;
	        /**
			 *  The modulating oscillator
			 *  @type  {Tone.Oscillator}
			 *  @private
			 */
	        this._modulator = new Tone.Oscillator(options.frequency, options.modulationType);
	        /**
			 *  convert the -1,1 output to 0,1
			 *  @type {Tone.AudioToGain}
			 *  @private
			 */
	        this._modulationScale = new Tone.AudioToGain();
	        /**
			 *  Harmonicity is the frequency ratio between the carrier and the modulator oscillators. 
			 *  A harmonicity of 1 gives both oscillators the same frequency. 
			 *  Harmonicity = 2 means a change of an octave. 
			 *  @type {Positive}
			 *  @signal
			 *  @example
			 * //pitch the modulator an octave below carrier
			 * synth.harmonicity.value = 0.5;
			 */
	        this.harmonicity = new Tone.Multiply(options.harmonicity);
	        this.harmonicity.units = Tone.Type.Positive;
	        /**
			 *  the node where the modulation happens
			 *  @type {Tone.Gain}
			 *  @private
			 */
	        this._modulationNode = new Tone.Gain(0);
	        //connections
	        this.frequency.chain(this.harmonicity, this._modulator.frequency);
	        this.detune.connect(this._modulator.detune);
	        this._modulator.chain(this._modulationScale, this._modulationNode.gain);
	        this._carrier.chain(this._modulationNode, this.output);
	        this.phase = options.phase;
	        this._readOnly([
	            'frequency',
	            'detune',
	            'harmonicity'
	        ]);
	    };
	    Tone.extend(Tone.AMOscillator, Tone.Oscillator);
	    /**
		 *  default values
		 *  @static
		 *  @type {Object}
		 *  @const
		 */
	    Tone.AMOscillator.defaults = {
	        'frequency': 440,
	        'detune': 0,
	        'phase': 0,
	        'modulationType': 'square',
	        'harmonicity': 1
	    };
	    /**
		 *  start the oscillator
		 *  @param  {Time} [time=now]
		 *  @private
		 */
	    Tone.AMOscillator.prototype._start = function (time) {
	        time = this.toSeconds(time);
	        this._modulator.start(time);
	        this._carrier.start(time);
	    };
	    /**
		 *  stop the oscillator
		 *  @param  {Time} time (optional) timing parameter
		 *  @private
		 */
	    Tone.AMOscillator.prototype._stop = function (time) {
	        time = this.toSeconds(time);
	        this._modulator.stop(time);
	        this._carrier.stop(time);
	    };
	    /**
		 * The type of the carrier oscillator
		 * @memberOf Tone.AMOscillator#
		 * @type {string}
		 * @name type
		 */
	    Object.defineProperty(Tone.AMOscillator.prototype, 'type', {
	        get: function () {
	            return this._carrier.type;
	        },
	        set: function (type) {
	            this._carrier.type = type;
	        }
	    });
	    /**
		 * The type of the modulator oscillator
		 * @memberOf Tone.AMOscillator#
		 * @type {string}
		 * @name modulationType
		 */
	    Object.defineProperty(Tone.AMOscillator.prototype, 'modulationType', {
	        get: function () {
	            return this._modulator.type;
	        },
	        set: function (type) {
	            this._modulator.type = type;
	        }
	    });
	    /**
		 * The phase of the oscillator in degrees.
		 * @memberOf Tone.AMOscillator#
		 * @type {number}
		 * @name phase
		 */
	    Object.defineProperty(Tone.AMOscillator.prototype, 'phase', {
	        get: function () {
	            return this._carrier.phase;
	        },
	        set: function (phase) {
	            this._carrier.phase = phase;
	            this._modulator.phase = phase;
	        }
	    });
	    /**
		 * The partials of the carrier waveform. A partial represents 
		 * the amplitude at a harmonic. The first harmonic is the 
		 * fundamental frequency, the second is the octave and so on
		 * following the harmonic series. 
		 * Setting this value will automatically set the type to "custom". 
		 * The value is an empty array when the type is not "custom". 
		 * @memberOf Tone.AMOscillator#
		 * @type {Array}
		 * @name partials
		 * @example
		 * osc.partials = [1, 0.2, 0.01];
		 */
	    Object.defineProperty(Tone.AMOscillator.prototype, 'partials', {
	        get: function () {
	            return this._carrier.partials;
	        },
	        set: function (partials) {
	            this._carrier.partials = partials;
	        }
	    });
	    /**
		 *  Clean up.
		 *  @return {Tone.AMOscillator} this
		 */
	    Tone.AMOscillator.prototype.dispose = function () {
	        Tone.Source.prototype.dispose.call(this);
	        this._writable([
	            'frequency',
	            'detune',
	            'harmonicity'
	        ]);
	        this.frequency = null;
	        this.detune = null;
	        this.harmonicity.dispose();
	        this.harmonicity = null;
	        this._carrier.dispose();
	        this._carrier = null;
	        this._modulator.dispose();
	        this._modulator = null;
	        this._modulationNode.dispose();
	        this._modulationNode = null;
	        this._modulationScale.dispose();
	        this._modulationScale = null;
	        return this;
	    };
	    return Tone.AMOscillator;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.FatOscillator 
		 *
		 *  @extends {Tone.Source}
		 *  @constructor
		 *  @param {Frequency} frequency The starting frequency of the oscillator. 
		 *  @param {String} type The type of the carrier oscillator.
		 *  @param {String} modulationType The type of the modulator oscillator.
		 *  @example
		 * //a sine oscillator frequency-modulated by a square wave
		 * var fmOsc = new Tone.FatOscillator("Ab3", "sine", "square").toMaster().start();
		 */
	    Tone.FatOscillator = function () {
	        var options = Tone.defaults(arguments, [
	            'frequency',
	            'type',
	            'spread'
	        ], Tone.FatOscillator);
	        Tone.Source.call(this, options);
	        /**
			 *  The oscillator's frequency
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.frequency = new Tone.Signal(options.frequency, Tone.Type.Frequency);
	        /**
			 *  The detune control signal.
			 *  @type {Cents}
			 *  @signal
			 */
	        this.detune = new Tone.Signal(options.detune, Tone.Type.Cents);
	        /**
			 *  The array of oscillators
			 *  @type {Array}
			 *  @private
			 */
	        this._oscillators = [];
	        /**
			 *  The total spread of the oscillators
			 *  @type  {Cents}
			 *  @private
			 */
	        this._spread = options.spread;
	        /**
			 *  The type of the oscillator
			 *  @type {String}
			 *  @private
			 */
	        this._type = options.type;
	        /**
			 *  The phase of the oscillators
			 *  @type {Degrees}
			 *  @private
			 */
	        this._phase = options.phase;
	        /**
			 *  The partials array
			 *  @type {Array}
			 *  @private
			 */
	        this._partials = Tone.defaultArg(options.partials, []);
	        //set the count initially
	        this.count = options.count;
	        this._readOnly([
	            'frequency',
	            'detune'
	        ]);
	    };
	    Tone.extend(Tone.FatOscillator, Tone.Source);
	    /**
		 *  default values
		 *  @static
		 *  @type {Object}
		 *  @const
		 */
	    Tone.FatOscillator.defaults = {
	        'frequency': 440,
	        'detune': 0,
	        'phase': 0,
	        'spread': 20,
	        'count': 3,
	        'type': 'sawtooth'
	    };
	    /**
		 *  start the oscillator
		 *  @param  {Time} [time=now]
		 *  @private
		 */
	    Tone.FatOscillator.prototype._start = function (time) {
	        time = this.toSeconds(time);
	        this._forEach(function (osc) {
	            osc.start(time);
	        });
	    };
	    /**
		 *  stop the oscillator
		 *  @param  {Time} time (optional) timing parameter
		 *  @private
		 */
	    Tone.FatOscillator.prototype._stop = function (time) {
	        time = this.toSeconds(time);
	        this._forEach(function (osc) {
	            osc.stop(time);
	        });
	    };
	    /**
		 *  Iterate over all of the oscillators
		 *  @param  {Function}  iterator  The iterator function
		 *  @private
		 */
	    Tone.FatOscillator.prototype._forEach = function (iterator) {
	        for (var i = 0; i < this._oscillators.length; i++) {
	            iterator.call(this, this._oscillators[i], i);
	        }
	    };
	    /**
		 * The type of the carrier oscillator
		 * @memberOf Tone.FatOscillator#
		 * @type {string}
		 * @name type
		 */
	    Object.defineProperty(Tone.FatOscillator.prototype, 'type', {
	        get: function () {
	            return this._type;
	        },
	        set: function (type) {
	            this._type = type;
	            this._forEach(function (osc) {
	                osc.type = type;
	            });
	        }
	    });
	    /**
		 * The detune spread between the oscillators. If "count" is
		 * set to 3 oscillators and the "spread" is set to 40,
		 * the three oscillators would be detuned like this: [-20, 0, 20]
		 * for a total detune spread of 40 cents.
		 * @memberOf Tone.FatOscillator#
		 * @type {Cents}
		 * @name spread
		 */
	    Object.defineProperty(Tone.FatOscillator.prototype, 'spread', {
	        get: function () {
	            return this._spread;
	        },
	        set: function (spread) {
	            this._spread = spread;
	            if (this._oscillators.length > 1) {
	                var start = -spread / 2;
	                var step = spread / (this._oscillators.length - 1);
	                this._forEach(function (osc, i) {
	                    osc.detune.value = start + step * i;
	                });
	            }
	        }
	    });
	    /**
		 * The number of detuned oscillators
		 * @memberOf Tone.FatOscillator#
		 * @type {Number}
		 * @name count
		 */
	    Object.defineProperty(Tone.FatOscillator.prototype, 'count', {
	        get: function () {
	            return this._oscillators.length;
	        },
	        set: function (count) {
	            count = Math.max(count, 1);
	            if (this._oscillators.length !== count) {
	                // var partials = this.partials;
	                // var type = this.type;
	                //dispose the previous oscillators
	                this._forEach(function (osc) {
	                    osc.dispose();
	                });
	                this._oscillators = [];
	                for (var i = 0; i < count; i++) {
	                    var osc = new Tone.Oscillator();
	                    if (this.type === Tone.Oscillator.Type.Custom) {
	                        osc.partials = this._partials;
	                    } else {
	                        osc.type = this._type;
	                    }
	                    osc.phase = this._phase;
	                    osc.volume.value = -6 - count;
	                    this.frequency.connect(osc.frequency);
	                    this.detune.connect(osc.detune);
	                    osc.connect(this.output);
	                    this._oscillators[i] = osc;
	                }
	                //set the spread
	                this.spread = this._spread;
	                if (this.state === Tone.State.Started) {
	                    this._forEach(function (osc) {
	                        osc.start();
	                    });
	                }
	            }
	        }
	    });
	    /**
		 * The phase of the oscillator in degrees.
		 * @memberOf Tone.FatOscillator#
		 * @type {Number}
		 * @name phase
		 */
	    Object.defineProperty(Tone.FatOscillator.prototype, 'phase', {
	        get: function () {
	            return this._phase;
	        },
	        set: function (phase) {
	            this._phase = phase;
	            this._forEach(function (osc) {
	                osc.phase = phase;
	            });
	        }
	    });
	    /**
		 * The partials of the carrier waveform. A partial represents 
		 * the amplitude at a harmonic. The first harmonic is the 
		 * fundamental frequency, the second is the octave and so on
		 * following the harmonic series. 
		 * Setting this value will automatically set the type to "custom". 
		 * The value is an empty array when the type is not "custom". 
		 * @memberOf Tone.FatOscillator#
		 * @type {Array}
		 * @name partials
		 * @example
		 * osc.partials = [1, 0.2, 0.01];
		 */
	    Object.defineProperty(Tone.FatOscillator.prototype, 'partials', {
	        get: function () {
	            return this._partials;
	        },
	        set: function (partials) {
	            this._partials = partials;
	            this._type = Tone.Oscillator.Type.Custom;
	            this._forEach(function (osc) {
	                osc.partials = partials;
	            });
	        }
	    });
	    /**
		 *  Clean up.
		 *  @return {Tone.FatOscillator} this
		 */
	    Tone.FatOscillator.prototype.dispose = function () {
	        Tone.Source.prototype.dispose.call(this);
	        this._writable([
	            'frequency',
	            'detune'
	        ]);
	        this.frequency.dispose();
	        this.frequency = null;
	        this.detune.dispose();
	        this.detune = null;
	        this._forEach(function (osc) {
	            osc.dispose();
	        });
	        this._oscillators = null;
	        this._partials = null;
	        return this;
	    };
	    return Tone.FatOscillator;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Tone.OmniOscillator aggregates Tone.Oscillator, Tone.PulseOscillator,
		 *         Tone.PWMOscillator, Tone.FMOscillator, Tone.AMOscillator, and Tone.FatOscillator
		 *         into one class. The oscillator class can be changed by setting the `type`. 
		 *         `omniOsc.type = "pwm"` will set it to the Tone.PWMOscillator. Prefixing
		 *         any of the basic types ("sine", "square4", etc.) with "fm", "am", or "fat"
		 *         will use the FMOscillator, AMOscillator or FatOscillator respectively. 
		 *         For example: `omniOsc.type = "fatsawtooth"` will create set the oscillator
		 *         to a FatOscillator of type "sawtooth". 
		 *
		 *  @extends {Tone.Source}
		 *  @constructor
		 *  @param {Frequency} frequency The initial frequency of the oscillator.
		 *  @param {String} type The type of the oscillator.
		 *  @example
		 *  var omniOsc = new Tone.OmniOscillator("C#4", "pwm");
		 */
	    Tone.OmniOscillator = function () {
	        var options = Tone.defaults(arguments, [
	            'frequency',
	            'type'
	        ], Tone.OmniOscillator);
	        Tone.Source.call(this, options);
	        /**
			 *  The frequency control.
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.frequency = new Tone.Signal(options.frequency, Tone.Type.Frequency);
	        /**
			 *  The detune control
			 *  @type {Cents}
			 *  @signal
			 */
	        this.detune = new Tone.Signal(options.detune, Tone.Type.Cents);
	        /**
			 *  the type of the oscillator source
			 *  @type {String}
			 *  @private
			 */
	        this._sourceType = undefined;
	        /**
			 *  the oscillator
			 *  @type {Tone.Oscillator}
			 *  @private
			 */
	        this._oscillator = null;
	        //set the oscillator
	        this.type = options.type;
	        this._readOnly([
	            'frequency',
	            'detune'
	        ]);
	        //set the options
	        this.set(options);
	    };
	    Tone.extend(Tone.OmniOscillator, Tone.Source);
	    /**
		 *  default values
		 *  @static
		 *  @type {Object}
		 *  @const
		 */
	    Tone.OmniOscillator.defaults = {
	        'frequency': 440,
	        'detune': 0,
	        'type': 'sine',
	        'phase': 0
	    };
	    /**
		 *  @enum {String}
		 *  @private
		 */
	    var OmniOscType = {
	        Pulse: 'PulseOscillator',
	        PWM: 'PWMOscillator',
	        Osc: 'Oscillator',
	        FM: 'FMOscillator',
	        AM: 'AMOscillator',
	        Fat: 'FatOscillator'
	    };
	    /**
		 *  start the oscillator
		 *  @param {Time} [time=now] the time to start the oscillator
		 *  @private
		 */
	    Tone.OmniOscillator.prototype._start = function (time) {
	        this._oscillator.start(time);
	    };
	    /**
		 *  start the oscillator
		 *  @param {Time} [time=now] the time to start the oscillator
		 *  @private
		 */
	    Tone.OmniOscillator.prototype._stop = function (time) {
	        this._oscillator.stop(time);
	    };
	    /**
		 * The type of the oscillator. Can be any of the basic types: sine, square, triangle, sawtooth. Or
		 * prefix the basic types with "fm", "am", or "fat" to use the FMOscillator, AMOscillator or FatOscillator
		 * types. The oscillator could also be set to "pwm" or "pulse". All of the parameters of the
		 * oscillator's class are accessible when the oscillator is set to that type, but throws an error 
		 * when it's not.
		 * 
		 * @memberOf Tone.OmniOscillator#
		 * @type {String}
		 * @name type
		 * @example
		 * omniOsc.type = "pwm";
		 * //modulationFrequency is parameter which is available
		 * //only when the type is "pwm". 
		 * omniOsc.modulationFrequency.value = 0.5;
		 * @example
		 * //an square wave frequency modulated by a sawtooth
		 * omniOsc.type = "fmsquare";
		 * omniOsc.modulationType = "sawtooth";
		 */
	    Object.defineProperty(Tone.OmniOscillator.prototype, 'type', {
	        get: function () {
	            var prefix = '';
	            if (this._sourceType === OmniOscType.FM) {
	                prefix = 'fm';
	            } else if (this._sourceType === OmniOscType.AM) {
	                prefix = 'am';
	            } else if (this._sourceType === OmniOscType.Fat) {
	                prefix = 'fat';
	            }
	            return prefix + this._oscillator.type;
	        },
	        set: function (type) {
	            if (type.substr(0, 2) === 'fm') {
	                this._createNewOscillator(OmniOscType.FM);
	                this._oscillator.type = type.substr(2);
	            } else if (type.substr(0, 2) === 'am') {
	                this._createNewOscillator(OmniOscType.AM);
	                this._oscillator.type = type.substr(2);
	            } else if (type.substr(0, 3) === 'fat') {
	                this._createNewOscillator(OmniOscType.Fat);
	                this._oscillator.type = type.substr(3);
	            } else if (type === 'pwm') {
	                this._createNewOscillator(OmniOscType.PWM);
	            } else if (type === 'pulse') {
	                this._createNewOscillator(OmniOscType.Pulse);
	            } else {
	                this._createNewOscillator(OmniOscType.Osc);
	                this._oscillator.type = type;
	            }
	        }
	    });
	    /**
		 * The partials of the waveform. A partial represents 
		 * the amplitude at a harmonic. The first harmonic is the 
		 * fundamental frequency, the second is the octave and so on
		 * following the harmonic series. 
		 * Setting this value will automatically set the type to "custom". 
		 * The value is an empty array when the type is not "custom". 
		 * This is not available on "pwm" and "pulse" oscillator types.
		 * @memberOf Tone.OmniOscillator#
		 * @type {Array}
		 * @name partials
		 * @example
		 * osc.partials = [1, 0.2, 0.01];
		 */
	    Object.defineProperty(Tone.OmniOscillator.prototype, 'partials', {
	        get: function () {
	            return this._oscillator.partials;
	        },
	        set: function (partials) {
	            this._oscillator.partials = partials;
	        }
	    });
	    /**
		 *  Set a member/attribute of the oscillator. 
		 *  @param {Object|String} params
		 *  @param {number=} value
		 *  @param {Time=} rampTime
		 *  @returns {Tone.OmniOscillator} this
		 */
	    Tone.OmniOscillator.prototype.set = function (params, value) {
	        //make sure the type is set first
	        if (params === 'type') {
	            this.type = value;
	        } else if (Tone.isObject(params) && params.hasOwnProperty('type')) {
	            this.type = params.type;
	        }
	        //then set the rest
	        Tone.prototype.set.apply(this, arguments);
	        return this;
	    };
	    /**
		 *  connect the oscillator to the frequency and detune signals
		 *  @private
		 */
	    Tone.OmniOscillator.prototype._createNewOscillator = function (oscType) {
	        if (oscType !== this._sourceType) {
	            this._sourceType = oscType;
	            var OscillatorConstructor = Tone[oscType];
	            //short delay to avoid clicks on the change
	            var now = this.now();
	            if (this._oscillator !== null) {
	                var oldOsc = this._oscillator;
	                oldOsc.stop(now);
	                //dispose the old one
	                this.context.setTimeout(function () {
	                    oldOsc.dispose();
	                    oldOsc = null;
	                }, this.blockTime);
	            }
	            this._oscillator = new OscillatorConstructor();
	            this.frequency.connect(this._oscillator.frequency);
	            this.detune.connect(this._oscillator.detune);
	            this._oscillator.connect(this.output);
	            if (this.state === Tone.State.Started) {
	                this._oscillator.start(now);
	            }
	        }
	    };
	    /**
		 * The phase of the oscillator in degrees. 
		 * @memberOf Tone.OmniOscillator#
		 * @type {Degrees}
		 * @name phase
		 */
	    Object.defineProperty(Tone.OmniOscillator.prototype, 'phase', {
	        get: function () {
	            return this._oscillator.phase;
	        },
	        set: function (phase) {
	            this._oscillator.phase = phase;
	        }
	    });
	    /**
		 * The width of the oscillator (only if the oscillator is set to "pulse")
		 * @memberOf Tone.OmniOscillator#
		 * @type {NormalRange}
		 * @signal
		 * @name width
		 * @example
		 * var omniOsc = new Tone.OmniOscillator(440, "pulse");
		 * //can access the width attribute only if type === "pulse"
		 * omniOsc.width.value = 0.2; 
		 */
	    Object.defineProperty(Tone.OmniOscillator.prototype, 'width', {
	        get: function () {
	            if (this._sourceType === OmniOscType.Pulse) {
	                return this._oscillator.width;
	            }
	        }
	    });
	    /**
		 * The number of detuned oscillators
		 * @memberOf Tone.OmniOscillator#
		 * @type {Number}
		 * @name count
		 */
	    Object.defineProperty(Tone.OmniOscillator.prototype, 'count', {
	        get: function () {
	            if (this._sourceType === OmniOscType.Fat) {
	                return this._oscillator.count;
	            }
	        },
	        set: function (count) {
	            if (this._sourceType === OmniOscType.Fat) {
	                this._oscillator.count = count;
	            }
	        }
	    });
	    /**
		 * The detune spread between the oscillators. If "count" is
		 * set to 3 oscillators and the "spread" is set to 40,
		 * the three oscillators would be detuned like this: [-20, 0, 20]
		 * for a total detune spread of 40 cents. See Tone.FatOscillator
		 * for more info.
		 * @memberOf Tone.OmniOscillator#
		 * @type {Cents}
		 * @name spread
		 */
	    Object.defineProperty(Tone.OmniOscillator.prototype, 'spread', {
	        get: function () {
	            if (this._sourceType === OmniOscType.Fat) {
	                return this._oscillator.spread;
	            }
	        },
	        set: function (spread) {
	            if (this._sourceType === OmniOscType.Fat) {
	                this._oscillator.spread = spread;
	            }
	        }
	    });
	    /**
		 * The type of the modulator oscillator. Only if the oscillator
		 * is set to "am" or "fm" types. see. Tone.AMOscillator or Tone.FMOscillator
		 * for more info. 
		 * @memberOf Tone.OmniOscillator#
		 * @type {String}
		 * @name modulationType
		 */
	    Object.defineProperty(Tone.OmniOscillator.prototype, 'modulationType', {
	        get: function () {
	            if (this._sourceType === OmniOscType.FM || this._sourceType === OmniOscType.AM) {
	                return this._oscillator.modulationType;
	            }
	        },
	        set: function (mType) {
	            if (this._sourceType === OmniOscType.FM || this._sourceType === OmniOscType.AM) {
	                this._oscillator.modulationType = mType;
	            }
	        }
	    });
	    /**
		 * The modulation index which is in essence the depth or amount of the modulation. In other terms it is the 
		 * ratio of the frequency of the modulating signal (mf) to the amplitude of the 
		 * modulating signal (ma) -- as in ma/mf. 
		 * See Tone.FMOscillator for more info. 
		 * @type {Positive}
		 * @signal
		 * @name modulationIndex
		 */
	    Object.defineProperty(Tone.OmniOscillator.prototype, 'modulationIndex', {
	        get: function () {
	            if (this._sourceType === OmniOscType.FM) {
	                return this._oscillator.modulationIndex;
	            }
	        }
	    });
	    /**
		 *  Harmonicity is the frequency ratio between the carrier and the modulator oscillators. 
		 *  A harmonicity of 1 gives both oscillators the same frequency. 
		 *  Harmonicity = 2 means a change of an octave. See Tone.AMOscillator or Tone.FMOscillator
		 *  for more info. 
		 *  @memberOf Tone.OmniOscillator#
		 *  @signal
		 *  @type {Positive}
		 *  @name harmonicity
		 */
	    Object.defineProperty(Tone.OmniOscillator.prototype, 'harmonicity', {
	        get: function () {
	            if (this._sourceType === OmniOscType.FM || this._sourceType === OmniOscType.AM) {
	                return this._oscillator.harmonicity;
	            }
	        }
	    });
	    /**
		 * The modulationFrequency Signal of the oscillator 
		 * (only if the oscillator type is set to pwm). See 
		 * Tone.PWMOscillator for more info. 
		 * @memberOf Tone.OmniOscillator#
		 * @type {Frequency}
		 * @signal
		 * @name modulationFrequency
		 * @example
		 * var omniOsc = new Tone.OmniOscillator(440, "pwm");
		 * //can access the modulationFrequency attribute only if type === "pwm"
		 * omniOsc.modulationFrequency.value = 0.2; 
		 */
	    Object.defineProperty(Tone.OmniOscillator.prototype, 'modulationFrequency', {
	        get: function () {
	            if (this._sourceType === OmniOscType.PWM) {
	                return this._oscillator.modulationFrequency;
	            }
	        }
	    });
	    /**
		 *  Clean up.
		 *  @return {Tone.OmniOscillator} this
		 */
	    Tone.OmniOscillator.prototype.dispose = function () {
	        Tone.Source.prototype.dispose.call(this);
	        this._writable([
	            'frequency',
	            'detune'
	        ]);
	        this.detune.dispose();
	        this.detune = null;
	        this.frequency.dispose();
	        this.frequency = null;
	        this._oscillator.dispose();
	        this._oscillator = null;
	        this._sourceType = null;
	        return this;
	    };
	    return Tone.OmniOscillator;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Base-class for all instruments
		 *
		 *  @constructor
		 *  @extends {Tone.AudioNode}
		 */
	    Tone.Instrument = function (options) {
	        //get the defaults
	        options = Tone.defaultArg(options, Tone.Instrument.defaults);
	        Tone.AudioNode.call(this);
	        /**
			 *  The output and volume triming node
			 *  @type  {Tone.Volume}
			 *  @private
			 */
	        this._volume = this.output = new Tone.Volume(options.volume);
	        /**
			 * The volume of the output in decibels.
			 * @type {Decibels}
			 * @signal
			 * @example
			 * source.volume.value = -6;
			 */
	        this.volume = this._volume.volume;
	        this._readOnly('volume');
	    };
	    Tone.extend(Tone.Instrument, Tone.AudioNode);
	    /**
		 *  the default attributes
		 *  @type {object}
		 */
	    Tone.Instrument.defaults = {
	        /** the volume of the output in decibels */
	        'volume': 0
	    };
	    /**
		 *  @abstract
		 *  @param {string|number} note the note to trigger
		 *  @param {Time} [time=now] the time to trigger the ntoe
		 *  @param {number} [velocity=1] the velocity to trigger the note
		 */
	    Tone.Instrument.prototype.triggerAttack = Tone.noOp;
	    /**
		 *  @abstract
		 *  @param {Time} [time=now] when to trigger the release
		 */
	    Tone.Instrument.prototype.triggerRelease = Tone.noOp;
	    /**
		 *  Trigger the attack and then the release after the duration.
		 *  @param  {Frequency} note     The note to trigger.
		 *  @param  {Time} duration How long the note should be held for before
		 *                          triggering the release. This value must be greater than 0.
		 *  @param {Time} [time=now]  When the note should be triggered.
		 *  @param  {NormalRange} [velocity=1] The velocity the note should be triggered at.
		 *  @returns {Tone.Instrument} this
		 *  @example
		 * //trigger "C4" for the duration of an 8th note
		 * synth.triggerAttackRelease("C4", "8n");
		 */
	    Tone.Instrument.prototype.triggerAttackRelease = function (note, duration, time, velocity) {
	        time = this.toSeconds(time);
	        duration = this.toSeconds(duration);
	        this.triggerAttack(note, time, velocity);
	        this.triggerRelease(time + duration);
	        return this;
	    };
	    /**
		 *  clean up
		 *  @returns {Tone.Instrument} this
		 */
	    Tone.Instrument.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._volume.dispose();
	        this._volume = null;
	        this._writable(['volume']);
	        this.volume = null;
	        return this;
	    };
	    return Tone.Instrument;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  This is an abstract base class for other monophonic instruments to 
		 *          extend. IMPORTANT: It does not make any sound on its own and
		 *          shouldn't be directly instantiated.
		 *
		 *  @constructor
		 *  @abstract
		 *  @extends {Tone.Instrument}
		 */
	    Tone.Monophonic = function (options) {
	        //get the defaults
	        options = Tone.defaultArg(options, Tone.Monophonic.defaults);
	        Tone.Instrument.call(this, options);
	        /**
			 *  The glide time between notes. 
			 *  @type {Time}
			 */
	        this.portamento = options.portamento;
	    };
	    Tone.extend(Tone.Monophonic, Tone.Instrument);
	    /**
		 *  @static
		 *  @const
		 *  @type {Object}
		 */
	    Tone.Monophonic.defaults = { 'portamento': 0 };
	    /**
		 *  Trigger the attack of the note optionally with a given velocity. 
		 *  
		 *  
		 *  @param  {Frequency} note     The note to trigger.
		 *  @param  {Time} [time=now]     When the note should start.
		 *  @param  {number} [velocity=1] velocity The velocity scaler 
		 *                                determines how "loud" the note 
		 *                                will be triggered.
		 *  @returns {Tone.Monophonic} this
		 *  @example
		 * synth.triggerAttack("C4");
		 *  @example
		 * //trigger the note a half second from now at half velocity
		 * synth.triggerAttack("C4", "+0.5", 0.5);
		 */
	    Tone.Monophonic.prototype.triggerAttack = function (note, time, velocity) {
	        time = this.toSeconds(time);
	        this._triggerEnvelopeAttack(time, velocity);
	        this.setNote(note, time);
	        return this;
	    };
	    /**
		 *  Trigger the release portion of the envelope
		 *  @param  {Time} [time=now] If no time is given, the release happens immediatly
		 *  @returns {Tone.Monophonic} this
		 *  @example
		 * synth.triggerRelease();
		 */
	    Tone.Monophonic.prototype.triggerRelease = function (time) {
	        time = this.toSeconds(time);
	        this._triggerEnvelopeRelease(time);
	        return this;
	    };
	    /**
		 *  override this method with the actual method
		 *  @abstract
		 *  @private
		 */
	    Tone.Monophonic.prototype._triggerEnvelopeAttack = function () {
	    };
	    /**
		 *  override this method with the actual method
		 *  @abstract
		 *  @private
		 */
	    Tone.Monophonic.prototype._triggerEnvelopeRelease = function () {
	    };
	    /**
		 *  Set the note at the given time. If no time is given, the note
		 *  will set immediately. 
		 *  @param {Frequency} note The note to change to.
		 *  @param  {Time} [time=now] The time when the note should be set. 
		 *  @returns {Tone.Monophonic} this
		 * @example
		 * //change to F#6 in one quarter note from now.
		 * synth.setNote("F#6", "+4n");
		 * @example
		 * //change to Bb4 right now
		 * synth.setNote("Bb4");
		 */
	    Tone.Monophonic.prototype.setNote = function (note, time) {
	        time = this.toSeconds(time);
	        if (this.portamento > 0) {
	            var currentNote = this.frequency.value;
	            this.frequency.setValueAtTime(currentNote, time);
	            var portTime = this.toSeconds(this.portamento);
	            this.frequency.exponentialRampToValueAtTime(note, time + portTime);
	        } else {
	            this.frequency.setValueAtTime(note, time);
	        }
	        return this;
	    };
	    return Tone.Monophonic;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Tone.Synth is composed simply of a Tone.OmniOscillator
		 *          routed through a Tone.AmplitudeEnvelope. 
		 *          <img src="https://docs.google.com/drawings/d/1-1_0YW2Z1J2EPI36P8fNCMcZG7N1w1GZluPs4og4evo/pub?w=1163&h=231">
		 *
		 *  @constructor
		 *  @extends {Tone.Monophonic}
		 *  @param {Object} [options] the options available for the synth 
		 *                          see defaults below
		 *  @example
		 * var synth = new Tone.Synth().toMaster();
		 * synth.triggerAttackRelease("C4", "8n");
		 */
	    Tone.Synth = function (options) {
	        //get the defaults
	        options = Tone.defaultArg(options, Tone.Synth.defaults);
	        Tone.Monophonic.call(this, options);
	        /**
			 *  The oscillator.
			 *  @type {Tone.OmniOscillator}
			 */
	        this.oscillator = new Tone.OmniOscillator(options.oscillator);
	        /**
			 *  The frequency control.
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.frequency = this.oscillator.frequency;
	        /**
			 *  The detune control.
			 *  @type {Cents}
			 *  @signal
			 */
	        this.detune = this.oscillator.detune;
	        /**
			 *  The amplitude envelope.
			 *  @type {Tone.AmplitudeEnvelope}
			 */
	        this.envelope = new Tone.AmplitudeEnvelope(options.envelope);
	        //connect the oscillators to the output
	        this.oscillator.chain(this.envelope, this.output);
	        //start the oscillators
	        this.oscillator.start();
	        this._readOnly([
	            'oscillator',
	            'frequency',
	            'detune',
	            'envelope'
	        ]);
	    };
	    Tone.extend(Tone.Synth, Tone.Monophonic);
	    /**
		 *  @const
		 *  @static
		 *  @type {Object}
		 */
	    Tone.Synth.defaults = {
	        'oscillator': { 'type': 'triangle' },
	        'envelope': {
	            'attack': 0.005,
	            'decay': 0.1,
	            'sustain': 0.3,
	            'release': 1
	        }
	    };
	    /**
		 *  start the attack portion of the envelope
		 *  @param {Time} [time=now] the time the attack should start
		 *  @param {number} [velocity=1] the velocity of the note (0-1)
		 *  @returns {Tone.Synth} this
		 *  @private
		 */
	    Tone.Synth.prototype._triggerEnvelopeAttack = function (time, velocity) {
	        //the envelopes
	        this.envelope.triggerAttack(time, velocity);
	        return this;
	    };
	    /**
		 *  start the release portion of the envelope
		 *  @param {Time} [time=now] the time the release should start
		 *  @returns {Tone.Synth} this
		 *  @private
		 */
	    Tone.Synth.prototype._triggerEnvelopeRelease = function (time) {
	        this.envelope.triggerRelease(time);
	        return this;
	    };
	    /**
		 *  clean up
		 *  @returns {Tone.Synth} this
		 */
	    Tone.Synth.prototype.dispose = function () {
	        Tone.Monophonic.prototype.dispose.call(this);
	        this._writable([
	            'oscillator',
	            'frequency',
	            'detune',
	            'envelope'
	        ]);
	        this.oscillator.dispose();
	        this.oscillator = null;
	        this.envelope.dispose();
	        this.envelope = null;
	        this.frequency = null;
	        this.detune = null;
	        return this;
	    };
	    return Tone.Synth;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  AMSynth uses the output of one Tone.Synth to modulate the
		 *          amplitude of another Tone.Synth. The harmonicity (the ratio between
		 *          the two signals) affects the timbre of the output signal greatly.
		 *          Read more about Amplitude Modulation Synthesis on
		 *          [SoundOnSound](https://web.archive.org/web/20160404103653/http://www.soundonsound.com:80/sos/mar00/articles/synthsecrets.htm).
		 *          <img src="https://docs.google.com/drawings/d/1TQu8Ed4iFr1YTLKpB3U1_hur-UwBrh5gdBXc8BxfGKw/pub?w=1009&h=457">
		 *
		 *  @constructor
		 *  @extends {Tone.Monophonic}
		 *  @param {Object} [options] the options available for the synth
		 *                            see defaults below
		 *  @example
		 * var synth = new Tone.AMSynth().toMaster();
		 * synth.triggerAttackRelease("C4", "4n");
		 */
	    Tone.AMSynth = function (options) {
	        options = Tone.defaultArg(options, Tone.AMSynth.defaults);
	        Tone.Monophonic.call(this, options);
	        /**
			 *  The carrier voice.
			 *  @type {Tone.Synth}
			 *  @private
			 */
	        this._carrier = new Tone.Synth();
	        this._carrier.volume.value = -10;
	        /**
			 *  The carrier's oscillator
			 *  @type {Tone.Oscillator}
			 */
	        this.oscillator = this._carrier.oscillator;
	        /**
			 *  The carrier's envelope
			 *  @type {Tone.AmplitudeEnvelope}
			 */
	        this.envelope = this._carrier.envelope.set(options.envelope);
	        /**
			 *  The modulator voice.
			 *  @type {Tone.Synth}
			 *  @private
			 */
	        this._modulator = new Tone.Synth();
	        this._modulator.volume.value = -10;
	        /**
			 *  The modulator's oscillator which is applied
			 *  to the amplitude of the oscillator
			 *  @type {Tone.Oscillator}
			 */
	        this.modulation = this._modulator.oscillator.set(options.modulation);
	        /**
			 *  The modulator's envelope
			 *  @type {Tone.AmplitudeEnvelope}
			 */
	        this.modulationEnvelope = this._modulator.envelope.set(options.modulationEnvelope);
	        /**
			 *  The frequency.
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.frequency = new Tone.Signal(440, Tone.Type.Frequency);
	        /**
			 *  The detune in cents
			 *  @type {Cents}
			 *  @signal
			 */
	        this.detune = new Tone.Signal(options.detune, Tone.Type.Cents);
	        /**
			 *  Harmonicity is the ratio between the two voices. A harmonicity of
			 *  1 is no change. Harmonicity = 2 means a change of an octave.
			 *  @type {Positive}
			 *  @signal
			 *  @example
			 * //pitch voice1 an octave below voice0
			 * synth.harmonicity.value = 0.5;
			 */
	        this.harmonicity = new Tone.Multiply(options.harmonicity);
	        this.harmonicity.units = Tone.Type.Positive;
	        /**
			 *  convert the -1,1 output to 0,1
			 *  @type {Tone.AudioToGain}
			 *  @private
			 */
	        this._modulationScale = new Tone.AudioToGain();
	        /**
			 *  the node where the modulation happens
			 *  @type {Tone.Gain}
			 *  @private
			 */
	        this._modulationNode = new Tone.Gain();
	        //control the two voices frequency
	        this.frequency.connect(this._carrier.frequency);
	        this.frequency.chain(this.harmonicity, this._modulator.frequency);
	        this.detune.fan(this._carrier.detune, this._modulator.detune);
	        this._modulator.chain(this._modulationScale, this._modulationNode.gain);
	        this._carrier.chain(this._modulationNode, this.output);
	        this._readOnly([
	            'frequency',
	            'harmonicity',
	            'oscillator',
	            'envelope',
	            'modulation',
	            'modulationEnvelope',
	            'detune'
	        ]);
	    };
	    Tone.extend(Tone.AMSynth, Tone.Monophonic);
	    /**
		 *  @static
		 *  @type {Object}
		 */
	    Tone.AMSynth.defaults = {
	        'harmonicity': 3,
	        'detune': 0,
	        'oscillator': { 'type': 'sine' },
	        'envelope': {
	            'attack': 0.01,
	            'decay': 0.01,
	            'sustain': 1,
	            'release': 0.5
	        },
	        'modulation': { 'type': 'square' },
	        'modulationEnvelope': {
	            'attack': 0.5,
	            'decay': 0,
	            'sustain': 1,
	            'release': 0.5
	        }
	    };
	    /**
		 *  trigger the attack portion of the note
		 *
		 *  @param  {Time} [time=now] the time the note will occur
		 *  @param {NormalRange} [velocity=1] the velocity of the note
		 *  @private
		 *  @returns {Tone.AMSynth} this
		 */
	    Tone.AMSynth.prototype._triggerEnvelopeAttack = function (time, velocity) {
	        //the port glide
	        time = this.toSeconds(time);
	        //the envelopes
	        this.envelope.triggerAttack(time, velocity);
	        this.modulationEnvelope.triggerAttack(time, velocity);
	        return this;
	    };
	    /**
		 *  trigger the release portion of the note
		 *
		 *  @param  {Time} [time=now] the time the note will release
		 *  @private
		 *  @returns {Tone.AMSynth} this
		 */
	    Tone.AMSynth.prototype._triggerEnvelopeRelease = function (time) {
	        this.envelope.triggerRelease(time);
	        this.modulationEnvelope.triggerRelease(time);
	        return this;
	    };
	    /**
		 *  clean up
		 *  @returns {Tone.AMSynth} this
		 */
	    Tone.AMSynth.prototype.dispose = function () {
	        Tone.Monophonic.prototype.dispose.call(this);
	        this._writable([
	            'frequency',
	            'harmonicity',
	            'oscillator',
	            'envelope',
	            'modulation',
	            'modulationEnvelope',
	            'detune'
	        ]);
	        this._carrier.dispose();
	        this._carrier = null;
	        this._modulator.dispose();
	        this._modulator = null;
	        this.frequency.dispose();
	        this.frequency = null;
	        this.detune.dispose();
	        this.detune = null;
	        this.harmonicity.dispose();
	        this.harmonicity = null;
	        this._modulationScale.dispose();
	        this._modulationScale = null;
	        this._modulationNode.dispose();
	        this._modulationNode = null;
	        this.oscillator = null;
	        this.envelope = null;
	        this.modulationEnvelope = null;
	        this.modulation = null;
	        return this;
	    };
	    return Tone.AMSynth;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Tone.MonoSynth is composed of one oscillator, one filter, and two envelopes.
		 *          The amplitude of the Tone.Oscillator and the cutoff frequency of the 
		 *          Tone.Filter are controlled by Tone.Envelopes. 
		 *          <img src="https://docs.google.com/drawings/d/1gaY1DF9_Hzkodqf8JI1Cg2VZfwSElpFQfI94IQwad38/pub?w=924&h=240">
		 *          
		 *  @constructor
		 *  @extends {Tone.Monophonic}
		 *  @param {Object} [options] the options available for the synth 
		 *                          see defaults below
		 *  @example
		 * var synth = new Tone.MonoSynth({
		 * 	"oscillator" : {
		 * 		"type" : "square"
		 *  },
		 *  "envelope" : {
		 *  	"attack" : 0.1
		 *  }
		 * }).toMaster();
		 * synth.triggerAttackRelease("C4", "8n");
		 */
	    Tone.MonoSynth = function (options) {
	        //get the defaults
	        options = Tone.defaultArg(options, Tone.MonoSynth.defaults);
	        Tone.Monophonic.call(this, options);
	        /**
			 *  The oscillator.
			 *  @type {Tone.OmniOscillator}
			 */
	        this.oscillator = new Tone.OmniOscillator(options.oscillator);
	        /**
			 *  The frequency control.
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.frequency = this.oscillator.frequency;
	        /**
			 *  The detune control.
			 *  @type {Cents}
			 *  @signal
			 */
	        this.detune = this.oscillator.detune;
	        /**
			 *  The filter.
			 *  @type {Tone.Filter}
			 */
	        this.filter = new Tone.Filter(options.filter);
	        /**
			 *  The filter envelope.
			 *  @type {Tone.FrequencyEnvelope}
			 */
	        this.filterEnvelope = new Tone.FrequencyEnvelope(options.filterEnvelope);
	        /**
			 *  The amplitude envelope.
			 *  @type {Tone.AmplitudeEnvelope}
			 */
	        this.envelope = new Tone.AmplitudeEnvelope(options.envelope);
	        //connect the oscillators to the output
	        this.oscillator.chain(this.filter, this.envelope, this.output);
	        //start the oscillators
	        this.oscillator.start();
	        //connect the filter envelope
	        this.filterEnvelope.connect(this.filter.frequency);
	        this._readOnly([
	            'oscillator',
	            'frequency',
	            'detune',
	            'filter',
	            'filterEnvelope',
	            'envelope'
	        ]);
	    };
	    Tone.extend(Tone.MonoSynth, Tone.Monophonic);
	    /**
		 *  @const
		 *  @static
		 *  @type {Object}
		 */
	    Tone.MonoSynth.defaults = {
	        'frequency': 'C4',
	        'detune': 0,
	        'oscillator': { 'type': 'square' },
	        'filter': {
	            'Q': 6,
	            'type': 'lowpass',
	            'rolloff': -24
	        },
	        'envelope': {
	            'attack': 0.005,
	            'decay': 0.1,
	            'sustain': 0.9,
	            'release': 1
	        },
	        'filterEnvelope': {
	            'attack': 0.06,
	            'decay': 0.2,
	            'sustain': 0.5,
	            'release': 2,
	            'baseFrequency': 200,
	            'octaves': 7,
	            'exponent': 2
	        }
	    };
	    /**
		 *  start the attack portion of the envelope
		 *  @param {Time} [time=now] the time the attack should start
		 *  @param {NormalRange} [velocity=1] the velocity of the note (0-1)
		 *  @returns {Tone.MonoSynth} this
		 *  @private
		 */
	    Tone.MonoSynth.prototype._triggerEnvelopeAttack = function (time, velocity) {
	        //the envelopes
	        this.envelope.triggerAttack(time, velocity);
	        this.filterEnvelope.triggerAttack(time);
	        return this;
	    };
	    /**
		 *  start the release portion of the envelope
		 *  @param {Time} [time=now] the time the release should start
		 *  @returns {Tone.MonoSynth} this
		 *  @private
		 */
	    Tone.MonoSynth.prototype._triggerEnvelopeRelease = function (time) {
	        this.envelope.triggerRelease(time);
	        this.filterEnvelope.triggerRelease(time);
	        return this;
	    };
	    /**
		 *  clean up
		 *  @returns {Tone.MonoSynth} this
		 */
	    Tone.MonoSynth.prototype.dispose = function () {
	        Tone.Monophonic.prototype.dispose.call(this);
	        this._writable([
	            'oscillator',
	            'frequency',
	            'detune',
	            'filter',
	            'filterEnvelope',
	            'envelope'
	        ]);
	        this.oscillator.dispose();
	        this.oscillator = null;
	        this.envelope.dispose();
	        this.envelope = null;
	        this.filterEnvelope.dispose();
	        this.filterEnvelope = null;
	        this.filter.dispose();
	        this.filter = null;
	        this.frequency = null;
	        this.detune = null;
	        return this;
	    };
	    return Tone.MonoSynth;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Tone.DuoSynth is a monophonic synth composed of two 
		 *          MonoSynths run in parallel with control over the 
		 *          frequency ratio between the two voices and vibrato effect.
		 *          <img src="https://docs.google.com/drawings/d/1bL4GXvfRMMlqS7XyBm9CjL9KJPSUKbcdBNpqOlkFLxk/pub?w=1012&h=448">
		 *
		 *  @constructor
		 *  @extends {Tone.Monophonic}
		 *  @param {Object} [options] the options available for the synth 
		 *                          see defaults below
		 *  @example
		 * var duoSynth = new Tone.DuoSynth().toMaster();
		 * duoSynth.triggerAttackRelease("C4", "2n");
		 */
	    Tone.DuoSynth = function (options) {
	        options = Tone.defaultArg(options, Tone.DuoSynth.defaults);
	        Tone.Monophonic.call(this, options);
	        /**
			 *  the first voice
			 *  @type {Tone.MonoSynth}
			 */
	        this.voice0 = new Tone.MonoSynth(options.voice0);
	        this.voice0.volume.value = -10;
	        /**
			 *  the second voice
			 *  @type {Tone.MonoSynth}
			 */
	        this.voice1 = new Tone.MonoSynth(options.voice1);
	        this.voice1.volume.value = -10;
	        /**
			 *  The vibrato LFO. 
			 *  @type {Tone.LFO}
			 *  @private
			 */
	        this._vibrato = new Tone.LFO(options.vibratoRate, -50, 50);
	        this._vibrato.start();
	        /**
			 * the vibrato frequency
			 * @type {Frequency}
			 * @signal
			 */
	        this.vibratoRate = this._vibrato.frequency;
	        /**
			 *  the vibrato gain
			 *  @type {Tone.Gain}
			 *  @private
			 */
	        this._vibratoGain = new Tone.Gain(options.vibratoAmount, Tone.Type.Positive);
	        /**
			 * The amount of vibrato
			 * @type {Positive}
			 * @signal
			 */
	        this.vibratoAmount = this._vibratoGain.gain;
	        /**
			 *  the frequency control
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.frequency = new Tone.Signal(440, Tone.Type.Frequency);
	        /**
			 *  Harmonicity is the ratio between the two voices. A harmonicity of
			 *  1 is no change. Harmonicity = 2 means a change of an octave. 
			 *  @type {Positive}
			 *  @signal
			 *  @example
			 * //pitch voice1 an octave below voice0
			 * duoSynth.harmonicity.value = 0.5;
			 */
	        this.harmonicity = new Tone.Multiply(options.harmonicity);
	        this.harmonicity.units = Tone.Type.Positive;
	        //control the two voices frequency
	        this.frequency.connect(this.voice0.frequency);
	        this.frequency.chain(this.harmonicity, this.voice1.frequency);
	        this._vibrato.connect(this._vibratoGain);
	        this._vibratoGain.fan(this.voice0.detune, this.voice1.detune);
	        this.voice0.connect(this.output);
	        this.voice1.connect(this.output);
	        this._readOnly([
	            'voice0',
	            'voice1',
	            'frequency',
	            'vibratoAmount',
	            'vibratoRate'
	        ]);
	    };
	    Tone.extend(Tone.DuoSynth, Tone.Monophonic);
	    /**
		 *  @static
		 *  @type {Object}
		 */
	    Tone.DuoSynth.defaults = {
	        'vibratoAmount': 0.5,
	        'vibratoRate': 5,
	        'harmonicity': 1.5,
	        'voice0': {
	            'volume': -10,
	            'portamento': 0,
	            'oscillator': { 'type': 'sine' },
	            'filterEnvelope': {
	                'attack': 0.01,
	                'decay': 0,
	                'sustain': 1,
	                'release': 0.5
	            },
	            'envelope': {
	                'attack': 0.01,
	                'decay': 0,
	                'sustain': 1,
	                'release': 0.5
	            }
	        },
	        'voice1': {
	            'volume': -10,
	            'portamento': 0,
	            'oscillator': { 'type': 'sine' },
	            'filterEnvelope': {
	                'attack': 0.01,
	                'decay': 0,
	                'sustain': 1,
	                'release': 0.5
	            },
	            'envelope': {
	                'attack': 0.01,
	                'decay': 0,
	                'sustain': 1,
	                'release': 0.5
	            }
	        }
	    };
	    /**
		 *  start the attack portion of the envelopes
		 *  
		 *  @param {Time} [time=now] the time the attack should start
		 *  @param {NormalRange} [velocity=1] the velocity of the note (0-1)
		 *  @returns {Tone.DuoSynth} this
		 *  @private
		 */
	    Tone.DuoSynth.prototype._triggerEnvelopeAttack = function (time, velocity) {
	        time = this.toSeconds(time);
	        this.voice0.envelope.triggerAttack(time, velocity);
	        this.voice1.envelope.triggerAttack(time, velocity);
	        this.voice0.filterEnvelope.triggerAttack(time);
	        this.voice1.filterEnvelope.triggerAttack(time);
	        return this;
	    };
	    /**
		 *  start the release portion of the envelopes
		 *  
		 *  @param {Time} [time=now] the time the release should start
		 *  @returns {Tone.DuoSynth} this
		 *  @private
		 */
	    Tone.DuoSynth.prototype._triggerEnvelopeRelease = function (time) {
	        this.voice0.triggerRelease(time);
	        this.voice1.triggerRelease(time);
	        return this;
	    };
	    /**
		 *  clean up
		 *  @returns {Tone.DuoSynth} this
		 */
	    Tone.DuoSynth.prototype.dispose = function () {
	        Tone.Monophonic.prototype.dispose.call(this);
	        this._writable([
	            'voice0',
	            'voice1',
	            'frequency',
	            'vibratoAmount',
	            'vibratoRate'
	        ]);
	        this.voice0.dispose();
	        this.voice0 = null;
	        this.voice1.dispose();
	        this.voice1 = null;
	        this.frequency.dispose();
	        this.frequency = null;
	        this._vibratoGain.dispose();
	        this._vibratoGain = null;
	        this._vibrato = null;
	        this.harmonicity.dispose();
	        this.harmonicity = null;
	        this.vibratoAmount.dispose();
	        this.vibratoAmount = null;
	        this.vibratoRate = null;
	        return this;
	    };
	    return Tone.DuoSynth;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  FMSynth is composed of two Tone.Synths where one Tone.Synth modulates
		 *          the frequency of a second Tone.Synth. A lot of spectral content 
		 *          can be explored using the modulationIndex parameter. Read more about
		 *          frequency modulation synthesis on Sound On Sound: [Part 1](https://web.archive.org/web/20160403123704/http://www.soundonsound.com/sos/apr00/articles/synthsecrets.htm), [Part 2](https://web.archive.org/web/20160403115835/http://www.soundonsound.com/sos/may00/articles/synth.htm).
		 *          <img src="https://docs.google.com/drawings/d/1h0PUDZXPgi4Ikx6bVT6oncrYPLluFKy7lj53puxj-DM/pub?w=902&h=462">
		 *
		 *  @constructor
		 *  @extends {Tone.Monophonic}
		 *  @param {Object} [options] the options available for the synth
		 *                          see defaults below
		 *  @example
		 * var fmSynth = new Tone.FMSynth().toMaster();
		 * fmSynth.triggerAttackRelease("C5", "4n");
		 */
	    Tone.FMSynth = function (options) {
	        options = Tone.defaultArg(options, Tone.FMSynth.defaults);
	        Tone.Monophonic.call(this, options);
	        /**
			 *  The carrier voice.
			 *  @type {Tone.Synth}
			 *  @private
			 */
	        this._carrier = new Tone.Synth(options.carrier);
	        this._carrier.volume.value = -10;
	        /**
			 *  The carrier's oscillator
			 *  @type {Tone.Oscillator}
			 */
	        this.oscillator = this._carrier.oscillator;
	        /**
			 *  The carrier's envelope
			 *  @type {Tone.Oscillator}
			 */
	        this.envelope = this._carrier.envelope.set(options.envelope);
	        /**
			 *  The modulator voice.
			 *  @type {Tone.Synth}
			 *  @private
			 */
	        this._modulator = new Tone.Synth(options.modulator);
	        this._modulator.volume.value = -10;
	        /**
			 *  The modulator's oscillator which is applied
			 *  to the amplitude of the oscillator
			 *  @type {Tone.Oscillator}
			 */
	        this.modulation = this._modulator.oscillator.set(options.modulation);
	        /**
			 *  The modulator's envelope
			 *  @type {Tone.Oscillator}
			 */
	        this.modulationEnvelope = this._modulator.envelope.set(options.modulationEnvelope);
	        /**
			 *  The frequency control.
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.frequency = new Tone.Signal(440, Tone.Type.Frequency);
	        /**
			 *  The detune in cents
			 *  @type {Cents}
			 *  @signal
			 */
	        this.detune = new Tone.Signal(options.detune, Tone.Type.Cents);
	        /**
			 *  Harmonicity is the ratio between the two voices. A harmonicity of
			 *  1 is no change. Harmonicity = 2 means a change of an octave.
			 *  @type {Positive}
			 *  @signal
			 *  @example
			 * //pitch voice1 an octave below voice0
			 * synth.harmonicity.value = 0.5;
			 */
	        this.harmonicity = new Tone.Multiply(options.harmonicity);
	        this.harmonicity.units = Tone.Type.Positive;
	        /**
			 *  The modulation index which essentially the depth or amount of the modulation. It is the
			 *  ratio of the frequency of the modulating signal (mf) to the amplitude of the
			 *  modulating signal (ma) -- as in ma/mf.
			 *	@type {Positive}
			 *	@signal
			 */
	        this.modulationIndex = new Tone.Multiply(options.modulationIndex);
	        this.modulationIndex.units = Tone.Type.Positive;
	        /**
			 *  the node where the modulation happens
			 *  @type {GainNode}
			 *  @private
			 */
	        this._modulationNode = new Tone.Gain(0);
	        //control the two voices frequency
	        this.frequency.connect(this._carrier.frequency);
	        this.frequency.chain(this.harmonicity, this._modulator.frequency);
	        this.frequency.chain(this.modulationIndex, this._modulationNode);
	        this.detune.fan(this._carrier.detune, this._modulator.detune);
	        this._modulator.connect(this._modulationNode.gain);
	        this._modulationNode.connect(this._carrier.frequency);
	        this._carrier.connect(this.output);
	        this._readOnly([
	            'frequency',
	            'harmonicity',
	            'modulationIndex',
	            'oscillator',
	            'envelope',
	            'modulation',
	            'modulationEnvelope',
	            'detune'
	        ]);
	    };
	    Tone.extend(Tone.FMSynth, Tone.Monophonic);
	    /**
		 *  @static
		 *  @type {Object}
		 */
	    Tone.FMSynth.defaults = {
	        'harmonicity': 3,
	        'modulationIndex': 10,
	        'detune': 0,
	        'oscillator': { 'type': 'sine' },
	        'envelope': {
	            'attack': 0.01,
	            'decay': 0.01,
	            'sustain': 1,
	            'release': 0.5
	        },
	        'modulation': { 'type': 'square' },
	        'modulationEnvelope': {
	            'attack': 0.5,
	            'decay': 0,
	            'sustain': 1,
	            'release': 0.5
	        }
	    };
	    /**
		 * 	trigger the attack portion of the note
		 *
		 *  @param  {Time} [time=now] the time the note will occur
		 *  @param {number} [velocity=1] the velocity of the note
		 *  @returns {Tone.FMSynth} this
		 *  @private
		 */
	    Tone.FMSynth.prototype._triggerEnvelopeAttack = function (time, velocity) {
	        time = this.toSeconds(time);
	        //the envelopes
	        this.envelope.triggerAttack(time, velocity);
	        this.modulationEnvelope.triggerAttack(time);
	        return this;
	    };
	    /**
		 *  trigger the release portion of the note
		 *
		 *  @param  {Time} [time=now] the time the note will release
		 *  @returns {Tone.FMSynth} this
		 *  @private
		 */
	    Tone.FMSynth.prototype._triggerEnvelopeRelease = function (time) {
	        time = this.toSeconds(time);
	        this.envelope.triggerRelease(time);
	        this.modulationEnvelope.triggerRelease(time);
	        return this;
	    };
	    /**
		 *  clean up
		 *  @returns {Tone.FMSynth} this
		 */
	    Tone.FMSynth.prototype.dispose = function () {
	        Tone.Monophonic.prototype.dispose.call(this);
	        this._writable([
	            'frequency',
	            'harmonicity',
	            'modulationIndex',
	            'oscillator',
	            'envelope',
	            'modulation',
	            'modulationEnvelope',
	            'detune'
	        ]);
	        this._carrier.dispose();
	        this._carrier = null;
	        this._modulator.dispose();
	        this._modulator = null;
	        this.frequency.dispose();
	        this.frequency = null;
	        this.detune.dispose();
	        this.detune = null;
	        this.modulationIndex.dispose();
	        this.modulationIndex = null;
	        this.harmonicity.dispose();
	        this.harmonicity = null;
	        this._modulationNode.dispose();
	        this._modulationNode = null;
	        this.oscillator = null;
	        this.envelope = null;
	        this.modulationEnvelope = null;
	        this.modulation = null;
	        return this;
	    };
	    return Tone.FMSynth;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Tone.MembraneSynth makes kick and tom sounds using a single oscillator
		 *          with an amplitude envelope and frequency ramp. A Tone.OmniOscillator
		 *          is routed through a Tone.AmplitudeEnvelope to the output. The drum
		 *          quality of the sound comes from the frequency envelope applied
		 *          during during Tone.MembraneSynth.triggerAttack(note). The frequency
		 *          envelope starts at <code>note * .octaves</code> and ramps to 
		 *          <code>note</code> over the duration of <code>.pitchDecay</code>. 
		 *
		 *  @constructor
		 *  @extends {Tone.Instrument}
		 *  @param {Object} [options] the options available for the synth 
		 *                          see defaults below
		 *  @example
		 * var synth = new Tone.MembraneSynth().toMaster();
		 * synth.triggerAttackRelease("C2", "8n");
		 */
	    Tone.MembraneSynth = function (options) {
	        options = Tone.defaultArg(options, Tone.MembraneSynth.defaults);
	        Tone.Instrument.call(this, options);
	        /**
			 *  The oscillator.
			 *  @type {Tone.OmniOscillator}
			 */
	        this.oscillator = new Tone.OmniOscillator(options.oscillator).start();
	        /**
			 *  The amplitude envelope.
			 *  @type {Tone.AmplitudeEnvelope}
			 */
	        this.envelope = new Tone.AmplitudeEnvelope(options.envelope);
	        /**
			 *  The number of octaves the pitch envelope ramps.
			 *  @type {Positive}
			 */
	        this.octaves = options.octaves;
	        /**
			 *  The amount of time the frequency envelope takes. 
			 *  @type {Time}
			 */
	        this.pitchDecay = options.pitchDecay;
	        this.oscillator.chain(this.envelope, this.output);
	        this._readOnly([
	            'oscillator',
	            'envelope'
	        ]);
	    };
	    Tone.extend(Tone.MembraneSynth, Tone.Instrument);
	    /**
		 *  @static
		 *  @type {Object}
		 */
	    Tone.MembraneSynth.defaults = {
	        'pitchDecay': 0.05,
	        'octaves': 10,
	        'oscillator': { 'type': 'sine' },
	        'envelope': {
	            'attack': 0.001,
	            'decay': 0.4,
	            'sustain': 0.01,
	            'release': 1.4,
	            'attackCurve': 'exponential'
	        }
	    };
	    /**
		 *  Trigger the note at the given time with the given velocity. 
		 *  
		 *  @param  {Frequency} note     the note
		 *  @param  {Time} [time=now]     the time, if not given is now
		 *  @param  {number} [velocity=1] velocity defaults to 1
		 *  @returns {Tone.MembraneSynth} this
		 *  @example
		 *  kick.triggerAttack(60);
		 */
	    Tone.MembraneSynth.prototype.triggerAttack = function (note, time, velocity) {
	        time = this.toSeconds(time);
	        note = this.toFrequency(note);
	        var maxNote = note * this.octaves;
	        this.oscillator.frequency.setValueAtTime(maxNote, time);
	        this.oscillator.frequency.exponentialRampToValueAtTime(note, time + this.toSeconds(this.pitchDecay));
	        this.envelope.triggerAttack(time, velocity);
	        return this;
	    };
	    /**
		 *  Trigger the release portion of the note.
		 *  
		 *  @param  {Time} [time=now] the time the note will release
		 *  @returns {Tone.MembraneSynth} this
		 */
	    Tone.MembraneSynth.prototype.triggerRelease = function (time) {
	        this.envelope.triggerRelease(time);
	        return this;
	    };
	    /**
		 *  Clean up.
		 *  @returns {Tone.MembraneSynth} this
		 */
	    Tone.MembraneSynth.prototype.dispose = function () {
	        Tone.Instrument.prototype.dispose.call(this);
	        this._writable([
	            'oscillator',
	            'envelope'
	        ]);
	        this.oscillator.dispose();
	        this.oscillator = null;
	        this.envelope.dispose();
	        this.envelope = null;
	        return this;
	    };
	    return Tone.MembraneSynth;
	});
	Module(function (Tone) {
	    /**
		 *  Inharmonic ratio of frequencies based on the Roland TR-808
		 *  Taken from https://ccrma.stanford.edu/papers/tr-808-cymbal-physically-informed-circuit-bendable-digital-model
		 *  @private
		 *  @static
		 *  @type {Array}
		 */
	    var inharmRatios = [
	        1,
	        1.483,
	        1.932,
	        2.546,
	        2.63,
	        3.897
	    ];
	    /**
		 *  @class  A highly inharmonic and spectrally complex source with a highpass filter
		 *          and amplitude envelope which is good for making metalophone sounds. Based
		 *          on CymbalSynth by [@polyrhythmatic](https://github.com/polyrhythmatic).
		 *          Inspiration from [Sound on Sound](https://web.archive.org/web/20160610143924/https://www.soundonsound.com/sos/jul02/articles/synthsecrets0702.asp).
		 *
		 *  @constructor
		 *  @extends {Tone.Instrument}
		 *  @param {Object} [options] The options availble for the synth
		 *                             see defaults below
		 */
	    Tone.MetalSynth = function (options) {
	        options = Tone.defaultArg(options, Tone.MetalSynth.defaults);
	        Tone.Instrument.call(this, options);
	        /**
			 *  The frequency of the cymbal
			 *  @type  {Frequency}
			 *  @signal
			 */
	        this.frequency = new Tone.Signal(options.frequency, Tone.Type.Frequency);
	        /**
			 *  The array of FMOscillators
			 *  @type  {Array}
			 *  @private
			 */
	        this._oscillators = [];
	        /**
			 *  The frequency multipliers
			 *  @type {Array}
			 *  @private
			 */
	        this._freqMultipliers = [];
	        /**
			 *  The amplitude for the body
			 *  @type {Tone.Gain}
			 *  @private
			 */
	        this._amplitue = new Tone.Gain(0).connect(this.output);
	        /**
			 *  highpass the output
			 *  @type {Tone.Filter}
			 *  @private
			 */
	        this._highpass = new Tone.Filter({
	            'type': 'highpass',
	            'Q': -3.0102999566398125
	        }).connect(this._amplitue);
	        /**
			 *  The number of octaves the highpass
			 *  filter frequency ramps
			 *  @type {Number}
			 *  @private
			 */
	        this._octaves = options.octaves;
	        /**
			 *  Scale the body envelope
			 *  for the bandpass
			 *  @type {Tone.Scale}
			 *  @private
			 */
	        this._filterFreqScaler = new Tone.Scale(options.resonance, 7000);
	        /**
			 *  The envelope which is connected both to the
			 *  amplitude and highpass filter's cutoff frequency
			 *  @type  {Tone.Envelope}
			 */
	        this.envelope = new Tone.Envelope({
	            'attack': options.envelope.attack,
	            'attackCurve': 'linear',
	            'decay': options.envelope.decay,
	            'sustain': 0,
	            'release': options.envelope.release
	        }).chain(this._filterFreqScaler, this._highpass.frequency);
	        this.envelope.connect(this._amplitue.gain);
	        for (var i = 0; i < inharmRatios.length; i++) {
	            var osc = new Tone.FMOscillator({
	                'type': 'square',
	                'modulationType': 'square',
	                'harmonicity': options.harmonicity,
	                'modulationIndex': options.modulationIndex
	            });
	            osc.connect(this._highpass).start();
	            this._oscillators[i] = osc;
	            var mult = new Tone.Multiply(inharmRatios[i]);
	            this._freqMultipliers[i] = mult;
	            this.frequency.chain(mult, osc.frequency);
	        }
	        //set the octaves
	        this.octaves = options.octaves;
	    };
	    Tone.extend(Tone.MetalSynth, Tone.Instrument);
	    /**
		 *  default values
		 *  @static
		 *  @const
		 *  @type {Object}
		 */
	    Tone.MetalSynth.defaults = {
	        'frequency': 200,
	        'envelope': {
	            'attack': 0.001,
	            'decay': 1.4,
	            'release': 0.2
	        },
	        'harmonicity': 5.1,
	        'modulationIndex': 32,
	        'resonance': 4000,
	        'octaves': 1.5
	    };
	    /**
		 *  Trigger the attack.
		 *  @param  {Time}  time      When the attack should be triggered.
		 *  @param  {NormalRange}  [velocity=1]  The velocity that the envelope should be triggered at.
		 *  @return  {Tone.MetalSynth}  this
		 */
	    Tone.MetalSynth.prototype.triggerAttack = function (time, vel) {
	        time = this.toSeconds(time);
	        vel = Tone.defaultArg(vel, 1);
	        this.envelope.triggerAttack(time, vel);
	        return this;
	    };
	    /**
		 *  Trigger the release of the envelope.
		 *  @param  {Time}  time      When the release should be triggered.
		 *  @return  {Tone.MetalSynth}  this
		 */
	    Tone.MetalSynth.prototype.triggerRelease = function (time) {
	        time = this.toSeconds(time);
	        this.envelope.triggerRelease(time);
	        return this;
	    };
	    /**
		 *  Trigger the attack and release of the envelope after the given
		 *  duration.
		 *  @param  {Time}  duration  The duration before triggering the release
		 *  @param  {Time}  time      When the attack should be triggered.
		 *  @param  {NormalRange}  [velocity=1]  The velocity that the envelope should be triggered at.
		 *  @return  {Tone.MetalSynth}  this
		 */
	    Tone.MetalSynth.prototype.triggerAttackRelease = function (duration, time, velocity) {
	        time = this.toSeconds(time);
	        duration = this.toSeconds(duration);
	        this.triggerAttack(time, velocity);
	        this.triggerRelease(time + duration);
	        return this;
	    };
	    /**
		 *  The modulationIndex of the oscillators which make up the source.
		 *  see Tone.FMOscillator.modulationIndex
		 *  @memberOf Tone.MetalSynth#
		 *  @type {Positive}
		 *  @name  modulationIndex
		 */
	    Object.defineProperty(Tone.MetalSynth.prototype, 'modulationIndex', {
	        get: function () {
	            return this._oscillators[0].modulationIndex.value;
	        },
	        set: function (val) {
	            for (var i = 0; i < this._oscillators.length; i++) {
	                this._oscillators[i].modulationIndex.value = val;
	            }
	        }
	    });
	    /**
		 *  The harmonicity of the oscillators which make up the source.
		 *  see Tone.FMOscillator.harmonicity
		 *  @memberOf Tone.MetalSynth#
		 *  @type {Positive}
		 *  @name  harmonicity
		 */
	    Object.defineProperty(Tone.MetalSynth.prototype, 'harmonicity', {
	        get: function () {
	            return this._oscillators[0].harmonicity.value;
	        },
	        set: function (val) {
	            for (var i = 0; i < this._oscillators.length; i++) {
	                this._oscillators[i].harmonicity.value = val;
	            }
	        }
	    });
	    /**
		 *  The frequency of the highpass filter attached to the envelope
		 *  @memberOf Tone.MetalSynth#
		 *  @type {Frequency}
		 *  @name  resonance
		 */
	    Object.defineProperty(Tone.MetalSynth.prototype, 'resonance', {
	        get: function () {
	            return this._filterFreqScaler.min;
	        },
	        set: function (val) {
	            this._filterFreqScaler.min = val;
	            this.octaves = this._octaves;
	        }
	    });
	    /**
		 *  The number of octaves above the "resonance" frequency
		 *  that the filter ramps during the attack/decay envelope
		 *  @memberOf Tone.MetalSynth#
		 *  @type {Number}
		 *  @name  octaves
		 */
	    Object.defineProperty(Tone.MetalSynth.prototype, 'octaves', {
	        get: function () {
	            return this._octaves;
	        },
	        set: function (octs) {
	            this._octaves = octs;
	            this._filterFreqScaler.max = this._filterFreqScaler.min * Math.pow(2, octs);
	        }
	    });
	    /**
		 *  Clean up
		 *  @returns {Tone.MetalSynth} this
		 */
	    Tone.MetalSynth.prototype.dispose = function () {
	        Tone.Instrument.prototype.dispose.call(this);
	        for (var i = 0; i < this._oscillators.length; i++) {
	            this._oscillators[i].dispose();
	            this._freqMultipliers[i].dispose();
	        }
	        this._oscillators = null;
	        this._freqMultipliers = null;
	        this.frequency.dispose();
	        this.frequency = null;
	        this._filterFreqScaler.dispose();
	        this._filterFreqScaler = null;
	        this._amplitue.dispose();
	        this._amplitue = null;
	        this.envelope.dispose();
	        this.envelope = null;
	        this._highpass.dispose();
	        this._highpass = null;
	    };
	    return Tone.MetalSynth;
	});
	Module(function (Tone) {
	    /**
		 *  BufferSource polyfill
		 */
	    if (window.AudioBufferSourceNode && !AudioBufferSourceNode.prototype.start) {
	        AudioBufferSourceNode.prototype.start = AudioBufferSourceNode.prototype.noteGrainOn;
	        AudioBufferSourceNode.prototype.stop = AudioBufferSourceNode.prototype.noteOff;
	    }
	    /**
		 *  @class Wrapper around the native BufferSourceNode.
		 *  @extends {Tone.AudioNode}
		 *  @param  {AudioBuffer|Tone.Buffer}  buffer   The buffer to play
		 *  @param  {Function}  onload  The callback to invoke when the
		 *                               buffer is done playing.
		 */
	    Tone.BufferSource = function () {
	        var options = Tone.defaults(arguments, [
	            'buffer',
	            'onload'
	        ], Tone.BufferSource);
	        Tone.AudioNode.call(this);
	        /**
			 *  The callback to invoke after the
			 *  buffer source is done playing.
			 *  @type  {Function}
			 */
	        this.onended = options.onended;
	        /**
			 *  The time that the buffer was started.
			 *  @type  {Number}
			 *  @private
			 */
	        this._startTime = -1;
	        /**
			 *  The time that the buffer is scheduled to stop.
			 *  @type  {Number}
			 *  @private
			 */
	        this._stopTime = -1;
	        /**
			 *  The gain node which envelopes the BufferSource
			 *  @type  {Tone.Gain}
			 *  @private
			 */
	        this._gainNode = this.output = new Tone.Gain();
	        /**
			 *  The buffer source
			 *  @type  {AudioBufferSourceNode}
			 *  @private
			 */
	        this._source = this.context.createBufferSource();
	        this._source.connect(this._gainNode);
	        /**
			 * The private buffer instance
			 * @type {Tone.Buffer}
			 * @private
			 */
	        this._buffer = new Tone.Buffer(options.buffer, options.onload);
	        /**
			 *  The playbackRate of the buffer
			 *  @type {Positive}
			 *  @signal
			 */
	        this.playbackRate = new Tone.Param(this._source.playbackRate, Tone.Type.Positive);
	        /**
			 *  The fadeIn time of the amplitude envelope.
			 *  @type {Time}
			 */
	        this.fadeIn = options.fadeIn;
	        /**
			 *  The fadeOut time of the amplitude envelope.
			 *  @type {Time}
			 */
	        this.fadeOut = options.fadeOut;
	        /**
			 * The curve applied to the fades, either "linear" or "exponential"
			 * @type {String}
			 */
	        this.curve = options.curve;
	        /**
			 *  The value that the buffer ramps to
			 *  @type {Gain}
			 *  @private
			 */
	        this._gain = 1;
	        /**
			 * The onended timeout
			 * @type {Number}
			 * @private
			 */
	        this._onendedTimeout = -1;
	        //set some values initially
	        this.loop = options.loop;
	        this.loopStart = options.loopStart;
	        this.loopEnd = options.loopEnd;
	        this.playbackRate.value = options.playbackRate;
	    };
	    Tone.extend(Tone.BufferSource, Tone.AudioNode);
	    /**
		 *  The defaults
		 *  @const
		 *  @type  {Object}
		 */
	    Tone.BufferSource.defaults = {
	        'onended': Tone.noOp,
	        'onload': Tone.noOp,
	        'loop': false,
	        'loopStart': 0,
	        'loopEnd': 0,
	        'fadeIn': 0,
	        'fadeOut': 0,
	        'curve': 'linear',
	        'playbackRate': 1
	    };
	    /**
		 *  Returns the playback state of the source, either "started" or "stopped".
		 *  @type {Tone.State}
		 *  @readOnly
		 *  @memberOf Tone.BufferSource#
		 *  @name state
		 */
	    Object.defineProperty(Tone.BufferSource.prototype, 'state', {
	        get: function () {
	            var now = this.now();
	            if (this._startTime !== -1 && now >= this._startTime && now < this._stopTime) {
	                return Tone.State.Started;
	            } else {
	                return Tone.State.Stopped;
	            }
	        }
	    });
	    /**
		 *  Start the buffer
		 *  @param  {Time} [startTime=now] When the player should start.
		 *  @param  {Time} [offset=0] The offset from the beginning of the sample
		 *                                 to start at.
		 *  @param  {Time=} duration How long the sample should play. If no duration
		 *                                is given, it will default to the full length
		 *                                of the sample (minus any offset)
		 *  @param  {Gain}  [gain=1]  The gain to play the buffer back at.
		 *  @param  {Time=}  fadeInTime  The optional fadeIn ramp time.
		 *  @return  {Tone.BufferSource}  this
		 */
	    Tone.BufferSource.prototype.start = function (time, offset, duration, gain, fadeInTime) {
	        if (this._startTime !== -1) {
	            throw new Error('Tone.BufferSource can only be started once.');
	        }
	        if (this.buffer.loaded) {
	            time = this.toSeconds(time);
	            //if it's a loop the default offset is the loopstart point
	            if (this.loop) {
	                offset = Tone.defaultArg(offset, this.loopStart);
	            } else {
	                //otherwise the default offset is 0
	                offset = Tone.defaultArg(offset, 0);
	            }
	            offset = this.toSeconds(offset);
	            gain = Tone.defaultArg(gain, 1);
	            this._gain = gain;
	            fadeInTime = this.toSeconds(Tone.defaultArg(fadeInTime, this.fadeIn));
	            this.fadeIn = fadeInTime;
	            if (fadeInTime > 0) {
	                this._gainNode.gain.setValueAtTime(0, time);
	                if (this.curve === 'linear') {
	                    this._gainNode.gain.linearRampToValueAtTime(this._gain, time + fadeInTime);
	                } else {
	                    this._gainNode.gain.setTargetAtTime(this._gain, time, this._gainNode.gain.getTimeConstant(fadeInTime));
	                }
	            } else {
	                this._gainNode.gain.setValueAtTime(gain, time);
	            }
	            this._startTime = time;
	            var computedDur = this.toSeconds(Tone.defaultArg(duration, this.buffer.duration - offset));
	            computedDur = Math.max(computedDur, 0);
	            if (!this.loop || this.loop && !Tone.isUndef(duration)) {
	                //clip the duration when not looping
	                if (!this.loop) {
	                    computedDur = Math.min(computedDur, this.buffer.duration - offset);
	                }
	                this.stop(time + computedDur, this.fadeOut);
	            }
	            //start the buffer source
	            if (this.loop) {
	                //modify the offset if it's greater than the loop time
	                var loopEnd = this.loopEnd || this.buffer.duration;
	                var loopStart = this.loopStart;
	                var loopDuration = loopEnd - loopStart;
	                //move the offset back
	                if (offset > loopEnd) {
	                    offset = (offset - loopStart) % loopDuration + loopStart;
	                }
	            }
	            this._source.buffer = this.buffer.get();
	            this._source.loopEnd = this.loopEnd || this.buffer.duration;
	            Tone.isPast(time);
	            this._source.start(time, offset);
	        } else {
	            throw new Error('Tone.BufferSource: buffer is either not set or not loaded.');
	        }
	        return this;
	    };
	    /**
		 *  Stop the buffer. Optionally add a ramp time to fade the
		 *  buffer out.
		 *  @param  {Time=}  time         The time the buffer should stop.
		 *  @param  {Time=}  fadeOutTime  How long the gain should fade out for
		 *  @return  {Tone.BufferSource}  this
		 */
	    Tone.BufferSource.prototype.stop = function (time, fadeOutTime) {
	        if (this.buffer.loaded) {
	            time = this.toSeconds(time);
	            //if this is before the previous stop
	            if (this._stopTime === -1 || this._stopTime > time) {
	                //stop if it's schedule before the start time
	                if (time <= this._startTime) {
	                    this._gainNode.gain.cancelScheduledValues(time);
	                    this._gainNode.gain.value = 0;
	                    return this;
	                }
	                time = Math.max(this._startTime + this.fadeIn + this.sampleTime, time);
	                //cancel the previous curve
	                this._gainNode.gain.cancelScheduledValues(time);
	                this._stopTime = time;
	                //the fadeOut time
	                fadeOutTime = this.toSeconds(Tone.defaultArg(fadeOutTime, this.fadeOut));
	                //set a new one
	                var heldDuration = Math.min(time - this._startTime - this.fadeIn - this.sampleTime, this.buffer.duration);
	                fadeOutTime = Math.min(heldDuration, fadeOutTime);
	                var startFade = time - fadeOutTime;
	                if (fadeOutTime > this.sampleTime) {
	                    this._gainNode.gain.setValueAtTime(this._gain, startFade);
	                    if (this.curve === 'linear') {
	                        this._gainNode.gain.linearRampToValueAtTime(0, time);
	                    } else {
	                        this._gainNode.gain.setTargetAtTime(0, startFade, this._gainNode.gain.getTimeConstant(fadeOutTime));
	                    }
	                } else {
	                    this._gainNode.gain.setValueAtTime(0, time);
	                }
	                Tone.context.clearTimeout(this._onendedTimeout);
	                this._onendedTimeout = Tone.context.setTimeout(this._onended.bind(this), this._stopTime - this.now());
	            }
	        } else {
	            throw new Error('Tone.BufferSource: buffer is either not set or not loaded.');
	        }
	        return this;
	    };
	    /**
		 *  Internal callback when the buffer is ended.
		 *  Invokes `onended` and disposes the node.
		 *  @private
		 */
	    Tone.BufferSource.prototype._onended = function () {
	        this.onended(this);
	    };
	    /**
		 * If loop is true, the loop will start at this position.
		 * @memberOf Tone.BufferSource#
		 * @type {Time}
		 * @name loopStart
		 */
	    Object.defineProperty(Tone.BufferSource.prototype, 'loopStart', {
	        get: function () {
	            return this._source.loopStart;
	        },
	        set: function (loopStart) {
	            this._source.loopStart = this.toSeconds(loopStart);
	        }
	    });
	    /**
		 * If loop is true, the loop will end at this position.
		 * @memberOf Tone.BufferSource#
		 * @type {Time}
		 * @name loopEnd
		 */
	    Object.defineProperty(Tone.BufferSource.prototype, 'loopEnd', {
	        get: function () {
	            return this._source.loopEnd;
	        },
	        set: function (loopEnd) {
	            this._source.loopEnd = this.toSeconds(loopEnd);
	        }
	    });
	    /**
		 * The audio buffer belonging to the player.
		 * @memberOf Tone.BufferSource#
		 * @type {Tone.Buffer}
		 * @name buffer
		 */
	    Object.defineProperty(Tone.BufferSource.prototype, 'buffer', {
	        get: function () {
	            return this._buffer;
	        },
	        set: function (buffer) {
	            this._buffer.set(buffer);
	        }
	    });
	    /**
		 * If the buffer should loop once it's over.
		 * @memberOf Tone.BufferSource#
		 * @type {Boolean}
		 * @name loop
		 */
	    Object.defineProperty(Tone.BufferSource.prototype, 'loop', {
	        get: function () {
	            return this._source.loop;
	        },
	        set: function (loop) {
	            this._source.loop = loop;
	        }
	    });
	    /**
		 *  Clean up.
		 *  @return  {Tone.BufferSource}  this
		 */
	    Tone.BufferSource.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this.onended = null;
	        this._source.disconnect();
	        this._source = null;
	        this._gainNode.dispose();
	        this._gainNode = null;
	        this._buffer.dispose();
	        this._buffer = null;
	        this._startTime = -1;
	        this.playbackRate = null;
	        Tone.context.clearTimeout(this._onendedTimeout);
	        return this;
	    };
	    return Tone.BufferSource;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Tone.Noise is a noise generator. It uses looped noise buffers to save on performance.
		 *          Tone.Noise supports the noise types: "pink", "white", and "brown". Read more about
		 *          colors of noise on [Wikipedia](https://en.wikipedia.org/wiki/Colors_of_noise).
		 *
		 *  @constructor
		 *  @extends {Tone.Source}
		 *  @param {string} type the noise type (white|pink|brown)
		 *  @example
		 * //initialize the noise and start
		 * var noise = new Tone.Noise("pink").start();
		 * 
		 * //make an autofilter to shape the noise
		 * var autoFilter = new Tone.AutoFilter({
		 * 	"frequency" : "8m", 
		 * 	"min" : 800, 
		 * 	"max" : 15000
		 * }).connect(Tone.Master);
		 * 
		 * //connect the noise
		 * noise.connect(autoFilter);
		 * //start the autofilter LFO
		 * autoFilter.start()
		 */
	    Tone.Noise = function () {
	        var options = Tone.defaults(arguments, ['type'], Tone.Noise);
	        Tone.Source.call(this, options);
	        /**
			 *  @private
			 *  @type {AudioBufferSourceNode}
			 */
	        this._source = null;
	        /**
			 *  the buffer
			 *  @private
			 *  @type {AudioBuffer}
			 */
	        this._type = options.type;
	        /**
			 *  The playback rate of the noise. Affects
			 *  the "frequency" of the noise.
			 *  @type {Positive}
			 *  @signal
			 */
	        this._playbackRate = options.playbackRate;
	    };
	    Tone.extend(Tone.Noise, Tone.Source);
	    /**
		 *  the default parameters
		 *
		 *  @static
		 *  @const
		 *  @type {Object}
		 */
	    Tone.Noise.defaults = {
	        'type': 'white',
	        'playbackRate': 1
	    };
	    /**
		 * The type of the noise. Can be "white", "brown", or "pink". 
		 * @memberOf Tone.Noise#
		 * @type {string}
		 * @name type
		 * @example
		 * noise.type = "white";
		 */
	    Object.defineProperty(Tone.Noise.prototype, 'type', {
	        get: function () {
	            return this._type;
	        },
	        set: function (type) {
	            if (this._type !== type) {
	                if (type in _noiseBuffers) {
	                    this._type = type;
	                    //if it's playing, stop and restart it
	                    if (this.state === Tone.State.Started) {
	                        var now = this.now();
	                        this._stop(now);
	                        this._start(now);
	                    }
	                } else {
	                    throw new TypeError('Tone.Noise: invalid type: ' + type);
	                }
	            }
	        }
	    });
	    /**
		 *  The playback rate of the noise. Affects
		 *  the "frequency" of the noise.
		 *  @type {Positive}
		 *  @signal
		 */
	    Object.defineProperty(Tone.Noise.prototype, 'playbackRate', {
	        get: function () {
	            return this._playbackRate;
	        },
	        set: function (rate) {
	            this._playbackRate = rate;
	            if (this._source) {
	                this._source.playbackRate.value = rate;
	            }
	        }
	    });
	    /**
		 *  internal start method
		 *
		 *  @param {Time} time
		 *  @private
		 */
	    Tone.Noise.prototype._start = function (time) {
	        var buffer = _noiseBuffers[this._type];
	        this._source = new Tone.BufferSource(buffer).connect(this.output);
	        this._source.loop = true;
	        this._source.playbackRate.value = this._playbackRate;
	        this._source.start(this.toSeconds(time), Math.random() * (buffer.duration - 0.001));
	    };
	    /**
		 *  internal stop method
		 *
		 *  @param {Time} time
		 *  @private
		 */
	    Tone.Noise.prototype._stop = function (time) {
	        if (this._source) {
	            this._source.stop(this.toSeconds(time));
	            this._source = null;
	        }
	    };
	    /**
		 *  Clean up.
		 *  @returns {Tone.Noise} this
		 */
	    Tone.Noise.prototype.dispose = function () {
	        Tone.Source.prototype.dispose.call(this);
	        if (this._source !== null) {
	            this._source.disconnect();
	            this._source = null;
	        }
	        this._buffer = null;
	        return this;
	    };
	    ///////////////////////////////////////////////////////////////////////////
	    // THE BUFFERS
	    ///////////////////////////////////////////////////////////////////////////
	    //Noise buffer stats
	    var bufferLength = 44100 * 5;
	    var channels = 2;
	    /**
		 *	The noise arrays. Generated on initialization.
		 *  borrowed heavily from https://github.com/zacharydenton/noise.js 
		 *  (c) 2013 Zach Denton (MIT)
		 *  @static
		 *  @private
		 *  @type {Array}
		 */
	    var _noiseArrays = {
	        'pink': function () {
	            var buffer = [];
	            for (var channelNum = 0; channelNum < channels; channelNum++) {
	                var channel = new Float32Array(bufferLength);
	                buffer[channelNum] = channel;
	                var b0, b1, b2, b3, b4, b5, b6;
	                b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0;
	                for (var i = 0; i < bufferLength; i++) {
	                    var white = Math.random() * 2 - 1;
	                    b0 = 0.99886 * b0 + white * 0.0555179;
	                    b1 = 0.99332 * b1 + white * 0.0750759;
	                    b2 = 0.969 * b2 + white * 0.153852;
	                    b3 = 0.8665 * b3 + white * 0.3104856;
	                    b4 = 0.55 * b4 + white * 0.5329522;
	                    b5 = -0.7616 * b5 - white * 0.016898;
	                    channel[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
	                    channel[i] *= 0.11;
	                    // (roughly) compensate for gain
	                    b6 = white * 0.115926;
	                }
	            }
	            return buffer;
	        }(),
	        'brown': function () {
	            var buffer = [];
	            for (var channelNum = 0; channelNum < channels; channelNum++) {
	                var channel = new Float32Array(bufferLength);
	                buffer[channelNum] = channel;
	                var lastOut = 0;
	                for (var i = 0; i < bufferLength; i++) {
	                    var white = Math.random() * 2 - 1;
	                    channel[i] = (lastOut + 0.02 * white) / 1.02;
	                    lastOut = channel[i];
	                    channel[i] *= 3.5;    // (roughly) compensate for gain
	                }
	            }
	            return buffer;
	        }(),
	        'white': function () {
	            var buffer = [];
	            for (var channelNum = 0; channelNum < channels; channelNum++) {
	                var channel = new Float32Array(bufferLength);
	                buffer[channelNum] = channel;
	                for (var i = 0; i < bufferLength; i++) {
	                    channel[i] = Math.random() * 2 - 1;
	                }
	            }
	            return buffer;
	        }()
	    };
	    /**
		 *	static noise buffers
		 *  @static
		 *  @private
		 *  @type {Tone.Buffer}
		 */
	    var _noiseBuffers = {};
	    //create the Tone.Buffers
	    function createBuffers() {
	        for (var type in _noiseArrays) {
	            _noiseBuffers[type] = new Tone.Buffer().fromArray(_noiseArrays[type]);
	        }
	    }
	    //create the noise buffers
	    Tone.getContext(createBuffers);
	    Tone.Context.on('init', createBuffers);
	    return Tone.Noise;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Tone.NoiseSynth is composed of a noise generator (Tone.Noise), one filter (Tone.Filter), 
		 *          and two envelopes (Tone.Envelop). One envelope controls the amplitude
		 *          of the noise and the other is controls the cutoff frequency of the filter. 
		 *          <img src="https://docs.google.com/drawings/d/1rqzuX9rBlhT50MRvD2TKml9bnZhcZmzXF1rf_o7vdnE/pub?w=918&h=242">
		 *
		 *  @constructor
		 *  @extends {Tone.Instrument}
		 *  @param {Object} [options] the options available for the synth 
		 *                          see defaults below
		 * @example
		 * var noiseSynth = new Tone.NoiseSynth().toMaster();
		 * noiseSynth.triggerAttackRelease("8n");
		 */
	    Tone.NoiseSynth = function (options) {
	        //get the defaults
	        options = Tone.defaultArg(options, Tone.NoiseSynth.defaults);
	        Tone.Instrument.call(this, options);
	        /**
			 *  The noise source.
			 *  @type {Tone.Noise}
			 *  @example
			 * noiseSynth.set("noise.type", "brown");
			 */
	        this.noise = new Tone.Noise();
	        /**
			 *  The amplitude envelope. 
			 *  @type {Tone.AmplitudeEnvelope}
			 */
	        this.envelope = new Tone.AmplitudeEnvelope(options.envelope);
	        //connect the noise to the output
	        this.noise.chain(this.envelope, this.output);
	        //start the noise
	        this.noise.start();
	        this._readOnly([
	            'noise',
	            'envelope'
	        ]);
	    };
	    Tone.extend(Tone.NoiseSynth, Tone.Instrument);
	    /**
		 *  @const
		 *  @static
		 *  @type {Object}
		 */
	    Tone.NoiseSynth.defaults = {
	        'noise': { 'type': 'white' },
	        'envelope': {
	            'attack': 0.005,
	            'decay': 0.1,
	            'sustain': 0
	        }
	    };
	    /**
		 *  Start the attack portion of the envelopes. Unlike other 
		 *  instruments, Tone.NoiseSynth doesn't have a note. 
		 *  @param {Time} [time=now] the time the attack should start
		 *  @param {number} [velocity=1] the velocity of the note (0-1)
		 *  @returns {Tone.NoiseSynth} this
		 *  @example
		 * noiseSynth.triggerAttack();
		 */
	    Tone.NoiseSynth.prototype.triggerAttack = function (time, velocity) {
	        //the envelopes
	        this.envelope.triggerAttack(time, velocity);
	        return this;
	    };
	    /**
		 *  Start the release portion of the envelopes.
		 *  @param {Time} [time=now] the time the release should start
		 *  @returns {Tone.NoiseSynth} this
		 */
	    Tone.NoiseSynth.prototype.triggerRelease = function (time) {
	        this.envelope.triggerRelease(time);
	        return this;
	    };
	    /**
		 *  Trigger the attack and then the release. 
		 *  @param  {Time} duration the duration of the note
		 *  @param  {Time} [time=now]     the time of the attack
		 *  @param  {number} [velocity=1] the velocity
		 *  @returns {Tone.NoiseSynth} this
		 */
	    Tone.NoiseSynth.prototype.triggerAttackRelease = function (duration, time, velocity) {
	        time = this.toSeconds(time);
	        duration = this.toSeconds(duration);
	        this.triggerAttack(time, velocity);
	        this.triggerRelease(time + duration);
	        return this;
	    };
	    /**
		 *  Clean up. 
		 *  @returns {Tone.NoiseSynth} this
		 */
	    Tone.NoiseSynth.prototype.dispose = function () {
	        Tone.Instrument.prototype.dispose.call(this);
	        this._writable([
	            'noise',
	            'envelope'
	        ]);
	        this.noise.dispose();
	        this.noise = null;
	        this.envelope.dispose();
	        this.envelope = null;
	        return this;
	    };
	    return Tone.NoiseSynth;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Karplus-String string synthesis. Often out of tune. 
		 *         Will change when the AudioWorkerNode is available across
		 *         browsers. 
		 *  
		 *  @constructor
		 *  @extends {Tone.Instrument}
		 *  @param {Object} [options] see the defaults
		 *  @example
		 * var plucky = new Tone.PluckSynth().toMaster();
		 * plucky.triggerAttack("C4");
		 */
	    Tone.PluckSynth = function (options) {
	        options = Tone.defaultArg(options, Tone.PluckSynth.defaults);
	        Tone.Instrument.call(this, options);
	        /**
			 *  @type {Tone.Noise}
			 *  @private
			 */
	        this._noise = new Tone.Noise('pink');
	        /**
			 *  The amount of noise at the attack. 
			 *  Nominal range of [0.1, 20]
			 *  @type {number}
			 */
	        this.attackNoise = options.attackNoise;
	        /**
			 *  the LFCF
			 *  @type {Tone.LowpassCombFilter}
			 *  @private
			 */
	        this._lfcf = new Tone.LowpassCombFilter({
	            'resonance': options.resonance,
	            'dampening': options.dampening
	        });
	        /**
			 *  The resonance control. 
			 *  @type {NormalRange}
			 *  @signal
			 */
	        this.resonance = this._lfcf.resonance;
	        /**
			 *  The dampening control. i.e. the lowpass filter frequency of the comb filter
			 *  @type {Frequency}
			 *  @signal
			 */
	        this.dampening = this._lfcf.dampening;
	        //connections
	        this._noise.connect(this._lfcf);
	        this._lfcf.connect(this.output);
	        this._readOnly([
	            'resonance',
	            'dampening'
	        ]);
	    };
	    Tone.extend(Tone.PluckSynth, Tone.Instrument);
	    /**
		 *  @static
		 *  @const
		 *  @type {Object}
		 */
	    Tone.PluckSynth.defaults = {
	        'attackNoise': 1,
	        'dampening': 4000,
	        'resonance': 0.9
	    };
	    /**
		 *  Trigger the note. 
		 *  @param {Frequency} note The note to trigger.
		 *  @param {Time} [time=now] When the note should be triggered.
		 *  @returns {Tone.PluckSynth} this
		 */
	    Tone.PluckSynth.prototype.triggerAttack = function (note, time) {
	        note = this.toFrequency(note);
	        time = this.toSeconds(time);
	        var delayAmount = 1 / note;
	        this._lfcf.delayTime.setValueAtTime(delayAmount, time);
	        this._noise.start(time);
	        this._noise.stop(time + delayAmount * this.attackNoise);
	        return this;
	    };
	    /**
		 *  Clean up. 
		 *  @returns {Tone.PluckSynth} this
		 */
	    Tone.PluckSynth.prototype.dispose = function () {
	        Tone.Instrument.prototype.dispose.call(this);
	        this._noise.dispose();
	        this._lfcf.dispose();
	        this._noise = null;
	        this._lfcf = null;
	        this._writable([
	            'resonance',
	            'dampening'
	        ]);
	        this.dampening = null;
	        this.resonance = null;
	        return this;
	    };
	    return Tone.PluckSynth;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Tone.PolySynth handles voice creation and allocation for any
		 *          instruments passed in as the second paramter. PolySynth is 
		 *          not a synthesizer by itself, it merely manages voices of 
		 *          one of the other types of synths, allowing any of the 
		 *          monophonic synthesizers to be polyphonic. 
		 *
		 *  @constructor
		 *  @extends {Tone.Instrument}
		 *  @param {number|Object} [polyphony=4] The number of voices to create
		 *  @param {function} [voice=Tone.Synth] The constructor of the voices
		 *                                            uses Tone.Synth by default. 
		 *  @example
		 * //a polysynth composed of 6 Voices of Synth
		 * var synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
		 * //set the attributes using the set interface
		 * synth.set("detune", -1200);
		 * //play a chord
		 * synth.triggerAttackRelease(["C4", "E4", "A4"], "4n");
		 */
	    Tone.PolySynth = function () {
	        var options = Tone.defaults(arguments, [
	            'polyphony',
	            'voice'
	        ], Tone.PolySynth);
	        Tone.Instrument.call(this, options);
	        options = Tone.defaultArg(options, Tone.Instrument.defaults);
	        //max polyphony
	        options.polyphony = Math.min(Tone.PolySynth.MAX_POLYPHONY, options.polyphony);
	        /**
			 *  the array of voices
			 *  @type {Array}
			 */
	        this.voices = new Array(options.polyphony);
	        /**
			 *  The queue of voices with data about last trigger
			 *  and the triggered note
			 *  @private
			 *  @type {Array}
			 */
	        this._triggers = new Array(options.polyphony);
	        /**
			 *  The detune in cents
			 *  @type {Cents}
			 *  @signal
			 */
	        this.detune = new Tone.Signal(options.detune, Tone.Type.Cents);
	        this._readOnly('detune');
	        //create the voices
	        for (var i = 0; i < options.polyphony; i++) {
	            var v = new options.voice(arguments[2], arguments[3]);
	            this.voices[i] = v;
	            v.connect(this.output);
	            if (v.hasOwnProperty('detune')) {
	                this.detune.connect(v.detune);
	            }
	            this._triggers[i] = {
	                release: -1,
	                note: null,
	                voice: v
	            };
	        }
	    };
	    Tone.extend(Tone.PolySynth, Tone.Instrument);
	    /**
		 *  the defaults
		 *  @const
		 *  @static
		 *  @type {Object}
		 */
	    Tone.PolySynth.defaults = {
	        'polyphony': 4,
	        'volume': 0,
	        'detune': 0,
	        'voice': Tone.Synth
	    };
	    /**
		 *  Trigger the attack portion of the note
		 *  @param  {Frequency|Array} notes The notes to play. Accepts a single
		 *                                  Frequency or an array of frequencies.
		 *  @param  {Time} [time=now]  The start time of the note.
		 *  @param {number} [velocity=1] The velocity of the note.
		 *  @returns {Tone.PolySynth} this
		 *  @example
		 * //trigger a chord immediately with a velocity of 0.2
		 * poly.triggerAttack(["Ab3", "C4", "F5"], undefined, 0.2);
		 */
	    Tone.PolySynth.prototype.triggerAttack = function (notes, time, velocity) {
	        if (!Array.isArray(notes)) {
	            notes = [notes];
	        }
	        time = this.toSeconds(time);
	        for (var i = 0; i < notes.length; i++) {
	            var val = notes[i];
	            //trigger the oldest voice
	            var oldest = this._triggers[0];
	            var oldestIndex = 0;
	            for (var j = 1; j < this._triggers.length; j++) {
	                if (this._triggers[j].release < oldest.release) {
	                    oldest = this._triggers[j];
	                    oldestIndex = j;
	                }
	            }
	            oldest.release = Infinity;
	            oldest.note = JSON.stringify(val);
	            oldest.voice.triggerAttack(val, time, velocity);
	        }
	        return this;
	    };
	    /**
		 *  Trigger the attack and release after the specified duration
		 *  
		 *  @param  {Frequency|Array} notes The notes to play. Accepts a single
		 *                                  Frequency or an array of frequencies.
		 *  @param  {Time} duration the duration of the note
		 *  @param  {Time} [time=now]     if no time is given, defaults to now
		 *  @param  {number} [velocity=1] the velocity of the attack (0-1)
		 *  @returns {Tone.PolySynth} this
		 *  @example
		 * //trigger a chord for a duration of a half note 
		 * poly.triggerAttackRelease(["Eb3", "G4", "C5"], "2n");
		 *  @example
		 * //can pass in an array of durations as well
		 * poly.triggerAttackRelease(["Eb3", "G4", "C5"], ["2n", "4n", "4n"]);
		 */
	    Tone.PolySynth.prototype.triggerAttackRelease = function (notes, duration, time, velocity) {
	        time = this.toSeconds(time);
	        this.triggerAttack(notes, time, velocity);
	        if (Tone.isArray(duration) && Tone.isArray(notes)) {
	            for (var i = 0; i < notes.length; i++) {
	                var d = duration[Math.min(i, duration.length - 1)];
	                this.triggerRelease(notes[i], time + this.toSeconds(d));
	            }
	        } else {
	            this.triggerRelease(notes, time + this.toSeconds(duration));
	        }
	        return this;
	    };
	    /**
		 *  Trigger the release of the note. Unlike monophonic instruments, 
		 *  a note (or array of notes) needs to be passed in as the first argument.
		 *  @param  {Frequency|Array} notes The notes to play. Accepts a single
		 *                                  Frequency or an array of frequencies.
		 *  @param  {Time} [time=now]  When the release will be triggered. 
		 *  @returns {Tone.PolySynth} this
		 *  @example
		 * poly.triggerRelease(["Ab3", "C4", "F5"], "+2n");
		 */
	    Tone.PolySynth.prototype.triggerRelease = function (notes, time) {
	        if (!Array.isArray(notes)) {
	            notes = [notes];
	        }
	        time = this.toSeconds(time);
	        for (var i = 0; i < notes.length; i++) {
	            //get the voice
	            var stringified = JSON.stringify(notes[i]);
	            for (var v = 0; v < this._triggers.length; v++) {
	                var desc = this._triggers[v];
	                if (desc.note === stringified && desc.release > time) {
	                    desc.voice.triggerRelease(time);
	                    desc.release = time;
	                }
	            }
	        }
	        return this;
	    };
	    /**
		 *  Set a member/attribute of the voices. 
		 *  @param {Object|string} params
		 *  @param {number=} value
		 *  @param {Time=} rampTime
		 *  @returns {Tone.PolySynth} this
		 *  @example
		 * poly.set({
		 * 	"filter" : {
		 * 		"type" : "highpass"
		 * 	},
		 * 	"envelope" : {
		 * 		"attack" : 0.25
		 * 	}
		 * });
		 */
	    Tone.PolySynth.prototype.set = function (params, value, rampTime) {
	        for (var i = 0; i < this.voices.length; i++) {
	            this.voices[i].set(params, value, rampTime);
	        }
	        return this;
	    };
	    /**
		 *  Get the synth's attributes. Given no arguments get
		 *  will return all available object properties and their corresponding
		 *  values. Pass in a single attribute to retrieve or an array
		 *  of attributes. The attribute strings can also include a "."
		 *  to access deeper properties.
		 *  @param {Array=} params the parameters to get, otherwise will return 
		 *  					   all available.
		 */
	    Tone.PolySynth.prototype.get = function (params) {
	        return this.voices[0].get(params);
	    };
	    /**
		 *  Trigger the release portion of all the currently active voices.
		 *  @param {Time} [time=now] When the notes should be released.
		 *  @return {Tone.PolySynth} this
		 */
	    Tone.PolySynth.prototype.releaseAll = function (time) {
	        time = this.toSeconds(time);
	        for (var i = 0; i < this._triggers.length; i++) {
	            var desc = this._triggers[i];
	            if (desc.release > time) {
	                desc.release = time;
	                desc.voice.triggerRelease(time);
	            }
	        }
	        return this;
	    };
	    /**
		 *  Clean up.
		 *  @returns {Tone.PolySynth} this
		 */
	    Tone.PolySynth.prototype.dispose = function () {
	        Tone.Instrument.prototype.dispose.call(this);
	        for (var i = 0; i < this.voices.length; i++) {
	            this.voices[i].dispose();
	            this.voices[i] = null;
	        }
	        this._writable('detune');
	        this.detune.dispose();
	        this.detune = null;
	        this.voices = null;
	        this._triggers = null;
	        return this;
	    };
	    /**
		 *  The maximum number of notes that can be allocated 
		 *  to a polysynth. 
		 *  @type  {Number}
		 *  @static
		 */
	    Tone.PolySynth.MAX_POLYPHONY = 20;
	    return Tone.PolySynth;
	});
	Module(function (Tone) {
	    /**
		 * @class Automatically interpolates between a set of pitched samples. Pass in an object which maps the note's pitch or midi value to the url, then you can trigger the attack and release of that note like other instruments. By automatically repitching the samples, it is possible to play pitches which were not explicitly included which can save loading time.
		 *        For sample or buffer playback where repitching is not necessary, use [Tone.Player](https://tonejs.github.io/docs/Player).
		 * @param {Object} samples An object of samples mapping either Midi
		 *                         Note Numbers or Scientific Pitch Notation
		 *                         to the url of that sample.
		 * @example
		 * var sampler = new Tone.Sampler({
		 * 	"C3" : "path/to/C3.mp3",
		 * 	"D#3" : "path/to/Dsharp3.mp3",
		 * 	"F#3" : "path/to/Fsharp3.mp3",
		 * 	"A3" : "path/to/A3.mp3",
		 * }, function(){
		 * 	//sampler will repitch the closest sample
		 * 	sampler.triggerAttack("D3")
		 * })
		 * @extends {Tone.Instrument}
		 */
	    Tone.Sampler = function (urls) {
	        // shift arguments over one. Those are the remainder of the options
	        var args = Array.prototype.slice.call(arguments);
	        args.shift();
	        var options = Tone.defaults(args, [
	            'onload',
	            'baseUrl'
	        ], Tone.Sampler);
	        Tone.Instrument.call(this, options);
	        var urlMap = {};
	        for (var note in urls) {
	            if (Tone.isNote(note)) {
	                //convert the note name to MIDI
	                var mid = Tone.Frequency(note).toMidi();
	                urlMap[mid] = urls[note];
	            } else if (!isNaN(parseFloat(note))) {
	                //otherwise if it's numbers assume it's midi
	                urlMap[note] = urls[note];
	            } else {
	                throw new Error('Tone.Sampler: url keys must be the note\'s pitch');
	            }
	        }
	        /**
			 * The stored and loaded buffers
			 * @type {Tone.Buffers}
			 * @private
			 */
	        this._buffers = new Tone.Buffers(urlMap, options.onload, options.baseUrl);
	        /**
			 * The object of all currently playing BufferSources
			 * @type {Object}
			 * @private
			 */
	        this._activeSources = {};
	        /**
			 * The envelope applied to the beginning of the sample.
			 * @type {Time}
			 */
	        this.attack = options.attack;
	        /**
			 * The envelope applied to the end of the envelope.
			 * @type {Time}
			 */
	        this.release = options.release;
	    };
	    Tone.extend(Tone.Sampler, Tone.Instrument);
	    /**
		 * The defaults
		 * @const
		 * @type {Object}
		 */
	    Tone.Sampler.defaults = {
	        attack: 0,
	        release: 0.1,
	        onload: Tone.noOp,
	        baseUrl: ''
	    };
	    /**
		 * Returns the difference in steps between the given midi note at the closets sample.
		 * @param  {Midi} midi
		 * @return {Interval}
		 * @private
		 */
	    Tone.Sampler.prototype._findClosest = function (midi) {
	        var MAX_INTERVAL = 24;
	        var interval = 0;
	        while (interval < MAX_INTERVAL) {
	            // check above and below
	            if (this._buffers.has(midi + interval)) {
	                return -interval;
	            } else if (this._buffers.has(midi - interval)) {
	                return interval;
	            }
	            interval++;
	        }
	        return null;
	    };
	    /**
		 * @param  {Frequency} note     The note to play
		 * @param  {Time=} time     When to play the note
		 * @param  {NormalRange=} velocity The velocity to play the sample back.
		 * @return {Tone.Sampler}          this
		 */
	    Tone.Sampler.prototype.triggerAttack = function (note, time, velocity) {
	        var midi = Tone.Frequency(note).toMidi();
	        // find the closest note pitch
	        var difference = this._findClosest(midi);
	        if (difference !== null) {
	            var closestNote = midi - difference;
	            var buffer = this._buffers.get(closestNote);
	            // play that note
	            var source = new Tone.BufferSource({
	                'buffer': buffer,
	                'playbackRate': Tone.intervalToFrequencyRatio(difference),
	                'fadeIn': this.attack,
	                'fadeOut': this.release,
	                'curve': 'exponential'
	            }).connect(this.output);
	            source.start(time, 0, buffer.duration, velocity);
	            // add it to the active sources
	            if (!Tone.isArray(this._activeSources[midi])) {
	                this._activeSources[midi] = [];
	            }
	            this._activeSources[midi].push({
	                note: midi,
	                source: source
	            });
	        }
	        return this;
	    };
	    /**
		 * @param  {Frequency} note     The note to release.
		 * @param  {Time=} time     	When to release the note.
		 * @return {Tone.Sampler}	this
		 */
	    Tone.Sampler.prototype.triggerRelease = function (note, time) {
	        var midi = Tone.Frequency(note).toMidi();
	        // find the note
	        if (this._activeSources[midi] && this._activeSources[midi].length) {
	            var source = this._activeSources[midi].shift().source;
	            time = this.toSeconds(time);
	            source.stop(time + this.release, this.release);
	        }
	    };
	    /**
		 * Invoke the attack phase, then after the duration, invoke the release.
		 * @param  {Frequency} note     The note to play
		 * @param  {Time} duration The time the note should be held
		 * @param  {Time=} time     When to start the attack
		 * @param  {NormalRange} [velocity=1] The velocity of the attack
		 * @return {Tone.Sampler}          this
		 */
	    Tone.Sampler.prototype.triggerAttackRelease = function (note, duration, time, velocity) {
	        time = this.toSeconds(time);
	        duration = this.toSeconds(duration);
	        this.triggerAttack(note, time, velocity);
	        this.triggerRelease(note, time + duration);
	        return this;
	    };
	    /**
		 *  Add a note to the sampler.
		 *  @param  {Note|Midi}   note      The buffer's pitch.
		 *  @param  {String|Tone.Buffer|Audiobuffer}  url  Either the url of the bufer,
		 *                                                 or a buffer which will be added
		 *                                                 with the given name.
		 *  @param  {Function=}  callback  The callback to invoke
		 *                                 when the url is loaded.
		 */
	    Tone.Sampler.prototype.add = function (note, url, callback) {
	        if (Tone.isNote(note)) {
	            //convert the note name to MIDI
	            var mid = Tone.Frequency(note).toMidi();
	            this._buffers.add(mid, url, callback);
	        } else if (!isNaN(parseFloat(note))) {
	            //otherwise if it's numbers assume it's midi
	            this._buffers.add(note, url, callback);
	        } else {
	            throw new Error('Tone.Sampler: note must be the note\'s pitch. Instead got ' + note);
	        }
	    };
	    /**
		 * If the buffers are loaded or not
		 * @memberOf Tone.Sampler#
		 * @type {Boolean}
		 * @name loaded
		 * @readOnly
		 */
	    Object.defineProperty(Tone.Sampler.prototype, 'loaded', {
	        get: function () {
	            return this._buffers.loaded;
	        }
	    });
	    /**
		 * Clean up
		 * @return {Tone.Sampler} this
		 */
	    Tone.Sampler.prototype.dispose = function () {
	        Tone.Instrument.prototype.dispose.call(this);
	        this._buffers.dispose();
	        this._buffers = null;
	        for (var midi in this._activeSources) {
	            this._activeSources[midi].forEach(function (event) {
	                event.source.dispose();
	            });
	        }
	        this._activeSources = null;
	        return this;
	    };
	    return Tone.Sampler;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Maps a NormalRange [0, 1] to an AudioRange [-1, 1]. 
		 *         See also Tone.AudioToGain. 
		 *
		 *  @extends {Tone.SignalBase}
		 *  @constructor
		 *  @example
		 * var g2a = new Tone.GainToAudio();
		 */
	    Tone.GainToAudio = function () {
	        Tone.SignalBase.call(this);
	        /**
			 *  @type {WaveShaperNode}
			 *  @private
			 */
	        this._norm = this.input = this.output = new Tone.WaveShaper(function (x) {
	            return Math.abs(x) * 2 - 1;
	        });
	    };
	    Tone.extend(Tone.GainToAudio, Tone.SignalBase);
	    /**
		 *  clean up
		 *  @returns {Tone.GainToAudio} this
		 */
	    Tone.GainToAudio.prototype.dispose = function () {
	        Tone.SignalBase.prototype.dispose.call(this);
	        this._norm.dispose();
	        this._norm = null;
	        return this;
	    };
	    return Tone.GainToAudio;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class Normalize takes an input min and max and maps it linearly to NormalRange [0,1]
		 *
		 *  @extends {Tone.SignalBase}
		 *  @constructor
		 *  @param {number} inputMin the min input value
		 *  @param {number} inputMax the max input value
		 *  @example
		 * var norm = new Tone.Normalize(2, 4);
		 * var sig = new Tone.Signal(3).connect(norm);
		 * //output of norm is 0.5. 
		 */
	    Tone.Normalize = function (inputMin, inputMax) {
	        Tone.SignalBase.call(this);
	        /**
			 *  the min input value
			 *  @type {number}
			 *  @private
			 */
	        this._inputMin = Tone.defaultArg(inputMin, 0);
	        /**
			 *  the max input value
			 *  @type {number}
			 *  @private
			 */
	        this._inputMax = Tone.defaultArg(inputMax, 1);
	        /**
			 *  subtract the min from the input
			 *  @type {Tone.Add}
			 *  @private
			 */
	        this._sub = this.input = new Tone.Add(0);
	        /**
			 *  divide by the difference between the input and output
			 *  @type {Tone.Multiply}
			 *  @private
			 */
	        this._div = this.output = new Tone.Multiply(1);
	        this._sub.connect(this._div);
	        this._setRange();
	    };
	    Tone.extend(Tone.Normalize, Tone.SignalBase);
	    /**
		 * The minimum value the input signal will reach.
		 * @memberOf Tone.Normalize#
		 * @type {number}
		 * @name min
		 */
	    Object.defineProperty(Tone.Normalize.prototype, 'min', {
	        get: function () {
	            return this._inputMin;
	        },
	        set: function (min) {
	            this._inputMin = min;
	            this._setRange();
	        }
	    });
	    /**
		 * The maximum value the input signal will reach.
		 * @memberOf Tone.Normalize#
		 * @type {number}
		 * @name max
		 */
	    Object.defineProperty(Tone.Normalize.prototype, 'max', {
	        get: function () {
	            return this._inputMax;
	        },
	        set: function (max) {
	            this._inputMax = max;
	            this._setRange();
	        }
	    });
	    /**
		 *  set the values
		 *  @private
		 */
	    Tone.Normalize.prototype._setRange = function () {
	        this._sub.value = -this._inputMin;
	        this._div.value = 1 / (this._inputMax - this._inputMin);
	    };
	    /**
		 *  clean up
		 *  @returns {Tone.Normalize} this
		 */
	    Tone.Normalize.prototype.dispose = function () {
	        Tone.SignalBase.prototype.dispose.call(this);
	        this._sub.dispose();
	        this._sub = null;
	        this._div.dispose();
	        this._div = null;
	        return this;
	    };
	    return Tone.Normalize;
	});
	Module(function (Tone) {
	    /**
		 * @class Tone.TransportTimelineSignal extends Tone.TimelineSignal, but adds the ability to synchronize the signal to the signal to the Tone.Transport
		 * @extends {Tone.TimelineSignal}
		 */
	    Tone.TransportTimelineSignal = function () {
	        Tone.TimelineSignal.apply(this, arguments);
	        /**
			 * The real signal output
			 * @type {Tone.Signal}
			 * @private
			 */
	        this.output = this._outputSig = new Tone.Signal(this._initial);
	        /**
			 * Keep track of the last value. (small optimization)
			 * @private
			 * @type {Number}
			 */
	        this._lastVal = this.value;
	        /**
			 * The event id of the tick update loop
			 * @private
			 * @type {Number}
			 */
	        this._synced = Tone.Transport.scheduleRepeat(this._onTick.bind(this), '1i');
	        /**
			 * A bound version of the anchor value methods
			 * @type {Function}
			 * @private
			 */
	        this._bindAnchorValue = this._anchorValue.bind(this);
	        Tone.Transport.on('start stop pause', this._bindAnchorValue);
	        this._events.memory = Infinity;
	    };
	    Tone.extend(Tone.TransportTimelineSignal, Tone.TimelineSignal);
	    /**
		 * Callback which is invoked every tick.
		 * @private
		 * @param  {Number} time
		 * @return {Tone.TransportTimelineSignal}      this
		 */
	    Tone.TransportTimelineSignal.prototype._onTick = function (time) {
	        var val = this.getValueAtTime(Tone.Transport.seconds);
	        if (this._lastVal !== val) {
	            this._lastVal = val;
	            //approximate ramp curves with linear ramps
	            this._outputSig.linearRampToValueAtTime(val, time);
	        }
	    };
	    /**
		 * Anchor the value at the start and stop of the Transport
		 * @param  {Number} time The time of the event
		 * @return {Tone.TransportTimelineSignal}      this
		 * @private
		 */
	    Tone.TransportTimelineSignal.prototype._anchorValue = function (time) {
	        var val = this.getValueAtTime(Tone.Transport.ticks);
	        this._lastVal = val;
	        this._outputSig.cancelScheduledValues(time);
	        this._outputSig.setValueAtTime(val, time);
	        return this;
	    };
	    /**
		 *  Get the scheduled value at the given time. This will
		 *  return the unconverted (raw) value.
		 *  @param  {TransportTime}  time  The time in seconds.
		 *  @return  {Number}  The scheduled value at the given time.
		 */
	    Tone.TransportTimelineSignal.prototype.getValueAtTime = function (time) {
	        time = this.toTicks(time);
	        return Tone.TimelineSignal.prototype.getValueAtTime.call(this, time);
	    };
	    /**
		 * Set the output of the signal at the given time
		 * @param  {Number} value The value to change to at the given time
		 * @param  {TransportTime} time  The time to change the signal
		 * @return {Tone.TransportTimelineSignal}       this
		 */
	    Tone.TransportTimelineSignal.prototype.setValueAtTime = function (value, time) {
	        time = this.toTicks(time);
	        Tone.TimelineSignal.prototype.setValueAtTime.call(this, value, time);
	        return this;
	    };
	    /**
		 * Linear ramp to the given value from the previous scheduled point to the given value
		 * @param  {Number} value The value to change to at the given time
		 * @param  {TransportTime} time  The time to change the signal
		 * @return {Tone.TransportTimelineSignal}       this
		 */
	    Tone.TransportTimelineSignal.prototype.linearRampToValueAtTime = function (value, time) {
	        time = this.toTicks(time);
	        Tone.TimelineSignal.prototype.linearRampToValueAtTime.call(this, value, time);
	        return this;
	    };
	    /**
		 * Exponential ramp to the given value from the previous scheduled point to the given value
		 * @param  {Number} value The value to change to at the given time
		 * @param  {TransportTime} time  The time to change the signal
		 * @return {Tone.TransportTimelineSignal}       this
		 */
	    Tone.TransportTimelineSignal.prototype.exponentialRampToValueAtTime = function (value, time) {
	        time = this.toTicks(time);
	        Tone.TimelineSignal.prototype.exponentialRampToValueAtTime.call(this, value, time);
	        return this;
	    };
	    /**
		 *  Start exponentially approaching the target value at the given time with
		 *  a rate having the given time constant.
		 *  @param {number} value
		 *  @param {TransportTime} startTime
		 *  @param {number} timeConstant
		 * @return {Tone.TransportTimelineSignal}       this
		 */
	    Tone.TransportTimelineSignal.prototype.setTargetAtTime = function (value, startTime, timeConstant) {
	        startTime = this.toTicks(startTime);
	        Tone.TimelineSignal.prototype.setTargetAtTime.call(this, value, startTime, timeConstant);
	        return this;
	    };
	    /**
		 *  Cancels all scheduled parameter changes with times greater than or
		 *  equal to startTime.
		 *  @param  {TransportTime} startTime
		 *  @returns {Tone.Param} this
		 */
	    Tone.TransportTimelineSignal.prototype.cancelScheduledValues = function (startTime) {
	        startTime = this.toTicks(startTime);
	        Tone.TimelineSignal.prototype.cancelScheduledValues.call(this, startTime);
	        return this;
	    };
	    /**
		 *  Set an array of arbitrary values starting at the given time for the given duration.
		 *  @param {Float32Array} values
		 *  @param {Time} startTime
		 *  @param {Time} duration
		 *  @param {NormalRange} [scaling=1] If the values in the curve should be scaled by some value
		 *  @returns {Tone.TimelineSignal} this
		 */
	    Tone.TransportTimelineSignal.prototype.setValueCurveAtTime = function (values, startTime, duration, scaling) {
	        startTime = this.toTicks(startTime);
	        duration = this.toTicks(duration);
	        Tone.TimelineSignal.prototype.setValueCurveAtTime.call(this, values, startTime, duration, scaling);
	        return this;
	    };
	    /**
		 * Dispose and disconnect
		 * @return {Tone.TransportTimelineSignal} this
		 */
	    Tone.TransportTimelineSignal.prototype.dispose = function () {
	        Tone.Transport.clear(this._synced);
	        Tone.Transport.off('start stop pause', this._syncedCallback);
	        this._events.cancel(0);
	        Tone.TimelineSignal.prototype.dispose.call(this);
	        this._outputSig.dispose();
	        this._outputSig = null;
	    };
	    return Tone.TransportTimelineSignal;
	});
	Module(function (Tone) {
	    /**
		 *  @class Tone.MultiPlayer is well suited for one-shots, multi-sampled instruments
		 *         or any time you need to play a bunch of audio buffers. 
		 *
		 *  @deprecated Use [Tone.Players](Players) instead.
		 *  @param  {Object|Array|Tone.Buffers}  buffers  The buffers which are available
		 *                                                to the MultiPlayer
		 *  @param {Function} onload The callback to invoke when all of the buffers are loaded.
		 *  @extends {Tone}
		 *  @example
		 * var multiPlayer = new MultiPlayer({
		 * 	"kick" : "path/to/kick.mp3",
		 * 	"snare" : "path/to/snare.mp3",
		 * }, function(){
		 * 	multiPlayer.start("kick");
		 * });
		 *  @example
		 * //can also store the values in an array
		 * var multiPlayer = new MultiPlayer(["path/to/kick.mp3", "path/to/snare.mp3"], 
		 * function(){
		 * 	//if an array is passed in, the samples are referenced to by index
		 * 	multiPlayer.start(1);
		 * });
		 */
	    Tone.MultiPlayer = function (urls) {
	        console.warn('Tone.MultiPlayer is deprecated. Use Tone.Players instead.');
	        //remove the urls from the options
	        if (arguments.length === 1 && !Tone.isUndef(arguments[0]) && !arguments[0].hasOwnProperty('urls')) {
	            urls = { 'urls': urls };
	        }
	        var options = Tone.defaults(arguments, [
	            'urls',
	            'onload'
	        ], Tone.MultiPlayer);
	        Tone.Source.call(this, options);
	        if (options.urls instanceof Tone.Buffers) {
	            /**
				 *  All the buffers belonging to the player.
				 *  @type  {Tone.Buffers}
				 */
	            this.buffers = options.urls;
	        } else {
	            this.buffers = new Tone.Buffers(options.urls, options.onload);
	        }
	        /**
			 *  Keeps track of the currently playing sources.
			 *  @type  {Object}
			 *  @private
			 */
	        this._activeSources = {};
	        /**
			 *  The fade in envelope which is applied
			 *  to the beginning of the BufferSource
			 *  @type  {Time}
			 */
	        this.fadeIn = options.fadeIn;
	        /**
			 *  The fade out envelope which is applied
			 *  to the end of the BufferSource
			 *  @type  {Time}
			 */
	        this.fadeOut = options.fadeOut;
	    };
	    Tone.extend(Tone.MultiPlayer, Tone.Source);
	    /**
		 *  The defaults
		 *  @type  {Object}
		 */
	    Tone.MultiPlayer.defaults = {
	        'onload': Tone.noOp,
	        'fadeIn': 0,
	        'fadeOut': 0
	    };
	    /**
		 * Make the source from the buffername
		 * @param  {String} bufferName
		 * @return {Tone.BufferSource}
		 * @private
		 */
	    Tone.MultiPlayer.prototype._makeSource = function (bufferName) {
	        var buffer;
	        if (Tone.isString(bufferName) || Tone.isNumber(bufferName)) {
	            buffer = this.buffers.get(bufferName).get();
	        } else if (bufferName instanceof Tone.Buffer) {
	            buffer = bufferName.get();
	        } else if (bufferName instanceof AudioBuffer) {
	            buffer = bufferName;
	        }
	        var source = new Tone.BufferSource(buffer).connect(this.output);
	        if (!this._activeSources.hasOwnProperty(bufferName)) {
	            this._activeSources[bufferName] = [];
	        }
	        this._activeSources[bufferName].push(source);
	        return source;
	    };
	    /**
		 *  Start a buffer by name. The `start` method allows a number of options
		 *  to be passed in such as offset, interval, and gain. This is good for multi-sampled 
		 *  instruments and sound sprites where samples are repitched played back at different velocities.
		 *  @param  {String}  bufferName    The name of the buffer to start.
		 *  @param  {Time}  time      When to start the buffer.
		 *  @param  {Time}  [offset=0]    The offset into the buffer to play from.
		 *  @param  {Time=}  duration   How long to play the buffer for.
		 *  @param  {Interval}  [pitch=0]  The interval to repitch the buffer.
		 *  @param  {Gain}  [gain=1]      The gain to play the sample at.
		 *  @return  {Tone.MultiPlayer}  this
		 */
	    Tone.MultiPlayer.prototype.start = function (bufferName, time, offset, duration, pitch, gain) {
	        time = this.toSeconds(time);
	        var source = this._makeSource(bufferName);
	        source.start(time, offset, duration, Tone.defaultArg(gain, 1), this.fadeIn);
	        if (duration) {
	            source.stop(time + this.toSeconds(duration), this.fadeOut);
	        }
	        pitch = Tone.defaultArg(pitch, 0);
	        source.playbackRate.value = Tone.intervalToFrequencyRatio(pitch);
	        return this;
	    };
	    /**
		 *  Start a looping buffer by name. Similar to `start`, but the buffer
		 *  is looped instead of played straight through. Can still be stopped with `stop`. 
		 *  @param  {String}  bufferName    The name of the buffer to start.
		 *  @param  {Time}  time      When to start the buffer.
		 *  @param  {Time}  [offset=0]    The offset into the buffer to play from.
		 *  @param  {Time=}  loopStart   The start of the loop.
		 *  @param  {Time=}  loopEnd	The end of the loop.
		 *  @param  {Interval}  [pitch=0]  The interval to repitch the buffer.
		 *  @param  {Gain}  [gain=1]      The gain to play the sample at.
		 *  @return  {Tone.MultiPlayer}  this
		 */
	    Tone.MultiPlayer.prototype.startLoop = function (bufferName, time, offset, loopStart, loopEnd, pitch, gain) {
	        time = this.toSeconds(time);
	        var source = this._makeSource(bufferName);
	        source.loop = true;
	        source.loopStart = this.toSeconds(Tone.defaultArg(loopStart, 0));
	        source.loopEnd = this.toSeconds(Tone.defaultArg(loopEnd, 0));
	        source.start(time, offset, undefined, Tone.defaultArg(gain, 1), this.fadeIn);
	        pitch = Tone.defaultArg(pitch, 0);
	        source.playbackRate.value = Tone.intervalToFrequencyRatio(pitch);
	        return this;
	    };
	    /**
		 *  Stop the first played instance of the buffer name.
		 *  @param  {String}  bufferName  The buffer to stop.
		 *  @param  {Time=}  time    When to stop the buffer
		 *  @return  {Tone.MultiPlayer}  this
		 */
	    Tone.MultiPlayer.prototype.stop = function (bufferName, time) {
	        if (this._activeSources[bufferName] && this._activeSources[bufferName].length) {
	            time = this.toSeconds(time);
	            this._activeSources[bufferName].shift().stop(time, this.fadeOut);
	        } else {
	            throw new Error('Tone.MultiPlayer: cannot stop a buffer that hasn\'t been started or is already stopped');
	        }
	        return this;
	    };
	    /**
		 *  Stop all currently playing buffers at the given time.
		 *  @param  {Time=}  time  When to stop the buffers.
		 *  @return  {Tone.MultiPlayer}  this
		 */
	    Tone.MultiPlayer.prototype.stopAll = function (time) {
	        time = this.toSeconds(time);
	        for (var bufferName in this._activeSources) {
	            var sources = this._activeSources[bufferName];
	            for (var i = 0; i < sources.length; i++) {
	                sources[i].stop(time);
	            }
	        }
	        return this;
	    };
	    /**
		 *  Add another buffer to the available buffers.
		 *  @param {String} name The name to that the buffer is refered
		 *                       to in start/stop methods. 
		 *  @param {String|Tone.Buffer} url The url of the buffer to load
		 *                                  or the buffer.
		 *  @param {Function} callback The function to invoke after the buffer is loaded.
		 */
	    Tone.MultiPlayer.prototype.add = function (name, url, callback) {
	        this.buffers.add(name, url, callback);
	        return this;
	    };
	    /**
		 *  Returns the playback state of the source. "started"
		 *  if there are any buffers playing. "stopped" otherwise.
		 *  @type {Tone.State}
		 *  @readOnly
		 *  @memberOf Tone.MultiPlayer#
		 *  @name state
		 */
	    Object.defineProperty(Tone.MultiPlayer.prototype, 'state', {
	        get: function () {
	            return this._activeSources.length > 0 ? Tone.State.Started : Tone.State.Stopped;
	        }
	    });
	    /**
		 * Mute the output. 
		 * @memberOf Tone.MultiPlayer#
		 * @type {boolean}
		 * @name mute
		 * @example
		 * //mute the output
		 * source.mute = true;
		 */
	    Object.defineProperty(Tone.MultiPlayer.prototype, 'mute', {
	        get: function () {
	            return this._volume.mute;
	        },
	        set: function (mute) {
	            this._volume.mute = mute;
	        }
	    });
	    /**
		 *  Clean up.
		 *  @return  {Tone.MultiPlayer}  this
		 */
	    Tone.MultiPlayer.prototype.dispose = function () {
	        Tone.Source.prototype.dispose.call(this);
	        for (var bufferName in this._activeSources) {
	            this._activeSources[bufferName].forEach(function (source) {
	                source.dispose();
	            });
	        }
	        this.buffers.dispose();
	        this.buffers = null;
	        this._activeSources = null;
	        return this;
	    };
	    return Tone.MultiPlayer;
	});
	Module(function (Tone) {
	    /**
		 * @class Tone.GrainPlayer implements [granular synthesis](https://en.wikipedia.org/wiki/Granular_synthesis).
		 *        Granular Synthesis enables you to adjust pitch and playback rate independently. The grainSize is the
		 *        amount of time each small chunk of audio is played for and the overlap is the
		 *        amount of crossfading transition time between successive grains.
		 * @extends {Tone.Source}
		 * @param {String|Tone.Buffer} url	The url to load, or the Tone.Buffer to play.
		 * @param {Function=} callback The callback to invoke after the url is loaded.
		 */
	    Tone.GrainPlayer = function () {
	        var options = Tone.defaults(arguments, [
	            'url',
	            'onload'
	        ], Tone.GrainPlayer);
	        Tone.Source.call(this, options);
	        /**
			 *  The audio buffer belonging to the player.
			 *  @type  {Tone.Buffer}
			 */
	        this.buffer = new Tone.Buffer(options.url, options.onload);
	        /**
			 *  Create a repeating tick to schedule
			 *  the grains.
			 *  @type  {Tone.Clock}
			 *  @private
			 */
	        this._clock = new Tone.Clock(this._tick.bind(this), options.grainSize);
	        /**
			 *  @type  {Number}
			 *  @private
			 */
	        this._loopStart = 0;
	        /**
			 *  @type  {Number}
			 *  @private
			 */
	        this._loopEnd = 0;
	        /**
			 * All of the currently playing BufferSources
			 * @type {Array}
			 * @private
			 */
	        this._activeSources = [];
	        /**
			 *  @type  {Number}
			 *  @private
			 */
	        this._playbackRate = options.playbackRate;
	        /**
			 *  @type  {Number}
			 *  @private
			 */
	        this._grainSize = options.grainSize;
	        /**
			 *  @private
			 *  @type {Number}
			 */
	        this._overlap = options.overlap;
	        /**
			 *  Adjust the pitch independently of the playbackRate.
			 *  @type  {Cents}
			 */
	        this.detune = options.detune;
	        //setup
	        this.overlap = options.overlap;
	        this.loop = options.loop;
	        this.playbackRate = options.playbackRate;
	        this.grainSize = options.grainSize;
	        this.loopStart = options.loopStart;
	        this.loopEnd = options.loopEnd;
	        this.reverse = options.reverse;
	        this._clock.on('stop', this._onstop.bind(this));
	    };
	    Tone.extend(Tone.GrainPlayer, Tone.Source);
	    /**
		 *  the default parameters
		 *  @static
		 *  @const
		 *  @type {Object}
		 */
	    Tone.GrainPlayer.defaults = {
	        'onload': Tone.noOp,
	        'overlap': 0.1,
	        'grainSize': 0.2,
	        'playbackRate': 1,
	        'detune': 0,
	        'loop': false,
	        'loopStart': 0,
	        'loopEnd': 0,
	        'reverse': false
	    };
	    /**
		 *  Play the buffer at the given startTime. Optionally add an offset
		 *  and/or duration which will play the buffer from a position
		 *  within the buffer for the given duration.
		 *
		 *  @param  {Time} [startTime=now] When the player should start.
		 *  @param  {Time} [offset=0] The offset from the beginning of the sample
		 *                                 to start at.
		 *  @param  {Time=} duration How long the sample should play. If no duration
		 *                                is given, it will default to the full length
		 *                                of the sample (minus any offset)
		 *  @returns {Tone.GrainPlayer} this
		 *  @memberOf Tone.GrainPlayer#
		 *  @method start
		 *  @name start
		 */
	    /**
		 *  Internal start method
		 *  @param {Time} time
		 *  @param {Time} offset
		 *  @private
		 */
	    Tone.GrainPlayer.prototype._start = function (time, offset, duration) {
	        offset = Tone.defaultArg(offset, 0);
	        offset = this.toSeconds(offset);
	        time = this.toSeconds(time);
	        this._offset = offset;
	        this._clock.start(time);
	        if (duration) {
	            this.stop(time + this.toSeconds(duration));
	        }
	    };
	    /**
		 *  Internal start method
		 *  @param {Time} time
		 *  @private
		 */
	    Tone.GrainPlayer.prototype._stop = function (time) {
	        this._clock.stop(time);
	    };
	    /**
		 * Invoked when the clock is stopped
		 * @param  {Number} time
		 * @private
		 */
	    Tone.GrainPlayer.prototype._onstop = function (time) {
	        //stop the players
	        this._activeSources.forEach(function (source) {
	            source.stop(time, 0);
	        });
	    };
	    /**
		 *  Invoked on each clock tick. scheduled a new
		 *  grain at this time.
		 *  @param  {Time}  time
		 *  @private
		 */
	    Tone.GrainPlayer.prototype._tick = function (time) {
	        var fadeIn = this._offset < this._overlap ? 0 : this._overlap;
	        var source = new Tone.BufferSource({
	            'buffer': this.buffer,
	            'fadeIn': fadeIn,
	            'fadeOut': this._overlap,
	            'loop': this.loop,
	            'loopStart': this._loopStart,
	            'loopEnd': this._loopEnd,
	            'playbackRate': Tone.intervalToFrequencyRatio(this.detune / 100)
	        }).connect(this.output);
	        source.start(time, this._offset);
	        this._offset += this.grainSize;
	        source.stop(time + this.grainSize);
	        //add it to the active sources
	        this._activeSources.push(source);
	        //remove it when it's done
	        source.onended = function () {
	            var index = this._activeSources.indexOf(source);
	            if (index !== -1) {
	                this._activeSources.splice(index, 1);
	            }
	        }.bind(this);
	    };
	    /**
		 *  Jump to a specific time and play it.
		 *  @param  {Time}  offset  The offset to jump to.
		 *  @param {Time=} time When to make the jump.
		 *  @return  {Tone.GrainPlayer}  this
		 */
	    Tone.GrainPlayer.prototype.seek = function (offset, time) {
	        this._offset = this.toSeconds(offset);
	        this._tick(this.toSeconds(time));
	        return this;
	    };
	    /**
		 * The playback rate of the sample
		 * @memberOf Tone.GrainPlayer#
		 * @type {Positive}
		 * @name playbackRate
		 */
	    Object.defineProperty(Tone.GrainPlayer.prototype, 'playbackRate', {
	        get: function () {
	            return this._playbackRate;
	        },
	        set: function (rate) {
	            this._playbackRate = rate;
	            this.grainSize = this._grainSize;
	        }
	    });
	    /**
		 * The loop start time.
		 * @memberOf Tone.GrainPlayer#
		 * @type {Time}
		 * @name loopStart
		 */
	    Object.defineProperty(Tone.GrainPlayer.prototype, 'loopStart', {
	        get: function () {
	            return this._loopStart;
	        },
	        set: function (time) {
	            this._loopStart = this.toSeconds(time);
	        }
	    });
	    /**
		 * The loop end time.
		 * @memberOf Tone.GrainPlayer#
		 * @type {Time}
		 * @name loopEnd
		 */
	    Object.defineProperty(Tone.GrainPlayer.prototype, 'loopEnd', {
	        get: function () {
	            return this._loopEnd;
	        },
	        set: function (time) {
	            this._loopEnd = this.toSeconds(time);
	        }
	    });
	    /**
		 * The direction the buffer should play in
		 * @memberOf Tone.GrainPlayer#
		 * @type {boolean}
		 * @name reverse
		 */
	    Object.defineProperty(Tone.GrainPlayer.prototype, 'reverse', {
	        get: function () {
	            return this.buffer.reverse;
	        },
	        set: function (rev) {
	            this.buffer.reverse = rev;
	        }
	    });
	    /**
		 * The size of each chunk of audio that the
		 * buffer is chopped into and played back at.
		 * @memberOf Tone.GrainPlayer#
		 * @type {Time}
		 * @name grainSize
		 */
	    Object.defineProperty(Tone.GrainPlayer.prototype, 'grainSize', {
	        get: function () {
	            return this._grainSize;
	        },
	        set: function (size) {
	            this._grainSize = this.toSeconds(size);
	            this._clock.frequency.value = this._playbackRate / this._grainSize;
	        }
	    });
	    /**
		 * This is the duration of the cross-fade between
		 * sucessive grains.
		 * @memberOf Tone.GrainPlayer#
		 * @type {Time}
		 * @name overlap
		 */
	    Object.defineProperty(Tone.GrainPlayer.prototype, 'overlap', {
	        get: function () {
	            return this._overlap;
	        },
	        set: function (time) {
	            this._overlap = this.toSeconds(time);
	        }
	    });
	    /**
		 * Clean up
		 * @return {Tone.GrainPlayer} this
		 */
	    Tone.GrainPlayer.prototype.dispose = function () {
	        Tone.Source.prototype.dispose.call(this);
	        this.buffer.dispose();
	        this.buffer = null;
	        this._clock.dispose();
	        this._clock = null;
	        this._activeSources.forEach(function (source) {
	            source.dispose();
	        });
	        this._activeSources = null;
	        return this;
	    };
	    return Tone.GrainPlayer;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Tone.Player is an audio file player with start, loop, and stop functions.
		 *  
		 *  @constructor
		 *  @extends {Tone.Source} 
		 *  @param {string|AudioBuffer} url Either the AudioBuffer or the url from
		 *                                  which to load the AudioBuffer
		 *  @param {function=} onload The function to invoke when the buffer is loaded. 
		 *                            Recommended to use Tone.Buffer.on('load') instead.
		 *  @example
		 * var player = new Tone.Player("./path/to/sample.mp3").toMaster();
		 * //play as soon as the buffer is loaded
		 * player.autostart = true;
		 */
	    Tone.Player = function (url) {
	        var options;
	        if (url instanceof Tone.Buffer) {
	            url = url.get();
	            options = Tone.Player.defaults;
	        } else {
	            options = Tone.defaults(arguments, [
	                'url',
	                'onload'
	            ], Tone.Player);
	        }
	        Tone.Source.call(this, options);
	        /**
			 *  @private
			 *  @type {AudioBufferSourceNode}
			 */
	        this._source = null;
	        /**
			 *  If the file should play as soon
			 *  as the buffer is loaded. 
			 *  @type {boolean}
			 *  @example
			 * //will play as soon as it's loaded
			 * var player = new Tone.Player({
			 * 	"url" : "./path/to/sample.mp3",
			 * 	"autostart" : true,
			 * }).toMaster();
			 */
	        this.autostart = options.autostart;
	        /**
			 *  the buffer
			 *  @private
			 *  @type {Tone.Buffer}
			 */
	        this._buffer = new Tone.Buffer({
	            'url': options.url,
	            'onload': this._onload.bind(this, options.onload),
	            'reverse': options.reverse
	        });
	        if (url instanceof AudioBuffer) {
	            this._buffer.set(url);
	        }
	        /**
			 *  if the buffer should loop once it's over
			 *  @type {boolean}
			 *  @private
			 */
	        this._loop = options.loop;
	        /**
			 *  if 'loop' is true, the loop will start at this position
			 *  @type {Time}
			 *  @private
			 */
	        this._loopStart = options.loopStart;
	        /**
			 *  if 'loop' is true, the loop will end at this position
			 *  @type {Time}
			 *  @private
			 */
	        this._loopEnd = options.loopEnd;
	        /**
			 *  the playback rate
			 *  @private
			 *  @type {number}
			 */
	        this._playbackRate = options.playbackRate;
	        /**
			 *  Enabling retrigger will allow a player to be restarted
			 *  before the the previous 'start' is done playing. Otherwise, 
			 *  successive calls to Tone.Player.start will only start
			 *  the sample if it had played all the way through. 
			 *  @type {boolean}
			 */
	        this.retrigger = options.retrigger;
	        /**
			 *  The fadeIn time of the amplitude envelope.
			 *  @type {Time}
			 */
	        this.fadeIn = options.fadeIn;
	        /**
			 *  The fadeOut time of the amplitude envelope.
			 *  @type {Time}
			 */
	        this.fadeOut = options.fadeOut;
	    };
	    Tone.extend(Tone.Player, Tone.Source);
	    /**
		 *  the default parameters
		 *  @static
		 *  @const
		 *  @type {Object}
		 */
	    Tone.Player.defaults = {
	        'onload': Tone.noOp,
	        'playbackRate': 1,
	        'loop': false,
	        'autostart': false,
	        'loopStart': 0,
	        'loopEnd': 0,
	        'retrigger': false,
	        'reverse': false,
	        'fadeIn': 0,
	        'fadeOut': 0
	    };
	    /**
		 *  Load the audio file as an audio buffer.
		 *  Decodes the audio asynchronously and invokes
		 *  the callback once the audio buffer loads. 
		 *  Note: this does not need to be called if a url
		 *  was passed in to the constructor. Only use this
		 *  if you want to manually load a new url. 
		 * @param {string} url The url of the buffer to load.
		 *                     Filetype support depends on the
		 *                     browser.
		 *  @param  {function=} callback The function to invoke once
		 *                               the sample is loaded.
		 *  @returns {Promise}
		 */
	    Tone.Player.prototype.load = function (url, callback) {
	        return this._buffer.load(url, this._onload.bind(this, callback));
	    };
	    /**
		 * Internal callback when the buffer is loaded.
		 * @private
		 */
	    Tone.Player.prototype._onload = function (callback) {
	        callback = Tone.defaultArg(callback, Tone.noOp);
	        callback(this);
	        if (this.autostart) {
	            this.start();
	        }
	    };
	    /**
		 *  Play the buffer at the given startTime. Optionally add an offset
		 *  and/or duration which will play the buffer from a position
		 *  within the buffer for the given duration. 
		 *  
		 *  @param  {Time} [startTime=now] When the player should start.
		 *  @param  {Time} [offset=0] The offset from the beginning of the sample
		 *                                 to start at. 
		 *  @param  {Time=} duration How long the sample should play. If no duration
		 *                                is given, it will default to the full length 
		 *                                of the sample (minus any offset)
		 *  @returns {Tone.Player} this
		 *  @memberOf Tone.Player#
		 *  @method start
		 *  @name start
		 */
	    /**
		 *  Internal start method
		 *  @private
		 */
	    Tone.Player.prototype._start = function (startTime, offset, duration) {
	        //if it's a loop the default offset is the loopstart point
	        if (this._loop) {
	            offset = Tone.defaultArg(offset, this._loopStart);
	        } else {
	            //otherwise the default offset is 0
	            offset = Tone.defaultArg(offset, 0);
	        }
	        //compute the values in seconds
	        offset = this.toSeconds(offset);
	        duration = Tone.defaultArg(duration, Math.max(this._buffer.duration - offset, 0));
	        duration = this.toSeconds(duration);
	        startTime = this.toSeconds(startTime);
	        // //make the source
	        this._source = new Tone.BufferSource({
	            'buffer': this._buffer,
	            'loop': this._loop,
	            'loopStart': this._loopStart,
	            'loopEnd': this._loopEnd,
	            'playbackRate': this._playbackRate,
	            'fadeIn': this.fadeIn,
	            'fadeOut': this.fadeOut
	        }).connect(this.output);
	        //set the looping properties
	        if (!this._loop && !this._synced) {
	            //if it's not looping, set the state change at the end of the sample
	            this._state.setStateAtTime(Tone.State.Stopped, startTime + duration);
	        }
	        //start it
	        if (this._loop) {
	            this._source.start(startTime, offset);
	        } else {
	            this._source.start(startTime, offset, duration);
	        }
	        return this;
	    };
	    /**
		 *  Stop playback.
		 *  @private
		 *  @param  {Time} [time=now]
		 *  @returns {Tone.Player} this
		 */
	    Tone.Player.prototype._stop = function (time) {
	        if (this._source) {
	            this._source.stop(this.toSeconds(time));
	        }
	        return this;
	    };
	    /**
		 *  Seek to a specific time in the player's buffer. If the 
		 *  source is no longer playing at that time, it will stop.
		 *  If you seek to a time that 
		 *  @param {Time} offset The time to seek to.
		 *  @param {Time=} time The time for the seek event to occur.
		 *  @return {Tone.Player} this
		 *  @example
		 * source.start(0.2);
		 * source.stop(0.4);
		 */
	    Tone.Player.prototype.seek = function (offset, time) {
	        time = this.toSeconds(time);
	        if (this._state.getValueAtTime(time) === Tone.State.Started) {
	            offset = this.toSeconds(offset);
	            // if it's currently playing, stop it
	            this._stop(time);
	            //restart it at the given time
	            this._start(time, offset);
	        }
	        return this;
	    };
	    /**
		 *  Set the loop start and end. Will only loop if loop is 
		 *  set to true. 
		 *  @param {Time} loopStart The loop end time
		 *  @param {Time} loopEnd The loop end time
		 *  @returns {Tone.Player} this
		 *  @example
		 * //loop 0.1 seconds of the file. 
		 * player.setLoopPoints(0.2, 0.3);
		 * player.loop = true;
		 */
	    Tone.Player.prototype.setLoopPoints = function (loopStart, loopEnd) {
	        this.loopStart = loopStart;
	        this.loopEnd = loopEnd;
	        return this;
	    };
	    /**
		 * If loop is true, the loop will start at this position. 
		 * @memberOf Tone.Player#
		 * @type {Time}
		 * @name loopStart
		 */
	    Object.defineProperty(Tone.Player.prototype, 'loopStart', {
	        get: function () {
	            return this._loopStart;
	        },
	        set: function (loopStart) {
	            this._loopStart = loopStart;
	            if (this._source) {
	                this._source.loopStart = this.toSeconds(loopStart);
	            }
	        }
	    });
	    /**
		 * If loop is true, the loop will end at this position.
		 * @memberOf Tone.Player#
		 * @type {Time}
		 * @name loopEnd
		 */
	    Object.defineProperty(Tone.Player.prototype, 'loopEnd', {
	        get: function () {
	            return this._loopEnd;
	        },
	        set: function (loopEnd) {
	            this._loopEnd = loopEnd;
	            if (this._source) {
	                this._source.loopEnd = this.toSeconds(loopEnd);
	            }
	        }
	    });
	    /**
		 * The audio buffer belonging to the player. 
		 * @memberOf Tone.Player#
		 * @type {Tone.Buffer}
		 * @name buffer
		 */
	    Object.defineProperty(Tone.Player.prototype, 'buffer', {
	        get: function () {
	            return this._buffer;
	        },
	        set: function (buffer) {
	            this._buffer.set(buffer);
	        }
	    });
	    /**
		 * If the buffer should loop once it's over. 
		 * @memberOf Tone.Player#
		 * @type {boolean}
		 * @name loop
		 */
	    Object.defineProperty(Tone.Player.prototype, 'loop', {
	        get: function () {
	            return this._loop;
	        },
	        set: function (loop) {
	            this._loop = loop;
	            if (this._source) {
	                this._source.loop = loop;
	            }
	        }
	    });
	    /**
		 * The playback speed. 1 is normal speed. This is not a signal because
		 * Safari and iOS currently don't support playbackRate as a signal.
		 * @memberOf Tone.Player#
		 * @type {number}
		 * @name playbackRate
		 */
	    Object.defineProperty(Tone.Player.prototype, 'playbackRate', {
	        get: function () {
	            return this._playbackRate;
	        },
	        set: function (rate) {
	            this._playbackRate = rate;
	            if (this._source) {
	                this._source.playbackRate.value = rate;
	            }
	        }
	    });
	    /**
		 * The direction the buffer should play in
		 * @memberOf Tone.Player#
		 * @type {boolean}
		 * @name reverse
		 */
	    Object.defineProperty(Tone.Player.prototype, 'reverse', {
	        get: function () {
	            return this._buffer.reverse;
	        },
	        set: function (rev) {
	            this._buffer.reverse = rev;
	        }
	    });
	    /**
		 * If all the buffer is loaded
		 * @memberOf Tone.Player#
		 * @type {Boolean}
		 * @name loaded
		 * @readOnly
		 */
	    Object.defineProperty(Tone.Player.prototype, 'loaded', {
	        get: function () {
	            return this._buffer.loaded;
	        }
	    });
	    /**
		 *  Dispose and disconnect.
		 *  @return {Tone.Player} this
		 */
	    Tone.Player.prototype.dispose = function () {
	        Tone.Source.prototype.dispose.call(this);
	        if (this._source !== null) {
	            this._source.disconnect();
	            this._source = null;
	        }
	        this._buffer.dispose();
	        this._buffer = null;
	        return this;
	    };
	    return Tone.Player;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Tone.Players combines multiple [Tone.Player](Player) objects.
		 *
		 *  @constructor
		 *  @extends {Tone.AudioNode}
		 *  @param {Object} urls An object mapping a name to a url.
		 *  @param {function=} onload The function to invoke when the buffer is loaded.
		 */
	    Tone.Players = function (urls) {
	        var args = Array.prototype.slice.call(arguments);
	        args.shift();
	        var options = Tone.defaults(args, ['onload'], Tone.Players);
	        Tone.call(this);
	        /**
			 *  The output volume node
			 *  @type  {Tone.Volume}
			 *  @private
			 */
	        this._volume = this.output = new Tone.Volume(options.volume);
	        /**
			 * The volume of the output in decibels.
			 * @type {Decibels}
			 * @signal
			 * @example
			 * source.volume.value = -6;
			 */
	        this.volume = this._volume.volume;
	        this._readOnly('volume');
	        //make the output explicitly stereo
	        this._volume.output.output.channelCount = 2;
	        this._volume.output.output.channelCountMode = 'explicit';
	        //mute initially
	        this.mute = options.mute;
	        /**
			 * The container of all of the players
			 * @type {Object}
			 * @private
			 */
	        this._players = {};
	        /**
			 * The loading count
			 * @type {Number}
			 * @private
			 */
	        this._loadingCount = 0;
	        /**
			 * private holder of the fadeIn time
			 * @type {Time}
			 * @private
			 */
	        this._fadeIn = options.fadeIn;
	        /**
			 * private holder of the fadeOut time
			 * @type {Time}
			 * @private
			 */
	        this._fadeOut = options.fadeOut;
	        //add all of the players
	        for (var name in urls) {
	            this._loadingCount++;
	            this.add(name, urls[name], this._bufferLoaded.bind(this, options.onload));
	        }
	    };
	    Tone.extend(Tone.Players, Tone.AudioNode);
	    /**
		 * The default values
		 * @type {Object}
		 */
	    Tone.Players.defaults = {
	        'volume': 0,
	        'mute': false,
	        'onload': Tone.noOp,
	        'fadeIn': 0,
	        'fadeOut': 0
	    };
	    /**
		 *  A buffer was loaded. decrement the counter.
		 *  @param  {Function}  callback
		 *  @private
		 */
	    Tone.Players.prototype._bufferLoaded = function (callback) {
	        this._loadingCount--;
	        if (this._loadingCount === 0 && callback) {
	            callback(this);
	        }
	    };
	    /**
		 * Mute the output.
		 * @memberOf Tone.Source#
		 * @type {boolean}
		 * @name mute
		 * @example
		 * //mute the output
		 * source.mute = true;
		 */
	    Object.defineProperty(Tone.Players.prototype, 'mute', {
	        get: function () {
	            return this._volume.mute;
	        },
	        set: function (mute) {
	            this._volume.mute = mute;
	        }
	    });
	    /**
		 * The fadeIn time of the amplitude envelope.
		 * @memberOf Tone.Source#
		 * @type {Time}
		 * @name fadeIn
		 */
	    Object.defineProperty(Tone.Players.prototype, 'fadeIn', {
	        get: function () {
	            return this._fadeIn;
	        },
	        set: function (fadeIn) {
	            this._fadeIn = fadeIn;
	            this._forEach(function (player) {
	                player.fadeIn = fadeIn;
	            });
	        }
	    });
	    /**
		 * The fadeOut time of the amplitude envelope.
		 * @memberOf Tone.Source#
		 * @type {Time}
		 * @name fadeOut
		 */
	    Object.defineProperty(Tone.Players.prototype, 'fadeOut', {
	        get: function () {
	            return this._fadeOut;
	        },
	        set: function (fadeOut) {
	            this._fadeOut = fadeOut;
	            this._forEach(function (player) {
	                player.fadeOut = fadeOut;
	            });
	        }
	    });
	    /**
		 * The state of the players object. Returns "started" if any of the players are playing.
		 * @memberOf Tone.Players#
		 * @type {String}
		 * @name state
		 * @readOnly
		 */
	    Object.defineProperty(Tone.Players.prototype, 'state', {
	        get: function () {
	            var playing = false;
	            this._forEach(function (player) {
	                playing = playing || player.state === Tone.State.Started;
	            });
	            return playing ? Tone.State.Started : Tone.State.Stopped;
	        }
	    });
	    /**
		 *  True if the buffers object has a buffer by that name.
		 *  @param  {String|Number}  name  The key or index of the
		 *                                 buffer.
		 *  @return  {Boolean}
		 */
	    Tone.Players.prototype.has = function (name) {
	        return this._players.hasOwnProperty(name);
	    };
	    /**
		 *  Get a player by name.
		 *  @param  {String}  name  The players name as defined in
		 *                          the constructor object or `add` method.
		 *  @return  {Tone.Player}
		 */
	    Tone.Players.prototype.get = function (name) {
	        if (this.has(name)) {
	            return this._players[name];
	        } else {
	            throw new Error('Tone.Players: no player named ' + name);
	        }
	    };
	    /**
		 * Iterate over all of the players
		 * @param  {Function} callback
		 * @return {Tone.Players}            this
		 * @private
		 */
	    Tone.Players.prototype._forEach = function (callback) {
	        for (var playerName in this._players) {
	            callback(this._players[playerName], playerName);
	        }
	        return this;
	    };
	    /**
		 * If all the buffers are loaded or not
		 * @memberOf Tone.Players#
		 * @type {Boolean}
		 * @name loaded
		 * @readOnly
		 */
	    Object.defineProperty(Tone.Players.prototype, 'loaded', {
	        get: function () {
	            var isLoaded = true;
	            this._forEach(function (player) {
	                isLoaded = isLoaded && player.loaded;
	            });
	            return isLoaded;
	        }
	    });
	    /**
		 *  Add a player by name and url to the Players
		 *  @param  {String}    name      A unique name to give the player
		 *  @param  {String|Tone.Buffer|Audiobuffer}  url  Either the url of the bufer,
		 *                                                 or a buffer which will be added
		 *                                                 with the given name.
		 *  @param  {Function=}  callback  The callback to invoke
		 *                                 when the url is loaded.
		 */
	    Tone.Players.prototype.add = function (name, url, callback) {
	        this._players[name] = new Tone.Player(url, callback).connect(this.output);
	        this._players[name].fadeIn = this._fadeIn;
	        this._players[name].fadeOut = this._fadeOut;
	        return this;
	    };
	    /**
		 * Stop all of the players at the given time
		 * @param {Time} time The time to stop all of the players.
		 * @return {Tone.Players} this
		 */
	    Tone.Players.prototype.stopAll = function (time) {
	        this._forEach(function (player) {
	            player.stop(time);
	        });
	    };
	    /**
		 *  Dispose and disconnect.
		 *  @return {Tone.Players} this
		 */
	    Tone.Players.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this._volume.dispose();
	        this._volume = null;
	        this._writable('volume');
	        this.volume = null;
	        this.output = null;
	        this._forEach(function (player) {
	            player.dispose();
	        });
	        this._players = null;
	        return this;
	    };
	    return Tone.Players;
	});
	Module(function (Tone) {
	    
	    /**
		 *  @class  Tone.UserMedia uses MediaDevices.getUserMedia to open up
		 *          and external microphone or audio input. Check
		 *          [MediaDevices API Support](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
		 *          to see which browsers are supported. Access to an external input
		 *          is limited to secure (HTTPS) connections.
		 *
		 *  @constructor
		 *  @extends {Tone.AudioNode}
		 *  @param {Decibels=} volume The level of the input
		 *  @example
		 * //list the inputs and open the third one
		 * var motu = new Tone.UserMedia();
		 *
		 * //opening the input asks the user to activate their mic
		 * motu.open().then(function(){
		 * 	//opening is activates the microphone
		 * 	//starting lets audio through
		 * 	motu.start(10);
		 * });
		 */
	    Tone.UserMedia = function () {
	        var options = Tone.defaults(arguments, ['volume'], Tone.UserMedia);
	        Tone.AudioNode.call(this);
	        /**
			 *  The MediaStreamNode
			 *  @type {MediaStreamAudioSourceNode}
			 *  @private
			 */
	        this._mediaStream = null;
	        /**
			 *  The media stream created by getUserMedia.
			 *  @type {LocalMediaStream}
			 *  @private
			 */
	        this._stream = null;
	        /**
			 *  The open device
			 *  @type  {MediaDeviceInfo}
			 *  @private
			 */
	        this._device = null;
	        /**
			 *  The output volume node
			 *  @type  {Tone.Volume}
			 *  @private
			 */
	        this._volume = this.output = new Tone.Volume(options.volume);
	        /**
			 * The volume of the output in decibels.
			 * @type {Decibels}
			 * @signal
			 * @example
			 * input.volume.value = -6;
			 */
	        this.volume = this._volume.volume;
	        this._readOnly('volume');
	        this.mute = options.mute;
	    };
	    Tone.extend(Tone.UserMedia, Tone.AudioNode);
	    /**
		 * the default parameters
		 * @type {Object}
		 */
	    Tone.UserMedia.defaults = {
	        'volume': 0,
	        'mute': false
	    };
	    /**
		 *  Open the media stream. If a string is passed in, it is assumed
		 *  to be the label or id of the stream, if a number is passed in,
		 *  it is the input number of the stream.
		 *  @param  {String|Number} [labelOrId="default"] The label or id of the audio input media device.
		 *                                                With no argument, the default stream is opened.
		 *  @return {Promise} The promise is resolved when the stream is open.
		 */
	    Tone.UserMedia.prototype.open = function (labelOrId) {
	        labelOrId = Tone.defaultArg(labelOrId, 'default');
	        return Tone.UserMedia.enumerateDevices().then(function (devices) {
	            var device;
	            if (Tone.isNumber(labelOrId)) {
	                device = devices[labelOrId];
	            } else {
	                device = devices.find(function (device) {
	                    return device.label === labelOrId || device.deviceId === labelOrId;
	                });
	                //didn't find a matching device
	                if (!device) {
	                    throw new Error('Tone.UserMedia: no matching device: ' + labelOrId);
	                }
	            }
	            this._device = device;
	            //do getUserMedia
	            var constraints = {
	                audio: {
	                    'deviceId': device.deviceId,
	                    'echoCancellation': false,
	                    'sampleRate': this.context.sampleRate
	                }
	            };
	            return navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
	                //start a new source only if the previous one is closed
	                if (!this._stream) {
	                    this._stream = stream;
	                    //Wrap a MediaStreamSourceNode around the live input stream.
	                    this._mediaStream = this.context.createMediaStreamSource(stream);
	                    //Connect the MediaStreamSourceNode to a gate gain node
	                    this._mediaStream.connect(this.output);
	                }
	                return this;
	            }.bind(this));
	        }.bind(this));
	    };
	    /**
		 *  Close the media stream
		 *  @return {Tone.UserMedia} this
		 */
	    Tone.UserMedia.prototype.close = function () {
	        if (this._stream) {
	            this._stream.getAudioTracks().forEach(function (track) {
	                track.stop();
	            });
	            this._stream = null;
	            //remove the old media stream
	            this._mediaStream.disconnect();
	            this._mediaStream = null;
	        }
	        this._device = null;
	        return this;
	    };
	    /**
		 *  Returns a promise which resolves with the list of audio input devices available.
		 *  @return {Promise} The promise that is resolved with the devices
		 *  @static
		 *  @example
		 * Tone.UserMedia.enumerateDevices().then(function(devices){
		 * 	console.log(devices)
		 * })
		 */
	    Tone.UserMedia.enumerateDevices = function () {
	        return navigator.mediaDevices.enumerateDevices().then(function (devices) {
	            return devices.filter(function (device) {
	                return device.kind === 'audioinput';
	            });
	        });
	    };
	    /**
		 *  Returns the playback state of the source, "started" when the microphone is open
		 *  and "stopped" when the mic is closed.
		 *  @type {Tone.State}
		 *  @readOnly
		 *  @memberOf Tone.UserMedia#
		 *  @name state
		 */
	    Object.defineProperty(Tone.UserMedia.prototype, 'state', {
	        get: function () {
	            return this._stream && this._stream.active ? Tone.State.Started : Tone.State.Stopped;
	        }
	    });
	    /**
		 * 	Returns an identifier for the represented device that is
		 * 	persisted across sessions. It is un-guessable by other applications and
		 * 	unique to the origin of the calling application. It is reset when the
		 * 	user clears cookies (for Private Browsing, a different identifier is
		 * 	used that is not persisted across sessions). Returns undefined when the
		 * 	device is not open.
		 *  @type {String}
		 *  @readOnly
		 *  @memberOf Tone.UserMedia#
		 *  @name deviceId
		 */
	    Object.defineProperty(Tone.UserMedia.prototype, 'deviceId', {
	        get: function () {
	            if (this._device) {
	                return this._device.deviceId;
	            }
	        }
	    });
	    /**
		 * 	Returns a group identifier. Two devices have the
		 * 	same group identifier if they belong to the same physical device.
		 * 	Returns undefined when the device is not open.
		 *  @type {String}
		 *  @readOnly
		 *  @memberOf Tone.UserMedia#
		 *  @name groupId
		 */
	    Object.defineProperty(Tone.UserMedia.prototype, 'groupId', {
	        get: function () {
	            if (this._device) {
	                return this._device.groupId;
	            }
	        }
	    });
	    /**
		 * 	Returns a label describing this device (for example "Built-in Microphone").
		 * 	Returns undefined when the device is not open or label is not available
		 * 	because of permissions.
		 *  @type {String}
		 *  @readOnly
		 *  @memberOf Tone.UserMedia#
		 *  @name groupId
		 */
	    Object.defineProperty(Tone.UserMedia.prototype, 'label', {
	        get: function () {
	            if (this._device) {
	                return this._device.label;
	            }
	        }
	    });
	    /**
		 * Mute the output.
		 * @memberOf Tone.UserMedia#
		 * @type {boolean}
		 * @name mute
		 * @example
		 * //mute the output
		 * userMedia.mute = true;
		 */
	    Object.defineProperty(Tone.UserMedia.prototype, 'mute', {
	        get: function () {
	            return this._volume.mute;
	        },
	        set: function (mute) {
	            this._volume.mute = mute;
	        }
	    });
	    /**
		 * Clean up.
		 * @return {Tone.UserMedia} this
		 */
	    Tone.UserMedia.prototype.dispose = function () {
	        Tone.AudioNode.prototype.dispose.call(this);
	        this.close();
	        this._writable('volume');
	        this._volume.dispose();
	        this._volume = null;
	        this.volume = null;
	        return this;
	    };
	    /**
		 *  If getUserMedia is supported by the browser.
		 *  @type  {Boolean}
		 *  @memberOf Tone.UserMedia#
		 *  @name supported
		 *  @static
		 *  @readOnly
		 */
	    Object.defineProperty(Tone.UserMedia, 'supported', {
	        get: function () {
	            return !Tone.isUndef(navigator.mediaDevices) && Tone.isFunction(navigator.mediaDevices.getUserMedia);
	        }
	    });
	    return Tone.UserMedia;
	});
	
	return Tone;
}));

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_fp__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_fp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Tone__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Tone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_Tone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scoring_concatScores__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scoring_getScore__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__scoring_mixScores__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__playback_player__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__playback_sequencer__ = __webpack_require__(17);








function wrapScoringFunction(fn) {
  return fn.length === 1
    ? (thing) => fn(Object(__WEBPACK_IMPORTED_MODULE_3__scoring_getScore__["a" /* default */])(thing))
    : __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.curry((options, thing) => fn(options, Object(__WEBPACK_IMPORTED_MODULE_3__scoring_getScore__["a" /* default */])(thing)))
}

function getDefaultAudioContext() {
  return window.__umAudioContext ||
    (window.__umAudioContext = new AudioContext())
}

// Scoring functions

function config(opts, score) {
  return __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.set('config', __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.merge(score.config || {}, opts), score)
}

function loop(score) {
  return __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.set('loop', true, score)
}

function mix(...args) {
  return Object(__WEBPACK_IMPORTED_MODULE_4__scoring_mixScores__["a" /* default */])(args)
}

function offset(amount, score) {
  score = __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.cloneDeep(score)
  score.actions.forEach(({ payload, type }) => {
    if (type === 'NOOP') { return }
    payload.offset = amount
  })
  return score
}

function part(callback, score) {
  score = __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.cloneDeep(score)
  score.actions.forEach(({ payload, type }) => {
    if (type === 'NOOP') { return }
    payload.callback = callback
  })
  return score
}

function seq(...args) {
  let [fns, scores] = __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.partition(__WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.isFunction, args)
  return __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.pipe(fns)(Object(__WEBPACK_IMPORTED_MODULE_2__scoring_concatScores__["a" /* default */])(scores))
}

function tempo(bpm, score) {
  return __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.set('tempo', bpm, score)
}

////////////////////////////////////////////////////////////////////////////////

function Unmusic(audioContext = getDefaultAudioContext()) {
  __WEBPACK_IMPORTED_MODULE_1_Tone___default.a.context = audioContext
  let sequencer = Object(__WEBPACK_IMPORTED_MODULE_6__playback_sequencer__["a" /* default */])()
  let player = Object(__WEBPACK_IMPORTED_MODULE_5__playback_player__["a" /* default */])(sequencer)

  // um itself is the seq function
  let um = seq
  um.audioContext = audioContext
  um.config = wrapScoringFunction(config)
  um.loop = wrapScoringFunction(loop)
  um.mix = mix
  um.offset = wrapScoringFunction(offset)
  um.part = wrapScoringFunction(part)
  um.play = player.play
  um.seq = seq
  um.stop = player.stop
  um.tempo = wrapScoringFunction(tempo)

  return um
}

/* harmony default export */ __webpack_exports__["default"] = (Unmusic);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * @license
 * Lodash lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 */
;(function(){function n(n,t,r){switch(r.length){case 0:return n.call(t);case 1:return n.call(t,r[0]);case 2:return n.call(t,r[0],r[1]);case 3:return n.call(t,r[0],r[1],r[2])}return n.apply(t,r)}function t(n,t,r,e){for(var u=-1,i=null==n?0:n.length;++u<i;){var o=n[u];t(e,o,r(o),n)}return e}function r(n,t){for(var r=-1,e=null==n?0:n.length;++r<e&&false!==t(n[r],r,n););return n}function e(n,t){for(var r=null==n?0:n.length;r--&&false!==t(n[r],r,n););return n}function u(n,t){for(var r=-1,e=null==n?0:n.length;++r<e;)if(!t(n[r],r,n))return false;
return true}function i(n,t){for(var r=-1,e=null==n?0:n.length,u=0,i=[];++r<e;){var o=n[r];t(o,r,n)&&(i[u++]=o)}return i}function o(n,t){return!(null==n||!n.length)&&-1<v(n,t,0)}function f(n,t,r){for(var e=-1,u=null==n?0:n.length;++e<u;)if(r(t,n[e]))return true;return false}function c(n,t){for(var r=-1,e=null==n?0:n.length,u=Array(e);++r<e;)u[r]=t(n[r],r,n);return u}function a(n,t){for(var r=-1,e=t.length,u=n.length;++r<e;)n[u+r]=t[r];return n}function l(n,t,r,e){var u=-1,i=null==n?0:n.length;for(e&&i&&(r=n[++u]);++u<i;)r=t(r,n[u],u,n);
return r}function s(n,t,r,e){var u=null==n?0:n.length;for(e&&u&&(r=n[--u]);u--;)r=t(r,n[u],u,n);return r}function h(n,t){for(var r=-1,e=null==n?0:n.length;++r<e;)if(t(n[r],r,n))return true;return false}function p(n,t,r){var e;return r(n,function(n,r,u){if(t(n,r,u))return e=r,false}),e}function _(n,t,r,e){var u=n.length;for(r+=e?1:-1;e?r--:++r<u;)if(t(n[r],r,n))return r;return-1}function v(n,t,r){if(t===t)n:{--r;for(var e=n.length;++r<e;)if(n[r]===t){n=r;break n}n=-1}else n=_(n,d,r);return n}function g(n,t,r,e){
--r;for(var u=n.length;++r<u;)if(e(n[r],t))return r;return-1}function d(n){return n!==n}function y(n,t){var r=null==n?0:n.length;return r?m(n,t)/r:F}function b(n){return function(t){return null==t?T:t[n]}}function x(n){return function(t){return null==n?T:n[t]}}function j(n,t,r,e,u){return u(n,function(n,u,i){r=e?(e=false,n):t(r,n,u,i)}),r}function w(n,t){var r=n.length;for(n.sort(t);r--;)n[r]=n[r].c;return n}function m(n,t){for(var r,e=-1,u=n.length;++e<u;){var i=t(n[e]);i!==T&&(r=r===T?i:r+i)}return r;
}function A(n,t){for(var r=-1,e=Array(n);++r<n;)e[r]=t(r);return e}function k(n,t){return c(t,function(t){return[t,n[t]]})}function E(n){return function(t){return n(t)}}function S(n,t){return c(t,function(t){return n[t]})}function O(n,t){return n.has(t)}function I(n,t){for(var r=-1,e=n.length;++r<e&&-1<v(t,n[r],0););return r}function R(n,t){for(var r=n.length;r--&&-1<v(t,n[r],0););return r}function z(n){return"\\"+Cn[n]}function W(n){var t=-1,r=Array(n.size);return n.forEach(function(n,e){r[++t]=[e,n];
}),r}function B(n,t){return function(r){return n(t(r))}}function L(n,t){for(var r=-1,e=n.length,u=0,i=[];++r<e;){var o=n[r];o!==t&&"__lodash_placeholder__"!==o||(n[r]="__lodash_placeholder__",i[u++]=r)}return i}function U(n){var t=-1,r=Array(n.size);return n.forEach(function(n){r[++t]=n}),r}function C(n){var t=-1,r=Array(n.size);return n.forEach(function(n){r[++t]=[n,n]}),r}function D(n){if(Rn.test(n)){for(var t=On.lastIndex=0;On.test(n);)++t;n=t}else n=Qn(n);return n}function M(n){return Rn.test(n)?n.match(On)||[]:n.split("");
}var T,$=1/0,F=NaN,N=[["ary",128],["bind",1],["bindKey",2],["curry",8],["curryRight",16],["flip",512],["partial",32],["partialRight",64],["rearg",256]],P=/\b__p\+='';/g,Z=/\b(__p\+=)''\+/g,q=/(__e\(.*?\)|\b__t\))\+'';/g,V=/&(?:amp|lt|gt|quot|#39);/g,K=/[&<>"']/g,G=RegExp(V.source),H=RegExp(K.source),J=/<%-([\s\S]+?)%>/g,Y=/<%([\s\S]+?)%>/g,Q=/<%=([\s\S]+?)%>/g,X=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,nn=/^\w*$/,tn=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,rn=/[\\^$.*+?()[\]{}|]/g,en=RegExp(rn.source),un=/^\s+|\s+$/g,on=/^\s+/,fn=/\s+$/,cn=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,an=/\{\n\/\* \[wrapped with (.+)\] \*/,ln=/,? & /,sn=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,hn=/\\(\\)?/g,pn=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,_n=/\w*$/,vn=/^[-+]0x[0-9a-f]+$/i,gn=/^0b[01]+$/i,dn=/^\[object .+?Constructor\]$/,yn=/^0o[0-7]+$/i,bn=/^(?:0|[1-9]\d*)$/,xn=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,jn=/($^)/,wn=/['\n\r\u2028\u2029\\]/g,mn="[\\ufe0e\\ufe0f]?(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?(?:\\u200d(?:[^\\ud800-\\udfff]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff])[\\ufe0e\\ufe0f]?(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?)*",An="(?:[\\u2700-\\u27bf]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff])"+mn,kn="(?:[^\\ud800-\\udfff][\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]?|[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\ud800-\\udfff])",En=RegExp("['\u2019]","g"),Sn=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]","g"),On=RegExp("\\ud83c[\\udffb-\\udfff](?=\\ud83c[\\udffb-\\udfff])|"+kn+mn,"g"),In=RegExp(["[A-Z\\xc0-\\xd6\\xd8-\\xde]?[a-z\\xdf-\\xf6\\xf8-\\xff]+(?:['\u2019](?:d|ll|m|re|s|t|ve))?(?=[\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000]|[A-Z\\xc0-\\xd6\\xd8-\\xde]|$)|(?:[A-Z\\xc0-\\xd6\\xd8-\\xde]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?(?=[\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000]|[A-Z\\xc0-\\xd6\\xd8-\\xde](?:[a-z\\xdf-\\xf6\\xf8-\\xff]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])|$)|[A-Z\\xc0-\\xd6\\xd8-\\xde]?(?:[a-z\\xdf-\\xf6\\xf8-\\xff]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['\u2019](?:d|ll|m|re|s|t|ve))?|[A-Z\\xc0-\\xd6\\xd8-\\xde]+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?|\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])|\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])|\\d+",An].join("|"),"g"),Rn=RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]"),zn=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,Wn="Array Buffer DataView Date Error Float32Array Float64Array Function Int8Array Int16Array Int32Array Map Math Object Promise RegExp Set String Symbol TypeError Uint8Array Uint8ClampedArray Uint16Array Uint32Array WeakMap _ clearTimeout isFinite parseInt setTimeout".split(" "),Bn={};
Bn["[object Float32Array]"]=Bn["[object Float64Array]"]=Bn["[object Int8Array]"]=Bn["[object Int16Array]"]=Bn["[object Int32Array]"]=Bn["[object Uint8Array]"]=Bn["[object Uint8ClampedArray]"]=Bn["[object Uint16Array]"]=Bn["[object Uint32Array]"]=true,Bn["[object Arguments]"]=Bn["[object Array]"]=Bn["[object ArrayBuffer]"]=Bn["[object Boolean]"]=Bn["[object DataView]"]=Bn["[object Date]"]=Bn["[object Error]"]=Bn["[object Function]"]=Bn["[object Map]"]=Bn["[object Number]"]=Bn["[object Object]"]=Bn["[object RegExp]"]=Bn["[object Set]"]=Bn["[object String]"]=Bn["[object WeakMap]"]=false;
var Ln={};Ln["[object Arguments]"]=Ln["[object Array]"]=Ln["[object ArrayBuffer]"]=Ln["[object DataView]"]=Ln["[object Boolean]"]=Ln["[object Date]"]=Ln["[object Float32Array]"]=Ln["[object Float64Array]"]=Ln["[object Int8Array]"]=Ln["[object Int16Array]"]=Ln["[object Int32Array]"]=Ln["[object Map]"]=Ln["[object Number]"]=Ln["[object Object]"]=Ln["[object RegExp]"]=Ln["[object Set]"]=Ln["[object String]"]=Ln["[object Symbol]"]=Ln["[object Uint8Array]"]=Ln["[object Uint8ClampedArray]"]=Ln["[object Uint16Array]"]=Ln["[object Uint32Array]"]=true,
Ln["[object Error]"]=Ln["[object Function]"]=Ln["[object WeakMap]"]=false;var Un,Cn={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},Dn=parseFloat,Mn=parseInt,Tn=typeof global=="object"&&global&&global.Object===Object&&global,$n=typeof self=="object"&&self&&self.Object===Object&&self,Fn=Tn||$n||Function("return this")(),Nn=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Pn=Nn&&typeof module=="object"&&module&&!module.nodeType&&module,Zn=Pn&&Pn.exports===Nn,qn=Zn&&Tn.process;
n:{try{Un=qn&&qn.binding&&qn.binding("util");break n}catch(n){}Un=void 0}var Vn=Un&&Un.isArrayBuffer,Kn=Un&&Un.isDate,Gn=Un&&Un.isMap,Hn=Un&&Un.isRegExp,Jn=Un&&Un.isSet,Yn=Un&&Un.isTypedArray,Qn=b("length"),Xn=x({"\xc0":"A","\xc1":"A","\xc2":"A","\xc3":"A","\xc4":"A","\xc5":"A","\xe0":"a","\xe1":"a","\xe2":"a","\xe3":"a","\xe4":"a","\xe5":"a","\xc7":"C","\xe7":"c","\xd0":"D","\xf0":"d","\xc8":"E","\xc9":"E","\xca":"E","\xcb":"E","\xe8":"e","\xe9":"e","\xea":"e","\xeb":"e","\xcc":"I","\xcd":"I","\xce":"I",
"\xcf":"I","\xec":"i","\xed":"i","\xee":"i","\xef":"i","\xd1":"N","\xf1":"n","\xd2":"O","\xd3":"O","\xd4":"O","\xd5":"O","\xd6":"O","\xd8":"O","\xf2":"o","\xf3":"o","\xf4":"o","\xf5":"o","\xf6":"o","\xf8":"o","\xd9":"U","\xda":"U","\xdb":"U","\xdc":"U","\xf9":"u","\xfa":"u","\xfb":"u","\xfc":"u","\xdd":"Y","\xfd":"y","\xff":"y","\xc6":"Ae","\xe6":"ae","\xde":"Th","\xfe":"th","\xdf":"ss","\u0100":"A","\u0102":"A","\u0104":"A","\u0101":"a","\u0103":"a","\u0105":"a","\u0106":"C","\u0108":"C","\u010a":"C",
"\u010c":"C","\u0107":"c","\u0109":"c","\u010b":"c","\u010d":"c","\u010e":"D","\u0110":"D","\u010f":"d","\u0111":"d","\u0112":"E","\u0114":"E","\u0116":"E","\u0118":"E","\u011a":"E","\u0113":"e","\u0115":"e","\u0117":"e","\u0119":"e","\u011b":"e","\u011c":"G","\u011e":"G","\u0120":"G","\u0122":"G","\u011d":"g","\u011f":"g","\u0121":"g","\u0123":"g","\u0124":"H","\u0126":"H","\u0125":"h","\u0127":"h","\u0128":"I","\u012a":"I","\u012c":"I","\u012e":"I","\u0130":"I","\u0129":"i","\u012b":"i","\u012d":"i",
"\u012f":"i","\u0131":"i","\u0134":"J","\u0135":"j","\u0136":"K","\u0137":"k","\u0138":"k","\u0139":"L","\u013b":"L","\u013d":"L","\u013f":"L","\u0141":"L","\u013a":"l","\u013c":"l","\u013e":"l","\u0140":"l","\u0142":"l","\u0143":"N","\u0145":"N","\u0147":"N","\u014a":"N","\u0144":"n","\u0146":"n","\u0148":"n","\u014b":"n","\u014c":"O","\u014e":"O","\u0150":"O","\u014d":"o","\u014f":"o","\u0151":"o","\u0154":"R","\u0156":"R","\u0158":"R","\u0155":"r","\u0157":"r","\u0159":"r","\u015a":"S","\u015c":"S",
"\u015e":"S","\u0160":"S","\u015b":"s","\u015d":"s","\u015f":"s","\u0161":"s","\u0162":"T","\u0164":"T","\u0166":"T","\u0163":"t","\u0165":"t","\u0167":"t","\u0168":"U","\u016a":"U","\u016c":"U","\u016e":"U","\u0170":"U","\u0172":"U","\u0169":"u","\u016b":"u","\u016d":"u","\u016f":"u","\u0171":"u","\u0173":"u","\u0174":"W","\u0175":"w","\u0176":"Y","\u0177":"y","\u0178":"Y","\u0179":"Z","\u017b":"Z","\u017d":"Z","\u017a":"z","\u017c":"z","\u017e":"z","\u0132":"IJ","\u0133":"ij","\u0152":"Oe","\u0153":"oe",
"\u0149":"'n","\u017f":"s"}),nt=x({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}),tt=x({"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"}),rt=function x(mn){function An(n){if(du(n)&&!of(n)&&!(n instanceof Un)){if(n instanceof On)return n;if(ii.call(n,"__wrapped__"))return $e(n)}return new On(n)}function kn(){}function On(n,t){this.__wrapped__=n,this.__actions__=[],this.__chain__=!!t,this.__index__=0,this.__values__=T}function Un(n){this.__wrapped__=n,this.__actions__=[],this.__dir__=1,
this.__filtered__=false,this.__iteratees__=[],this.__takeCount__=4294967295,this.__views__=[]}function Cn(n){var t=-1,r=null==n?0:n.length;for(this.clear();++t<r;){var e=n[t];this.set(e[0],e[1])}}function Tn(n){var t=-1,r=null==n?0:n.length;for(this.clear();++t<r;){var e=n[t];this.set(e[0],e[1])}}function $n(n){var t=-1,r=null==n?0:n.length;for(this.clear();++t<r;){var e=n[t];this.set(e[0],e[1])}}function Nn(n){var t=-1,r=null==n?0:n.length;for(this.__data__=new $n;++t<r;)this.add(n[t])}function Pn(n){
this.size=(this.__data__=new Tn(n)).size}function qn(n,t){var r,e=of(n),u=!e&&uf(n),i=!e&&!u&&cf(n),o=!e&&!u&&!i&&pf(n),u=(e=e||u||i||o)?A(n.length,Xu):[],f=u.length;for(r in n)!t&&!ii.call(n,r)||e&&("length"==r||i&&("offset"==r||"parent"==r)||o&&("buffer"==r||"byteLength"==r||"byteOffset"==r)||Se(r,f))||u.push(r);return u}function Qn(n){var t=n.length;return t?n[ir(0,t-1)]:T}function et(n,t){return Ce(Ur(n),pt(t,0,n.length))}function ut(n){return Ce(Ur(n))}function it(n,t,r){(r===T||au(n[t],r))&&(r!==T||t in n)||st(n,t,r);
}function ot(n,t,r){var e=n[t];ii.call(n,t)&&au(e,r)&&(r!==T||t in n)||st(n,t,r)}function ft(n,t){for(var r=n.length;r--;)if(au(n[r][0],t))return r;return-1}function ct(n,t,r,e){return eo(n,function(n,u,i){t(e,n,r(n),i)}),e}function at(n,t){return n&&Cr(t,zu(t),n)}function lt(n,t){return n&&Cr(t,Wu(t),n)}function st(n,t,r){"__proto__"==t&&mi?mi(n,t,{configurable:true,enumerable:true,value:r,writable:true}):n[t]=r}function ht(n,t){for(var r=-1,e=t.length,u=Vu(e),i=null==n;++r<e;)u[r]=i?T:Iu(n,t[r]);return u;
}function pt(n,t,r){return n===n&&(r!==T&&(n=n<=r?n:r),t!==T&&(n=n>=t?n:t)),n}function _t(n,t,e,u,i,o){var f,c=1&t,a=2&t,l=4&t;if(e&&(f=i?e(n,u,i,o):e(n)),f!==T)return f;if(!gu(n))return n;if(u=of(n)){if(f=me(n),!c)return Ur(n,f)}else{var s=_o(n),h="[object Function]"==s||"[object GeneratorFunction]"==s;if(cf(n))return Ir(n,c);if("[object Object]"==s||"[object Arguments]"==s||h&&!i){if(f=a||h?{}:Ae(n),!c)return a?Mr(n,lt(f,n)):Dr(n,at(f,n))}else{if(!Ln[s])return i?n:{};f=ke(n,s,c)}}if(o||(o=new Pn),
i=o.get(n))return i;if(o.set(n,f),hf(n))return n.forEach(function(r){f.add(_t(r,t,e,r,n,o))}),f;if(lf(n))return n.forEach(function(r,u){f.set(u,_t(r,t,e,u,n,o))}),f;var a=l?a?ve:_e:a?Wu:zu,p=u?T:a(n);return r(p||n,function(r,u){p&&(u=r,r=n[u]),ot(f,u,_t(r,t,e,u,n,o))}),f}function vt(n){var t=zu(n);return function(r){return gt(r,n,t)}}function gt(n,t,r){var e=r.length;if(null==n)return!e;for(n=Yu(n);e--;){var u=r[e],i=t[u],o=n[u];if(o===T&&!(u in n)||!i(o))return false}return true}function dt(n,t,r){if(typeof n!="function")throw new ni("Expected a function");
return yo(function(){n.apply(T,r)},t)}function yt(n,t,r,e){var u=-1,i=o,a=true,l=n.length,s=[],h=t.length;if(!l)return s;r&&(t=c(t,E(r))),e?(i=f,a=false):200<=t.length&&(i=O,a=false,t=new Nn(t));n:for(;++u<l;){var p=n[u],_=null==r?p:r(p),p=e||0!==p?p:0;if(a&&_===_){for(var v=h;v--;)if(t[v]===_)continue n;s.push(p)}else i(t,_,e)||s.push(p)}return s}function bt(n,t){var r=true;return eo(n,function(n,e,u){return r=!!t(n,e,u)}),r}function xt(n,t,r){for(var e=-1,u=n.length;++e<u;){var i=n[e],o=t(i);if(null!=o&&(f===T?o===o&&!ju(o):r(o,f)))var f=o,c=i;
}return c}function jt(n,t){var r=[];return eo(n,function(n,e,u){t(n,e,u)&&r.push(n)}),r}function wt(n,t,r,e,u){var i=-1,o=n.length;for(r||(r=Ee),u||(u=[]);++i<o;){var f=n[i];0<t&&r(f)?1<t?wt(f,t-1,r,e,u):a(u,f):e||(u[u.length]=f)}return u}function mt(n,t){return n&&io(n,t,zu)}function At(n,t){return n&&oo(n,t,zu)}function kt(n,t){return i(t,function(t){return pu(n[t])})}function Et(n,t){t=Sr(t,n);for(var r=0,e=t.length;null!=n&&r<e;)n=n[De(t[r++])];return r&&r==e?n:T}function St(n,t,r){return t=t(n),
of(n)?t:a(t,r(n))}function Ot(n){if(null==n)n=n===T?"[object Undefined]":"[object Null]";else if(wi&&wi in Yu(n)){var t=ii.call(n,wi),r=n[wi];try{n[wi]=T;var e=true}catch(n){}var u=ci.call(n);e&&(t?n[wi]=r:delete n[wi]),n=u}else n=ci.call(n);return n}function It(n,t){return n>t}function Rt(n,t){return null!=n&&ii.call(n,t)}function zt(n,t){return null!=n&&t in Yu(n)}function Wt(n,t,r){for(var e=r?f:o,u=n[0].length,i=n.length,a=i,l=Vu(i),s=1/0,h=[];a--;){var p=n[a];a&&t&&(p=c(p,E(t))),s=Ui(p.length,s),
l[a]=!r&&(t||120<=u&&120<=p.length)?new Nn(a&&p):T}var p=n[0],_=-1,v=l[0];n:for(;++_<u&&h.length<s;){var g=p[_],d=t?t(g):g,g=r||0!==g?g:0;if(v?!O(v,d):!e(h,d,r)){for(a=i;--a;){var y=l[a];if(y?!O(y,d):!e(n[a],d,r))continue n}v&&v.push(d),h.push(g)}}return h}function Bt(n,t,r){var e={};return mt(n,function(n,u,i){t(e,r(n),u,i)}),e}function Lt(t,r,e){return r=Sr(r,t),t=2>r.length?t:Et(t,hr(r,0,-1)),r=null==t?t:t[De(qe(r))],null==r?T:n(r,t,e)}function Ut(n){return du(n)&&"[object Arguments]"==Ot(n)}function Ct(n){
return du(n)&&"[object ArrayBuffer]"==Ot(n)}function Dt(n){return du(n)&&"[object Date]"==Ot(n)}function Mt(n,t,r,e,u){if(n===t)t=true;else if(null==n||null==t||!du(n)&&!du(t))t=n!==n&&t!==t;else n:{var i=of(n),o=of(t),f=i?"[object Array]":_o(n),c=o?"[object Array]":_o(t),f="[object Arguments]"==f?"[object Object]":f,c="[object Arguments]"==c?"[object Object]":c,a="[object Object]"==f,o="[object Object]"==c;if((c=f==c)&&cf(n)){if(!cf(t)){t=false;break n}i=true,a=false}if(c&&!a)u||(u=new Pn),t=i||pf(n)?se(n,t,r,e,Mt,u):he(n,t,f,r,e,Mt,u);else{
if(!(1&r)&&(i=a&&ii.call(n,"__wrapped__"),f=o&&ii.call(t,"__wrapped__"),i||f)){n=i?n.value():n,t=f?t.value():t,u||(u=new Pn),t=Mt(n,t,r,e,u);break n}if(c)t:if(u||(u=new Pn),i=1&r,f=_e(n),o=f.length,c=_e(t).length,o==c||i){for(a=o;a--;){var l=f[a];if(!(i?l in t:ii.call(t,l))){t=false;break t}}if((c=u.get(n))&&u.get(t))t=c==t;else{c=true,u.set(n,t),u.set(t,n);for(var s=i;++a<o;){var l=f[a],h=n[l],p=t[l];if(e)var _=i?e(p,h,l,t,n,u):e(h,p,l,n,t,u);if(_===T?h!==p&&!Mt(h,p,r,e,u):!_){c=false;break}s||(s="constructor"==l);
}c&&!s&&(r=n.constructor,e=t.constructor,r!=e&&"constructor"in n&&"constructor"in t&&!(typeof r=="function"&&r instanceof r&&typeof e=="function"&&e instanceof e)&&(c=false)),u.delete(n),u.delete(t),t=c}}else t=false;else t=false}}return t}function Tt(n){return du(n)&&"[object Map]"==_o(n)}function $t(n,t,r,e){var u=r.length,i=u,o=!e;if(null==n)return!i;for(n=Yu(n);u--;){var f=r[u];if(o&&f[2]?f[1]!==n[f[0]]:!(f[0]in n))return false}for(;++u<i;){var f=r[u],c=f[0],a=n[c],l=f[1];if(o&&f[2]){if(a===T&&!(c in n))return false;
}else{if(f=new Pn,e)var s=e(a,l,c,n,t,f);if(s===T?!Mt(l,a,3,e,f):!s)return false}}return true}function Ft(n){return!(!gu(n)||fi&&fi in n)&&(pu(n)?si:dn).test(Me(n))}function Nt(n){return du(n)&&"[object RegExp]"==Ot(n)}function Pt(n){return du(n)&&"[object Set]"==_o(n)}function Zt(n){return du(n)&&vu(n.length)&&!!Bn[Ot(n)]}function qt(n){return typeof n=="function"?n:null==n?Tu:typeof n=="object"?of(n)?Jt(n[0],n[1]):Ht(n):Pu(n)}function Vt(n){if(!ze(n))return Bi(n);var t,r=[];for(t in Yu(n))ii.call(n,t)&&"constructor"!=t&&r.push(t);
return r}function Kt(n,t){return n<t}function Gt(n,t){var r=-1,e=lu(n)?Vu(n.length):[];return eo(n,function(n,u,i){e[++r]=t(n,u,i)}),e}function Ht(n){var t=xe(n);return 1==t.length&&t[0][2]?We(t[0][0],t[0][1]):function(r){return r===n||$t(r,n,t)}}function Jt(n,t){return Ie(n)&&t===t&&!gu(t)?We(De(n),t):function(r){var e=Iu(r,n);return e===T&&e===t?Ru(r,n):Mt(t,e,3)}}function Yt(n,t,r,e,u){n!==t&&io(t,function(i,o){if(gu(i)){u||(u=new Pn);var f=u,c="__proto__"==o?T:n[o],a="__proto__"==o?T:t[o],l=f.get(a);
if(l)it(n,o,l);else{var l=e?e(c,a,o+"",n,t,f):T,s=l===T;if(s){var h=of(a),p=!h&&cf(a),_=!h&&!p&&pf(a),l=a;h||p||_?of(c)?l=c:su(c)?l=Ur(c):p?(s=false,l=Ir(a,true)):_?(s=false,l=zr(a,true)):l=[]:bu(a)||uf(a)?(l=c,uf(c)?l=Su(c):(!gu(c)||r&&pu(c))&&(l=Ae(a))):s=false}s&&(f.set(a,l),Yt(l,a,r,e,f),f.delete(a)),it(n,o,l)}}else f=e?e("__proto__"==o?T:n[o],i,o+"",n,t,u):T,f===T&&(f=i),it(n,o,f)},Wu)}function Qt(n,t){var r=n.length;if(r)return t+=0>t?r:0,Se(t,r)?n[t]:T}function Xt(n,t,r){var e=-1;return t=c(t.length?t:[Tu],E(ye())),
n=Gt(n,function(n){return{a:c(t,function(t){return t(n)}),b:++e,c:n}}),w(n,function(n,t){var e;n:{e=-1;for(var u=n.a,i=t.a,o=u.length,f=r.length;++e<o;){var c=Wr(u[e],i[e]);if(c){e=e>=f?c:c*("desc"==r[e]?-1:1);break n}}e=n.b-t.b}return e})}function nr(n,t){return tr(n,t,function(t,r){return Ru(n,r)})}function tr(n,t,r){for(var e=-1,u=t.length,i={};++e<u;){var o=t[e],f=Et(n,o);r(f,o)&&lr(i,Sr(o,n),f)}return i}function rr(n){return function(t){return Et(t,n)}}function er(n,t,r,e){var u=e?g:v,i=-1,o=t.length,f=n;
for(n===t&&(t=Ur(t)),r&&(f=c(n,E(r)));++i<o;)for(var a=0,l=t[i],l=r?r(l):l;-1<(a=u(f,l,a,e));)f!==n&&bi.call(f,a,1),bi.call(n,a,1);return n}function ur(n,t){for(var r=n?t.length:0,e=r-1;r--;){var u=t[r];if(r==e||u!==i){var i=u;Se(u)?bi.call(n,u,1):xr(n,u)}}}function ir(n,t){return n+Oi(Mi()*(t-n+1))}function or(n,t){var r="";if(!n||1>t||9007199254740991<t)return r;do t%2&&(r+=n),(t=Oi(t/2))&&(n+=n);while(t);return r}function fr(n,t){return bo(Be(n,t,Tu),n+"")}function cr(n){return Qn(Lu(n))}function ar(n,t){
var r=Lu(n);return Ce(r,pt(t,0,r.length))}function lr(n,t,r,e){if(!gu(n))return n;t=Sr(t,n);for(var u=-1,i=t.length,o=i-1,f=n;null!=f&&++u<i;){var c=De(t[u]),a=r;if(u!=o){var l=f[c],a=e?e(l,c,f):T;a===T&&(a=gu(l)?l:Se(t[u+1])?[]:{})}ot(f,c,a),f=f[c]}return n}function sr(n){return Ce(Lu(n))}function hr(n,t,r){var e=-1,u=n.length;for(0>t&&(t=-t>u?0:u+t),r=r>u?u:r,0>r&&(r+=u),u=t>r?0:r-t>>>0,t>>>=0,r=Vu(u);++e<u;)r[e]=n[e+t];return r}function pr(n,t){var r;return eo(n,function(n,e,u){return r=t(n,e,u),
!r}),!!r}function _r(n,t,r){var e=0,u=null==n?e:n.length;if(typeof t=="number"&&t===t&&2147483647>=u){for(;e<u;){var i=e+u>>>1,o=n[i];null!==o&&!ju(o)&&(r?o<=t:o<t)?e=i+1:u=i}return u}return vr(n,t,Tu,r)}function vr(n,t,r,e){t=r(t);for(var u=0,i=null==n?0:n.length,o=t!==t,f=null===t,c=ju(t),a=t===T;u<i;){var l=Oi((u+i)/2),s=r(n[l]),h=s!==T,p=null===s,_=s===s,v=ju(s);(o?e||_:a?_&&(e||h):f?_&&h&&(e||!p):c?_&&h&&!p&&(e||!v):p||v?0:e?s<=t:s<t)?u=l+1:i=l}return Ui(i,4294967294)}function gr(n,t){for(var r=-1,e=n.length,u=0,i=[];++r<e;){
var o=n[r],f=t?t(o):o;if(!r||!au(f,c)){var c=f;i[u++]=0===o?0:o}}return i}function dr(n){return typeof n=="number"?n:ju(n)?F:+n}function yr(n){if(typeof n=="string")return n;if(of(n))return c(n,yr)+"";if(ju(n))return to?to.call(n):"";var t=n+"";return"0"==t&&1/n==-$?"-0":t}function br(n,t,r){var e=-1,u=o,i=n.length,c=true,a=[],l=a;if(r)c=false,u=f;else if(200<=i){if(u=t?null:lo(n))return U(u);c=false,u=O,l=new Nn}else l=t?[]:a;n:for(;++e<i;){var s=n[e],h=t?t(s):s,s=r||0!==s?s:0;if(c&&h===h){for(var p=l.length;p--;)if(l[p]===h)continue n;
t&&l.push(h),a.push(s)}else u(l,h,r)||(l!==a&&l.push(h),a.push(s))}return a}function xr(n,t){return t=Sr(t,n),n=2>t.length?n:Et(n,hr(t,0,-1)),null==n||delete n[De(qe(t))]}function jr(n,t,r,e){for(var u=n.length,i=e?u:-1;(e?i--:++i<u)&&t(n[i],i,n););return r?hr(n,e?0:i,e?i+1:u):hr(n,e?i+1:0,e?u:i)}function wr(n,t){var r=n;return r instanceof Un&&(r=r.value()),l(t,function(n,t){return t.func.apply(t.thisArg,a([n],t.args))},r)}function mr(n,t,r){var e=n.length;if(2>e)return e?br(n[0]):[];for(var u=-1,i=Vu(e);++u<e;)for(var o=n[u],f=-1;++f<e;)f!=u&&(i[u]=yt(i[u]||o,n[f],t,r));
return br(wt(i,1),t,r)}function Ar(n,t,r){for(var e=-1,u=n.length,i=t.length,o={};++e<u;)r(o,n[e],e<i?t[e]:T);return o}function kr(n){return su(n)?n:[]}function Er(n){return typeof n=="function"?n:Tu}function Sr(n,t){return of(n)?n:Ie(n,t)?[n]:xo(Ou(n))}function Or(n,t,r){var e=n.length;return r=r===T?e:r,!t&&r>=e?n:hr(n,t,r)}function Ir(n,t){if(t)return n.slice();var r=n.length,r=vi?vi(r):new n.constructor(r);return n.copy(r),r}function Rr(n){var t=new n.constructor(n.byteLength);return new _i(t).set(new _i(n)),
t}function zr(n,t){return new n.constructor(t?Rr(n.buffer):n.buffer,n.byteOffset,n.length)}function Wr(n,t){if(n!==t){var r=n!==T,e=null===n,u=n===n,i=ju(n),o=t!==T,f=null===t,c=t===t,a=ju(t);if(!f&&!a&&!i&&n>t||i&&o&&c&&!f&&!a||e&&o&&c||!r&&c||!u)return 1;if(!e&&!i&&!a&&n<t||a&&r&&u&&!e&&!i||f&&r&&u||!o&&u||!c)return-1}return 0}function Br(n,t,r,e){var u=-1,i=n.length,o=r.length,f=-1,c=t.length,a=Li(i-o,0),l=Vu(c+a);for(e=!e;++f<c;)l[f]=t[f];for(;++u<o;)(e||u<i)&&(l[r[u]]=n[u]);for(;a--;)l[f++]=n[u++];
return l}function Lr(n,t,r,e){var u=-1,i=n.length,o=-1,f=r.length,c=-1,a=t.length,l=Li(i-f,0),s=Vu(l+a);for(e=!e;++u<l;)s[u]=n[u];for(l=u;++c<a;)s[l+c]=t[c];for(;++o<f;)(e||u<i)&&(s[l+r[o]]=n[u++]);return s}function Ur(n,t){var r=-1,e=n.length;for(t||(t=Vu(e));++r<e;)t[r]=n[r];return t}function Cr(n,t,r,e){var u=!r;r||(r={});for(var i=-1,o=t.length;++i<o;){var f=t[i],c=e?e(r[f],n[f],f,r,n):T;c===T&&(c=n[f]),u?st(r,f,c):ot(r,f,c)}return r}function Dr(n,t){return Cr(n,ho(n),t)}function Mr(n,t){return Cr(n,po(n),t);
}function Tr(n,r){return function(e,u){var i=of(e)?t:ct,o=r?r():{};return i(e,n,ye(u,2),o)}}function $r(n){return fr(function(t,r){var e=-1,u=r.length,i=1<u?r[u-1]:T,o=2<u?r[2]:T,i=3<n.length&&typeof i=="function"?(u--,i):T;for(o&&Oe(r[0],r[1],o)&&(i=3>u?T:i,u=1),t=Yu(t);++e<u;)(o=r[e])&&n(t,o,e,i);return t})}function Fr(n,t){return function(r,e){if(null==r)return r;if(!lu(r))return n(r,e);for(var u=r.length,i=t?u:-1,o=Yu(r);(t?i--:++i<u)&&false!==e(o[i],i,o););return r}}function Nr(n){return function(t,r,e){
var u=-1,i=Yu(t);e=e(t);for(var o=e.length;o--;){var f=e[n?o:++u];if(false===r(i[f],f,i))break}return t}}function Pr(n,t,r){function e(){return(this&&this!==Fn&&this instanceof e?i:n).apply(u?r:this,arguments)}var u=1&t,i=Vr(n);return e}function Zr(n){return function(t){t=Ou(t);var r=Rn.test(t)?M(t):T,e=r?r[0]:t.charAt(0);return t=r?Or(r,1).join(""):t.slice(1),e[n]()+t}}function qr(n){return function(t){return l(Du(Cu(t).replace(En,"")),n,"")}}function Vr(n){return function(){var t=arguments;switch(t.length){
case 0:return new n;case 1:return new n(t[0]);case 2:return new n(t[0],t[1]);case 3:return new n(t[0],t[1],t[2]);case 4:return new n(t[0],t[1],t[2],t[3]);case 5:return new n(t[0],t[1],t[2],t[3],t[4]);case 6:return new n(t[0],t[1],t[2],t[3],t[4],t[5]);case 7:return new n(t[0],t[1],t[2],t[3],t[4],t[5],t[6])}var r=ro(n.prototype),t=n.apply(r,t);return gu(t)?t:r}}function Kr(t,r,e){function u(){for(var o=arguments.length,f=Vu(o),c=o,a=de(u);c--;)f[c]=arguments[c];return c=3>o&&f[0]!==a&&f[o-1]!==a?[]:L(f,a),
o-=c.length,o<e?ue(t,r,Jr,u.placeholder,T,f,c,T,T,e-o):n(this&&this!==Fn&&this instanceof u?i:t,this,f)}var i=Vr(t);return u}function Gr(n){return function(t,r,e){var u=Yu(t);if(!lu(t)){var i=ye(r,3);t=zu(t),r=function(n){return i(u[n],n,u)}}return r=n(t,r,e),-1<r?u[i?t[r]:r]:T}}function Hr(n){return pe(function(t){var r=t.length,e=r,u=On.prototype.thru;for(n&&t.reverse();e--;){var i=t[e];if(typeof i!="function")throw new ni("Expected a function");if(u&&!o&&"wrapper"==ge(i))var o=new On([],true)}for(e=o?e:r;++e<r;)var i=t[e],u=ge(i),f="wrapper"==u?so(i):T,o=f&&Re(f[0])&&424==f[1]&&!f[4].length&&1==f[9]?o[ge(f[0])].apply(o,f[3]):1==i.length&&Re(i)?o[u]():o.thru(i);
return function(){var n=arguments,e=n[0];if(o&&1==n.length&&of(e))return o.plant(e).value();for(var u=0,n=r?t[u].apply(this,n):e;++u<r;)n=t[u].call(this,n);return n}})}function Jr(n,t,r,e,u,i,o,f,c,a){function l(){for(var d=arguments.length,y=Vu(d),b=d;b--;)y[b]=arguments[b];if(_){var x,j=de(l),b=y.length;for(x=0;b--;)y[b]===j&&++x}if(e&&(y=Br(y,e,u,_)),i&&(y=Lr(y,i,o,_)),d-=x,_&&d<a)return j=L(y,j),ue(n,t,Jr,l.placeholder,r,y,j,f,c,a-d);if(j=h?r:this,b=p?j[n]:n,d=y.length,f){x=y.length;for(var w=Ui(f.length,x),m=Ur(y);w--;){
var A=f[w];y[w]=Se(A,x)?m[A]:T}}else v&&1<d&&y.reverse();return s&&c<d&&(y.length=c),this&&this!==Fn&&this instanceof l&&(b=g||Vr(b)),b.apply(j,y)}var s=128&t,h=1&t,p=2&t,_=24&t,v=512&t,g=p?T:Vr(n);return l}function Yr(n,t){return function(r,e){return Bt(r,n,t(e))}}function Qr(n,t){return function(r,e){var u;if(r===T&&e===T)return t;if(r!==T&&(u=r),e!==T){if(u===T)return e;typeof r=="string"||typeof e=="string"?(r=yr(r),e=yr(e)):(r=dr(r),e=dr(e)),u=n(r,e)}return u}}function Xr(t){return pe(function(r){
return r=c(r,E(ye())),fr(function(e){var u=this;return t(r,function(t){return n(t,u,e)})})})}function ne(n,t){t=t===T?" ":yr(t);var r=t.length;return 2>r?r?or(t,n):t:(r=or(t,Si(n/D(t))),Rn.test(t)?Or(M(r),0,n).join(""):r.slice(0,n))}function te(t,r,e,u){function i(){for(var r=-1,c=arguments.length,a=-1,l=u.length,s=Vu(l+c),h=this&&this!==Fn&&this instanceof i?f:t;++a<l;)s[a]=u[a];for(;c--;)s[a++]=arguments[++r];return n(h,o?e:this,s)}var o=1&r,f=Vr(t);return i}function re(n){return function(t,r,e){
e&&typeof e!="number"&&Oe(t,r,e)&&(r=e=T),t=mu(t),r===T?(r=t,t=0):r=mu(r),e=e===T?t<r?1:-1:mu(e);var u=-1;r=Li(Si((r-t)/(e||1)),0);for(var i=Vu(r);r--;)i[n?r:++u]=t,t+=e;return i}}function ee(n){return function(t,r){return typeof t=="string"&&typeof r=="string"||(t=Eu(t),r=Eu(r)),n(t,r)}}function ue(n,t,r,e,u,i,o,f,c,a){var l=8&t,s=l?o:T;o=l?T:o;var h=l?i:T;return i=l?T:i,t=(t|(l?32:64))&~(l?64:32),4&t||(t&=-4),u=[n,t,u,h,s,i,o,f,c,a],r=r.apply(T,u),Re(n)&&go(r,u),r.placeholder=e,Le(r,n,t)}function ie(n){
var t=Ju[n];return function(n,r){if(n=Eu(n),r=null==r?0:Ui(Au(r),292)){var e=(Ou(n)+"e").split("e"),e=t(e[0]+"e"+(+e[1]+r)),e=(Ou(e)+"e").split("e");return+(e[0]+"e"+(+e[1]-r))}return t(n)}}function oe(n){return function(t){var r=_o(t);return"[object Map]"==r?W(t):"[object Set]"==r?C(t):k(t,n(t))}}function fe(n,t,r,e,u,i,o,f){var c=2&t;if(!c&&typeof n!="function")throw new ni("Expected a function");var a=e?e.length:0;if(a||(t&=-97,e=u=T),o=o===T?o:Li(Au(o),0),f=f===T?f:Au(f),a-=u?u.length:0,64&t){
var l=e,s=u;e=u=T}var h=c?T:so(n);return i=[n,t,r,e,u,l,s,i,o,f],h&&(r=i[1],n=h[1],t=r|n,e=128==n&&8==r||128==n&&256==r&&i[7].length<=h[8]||384==n&&h[7].length<=h[8]&&8==r,131>t||e)&&(1&n&&(i[2]=h[2],t|=1&r?0:4),(r=h[3])&&(e=i[3],i[3]=e?Br(e,r,h[4]):r,i[4]=e?L(i[3],"__lodash_placeholder__"):h[4]),(r=h[5])&&(e=i[5],i[5]=e?Lr(e,r,h[6]):r,i[6]=e?L(i[5],"__lodash_placeholder__"):h[6]),(r=h[7])&&(i[7]=r),128&n&&(i[8]=null==i[8]?h[8]:Ui(i[8],h[8])),null==i[9]&&(i[9]=h[9]),i[0]=h[0],i[1]=t),n=i[0],t=i[1],
r=i[2],e=i[3],u=i[4],f=i[9]=i[9]===T?c?0:n.length:Li(i[9]-a,0),!f&&24&t&&(t&=-25),Le((h?fo:go)(t&&1!=t?8==t||16==t?Kr(n,t,f):32!=t&&33!=t||u.length?Jr.apply(T,i):te(n,t,r,e):Pr(n,t,r),i),n,t)}function ce(n,t,r,e){return n===T||au(n,ri[r])&&!ii.call(e,r)?t:n}function ae(n,t,r,e,u,i){return gu(n)&&gu(t)&&(i.set(t,n),Yt(n,t,T,ae,i),i.delete(t)),n}function le(n){return bu(n)?T:n}function se(n,t,r,e,u,i){var o=1&r,f=n.length,c=t.length;if(f!=c&&!(o&&c>f))return false;if((c=i.get(n))&&i.get(t))return c==t;var c=-1,a=true,l=2&r?new Nn:T;
for(i.set(n,t),i.set(t,n);++c<f;){var s=n[c],p=t[c];if(e)var _=o?e(p,s,c,t,n,i):e(s,p,c,n,t,i);if(_!==T){if(_)continue;a=false;break}if(l){if(!h(t,function(n,t){if(!O(l,t)&&(s===n||u(s,n,r,e,i)))return l.push(t)})){a=false;break}}else if(s!==p&&!u(s,p,r,e,i)){a=false;break}}return i.delete(n),i.delete(t),a}function he(n,t,r,e,u,i,o){switch(r){case"[object DataView]":if(n.byteLength!=t.byteLength||n.byteOffset!=t.byteOffset)break;n=n.buffer,t=t.buffer;case"[object ArrayBuffer]":if(n.byteLength!=t.byteLength||!i(new _i(n),new _i(t)))break;
return true;case"[object Boolean]":case"[object Date]":case"[object Number]":return au(+n,+t);case"[object Error]":return n.name==t.name&&n.message==t.message;case"[object RegExp]":case"[object String]":return n==t+"";case"[object Map]":var f=W;case"[object Set]":if(f||(f=U),n.size!=t.size&&!(1&e))break;return(r=o.get(n))?r==t:(e|=2,o.set(n,t),t=se(f(n),f(t),e,u,i,o),o.delete(n),t);case"[object Symbol]":if(no)return no.call(n)==no.call(t)}return false}function pe(n){return bo(Be(n,T,Pe),n+"")}function _e(n){
return St(n,zu,ho)}function ve(n){return St(n,Wu,po)}function ge(n){for(var t=n.name+"",r=Ki[t],e=ii.call(Ki,t)?r.length:0;e--;){var u=r[e],i=u.func;if(null==i||i==n)return u.name}return t}function de(n){return(ii.call(An,"placeholder")?An:n).placeholder}function ye(){var n=An.iteratee||$u,n=n===$u?qt:n;return arguments.length?n(arguments[0],arguments[1]):n}function be(n,t){var r=n.__data__,e=typeof t;return("string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t)?r[typeof t=="string"?"string":"hash"]:r.map;
}function xe(n){for(var t=zu(n),r=t.length;r--;){var e=t[r],u=n[e];t[r]=[e,u,u===u&&!gu(u)]}return t}function je(n,t){var r=null==n?T:n[t];return Ft(r)?r:T}function we(n,t,r){t=Sr(t,n);for(var e=-1,u=t.length,i=false;++e<u;){var o=De(t[e]);if(!(i=null!=n&&r(n,o)))break;n=n[o]}return i||++e!=u?i:(u=null==n?0:n.length,!!u&&vu(u)&&Se(o,u)&&(of(n)||uf(n)))}function me(n){var t=n.length,r=new n.constructor(t);return t&&"string"==typeof n[0]&&ii.call(n,"index")&&(r.index=n.index,r.input=n.input),r}function Ae(n){
return typeof n.constructor!="function"||ze(n)?{}:ro(gi(n))}function ke(n,t,r){var e=n.constructor;switch(t){case"[object ArrayBuffer]":return Rr(n);case"[object Boolean]":case"[object Date]":return new e(+n);case"[object DataView]":return t=r?Rr(n.buffer):n.buffer,new n.constructor(t,n.byteOffset,n.byteLength);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":
case"[object Uint16Array]":case"[object Uint32Array]":return zr(n,r);case"[object Map]":return new e;case"[object Number]":case"[object String]":return new e(n);case"[object RegExp]":return t=new n.constructor(n.source,_n.exec(n)),t.lastIndex=n.lastIndex,t;case"[object Set]":return new e;case"[object Symbol]":return no?Yu(no.call(n)):{}}}function Ee(n){return of(n)||uf(n)||!!(xi&&n&&n[xi])}function Se(n,t){var r=typeof n;return t=null==t?9007199254740991:t,!!t&&("number"==r||"symbol"!=r&&bn.test(n))&&-1<n&&0==n%1&&n<t;
}function Oe(n,t,r){if(!gu(r))return false;var e=typeof t;return!!("number"==e?lu(r)&&Se(t,r.length):"string"==e&&t in r)&&au(r[t],n)}function Ie(n,t){if(of(n))return false;var r=typeof n;return!("number"!=r&&"symbol"!=r&&"boolean"!=r&&null!=n&&!ju(n))||(nn.test(n)||!X.test(n)||null!=t&&n in Yu(t))}function Re(n){var t=ge(n),r=An[t];return typeof r=="function"&&t in Un.prototype&&(n===r||(t=so(r),!!t&&n===t[0]))}function ze(n){var t=n&&n.constructor;return n===(typeof t=="function"&&t.prototype||ri)}function We(n,t){
return function(r){return null!=r&&(r[n]===t&&(t!==T||n in Yu(r)))}}function Be(t,r,e){return r=Li(r===T?t.length-1:r,0),function(){for(var u=arguments,i=-1,o=Li(u.length-r,0),f=Vu(o);++i<o;)f[i]=u[r+i];for(i=-1,o=Vu(r+1);++i<r;)o[i]=u[i];return o[r]=e(f),n(t,this,o)}}function Le(n,t,r){var e=t+"";t=bo;var u,i=Te;return u=(u=e.match(an))?u[1].split(ln):[],r=i(u,r),(i=r.length)&&(u=i-1,r[u]=(1<i?"& ":"")+r[u],r=r.join(2<i?", ":" "),e=e.replace(cn,"{\n/* [wrapped with "+r+"] */\n")),t(n,e)}function Ue(n){
var t=0,r=0;return function(){var e=Ci(),u=16-(e-r);if(r=e,0<u){if(800<=++t)return arguments[0]}else t=0;return n.apply(T,arguments)}}function Ce(n,t){var r=-1,e=n.length,u=e-1;for(t=t===T?e:t;++r<t;){var e=ir(r,u),i=n[e];n[e]=n[r],n[r]=i}return n.length=t,n}function De(n){if(typeof n=="string"||ju(n))return n;var t=n+"";return"0"==t&&1/n==-$?"-0":t}function Me(n){if(null!=n){try{return ui.call(n)}catch(n){}return n+""}return""}function Te(n,t){return r(N,function(r){var e="_."+r[0];t&r[1]&&!o(n,e)&&n.push(e);
}),n.sort()}function $e(n){if(n instanceof Un)return n.clone();var t=new On(n.__wrapped__,n.__chain__);return t.__actions__=Ur(n.__actions__),t.__index__=n.__index__,t.__values__=n.__values__,t}function Fe(n,t,r){var e=null==n?0:n.length;return e?(r=null==r?0:Au(r),0>r&&(r=Li(e+r,0)),_(n,ye(t,3),r)):-1}function Ne(n,t,r){var e=null==n?0:n.length;if(!e)return-1;var u=e-1;return r!==T&&(u=Au(r),u=0>r?Li(e+u,0):Ui(u,e-1)),_(n,ye(t,3),u,true)}function Pe(n){return(null==n?0:n.length)?wt(n,1):[]}function Ze(n){
return n&&n.length?n[0]:T}function qe(n){var t=null==n?0:n.length;return t?n[t-1]:T}function Ve(n,t){return n&&n.length&&t&&t.length?er(n,t):n}function Ke(n){return null==n?n:Ti.call(n)}function Ge(n){if(!n||!n.length)return[];var t=0;return n=i(n,function(n){if(su(n))return t=Li(n.length,t),true}),A(t,function(t){return c(n,b(t))})}function He(t,r){if(!t||!t.length)return[];var e=Ge(t);return null==r?e:c(e,function(t){return n(r,T,t)})}function Je(n){return n=An(n),n.__chain__=true,n}function Ye(n,t){
return t(n)}function Qe(){return this}function Xe(n,t){return(of(n)?r:eo)(n,ye(t,3))}function nu(n,t){return(of(n)?e:uo)(n,ye(t,3))}function tu(n,t){return(of(n)?c:Gt)(n,ye(t,3))}function ru(n,t,r){return t=r?T:t,t=n&&null==t?n.length:t,fe(n,128,T,T,T,T,t)}function eu(n,t){var r;if(typeof t!="function")throw new ni("Expected a function");return n=Au(n),function(){return 0<--n&&(r=t.apply(this,arguments)),1>=n&&(t=T),r}}function uu(n,t,r){return t=r?T:t,n=fe(n,8,T,T,T,T,T,t),n.placeholder=uu.placeholder,
n}function iu(n,t,r){return t=r?T:t,n=fe(n,16,T,T,T,T,T,t),n.placeholder=iu.placeholder,n}function ou(n,t,r){function e(t){var r=c,e=a;return c=a=T,_=t,s=n.apply(e,r)}function u(n){var r=n-p;return n-=_,p===T||r>=t||0>r||g&&n>=l}function i(){var n=Ko();if(u(n))return o(n);var r,e=yo;r=n-_,n=t-(n-p),r=g?Ui(n,l-r):n,h=e(i,r)}function o(n){return h=T,d&&c?e(n):(c=a=T,s)}function f(){var n=Ko(),r=u(n);if(c=arguments,a=this,p=n,r){if(h===T)return _=n=p,h=yo(i,t),v?e(n):s;if(g)return h=yo(i,t),e(p)}return h===T&&(h=yo(i,t)),
s}var c,a,l,s,h,p,_=0,v=false,g=false,d=true;if(typeof n!="function")throw new ni("Expected a function");return t=Eu(t)||0,gu(r)&&(v=!!r.leading,l=(g="maxWait"in r)?Li(Eu(r.maxWait)||0,t):l,d="trailing"in r?!!r.trailing:d),f.cancel=function(){h!==T&&ao(h),_=0,c=p=a=h=T},f.flush=function(){return h===T?s:o(Ko())},f}function fu(n,t){function r(){var e=arguments,u=t?t.apply(this,e):e[0],i=r.cache;return i.has(u)?i.get(u):(e=n.apply(this,e),r.cache=i.set(u,e)||i,e)}if(typeof n!="function"||null!=t&&typeof t!="function")throw new ni("Expected a function");
return r.cache=new(fu.Cache||$n),r}function cu(n){if(typeof n!="function")throw new ni("Expected a function");return function(){var t=arguments;switch(t.length){case 0:return!n.call(this);case 1:return!n.call(this,t[0]);case 2:return!n.call(this,t[0],t[1]);case 3:return!n.call(this,t[0],t[1],t[2])}return!n.apply(this,t)}}function au(n,t){return n===t||n!==n&&t!==t}function lu(n){return null!=n&&vu(n.length)&&!pu(n)}function su(n){return du(n)&&lu(n)}function hu(n){if(!du(n))return false;var t=Ot(n);return"[object Error]"==t||"[object DOMException]"==t||typeof n.message=="string"&&typeof n.name=="string"&&!bu(n);
}function pu(n){return!!gu(n)&&(n=Ot(n),"[object Function]"==n||"[object GeneratorFunction]"==n||"[object AsyncFunction]"==n||"[object Proxy]"==n)}function _u(n){return typeof n=="number"&&n==Au(n)}function vu(n){return typeof n=="number"&&-1<n&&0==n%1&&9007199254740991>=n}function gu(n){var t=typeof n;return null!=n&&("object"==t||"function"==t)}function du(n){return null!=n&&typeof n=="object"}function yu(n){return typeof n=="number"||du(n)&&"[object Number]"==Ot(n)}function bu(n){return!(!du(n)||"[object Object]"!=Ot(n))&&(n=gi(n),
null===n||(n=ii.call(n,"constructor")&&n.constructor,typeof n=="function"&&n instanceof n&&ui.call(n)==ai))}function xu(n){return typeof n=="string"||!of(n)&&du(n)&&"[object String]"==Ot(n)}function ju(n){return typeof n=="symbol"||du(n)&&"[object Symbol]"==Ot(n)}function wu(n){if(!n)return[];if(lu(n))return xu(n)?M(n):Ur(n);if(ji&&n[ji]){n=n[ji]();for(var t,r=[];!(t=n.next()).done;)r.push(t.value);return r}return t=_o(n),("[object Map]"==t?W:"[object Set]"==t?U:Lu)(n)}function mu(n){return n?(n=Eu(n),
n===$||n===-$?1.7976931348623157e308*(0>n?-1:1):n===n?n:0):0===n?n:0}function Au(n){n=mu(n);var t=n%1;return n===n?t?n-t:n:0}function ku(n){return n?pt(Au(n),0,4294967295):0}function Eu(n){if(typeof n=="number")return n;if(ju(n))return F;if(gu(n)&&(n=typeof n.valueOf=="function"?n.valueOf():n,n=gu(n)?n+"":n),typeof n!="string")return 0===n?n:+n;n=n.replace(un,"");var t=gn.test(n);return t||yn.test(n)?Mn(n.slice(2),t?2:8):vn.test(n)?F:+n}function Su(n){return Cr(n,Wu(n))}function Ou(n){return null==n?"":yr(n);
}function Iu(n,t,r){return n=null==n?T:Et(n,t),n===T?r:n}function Ru(n,t){return null!=n&&we(n,t,zt)}function zu(n){return lu(n)?qn(n):Vt(n)}function Wu(n){if(lu(n))n=qn(n,true);else if(gu(n)){var t,r=ze(n),e=[];for(t in n)("constructor"!=t||!r&&ii.call(n,t))&&e.push(t);n=e}else{if(t=[],null!=n)for(r in Yu(n))t.push(r);n=t}return n}function Bu(n,t){if(null==n)return{};var r=c(ve(n),function(n){return[n]});return t=ye(t),tr(n,r,function(n,r){return t(n,r[0])})}function Lu(n){return null==n?[]:S(n,zu(n));
}function Uu(n){return Tf(Ou(n).toLowerCase())}function Cu(n){return(n=Ou(n))&&n.replace(xn,Xn).replace(Sn,"")}function Du(n,t,r){return n=Ou(n),t=r?T:t,t===T?zn.test(n)?n.match(In)||[]:n.match(sn)||[]:n.match(t)||[]}function Mu(n){return function(){return n}}function Tu(n){return n}function $u(n){return qt(typeof n=="function"?n:_t(n,1))}function Fu(n,t,e){var u=zu(t),i=kt(t,u);null!=e||gu(t)&&(i.length||!u.length)||(e=t,t=n,n=this,i=kt(t,zu(t)));var o=!(gu(e)&&"chain"in e&&!e.chain),f=pu(n);return r(i,function(r){
var e=t[r];n[r]=e,f&&(n.prototype[r]=function(){var t=this.__chain__;if(o||t){var r=n(this.__wrapped__);return(r.__actions__=Ur(this.__actions__)).push({func:e,args:arguments,thisArg:n}),r.__chain__=t,r}return e.apply(n,a([this.value()],arguments))})}),n}function Nu(){}function Pu(n){return Ie(n)?b(De(n)):rr(n)}function Zu(){return[]}function qu(){return false}mn=null==mn?Fn:rt.defaults(Fn.Object(),mn,rt.pick(Fn,Wn));var Vu=mn.Array,Ku=mn.Date,Gu=mn.Error,Hu=mn.Function,Ju=mn.Math,Yu=mn.Object,Qu=mn.RegExp,Xu=mn.String,ni=mn.TypeError,ti=Vu.prototype,ri=Yu.prototype,ei=mn["__core-js_shared__"],ui=Hu.prototype.toString,ii=ri.hasOwnProperty,oi=0,fi=function(){
var n=/[^.]+$/.exec(ei&&ei.keys&&ei.keys.IE_PROTO||"");return n?"Symbol(src)_1."+n:""}(),ci=ri.toString,ai=ui.call(Yu),li=Fn._,si=Qu("^"+ui.call(ii).replace(rn,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),hi=Zn?mn.Buffer:T,pi=mn.Symbol,_i=mn.Uint8Array,vi=hi?hi.f:T,gi=B(Yu.getPrototypeOf,Yu),di=Yu.create,yi=ri.propertyIsEnumerable,bi=ti.splice,xi=pi?pi.isConcatSpreadable:T,ji=pi?pi.iterator:T,wi=pi?pi.toStringTag:T,mi=function(){try{var n=je(Yu,"defineProperty");
return n({},"",{}),n}catch(n){}}(),Ai=mn.clearTimeout!==Fn.clearTimeout&&mn.clearTimeout,ki=Ku&&Ku.now!==Fn.Date.now&&Ku.now,Ei=mn.setTimeout!==Fn.setTimeout&&mn.setTimeout,Si=Ju.ceil,Oi=Ju.floor,Ii=Yu.getOwnPropertySymbols,Ri=hi?hi.isBuffer:T,zi=mn.isFinite,Wi=ti.join,Bi=B(Yu.keys,Yu),Li=Ju.max,Ui=Ju.min,Ci=Ku.now,Di=mn.parseInt,Mi=Ju.random,Ti=ti.reverse,$i=je(mn,"DataView"),Fi=je(mn,"Map"),Ni=je(mn,"Promise"),Pi=je(mn,"Set"),Zi=je(mn,"WeakMap"),qi=je(Yu,"create"),Vi=Zi&&new Zi,Ki={},Gi=Me($i),Hi=Me(Fi),Ji=Me(Ni),Yi=Me(Pi),Qi=Me(Zi),Xi=pi?pi.prototype:T,no=Xi?Xi.valueOf:T,to=Xi?Xi.toString:T,ro=function(){
function n(){}return function(t){return gu(t)?di?di(t):(n.prototype=t,t=new n,n.prototype=T,t):{}}}();An.templateSettings={escape:J,evaluate:Y,interpolate:Q,variable:"",imports:{_:An}},An.prototype=kn.prototype,An.prototype.constructor=An,On.prototype=ro(kn.prototype),On.prototype.constructor=On,Un.prototype=ro(kn.prototype),Un.prototype.constructor=Un,Cn.prototype.clear=function(){this.__data__=qi?qi(null):{},this.size=0},Cn.prototype.delete=function(n){return n=this.has(n)&&delete this.__data__[n],
this.size-=n?1:0,n},Cn.prototype.get=function(n){var t=this.__data__;return qi?(n=t[n],"__lodash_hash_undefined__"===n?T:n):ii.call(t,n)?t[n]:T},Cn.prototype.has=function(n){var t=this.__data__;return qi?t[n]!==T:ii.call(t,n)},Cn.prototype.set=function(n,t){var r=this.__data__;return this.size+=this.has(n)?0:1,r[n]=qi&&t===T?"__lodash_hash_undefined__":t,this},Tn.prototype.clear=function(){this.__data__=[],this.size=0},Tn.prototype.delete=function(n){var t=this.__data__;return n=ft(t,n),!(0>n)&&(n==t.length-1?t.pop():bi.call(t,n,1),
--this.size,true)},Tn.prototype.get=function(n){var t=this.__data__;return n=ft(t,n),0>n?T:t[n][1]},Tn.prototype.has=function(n){return-1<ft(this.__data__,n)},Tn.prototype.set=function(n,t){var r=this.__data__,e=ft(r,n);return 0>e?(++this.size,r.push([n,t])):r[e][1]=t,this},$n.prototype.clear=function(){this.size=0,this.__data__={hash:new Cn,map:new(Fi||Tn),string:new Cn}},$n.prototype.delete=function(n){return n=be(this,n).delete(n),this.size-=n?1:0,n},$n.prototype.get=function(n){return be(this,n).get(n);
},$n.prototype.has=function(n){return be(this,n).has(n)},$n.prototype.set=function(n,t){var r=be(this,n),e=r.size;return r.set(n,t),this.size+=r.size==e?0:1,this},Nn.prototype.add=Nn.prototype.push=function(n){return this.__data__.set(n,"__lodash_hash_undefined__"),this},Nn.prototype.has=function(n){return this.__data__.has(n)},Pn.prototype.clear=function(){this.__data__=new Tn,this.size=0},Pn.prototype.delete=function(n){var t=this.__data__;return n=t.delete(n),this.size=t.size,n},Pn.prototype.get=function(n){
return this.__data__.get(n)},Pn.prototype.has=function(n){return this.__data__.has(n)},Pn.prototype.set=function(n,t){var r=this.__data__;if(r instanceof Tn){var e=r.__data__;if(!Fi||199>e.length)return e.push([n,t]),this.size=++r.size,this;r=this.__data__=new $n(e)}return r.set(n,t),this.size=r.size,this};var eo=Fr(mt),uo=Fr(At,true),io=Nr(),oo=Nr(true),fo=Vi?function(n,t){return Vi.set(n,t),n}:Tu,co=mi?function(n,t){return mi(n,"toString",{configurable:true,enumerable:false,value:Mu(t),writable:true})}:Tu,ao=Ai||function(n){
return Fn.clearTimeout(n)},lo=Pi&&1/U(new Pi([,-0]))[1]==$?function(n){return new Pi(n)}:Nu,so=Vi?function(n){return Vi.get(n)}:Nu,ho=Ii?function(n){return null==n?[]:(n=Yu(n),i(Ii(n),function(t){return yi.call(n,t)}))}:Zu,po=Ii?function(n){for(var t=[];n;)a(t,ho(n)),n=gi(n);return t}:Zu,_o=Ot;($i&&"[object DataView]"!=_o(new $i(new ArrayBuffer(1)))||Fi&&"[object Map]"!=_o(new Fi)||Ni&&"[object Promise]"!=_o(Ni.resolve())||Pi&&"[object Set]"!=_o(new Pi)||Zi&&"[object WeakMap]"!=_o(new Zi))&&(_o=function(n){
var t=Ot(n);if(n=(n="[object Object]"==t?n.constructor:T)?Me(n):"")switch(n){case Gi:return"[object DataView]";case Hi:return"[object Map]";case Ji:return"[object Promise]";case Yi:return"[object Set]";case Qi:return"[object WeakMap]"}return t});var vo=ei?pu:qu,go=Ue(fo),yo=Ei||function(n,t){return Fn.setTimeout(n,t)},bo=Ue(co),xo=function(n){n=fu(n,function(n){return 500===t.size&&t.clear(),n});var t=n.cache;return n}(function(n){var t=[];return 46===n.charCodeAt(0)&&t.push(""),n.replace(tn,function(n,r,e,u){
t.push(e?u.replace(hn,"$1"):r||n)}),t}),jo=fr(function(n,t){return su(n)?yt(n,wt(t,1,su,true)):[]}),wo=fr(function(n,t){var r=qe(t);return su(r)&&(r=T),su(n)?yt(n,wt(t,1,su,true),ye(r,2)):[]}),mo=fr(function(n,t){var r=qe(t);return su(r)&&(r=T),su(n)?yt(n,wt(t,1,su,true),T,r):[]}),Ao=fr(function(n){var t=c(n,kr);return t.length&&t[0]===n[0]?Wt(t):[]}),ko=fr(function(n){var t=qe(n),r=c(n,kr);return t===qe(r)?t=T:r.pop(),r.length&&r[0]===n[0]?Wt(r,ye(t,2)):[]}),Eo=fr(function(n){var t=qe(n),r=c(n,kr);return(t=typeof t=="function"?t:T)&&r.pop(),
r.length&&r[0]===n[0]?Wt(r,T,t):[]}),So=fr(Ve),Oo=pe(function(n,t){var r=null==n?0:n.length,e=ht(n,t);return ur(n,c(t,function(n){return Se(n,r)?+n:n}).sort(Wr)),e}),Io=fr(function(n){return br(wt(n,1,su,true))}),Ro=fr(function(n){var t=qe(n);return su(t)&&(t=T),br(wt(n,1,su,true),ye(t,2))}),zo=fr(function(n){var t=qe(n),t=typeof t=="function"?t:T;return br(wt(n,1,su,true),T,t)}),Wo=fr(function(n,t){return su(n)?yt(n,t):[]}),Bo=fr(function(n){return mr(i(n,su))}),Lo=fr(function(n){var t=qe(n);return su(t)&&(t=T),
mr(i(n,su),ye(t,2))}),Uo=fr(function(n){var t=qe(n),t=typeof t=="function"?t:T;return mr(i(n,su),T,t)}),Co=fr(Ge),Do=fr(function(n){var t=n.length,t=1<t?n[t-1]:T,t=typeof t=="function"?(n.pop(),t):T;return He(n,t)}),Mo=pe(function(n){function t(t){return ht(t,n)}var r=n.length,e=r?n[0]:0,u=this.__wrapped__;return!(1<r||this.__actions__.length)&&u instanceof Un&&Se(e)?(u=u.slice(e,+e+(r?1:0)),u.__actions__.push({func:Ye,args:[t],thisArg:T}),new On(u,this.__chain__).thru(function(n){return r&&!n.length&&n.push(T),
n})):this.thru(t)}),To=Tr(function(n,t,r){ii.call(n,r)?++n[r]:st(n,r,1)}),$o=Gr(Fe),Fo=Gr(Ne),No=Tr(function(n,t,r){ii.call(n,r)?n[r].push(t):st(n,r,[t])}),Po=fr(function(t,r,e){var u=-1,i=typeof r=="function",o=lu(t)?Vu(t.length):[];return eo(t,function(t){o[++u]=i?n(r,t,e):Lt(t,r,e)}),o}),Zo=Tr(function(n,t,r){st(n,r,t)}),qo=Tr(function(n,t,r){n[r?0:1].push(t)},function(){return[[],[]]}),Vo=fr(function(n,t){if(null==n)return[];var r=t.length;return 1<r&&Oe(n,t[0],t[1])?t=[]:2<r&&Oe(t[0],t[1],t[2])&&(t=[t[0]]),
Xt(n,wt(t,1),[])}),Ko=ki||function(){return Fn.Date.now()},Go=fr(function(n,t,r){var e=1;if(r.length)var u=L(r,de(Go)),e=32|e;return fe(n,e,t,r,u)}),Ho=fr(function(n,t,r){var e=3;if(r.length)var u=L(r,de(Ho)),e=32|e;return fe(t,e,n,r,u)}),Jo=fr(function(n,t){return dt(n,1,t)}),Yo=fr(function(n,t,r){return dt(n,Eu(t)||0,r)});fu.Cache=$n;var Qo=fr(function(t,r){r=1==r.length&&of(r[0])?c(r[0],E(ye())):c(wt(r,1),E(ye()));var e=r.length;return fr(function(u){for(var i=-1,o=Ui(u.length,e);++i<o;)u[i]=r[i].call(this,u[i]);
return n(t,this,u)})}),Xo=fr(function(n,t){return fe(n,32,T,t,L(t,de(Xo)))}),nf=fr(function(n,t){return fe(n,64,T,t,L(t,de(nf)))}),tf=pe(function(n,t){return fe(n,256,T,T,T,t)}),rf=ee(It),ef=ee(function(n,t){return n>=t}),uf=Ut(function(){return arguments}())?Ut:function(n){return du(n)&&ii.call(n,"callee")&&!yi.call(n,"callee")},of=Vu.isArray,ff=Vn?E(Vn):Ct,cf=Ri||qu,af=Kn?E(Kn):Dt,lf=Gn?E(Gn):Tt,sf=Hn?E(Hn):Nt,hf=Jn?E(Jn):Pt,pf=Yn?E(Yn):Zt,_f=ee(Kt),vf=ee(function(n,t){return n<=t}),gf=$r(function(n,t){
if(ze(t)||lu(t))Cr(t,zu(t),n);else for(var r in t)ii.call(t,r)&&ot(n,r,t[r])}),df=$r(function(n,t){Cr(t,Wu(t),n)}),yf=$r(function(n,t,r,e){Cr(t,Wu(t),n,e)}),bf=$r(function(n,t,r,e){Cr(t,zu(t),n,e)}),xf=pe(ht),jf=fr(function(n,t){n=Yu(n);var r=-1,e=t.length,u=2<e?t[2]:T;for(u&&Oe(t[0],t[1],u)&&(e=1);++r<e;)for(var u=t[r],i=Wu(u),o=-1,f=i.length;++o<f;){var c=i[o],a=n[c];(a===T||au(a,ri[c])&&!ii.call(n,c))&&(n[c]=u[c])}return n}),wf=fr(function(t){return t.push(T,ae),n(Sf,T,t)}),mf=Yr(function(n,t,r){
null!=t&&typeof t.toString!="function"&&(t=ci.call(t)),n[t]=r},Mu(Tu)),Af=Yr(function(n,t,r){null!=t&&typeof t.toString!="function"&&(t=ci.call(t)),ii.call(n,t)?n[t].push(r):n[t]=[r]},ye),kf=fr(Lt),Ef=$r(function(n,t,r){Yt(n,t,r)}),Sf=$r(function(n,t,r,e){Yt(n,t,r,e)}),Of=pe(function(n,t){var r={};if(null==n)return r;var e=false;t=c(t,function(t){return t=Sr(t,n),e||(e=1<t.length),t}),Cr(n,ve(n),r),e&&(r=_t(r,7,le));for(var u=t.length;u--;)xr(r,t[u]);return r}),If=pe(function(n,t){return null==n?{}:nr(n,t);
}),Rf=oe(zu),zf=oe(Wu),Wf=qr(function(n,t,r){return t=t.toLowerCase(),n+(r?Uu(t):t)}),Bf=qr(function(n,t,r){return n+(r?"-":"")+t.toLowerCase()}),Lf=qr(function(n,t,r){return n+(r?" ":"")+t.toLowerCase()}),Uf=Zr("toLowerCase"),Cf=qr(function(n,t,r){return n+(r?"_":"")+t.toLowerCase()}),Df=qr(function(n,t,r){return n+(r?" ":"")+Tf(t)}),Mf=qr(function(n,t,r){return n+(r?" ":"")+t.toUpperCase()}),Tf=Zr("toUpperCase"),$f=fr(function(t,r){try{return n(t,T,r)}catch(n){return hu(n)?n:new Gu(n)}}),Ff=pe(function(n,t){
return r(t,function(t){t=De(t),st(n,t,Go(n[t],n))}),n}),Nf=Hr(),Pf=Hr(true),Zf=fr(function(n,t){return function(r){return Lt(r,n,t)}}),qf=fr(function(n,t){return function(r){return Lt(n,r,t)}}),Vf=Xr(c),Kf=Xr(u),Gf=Xr(h),Hf=re(),Jf=re(true),Yf=Qr(function(n,t){return n+t},0),Qf=ie("ceil"),Xf=Qr(function(n,t){return n/t},1),nc=ie("floor"),tc=Qr(function(n,t){return n*t},1),rc=ie("round"),ec=Qr(function(n,t){return n-t},0);return An.after=function(n,t){if(typeof t!="function")throw new ni("Expected a function");
return n=Au(n),function(){if(1>--n)return t.apply(this,arguments)}},An.ary=ru,An.assign=gf,An.assignIn=df,An.assignInWith=yf,An.assignWith=bf,An.at=xf,An.before=eu,An.bind=Go,An.bindAll=Ff,An.bindKey=Ho,An.castArray=function(){if(!arguments.length)return[];var n=arguments[0];return of(n)?n:[n]},An.chain=Je,An.chunk=function(n,t,r){if(t=(r?Oe(n,t,r):t===T)?1:Li(Au(t),0),r=null==n?0:n.length,!r||1>t)return[];for(var e=0,u=0,i=Vu(Si(r/t));e<r;)i[u++]=hr(n,e,e+=t);return i},An.compact=function(n){for(var t=-1,r=null==n?0:n.length,e=0,u=[];++t<r;){
var i=n[t];i&&(u[e++]=i)}return u},An.concat=function(){var n=arguments.length;if(!n)return[];for(var t=Vu(n-1),r=arguments[0];n--;)t[n-1]=arguments[n];return a(of(r)?Ur(r):[r],wt(t,1))},An.cond=function(t){var r=null==t?0:t.length,e=ye();return t=r?c(t,function(n){if("function"!=typeof n[1])throw new ni("Expected a function");return[e(n[0]),n[1]]}):[],fr(function(e){for(var u=-1;++u<r;){var i=t[u];if(n(i[0],this,e))return n(i[1],this,e)}})},An.conforms=function(n){return vt(_t(n,1))},An.constant=Mu,
An.countBy=To,An.create=function(n,t){var r=ro(n);return null==t?r:at(r,t)},An.curry=uu,An.curryRight=iu,An.debounce=ou,An.defaults=jf,An.defaultsDeep=wf,An.defer=Jo,An.delay=Yo,An.difference=jo,An.differenceBy=wo,An.differenceWith=mo,An.drop=function(n,t,r){var e=null==n?0:n.length;return e?(t=r||t===T?1:Au(t),hr(n,0>t?0:t,e)):[]},An.dropRight=function(n,t,r){var e=null==n?0:n.length;return e?(t=r||t===T?1:Au(t),t=e-t,hr(n,0,0>t?0:t)):[]},An.dropRightWhile=function(n,t){return n&&n.length?jr(n,ye(t,3),true,true):[];
},An.dropWhile=function(n,t){return n&&n.length?jr(n,ye(t,3),true):[]},An.fill=function(n,t,r,e){var u=null==n?0:n.length;if(!u)return[];for(r&&typeof r!="number"&&Oe(n,t,r)&&(r=0,e=u),u=n.length,r=Au(r),0>r&&(r=-r>u?0:u+r),e=e===T||e>u?u:Au(e),0>e&&(e+=u),e=r>e?0:ku(e);r<e;)n[r++]=t;return n},An.filter=function(n,t){return(of(n)?i:jt)(n,ye(t,3))},An.flatMap=function(n,t){return wt(tu(n,t),1)},An.flatMapDeep=function(n,t){return wt(tu(n,t),$)},An.flatMapDepth=function(n,t,r){return r=r===T?1:Au(r),
wt(tu(n,t),r)},An.flatten=Pe,An.flattenDeep=function(n){return(null==n?0:n.length)?wt(n,$):[]},An.flattenDepth=function(n,t){return null!=n&&n.length?(t=t===T?1:Au(t),wt(n,t)):[]},An.flip=function(n){return fe(n,512)},An.flow=Nf,An.flowRight=Pf,An.fromPairs=function(n){for(var t=-1,r=null==n?0:n.length,e={};++t<r;){var u=n[t];e[u[0]]=u[1]}return e},An.functions=function(n){return null==n?[]:kt(n,zu(n))},An.functionsIn=function(n){return null==n?[]:kt(n,Wu(n))},An.groupBy=No,An.initial=function(n){
return(null==n?0:n.length)?hr(n,0,-1):[]},An.intersection=Ao,An.intersectionBy=ko,An.intersectionWith=Eo,An.invert=mf,An.invertBy=Af,An.invokeMap=Po,An.iteratee=$u,An.keyBy=Zo,An.keys=zu,An.keysIn=Wu,An.map=tu,An.mapKeys=function(n,t){var r={};return t=ye(t,3),mt(n,function(n,e,u){st(r,t(n,e,u),n)}),r},An.mapValues=function(n,t){var r={};return t=ye(t,3),mt(n,function(n,e,u){st(r,e,t(n,e,u))}),r},An.matches=function(n){return Ht(_t(n,1))},An.matchesProperty=function(n,t){return Jt(n,_t(t,1))},An.memoize=fu,
An.merge=Ef,An.mergeWith=Sf,An.method=Zf,An.methodOf=qf,An.mixin=Fu,An.negate=cu,An.nthArg=function(n){return n=Au(n),fr(function(t){return Qt(t,n)})},An.omit=Of,An.omitBy=function(n,t){return Bu(n,cu(ye(t)))},An.once=function(n){return eu(2,n)},An.orderBy=function(n,t,r,e){return null==n?[]:(of(t)||(t=null==t?[]:[t]),r=e?T:r,of(r)||(r=null==r?[]:[r]),Xt(n,t,r))},An.over=Vf,An.overArgs=Qo,An.overEvery=Kf,An.overSome=Gf,An.partial=Xo,An.partialRight=nf,An.partition=qo,An.pick=If,An.pickBy=Bu,An.property=Pu,
An.propertyOf=function(n){return function(t){return null==n?T:Et(n,t)}},An.pull=So,An.pullAll=Ve,An.pullAllBy=function(n,t,r){return n&&n.length&&t&&t.length?er(n,t,ye(r,2)):n},An.pullAllWith=function(n,t,r){return n&&n.length&&t&&t.length?er(n,t,T,r):n},An.pullAt=Oo,An.range=Hf,An.rangeRight=Jf,An.rearg=tf,An.reject=function(n,t){return(of(n)?i:jt)(n,cu(ye(t,3)))},An.remove=function(n,t){var r=[];if(!n||!n.length)return r;var e=-1,u=[],i=n.length;for(t=ye(t,3);++e<i;){var o=n[e];t(o,e,n)&&(r.push(o),
u.push(e))}return ur(n,u),r},An.rest=function(n,t){if(typeof n!="function")throw new ni("Expected a function");return t=t===T?t:Au(t),fr(n,t)},An.reverse=Ke,An.sampleSize=function(n,t,r){return t=(r?Oe(n,t,r):t===T)?1:Au(t),(of(n)?et:ar)(n,t)},An.set=function(n,t,r){return null==n?n:lr(n,t,r)},An.setWith=function(n,t,r,e){return e=typeof e=="function"?e:T,null==n?n:lr(n,t,r,e)},An.shuffle=function(n){return(of(n)?ut:sr)(n)},An.slice=function(n,t,r){var e=null==n?0:n.length;return e?(r&&typeof r!="number"&&Oe(n,t,r)?(t=0,
r=e):(t=null==t?0:Au(t),r=r===T?e:Au(r)),hr(n,t,r)):[]},An.sortBy=Vo,An.sortedUniq=function(n){return n&&n.length?gr(n):[]},An.sortedUniqBy=function(n,t){return n&&n.length?gr(n,ye(t,2)):[]},An.split=function(n,t,r){return r&&typeof r!="number"&&Oe(n,t,r)&&(t=r=T),r=r===T?4294967295:r>>>0,r?(n=Ou(n))&&(typeof t=="string"||null!=t&&!sf(t))&&(t=yr(t),!t&&Rn.test(n))?Or(M(n),0,r):n.split(t,r):[]},An.spread=function(t,r){if(typeof t!="function")throw new ni("Expected a function");return r=null==r?0:Li(Au(r),0),
fr(function(e){var u=e[r];return e=Or(e,0,r),u&&a(e,u),n(t,this,e)})},An.tail=function(n){var t=null==n?0:n.length;return t?hr(n,1,t):[]},An.take=function(n,t,r){return n&&n.length?(t=r||t===T?1:Au(t),hr(n,0,0>t?0:t)):[]},An.takeRight=function(n,t,r){var e=null==n?0:n.length;return e?(t=r||t===T?1:Au(t),t=e-t,hr(n,0>t?0:t,e)):[]},An.takeRightWhile=function(n,t){return n&&n.length?jr(n,ye(t,3),false,true):[]},An.takeWhile=function(n,t){return n&&n.length?jr(n,ye(t,3)):[]},An.tap=function(n,t){return t(n),
n},An.throttle=function(n,t,r){var e=true,u=true;if(typeof n!="function")throw new ni("Expected a function");return gu(r)&&(e="leading"in r?!!r.leading:e,u="trailing"in r?!!r.trailing:u),ou(n,t,{leading:e,maxWait:t,trailing:u})},An.thru=Ye,An.toArray=wu,An.toPairs=Rf,An.toPairsIn=zf,An.toPath=function(n){return of(n)?c(n,De):ju(n)?[n]:Ur(xo(Ou(n)))},An.toPlainObject=Su,An.transform=function(n,t,e){var u=of(n),i=u||cf(n)||pf(n);if(t=ye(t,4),null==e){var o=n&&n.constructor;e=i?u?new o:[]:gu(n)&&pu(o)?ro(gi(n)):{};
}return(i?r:mt)(n,function(n,r,u){return t(e,n,r,u)}),e},An.unary=function(n){return ru(n,1)},An.union=Io,An.unionBy=Ro,An.unionWith=zo,An.uniq=function(n){return n&&n.length?br(n):[]},An.uniqBy=function(n,t){return n&&n.length?br(n,ye(t,2)):[]},An.uniqWith=function(n,t){return t=typeof t=="function"?t:T,n&&n.length?br(n,T,t):[]},An.unset=function(n,t){return null==n||xr(n,t)},An.unzip=Ge,An.unzipWith=He,An.update=function(n,t,r){return null==n?n:lr(n,t,Er(r)(Et(n,t)),void 0)},An.updateWith=function(n,t,r,e){
return e=typeof e=="function"?e:T,null!=n&&(n=lr(n,t,Er(r)(Et(n,t)),e)),n},An.values=Lu,An.valuesIn=function(n){return null==n?[]:S(n,Wu(n))},An.without=Wo,An.words=Du,An.wrap=function(n,t){return Xo(Er(t),n)},An.xor=Bo,An.xorBy=Lo,An.xorWith=Uo,An.zip=Co,An.zipObject=function(n,t){return Ar(n||[],t||[],ot)},An.zipObjectDeep=function(n,t){return Ar(n||[],t||[],lr)},An.zipWith=Do,An.entries=Rf,An.entriesIn=zf,An.extend=df,An.extendWith=yf,Fu(An,An),An.add=Yf,An.attempt=$f,An.camelCase=Wf,An.capitalize=Uu,
An.ceil=Qf,An.clamp=function(n,t,r){return r===T&&(r=t,t=T),r!==T&&(r=Eu(r),r=r===r?r:0),t!==T&&(t=Eu(t),t=t===t?t:0),pt(Eu(n),t,r)},An.clone=function(n){return _t(n,4)},An.cloneDeep=function(n){return _t(n,5)},An.cloneDeepWith=function(n,t){return t=typeof t=="function"?t:T,_t(n,5,t)},An.cloneWith=function(n,t){return t=typeof t=="function"?t:T,_t(n,4,t)},An.conformsTo=function(n,t){return null==t||gt(n,t,zu(t))},An.deburr=Cu,An.defaultTo=function(n,t){return null==n||n!==n?t:n},An.divide=Xf,An.endsWith=function(n,t,r){
n=Ou(n),t=yr(t);var e=n.length,e=r=r===T?e:pt(Au(r),0,e);return r-=t.length,0<=r&&n.slice(r,e)==t},An.eq=au,An.escape=function(n){return(n=Ou(n))&&H.test(n)?n.replace(K,nt):n},An.escapeRegExp=function(n){return(n=Ou(n))&&en.test(n)?n.replace(rn,"\\$&"):n},An.every=function(n,t,r){var e=of(n)?u:bt;return r&&Oe(n,t,r)&&(t=T),e(n,ye(t,3))},An.find=$o,An.findIndex=Fe,An.findKey=function(n,t){return p(n,ye(t,3),mt)},An.findLast=Fo,An.findLastIndex=Ne,An.findLastKey=function(n,t){return p(n,ye(t,3),At);
},An.floor=nc,An.forEach=Xe,An.forEachRight=nu,An.forIn=function(n,t){return null==n?n:io(n,ye(t,3),Wu)},An.forInRight=function(n,t){return null==n?n:oo(n,ye(t,3),Wu)},An.forOwn=function(n,t){return n&&mt(n,ye(t,3))},An.forOwnRight=function(n,t){return n&&At(n,ye(t,3))},An.get=Iu,An.gt=rf,An.gte=ef,An.has=function(n,t){return null!=n&&we(n,t,Rt)},An.hasIn=Ru,An.head=Ze,An.identity=Tu,An.includes=function(n,t,r,e){return n=lu(n)?n:Lu(n),r=r&&!e?Au(r):0,e=n.length,0>r&&(r=Li(e+r,0)),xu(n)?r<=e&&-1<n.indexOf(t,r):!!e&&-1<v(n,t,r);
},An.indexOf=function(n,t,r){var e=null==n?0:n.length;return e?(r=null==r?0:Au(r),0>r&&(r=Li(e+r,0)),v(n,t,r)):-1},An.inRange=function(n,t,r){return t=mu(t),r===T?(r=t,t=0):r=mu(r),n=Eu(n),n>=Ui(t,r)&&n<Li(t,r)},An.invoke=kf,An.isArguments=uf,An.isArray=of,An.isArrayBuffer=ff,An.isArrayLike=lu,An.isArrayLikeObject=su,An.isBoolean=function(n){return true===n||false===n||du(n)&&"[object Boolean]"==Ot(n)},An.isBuffer=cf,An.isDate=af,An.isElement=function(n){return du(n)&&1===n.nodeType&&!bu(n)},An.isEmpty=function(n){
if(null==n)return true;if(lu(n)&&(of(n)||typeof n=="string"||typeof n.splice=="function"||cf(n)||pf(n)||uf(n)))return!n.length;var t=_o(n);if("[object Map]"==t||"[object Set]"==t)return!n.size;if(ze(n))return!Vt(n).length;for(var r in n)if(ii.call(n,r))return false;return true},An.isEqual=function(n,t){return Mt(n,t)},An.isEqualWith=function(n,t,r){var e=(r=typeof r=="function"?r:T)?r(n,t):T;return e===T?Mt(n,t,T,r):!!e},An.isError=hu,An.isFinite=function(n){return typeof n=="number"&&zi(n)},An.isFunction=pu,
An.isInteger=_u,An.isLength=vu,An.isMap=lf,An.isMatch=function(n,t){return n===t||$t(n,t,xe(t))},An.isMatchWith=function(n,t,r){return r=typeof r=="function"?r:T,$t(n,t,xe(t),r)},An.isNaN=function(n){return yu(n)&&n!=+n},An.isNative=function(n){if(vo(n))throw new Gu("Unsupported core-js use. Try https://npms.io/search?q=ponyfill.");return Ft(n)},An.isNil=function(n){return null==n},An.isNull=function(n){return null===n},An.isNumber=yu,An.isObject=gu,An.isObjectLike=du,An.isPlainObject=bu,An.isRegExp=sf,
An.isSafeInteger=function(n){return _u(n)&&-9007199254740991<=n&&9007199254740991>=n},An.isSet=hf,An.isString=xu,An.isSymbol=ju,An.isTypedArray=pf,An.isUndefined=function(n){return n===T},An.isWeakMap=function(n){return du(n)&&"[object WeakMap]"==_o(n)},An.isWeakSet=function(n){return du(n)&&"[object WeakSet]"==Ot(n)},An.join=function(n,t){return null==n?"":Wi.call(n,t)},An.kebabCase=Bf,An.last=qe,An.lastIndexOf=function(n,t,r){var e=null==n?0:n.length;if(!e)return-1;var u=e;if(r!==T&&(u=Au(r),u=0>u?Li(e+u,0):Ui(u,e-1)),
t===t){for(r=u+1;r--&&n[r]!==t;);n=r}else n=_(n,d,u,true);return n},An.lowerCase=Lf,An.lowerFirst=Uf,An.lt=_f,An.lte=vf,An.max=function(n){return n&&n.length?xt(n,Tu,It):T},An.maxBy=function(n,t){return n&&n.length?xt(n,ye(t,2),It):T},An.mean=function(n){return y(n,Tu)},An.meanBy=function(n,t){return y(n,ye(t,2))},An.min=function(n){return n&&n.length?xt(n,Tu,Kt):T},An.minBy=function(n,t){return n&&n.length?xt(n,ye(t,2),Kt):T},An.stubArray=Zu,An.stubFalse=qu,An.stubObject=function(){return{}},An.stubString=function(){
return""},An.stubTrue=function(){return true},An.multiply=tc,An.nth=function(n,t){return n&&n.length?Qt(n,Au(t)):T},An.noConflict=function(){return Fn._===this&&(Fn._=li),this},An.noop=Nu,An.now=Ko,An.pad=function(n,t,r){n=Ou(n);var e=(t=Au(t))?D(n):0;return!t||e>=t?n:(t=(t-e)/2,ne(Oi(t),r)+n+ne(Si(t),r))},An.padEnd=function(n,t,r){n=Ou(n);var e=(t=Au(t))?D(n):0;return t&&e<t?n+ne(t-e,r):n},An.padStart=function(n,t,r){n=Ou(n);var e=(t=Au(t))?D(n):0;return t&&e<t?ne(t-e,r)+n:n},An.parseInt=function(n,t,r){
return r||null==t?t=0:t&&(t=+t),Di(Ou(n).replace(on,""),t||0)},An.random=function(n,t,r){if(r&&typeof r!="boolean"&&Oe(n,t,r)&&(t=r=T),r===T&&(typeof t=="boolean"?(r=t,t=T):typeof n=="boolean"&&(r=n,n=T)),n===T&&t===T?(n=0,t=1):(n=mu(n),t===T?(t=n,n=0):t=mu(t)),n>t){var e=n;n=t,t=e}return r||n%1||t%1?(r=Mi(),Ui(n+r*(t-n+Dn("1e-"+((r+"").length-1))),t)):ir(n,t)},An.reduce=function(n,t,r){var e=of(n)?l:j,u=3>arguments.length;return e(n,ye(t,4),r,u,eo)},An.reduceRight=function(n,t,r){var e=of(n)?s:j,u=3>arguments.length;
return e(n,ye(t,4),r,u,uo)},An.repeat=function(n,t,r){return t=(r?Oe(n,t,r):t===T)?1:Au(t),or(Ou(n),t)},An.replace=function(){var n=arguments,t=Ou(n[0]);return 3>n.length?t:t.replace(n[1],n[2])},An.result=function(n,t,r){t=Sr(t,n);var e=-1,u=t.length;for(u||(u=1,n=T);++e<u;){var i=null==n?T:n[De(t[e])];i===T&&(e=u,i=r),n=pu(i)?i.call(n):i}return n},An.round=rc,An.runInContext=x,An.sample=function(n){return(of(n)?Qn:cr)(n)},An.size=function(n){if(null==n)return 0;if(lu(n))return xu(n)?D(n):n.length;
var t=_o(n);return"[object Map]"==t||"[object Set]"==t?n.size:Vt(n).length},An.snakeCase=Cf,An.some=function(n,t,r){var e=of(n)?h:pr;return r&&Oe(n,t,r)&&(t=T),e(n,ye(t,3))},An.sortedIndex=function(n,t){return _r(n,t)},An.sortedIndexBy=function(n,t,r){return vr(n,t,ye(r,2))},An.sortedIndexOf=function(n,t){var r=null==n?0:n.length;if(r){var e=_r(n,t);if(e<r&&au(n[e],t))return e}return-1},An.sortedLastIndex=function(n,t){return _r(n,t,true)},An.sortedLastIndexBy=function(n,t,r){return vr(n,t,ye(r,2),true);
},An.sortedLastIndexOf=function(n,t){if(null==n?0:n.length){var r=_r(n,t,true)-1;if(au(n[r],t))return r}return-1},An.startCase=Df,An.startsWith=function(n,t,r){return n=Ou(n),r=null==r?0:pt(Au(r),0,n.length),t=yr(t),n.slice(r,r+t.length)==t},An.subtract=ec,An.sum=function(n){return n&&n.length?m(n,Tu):0},An.sumBy=function(n,t){return n&&n.length?m(n,ye(t,2)):0},An.template=function(n,t,r){var e=An.templateSettings;r&&Oe(n,t,r)&&(t=T),n=Ou(n),t=yf({},t,e,ce),r=yf({},t.imports,e.imports,ce);var u,i,o=zu(r),f=S(r,o),c=0;
r=t.interpolate||jn;var a="__p+='";r=Qu((t.escape||jn).source+"|"+r.source+"|"+(r===Q?pn:jn).source+"|"+(t.evaluate||jn).source+"|$","g");var l="sourceURL"in t?"//# sourceURL="+t.sourceURL+"\n":"";if(n.replace(r,function(t,r,e,o,f,l){return e||(e=o),a+=n.slice(c,l).replace(wn,z),r&&(u=true,a+="'+__e("+r+")+'"),f&&(i=true,a+="';"+f+";\n__p+='"),e&&(a+="'+((__t=("+e+"))==null?'':__t)+'"),c=l+t.length,t}),a+="';",(t=t.variable)||(a="with(obj){"+a+"}"),a=(i?a.replace(P,""):a).replace(Z,"$1").replace(q,"$1;"),
a="function("+(t||"obj")+"){"+(t?"":"obj||(obj={});")+"var __t,__p=''"+(u?",__e=_.escape":"")+(i?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+a+"return __p}",t=$f(function(){return Hu(o,l+"return "+a).apply(T,f)}),t.source=a,hu(t))throw t;return t},An.times=function(n,t){if(n=Au(n),1>n||9007199254740991<n)return[];var r=4294967295,e=Ui(n,4294967295);for(t=ye(t),n-=4294967295,e=A(e,t);++r<n;)t(r);return e},An.toFinite=mu,An.toInteger=Au,An.toLength=ku,An.toLower=function(n){
return Ou(n).toLowerCase()},An.toNumber=Eu,An.toSafeInteger=function(n){return n?pt(Au(n),-9007199254740991,9007199254740991):0===n?n:0},An.toString=Ou,An.toUpper=function(n){return Ou(n).toUpperCase()},An.trim=function(n,t,r){return(n=Ou(n))&&(r||t===T)?n.replace(un,""):n&&(t=yr(t))?(n=M(n),r=M(t),t=I(n,r),r=R(n,r)+1,Or(n,t,r).join("")):n},An.trimEnd=function(n,t,r){return(n=Ou(n))&&(r||t===T)?n.replace(fn,""):n&&(t=yr(t))?(n=M(n),t=R(n,M(t))+1,Or(n,0,t).join("")):n},An.trimStart=function(n,t,r){
return(n=Ou(n))&&(r||t===T)?n.replace(on,""):n&&(t=yr(t))?(n=M(n),t=I(n,M(t)),Or(n,t).join("")):n},An.truncate=function(n,t){var r=30,e="...";if(gu(t))var u="separator"in t?t.separator:u,r="length"in t?Au(t.length):r,e="omission"in t?yr(t.omission):e;n=Ou(n);var i=n.length;if(Rn.test(n))var o=M(n),i=o.length;if(r>=i)return n;if(i=r-D(e),1>i)return e;if(r=o?Or(o,0,i).join(""):n.slice(0,i),u===T)return r+e;if(o&&(i+=r.length-i),sf(u)){if(n.slice(i).search(u)){var f=r;for(u.global||(u=Qu(u.source,Ou(_n.exec(u))+"g")),
u.lastIndex=0;o=u.exec(f);)var c=o.index;r=r.slice(0,c===T?i:c)}}else n.indexOf(yr(u),i)!=i&&(u=r.lastIndexOf(u),-1<u&&(r=r.slice(0,u)));return r+e},An.unescape=function(n){return(n=Ou(n))&&G.test(n)?n.replace(V,tt):n},An.uniqueId=function(n){var t=++oi;return Ou(n)+t},An.upperCase=Mf,An.upperFirst=Tf,An.each=Xe,An.eachRight=nu,An.first=Ze,Fu(An,function(){var n={};return mt(An,function(t,r){ii.call(An.prototype,r)||(n[r]=t)}),n}(),{chain:false}),An.VERSION="4.17.5",r("bind bindKey curry curryRight partial partialRight".split(" "),function(n){
An[n].placeholder=An}),r(["drop","take"],function(n,t){Un.prototype[n]=function(r){r=r===T?1:Li(Au(r),0);var e=this.__filtered__&&!t?new Un(this):this.clone();return e.__filtered__?e.__takeCount__=Ui(r,e.__takeCount__):e.__views__.push({size:Ui(r,4294967295),type:n+(0>e.__dir__?"Right":"")}),e},Un.prototype[n+"Right"]=function(t){return this.reverse()[n](t).reverse()}}),r(["filter","map","takeWhile"],function(n,t){var r=t+1,e=1==r||3==r;Un.prototype[n]=function(n){var t=this.clone();return t.__iteratees__.push({
iteratee:ye(n,3),type:r}),t.__filtered__=t.__filtered__||e,t}}),r(["head","last"],function(n,t){var r="take"+(t?"Right":"");Un.prototype[n]=function(){return this[r](1).value()[0]}}),r(["initial","tail"],function(n,t){var r="drop"+(t?"":"Right");Un.prototype[n]=function(){return this.__filtered__?new Un(this):this[r](1)}}),Un.prototype.compact=function(){return this.filter(Tu)},Un.prototype.find=function(n){return this.filter(n).head()},Un.prototype.findLast=function(n){return this.reverse().find(n);
},Un.prototype.invokeMap=fr(function(n,t){return typeof n=="function"?new Un(this):this.map(function(r){return Lt(r,n,t)})}),Un.prototype.reject=function(n){return this.filter(cu(ye(n)))},Un.prototype.slice=function(n,t){n=Au(n);var r=this;return r.__filtered__&&(0<n||0>t)?new Un(r):(0>n?r=r.takeRight(-n):n&&(r=r.drop(n)),t!==T&&(t=Au(t),r=0>t?r.dropRight(-t):r.take(t-n)),r)},Un.prototype.takeRightWhile=function(n){return this.reverse().takeWhile(n).reverse()},Un.prototype.toArray=function(){return this.take(4294967295);
},mt(Un.prototype,function(n,t){var r=/^(?:filter|find|map|reject)|While$/.test(t),e=/^(?:head|last)$/.test(t),u=An[e?"take"+("last"==t?"Right":""):t],i=e||/^find/.test(t);u&&(An.prototype[t]=function(){function t(n){return n=u.apply(An,a([n],f)),e&&h?n[0]:n}var o=this.__wrapped__,f=e?[1]:arguments,c=o instanceof Un,l=f[0],s=c||of(o);s&&r&&typeof l=="function"&&1!=l.length&&(c=s=false);var h=this.__chain__,p=!!this.__actions__.length,l=i&&!h,c=c&&!p;return!i&&s?(o=c?o:new Un(this),o=n.apply(o,f),o.__actions__.push({
func:Ye,args:[t],thisArg:T}),new On(o,h)):l&&c?n.apply(this,f):(o=this.thru(t),l?e?o.value()[0]:o.value():o)})}),r("pop push shift sort splice unshift".split(" "),function(n){var t=ti[n],r=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",e=/^(?:pop|shift)$/.test(n);An.prototype[n]=function(){var n=arguments;if(e&&!this.__chain__){var u=this.value();return t.apply(of(u)?u:[],n)}return this[r](function(r){return t.apply(of(r)?r:[],n)})}}),mt(Un.prototype,function(n,t){var r=An[t];if(r){var e=r.name+"";
(Ki[e]||(Ki[e]=[])).push({name:t,func:r})}}),Ki[Jr(T,2).name]=[{name:"wrapper",func:T}],Un.prototype.clone=function(){var n=new Un(this.__wrapped__);return n.__actions__=Ur(this.__actions__),n.__dir__=this.__dir__,n.__filtered__=this.__filtered__,n.__iteratees__=Ur(this.__iteratees__),n.__takeCount__=this.__takeCount__,n.__views__=Ur(this.__views__),n},Un.prototype.reverse=function(){if(this.__filtered__){var n=new Un(this);n.__dir__=-1,n.__filtered__=true}else n=this.clone(),n.__dir__*=-1;return n;
},Un.prototype.value=function(){var n,t=this.__wrapped__.value(),r=this.__dir__,e=of(t),u=0>r,i=e?t.length:0;n=i;for(var o=this.__views__,f=0,c=-1,a=o.length;++c<a;){var l=o[c],s=l.size;switch(l.type){case"drop":f+=s;break;case"dropRight":n-=s;break;case"take":n=Ui(n,f+s);break;case"takeRight":f=Li(f,n-s)}}if(n={start:f,end:n},o=n.start,f=n.end,n=f-o,o=u?f:o-1,f=this.__iteratees__,c=f.length,a=0,l=Ui(n,this.__takeCount__),!e||!u&&i==n&&l==n)return wr(t,this.__actions__);e=[];n:for(;n--&&a<l;){for(o+=r,
u=-1,i=t[o];++u<c;){var h=f[u],s=h.type,h=(0,h.iteratee)(i);if(2==s)i=h;else if(!h){if(1==s)continue n;break n}}e[a++]=i}return e},An.prototype.at=Mo,An.prototype.chain=function(){return Je(this)},An.prototype.commit=function(){return new On(this.value(),this.__chain__)},An.prototype.next=function(){this.__values__===T&&(this.__values__=wu(this.value()));var n=this.__index__>=this.__values__.length;return{done:n,value:n?T:this.__values__[this.__index__++]}},An.prototype.plant=function(n){for(var t,r=this;r instanceof kn;){
var e=$e(r);e.__index__=0,e.__values__=T,t?u.__wrapped__=e:t=e;var u=e,r=r.__wrapped__}return u.__wrapped__=n,t},An.prototype.reverse=function(){var n=this.__wrapped__;return n instanceof Un?(this.__actions__.length&&(n=new Un(this)),n=n.reverse(),n.__actions__.push({func:Ye,args:[Ke],thisArg:T}),new On(n,this.__chain__)):this.thru(Ke)},An.prototype.toJSON=An.prototype.valueOf=An.prototype.value=function(){return wr(this.__wrapped__,this.__actions__)},An.prototype.first=An.prototype.head,ji&&(An.prototype[ji]=Qe),
An}(); true?(Fn._=rt, !(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return rt}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))):Pn?((Pn.exports=rt)._=rt,Nn._=rt):Fn._=rt}).call(this);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), __webpack_require__(6)(module)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var mapping = __webpack_require__(8),
    fallbackHolder = __webpack_require__(9);

/** Built-in value reference. */
var push = Array.prototype.push;

/**
 * Creates a function, with an arity of `n`, that invokes `func` with the
 * arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} n The arity of the new function.
 * @returns {Function} Returns the new function.
 */
function baseArity(func, n) {
  return n == 2
    ? function(a, b) { return func.apply(undefined, arguments); }
    : function(a) { return func.apply(undefined, arguments); };
}

/**
 * Creates a function that invokes `func`, with up to `n` arguments, ignoring
 * any additional arguments.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @param {number} n The arity cap.
 * @returns {Function} Returns the new function.
 */
function baseAry(func, n) {
  return n == 2
    ? function(a, b) { return func(a, b); }
    : function(a) { return func(a); };
}

/**
 * Creates a clone of `array`.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the cloned array.
 */
function cloneArray(array) {
  var length = array ? array.length : 0,
      result = Array(length);

  while (length--) {
    result[length] = array[length];
  }
  return result;
}

/**
 * Creates a function that clones a given object using the assignment `func`.
 *
 * @private
 * @param {Function} func The assignment function.
 * @returns {Function} Returns the new cloner function.
 */
function createCloner(func) {
  return function(object) {
    return func({}, object);
  };
}

/**
 * A specialized version of `_.spread` which flattens the spread array into
 * the arguments of the invoked `func`.
 *
 * @private
 * @param {Function} func The function to spread arguments over.
 * @param {number} start The start position of the spread.
 * @returns {Function} Returns the new function.
 */
function flatSpread(func, start) {
  return function() {
    var length = arguments.length,
        lastIndex = length - 1,
        args = Array(length);

    while (length--) {
      args[length] = arguments[length];
    }
    var array = args[start],
        otherArgs = args.slice(0, start);

    if (array) {
      push.apply(otherArgs, array);
    }
    if (start != lastIndex) {
      push.apply(otherArgs, args.slice(start + 1));
    }
    return func.apply(this, otherArgs);
  };
}

/**
 * Creates a function that wraps `func` and uses `cloner` to clone the first
 * argument it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} cloner The function to clone arguments.
 * @returns {Function} Returns the new immutable function.
 */
function wrapImmutable(func, cloner) {
  return function() {
    var length = arguments.length;
    if (!length) {
      return;
    }
    var args = Array(length);
    while (length--) {
      args[length] = arguments[length];
    }
    var result = args[0] = cloner.apply(undefined, args);
    func.apply(undefined, args);
    return result;
  };
}

/**
 * The base implementation of `convert` which accepts a `util` object of methods
 * required to perform conversions.
 *
 * @param {Object} util The util object.
 * @param {string} name The name of the function to convert.
 * @param {Function} func The function to convert.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.cap=true] Specify capping iteratee arguments.
 * @param {boolean} [options.curry=true] Specify currying.
 * @param {boolean} [options.fixed=true] Specify fixed arity.
 * @param {boolean} [options.immutable=true] Specify immutable operations.
 * @param {boolean} [options.rearg=true] Specify rearranging arguments.
 * @returns {Function|Object} Returns the converted function or object.
 */
function baseConvert(util, name, func, options) {
  var setPlaceholder,
      isLib = typeof name == 'function',
      isObj = name === Object(name);

  if (isObj) {
    options = func;
    func = name;
    name = undefined;
  }
  if (func == null) {
    throw new TypeError;
  }
  options || (options = {});

  var config = {
    'cap': 'cap' in options ? options.cap : true,
    'curry': 'curry' in options ? options.curry : true,
    'fixed': 'fixed' in options ? options.fixed : true,
    'immutable': 'immutable' in options ? options.immutable : true,
    'rearg': 'rearg' in options ? options.rearg : true
  };

  var forceCurry = ('curry' in options) && options.curry,
      forceFixed = ('fixed' in options) && options.fixed,
      forceRearg = ('rearg' in options) && options.rearg,
      placeholder = isLib ? func : fallbackHolder,
      pristine = isLib ? func.runInContext() : undefined;

  var helpers = isLib ? func : {
    'ary': util.ary,
    'assign': util.assign,
    'clone': util.clone,
    'curry': util.curry,
    'forEach': util.forEach,
    'isArray': util.isArray,
    'isError': util.isError,
    'isFunction': util.isFunction,
    'isWeakMap': util.isWeakMap,
    'iteratee': util.iteratee,
    'keys': util.keys,
    'rearg': util.rearg,
    'toInteger': util.toInteger,
    'toPath': util.toPath
  };

  var ary = helpers.ary,
      assign = helpers.assign,
      clone = helpers.clone,
      curry = helpers.curry,
      each = helpers.forEach,
      isArray = helpers.isArray,
      isError = helpers.isError,
      isFunction = helpers.isFunction,
      isWeakMap = helpers.isWeakMap,
      keys = helpers.keys,
      rearg = helpers.rearg,
      toInteger = helpers.toInteger,
      toPath = helpers.toPath;

  var aryMethodKeys = keys(mapping.aryMethod);

  var wrappers = {
    'castArray': function(castArray) {
      return function() {
        var value = arguments[0];
        return isArray(value)
          ? castArray(cloneArray(value))
          : castArray.apply(undefined, arguments);
      };
    },
    'iteratee': function(iteratee) {
      return function() {
        var func = arguments[0],
            arity = arguments[1],
            result = iteratee(func, arity),
            length = result.length;

        if (config.cap && typeof arity == 'number') {
          arity = arity > 2 ? (arity - 2) : 1;
          return (length && length <= arity) ? result : baseAry(result, arity);
        }
        return result;
      };
    },
    'mixin': function(mixin) {
      return function(source) {
        var func = this;
        if (!isFunction(func)) {
          return mixin(func, Object(source));
        }
        var pairs = [];
        each(keys(source), function(key) {
          if (isFunction(source[key])) {
            pairs.push([key, func.prototype[key]]);
          }
        });

        mixin(func, Object(source));

        each(pairs, function(pair) {
          var value = pair[1];
          if (isFunction(value)) {
            func.prototype[pair[0]] = value;
          } else {
            delete func.prototype[pair[0]];
          }
        });
        return func;
      };
    },
    'nthArg': function(nthArg) {
      return function(n) {
        var arity = n < 0 ? 1 : (toInteger(n) + 1);
        return curry(nthArg(n), arity);
      };
    },
    'rearg': function(rearg) {
      return function(func, indexes) {
        var arity = indexes ? indexes.length : 0;
        return curry(rearg(func, indexes), arity);
      };
    },
    'runInContext': function(runInContext) {
      return function(context) {
        return baseConvert(util, runInContext(context), options);
      };
    }
  };

  /*--------------------------------------------------------------------------*/

  /**
   * Casts `func` to a function with an arity capped iteratee if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @returns {Function} Returns the cast function.
   */
  function castCap(name, func) {
    if (config.cap) {
      var indexes = mapping.iterateeRearg[name];
      if (indexes) {
        return iterateeRearg(func, indexes);
      }
      var n = !isLib && mapping.iterateeAry[name];
      if (n) {
        return iterateeAry(func, n);
      }
    }
    return func;
  }

  /**
   * Casts `func` to a curried function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity of `func`.
   * @returns {Function} Returns the cast function.
   */
  function castCurry(name, func, n) {
    return (forceCurry || (config.curry && n > 1))
      ? curry(func, n)
      : func;
  }

  /**
   * Casts `func` to a fixed arity function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity cap.
   * @returns {Function} Returns the cast function.
   */
  function castFixed(name, func, n) {
    if (config.fixed && (forceFixed || !mapping.skipFixed[name])) {
      var data = mapping.methodSpread[name],
          start = data && data.start;

      return start  === undefined ? ary(func, n) : flatSpread(func, start);
    }
    return func;
  }

  /**
   * Casts `func` to an rearged function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity of `func`.
   * @returns {Function} Returns the cast function.
   */
  function castRearg(name, func, n) {
    return (config.rearg && n > 1 && (forceRearg || !mapping.skipRearg[name]))
      ? rearg(func, mapping.methodRearg[name] || mapping.aryRearg[n])
      : func;
  }

  /**
   * Creates a clone of `object` by `path`.
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {Array|string} path The path to clone by.
   * @returns {Object} Returns the cloned object.
   */
  function cloneByPath(object, path) {
    path = toPath(path);

    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        result = clone(Object(object)),
        nested = result;

    while (nested != null && ++index < length) {
      var key = path[index],
          value = nested[key];

      if (value != null &&
          !(isFunction(value) || isError(value) || isWeakMap(value))) {
        nested[key] = clone(index == lastIndex ? value : Object(value));
      }
      nested = nested[key];
    }
    return result;
  }

  /**
   * Converts `lodash` to an immutable auto-curried iteratee-first data-last
   * version with conversion `options` applied.
   *
   * @param {Object} [options] The options object. See `baseConvert` for more details.
   * @returns {Function} Returns the converted `lodash`.
   */
  function convertLib(options) {
    return _.runInContext.convert(options)(undefined);
  }

  /**
   * Create a converter function for `func` of `name`.
   *
   * @param {string} name The name of the function to convert.
   * @param {Function} func The function to convert.
   * @returns {Function} Returns the new converter function.
   */
  function createConverter(name, func) {
    var realName = mapping.aliasToReal[name] || name,
        methodName = mapping.remap[realName] || realName,
        oldOptions = options;

    return function(options) {
      var newUtil = isLib ? pristine : helpers,
          newFunc = isLib ? pristine[methodName] : func,
          newOptions = assign(assign({}, oldOptions), options);

      return baseConvert(newUtil, realName, newFunc, newOptions);
    };
  }

  /**
   * Creates a function that wraps `func` to invoke its iteratee, with up to `n`
   * arguments, ignoring any additional arguments.
   *
   * @private
   * @param {Function} func The function to cap iteratee arguments for.
   * @param {number} n The arity cap.
   * @returns {Function} Returns the new function.
   */
  function iterateeAry(func, n) {
    return overArg(func, function(func) {
      return typeof func == 'function' ? baseAry(func, n) : func;
    });
  }

  /**
   * Creates a function that wraps `func` to invoke its iteratee with arguments
   * arranged according to the specified `indexes` where the argument value at
   * the first index is provided as the first argument, the argument value at
   * the second index is provided as the second argument, and so on.
   *
   * @private
   * @param {Function} func The function to rearrange iteratee arguments for.
   * @param {number[]} indexes The arranged argument indexes.
   * @returns {Function} Returns the new function.
   */
  function iterateeRearg(func, indexes) {
    return overArg(func, function(func) {
      var n = indexes.length;
      return baseArity(rearg(baseAry(func, n), indexes), n);
    });
  }

  /**
   * Creates a function that invokes `func` with its first argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function() {
      var length = arguments.length;
      if (!length) {
        return func();
      }
      var args = Array(length);
      while (length--) {
        args[length] = arguments[length];
      }
      var index = config.rearg ? 0 : (length - 1);
      args[index] = transform(args[index]);
      return func.apply(undefined, args);
    };
  }

  /**
   * Creates a function that wraps `func` and applys the conversions
   * rules by `name`.
   *
   * @private
   * @param {string} name The name of the function to wrap.
   * @param {Function} func The function to wrap.
   * @returns {Function} Returns the converted function.
   */
  function wrap(name, func) {
    var result,
        realName = mapping.aliasToReal[name] || name,
        wrapped = func,
        wrapper = wrappers[realName];

    if (wrapper) {
      wrapped = wrapper(func);
    }
    else if (config.immutable) {
      if (mapping.mutate.array[realName]) {
        wrapped = wrapImmutable(func, cloneArray);
      }
      else if (mapping.mutate.object[realName]) {
        wrapped = wrapImmutable(func, createCloner(func));
      }
      else if (mapping.mutate.set[realName]) {
        wrapped = wrapImmutable(func, cloneByPath);
      }
    }
    each(aryMethodKeys, function(aryKey) {
      each(mapping.aryMethod[aryKey], function(otherName) {
        if (realName == otherName) {
          var data = mapping.methodSpread[realName],
              afterRearg = data && data.afterRearg;

          result = afterRearg
            ? castFixed(realName, castRearg(realName, wrapped, aryKey), aryKey)
            : castRearg(realName, castFixed(realName, wrapped, aryKey), aryKey);

          result = castCap(realName, result);
          result = castCurry(realName, result, aryKey);
          return false;
        }
      });
      return !result;
    });

    result || (result = wrapped);
    if (result == func) {
      result = forceCurry ? curry(result, 1) : function() {
        return func.apply(this, arguments);
      };
    }
    result.convert = createConverter(realName, func);
    if (mapping.placeholder[realName]) {
      setPlaceholder = true;
      result.placeholder = func.placeholder = placeholder;
    }
    return result;
  }

  /*--------------------------------------------------------------------------*/

  if (!isObj) {
    return wrap(name, func);
  }
  var _ = func;

  // Convert methods by ary cap.
  var pairs = [];
  each(aryMethodKeys, function(aryKey) {
    each(mapping.aryMethod[aryKey], function(key) {
      var func = _[mapping.remap[key] || key];
      if (func) {
        pairs.push([key, wrap(key, func)]);
      }
    });
  });

  // Convert remaining methods.
  each(keys(_), function(key) {
    var func = _[key];
    if (typeof func == 'function') {
      var length = pairs.length;
      while (length--) {
        if (pairs[length][0] == key) {
          return;
        }
      }
      func.convert = createConverter(key, func);
      pairs.push([key, func]);
    }
  });

  // Assign to `_` leaving `_.prototype` unchanged to allow chaining.
  each(pairs, function(pair) {
    _[pair[0]] = pair[1];
  });

  _.convert = convertLib;
  if (setPlaceholder) {
    _.placeholder = placeholder;
  }
  // Assign aliases.
  each(keys(_), function(key) {
    each(mapping.realToAlias[key] || [], function(alias) {
      _[alias] = _[key];
    });
  });

  return _;
}

module.exports = baseConvert;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/** Used to map aliases to their real names. */
exports.aliasToReal = {

  // Lodash aliases.
  'each': 'forEach',
  'eachRight': 'forEachRight',
  'entries': 'toPairs',
  'entriesIn': 'toPairsIn',
  'extend': 'assignIn',
  'extendAll': 'assignInAll',
  'extendAllWith': 'assignInAllWith',
  'extendWith': 'assignInWith',
  'first': 'head',

  // Methods that are curried variants of others.
  'conforms': 'conformsTo',
  'matches': 'isMatch',
  'property': 'get',

  // Ramda aliases.
  '__': 'placeholder',
  'F': 'stubFalse',
  'T': 'stubTrue',
  'all': 'every',
  'allPass': 'overEvery',
  'always': 'constant',
  'any': 'some',
  'anyPass': 'overSome',
  'apply': 'spread',
  'assoc': 'set',
  'assocPath': 'set',
  'complement': 'negate',
  'compose': 'flowRight',
  'contains': 'includes',
  'dissoc': 'unset',
  'dissocPath': 'unset',
  'dropLast': 'dropRight',
  'dropLastWhile': 'dropRightWhile',
  'equals': 'isEqual',
  'identical': 'eq',
  'indexBy': 'keyBy',
  'init': 'initial',
  'invertObj': 'invert',
  'juxt': 'over',
  'omitAll': 'omit',
  'nAry': 'ary',
  'path': 'get',
  'pathEq': 'matchesProperty',
  'pathOr': 'getOr',
  'paths': 'at',
  'pickAll': 'pick',
  'pipe': 'flow',
  'pluck': 'map',
  'prop': 'get',
  'propEq': 'matchesProperty',
  'propOr': 'getOr',
  'props': 'at',
  'symmetricDifference': 'xor',
  'symmetricDifferenceBy': 'xorBy',
  'symmetricDifferenceWith': 'xorWith',
  'takeLast': 'takeRight',
  'takeLastWhile': 'takeRightWhile',
  'unapply': 'rest',
  'unnest': 'flatten',
  'useWith': 'overArgs',
  'where': 'conformsTo',
  'whereEq': 'isMatch',
  'zipObj': 'zipObject'
};

/** Used to map ary to method names. */
exports.aryMethod = {
  '1': [
    'assignAll', 'assignInAll', 'attempt', 'castArray', 'ceil', 'create',
    'curry', 'curryRight', 'defaultsAll', 'defaultsDeepAll', 'floor', 'flow',
    'flowRight', 'fromPairs', 'invert', 'iteratee', 'memoize', 'method', 'mergeAll',
    'methodOf', 'mixin', 'nthArg', 'over', 'overEvery', 'overSome','rest', 'reverse',
    'round', 'runInContext', 'spread', 'template', 'trim', 'trimEnd', 'trimStart',
    'uniqueId', 'words', 'zipAll'
  ],
  '2': [
    'add', 'after', 'ary', 'assign', 'assignAllWith', 'assignIn', 'assignInAllWith',
    'at', 'before', 'bind', 'bindAll', 'bindKey', 'chunk', 'cloneDeepWith',
    'cloneWith', 'concat', 'conformsTo', 'countBy', 'curryN', 'curryRightN',
    'debounce', 'defaults', 'defaultsDeep', 'defaultTo', 'delay', 'difference',
    'divide', 'drop', 'dropRight', 'dropRightWhile', 'dropWhile', 'endsWith', 'eq',
    'every', 'filter', 'find', 'findIndex', 'findKey', 'findLast', 'findLastIndex',
    'findLastKey', 'flatMap', 'flatMapDeep', 'flattenDepth', 'forEach',
    'forEachRight', 'forIn', 'forInRight', 'forOwn', 'forOwnRight', 'get',
    'groupBy', 'gt', 'gte', 'has', 'hasIn', 'includes', 'indexOf', 'intersection',
    'invertBy', 'invoke', 'invokeMap', 'isEqual', 'isMatch', 'join', 'keyBy',
    'lastIndexOf', 'lt', 'lte', 'map', 'mapKeys', 'mapValues', 'matchesProperty',
    'maxBy', 'meanBy', 'merge', 'mergeAllWith', 'minBy', 'multiply', 'nth', 'omit',
    'omitBy', 'overArgs', 'pad', 'padEnd', 'padStart', 'parseInt', 'partial',
    'partialRight', 'partition', 'pick', 'pickBy', 'propertyOf', 'pull', 'pullAll',
    'pullAt', 'random', 'range', 'rangeRight', 'rearg', 'reject', 'remove',
    'repeat', 'restFrom', 'result', 'sampleSize', 'some', 'sortBy', 'sortedIndex',
    'sortedIndexOf', 'sortedLastIndex', 'sortedLastIndexOf', 'sortedUniqBy',
    'split', 'spreadFrom', 'startsWith', 'subtract', 'sumBy', 'take', 'takeRight',
    'takeRightWhile', 'takeWhile', 'tap', 'throttle', 'thru', 'times', 'trimChars',
    'trimCharsEnd', 'trimCharsStart', 'truncate', 'union', 'uniqBy', 'uniqWith',
    'unset', 'unzipWith', 'without', 'wrap', 'xor', 'zip', 'zipObject',
    'zipObjectDeep'
  ],
  '3': [
    'assignInWith', 'assignWith', 'clamp', 'differenceBy', 'differenceWith',
    'findFrom', 'findIndexFrom', 'findLastFrom', 'findLastIndexFrom', 'getOr',
    'includesFrom', 'indexOfFrom', 'inRange', 'intersectionBy', 'intersectionWith',
    'invokeArgs', 'invokeArgsMap', 'isEqualWith', 'isMatchWith', 'flatMapDepth',
    'lastIndexOfFrom', 'mergeWith', 'orderBy', 'padChars', 'padCharsEnd',
    'padCharsStart', 'pullAllBy', 'pullAllWith', 'rangeStep', 'rangeStepRight',
    'reduce', 'reduceRight', 'replace', 'set', 'slice', 'sortedIndexBy',
    'sortedLastIndexBy', 'transform', 'unionBy', 'unionWith', 'update', 'xorBy',
    'xorWith', 'zipWith'
  ],
  '4': [
    'fill', 'setWith', 'updateWith'
  ]
};

/** Used to map ary to rearg configs. */
exports.aryRearg = {
  '2': [1, 0],
  '3': [2, 0, 1],
  '4': [3, 2, 0, 1]
};

/** Used to map method names to their iteratee ary. */
exports.iterateeAry = {
  'dropRightWhile': 1,
  'dropWhile': 1,
  'every': 1,
  'filter': 1,
  'find': 1,
  'findFrom': 1,
  'findIndex': 1,
  'findIndexFrom': 1,
  'findKey': 1,
  'findLast': 1,
  'findLastFrom': 1,
  'findLastIndex': 1,
  'findLastIndexFrom': 1,
  'findLastKey': 1,
  'flatMap': 1,
  'flatMapDeep': 1,
  'flatMapDepth': 1,
  'forEach': 1,
  'forEachRight': 1,
  'forIn': 1,
  'forInRight': 1,
  'forOwn': 1,
  'forOwnRight': 1,
  'map': 1,
  'mapKeys': 1,
  'mapValues': 1,
  'partition': 1,
  'reduce': 2,
  'reduceRight': 2,
  'reject': 1,
  'remove': 1,
  'some': 1,
  'takeRightWhile': 1,
  'takeWhile': 1,
  'times': 1,
  'transform': 2
};

/** Used to map method names to iteratee rearg configs. */
exports.iterateeRearg = {
  'mapKeys': [1],
  'reduceRight': [1, 0]
};

/** Used to map method names to rearg configs. */
exports.methodRearg = {
  'assignInAllWith': [1, 0],
  'assignInWith': [1, 2, 0],
  'assignAllWith': [1, 0],
  'assignWith': [1, 2, 0],
  'differenceBy': [1, 2, 0],
  'differenceWith': [1, 2, 0],
  'getOr': [2, 1, 0],
  'intersectionBy': [1, 2, 0],
  'intersectionWith': [1, 2, 0],
  'isEqualWith': [1, 2, 0],
  'isMatchWith': [2, 1, 0],
  'mergeAllWith': [1, 0],
  'mergeWith': [1, 2, 0],
  'padChars': [2, 1, 0],
  'padCharsEnd': [2, 1, 0],
  'padCharsStart': [2, 1, 0],
  'pullAllBy': [2, 1, 0],
  'pullAllWith': [2, 1, 0],
  'rangeStep': [1, 2, 0],
  'rangeStepRight': [1, 2, 0],
  'setWith': [3, 1, 2, 0],
  'sortedIndexBy': [2, 1, 0],
  'sortedLastIndexBy': [2, 1, 0],
  'unionBy': [1, 2, 0],
  'unionWith': [1, 2, 0],
  'updateWith': [3, 1, 2, 0],
  'xorBy': [1, 2, 0],
  'xorWith': [1, 2, 0],
  'zipWith': [1, 2, 0]
};

/** Used to map method names to spread configs. */
exports.methodSpread = {
  'assignAll': { 'start': 0 },
  'assignAllWith': { 'start': 0 },
  'assignInAll': { 'start': 0 },
  'assignInAllWith': { 'start': 0 },
  'defaultsAll': { 'start': 0 },
  'defaultsDeepAll': { 'start': 0 },
  'invokeArgs': { 'start': 2 },
  'invokeArgsMap': { 'start': 2 },
  'mergeAll': { 'start': 0 },
  'mergeAllWith': { 'start': 0 },
  'partial': { 'start': 1 },
  'partialRight': { 'start': 1 },
  'without': { 'start': 1 },
  'zipAll': { 'start': 0 }
};

/** Used to identify methods which mutate arrays or objects. */
exports.mutate = {
  'array': {
    'fill': true,
    'pull': true,
    'pullAll': true,
    'pullAllBy': true,
    'pullAllWith': true,
    'pullAt': true,
    'remove': true,
    'reverse': true
  },
  'object': {
    'assign': true,
    'assignAll': true,
    'assignAllWith': true,
    'assignIn': true,
    'assignInAll': true,
    'assignInAllWith': true,
    'assignInWith': true,
    'assignWith': true,
    'defaults': true,
    'defaultsAll': true,
    'defaultsDeep': true,
    'defaultsDeepAll': true,
    'merge': true,
    'mergeAll': true,
    'mergeAllWith': true,
    'mergeWith': true,
  },
  'set': {
    'set': true,
    'setWith': true,
    'unset': true,
    'update': true,
    'updateWith': true
  }
};

/** Used to track methods with placeholder support */
exports.placeholder = {
  'bind': true,
  'bindKey': true,
  'curry': true,
  'curryRight': true,
  'partial': true,
  'partialRight': true
};

/** Used to map real names to their aliases. */
exports.realToAlias = (function() {
  var hasOwnProperty = Object.prototype.hasOwnProperty,
      object = exports.aliasToReal,
      result = {};

  for (var key in object) {
    var value = object[key];
    if (hasOwnProperty.call(result, value)) {
      result[value].push(key);
    } else {
      result[value] = [key];
    }
  }
  return result;
}());

/** Used to map method names to other names. */
exports.remap = {
  'assignAll': 'assign',
  'assignAllWith': 'assignWith',
  'assignInAll': 'assignIn',
  'assignInAllWith': 'assignInWith',
  'curryN': 'curry',
  'curryRightN': 'curryRight',
  'defaultsAll': 'defaults',
  'defaultsDeepAll': 'defaultsDeep',
  'findFrom': 'find',
  'findIndexFrom': 'findIndex',
  'findLastFrom': 'findLast',
  'findLastIndexFrom': 'findLastIndex',
  'getOr': 'get',
  'includesFrom': 'includes',
  'indexOfFrom': 'indexOf',
  'invokeArgs': 'invoke',
  'invokeArgsMap': 'invokeMap',
  'lastIndexOfFrom': 'lastIndexOf',
  'mergeAll': 'merge',
  'mergeAllWith': 'mergeWith',
  'padChars': 'pad',
  'padCharsEnd': 'padEnd',
  'padCharsStart': 'padStart',
  'propertyOf': 'get',
  'rangeStep': 'range',
  'rangeStepRight': 'rangeRight',
  'restFrom': 'rest',
  'spreadFrom': 'spread',
  'trimChars': 'trim',
  'trimCharsEnd': 'trimEnd',
  'trimCharsStart': 'trimStart',
  'zipAll': 'zip'
};

/** Used to track methods that skip fixing their arity. */
exports.skipFixed = {
  'castArray': true,
  'flow': true,
  'flowRight': true,
  'iteratee': true,
  'mixin': true,
  'rearg': true,
  'runInContext': true
};

/** Used to track methods that skip rearranging arguments. */
exports.skipRearg = {
  'add': true,
  'assign': true,
  'assignIn': true,
  'bind': true,
  'bindKey': true,
  'concat': true,
  'difference': true,
  'divide': true,
  'eq': true,
  'gt': true,
  'gte': true,
  'isEqual': true,
  'lt': true,
  'lte': true,
  'matchesProperty': true,
  'merge': true,
  'multiply': true,
  'overArgs': true,
  'partial': true,
  'partialRight': true,
  'propertyOf': true,
  'random': true,
  'range': true,
  'rangeRight': true,
  'subtract': true,
  'zip': true,
  'zipObject': true,
  'zipObjectDeep': true
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/**
 * The default argument placeholder value for methods.
 *
 * @type {Object}
 */
module.exports = {};


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actionHelpers__ = __webpack_require__(1);


function concatScores(scores) {
  let actionLists = scores.map(__WEBPACK_IMPORTED_MODULE_0__actionHelpers__["c" /* get */])
  return __WEBPACK_IMPORTED_MODULE_0__actionHelpers__["e" /* wrap */](
    __WEBPACK_IMPORTED_MODULE_0__actionHelpers__["a" /* clean */](
      __WEBPACK_IMPORTED_MODULE_0__actionHelpers__["b" /* concat */](actionLists)
    )
  )
}

/* harmony default export */ __webpack_exports__["a"] = (concatScores);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_fp__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_fp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nearley__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nearley___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nearley__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__grammar__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__grammar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__grammar__);




let DEFAULT_DURATION = 1/4
let PARAM_ALIASES = {
  d: 'dur',
  duration: 'dur',
  v: 'vel',
  velocity: 'vel'
}
let MIDDLE_A_NN = 69
let PITCH_CLASSES = {
  'C': -9, 'C♯': -8, 'D♭': -8, 'D': -7,
  'D♯': -6, 'E♭': -6, 'E': -5, 'F': -4,
  'F♯': -3, 'G♭': -3, 'G': -2, 'G♯': -1,
  'A♭': -1, 'A': 0, 'A♯': 1, 'B♭': 1, 'B': 2
}

function noteActionFrom(instruction) {
  let nn = nnFrom(instruction)
  let payload = __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.omit(['oct'], instruction.context)
  payload = __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.set('nn', nn, payload)
  return { payload, type: 'NOTE' }
}

function nnFrom(instruction) {
  switch(instruction.data.type) {
    case 'PITCH_CLASS':
      let value = instruction.data.value.replace('#', '♯').replace('b', '♭')
      return (instruction.context.oct * 12) + MIDDLE_A_NN + PITCH_CLASSES[value]
    case 'RELATIVE':
      return (instruction.context.oct * 12) + MIDDLE_A_NN + instruction.data.value
    case 'MIDI':
      return instruction.data.value
  }
  throw new Error('This note type is unknown to the score generator')
}

function trigActionFrom(instruction) {
  let payload = __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.omit(['oct'], instruction.context)
  payload = __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.set('name', instruction.data, payload)
  return { payload, type: 'TRIG' }
}

function restActionFrom(instruction) {
  return { type: 'NOOP', payload: { time: instruction.context.time } }
}

function generateScore(instructions) {
  return instructions.map((instruction) => {
    switch(instruction.type) {
      case 'NOTE': return noteActionFrom(instruction)
      case 'TRIG': return trigActionFrom(instruction)
      case 'REST': return restActionFrom(instruction)
    }
    throw new Error('This instruction type is unknown to the score generator')
  })
}

function optimizeIntermediate(instructions) {
  let lastIndex = instructions.length - 1
  instructions = instructions.filter(({ type }, i) => type !== 'REST' || i === lastIndex)
  let last = __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.last(instructions)
  if (last.type === 'REST') {
    // HACK all aboard for mutation central
    last.context.time = last.context.time + last.context.dur
    delete last.context.dur
  }
  return instructions
}

function normalizeParamName(param) {
  return PARAM_ALIASES[param] || param
}

function generateIntermediate(parsings) {
  let context = { time: 0, oct: 0, dur: DEFAULT_DURATION }
  return __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.compact(parsings.map((parsing) => {
    let [type, data] = parsing
    if (type === 'SETTING') {
      context = __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.set(normalizeParamName(data.param), data.value, context)
      return null
    }
    if (type === 'OCTAVE_CHANGE') {
      context = __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.set('oct', context.oct + data, context)
      return null
    }
    let instruction = { context, data, type }
    context = __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.set('time', context.time + context.dur, context)
    return instruction
  }))
}

function parse(s) {
  let parser = new __WEBPACK_IMPORTED_MODULE_1_nearley___default.a.Parser(__WEBPACK_IMPORTED_MODULE_2__grammar___default.a.ParserRules, __WEBPACK_IMPORTED_MODULE_2__grammar___default.a.ParserStart)
  parser.feed(s)
  let parsings = parser.results
  if (parsings.length > 1) {
    throw new Error('Syntax error in sequence: combination is ambiguous')
  }
  return __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.compact(parsings[0])
}

////////////////////////////////////////////////////////////////////////////////

function umlangEval(s) {
  s = (s || '').trim()
  return generateScore(optimizeIntermediate(generateIntermediate(parse(s))))
}

/* harmony default export */ __webpack_exports__["a"] = (umlangEval);


/***/ }),
/* 12 */
/***/ (function(module, exports) {

(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.nearley = factory();
    }
}(this, function() {

    function Rule(name, symbols, postprocess) {
        this.id = ++Rule.highestId;
        this.name = name;
        this.symbols = symbols;        // a list of literal | regex class | nonterminal
        this.postprocess = postprocess;
        return this;
    }
    Rule.highestId = 0;

    Rule.prototype.toString = function(withCursorAt) {
        function stringifySymbolSequence (e) {
            return e.literal ? JSON.stringify(e.literal) :
                   e.type ? '%' + e.type : e.toString();
        }
        var symbolSequence = (typeof withCursorAt === "undefined")
                             ? this.symbols.map(stringifySymbolSequence).join(' ')
                             : (   this.symbols.slice(0, withCursorAt).map(stringifySymbolSequence).join(' ')
                                 + " ● "
                                 + this.symbols.slice(withCursorAt).map(stringifySymbolSequence).join(' ')     );
        return this.name + " → " + symbolSequence;
    }


    // a State is a rule at a position from a given starting point in the input stream (reference)
    function State(rule, dot, reference, wantedBy) {
        this.rule = rule;
        this.dot = dot;
        this.reference = reference;
        this.data = [];
        this.wantedBy = wantedBy;
        this.isComplete = this.dot === rule.symbols.length;
    }

    State.prototype.toString = function() {
        return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
    };

    State.prototype.nextState = function(child) {
        var state = new State(this.rule, this.dot + 1, this.reference, this.wantedBy);
        state.left = this;
        state.right = child;
        if (state.isComplete) {
            state.data = state.build();
        }
        return state;
    };

    State.prototype.build = function() {
        var children = [];
        var node = this;
        do {
            children.push(node.right.data);
            node = node.left;
        } while (node.left);
        children.reverse();
        return children;
    };

    State.prototype.finish = function() {
        if (this.rule.postprocess) {
            this.data = this.rule.postprocess(this.data, this.reference, Parser.fail);
        }
    };


    function Column(grammar, index) {
        this.grammar = grammar;
        this.index = index;
        this.states = [];
        this.wants = {}; // states indexed by the non-terminal they expect
        this.scannable = []; // list of states that expect a token
        this.completed = {}; // states that are nullable
    }


    Column.prototype.process = function(nextColumn) {
        var states = this.states;
        var wants = this.wants;
        var completed = this.completed;

        for (var w = 0; w < states.length; w++) { // nb. we push() during iteration
            var state = states[w];

            if (state.isComplete) {
                state.finish();
                if (state.data !== Parser.fail) {
                    // complete
                    var wantedBy = state.wantedBy;
                    for (var i = wantedBy.length; i--; ) { // this line is hot
                        var left = wantedBy[i];
                        this.complete(left, state);
                    }

                    // special-case nullables
                    if (state.reference === this.index) {
                        // make sure future predictors of this rule get completed.
                        var exp = state.rule.name;
                        (this.completed[exp] = this.completed[exp] || []).push(state);
                    }
                }

            } else {
                // queue scannable states
                var exp = state.rule.symbols[state.dot];
                if (typeof exp !== 'string') {
                    this.scannable.push(state);
                    continue;
                }

                // predict
                if (wants[exp]) {
                    wants[exp].push(state);

                    if (completed.hasOwnProperty(exp)) {
                        var nulls = completed[exp];
                        for (var i = 0; i < nulls.length; i++) {
                            var right = nulls[i];
                            this.complete(state, right);
                        }
                    }
                } else {
                    wants[exp] = [state];
                    this.predict(exp);
                }
            }
        }
    }

    Column.prototype.predict = function(exp) {
        var rules = this.grammar.byName[exp] || [];

        for (var i = 0; i < rules.length; i++) {
            var r = rules[i];
            var wantedBy = this.wants[exp];
            var s = new State(r, 0, this.index, wantedBy);
            this.states.push(s);
        }
    }

    Column.prototype.complete = function(left, right) {
        var copy = left.nextState(right);
        this.states.push(copy);
    }


    function Grammar(rules, start) {
        this.rules = rules;
        this.start = start || this.rules[0].name;
        var byName = this.byName = {};
        this.rules.forEach(function(rule) {
            if (!byName.hasOwnProperty(rule.name)) {
                byName[rule.name] = [];
            }
            byName[rule.name].push(rule);
        });
    }

    // So we can allow passing (rules, start) directly to Parser for backwards compatibility
    Grammar.fromCompiled = function(rules, start) {
        var lexer = rules.Lexer;
        if (rules.ParserStart) {
          start = rules.ParserStart;
          rules = rules.ParserRules;
        }
        var rules = rules.map(function (r) { return (new Rule(r.name, r.symbols, r.postprocess)); });
        var g = new Grammar(rules, start);
        g.lexer = lexer; // nb. storing lexer on Grammar is iffy, but unavoidable
        return g;
    }


    function StreamLexer() {
      this.reset("");
    }

    StreamLexer.prototype.reset = function(data, state) {
        this.buffer = data;
        this.index = 0;
        this.line = state ? state.line : 1;
        this.lastLineBreak = state ? -state.col : 0;
    }

    StreamLexer.prototype.next = function() {
        if (this.index < this.buffer.length) {
            var ch = this.buffer[this.index++];
            if (ch === '\n') {
              this.line += 1;
              this.lastLineBreak = this.index;
            }
            return {value: ch};
        }
    }

    StreamLexer.prototype.save = function() {
      return {
        line: this.line,
        col: this.index - this.lastLineBreak,
      }
    }

    StreamLexer.prototype.formatError = function(token, message) {
        // nb. this gets called after consuming the offending token,
        // so the culprit is index-1
        var buffer = this.buffer;
        if (typeof buffer === 'string') {
            var nextLineBreak = buffer.indexOf('\n', this.index);
            if (nextLineBreak === -1) nextLineBreak = buffer.length;
            var line = buffer.substring(this.lastLineBreak, nextLineBreak)
            var col = this.index - this.lastLineBreak;
            message += " at line " + this.line + " col " + col + ":\n\n";
            message += "  " + line + "\n"
            message += "  " + Array(col).join(" ") + "^"
            return message;
        } else {
            return message + " at index " + (this.index - 1);
        }
    }


    function Parser(rules, start, options) {
        if (rules instanceof Grammar) {
            var grammar = rules;
            var options = start;
        } else {
            var grammar = Grammar.fromCompiled(rules, start);
        }
        this.grammar = grammar;

        // Read options
        this.options = {
            keepHistory: false,
            lexer: grammar.lexer || new StreamLexer,
        };
        for (var key in (options || {})) {
            this.options[key] = options[key];
        }

        // Setup lexer
        this.lexer = this.options.lexer;
        this.lexerState = undefined;

        // Setup a table
        var column = new Column(grammar, 0);
        var table = this.table = [column];

        // I could be expecting anything.
        column.wants[grammar.start] = [];
        column.predict(grammar.start);
        // TODO what if start rule is nullable?
        column.process();
        this.current = 0; // token index
    }

    // create a reserved token for indicating a parse fail
    Parser.fail = {};

    Parser.prototype.feed = function(chunk) {
        var lexer = this.lexer;
        lexer.reset(chunk, this.lexerState);

        var token;
        while (token = lexer.next()) {
            // We add new states to table[current+1]
            var column = this.table[this.current];

            // GC unused states
            if (!this.options.keepHistory) {
                delete this.table[this.current - 1];
            }

            var n = this.current + 1;
            var nextColumn = new Column(this.grammar, n);
            this.table.push(nextColumn);

            // Advance all tokens that expect the symbol
            var literal = token.value;
            var value = lexer.constructor === StreamLexer ? token.value : token;
            var scannable = column.scannable;
            for (var w = scannable.length; w--; ) {
                var state = scannable[w];
                var expect = state.rule.symbols[state.dot];
                // Try to consume the token
                // either regex or literal
                if (expect.test ? expect.test(value) :
                    expect.type ? expect.type === token.type
                                : expect.literal === literal) {
                    // Add it
                    var next = state.nextState({data: value, token: token, isToken: true, reference: n - 1});
                    nextColumn.states.push(next);
                }
            }

            // Next, for each of the rules, we either
            // (a) complete it, and try to see if the reference row expected that
            //     rule
            // (b) predict the next nonterminal it expects by adding that
            //     nonterminal's start state
            // To prevent duplication, we also keep track of rules we have already
            // added

            nextColumn.process();

            // If needed, throw an error:
            if (nextColumn.states.length === 0) {
                // No states at all! This is not good.
                var message = this.lexer.formatError(token, "invalid syntax") + "\n";
                message += "Unexpected " + (token.type ? token.type + " token: " : "");
                message += JSON.stringify(token.value !== undefined ? token.value : token) + "\n";
                var err = new Error(message);
                err.offset = this.current;
                err.token = token;
                throw err;
            }

            // maybe save lexer state
            if (this.options.keepHistory) {
              column.lexerState = lexer.save()
            }

            this.current++;
        }
        if (column) {
          this.lexerState = lexer.save()
        }

        // Incrementally keep track of results
        this.results = this.finish();

        // Allow chaining, for whatever it's worth
        return this;
    };

    Parser.prototype.save = function() {
        var column = this.table[this.current];
        column.lexerState = this.lexerState;
        return column;
    };

    Parser.prototype.restore = function(column) {
        var index = column.index;
        this.current = index;
        this.table[index] = column;
        this.table.splice(index + 1);
        this.lexerState = column.lexerState;

        // Incrementally keep track of results
        this.results = this.finish();
    };

    // nb. deprecated: use save/restore instead!
    Parser.prototype.rewind = function(index) {
        if (!this.options.keepHistory) {
            throw new Error('set option `keepHistory` to enable rewinding')
        }
        // nb. recall column (table) indicies fall between token indicies.
        //        col 0   --   token 0   --   col 1
        this.restore(this.table[index]);
    };

    Parser.prototype.finish = function() {
        // Return the possible parsings
        var considerations = [];
        var start = this.grammar.start;
        var column = this.table[this.table.length - 1]
        column.states.forEach(function (t) {
            if (t.rule.name === start
                    && t.dot === t.rule.symbols.length
                    && t.reference === 0
                    && t.data !== Parser.fail) {
                considerations.push(t);
            }
        });
        return considerations.map(function(c) {return c.data; });
    };

    return {
        Parser: Parser,
        Grammar: Grammar,
        Rule: Rule,
    };

}));


/***/ }),
/* 13 */
/***/ (function(module, exports) {

// Generated automatically by nearley, version 2.11.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

	function str(data) {
		return data.join('')
	}
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "SEQUENCE", "symbols": ["TOKEN"], "postprocess": id},
    {"name": "SEQUENCE", "symbols": ["SEQUENCE", "_", "TOKEN"], "postprocess": (data) => data[0].concat(data[2])},
    {"name": "TOKEN", "symbols": ["NOTE"]},
    {"name": "TOKEN", "symbols": ["TRIG"]},
    {"name": "TOKEN", "symbols": ["REST"]},
    {"name": "TOKEN", "symbols": ["OCTAVE_CHANGE"]},
    {"name": "TOKEN", "symbols": ["SETTING"]},
    {"name": "TOKEN", "symbols": ["CHORD_GROUP"]},
    {"name": "NOTE", "symbols": ["PITCH_CLASS"], "postprocess": (data) => ['NOTE', { type: 'PITCH_CLASS', value: data[0] }]},
    {"name": "NOTE", "symbols": [{"literal":"M"}, "INTEGER"], "postprocess": (data) => ['NOTE', { type: 'MIDI',        value: data[1] }]},
    {"name": "NOTE", "symbols": ["INTEGER"], "postprocess": (data) => ['NOTE', { type: 'RELATIVE',    value: data[0] }]},
    {"name": "PITCH_CLASS$ebnf$1", "symbols": [/[b♭#♯]/], "postprocess": id},
    {"name": "PITCH_CLASS$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "PITCH_CLASS", "symbols": [/[A-G]/, "PITCH_CLASS$ebnf$1"], "postprocess": (data) => str(data)},
    {"name": "TRIG", "symbols": ["IDENTIFIER"], "postprocess": (data) => ['TRIG', data[0]]},
    {"name": "REST$ebnf$1", "symbols": [{"literal":"_"}]},
    {"name": "REST$ebnf$1", "symbols": ["REST$ebnf$1", {"literal":"_"}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "REST", "symbols": ["REST$ebnf$1"], "postprocess": (data) => ['REST', data[0].length]},
    {"name": "OCTAVE_CHANGE$ebnf$1", "symbols": [{"literal":"<"}]},
    {"name": "OCTAVE_CHANGE$ebnf$1", "symbols": ["OCTAVE_CHANGE$ebnf$1", {"literal":"<"}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "OCTAVE_CHANGE", "symbols": ["OCTAVE_CHANGE$ebnf$1"], "postprocess": (data) => ['OCTAVE_CHANGE', parseInt('-' + data[0].length)]},
    {"name": "OCTAVE_CHANGE$ebnf$2", "symbols": [{"literal":">"}]},
    {"name": "OCTAVE_CHANGE$ebnf$2", "symbols": ["OCTAVE_CHANGE$ebnf$2", {"literal":">"}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "OCTAVE_CHANGE", "symbols": ["OCTAVE_CHANGE$ebnf$2"], "postprocess": (data) => ['OCTAVE_CHANGE', parseInt(data[0].length)]},
    {"name": "SETTING", "symbols": ["IDENTIFIER", {"literal":"="}, "VALUE"], "postprocess": (data) => ['SETTING', { param: data[0],    value: data[2] }]},
    {"name": "SETTING", "symbols": ["NOTE_VALUE"], "postprocess": (data) => ['SETTING', { param: 'duration', value: data[0] }]},
    {"name": "VALUE", "symbols": ["NOTE_VALUE"], "postprocess": id},
    {"name": "VALUE", "symbols": ["STRING"], "postprocess": (data) => !isNaN(data[0]) ? parseFloat(data[0]) : data[0]},
    {"name": "NOTE_VALUE", "symbols": ["INTEGER", {"literal":"/"}, "INTEGER"], "postprocess": (data) => data[0] / data[2]},
    {"name": "NOTE_VALUE", "symbols": [{"literal":"/"}, "INTEGER"], "postprocess": (data) => 1 / data[1]},
    {"name": "NOTE_VALUE", "symbols": ["INTEGER", {"literal":"/"}], "postprocess": id},
    {"name": "CHORD_GROUP$ebnf$1", "symbols": ["_"], "postprocess": id},
    {"name": "CHORD_GROUP$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "CHORD_GROUP$ebnf$2", "symbols": ["_"], "postprocess": id},
    {"name": "CHORD_GROUP$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "CHORD_GROUP", "symbols": [{"literal":"{"}, "CHORD_GROUP$ebnf$1", "CHORD_TOKENS", "CHORD_GROUP$ebnf$2", {"literal":"}"}], "postprocess": (data) => ['CHORD_GROUP', data[2]]},
    {"name": "CHORD_TOKENS", "symbols": ["CHORD_TOKEN"], "postprocess": id},
    {"name": "CHORD_TOKENS", "symbols": ["CHORD_TOKENS", "_", "CHORD_TOKEN"], "postprocess": (data) => data[0].concat(data[2])},
    {"name": "CHORD_TOKEN", "symbols": ["NOTE"]},
    {"name": "CHORD_TOKEN", "symbols": ["SETTING"]},
    {"name": "CHORD_TOKEN", "symbols": ["OCTAVE_CHANGE"]},
    {"name": "IDENTIFIER$ebnf$1", "symbols": ["STRING"], "postprocess": id},
    {"name": "IDENTIFIER$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "IDENTIFIER", "symbols": ["LCASE_LETTER", "IDENTIFIER$ebnf$1"], "postprocess": (data) => str(data[0].concat(data[1]))},
    {"name": "LCASE_LETTER", "symbols": [/[a-z]/]},
    {"name": "STRING$ebnf$1", "symbols": [/[a-zA-Z$_0-9.]/]},
    {"name": "STRING$ebnf$1", "symbols": ["STRING$ebnf$1", /[a-zA-Z$_0-9.]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "STRING", "symbols": ["STRING$ebnf$1"], "postprocess": (data) => str(data[0])},
    {"name": "NUMBER", "symbols": ["FLOAT"]},
    {"name": "NUMBER", "symbols": ["INTEGER"]},
    {"name": "FLOAT$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "FLOAT$ebnf$1", "symbols": ["FLOAT$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "FLOAT", "symbols": ["INTEGER", {"literal":"."}, "FLOAT$ebnf$1"], "postprocess": (data) => parseFloat(str(data))},
    {"name": "INTEGER$ebnf$1", "symbols": [/[-+]/], "postprocess": id},
    {"name": "INTEGER$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "INTEGER$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "INTEGER$ebnf$2", "symbols": ["INTEGER$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "INTEGER", "symbols": ["INTEGER$ebnf$1", "INTEGER$ebnf$2"], "postprocess": (data) => parseInt((data[0] === '-' ? '-' : '') + str(data[1]))},
    {"name": "_$ebnf$1", "symbols": [{"literal":" "}]},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", {"literal":" "}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": () => null}
]
  , ParserStart: "SEQUENCE"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actionHelpers__ = __webpack_require__(1);


function getScore(thing) {
  return thing.actions
    ? thing
    : __WEBPACK_IMPORTED_MODULE_0__actionHelpers__["e" /* wrap */](__WEBPACK_IMPORTED_MODULE_0__actionHelpers__["c" /* get */](thing))
}

/* harmony default export */ __webpack_exports__["a"] = (getScore);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_fp__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_fp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actionHelpers__ = __webpack_require__(1);



// Repeat or trim a list of actions to the given length.
function extend(actions, length) {
  let loopLength = __WEBPACK_IMPORTED_MODULE_1__actionHelpers__["d" /* lengthOf */](actions)
  let wholeRepetitions = Math.floor(length / loopLength)
  let lastRepetitionLength = length % loopLength
  let lastActions = trim(lastRepetitionLength, actions)
  let actionLists = wholeRepetitions
    ? Array(wholeRepetitions).fill(actions)
    : []
  actionLists.push(lastActions)
  return __WEBPACK_IMPORTED_MODULE_1__actionHelpers__["b" /* concat */](actionLists)
}

// Trim a list of actions to the given length, shortening the last event if
// necessary.
// TODO should just shorten period, not dur
function trim(length, actions) {
  actions = actions.filter((a) => a.payload.time < length)
  if (!actions.length) return actions
  if (__WEBPACK_IMPORTED_MODULE_1__actionHelpers__["d" /* lengthOf */](actions) > length) {
    let lastAction = __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.last(actions)
    lastAction = __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.set('payload.dur', length - lastAction.payload.time, lastAction)
    actions = __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.initial(actions).concat(lastAction)
  }
  return actions
}

// Next 3 function adapted from
// https://github.com/felipernb/algorithms.js/tree/master/src/algorithms/math

function pairGcd(a, b) {
  let tmp = a
  a = Math.max(a, b)
  b = Math.min(tmp, b)
  while (b !== 0) {
    tmp = b
    b = a % b
    a = tmp
  }

  return a
}

function pairLcm(a, b) {
  if (a === 0 || b === 0) return 0
  a = Math.abs(a)
  b = Math.abs(b)
  return a / pairGcd(a, b) * b
}

function lcm(values) {
  return values.reduce(pairLcm)
}

////////////////////////////////////////////////////////////////////////////////

function mixScores(scores) {
  let [loops, nonLoops] = __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.partition((score) => score.loop, scores)
    .map((scores) => scores.map(__WEBPACK_IMPORTED_MODULE_1__actionHelpers__["c" /* get */]))

  if (loops.length) {
    // If there are any non-loops, adjust the length of any loops to the length
    // of the longest non-loop.
    // If there are only loops, adjust their lengths to the lowest common
    // multiple of all their lengths.
    let length = nonLoops.length
      ? __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.max(nonLoops.map(__WEBPACK_IMPORTED_MODULE_1__actionHelpers__["d" /* lengthOf */]))
      : lcm(loops.map(__WEBPACK_IMPORTED_MODULE_1__actionHelpers__["d" /* lengthOf */]))
    loops = loops.map((loop) => extend(loop, length))
  }

  let actionLists = loops.concat(nonLoops)
  let mixed = __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.flatten(actionLists)
  let sorted = __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.sortBy(['payload.time', 'payload.dur'], mixed)
  let score = __WEBPACK_IMPORTED_MODULE_1__actionHelpers__["e" /* wrap */](__WEBPACK_IMPORTED_MODULE_1__actionHelpers__["a" /* clean */](sorted))
  if (!nonLoops.length) score.loop = true
  return score
}

/* harmony default export */ __webpack_exports__["a"] = (mixScores);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_fp__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_fp__);


let Player = (sequencer) => {
  let stopCbs = {}

  let play = (score) => {
    let sequence = sequenceFrom(score)
    sequencer.setTempo(score.tempo || 120)
    sequencer.setSequence(sequence)
    sequencer.start()
  }

  let stop = () => {
    let stopTime = sequencer.stop()
    __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.forEach((stopCb) => {
      if (stopCb) stopCb(stopTime)
    }, stopCbs)
    stopCbs = {}
  }

  let sequenceFrom = (score) => {
    let lastPayload = __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.last(score.actions).payload
    let length = lastPayload.time + (lastPayload.dur || 0)
    let nestedDisorderedEvents = score.actions
      .filter((action) => action.type !== 'NOOP')
      .map((action) => {
        let { payload } = action
        let id = __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.uniqueId()
        let startTime = payload.time + (payload.offset || 0)
        startTime = wrap(startTime, length)
        let startEvent = { time: startTime, fn: (t) => startAction(t, id, action), ord: 1 }
        if (!payload.dur) return [startEvent]
        let endTime = startTime + payload.dur
        endTime = wrap(endTime, length)
        let stopEvent = { time: endTime, fn: (t) => endAction(t, id), ord: 0 }
        return [startEvent, stopEvent]
      })
    let events = __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.sortBy(['time', 'ord'], __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.flatten(nestedDisorderedEvents))
      .map((ev) => [ev.time, ev.fn])
    return { events, length }
  }

  let wrap = (time, length) => {
    time = time % length
    if(time >= 0) return time
    return time + length
  }

  let startAction = (time, id, action) => {
    let { payload } = action
    let stopCb = handle(time, action)
    if (!__WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.isFunction(stopCb)) return
    stopCbs[id] = stopCb
  }

  let endAction = (time, id) => {
    let stopCb = stopCbs[id]
    if (!stopCb) return
    stopCbs[id] = undefined
    stopCb(time)
  }

  function handle(time, action) {
    let callback = action.payload.callback
    return callback && callback(time, action)
  }

  return { play, stop }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_fp__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_fp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Tone__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Tone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_Tone__);



function Sequencer() {
  let part
  let partLength

  let toneEventsFrom = (sequence) => {
    return __WEBPACK_IMPORTED_MODULE_0_lodash_fp___default.a.sortBy(
      'time',
      sequence.events.map((ev) => ({ time: wholeNotesToSecs(ev[0]), fn: ev[1] }))
    )
  }

  let triggerEvent = (time, { fn }) => fn(time)

  let isStarted = () => __WEBPACK_IMPORTED_MODULE_1_Tone___default.a.Transport.state === 'started'

  let wholeNotesToSecs = (wholeNotes) => {
    // We avoid using 1n because Tone translates 1n to 1m
    return __WEBPACK_IMPORTED_MODULE_1_Tone___default.a.Transport.toSeconds('2n') * 2 * wholeNotes
  }

  let mutatePart = (evs) => {
    part.removeAll()
    evs.forEach((ev) => part.add(ev))
  }

  let replacePart = (evs, length) => {
    let newPart = new __WEBPACK_IMPORTED_MODULE_1_Tone___default.a.Part(triggerEvent, evs)
    newPart.loop = true
    newPart.loopEnd = wholeNotesToSecs(length)
    // TODO snap to nearest quarter note
    if (isStarted()) {
      part.stop()
      part.dispose()
    }
    newPart.start()
    part = newPart
    partLength = length
  }

  // Exports

  let setSequence = (sequence) => {
    let tevs = toneEventsFrom(sequence)
    if (partLength === sequence.length) {
      mutatePart(tevs)
    } else {
      replacePart(tevs, sequence.length)
    }
  }

  let setTempo = (tempo) => {
    __WEBPACK_IMPORTED_MODULE_1_Tone___default.a.Transport.bpm.value = tempo
  }

  let start = () => {
    if (!isStarted()) { __WEBPACK_IMPORTED_MODULE_1_Tone___default.a.Transport.start() }
  }

  let stop = () => {
    if (isStarted()) {
      __WEBPACK_IMPORTED_MODULE_1_Tone___default.a.Transport.stop()
      part.stop()
    }
    return __WEBPACK_IMPORTED_MODULE_1_Tone___default.a.context.currentTime
  }

  return { setSequence, setTempo, start, stop }
}

/* harmony default export */ __webpack_exports__["a"] = (Sequencer);


/***/ })
/******/ ]);
});