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
const LOG_LEVEL_EV_NAME = 'QFORMS_LOG_LEVEL';
var LogLevel;
(function (LogLevel) {
    LogLevel["debug"] = "debug";
    LogLevel["log"] = "log";
    LogLevel["warn"] = "warn";
    LogLevel["error"] = "error";
})(LogLevel || (LogLevel = {}));
const LogLevels = [LogLevel.debug, LogLevel.log, LogLevel.warn, LogLevel.error];
function getLogLevelName() {
    if (typeof window === 'object') {
        return window[LOG_LEVEL_EV_NAME] || 'debug';
    }
    else if (typeof global === 'object') {
        return process.env[LOG_LEVEL_EV_NAME] || (process.env.NODE_ENV === 'dev' ? 'debug' : 'log');
    }
    return 'debug';
}
function isJest() {
    return typeof jest !== 'undefined';
}
const pConsole = new Proxy(console, {
    get(target, prop, receiver) {
        if (typeof target[prop] === 'function') {
            return function (...args) {
                const methodLevel = LogLevels.indexOf(prop);
                const logLevel = LogLevels.indexOf(getLogLevelName());
                if (methodLevel >= logLevel) {
                    if (!isJest()) {
                        return target[prop].apply(receiver, args);
                    }
                    if (prop === 'error') {
                        process.stderr.write(`${args.join(` `)}\n`);
                    }
                    else {
                        process.stdout.write(`${args.join(` `)}\n`);
                    }
                }
            };
        }
        return target[prop];
    },
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


const MONITOR_CONFIG = {
    username: 'admin',
    password: '123qwe',
};
start(...process.argv).then((code) => {
    if (code)
        process.exit(code);
});
async function start(...argv) {
    _pConsole__WEBPACK_IMPORTED_MODULE_1__.pConsole.debug('start');
    try {
        const params = _index__WEBPACK_IMPORTED_MODULE_0__.BkHelper.argvAsKeyValue(argv);
        const backHostApp = new _index__WEBPACK_IMPORTED_MODULE_0__.BackHostApp(Object.assign(Object.assign({}, params), { port: params.port ? parseInt(params.port) : undefined, monitor: MONITOR_CONFIG }));
        await backHostApp.init();
        await backHostApp.run();
    }
    catch (err) {
        console.error(err.message);
        return 1;
    }
}

})();

/******/ })()
;