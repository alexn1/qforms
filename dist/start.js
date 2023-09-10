/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pConsole.ts":
/*!*************************!*\
  !*** ./src/pConsole.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LogLevel": () => (/* binding */ LogLevel),
/* harmony export */   "LogLevels": () => (/* binding */ LogLevels),
/* harmony export */   "getLogLevelName": () => (/* binding */ getLogLevelName),
/* harmony export */   "pConsole": () => (/* binding */ pConsole)
/* harmony export */ });
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const LOG_LEVEL_EV_NAME = "QFORMS_LOG_LEVEL";
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2["debug"] = "debug";
  LogLevel2["log"] = "log";
  LogLevel2["warn"] = "warn";
  LogLevel2["error"] = "error";
  return LogLevel2;
})(LogLevel || {});
const LogLevels = ["debug" /* debug */, "log" /* log */, "warn" /* warn */, "error" /* error */];
function getLogLevelName() {
  if (typeof window === "object") {
    return window[LOG_LEVEL_EV_NAME] || "debug";
  } else if (typeof global === "object") {
    return process.env[LOG_LEVEL_EV_NAME] || (process.env.NODE_ENV === "dev" ? "debug" : "log");
  }
  return "debug";
}
__name(getLogLevelName, "getLogLevelName");
function isJest() {
  return typeof jest !== "undefined";
}
__name(isJest, "isJest");
const pConsole = new Proxy(console, {
  get: function(target, prop, receiver) {
    if (typeof target[prop] === "function") {
      return function(...args) {
        const methodLevel = LogLevels.indexOf(prop);
        const logLevel = LogLevels.indexOf(getLogLevelName());
        if (methodLevel >= logLevel) {
          if (!isJest()) {
            return target[prop].apply(receiver, args);
          }
          if (prop === "error") {
            process.stderr.write(`${args.join(` `)}
`);
          } else {
            process.stdout.write(`${args.join(` `)}
`);
          }
        }
      };
    }
    return target[prop];
  }
});


/***/ }),

/***/ "./index":
/*!**************************!*\
  !*** external "./index" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("./index");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/start.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./index");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pConsole__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pConsole */ "./src/pConsole.ts");
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};


const MONITOR_CONFIG = {
  username: "admin",
  password: "123qwe"
};
start(...process.argv).then((code) => {
  if (code)
    process.exit(code);
});
function start(...argv) {
  return __async(this, null, function* () {
    _pConsole__WEBPACK_IMPORTED_MODULE_1__.pConsole.debug("start");
    try {
      const backHostApp = new _index__WEBPACK_IMPORTED_MODULE_0__.BackHostApp(__spreadProps(__spreadValues({}, _index__WEBPACK_IMPORTED_MODULE_0__.BkHelper.argvAsKeyValue(argv)), {
        monitor: MONITOR_CONFIG
      }));
      yield backHostApp.init();
      yield backHostApp.run();
    } catch (err) {
      console.error(err.message);
      return 1;
    }
  });
}
__name(start, "start");

})();

/******/ })()
;