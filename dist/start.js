/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/console.ts":
/*!************************!*\
  !*** ./src/console.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.error = exports.warn = exports.log = exports.debug = exports.getLogLevelName = exports.getLogLevel = exports.LOG_LEVELS = void 0;
exports.LOG_LEVELS = ['debug', 'log', 'warn', 'error'];
function getLogLevel() {
    return exports.LOG_LEVELS.indexOf(getLogLevelName());
}
exports.getLogLevel = getLogLevel;
function getLogLevelName() {
    if (typeof window === 'object') {
        return window.QFORMS_LOG_LEVEL || 'debug';
    }
    else if (typeof global === 'object') {
        return (process.env.QFORMS_LOG_LEVEL ||
            (process.env.NODE_ENV === 'development' ? 'debug' : 'log'));
    }
    return 'debug';
}
exports.getLogLevelName = getLogLevelName;
function debug(message, ...optionalParams) {
    if (getLogLevel() <= exports.LOG_LEVELS.indexOf('debug')) {
        console.debug(message, ...optionalParams);
    }
}
exports.debug = debug;
function log(message, ...optionalParams) {
    if (getLogLevel() <= exports.LOG_LEVELS.indexOf('log')) {
        console.log(message, ...optionalParams);
    }
}
exports.log = log;
function warn(message, ...optionalParams) {
    if (getLogLevel() <= exports.LOG_LEVELS.indexOf('log')) {
        console.warn(message, ...optionalParams);
    }
}
exports.warn = warn;
function error(message, ...optionalParams) {
    console.error(message, ...optionalParams);
}
exports.error = error;


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
const console_1 = __webpack_require__(/*! ./console */ "./src/console.ts");
async function main(...argv) {
    (0, console_1.debug)('main');
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
main(...process.argv).then((code) => {
    if (code)
        process.exit(code);
});

})();

/******/ })()
;