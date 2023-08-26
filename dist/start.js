/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pConsole.ts":
/*!*************************!*\
  !*** ./src/pConsole.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pConsole = exports.getLogLevelName = exports.LogLevels = exports.LogLevel = void 0;
const LOG_LEVEL_EV_NAME = 'QFORMS_LOG_LEVEL';
var LogLevel;
(function (LogLevel) {
    LogLevel["debug"] = "debug";
    LogLevel["log"] = "log";
    LogLevel["warn"] = "warn";
    LogLevel["error"] = "error";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
exports.LogLevels = [LogLevel.debug, LogLevel.log, LogLevel.warn, LogLevel.error];
function getLogLevelName() {
    if (typeof window === 'object') {
        return window[LOG_LEVEL_EV_NAME] || 'debug';
    }
    else if (typeof global === 'object') {
        return (process.env[LOG_LEVEL_EV_NAME] ||
            (process.env.NODE_ENV === 'development' ? 'debug' : 'log'));
    }
    return 'debug';
}
exports.getLogLevelName = getLogLevelName;
exports.pConsole = new Proxy(console, {
    get: function (target, prop, receiver) {
        if (typeof target[prop] === 'function') {
            return function (...args) {
                const methodLevel = exports.LogLevels.indexOf(prop);
                const logLevel = exports.LogLevels.indexOf(getLogLevelName());
                if (methodLevel >= logLevel) {
                    return target[prop].apply(receiver, args);
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/start.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const index_1 = __webpack_require__(/*! ./index */ "./index");
const pConsole_1 = __webpack_require__(/*! ./pConsole */ "./src/pConsole.ts");
async function start(...argv) {
    pConsole_1.pConsole.debug('start');
    try {
        const backHostApp = new index_1.BackHostApp(Object.assign(Object.assign({}, index_1.BkHelper.getCommandLineParams()), { monitor: {
                username: 'admin',
                password: '123qwe',
            } }));
        await backHostApp.init();
        await backHostApp.run();
    }
    catch (err) {
        console.error(err.message);
        return 1;
    }
}
start(...process.argv).then((code) => {
    if (code)
        process.exit(code);
});

})();

/******/ })()
;