/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/frontend/common/widget/Box/Box.less":
/*!*************************************************!*\
  !*** ./src/frontend/common/widget/Box/Box.less ***!
  \*************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/frontend/common/widget/CheckBox/CheckBox.less":
/*!***********************************************************!*\
  !*** ./src/frontend/common/widget/CheckBox/CheckBox.less ***!
  \***********************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/frontend/common/widget/DatePicker/DatePicker.less":
/*!***************************************************************!*\
  !*** ./src/frontend/common/widget/DatePicker/DatePicker.less ***!
  \***************************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/frontend/common/widget/DropdownButton/DropdownButton.less":
/*!***********************************************************************!*\
  !*** ./src/frontend/common/widget/DropdownButton/DropdownButton.less ***!
  \***********************************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/frontend/common/widget/DropdownDatePicker/DropdownDatePicker.less":
/*!*******************************************************************************!*\
  !*** ./src/frontend/common/widget/DropdownDatePicker/DropdownDatePicker.less ***!
  \*******************************************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/frontend/common/widget/Expand/Expand.less":
/*!*******************************************************!*\
  !*** ./src/frontend/common/widget/Expand/Expand.less ***!
  \*******************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/frontend/common/widget/Grid/Grid.less":
/*!***************************************************!*\
  !*** ./src/frontend/common/widget/Grid/Grid.less ***!
  \***************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/frontend/common/widget/Image/Image.less":
/*!*****************************************************!*\
  !*** ./src/frontend/common/widget/Image/Image.less ***!
  \*****************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/frontend/common/widget/Menu/Menu.less":
/*!***************************************************!*\
  !*** ./src/frontend/common/widget/Menu/Menu.less ***!
  \***************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/frontend/common/widget/Modal/Modal.less":
/*!*****************************************************!*\
  !*** ./src/frontend/common/widget/Modal/Modal.less ***!
  \*****************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/frontend/common/widget/Password/Password.less":
/*!***********************************************************!*\
  !*** ./src/frontend/common/widget/Password/Password.less ***!
  \***********************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/frontend/common/widget/Select/Select.less":
/*!*******************************************************!*\
  !*** ./src/frontend/common/widget/Select/Select.less ***!
  \*******************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/frontend/common/widget/Slider/Slider.less":
/*!*******************************************************!*\
  !*** ./src/frontend/common/widget/Slider/Slider.less ***!
  \*******************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/frontend/common/widget/Statusbar/Statusbar.less":
/*!*************************************************************!*\
  !*** ./src/frontend/common/widget/Statusbar/Statusbar.less ***!
  \*************************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/frontend/common/widget/Tab/Tab.less":
/*!*************************************************!*\
  !*** ./src/frontend/common/widget/Tab/Tab.less ***!
  \*************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/frontend/common/widget/Tab2/Tab2.less":
/*!***************************************************!*\
  !*** ./src/frontend/common/widget/Tab2/Tab2.less ***!
  \***************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/frontend/common/widget/TimeBox/TimeBox2/TimeBox2.less":
/*!*******************************************************************!*\
  !*** ./src/frontend/common/widget/TimeBox/TimeBox2/TimeBox2.less ***!
  \*******************************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/frontend/common/widget/Tooltip/Tooltip.less":
/*!*********************************************************!*\
  !*** ./src/frontend/common/widget/Tooltip/Tooltip.less ***!
  \*********************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/ApplicationController/ApplicationView.less":
/*!***************************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/ApplicationController/ApplicationView.less ***!
  \***************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FormController/RowFormController/RowFormView.less":
/*!**********************************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FormController/RowFormController/RowFormView.less ***!
  \**********************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/PageController/PageView.less":
/*!*************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/PageController/PageView.less ***!
  \*************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/Result.ts":
/*!***********************!*\
  !*** ./src/Result.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DatabaseResult": () => (/* binding */ DatabaseResult),
/* harmony export */   "InsertExResult": () => (/* binding */ InsertExResult),
/* harmony export */   "Result": () => (/* binding */ Result),
/* harmony export */   "TableResult": () => (/* binding */ TableResult),
/* harmony export */   "UpdateEx": () => (/* binding */ UpdateEx),
/* harmony export */   "UpdateResult": () => (/* binding */ UpdateResult)
/* harmony export */ });
class InsertExResult {
}
class UpdateResult {
}
class UpdateEx {
}
class TableResult {
}
class DatabaseResult {
}
class Result {
    static addInsertToResult(result, dName, tName, key) {
        if (!result[dName])
            result[dName] = new DatabaseResult();
        if (!result[dName][tName])
            result[dName][tName] = new TableResult();
        if (!result[dName][tName].insert)
            result[dName][tName].insert = [];
        result[dName][tName].insert.push(key);
    }
    static addInsertExToResult(result, dName, tName, key, row) {
        if (!result[dName])
            result[dName] = new DatabaseResult();
        if (!result[dName][tName])
            result[dName][tName] = new TableResult();
        if (!result[dName][tName].insertEx)
            result[dName][tName].insertEx = new InsertExResult();
        result[dName][tName].insertEx[key] = row;
    }
    static addUpdateToResult(result, dName, tName, oldKey, newKey) {
        // console.log('Result.addUpdateToResult');
        if (!result[dName])
            result[dName] = new DatabaseResult();
        if (!result[dName][tName])
            result[dName][tName] = new TableResult();
        if (!result[dName][tName].update)
            result[dName][tName].update = new UpdateResult();
        result[dName][tName].update[oldKey] = newKey;
    }
    static addUpdateExToResult(result, dName, tName, oldKey, row) {
        // console.log('Result.addUpdateExToResult');
        if (!result[dName])
            result[dName] = new DatabaseResult();
        if (!result[dName][tName])
            result[dName][tName] = new TableResult();
        if (!result[dName][tName].updateEx)
            result[dName][tName].updateEx = new UpdateEx();
        result[dName][tName].updateEx[oldKey] = row;
    }
    static addDeleteToResult(result, dName, tName, key) {
        if (!result[dName])
            result[dName] = new DatabaseResult();
        if (!result[dName][tName])
            result[dName][tName] = new TableResult();
        if (!result[dName][tName].delete)
            result[dName][tName].delete = [];
        result[dName][tName].delete.push(key);
    }
    static addTableToResult(result, dName, tName, tResult) {
        if (!result[dName])
            result[dName] = {};
        if (result[dName][tName])
            throw new Error(`table ${tName} already exists`);
        result[dName][tName] = tResult;
    }
}


/***/ }),

/***/ "./src/backend/BackHostApp.ts":
/*!************************************!*\
  !*** ./src/backend/BackHostApp.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BackHostApp": () => (/* binding */ BackHostApp)
/* harmony export */ });
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! node-fetch */ "node-fetch");
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var colors_safe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! colors/safe */ "colors/safe");
/* harmony import */ var colors_safe__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(colors_safe__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! body-parser */ "body-parser");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! cookie-parser */ "cookie-parser");
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! express-session */ "express-session");
/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(express_session__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _WebSocketServer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./WebSocketServer */ "./src/backend/WebSocketServer.ts");
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Helper */ "./src/backend/Helper.ts");
/* harmony import */ var _viewer_BkModel_BkDatabase_BkSqlDatabase_BkPostgreSqlDatabase_BkPostgreSqlDatabase__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./viewer/BkModel/BkDatabase/BkSqlDatabase/BkPostgreSqlDatabase/BkPostgreSqlDatabase */ "./src/backend/viewer/BkModel/BkDatabase/BkSqlDatabase/BkPostgreSqlDatabase/BkPostgreSqlDatabase.ts");
/* harmony import */ var _Context__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Context */ "./src/backend/Context.ts");
/* harmony import */ var _viewer_BkModel_BkApplication_BkApplication__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./viewer/BkModel/BkApplication/BkApplication */ "./src/backend/viewer/BkModel/BkApplication/BkApplication.ts");
/* harmony import */ var _monitor_MonitorModule__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./monitor/MonitorModule */ "./src/backend/monitor/MonitorModule.tsx");
/* harmony import */ var _index_IndexModule__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./index/IndexModule */ "./src/backend/index/IndexModule.tsx");
/* harmony import */ var _MyError__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./MyError */ "./src/backend/MyError.ts");
/* harmony import */ var _viewer_ViewerModule__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./viewer/ViewerModule */ "./src/backend/viewer/ViewerModule.tsx");
/* harmony import */ var _editor_EditorModule__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./editor/EditorModule */ "./src/backend/editor/EditorModule.tsx");
/* harmony import */ var _FileSessionStore__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./FileSessionStore */ "./src/backend/FileSessionStore.ts");
/* harmony import */ var _editor_Editor_ApplicationEditor_ApplicationEditor__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./editor/Editor/ApplicationEditor/ApplicationEditor */ "./src/backend/editor/Editor/ApplicationEditor/ApplicationEditor.ts");
/* harmony import */ var _BaseModel__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./BaseModel */ "./src/backend/BaseModel.ts");






















// import Test from './test/Test';
const pkg = __webpack_require__(/*! ../../package.json */ "./package.json");
class BackHostApp {
    constructor(params = {}) {
        // console.log('BackHostApp.constructor');
        this.checkVersion();
        this.params = params;
        this.applications = {};
        this.appQueue = {};
    }
    checkVersion() {
        const [majorNodeVersion] = process.versions.node.split('.');
        // console.log('majorNodeVersion', majorNodeVersion, typeof majorNodeVersion);
        const MIN_NODE_VERSION = 14;
        if (parseInt(majorNodeVersion) < MIN_NODE_VERSION) {
            throw new Error(`min node version required ${MIN_NODE_VERSION}, current ${majorNodeVersion}`);
        }
    }
    async run() {
        // console.log(`${this.constructor.name}.run`);
        this.startTime = new Date();
        this.appsDirPath = path__WEBPACK_IMPORTED_MODULE_5___default().resolve(this.params.appsDirPath || process.env.APPS_DIR_PATH || './apps');
        this.distDirPath = this.params.distDirPath || this.appsDirPath;
        this.runtimeDirPath = path__WEBPACK_IMPORTED_MODULE_5___default().resolve(this.params.runtimeDirPath || './runtime');
        this.logErrorUrl = this.params.logErrorUrl || null;
        const handleException = this.params.handleException || true;
        const host = this.params.host || process.env.LISTEN_HOST || 'localhost';
        const port = this.params.port || process.env.LISTEN_PORT || 3000;
        const { log } = this.params;
        if (!fs__WEBPACK_IMPORTED_MODULE_4___default().existsSync(this.appsDirPath)) {
            console.error(colors_safe__WEBPACK_IMPORTED_MODULE_3___default().red(`Application folder '${this.appsDirPath}' doesn't exist`));
            return 1;
        }
        // path
        const backendDirPath = __dirname;
        this.frontendDirPath = path__WEBPACK_IMPORTED_MODULE_5___default().resolve(path__WEBPACK_IMPORTED_MODULE_5___default().join(backendDirPath, '../frontend'));
        this.sessionDirPath = path__WEBPACK_IMPORTED_MODULE_5___default().join(this.runtimeDirPath, 'session');
        // runtime & temp
        _Helper__WEBPACK_IMPORTED_MODULE_10__.Helper.createDirIfNotExistsSync(this.runtimeDirPath);
        _Helper__WEBPACK_IMPORTED_MODULE_10__.Helper.createDirIfNotExistsSync(this.sessionDirPath);
        // logPool
        if (log) {
            this.logPool = _viewer_BkModel_BkDatabase_BkSqlDatabase_BkPostgreSqlDatabase_BkPostgreSqlDatabase__WEBPACK_IMPORTED_MODULE_11__.BkPostgreSqlDatabase.createPool(log);
        }
        // express server
        this.express = express__WEBPACK_IMPORTED_MODULE_1___default()();
        this.express.set('handleException', handleException);
        this.express.set('view engine', 'ejs');
        this.express.set('views', backendDirPath);
        this.express.enable('strict routing');
        this.initExpressServer();
        // indexModule
        this.indexModule = new _index_IndexModule__WEBPACK_IMPORTED_MODULE_15__.IndexModule(this);
        await this.indexModule.init();
        // monitorModule
        this.monitorModule = new _monitor_MonitorModule__WEBPACK_IMPORTED_MODULE_14__.MonitorModule(this);
        await this.monitorModule.init();
        // viewerModule
        this.viewerModule = new _viewer_ViewerModule__WEBPACK_IMPORTED_MODULE_17__.ViewerModule(this);
        await this.viewerModule.init();
        // editorModule
        this.editorModule = new _editor_EditorModule__WEBPACK_IMPORTED_MODULE_18__.EditorModule(this);
        await this.editorModule.init();
        // http
        this.httpServer = await this.createAndRunHttpServer(host, port);
        this.httpServer.on('error', this.onHttpServerError.bind(this));
        if (process.send) {
            process.send('online');
        }
        let msg = `QForms server v${pkg.version} listening on http://${host}:${port}${this.isDevelopment() ? '/index2' : ''}\n`;
        msg += `\tprocess.env.NODE_ENV: ${process.env.NODE_ENV}\n`;
        msg += `\tappsDirPath: ${this.appsDirPath}\n`;
        msg += `\tdistDirPath: ${this.distDirPath}\n`;
        if (this.isDevelopment()) {
            msg += `\tmonitor: http://${host}:${port}/monitor\n`;
        }
        msg += `\tstarted at: ${new Date().toISOString()}\n`;
        console.log(msg);
        // ws
        this.wsServer = new _WebSocketServer__WEBPACK_IMPORTED_MODULE_9__.WebSocketServer({
            hostApp: this,
            httpServer: this.httpServer,
        });
        this.initProcess();
    }
    initProcess() {
        process.on('message', this.onProcessMessage.bind(this));
        process.on('SIGINT', this.onProcessSIGINT.bind(this));
        process.on('SIGTERM', this.onProcessSIGTERM.bind(this));
        process.on('exit', this.onProcessExit.bind(this));
        process.on('unhandledRejection', this.onUnhandledRejection.bind(this));
    }
    getSecretSync() {
        const secretFilePath = path__WEBPACK_IMPORTED_MODULE_5___default().join(this.runtimeDirPath, 'secret.txt');
        let secret;
        secret = _Helper__WEBPACK_IMPORTED_MODULE_10__.Helper.getFileContentSync(secretFilePath);
        if (secret) {
            return secret;
        }
        secret = _Helper__WEBPACK_IMPORTED_MODULE_10__.Helper.getRandomString(20);
        _Helper__WEBPACK_IMPORTED_MODULE_10__.Helper.writeFileSync(secretFilePath, secret);
        return secret;
    }
    initExpressServer() {
        // middlewares
        this.express.use(body_parser__WEBPACK_IMPORTED_MODULE_6___default().json({
            limit: '20mb',
            reviver: _Helper__WEBPACK_IMPORTED_MODULE_10__.Helper.dateTimeReviver,
        }));
        this.express.use(body_parser__WEBPACK_IMPORTED_MODULE_6___default().urlencoded({ extended: false }));
        this.express.use(cookie_parser__WEBPACK_IMPORTED_MODULE_7___default()());
        this.express.use(express_session__WEBPACK_IMPORTED_MODULE_8___default()({
            store: new _FileSessionStore__WEBPACK_IMPORTED_MODULE_19__.FileSessionStore(this.sessionDirPath),
            secret: this.getSecretSync(),
            // @ts-ignore
            key: 'sid',
            resave: false,
            saveUninitialized: false,
        }));
        // test
        // this.express.get( '/test', this._getTest.bind(this));
        // this.express.post('/test', this._postTest.bind(this));
        // error logger
        this.express.options('/error', (req, res, next) => {
            console.log('options /error');
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length');
            res.end();
        });
        this.express.post('/error', this.postError.bind(this));
        // index module
        if (this.isDevelopment()) {
            // google chrome always redirect from /index to /index/ even with disabled cache
            // so we use /index2
            this.express.get('/index2', this.indexGet.bind(this));
            this.express.post('/index2', this.indexPost.bind(this));
        }
        // monitor module
        this.express.get('/monitor', this.monitorGet.bind(this));
        // viewer/editor module
        this.express.get('/:module/:appDirName/:appFileName/:env/:domain/', this.moduleGet.bind(this));
        this.express.post('/:module/:appDirName/:appFileName/:env/:domain/', this.modulePost.bind(this));
        this.express.get('/:module/:appDirName/:appFileName/:env/:domain/*', this.moduleGetFile.bind(this));
        // handle static for index and monitor
        this.express.use(express__WEBPACK_IMPORTED_MODULE_1___default()["static"](this.frontendDirPath));
        this.initCustomRoutes();
        // 404 and 500 error handlers
        this.express.use(this._e404.bind(this));
        this.express.use(this._e500.bind(this));
    }
    async createApplicationIfNotExists(context) {
        // console.log(`BackHostApp.createApplicationIfNotExists debug: ${context.query.debug}, env: ${context.getEnv()}`);
        const application = this.applications[context.getRoute()];
        if (application) {
            /*if (req.method === 'GET' && (context.query.debug === '1' || context.getModule() === 'edit')) {
                await application.deinit();
                return this.applications[route] = await this.createApplication(context);
            }*/
            return application;
        }
        // if creating application
        if (Array.isArray(this.appQueue[context.getRoute()])) {
            console.log('application is creating:', context.getRoute());
            const promise = _Helper__WEBPACK_IMPORTED_MODULE_10__.Helper.createEmptyPromise();
            this.appQueue[context.getRoute()].push(promise);
            return promise;
        }
        this.appQueue[context.getRoute()] = [];
        const app = (this.applications[context.getRoute()] = await this.createApplication(context));
        console.log('application created, start resolve loop', context.getRoute(), this.appQueue[context.getRoute()].length);
        for (const p of this.appQueue[context.getRoute()]) {
            // @ts-ignore
            p.resolve(app);
        }
        this.appQueue[context.getRoute()] = null;
        return app;
    }
    getApplication(context) {
        const application = this.applications[context.getRoute()];
        if (!application)
            throw new Error(`no application for route: ${context.getRoute()}`);
        return application;
    }
    getApplicationByRoute(route) {
        return this.applications[route];
    }
    getAppFilePath(context) {
        return path__WEBPACK_IMPORTED_MODULE_5___default().join(this.appsDirPath, context.getAppDirName(), context.getAppFileName() + '.json');
    }
    async createApplication(context) {
        console.log(`BackHostApp.createApplication: ${context.getRoute()}`);
        const appFilePath = this.getAppFilePath(context);
        const distDirPath = this.makeDistDirPathForApp(appFilePath);
        const appInfo = await _viewer_BkModel_BkApplication_BkApplication__WEBPACK_IMPORTED_MODULE_13__.BkApplication.loadAppInfo(appFilePath, distDirPath);
        // ApplicationClass
        const ApplicationClass = this.getApplicationClass(appInfo);
        // application
        const application = new ApplicationClass(appInfo, this, context.getEnv());
        await application.init(context);
        return application;
    }
    getApplicationClass(appInfo) {
        // console.log('BackHostApp.getApplicationClass', appInfo);
        const modelClass = _BaseModel__WEBPACK_IMPORTED_MODULE_21__.BaseModel.getAttr(appInfo.appFile.data, 'modelClass');
        if (modelClass) {
            const CustomClass = global[modelClass];
            if (!CustomClass)
                throw new Error(`no class ${modelClass}`);
            return CustomClass;
        }
        return _viewer_BkModel_BkApplication_BkApplication__WEBPACK_IMPORTED_MODULE_13__.BkApplication;
    }
    async createApp(req) {
        console.log('createApp');
        if (!req.body.folder)
            throw new Error('folder required: ' + req.body.folder);
        if (!req.body.name)
            throw new Error('name required: ' + req.body.name);
        const folder = req.body.folder;
        const name = req.body.name;
        const appDirPath = path__WEBPACK_IMPORTED_MODULE_5___default().join(this.appsDirPath, folder);
        const appFilePath = path__WEBPACK_IMPORTED_MODULE_5___default().join(appDirPath, name + '.json');
        await _Helper__WEBPACK_IMPORTED_MODULE_10__.Helper.createDirIfNotExists(appDirPath);
        await _editor_Editor_ApplicationEditor_ApplicationEditor__WEBPACK_IMPORTED_MODULE_20__.ApplicationEditor.createAppFile(appFilePath, { name });
        const distDirPath = this.makeDistDirPathForApp(appFilePath);
        const appInfos = await _viewer_BkModel_BkApplication_BkApplication__WEBPACK_IMPORTED_MODULE_13__.BkApplication.getAppInfos(this.appsDirPath, distDirPath);
        return appInfos;
    }
    async logError(err, req = null) {
        var _a, _b;
        console.log('BackHostApp.logError:', colors_safe__WEBPACK_IMPORTED_MODULE_3___default().red(err.message));
        try {
            const route = err instanceof _MyError__WEBPACK_IMPORTED_MODULE_16__.MyError && err.context ? err.context.getRoute() : null;
            const data = req
                ? {
                    headers: req.headers,
                    method: req.method,
                    host: req.headers.host,
                    originalUrl: req.originalUrl,
                    uri: req.params['0'],
                    platformVersion: pkg.version,
                    appVersion: route ? this.applications[route].getVersion() : null,
                    route: route,
                    body: req.body,
                    status: err instanceof _MyError__WEBPACK_IMPORTED_MODULE_16__.MyError ? err.status || null : null,
                    data: err instanceof _MyError__WEBPACK_IMPORTED_MODULE_16__.MyError ? err.data || null : null,
                }
                : null;
            if (this.logPool) {
                await BackHostApp.createLog(this.logPool, {
                    type: 'error',
                    source: 'server',
                    ip: req ? req.headers['x-forwarded-for'] || req.connection.remoteAddress : null,
                    message: err.message,
                    stack: (_a = err.stack) === null || _a === void 0 ? void 0 : _a.toString(),
                    data: data ? JSON.stringify(data, null, 4) : null,
                });
            }
            else if (this.logErrorUrl) {
                console.log(`fetch ${this.logErrorUrl}`);
                await node_fetch__WEBPACK_IMPORTED_MODULE_2___default()(this.logErrorUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: 'error',
                        source: 'server',
                        ip: req
                            ? req.headers['x-forwarded-for'] || req.connection.remoteAddress
                            : null,
                        message: err.message,
                        stack: (_b = err.stack) === null || _b === void 0 ? void 0 : _b.toString(),
                        data: data,
                    }),
                });
            }
        }
        catch (err) {
            console.error(colors_safe__WEBPACK_IMPORTED_MODULE_3___default().red(err));
        }
    }
    async logRequest(req, context, time) {
        if (!this.logPool)
            return;
        try {
            const application = this.getApplication(context);
            let args = '';
            if (req.body.params) {
                args = Object.keys(req.body.params)
                    .map((name) => `${name}: ${req.body.params[name]}`)
                    .join(', ');
            }
            else if (req.body.row) {
                args = Object.keys(req.body.row)
                    .map((name) => `${name}: ${req.body.row[name]}`)
                    .join(', ');
            }
            let message = [
                application.getName(),
                ...(req.body.page ? [req.body.page] : []),
                ...(req.body.form ? [req.body.form] : []),
                ...(req.body.ds ? [req.body.ds] : []),
                `${req.body.action}(${args})`,
            ].join('.');
            if (time) {
                message += `, time: ${time}`;
            }
            await BackHostApp.createLog(this.logPool, {
                type: 'log',
                source: 'server',
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                message: message,
                data: JSON.stringify(req.body, null, 4),
            });
        }
        catch (err) {
            console.error(colors_safe__WEBPACK_IMPORTED_MODULE_3___default().red(err));
        }
    }
    async logEvent(context, message, data = null) {
        console.log('BackHostApp.logEvent', message);
        try {
            await this.createLog2({
                type: 'log',
                source: 'server',
                ip: context.getIp(),
                message: message,
                data: data,
            });
        }
        catch (err) {
            console.error(colors_safe__WEBPACK_IMPORTED_MODULE_3___default().red(err));
        }
    }
    static async createLog(cnn, values) {
        // console.log('BackHostApp.createLog', values);
        if (values.stack === undefined)
            values.stack = null;
        if (values.created === undefined)
            values.created = new Date();
        if (values.message && values.message.length > 255) {
            // throw new Error(`message to long: ${values.message.length}`);
            values.message = values.message.substr(0, 255);
        }
        await _viewer_BkModel_BkDatabase_BkSqlDatabase_BkPostgreSqlDatabase_BkPostgreSqlDatabase__WEBPACK_IMPORTED_MODULE_11__.BkPostgreSqlDatabase.queryResult(cnn, 'insert into log(created, type, source, ip, message, stack, data) values ({created}, {type}, {source}, {ip}, {message}, {stack}, {data})', values);
    }
    async createLog2(values) {
        if (this.logPool) {
            await BackHostApp.createLog(this.logPool, {
                type: values.type,
                source: values.source,
                ip: values.ip,
                message: values.message,
                data: values.data ? JSON.stringify(values.data) : null,
            });
        }
        else if (this.logErrorUrl) {
            console.log(`fetch ${this.logErrorUrl}`);
            await node_fetch__WEBPACK_IMPORTED_MODULE_2___default()(this.logErrorUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: values.type,
                    source: values.source,
                    ip: values.ip,
                    message: values.message,
                    data: values.data,
                }),
            });
        }
    }
    async moduleGet(req, res, next) {
        // @ts-ignore
        console.log(colors_safe__WEBPACK_IMPORTED_MODULE_3___default().magenta.underline('BackHostApp.moduleGet'), req.params);
        let context = null;
        try {
            if (req.params.module === 'viewer') {
                context = new _Context__WEBPACK_IMPORTED_MODULE_12__.Context({
                    req,
                    res,
                    domain: this.getDomainFromRequest(req),
                });
                const application = await this.createApplicationIfNotExists(context);
                context.setVersionHeaders(pkg.version, application.getVersion());
                if (application.isAvailable()) {
                    await this.viewerModule.handleViewerGet(context, application);
                }
                else {
                    next();
                }
            }
            else if (req.params.module === 'editor') {
                if (this.isDevelopment()) {
                    context = new _Context__WEBPACK_IMPORTED_MODULE_12__.Context({
                        req,
                        res,
                        domain: this.getDomainFromRequest(req),
                    });
                    await this.editorModule.handleEditorGet(req, res, context);
                }
                else {
                    next();
                }
            }
            else {
                next();
            }
        }
        catch (err) {
            next(err);
        }
        finally {
            if (context) {
                context.destroy();
            }
        }
    }
    async indexGet(req, res, next) {
        console.log(colors_safe__WEBPACK_IMPORTED_MODULE_3___default().magenta('indexGet'));
        try {
            const html = await this.indexModule.render();
            res.end(html);
        }
        catch (err) {
            next(err);
        }
    }
    async indexPost(req, res, next) {
        console.log(colors_safe__WEBPACK_IMPORTED_MODULE_3___default().magenta('indexPost'), req.params);
        try {
            const appInfos = await this.createApp(req);
            await res.json({
                appInfos: appInfos.map((appInfo) => ({
                    fullName: appInfo.fullName,
                    envs: appInfo.envs,
                })),
            });
        }
        catch (err) {
            next(err);
        }
    }
    async monitorGet(req, res, next) {
        console.log(colors_safe__WEBPACK_IMPORTED_MODULE_3___default().magenta('monitorGet'), req.headers);
        try {
            if (!this.params.monitor) {
                res.end('Please set monitor username/password in app params');
                return;
            }
            if (this.monitorModule.authorize(req)) {
                const html = this.monitorModule.render();
                res.end(html);
            }
            else {
                res.statusCode = 401;
                res.setHeader('WWW-Authenticate', 'Basic realm="My Realm"');
                res.end('Unauthorized');
            }
        }
        catch (err) {
            next(err);
        }
    }
    async modulePost(req, res, next) {
        // @ts-ignore
        console.log(colors_safe__WEBPACK_IMPORTED_MODULE_3___default().magenta.underline('BackHostApp.modulePost'), req.params, req.body);
        let context = null;
        try {
            if (req.params.module === 'viewer') {
                context = new _Context__WEBPACK_IMPORTED_MODULE_12__.Context({
                    req,
                    res,
                    domain: this.getDomainFromRequest(req),
                });
                const application = await this.createApplicationIfNotExists(context);
                context.setVersionHeaders(pkg.version, application.getVersion());
                const time = await this.viewerModule.handleViewerPost(context, application);
                // await this.logRequest(req, context, time);
            }
            else if (req.params.module === 'editor') {
                if (this.isDevelopment()) {
                    context = new _Context__WEBPACK_IMPORTED_MODULE_12__.Context({
                        req,
                        res,
                        domain: this.getDomainFromRequest(req),
                    });
                    const time = await this.editorModule.handleEditorPost(req, res, context);
                    // await this.logRequest(req, context, time);
                }
                else {
                    next();
                }
            }
            else {
                next();
            }
        }
        catch (err) {
            next(err);
        }
        finally {
            if (context) {
                context.destroy();
            }
        }
    }
    async moduleGetFile(req, res, next) {
        if (process.env.NODE_ENV === 'development') {
            // @ts-ignore
            console.log(colors_safe__WEBPACK_IMPORTED_MODULE_3___default().magenta.underline('BackHostApp.moduleGetFile'), req.originalUrl);
        }
        if (req.params.module === 'viewer') {
            let context = null;
            try {
                context = new _Context__WEBPACK_IMPORTED_MODULE_12__.Context({
                    req,
                    res,
                    domain: this.getDomainFromRequest(req),
                });
                const application = await this.createApplicationIfNotExists(context);
                context.setVersionHeaders(pkg.version, application.getVersion());
                await this.viewerModule.handleViewerGetFile(context, application, next);
            }
            catch (err) {
                err.message = `moduleGetFile error: ${err.message}`;
                next(err);
            }
            finally {
                if (context) {
                    context.destroy();
                }
            }
        }
        else {
            next();
        }
    }
    async _e404(req, res, next) {
        console.error(colors_safe__WEBPACK_IMPORTED_MODULE_3___default().magenta(req.method), 'error/404', req.originalUrl);
        next(new _MyError__WEBPACK_IMPORTED_MODULE_16__.MyError({
            message: `${req.method} ${req.originalUrl} not found`,
            status: 404,
        }));
    }
    async _e500(err, req, res, next) {
        console.log(colors_safe__WEBPACK_IMPORTED_MODULE_3___default().magenta('module.exports.e500:'), req.method, req.originalUrl);
        console.error(colors_safe__WEBPACK_IMPORTED_MODULE_3___default().red(err));
        const error = typeof err === 'string' ? new _MyError__WEBPACK_IMPORTED_MODULE_16__.MyError({ message: err }) : err;
        res.status(error.status || 500);
        if (req.headers['content-type'] &&
            req.headers['content-type'].indexOf('application/json') !== -1) {
            res.end(this.isDevelopment() || error.status === 404
                ? error.message
                : 'Internal Software Error');
        }
        else {
            const status = error.status || 500;
            const message = this.isDevelopment() || error.status === 404
                ? error.message
                : 'Internal Software Error';
            const stack = this.isDevelopment() && error.status !== 404 ? error.stack : null;
            res.end(`<!DOCTYPE html>
<html>
<title>${status} ${message}</title>
<body>
    <h1>${message}</h1>
    <h2>${status}</h2>
    <pre>${stack}</pre>
</body>
</html>`);
        }
        await this.logError(error, req);
    }
    /*_getTest(req, res, next) {
        console.log('getTest');
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.end('getTest');
    }*/
    /*_postTest(req, res, next) {
        console.log('postTest', req.body);
        res.json({foo: 'bar'});
    }*/
    createAndRunHttpServer(host, port) {
        return new Promise((resolve, reject) => {
            try {
                const httpServer = http__WEBPACK_IMPORTED_MODULE_0___default().createServer(this.express);
                const tempErrorHandler = (err) => {
                    console.error('tempErrorHandler', err);
                    httpServer.off('error', tempErrorHandler);
                    reject(err);
                };
                httpServer.on('error', tempErrorHandler);
                httpServer.listen(port, host, () => {
                    resolve(httpServer);
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
    async onProcessMessage(message) {
        console.log('BackHostApp.onProcessMessage');
        if (message === 'shutdown') {
            await this.shutdown();
            process.exit(0);
        }
    }
    async onProcessSIGINT() {
        console.log('BackHostApp.onProcessSIGINT');
        console.log('Received INT signal (Ctrl+C), shutting down gracefully...');
        await this.shutdown();
        process.exit(0);
    }
    onProcessSIGTERM() {
        console.log('BackHostApp.onProcessSIGTERM');
        console.log('Received SIGTERM (kill) signal, shutting down forcefully.');
        process.exit(1);
    }
    onProcessExit(code) {
        console.log('BackHostApp.onProcessExit', code);
        console.log('process.exit:', code);
    }
    async onUnhandledRejection(err) {
        console.error(colors_safe__WEBPACK_IMPORTED_MODULE_3___default().red('BackHostApp.onUnhandledRejection'), err);
        err.message = `unhandledRejection: ${err.message}`;
        await this.logError(err);
    }
    async shutdown() {
        console.log('BackHostApp.shutdown');
        const routes = Object.keys(this.applications);
        for (let i = 0; i < routes.length; i++) {
            const route = routes[i];
            console.log('route:', route);
            const application = this.applications[route];
            await application.deinit();
        }
    }
    onHttpServerError(err) {
        console.error(colors_safe__WEBPACK_IMPORTED_MODULE_3___default().red('BackHostApp.onHttpServerError'), err.code, err.message);
        /*if (err.code === 'EADDRINUSE') {
            console.error(`Address ${host}:${port} in use.`);
        } else {
            console.error(err);
        }*/
    }
    getDomainFromRequest(req) {
        if (!req)
            throw new Error('need req param');
        const hostPort = req.headers.host;
        if (!hostPort)
            throw new Error('no host');
        const [host, port] = hostPort.split(':');
        const [domain] = host.split('.');
        if (!domain)
            throw new Error('trouble getting a domain');
        return domain;
    }
    async postError(req, res, next) {
        console.log(colors_safe__WEBPACK_IMPORTED_MODULE_3___default().blue('BackHostApp.postError'), req.body.message);
        if (this.logPool) {
            try {
                await BackHostApp.createLog(this.logPool, {
                    type: req.body.type,
                    source: req.body.source,
                    ip: req.body.ip ||
                        req.headers['x-forwarded-for'] ||
                        req.connection.remoteAddress,
                    message: req.body.message,
                    stack: req.body.stack,
                    data: req
                        ? JSON.stringify(Object.assign({ headers: req.headers, domain: this.getDomainFromRequest(req) }, req.body.data), null, 4)
                        : null,
                });
                res.header('Access-Control-Allow-Origin', '*');
                res.end('ok');
            }
            catch (err) {
                next(err);
            }
        }
    }
    getFrontendDirPath() {
        return this.frontendDirPath;
    }
    initCustomRoutes() { }
    alias(method, path, [module, appDirName, appFileName, env, domain], cb, query) {
        this.express[method](path, async (req, res, next) => {
            req.params.module = module;
            req.params.appDirName = appDirName;
            req.params.appFileName = appFileName;
            if (env) {
                req.params.env = env;
            }
            if (domain) {
                req.params.domain = domain;
            }
            if (query) {
                for (const name in query) {
                    req.query[name] = query[name] ? query[name] : req.params[name];
                }
            }
            await this[cb](req, res, next);
        });
    }
    getPostAlias(path, arr, query) {
        this.alias('get', path, arr, 'moduleGet', query);
        this.alias('post', path, arr, 'modulePost', query);
    }
    getNodeEnv() {
        return process.env.NODE_ENV || null;
    }
    isDevelopment() {
        return this.getNodeEnv() === 'development';
    }
    isProduction() {
        return !this.isDevelopment();
    }
    getParams() {
        return this.params;
    }
    broadcastResult(sourceApplication, context, result) {
        console.log('BackHostApp.broadcastResult');
        for (const route in this.applications) {
            if (context.getRoute() === route && this.applications[route] === sourceApplication) {
                sourceApplication.broadcastDomesticResultToClients(context, result);
            }
            else {
                const application = this.applications[route];
                application.broadcastForeignResultToClients(context, result);
            }
        }
    }
    static test() {
        console.log('BackHostApp.test');
    }
    getDistDirPath() {
        return this.distDirPath;
    }
    makeDistDirPathForApp(appFilePath) {
        const dirName = path__WEBPACK_IMPORTED_MODULE_5___default().basename(path__WEBPACK_IMPORTED_MODULE_5___default().dirname(appFilePath));
        const distDirPath = path__WEBPACK_IMPORTED_MODULE_5___default().join(this.getDistDirPath(), dirName);
        return distDirPath;
    }
}


/***/ }),

/***/ "./src/backend/BaseModel.ts":
/*!**********************************!*\
  !*** ./src/backend/BaseModel.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseModel": () => (/* binding */ BaseModel)
/* harmony export */ });
class BaseModel {
    constructor(data, parent) {
        this.data = data;
        this.parent = parent;
        if (!data)
            throw new Error(`new ${this.constructor.name}: no data`);
    }
    static getClassName(data) {
        return data['@class'];
    }
    static getAttr(data, name) {
        return data['@attributes'][name];
    }
    static getName(data) {
        return BaseModel.getAttr(data, 'name');
    }
    static getEnvList(data) {
        const list = data.env ? Object.keys(data.env).filter((env) => env !== 'local') : [];
        return ['local', ...list];
    }
    getClassName() {
        return this.data['@class'];
    }
    getName() {
        return BaseModel.getName(this.data);
    }
    static attributes(data) {
        return data['@attributes'];
    }
    attributes() {
        return this.data['@attributes'];
    }
    getAttr(name) {
        if (!this.isAttr(name))
            throw new Error(`no attribute '${name}'`);
        return this.data['@attributes'][name];
    }
    setAttr(name, value) {
        this.data['@attributes'][name] = value;
    }
    isAttr(name) {
        return this.data['@attributes'][name] !== undefined;
    }
    isData(colName, name) {
        if (!colName)
            throw new Error('isData: no colName');
        if (!name)
            throw new Error('isData: no name');
        return !!this.getColItemData(colName, name);
    }
    getData() {
        return this.data;
    }
    getCol(name) {
        if (!name)
            throw new Error('getCol: no name');
        const arr = this.data[name];
        if (!arr) {
            // console.log('this.data', this.data);
            throw new Error(`getCol: no col ${name}`);
        }
        return arr;
    }
    getItemNames(colName) {
        return this.getCol(colName).map((data) => BaseModel.getName(data));
    }
    getColItemData(colName, name) {
        const data = BaseModel.findColDataByName(this.getCol(colName), name);
        if (data)
            return data;
        return null;
    }
    removeColData(colName, name) {
        const col = this.getCol(colName);
        const data = BaseModel.findColDataByName(col, name);
        if (!data)
            throw new Error(`removeColData: no ${name} in ${colName}`);
        col.splice(col.indexOf(data), 1);
        return data;
    }
    static findColDataByName(col, name) {
        return col.find((data) => BaseModel.getName(data) === name);
    }
    addModelData(colName, data) {
        const name = BaseModel.getName(data);
        if (this.getColItemData(colName, name))
            throw new Error(`${name} already exists in ${colName}`);
        this.getCol(colName).push(data);
    }
    getApp() {
        throw new Error('getApp: not implemented');
    }
    replaceDataColItem(colName, oldData, newData) {
        const dataCol = this.getCol(colName);
        const i = dataCol.indexOf(oldData);
        if (i === -1)
            throw new Error(`replaceDataColItem: no ${BaseModel.getName(oldData)} in ${colName}`);
        dataCol[i] = newData;
        return i;
    }
    getParent() {
        return this.parent;
    }
}


/***/ }),

/***/ "./src/backend/Context.ts":
/*!********************************!*\
  !*** ./src/backend/Context.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Context": () => (/* binding */ Context)
/* harmony export */ });
class Context {
    constructor(options) {
        // console.log('Context', options);
        // this.options = options;
        this.options = options;
        // query
        this.query = Object.assign({}, (this.getReq() && this.getReq().query ? this.getReq().query : {}));
        // params
        this.params = Object.assign({}, (this.getReq() && this.getReq().body.params ? this.getReq().body.params : {}));
        // files
        this.files = {};
        if (this.getReq() && this.getReq().files) {
            for (const name in this.getReq().files) {
                this.files[name] = this.getReq().files[name].buffer;
            }
        }
        // connections
        this.connections = {};
        // querytime
        this.querytime = { params: {} };
    }
    getRoute() {
        return `${this.getAppDirName()}/${this.getAppFileName()}/${this.getEnv()}/${this.getDomain()}`;
    }
    getVirtualPath() {
        return `/${this.getModule()}/${this.getAppDirName()}/${this.getAppFileName()}/${this.getEnv()}/${this.getDomain()}`;
    }
    getUser() {
        const route = this.getRoute();
        if (this.getReq().session.user && this.getReq().session.user[route]) {
            return this.getReq().session.user[route];
        }
        return null;
    }
    getClientTimezoneOffset() {
        if (this.getReq().session.tzOffset !== undefined &&
            this.getReq().session.tzOffset !== null) {
            return this.getReq().session.tzOffset;
        }
        return null;
    }
    getTimeOffset() {
        const clientTimezoneOffset = this.getClientTimezoneOffset();
        if (clientTimezoneOffset !== null) {
            return new Date().getTimezoneOffset() - clientTimezoneOffset;
        }
        return null;
    }
    getCookies() {
        return Object.assign({}, (this.getReq() && this.getReq().cookies ? this.getReq().cookies : {}));
    }
    getQuery() {
        return Object.assign({}, (this.getReq() && this.getReq().query ? this.getReq().query : {}));
    }
    getParams() {
        // console.log('Context.getParams:');
        const user = this.getUser();
        const timeOffset = this.getTimeOffset();
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, this.getCookies()), this.query), this.params), (this.querytime ? this.querytime.params : {})), (user ? { userId: user.id, userName: user.name } : {})), (timeOffset !== null ? { timeOffset } : {}));
    }
    getReq() {
        return this.options.req;
    }
    getRes() {
        return this.options.res;
    }
    getBody() {
        return this.getReq().body;
    }
    getModule() {
        if (this.options.module) {
            return this.options.module;
        }
        return this.getReq().params.module;
    }
    getDomain() {
        if (this.options.domain) {
            return this.options.domain;
        }
        return this.getReq().params.domain;
    }
    getAppDirName() {
        if (this.options.appDirName) {
            return this.options.appDirName;
        }
        return this.getReq().params.appDirName;
    }
    getAppFileName() {
        if (this.options.appFileName) {
            return this.options.appFileName;
        }
        return this.getReq().params.appFileName;
    }
    getEnv() {
        if (this.options.env) {
            return this.options.env;
        }
        return this.getReq().params.env;
    }
    getUri() {
        return this.getReq().params['0'];
    }
    getIp() {
        return this.getReq().headers['x-forwarded-for'] || this.getReq().connection.remoteAddress;
    }
    getHost() {
        return this.getReq().headers.host;
    }
    getProtocol() {
        return this.getReq().headers['x-forwarded-proto'] || 'http';
    }
    setVersionHeaders(platformVersion, appVersion) {
        this.getRes().setHeader('qforms-platform-version', platformVersion);
        this.getRes().setHeader('qforms-app-version', appVersion);
    }
    setParam(name, value) {
        this.params[name] = value;
    }
    destroy() { }
}


/***/ }),

/***/ "./src/backend/Converter.ts":
/*!**********************************!*\
  !*** ./src/backend/Converter.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Converter": () => (/* binding */ Converter)
/* harmony export */ });
/* harmony import */ var _JsonFile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JsonFile */ "./src/backend/JsonFile.ts");
/* harmony import */ var _editor_Editor_ApplicationEditor_ApplicationEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor/Editor/ApplicationEditor/ApplicationEditor */ "./src/backend/editor/Editor/ApplicationEditor/ApplicationEditor.ts");
/* harmony import */ var _BaseModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseModel */ "./src/backend/BaseModel.ts");



class Converter {
    static async reformat(appFilePath) {
        console.log('Convert.reformat', appFilePath);
        const appFile = new _JsonFile__WEBPACK_IMPORTED_MODULE_0__.JsonFile(appFilePath);
        await appFile.read();
        // app
        const appEditor = new _editor_Editor_ApplicationEditor_ApplicationEditor__WEBPACK_IMPORTED_MODULE_1__.ApplicationEditor(appFile);
        appEditor.reformat();
        await appEditor.save();
        // pages
        const pageNames = appEditor.data.pageLinks.map((data) => _BaseModel__WEBPACK_IMPORTED_MODULE_2__.BaseModel.getName(data));
        // console.log('pageNames:', pageNames);
        // const pageName = pageNames[0];
        for (const pageName of pageNames) {
            const pageEditor = await appEditor.getPage(pageName);
            pageEditor.reformat();
            await pageEditor.save();
        }
    }
}


/***/ }),

/***/ "./src/backend/FileSessionStore.ts":
/*!*****************************************!*\
  !*** ./src/backend/FileSessionStore.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileSessionStore": () => (/* binding */ FileSessionStore)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express-session */ "express-session");
/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express_session__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Helper */ "./src/backend/Helper.ts");


// import colors from 'colors/safe';

class FileSessionStore extends (express_session__WEBPACK_IMPORTED_MODULE_1___default().Store) {
    constructor(dirPath) {
        // console.log('FileSessionStore.constructor', dirPath);
        super();
        this.dirPath = dirPath;
        this.store = {};
    }
    set(sid, session, cb) {
        console.log('FileSessionStore.set', sid, session);
        this.store[sid] = session;
        const sessionFilePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(this.dirPath, `${sid}.json`);
        const content = JSON.stringify(session, null, 4);
        _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.writeFile(sessionFilePath, content).then(() => {
            cb(null);
        });
    }
    get(sid, cb) {
        // console.log('FileSessionStore.get', sid);
        const session = this.store[sid];
        if (session) {
            cb(null, session);
        }
        else {
            const sessionFilePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(this.dirPath, `${sid}.json`);
            _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.getFileContent(sessionFilePath).then((content) => {
                if (content) {
                    try {
                        const session = (this.store[sid] = JSON.parse(content));
                        cb(null, session);
                    }
                    catch (err) {
                        cb(err);
                    }
                }
                else {
                    cb(null, null);
                }
            });
        }
    }
    destroy(sid, cb) {
        console.log('FileSessionStore.destroy', sid);
        delete this.store[sid];
        cb(null);
    }
}


/***/ }),

/***/ "./src/backend/Helper.ts":
/*!*******************************!*\
  !*** ./src/backend/Helper.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Helper": () => (/* binding */ Helper)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var glob__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! glob */ "glob");
/* harmony import */ var glob__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(glob__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var slash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! slash */ "slash");
/* harmony import */ var slash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(slash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var colors_safe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! colors/safe */ "colors/safe");
/* harmony import */ var colors_safe__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(colors_safe__WEBPACK_IMPORTED_MODULE_4__);





function _getFilePathsSync(dirPath, ext) {
    const filePaths = glob__WEBPACK_IMPORTED_MODULE_1___default().sync(path__WEBPACK_IMPORTED_MODULE_2___default().join(dirPath, '*.' + ext));
    glob__WEBPACK_IMPORTED_MODULE_1___default().sync(path__WEBPACK_IMPORTED_MODULE_2___default().join(dirPath, '*/')).forEach((subDirPath) => {
        _getFilePathsSync(subDirPath, ext).forEach((fileName) => {
            filePaths.push(fileName);
        });
    });
    return filePaths;
}
async function _getFilePaths2(dirPath, ext, filePaths) {
    // console.log('_getFilePaths2', dirPath);
    // all files from directory
    const files = await Helper._glob(path__WEBPACK_IMPORTED_MODULE_2___default().join(dirPath, '*.' + ext));
    // pushing files to output array
    files.forEach((item) => {
        filePaths.push(item);
    });
    // all directories from directory
    const dirs = await Helper._glob(path__WEBPACK_IMPORTED_MODULE_2___default().join(dirPath, '*/'));
    // for each dir push files to output array
    for (let i = 0; i < dirs.length; i++) {
        const subDirPath = dirs[i];
        await _getFilePaths2(subDirPath, ext, filePaths);
    }
}
class Helper {
    static getRandomString(length) {
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const index = getRandomInt(0, chars.length - 1);
            result += chars.substr(index, 1);
        }
        return result;
    }
    static getFilePathsSync(publicDirPath, subDirPath, ext) {
        return _getFilePathsSync(path__WEBPACK_IMPORTED_MODULE_2___default().join(publicDirPath, subDirPath), ext).map((filePath) => {
            return slash__WEBPACK_IMPORTED_MODULE_3___default()(path__WEBPACK_IMPORTED_MODULE_2___default().relative(publicDirPath, filePath));
        });
    }
    static _glob(path) {
        return new Promise((resolve, reject) => {
            glob__WEBPACK_IMPORTED_MODULE_1___default()(path, (err, items) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(items);
                }
            });
        });
    }
    static async getFilePaths(dirPath, ext) {
        // console.log('Helper.getFilePaths');
        const filePaths = [];
        await _getFilePaths2(dirPath, ext, filePaths);
        const relativeFilePaths = filePaths.map((filePath) => {
            return slash__WEBPACK_IMPORTED_MODULE_3___default()(path__WEBPACK_IMPORTED_MODULE_2___default().relative(dirPath, filePath));
        });
        return relativeFilePaths;
    }
    static currentTime() {
        const now = new Date();
        const arrN = [now.getHours(), now.getMinutes(), now.getSeconds()];
        const arrS = arrN.map((n) => n.toString());
        for (let i = 0; i < arrN.length; i++) {
            if (arrN[i] < 10) {
                arrS[i] = '0' + arrS[i];
            }
        }
        /*
        let hh = now.getHours();
        let mm = now.getMinutes();
        let ss = now.getSeconds();

        let _hh = hh.toString();
        let _mm = mm.toString();
        let _ss = ss.toString();

        if (hh < 10) _hh = '0' + _hh;
        if (mm < 10) _mm = '0' + mm;
        if (ss < 10) _ss = '0' + ss;


        return [_hh, _mm, _ss].join(':');*/
        return arrS.join(':');
    }
    /*static currentDate() {
        const now = new Date();
        let dd   = now.getDate();      if (dd < 10) dd = '0' + dd;
        let mm   = now.getMonth() + 1; if (mm < 10) mm = '0' + mm;   /!*January is 0!*!/
        const yyyy = now.getFullYear();
        return [yyyy, mm, dd].join('-');
    }*/
    /*static currentDateTime() {
        return Helper.currentDate() + ' ' + Helper.currentTime();
    }*/
    static templateToJsString(value, params) {
        return value.replace(/\$\{([\w\.@]+)\}/g, (text, name) => {
            if (params.hasOwnProperty(name)) {
                return `Helper.decodeValue('${Helper.encodeValue(params[name])}')`;
            }
            return 'undefined';
        });
    }
    /*static replaceKey(obj, key1, key2) {
        const keys   = Object.keys(obj);
        const values = _.filter(obj, () => {return true;});
        const index  = keys.indexOf(key1);
        if (index !== -1) {
            keys[index] = key2;
            obj = _.object(keys, values);
        }
        return obj;
    }*/
    static readTextFile(path) {
        // console.log(colors.blue('Helper.readTextFile'), path);
        return new Promise((resolve, reject) => {
            fs__WEBPACK_IMPORTED_MODULE_0___default().readFile(path, 'utf8', (err, content) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(content);
                }
            });
        });
    }
    static async getFileContent(filePath) {
        if (await Helper.exists(filePath)) {
            return Helper.readTextFile(filePath);
        }
        return null;
    }
    static getFileContentSync(filePath) {
        // console.log(colors.blue('Helper.getFileContentSync'), filePath);
        if (!fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(filePath)) {
            return null;
        }
        return fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(filePath, 'utf8');
    }
    static readBinaryFile(filePath) {
        console.log(colors_safe__WEBPACK_IMPORTED_MODULE_4___default().blue('Helper.readBinaryFile'), filePath);
        return new Promise((resolve, reject) => {
            fs__WEBPACK_IMPORTED_MODULE_0___default().readFile(filePath, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    static createPath(arr) {
        if (arr.length === 0)
            throw new Error('no path elements');
        if (arr.length === 1)
            return '/';
        return arr.join('/');
    }
    static getDirPath(filePath) {
        const arr = filePath.split('/');
        return Helper.createPath(arr.slice(0, arr.length - 1));
    }
    static async createDirIfNotExists2(originalDirPath) {
        // console.log('Helper.createDirIfNotExists2', originalDirPath);
        const arr = originalDirPath.split('/');
        for (let i = 1; i <= arr.length; i++) {
            const dirPath = Helper.createPath(arr.slice(0, i));
            const exists = await Helper.exists(dirPath);
            // console.log('dirPath', i, dirPath, exists);
            if (!exists) {
                await Helper.createDirIfNotExists(dirPath);
            }
        }
    }
    static createDirIfNotExists(dirPath) {
        console.log(colors_safe__WEBPACK_IMPORTED_MODULE_4___default().blue('Helper.createDirIfNotExists'), dirPath);
        return new Promise((resolve, reject) => {
            fs__WEBPACK_IMPORTED_MODULE_0___default().exists(dirPath, (exists) => {
                if (exists) {
                    resolve();
                }
                else {
                    fs__WEBPACK_IMPORTED_MODULE_0___default().mkdir(dirPath, (err) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve();
                        }
                    });
                }
            });
        });
    }
    static createDirIfNotExistsSync(dirPath) {
        // console.log(colors.blue('Helper.createDirIfNotExistsSync'), dirPath);
        if (!fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(dirPath)) {
            fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(dirPath);
        }
    }
    /*static moveObjProp(obj, prop, offset) {
        const keys     = _.keys(obj);
        const values   = _.values(obj);
        const oldIndex = keys.indexOf(prop);
        if (oldIndex === -1) {
            throw new Error('cannot find element');
        }
        const newIndex = oldIndex + offset;
        if (newIndex < 0) {
            throw new Error('cannot up top element');
        }
        if (newIndex > values.length - 1) {
            throw new Error('cannot down bottom element');
        }
        keys.splice(newIndex, 0,   keys.splice(oldIndex, 1)[0]);
        values.splice(newIndex, 0, values.splice(oldIndex, 1)[0]);
        return _.object(keys, values);
    }*/
    static moveArrItem(arr, item, offset) {
        const oldIndex = arr.indexOf(item);
        if (oldIndex === -1)
            throw new Error('cannot find element');
        const newIndex = oldIndex + offset;
        if (newIndex < 0)
            throw new Error('cannot up top element');
        if (newIndex > arr.length - 1)
            throw new Error('cannot down bottom element');
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    }
    /*static getTempSubDirPath3(tempDirPath) {
        return new Promise((resolve, reject) => {
            const subDirName = Helper.getRandomString(8);
            const tempSubSirPath = path.join(tempDirPath, subDirName);
            fs.exists(tempSubSirPath, exists => {
                if (!exists) {
                    fs.mkdir(tempSubSirPath, err => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(tempSubSirPath);
                        }
                    });
                } else {
                    Helper.getTempSubDirPath(tempDirPath, () => {
                        resolve();
                    });
                }
            });
        });
    }*/
    static copyFile3(source, target) {
        return new Promise((resolve, reject) => {
            const rd = fs__WEBPACK_IMPORTED_MODULE_0___default().createReadStream(source);
            rd.on('error', (err) => {
                reject(err);
            });
            const wr = fs__WEBPACK_IMPORTED_MODULE_0___default().createWriteStream(target);
            wr.on('error', (err) => {
                reject(err);
            });
            wr.on('close', () => {
                resolve();
            });
            rd.pipe(wr);
        });
    }
    static exists(path) {
        // console.log(colors.blue('Helper.exists'), path);
        return new Promise((resolve) => {
            fs__WEBPACK_IMPORTED_MODULE_0___default().exists(path, (exists) => {
                resolve(exists);
            });
        });
    }
    static writeFile(filePath, content) {
        console.log(colors_safe__WEBPACK_IMPORTED_MODULE_4___default().blue('Helper.writeFile'), filePath);
        return new Promise((resolve, reject) => {
            fs__WEBPACK_IMPORTED_MODULE_0___default().writeFile(filePath, content, 'utf8', (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    static writeFileSync(filePath, content) {
        console.log(colors_safe__WEBPACK_IMPORTED_MODULE_4___default().blue('Helper.writeFileSync'), filePath /*, content*/);
        return fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(filePath, content, 'utf8');
    }
    static async writeFile2(filePath, content) {
        const dirPath = Helper.getDirPath(filePath);
        await Helper.createDirIfNotExists2(dirPath);
        return await Helper.writeFile(filePath, content);
    }
    static mapObject(object, cb) {
        return Object.keys(object).reduce((obj, key) => {
            const [newKey, newVal] = cb(key, object[key]);
            obj[newKey] = newVal;
            return obj;
        }, {});
    }
    static fsUnlink(filePath) {
        return new Promise((resolve, reject) => {
            fs__WEBPACK_IMPORTED_MODULE_0___default().unlink(filePath, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    // timeOffset number in minutes
    static today(timeOffset) {
        // console.log('Helper.today', timeOffset);
        let ts = Date.now();
        if (timeOffset !== undefined && timeOffset !== null) {
            ts += Helper.MINUTE() * timeOffset;
        }
        const date = new Date(ts);
        ts = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
        if (timeOffset !== undefined && timeOffset !== null) {
            ts -= Helper.MINUTE() * timeOffset;
        }
        return new Date(ts);
    }
    static dateTimeReviver(key, value) {
        if (typeof value === 'string') {
            const a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{3})?(Z|([+-])(\d{2}):(\d{2}))?$/.exec(value);
            if (a)
                return new Date(value);
        }
        return value;
    }
    static decodeValue(rawValue) {
        if (rawValue === undefined)
            throw new Error('decodeValue undefined');
        if (rawValue === null)
            throw new Error('decodeValue null');
        try {
            return JSON.parse(rawValue, Helper.dateTimeReviver);
        }
        catch (err) {
            throw new Error(`decodeValue failed: ${rawValue}`);
        }
    }
    static encodeValue(value) {
        return JSON.stringify(value);
    }
    static decodeObject(obj) {
        const dObj = {};
        for (const name in obj) {
            if (typeof obj[name] !== 'string')
                throw new Error(`cannot decode: ${name}, type: ${typeof obj[name]}`);
            dObj[name] = Helper.decodeValue(obj[name]);
        }
        return dObj;
    }
    static SECOND() {
        return 1000;
    }
    static MINUTE() {
        return 60 * Helper.SECOND();
    }
    static HOUR() {
        return 60 * Helper.MINUTE();
    }
    static DAY() {
        return 24 * Helper.HOUR();
    }
    static WEEK() {
        return 7 * Helper.DAY();
    }
    static Session_save(session) {
        return new Promise((resolve, reject) => {
            session.save((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    static addMinutes(date, minutes) {
        // console.log('Helper.addMinutes', date, minutes);
        date.setMinutes(date.getMinutes() + minutes);
    }
    static removeTimezoneOffset(date) {
        Helper.addMinutes(date, -date.getTimezoneOffset());
    }
    static addTimezoneOffset(date) {
        Helper.addMinutes(date, date.getTimezoneOffset());
    }
    static cloneDate(date) {
        return new Date(date.getTime());
    }
    static fillArray(n) {
        return Array.from(Array(n).keys());
    }
    static formatDate(date, format) {
        const YYYY = date.getFullYear();
        const M = date.getMonth() + 1;
        const D = date.getDate();
        const h = date.getHours();
        const m = date.getMinutes();
        const s = date.getSeconds();
        const MM = M < 10 ? `0${M}` : M;
        const DD = D < 10 ? `0${D}` : D;
        const hh = h < 10 ? `0${h}` : h;
        const mm = m < 10 ? `0${m}` : m;
        const ss = s < 10 ? `0${s}` : s;
        const values = { YYYY, M, D, h, m, s, MM, DD, hh, mm, ss };
        return format.replace(/\{([\w\.]+)\}/g, (text, name) => values[name] ? values[name] : text);
    }
    static getFirstField(object) {
        const [key] = Object.keys(object);
        return object[key];
    }
    static getCommandLineParams() {
        return process.argv
            .map((arg) => arg.split('='))
            .reduce((acc, [name, value]) => {
            acc[name] = value;
            return acc;
        }, {});
    }
    static getWebSocketIP(webSocket) {
        return webSocket.upgradeReq.headers['x-real-ip']
            ? webSocket.upgradeReq.headers['x-real-ip']
            : webSocket.upgradeReq.socket.remoteAddress;
    }
    static getWebSocketPort(webSocket) {
        return webSocket.upgradeReq.headers['x-real-port']
            ? webSocket.upgradeReq.headers['x-real-port']
            : webSocket.upgradeReq.socket.remotePort;
    }
    static templateArray(arr) {
        return arr.map((item) => {
            const type = typeof item;
            if (type === 'number' || type === 'boolean') {
                return item;
            }
            if (type === 'string') {
                return `'${item}'`;
            }
            throw new Error(`wrong type for array item: ${type}`);
        });
    }
    static createEmptyPromise() {
        let _resolve, _reject;
        const promise = new Promise(function (resolve, reject) {
            _resolve = resolve;
            _reject = reject;
        });
        // @ts-ignore
        promise.resolve = _resolve;
        // @ts-ignore
        promise.reject = _reject;
        return promise;
    }
    static test() {
        console.log('Helper.test');
    }
    static formatNumber(value) {
        return new Intl.NumberFormat('ru-RU').format(value);
    }
}
// @ts-ignore
global.Helper = Helper;


/***/ }),

/***/ "./src/backend/JsonFile.ts":
/*!*********************************!*\
  !*** ./src/backend/JsonFile.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JsonFile": () => (/* binding */ JsonFile)
/* harmony export */ });
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Helper */ "./src/backend/Helper.ts");
/* harmony import */ var _BaseModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseModel */ "./src/backend/BaseModel.ts");


class JsonFile {
    constructor(filePath, data = null) {
        this.filePath = filePath;
        this.data = data;
        this.content = null;
    }
    async create() {
        const exists = await _Helper__WEBPACK_IMPORTED_MODULE_0__.Helper.exists(this.filePath);
        if (exists)
            throw new Error(`File ${this.filePath} already exists`);
        if (this.data) {
        }
        else if (this.content) {
            this.data = JSON.parse(this.content);
        }
        else {
            this.data = {};
        }
        this.content = JSON.stringify(this.data, null, 4);
        await _Helper__WEBPACK_IMPORTED_MODULE_0__.Helper.writeFile2(this.filePath, this.content);
    }
    async read() {
        const content = await _Helper__WEBPACK_IMPORTED_MODULE_0__.Helper.readTextFile(this.filePath);
        this.content = content;
        this.data = JSON.parse(content);
    }
    async save() {
        console.log('JsonFile.save', this.filePath);
        this.content = JSON.stringify(this.data, null, 4);
        await _Helper__WEBPACK_IMPORTED_MODULE_0__.Helper.writeFile2(this.filePath, this.content);
    }
    getAttr(name) {
        const value = _BaseModel__WEBPACK_IMPORTED_MODULE_1__.BaseModel.getAttr(this.data, name);
        if (value === undefined)
            throw new Error(`no attribute '${name}'`);
        return value;
    }
}


/***/ }),

/***/ "./src/backend/Links.tsx":
/*!*******************************!*\
  !*** ./src/backend/Links.tsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Links": () => (/* binding */ Links)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const Links = ({ links }) => {
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: links.map((link, i) => {
            if (typeof link === 'string') {
                return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("link", { rel: 'stylesheet', href: link }, i);
            }
            else if (typeof link === 'object') {
                return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("link", { rel: link.rel, href: link.href, crossOrigin: link.crossorigin ? 'anonymous' : undefined }, i));
            }
        }) }));
};


/***/ }),

/***/ "./src/backend/MyError.ts":
/*!********************************!*\
  !*** ./src/backend/MyError.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MyError": () => (/* binding */ MyError)
/* harmony export */ });
class MyError extends Error {
    constructor(options) {
        if (!options.message)
            throw new Error('MyError: no message');
        super(options.message);
        this.status = options.status;
        this.data = options.data;
        this.context = options.context;
    }
}


/***/ }),

/***/ "./src/backend/Scripts.tsx":
/*!*********************************!*\
  !*** ./src/backend/Scripts.tsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scripts": () => (/* binding */ Scripts)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const Scripts = ({ scripts }) => {
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: scripts.map((src, i) => {
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("script", { type: 'text/javascript', src: src }, i);
        }) }));
};


/***/ }),

/***/ "./src/backend/WebSocketServer.ts":
/*!****************************************!*\
  !*** ./src/backend/WebSocketServer.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebSocketServer": () => (/* binding */ WebSocketServer)
/* harmony export */ });
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ws */ "ws");
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ws__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! url */ "url");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Context */ "./src/backend/Context.ts");



class WebSocketServer {
    constructor(options) {
        this.options = options;
        // console.log('WebSocketServer.constructor');
        this.server = new (ws__WEBPACK_IMPORTED_MODULE_0___default().Server)({
            server: options.httpServer,
            path: '/',
        });
        this.server.on('error', this.onError.bind(this));
        this.server.on('connection', this.onConnection.bind(this));
    }
    async onError(err) {
        console.log('WebSocketServer.onError', err);
    }
    async onConnection(webSocket) {
        console.log('WebSocketServer.onConnection', webSocket.upgradeReq.url);
        const parts = url__WEBPACK_IMPORTED_MODULE_1___default().parse(webSocket.upgradeReq.url, true);
        // console.log('parts.query:', parts.query);
        if (!parts.query.route)
            throw new Error('no route');
        if (!parts.query.uuid)
            throw new Error('no uuid');
        webSocket.route = parts.query.route;
        webSocket.uuid = parts.query.uuid;
        webSocket.userId = parts.query.userId;
        webSocket.customFields = {
            version: parts.query.version,
        };
        webSocket.on('close', this.onClose.bind(this, webSocket));
        webSocket.on('message', this.onMessage.bind(this, webSocket));
        const [appDirName, appFileName, env, domain] = parts.query.route.split('/');
        const context = new _Context__WEBPACK_IMPORTED_MODULE_2__.Context({
            module: 'viewer',
            appDirName,
            appFileName,
            env,
            domain,
        });
        const application = await this.getHostApp().createApplicationIfNotExists(context);
        application.addClient(webSocket);
        // say hello
        webSocket.send(JSON.stringify({ type: 'info', data: { hello: webSocket.uuid } }));
        // console.log('this.clients', this.clients);
        context.destroy();
    }
    async onClose(webSocket, code, reason) {
        console.log('WebSocketServer.onSocketClose', webSocket.route, webSocket.uuid, code, reason);
        this.getHostApp().getApplicationByRoute(webSocket.route).removeClient(webSocket);
    }
    async onMessage(webSocket, data, flags) {
        console.log('WebSocketServer.onMessage', webSocket.route, webSocket.uuid, data, flags);
    }
    getHostApp() {
        return this.options.hostApp;
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/ActionEditor/ActionEditor.ts":
/*!****************************************************************!*\
  !*** ./src/backend/editor/Editor/ActionEditor/ActionEditor.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ActionEditor": () => (/* binding */ ActionEditor)
/* harmony export */ });
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Editor */ "./src/backend/editor/Editor/Editor.ts");

class ActionEditor extends _Editor__WEBPACK_IMPORTED_MODULE_0__.Editor {
    static createData(params) {
        if (!params.name)
            throw new Error('no name');
        return {
            '@class': 'Action',
            '@attributes': {
                name: params.name,
                caption: params.caption || params.name,
            },
        };
    }
    getColName() {
        return 'actions';
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/ApplicationEditor/ApplicationEditor.ts":
/*!**************************************************************************!*\
  !*** ./src/backend/editor/Editor/ApplicationEditor/ApplicationEditor.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApplicationEditor": () => (/* binding */ ApplicationEditor)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Editor */ "./src/backend/editor/Editor/Editor.ts");
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Helper */ "./src/backend/Helper.ts");
/* harmony import */ var _viewer_BkModel_BkApplication_BkApplication__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../viewer/BkModel/BkApplication/BkApplication */ "./src/backend/viewer/BkModel/BkApplication/BkApplication.ts");
/* harmony import */ var _JsonFile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../JsonFile */ "./src/backend/JsonFile.ts");
/* harmony import */ var _PageEditor_PageEditor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../PageEditor/PageEditor */ "./src/backend/editor/Editor/PageEditor/PageEditor.ts");






class ApplicationEditor extends _Editor__WEBPACK_IMPORTED_MODULE_1__.Editor {
    constructor(appFile) {
        super(appFile.data);
        this.appFile = appFile;
        this.appInfo = _viewer_BkModel_BkApplication_BkApplication__WEBPACK_IMPORTED_MODULE_3__.BkApplication.makeAppInfoFromAppFile(appFile, null);
    }
    static createData(params) {
        // console.log('ApplicationEditor.createData', params);
        if (!params.name)
            throw new Error('no name');
        return {
            '@class': 'Application',
            '@attributes': {
                formatVersion: '0.1',
                name: params.name,
                caption: params.caption || params.name,
                authentication: params.authentication || 'false',
                user: params.user || 'admin',
                password: params.password || 'admin',
                lang: params.lang || 'en',
                theme: params.theme || 'standard',
                cssBlock: params.cssBlock !== undefined ? params.cssBlock : '',
                viewClass: params.viewClass !== undefined ? params.viewClass : '',
                ctrlClass: params.ctrlClass !== undefined ? params.ctrlClass : '',
                modelClass: params.modelClass !== undefined ? params.modelClass : '',
            },
            env: params.env ? params.env : {},
            databases: [...(params.databases ? params.databases.map(_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor.createItemData) : [])],
            dataSources: [
                ...(params.dataSources ? params.dataSources.map(_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor.createItemData) : []),
            ],
            actions: [...(params.actions ? params.actions.map(_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor.createItemData) : [])],
            pageLinks: [...(params.pageLinks ? params.pageLinks.map(_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor.createItemData) : [])],
        };
    }
    static async createAppFile(appFilePath, params) {
        const data = ApplicationEditor.createData(params);
        const appFile = new _JsonFile__WEBPACK_IMPORTED_MODULE_4__.JsonFile(appFilePath, data);
        await appFile.create();
        return appFile;
    }
    async newPageAndPageLinkData(params) {
        const pagesDirPath = path__WEBPACK_IMPORTED_MODULE_0___default().join(this.appInfo.dirPath, 'pages');
        const pageDirPath = path__WEBPACK_IMPORTED_MODULE_0___default().join(pagesDirPath, params.name);
        const pageFilePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(pageDirPath, params.name + '.json');
        const pageData = _PageEditor_PageEditor__WEBPACK_IMPORTED_MODULE_5__.PageEditor.createData(params);
        const pageFile = new _JsonFile__WEBPACK_IMPORTED_MODULE_4__.JsonFile(pageFilePath, pageData);
        await pageFile.create();
        const pageLinkData = this.newItemData('PageLink', 'pageLinks', params);
        return {
            page: pageData,
            pageLink: pageLinkData,
        };
    }
    async save() {
        console.log('ApplicationEditor.save');
        await this.appFile.save();
    }
    async removePageFile(name) {
        const pageLinkEditor = this.createItemEditor('pageLinks', name);
        const pageFilePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(this.appInfo.dirPath, pageLinkEditor.getAttr('fileName'));
        await _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.fsUnlink(pageFilePath);
    }
    async createPageEditor(relFilePath) {
        const pageFilePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(this.appInfo.dirPath, relFilePath);
        const pageFile = new _JsonFile__WEBPACK_IMPORTED_MODULE_4__.JsonFile(pageFilePath);
        await pageFile.read();
        return new _PageEditor_PageEditor__WEBPACK_IMPORTED_MODULE_5__.PageEditor(this, pageFile);
    }
    async getPage(name) {
        const pageLinkEditor = this.createItemEditor('pageLinks', name);
        const relFilePath = pageLinkEditor.getAttr('fileName');
        return await this.createPageEditor(relFilePath);
    }
    async createJs(params) {
        const customJsFilePath = await this.getCustomFilePath('js');
        const templateFilePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, 'Application.js.ejs');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            application: this.getName(),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return js;
    }
    async createModelBackJs(params) {
        const filePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(await this.getCustomDirPath(), 'Model.back.js');
        const templateFilePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, 'Model.back.js.ejs');
        const js = await this.createFileByParams(filePath, templateFilePath, {
            name: this.getName(),
        });
        return js;
    }
    async getCustomDirPath() {
        return this.appInfo.dirPath;
    }
    reformat() {
        this.data = this.appFile.data = ApplicationEditor.createData(Object.assign(Object.assign({}, this.attributes()), { env: this.data.env, databases: this.data.databases, dataSources: this.data.dataSources, actions: this.data.actions, pageLinks: this.data.pageLinks }));
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/ColumnEditor/ColumnEditor.ts":
/*!****************************************************************!*\
  !*** ./src/backend/editor/Editor/ColumnEditor/ColumnEditor.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColumnEditor": () => (/* binding */ ColumnEditor)
/* harmony export */ });
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Editor */ "./src/backend/editor/Editor/Editor.ts");

class ColumnEditor extends _Editor__WEBPACK_IMPORTED_MODULE_0__.Editor {
    static createData(params) {
        if (!params.name)
            throw new Error('no name');
        if (params.key !== undefined && typeof params.key !== 'string') {
            throw new Error('key not string');
        }
        if (params.auto !== undefined && typeof params.auto !== 'string') {
            throw new Error('auto not string');
        }
        if (params.nullable !== undefined && typeof params.nullable !== 'string') {
            throw new Error('nullable not string');
        }
        return {
            '@class': 'Column',
            '@attributes': {
                name: params.name,
                caption: params.caption || params.name,
                type: params.type || '',
                dbType: params.dbType || '',
                key: params.key || 'false',
                auto: params.auto || 'false',
                nullable: params.nullable || 'true',
            },
        };
    }
    getColName() {
        return 'columns';
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/DataSourceEditor/DataSourceEditor.ts":
/*!************************************************************************!*\
  !*** ./src/backend/editor/Editor/DataSourceEditor/DataSourceEditor.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataSourceEditor": () => (/* binding */ DataSourceEditor)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ApplicationEditor_ApplicationEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ApplicationEditor/ApplicationEditor */ "./src/backend/editor/Editor/ApplicationEditor/ApplicationEditor.ts");
/* harmony import */ var _PageEditor_PageEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../PageEditor/PageEditor */ "./src/backend/editor/Editor/PageEditor/PageEditor.ts");
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Editor */ "./src/backend/editor/Editor/Editor.ts");




class DataSourceEditor extends _Editor__WEBPACK_IMPORTED_MODULE_3__.Editor {
    static createData(params) {
        return {
            '@class': 'DataSource',
            '@attributes': Object.assign({}, DataSourceEditor.createAttributes(params)),
            keyColumns: [
                ...(params.keyColumns ? params.keyColumns.map(_Editor__WEBPACK_IMPORTED_MODULE_3__.Editor.createItemData) : []),
            ],
        };
    }
    static createAttributes(params) {
        if (!params.name)
            throw new Error('no name');
        return {
            name: params.name,
            database: params.database || 'default',
            table: params.table || '',
            modelClass: params.modelClass !== undefined ? params.modelClass : '',
        };
    }
    async getCollectionDirPath() {
        const customDirPath = await this.parent.getCustomDirPath();
        return path__WEBPACK_IMPORTED_MODULE_0___default().join(customDirPath, 'dataSources');
    }
    async createModelBackJs(params) {
        const filePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(await this.getCustomDirPath(), 'Model.back.js');
        const templateFilePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, 'Model.back.js.ejs');
        const js = await this.createFileByParams(filePath, templateFilePath, {
            _class: this.getClassName(),
            page: params.page ? params.page : '',
            form: params.form ? params.form : '',
            dataSource: this.getName(),
        });
        return js;
    }
    getColName() {
        return 'dataSources';
    }
    async save() {
        if (this.parent instanceof _ApplicationEditor_ApplicationEditor__WEBPACK_IMPORTED_MODULE_1__.ApplicationEditor) {
            await this.parent.appFile.save();
        }
        else if (this.parent instanceof _PageEditor_PageEditor__WEBPACK_IMPORTED_MODULE_2__.PageEditor) {
            await this.parent.pageFile.save();
        }
        else {
            await this.parent.getParent().pageFile.save();
        }
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/DataSourceEditor/NoSqlDataSourceEditor/NoSqlDataSourceEditor.ts":
/*!***************************************************************************************************!*\
  !*** ./src/backend/editor/Editor/DataSourceEditor/NoSqlDataSourceEditor/NoSqlDataSourceEditor.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoSqlDataSourceEditor": () => (/* binding */ NoSqlDataSourceEditor)
/* harmony export */ });
/* harmony import */ var _DataSourceEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DataSourceEditor */ "./src/backend/editor/Editor/DataSourceEditor/DataSourceEditor.ts");
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Editor */ "./src/backend/editor/Editor/Editor.ts");


class NoSqlDataSourceEditor extends _DataSourceEditor__WEBPACK_IMPORTED_MODULE_0__.DataSourceEditor {
    static createData(params) {
        return {
            '@class': 'NoSqlDataSource',
            '@attributes': Object.assign(Object.assign({}, _DataSourceEditor__WEBPACK_IMPORTED_MODULE_0__.DataSourceEditor.createAttributes(params)), { selectQuery: params.selectQuery ? params.selectQuery : '', countQuery: params.countQuery ? params.countQuery : '', limit: params.limit ? params.limit : '' }),
            keyColumns: [
                ...(params.keyColumns ? params.keyColumns.map(_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor.createItemData) : []),
            ],
        };
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/DataSourceEditor/SqlDataSourceEditor/SqlDataSourceEditor.ts":
/*!***********************************************************************************************!*\
  !*** ./src/backend/editor/Editor/DataSourceEditor/SqlDataSourceEditor/SqlDataSourceEditor.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SqlDataSourceEditor": () => (/* binding */ SqlDataSourceEditor)
/* harmony export */ });
/* harmony import */ var _DataSourceEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DataSourceEditor */ "./src/backend/editor/Editor/DataSourceEditor/DataSourceEditor.ts");
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Editor */ "./src/backend/editor/Editor/Editor.ts");


class SqlDataSourceEditor extends _DataSourceEditor__WEBPACK_IMPORTED_MODULE_0__.DataSourceEditor {
    static createData(params) {
        return {
            '@class': 'SqlDataSource',
            '@attributes': Object.assign(Object.assign({}, _DataSourceEditor__WEBPACK_IMPORTED_MODULE_0__.DataSourceEditor.createAttributes(params)), { singleQuery: params.singleQuery ? params.singleQuery : '', multipleQuery: params.multipleQuery ? params.multipleQuery : '', countQuery: params.countQuery ? params.countQuery : '', limit: params.limit ? params.limit : '' }),
            keyColumns: [
                ...(params.keyColumns ? params.keyColumns.map(_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor.createItemData) : []),
            ],
        };
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/DatabaseEditor/DatabaseEditor.ts":
/*!********************************************************************!*\
  !*** ./src/backend/editor/Editor/DatabaseEditor/DatabaseEditor.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DatabaseEditor": () => (/* binding */ DatabaseEditor)
/* harmony export */ });
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Editor */ "./src/backend/editor/Editor/Editor.ts");

class DatabaseEditor extends _Editor__WEBPACK_IMPORTED_MODULE_0__.Editor {
    static createData(params) {
        throw new Error('DatabaseEditor.createData not implemented');
    }
    static createAttributes(params) {
        if (!params.name)
            throw new Error('no name');
        return {
            name: params.name,
            modelClass: params.modelClass !== undefined ? params.modelClass : '',
        };
    }
    getColName() {
        return 'databases';
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/DatabaseEditor/MongoDbDatabaseEditor/MongoDbDatabaseEditor.ts":
/*!*************************************************************************************************!*\
  !*** ./src/backend/editor/Editor/DatabaseEditor/MongoDbDatabaseEditor/MongoDbDatabaseEditor.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MongoDbDatabaseEditor": () => (/* binding */ MongoDbDatabaseEditor)
/* harmony export */ });
/* harmony import */ var _DatabaseEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DatabaseEditor */ "./src/backend/editor/Editor/DatabaseEditor/DatabaseEditor.ts");
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Editor */ "./src/backend/editor/Editor/Editor.ts");


class MongoDbDatabaseEditor extends _DatabaseEditor__WEBPACK_IMPORTED_MODULE_0__.DatabaseEditor {
    static createData(params) {
        if (!params.name)
            throw new Error('no name');
        return {
            '@class': 'MongoDbDatabase',
            '@attributes': Object.assign({}, _DatabaseEditor__WEBPACK_IMPORTED_MODULE_0__.DatabaseEditor.createAttributes(params)),
            params: [...(params.params ? params.params.map(_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor.createItemData) : [])],
            tables: [...(params.tables ? params.tables.map(_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor.createItemData) : [])],
        };
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/DatabaseEditor/MySqlDatabaseEditor/MySqlDatabaseEditor.ts":
/*!*********************************************************************************************!*\
  !*** ./src/backend/editor/Editor/DatabaseEditor/MySqlDatabaseEditor/MySqlDatabaseEditor.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MySqlDatabaseEditor": () => (/* binding */ MySqlDatabaseEditor)
/* harmony export */ });
/* harmony import */ var _DatabaseEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DatabaseEditor */ "./src/backend/editor/Editor/DatabaseEditor/DatabaseEditor.ts");
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Editor */ "./src/backend/editor/Editor/Editor.ts");


class MySqlDatabaseEditor extends _DatabaseEditor__WEBPACK_IMPORTED_MODULE_0__.DatabaseEditor {
    static createData(params) {
        if (!params.name)
            throw new Error('no name');
        return {
            '@class': 'MySqlDatabase',
            '@attributes': Object.assign({}, _DatabaseEditor__WEBPACK_IMPORTED_MODULE_0__.DatabaseEditor.createAttributes(params)),
            params: [...(params.params ? params.params.map(_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor.createItemData) : [])],
            tables: [...(params.tables ? params.tables.map(_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor.createItemData) : [])],
        };
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/DatabaseEditor/PostgreSqlDatabaseEditor/PostgreSqlDatabaseEditor.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/backend/editor/Editor/DatabaseEditor/PostgreSqlDatabaseEditor/PostgreSqlDatabaseEditor.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PostgreSqlDatabaseEditor": () => (/* binding */ PostgreSqlDatabaseEditor)
/* harmony export */ });
/* harmony import */ var _DatabaseEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DatabaseEditor */ "./src/backend/editor/Editor/DatabaseEditor/DatabaseEditor.ts");
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Editor */ "./src/backend/editor/Editor/Editor.ts");


class PostgreSqlDatabaseEditor extends _DatabaseEditor__WEBPACK_IMPORTED_MODULE_0__.DatabaseEditor {
    static createData(params) {
        if (!params.name)
            throw new Error('no name');
        return {
            '@class': 'PostgreSqlDatabase',
            '@attributes': Object.assign({}, _DatabaseEditor__WEBPACK_IMPORTED_MODULE_0__.DatabaseEditor.createAttributes(params)),
            params: [...(params.params ? params.params.map(_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor.createItemData) : [])],
            tables: [...(params.tables ? params.tables.map(_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor.createItemData) : [])],
        };
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/Editor.ts":
/*!*********************************************!*\
  !*** ./src/backend/editor/Editor/Editor.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Editor": () => (/* binding */ Editor)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BaseModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseModel */ "./src/backend/BaseModel.ts");
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Helper */ "./src/backend/Helper.ts");
/* harmony import */ var _backend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../backend */ "./src/backend/index.ts");

const ejs = __webpack_require__(/*! ejs */ "ejs");



class Editor extends _BaseModel__WEBPACK_IMPORTED_MODULE_1__.BaseModel {
    /*async createFileByReplace(newFilePath, templateFilePath, replaceFrom, replaceTo, emptyTemplate) {
        console.log('Editor.createFileByReplace');
        emptyTemplate = emptyTemplate || '';
        const exists = await Helper.exists(newFilePath);
        if (exists) {
            throw new Error(`File ${path.basename(newFilePath)} already exist.`);
        }
        const template = await Helper.readTextFile(templateFilePath);
        let text = template.replace(new RegExp(replaceFrom, 'g'), replaceTo);
        if (text === '') {
            text = emptyTemplate;
        }
        await Helper.writeFile2(newFilePath, text);
        return text;
    }*/
    async createFileByParams(newFilePath, templateFilePath, params) {
        const exists = await _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.exists(newFilePath);
        if (exists) {
            throw new Error(`File ${path__WEBPACK_IMPORTED_MODULE_0___default().basename(newFilePath)} already exists.`);
        }
        const template = await _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.readTextFile(templateFilePath);
        const content = ejs.render(template, params);
        await _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.writeFile2(newFilePath, content);
        return content;
    }
    /*getViewName() {
        return this.constructor.name.replace('Editor', '') + 'View';
    }*/
    async getFile(filePath) {
        console.log('Editor.getFile', filePath);
        const exists = await _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.exists(filePath);
        if (exists) {
            return await _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.readTextFile(filePath);
        }
    }
    async saveFile(filePath, content) {
        const exists = await _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.exists(filePath);
        if (!exists) {
            throw new Error(`File {path.basename(filePath)} doesn't exist.`);
        }
        await _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.writeFile2(filePath, content);
    }
    async getCustomFile(ext) {
        console.log('Editor.getCustomFile', ext);
        const customFilePath = await this.getCustomFilePath(ext);
        return this.getFile(customFilePath);
    }
    async saveCustomFile(ext, text) {
        const customFilePath = await this.getCustomFilePath(ext);
        await this.saveFile(customFilePath, text);
    }
    /*moveDataSourceUp(name) {
        this.moveDataColItem('dataSources', name, -1);
    }*/
    /*moveDataSourceDown(name) {
        this.moveDataColItem('dataSources', name, 1);
    }*/
    /*moveActionUp(name) {
        this.moveDataColItem('actions', name, -1);
    }*/
    /*moveActionDown(name) {
        this.moveDataColItem('actions', name, 1);
    }*/
    async getCustomFilePath(ext) {
        const customDirPath = await this.getCustomDirPath();
        if (ext === 'js') {
            return path__WEBPACK_IMPORTED_MODULE_0___default().join(customDirPath, 'Controller.front.js');
        }
        else if (ext === 'jsx') {
            return path__WEBPACK_IMPORTED_MODULE_0___default().join(customDirPath, 'View.jsx');
        }
        else if (ext === 'less') {
            return path__WEBPACK_IMPORTED_MODULE_0___default().join(customDirPath, 'View.less');
        }
        return path__WEBPACK_IMPORTED_MODULE_0___default().join(customDirPath, this.getName() + '.' + ext);
    }
    /*createDataSourceEditor(name) {
        const data = this.getColItemData('dataSources', name);
        const className = BaseModel.getClassName(data);
        const DataSourceClass = backend[`${className}Editor`];
        return new DataSourceClass(data, this);
    }*/
    moveDataColItem(colName, name, offset) {
        _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.moveArrItem(this.getCol(colName), this.getColItemData(colName, name), offset);
    }
    /*async newActionData(params) {
        if (!params.name) throw new Error('no name');
        const name = params.name;
        if (this.getColItemData('actions', name)) {
            throw new Error(`action ${name} already exists`);
        }
        const data = backend.ActionEditor.createData(params);
        this.addModelData('actions', data);
        return data;
    }*/
    /*createActionEditor(name) {
        return new backend.ActionEditor(this.getColItemData('actions', name), this);
    }*/
    setData(colName, newData) {
        // console.log('Editor.setData', newData);
        return this.parent.replaceDataColItem(colName, this.data, newData);
    }
    createItemEditor(colName, itemName) {
        const data = this.getColItemData(colName, itemName);
        const className = _BaseModel__WEBPACK_IMPORTED_MODULE_1__.BaseModel.getClassName(data);
        const Class = _backend__WEBPACK_IMPORTED_MODULE_3__[`${className}Editor`];
        return new Class(data, this);
    }
    async getCustomDirPath() {
        const collectionDirPath = await this.getCollectionDirPath();
        return path__WEBPACK_IMPORTED_MODULE_0___default().join(collectionDirPath, this.getName());
    }
    async getCollectionDirPath() {
        throw new Error('Editor.getCollectionDirPath not implemented');
    }
    moveItemUp(colName, itemName) {
        this.moveDataColItem(colName, itemName, -1);
    }
    moveItemDown(colName, itemName) {
        this.moveDataColItem(colName, itemName, 1);
    }
    newItemData(className, colName, params) {
        console.log('Editor.newItemData', className, colName, params);
        const { name } = params;
        if (!name)
            throw new Error('no name');
        const editorClassName = `${className}Editor`;
        const Class = _backend__WEBPACK_IMPORTED_MODULE_3__[editorClassName];
        if (!Class)
            throw new Error(`no class ${editorClassName}`);
        const data = Class.createData(params);
        this.addModelData(colName, data);
        return data;
    }
    getColName() {
        throw new Error(`${this.constructor.name}.getColName not implemented`);
    }
    static createItemData(data) {
        // console.log('Editor.createItemData', data);
        try {
            const params = data['@attributes']
                ? Object.assign(Object.assign({ class: _BaseModel__WEBPACK_IMPORTED_MODULE_1__.BaseModel.getClassName(data) }, _BaseModel__WEBPACK_IMPORTED_MODULE_1__.BaseModel.attributes(data)), data) : data;
            if (!params.class) {
                const name = data['@attributes'] ? _BaseModel__WEBPACK_IMPORTED_MODULE_1__.BaseModel.getName(data) : data.name;
                throw new Error(`${name}: no class in data`);
            }
            return _backend__WEBPACK_IMPORTED_MODULE_3__[`${params.class}Editor`].createData(params);
        }
        catch (err) {
            const name = data['@attributes'] ? _BaseModel__WEBPACK_IMPORTED_MODULE_1__.BaseModel.getName(data) : data.name;
            err.message = `${name}: ${err.message}`;
            throw err;
        }
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/FieldEditor/CheckBoxFieldEditor/CheckBoxFieldEditor.ts":
/*!******************************************************************************************!*\
  !*** ./src/backend/editor/Editor/FieldEditor/CheckBoxFieldEditor/CheckBoxFieldEditor.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CheckBoxFieldEditor": () => (/* binding */ CheckBoxFieldEditor)
/* harmony export */ });
/* harmony import */ var _FieldEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FieldEditor */ "./src/backend/editor/Editor/FieldEditor/FieldEditor.ts");

class CheckBoxFieldEditor extends _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor {
    static createData(params) {
        return {
            '@class': 'CheckBoxField',
            '@attributes': Object.assign(Object.assign({}, _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false' }),
        };
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/FieldEditor/CheckBoxListFieldEditor/CheckBoxListFieldEditor.ts":
/*!**************************************************************************************************!*\
  !*** ./src/backend/editor/Editor/FieldEditor/CheckBoxListFieldEditor/CheckBoxListFieldEditor.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CheckBoxListFieldEditor": () => (/* binding */ CheckBoxListFieldEditor)
/* harmony export */ });
/* harmony import */ var _FieldEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FieldEditor */ "./src/backend/editor/Editor/FieldEditor/FieldEditor.ts");

class CheckBoxListFieldEditor extends _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor {
    static createData(params) {
        return {
            '@class': 'CheckBoxListField',
            '@attributes': Object.assign(Object.assign({}, _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false', dataSourceName: params.dataSourceName ? params.dataSourceName : '', valueColumn: params.valueColumn ? params.valueColumn : '', displayColumn: params.displayColumn ? params.displayColumn : '' }),
        };
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/FieldEditor/ComboBoxFieldEditor/ComboBoxFieldEditor.ts":
/*!******************************************************************************************!*\
  !*** ./src/backend/editor/Editor/FieldEditor/ComboBoxFieldEditor/ComboBoxFieldEditor.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComboBoxFieldEditor": () => (/* binding */ ComboBoxFieldEditor)
/* harmony export */ });
/* harmony import */ var _FieldEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FieldEditor */ "./src/backend/editor/Editor/FieldEditor/FieldEditor.ts");

class ComboBoxFieldEditor extends _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor {
    static createData(params) {
        return {
            '@class': 'ComboBoxField',
            '@attributes': Object.assign(Object.assign({}, _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false', placeholder: params.placeholder ? params.placeholder : '', dataSourceName: params.dataSourceName ? params.dataSourceName : '', valueColumn: params.valueColumn ? params.valueColumn : '', displayColumn: params.displayColumn ? params.displayColumn : '', newRowMode: params.newRowMode ? params.newRowMode : 'disabled', itemEditPage: params.itemEditPage ? params.itemEditPage : '', itemCreatePage: params.itemCreatePage ? params.itemCreatePage : '', itemCreateForm: params.itemCreateForm ? params.itemCreateForm : '', itemSelectPage: params.itemSelectPage ? params.itemSelectPage : '' }),
        };
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/FieldEditor/DateFieldEditor/DateFieldEditor.ts":
/*!**********************************************************************************!*\
  !*** ./src/backend/editor/Editor/FieldEditor/DateFieldEditor/DateFieldEditor.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DateFieldEditor": () => (/* binding */ DateFieldEditor)
/* harmony export */ });
/* harmony import */ var _FieldEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FieldEditor */ "./src/backend/editor/Editor/FieldEditor/FieldEditor.ts");

class DateFieldEditor extends _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor {
    static createData(params) {
        return {
            '@class': 'DateField',
            '@attributes': Object.assign(Object.assign({}, _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false', format: params.format ? params.format : '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}', timezone: params.timezone ? params.timezone : 'true', placeholder: params.placeholder ? params.placeholder : '', validateOnChange: params.validateOnChange ? params.validateOnChange : 'true', validateOnBlur: params.validateOnBlur ? params.validateOnBlur : 'false' }),
        };
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/FieldEditor/DateTimeFieldEditor/DateTimeFieldEditor.ts":
/*!******************************************************************************************!*\
  !*** ./src/backend/editor/Editor/FieldEditor/DateTimeFieldEditor/DateTimeFieldEditor.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DateTimeFieldEditor": () => (/* binding */ DateTimeFieldEditor)
/* harmony export */ });
/* harmony import */ var _FieldEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FieldEditor */ "./src/backend/editor/Editor/FieldEditor/FieldEditor.ts");

class DateTimeFieldEditor extends _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor {
    static createData(params) {
        return {
            '@class': 'DateTimeField',
            '@attributes': Object.assign(Object.assign({}, _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false', format: params.format ? params.format : '{DD}.{MM}.{YYYY}', timezone: params.timezone ? params.timezone : 'true', placeholder: params.placeholder ? params.placeholder : '', validateOnChange: params.validateOnChange ? params.validateOnChange : 'true', validateOnBlur: params.validateOnBlur ? params.validateOnBlur : 'false' }),
        };
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/FieldEditor/FieldEditor.ts":
/*!**************************************************************!*\
  !*** ./src/backend/editor/Editor/FieldEditor/FieldEditor.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FieldEditor": () => (/* binding */ FieldEditor)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Editor */ "./src/backend/editor/Editor/Editor.ts");
/* harmony import */ var _backend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../backend */ "./src/backend/index.ts");



class FieldEditor extends _Editor__WEBPACK_IMPORTED_MODULE_1__.Editor {
    static createAttributes(params) {
        if (!params.name)
            throw new Error('no name');
        return {
            name: params.name,
            caption: params.caption !== undefined ? params.caption : params.name,
            column: params.column !== undefined ? params.column : params.name,
            defaultValue: params.defaultValue !== undefined ? params.defaultValue : '',
            value: params.value !== undefined ? params.value : '',
            param: params.param !== undefined ? params.param : 'false',
            visible: params.visible !== undefined ? params.visible : 'true',
            type: params.type !== undefined ? params.type : '',
            width: params.width !== undefined ? params.width : '',
            cssBlock: params.cssBlock !== undefined ? params.cssBlock : '',
            viewClass: params.viewClass !== undefined ? params.viewClass : '',
            ctrlClass: params.ctrlClass !== undefined ? params.ctrlClass : '',
            autoFocus: params.autoFocus !== undefined ? params.autoFocus : 'false',
        };
    }
    changeClass(newClassName) {
        const newData = _backend__WEBPACK_IMPORTED_MODULE_2__[`${newClassName}Editor`].createData(this.attributes());
        this.setData(this.getColName(), newData);
        return newData;
    }
    async createJs(params) {
        const templateFilePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, 'Field.js.ejs');
        const customJsFilePath = await this.getCustomFilePath('js');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            page: this.parent.parent.getName(),
            form: this.parent.getName(),
            field: this.getName(),
            formClass: this.parent.constructor.name.replace('Editor', ''),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return js;
    }
    async createJsx(params) {
        const templateFilePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, 'View.jsx.ejs');
        const customJsxFilePath = await this.getCustomFilePath('jsx');
        const jsx = await this.createFileByParams(customJsxFilePath, templateFilePath, {
            page: this.parent.parent.getName(),
            form: this.parent.getName(),
            field: this.getName(),
            formClass: this.parent.constructor.name.replace('Editor', ''),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return jsx;
    }
    async createLess(params) {
        const templateFilePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, 'View.less.ejs');
        const customLessFilePath = await this.getCustomFilePath('less');
        const less = await this.createFileByParams(customLessFilePath, templateFilePath, {
            page: this.parent.parent.getName(),
            form: this.parent.getName(),
            field: this.getName(),
            formClass: this.parent.constructor.name.replace('Editor', ''),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return less;
    }
    async getCollectionDirPath() {
        const customDirPath = await this.parent.getCustomDirPath();
        const dirPath = path__WEBPACK_IMPORTED_MODULE_0___default().join(customDirPath, 'fields');
        return dirPath;
    }
    getColName() {
        return 'fields';
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/FieldEditor/FileFieldEditor/FileFieldEditor.ts":
/*!**********************************************************************************!*\
  !*** ./src/backend/editor/Editor/FieldEditor/FileFieldEditor/FileFieldEditor.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileFieldEditor": () => (/* binding */ FileFieldEditor)
/* harmony export */ });
/* harmony import */ var _FieldEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FieldEditor */ "./src/backend/editor/Editor/FieldEditor/FieldEditor.ts");

class FileFieldEditor extends _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor {
    static createData(params) {
        return {
            '@class': 'FileField',
            '@attributes': Object.assign(Object.assign({}, _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false' }),
        };
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/FieldEditor/ImageFieldEditor/ImageFieldEditor.ts":
/*!************************************************************************************!*\
  !*** ./src/backend/editor/Editor/FieldEditor/ImageFieldEditor/ImageFieldEditor.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageFieldEditor": () => (/* binding */ ImageFieldEditor)
/* harmony export */ });
/* harmony import */ var _FieldEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FieldEditor */ "./src/backend/editor/Editor/FieldEditor/FieldEditor.ts");

class ImageFieldEditor extends _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor {
    static createData(params) {
        return {
            '@class': 'ImageField',
            '@attributes': Object.assign(Object.assign({}, _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false' }),
        };
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/FieldEditor/LabelFieldEditor/LabelFieldEditor.ts":
/*!************************************************************************************!*\
  !*** ./src/backend/editor/Editor/FieldEditor/LabelFieldEditor/LabelFieldEditor.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LabelFieldEditor": () => (/* binding */ LabelFieldEditor)
/* harmony export */ });
/* harmony import */ var _FieldEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FieldEditor */ "./src/backend/editor/Editor/FieldEditor/FieldEditor.ts");

class LabelFieldEditor extends _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor {
    static createData(params) {
        return {
            '@class': 'LabelField',
            '@attributes': Object.assign({}, _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor.createAttributes(params)),
        };
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/FieldEditor/LinkFieldEditor/LinkFieldEditor.ts":
/*!**********************************************************************************!*\
  !*** ./src/backend/editor/Editor/FieldEditor/LinkFieldEditor/LinkFieldEditor.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LinkFieldEditor": () => (/* binding */ LinkFieldEditor)
/* harmony export */ });
/* harmony import */ var _FieldEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FieldEditor */ "./src/backend/editor/Editor/FieldEditor/FieldEditor.ts");

class LinkFieldEditor extends _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor {
    static createData(params) {
        return {
            '@class': 'LinkField',
            '@attributes': Object.assign(Object.assign({}, _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor.createAttributes(params)), { notNull: params.notNull ? params.notNull : 'false', page: params.page ? params.page : '', displayColumn: params.displayColumn ? params.displayColumn : '' }),
        };
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/FieldEditor/PasswordFieldEditor/PasswordFieldEditor.ts":
/*!******************************************************************************************!*\
  !*** ./src/backend/editor/Editor/FieldEditor/PasswordFieldEditor/PasswordFieldEditor.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PasswordFieldEditor": () => (/* binding */ PasswordFieldEditor)
/* harmony export */ });
/* harmony import */ var _FieldEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FieldEditor */ "./src/backend/editor/Editor/FieldEditor/FieldEditor.ts");

class PasswordFieldEditor extends _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor {
    static createData(params) {
        return {
            '@class': 'PasswordField',
            '@attributes': Object.assign(Object.assign({}, _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false', placeholder: params.placeholder ? params.placeholder : '', validateOnChange: params.validateOnChange ? params.validateOnChange : 'true', validateOnBlur: params.validateOnBlur ? params.validateOnBlur : 'false', autocomplete: params.autocomplete ? params.autocomplete : '' }),
        };
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/FieldEditor/PhoneFieldEditor/PhoneFieldEditor.ts":
/*!************************************************************************************!*\
  !*** ./src/backend/editor/Editor/FieldEditor/PhoneFieldEditor/PhoneFieldEditor.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PhoneFieldEditor": () => (/* binding */ PhoneFieldEditor)
/* harmony export */ });
/* harmony import */ var _FieldEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FieldEditor */ "./src/backend/editor/Editor/FieldEditor/FieldEditor.ts");

class PhoneFieldEditor extends _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor {
    static createData(params) {
        return {
            '@class': 'PhoneField',
            '@attributes': Object.assign(Object.assign({}, _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false', placeholder: params.placeholder ? params.placeholder : '', validateOnChange: params.validateOnChange ? params.validateOnChange : 'true', validateOnBlur: params.validateOnBlur ? params.validateOnBlur : 'false', autocomplete: params.autocomplete ? params.autocomplete : '' }),
        };
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/FieldEditor/RadioFieldEditor/RadioFieldEditor.ts":
/*!************************************************************************************!*\
  !*** ./src/backend/editor/Editor/FieldEditor/RadioFieldEditor/RadioFieldEditor.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RadioFieldEditor": () => (/* binding */ RadioFieldEditor)
/* harmony export */ });
/* harmony import */ var _FieldEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FieldEditor */ "./src/backend/editor/Editor/FieldEditor/FieldEditor.ts");

class RadioFieldEditor extends _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor {
    static createData(params) {
        return {
            '@class': 'RadioField',
            '@attributes': Object.assign(Object.assign({}, _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false', 
                // placeholder   : params.placeholder    ? params.placeholder    :             '',
                dataSourceName: params.dataSourceName ? params.dataSourceName : '', valueColumn: params.valueColumn ? params.valueColumn : '', displayColumn: params.displayColumn ? params.displayColumn : '' }),
        };
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/FieldEditor/TextAreaFieldEditor/TextAreaFieldEditor.ts":
/*!******************************************************************************************!*\
  !*** ./src/backend/editor/Editor/FieldEditor/TextAreaFieldEditor/TextAreaFieldEditor.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextAreaFieldEditor": () => (/* binding */ TextAreaFieldEditor)
/* harmony export */ });
/* harmony import */ var _FieldEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FieldEditor */ "./src/backend/editor/Editor/FieldEditor/FieldEditor.ts");

class TextAreaFieldEditor extends _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor {
    static createData(params) {
        return {
            '@class': 'TextAreaField',
            '@attributes': Object.assign(Object.assign({}, _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false', rows: params.rows ? params.rows : '', cols: params.cols ? params.cols : '', validateOnChange: params.validateOnChange ? params.validateOnChange : 'true', validateOnBlur: params.validateOnBlur ? params.validateOnBlur : 'false' }),
        };
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/FieldEditor/TextBoxFieldEditor/TextBoxFieldEditor.ts":
/*!****************************************************************************************!*\
  !*** ./src/backend/editor/Editor/FieldEditor/TextBoxFieldEditor/TextBoxFieldEditor.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextBoxFieldEditor": () => (/* binding */ TextBoxFieldEditor)
/* harmony export */ });
/* harmony import */ var _FieldEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FieldEditor */ "./src/backend/editor/Editor/FieldEditor/FieldEditor.ts");

class TextBoxFieldEditor extends _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor {
    static createData(params) {
        return {
            '@class': 'TextBoxField',
            '@attributes': Object.assign(Object.assign({}, _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false', placeholder: params.placeholder ? params.placeholder : '', validateOnChange: params.validateOnChange ? params.validateOnChange : 'true', validateOnBlur: params.validateOnBlur ? params.validateOnBlur : 'false', autocomplete: params.autocomplete ? params.autocomplete : '' }),
        };
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/FieldEditor/TimeFieldEditor/TimeFieldEditor.ts":
/*!**********************************************************************************!*\
  !*** ./src/backend/editor/Editor/FieldEditor/TimeFieldEditor/TimeFieldEditor.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimeFieldEditor": () => (/* binding */ TimeFieldEditor)
/* harmony export */ });
/* harmony import */ var _FieldEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FieldEditor */ "./src/backend/editor/Editor/FieldEditor/FieldEditor.ts");

class TimeFieldEditor extends _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor {
    static createData(params) {
        return {
            '@class': 'TimeField',
            '@attributes': Object.assign(Object.assign({}, _FieldEditor__WEBPACK_IMPORTED_MODULE_0__.FieldEditor.createAttributes(params)), { readOnly: params.readOnly ? params.readOnly : 'false', notNull: params.notNull ? params.notNull : 'false', placeholder: params.placeholder ? params.placeholder : '', validateOnChange: params.validateOnChange ? params.validateOnChange : 'true', validateOnBlur: params.validateOnBlur ? params.validateOnBlur : 'false' }),
        };
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/FormEditor/FormEditor.ts":
/*!************************************************************!*\
  !*** ./src/backend/editor/Editor/FormEditor/FormEditor.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormEditor": () => (/* binding */ FormEditor)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Editor */ "./src/backend/editor/Editor/Editor.ts");


class FormEditor extends _Editor__WEBPACK_IMPORTED_MODULE_1__.Editor {
    static createAttributes(params) {
        if (!params.name)
            throw new Error('no name');
        return {
            name: params.name,
            caption: params.caption !== undefined ? params.caption : params.name,
            visible: params.visible !== undefined ? params.visible : 'true',
            cssBlock: params.cssBlock !== undefined ? params.cssBlock : '',
            viewClass: params.viewClass !== undefined ? params.viewClass : '',
            ctrlClass: params.ctrlClass !== undefined ? params.ctrlClass : '',
            modelClass: params.modelClass !== undefined ? params.modelClass : '',
        };
    }
    static createData(params) {
        console.log('FormEditor.createData', params);
        return {
            '@class': 'Form',
            '@attributes': Object.assign({}, FormEditor.createAttributes(params)),
            dataSources: [
                ...(params.dataSources ? params.dataSources.map(_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor.createItemData) : []),
            ],
            actions: [...(params.actions ? params.actions.map(_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor.createItemData) : [])],
            fields: [...(params.fields ? params.fields.map(_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor.createItemData) : [])],
        };
    }
    async createJs(params) {
        const templateFilePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, 'Form.js.ejs');
        const customJsFilePath = await this.getCustomFilePath('js');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            page: this.parent.getName(),
            form: this.getName(),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return js;
    }
    async createJsx(params) {
        const templateFilePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, 'Form.jsx.ejs');
        const customFilePath = await this.getCustomFilePath('jsx');
        const jsx = await this.createFileByParams(customFilePath, templateFilePath, {
            page: this.parent.getName(),
            form: this.getName(),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return jsx;
    }
    async createLess(params) {
        const templateFilePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, 'Form.less.ejs');
        const customFilePath = await this.getCustomFilePath('less');
        const less = await this.createFileByParams(customFilePath, templateFilePath, {
            page: this.parent.getName(),
            form: this.getName(),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return less;
    }
    async createModelBackJs(params) {
        const filePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(await this.getCustomDirPath(), 'Model.back.js');
        const templateFilePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, 'Model.back.js.ejs');
        const js = await this.createFileByParams(filePath, templateFilePath, {
            page: this.parent.getName(),
            form: this.getName(),
            _class: this.getClassName(),
        });
        return js;
    }
    async getCollectionDirPath() {
        const customDirPath = await this.parent.getCustomDirPath();
        return path__WEBPACK_IMPORTED_MODULE_0___default().join(customDirPath, 'forms');
    }
    getColName() {
        return 'forms';
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/FormEditor/RowFormEditor/RowFormEditor.ts":
/*!*****************************************************************************!*\
  !*** ./src/backend/editor/Editor/FormEditor/RowFormEditor/RowFormEditor.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RowFormEditor": () => (/* binding */ RowFormEditor)
/* harmony export */ });
/* harmony import */ var _FormEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FormEditor */ "./src/backend/editor/Editor/FormEditor/FormEditor.ts");
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Editor */ "./src/backend/editor/Editor/Editor.ts");


class RowFormEditor extends _FormEditor__WEBPACK_IMPORTED_MODULE_0__.FormEditor {
    static createData(params) {
        // console.log('RowFormEditor.createData', params);
        return {
            '@class': 'RowForm',
            '@attributes': Object.assign(Object.assign({}, _FormEditor__WEBPACK_IMPORTED_MODULE_0__.FormEditor.createAttributes(params)), { newMode: params.newMode ? params.newMode : '', backOnly: params.backOnly ? params.backOnly : 'false', refreshButton: params.refreshButton || 'true' }),
            dataSources: [
                ...(params.dataSources ? params.dataSources.map(_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor.createItemData) : []),
            ],
            actions: [...(params.actions ? params.actions.map(_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor.createItemData) : [])],
            fields: [...(params.fields ? params.fields.map(_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor.createItemData) : [])],
        };
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/FormEditor/TableFormEditor/TableFormEditor.ts":
/*!*********************************************************************************!*\
  !*** ./src/backend/editor/Editor/FormEditor/TableFormEditor/TableFormEditor.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TableFormEditor": () => (/* binding */ TableFormEditor)
/* harmony export */ });
/* harmony import */ var _FormEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FormEditor */ "./src/backend/editor/Editor/FormEditor/FormEditor.ts");
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Editor */ "./src/backend/editor/Editor/Editor.ts");


class TableFormEditor extends _FormEditor__WEBPACK_IMPORTED_MODULE_0__.FormEditor {
    static createData(params) {
        // console.log('TableFormEditor.createData', params);
        return {
            '@class': 'TableForm',
            '@attributes': Object.assign(Object.assign({}, _FormEditor__WEBPACK_IMPORTED_MODULE_0__.FormEditor.createAttributes(params)), { editMethod: params.editMethod || 'disabled', itemEditPage: params.itemEditPage || '', itemCreatePage: params.itemCreatePage || '', newRowMode: params.newRowMode || 'disabled', deleteRowMode: params.deleteRowMode || 'disabled', refreshButton: params.refreshButton || 'true' }),
            dataSources: [
                ...(params.dataSources ? params.dataSources.map(_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor.createItemData) : []),
            ],
            actions: [...(params.actions ? params.actions.map(_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor.createItemData) : [])],
            fields: [...(params.fields ? params.fields.map(_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor.createItemData) : [])],
        };
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/KeyColumnEditor/KeyColumnEditor.ts":
/*!**********************************************************************!*\
  !*** ./src/backend/editor/Editor/KeyColumnEditor/KeyColumnEditor.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeyColumnEditor": () => (/* binding */ KeyColumnEditor)
/* harmony export */ });
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Editor */ "./src/backend/editor/Editor/Editor.ts");

class KeyColumnEditor extends _Editor__WEBPACK_IMPORTED_MODULE_0__.Editor {
    static createData(params) {
        if (!params.name)
            throw new Error('no name');
        return {
            '@class': 'KeyColumn',
            '@attributes': {
                name: params.name,
            },
        };
    }
    getColName() {
        return 'keyColumns';
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/PageEditor/PageEditor.ts":
/*!************************************************************!*\
  !*** ./src/backend/editor/Editor/PageEditor/PageEditor.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PageEditor": () => (/* binding */ PageEditor)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Editor */ "./src/backend/editor/Editor/Editor.ts");


class PageEditor extends _Editor__WEBPACK_IMPORTED_MODULE_1__.Editor {
    constructor(appEditor, pageFile) {
        super(pageFile.data, appEditor);
        this.appEditor = appEditor;
        this.pageFile = pageFile;
    }
    static createData(params) {
        return {
            '@class': 'Page',
            '@attributes': {
                formatVersion: '0.1',
                name: params.name,
                caption: params.caption !== undefined ? params.caption : params.name,
                cssBlock: params.cssBlock !== undefined ? params.cssBlock : '',
                viewClass: params.viewClass !== undefined ? params.viewClass : '',
                ctrlClass: params.ctrlClass !== undefined ? params.ctrlClass : '',
                modelClass: params.modelClass !== undefined ? params.modelClass : '',
                formInTab: params.formInTab !== undefined ? params.formInTab : 'false',
            },
            dataSources: [
                ...(params.dataSources ? params.dataSources.map(_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor.createItemData) : []),
            ],
            actions: [...(params.actions ? params.actions.map(_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor.createItemData) : [])],
            forms: [...(params.forms ? params.forms.map(_Editor__WEBPACK_IMPORTED_MODULE_1__.Editor.createItemData) : [])],
        };
    }
    setAttr(name, value) {
        console.log('PageEditor.setAttr', name, value);
        if (name === 'name') {
            const pageLinkEditor = this.appEditor.createItemEditor('pageLinks', this.getName());
            pageLinkEditor.setAttr(name, value);
        }
        super.setAttr(name, value);
    }
    async save() {
        await this.pageFile.save();
    }
    async createJs(params) {
        const templateFilePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, 'Page.js.ejs');
        const customJsFilePath = await this.getCustomFilePath('js');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            page: this.getName(),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return js;
    }
    async createJsx(params) {
        const templateFilePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, 'Page.jsx.ejs');
        const customJsxFilePath = await this.getCustomFilePath('jsx');
        const jsx = await this.createFileByParams(customJsxFilePath, templateFilePath, {
            page: this.getName(),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return jsx;
    }
    async createLess(params) {
        const templateFilePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, 'Page.less.ejs');
        const customLessFilePath = await this.getCustomFilePath('less');
        const less = await this.createFileByParams(customLessFilePath, templateFilePath, {
            page: this.getName(),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return less;
    }
    async createModelBackJs(params) {
        const filePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(await this.getCustomDirPath(), 'Model.back.js');
        const templateFilePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, 'Model.back.js.ejs');
        const js = await this.createFileByParams(filePath, templateFilePath, {
            name: this.getName(),
        });
        return js;
    }
    async getCustomDirPath() {
        console.log('PageEditor.getCustomDirPath');
        const customDirPath = await this.parent.getCustomDirPath();
        return path__WEBPACK_IMPORTED_MODULE_0___default().join(customDirPath, 'pages', this.getName());
    }
    reformat() {
        this.data = this.pageFile.data = PageEditor.createData(Object.assign(Object.assign({}, this.attributes()), { dataSources: this.data.dataSources, actions: this.data.actions, forms: this.data.forms }));
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/PageLinkEditor/PageLinkEditor.ts":
/*!********************************************************************!*\
  !*** ./src/backend/editor/Editor/PageLinkEditor/PageLinkEditor.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PageLinkEditor": () => (/* binding */ PageLinkEditor)
/* harmony export */ });
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Editor */ "./src/backend/editor/Editor/Editor.ts");

class PageLinkEditor extends _Editor__WEBPACK_IMPORTED_MODULE_0__.Editor {
    static createData(params) {
        return {
            '@class': 'PageLink',
            '@attributes': {
                name: params.name,
                fileName: params.fileName || `pages/${params.name}/${params.name}.json`,
                menu: params.menu || (params.startup === 'true' ? 'Menu' : ''),
                startup: params.startup || 'false',
            },
        };
    }
    getColName() {
        return 'pageLinks';
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/ParamEditor/ParamEditor.ts":
/*!**************************************************************!*\
  !*** ./src/backend/editor/Editor/ParamEditor/ParamEditor.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParamEditor": () => (/* binding */ ParamEditor)
/* harmony export */ });
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Editor */ "./src/backend/editor/Editor/Editor.ts");

class ParamEditor extends _Editor__WEBPACK_IMPORTED_MODULE_0__.Editor {
    static createData(params) {
        if (!params.name)
            throw new Error('no name');
        return {
            '@class': 'Param',
            '@attributes': {
                name: params.name,
                value: params.value || '',
            },
        };
    }
    getColName() {
        return 'params';
    }
}


/***/ }),

/***/ "./src/backend/editor/Editor/TableEditor/TableEditor.ts":
/*!**************************************************************!*\
  !*** ./src/backend/editor/Editor/TableEditor/TableEditor.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TableEditor": () => (/* binding */ TableEditor)
/* harmony export */ });
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Editor */ "./src/backend/editor/Editor/Editor.ts");

class TableEditor extends _Editor__WEBPACK_IMPORTED_MODULE_0__.Editor {
    static createData(params) {
        // console.log('TableEditor.createData', params);
        return {
            '@class': 'Table',
            '@attributes': {
                name: params.name,
            },
            columns: [...(params.columns ? params.columns.map(_Editor__WEBPACK_IMPORTED_MODULE_0__.Editor.createItemData) : [])],
        };
    }
    getColName() {
        return 'tables';
    }
}


/***/ }),

/***/ "./src/backend/editor/EditorController/ActionEditorController/ActionEditorController.ts":
/*!**********************************************************************************************!*\
  !*** ./src/backend/editor/EditorController/ActionEditorController/ActionEditorController.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ActionEditorController": () => (/* binding */ ActionEditorController)
/* harmony export */ });
/* harmony import */ var _EditorController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EditorController */ "./src/backend/editor/EditorController/EditorController.ts");

class ActionEditorController extends _EditorController__WEBPACK_IMPORTED_MODULE_0__.EditorController {
    async _new(params) {
        console.log('ActionEditorController._new');
        const appEditor = this.createApplicationEditor();
        let data;
        if (params.pageFileName) {
            const pageEditor = await appEditor.createPageEditor(params.pageFileName);
            if (params.form) {
                const formEditor = pageEditor.createItemEditor('forms', params.form);
                data = await formEditor.newItemData('Action', 'actions', params);
            }
            else {
                data = await pageEditor.newItemData('Action', 'actions', params);
            }
            await pageEditor.save();
        }
        else {
            data = await appEditor.newItemData('Action', 'actions', params);
            await appEditor.save();
        }
        return data;
    }
    async save(params) {
        const appEditor = this.createApplicationEditor();
        if (params.pageFileName) {
            const pageEditor = await appEditor.createPageEditor(params.pageFileName);
            if (params.form) {
                const formEditor = pageEditor.createItemEditor('forms', params.form);
                const actionEditor = formEditor.createItemEditor('actions', params.action);
                actionEditor.setAttr(params.attr, params.value);
            }
            else {
                const actionEditor = pageEditor.createItemEditor('actions', params.action);
                actionEditor.setAttr(params.attr, params.value);
            }
            await pageEditor.save();
        }
        else {
            const actionEditor = appEditor.createItemEditor('actions', params.action);
            actionEditor.setAttr(params.attr, params.value);
            await appEditor.save();
        }
        return null;
    }
    async delete(params) {
        const appEditor = this.createApplicationEditor();
        let data;
        if (params.pageFileName) {
            const pageEditor = await appEditor.createPageEditor(params.pageFileName);
            if (params.form) {
                const formEditor = pageEditor.createItemEditor('forms', params.form);
                data = formEditor.removeColData('actions', params.action);
            }
            else {
                data = pageEditor.removeColData('actions', params.action);
            }
            await pageEditor.save();
        }
        else {
            data = appEditor.removeColData('actions', params.action);
            await appEditor.save();
        }
        return data;
    }
    async moveUp(params) {
        const appEditor = this.createApplicationEditor();
        if (params.pageFileName) {
            const pageEditor = await appEditor.createPageEditor(params.pageFileName);
            if (params.form) {
                const formEditor = pageEditor.createItemEditor('forms', params.form);
                formEditor.moveItemUp('actions', params.action);
                await pageEditor.save();
            }
            else {
                pageEditor.moveItemUp('actions', params.action);
                await pageEditor.save();
            }
        }
        else {
            appEditor.moveItemUp('actions', params.action);
            await appEditor.save();
        }
        return null;
    }
    async moveDown(params) {
        const appEditor = this.createApplicationEditor();
        if (params.pageFileName) {
            const pageEditor = await appEditor.createPageEditor(params.pageFileName);
            if (params.form) {
                const formEditor = pageEditor.createItemEditor('forms', params.form);
                formEditor.moveItemDown('actions', params.action);
                await pageEditor.save();
            }
            else {
                pageEditor.moveItemDown('actions', params.action);
                await pageEditor.save();
            }
        }
        else {
            appEditor.moveItemDown('actions', params.action);
            await appEditor.save();
        }
        return null;
    }
}


/***/ }),

/***/ "./src/backend/editor/EditorController/ApplicationEditorController/ApplicationEditorController.ts":
/*!********************************************************************************************************!*\
  !*** ./src/backend/editor/EditorController/ApplicationEditorController/ApplicationEditorController.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApplicationEditorController": () => (/* binding */ ApplicationEditorController)
/* harmony export */ });
/* harmony import */ var _VisualEditorController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VisualEditorController */ "./src/backend/editor/EditorController/VisualEditorController.ts");

class ApplicationEditorController extends _VisualEditorController__WEBPACK_IMPORTED_MODULE_0__.VisualEditorController {
    /*constructor(...args) {
        super(...args);
    }*/
    async save(params) {
        const appEditor = this.createApplicationEditor();
        appEditor.setAttr(params.attr, params.value);
        await appEditor.save();
        return null;
    }
    async getView(params) {
        const result = await super.getView(params);
        if (params.view === 'VisualView.html') {
            const appEditor = this.createApplicationEditor();
            // @ts-ignore
            result.data.js = await appEditor.getCustomFile('js');
        }
        return result;
    }
    async createController(params) {
        const appEditor = this.createApplicationEditor();
        const js = await appEditor.createJs(params);
        return { js };
    }
    async createModelBackJs(params) {
        const appEditor = this.createApplicationEditor();
        const js = await appEditor.createModelBackJs(params);
        return { js };
    }
    async saveController(params) {
        const appEditor = this.createApplicationEditor();
        await appEditor.saveCustomFile('js', params.text);
        return { js: params.text };
    }
}


/***/ }),

/***/ "./src/backend/editor/EditorController/ColumnEditorController/ColumnEditorController.ts":
/*!**********************************************************************************************!*\
  !*** ./src/backend/editor/EditorController/ColumnEditorController/ColumnEditorController.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColumnEditorController": () => (/* binding */ ColumnEditorController)
/* harmony export */ });
/* harmony import */ var _EditorController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EditorController */ "./src/backend/editor/EditorController/EditorController.ts");

class ColumnEditorController extends _EditorController__WEBPACK_IMPORTED_MODULE_0__.EditorController {
    /*constructor(...args) {
        console.log('ColumnEditorController.constructor');
        super(...args);
    }*/
    async save(params) {
        console.log('ColumnEditorController.save');
        const appEditor = this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const tableEditor = databaseEditor.createItemEditor('tables', params.table);
        const columnEditor = tableEditor.createItemEditor('columns', params.column);
        columnEditor.setAttr(params.attr, params.value);
        await appEditor.save();
        return 'ok';
    }
    async _new(params) {
        console.log('ColumnEditorController._new');
        const appEditor = this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const tableEditor = databaseEditor.createItemEditor('tables', params.table);
        const columnData = tableEditor.newItemData('Column', 'columns', params);
        await appEditor.save();
        return columnData;
    }
    async delete(params) {
        console.log('ColumnEditorController.delete');
        const appEditor = this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const tableEditor = databaseEditor.createItemEditor('tables', params.table);
        const data = tableEditor.removeColData('columns', params.column);
        await appEditor.save();
        return data;
    }
}


/***/ }),

/***/ "./src/backend/editor/EditorController/DataSourceEditorController/DataSourceEditorController.ts":
/*!******************************************************************************************************!*\
  !*** ./src/backend/editor/EditorController/DataSourceEditorController/DataSourceEditorController.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataSourceEditorController": () => (/* binding */ DataSourceEditorController)
/* harmony export */ });
/* harmony import */ var _EditorController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EditorController */ "./src/backend/editor/EditorController/EditorController.ts");

class DataSourceEditorController extends _EditorController__WEBPACK_IMPORTED_MODULE_0__.EditorController {
    /*constructor(...args) {
        super(...args);
    }*/
    async createDataSourceEditor(params) {
        let editor = this.createApplicationEditor();
        if (params.pageFileName) {
            editor = await editor.createPageEditor(params.pageFileName);
            if (params.form) {
                editor = editor.createItemEditor('forms', params.form);
            }
        }
        return editor.createItemEditor('dataSources', params.dataSource);
    }
    async _new(params) {
        const appEditor = this.createApplicationEditor();
        let data;
        if (params.page) {
            const pageEditor = await appEditor.createPageEditor(params.page);
            if (params.form) {
                const formEditor = pageEditor.createItemEditor('forms', params.form);
                data = formEditor.newItemData(params.class, 'dataSources', params);
            }
            else {
                data = pageEditor.newItemData(params.class, 'dataSources', params);
            }
            await pageEditor.save();
        }
        else {
            data = appEditor.newItemData(params.class, 'dataSources', params);
            await appEditor.save();
        }
        return data;
    }
    async delete(params) {
        const appEditor = this.createApplicationEditor();
        let data;
        if (params.page) {
            const pageEditor = await appEditor.createPageEditor(params.page);
            if (params.form) {
                const formEditor = pageEditor.createItemEditor('forms', params.form);
                data = formEditor.removeColData('dataSources', params.dataSource);
            }
            else {
                data = pageEditor.removeColData('dataSources', params.dataSource);
            }
            await pageEditor.save();
        }
        else {
            data = appEditor.removeColData('dataSources', params.dataSource);
            await appEditor.save();
        }
        return data;
    }
    async moveUp(params) {
        const appEditor = this.createApplicationEditor();
        if (params.page) {
            const pageEditor = await appEditor.createPageEditor(params.page);
            if (params.form) {
                // form data source
                const formEditor = pageEditor.createItemEditor('forms', params.form);
                formEditor.moveItemUp('dataSources', params.dataSource);
                await pageEditor.save();
                return null;
            }
            else {
                // page data source
                pageEditor.moveItemUp('dataSources', params.dataSource);
                await pageEditor.save();
                return null;
            }
        }
        else {
            // app data source
            appEditor.moveItemUp('dataSources', params.dataSource);
            await appEditor.save();
            return null;
        }
    }
    async moveDown(params) {
        const appEditor = this.createApplicationEditor();
        if (params.page) {
            const pageEditor = await appEditor.createPageEditor(params.page);
            if (params.form) {
                // form data source
                const formEditor = pageEditor.createItemEditor('forms', params.form);
                formEditor.moveItemDown('dataSources', params.dataSource);
                await pageEditor.save();
                return null;
            }
            else {
                // page data source
                pageEditor.moveItemDown('dataSources', params.dataSource);
                await pageEditor.save();
                return null;
            }
        }
        else {
            // app data source
            appEditor.moveItemDown('dataSources', params.dataSource);
            await appEditor.save();
            return null;
        }
    }
    async save(params) {
        console.log('DataSourceEditorController.save');
        const dataSourceEditor = await this.createDataSourceEditor(params);
        dataSourceEditor.setAttr(params.attr, params.value);
        await dataSourceEditor.save();
        return null;
    }
    async createModelBackJs(params) {
        const dataSourceEditor = await this.createDataSourceEditor(params);
        const js = await dataSourceEditor.createModelBackJs(params);
        return { js };
    }
    async getView(params) {
        const result = await super.getView(params);
        switch (params.view) {
            /*case 'QueryView.ejs':
                const dataSourceEditor = await this.createDataSourceEditor(params);
                const backendJs = await dataSourceEditor.getCustomFile('back.js');
                result.data.backendJs = backendJs;
                return result;*/
            default:
                return result;
        }
    }
}


/***/ }),

/***/ "./src/backend/editor/EditorController/DatabaseEditorController/DatabaseEditorController.ts":
/*!**************************************************************************************************!*\
  !*** ./src/backend/editor/EditorController/DatabaseEditorController/DatabaseEditorController.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DatabaseEditorController": () => (/* binding */ DatabaseEditorController)
/* harmony export */ });
/* harmony import */ var _EditorController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EditorController */ "./src/backend/editor/EditorController/EditorController.ts");

class DatabaseEditorController extends _EditorController__WEBPACK_IMPORTED_MODULE_0__.EditorController {
    constructor() {
        super(...arguments);
        this.application = null;
    }
    /*constructor(...args) {
        super(...args);
        this.application = null;
    }*/
    async init(context) {
        await super.init(context);
        this.application = await this.hostApp.createApplication(context);
    }
    async _new(params) {
        const appEditor = this.createApplicationEditor();
        const data = appEditor.newItemData(params.class, 'databases', params);
        /*
        if (params.params) {
            const databaseEditor = appEditor.createItemEditor('databases', params.name);
            for (const name in params.params) {
                const param = params.params[name];
                databaseEditor.newItemData('Param', 'params', param);
            }
        }*/
        await appEditor.save();
        return data;
    }
    async save(params) {
        console.log('DatabaseEditorController.save');
        const appEditor = this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        databaseEditor.setAttr(params.attr, params.value);
        await appEditor.save();
        return 'ok';
    }
    async delete(params) {
        const appEditor = this.createApplicationEditor();
        const data = appEditor.removeColData('databases', params.database);
        await appEditor.save();
        return data;
    }
    async getView(params) {
        const result = await super.getView(params);
        if (params.view === 'DatabaseView/DatabaseView.html') {
            // database
            const database = this.application.getDatabase(params.database);
            // tables
            // @ts-ignore
            result.data.tables = await database.getTableList();
        }
        return result;
    }
    async getTableInfo(params) {
        const database = this.application.getDatabase(params.database);
        const tableInfo = await database.getTableInfo(params.table);
        return { tableInfo };
    }
    async moveUp(params) {
        const appEditor = this.createApplicationEditor();
        appEditor.moveItemUp('databases', params.database);
        await appEditor.save();
        return 'ok';
    }
    async moveDown(params) {
        const appEditor = this.createApplicationEditor();
        appEditor.moveItemDown('databases', params.database);
        await appEditor.save();
        return 'ok';
    }
}


/***/ }),

/***/ "./src/backend/editor/EditorController/EditorController.ts":
/*!*****************************************************************!*\
  !*** ./src/backend/editor/EditorController/EditorController.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditorController": () => (/* binding */ EditorController)
/* harmony export */ });
/* harmony import */ var _Editor_ApplicationEditor_ApplicationEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Editor/ApplicationEditor/ApplicationEditor */ "./src/backend/editor/Editor/ApplicationEditor/ApplicationEditor.ts");

class EditorController {
    constructor(appInfo, hostApp) {
        if (!hostApp)
            throw new Error(`no hostApp for ${this.constructor.name}`);
        this.appInfo = appInfo;
        this.hostApp = hostApp;
    }
    async init(context) { }
    async getView(params) {
        console.log('EditorController.getView');
        return {
            data: {},
        };
    }
    createApplicationEditor() {
        console.log('EditorController.createApplicationEditor');
        return new _Editor_ApplicationEditor_ApplicationEditor__WEBPACK_IMPORTED_MODULE_0__.ApplicationEditor(this.appInfo.appFile);
    }
}


/***/ }),

/***/ "./src/backend/editor/EditorController/FieldEditorController/FieldEditorController.ts":
/*!********************************************************************************************!*\
  !*** ./src/backend/editor/EditorController/FieldEditorController/FieldEditorController.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FieldEditorController": () => (/* binding */ FieldEditorController)
/* harmony export */ });
/* harmony import */ var _VisualEditorController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VisualEditorController */ "./src/backend/editor/EditorController/VisualEditorController.ts");

class FieldEditorController extends _VisualEditorController__WEBPACK_IMPORTED_MODULE_0__.VisualEditorController {
    /*constructor(...args) {
        super(...args);
    }*/
    async _new(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        const data = formEditor.newItemData(params.class, 'fields', params);
        await pageEditor.save();
        return data;
    }
    async save(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        const fieldEditor = formEditor.createItemEditor('fields', params.field);
        fieldEditor.setAttr(params.attr, params.value);
        await pageEditor.save();
        return null;
    }
    async delete(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        const data = formEditor.removeColData('fields', params.field);
        await pageEditor.save();
        return data;
    }
    async changeClass(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        const fieldEditor = formEditor.createItemEditor('fields', params.field);
        const newData = fieldEditor.changeClass(params.class);
        await pageEditor.save();
        return newData;
    }
    async getView(params) {
        const result = await super.getView(params);
        if (params.view === 'VisualView.html') {
            const appEditor = this.createApplicationEditor();
            const pageEditor = await appEditor.getPage(params.page);
            const formEditor = pageEditor.createItemEditor('forms', params.form);
            const fieldEditor = formEditor.createItemEditor('fields', params.field);
            // @ts-ignore
            result.data.js = await fieldEditor.getCustomFile('js');
            // @ts-ignore
            result.data.jsx = await fieldEditor.getCustomFile('jsx');
            // @ts-ignore
            result.data.less = await fieldEditor.getCustomFile('less');
            return result;
        }
        return result;
    }
    async createController(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        const fieldEditor = formEditor.createItemEditor('fields', params.field);
        const js = await fieldEditor.createJs(params);
        return { js };
    }
    async createView(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        const fieldEditor = formEditor.createItemEditor('fields', params.field);
        const jsx = await fieldEditor.createJsx(params);
        return { jsx };
    }
    async createStyle(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        const fieldEditor = formEditor.createItemEditor('fields', params.field);
        const less = await fieldEditor.createLess(params);
        return { less };
    }
    async saveController(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        const fieldEditor = formEditor.createItemEditor('fields', params.field);
        await fieldEditor.saveCustomFile('js', params.text);
        return { js: params.text };
    }
    async moveUp(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        formEditor.moveItemUp('fields', params.field);
        await pageEditor.save();
        return 'ok';
    }
    async moveDown(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        formEditor.moveItemDown('fields', params.field);
        await pageEditor.save();
        return 'ok';
    }
}


/***/ }),

/***/ "./src/backend/editor/EditorController/FormEditorController/FormEditorController.ts":
/*!******************************************************************************************!*\
  !*** ./src/backend/editor/EditorController/FormEditorController/FormEditorController.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormEditorController": () => (/* binding */ FormEditorController)
/* harmony export */ });
/* harmony import */ var _VisualEditorController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VisualEditorController */ "./src/backend/editor/EditorController/VisualEditorController.ts");

class FormEditorController extends _VisualEditorController__WEBPACK_IMPORTED_MODULE_0__.VisualEditorController {
    /*constructor(...args) {
        super(...args);
    }*/
    async _new(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params['pageFileName']);
        const data = await pageEditor.newItemData(params.class, 'forms', params);
        await pageEditor.save();
        return data;
    }
    async save(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params['pageFileName']);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        formEditor.setAttr(params['attr'], params['value']);
        await pageEditor.save();
        return null;
    }
    async delete(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const data = pageEditor.removeColData('forms', params.form);
        await pageEditor.save();
        return data;
    }
    async moveUp(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        pageEditor.moveItemUp('forms', params.form);
        await pageEditor.save();
        return 'ok';
    }
    async moveDown(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        pageEditor.moveItemDown('forms', params.form);
        await pageEditor.save();
        return 'ok';
    }
    async getView(params) {
        console.log('FormEditorController.getView');
        const result = await super.getView(params);
        switch (params.view) {
            case 'VisualView.html':
                const appEditor = this.createApplicationEditor();
                const pageEditor = await appEditor.getPage(params.page);
                const formEditor = pageEditor.createItemEditor('forms', params.form);
                // @ts-ignore
                result.data.js = await formEditor.getCustomFile('js');
                // @ts-ignore
                result.data.jsx = await formEditor.getCustomFile('jsx');
                // @ts-ignore
                result.data.less = await formEditor.getCustomFile('less');
                return result;
            default:
                return result;
        }
    }
    async createController(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        const js = await formEditor.createJs(params);
        return { js };
    }
    async createView(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        const jsx = await formEditor.createJsx(params);
        return { jsx };
    }
    async createStyle(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        const less = await formEditor.createLess(params);
        return { less };
    }
    async saveController(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        await formEditor.saveCustomFile('js', params.text);
        return { js: params.text };
    }
    async createModelBackJs(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        const js = await formEditor.createModelBackJs(params);
        return { js };
    }
}


/***/ }),

/***/ "./src/backend/editor/EditorController/KeyColumnEditorController/KeyColumnEditorController.ts":
/*!****************************************************************************************************!*\
  !*** ./src/backend/editor/EditorController/KeyColumnEditorController/KeyColumnEditorController.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeyColumnEditorController": () => (/* binding */ KeyColumnEditorController)
/* harmony export */ });
/* harmony import */ var _EditorController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EditorController */ "./src/backend/editor/EditorController/EditorController.ts");

class KeyColumnEditorController extends _EditorController__WEBPACK_IMPORTED_MODULE_0__.EditorController {
    /*constructor(...args) {
        super(...args);
    }*/
    async _new(params) {
        const appEditor = this.createApplicationEditor();
        if (params.page) {
            const pageEditor = await appEditor.createPageEditor(params.page);
            if (params.form) {
                const formEditor = pageEditor.createItemEditor('forms', params.form);
                const dataSourceEditor = formEditor.createItemEditor('dataSources', params.dataSource);
                const data = dataSourceEditor.newItemData('KeyColumn', 'keyColumns', params);
                await pageEditor.save();
                return data;
            }
            else {
                const dataSourceEditor = pageEditor.createItemEditor('dataSources', params.dataSource);
                const data = dataSourceEditor.newItemData('KeyColumn', 'keyColumns', params);
                await pageEditor.save();
                return data;
            }
        }
        else {
            const dataSourceEditor = appEditor.createItemEditor('dataSources', params.dataSource);
            const data = dataSourceEditor.newItemData('KeyColumn', 'keyColumns', params);
            await appEditor.save();
            return data;
        }
    }
    async save(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.pageFileName);
        const formEditor = pageEditor.createItemEditor('forms', params.form);
        const dataSourceEditor = formEditor.createItemEditor('dataSources', params.dataSource);
        const keyColumnEditor = dataSourceEditor.createItemEditor('keyColumns', params.keyColumn);
        keyColumnEditor.setAttr(params.attr, params.value);
        await pageEditor.save();
        return null;
    }
    async delete(params) {
        const appEditor = this.createApplicationEditor();
        let dataSourceEditor;
        let pageEditor;
        if (params.page) {
            pageEditor = await appEditor.createPageEditor(params.page);
            if (params.form) {
                const formEditor = pageEditor.createItemEditor('forms', params.form);
                dataSourceEditor = formEditor.createItemEditor('dataSources', params.dataSource);
            }
            else {
                dataSourceEditor = pageEditor.createItemEditor('dataSources', params.dataSource);
            }
        }
        else {
            dataSourceEditor = appEditor.createItemEditor('dataSources', params.dataSource);
        }
        const data = dataSourceEditor.removeColData('keyColumns', params.keyColumn);
        if (pageEditor) {
            await pageEditor.save();
        }
        else {
            await appEditor.save();
        }
        return data;
    }
}


/***/ }),

/***/ "./src/backend/editor/EditorController/PageEditorController/PageEditorController.ts":
/*!******************************************************************************************!*\
  !*** ./src/backend/editor/EditorController/PageEditorController/PageEditorController.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PageEditorController": () => (/* binding */ PageEditorController)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VisualEditorController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VisualEditorController */ "./src/backend/editor/EditorController/VisualEditorController.ts");
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Helper */ "./src/backend/Helper.ts");



class PageEditorController extends _VisualEditorController__WEBPACK_IMPORTED_MODULE_1__.VisualEditorController {
    /*constructor(...args) {
        super(...args);
    }*/
    async get(params) {
        const pageFilePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(this.appInfo.dirPath, params.fileName);
        const content = await _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.readTextFile(pageFilePath);
        return JSON.parse(content);
    }
    async save(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.createPageEditor(params.fileName);
        pageEditor.setAttr(params.attr, params.value);
        await pageEditor.save();
        return null;
    }
    async _new(params) {
        const appEditor = this.createApplicationEditor();
        const data = await appEditor.newPageAndPageLinkData(params);
        await appEditor.save();
        return data;
    }
    async delete(params) {
        const appEditor = this.createApplicationEditor();
        await appEditor.removePageFile(params.page);
        const data = appEditor.removeColData('pageLinks', params.page);
        await appEditor.save();
        return data;
    }
    async getView(params) {
        const result = await super.getView(params);
        switch (params.view) {
            case 'VisualView.html':
                const appEditor = this.createApplicationEditor();
                const pageEditor = await appEditor.getPage(params.page);
                // @ts-ignore
                result.data.js = await pageEditor.getCustomFile('js');
                // @ts-ignore
                result.data.jsx = await pageEditor.getCustomFile('jsx');
                // @ts-ignore
                result.data.less = await pageEditor.getCustomFile('less');
                return result;
            default:
                return result;
        }
    }
    async createController(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const js = await pageEditor.createJs(params);
        return { js };
    }
    async createView(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const jsx = await pageEditor.createJsx(params);
        return { jsx };
    }
    async createStyle(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const less = await pageEditor.createLess(params);
        return { less };
    }
    async saveController(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        await pageEditor.saveCustomFile('js', params.text);
        return { js: params.text };
    }
    async createModelBackJs(params) {
        const appEditor = this.createApplicationEditor();
        const pageEditor = await appEditor.getPage(params.page);
        const js = await pageEditor.createModelBackJs(params);
        return { js };
    }
}


/***/ }),

/***/ "./src/backend/editor/EditorController/PageLinkEditorController/PageLinkEditorController.ts":
/*!**************************************************************************************************!*\
  !*** ./src/backend/editor/EditorController/PageLinkEditorController/PageLinkEditorController.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PageLinkEditorController": () => (/* binding */ PageLinkEditorController)
/* harmony export */ });
/* harmony import */ var _EditorController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EditorController */ "./src/backend/editor/EditorController/EditorController.ts");

class PageLinkEditorController extends _EditorController__WEBPACK_IMPORTED_MODULE_0__.EditorController {
    async save(params) {
        const appEditor = this.createApplicationEditor();
        //const pageLinkEditor = appEditor.createPageLinkEditor(params.pageLink);
        const pageLinkEditor = appEditor.createItemEditor('pageLinks', params.pageLink);
        pageLinkEditor.setAttr(params.attr, params.value);
        await appEditor.save();
        return null;
    }
    async moveUp(params) {
        const appEditor = this.createApplicationEditor();
        appEditor.moveItemUp('pageLinks', params.page);
        await appEditor.save();
        return 'ok';
    }
    async moveDown(params) {
        const appEditor = this.createApplicationEditor();
        appEditor.moveItemDown('pageLinks', params.page);
        await appEditor.save();
        return 'ok';
    }
}


/***/ }),

/***/ "./src/backend/editor/EditorController/ParamEditorController/ParamEditorController.ts":
/*!********************************************************************************************!*\
  !*** ./src/backend/editor/EditorController/ParamEditorController/ParamEditorController.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParamEditorController": () => (/* binding */ ParamEditorController)
/* harmony export */ });
/* harmony import */ var _EditorController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EditorController */ "./src/backend/editor/EditorController/EditorController.ts");

class ParamEditorController extends _EditorController__WEBPACK_IMPORTED_MODULE_0__.EditorController {
    /*constructor(...args) {
        console.log('ParamEditorController.constructor');
        super(...args);
    }*/
    async _new(params) {
        console.log('ParamEditorController._new');
        const appEditor = this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const data = databaseEditor.newItemData('Param', 'params', params);
        await appEditor.save();
        return data;
    }
    async save(params) {
        console.log('ParamEditorController.save');
        const appEditor = this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const paramEditor = databaseEditor.createItemEditor('params', params.param);
        paramEditor.setAttr(params.attr, params.value);
        await appEditor.save();
        return null;
    }
    async delete(params) {
        console.log('ParamEditorController.delete');
        const appEditor = this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const data = databaseEditor.removeColData('params', params.param);
        await appEditor.save();
        return data;
    }
}


/***/ }),

/***/ "./src/backend/editor/EditorController/TableEditorController/TableEditorController.ts":
/*!********************************************************************************************!*\
  !*** ./src/backend/editor/EditorController/TableEditorController/TableEditorController.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TableEditorController": () => (/* binding */ TableEditorController)
/* harmony export */ });
/* harmony import */ var _EditorController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EditorController */ "./src/backend/editor/EditorController/EditorController.ts");

class TableEditorController extends _EditorController__WEBPACK_IMPORTED_MODULE_0__.EditorController {
    /*constructor(...args) {
        super(...args);
    }*/
    async _new(params) {
        console.log('TableEditorController._new');
        const appEditor = this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        // const data = databaseEditor.newTableData(params);
        const data = databaseEditor.newItemData('Table', 'tables', params);
        await appEditor.save();
        return data;
    }
    async delete(params) {
        console.log('TableEditorController.delete');
        const appEditor = this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const data = databaseEditor.removeColData('tables', params.table);
        await appEditor.save();
        return data;
    }
    async moveUp(params) {
        const appEditor = this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        databaseEditor.moveItemUp('tables', params.table);
        await appEditor.save();
        return 'ok';
    }
    async moveDown(params) {
        const appEditor = this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        databaseEditor.moveItemDown('tables', params.table);
        await appEditor.save();
        return 'ok';
    }
    async save(params) {
        console.log('TableEditorController.save');
        const appEditor = this.createApplicationEditor();
        const databaseEditor = appEditor.createItemEditor('databases', params.database);
        const tableEditor = databaseEditor.createItemEditor('tables', params.table);
        tableEditor.setAttr(params.attr, params.value);
        await appEditor.save();
        return null;
    }
}


/***/ }),

/***/ "./src/backend/editor/EditorController/VisualEditorController.ts":
/*!***********************************************************************!*\
  !*** ./src/backend/editor/EditorController/VisualEditorController.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VisualEditorController": () => (/* binding */ VisualEditorController)
/* harmony export */ });
/* harmony import */ var _EditorController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditorController */ "./src/backend/editor/EditorController/EditorController.ts");

class VisualEditorController extends _EditorController__WEBPACK_IMPORTED_MODULE_0__.EditorController {
}


/***/ }),

/***/ "./src/backend/editor/EditorModule.tsx":
/*!*********************************************!*\
  !*** ./src/backend/editor/EditorModule.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditorModule": () => (/* binding */ EditorModule)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Helper */ "./src/backend/Helper.ts");
/* harmony import */ var _viewer_BkModel_BkApplication_BkApplication__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../viewer/BkModel/BkApplication/BkApplication */ "./src/backend/viewer/BkModel/BkApplication/BkApplication.ts");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Links__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Links */ "./src/backend/Links.tsx");
/* harmony import */ var _Scripts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Scripts */ "./src/backend/Scripts.tsx");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../index */ "./src/backend/index.ts");








const pkg = __webpack_require__(/*! ../../../package.json */ "./package.json");
const EDITOR_CONTROLLERS = [
    'Application',
    'Database',
    'Param',
    'Table',
    'Column',
    'DataSource',
    'KeyColumn',
    'Page',
    'PageLink',
    'Form',
    'Field',
    'Action',
];
const EDITOR_ACTIONS = [
    'save',
    '_new',
    'delete',
    'getView',
    'saveView',
    'saveController',
    'createView',
    'createStyle',
    'createController',
    'get',
    'getTableInfo',
    'changeClass',
    'moveUp',
    'moveDown',
    'createModelBackJs',
];
class EditorModule {
    constructor(hostApp) {
        this.hostApp = hostApp;
    }
    async init() {
        this.css = (await _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.getFilePaths(path__WEBPACK_IMPORTED_MODULE_1___default().join(this.hostApp.getFrontendDirPath(), 'editor/public'), 'css')).map((path) => `/editor/public/${path}`);
        this.js = (await _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.getFilePaths(path__WEBPACK_IMPORTED_MODULE_1___default().join(this.hostApp.getFrontendDirPath(), 'editor/public'), 'js')).map((path) => `/editor/public/${path}`);
        // console.log('editor.css:', this.css);
        // console.log('editor.js:' , this.js);
    }
    getLinks() {
        return [
            '/lib/codemirror-4.8/lib/codemirror.css',
            '/lib/codemirror-4.8/theme/cobalt.css',
            ...this.css,
        ];
    }
    getScripts() {
        return [
            '/lib/codemirror-4.8/lib/codemirror.js',
            '/lib/codemirror-4.8/mode/javascript/javascript.js',
            ...this.js,
        ];
    }
    async handleEditorGet(req, res, context) {
        console.log('EditorModule.handleEditorGet');
        const appInfo = await _viewer_BkModel_BkApplication_BkApplication__WEBPACK_IMPORTED_MODULE_3__.BkApplication.loadAppInfo(this.hostApp.getAppFilePath(context), null);
        // data
        const data = {
            app: appInfo.appFile.data,
            nodeEnv: this.hostApp.getNodeEnv(),
            logErrorUrl: '/error',
        };
        const links = react_dom_server__WEBPACK_IMPORTED_MODULE_4___default().renderToStaticMarkup((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Links__WEBPACK_IMPORTED_MODULE_5__.Links, { links: this.getLinks() }));
        const scripts = react_dom_server__WEBPACK_IMPORTED_MODULE_4___default().renderToStaticMarkup((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Scripts__WEBPACK_IMPORTED_MODULE_6__.Scripts, { scripts: this.getScripts() }));
        const html = this.render(pkg.version, Object.assign(Object.assign({}, data), { runAppLink: `/viewer/${context.getAppDirName()}/${context.getAppFileName()}/${context.getEnv()}/${context.getDomain()}/?debug=1` }), `/viewer/${context.getAppDirName()}/${context.getAppFileName()}/${context.getEnv()}/${context.getDomain()}/?debug=1`, context.getAppDirName(), context.getAppFileName(), context.getEnv(), links, scripts);
        res.end(html);
    }
    render(version, data, runAppLink, appDirName, appFileName, env, links, scripts) {
        return `<!DOCTYPE html>
<html class="editor" lang="en">
<head>
    <!-- ${version} -->
    <meta charset="utf-8">
    <title>${appDirName}/${appFileName}[${env}] - QForms Editor</title>
    <!-- links -->
    ${links}
    <!-- scripts -->
    ${scripts}
    <!--<script type="text/javascript">
        document.addEventListener('DOMContentLoaded', async () => {
            console.log('editor.ejs DOMContentLoaded');
            const data = JSON.parse(document.querySelector('script[type="application/json"]').textContent);
            const runAppLink = "${runAppLink}";
            const editorFrontHostApp = new EditorFrontHostApp(data, runAppLink);
            await editorFrontHostApp.run();
        });
    </script>-->
    <script type="application/json">${JSON.stringify(data /*, null, 4*/)}</script>
</head>
<body class="editor__body">
    <div class="editor__root"></div>
</body>
</html>
`;
    }
    async handleEditorPost(req, res, context) {
        console.log('EditorModule.handleEditorPost', req.body);
        if (EDITOR_CONTROLLERS.indexOf(req.body.controller) === -1) {
            throw new Error(`unknown controller: ${req.body.controller}`);
        }
        if (EDITOR_ACTIONS.indexOf(req.body.action) === -1) {
            throw new Error(`unknown action ${req.body.action}`);
        }
        const editorControllerClassName = `${req.body.controller}EditorController`;
        const ControllerClass = _index__WEBPACK_IMPORTED_MODULE_7__[editorControllerClassName];
        if (!ControllerClass)
            throw new Error(`no class with name ${editorControllerClassName}`);
        const appInfo = await _viewer_BkModel_BkApplication_BkApplication__WEBPACK_IMPORTED_MODULE_3__.BkApplication.loadAppInfo(this.hostApp.getAppFilePath(context), null);
        const ctrl = new ControllerClass(appInfo, this.hostApp, null);
        await ctrl.init(context);
        const method = req.body.action;
        if (!ctrl[method])
            throw new Error(`no method: ${editorControllerClassName}.${method}`);
        const result = await ctrl[method](context.params);
        // console.log('json result:', result);
        if (result === undefined)
            throw new Error('handleEditorPost: result is undefined');
        await res.json(result);
    }
}


/***/ }),

/***/ "./src/backend/index.ts":
/*!******************************!*\
  !*** ./src/backend/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ActionEditor": () => (/* reexport safe */ _editor_Editor_ActionEditor_ActionEditor__WEBPACK_IMPORTED_MODULE_41__.ActionEditor),
/* harmony export */   "ActionEditorController": () => (/* reexport safe */ _editor_EditorController_ActionEditorController_ActionEditorController__WEBPACK_IMPORTED_MODULE_75__.ActionEditorController),
/* harmony export */   "ApplicationController": () => (/* reexport safe */ _frontend_viewer_Controller_ModelController_ApplicationController_ApplicationController__WEBPACK_IMPORTED_MODULE_88__.ApplicationController),
/* harmony export */   "ApplicationEditor": () => (/* reexport safe */ _editor_Editor_ApplicationEditor_ApplicationEditor__WEBPACK_IMPORTED_MODULE_42__.ApplicationEditor),
/* harmony export */   "ApplicationEditorController": () => (/* reexport safe */ _editor_EditorController_ApplicationEditorController_ApplicationEditorController__WEBPACK_IMPORTED_MODULE_84__.ApplicationEditorController),
/* harmony export */   "BackHostApp": () => (/* reexport safe */ _BackHostApp__WEBPACK_IMPORTED_MODULE_4__.BackHostApp),
/* harmony export */   "BaseModel": () => (/* reexport safe */ _BaseModel__WEBPACK_IMPORTED_MODULE_3__.BaseModel),
/* harmony export */   "BkAction": () => (/* reexport safe */ _viewer_BkModel_BkAction_BkAction__WEBPACK_IMPORTED_MODULE_40__.BkAction),
/* harmony export */   "BkApplication": () => (/* reexport safe */ _viewer_BkModel_BkApplication_BkApplication__WEBPACK_IMPORTED_MODULE_9__.BkApplication),
/* harmony export */   "BkCheckBoxField": () => (/* reexport safe */ _viewer_BkModel_BkField_BkCheckBoxField_BkCheckBoxField__WEBPACK_IMPORTED_MODULE_18__.BkCheckBoxField),
/* harmony export */   "BkCheckBoxListField": () => (/* reexport safe */ _viewer_BkModel_BkField_BkCheckBoxListField_BkCheckBoxListField__WEBPACK_IMPORTED_MODULE_19__.BkCheckBoxListField),
/* harmony export */   "BkColumn": () => (/* reexport safe */ _viewer_BkModel_BkColumn_BkColumn__WEBPACK_IMPORTED_MODULE_38__.BkColumn),
/* harmony export */   "BkComboBoxField": () => (/* reexport safe */ _viewer_BkModel_BkField_BkComboBoxField_BkComboBoxField__WEBPACK_IMPORTED_MODULE_20__.BkComboBoxField),
/* harmony export */   "BkDataSource": () => (/* reexport safe */ _viewer_BkModel_BkDataSource_BkDataSource__WEBPACK_IMPORTED_MODULE_14__.BkDataSource),
/* harmony export */   "BkDatabase": () => (/* reexport safe */ _viewer_BkModel_BkDatabase_BkDatabase__WEBPACK_IMPORTED_MODULE_10__.BkDatabase),
/* harmony export */   "BkDateField": () => (/* reexport safe */ _viewer_BkModel_BkField_BkDateField_BkDateField__WEBPACK_IMPORTED_MODULE_21__.BkDateField),
/* harmony export */   "BkDateTimeField": () => (/* reexport safe */ _viewer_BkModel_BkField_BkDateTimeField_BkDateTimeField__WEBPACK_IMPORTED_MODULE_23__.BkDateTimeField),
/* harmony export */   "BkField": () => (/* reexport safe */ _viewer_BkModel_BkField_BkField__WEBPACK_IMPORTED_MODULE_17__.BkField),
/* harmony export */   "BkFileField": () => (/* reexport safe */ _viewer_BkModel_BkField_BkFileField_BkFileField__WEBPACK_IMPORTED_MODULE_24__.BkFileField),
/* harmony export */   "BkForm": () => (/* reexport safe */ _viewer_BkModel_BkForm_BkForm__WEBPACK_IMPORTED_MODULE_33__.BkForm),
/* harmony export */   "BkImageField": () => (/* reexport safe */ _viewer_BkModel_BkField_BkImageField_BkImageField__WEBPACK_IMPORTED_MODULE_25__.BkImageField),
/* harmony export */   "BkLabelField": () => (/* reexport safe */ _viewer_BkModel_BkField_BkLabelField_BkLabelField__WEBPACK_IMPORTED_MODULE_26__.BkLabelField),
/* harmony export */   "BkLinkField": () => (/* reexport safe */ _viewer_BkModel_BkField_BkLinkField_BkLinkField__WEBPACK_IMPORTED_MODULE_27__.BkLinkField),
/* harmony export */   "BkModel": () => (/* reexport safe */ _viewer_BkModel_BkModel__WEBPACK_IMPORTED_MODULE_8__.BkModel),
/* harmony export */   "BkMongoDbDatabase": () => (/* reexport safe */ _viewer_BkModel_BkDatabase_BkNoSqlDatabase_BkMongoDbDatabase_BkMongoDbDatabase__WEBPACK_IMPORTED_MODULE_13__.BkMongoDbDatabase),
/* harmony export */   "BkMySqlDatabase": () => (/* reexport safe */ _viewer_BkModel_BkDatabase_BkSqlDatabase_BkMySqlDatabase_BkMySqlDatabase__WEBPACK_IMPORTED_MODULE_11__.BkMySqlDatabase),
/* harmony export */   "BkNoSqlDataSource": () => (/* reexport safe */ _viewer_BkModel_BkDataSource_BkPersistentDataSource_BkNoSqlDataSource_BkNoSqlDataSource__WEBPACK_IMPORTED_MODULE_16__.BkNoSqlDataSource),
/* harmony export */   "BkPage": () => (/* reexport safe */ _viewer_BkModel_BkPage_BkPage__WEBPACK_IMPORTED_MODULE_36__.BkPage),
/* harmony export */   "BkPageLink": () => (/* reexport safe */ _viewer_BkModel_BkPageLink_BkPageLink__WEBPACK_IMPORTED_MODULE_37__.BkPageLink),
/* harmony export */   "BkPasswordField": () => (/* reexport safe */ _viewer_BkModel_BkField_BkPasswordField_BkPasswordField__WEBPACK_IMPORTED_MODULE_31__.BkPasswordField),
/* harmony export */   "BkPhoneField": () => (/* reexport safe */ _viewer_BkModel_BkField_BkPhoneField_BkPhoneField__WEBPACK_IMPORTED_MODULE_30__.BkPhoneField),
/* harmony export */   "BkPostgreSqlDatabase": () => (/* reexport safe */ _viewer_BkModel_BkDatabase_BkSqlDatabase_BkPostgreSqlDatabase_BkPostgreSqlDatabase__WEBPACK_IMPORTED_MODULE_12__.BkPostgreSqlDatabase),
/* harmony export */   "BkRadioField": () => (/* reexport safe */ _viewer_BkModel_BkField_BkRadioField_BkRadioField__WEBPACK_IMPORTED_MODULE_32__.BkRadioField),
/* harmony export */   "BkRowForm": () => (/* reexport safe */ _viewer_BkModel_BkForm_BkRowForm_BkRowForm__WEBPACK_IMPORTED_MODULE_34__.BkRowForm),
/* harmony export */   "BkSqlDataSource": () => (/* reexport safe */ _viewer_BkModel_BkDataSource_BkPersistentDataSource_BkSqlDataSource_BkSqlDataSource__WEBPACK_IMPORTED_MODULE_15__.BkSqlDataSource),
/* harmony export */   "BkTable": () => (/* reexport safe */ _viewer_BkModel_BkTable_BkTable__WEBPACK_IMPORTED_MODULE_39__.BkTable),
/* harmony export */   "BkTableForm": () => (/* reexport safe */ _viewer_BkModel_BkForm_BkTableForm_BkTableForm__WEBPACK_IMPORTED_MODULE_35__.BkTableForm),
/* harmony export */   "BkTextAreaField": () => (/* reexport safe */ _viewer_BkModel_BkField_BkTextAreaField_BkTextAreaField__WEBPACK_IMPORTED_MODULE_28__.BkTextAreaField),
/* harmony export */   "BkTextBoxField": () => (/* reexport safe */ _viewer_BkModel_BkField_BkTextBoxField_BkTextBoxField__WEBPACK_IMPORTED_MODULE_29__.BkTextBoxField),
/* harmony export */   "BkTimeField": () => (/* reexport safe */ _viewer_BkModel_BkField_BkTimeField_BkTimeField__WEBPACK_IMPORTED_MODULE_22__.BkTimeField),
/* harmony export */   "CheckBoxFieldEditor": () => (/* reexport safe */ _editor_Editor_FieldEditor_CheckBoxFieldEditor_CheckBoxFieldEditor__WEBPACK_IMPORTED_MODULE_47__.CheckBoxFieldEditor),
/* harmony export */   "CheckBoxListFieldEditor": () => (/* reexport safe */ _editor_Editor_FieldEditor_CheckBoxListFieldEditor_CheckBoxListFieldEditor__WEBPACK_IMPORTED_MODULE_48__.CheckBoxListFieldEditor),
/* harmony export */   "ColumnEditor": () => (/* reexport safe */ _editor_Editor_ColumnEditor_ColumnEditor__WEBPACK_IMPORTED_MODULE_74__.ColumnEditor),
/* harmony export */   "ColumnEditorController": () => (/* reexport safe */ _editor_EditorController_ColumnEditorController_ColumnEditorController__WEBPACK_IMPORTED_MODULE_82__.ColumnEditorController),
/* harmony export */   "ComboBoxFieldEditor": () => (/* reexport safe */ _editor_Editor_FieldEditor_ComboBoxFieldEditor_ComboBoxFieldEditor__WEBPACK_IMPORTED_MODULE_49__.ComboBoxFieldEditor),
/* harmony export */   "Context": () => (/* reexport safe */ _Context__WEBPACK_IMPORTED_MODULE_2__.Context),
/* harmony export */   "Converter": () => (/* reexport safe */ _Converter__WEBPACK_IMPORTED_MODULE_5__.Converter),
/* harmony export */   "DataSourceEditor": () => (/* reexport safe */ _editor_Editor_DataSourceEditor_DataSourceEditor__WEBPACK_IMPORTED_MODULE_43__.DataSourceEditor),
/* harmony export */   "DataSourceEditorController": () => (/* reexport safe */ _editor_EditorController_DataSourceEditorController_DataSourceEditorController__WEBPACK_IMPORTED_MODULE_77__.DataSourceEditorController),
/* harmony export */   "DatabaseEditor": () => (/* reexport safe */ _editor_Editor_DatabaseEditor_DatabaseEditor__WEBPACK_IMPORTED_MODULE_68__.DatabaseEditor),
/* harmony export */   "DatabaseEditorController": () => (/* reexport safe */ _editor_EditorController_DatabaseEditorController_DatabaseEditorController__WEBPACK_IMPORTED_MODULE_76__.DatabaseEditorController),
/* harmony export */   "DateFieldEditor": () => (/* reexport safe */ _editor_Editor_FieldEditor_DateFieldEditor_DateFieldEditor__WEBPACK_IMPORTED_MODULE_50__.DateFieldEditor),
/* harmony export */   "DateTimeFieldEditor": () => (/* reexport safe */ _editor_Editor_FieldEditor_DateTimeFieldEditor_DateTimeFieldEditor__WEBPACK_IMPORTED_MODULE_52__.DateTimeFieldEditor),
/* harmony export */   "FieldEditor": () => (/* reexport safe */ _editor_Editor_FieldEditor_FieldEditor__WEBPACK_IMPORTED_MODULE_46__.FieldEditor),
/* harmony export */   "FieldEditorController": () => (/* reexport safe */ _editor_EditorController_FieldEditorController_FieldEditorController__WEBPACK_IMPORTED_MODULE_85__.FieldEditorController),
/* harmony export */   "FileFieldEditor": () => (/* reexport safe */ _editor_Editor_FieldEditor_FileFieldEditor_FileFieldEditor__WEBPACK_IMPORTED_MODULE_53__.FileFieldEditor),
/* harmony export */   "FormEditor": () => (/* reexport safe */ _editor_Editor_FormEditor_FormEditor__WEBPACK_IMPORTED_MODULE_62__.FormEditor),
/* harmony export */   "FormEditorController": () => (/* reexport safe */ _editor_EditorController_FormEditorController_FormEditorController__WEBPACK_IMPORTED_MODULE_86__.FormEditorController),
/* harmony export */   "Helper": () => (/* reexport safe */ _Helper__WEBPACK_IMPORTED_MODULE_0__.Helper),
/* harmony export */   "ImageFieldEditor": () => (/* reexport safe */ _editor_Editor_FieldEditor_ImageFieldEditor_ImageFieldEditor__WEBPACK_IMPORTED_MODULE_54__.ImageFieldEditor),
/* harmony export */   "JsonFile": () => (/* reexport safe */ _JsonFile__WEBPACK_IMPORTED_MODULE_6__.JsonFile),
/* harmony export */   "KeyColumnEditor": () => (/* reexport safe */ _editor_Editor_KeyColumnEditor_KeyColumnEditor__WEBPACK_IMPORTED_MODULE_67__.KeyColumnEditor),
/* harmony export */   "KeyColumnEditorController": () => (/* reexport safe */ _editor_EditorController_KeyColumnEditorController_KeyColumnEditorController__WEBPACK_IMPORTED_MODULE_78__.KeyColumnEditorController),
/* harmony export */   "LabelFieldEditor": () => (/* reexport safe */ _editor_Editor_FieldEditor_LabelFieldEditor_LabelFieldEditor__WEBPACK_IMPORTED_MODULE_55__.LabelFieldEditor),
/* harmony export */   "LinkFieldEditor": () => (/* reexport safe */ _editor_Editor_FieldEditor_LinkFieldEditor_LinkFieldEditor__WEBPACK_IMPORTED_MODULE_56__.LinkFieldEditor),
/* harmony export */   "MongoDbDatabaseEditor": () => (/* reexport safe */ _editor_Editor_DatabaseEditor_MongoDbDatabaseEditor_MongoDbDatabaseEditor__WEBPACK_IMPORTED_MODULE_71__.MongoDbDatabaseEditor),
/* harmony export */   "MySqlDatabaseEditor": () => (/* reexport safe */ _editor_Editor_DatabaseEditor_MySqlDatabaseEditor_MySqlDatabaseEditor__WEBPACK_IMPORTED_MODULE_69__.MySqlDatabaseEditor),
/* harmony export */   "NoSqlDataSourceEditor": () => (/* reexport safe */ _editor_Editor_DataSourceEditor_NoSqlDataSourceEditor_NoSqlDataSourceEditor__WEBPACK_IMPORTED_MODULE_45__.NoSqlDataSourceEditor),
/* harmony export */   "PageEditor": () => (/* reexport safe */ _editor_Editor_PageEditor_PageEditor__WEBPACK_IMPORTED_MODULE_65__.PageEditor),
/* harmony export */   "PageEditorController": () => (/* reexport safe */ _editor_EditorController_PageEditorController_PageEditorController__WEBPACK_IMPORTED_MODULE_87__.PageEditorController),
/* harmony export */   "PageLinkEditor": () => (/* reexport safe */ _editor_Editor_PageLinkEditor_PageLinkEditor__WEBPACK_IMPORTED_MODULE_66__.PageLinkEditor),
/* harmony export */   "PageLinkEditorController": () => (/* reexport safe */ _editor_EditorController_PageLinkEditorController_PageLinkEditorController__WEBPACK_IMPORTED_MODULE_79__.PageLinkEditorController),
/* harmony export */   "ParamEditor": () => (/* reexport safe */ _editor_Editor_ParamEditor_ParamEditor__WEBPACK_IMPORTED_MODULE_73__.ParamEditor),
/* harmony export */   "ParamEditorController": () => (/* reexport safe */ _editor_EditorController_ParamEditorController_ParamEditorController__WEBPACK_IMPORTED_MODULE_80__.ParamEditorController),
/* harmony export */   "PasswordFieldEditor": () => (/* reexport safe */ _editor_Editor_FieldEditor_PasswordFieldEditor_PasswordFieldEditor__WEBPACK_IMPORTED_MODULE_60__.PasswordFieldEditor),
/* harmony export */   "PhoneFieldEditor": () => (/* reexport safe */ _editor_Editor_FieldEditor_PhoneFieldEditor_PhoneFieldEditor__WEBPACK_IMPORTED_MODULE_59__.PhoneFieldEditor),
/* harmony export */   "PostgreSqlDatabaseEditor": () => (/* reexport safe */ _editor_Editor_DatabaseEditor_PostgreSqlDatabaseEditor_PostgreSqlDatabaseEditor__WEBPACK_IMPORTED_MODULE_70__.PostgreSqlDatabaseEditor),
/* harmony export */   "RadioFieldEditor": () => (/* reexport safe */ _editor_Editor_FieldEditor_RadioFieldEditor_RadioFieldEditor__WEBPACK_IMPORTED_MODULE_61__.RadioFieldEditor),
/* harmony export */   "Result": () => (/* reexport safe */ _Result__WEBPACK_IMPORTED_MODULE_1__.Result),
/* harmony export */   "RowFormEditor": () => (/* reexport safe */ _editor_Editor_FormEditor_RowFormEditor_RowFormEditor__WEBPACK_IMPORTED_MODULE_63__.RowFormEditor),
/* harmony export */   "SqlDataSourceEditor": () => (/* reexport safe */ _editor_Editor_DataSourceEditor_SqlDataSourceEditor_SqlDataSourceEditor__WEBPACK_IMPORTED_MODULE_44__.SqlDataSourceEditor),
/* harmony export */   "TableEditor": () => (/* reexport safe */ _editor_Editor_TableEditor_TableEditor__WEBPACK_IMPORTED_MODULE_72__.TableEditor),
/* harmony export */   "TableEditorController": () => (/* reexport safe */ _editor_EditorController_TableEditorController_TableEditorController__WEBPACK_IMPORTED_MODULE_81__.TableEditorController),
/* harmony export */   "TableFormEditor": () => (/* reexport safe */ _editor_Editor_FormEditor_TableFormEditor_TableFormEditor__WEBPACK_IMPORTED_MODULE_64__.TableFormEditor),
/* harmony export */   "TextAreaFieldEditor": () => (/* reexport safe */ _editor_Editor_FieldEditor_TextAreaFieldEditor_TextAreaFieldEditor__WEBPACK_IMPORTED_MODULE_57__.TextAreaFieldEditor),
/* harmony export */   "TextBoxFieldEditor": () => (/* reexport safe */ _editor_Editor_FieldEditor_TextBoxFieldEditor_TextBoxFieldEditor__WEBPACK_IMPORTED_MODULE_58__.TextBoxFieldEditor),
/* harmony export */   "TimeFieldEditor": () => (/* reexport safe */ _editor_Editor_FieldEditor_TimeFieldEditor_TimeFieldEditor__WEBPACK_IMPORTED_MODULE_51__.TimeFieldEditor),
/* harmony export */   "VisualEditorController": () => (/* reexport safe */ _editor_EditorController_VisualEditorController__WEBPACK_IMPORTED_MODULE_83__.VisualEditorController),
/* harmony export */   "keyArrayToKey": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_7__.keyArrayToKey)
/* harmony export */ });
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Helper */ "./src/backend/Helper.ts");
/* harmony import */ var _Result__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Result */ "./src/Result.ts");
/* harmony import */ var _Context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Context */ "./src/backend/Context.ts");
/* harmony import */ var _BaseModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BaseModel */ "./src/backend/BaseModel.ts");
/* harmony import */ var _BackHostApp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BackHostApp */ "./src/backend/BackHostApp.ts");
/* harmony import */ var _Converter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Converter */ "./src/backend/Converter.ts");
/* harmony import */ var _JsonFile__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./JsonFile */ "./src/backend/JsonFile.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../types */ "./src/types.ts");
/* harmony import */ var _viewer_BkModel_BkModel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./viewer/BkModel/BkModel */ "./src/backend/viewer/BkModel/BkModel.ts");
/* harmony import */ var _viewer_BkModel_BkApplication_BkApplication__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./viewer/BkModel/BkApplication/BkApplication */ "./src/backend/viewer/BkModel/BkApplication/BkApplication.ts");
/* harmony import */ var _viewer_BkModel_BkDatabase_BkDatabase__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./viewer/BkModel/BkDatabase/BkDatabase */ "./src/backend/viewer/BkModel/BkDatabase/BkDatabase.ts");
/* harmony import */ var _viewer_BkModel_BkDatabase_BkSqlDatabase_BkMySqlDatabase_BkMySqlDatabase__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./viewer/BkModel/BkDatabase/BkSqlDatabase/BkMySqlDatabase/BkMySqlDatabase */ "./src/backend/viewer/BkModel/BkDatabase/BkSqlDatabase/BkMySqlDatabase/BkMySqlDatabase.ts");
/* harmony import */ var _viewer_BkModel_BkDatabase_BkSqlDatabase_BkPostgreSqlDatabase_BkPostgreSqlDatabase__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./viewer/BkModel/BkDatabase/BkSqlDatabase/BkPostgreSqlDatabase/BkPostgreSqlDatabase */ "./src/backend/viewer/BkModel/BkDatabase/BkSqlDatabase/BkPostgreSqlDatabase/BkPostgreSqlDatabase.ts");
/* harmony import */ var _viewer_BkModel_BkDatabase_BkNoSqlDatabase_BkMongoDbDatabase_BkMongoDbDatabase__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./viewer/BkModel/BkDatabase/BkNoSqlDatabase/BkMongoDbDatabase/BkMongoDbDatabase */ "./src/backend/viewer/BkModel/BkDatabase/BkNoSqlDatabase/BkMongoDbDatabase/BkMongoDbDatabase.ts");
/* harmony import */ var _viewer_BkModel_BkDataSource_BkDataSource__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./viewer/BkModel/BkDataSource/BkDataSource */ "./src/backend/viewer/BkModel/BkDataSource/BkDataSource.ts");
/* harmony import */ var _viewer_BkModel_BkDataSource_BkPersistentDataSource_BkSqlDataSource_BkSqlDataSource__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./viewer/BkModel/BkDataSource/BkPersistentDataSource/BkSqlDataSource/BkSqlDataSource */ "./src/backend/viewer/BkModel/BkDataSource/BkPersistentDataSource/BkSqlDataSource/BkSqlDataSource.ts");
/* harmony import */ var _viewer_BkModel_BkDataSource_BkPersistentDataSource_BkNoSqlDataSource_BkNoSqlDataSource__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./viewer/BkModel/BkDataSource/BkPersistentDataSource/BkNoSqlDataSource/BkNoSqlDataSource */ "./src/backend/viewer/BkModel/BkDataSource/BkPersistentDataSource/BkNoSqlDataSource/BkNoSqlDataSource.ts");
/* harmony import */ var _viewer_BkModel_BkField_BkField__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./viewer/BkModel/BkField/BkField */ "./src/backend/viewer/BkModel/BkField/BkField.ts");
/* harmony import */ var _viewer_BkModel_BkField_BkCheckBoxField_BkCheckBoxField__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./viewer/BkModel/BkField/BkCheckBoxField/BkCheckBoxField */ "./src/backend/viewer/BkModel/BkField/BkCheckBoxField/BkCheckBoxField.ts");
/* harmony import */ var _viewer_BkModel_BkField_BkCheckBoxListField_BkCheckBoxListField__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./viewer/BkModel/BkField/BkCheckBoxListField/BkCheckBoxListField */ "./src/backend/viewer/BkModel/BkField/BkCheckBoxListField/BkCheckBoxListField.ts");
/* harmony import */ var _viewer_BkModel_BkField_BkComboBoxField_BkComboBoxField__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./viewer/BkModel/BkField/BkComboBoxField/BkComboBoxField */ "./src/backend/viewer/BkModel/BkField/BkComboBoxField/BkComboBoxField.ts");
/* harmony import */ var _viewer_BkModel_BkField_BkDateField_BkDateField__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./viewer/BkModel/BkField/BkDateField/BkDateField */ "./src/backend/viewer/BkModel/BkField/BkDateField/BkDateField.ts");
/* harmony import */ var _viewer_BkModel_BkField_BkTimeField_BkTimeField__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./viewer/BkModel/BkField/BkTimeField/BkTimeField */ "./src/backend/viewer/BkModel/BkField/BkTimeField/BkTimeField.ts");
/* harmony import */ var _viewer_BkModel_BkField_BkDateTimeField_BkDateTimeField__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./viewer/BkModel/BkField/BkDateTimeField/BkDateTimeField */ "./src/backend/viewer/BkModel/BkField/BkDateTimeField/BkDateTimeField.ts");
/* harmony import */ var _viewer_BkModel_BkField_BkFileField_BkFileField__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./viewer/BkModel/BkField/BkFileField/BkFileField */ "./src/backend/viewer/BkModel/BkField/BkFileField/BkFileField.ts");
/* harmony import */ var _viewer_BkModel_BkField_BkImageField_BkImageField__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./viewer/BkModel/BkField/BkImageField/BkImageField */ "./src/backend/viewer/BkModel/BkField/BkImageField/BkImageField.ts");
/* harmony import */ var _viewer_BkModel_BkField_BkLabelField_BkLabelField__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./viewer/BkModel/BkField/BkLabelField/BkLabelField */ "./src/backend/viewer/BkModel/BkField/BkLabelField/BkLabelField.ts");
/* harmony import */ var _viewer_BkModel_BkField_BkLinkField_BkLinkField__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./viewer/BkModel/BkField/BkLinkField/BkLinkField */ "./src/backend/viewer/BkModel/BkField/BkLinkField/BkLinkField.ts");
/* harmony import */ var _viewer_BkModel_BkField_BkTextAreaField_BkTextAreaField__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./viewer/BkModel/BkField/BkTextAreaField/BkTextAreaField */ "./src/backend/viewer/BkModel/BkField/BkTextAreaField/BkTextAreaField.ts");
/* harmony import */ var _viewer_BkModel_BkField_BkTextBoxField_BkTextBoxField__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./viewer/BkModel/BkField/BkTextBoxField/BkTextBoxField */ "./src/backend/viewer/BkModel/BkField/BkTextBoxField/BkTextBoxField.ts");
/* harmony import */ var _viewer_BkModel_BkField_BkPhoneField_BkPhoneField__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./viewer/BkModel/BkField/BkPhoneField/BkPhoneField */ "./src/backend/viewer/BkModel/BkField/BkPhoneField/BkPhoneField.ts");
/* harmony import */ var _viewer_BkModel_BkField_BkPasswordField_BkPasswordField__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./viewer/BkModel/BkField/BkPasswordField/BkPasswordField */ "./src/backend/viewer/BkModel/BkField/BkPasswordField/BkPasswordField.ts");
/* harmony import */ var _viewer_BkModel_BkField_BkRadioField_BkRadioField__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./viewer/BkModel/BkField/BkRadioField/BkRadioField */ "./src/backend/viewer/BkModel/BkField/BkRadioField/BkRadioField.ts");
/* harmony import */ var _viewer_BkModel_BkForm_BkForm__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./viewer/BkModel/BkForm/BkForm */ "./src/backend/viewer/BkModel/BkForm/BkForm.ts");
/* harmony import */ var _viewer_BkModel_BkForm_BkRowForm_BkRowForm__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./viewer/BkModel/BkForm/BkRowForm/BkRowForm */ "./src/backend/viewer/BkModel/BkForm/BkRowForm/BkRowForm.ts");
/* harmony import */ var _viewer_BkModel_BkForm_BkTableForm_BkTableForm__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./viewer/BkModel/BkForm/BkTableForm/BkTableForm */ "./src/backend/viewer/BkModel/BkForm/BkTableForm/BkTableForm.ts");
/* harmony import */ var _viewer_BkModel_BkPage_BkPage__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./viewer/BkModel/BkPage/BkPage */ "./src/backend/viewer/BkModel/BkPage/BkPage.ts");
/* harmony import */ var _viewer_BkModel_BkPageLink_BkPageLink__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./viewer/BkModel/BkPageLink/BkPageLink */ "./src/backend/viewer/BkModel/BkPageLink/BkPageLink.ts");
/* harmony import */ var _viewer_BkModel_BkColumn_BkColumn__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./viewer/BkModel/BkColumn/BkColumn */ "./src/backend/viewer/BkModel/BkColumn/BkColumn.ts");
/* harmony import */ var _viewer_BkModel_BkTable_BkTable__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./viewer/BkModel/BkTable/BkTable */ "./src/backend/viewer/BkModel/BkTable/BkTable.ts");
/* harmony import */ var _viewer_BkModel_BkAction_BkAction__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./viewer/BkModel/BkAction/BkAction */ "./src/backend/viewer/BkModel/BkAction/BkAction.ts");
/* harmony import */ var _editor_Editor_ActionEditor_ActionEditor__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./editor/Editor/ActionEditor/ActionEditor */ "./src/backend/editor/Editor/ActionEditor/ActionEditor.ts");
/* harmony import */ var _editor_Editor_ApplicationEditor_ApplicationEditor__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./editor/Editor/ApplicationEditor/ApplicationEditor */ "./src/backend/editor/Editor/ApplicationEditor/ApplicationEditor.ts");
/* harmony import */ var _editor_Editor_DataSourceEditor_DataSourceEditor__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./editor/Editor/DataSourceEditor/DataSourceEditor */ "./src/backend/editor/Editor/DataSourceEditor/DataSourceEditor.ts");
/* harmony import */ var _editor_Editor_DataSourceEditor_SqlDataSourceEditor_SqlDataSourceEditor__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./editor/Editor/DataSourceEditor/SqlDataSourceEditor/SqlDataSourceEditor */ "./src/backend/editor/Editor/DataSourceEditor/SqlDataSourceEditor/SqlDataSourceEditor.ts");
/* harmony import */ var _editor_Editor_DataSourceEditor_NoSqlDataSourceEditor_NoSqlDataSourceEditor__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./editor/Editor/DataSourceEditor/NoSqlDataSourceEditor/NoSqlDataSourceEditor */ "./src/backend/editor/Editor/DataSourceEditor/NoSqlDataSourceEditor/NoSqlDataSourceEditor.ts");
/* harmony import */ var _editor_Editor_FieldEditor_FieldEditor__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./editor/Editor/FieldEditor/FieldEditor */ "./src/backend/editor/Editor/FieldEditor/FieldEditor.ts");
/* harmony import */ var _editor_Editor_FieldEditor_CheckBoxFieldEditor_CheckBoxFieldEditor__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./editor/Editor/FieldEditor/CheckBoxFieldEditor/CheckBoxFieldEditor */ "./src/backend/editor/Editor/FieldEditor/CheckBoxFieldEditor/CheckBoxFieldEditor.ts");
/* harmony import */ var _editor_Editor_FieldEditor_CheckBoxListFieldEditor_CheckBoxListFieldEditor__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./editor/Editor/FieldEditor/CheckBoxListFieldEditor/CheckBoxListFieldEditor */ "./src/backend/editor/Editor/FieldEditor/CheckBoxListFieldEditor/CheckBoxListFieldEditor.ts");
/* harmony import */ var _editor_Editor_FieldEditor_ComboBoxFieldEditor_ComboBoxFieldEditor__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./editor/Editor/FieldEditor/ComboBoxFieldEditor/ComboBoxFieldEditor */ "./src/backend/editor/Editor/FieldEditor/ComboBoxFieldEditor/ComboBoxFieldEditor.ts");
/* harmony import */ var _editor_Editor_FieldEditor_DateFieldEditor_DateFieldEditor__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./editor/Editor/FieldEditor/DateFieldEditor/DateFieldEditor */ "./src/backend/editor/Editor/FieldEditor/DateFieldEditor/DateFieldEditor.ts");
/* harmony import */ var _editor_Editor_FieldEditor_TimeFieldEditor_TimeFieldEditor__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./editor/Editor/FieldEditor/TimeFieldEditor/TimeFieldEditor */ "./src/backend/editor/Editor/FieldEditor/TimeFieldEditor/TimeFieldEditor.ts");
/* harmony import */ var _editor_Editor_FieldEditor_DateTimeFieldEditor_DateTimeFieldEditor__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./editor/Editor/FieldEditor/DateTimeFieldEditor/DateTimeFieldEditor */ "./src/backend/editor/Editor/FieldEditor/DateTimeFieldEditor/DateTimeFieldEditor.ts");
/* harmony import */ var _editor_Editor_FieldEditor_FileFieldEditor_FileFieldEditor__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./editor/Editor/FieldEditor/FileFieldEditor/FileFieldEditor */ "./src/backend/editor/Editor/FieldEditor/FileFieldEditor/FileFieldEditor.ts");
/* harmony import */ var _editor_Editor_FieldEditor_ImageFieldEditor_ImageFieldEditor__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./editor/Editor/FieldEditor/ImageFieldEditor/ImageFieldEditor */ "./src/backend/editor/Editor/FieldEditor/ImageFieldEditor/ImageFieldEditor.ts");
/* harmony import */ var _editor_Editor_FieldEditor_LabelFieldEditor_LabelFieldEditor__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./editor/Editor/FieldEditor/LabelFieldEditor/LabelFieldEditor */ "./src/backend/editor/Editor/FieldEditor/LabelFieldEditor/LabelFieldEditor.ts");
/* harmony import */ var _editor_Editor_FieldEditor_LinkFieldEditor_LinkFieldEditor__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./editor/Editor/FieldEditor/LinkFieldEditor/LinkFieldEditor */ "./src/backend/editor/Editor/FieldEditor/LinkFieldEditor/LinkFieldEditor.ts");
/* harmony import */ var _editor_Editor_FieldEditor_TextAreaFieldEditor_TextAreaFieldEditor__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./editor/Editor/FieldEditor/TextAreaFieldEditor/TextAreaFieldEditor */ "./src/backend/editor/Editor/FieldEditor/TextAreaFieldEditor/TextAreaFieldEditor.ts");
/* harmony import */ var _editor_Editor_FieldEditor_TextBoxFieldEditor_TextBoxFieldEditor__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./editor/Editor/FieldEditor/TextBoxFieldEditor/TextBoxFieldEditor */ "./src/backend/editor/Editor/FieldEditor/TextBoxFieldEditor/TextBoxFieldEditor.ts");
/* harmony import */ var _editor_Editor_FieldEditor_PhoneFieldEditor_PhoneFieldEditor__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./editor/Editor/FieldEditor/PhoneFieldEditor/PhoneFieldEditor */ "./src/backend/editor/Editor/FieldEditor/PhoneFieldEditor/PhoneFieldEditor.ts");
/* harmony import */ var _editor_Editor_FieldEditor_PasswordFieldEditor_PasswordFieldEditor__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./editor/Editor/FieldEditor/PasswordFieldEditor/PasswordFieldEditor */ "./src/backend/editor/Editor/FieldEditor/PasswordFieldEditor/PasswordFieldEditor.ts");
/* harmony import */ var _editor_Editor_FieldEditor_RadioFieldEditor_RadioFieldEditor__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./editor/Editor/FieldEditor/RadioFieldEditor/RadioFieldEditor */ "./src/backend/editor/Editor/FieldEditor/RadioFieldEditor/RadioFieldEditor.ts");
/* harmony import */ var _editor_Editor_FormEditor_FormEditor__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./editor/Editor/FormEditor/FormEditor */ "./src/backend/editor/Editor/FormEditor/FormEditor.ts");
/* harmony import */ var _editor_Editor_FormEditor_RowFormEditor_RowFormEditor__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./editor/Editor/FormEditor/RowFormEditor/RowFormEditor */ "./src/backend/editor/Editor/FormEditor/RowFormEditor/RowFormEditor.ts");
/* harmony import */ var _editor_Editor_FormEditor_TableFormEditor_TableFormEditor__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./editor/Editor/FormEditor/TableFormEditor/TableFormEditor */ "./src/backend/editor/Editor/FormEditor/TableFormEditor/TableFormEditor.ts");
/* harmony import */ var _editor_Editor_PageEditor_PageEditor__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./editor/Editor/PageEditor/PageEditor */ "./src/backend/editor/Editor/PageEditor/PageEditor.ts");
/* harmony import */ var _editor_Editor_PageLinkEditor_PageLinkEditor__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./editor/Editor/PageLinkEditor/PageLinkEditor */ "./src/backend/editor/Editor/PageLinkEditor/PageLinkEditor.ts");
/* harmony import */ var _editor_Editor_KeyColumnEditor_KeyColumnEditor__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./editor/Editor/KeyColumnEditor/KeyColumnEditor */ "./src/backend/editor/Editor/KeyColumnEditor/KeyColumnEditor.ts");
/* harmony import */ var _editor_Editor_DatabaseEditor_DatabaseEditor__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./editor/Editor/DatabaseEditor/DatabaseEditor */ "./src/backend/editor/Editor/DatabaseEditor/DatabaseEditor.ts");
/* harmony import */ var _editor_Editor_DatabaseEditor_MySqlDatabaseEditor_MySqlDatabaseEditor__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./editor/Editor/DatabaseEditor/MySqlDatabaseEditor/MySqlDatabaseEditor */ "./src/backend/editor/Editor/DatabaseEditor/MySqlDatabaseEditor/MySqlDatabaseEditor.ts");
/* harmony import */ var _editor_Editor_DatabaseEditor_PostgreSqlDatabaseEditor_PostgreSqlDatabaseEditor__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./editor/Editor/DatabaseEditor/PostgreSqlDatabaseEditor/PostgreSqlDatabaseEditor */ "./src/backend/editor/Editor/DatabaseEditor/PostgreSqlDatabaseEditor/PostgreSqlDatabaseEditor.ts");
/* harmony import */ var _editor_Editor_DatabaseEditor_MongoDbDatabaseEditor_MongoDbDatabaseEditor__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./editor/Editor/DatabaseEditor/MongoDbDatabaseEditor/MongoDbDatabaseEditor */ "./src/backend/editor/Editor/DatabaseEditor/MongoDbDatabaseEditor/MongoDbDatabaseEditor.ts");
/* harmony import */ var _editor_Editor_TableEditor_TableEditor__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./editor/Editor/TableEditor/TableEditor */ "./src/backend/editor/Editor/TableEditor/TableEditor.ts");
/* harmony import */ var _editor_Editor_ParamEditor_ParamEditor__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./editor/Editor/ParamEditor/ParamEditor */ "./src/backend/editor/Editor/ParamEditor/ParamEditor.ts");
/* harmony import */ var _editor_Editor_ColumnEditor_ColumnEditor__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./editor/Editor/ColumnEditor/ColumnEditor */ "./src/backend/editor/Editor/ColumnEditor/ColumnEditor.ts");
/* harmony import */ var _editor_EditorController_ActionEditorController_ActionEditorController__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./editor/EditorController/ActionEditorController/ActionEditorController */ "./src/backend/editor/EditorController/ActionEditorController/ActionEditorController.ts");
/* harmony import */ var _editor_EditorController_DatabaseEditorController_DatabaseEditorController__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./editor/EditorController/DatabaseEditorController/DatabaseEditorController */ "./src/backend/editor/EditorController/DatabaseEditorController/DatabaseEditorController.ts");
/* harmony import */ var _editor_EditorController_DataSourceEditorController_DataSourceEditorController__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./editor/EditorController/DataSourceEditorController/DataSourceEditorController */ "./src/backend/editor/EditorController/DataSourceEditorController/DataSourceEditorController.ts");
/* harmony import */ var _editor_EditorController_KeyColumnEditorController_KeyColumnEditorController__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./editor/EditorController/KeyColumnEditorController/KeyColumnEditorController */ "./src/backend/editor/EditorController/KeyColumnEditorController/KeyColumnEditorController.ts");
/* harmony import */ var _editor_EditorController_PageLinkEditorController_PageLinkEditorController__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./editor/EditorController/PageLinkEditorController/PageLinkEditorController */ "./src/backend/editor/EditorController/PageLinkEditorController/PageLinkEditorController.ts");
/* harmony import */ var _editor_EditorController_ParamEditorController_ParamEditorController__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./editor/EditorController/ParamEditorController/ParamEditorController */ "./src/backend/editor/EditorController/ParamEditorController/ParamEditorController.ts");
/* harmony import */ var _editor_EditorController_TableEditorController_TableEditorController__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./editor/EditorController/TableEditorController/TableEditorController */ "./src/backend/editor/EditorController/TableEditorController/TableEditorController.ts");
/* harmony import */ var _editor_EditorController_ColumnEditorController_ColumnEditorController__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./editor/EditorController/ColumnEditorController/ColumnEditorController */ "./src/backend/editor/EditorController/ColumnEditorController/ColumnEditorController.ts");
/* harmony import */ var _editor_EditorController_VisualEditorController__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./editor/EditorController/VisualEditorController */ "./src/backend/editor/EditorController/VisualEditorController.ts");
/* harmony import */ var _editor_EditorController_ApplicationEditorController_ApplicationEditorController__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./editor/EditorController/ApplicationEditorController/ApplicationEditorController */ "./src/backend/editor/EditorController/ApplicationEditorController/ApplicationEditorController.ts");
/* harmony import */ var _editor_EditorController_FieldEditorController_FieldEditorController__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ./editor/EditorController/FieldEditorController/FieldEditorController */ "./src/backend/editor/EditorController/FieldEditorController/FieldEditorController.ts");
/* harmony import */ var _editor_EditorController_FormEditorController_FormEditorController__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! ./editor/EditorController/FormEditorController/FormEditorController */ "./src/backend/editor/EditorController/FormEditorController/FormEditorController.ts");
/* harmony import */ var _editor_EditorController_PageEditorController_PageEditorController__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(/*! ./editor/EditorController/PageEditorController/PageEditorController */ "./src/backend/editor/EditorController/PageEditorController/PageEditorController.ts");
/* harmony import */ var _frontend_viewer_Controller_ModelController_ApplicationController_ApplicationController__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(/*! ../frontend/viewer/Controller/ModelController/ApplicationController/ApplicationController */ "./src/frontend/viewer/Controller/ModelController/ApplicationController/ApplicationController.ts");








// viewer

































// editor


















































/***/ }),

/***/ "./src/backend/index/IndexModule.tsx":
/*!*******************************************!*\
  !*** ./src/backend/index/IndexModule.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IndexModule": () => (/* binding */ IndexModule)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _viewer_BkModel_BkApplication_BkApplication__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../viewer/BkModel/BkApplication/BkApplication */ "./src/backend/viewer/BkModel/BkApplication/BkApplication.ts");
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Helper */ "./src/backend/Helper.ts");
/* harmony import */ var _Links__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Links */ "./src/backend/Links.tsx");
/* harmony import */ var _Scripts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Scripts */ "./src/backend/Scripts.tsx");







const pkg = __webpack_require__(/*! ../../../package.json */ "./package.json");
class IndexModule {
    constructor(hostApp) {
        this.hostApp = hostApp;
    }
    async init() {
        this.css = (await _Helper__WEBPACK_IMPORTED_MODULE_4__.Helper.getFilePaths(path__WEBPACK_IMPORTED_MODULE_1___default().join(this.hostApp.getFrontendDirPath(), 'index/public'), 'css')).map((path) => `/index/public/${path}`);
        this.js = (await _Helper__WEBPACK_IMPORTED_MODULE_4__.Helper.getFilePaths(path__WEBPACK_IMPORTED_MODULE_1___default().join(this.hostApp.getFrontendDirPath(), 'index/public'), 'js')).map((path) => `/index/public/${path}`);
        // console.log('app.css:', this.css);
        // console.log('app.js:' , this.js);
    }
    async fill() {
        const distDirPath = this.hostApp.makeDistDirPathForApp(this.hostApp.appsDirPath);
        const appInfos = await _viewer_BkModel_BkApplication_BkApplication__WEBPACK_IMPORTED_MODULE_3__.BkApplication.getAppInfos(this.hostApp.appsDirPath, distDirPath);
        // console.log('appInfos:', appInfos);
        return {
            nodeEnv: this.hostApp.getNodeEnv(),
            appInfos: appInfos.map((appInfo) => ({
                fullName: appInfo.fullName,
                envs: appInfo.envs,
            })),
        };
    }
    getLinks() {
        return this.css;
    }
    getScripts() {
        return this.js;
    }
    async render() {
        // const app = ReactDOMServer.renderToStaticMarkup(<App/>);
        const links = react_dom_server__WEBPACK_IMPORTED_MODULE_2___default().renderToStaticMarkup((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Links__WEBPACK_IMPORTED_MODULE_5__.Links, { links: this.getLinks() }));
        const scripts = react_dom_server__WEBPACK_IMPORTED_MODULE_2___default().renderToStaticMarkup((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Scripts__WEBPACK_IMPORTED_MODULE_6__.Scripts, { scripts: this.getScripts() }));
        const data = await this.fill();
        const data2 = JSON.stringify(data /*, null, 4*/);
        return `<!DOCTYPE html>
<html>
<head>
    <!-- ${pkg.version}> -->
    <meta charSet="utf-8">
    <title>QForms v${pkg.version}</title>
    <!-- links -->
    ${links}
    <!-- scripts -->
    ${scripts}
    <script type="application/json">${data2}</script>
    <!--<script>
        document.addEventListener('DOMContentLoaded', () => {
            // console.log('DOMContentLoaded');
            const data = JSON.parse(document.querySelector('script[type="application/json"]').textContent);
            new IndexFrontHostApp(data).init();
        });
    </script>-->
</head>
<body>
<div id="root"></div>
</body>
</html>`;
    }
}


/***/ }),

/***/ "./src/backend/monitor/MonitorModule.tsx":
/*!***********************************************!*\
  !*** ./src/backend/monitor/MonitorModule.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MonitorModule": () => (/* binding */ MonitorModule)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Helper */ "./src/backend/Helper.ts");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Links__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Links */ "./src/backend/Links.tsx");
/* harmony import */ var _Scripts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Scripts */ "./src/backend/Scripts.tsx");






const pkg = __webpack_require__(/*! ../../../package.json */ "./package.json");
class MonitorModule {
    constructor(hostApp) {
        this.hostApp = hostApp;
    }
    async init() {
        this.css = (await _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.getFilePaths(path__WEBPACK_IMPORTED_MODULE_1___default().join(this.hostApp.getFrontendDirPath(), 'monitor/public'), 'css')).map((path) => `/monitor/public/${path}`);
        this.js = (await _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.getFilePaths(path__WEBPACK_IMPORTED_MODULE_1___default().join(this.hostApp.getFrontendDirPath(), 'monitor/public'), 'js')).map((path) => `/monitor/public/${path}`);
        // console.log('monitor.css:', this.css);
        // console.log('monitor.js:' , this.js);
    }
    fill() {
        return {
            nodeEnv: this.hostApp.getNodeEnv(),
            uptime: Date.now() - this.hostApp.startTime.getTime(),
            applications: Object.keys(this.hostApp.applications).map((route) => {
                const app = this.hostApp.applications[route];
                return {
                    route: route,
                    version: app.getVersion(),
                    pages: Object.keys(app.pages).map((name) => {
                        return {
                            name: name,
                        };
                    }),
                    clients: app.clients.map((webSocket) => {
                        return {
                            uuid: webSocket.uuid,
                            userId: webSocket.userId,
                            ip: _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.getWebSocketIP(webSocket),
                            version: webSocket.customFields.version,
                        };
                    }),
                };
            }),
        };
    }
    getLinks() {
        return this.css;
    }
    getScripts() {
        return this.js;
    }
    checkCredentials(req) {
        const base64string = req.headers.authorization.substr(6);
        const usernamePassword = new Buffer(base64string, 'base64').toString();
        const [username, password] = usernamePassword.split(':');
        return (username === this.hostApp.getParams().monitor.username &&
            password === this.hostApp.getParams().monitor.password);
    }
    authorize(req) {
        if (this.hostApp.isDevelopment()) {
            return true;
        }
        if (!this.hostApp.getParams().monitor) {
            throw new Error('no monitor params');
        }
        return (req.headers.authorization &&
            req.headers.authorization.substr(0, 5) === 'Basic' &&
            this.checkCredentials(req));
    }
    render() {
        // const app = ReactDOMServer.renderToStaticMarkup(<App/>);
        const links = react_dom_server__WEBPACK_IMPORTED_MODULE_3___default().renderToStaticMarkup((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Links__WEBPACK_IMPORTED_MODULE_4__.Links, { links: this.getLinks() }));
        const scripts = react_dom_server__WEBPACK_IMPORTED_MODULE_3___default().renderToStaticMarkup((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Scripts__WEBPACK_IMPORTED_MODULE_5__.Scripts, { scripts: this.getScripts() }));
        const data = JSON.stringify(this.fill() /*, null, 4*/);
        return `<!DOCTYPE html>
<html class="monitor" lang="en">
<head>
    <!-- ${pkg.version}> -->
    <meta charSet="utf-8">
    <title>QForms monitor v${pkg.version}</title>
    <!-- links -->
    ${links}
    <!-- scripts -->
    ${scripts}
    <script type="application/json">${data}</script>
</head>
<body class="monitor__body">
    <div class="monitor__root"></div>
</body>
</html>`;
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkAction/BkAction.ts":
/*!*********************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkAction/BkAction.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkAction": () => (/* binding */ BkAction)
/* harmony export */ });
/* harmony import */ var _BkModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkModel */ "./src/backend/viewer/BkModel/BkModel.ts");

class BkAction extends _BkModel__WEBPACK_IMPORTED_MODULE_0__.BkModel {
    /* static async create(data, parent): Promise<Action> {
        return new Action(data, parent);
    } */
    fillAttributes(response) {
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkApplication/BkApplication.ts":
/*!*******************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkApplication/BkApplication.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkApplication": () => (/* binding */ BkApplication)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ "uuid");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _BaseModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../BaseModel */ "./src/backend/BaseModel.ts");
/* harmony import */ var _BkModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../BkModel */ "./src/backend/viewer/BkModel/BkModel.ts");
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Helper */ "./src/backend/Helper.ts");
/* harmony import */ var _BkPageLink_BkPageLink__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../BkPageLink/BkPageLink */ "./src/backend/viewer/BkModel/BkPageLink/BkPageLink.ts");
/* harmony import */ var _JsonFile__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../JsonFile */ "./src/backend/JsonFile.ts");
/* harmony import */ var _MyError__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../MyError */ "./src/backend/MyError.ts");
/* harmony import */ var _Result__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../Result */ "./src/Result.ts");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../text */ "./src/backend/viewer/text/index.ts");










const pkg = __webpack_require__(/*! ../../../../../package.json */ "./package.json");
class BkApplication extends _BkModel__WEBPACK_IMPORTED_MODULE_3__.BkModel {
    constructor(appInfo, hostApp, env = 'local') {
        super(appInfo.appFile.data);
        this.appInfo = appInfo;
        this.hostApp = hostApp;
        this.env = env;
        this.databases = [];
        this.actions = [];
        this.dataSources = [];
        this.pages = {};
        this.clients = [];
        if (!hostApp)
            throw new Error('BkApplication: no hostApp');
    }
    async init(context) {
        await super.init(context);
        await this.createColItems('databases', context);
        await this.createColItems('actions', context);
        await this.createColItems('dataSources', context);
        this.links = await this.getLinks(context);
        this.scripts = await this.getScripts(context);
        await this.createMenu(context);
    }
    getHostApp() {
        return this.hostApp;
    }
    async getLinks(context) {
        const virtualPath = context.getVirtualPath();
        return (await _Helper__WEBPACK_IMPORTED_MODULE_4__.Helper.getFilePaths(this.getPublicDirPath(), 'css')).map((src) => `${virtualPath}/${src}`);
    }
    async getScripts(context) {
        const virtualPath = context.getVirtualPath();
        const publicDirPath = this.getPublicDirPath();
        // console.log('publicDirPath:', publicDirPath);
        return (await _Helper__WEBPACK_IMPORTED_MODULE_4__.Helper.getFilePaths(publicDirPath, 'js')).map((src) => `${virtualPath}/${src}`);
    }
    async deinit() {
        console.log('Application.deinit: ' + this.getName());
        // databases
        for (const database of this.databases) {
            await database.deinit();
        }
    }
    getDirPath() {
        return this.appInfo.dirPath;
    }
    getDistDirPath() {
        return this.appInfo.distDirPath;
    }
    getPublicDirPath() {
        const distDirPath = this.getDistDirPath();
        if (!distDirPath)
            throw new Error('no distDirPath');
        return path__WEBPACK_IMPORTED_MODULE_0___default().join(distDirPath, 'public');
    }
    getText() {
        const lang = this.getAttr('lang') || 'en';
        return _text__WEBPACK_IMPORTED_MODULE_9__[lang];
    }
    getVersion() {
        return null;
    }
    fillAttributes(response) {
        response.class = this.getClassName();
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
        response.lang = this.getAttr('lang');
        response.theme = this.getAttr('theme');
        response.cssBlock = this.getAttr('cssBlock');
        response.viewClass = this.getAttr('viewClass');
        response.ctrlClass = this.getAttr('ctrlClass');
    }
    async fill(context) {
        // console.log('Application.fill');
        const start = Date.now();
        const response = await super.fill(context);
        response.route = context.getRoute();
        response.domain = context.getDomain();
        response.virtualPath = context.getVirtualPath();
        response.logErrorUrl = this.getHostApp().logErrorUrl || '/error';
        response.versions = {
            platform: pkg.version,
            app: this.getVersion(),
        };
        await this.fillCollection(response, 'databases', context);
        await this.fillCollection(response, 'actions', context);
        await this.fillCollection(response, 'dataSources', context);
        // nodeEnv
        response.nodeEnv = this.getHostApp().getNodeEnv();
        // text
        response.text = this.getText();
        // menu
        response.menu = this.menu;
        // nav
        response.nav = this.nav;
        // uuid
        response.uuid = (0,uuid__WEBPACK_IMPORTED_MODULE_1__.v4)();
        // actions
        response.actions = this.getCol('actions').map((data) => ({
            name: _BaseModel__WEBPACK_IMPORTED_MODULE_2__.BaseModel.getName(data),
            caption: _BaseModel__WEBPACK_IMPORTED_MODULE_2__.BaseModel.getAttr(data, 'caption'),
        }));
        // pages
        response.pages = await this.fillPages(context);
        // user
        response.user = this.isAuthentication()
            ? await this.getClientUserFromServerUser(context)
            : null;
        // time
        response.time = Date.now() - start;
        return response;
    }
    async getClientUserFromServerUser(context) {
        const user = context.getUser();
        return {
            id: user.id,
            login: user.name,
        };
    }
    async createMenu(context) {
        // console.log('Application.createMenu');
        const menu = {};
        const nav = {};
        // pages
        const pageLinkNames = this.getItemNames('pageLinks');
        for (const pageLinkName of pageLinkNames) {
            const pageLink = this.createPageLink(pageLinkName);
            const pageLinkMenu = pageLink.getAttr('menu');
            if (pageLinkMenu) {
                const pageFilePath = pageLink.getPageFilePath();
                const pageFile = new _JsonFile__WEBPACK_IMPORTED_MODULE_6__.JsonFile(pageFilePath);
                await pageFile.read();
                // menu
                if (!menu[pageLinkMenu]) {
                    menu[pageLinkMenu] = [];
                }
                menu[pageLinkMenu].push({
                    type: 'page',
                    page: pageLink.getAttr('name'),
                    caption: pageFile.getAttr('caption'),
                });
                // nav
                if (!nav[pageLinkMenu]) {
                    nav[pageLinkMenu] = [];
                }
                nav[pageLinkMenu].push({
                    page: pageLink.getAttr('name'),
                    caption: pageFile.getAttr('caption'),
                });
            }
        }
        // actions
        const actions = this.getCol('actions');
        if (actions.length) {
            menu['Actions'] = actions.map((actionData) => ({
                type: 'action',
                action: _BaseModel__WEBPACK_IMPORTED_MODULE_2__.BaseModel.getName(actionData),
                caption: _BaseModel__WEBPACK_IMPORTED_MODULE_2__.BaseModel.getAttr(actionData, 'caption'),
            }));
        }
        this.menu = menu;
        this.nav = nav;
    }
    createPageLink(name) {
        const data = this.getColItemData('pageLinks', name);
        return new _BkPageLink_BkPageLink__WEBPACK_IMPORTED_MODULE_5__.BkPageLink(data, this);
    }
    async createPage(pageLinkName) {
        // console.log('Application.createPage', pageLinkName);
        if (!this.isData('pageLinks', pageLinkName)) {
            throw new Error(`no page with name: ${pageLinkName}`);
        }
        const pageLink = this.createPageLink(pageLinkName);
        const relFilePath = pageLink.getAttr('fileName');
        const pageFilePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(this.getDirPath(), relFilePath);
        const content = await _Helper__WEBPACK_IMPORTED_MODULE_4__.Helper.readTextFile(pageFilePath);
        const data = JSON.parse(content);
        const page = await this.createChildModel('pages', data);
        await page.init();
        return page;
    }
    authorizePage(user, pageName) {
        return true;
    }
    async getPage(context, pageLinkName) {
        // console.log('Application.getPage', pageLinkName);
        const user = context.getUser();
        if (user && this.authorizePage(user, pageLinkName) === false) {
            throw new Error('authorization error');
        }
        if (this.pages[pageLinkName]) {
            return this.pages[pageLinkName];
        }
        return (this.pages[pageLinkName] = await this.createPage(pageLinkName));
    }
    getStartupPageLinkNames() {
        return this.getCol('pageLinks')
            .filter((data) => _BaseModel__WEBPACK_IMPORTED_MODULE_2__.BaseModel.getAttr(data, 'startup') === 'true')
            .map((data) => _BaseModel__WEBPACK_IMPORTED_MODULE_2__.BaseModel.getName(data));
    }
    async fillPages(context) {
        // console.log('Application.fillPages', context.query.page);
        const pages = [];
        if (context.query.page) {
            const page = await this.getPage(context, context.query.page);
            const response = await page.fill(context);
            pages.push(response);
        }
        else {
            for (const pageLinkName of this.getStartupPageLinkNames()) {
                const page = await this.getPage(context, pageLinkName);
                const response = await page.fill(context);
                pages.push(response);
            }
        }
        return pages;
    }
    async authenticate(context, username, password) {
        console.log('Application.authenticate');
        if (username === this.getAttr('user') && password === this.getAttr('password')) {
            return {
                id: 1,
                name: username,
            };
        }
        return null;
    }
    isAuthentication() {
        return this.getAttr('authentication') === 'true';
    }
    async getUsers(context) {
        return null;
    }
    async rpc(name, context) {
        console.log('Application.rpc', name, context.getReq().body);
        if (this[name])
            return await this[name](context);
        throw new _MyError__WEBPACK_IMPORTED_MODULE_7__.MyError({
            message: `no rpc ${this.constructor.name}.${name}`,
            data: { method: `${this.constructor.name}.rpc` },
            context,
        });
    }
    /*async request(options) {
        console.log(colors.magenta('Application.request'), options);
        return await axios(options);
    }*/
    getEnv() {
        return this.env;
    }
    getEnvVarValue(name) {
        // console.log(`Application.getEnvVarValue: ${name}`);
        if (!name)
            throw new Error('no name');
        const env = this.getEnv();
        const obj = this.data.env[env];
        if (!obj)
            throw new Error(`no env ${env}`);
        if (obj[name])
            return obj[name];
        throw new Error(`no env ${name} in ${env}`);
    }
    getApp() {
        return this;
    }
    findDatabase(name) {
        const db = this.databases.find((database) => database.getName() === name);
        if (!db)
            throw new Error(`no database with name: ${name}`);
        return db;
    }
    getDatabase(name) {
        if (!name)
            throw new Error('getDatabase: no name');
        return this.findDatabase(name);
    }
    // to init custom context params before each request get/post
    async initContext(context) { }
    static makeAppInfoFromAppFile(appFile, distDirPath) {
        // console.log('Application.makeAppInfoFromAppFile:', appFile.filePath, appFile.data);
        const appFilePath = appFile.filePath;
        const data = appFile.data;
        const fileName = path__WEBPACK_IMPORTED_MODULE_0___default().basename(appFilePath, path__WEBPACK_IMPORTED_MODULE_0___default().extname(appFilePath));
        const dirName = path__WEBPACK_IMPORTED_MODULE_0___default().basename(path__WEBPACK_IMPORTED_MODULE_0___default().dirname(appFilePath));
        return {
            appFile: appFile,
            name: _BaseModel__WEBPACK_IMPORTED_MODULE_2__.BaseModel.getName(data),
            caption: _BaseModel__WEBPACK_IMPORTED_MODULE_2__.BaseModel.getAttr(data, 'caption'),
            fullName: [dirName, fileName].join('/'),
            envs: _BaseModel__WEBPACK_IMPORTED_MODULE_2__.BaseModel.getEnvList(data),
            fileName: fileName,
            dirName: dirName,
            filePath: path__WEBPACK_IMPORTED_MODULE_0___default().resolve(appFilePath),
            fileNameExt: path__WEBPACK_IMPORTED_MODULE_0___default().basename(appFilePath),
            extName: path__WEBPACK_IMPORTED_MODULE_0___default().extname(appFilePath),
            dirPath: path__WEBPACK_IMPORTED_MODULE_0___default().resolve(path__WEBPACK_IMPORTED_MODULE_0___default().dirname(appFilePath)),
            distDirPath: distDirPath,
        };
    }
    static async loadAppInfo(appFilePath, distDirPath) {
        // console.log('Application.loadAppInfo', appFilePath);
        const appFile = new _JsonFile__WEBPACK_IMPORTED_MODULE_6__.JsonFile(appFilePath);
        await appFile.read();
        const appInfo = BkApplication.makeAppInfoFromAppFile(appFile, distDirPath);
        return appInfo;
    }
    static async getAppInfos(appsDirPath, distDirPath) {
        // console.log('BkApplication.getAppInfos', appsDirPath);
        const appFilesPaths = await _Helper__WEBPACK_IMPORTED_MODULE_4__.Helper._glob(path__WEBPACK_IMPORTED_MODULE_0___default().join(appsDirPath, '*/*.json'));
        const appInfos = [];
        for (let i = 0; i < appFilesPaths.length; i++) {
            const appFilePath = appFilesPaths[i];
            const appInfo = await BkApplication.loadAppInfo(appFilePath, distDirPath);
            if (appInfo) {
                appInfos.push(appInfo);
            }
        }
        return appInfos;
    }
    getDataSource(name) {
        return this.dataSources.find((dataSource) => dataSource.getName() === name);
    }
    getViewClassName() {
        return this.getAttr('viewClass') || 'ApplicationView';
    }
    async connect(context) {
        for (const db of this.databases) {
            await db.connect(context);
        }
    }
    async release(context) {
        for (const db of this.databases) {
            await db.release(context);
        }
    }
    addClient(webSocket) {
        // add to clients
        this.clients.push(webSocket);
        // console.log('this.clients', this.clients);
    }
    removeClient(webSocket) {
        const i = this.clients.indexOf(webSocket);
        if (i === -1)
            throw new Error(`cannot find socket: ${webSocket.route} ${webSocket.uuid}`);
        // console.log('i:', i);
        this.clients.splice(i, 1);
        // console.log('this.clients', this.clients);
    }
    broadcastDomesticResultToClients(context, result) {
        console.log('Application.broadcastDomesticResultToClients', context.getReq().body.uuid, result);
        if (!context.getReq().body.uuid)
            throw new Error('no uuid');
        if (!result)
            throw new Error('no result');
        const uuid = context.getReq().body.uuid;
        for (const webSocket of this.clients) {
            if (webSocket.uuid !== uuid) {
                webSocket.send(JSON.stringify({ type: 'result', data: result }));
            }
        }
    }
    broadcastForeignResultToClients(context, result) {
        console.log('Application.broadcastForeignResultToClients', context.getReq().body.uuid, result);
        if (!context.getReq().body.uuid)
            throw new Error('no uuid');
        if (!result)
            throw new Error('no result');
        const fResult = this.composeForeignResult(result);
        if (fResult) {
            const uuid = context.getReq().body.uuid;
            for (const webSocket of this.clients) {
                if (webSocket.uuid !== uuid) {
                    webSocket.send(JSON.stringify({ type: 'result', data: fResult }));
                }
            }
        }
    }
    composeForeignResult(result) {
        let fResult = null;
        for (const databaseName in result) {
            const database = this.findDatabase(databaseName);
            if (database) {
                for (const tableName in result[databaseName]) {
                    const table = database.findTable(tableName);
                    if (table) {
                        if (!fResult)
                            fResult = new _Result__WEBPACK_IMPORTED_MODULE_8__.Result();
                        if (!fResult[databaseName])
                            fResult[databaseName] = {};
                        fResult[databaseName][tableName] = { refresh: true };
                    }
                }
            }
        }
        return fResult;
    }
    getTitle(context) {
        return this.getAttr('caption');
    }
    getLoginViewClassName() {
        return 'LoginView';
    }
    isAvailable() {
        return true;
    }
    async handleGetFile(context, next) {
        // console.log('Application.handleGetFile', context.getUri());
        const filePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(this.getPublicDirPath(), context.getUri());
        if (await _Helper__WEBPACK_IMPORTED_MODULE_4__.Helper.exists(filePath)) {
            context.getRes().sendFile(filePath);
        }
        else {
            // next();
            context.getRes().status(404).end('Not Found');
            await this.getHostApp().logError(new Error(`not found ${context.getUri()}`), context.getReq());
        }
        /*
        if (this.isAuthentication() && !(context.getReq().session.user && context.getReq().session.user[context.getRoute()])) {
            throw new MyError({message: 'not authenticated', context});
        }
        */
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkColumn/BkColumn.ts":
/*!*********************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkColumn/BkColumn.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkColumn": () => (/* binding */ BkColumn)
/* harmony export */ });
/* harmony import */ var _BkModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkModel */ "./src/backend/viewer/BkModel/BkModel.ts");

class BkColumn extends _BkModel__WEBPACK_IMPORTED_MODULE_0__.BkModel {
    fillAttributes(response) {
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
        response.type = this.getAttr('type');
    }
    isKey() {
        return this.getAttr('key') === 'true';
    }
    isAuto() {
        return this.getAttr('auto') === 'true';
    }
    getApp() {
        return this.parent.parent.parent;
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkDataSource/BkDataSource.ts":
/*!*****************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkDataSource/BkDataSource.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkDataSource": () => (/* binding */ BkDataSource)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BkModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BkModel */ "./src/backend/viewer/BkModel/BkModel.ts");
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Helper */ "./src/backend/Helper.ts");
/* harmony import */ var _BkPage_BkPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../BkPage/BkPage */ "./src/backend/viewer/BkModel/BkPage/BkPage.ts");
/* harmony import */ var _BkForm_BkForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../BkForm/BkForm */ "./src/backend/viewer/BkModel/BkForm/BkForm.ts");
/* harmony import */ var _BkForm_BkRowForm_BkRowForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../BkForm/BkRowForm/BkRowForm */ "./src/backend/viewer/BkModel/BkForm/BkRowForm/BkRowForm.ts");
/* harmony import */ var _BkForm_BkTableForm_BkTableForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../BkForm/BkTableForm/BkTableForm */ "./src/backend/viewer/BkModel/BkForm/BkTableForm/BkTableForm.ts");







class BkDataSource extends _BkModel__WEBPACK_IMPORTED_MODULE_1__.BkModel {
    constructor() {
        super(...arguments);
        this.keyColumns = [];
        this.rows = [];
    }
    /* constructor(data, parent) {
        super(data, parent);
    } */
    getDirPath() {
        return path__WEBPACK_IMPORTED_MODULE_0___default().join(this.parent.getDirPath(), 'dataSources', this.getName());
    }
    getJsonFilePath() {
        return path__WEBPACK_IMPORTED_MODULE_0___default().join(this.getDirPath(), `${this.getName()}.json`);
    }
    async init(context) {
        // console.log('DataSource.init', this.getFullName());
        await super.init(context);
        // keyColumns
        this.keyColumns = this.getKeyColumns();
        // rows
        const jsonFilePath = this.getJsonFilePath();
        const exists = await _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.exists(jsonFilePath);
        if (exists) {
            const content = await _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.readTextFile(jsonFilePath);
            this.rows = JSON.parse(content);
        }
    }
    getKeyColumns() {
        const keyColumns = this.getItemNames('keyColumns');
        // console.log('keyColumns:', keyColumns);
        if (!keyColumns.length) {
            throw new Error(`${this.getFullName()}: DataSource without table must have at least one key column`);
        }
        return keyColumns;
    }
    checkKeyColumns(row) {
        for (const keyColumn of this.keyColumns) {
            if (!row.hasOwnProperty(keyColumn)) {
                throw new Error(`${this.getFullName()}: no key column '${keyColumn}' in result set`);
            }
        }
    }
    checkKeyFields() {
        const fieldsClumns = this.getForm().fields.map((field) => field.getAttr('column'));
        // console.log('fieldsClumns:', fieldsClumns);
        for (const keyColumn of this.keyColumns) {
            if (!fieldsClumns.includes(keyColumn)) {
                throw new Error(`[${this.getFullName()}]: no field with key column: ${keyColumn}`);
            }
        }
    }
    checkRow(row) {
        this.checkKeyColumns(row);
        if (this.isDefaultOnForm()) {
            // this.checkNotUsedColumns(row);
            this.checkFields(row);
        }
    }
    checkRows(rows) {
        if (rows[0]) {
            this.checkRow(rows[0]);
        }
    }
    /* prepareRows(context: Context, rows: Row[]): void {
        // console.log('DataSource.prepareRows:', this.getFullName(), this.keyColumns);
        this.checkRows(rows);
        this.encodeRows(rows);
    } */
    checkNotUsedColumns(row) {
        const rowColumns = Object.keys(row);
        const formColumns = this.getForm()
            .fields.map((field) => field.getAttr('column'))
            .filter((column) => !!column);
        for (const rowColumn of rowColumns) {
            if (!formColumns.includes(rowColumn)) {
                console.log('rowColumns:', rowColumns);
                console.log('formColumns:', formColumns);
                console.log('row:', row);
                throw new Error(`${this.getFullName()}: not used column "${rowColumn}" in result set`);
            }
        }
    }
    checkFields(row) {
        for (const field of this.getForm().fields) {
            const column = field.getAttr('column');
            if (column) {
                if (!row.hasOwnProperty(column)) {
                    throw new Error(`[${field.getFullName()}]: no column '${column}' in result set`);
                }
                continue;
            }
            if (field.getAttr('value')) {
                continue;
            }
            throw new Error(`[${field.getFullName()}]: no column and no value attr for calculation`);
        }
    }
    /* encodeRows(rows: Row[]) {
        for (const row of rows) {
            this.encodeRow(row);
        }
    } */
    encodeRows2(rows) {
        return rows.map((row) => this.encodeRow2(row));
    }
    /* encodeRow(row: Row): void {
        // console.log('DataSource.encodeRow');
        if (!row) throw new Error(`encodeRow: need row`);
        if (this.isDefaultOnForm()) {
            for (const field of this.getForm().fields) {
                const column = field.getAttr('column');
                row[column] = field.valueToRaw(row[column]);
            }
        } else {
            for (const name in row) {
                row[name] = Helper.encodeValue(row[name]);
            }
        }
    } */
    encodeRow2(row) {
        if (!row)
            throw new Error(`encodeRow: need row`);
        const rawRow = {};
        if (this.isDefaultOnForm()) {
            for (const field of this.getForm().fields) {
                const column = field.getAttr('column');
                rawRow[column] = field.valueToRaw(row[column]);
                if (field.isAttr('displayColumn')) {
                    const displayColumn = field.getAttr('displayColumn');
                    rawRow[displayColumn] = field.valueToRaw(row[displayColumn]);
                }
            }
        }
        else {
            for (const name in row) {
                rawRow[name] = _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.encodeValue(row[name]);
            }
        }
        return rawRow;
    }
    getApp() {
        return this.parent.getApp();
    }
    getKeyValuesFromKey(key) {
        const arr = JSON.parse(key);
        if (arr.length !== this.keyColumns.length) {
            throw new Error(`key length mismatch: ${arr.length} of ${this.keyColumns.length}`);
        }
        const values = {};
        for (let i = 0; i < this.keyColumns.length; i++) {
            const keyColumn = this.keyColumns[i];
            values[keyColumn] = arr[i];
        }
        return values;
    }
    getKeyFromValues(values) {
        const arr = [];
        for (let i = 0; i < this.keyColumns.length; i++) {
            const column = this.keyColumns[i];
            const value = values[column];
            if (value === null || value === undefined) {
                throw new Error(`getKeyFromValues: no value of ${column} column`);
            }
            arr.push(value);
        }
        return JSON.stringify(arr);
    }
    getFullName() {
        if (this.isOnForm()) {
            return [this.parent.getPage().getName(), this.parent.getName(), this.getName()].join('.');
        }
        else if (this.parent instanceof _BkPage_BkPage__WEBPACK_IMPORTED_MODULE_3__.BkPage) {
            return [this.parent.getName(), this.getName()].join('.');
        }
        else {
            return this.getName();
        }
    }
    static keyToParams(key, paramName = 'key') {
        if (typeof key !== 'string')
            throw new Error('key not string');
        const params = {};
        const arr = JSON.parse(key);
        if (arr.length === 1) {
            params[paramName] = arr[0];
        }
        else if (arr.length > 1) {
            for (let i = 0; i < arr.length; i++) {
                params[`${paramName}${i + 1}`] = arr[i];
            }
        }
        else {
            throw new Error(`invalid key: ${key}`);
        }
        return params;
    }
    calcNewKeyValues(originalKeyValues, values) {
        const newKeyValues = this.keyColumns.reduce((acc, name) => {
            if (originalKeyValues[name] === undefined)
                throw new Error(`no key column in values: ${name}`);
            acc[name] = values[name] !== undefined ? values[name] : originalKeyValues[name];
            return acc;
        }, {});
        return newKeyValues;
    }
    calcNewKey(key, values) {
        const keyValues = this.getKeyValuesFromKey(key);
        const newKeyValues = this.calcNewKeyValues(keyValues, values);
        return this.getKeyFromValues(newKeyValues);
    }
    fillAttributes(response) {
        response.class = this.getClassName();
        response.name = this.getAttr('name');
        if (this.isAttr('database')) {
            response.database = this.getAttr('database');
        }
        if (this.isAttr('table')) {
            response.table = this.getAttr('table');
        }
    }
    async fill(context) {
        // console.log('DataSource.fill', this.getFullName());
        const response = await super.fill(context);
        // keyColumns
        response.keyColumns = this.keyColumns;
        // rows from JSON file
        response.rows = await this.getRows();
        return response;
    }
    async getRows() {
        // console.log('DataSource.getRows');
        /* const jsonFilePath = this.getJsonFilePath();
        const exists = await Helper.exists(jsonFilePath);
        if (exists) {
            const content = await Helper.readTextFile(jsonFilePath);
            return JSON.parse(content);
        } */
        return this.rows;
    }
    isOnForm() {
        return this.parent instanceof _BkForm_BkForm__WEBPACK_IMPORTED_MODULE_4__.BkForm;
    }
    isDefaultOnForm() {
        return this.getName() === 'default' && this.isOnForm();
    }
    isDefaultOnRowForm() {
        return this.getName() === 'default' && this.parent instanceof _BkForm_BkRowForm_BkRowForm__WEBPACK_IMPORTED_MODULE_5__.BkRowForm;
    }
    isDefaultOnTableForm() {
        return this.getName() === 'default' && this.parent instanceof _BkForm_BkTableForm_BkTableForm__WEBPACK_IMPORTED_MODULE_6__.BkTableForm;
    }
    async read(context) {
        throw new Error(`${this.constructor.name}.select not implemented`);
    }
    async create(context, _values = null) {
        throw new Error(`${this.constructor.name}.create not implemented`);
    }
    async update(context) {
        throw new Error(`${this.constructor.name}.update not implemented`);
    }
    async delete(context) {
        throw new Error(`${this.constructor.name}.delete not implemented`);
    }
    getForm() {
        return this.isOnForm() ? this.getParent() : null;
    }
    getAccess(context) {
        return {
            create: true,
            read: true,
            update: true,
            delete: true,
        };
    }
    getDatabase() {
        throw new Error(`${this.constructor.name}.getDatabase not implemented`);
    }
    getLimit() {
        if (this.getAttr('limit') !== '') {
            return parseInt(this.getAttr('limit'));
        }
        return null;
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkDataSource/BkPersistentDataSource/BkNoSqlDataSource/BkNoSqlDataSource.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkDataSource/BkPersistentDataSource/BkNoSqlDataSource/BkNoSqlDataSource.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkNoSqlDataSource": () => (/* binding */ BkNoSqlDataSource)
/* harmony export */ });
/* harmony import */ var _BkPersistentDataSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkPersistentDataSource */ "./src/backend/viewer/BkModel/BkDataSource/BkPersistentDataSource/BkPersistentDataSource.ts");
/* harmony import */ var _Result__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../Result */ "./src/Result.ts");
/* harmony import */ var _BkDataSource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../BkDataSource */ "./src/backend/viewer/BkModel/BkDataSource/BkDataSource.ts");
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../Helper */ "./src/backend/Helper.ts");




class BkNoSqlDataSource extends _BkPersistentDataSource__WEBPACK_IMPORTED_MODULE_0__.BkPersistentDataSource {
    constructor(data, parent) {
        super(data, parent);
        this.table = this.getAttr('table')
            ? this.getDatabase().getTable(this.getAttr('table'))
            : null;
    }
    async fill(context) {
        const response = await super.fill(context);
        if (this.isDefaultOnForm()) {
            this.checkKeyFields();
        }
        // if form data source named default then check mode
        if (this.isDefaultOnForm() && this.parent.isNewMode(context)) {
            const limit = this.getLimit();
            if (limit) {
                response.limit = limit;
            }
            response.rows = [];
            response.count = 0;
            return response;
        }
        if (this.getLimit()) {
            context.params.frame = 1;
        }
        try {
            const [rows, count] = await this.read(context);
            response.rows = rows;
            response.count = count;
        }
        catch (err) {
            err.message = `select error of ${this.getFullName()}: ${err.message}`;
            throw err;
        }
        if (this.isDefaultOnRowForm() && response.rows[0]) {
            this.parent.dumpRowToParams(response.rows[0], context.querytime.params);
        }
        if (this.getLimit()) {
            response.limit = context.params.limit;
        }
        return response;
    }
    async read(context) {
        if (this.getAccess(context).read !== true) {
            throw new Error(`[${this.getFullName()}]: access denied`);
        }
        // rows
        const limit = this.getLimit();
        if (limit) {
            if (!context.params.frame)
                throw new Error('no frame param');
            context.setParam('skip', (context.params.frame - 1) * limit);
            context.setParam('limit', limit);
        }
        // exec selectQuery
        const start = Date.now();
        const rows = await this.getDatabase().queryRows(context, this.getSelectQuery(), this.getSelectParams(context));
        console.log('rows query time:', Date.now() - start);
        // console.log('rows:', rows);
        this.checkRows(rows);
        // this.encodeRows(rows);
        const rawRows = this.encodeRows2(rows);
        // count
        let count = null;
        if (this.isDefaultOnTableForm() && this.getLimit()) {
            try {
                const start = Date.now();
                count = await this.getDatabase().queryScalar(context, this.getCountQuery(context), this.getSelectParams(context));
                console.log('count query time:', Date.now() - start);
            }
            catch (err) {
                err.message = `${this.getFullName()}: ${err.message}`;
                throw err;
            }
        }
        return [rawRows, count];
    }
    async create(context, _values = null) {
        console.log('NoSqlDataSource.create');
        if (this.getAccess(context).create !== true) {
            throw new Error(`[${this.getFullName()}]: access denied.`);
        }
        if (!this.table) {
            throw new Error(`${this.getFullName()}: no link to table object: ${this.getAttr('table')}`);
        }
        const databaseName = this.getAttr('database');
        const tableName = this.getAttr('table');
        const values = _values ? _values : this.getValuesFromRow(context.getBody().row);
        console.log('values', values);
        const insertResult = await this.getDatabase().insertOne(context, tableName, values);
        console.log('insertResult:', insertResult);
        const newRow = { _id: insertResult.insertedId };
        const key = this.getKeyFromValues(newRow);
        if (!key)
            throw new Error('create: cannot calc row key');
        console.log('key:', key);
        const keyParams = _BkDataSource__WEBPACK_IMPORTED_MODULE_2__.BkDataSource.keyToParams(key);
        // console.log('keyParams:', keyParams);
        // row
        const [row] = await this.getDatabase().queryRows(context, this.getSelectQuery(), keyParams);
        if (!row)
            throw new Error('select query does not return row');
        this.checkRow(row);
        const rawRow = this.encodeRow2(row);
        // console.log('row:', row);
        const result = new _Result__WEBPACK_IMPORTED_MODULE_1__.Result();
        _Result__WEBPACK_IMPORTED_MODULE_1__.Result.addInsertToResult(result, databaseName, tableName, key);
        _Result__WEBPACK_IMPORTED_MODULE_1__.Result.addInsertExToResult(result, databaseName, tableName, key, rawRow);
        return result;
    }
    async update(context) {
        console.log('NoSqlDataSource.update');
        if (this.getAccess(context).update !== true) {
            throw new Error(`[${this.getFullName()}]: access denied.`);
        }
        if (!this.table)
            throw new Error(`no database table desc: ${this.getAttr('table')}`);
        const databaseName = this.getAttr('database');
        const tableName = this.getAttr('table');
        const changes = this.decodeChanges(context.getBody().changes);
        // console.log('changes:', changes);
        const key = Object.keys(changes)[0];
        console.log('key:', key);
        const filter = this.getKeyValuesFromKey(key);
        const values = changes[key];
        const updateResult = await this.getDatabase().updateOne(context, tableName, filter, {
            $set: values,
        });
        console.log('updateResult', updateResult);
        // new key
        const newKey = this.calcNewKey(key, values);
        const newKeyParams = _BkDataSource__WEBPACK_IMPORTED_MODULE_2__.BkDataSource.keyToParams(newKey);
        console.log('newKey:', newKey);
        // row
        const [row] = await this.getDatabase().queryRows(context, this.getSelectQuery(), newKeyParams);
        if (!row)
            throw new Error('select query does not return row');
        this.checkRow(row);
        const rawRow = this.encodeRow2(row);
        // console.log('row:', row);
        // result
        const result = new _Result__WEBPACK_IMPORTED_MODULE_1__.Result();
        _Result__WEBPACK_IMPORTED_MODULE_1__.Result.addUpdateToResult(result, databaseName, tableName, key, newKey);
        _Result__WEBPACK_IMPORTED_MODULE_1__.Result.addUpdateExToResult(result, databaseName, tableName, key, rawRow);
        return result;
    }
    async delete(context) {
        if (this.getAccess(context).delete !== true) {
            throw new Error(`${this.getFullName()}: access denied`);
        }
        const { key } = context.params;
        const filter = this.getKeyValuesFromKey(key);
        const deleteResult = await this.getDatabase().deleteOne(context, this.getAttr('table'), filter);
        console.log('updateResult', deleteResult);
        const result = new _Result__WEBPACK_IMPORTED_MODULE_1__.Result();
        _Result__WEBPACK_IMPORTED_MODULE_1__.Result.addDeleteToResult(result, this.getAttr('database'), this.getAttr('table'), key);
        return result;
    }
    getSelectQuery() {
        const selectQuery = this.getAttr('selectQuery');
        if (!selectQuery) {
            throw new Error('no selectQuery');
        }
        return selectQuery;
    }
    getCountQuery(context) {
        const query = this.getAttr('countQuery');
        if (!query)
            throw new Error(`${this.getFullName()}: no countQuery`);
        return query;
    }
    getSelectParams(context) {
        return context.getParams();
    }
    checkRow(row) {
        this.checkKeyColumns(row);
        if (this.isDefaultOnForm()) {
            // this.checkNotUsedColumns(row);
            // this.checkFields(row);
        }
    }
    encodeRow2(row) {
        if (!row)
            throw new Error(`encodeRow: need row`);
        const rawRow = {};
        if (this.isDefaultOnForm()) {
            for (const field of this.getForm().fields) {
                const column = field.getAttr('column');
                rawRow[column] =
                    row[column] !== undefined
                        ? field.valueToRaw(row[column])
                        : 'null';
                if (field.isAttr('displayColumn')) {
                    const displayColumn = field.getAttr('displayColumn');
                    rawRow[displayColumn] = field.valueToRaw(row[displayColumn]);
                }
            }
        }
        else {
            for (const name in row) {
                rawRow[name] = _Helper__WEBPACK_IMPORTED_MODULE_3__.Helper.encodeValue(row[name]);
            }
        }
        return rawRow;
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkDataSource/BkPersistentDataSource/BkPersistentDataSource.ts":
/*!**************************************************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkDataSource/BkPersistentDataSource/BkPersistentDataSource.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkPersistentDataSource": () => (/* binding */ BkPersistentDataSource)
/* harmony export */ });
/* harmony import */ var _BkDataSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkDataSource */ "./src/backend/viewer/BkModel/BkDataSource/BkDataSource.ts");

class BkPersistentDataSource extends _BkDataSource__WEBPACK_IMPORTED_MODULE_0__.BkDataSource {
    decodeChanges(changes) {
        const dChanges = {};
        for (const key in changes) {
            dChanges[key] = this.getValuesFromRow(changes[key]);
        }
        return dChanges;
    }
    getValuesFromRow(row) {
        console.log('PersistentDataSource.getValuesFromRow', row);
        const form = this.getForm();
        if (!form)
            throw new Error('not form ds');
        const values = {};
        for (const field of form.fields) {
            const column = field.getAttr('column');
            if (row.hasOwnProperty(column)) {
                const value = field.rawToValue(row[column]);
                values[column] = field.valueToDbValue(value);
            }
        }
        return values;
    }
    getDatabase() {
        const databaseName = this.getAttr('database');
        if (!databaseName)
            throw new Error(`${this.getFullName()}: no database name`);
        return this.getApp().getDatabase(databaseName);
    }
    getTable() {
        const tableName = this.getAttr('table');
        if (!tableName)
            throw new Error(`${this.getFullName()}: no table name`);
        return this.getDatabase().getTable(tableName);
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkDataSource/BkPersistentDataSource/BkSqlDataSource/BkSqlDataSource.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkDataSource/BkPersistentDataSource/BkSqlDataSource/BkSqlDataSource.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkSqlDataSource": () => (/* binding */ BkSqlDataSource)
/* harmony export */ });
/* harmony import */ var _BkPersistentDataSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkPersistentDataSource */ "./src/backend/viewer/BkModel/BkDataSource/BkPersistentDataSource/BkPersistentDataSource.ts");
/* harmony import */ var _BkDataSource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BkDataSource */ "./src/backend/viewer/BkModel/BkDataSource/BkDataSource.ts");
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../Helper */ "./src/backend/Helper.ts");
/* harmony import */ var _Result__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../Result */ "./src/Result.ts");




class BkSqlDataSource extends _BkPersistentDataSource__WEBPACK_IMPORTED_MODULE_0__.BkPersistentDataSource {
    constructor(data, parent) {
        super(data, parent);
        this.table = null;
        if (this.getAttr('table')) {
            this.table = this.getDatabase().getTable(this.getAttr('table'));
        }
    }
    async fill(context) {
        // console.log('SqlDataSource.fill', this.getFullName());
        const response = await super.fill(context);
        if (this.isDefaultOnForm()) {
            this.checkKeyFields();
        }
        // if form data source named default then check mode
        if (this.isDefaultOnForm() && this.parent.isNewMode(context)) {
            const limit = this.getLimit();
            if (limit) {
                response.limit = limit;
            }
            response.rows = [];
            response.count = 0;
            return response;
        }
        if (this.getLimit()) {
            context.params.frame = 1;
        }
        try {
            const [rows, count] = await this.read(context);
            response.rows = rows;
            response.count = count;
        }
        catch (err) {
            err.message = `read error of ${this.getFullName()}: ${err.message}`;
            throw err;
        }
        if (this.isDefaultOnRowForm() && response.rows[0]) {
            this.parent.dumpRowToParams(response.rows[0], context.querytime.params);
        }
        if (this.getLimit()) {
            response.limit = context.params.limit;
        }
        return response;
    }
    getKeyColumns() {
        // console.log('SqlDataSource.getKeyColumns', this.getFullName());
        return this.table ? this.table.getKeyColumns() : super.getKeyColumns();
    }
    getCountQuery(context) {
        let query = this.getAttr('countQuery');
        if (!query)
            throw new Error(`${this.getFullName()}: no countQuery`);
        if (this.isOnForm()) {
            query = this.parent.replaceThis(context, query);
        }
        query = this.templateQuery(context, query);
        return query;
    }
    getSingleQuery(context) {
        let query = this.getAttr('singleQuery');
        if (!query)
            throw new Error(`no singleQuery: ${this.getFullName()}`);
        if (this.isOnForm()) {
            query = this.parent.replaceThis(context, query);
        }
        query = this.templateQuery(context, query);
        return query;
    }
    getMultipleQuery(context) {
        let query = this.getAttr('multipleQuery');
        if (!query)
            throw new Error(`no multipleQuery: ${this.getFullName()}`);
        if (this.isOnForm()) {
            query = this.parent.replaceThis(context, query);
        }
        query = this.templateQuery(context, query);
        return query;
    }
    templateQuery(context, _query) {
        const params = this.getSelectParams(context);
        let query = _query;
        // replace [param] to value
        query = _query.replace(/\[([\w\.@]+)\]/g, (text, name) => {
            if (params[name]) {
                return params[name];
            }
            return text;
        });
        // replace array param to ('itemA', 'itemB')
        /* for (const name of Object.keys(params)) {
            if (Array.isArray(params[name])) {
                const items = params[name].map(item => {
                    const type = typeof item;
                    if (type === 'number') return item;
                    if (type === 'string') return `'${item}'`;
                    throw new Error(`wrong type for array item: ${type}`);
                });
                query = query.replaceAll(`{${name}}`, `(${items})`);
            }
        } */
        return query;
    }
    getSelectParams(context) {
        return context.getParams();
    }
    async read(context) {
        if (this.getAccess(context).read !== true) {
            throw new Error(`[${this.getFullName()}]: access denied`);
        }
        // rows
        const limit = this.getLimit();
        if (limit) {
            if (!context.params.frame)
                throw new Error('no frame param');
            context.params.offset = (context.params.frame - 1) * limit;
            context.params.limit = limit;
        }
        const query = this.isDefaultOnRowForm()
            ? this.getSingleQuery(context)
            : this.getMultipleQuery(context);
        const params = this.getSelectParams(context);
        const rows = await this.getDatabase().queryRows(context, query, params);
        this.checkRows(rows);
        // this.encodeRows(rows);
        const rawRows = this.encodeRows2(rows);
        // count
        let count = null;
        if (this.isDefaultOnTableForm() && this.getLimit()) {
            try {
                const value = await this.getDatabase().queryScalar(context, this.getCountQuery(context), params);
                count = parseInt(value, 10);
            }
            catch (err) {
                err.message = `${this.getFullName()}: ${err.message}`;
                throw err;
            }
        }
        return [rawRows, count];
    }
    async create(context, _values = null) {
        console.log('SqlDataSource.create');
        if (this.getAccess(context).create !== true) {
            throw new Error(`[${this.getFullName()}]: access denied.`);
        }
        if (!this.table) {
            throw new Error(`${this.getFullName()}: no link to table object: ${this.getAttr('table')}`);
        }
        const database = this.getAttr('database');
        const table = this.getAttr('table');
        const values = _values ? _values : this.getValuesFromRow(context.getBody().row);
        const autoColumnTypes = this.getAutoColumnTypes();
        // console.log('autoColumnTypes:', autoColumnTypes);
        const newRow = await this.getDatabase().insertRow(context, table, values, autoColumnTypes);
        console.log('newRow:', newRow);
        const key = this.getKeyFromValues(newRow);
        if (!key)
            throw new Error('insert: cannot calc row key');
        console.log('key:', key);
        const keyParams = _BkDataSource__WEBPACK_IMPORTED_MODULE_1__.BkDataSource.keyToParams(key);
        // console.log('keyParams:', keyParams);
        const singleQuery = this.getSingleQuery(context);
        // console.log('singleQuery:', singleQuery);
        // row
        const [row] = await this.getDatabase().queryRows(context, singleQuery, keyParams);
        if (!row)
            throw new Error('singleQuery does not return row');
        // console.log('row:', row);
        this.checkRow(row);
        const rawRow = this.encodeRow2(row);
        const result = new _Result__WEBPACK_IMPORTED_MODULE_3__.Result();
        _Result__WEBPACK_IMPORTED_MODULE_3__.Result.addInsertToResult(result, database, table, key);
        _Result__WEBPACK_IMPORTED_MODULE_3__.Result.addInsertExToResult(result, database, table, key, rawRow);
        return result;
    }
    async update(context) {
        console.log('SqlDataSource.update');
        if (this.getAccess(context).update !== true) {
            throw new Error(`[${this.getFullName()}]: access denied.`);
        }
        if (!this.table)
            throw new Error(`no database table desc: ${this.getAttr('table')}`);
        const databaseName = this.getAttr('database');
        const tableName = this.getAttr('table');
        const changes = this.decodeChanges(context.getBody().changes);
        // console.log('changes:', changes);
        const key = Object.keys(changes)[0];
        const where = this.getKeyValuesFromKey(key);
        const values = changes[key];
        // update row
        const updateQuery = this.getDatabase().getUpdateQuery(tableName, values, where);
        const _values = _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.mapObject(values, (name, value) => [`val_${name}`, value]);
        const _where = _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.mapObject(where, (name, value) => [`key_${name}`, value]);
        const params = Object.assign(Object.assign({}, _values), _where);
        await this.getDatabase().queryResult(context, updateQuery, params);
        // new key
        const newKey = this.calcNewKey(key, values);
        const newKeyParams = _BkDataSource__WEBPACK_IMPORTED_MODULE_1__.BkDataSource.keyToParams(newKey);
        console.log('key:', key);
        console.log('newKey:', newKey);
        console.log('newKeyParams:', newKeyParams);
        // select updated row
        const selectQuery = this.getSingleQuery(context);
        // console.log('selectQuery:', selectQuery);
        const [row] = await this.getDatabase().queryRows(context, selectQuery, newKeyParams);
        if (!row)
            throw new Error('singleQuery does not return row');
        // console.log('row:', row);
        this.checkRow(row);
        const rawRow = this.encodeRow2(row);
        // result
        const result = new _Result__WEBPACK_IMPORTED_MODULE_3__.Result();
        _Result__WEBPACK_IMPORTED_MODULE_3__.Result.addUpdateToResult(result, databaseName, tableName, key, newKey);
        _Result__WEBPACK_IMPORTED_MODULE_3__.Result.addUpdateExToResult(result, databaseName, tableName, key, rawRow);
        return result;
    }
    async delete(context) {
        if (this.getAccess(context).delete !== true) {
            throw new Error(`${this.getFullName()}: access denied`);
        }
        const { key } = context.params;
        const keyValues = this.getKeyValuesFromKey(key);
        const database = this.getAttr('database');
        const table = this.getAttr('table');
        const query = this.getDatabase().getDeleteQuery(table, keyValues);
        await this.getDatabase().queryResult(context, query, keyValues);
        const result = new _Result__WEBPACK_IMPORTED_MODULE_3__.Result();
        _Result__WEBPACK_IMPORTED_MODULE_3__.Result.addDeleteToResult(result, database, table, key);
        return result;
    }
    fillAttributes(response) {
        response.class = this.getClassName();
        response.name = this.getAttr('name');
        response.database = this.getAttr('database');
        response.table = this.getAttr('table');
    }
    /* getDbType(column): string {
        return this.getTable().getColumn(column).getDbType();
    } */
    getAutoColumns() {
        if (!this.table)
            throw new Error('getAutoColumns: no table');
        const table = this.table;
        return this.keyColumns.filter((name) => table.getColumn(name).isAuto());
    }
    getAutoColumnTypes() {
        if (!this.table)
            throw new Error('getAutoColumnTypes: no table');
        const table = this.table;
        const columns = this.getAutoColumns();
        return columns.reduce((acc, name) => {
            acc[name] = table.getColumn(name).getAttr('type');
            return acc;
        }, {});
    }
    async getBuffer(context, file) {
        return file.data;
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkDatabase/BkDatabase.ts":
/*!*************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkDatabase/BkDatabase.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkDatabase": () => (/* binding */ BkDatabase)
/* harmony export */ });
/* harmony import */ var _BkModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkModel */ "./src/backend/viewer/BkModel/BkModel.ts");
/* harmony import */ var _BkParam_BkParam__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BkParam/BkParam */ "./src/backend/viewer/BkModel/BkParam/BkParam.ts");


class BkDatabase extends _BkModel__WEBPACK_IMPORTED_MODULE_0__.BkModel {
    constructor() {
        super(...arguments);
        this.tables = [];
        this.fillCollections = ['tables'];
    }
    /* constructor(data, parent?) {
        //console.log('Database.constructor');
        super(data, parent);
    } */
    async init(context) {
        await this.createColItems('tables', context);
    }
    async deinit() {
        throw new Error(`${this.constructor.name}.deinit not implemented`);
    }
    fillAttributes(response) {
        response.name = this.getAttr('name');
    }
    async connect(context) {
        throw new Error(`${this.constructor.name}.connect not implemented`);
    }
    getConnection(context) {
        // console.log('Database.getConnection');
        if (!context)
            throw new Error('no context');
        const name = this.getName();
        if (!context.connections[name]) {
            throw new Error(`not connected: ${name}`);
        }
        return context.connections[name];
    }
    async release(context) {
        throw new Error(`${this.constructor.name}.release not implemented`);
    }
    async queryResult(context, query, params = null) {
        throw new Error(`${this.constructor.name}.queryResult not implemented`);
    }
    async queryRows(context, query, params = null) {
        throw new Error(`${this.constructor.name}.queryRows not implemented`);
    }
    async queryScalar(context, query, params = null) {
        throw new Error(`${this.constructor.name}.queryScalar not implemented`);
    }
    async begin(context) {
        throw new Error(`${this.constructor.name}.begin not implemented`);
    }
    async commit(context) {
        throw new Error(`${this.constructor.name}.commit not implemented`);
    }
    async rollback(context, err) {
        throw new Error(`${this.constructor.name}.rollback not implemented`);
    }
    createParam(name) {
        return new _BkParam_BkParam__WEBPACK_IMPORTED_MODULE_1__.BkParam(this.getColItemData('params', name), this);
    }
    getConfig() {
        const config = {
            host: this.createParam('host').getValue(),
            database: this.createParam('database').getValue(),
            user: this.createParam('user').getValue(),
            password: this.createParam('password').getValue(),
        };
        if (this.isData('params', 'port')) {
            config.port = parseInt(this.createParam('port').getValue());
        }
        return config;
    }
    getDefaultPort() {
        throw new Error(`${this.constructor.name}.getDefaultPort not implemented`);
    }
    getApp() {
        return this.parent;
    }
    findTable(name) {
        return this.tables.find((table) => table.getName() === name);
    }
    getTable(name) {
        if (!name)
            throw new Error('getTable: no name');
        const table = this.findTable(name);
        if (!table)
            throw new Error(`no table with name: ${name}`);
        return table;
        // if (!this.tables[name]) throw new Error(`no table with name: ${name}`);
        // return this.tables[name];
    }
    async insertRow(context, table, values, autoColumnTypes = {}) {
        throw new Error(`${this.constructor.name}.insertRow not implemented`);
    }
    async getTableList() {
        throw new Error(`${this.constructor.name}.getTableList not implemented`);
    }
    async getTableInfo(table) {
        throw new Error(`${this.constructor.name}.getTableInfo not implemented`);
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkDatabase/BkNoSqlDatabase/BkMongoDbDatabase/BkMongoDbDatabase.ts":
/*!******************************************************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkDatabase/BkNoSqlDatabase/BkMongoDbDatabase/BkMongoDbDatabase.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkMongoDbDatabase": () => (/* binding */ BkMongoDbDatabase)
/* harmony export */ });
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BkNoSqlDatabase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BkNoSqlDatabase */ "./src/backend/viewer/BkModel/BkDatabase/BkNoSqlDatabase/BkNoSqlDatabase.ts");


class BkMongoDbDatabase extends _BkNoSqlDatabase__WEBPACK_IMPORTED_MODULE_1__.BkNoSqlDatabase {
    async connect(context) {
        console.log('MongoDbDatabase.connect', this.getName());
        if (!context)
            throw new Error('no context');
        const name = this.getName();
        if (context.connections[name]) {
            throw new Error(`already connected: ${name}`);
        }
        const url = this.getUrl();
        const client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(url);
        console.log(`MongoDbDatabase: connecting to ${url}`);
        await client.connect();
        const session = client.startSession();
        context.connections[name] = { client, session };
    }
    getUrl() {
        // console.log('config', this.getConfig());
        const { host, user, password } = this.getConfig();
        const userPassword = user && password ? `${user}:${password}@` : '';
        const host2 = process.env.DB_HOST || host;
        return `mongodb://${userPassword}${host2}:${this.getDefaultPort()}`;
    }
    async release(context) {
        console.log('MongoDbDatabase.release', this.getName());
        if (!context)
            throw new Error('no context');
        const { client, session } = this.getConnection(context);
        session.endSession();
        await client.close();
        context.connections[this.getName()] = null;
    }
    async updateOne(context, colName, filter, update) {
        const _filter = Object.keys(filter).reduce((acc, name) => {
            acc[name] = name === '_id' ? new mongodb__WEBPACK_IMPORTED_MODULE_0__.ObjectId(filter[name]) : filter[name];
            return acc;
        }, {});
        console.log('colName', colName);
        console.log('_filter:', _filter);
        console.log('update', update);
        return await this.getDbLink(context).collection(colName).updateOne(_filter, update);
    }
    async insertOne(context, colName, document) {
        return await this.getDbLink(context).collection(colName).insertOne(document);
    }
    async deleteOne(context, colName, filter) {
        const _filter = BkMongoDbDatabase.makeObjectIds(filter);
        // console.log('_filter', _filter);
        return await this.getDbLink(context).collection(colName).deleteOne(_filter);
    }
    static makeObjectIds(filter, names = ['_id']) {
        return Object.keys(filter).reduce((acc, name) => {
            acc[name] = names.includes(name) ? new mongodb__WEBPACK_IMPORTED_MODULE_0__.ObjectId(filter[name]) : filter[name];
            return acc;
        }, {});
    }
    getDbLink(context) {
        const client = this.getConnection(context).client;
        const { database } = this.getConfig();
        return client.db(database);
    }
    async queryResult(context, query, params = null) {
        const db = this.getDbLink(context);
        // eval query as function
        const fn = query.trim().substring(0, 5) === 'async'
            ? eval(query)
            : eval(`(db, params, ObjectId) => (${query})`);
        // exec query
        const result = await fn(db, params, mongodb__WEBPACK_IMPORTED_MODULE_0__.ObjectId);
        return result;
    }
    async queryRows(context, query, params = null) {
        console.log('MongoDbDatabase.query', query, params);
        const result = await this.queryResult(context, query, params);
        // for find() and aggregate()
        if (result instanceof mongodb__WEBPACK_IMPORTED_MODULE_0__.FindCursor || result instanceof mongodb__WEBPACK_IMPORTED_MODULE_0__.AggregationCursor) {
            return await result.toArray();
        }
        // for findOne query
        return [result];
    }
    async queryScalar(context, query, params = null) {
        const rows = await this.queryRows(context, query, params);
        // console.log('rows:', rows);
        const [firstRow] = rows;
        if (!firstRow)
            throw new Error('queryScalar: no first row');
        // console.log('firstRow:', firstRow);
        const firstField = Object.keys(firstRow)[0];
        if (!firstField)
            throw new Error('queryScalar: no first field');
        return firstRow[firstField];
    }
    getDefaultPort() {
        return 27017;
    }
    async begin(context) {
        console.log('MongoDbDatabase.begin');
        this.getConnection(context).session.startTransaction();
    }
    async commit(context) {
        console.log('MongoDbDatabase.commit');
        this.getConnection(context).session.commitTransaction();
    }
    async rollback(context, err) {
        console.log('MongoDbDatabase.rollback');
        this.getConnection(context).session.abortTransaction();
    }
    async deinit() {
        console.log(`MongoDbDatabase.deinit: ${this.getName()}`);
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkDatabase/BkNoSqlDatabase/BkNoSqlDatabase.ts":
/*!**********************************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkDatabase/BkNoSqlDatabase/BkNoSqlDatabase.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkNoSqlDatabase": () => (/* binding */ BkNoSqlDatabase)
/* harmony export */ });
/* harmony import */ var _BkDatabase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkDatabase */ "./src/backend/viewer/BkModel/BkDatabase/BkDatabase.ts");

class BkNoSqlDatabase extends _BkDatabase__WEBPACK_IMPORTED_MODULE_0__.BkDatabase {
    async updateOne(context, colName, filter, update) {
        throw new Error(`${this.constructor.name}.updateOne not implemented`);
    }
    async insertOne(context, colName, document) {
        throw new Error(`${this.constructor.name}.insertOne not implemented`);
    }
    async deleteOne(context, colName, filter) {
        throw new Error(`${this.constructor.name}.deleteOne not implemented`);
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkDatabase/BkSqlDatabase/BkMySqlDatabase/BkMySqlDatabase.ts":
/*!************************************************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkDatabase/BkSqlDatabase/BkMySqlDatabase/BkMySqlDatabase.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkMySqlDatabase": () => (/* binding */ BkMySqlDatabase)
/* harmony export */ });
/* harmony import */ var mysql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mysql */ "mysql");
/* harmony import */ var mysql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mysql__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BkSqlDatabase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BkSqlDatabase */ "./src/backend/viewer/BkModel/BkDatabase/BkSqlDatabase/BkSqlDatabase.ts");


class BkMySqlDatabase extends _BkSqlDatabase__WEBPACK_IMPORTED_MODULE_1__.SqlDatabase {
    constructor() {
        super(...arguments);
        this.pool = null;
    }
    /* constructor(data, parent?) {
        super(data, parent);
        console.log('new MySqlDatabase');
    } */
    async deinit() {
        console.log(`MySqlDatabase.deinit: ${this.getName()}`);
        if (this.pool !== null) {
            await new Promise((resolve) => {
                this.pool.end(() => {
                    resolve();
                });
            });
        }
    }
    getPool() {
        //console.log('MySqlDatabase.getPool');
        if (!this.pool) {
            //console.log('creating connection pool for: ' + database);
            this.pool = (0,mysql__WEBPACK_IMPORTED_MODULE_0__.createPool)(this.getConfig());
        }
        //console.log('pool connections count: ' + this.pool._allConnections.length);
        return this.pool;
    }
    getConfig() {
        console.log('MySqlDatabase.getConfig');
        return Object.assign(Object.assign({}, super.getConfig()), { queryFormat: BkMySqlDatabase.queryFormat });
    }
    /*getDefaultPort(): number {
        return 3306;
    }*/
    static async Pool_getConnection(pool) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, cnn) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(cnn);
                }
            });
        });
    }
    async queryRows(context, query, params = null) {
        console.log('MySqlDatabase.queryRows', query, params);
        _BkSqlDatabase__WEBPACK_IMPORTED_MODULE_1__.SqlDatabase.checkParams(query, params);
        const nest = true;
        const cnn = await this.getConnection(context);
        return new Promise((resolve, reject) => {
            cnn.query({ sql: query, typeCast: BkMySqlDatabase.typeCast, nestTables: nest }, params, (err, result, fields) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (nest) {
                        const rows = this._getRows(result, fields); // for duplicate column names
                        resolve(rows);
                    }
                    else {
                        resolve(result);
                    }
                }
            });
        });
    }
    async queryResult(context, query, params = null) {
        console.log('MySqlDatabase.queryResult', query, params);
        _BkSqlDatabase__WEBPACK_IMPORTED_MODULE_1__.SqlDatabase.checkParams(query, params);
        const nest = false;
        const cnn = await this.getConnection(context);
        return new Promise((resolve, reject) => {
            cnn.query({ sql: query, typeCast: BkMySqlDatabase.typeCast, nestTables: nest }, params, (err, result, fields) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    _getRows(result, fields) {
        //console.log('MySqlDatabase._getRows');
        const fieldCount = {};
        for (let j = 0; j < fields.length; j++) {
            const f = fields[j];
            if (!fieldCount[f.name]) {
                fieldCount[f.name] = 0;
            }
            fieldCount[f.name]++;
            f.numb = fieldCount[f.name] - 1;
        }
        const rows = [];
        for (let i = 0; i < result.length; i++) {
            const r = result[i];
            const row = {};
            for (let j = 0; j < fields.length; j++) {
                const f = fields[j];
                const column = f.name + (f.numb > 0 ? f.numb : '');
                row[column] = r[f.table][f.name];
            }
            rows.push(row);
        }
        return rows;
    }
    begin(context) {
        console.log('MySqlDatabase.begin');
        const cnn = this.getConnection(context);
        return new Promise((resolve, reject) => {
            cnn.beginTransaction((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    commit(context) {
        console.log('MySqlDatabase.commit');
        const cnn = this.getConnection(context);
        return new Promise((resolve, reject) => {
            cnn.commit((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    rollback(context, err) {
        console.log('MySqlDatabase.rollback:', this.getName(), err.message);
        const cnn = this.getConnection(context);
        return new Promise((resolve, reject) => {
            cnn.rollback(() => {
                resolve();
            });
        });
    }
    static queryFormat(query, params = {}) {
        console.log('MySqlDatabase.queryFormat', query, params);
        const sql = query.replace(/\{([\w\.@]+)\}/g, (text, name) => {
            if (params.hasOwnProperty(name)) {
                return (0,mysql__WEBPACK_IMPORTED_MODULE_0__.escape)(params[name]);
            }
            throw new Error(`no query param: ${name}`);
        });
        console.log('real db sql: ' + sql);
        return sql;
    }
    static typeCast(field, next) {
        if (['DATE', 'DATETIME', 'TIME', 'TIMESTAMP'].includes(field.type)) {
            return field.string();
        }
        return next();
    }
    async getTableList() {
        console.log('MySqlDatabase.getTableList');
        const config = this.getConfig();
        return new Promise((resolve, reject) => {
            const cnn = (0,mysql__WEBPACK_IMPORTED_MODULE_0__.createConnection)(config);
            cnn.connect();
            cnn.query('show tables', (err, rows, fields) => {
                cnn.end();
                if (err) {
                    reject(err);
                }
                else {
                    //console.log('rows:', rows);
                    const tables = rows.map((row) => row[fields[0].name]);
                    console.log('tables:', tables);
                    resolve(tables);
                }
            });
        });
    }
    async getTableInfo(table) {
        console.log('MySqlDatabase.getTableInfo:', table);
        const config = this.getConfig();
        return new Promise((resolve, reject) => {
            const cnn = (0,mysql__WEBPACK_IMPORTED_MODULE_0__.createConnection)(config);
            cnn.connect();
            const query = `SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, COLUMN_KEY, COLUMN_DEFAULT, EXTRA, COLUMN_COMMENT \
FROM information_schema.columns \
WHERE table_schema = '${config.database}' and table_name = '${table}'`;
            cnn.query(query, (err, rows) => {
                cnn.end();
                if (err) {
                    reject(err);
                }
                else {
                    const tableInfo = rows.map((row) => {
                        // console.log('row:', row);
                        return {
                            name: row.COLUMN_NAME,
                            type: this.getColumnTypeByDataType(row.COLUMN_TYPE),
                            key: row.COLUMN_KEY === 'PRI',
                            auto: row.EXTRA === 'auto_increment',
                            nullable: row.IS_NULLABLE === 'YES',
                            comment: row.COLUMN_COMMENT,
                            dbType: row.COLUMN_TYPE,
                            // COLUMN_TYPE   : row.COLUMN_TYPE,
                            // COLUMN_DEFAULT: row.COLUMN_DEFAULT,
                            // EXTRA         : row.EXTRA,
                        };
                    });
                    console.log('tableInfo:', tableInfo);
                    resolve(tableInfo);
                }
            });
        });
    }
    getColumnTypeByDataType(dataType) {
        switch (dataType) {
            case 'int(10) unsigned':
            case 'int unsigned':
                return 'number';
            case 'varchar(255)':
            case 'varchar(15)':
            case 'text':
                return 'string';
            case 'datetime':
                return 'date';
            default:
                return null;
        }
    }
    async insertRow(context, table, values, autoColumnTypes = {}) {
        console.log(`MySqlDatabase.insertRow ${table}`, values, autoColumnTypes);
        const autoColumns = Object.keys(autoColumnTypes);
        if (autoColumns.length > 1)
            throw new Error('mysql does not support more than one auto increment column');
        const query = this.getInsertQuery(table, values);
        // console.log('insert query:', query, values);
        const result = await this.queryResult(context, query, values);
        // console.log('insert result:', result);
        if (autoColumns.length === 1) {
            if (!result.insertId)
                throw new Error('no insertId');
            return Object.assign({ [autoColumns[0]]: result.insertId }, values);
        }
        return Object.assign({}, values);
        /*const key = JSON.stringify([result.insertId]);
        return key;*/
        /*
        const _row = {};
        const files = {};
        for (const column in row) {
            if (row[column] instanceof Object) {
                _row[column] = '{' + column + '}';
                files[column] = row[column];
                console.error(row[column]);
            } else if (this.table.columns[column] && !this.table.columns[column].isAuto()) {
                _row[column] = row[column];
            }
        }
        console.log('_row:', _row);
        */
        /*
        const buffers = {};
        const names = Object.keys(files);
        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            const file = files[name];
            const buffer = await this.getBuffer(context, file);
            buffers[name] = buffer;
        }
        */
    }
    async connect(context) {
        console.log('MySqlDatabase.connect', this.getName());
        if (!context)
            throw new Error('no context');
        const name = this.getName();
        if (context.connections[name]) {
            throw new Error(`already connected: ${name}`);
        }
        context.connections[name] = await BkMySqlDatabase.Pool_getConnection(this.getPool());
    }
    async release(context) {
        console.log('MySqlDatabase.release', this.getName());
        if (!context)
            throw new Error('no context');
        this.getConnection(context).release();
        context.connections[this.getName()] = null;
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkDatabase/BkSqlDatabase/BkPostgreSqlDatabase/BkPostgreSqlDatabase.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkDatabase/BkSqlDatabase/BkPostgreSqlDatabase/BkPostgreSqlDatabase.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkPostgreSqlDatabase": () => (/* binding */ BkPostgreSqlDatabase)
/* harmony export */ });
/* harmony import */ var colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! colors */ "colors");
/* harmony import */ var colors__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(colors__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pg */ "pg");
/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(pg__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _BkSqlDatabase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../BkSqlDatabase */ "./src/backend/viewer/BkModel/BkDatabase/BkSqlDatabase/BkSqlDatabase.ts");



class BkPostgreSqlDatabase extends _BkSqlDatabase__WEBPACK_IMPORTED_MODULE_2__.SqlDatabase {
    constructor() {
        super(...arguments);
        this.pool = null;
    }
    /* constructor(data, parent?) {
        console.log('new PostgreSqlDatabase');
        super(data, parent);
    } */
    /*static async create(data, parent) {
        // console.log('PostgreSqlDatabase.create');
        return new PostgreSqlDatabase(data, parent);
    }*/
    async deinit() {
        console.log(`PostgreSqlDatabase.deinit: ${this.getName()}`);
        if (!this.pool)
            return;
        console.log('ending pool:', this.pool.totalCount);
        await this.pool.end();
    }
    getPool() {
        // console.log('PostgreSqlDatabase.getPool');
        if (this.pool === null) {
            const config = this.getConfig();
            // console.log('creating connection pool for: ' + this.getName(), config);
            this.pool = BkPostgreSqlDatabase.createPool(config);
        }
        return this.pool;
    }
    static createPool(config) {
        return new pg__WEBPACK_IMPORTED_MODULE_1__.Pool(config);
    }
    async connect(context) {
        console.log('PostgreSqlDatabase.connect', this.getName());
        if (!context)
            throw new Error('no context');
        const name = this.getName();
        if (context.connections[name]) {
            throw new Error(`already connected: ${name}`);
        }
        context.connections[name] = await this.getPool().connect();
    }
    async release(context) {
        console.log('PostgreSqlDatabase.release', this.getName());
        if (!context)
            throw new Error('no context');
        this.getConnection(context).release();
        context.connections[this.getName()] = null;
    }
    async queryResult(context, query, params = null) {
        if (context.query.sql) {
            console.log(colors__WEBPACK_IMPORTED_MODULE_0___default().blue('PostgreSqlDatabase.queryResult'), {
                query,
                params,
            } /*, params ? Object.keys(params).map(name => typeof params[name]) : null*/);
        }
        _BkSqlDatabase__WEBPACK_IMPORTED_MODULE_2__.SqlDatabase.checkParams(query, params);
        const { sql, values } = BkPostgreSqlDatabase.formatQuery(query, params);
        if (context.query.sql) {
            console.log('sql:', sql);
            console.log('values:', values);
        }
        const result = await this.getConnection(context).query(sql, values);
        // console.log('cnn.query result:', result);
        return result;
    }
    static async queryResult(cnn, query, params = null) {
        console.log(colors__WEBPACK_IMPORTED_MODULE_0___default().blue('static PostgreSqlDatabase.queryResult'), query /*, params*/ /*, params ? Object.keys(params).map(name => typeof params[name]) : null*/);
        _BkSqlDatabase__WEBPACK_IMPORTED_MODULE_2__.SqlDatabase.checkParams(query, params);
        const { sql, values } = BkPostgreSqlDatabase.formatQuery(query, params);
        // console.log('sql:', sql);
        // console.log('values:', values);
        const result = await cnn.query(sql, values);
        // console.log('cnn.query result:', result);
        return result;
    }
    async queryRows(context, query, params = null) {
        // console.log('PostgreSqlDatabase.queryRows'/*, query, params*/);
        const result = await this.queryResult(context, query, params);
        return result.rows;
    }
    async begin(context) {
        console.log('PostgreSqlDatabase.begin', this.getName());
        if (!context)
            throw new Error('no context');
        await this.getConnection(context).query('begin');
    }
    async commit(context) {
        console.log('PostgreSqlDatabase.commit', this.getName());
        if (!context)
            throw new Error('no context');
        await this.getConnection(context).query('commit');
    }
    async rollback(context, err) {
        console.log(colors__WEBPACK_IMPORTED_MODULE_0___default().red('PostgreSqlDatabase.rollback: '), this.getName(), err.message);
        if (!context)
            throw new Error('no context');
        await this.getConnection(context).query('rollback');
    }
    static formatQuery(query, params) {
        // console.log(`BkPostgreSqlDatabase.formatQuery: ${query}`);
        // console.log('params:', params);
        if (!params) {
            return { sql: query, values: null };
        }
        const usedValues = _BkSqlDatabase__WEBPACK_IMPORTED_MODULE_2__.SqlDatabase.getUsedParams(query);
        // console.log('usedValues:', usedValues);
        const keys = Object.keys(params).filter((key) => usedValues.indexOf(key) > -1);
        // console.log('keys:', keys);
        const values = keys.map((key) => params[key]);
        const sql = query.replace(/\{([\w\.@]+)\}/g, (text, name) => {
            if (keys.indexOf(name) > -1) {
                return `$${keys.indexOf(name) + 1}`;
            }
            return text;
        });
        return { sql, values };
    }
    getDeleteQuery(tableName, rowKeyValues) {
        // console.log('PostgreSqlDatabase.getDeleteQuery');
        const keyColumns = Object.keys(rowKeyValues);
        const whereString = keyColumns
            .map((keyColumn) => `"${keyColumn}" = {${keyColumn}}`)
            .join(' and ');
        const query = `delete from "${tableName}" where ${whereString}`;
        // console.log('query:', query);
        return query;
    }
    getUpdateQuery(tableName, values, where) {
        return BkPostgreSqlDatabase.getUpdateQuery(tableName, values, where);
    }
    static getUpdateQuery(tableName, values, where) {
        // console.log('PostgreSqlDatabase.getUpdateQuery', tableName, values, where/*, Object.keys(values).map(name => typeof values[name])*/);
        const valueKeys = Object.keys(values);
        const whereKeys = Object.keys(where);
        if (valueKeys.length === 0)
            throw new Error('getUpdateQuery: no values');
        if (whereKeys.length === 0)
            throw new Error('getUpdateQuery: no where');
        const valuesString = valueKeys.map((name) => `"${name}" = {val_${name}}`).join(', ');
        const whereString = whereKeys.map((name) => `"${name}" = {key_${name}}`).join(' and ');
        return `update "${tableName}" set ${valuesString} where ${whereString}`;
    }
    getInsertQuery(tableName, values) {
        // console.log('PostgreSqlDatabase.getInsertQuery');
        const columns = Object.keys(values);
        if (!columns.length)
            return `insert into "${tableName}" default values`;
        const columnsString = columns.map((column) => `"${column}"`).join(', ');
        const valuesString = columns.map((column) => `{${column}}`).join(', ');
        const query = `insert into "${tableName}"(${columnsString}) values (${valuesString})`;
        // console.log('query:', query);
        return query;
    }
    async getTableList() {
        console.log('PostgreSqlDatabase.getTableList');
        const rows = await this.query(`select "table_name" from information_schema.tables where table_schema = 'public'`);
        const tableList = rows.map((row) => row.table_name);
        // console.log('tableList:', tableList);
        return tableList;
    }
    async getTableInfo(table) {
        console.log('PostgreSqlDatabase.getTableInfo');
        const keyColumns = await this.getTableKeyColumns(table);
        // console.log('keyColumns:', keyColumns);
        const rows = await this.query(`select * from INFORMATION_SCHEMA.COLUMNS where table_name = '${table}' order by ordinal_position`);
        // console.log('getTableInfo rows:', rows);
        const tableInfo = rows.map((row) => ({
            name: row.column_name,
            type: this.getColumnTypeByDataType(row.data_type),
            key: !!keyColumns.find((keyColumn) => keyColumn.attname === row.column_name),
            auto: row.column_default && row.column_default.substr(0, 7) === 'nextval' ? true : false,
            nullable: row.is_nullable === 'YES',
            comment: null,
            dbType: row.data_type,
        }));
        // console.log('tableInfo:', tableInfo);
        return tableInfo;
    }
    getColumnTypeByDataType(dataType) {
        switch (dataType) {
            case 'integer':
            case 'numeric':
            case 'bigint':
                return 'number';
            case 'character varying':
            case 'text':
            case 'bytea':
                return 'string';
            case 'json':
            case 'jsonb':
            case 'ARRAY':
                return 'object';
            case 'boolean':
                return 'boolean';
            case 'timestamp with time zone':
            case 'timestamp without time zone':
                return 'date';
            default:
                return null;
        }
    }
    async getTableKeyColumns(table) {
        console.log('PostgreSqlDatabase.getTableKeyColumns');
        const rows = await this.query(`SELECT a.attname, format_type(a.atttypid, a.atttypmod) AS data_type
FROM   pg_index i
JOIN   pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
WHERE  i.indrelid = '"${table}"'::regclass AND i.indisprimary;`);
        return rows;
    }
    async query(query) {
        const config = this.getConfig();
        const client = new pg__WEBPACK_IMPORTED_MODULE_1__.Client(config);
        await client.connect();
        const results = await client.query(query);
        await client.end();
        return results.rows;
    }
    /*getDefaultPort(): number {
        return 5432;
    }*/
    async queryAutoValues(context, table, autoColumnTypes) {
        console.log('PostgreSqlDatabase.queryAutoValues', autoColumnTypes);
        const autoColumns = Object.keys(autoColumnTypes);
        if (!autoColumns.length)
            throw new Error('no auto columns');
        const queries = autoColumns.map((column) => `select currval('"${table}_${column}_seq"')`);
        const query = queries.join('; ');
        // console.log('query:', query);
        const result = await this.queryResult(context, query);
        // console.log('result:', result);
        if (result instanceof Array) {
            return autoColumns.reduce((acc, name, i) => {
                // console.log('name:', name);
                const r = result[i];
                let [{ currval: val }] = r.rows;
                if (autoColumnTypes[name] === 'number' && typeof val === 'string')
                    val = Number(val);
                if (typeof val !== autoColumnTypes[name])
                    throw new Error(`wrong type of auto value: ${typeof val}, should be ${autoColumnTypes[name]}`);
                acc[name] = val;
                return acc;
            }, {});
        }
        else {
            let [{ currval: val }] = result.rows;
            const name = autoColumns[0];
            if (autoColumnTypes[name] === 'number' && typeof val === 'string')
                val = Number(val);
            if (typeof val !== autoColumnTypes[name])
                throw new Error(`wrong type of auto value: ${typeof val}, should be ${autoColumnTypes[name]}`);
            return { [name]: val };
        }
    }
    async insertRow(context, table, values, autoColumnTypes = {}) {
        console.log(`PostgreSqlDatabase.insertRow ${table}`, values, autoColumnTypes);
        const query = this.getInsertQuery(table, values);
        // console.log('insert query:', query, values);
        const result = await this.queryResult(context, query, values);
        // console.log('insert result:', result);
        // auto
        if (Object.keys(autoColumnTypes).length > 0) {
            const auto = await this.queryAutoValues(context, table, autoColumnTypes);
            console.log('auto:', auto);
            return Object.assign(Object.assign({}, auto), values);
        }
        return Object.assign({}, values);
    }
    async queryScalar(context, query, params) {
        const rows = await this.queryRows(context, query, params);
        const row = rows[0];
        if (!row)
            throw new Error('queryScalar must return one row');
        const [column] = Object.keys(row);
        if (!column)
            throw new Error('no column in result set');
        const value = row[column];
        if (value === undefined)
            throw new Error('scalar value undefined');
        return value;
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkDatabase/BkSqlDatabase/BkSqlDatabase.ts":
/*!******************************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkDatabase/BkSqlDatabase/BkSqlDatabase.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SqlDatabase": () => (/* binding */ SqlDatabase)
/* harmony export */ });
/* harmony import */ var _BkDatabase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkDatabase */ "./src/backend/viewer/BkModel/BkDatabase/BkDatabase.ts");

class SqlDatabase extends _BkDatabase__WEBPACK_IMPORTED_MODULE_0__.BkDatabase {
    getUpdateQuery(tableName, values, where) {
        console.log('SqlDatabase.getUpdateQuery', tableName);
        const valueKeys = Object.keys(values);
        const whereKeys = Object.keys(where);
        if (valueKeys.length === 0)
            throw new Error('getUpdateQuery: no values');
        if (whereKeys.length === 0)
            throw new Error('getUpdateQuery: no where');
        const valuesString = valueKeys.map((name) => `${name} = {val_${name}}`).join(', ');
        const whereString = whereKeys.map((name) => `${name} = {key_${name}}`).join(' and ');
        return `update ${tableName} set ${valuesString} where ${whereString}`;
    }
    getInsertQuery(tableName, values) {
        console.log('SqlDatabase.getInsertQuery');
        const columns = Object.keys(values);
        const columnsString = columns.join(', ');
        const valuesString = columns.map((column) => `{${column}}`).join(', ');
        const query = `insert into ${tableName}(${columnsString}) values (${valuesString})`;
        // console.log('query:', query);
        return query;
    }
    getDeleteQuery(tableName, rowKeyValues) {
        console.log('SqlDatabase.getDeleteQuery');
        const keyColumns = Object.keys(rowKeyValues);
        const whereString = keyColumns
            .map((keyColumn) => `${keyColumn} = {${keyColumn}}`)
            .join(' and ');
        const query = `delete from ${tableName} where ${whereString}`;
        // console.log('query:', query);
        return query;
    }
    static getUsedParams(query) {
        const items = query.match(/\{([\w\.@]+)\}/g);
        if (!items)
            return [];
        return items.map((str) => str.substr(1, str.length - 2));
    }
    static checkParams(query, params) {
        const usedParams = SqlDatabase.getUsedParams(query);
        const paramNames = params ? Object.keys(params) : [];
        const notPassedParams = usedParams.filter((name) => paramNames.indexOf(name) === -1);
        // console.log('notPassedParams:', notPassedParams);
        if (notPassedParams.length > 0) {
            throw new Error(`not passed params: ${notPassedParams.join(',')}, passed: ${paramNames.join(',')}, query: ${query}`);
        }
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkField/BkCheckBoxField/BkCheckBoxField.ts":
/*!*******************************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkField/BkCheckBoxField/BkCheckBoxField.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkCheckBoxField": () => (/* binding */ BkCheckBoxField)
/* harmony export */ });
/* harmony import */ var _BkField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkField */ "./src/backend/viewer/BkModel/BkField/BkField.ts");

class BkCheckBoxField extends _BkField__WEBPACK_IMPORTED_MODULE_0__.BkField {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkField/BkCheckBoxListField/BkCheckBoxListField.ts":
/*!***************************************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkField/BkCheckBoxListField/BkCheckBoxListField.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkCheckBoxListField": () => (/* binding */ BkCheckBoxListField)
/* harmony export */ });
/* harmony import */ var _BkField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkField */ "./src/backend/viewer/BkModel/BkField/BkField.ts");

class BkCheckBoxListField extends _BkField__WEBPACK_IMPORTED_MODULE_0__.BkField {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
        response.dataSourceName = this.getAttr('dataSourceName');
        response.valueColumn = this.getAttr('valueColumn');
        response.displayColumn = this.getAttr('displayColumn');
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkField/BkComboBoxField/BkComboBoxField.ts":
/*!*******************************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkField/BkComboBoxField/BkComboBoxField.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkComboBoxField": () => (/* binding */ BkComboBoxField)
/* harmony export */ });
/* harmony import */ var _BkField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkField */ "./src/backend/viewer/BkModel/BkField/BkField.ts");

class BkComboBoxField extends _BkField__WEBPACK_IMPORTED_MODULE_0__.BkField {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
        response.placeholder = this.getAttr('placeholder');
        response.dataSourceName = this.getAttr('dataSourceName');
        response.valueColumn = this.getAttr('valueColumn');
        response.displayColumn = this.getAttr('displayColumn');
        response.newRowMode = this.getAttr('newRowMode');
        response.itemEditPage = this.getAttr('itemEditPage');
        response.itemCreatePage = this.getAttr('itemCreatePage');
        response.itemCreateForm = this.getAttr('itemCreateForm');
        response.itemSelectPage = this.getAttr('itemSelectPage');
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkField/BkDateField/BkDateField.ts":
/*!***********************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkField/BkDateField/BkDateField.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkDateField": () => (/* binding */ BkDateField)
/* harmony export */ });
/* harmony import */ var _BkField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkField */ "./src/backend/viewer/BkModel/BkField/BkField.ts");
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Helper */ "./src/backend/Helper.ts");


class BkDateField extends _BkField__WEBPACK_IMPORTED_MODULE_0__.BkField {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
        response.format = this.getAttr('format');
        // if (this.isAttr('timezone')) {
        response.timezone = this.getAttr('timezone');
        // }
        response.placeholder = this.getAttr('placeholder');
        response.validateOnChange = this.getAttr('validateOnChange');
        response.validateOnBlur = this.getAttr('validateOnBlur');
    }
    valueToRaw(value) {
        let raw;
        if (value && !this.isTimezone()) {
            const v = _Helper__WEBPACK_IMPORTED_MODULE_1__.Helper.cloneDate(value);
            _Helper__WEBPACK_IMPORTED_MODULE_1__.Helper.removeTimezoneOffset(v);
            raw = _Helper__WEBPACK_IMPORTED_MODULE_1__.Helper.encodeValue(v);
        }
        else {
            raw = _Helper__WEBPACK_IMPORTED_MODULE_1__.Helper.encodeValue(value);
        }
        // console.log('DateField.valueToRaw', this.getFullName(), value, raw);
        return raw;
    }
    rawToValue(raw) {
        const value = _Helper__WEBPACK_IMPORTED_MODULE_1__.Helper.decodeValue(raw);
        if (value && !this.isTimezone()) {
            _Helper__WEBPACK_IMPORTED_MODULE_1__.Helper.addTimezoneOffset(value);
        }
        // console.log('DateField.rawToValue', this.getFullName(), raw, value);
        return value;
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkField/BkDateTimeField/BkDateTimeField.ts":
/*!*******************************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkField/BkDateTimeField/BkDateTimeField.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkDateTimeField": () => (/* binding */ BkDateTimeField)
/* harmony export */ });
/* harmony import */ var _BkField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkField */ "./src/backend/viewer/BkModel/BkField/BkField.ts");
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Helper */ "./src/backend/Helper.ts");


class BkDateTimeField extends _BkField__WEBPACK_IMPORTED_MODULE_0__.BkField {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
        response.format = this.getAttr('format');
        response.timezone = this.getAttr('timezone');
        response.placeholder = this.getAttr('placeholder');
        response.validateOnChange = this.getAttr('validateOnChange');
        response.validateOnBlur = this.getAttr('validateOnBlur');
    }
    valueToRaw(value) {
        let raw;
        if (value && !this.isTimezone()) {
            const v = _Helper__WEBPACK_IMPORTED_MODULE_1__.Helper.cloneDate(value);
            _Helper__WEBPACK_IMPORTED_MODULE_1__.Helper.removeTimezoneOffset(v);
            raw = _Helper__WEBPACK_IMPORTED_MODULE_1__.Helper.encodeValue(v);
        }
        else {
            raw = _Helper__WEBPACK_IMPORTED_MODULE_1__.Helper.encodeValue(value);
        }
        // console.log('DateTimeField.rawToValue', this.getFullName(), value, raw);
        return raw;
    }
    rawToValue(raw) {
        const value = _Helper__WEBPACK_IMPORTED_MODULE_1__.Helper.decodeValue(raw);
        if (value && !this.isTimezone()) {
            _Helper__WEBPACK_IMPORTED_MODULE_1__.Helper.addTimezoneOffset(value);
        }
        // console.log('DateTimeField.rawToValue', this.getFullName(), raw, value);
        return value;
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkField/BkField.ts":
/*!*******************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkField/BkField.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkField": () => (/* binding */ BkField)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BkModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BkModel */ "./src/backend/viewer/BkModel/BkModel.ts");
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Helper */ "./src/backend/Helper.ts");



class BkField extends _BkModel__WEBPACK_IMPORTED_MODULE_1__.BkModel {
    /* static async create(data, parent): Promise<Field> {
        return new Field(data, parent);
    } */
    // constructor(data, parent) {
    //     super(data, parent);
    // }
    fillAttributes(response) {
        response.class = this.getClassName();
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
        response.column = this.getAttr('column');
        response.defaultValue = this.getAttr('defaultValue');
        response.value = this.getAttr('value');
        response.param = this.getAttr('param');
        response.visible = this.getAttr('visible');
        response.type = this.getAttr('type');
        response.width = this.getAttr('width');
        response.cssBlock = this.getAttr('cssBlock');
        response.viewClass = this.getAttr('viewClass');
        response.ctrlClass = this.getAttr('ctrlClass');
        response.autoFocus = this.getAttr('autoFocus');
    }
    getDirPath() {
        return path__WEBPACK_IMPORTED_MODULE_0___default().join(this.parent.getDirPath(), 'fields', this.getName());
    }
    fillDefaultValue(context, row) {
        const column = this.getAttr('column');
        if (!column)
            return;
        const defaultValue = this.getForm().replaceThis(context, this.getAttr('defaultValue'));
        const params = context.getParams();
        const js = _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.templateToJsString(defaultValue, params);
        let value;
        try {
            // @ts-ignore
            // global.Helper = Helper;
            value = eval(js);
            if (value !== undefined) {
                row[column] = this.valueToRaw(value);
            }
        }
        catch (e) {
            throw new Error(`[${this.getFullName()}] fillDefaultValue eval error: ${e.toString()}`);
        }
    }
    dumpRowValueToParams(row, params) {
        // console.log('Field.dumpRowValueToParams', this.getFullName());
        const fullName = this.getFullName();
        try {
            const column = this.getAttr('column');
            if (!column)
                throw new Error('no column attr');
            const rawValue = row[column];
            // console.log('rawValue:', rawValue);
            const value = rawValue !== undefined ? this.rawToValue(rawValue) : null;
            // console.log('value:', value);
            params[fullName] = value;
        }
        catch (err) {
            // console.log('row:', row);
            err.message = `${fullName}: ${err.message}`;
            throw err;
        }
    }
    getFullName() {
        return [this.getForm().getPage().getName(), this.getForm().getName(), this.getName()].join('.');
    }
    getApp() {
        return this.parent.parent.parent;
    }
    getPage() {
        return this.parent.parent;
    }
    getForm() {
        return this.parent;
    }
    isParam() {
        return this.isAttr('param') && this.getAttr('param') === 'true';
    }
    valueToRaw(value) {
        return _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.encodeValue(value);
    }
    rawToValue(raw) {
        return _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.decodeValue(raw);
    }
    isTimezone() {
        return this.getAttr('timezone') === 'true';
    }
    getDatabaseTableColumn() {
        if (!this.getAttr('column'))
            throw new Error(`${this.getFullName()}: column attr is empty`);
        const defaultDataSource = this.getForm().getDataSource('default');
        if (!defaultDataSource)
            throw new Error(`${this.getFullName()}: no default datasource`);
        return defaultDataSource.getTable().getColumn(this.getAttr('column'));
    }
    getType() {
        if (this.getAttr('column')) {
            return this.getDatabaseTableColumn().getAttr('type');
        }
        if (this.getAttr('type')) {
            return this.getAttr('type');
        }
        throw new Error(`${this.getFullName()}: type attr is empty`);
    }
    getDbType() {
        return this.getDatabaseTableColumn().getAttr('dbType');
    }
    valueToDbValue(value) {
        if (this.getDbType() === 'json') {
            return JSON.stringify(value);
        }
        return value;
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkField/BkFileField/BkFileField.ts":
/*!***********************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkField/BkFileField/BkFileField.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkFileField": () => (/* binding */ BkFileField)
/* harmony export */ });
/* harmony import */ var _BkField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkField */ "./src/backend/viewer/BkModel/BkField/BkField.ts");

class BkFileField extends _BkField__WEBPACK_IMPORTED_MODULE_0__.BkField {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkField/BkImageField/BkImageField.ts":
/*!*************************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkField/BkImageField/BkImageField.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkImageField": () => (/* binding */ BkImageField)
/* harmony export */ });
/* harmony import */ var _BkField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkField */ "./src/backend/viewer/BkModel/BkField/BkField.ts");

class BkImageField extends _BkField__WEBPACK_IMPORTED_MODULE_0__.BkField {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkField/BkLabelField/BkLabelField.ts":
/*!*************************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkField/BkLabelField/BkLabelField.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkLabelField": () => (/* binding */ BkLabelField)
/* harmony export */ });
/* harmony import */ var _BkField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkField */ "./src/backend/viewer/BkModel/BkField/BkField.ts");

class BkLabelField extends _BkField__WEBPACK_IMPORTED_MODULE_0__.BkField {
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkField/BkLinkField/BkLinkField.ts":
/*!***********************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkField/BkLinkField/BkLinkField.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkLinkField": () => (/* binding */ BkLinkField)
/* harmony export */ });
/* harmony import */ var _BkField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkField */ "./src/backend/viewer/BkModel/BkField/BkField.ts");

class BkLinkField extends _BkField__WEBPACK_IMPORTED_MODULE_0__.BkField {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.notNull = this.getAttr('notNull');
        response.page = this.getAttr('page');
        response.displayColumn = this.getAttr('displayColumn');
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkField/BkPasswordField/BkPasswordField.ts":
/*!*******************************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkField/BkPasswordField/BkPasswordField.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkPasswordField": () => (/* binding */ BkPasswordField)
/* harmony export */ });
/* harmony import */ var _BkField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkField */ "./src/backend/viewer/BkModel/BkField/BkField.ts");

class BkPasswordField extends _BkField__WEBPACK_IMPORTED_MODULE_0__.BkField {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
        response.placeholder = this.getAttr('placeholder');
        response.validateOnChange = this.getAttr('validateOnChange');
        response.validateOnBlur = this.getAttr('validateOnBlur');
        response.autocomplete = this.getAttr('autocomplete');
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkField/BkPhoneField/BkPhoneField.ts":
/*!*************************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkField/BkPhoneField/BkPhoneField.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkPhoneField": () => (/* binding */ BkPhoneField)
/* harmony export */ });
/* harmony import */ var _BkField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkField */ "./src/backend/viewer/BkModel/BkField/BkField.ts");

class BkPhoneField extends _BkField__WEBPACK_IMPORTED_MODULE_0__.BkField {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
        response.placeholder = this.getAttr('placeholder');
        response.validateOnChange = this.getAttr('validateOnChange');
        response.validateOnBlur = this.getAttr('validateOnBlur');
        response.autocomplete = this.getAttr('autocomplete');
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkField/BkRadioField/BkRadioField.ts":
/*!*************************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkField/BkRadioField/BkRadioField.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkRadioField": () => (/* binding */ BkRadioField)
/* harmony export */ });
/* harmony import */ var _BkField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkField */ "./src/backend/viewer/BkModel/BkField/BkField.ts");

class BkRadioField extends _BkField__WEBPACK_IMPORTED_MODULE_0__.BkField {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
        response.dataSourceName = this.getAttr('dataSourceName');
        response.valueColumn = this.getAttr('valueColumn');
        response.displayColumn = this.getAttr('displayColumn');
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkField/BkTextAreaField/BkTextAreaField.ts":
/*!*******************************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkField/BkTextAreaField/BkTextAreaField.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkTextAreaField": () => (/* binding */ BkTextAreaField)
/* harmony export */ });
/* harmony import */ var _BkField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkField */ "./src/backend/viewer/BkModel/BkField/BkField.ts");

class BkTextAreaField extends _BkField__WEBPACK_IMPORTED_MODULE_0__.BkField {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
        response.rows = this.getAttr('rows');
        response.cols = this.getAttr('cols');
        response.validateOnChange = this.getAttr('validateOnChange');
        response.validateOnBlur = this.getAttr('validateOnBlur');
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkField/BkTextBoxField/BkTextBoxField.ts":
/*!*****************************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkField/BkTextBoxField/BkTextBoxField.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkTextBoxField": () => (/* binding */ BkTextBoxField)
/* harmony export */ });
/* harmony import */ var _BkField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkField */ "./src/backend/viewer/BkModel/BkField/BkField.ts");

class BkTextBoxField extends _BkField__WEBPACK_IMPORTED_MODULE_0__.BkField {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
        response.placeholder = this.getAttr('placeholder');
        response.validateOnChange = this.getAttr('validateOnChange');
        response.validateOnBlur = this.getAttr('validateOnBlur');
        response.autocomplete = this.getAttr('autocomplete');
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkField/BkTimeField/BkTimeField.ts":
/*!***********************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkField/BkTimeField/BkTimeField.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkTimeField": () => (/* binding */ BkTimeField)
/* harmony export */ });
/* harmony import */ var _BkField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkField */ "./src/backend/viewer/BkModel/BkField/BkField.ts");

class BkTimeField extends _BkField__WEBPACK_IMPORTED_MODULE_0__.BkField {
    fillAttributes(response) {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
        response.placeholder = this.getAttr('placeholder');
        response.validateOnChange = this.getAttr('validateOnChange');
        response.validateOnBlur = this.getAttr('validateOnBlur');
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkForm/BkForm.ts":
/*!*****************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkForm/BkForm.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkForm": () => (/* binding */ BkForm)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BkModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BkModel */ "./src/backend/viewer/BkModel/BkModel.ts");
/* harmony import */ var _MyError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../MyError */ "./src/backend/MyError.ts");



class BkForm extends _BkModel__WEBPACK_IMPORTED_MODULE_1__.BkModel {
    constructor(data, parent) {
        super(data, parent);
        this.dataSources = [];
        this.actions = [];
        this.fields = [];
        this.fillCollections = ['dataSources', 'actions', 'fields'];
    }
    async init(context) {
        await this.createColItems('dataSources', context);
        await this.createColItems('actions', context);
        await this.createColItems('fields', context);
    }
    getDirPath() {
        return path__WEBPACK_IMPORTED_MODULE_0___default().join(this.parent.getDirPath(), 'forms', this.getName());
    }
    fillAttributes(response) {
        response.class = this.getClassName();
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
        response.visible = this.getAttr('visible');
        response.cssBlock = this.getAttr('cssBlock');
        response.viewClass = this.getAttr('viewClass');
        response.ctrlClass = this.getAttr('ctrlClass');
    }
    async fill(context) {
        // console.log('Form.fill', this.constructor.name, this.getFullName());
        if (this.getDataSource('default')) {
            return super.fill(context);
        }
        // surrogate data source response
        const dataSourceResponse = this._getSurrogateDataSourceResponse(context);
        this.dumpRowToParams(dataSourceResponse.rows[0], context.querytime.params);
        const response = await super.fill(context);
        response.dataSources.push(dataSourceResponse);
        return response;
    }
    /*getDefaultDataSource() {
        return this.getDataSource('default');
    }*/
    _getSurrogateDataSourceResponse(context) {
        const row = {
            id: 1,
        };
        for (const field of this.fields) {
            field.fillDefaultValue(context, row);
        }
        return {
            class: 'DataSource',
            name: 'default',
            keyColumns: ['id'],
            rows: [row],
        };
    }
    dumpRowToParams(row, params) {
        for (const field of this.fields) {
            if (field.isParam()) {
                field.dumpRowValueToParams(row, params);
            }
        }
        //console.log(params);
    }
    replaceThis(context, query) {
        return query
            .replace(/\{([@\w\.]+)\}/g, (text, name) => {
            if (name.indexOf('.') !== -1) {
                const arr = name.split('.');
                if (arr[0] === 'this') {
                    arr[0] = this.getPage().getName();
                }
                return '{' + arr.join('.') + '}';
            }
            return text;
        })
            .replace(/\[([@\w\.]+)\]/g, (text, name) => {
            if (name.indexOf('.') !== -1) {
                const arr = name.split('.');
                if (arr[0] === 'this') {
                    arr[0] = this.getPage().getName();
                }
                return '[' + arr.join('.') + ']';
            }
            return text;
        });
    }
    async rpc(name, context) {
        console.log('Form.rpc', name, context.getBody());
        if (this[name])
            return await this[name](context);
        throw new _MyError__WEBPACK_IMPORTED_MODULE_2__.MyError({
            message: `no rpc ${this.constructor.name}.${name}`,
            data: { method: `${this.constructor.name}.rpc` },
            context,
        });
    }
    getApp() {
        return this.parent.parent;
    }
    getPage() {
        return this.parent;
    }
    getFullName() {
        return `${this.getPage().getName()}.${this.getName()}`;
    }
    isNewMode(context) {
        return !!context.getBody().newMode;
    }
    getField(name) {
        return this.fields.find((field) => field.getName() === name);
    }
    getDataSource(name) {
        return this.dataSources.find((dataSource) => dataSource.getName() === name);
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkForm/BkRowForm/BkRowForm.ts":
/*!******************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkForm/BkRowForm/BkRowForm.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkRowForm": () => (/* binding */ BkRowForm)
/* harmony export */ });
/* harmony import */ var _BkForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkForm */ "./src/backend/viewer/BkModel/BkForm/BkForm.ts");

class BkRowForm extends _BkForm__WEBPACK_IMPORTED_MODULE_0__.BkForm {
    // constructor(data, parent) {
    //     super(data, parent);
    //     // console.log('RowForm.constructor', this.getFullName());
    // }
    // async fill(context) {
    //     console.log('RowForm.fill', this.constructor.name, this.getFullName());
    //     return super.fill(context);
    // }
    isNewMode(context) {
        if (this.isAttr('newMode')) {
            const newMode = this.getAttr('newMode');
            if (newMode === 'true')
                return true;
            if (newMode === 'false')
                return false;
        }
        return super.isNewMode(context);
    }
    fillAttributes(response) {
        super.fillAttributes(response);
        response.newMode = this.getAttr('newMode');
        response.refreshButton = this.getAttr('refreshButton');
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkForm/BkTableForm/BkTableForm.ts":
/*!**********************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkForm/BkTableForm/BkTableForm.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkTableForm": () => (/* binding */ BkTableForm)
/* harmony export */ });
/* harmony import */ var _BkForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkForm */ "./src/backend/viewer/BkModel/BkForm/BkForm.ts");

class BkTableForm extends _BkForm__WEBPACK_IMPORTED_MODULE_0__.BkForm {
    /*static async create(data, parent) {
        return new TableForm(data, parent);
    }*/
    // async fill(context) {
    //     console.log('TableForm.fill', this.constructor.name, this.getFullName());
    //     return super.fill(context);
    // }
    fillAttributes(response) {
        super.fillAttributes(response);
        response.editMethod = this.getAttr('editMethod');
        response.itemEditPage = this.getAttr('itemEditPage');
        response.itemCreatePage = this.getAttr('itemCreatePage');
        response.newRowMode = this.getAttr('newRowMode');
        response.deleteRowMode = this.getAttr('deleteRowMode');
        response.refreshButton = this.getAttr('refreshButton');
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkModel.ts":
/*!***********************************************!*\
  !*** ./src/backend/viewer/BkModel/BkModel.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkModel": () => (/* binding */ BkModel)
/* harmony export */ });
/* harmony import */ var _BaseModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BaseModel */ "./src/backend/BaseModel.ts");

class BkModel extends _BaseModel__WEBPACK_IMPORTED_MODULE_0__.BaseModel {
    constructor() {
        super(...arguments);
        this.fillCollections = [];
    }
    /* constructor(data: any, parent?: any) {
        super(data, parent);
    } */
    async init(context) { }
    async fill(context) {
        // console.log('Model.fill', this.constructor.name, this.getName());
        const response = {};
        this.fillAttributes(response);
        for (const colName of this.fillCollections) {
            await this.fillCollection(response, colName, context);
        }
        return response;
    }
    fillAttributes(response) {
        throw new Error(`${this.constructor.name}.fillAttributes not implemented`);
        /*response.class = this.getClassName();
        for (const name in this.attributes()) {
            response[name] = this.getAttr(name);
        }*/
    }
    isBackOnly() {
        return this.isAttr('backOnly') && this.getAttr('backOnly') === 'true';
    }
    async fillCollection(response, colName, context) {
        if (!this[colName])
            return;
        response[colName] = [];
        for (const model of this[colName]) {
            if (model.isBackOnly()) {
                continue;
            }
            const itemResponse = await model.fill(context);
            response[colName].push(itemResponse);
        }
    }
    async createColItems(colName, context) {
        // console.log(`Model.createColItems ${this.getName()}.${colName}`);
        for (const itemData of this.getCol(colName)) {
            await this.createColItem(colName, itemData, context);
        }
    }
    async createColItem(colName, itemData, context) {
        try {
            const model = await this.createChildModel(colName, itemData);
            await model.init(context);
            this[colName].push(model);
        }
        catch (err) {
            const name = _BaseModel__WEBPACK_IMPORTED_MODULE_0__.BaseModel.getName(itemData);
            const className = _BaseModel__WEBPACK_IMPORTED_MODULE_0__.BaseModel.getClassName(itemData);
            err.message = `${className}[${name}]: ${err.message}`;
            throw err;
        }
    }
    async createChildModel(colName, itemData) {
        // app custom class
        const modelClass = _BaseModel__WEBPACK_IMPORTED_MODULE_0__.BaseModel.getAttr(itemData, 'modelClass');
        if (modelClass) {
            const CustomClass = global[modelClass];
            if (!CustomClass)
                throw new Error(`no class global.${modelClass}`);
            return new CustomClass(itemData, this);
        }
        // lib class
        const className = _BaseModel__WEBPACK_IMPORTED_MODULE_0__.BaseModel.getClassName(itemData);
        const backend = __webpack_require__(/*! ../../../backend */ "./src/backend/index.ts");
        const Class = backend[`Bk${className}`];
        if (!Class)
            throw new Error(`no class backend.${className}`);
        return new Class(itemData, this);
    }
    getDirPath() {
        return null;
    }
    async rpc(name, context) {
        throw new Error(`${this.constructor.name}.rpc not implemented`);
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkPage/BkPage.ts":
/*!*****************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkPage/BkPage.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkPage": () => (/* binding */ BkPage)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BkModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BkModel */ "./src/backend/viewer/BkModel/BkModel.ts");
/* harmony import */ var _MyError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../MyError */ "./src/backend/MyError.ts");



class BkPage extends _BkModel__WEBPACK_IMPORTED_MODULE_1__.BkModel {
    constructor() {
        super(...arguments);
        this.dataSources = [];
        this.actions = [];
        this.forms = [];
    }
    async init(context) {
        await this.createColItems('dataSources', context);
        await this.createColItems('actions', context);
        await this.createColItems('forms', context);
    }
    getDirPath() {
        return path__WEBPACK_IMPORTED_MODULE_0___default().join(this.parent.getDirPath(), 'pages', this.getName());
    }
    fillAttributes(response) {
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
        response.cssBlock = this.getAttr('cssBlock');
        response.viewClass = this.getAttr('viewClass');
        response.ctrlClass = this.getAttr('ctrlClass');
        if (this.isAttr('formInTab')) {
            response.formInTab = this.getAttr('formInTab');
        }
    }
    async fill(context) {
        // console.log('Page.fill', this.constructor.name, this.getFullName());
        const response = await super.fill(context);
        await this.fillCollection(response, 'dataSources', context);
        await this.fillCollection(response, 'actions', context);
        await this.fillCollection(response, 'forms', context);
        response.newMode = !!context.getBody().newMode;
        return response;
    }
    async rpc(name, context) {
        console.log('Page.rpc', name, context.getBody());
        if (this[name])
            return await this[name](context);
        throw new _MyError__WEBPACK_IMPORTED_MODULE_2__.MyError({
            message: `no rpc ${this.constructor.name}.${name}`,
            data: { method: `${this.constructor.name}.rpc` },
            context,
        });
    }
    getApp() {
        return this.parent;
    }
    getForm(name) {
        return this.forms.find((form) => form.getName() === name);
    }
    getDataSource(name) {
        return this.dataSources.find((dataSource) => dataSource.getName() === name);
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkPageLink/BkPageLink.ts":
/*!*************************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkPageLink/BkPageLink.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkPageLink": () => (/* binding */ BkPageLink)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BkModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BkModel */ "./src/backend/viewer/BkModel/BkModel.ts");


class BkPageLink extends _BkModel__WEBPACK_IMPORTED_MODULE_1__.BkModel {
    getPageFilePath() {
        const pageFilePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(this.getParent().getDirPath(), this.getAttr('fileName'));
        return pageFilePath;
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkParam/BkParam.ts":
/*!*******************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkParam/BkParam.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkParam": () => (/* binding */ BkParam)
/* harmony export */ });
/* harmony import */ var _BkModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkModel */ "./src/backend/viewer/BkModel/BkModel.ts");

class BkParam extends _BkModel__WEBPACK_IMPORTED_MODULE_0__.BkModel {
    getValue() {
        // console.log('Param.getValue', this.getName());
        const value = this.getAttr('value');
        const app = this.getApp();
        return value.replace(/\{([@\w\.]+)\}/g, (text, name) => {
            return app.getEnvVarValue(name);
        });
    }
    getApp() {
        return this.parent.getApp();
    }
}


/***/ }),

/***/ "./src/backend/viewer/BkModel/BkTable/BkTable.ts":
/*!*******************************************************!*\
  !*** ./src/backend/viewer/BkModel/BkTable/BkTable.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BkTable": () => (/* binding */ BkTable)
/* harmony export */ });
/* harmony import */ var _BkModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BkModel */ "./src/backend/viewer/BkModel/BkModel.ts");

class BkTable extends _BkModel__WEBPACK_IMPORTED_MODULE_0__.BkModel {
    constructor(data, parent) {
        super(data, parent);
        this.columns = [];
        // console.log('Table.constructor', this.getName());
        this.fillCollections = ['columns'];
    }
    async init(context) {
        await this.createColItems('columns', context);
    }
    getKeyColumns() {
        // console.log('Table.getKeyColumns');
        const keyColumns = this.columns
            .filter((column) => column.isKey())
            .map((column) => column.getName());
        // const keyColumns = Object.keys(this.columns).filter(name => this.columns[name].isKey());
        if (keyColumns.length === 0)
            throw new Error(`no key columns in table: ${this.getName()}`);
        return keyColumns;
    }
    getApp() {
        return this.parent.parent;
    }
    getColumn(name) {
        const column = this.columns.find((column) => column.getName() === name);
        if (!column)
            throw new Error(`no column ${name}`);
        return column;
    }
    fillAttributes(response) {
        response.name = this.getAttr('name');
    }
}


/***/ }),

/***/ "./src/backend/viewer/ViewerModule.tsx":
/*!*********************************************!*\
  !*** ./src/backend/viewer/ViewerModule.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewerModule": () => (/* binding */ ViewerModule)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Helper */ "./src/backend/Helper.ts");
/* harmony import */ var _MyError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../MyError */ "./src/backend/MyError.ts");
/* harmony import */ var _Result__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Result */ "./src/Result.ts");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Links__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Links */ "./src/backend/Links.tsx");
/* harmony import */ var _Scripts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Scripts */ "./src/backend/Scripts.tsx");








const pkg = __webpack_require__(/*! ../../../package.json */ "./package.json");
// post actions
const ACTIONS = [
    'page',
    'select',
    'insert',
    'update',
    '_delete',
    'rpc',
    'logout',
    'test',
];
class ViewerModule {
    constructor(hostApp) {
        this.hostApp = hostApp;
    }
    async init() {
        console.log('ViewerModule.init', 'getFrontendDirPath:', this.hostApp.getFrontendDirPath());
        this.css = (await _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.getFilePaths(path__WEBPACK_IMPORTED_MODULE_1___default().join(this.hostApp.getFrontendDirPath(), 'viewer/public'), 'css')).map((path) => `/viewer/public/${path}`);
        this.js = (await _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.getFilePaths(path__WEBPACK_IMPORTED_MODULE_1___default().join(this.hostApp.getFrontendDirPath(), 'viewer/public'), 'js')).map((path) => `/viewer/public/${path}`);
        console.log('ViewerModule.css:', this.css);
        console.log('ViewerModule.js:', this.js);
        if (!this.js.length)
            throw new Error('no qforms js');
    }
    getLinks() {
        return this.css;
    }
    getScripts() {
        return this.js;
    }
    async handleViewerGet(context, application) {
        console.log('ViewerModule.handleViewerGet', context.query /*, Object.keys(context.query).map(name => typeof context.query[name])*/);
        if (application.isAuthentication() &&
            !(context.getReq().session.user && context.getReq().session.user[context.getRoute()])) {
            await this.loginGet(context, application);
        }
        else {
            await application.connect(context);
            try {
                await application.initContext(context);
                const response = await application.fill(context);
                const links = react_dom_server__WEBPACK_IMPORTED_MODULE_5___default().renderToStaticMarkup((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Links__WEBPACK_IMPORTED_MODULE_6__.Links, { links: [...this.getLinks(), ...application.links] }));
                const scripts = react_dom_server__WEBPACK_IMPORTED_MODULE_5___default().renderToStaticMarkup((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Scripts__WEBPACK_IMPORTED_MODULE_7__.Scripts, { scripts: [...this.getScripts(), ...application.scripts] }));
                const html = this.render(pkg.version, application, context, response, links, scripts);
                context.getRes().end(html);
            }
            finally {
                await application.release(context);
            }
        }
    }
    render(version, application, context, response, links, scripts) {
        return `<!DOCTYPE html>
<html class="${application.getViewClassName()} ${application.getAttr('theme')} ${context.query.debug === '1' ? 'debug' : ''}" lang="${application.getAttr('lang')}">
<head>
    <!-- qforms v${version} -->
    <!-- app v${application.getVersion()}  -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <!-- links -->
    ${links}
    <!-- scripts -->
    ${scripts}
    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            const data = JSON.parse(document.querySelector('script[type="application/json"]').textContent);
            const frontHostApp = new ViewerFrontHostApp({data});
            await frontHostApp.run();
        });
    </script>
    <script type="application/json">${JSON.stringify(response /*, null, 4*/)}</script>
</head>
<body class="${application.getViewClassName()}__body">
    <div class="${application.getViewClassName()}__root"></div>
    <div class="alert-root"></div>
</body>
</html>`;
    }
    async loginGet(context, application) {
        console.log('ViewerModule.loginGet');
        const links = react_dom_server__WEBPACK_IMPORTED_MODULE_5___default().renderToStaticMarkup((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Links__WEBPACK_IMPORTED_MODULE_6__.Links, { links: [...this.getLinks(), ...application.links] }));
        const scripts = react_dom_server__WEBPACK_IMPORTED_MODULE_5___default().renderToStaticMarkup((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Scripts__WEBPACK_IMPORTED_MODULE_7__.Scripts, { scripts: [...this.getScripts(), ...application.scripts] }));
        const html = this.renderLogin(pkg.version, context, application, links, scripts, {
            name: application.getName(),
            text: application.getText(),
            title: application.getTitle(context),
            errMsg: null,
            username: context.query.username,
        });
        context.getRes().end(html);
    }
    renderLogin(version, context, application, links, scripts, data) {
        return `<!DOCTYPE html>
<html class="${application.getLoginViewClassName()}" lang="${application.getAttr('lang')}">
<head>
    <!-- qforms v${version} -->
    <!-- app v${application.getVersion()}  -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${application.getTitle(context)} - ${application.getText().login.login}</title>
    <!-- links -->
    ${links}
    <!-- scripts -->
    ${scripts}
    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            const data = JSON.parse(document.querySelector('script[type="application/json"]').textContent);
            const frontHostApp = new LoginFrontHostApp(data);
            await frontHostApp.run();
        });
    </script>
    <script type="application/json">${JSON.stringify(data /*, null, 4*/)}</script>
</head>
<body class="${application.getLoginViewClassName()}__body">
    <div class="${application.getLoginViewClassName()}__root"></div>
</body>
</html>`;
    }
    async handleViewerPost(context, application) {
        // console.log('ViewerModule.handleViewerPost');
        if (context.getReq().body.action === 'login') {
            await this.loginPost(context, application);
        }
        else {
            if (application.isAuthentication() &&
                !(context.getReq().session.user &&
                    context.getReq().session.user[context.getRoute()])) {
                throw new _MyError__WEBPACK_IMPORTED_MODULE_3__.MyError({ message: 'Unauthorized', status: 401, context });
            }
            if (ACTIONS.indexOf(context.getReq().body.action) === -1) {
                throw new Error(`unknown action: ${context.getReq().body.action}`);
            }
            return await this[context.getReq().body.action](context, application);
        }
    }
    async loginPost(context, application) {
        console.log('ViewerModule.loginPost');
        const req = context.getReq();
        const res = context.getRes();
        if (req.body.tzOffset === undefined)
            throw new Error('no tzOffset');
        if (req.body.username === undefined)
            throw new Error('no username');
        if (req.body.password === undefined)
            throw new Error('no password');
        // const application = this.getApplication(context);
        await application.connect(context);
        try {
            const user = await application.authenticate(context, req.body.username, req.body.password);
            if (user) {
                if (!user.id)
                    throw new Error('no user id');
                if (!user.name)
                    throw new Error('no user name');
                if (req.session.user === undefined) {
                    req.session.user = {};
                }
                req.session.ip = context.getIp();
                req.session.tzOffset = JSON.parse(req.body.tzOffset);
                req.session.user[context.getRoute()] = user;
                res.redirect(req.url);
                this.getHostApp().logEvent(context, `login ${application.getName()}/${context.getDomain()} ${user.name}`);
            }
            else {
                // const users = await application.getUsers(context);
                const links = react_dom_server__WEBPACK_IMPORTED_MODULE_5___default().renderToStaticMarkup((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Links__WEBPACK_IMPORTED_MODULE_6__.Links, { links: [...this.getLinks(), ...application.links] }));
                const scripts = react_dom_server__WEBPACK_IMPORTED_MODULE_5___default().renderToStaticMarkup((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Scripts__WEBPACK_IMPORTED_MODULE_7__.Scripts, { scripts: [...this.getScripts(), ...application.scripts] }));
                const html = this.renderLogin(pkg.version, context, application, links, scripts, {
                    name: application.getName(),
                    text: application.getText(),
                    title: application.getTitle(context),
                    errMsg: application.getText().login.WrongUsernameOrPassword,
                    username: req.body.username,
                    password: req.body.password,
                });
                res.end(html);
            }
        }
        finally {
            await application.release(context);
        }
    }
    // action (fill page)
    async page(context, application) {
        console.log('ViewerModule.page', context.getReq().body.page);
        const req = context.getReq();
        const res = context.getRes();
        await application.connect(context);
        try {
            await application.initContext(context);
            const page = await application.getPage(context, req.body.page);
            const response = await page.fill(context);
            if (response === undefined)
                throw new Error('page action: response is undefined');
            await res.json({ page: response });
        }
        finally {
            await application.release(context);
        }
    }
    // action
    async select(context, application) {
        console.log('ViewerModule.select', context.getReq().body.page);
        const req = context.getReq();
        const res = context.getRes();
        const start = Date.now();
        let dataSource;
        if (req.body.page) {
            const page = await application.getPage(context, req.body.page);
            if (req.body.form) {
                dataSource = page.getForm(req.body.form).getDataSource(req.body.ds);
            }
            else {
                dataSource = page.getDataSource(req.body.ds);
            }
        }
        else {
            dataSource = application.getDataSource(req.body.ds);
        }
        await dataSource.getDatabase().connect(context);
        try {
            await application.initContext(context);
            const [rows, count] = await dataSource.read(context);
            const time = Date.now() - start;
            console.log('select time:', time);
            await res.json({ rows, count, time });
            return time;
        }
        finally {
            await dataSource.getDatabase().release(context);
        }
    }
    // action
    async insert(context, application) {
        console.log('ViewerModule.insert', context.getReq().body.page);
        const req = context.getReq();
        const res = context.getRes();
        // const application = this.getApplication(context);
        const page = await application.getPage(context, req.body.page);
        const form = page.getForm(req.body.form);
        const dataSource = form.getDataSource('default');
        const database = dataSource.getDatabase();
        await database.connect(context);
        try {
            await application.initContext(context);
            await database.begin(context);
            try {
                const result = await dataSource.create(context);
                if (result === undefined)
                    throw new Error('insert action: result is undefined');
                await database.commit(context);
                await res.json(result);
                this.hostApp.broadcastResult(application, context, result);
            }
            catch (err) {
                await database.rollback(context, err);
                throw err;
            }
        }
        finally {
            await database.release(context);
        }
    }
    // action
    async update(context, application) {
        console.log('ViewerModule.update', context.getReq().body.page);
        const req = context.getReq();
        const res = context.getRes();
        // const application = this.getApplication(context);
        const page = await application.getPage(context, req.body.page);
        const form = page.getForm(req.body.form);
        const dataSource = form.getDataSource('default');
        const database = dataSource.getDatabase();
        await database.connect(context);
        try {
            await application.initContext(context);
            await database.begin(context);
            try {
                const result = await dataSource.update(context);
                if (result === undefined)
                    throw new Error('action update: result is undefined');
                await database.commit(context);
                await res.json(result);
                this.hostApp.broadcastResult(application, context, result);
            }
            catch (err) {
                await database.rollback(context, err);
                throw err;
            }
        }
        finally {
            await database.release(context);
        }
    }
    // action
    async _delete(context, application) {
        console.log('ViewerModule._delete', context.getReq().body.page);
        const req = context.getReq();
        const res = context.getRes();
        // const application = this.getApplication(context);
        const page = await application.getPage(context, req.body.page);
        const form = page.getForm(req.body.form);
        const dataSource = form.getDataSource('default');
        const database = dataSource.getDatabase();
        await database.connect(context);
        try {
            await application.initContext(context);
            await database.begin(context);
            try {
                const result = await dataSource.delete(context);
                if (result === undefined)
                    throw new Error('delete result is undefined');
                await database.commit(context);
                await res.json(result);
                this.hostApp.broadcastResult(application, context, result);
            }
            catch (err) {
                await database.rollback(context, err);
                throw err;
            }
        }
        finally {
            await database.release(context);
        }
    }
    // action
    async rpc(context, application) {
        console.log('ViewerModule.rpc', context.getReq().body);
        const req = context.getReq();
        const res = context.getRes();
        // const application = this.getApplication(context);
        // await application.initContext(context);
        let model;
        if (req.body.page) {
            if (req.body.form) {
                const page = await application.getPage(context, req.body.page);
                model = page.getForm(req.body.form);
            }
            else {
                model = await application.getPage(context, req.body.page);
            }
        }
        else {
            model = application;
        }
        try {
            const result = await model.rpc(req.body.name, context);
            if (result === undefined)
                throw new Error('rpc action: result is undefined');
            if (Array.isArray(result)) {
                const [response, _result] = result;
                await res.json(response);
                if (!(_result instanceof _Result__WEBPACK_IMPORTED_MODULE_4__.Result)) {
                    throw new Error('_result is not Result');
                }
                this.hostApp.broadcastResult(application, context, _result);
            }
            else {
                await res.json(result);
                if (result instanceof _Result__WEBPACK_IMPORTED_MODULE_4__.Result) {
                    this.hostApp.broadcastResult(application, context, result);
                }
            }
        }
        catch (err) {
            const errorMessage = err.message;
            err.message = `rpc error ${req.body.name}: ${err.message}`;
            err.context = context;
            await this.hostApp.logError(err, req);
            await res.json({ errorMessage });
        }
    }
    // action
    async logout(context, application) {
        console.log('ViewerModule.logout');
        const req = context.getReq();
        const res = context.getRes();
        if (!req.session.user || !req.session.user[context.getRoute()]) {
            throw new Error(`no user for route ${context.getRoute()}`);
        }
        delete req.session.user[context.getRoute()];
        await _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.Session_save(req.session);
        await res.json(null);
    }
    // action
    async test(context, application) {
        console.log('ViewerModule.test', context.getReq().body);
        const req = context.getReq();
        const res = context.getRes();
        // const result = await Test[req.body.name](req, res, context, application);
        // if (result === undefined) throw new Error('test action: result is undefined');
        await res.json(null);
    }
    async handleViewerGetFile(context, application, next) {
        await application.handleGetFile(context, next);
    }
    getHostApp() {
        return this.hostApp;
    }
}


/***/ }),

/***/ "./src/backend/viewer/text/index.ts":
/*!******************************************!*\
  !*** ./src/backend/viewer/text/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "en": () => (/* reexport default export from named module */ _en_json__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   "ru": () => (/* reexport default export from named module */ _ru_json__WEBPACK_IMPORTED_MODULE_1__)
/* harmony export */ });
/* harmony import */ var _en_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./en.json */ "./src/backend/viewer/text/en.json");
/* harmony import */ var _ru_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ru.json */ "./src/backend/viewer/text/ru.json");





/***/ }),

/***/ "./src/frontend/common/FrontHostApp.ts":
/*!*********************************************!*\
  !*** ./src/frontend/common/FrontHostApp.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FrontHostApp": () => (/* binding */ FrontHostApp)
/* harmony export */ });
class FrontHostApp {
    constructor() {
        // console.log('FrontHostApp.constructor');
        this.alertCtrl = null;
        // window
        window.addEventListener('error', this.onWindowError.bind(this));
        window.addEventListener('unhandledrejection', this.onWindowUnhandledrejection.bind(this));
        window.addEventListener('popstate', this.onWindowPopState.bind(this));
        // window.onunhandledrejection = this.onunhandledrejection.bind(this);
        // window.onerror              = this.errorHandler.bind(this);
        // window.onbeforeunload       = this.exit.bind(this);
    }
    async run() {
        throw new Error('FrontHostApp.run not implemented');
    }
    async onWindowUnhandledrejection(e) {
        console.log('FrontHostApp.onWindowUnhandledrejection' /*, e*/);
        try {
            e.preventDefault();
            const err = e instanceof Error ? e : e.reason || e.detail.reason;
            this.logError(err);
            await this.alert({ title: 'Unhandled Rejection', message: err.message });
        }
        catch (err) {
            console.error(`onWindowUnhandledrejection error: ${err.message}`);
        }
    }
    async onWindowError(e) {
        console.log('FrontHostApp.onWindowError', e);
        try {
            e.preventDefault();
            const err = e.error;
            this.logError(err);
            // await this.alert({message: err.message});
        }
        catch (err) {
            console.error(`onWindowError error: ${err.message}`);
        }
    }
    static async doHttpRequest(data) {
        console.warn('FrontHostApp.doHttpRequest', 'POST', window.location.href, data);
        const [headers, body] = await FrontHostApp.postJson(window.location.href, data);
        console.warn(`body ${data.page}.${data.form}.${data.ds || data.name}.${data.action}:`, body);
        return body;
    }
    logError(err) {
        console.error('FrontHostApp.logError', err);
    }
    static async doHttpRequest2(data) {
        console.warn('FrontHostApp.doHttpRequest2', 'POST', window.location.href, data);
        const [headers, body] = await FrontHostApp.postJson(window.location.href, data);
        console.warn(`body ${data.page}.${data.form}.${data.ds || data.name}.${data.action}:`, body);
        return [headers, body];
    }
    static async postJson(url, data) {
        return await FrontHostApp.post(url, JSON.stringify(data), 'application/json;charset=utf-8');
    }
    static async post(url, body, contentType) {
        try {
            FrontHostApp.startWait();
            const response = await fetch(url, Object.assign({ method: 'POST', body: body }, (contentType ? { headers: { 'Content-Type': contentType } } : {})));
            if (response.ok) {
                const headers = Array.from(response.headers.entries()).reduce((acc, header) => {
                    const [name, value] = header;
                    acc[name] = value;
                    return acc;
                }, {});
                // console.log('headers:', headers);
                const body = await response.json();
                return [headers, body];
            }
            throw new Error(`${response.status} ${response.statusText}: ${await response.text()}`);
        }
        finally {
            FrontHostApp.stopWait();
        }
    }
    static startWait() {
        document.querySelector('html').classList.add('wait');
    }
    static stopWait() {
        document.querySelector('html').classList.remove('wait');
    }
    static getClassByName(className) {
        /*// console.log('getClassByName', className);
        if (eval(`typeof ${className}`) === 'function') {
            return eval(className);
        }
        return null;*/
        return window[className];
    }
    async onWindowPopState(e) {
        console.log('FrontHostApp.onWindowPopState', e.state);
    }
    async alert(options) {
        console.log('FrontHostApp.alert', options);
        alert(options.message);
    }
    async confirm(options) {
        console.log('FrontHostApp.confirm', options);
        return confirm(options.message);
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.FrontHostApp = FrontHostApp;
}


/***/ }),

/***/ "./src/frontend/common/Helper.ts":
/*!***************************************!*\
  !*** ./src/frontend/common/Helper.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Helper": () => (/* binding */ Helper)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);


class Helper {
    /*static currentDate() {
        const now = new Date();
        let dd = now.getDate();if (dd < 10) dd = '0' + dd;
        let mm = now.getMonth()+1;if (mm < 10) mm = '0' + mm;   /!*January is 0!*!/
        const yyyy = now.getFullYear();
        return [yyyy, mm, dd].join('-');
    }*/
    /*static currentDateTime() {
        return Helper.currentDate() + ' ' + Helper.currentTime();
    }*/
    /*static currentTime() {
        const now = new Date();
        let hh = now.getHours();if (hh < 10) hh = '0' + hh;
        let mm = now.getMinutes();if (mm < 10) mm = '0' + mm;
        let ss = now.getSeconds();if (ss < 10) ss = '0' + ss;
        return [hh, mm, ss].join(':');
    }*/
    static formatDate(date, format) {
        const YYYY = date.getFullYear();
        const M = date.getMonth() + 1;
        const D = date.getDate();
        const h = date.getHours();
        const m = date.getMinutes();
        const s = date.getSeconds();
        const MM = M < 10 ? `0${M}` : M;
        const DD = D < 10 ? `0${D}` : D;
        const hh = h < 10 ? `0${h}` : h;
        const mm = m < 10 ? `0${m}` : m;
        const ss = s < 10 ? `0${s}` : s;
        const values = { YYYY, M, D, h, m, s, MM, DD, hh, mm, ss };
        return format.replace(/\{([\w\.]+)\}/g, (text, name) => values[name] ? values[name] : text);
    }
    static formatNumber(value) {
        return new Intl.NumberFormat('ru-RU').format(value);
    }
    static today() {
        const now = new Date();
        // return new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return Helper.getStartOfDay(now);
    }
    static getStartOfDay(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    static encodeObject(obj) {
        const eObj = {};
        for (const name in obj) {
            eObj[name] = Helper.encodeValue(obj[name]);
        }
        return eObj;
    }
    static encodeValue(value) {
        return JSON.stringify(value);
    }
    static decodeObject(eObj) {
        if (!eObj)
            throw new Error('Helper.decodeObject: no object');
        const obj = {};
        for (const name in eObj) {
            obj[name] = Helper.decodeValue(eObj[name]);
        }
        return obj;
    }
    static decodeValue(raw) {
        try {
            return JSON.parse(raw, Helper.dateTimeReviver);
        }
        catch (err) {
            // console.log('raw:', raw);
            throw err;
        }
    }
    static dateTimeReviver(key, value) {
        if (typeof value === 'string') {
            const a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{3})?(Z|([+-])(\d{2}):(\d{2}))?$/.exec(value);
            if (a)
                return new Date(value);
        }
        return value;
    }
    static createReactComponent(rootElement, type, props = {}, children = null) {
        // console.log('Helper.createReactComponent', rootElement, type);
        let component;
        const reactRootElement = react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.StrictMode, {}, [
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(type, Object.assign(Object.assign({}, props), { onCreate: (c) => {
                    component = c;
                } }), children),
        ]);
        react_dom__WEBPACK_IMPORTED_MODULE_1___default().render(reactRootElement, rootElement);
        return component;
    }
    static destroyReactComponent(root) {
        react_dom__WEBPACK_IMPORTED_MODULE_1___default().unmountComponentAtNode(root);
    }
    static readFileAsDataURL(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });
    }
    /*static readFileAsArrayBuffer(file) {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsArrayBuffer(file);
        });
    }*/
    /*static convertBufferToBase64string(buffer) {
        const array = new Uint8Array(buffer);
        const binaryString = String.fromCharCode.apply(null, array);
        return window.btoa(binaryString);
    }*/
    /*static createObjectUrl(buffer) {
        const blob = new Blob([new Uint8Array(buffer)]);
        return window.URL.createObjectURL(blob);
    }*/
    // append file as filed and all not file as json string
    /*static createFormData(body) {
        const formData = new FormData();
        const fields = {};
        for (const name in body) {
            if (body[name] instanceof File) {
                formData.append(name, body[name]);
            } else {
                fields[name] = body[name];
            }
        }
        formData.append('__json', JSON.stringify(fields));
        return formData;
    }*/
    /*static base64ToArrayBuffer(base64) {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }*/
    static templateToJsString(value, params) {
        return value.replace(/\$\{([\w\.@]+)\}/g, (text, name) => {
            if (params.hasOwnProperty(name)) {
                return `Helper.decodeValue('${Helper.encodeValue(params[name])}')`;
            }
            return 'undefined';
        });
    }
    static moveArrItem(arr, item, offset) {
        const oldIndex = arr.indexOf(item);
        if (oldIndex === -1)
            throw new Error('cannot find element');
        const newIndex = oldIndex + offset;
        if (newIndex < 0)
            throw new Error('cannot up top element');
        if (newIndex > arr.length - 1)
            throw new Error('cannot down bottom element');
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    }
    static formatTime(_sec) {
        // console.log('Helper.formatTime', sec);
        let sec = _sec;
        let sign = '';
        if (_sec < 0) {
            sec = -sec;
            sign = '-';
        }
        let h = Math.floor(sec / 3600);
        let m = Math.floor((sec - h * 3600) / 60);
        let s = Math.floor(sec - h * 3600 - m * 60);
        // @ts-ignore
        if (h < 10)
            h = '0' + h;
        // @ts-ignore
        if (m < 10)
            m = '0' + m;
        // @ts-ignore
        if (s < 10)
            s = '0' + s;
        if (Math.floor(sec / 3600) === 0) {
            return `${sign}${m}:${s}`;
        }
        else {
            return `${sign}${h}:${m}:${s}`;
        }
    }
    static formatTime2(_sec) {
        // console.log('Helper.formatTime', sec);
        let sec = _sec;
        let sign = '';
        if (_sec < 0) {
            sec = -sec;
            sign = '-';
        }
        let h = Math.floor(sec / 3600);
        let m = Math.floor((sec - h * 3600) / 60);
        let s = Math.floor(sec - h * 3600 - m * 60);
        // @ts-ignore
        if (h < 10)
            h = '0' + h;
        // @ts-ignore
        if (m < 10)
            m = '0' + m;
        // @ts-ignore
        if (s < 10)
            s = '0' + s;
        if (Math.floor(sec / 3600) === 0) {
            return `${sign}${m}m:${s}s`;
        }
        else {
            return `${sign}${h}h:${m}m:${s}s`;
        }
    }
    static SECOND() {
        return 1000;
    }
    static MINUTE() {
        return 60 * Helper.SECOND();
    }
    static HOUR() {
        return 60 * Helper.MINUTE();
    }
    static DAY() {
        return 24 * Helper.HOUR();
    }
    static WEEK() {
        return 7 * Helper.DAY();
    }
    static fallbackCopyTextToClipboard(text) {
        // console.log('Helper.fallbackCopyTextToClipboard', text);
        const activeElement = document.activeElement;
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.top = '0'; // Avoid scrolling to bottom
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        // @ts-ignore
        activeElement.focus();
    }
    static async copyTextToClipboard(text) {
        console.log('Helper.copyTextToClipboard', text);
        if (!navigator.clipboard) {
            Helper.fallbackCopyTextToClipboard(text);
            return;
        }
        await navigator.clipboard.writeText(text);
    }
    static addMinutes(date, minutes) {
        // console.log('Helper.addMinutes', date, minutes);
        date.setMinutes(date.getMinutes() + minutes);
    }
    static removeTimezoneOffset(date) {
        Helper.addMinutes(date, -date.getTimezoneOffset());
    }
    static addTimezoneOffset(date) {
        Helper.addMinutes(date, date.getTimezoneOffset());
    }
    static cloneDate(date) {
        return new Date(date.getTime());
    }
    static fillArray(n) {
        return Array.from(Array(n).keys());
    }
    static inIframe() {
        try {
            return window.self !== window.top;
        }
        catch (e) {
            return true;
        }
    }
    static setCookie(name, value, time) {
        var expires = '';
        if (time) {
            var date = new Date(time);
            // date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (encodeURIComponent(value) || '') + expires + '; path=/';
    }
    static getCookie(name) {
        var nameEQ = name + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return undefined;
    }
    static eraseCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    static delay(ms = 1000) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.Helper = Helper;
}


/***/ }),

/***/ "./src/frontend/common/ReactComponent.tsx":
/*!************************************************!*\
  !*** ./src/frontend/common/ReactComponent.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReactComponent": () => (/* binding */ ReactComponent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

class ReactComponent extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(props) {
        super(props);
        if (props.onCreate)
            props.onCreate(this, this.props.name);
        this.allowRerender = true;
    }
    getElement() {
        return this.el.current;
    }
    getParent() {
        return this.props.parent;
    }
    checkParent() {
        if (!this.props.parent)
            throw new Error(`${this.constructor.name}: no parent`);
    }
    getClassList() {
        return [
            this.getCssBlockName(),
            ...(this.props.classList || []),
            ...(this.state && this.state.classList ? this.state.classList : []),
        ];
    }
    addCssClass(className) {
        if (this.state.classList.indexOf(className) === -1) {
            this.state.classList.push(className);
        }
    }
    removeCssClass(className) {
        this.state.classList.splice(this.state.classList.indexOf(className), 1);
    }
    getCssBlockName() {
        return this.constructor.name;
    }
    getCssClassNames() {
        return this.getClassList().join(' ');
    }
    rerender(logTime = true) {
        // console.log(`${this.constructor.name}.rerender`, this.state);
        if (!this.canRerender())
            return Promise.resolve();
        return new Promise((resolve) => {
            const start = Date.now();
            this.forceUpdate(() => {
                if (logTime) {
                    console.log(`${this.constructor.name}.rerender time:`, Date.now() - start);
                }
                resolve();
            });
        });
    }
    canRerender() {
        if (!this.allowRerender)
            return false;
        if (this.props.parent)
            return this.props.parent.canRerender();
        return true;
    }
    disableRerender() {
        console.log(`${this.constructor.name}.disableRerender`);
        this.allowRerender = false;
    }
    enableRerender() {
        console.log(`${this.constructor.name}.enableRerender`);
        this.allowRerender = true;
    }
    componentWillUnmount() {
        // console.log('ReactComponent.componentWillUnmount');
        if (this.props.onUnmount)
            this.props.onUnmount(this, this.props.name);
    }
    /*componentDidMount() {
        console.log('ReactComponent.componentDidMount', this.constructor.name);
    }*/
    isEnabled() {
        // console.log('ReactComponent.isEnabled', this.state);
        return !this.isDisabled();
    }
    isDisabled() {
        if (this.state && this.state.disabled !== undefined)
            return this.state.disabled;
        if (this.props.disabled !== undefined)
            return this.props.disabled;
        if (this.props.enabled !== undefined)
            return !this.props.enabled;
        return false;
    }
    disable() {
        // console.log('ReactComponent.disable');
        if (!this.state)
            throw new Error('no state');
        this.setState({ disabled: true });
    }
    enable() {
        if (!this.state)
            throw new Error('no state');
        this.setState({ disabled: undefined });
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.ReactComponent = ReactComponent;
}


/***/ }),

/***/ "./src/frontend/common/Search.ts":
/*!***************************************!*\
  !*** ./src/frontend/common/Search.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Search": () => (/* binding */ Search)
/* harmony export */ });
class Search {
    static getObj() {
        if (!window.location.search.split('?')[1])
            return {};
        return window.location.search
            .split('?')[1]
            .split('&')
            .reduce((acc, item) => {
            const kv = item.split('=');
            acc[kv[0]] = decodeURIComponent(kv[1]);
            return acc;
        }, {});
    }
    static objToString(obj) {
        const search = Object.keys(obj)
            .map((name) => `${name}=${encodeURIComponent(obj[name])}`)
            .join('&');
        if (!search)
            return '';
        return `?${search}`;
    }
    static filter(names) {
        const newObj = {};
        const obj = Search.getObj();
        for (const name of names) {
            if (obj.hasOwnProperty(name)) {
                newObj[name] = obj[name];
            }
        }
        return Search.objToString(newObj);
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.Search = Search;
}


/***/ }),

/***/ "./src/frontend/common/icon/ArrowIcon.tsx":
/*!************************************************!*\
  !*** ./src/frontend/common/icon/ArrowIcon.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArrowIcon": () => (/* binding */ ArrowIcon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const ArrowIcon = (props) => {
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", Object.assign({ width: "10px", height: "6px", viewBox: "0 0 10 6" }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M1.429.253a.819.819 0 0 0-1.184 0 .883.883 0 0 0 0 1.22l4.142 4.274A.821.821 0 0 0 5 6a.821.821 0 0 0 .612-.253l4.143-4.273a.883.883 0 0 0 0-1.221.819.819 0 0 0-1.184 0L5 3.937 1.429.253z" }) })));
};
if (typeof window === 'object') {
    // @ts-ignore
    window.ArrowIcon = ArrowIcon;
}


/***/ }),

/***/ "./src/frontend/common/icon/CancelIcon.tsx":
/*!*************************************************!*\
  !*** ./src/frontend/common/icon/CancelIcon.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CancelIcon": () => (/* binding */ CancelIcon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


class CancelIcon extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    render() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M0 0h24v24H0V0z", fill: "none", opacity: ".87" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z" })] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.CancelIcon = CancelIcon;
}


/***/ }),

/***/ "./src/frontend/common/icon/CloseIcon.tsx":
/*!************************************************!*\
  !*** ./src/frontend/common/icon/CloseIcon.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CloseIcon": () => (/* binding */ CloseIcon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const CloseIcon = (props) => {
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", Object.assign({ width: "10px", height: "10px", viewBox: "0 0 10 10" }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("line", { x1: "2", y1: "2", x2: "8", y2: "8", stroke: "#aaa", strokeWidth: 1, strokeMiterlimit: "10" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("line", { x1: "8", y1: "2", x2: "2", y2: "8", stroke: "#aaa", strokeWidth: 1, strokeMiterlimit: "10" })] })));
};
if (typeof window === 'object') {
    // @ts-ignore
    window.CloseIcon = CloseIcon;
}


/***/ }),

/***/ "./src/frontend/common/icon/CloseIcon2.tsx":
/*!*************************************************!*\
  !*** ./src/frontend/common/icon/CloseIcon2.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CloseIcon2": () => (/* binding */ CloseIcon2)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const CloseIcon2 = (props) => {
    const size = props.size || 24;
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24" }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M0 0h24v24H0V0z", fill: "none" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" })] })));
};
if (typeof window === 'object') {
    // @ts-ignore
    window.CloseIcon2 = CloseIcon2;
}


/***/ }),

/***/ "./src/frontend/common/icon/DateIcon.tsx":
/*!***********************************************!*\
  !*** ./src/frontend/common/icon/DateIcon.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DateIcon": () => (/* binding */ DateIcon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


class DateIcon extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    render() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: "18px", viewBox: "0 0 24 24", width: "18px", fill: "#000000" }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M0 0h24v24H0V0z", fill: "none" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z" })] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.DateIcon = DateIcon;
}


/***/ }),

/***/ "./src/frontend/common/icon/DeleteIcon.tsx":
/*!*************************************************!*\
  !*** ./src/frontend/common/icon/DeleteIcon.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DeleteIcon": () => (/* binding */ DeleteIcon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


class DeleteIcon extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    render() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M0 0h24v24H0V0z", fill: "none" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" })] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.DeleteIcon = DeleteIcon;
}


/***/ }),

/***/ "./src/frontend/common/icon/DoneIcon.tsx":
/*!***********************************************!*\
  !*** ./src/frontend/common/icon/DoneIcon.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DoneIcon": () => (/* binding */ DoneIcon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


class DoneIcon extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    render() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M0 0h24v24H0V0z", fill: "none" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" })] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.DoneIcon = DoneIcon;
}


/***/ }),

/***/ "./src/frontend/common/icon/DownIcon.tsx":
/*!***********************************************!*\
  !*** ./src/frontend/common/icon/DownIcon.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DownIcon": () => (/* binding */ DownIcon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


class DownIcon extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    render() {
        const size = this.props.size || 24;
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: size, width: size, viewBox: "0 0 24 24" }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M0 0h24v24H0V0z", fill: "none" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" })] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.DoneIcon = DoneIcon;
}


/***/ }),

/***/ "./src/frontend/common/icon/EditIcon.tsx":
/*!***********************************************!*\
  !*** ./src/frontend/common/icon/EditIcon.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditIcon": () => (/* binding */ EditIcon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


class EditIcon extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    render() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M0 0h24v24H0V0z", fill: "none" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" })] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.EditIcon = EditIcon;
}


/***/ }),

/***/ "./src/frontend/common/icon/LeftIcon.tsx":
/*!***********************************************!*\
  !*** ./src/frontend/common/icon/LeftIcon.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeftIcon": () => (/* binding */ LeftIcon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const LeftIcon = (props) => {
    const size = props.size || 24;
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: size, width: size, viewBox: "0 0 24 24", fill: "#000000" }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M0 0h24v24H0V0z", fill: "none" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z" })] })));
};
if (typeof window === 'object') {
    // @ts-ignore
    window.LeftIcon = LeftIcon;
}


/***/ }),

/***/ "./src/frontend/common/icon/LocationIcon.tsx":
/*!***************************************************!*\
  !*** ./src/frontend/common/icon/LocationIcon.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocationIcon": () => (/* binding */ LocationIcon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


class LocationIcon extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    render() {
        const size = this.props.size || 24;
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24" }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M0 0h24v24H0V0z", fill: "none" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", { cx: "12", cy: "9", r: "2.5" })] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.LocationIcon = LocationIcon;
}


/***/ }),

/***/ "./src/frontend/common/icon/MoreVertIcon.tsx":
/*!***************************************************!*\
  !*** ./src/frontend/common/icon/MoreVertIcon.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MoreVertIcon": () => (/* binding */ MoreVertIcon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


class MoreVertIcon extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    render() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M0 0h24v24H0V0z", fill: "none" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" })] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.MoreVertIcon = MoreVertIcon;
}


/***/ }),

/***/ "./src/frontend/common/icon/OpenInNewIcon.tsx":
/*!****************************************************!*\
  !*** ./src/frontend/common/icon/OpenInNewIcon.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OpenInNewIcon": () => (/* binding */ OpenInNewIcon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const OpenInNewIcon = () => {
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M0 0h24v24H0V0z", fill: "none" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" })] })));
};
if (typeof window === 'object') {
    // @ts-ignore
    window.OpenInNewIcon = OpenInNewIcon;
}


/***/ }),

/***/ "./src/frontend/common/icon/PasswordIcon.tsx":
/*!***************************************************!*\
  !*** ./src/frontend/common/icon/PasswordIcon.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PasswordIcon": () => (/* binding */ PasswordIcon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


class PasswordIcon extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    render() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", enableBackground: "new 0 0 24 24", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("g", { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M0,0h24v24H0V0z", fill: "none" }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("g", { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("g", { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M2,17h20v2H2V17z M3.15,12.95L4,11.47l0.85,1.48l1.3-0.75L5.3,10.72H7v-1.5H5.3l0.85-1.47L4.85,7L4,8.47L3.15,7l-1.3,0.75 L2.7,9.22H1v1.5h1.7L1.85,12.2L3.15,12.95z M9.85,12.2l1.3,0.75L12,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H15v-1.5h-1.7l0.85-1.47 L12.85,7L12,8.47L11.15,7l-1.3,0.75l0.85,1.47H9v1.5h1.7L9.85,12.2z M23,9.22h-1.7l0.85-1.47L20.85,7L20,8.47L19.15,7l-1.3,0.75 l0.85,1.47H17v1.5h1.7l-0.85,1.48l1.3,0.75L20,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H23V9.22z" }) }) })] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.PasswordIcon = PasswordIcon;
}


/***/ }),

/***/ "./src/frontend/common/icon/PhoneIcon.tsx":
/*!************************************************!*\
  !*** ./src/frontend/common/icon/PhoneIcon.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PhoneIcon": () => (/* binding */ PhoneIcon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


class PhoneIcon extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    render() {
        const size = this.props.size || 24;
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: size, width: size, viewBox: "0 0 24 24" }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M0 0h24v24H0V0z", fill: "none" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79h1.51m9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75l1.2-1.19M7.5 3H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1-1.24 0-2.45-.2-3.57-.57-.1-.04-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.45-5.15-3.76-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1z" })] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.PhoneIcon = PhoneIcon;
}


/***/ }),

/***/ "./src/frontend/common/icon/RightIcon.tsx":
/*!************************************************!*\
  !*** ./src/frontend/common/icon/RightIcon.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RightIcon": () => (/* binding */ RightIcon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const RightIcon = (props) => {
    const size = props.size || 24;
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: size, width: size, viewBox: "0 0 24 24", fill: "#000000" }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M0 0h24v24H0V0z", fill: "none" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" })] })));
};
if (typeof window === 'object') {
    // @ts-ignore
    window.RightIcon = RightIcon;
}


/***/ }),

/***/ "./src/frontend/common/icon/SettingsIcon.tsx":
/*!***************************************************!*\
  !*** ./src/frontend/common/icon/SettingsIcon.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsIcon": () => (/* binding */ SettingsIcon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


class SettingsIcon extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    render() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M0 0h24v24H0V0z", fill: "none" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" })] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.SettingsIcon = SettingsIcon;
}


/***/ }),

/***/ "./src/frontend/common/icon/TimeIcon.tsx":
/*!***********************************************!*\
  !*** ./src/frontend/common/icon/TimeIcon.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimeIcon": () => (/* binding */ TimeIcon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


class TimeIcon extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    render() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", enableBackground: "new 0 0 24 24", height: "18px", viewBox: "0 0 24 24", width: "18px", fill: "#000000" }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("g", { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", { fill: "none", height: "24", width: "24", x: "0" }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("g", { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("g", { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z M12.5,7H11v6l5.2,3.2l0.8-1.3l-4.5-2.7V7z" }) }) })] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.TimeIcon = TimeIcon;
}


/***/ }),

/***/ "./src/frontend/common/icon/VisibilityIcon.tsx":
/*!*****************************************************!*\
  !*** ./src/frontend/common/icon/VisibilityIcon.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VisibilityIcon": () => (/* binding */ VisibilityIcon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


class VisibilityIcon extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    render() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M0 0h24v24H0V0z", fill: "none" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z" })] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.VisibilityIcon = VisibilityIcon;
}


/***/ }),

/***/ "./src/frontend/common/icon/VisibilityOffIcon.tsx":
/*!********************************************************!*\
  !*** ./src/frontend/common/icon/VisibilityOffIcon.tsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VisibilityOffIcon": () => (/* binding */ VisibilityOffIcon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


class VisibilityOffIcon extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    render() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0z", fill: "none" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { d: "M12 6c3.79 0 7.17 2.13 8.82 5.5-.59 1.22-1.42 2.27-2.41 3.12l1.41 1.41c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l1.65 1.65C10.66 6.09 11.32 6 12 6zm-1.07 1.14L13 9.21c.57.25 1.03.71 1.28 1.28l2.07 2.07c.08-.34.14-.7.14-1.07C16.5 9.01 14.48 7 12 7c-.37 0-.72.05-1.07.14zM2.01 3.87l2.68 2.68C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.98-.29 4.32-.82l3.42 3.42 1.41-1.41L3.42 2.45 2.01 3.87zm7.5 7.5l2.61 2.61c-.04.01-.08.02-.12.02-1.38 0-2.5-1.12-2.5-2.5 0-.05.01-.08.01-.13zm-3.4-3.4l1.75 1.75c-.23.55-.36 1.15-.36 1.78 0 2.48 2.02 4.5 4.5 4.5.63 0 1.23-.13 1.77-.36l.98.98c-.88.24-1.8.38-2.75.38-3.79 0-7.17-2.13-8.82-5.5.7-1.43 1.72-2.61 2.93-3.53z" })] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.VisibilityOffIcon = VisibilityOffIcon;
}


/***/ }),

/***/ "./src/frontend/common/index.ts":
/*!**************************************!*\
  !*** ./src/frontend/common/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArrowIcon": () => (/* reexport safe */ _icon_ArrowIcon__WEBPACK_IMPORTED_MODULE_20__.ArrowIcon),
/* harmony export */   "Box": () => (/* reexport safe */ _widget_Box_Box__WEBPACK_IMPORTED_MODULE_24__.Box),
/* harmony export */   "Button": () => (/* reexport safe */ _widget_Button__WEBPACK_IMPORTED_MODULE_27__.Button),
/* harmony export */   "CancelIcon": () => (/* reexport safe */ _icon_CancelIcon__WEBPACK_IMPORTED_MODULE_15__.CancelIcon),
/* harmony export */   "CheckBox": () => (/* reexport safe */ _widget_CheckBox_CheckBox__WEBPACK_IMPORTED_MODULE_25__.CheckBox),
/* harmony export */   "CheckBoxList": () => (/* reexport safe */ _widget_CheckBoxList__WEBPACK_IMPORTED_MODULE_48__.CheckBoxList),
/* harmony export */   "CloseIcon": () => (/* reexport safe */ _icon_CloseIcon__WEBPACK_IMPORTED_MODULE_4__.CloseIcon),
/* harmony export */   "CloseIcon2": () => (/* reexport safe */ _icon_CloseIcon2__WEBPACK_IMPORTED_MODULE_9__.CloseIcon2),
/* harmony export */   "ComboBox": () => (/* reexport safe */ _widget_ComboBox__WEBPACK_IMPORTED_MODULE_26__.ComboBox),
/* harmony export */   "DateIcon": () => (/* reexport safe */ _icon_DateIcon__WEBPACK_IMPORTED_MODULE_22__.DateIcon),
/* harmony export */   "DatePicker": () => (/* reexport safe */ _widget_DatePicker_DatePicker__WEBPACK_IMPORTED_MODULE_40__.DatePicker),
/* harmony export */   "DeleteIcon": () => (/* reexport safe */ _icon_DeleteIcon__WEBPACK_IMPORTED_MODULE_18__.DeleteIcon),
/* harmony export */   "DoneIcon": () => (/* reexport safe */ _icon_DoneIcon__WEBPACK_IMPORTED_MODULE_14__.DoneIcon),
/* harmony export */   "DownIcon": () => (/* reexport safe */ _icon_DownIcon__WEBPACK_IMPORTED_MODULE_21__.DownIcon),
/* harmony export */   "DropdownButton": () => (/* reexport safe */ _widget_DropdownButton_DropdownButton__WEBPACK_IMPORTED_MODULE_29__.DropdownButton),
/* harmony export */   "DropdownDatePicker": () => (/* reexport safe */ _widget_DropdownDatePicker_DropdownDatePicker__WEBPACK_IMPORTED_MODULE_39__.DropdownDatePicker),
/* harmony export */   "EditIcon": () => (/* reexport safe */ _icon_EditIcon__WEBPACK_IMPORTED_MODULE_19__.EditIcon),
/* harmony export */   "Expand": () => (/* reexport safe */ _widget_Expand_Expand__WEBPACK_IMPORTED_MODULE_50__.Expand),
/* harmony export */   "FrontHostApp": () => (/* reexport safe */ _FrontHostApp__WEBPACK_IMPORTED_MODULE_0__.FrontHostApp),
/* harmony export */   "Grid": () => (/* reexport safe */ _widget_Grid_Grid__WEBPACK_IMPORTED_MODULE_31__.Grid),
/* harmony export */   "GridCell": () => (/* reexport safe */ _widget_GridCell_GridCell__WEBPACK_IMPORTED_MODULE_33__.GridCell),
/* harmony export */   "GridRow": () => (/* reexport safe */ _widget_GridRow_GridRow__WEBPACK_IMPORTED_MODULE_32__.GridRow),
/* harmony export */   "Helper": () => (/* reexport safe */ _Helper__WEBPACK_IMPORTED_MODULE_1__.Helper),
/* harmony export */   "Image": () => (/* reexport safe */ _widget_Image_Image__WEBPACK_IMPORTED_MODULE_47__.Image),
/* harmony export */   "LeftIcon": () => (/* reexport safe */ _icon_LeftIcon__WEBPACK_IMPORTED_MODULE_5__.LeftIcon),
/* harmony export */   "LocationIcon": () => (/* reexport safe */ _icon_LocationIcon__WEBPACK_IMPORTED_MODULE_12__.LocationIcon),
/* harmony export */   "Menu": () => (/* reexport safe */ _widget_Menu_Menu__WEBPACK_IMPORTED_MODULE_36__.Menu),
/* harmony export */   "Modal": () => (/* reexport safe */ _widget_Modal_Modal__WEBPACK_IMPORTED_MODULE_34__.Modal),
/* harmony export */   "MoreVertIcon": () => (/* reexport safe */ _icon_MoreVertIcon__WEBPACK_IMPORTED_MODULE_8__.MoreVertIcon),
/* harmony export */   "OpenInNewIcon": () => (/* reexport safe */ _icon_OpenInNewIcon__WEBPACK_IMPORTED_MODULE_7__.OpenInNewIcon),
/* harmony export */   "Password": () => (/* reexport safe */ _widget_Password_Password__WEBPACK_IMPORTED_MODULE_35__.Password),
/* harmony export */   "PasswordIcon": () => (/* reexport safe */ _icon_PasswordIcon__WEBPACK_IMPORTED_MODULE_17__.PasswordIcon),
/* harmony export */   "PhoneBox": () => (/* reexport safe */ _widget_PhoneBox__WEBPACK_IMPORTED_MODULE_45__.PhoneBox),
/* harmony export */   "PhoneIcon": () => (/* reexport safe */ _icon_PhoneIcon__WEBPACK_IMPORTED_MODULE_16__.PhoneIcon),
/* harmony export */   "Radio": () => (/* reexport safe */ _widget_Radio__WEBPACK_IMPORTED_MODULE_51__.Radio),
/* harmony export */   "ReactComponent": () => (/* reexport safe */ _ReactComponent__WEBPACK_IMPORTED_MODULE_2__.ReactComponent),
/* harmony export */   "RightIcon": () => (/* reexport safe */ _icon_RightIcon__WEBPACK_IMPORTED_MODULE_6__.RightIcon),
/* harmony export */   "Search": () => (/* reexport safe */ _Search__WEBPACK_IMPORTED_MODULE_3__.Search),
/* harmony export */   "Select": () => (/* reexport safe */ _widget_Select_Select__WEBPACK_IMPORTED_MODULE_41__.Select),
/* harmony export */   "SettingsIcon": () => (/* reexport safe */ _icon_SettingsIcon__WEBPACK_IMPORTED_MODULE_13__.SettingsIcon),
/* harmony export */   "Slider": () => (/* reexport safe */ _widget_Slider_Slider__WEBPACK_IMPORTED_MODULE_49__.Slider),
/* harmony export */   "Statusbar": () => (/* reexport safe */ _widget_Statusbar_Statusbar__WEBPACK_IMPORTED_MODULE_37__.Statusbar),
/* harmony export */   "Tab": () => (/* reexport safe */ _widget_Tab_Tab__WEBPACK_IMPORTED_MODULE_28__.Tab),
/* harmony export */   "Tab2": () => (/* reexport safe */ _widget_Tab2_Tab2__WEBPACK_IMPORTED_MODULE_43__.Tab2),
/* harmony export */   "TextArea": () => (/* reexport safe */ _widget_TextArea__WEBPACK_IMPORTED_MODULE_42__.TextArea),
/* harmony export */   "TextBox": () => (/* reexport safe */ _widget_TextBox__WEBPACK_IMPORTED_MODULE_30__.TextBox),
/* harmony export */   "TimeBox": () => (/* reexport safe */ _widget_TimeBox_TimeBox__WEBPACK_IMPORTED_MODULE_44__.TimeBox),
/* harmony export */   "TimeBox2": () => (/* reexport safe */ _widget_TimeBox_TimeBox2_TimeBox2__WEBPACK_IMPORTED_MODULE_46__.TimeBox2),
/* harmony export */   "TimeIcon": () => (/* reexport safe */ _icon_TimeIcon__WEBPACK_IMPORTED_MODULE_23__.TimeIcon),
/* harmony export */   "Tooltip": () => (/* reexport safe */ _widget_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_38__.Tooltip),
/* harmony export */   "VisibilityIcon": () => (/* reexport safe */ _icon_VisibilityIcon__WEBPACK_IMPORTED_MODULE_10__.VisibilityIcon),
/* harmony export */   "VisibilityOffIcon": () => (/* reexport safe */ _icon_VisibilityOffIcon__WEBPACK_IMPORTED_MODULE_11__.VisibilityOffIcon)
/* harmony export */ });
/* harmony import */ var _FrontHostApp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FrontHostApp */ "./src/frontend/common/FrontHostApp.ts");
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Helper */ "./src/frontend/common/Helper.ts");
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReactComponent */ "./src/frontend/common/ReactComponent.tsx");
/* harmony import */ var _Search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Search */ "./src/frontend/common/Search.ts");
/* harmony import */ var _icon_CloseIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icon/CloseIcon */ "./src/frontend/common/icon/CloseIcon.tsx");
/* harmony import */ var _icon_LeftIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./icon/LeftIcon */ "./src/frontend/common/icon/LeftIcon.tsx");
/* harmony import */ var _icon_RightIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./icon/RightIcon */ "./src/frontend/common/icon/RightIcon.tsx");
/* harmony import */ var _icon_OpenInNewIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./icon/OpenInNewIcon */ "./src/frontend/common/icon/OpenInNewIcon.tsx");
/* harmony import */ var _icon_MoreVertIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./icon/MoreVertIcon */ "./src/frontend/common/icon/MoreVertIcon.tsx");
/* harmony import */ var _icon_CloseIcon2__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./icon/CloseIcon2 */ "./src/frontend/common/icon/CloseIcon2.tsx");
/* harmony import */ var _icon_VisibilityIcon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./icon/VisibilityIcon */ "./src/frontend/common/icon/VisibilityIcon.tsx");
/* harmony import */ var _icon_VisibilityOffIcon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./icon/VisibilityOffIcon */ "./src/frontend/common/icon/VisibilityOffIcon.tsx");
/* harmony import */ var _icon_LocationIcon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./icon/LocationIcon */ "./src/frontend/common/icon/LocationIcon.tsx");
/* harmony import */ var _icon_SettingsIcon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./icon/SettingsIcon */ "./src/frontend/common/icon/SettingsIcon.tsx");
/* harmony import */ var _icon_DoneIcon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./icon/DoneIcon */ "./src/frontend/common/icon/DoneIcon.tsx");
/* harmony import */ var _icon_CancelIcon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./icon/CancelIcon */ "./src/frontend/common/icon/CancelIcon.tsx");
/* harmony import */ var _icon_PhoneIcon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./icon/PhoneIcon */ "./src/frontend/common/icon/PhoneIcon.tsx");
/* harmony import */ var _icon_PasswordIcon__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./icon/PasswordIcon */ "./src/frontend/common/icon/PasswordIcon.tsx");
/* harmony import */ var _icon_DeleteIcon__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./icon/DeleteIcon */ "./src/frontend/common/icon/DeleteIcon.tsx");
/* harmony import */ var _icon_EditIcon__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./icon/EditIcon */ "./src/frontend/common/icon/EditIcon.tsx");
/* harmony import */ var _icon_ArrowIcon__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./icon/ArrowIcon */ "./src/frontend/common/icon/ArrowIcon.tsx");
/* harmony import */ var _icon_DownIcon__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./icon/DownIcon */ "./src/frontend/common/icon/DownIcon.tsx");
/* harmony import */ var _icon_DateIcon__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./icon/DateIcon */ "./src/frontend/common/icon/DateIcon.tsx");
/* harmony import */ var _icon_TimeIcon__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./icon/TimeIcon */ "./src/frontend/common/icon/TimeIcon.tsx");
/* harmony import */ var _widget_Box_Box__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./widget/Box/Box */ "./src/frontend/common/widget/Box/Box.tsx");
/* harmony import */ var _widget_CheckBox_CheckBox__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./widget/CheckBox/CheckBox */ "./src/frontend/common/widget/CheckBox/CheckBox.tsx");
/* harmony import */ var _widget_ComboBox__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./widget/ComboBox */ "./src/frontend/common/widget/ComboBox.tsx");
/* harmony import */ var _widget_Button__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./widget/Button */ "./src/frontend/common/widget/Button.tsx");
/* harmony import */ var _widget_Tab_Tab__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./widget/Tab/Tab */ "./src/frontend/common/widget/Tab/Tab.tsx");
/* harmony import */ var _widget_DropdownButton_DropdownButton__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./widget/DropdownButton/DropdownButton */ "./src/frontend/common/widget/DropdownButton/DropdownButton.tsx");
/* harmony import */ var _widget_TextBox__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./widget/TextBox */ "./src/frontend/common/widget/TextBox.tsx");
/* harmony import */ var _widget_Grid_Grid__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./widget/Grid/Grid */ "./src/frontend/common/widget/Grid/Grid.tsx");
/* harmony import */ var _widget_GridRow_GridRow__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./widget/GridRow/GridRow */ "./src/frontend/common/widget/GridRow/GridRow.tsx");
/* harmony import */ var _widget_GridCell_GridCell__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./widget/GridCell/GridCell */ "./src/frontend/common/widget/GridCell/GridCell.tsx");
/* harmony import */ var _widget_Modal_Modal__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./widget/Modal/Modal */ "./src/frontend/common/widget/Modal/Modal.tsx");
/* harmony import */ var _widget_Password_Password__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./widget/Password/Password */ "./src/frontend/common/widget/Password/Password.tsx");
/* harmony import */ var _widget_Menu_Menu__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./widget/Menu/Menu */ "./src/frontend/common/widget/Menu/Menu.tsx");
/* harmony import */ var _widget_Statusbar_Statusbar__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./widget/Statusbar/Statusbar */ "./src/frontend/common/widget/Statusbar/Statusbar.tsx");
/* harmony import */ var _widget_Tooltip_Tooltip__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./widget/Tooltip/Tooltip */ "./src/frontend/common/widget/Tooltip/Tooltip.tsx");
/* harmony import */ var _widget_DropdownDatePicker_DropdownDatePicker__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./widget/DropdownDatePicker/DropdownDatePicker */ "./src/frontend/common/widget/DropdownDatePicker/DropdownDatePicker.tsx");
/* harmony import */ var _widget_DatePicker_DatePicker__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./widget/DatePicker/DatePicker */ "./src/frontend/common/widget/DatePicker/DatePicker.tsx");
/* harmony import */ var _widget_Select_Select__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./widget/Select/Select */ "./src/frontend/common/widget/Select/Select.tsx");
/* harmony import */ var _widget_TextArea__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./widget/TextArea */ "./src/frontend/common/widget/TextArea.tsx");
/* harmony import */ var _widget_Tab2_Tab2__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./widget/Tab2/Tab2 */ "./src/frontend/common/widget/Tab2/Tab2.tsx");
/* harmony import */ var _widget_TimeBox_TimeBox__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./widget/TimeBox/TimeBox */ "./src/frontend/common/widget/TimeBox/TimeBox.tsx");
/* harmony import */ var _widget_PhoneBox__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./widget/PhoneBox */ "./src/frontend/common/widget/PhoneBox.tsx");
/* harmony import */ var _widget_TimeBox_TimeBox2_TimeBox2__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./widget/TimeBox/TimeBox2/TimeBox2 */ "./src/frontend/common/widget/TimeBox/TimeBox2/TimeBox2.tsx");
/* harmony import */ var _widget_Image_Image__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./widget/Image/Image */ "./src/frontend/common/widget/Image/Image.tsx");
/* harmony import */ var _widget_CheckBoxList__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./widget/CheckBoxList */ "./src/frontend/common/widget/CheckBoxList.tsx");
/* harmony import */ var _widget_Slider_Slider__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./widget/Slider/Slider */ "./src/frontend/common/widget/Slider/Slider.tsx");
/* harmony import */ var _widget_Expand_Expand__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./widget/Expand/Expand */ "./src/frontend/common/widget/Expand/Expand.tsx");
/* harmony import */ var _widget_Radio__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./widget/Radio */ "./src/frontend/common/widget/Radio.tsx");




// icon




















// widget






























/***/ }),

/***/ "./src/frontend/common/widget/Box/Box.tsx":
/*!************************************************!*\
  !*** ./src/frontend/common/widget/Box/Box.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Box": () => (/* binding */ Box)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Button */ "./src/frontend/common/widget/Button.tsx");
/* harmony import */ var _Box_less__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Box.less */ "./src/frontend/common/widget/Box/Box.less");
/* harmony import */ var _Box_less__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Box_less__WEBPACK_IMPORTED_MODULE_3__);




class Box extends _ReactComponent__WEBPACK_IMPORTED_MODULE_1__.ReactComponent {
    constructor(props) {
        // console.log('Box.constructor', props);
        super(props);
        this.update = () => {
            console.log('Box.update');
            this.setState({
                backgroundColor: 'green',
            });
        };
        this.state = {
            backgroundColor: 'purple',
        };
    }
    // componentWillMount() {
    //     console.log('Box.componentWillMount');
    // }
    componentDidMount() {
        console.log('Box.componentDidMount');
    }
    componentWillUnmount() {
        console.log('Box.componentWillUnmount');
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('Box.shouldComponentUpdate', nextProps, nextState);
        return true;
    }
    componentDidUpdate() {
        console.log('Box.componentDidUpdate');
    }
    render() {
        console.log('Box.render');
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ className: "Box" }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__.Button, { name: "one" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__.Button, { name: "two" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__.Button, { name: "three" })] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.Box = Box;
}


/***/ }),

/***/ "./src/frontend/common/widget/Button.tsx":
/*!***********************************************!*\
  !*** ./src/frontend/common/widget/Button.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Button": () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");



class Button extends _ReactComponent__WEBPACK_IMPORTED_MODULE_2__.ReactComponent {
    constructor(props) {
        // console.log('Button.constructor', props);
        super(props);
        this.state = { disabled: undefined };
        this.el = (0,react__WEBPACK_IMPORTED_MODULE_1__.createRef)();
    }
    /*isDisabled() {
        if (this.props.disabled !== undefined) return this.props.disabled;
        if (this.props.enabled !== undefined) return !this.props.enabled;
        return this.state.disabled;
    }*/
    /*isEnabled() {
        return !this.isDisabled();
    }*/
    /*disable() {
        this.setState({disabled: true});
    }*/
    /*enable() {
        this.setState({disabled: false});
    }*/
    isVisible() {
        // return this.props.visible === undefined ? true : this.props.visible;
        if (this.props.visible !== undefined)
            return this.props.visible;
        return true;
    }
    getStyle() {
        return {
            display: !this.isVisible() ? 'none' : null,
            width: this.props.width,
        };
    }
    render() {
        // console.log('Button.render', this.props.title, this.props);
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", Object.assign({ className: this.getCssClassNames(), ref: this.el, id: this.props.id, type: this.props.type, name: this.props.name, disabled: this.isDisabled(), onClick: this.props.onClick, onFocus: this.props.onFocus, onBlur: this.props.onBlur, onKeyDown: this.props.onKeyDown, style: this.getStyle() }, { children: this.props.title || this.props.children })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.Button = Button;
}


/***/ }),

/***/ "./src/frontend/common/widget/CheckBox/CheckBox.tsx":
/*!**********************************************************!*\
  !*** ./src/frontend/common/widget/CheckBox/CheckBox.tsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CheckBox": () => (/* binding */ CheckBox)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");
/* harmony import */ var _CheckBox_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CheckBox.less */ "./src/frontend/common/widget/CheckBox/CheckBox.less");
/* harmony import */ var _CheckBox_less__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_CheckBox_less__WEBPACK_IMPORTED_MODULE_2__);



class CheckBox extends _ReactComponent__WEBPACK_IMPORTED_MODULE_1__.ReactComponent {
    constructor(props) {
        super(props);
        this.onChange = (e) => {
            // console.log('CheckBox.onChange', e.target.checked, this.props.readOnly);
            if (!this.props.readOnly) {
                this.setState((prevState) => {
                    if (this.props.onChange) {
                        this.props.onChange(!prevState.checked, e);
                    }
                    return { checked: !prevState.checked };
                });
            }
        };
        this.onClick = (e) => {
            if (!this.props.readOnly) {
                if (this.props.onChange)
                    this.props.onChange(true);
                this.setState({ checked: true });
            }
        };
        if (this.props.checked !== undefined &&
            this.props.checked !== null &&
            typeof this.props.checked !== 'boolean') {
            throw new Error(`wrong checked prop: ${this.props.checked}`);
        }
        this.state = {
            checked: typeof this.props.checked === 'boolean' ? this.props.checked : null,
        };
    }
    getValue() {
        return this.state.checked;
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('TextBox.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        // @ts-ignore
        this.state.checked = typeof nextProps.checked === 'boolean' ? nextProps.checked : null;
        return true;
    }
    render() {
        if (this.state.checked === null) {
            return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssClassNames()} ${this.isDisabled() ? 'disabled' : ''}`, onClick: this.onClick }, { children: "?" })));
        }
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", { className: this.getCssClassNames(), type: "checkbox", id: this.props.id, checked: this.state.checked, readOnly: this.props.readOnly, disabled: this.props.disabled, "data-tag": this.props.tag, onChange: this.onChange }));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.CheckBox = CheckBox;
}


/***/ }),

/***/ "./src/frontend/common/widget/CheckBoxList.tsx":
/*!*****************************************************!*\
  !*** ./src/frontend/common/widget/CheckBoxList.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CheckBoxList": () => (/* binding */ CheckBoxList)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");


class CheckBoxList extends _ReactComponent__WEBPACK_IMPORTED_MODULE_1__.ReactComponent {
    constructor(props) {
        super(props);
        this.onCheckBoxChange = (e) => {
            // console.log('CheckBoxList.onCheckBoxChange', e.target.id, e.target.checked);
            const checked = e.target.checked;
            const itemValue = e.target.dataset.value;
            // console.log('itemValue:', itemValue);
            this.setState((prevState) => {
                const prevValue = prevState.value || [];
                const value = [...prevValue];
                if (checked) {
                    if (value.indexOf(itemValue) > -1) {
                        console.log('value:', itemValue, checked, value);
                        throw new Error('CheckBoxList value error');
                    }
                    value.push(itemValue);
                }
                else {
                    if (value.indexOf(itemValue) === -1) {
                        console.log('value:', itemValue, checked, value);
                        throw new Error('CheckBoxList value error');
                    }
                    value.splice(value.indexOf(itemValue), 1);
                }
                // console.log('value:', value);
                return { value };
            }, () => {
                if (this.props.onChange) {
                    this.props.onChange(this.getValue());
                }
            });
        };
        if (!this.props.name)
            throw new Error('no CheckBoxList name');
        this.state = {
            value: this.props.value || [],
        };
    }
    getItems() {
        return this.props.items || [];
    }
    getValue() {
        return this.state.value || [];
    }
    isValueChecked(value) {
        return this.getValue().indexOf(value) > -1;
    }
    composeItemId(value) {
        return `${this.props.name}.${value}`;
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('CheckBoxList.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        // console.log('nextProps.value:', nextProps.value);
        // @ts-ignore
        this.state.value = nextProps.value;
        return true;
    }
    render() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ul", Object.assign({ className: this.getCssClassNames() }, { children: this.getItems().map((item) => {
                if (item.value === undefined)
                    throw new Error('no item value');
                return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", { type: 'checkbox', id: this.composeItemId(item.value), checked: this.isValueChecked(item.value), onChange: this.onCheckBoxChange, "data-value": item.value, readOnly: this.props.readOnly }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", Object.assign({ htmlFor: this.composeItemId(item.value) }, { children: item.title || item.value }))] }, item.value));
            }) })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.CheckBoxList = CheckBoxList;
}


/***/ }),

/***/ "./src/frontend/common/widget/ComboBox.tsx":
/*!*************************************************!*\
  !*** ./src/frontend/common/widget/ComboBox.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComboBox": () => (/* binding */ ComboBox)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");


class ComboBox extends _ReactComponent__WEBPACK_IMPORTED_MODULE_1__.ReactComponent {
    constructor(props) {
        // console.log('ComboBox.constructor', props.value, typeof props.value, props.items);
        super(props);
        this.onChange = async (e) => {
            // console.log('ComboBox.onChange', e.target.value, typeof e.target.value);
            this.setState({ value: e.target.value });
            if (this.props.onChange) {
                await this.props.onChange(e.target.value);
            }
        };
        this.onMouseDown = async (e) => {
            // console.log('ComboBox.onMouseDown', e.button);
            if (this.props.onMouseDown) {
                await this.props.onMouseDown(e);
            }
        };
        if (!props.items)
            throw new Error('no ComboBox items');
        this.state = { value: this.getInitialValue() };
    }
    getInitialValue() {
        let value = null;
        if (this.props.value !== undefined && this.props.value !== null) {
            value = this.props.value;
            const item = this.props.items.find((item) => item.value === this.props.value);
            if (!item) {
                if (this.props.nullable && value === '') {
                }
                else {
                    console.error(`ComboBox: no item for value:`, JSON.stringify(this.props.value));
                    console.log('items:', this.props.items);
                }
            }
        }
        else {
            if (this.props.items.length) {
                value = this.props.items[0].value;
            }
            else {
                value = '';
            }
        }
        if (value === null)
            throw new Error('null is wrong value for ComboBox');
        // console.log('combobox value:', value);
        return value;
    }
    getValue() {
        return this.state.value;
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('ComboBox.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        // @ts-ignore
        this.state.value = nextProps.value;
        return true;
    }
    render() {
        // console.log('ComboBox.render', this.state.value);
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", Object.assign({ className: this.getCssClassNames(), onChange: this.onChange, value: this.state.value, disabled: this.props.readOnly, size: this.props.size, style: this.props.style, id: this.props.id, onDoubleClick: this.props.onDoubleClick, onMouseDown: this.onMouseDown }, { children: [this.props.nullable && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", Object.assign({ value: '' }, { children: this.props.placeholder })), this.props.items &&
                    this.props.items.map((item) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", Object.assign({ value: item.value }, { children: item.title || item.value }), item.value)))] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.ComboBox = ComboBox;
}


/***/ }),

/***/ "./src/frontend/common/widget/DatePicker/DatePicker.tsx":
/*!**************************************************************!*\
  !*** ./src/frontend/common/widget/DatePicker/DatePicker.tsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DatePicker": () => (/* binding */ DatePicker)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Helper */ "./src/frontend/common/Helper.ts");
/* harmony import */ var _icon_LeftIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../icon/LeftIcon */ "./src/frontend/common/icon/LeftIcon.tsx");
/* harmony import */ var _icon_RightIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../icon/RightIcon */ "./src/frontend/common/icon/RightIcon.tsx");
/* harmony import */ var _DatePicker_less__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DatePicker.less */ "./src/frontend/common/widget/DatePicker/DatePicker.less");
/* harmony import */ var _DatePicker_less__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_DatePicker_less__WEBPACK_IMPORTED_MODULE_5__);






// props
//  visible boolean true
//  selectedDate array [2021, 0, 1]
//  minDate array [2021, 0, 1]
//  onMouseDown function
//  onDateSelected function
//  getDateStyle function
//  selectToday boolean false
//  highlightedDate array [2021, 0, 1]
class DatePicker extends _ReactComponent__WEBPACK_IMPORTED_MODULE_1__.ReactComponent {
    constructor(props) {
        // console.log('DatePicker.constructor', props);
        super(props);
        this.onClick = (e) => {
            console.log('DatePicker.onClick', e.target);
            if (e.target.nodeName === 'TD' && e.target.classList.contains('selectable')) {
                return this.onDateClick(e.target);
            }
        };
        this.onMouseDown = (e) => {
            // console.log('DatePicker.onMouseDown');
            if (this.props.onMouseDown) {
                return this.props.onMouseDown(e);
            }
        };
        this.onNextClick = (e) => {
            // console.log('DatePicker.next');
            this.setState((prevState) => {
                const next = new Date(prevState.selectedMonth[0], prevState.selectedMonth[1]);
                next.setMonth(next.getMonth() + 1);
                return {
                    selectedMonth: [next.getFullYear(), next.getMonth()],
                };
            });
        };
        this.onPrevClick = (e) => {
            // console.log('DatePicker.prev');
            this.setState((prevState) => {
                const prev = new Date(prevState.selectedMonth[0], prevState.selectedMonth[1]);
                prev.setMonth(prev.getMonth() - 1);
                return {
                    selectedMonth: [prev.getFullYear(), prev.getMonth()],
                };
            });
        };
        if (this.props.minDate && !(this.props.minDate instanceof Array))
            throw new Error('minDate must be array');
        this.state = { selectedMonth: this.calcSelectedMonth() };
        this.MONTH = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
        ];
    }
    static createDateFromArr(arr) {
        return new Date(arr[0], arr[1], arr[2]);
    }
    isVisible() {
        if (this.props.visible === false)
            return false;
        return true;
    }
    calcSelectedMonth() {
        // console.log('DatePicker.calcSelectedMonth', this.props.selectedDate);
        if (this.props.selectedDate) {
            return [this.props.selectedDate[0], this.props.selectedDate[1]];
        }
        else if (this.props.highlightedDate) {
            return [this.props.highlightedDate[0], this.props.highlightedDate[1]];
        }
        else {
            const dates = [_Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.today().getTime()];
            if (this.props.minDate)
                dates.push(DatePicker.createDateFromArr(this.props.minDate).getTime());
            // if (this.props.selectedDate) dates.push(DatePicker.createDateFromArr(this.props.selectedDate).getTime());
            // if (this.props.selectedMonth) dates.push(new Date(this.props.selectedMonth[0], this.props.selectedMonth[1], 1).getTime());
            const date = new Date(Math.min(...dates));
            // console.log('date:', date);
            return [date.getFullYear(), date.getMonth()];
        }
    }
    static getTodayArr() {
        return DatePicker.dateToArray(new Date());
    }
    static dateToArray(date) {
        return [date.getFullYear(), date.getMonth(), date.getDate()];
    }
    static getDay(date) {
        let day = date.getDay() - 1;
        if (day === -1)
            day = 6;
        if (day === 0)
            day = 7;
        return day;
    }
    createSelectedDate() {
        if (!this.isDateSelected())
            throw new Error('date not selected');
        // @ts-ignore
        return new Date(...this.props.selectedDate);
    }
    isDateSelected() {
        return !!this.props.selectedDate;
    }
    getFirstDateOfTable() {
        const date = new Date(this.state.selectedMonth[0], this.state.selectedMonth[1], 1); // first day of month
        date.setDate(date.getDate() - DatePicker.getDay(date)); // first day of table
        return date;
    }
    createMinDate() {
        if (!this.props.minDate)
            throw new Error('no min date');
        return new Date(this.props.minDate[0], this.props.minDate[1], this.props.minDate[2]);
    }
    isMinDate() {
        return !!this.props.minDate;
    }
    isPrevAllowed() {
        const prev = new Date(this.state.selectedMonth[0], this.state.selectedMonth[1]);
        prev.setMonth(prev.getMonth() - 1);
        return this.isMonthAllowed(prev);
    }
    isMonthAllowed(month) {
        if (this.isMinDate()) {
            const minMonth = new Date(this.props.minDate[0], this.props.minDate[1]);
            return month.getTime() >= minMonth.getTime();
        }
        return true;
    }
    onDateClick(target) {
        // console.log('DatePicker.onDateClick', target.dataset.date);
        if (this.props.onDateSelected) {
            this.props.onDateSelected(JSON.parse(target.dataset.date));
        }
    }
    render() {
        // console.log('DatePicker.render', this.props, this.state);
        const date = this.getFirstDateOfTable();
        const today = _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.today();
        const minDate = this.isMinDate() ? this.createMinDate() : null;
        const selectedDate = this.isDateSelected() ? this.createSelectedDate() : null;
        // @ts-ignore
        const highlightedDate = this.props.highlightedDate
            ? // @ts-ignore
                new Date(...this.props.highlightedDate)
            : null;
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", Object.assign({ className: `${this.getCssClassNames()} ${this.isVisible() ? 'visible' : ''}`, onClick: this.onClick, onMouseDown: this.onMouseDown }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("caption", Object.assign({ className: `${this.getCssBlockName()}__caption` }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ className: `${this.getCssBlockName()}__caption-content` }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__caption-link ${this.isPrevAllowed() ? 'enabled' : ''}`, onClick: this.onPrevClick }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_LeftIcon__WEBPACK_IMPORTED_MODULE_3__.LeftIcon, { size: 18 }) })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", Object.assign({ className: `${this.getCssBlockName()}__caption-title` }, { children: `${this.MONTH[this.state.selectedMonth[1]]}, ${this.state.selectedMonth[0]}` })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__caption-link enabled`, onClick: this.onNextClick }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_RightIcon__WEBPACK_IMPORTED_MODULE_4__.RightIcon, { size: 18 }) }))] })) })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("thead", { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", Object.assign({ className: `${this.getCssBlockName()}__th` }, { children: "\u041F\u043D" })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", Object.assign({ className: `${this.getCssBlockName()}__th` }, { children: "\u0412\u0442" })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", Object.assign({ className: `${this.getCssBlockName()}__th` }, { children: "\u0421\u0440" })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", Object.assign({ className: `${this.getCssBlockName()}__th` }, { children: "\u0427\u0442" })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", Object.assign({ className: `${this.getCssBlockName()}__th` }, { children: "\u041F\u0442" })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", Object.assign({ className: `${this.getCssBlockName()}__th weekend` }, { children: "\u0421\u0431" })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", Object.assign({ className: `${this.getCssBlockName()}__th weekend` }, { children: "\u0412\u0441" }))] }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tbody", { children: Array.from(Array(6).keys()).map((i) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tr", { children: Array.from(Array(7).keys()).map((j) => {
                            const classList = [];
                            if (j === 5 || j === 6)
                                classList.push('weekend');
                            if (this.isSelectToday() && date.getTime() === today.getTime())
                                classList.push('today');
                            if (date.getMonth() !== this.state.selectedMonth[1])
                                classList.push('out');
                            if (!minDate)
                                classList.push('selectable');
                            else if (date.getTime() >= minDate.getTime())
                                classList.push('selectable');
                            if (selectedDate && date.getTime() === selectedDate.getTime())
                                classList.push('selected');
                            if (highlightedDate && highlightedDate.getTime() === date.getTime())
                                classList.push('highlight');
                            const text = date.getDate().toString();
                            const dataDate = JSON.stringify(DatePicker.dateToArray(date));
                            const style = this.props.getDateStyle
                                ? this.props.getDateStyle(date)
                                : null;
                            date.setDate(date.getDate() + 1);
                            return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", Object.assign({ className: `${this.getCssBlockName()}__td  ${classList.join(' ')}`, style: style, "data-date": dataDate }, { children: text }), text));
                        }) }, i))) })] })));
    }
    isSelectToday() {
        if (this.props.selectToday === false)
            return false;
        return true;
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.DatePicker = DatePicker;
}


/***/ }),

/***/ "./src/frontend/common/widget/DropdownButton/DropdownButton.tsx":
/*!**********************************************************************!*\
  !*** ./src/frontend/common/widget/DropdownButton/DropdownButton.tsx ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DropdownButton": () => (/* binding */ DropdownButton)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Button */ "./src/frontend/common/widget/Button.tsx");
/* harmony import */ var _DropdownButton_less__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DropdownButton.less */ "./src/frontend/common/widget/DropdownButton/DropdownButton.less");
/* harmony import */ var _DropdownButton_less__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_DropdownButton_less__WEBPACK_IMPORTED_MODULE_3__);




class DropdownButton extends _ReactComponent__WEBPACK_IMPORTED_MODULE_1__.ReactComponent {
    constructor(props) {
        super(props);
        this.onButtonClick = (e) => {
            // console.log('DropdownButton.onButtonClick');
            this.setState((state) => ({ open: !state.open }));
        };
        this.onButtonBlur = (e) => {
            // console.log('DropdownButton.onButtonBlur');
            if (this.state.open) {
                this.setState({ open: false });
            }
        };
        this.onKeyDown = (e) => {
            // console.log('DropdownButton.onKeyDown', e.key);
            if (e.key === 'Escape' && this.state.open) {
                this.setState({ open: false });
                e.stopPropagation();
            }
        };
        this.onUlMouseDown = (e) => {
            // console.log('DropdownButton.onUlMouseDown');
            e.preventDefault();
        };
        this.onLiClick = async (e) => {
            // console.log('DropdownButton.onLiClick', e.currentTarget);
            const li = e.currentTarget;
            this.setState({ open: false }, () => {
                if (this.props.onClick) {
                    this.props.onClick(li);
                }
            });
        };
        this.state = {
            open: false,
            disabled: false,
        };
    }
    isEnabled() {
        if (this.props.enabled !== undefined)
            return this.props.enabled;
        // if (this.props.isDisabled) return this.props.isDisabled(this.props.name);
        return !this.state.disabled;
    }
    render() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ className: `${this.getCssClassNames()} ${this.state.open && 'show'}` }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__.Button, Object.assign({ classList: [`${this.getCssBlockName()}__button`], onClick: this.onButtonClick, onBlur: this.onButtonBlur, enabled: this.isEnabled(), onKeyDown: this.onKeyDown }, { children: this.props.title || this.props.children })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ul", Object.assign({ className: `${this.getCssBlockName()}__dropdown`, onMouseDown: this.onUlMouseDown }, { children: this.props.actions &&
                        this.props.actions.map((action) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", Object.assign({ className: `${this.getCssBlockName()}__item ${action.enabled === false ? 'disabled' : ''}`, "data-action": action.name, onClick: action.enabled !== false ? this.onLiClick : null }, { children: action.title }), action.name))) }))] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.DropdownButton = DropdownButton;
}


/***/ }),

/***/ "./src/frontend/common/widget/DropdownDatePicker/DropdownDatePicker.tsx":
/*!******************************************************************************!*\
  !*** ./src/frontend/common/widget/DropdownDatePicker/DropdownDatePicker.tsx ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DropdownDatePicker": () => (/* binding */ DropdownDatePicker)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Helper */ "./src/frontend/common/Helper.ts");
/* harmony import */ var _icon_CloseIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../icon/CloseIcon */ "./src/frontend/common/icon/CloseIcon.tsx");
/* harmony import */ var _icon_DateIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../icon/DateIcon */ "./src/frontend/common/icon/DateIcon.tsx");
/* harmony import */ var _icon_CloseIcon2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../icon/CloseIcon2 */ "./src/frontend/common/icon/CloseIcon2.tsx");
/* harmony import */ var _DatePicker_DatePicker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../DatePicker/DatePicker */ "./src/frontend/common/widget/DatePicker/DatePicker.tsx");
/* harmony import */ var _DropdownDatePicker_less__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DropdownDatePicker.less */ "./src/frontend/common/widget/DropdownDatePicker/DropdownDatePicker.less");
/* harmony import */ var _DropdownDatePicker_less__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_DropdownDatePicker_less__WEBPACK_IMPORTED_MODULE_7__);








// oldDates boolean true
class DropdownDatePicker extends _ReactComponent__WEBPACK_IMPORTED_MODULE_1__.ReactComponent {
    constructor(props) {
        // console.log('DropdownDatePicker.constructor', props);
        super(props);
        this.onInputClick = (e) => {
            // console.log('DropdownDatePicker.onInputClick', e);
            if (this.props.readOnly)
                return;
            this.setState((prevState) => ({ open: !prevState.open }));
        };
        this.onInputKeyDown = (e) => {
            // console.log('DropdownDatePicker.onInputKeyDown', e.key);
            if (e.key === 'Escape' && this.state.open) {
                this.setState({ open: false });
                e.stopPropagation();
            }
        };
        this.onCloseDown = async (e) => {
            // console.log('DropdownDatePicker.onCloseDown', e);
            this.setState({ value: null });
            if (this.props.onChange) {
                this.props.onChange(null);
            }
        };
        this.onBlur = (e) => {
            // console.log('DropdownDatePicker.onBlur');
            if (this.state.open) {
                this.setState({ open: false });
            }
        };
        this.onDatePickerMouseDown = (e) => {
            // console.log('DropdownDatePicker.onDatePickerMouseDown');
            e.preventDefault();
            // e.stopPropagation();
            // return false;
        };
        this.onDatePickerDateSelected = (date) => {
            // console.log('DropdownDatePicker.onDatePickerDateSelected', date);
            const value = new Date(date[0], date[1], date[2]);
            this.setState({ open: false, value });
            if (this.props.onChange) {
                this.props.onChange(value);
            }
        };
        this.state = {
            open: false,
            value: props.value || null,
        };
        if (props.value && !(props.value instanceof Date)) {
            throw new Error(`need Date type, got ${typeof props.value}`);
        }
    }
    getFormat() {
        // if (this.props.format) return this.props.format;
        // return '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}';
        return this.props.format || '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}';
    }
    getStringValue() {
        const value = this.getValue();
        if (value) {
            let format = this.getFormat();
            // @ts-ignore
            if (ApplicationController.isDebugMode()) {
                const time = _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.formatDate(value, '{hh}:{mm}:{ss}');
                if (format === '{DD}.{MM}.{YYYY}' && time !== '00:00:00') {
                    format = '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}';
                }
            }
            return _Helper__WEBPACK_IMPORTED_MODULE_2__.Helper.formatDate(value, format);
        }
        return '';
    }
    /*getMinDate() {
        if (this.props.getMinDate) {
            return this.props.getMinDate();
        } else if (this.props.oldDates === false) {
            return DatePicker.getTodayArr();
        }
        return null;
    }*/
    getSelectedMonth() {
        if (this.getValue()) {
            return [this.getValue().getFullYear(), this.getValue().getMonth()];
        }
        return null;
    }
    getSelectedDate() {
        if (this.getValue()) {
            return [
                this.getValue().getFullYear(),
                this.getValue().getMonth(),
                this.getValue().getDate(),
            ];
        }
        return null;
    }
    getValue() {
        return this.state.value;
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('DropdownDatePicker.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        // @ts-ignore
        this.state.value = nextProps.value;
        return true;
    }
    getClassList() {
        return [...super.getClassList(), ...(this.props.readOnly ? ['read-only'] : [])];
    }
    renderInput() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", { className: `${this.getCssBlockName()}__input`, type: 'text', readOnly: true, onClick: this.onInputClick, onBlur: this.onBlur, value: this.getStringValue(), placeholder: this.props.placeholder, onKeyDown: this.onInputKeyDown }));
    }
    renderCloseIcon() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__close ${this.getStringValue() !== '' && !this.props.readOnly ? 'visible' : ''}`, onMouseDown: this.onCloseDown }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_CloseIcon__WEBPACK_IMPORTED_MODULE_3__.CloseIcon, {}) })));
    }
    renderDateIcon() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__icon` }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_DateIcon__WEBPACK_IMPORTED_MODULE_4__.DateIcon, {}) })));
    }
    renderDatePicker() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ className: `${this.getCssBlockName()}__date-picker-container` }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__date-picker-close` }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_CloseIcon2__WEBPACK_IMPORTED_MODULE_5__.CloseIcon2, {}) })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_DatePicker_DatePicker__WEBPACK_IMPORTED_MODULE_6__.DatePicker
                // minDate={this.getMinDate()}
                , { 
                    // minDate={this.getMinDate()}
                    minDate: this.props.minDate, selectedMonth: this.getSelectedMonth(), selectedDate: this.getSelectedDate(), onMouseDown: this.onDatePickerMouseDown, onDateSelected: this.onDatePickerDateSelected, selectToday: this.props.selectToday, highlightedDate: this.props.highlightedDate })] })));
    }
    render() {
        // console.log('DropdownDatePicker.render', this.props, this.state);
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ className: this.getCssClassNames() }, { children: [this.renderInput(), this.renderCloseIcon(), this.renderDateIcon(), this.state.open && this.renderDatePicker()] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.DropdownDatePicker = DropdownDatePicker;
}


/***/ }),

/***/ "./src/frontend/common/widget/Expand/Expand.tsx":
/*!******************************************************!*\
  !*** ./src/frontend/common/widget/Expand/Expand.tsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Expand": () => (/* binding */ Expand)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");
/* harmony import */ var _icon_DownIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../icon/DownIcon */ "./src/frontend/common/icon/DownIcon.tsx");
/* harmony import */ var _Expand_less__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Expand.less */ "./src/frontend/common/widget/Expand/Expand.less");
/* harmony import */ var _Expand_less__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Expand_less__WEBPACK_IMPORTED_MODULE_3__);




class Expand extends _ReactComponent__WEBPACK_IMPORTED_MODULE_1__.ReactComponent {
    constructor(props) {
        super(props);
        this.onTitleClick = (e) => {
            console.log('Expand.onTitleClick');
            this.setState((prevState) => {
                return { opened: !prevState.opened };
            });
        };
        this.state = {
            opened: this.props.opened !== undefined ? this.props.opened : false,
        };
    }
    isOpened() {
        return this.state.opened;
    }
    isHighlighted() {
        return !!this.props.highlighted;
    }
    render() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ className: `${this.getCssClassNames()} ${this.isOpened() ? 'opened' : ''} ${this.isHighlighted() ? 'highlighted' : ''}` }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ className: `${this.getCssBlockName()}__header`, onClick: this.onTitleClick }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__icon` }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_DownIcon__WEBPACK_IMPORTED_MODULE_2__.DownIcon, {}) })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__title` }, { children: this.props.title }))] })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__content` }, { children: this.props.children }))] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.Expand = Expand;
}


/***/ }),

/***/ "./src/frontend/common/widget/Grid/Grid.tsx":
/*!**************************************************!*\
  !*** ./src/frontend/common/widget/Grid/Grid.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Grid": () => (/* binding */ Grid)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Helper */ "./src/frontend/common/Helper.ts");
/* harmony import */ var _GridRow_GridRow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../GridRow/GridRow */ "./src/frontend/common/widget/GridRow/GridRow.tsx");
/* harmony import */ var _GridCell_GridCell__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../GridCell/GridCell */ "./src/frontend/common/widget/GridCell/GridCell.tsx");
/* harmony import */ var _Grid_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Grid.less */ "./src/frontend/common/widget/Grid/Grid.less");
/* harmony import */ var _Grid_less__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_Grid_less__WEBPACK_IMPORTED_MODULE_6__);







class Grid extends _ReactComponent__WEBPACK_IMPORTED_MODULE_2__.ReactComponent {
    constructor(props) {
        // console.log('Grid.constructor', props);
        super(props);
        this.onCellMouseDown = async (e) => {
            console.log('Grid.onCellMouseDown', this.isLink());
            e.preventDefault(); // prevent text selection on double click
            if (this.isDisabled())
                return;
            this.getElement().focus();
            // if (this.isLink()) return;
            const button = e.button;
            const [i, j] = JSON.parse(e.currentTarget.dataset.rc);
            const row = this.props.rows[i];
            const key = e.currentTarget.dataset.row;
            await this.selectCell(key, j);
            if (button === 0 && this.props.onClick) {
                this.props.onClick(row, key);
            }
        };
        this.onRowMouseDown = async (e) => {
            console.log('Grid.onRowMouseDown', this.isLink());
            // if (this.isLink()) return;
            const key = e.currentTarget.dataset.row;
            await this.selectRow(key);
        };
        this.onCellDoubleClick = async (e) => {
            // console.log('Grid.onCellDoubleClick');
            const button = e.button;
            const [i, j] = JSON.parse(e.currentTarget.dataset.rc);
            const row = this.props.rows[i];
            const key = e.currentTarget.dataset.row;
            // console.log('row:', row);
            if (button === 0 && this.props.onDoubleClick) {
                await this.props.onDoubleClick(row, key);
            }
        };
        this.onRowDoubleClick = async (e) => {
            // console.log('Grid.onRowDoubleClick');
            const i = parseInt(e.currentTarget.dataset.r);
            const row = this.props.rows[i];
            const key = e.currentTarget.dataset.row;
            // console.log('row:', row);
            if (this.props.onDoubleClick) {
                await this.props.onDoubleClick(row, key);
            }
        };
        this.onKeyDown = async (e) => {
            // console.log('Grid.onKeyDown', e.keyCode, e.ctrlKey, e.shiftKey);
            if (this.isDisabled())
                return;
            switch (e.keyCode) {
                case 37:
                    e.preventDefault();
                    await this.onLeft();
                    break;
                case 38:
                    e.preventDefault();
                    await this.onUp();
                    break;
                case 39:
                    e.preventDefault();
                    await this.onRight();
                    break;
                case 40:
                    e.preventDefault();
                    await this.onDown();
                    break;
                case 13:
                    e.preventDefault();
                    await this.onEnter();
                    break;
                case 46:
                    e.preventDefault();
                    await this.onDelete();
                    break;
                case 67:
                    if (e.ctrlKey) {
                        e.preventDefault();
                        await this.onCopy();
                    }
                    break;
            }
        };
        this.onResizeDoubleClick = async (e) => {
            console.log('Grid.onResizeDoubleClick', e.target);
            const i = parseInt(e.target.dataset.i);
            const column = this.props.columns[i];
            if (this.state.columnWidth[column.name] === this.getMaxColumnWidth(column))
                return;
            this.state.columnWidth[column.name] = this.getMaxColumnWidth(column);
            // @ts-ignore
            this.state.resized = Date.now();
            await this.rerender();
        };
        this.onCellViewCreate = (c) => {
            // console.log('Grid.onCellViewCreate', c.props.column.name);
            const columnName = c.props.column.name;
            if (this.columns[columnName] === undefined)
                this.columns[columnName] = [];
            this.columns[columnName].push(c);
        };
        this.onCellViewUnmount = (c) => {
            // console.log('Grid.onCellViewUnmount', c.props.column.name);
            const columnName = c.props.column.name;
            const i = this.columns[columnName].indexOf(c);
            if (i === -1)
                throw new Error('cannot find FieldView in Grid.columns');
            this.columns[columnName].splice(i, 1);
        };
        this.onBodyScroll = async (e) => {
            // console.log('Grid.onBodyScroll', e.target.scrollLeft);
            this.head.current.scrollLeft = e.target.scrollLeft;
        };
        this.onLinkClick = async (e) => {
            console.log('Grid.onLinkClick', e.ctrlKey);
            if (e.ctrlKey)
                return;
            e.preventDefault();
            /*if (!this.isLink()) return;
            const key = e.currentTarget.dataset.key;
            if (this.props.onLinkClick) {
                await this.props.onLinkClick(key);
            }*/
        };
        this.state = {
            key: this.props.selectedKey || null,
            column: this.props.selectedKey && this.props.columns && this.props.columns.length
                ? 0
                : null,
            columnWidth: {},
            resized: Date.now(),
        };
        this.columns = {}; // each column is the array of each cell view
        this.el = react__WEBPACK_IMPORTED_MODULE_1__.createRef();
        this.head = react__WEBPACK_IMPORTED_MODULE_1__.createRef();
    }
    getActiveColumn() {
        return this.state.column;
    }
    setActiveColumn(column) {
        // @ts-ignore
        this.state.column = column;
    }
    getActiveRowKey() {
        return this.state.key;
    }
    setActiveRowKey(key) {
        // console.log('Grid.setActiveRowKey', key);
        // @ts-ignore
        this.state.key = key;
    }
    isRowActive(i, key) {
        return this.getActiveRowKey() === key;
    }
    async onCopy() {
        console.log('Grid.onCopy');
        const row = this.findRow(this.getActiveRowKey());
        const column = this.props.columns[this.getActiveColumn()].name;
        const text = row[column];
        await _Helper__WEBPACK_IMPORTED_MODULE_3__.Helper.copyTextToClipboard(text);
    }
    findRow(key) {
        return this.props.rows.find((row) => this.getRowKey(row) === key);
    }
    async onLeft() {
        console.log('Grid.onLeft');
        const j = this.getActiveColumn();
        if (j - 1 >= 0) {
            this.setActiveColumn(j - 1);
            await this.rerender();
        }
    }
    async onUp() {
        console.log('Grid.onUp');
        const key = this.getActiveRowKey();
        const row = this.findRow(key);
        const i = this.props.rows.indexOf(row);
        if (i - 1 >= 0) {
            const pRow = this.props.rows[i - 1];
            const pKey = this.getRowKey(pRow);
            this.setActiveRowKey(pKey);
            await this.rerender();
        }
    }
    async onRight() {
        console.log('Grid.onRight');
        const j = this.getActiveColumn();
        if (j + 1 <= this.props.columns.length - 1) {
            this.setActiveColumn(j + 1);
            await this.rerender();
        }
    }
    async onDown() {
        console.log('Grid.onDown');
        const key = this.getActiveRowKey();
        const row = this.findRow(key);
        const i = this.props.rows.indexOf(row);
        if (i + 1 <= this.props.rows.length - 1) {
            const nRow = this.props.rows[i + 1];
            const nKey = this.getRowKey(nRow);
            this.setActiveRowKey(nKey);
            await this.rerender();
        }
    }
    async onEnter() {
        console.log('Grid.onEnter');
        const key = this.getActiveRowKey();
        const row = this.findRow(key);
        // console.log(row, key);
        if (this.props.onDoubleClick) {
            await this.props.onDoubleClick(row, key);
        }
    }
    async onDelete() {
        console.log('Grid.onDelete');
        const key = this.getActiveRowKey();
        const row = this.findRow(key);
        // console.log(row, key);
        if (this.props.onDeleteKeyDown) {
            await this.props.onDeleteKeyDown(row, key);
        }
    }
    async selectCell(key, j) {
        // console.log('Grid.selectCell', key, j);
        if (this.getActiveRowKey() === key && this.getActiveColumn() === j)
            return;
        this.setActiveRowKey(key);
        this.setActiveColumn(j);
        if (this.props.onSelectionChange) {
            await this.props.onSelectionChange(key);
        }
        else {
            await this.rerender();
        }
    }
    async selectRow(key) {
        // console.log('Grid.selectRow', key);
        if (this.getActiveRowKey() === key)
            return;
        this.setActiveRowKey(key);
        if (this.props.onSelectionChange) {
            await this.props.onSelectionChange(key);
        }
        else {
            await this.rerender();
        }
    }
    getMaxColumnWidth(column) {
        return (Math.max(...this.columns[column.name].map((view) => view.getSpanOffsetWidth())) + 10 + 2);
    }
    getColumnWidth(i) {
        const column = this.props.columns[i];
        if (this.state.columnWidth[column.name] !== undefined) {
            return this.state.columnWidth[column.name];
        }
        return column.width;
    }
    renderColumns() {
        return this.props.columns.map((column, i) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ className: `${this.getCssBlockName()}__th`, style: { width: this.getColumnWidth(i) } }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: 'ellipsis', style: { textAlign: column.align } }, { children: column.title || column.name })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { className: 'Grid__resize', "data-i": i, onDoubleClick: this.onResizeDoubleClick })] }), column.name)));
    }
    renderRows() {
        return this.props.rows.map((row, i) => {
            const key = this.getRowKey(row);
            return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_GridRow_GridRow__WEBPACK_IMPORTED_MODULE_4__.GridRow, { rowKey: key, grid: this, row: row, i: i, active: this.isRowActive(i, key), activeColumn: this.getActiveColumn(), updated: this.props.updated, resized: this.state.resized }, key));
        });
    }
    getRowKey(row) {
        if (this.props.getRowKey) {
            return this.props.getRowKey(row);
        }
        return this.props.rows.indexOf(row).toString();
    }
    renderCell(row, column) {
        let view;
        if (this.props.renderGridCellView) {
            view = this.props.renderGridCellView(row, column, this.onCellViewCreate, this.onCellViewUnmount);
        }
        if (view)
            return view;
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_GridCell_GridCell__WEBPACK_IMPORTED_MODULE_5__.GridCell, { grid: this, row: row, column: column, onCreate: this.onCellViewCreate, onUnmount: this.onCellViewUnmount }));
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('Grid.shouldComponentUpdate', this.props.name, nextProps.updated - this.props.updated);
        if (this.props.updated) {
            if (nextProps.updated - this.props.updated)
                return true;
            return false;
        }
        return true;
    }
    render() {
        // console.log('Grid.render', this.props.name);
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ className: `${this.getCssClassNames()} ${this.isDisabled() ? 'disabled' : ''}`, ref: this.el, tabIndex: 0, onKeyDown: this.onKeyDown }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__head`, ref: this.head }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__table` }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ className: `${this.getCssBlockName()}__tr` }, { children: [this.props.columns && this.renderColumns(), !!this.props.extraColumn && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${this.getCssBlockName()}__th` }))] })) })) })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__body`, onScroll: this.onBodyScroll }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__table` }, { children: this.props.rows && this.renderRows() })) }))] })));
    }
    isLink() {
        return !!this.props.createLinkCallback;
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.Grid = Grid;
}


/***/ }),

/***/ "./src/frontend/common/widget/GridCell/GridCell.tsx":
/*!**********************************************************!*\
  !*** ./src/frontend/common/widget/GridCell/GridCell.tsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GridCell": () => (/* binding */ GridCell)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Helper */ "./src/frontend/common/Helper.ts");




class GridCell extends _ReactComponent__WEBPACK_IMPORTED_MODULE_2__.ReactComponent {
    constructor(props) {
        super(props);
        this.span = react__WEBPACK_IMPORTED_MODULE_1__.createRef();
    }
    getSpanOffsetWidth() {
        if (!this.span.current)
            return 0;
        return this.span.current.offsetWidth;
    }
    renderCellValue(rawValue) {
        const value = this.props.grid.props.decodeValue ? _Helper__WEBPACK_IMPORTED_MODULE_3__.Helper.decodeValue(rawValue) : rawValue;
        if (typeof value === 'boolean')
            return value.toString();
        return value;
    }
    render() {
        const row = this.props.row;
        const column = this.props.column;
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssClassNames()} ellipsis` }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", Object.assign({ ref: this.span }, { children: this.renderCellValue(row[column.name]) })) })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.GridCell = GridCell;
}


/***/ }),

/***/ "./src/frontend/common/widget/GridRow/GridRow.tsx":
/*!********************************************************!*\
  !*** ./src/frontend/common/widget/GridRow/GridRow.tsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GridRow": () => (/* binding */ GridRow)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");


class GridRow extends _ReactComponent__WEBPACK_IMPORTED_MODULE_1__.ReactComponent {
    isCellActive(j) {
        return this.props.active && this.props.activeColumn === j;
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('GridRow.shouldComponentUpdate', nextProps.updated - this.props.updated, nextProps.resized - this.props.resized);
        if (this.props.updated) {
            if (nextProps.updated - this.props.updated)
                return true;
            if (nextProps.resized - this.props.resized)
                return true;
            if (this.props.active !== nextProps.active)
                return true;
            if (this.props.active && this.props.activeColumn !== nextProps.activeColumn)
                return true;
            return false;
        }
        return true;
    }
    render() {
        // console.log('GridRow.render', this.props.i);
        const grid = this.props.grid;
        const row = this.props.row;
        const i = this.props.i;
        const key = this.props.rowKey;
        const link = grid.props.createLinkCallback ? grid.props.createLinkCallback(key) : null;
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", Object.assign({ className: `${grid.getCssBlockName()}__tr ${this.props.active ? 'active' : ''}`, "data-key": key, href: link, onClick: grid.onLinkClick }, { children: [grid.props.columns.map((column, j) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${grid.getCssBlockName()}__td ${this.isCellActive(j) ? 'active' : ''}`, style: { width: grid.getColumnWidth(j) }, "data-rc": `[${i},${j}]`, "data-row": key, onMouseDown: grid.onCellMouseDown, onDoubleClick: grid.onCellDoubleClick }, { children: grid.renderCell(row, column) }), column.name))), !!grid.props.extraColumn && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: `${grid.getCssBlockName()}__td`, "data-r": i, "data-row": key, onMouseDown: grid.onRowMouseDown, onDoubleClick: grid.onRowDoubleClick }))] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.GridRow = GridRow;
}


/***/ }),

/***/ "./src/frontend/common/widget/Image/Image.tsx":
/*!****************************************************!*\
  !*** ./src/frontend/common/widget/Image/Image.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Image": () => (/* binding */ Image)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");
/* harmony import */ var _Image_less__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Image.less */ "./src/frontend/common/widget/Image/Image.less");
/* harmony import */ var _Image_less__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Image_less__WEBPACK_IMPORTED_MODULE_3__);




class Image extends _ReactComponent__WEBPACK_IMPORTED_MODULE_2__.ReactComponent {
    constructor(props) {
        super(props);
        this.onImgClick = async (e) => {
            console.log('Image.onImgClick');
            if (this.props.onClick) {
                return await this.props.onClick();
            }
            this.setState((prevState) => {
                if (prevState.classList) {
                    return { classList: null };
                }
                else {
                    return { classList: ['Image_full'] };
                }
            });
        };
        this.img = react__WEBPACK_IMPORTED_MODULE_1___default().createRef();
        this.state = { classList: null };
    }
    getNaturalSize() {
        return [this.img.current.naturalWidth, this.img.current.naturalHeight];
    }
    render() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", { className: this.getCssClassNames(), ref: this.img, src: this.props.src, onClick: this.onImgClick }));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.Image = Image;
}


/***/ }),

/***/ "./src/frontend/common/widget/Menu/Menu.tsx":
/*!**************************************************!*\
  !*** ./src/frontend/common/widget/Menu/Menu.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Menu": () => (/* binding */ Menu)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");
/* harmony import */ var _Menu_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Menu.less */ "./src/frontend/common/widget/Menu/Menu.less");
/* harmony import */ var _Menu_less__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Menu_less__WEBPACK_IMPORTED_MODULE_2__);



class Menu extends _ReactComponent__WEBPACK_IMPORTED_MODULE_1__.ReactComponent {
    constructor(props) {
        // console.log('Menu.constructor', props);
        super(props);
        this.onMenuClick = async (e) => {
            // console.log('Menu.onMenuClick', e.currentTarget.dataset.menu);
            await this.toggleMenu(e.currentTarget.dataset.menu);
        };
        this.onBlur = async (e) => {
            // console.log('Menu.onBlur', e.currentTarget.dataset.menu);
            await this.closeMenu(e.currentTarget.dataset.menu);
        };
        this.onMouseDown = (e) => {
            // console.log('Menu.onMouseDown');
            e.preventDefault();
            // e.stopPropagation();
            // return false;
        };
        this.onMenuItemClick = async (e) => {
            // console.log('Menu.onMenuItemClick', e.target.dataset.menu, e.target.dataset.item);
            e.persist();
            const { menu, type, name } = e.target.dataset;
            await this.closeMenu(menu);
            if (this.props.onClick) {
                this.props.onClick(menu, type, name);
            }
        };
        this.state = {};
    }
    toggleMenu(menu) {
        return new Promise((resolve) => {
            this.setState((prevState) => ({
                [menu]: !prevState[menu],
            }), resolve);
        });
    }
    closeMenu(menu) {
        return new Promise((resolve) => this.setState({ [menu]: false }, resolve));
    }
    render() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: "Menu" }, { children: this.props.items &&
                this.props.items.map((menu) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ className: this.state[menu.name] ? 'active' : null }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", Object.assign({ "data-menu": menu.name, onClick: this.onMenuClick, onBlur: this.onBlur }, { children: menu.title })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ onMouseDown: this.onMouseDown, onClick: this.onMenuItemClick }, { children: menu.items.map((item) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", Object.assign({ "data-menu": menu.name, "data-type": item.type, "data-name": item.name }, { children: item.title }), item.name))) }))] }), menu.name))) })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.Menu = Menu;
}


/***/ }),

/***/ "./src/frontend/common/widget/Modal/Modal.tsx":
/*!****************************************************!*\
  !*** ./src/frontend/common/widget/Modal/Modal.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Modal": () => (/* binding */ Modal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");
/* harmony import */ var _Modal_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Modal.less */ "./src/frontend/common/widget/Modal/Modal.less");
/* harmony import */ var _Modal_less__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Modal_less__WEBPACK_IMPORTED_MODULE_2__);



class Modal extends _ReactComponent__WEBPACK_IMPORTED_MODULE_1__.ReactComponent {
    render() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: this.getCssClassNames() }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__container` }, { children: this.props.children })) })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.Modal = Modal;
}


/***/ }),

/***/ "./src/frontend/common/widget/Password/Password.tsx":
/*!**********************************************************!*\
  !*** ./src/frontend/common/widget/Password/Password.tsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Password": () => (/* binding */ Password)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");
/* harmony import */ var _icon_CloseIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../icon/CloseIcon */ "./src/frontend/common/icon/CloseIcon.tsx");
/* harmony import */ var _icon_VisibilityIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../icon/VisibilityIcon */ "./src/frontend/common/icon/VisibilityIcon.tsx");
/* harmony import */ var _icon_VisibilityOffIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../icon/VisibilityOffIcon */ "./src/frontend/common/icon/VisibilityOffIcon.tsx");
/* harmony import */ var _Password_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Password.less */ "./src/frontend/common/widget/Password/Password.less");
/* harmony import */ var _Password_less__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_Password_less__WEBPACK_IMPORTED_MODULE_6__);







class Password extends _ReactComponent__WEBPACK_IMPORTED_MODULE_2__.ReactComponent {
    constructor(props) {
        super(props);
        this.onChange = (e) => {
            this._setValue(e.target.value);
        };
        this.onCloseClick = (e) => {
            this._setValue('');
            this.getInputElement().focus();
        };
        this.onIconClick = (e) => {
            this.setState((prevState) => {
                return {
                    type: prevState.type === 'password' ? 'text' : 'password',
                };
            });
            this.getInputElement().focus();
        };
        this.el = react__WEBPACK_IMPORTED_MODULE_1__.createRef();
        this.inputEl = react__WEBPACK_IMPORTED_MODULE_1__.createRef();
        this.state = {
            value: this.props.value || '',
            type: 'password',
        };
    }
    getInputElement() {
        return this.inputEl.current;
    }
    getValue() {
        return this.state.value;
    }
    _setValue(value) {
        // @ts-ignore
        this.state.value = value;
        this.forceUpdate();
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // @ts-ignore
        this.state.value = nextProps.value;
        return true;
    }
    isCloseVisible() {
        return this.state.value !== '';
    }
    render() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ ref: this.el, className: this.getCssClassNames() }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", { ref: this.inputEl, className: `${this.getCssBlockName()}__input`, type: this.state.type, id: this.props.id, name: this.props.name, readOnly: this.props.readOnly, disabled: this.props.disabled, placeholder: this.props.placeholder, autoFocus: this.props.autoFocus, spellCheck: this.props.spellCheck, autoComplete: this.props.autocomplete, value: this.state.value, onFocus: this.props.onFocus, onBlur: this.props.onBlur, onChange: this.onChange }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__close ${this.isCloseVisible() ? 'visible' : ''}`, onClick: this.onCloseClick }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_CloseIcon__WEBPACK_IMPORTED_MODULE_3__.CloseIcon, {}) })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__icon`, onClick: this.onIconClick }, { children: this.state.type === 'password' ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_VisibilityIcon__WEBPACK_IMPORTED_MODULE_4__.VisibilityIcon, {}) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_VisibilityOffIcon__WEBPACK_IMPORTED_MODULE_5__.VisibilityOffIcon, {}) }))] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.Password = Password;
}


/***/ }),

/***/ "./src/frontend/common/widget/PhoneBox.tsx":
/*!*************************************************!*\
  !*** ./src/frontend/common/widget/PhoneBox.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PhoneBox": () => (/* binding */ PhoneBox)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");



class PhoneBox extends _ReactComponent__WEBPACK_IMPORTED_MODULE_2__.ReactComponent {
    constructor(props) {
        super(props);
        this.onKeyPress = (e) => {
            // console.log('PhoneBox.onKeyPress', e.key, e.target.value);
            // console.log('start/end', e.target.selectionStart, e.target.selectionEnd);
            if (!['+', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
                e.preventDefault();
            }
            if (e.key === '+' &&
                e.target.value.length &&
                Math.abs(e.target.selectionEnd - e.target.selectionStart) !== e.target.value.length) {
                e.preventDefault();
            }
        };
        this.onChange = (e) => {
            // console.log('PhoneBox.onChange', e.target.value);
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            const len = e.target.value.length;
            // console.log('start/end/len:', start, end, len);
            // disable edition in middle
            if (start !== end || start !== len) {
                return;
            }
            // value pipeline
            let value = PhoneBox.clearValue(e.target.value);
            value = PhoneBox.ifNoCodeAddRussianCode(value);
            // state
            // @ts-ignore
            this.state.value = PhoneBox.formatPhoneNumber(value);
            this.setState({ value: this.state.value }); // for render only
            // event
            if (this.props.onChange) {
                this.props.onChange(value);
            }
        };
        this.onBlur = (e) => {
            // console.log('PhoneBox.onBlur');
            let value = PhoneBox.clearValue(e.target.value);
            value = PhoneBox.ifNoCodeAddRussianCode(value);
            // console.log('value:', value);
            // event
            if (this.props.onBlur) {
                this.props.onBlur(value);
            }
        };
        this.el = react__WEBPACK_IMPORTED_MODULE_1___default().createRef();
        this.state = {
            value: PhoneBox.formatPhoneNumber(this.props.value || ''),
        };
    }
    getValue() {
        return PhoneBox.clearValue(this.state.value);
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('TextBox.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        if (nextProps.value !== undefined) {
            // @ts-ignore
            this.state.value = PhoneBox.formatPhoneNumber(nextProps.value);
        }
        return true;
    }
    render() {
        // console.log('TextBox.render');
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", { ref: this.el, className: this.getCssClassNames(), type: 'text', id: this.props.id, name: this.props.name, readOnly: this.props.readOnly, disabled: this.props.disabled, placeholder: this.props.placeholder, autoFocus: this.props.autoFocus, spellCheck: this.props.spellCheck, autoComplete: this.props.autocomplete, value: this.state.value, onFocus: this.props.onFocus, onChange: this.onChange, onBlur: this.onBlur, onKeyPress: this.onKeyPress }));
    }
    static clearValue(value) {
        return value.replace(/[^\+0-9]/g, '');
    }
    static ifNoCodeAddRussianCode(value) {
        if (value === '') {
        }
        else if (value.match(/^8/)) {
            return value.replace(/^8/, '+7');
        }
        else if (value.match(/^7/)) {
            return `+${value}`;
        }
        else if (value[0] !== '+') {
            return `+7${value}`;
        }
        return value;
    }
    static formatPhoneNumber(_value) {
        const value = PhoneBox.clearValue(_value);
        // russian country code
        const arr = /(^\+7)(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/.exec(value);
        // console.log('arr:', arr);
        if (arr) {
            if (arr[5]) {
                return `${arr[1]} ${arr[2]} ${arr[3]}-${arr[4]}-${arr[5]}`;
            }
            if (arr[4]) {
                return `${arr[1]} ${arr[2]} ${arr[3]}-${arr[4]}`;
            }
            if (arr[3]) {
                return `${arr[1]} ${arr[2]} ${arr[3]}`;
            }
            if (arr[2]) {
                return `${arr[1]} ${arr[2]}`;
            }
            if (arr[1]) {
                return `${arr[1]}`;
            }
        }
        return value;
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.PhoneBox = PhoneBox;
}


/***/ }),

/***/ "./src/frontend/common/widget/Radio.tsx":
/*!**********************************************!*\
  !*** ./src/frontend/common/widget/Radio.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Radio": () => (/* binding */ Radio)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");


class Radio extends _ReactComponent__WEBPACK_IMPORTED_MODULE_1__.ReactComponent {
    constructor(props) {
        // console.log('Radio.constructor', props.value);
        super(props);
        this.onChange = async (e) => {
            // console.log('Radio.onChange', e.target.value);
            this.setState({ value: e.target.value });
            if (this.props.onChange) {
                await this.props.onChange(e.target.value);
            }
        };
        if (!props.name)
            throw new Error('no name');
        this.state = {
            value: this.getInitialValue(),
        };
        console.log('value:', JSON.stringify(this.getValue()));
    }
    getInitialValue() {
        let value = null;
        if (this.props.value !== undefined && this.props.value !== null) {
            value = this.props.value;
            const item = this.props.items.find((item) => item.value === this.props.value);
            if (!item) {
                console.error(`Radio: no item for value:`, JSON.stringify(this.props.value));
                console.log('items:', this.props.items);
            }
        }
        return value;
    }
    getValue() {
        return this.state.value;
    }
    renderItem(item, i) {
        return [
            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", { type: 'radio', name: this.props.name, id: `${this.props.name}${i}`, value: item.value, onChange: this.onChange, checked: item.value === this.getValue(), readOnly: this.isReadOnly(), disabled: this.isReadOnly() }),
            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", Object.assign({ htmlFor: `${this.props.name}${i}` }, { children: item.title || item.value })),
        ];
    }
    isReadOnly() {
        if (this.props.readOnly !== undefined)
            return this.props.readOnly;
        return false;
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('Radio.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        // @ts-ignore
        this.state.value = nextProps.value;
        return true;
    }
    render() {
        const items = this.props.items || [];
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: this.getCssClassNames() }, { children: items.map((item, i) => this.renderItem(item, i)) })));
    }
}


/***/ }),

/***/ "./src/frontend/common/widget/Select/Select.tsx":
/*!******************************************************!*\
  !*** ./src/frontend/common/widget/Select/Select.tsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Select": () => (/* binding */ Select)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");
/* harmony import */ var _icon_CloseIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../icon/CloseIcon */ "./src/frontend/common/icon/CloseIcon.tsx");
/* harmony import */ var _icon_ArrowIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../icon/ArrowIcon */ "./src/frontend/common/icon/ArrowIcon.tsx");
/* harmony import */ var _Select_less__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Select.less */ "./src/frontend/common/widget/Select/Select.less");
/* harmony import */ var _Select_less__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Select_less__WEBPACK_IMPORTED_MODULE_5__);






class Select extends _ReactComponent__WEBPACK_IMPORTED_MODULE_2__.ReactComponent {
    constructor(props) {
        super(props);
        this.onKeyDown = async (e) => {
            // console.log('Select.onKeyDown');
            if (this.isVisible()) {
                this.setState({ visible: false });
                e.stopPropagation();
            }
        };
        this.onInputMouseDown = async (e) => {
            console.log('Select.onInputMouseDown');
            if (this.props.readOnly)
                return;
            if (this.props.onMouseDown) {
                await this.props.onMouseDown(e);
            }
            else {
                if (!this.isVisible()) {
                    const [selected] = this.el.current.querySelectorAll('li.selected');
                    // console.log('selected:', selected);
                    if (selected) {
                        // console.log('selected.offsetTop:', selected.offsetTop);
                        const scrollTop = selected.offsetTop -
                            this.dropdown.current.getBoundingClientRect().height / 2 +
                            selected.getBoundingClientRect().height / 2;
                        console.log('scrollTop:', scrollTop);
                        this.dropdown.current.scrollTop = scrollTop;
                        console.log('this.dropdown.current.scrollTop', this.dropdown.current.scrollTop);
                    }
                }
                this.setState((prevState) => {
                    return { visible: !prevState.visible };
                });
            }
        };
        this.onInputBlur = async (e) => {
            console.log('Select.onInputBlur', e.target);
            this.setState({ visible: false });
        };
        this.onDropdownMouseDown = async (e) => {
            e.preventDefault();
        };
        this.onDropdownClick = async (e) => {
            console.log('Select.onDropdownClick', e.target.offsetTop);
            const value = JSON.parse(e.target.dataset.value);
            // console.log('value:', value);
            this.setState({ value: value, visible: false }, async () => {
                if (this.props.onChange) {
                    await this.props.onChange(value.toString());
                }
            });
        };
        this.onCloseClick = async (e) => {
            this.setState({ value: '' });
            if (this.props.onChange) {
                await this.props.onChange('');
            }
            this.getElement();
        };
        this.el = react__WEBPACK_IMPORTED_MODULE_1___default().createRef();
        this.dropdown = react__WEBPACK_IMPORTED_MODULE_1___default().createRef();
        this.state = {
            value: this.getInitialValue(),
            visible: false,
        };
    }
    isVisible() {
        return this.state.visible;
    }
    getInitialValue() {
        // console.log('Select.getInitialValue', this.props.value);
        let value = null;
        if (this.props.value !== undefined && this.props.value !== null) {
            value = this.props.value;
            const item = this.getItems().find((item) => item.value === this.props.value);
            if (!item) {
                if (this.isNullable() && value === '') {
                }
                else {
                    console.error(`Select: no item for value:`, JSON.stringify(this.props.value));
                    console.log('items:', this.getItems());
                }
            }
        }
        else {
            if (this.isNullable()) {
                value = '';
            }
            else {
                if (this.props.items.length) {
                    value = this.props.items[0].value;
                }
                else {
                    value = '';
                }
            }
        }
        if (value === null)
            throw new Error('null is wrong value for Select');
        // console.log('select value:', value);
        return value;
    }
    getValue() {
        return this.state.value;
    }
    isNullable() {
        return this.props.nullable !== undefined ? this.props.nullable : true;
    }
    getVisibility() {
        return this.isVisible() ? 'visible' : 'hidden';
    }
    getDisplay() {
        return this.isVisible() ? 'block' : 'none';
    }
    getItems() {
        return this.props.items || [];
    }
    getValueTitle(value) {
        if (value === '')
            return '';
        const item = this.getItems().find((item) => item.value === value);
        if (!item)
            throw new Error(`cannot find item by value: ${value}`);
        // console.log('item:', item);
        return item.title || item.value;
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('Select.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        // @ts-ignore
        this.state.value = nextProps.value;
        return true;
    }
    isCloseVisible() {
        if (this.props.readOnly)
            return false;
        return this.state.value !== '';
    }
    renderInput() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", { className: `${this.getCssBlockName()}__input`, readOnly: true, disabled: this.props.readOnly, placeholder: this.props.placeholder, onBlur: this.onInputBlur, value: this.getValueTitle(this.getValue()), onMouseDown: this.onInputMouseDown, onKeyDown: this.onKeyDown }));
    }
    renderClose() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__close ${this.isCloseVisible() ? 'visible' : ''}`, onClick: this.onCloseClick }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_CloseIcon__WEBPACK_IMPORTED_MODULE_3__.CloseIcon, {}) })));
    }
    renderIcon() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__icon ${this.isVisible() ? 'up' : ''}` }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_ArrowIcon__WEBPACK_IMPORTED_MODULE_4__.ArrowIcon, {}) })));
    }
    renderDropdown() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", Object.assign({ ref: this.dropdown, className: `${this.getCssBlockName()}__dropdown`, style: {
                display: this.getDisplay(),
            }, onMouseDown: this.onDropdownMouseDown, onClick: this.onDropdownClick }, { children: [this.isNullable() && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", Object.assign({ className: `${this.getCssBlockName()}__item`, "data-value": '""' }, { children: "\u00A0" }))), this.getItems().map((item) => {
                    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", Object.assign({ className: `${this.getCssBlockName()}__item ellipsis ${this.getValue() === item.value ? 'selected' : ''}`, "data-value": JSON.stringify(item.value) }, { children: item.title || item.value }), item.value));
                })] })));
    }
    render() {
        // console.log('Select.render', this.state.value, this.getValueTitle(this.state.value));
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ ref: this.el, className: this.getCssClassNames() }, { children: [this.renderInput(), this.isNullable() && this.renderClose(), this.renderIcon(), this.renderDropdown()] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.Select = Select;
}


/***/ }),

/***/ "./src/frontend/common/widget/Slider/Slider.tsx":
/*!******************************************************!*\
  !*** ./src/frontend/common/widget/Slider/Slider.tsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Slider": () => (/* binding */ Slider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");
/* harmony import */ var _icon_LeftIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../icon/LeftIcon */ "./src/frontend/common/icon/LeftIcon.tsx");
/* harmony import */ var _icon_RightIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../icon/RightIcon */ "./src/frontend/common/icon/RightIcon.tsx");
/* harmony import */ var _icon_CloseIcon2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../icon/CloseIcon2 */ "./src/frontend/common/icon/CloseIcon2.tsx");
/* harmony import */ var _Slider_less__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Slider.less */ "./src/frontend/common/widget/Slider/Slider.less");
/* harmony import */ var _Slider_less__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Slider_less__WEBPACK_IMPORTED_MODULE_5__);






class Slider extends _ReactComponent__WEBPACK_IMPORTED_MODULE_1__.ReactComponent {
    constructor(props) {
        super(props);
        this.onPrevClick = (e) => {
            // console.log('Slider.onPrevClick');
            this.setState((prevState) => {
                let image = prevState.image - 1;
                if (image < 0) {
                    image = this.props.images.length - 1;
                }
                return { image };
            });
        };
        this.onNextClick = (e) => {
            // console.log('Slider.onNextClick');
            this.setState((prevState) => {
                let image = prevState.image + 1;
                if (image > this.props.images.length - 1) {
                    image = 0;
                }
                return { image };
            });
        };
        this.onImageClick = (e) => {
            console.log('Slider.onImageClick');
            if (this.state.classList) {
                this.setState({ classList: null });
            }
            else {
                this.setState({ classList: ['full'] });
            }
        };
        this.onCloseClick = (e) => {
            this.setState({ classList: null });
        };
        if (!this.props.images)
            throw new Error('Slider: no images');
        this.state = { image: 0, classList: null };
    }
    render() {
        // console.log('Slider.render', this.props.images);
        const images = this.props.images || [];
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ className: this.getCssClassNames() }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", { className: 'Slider_image', src: images[this.state.image], onClick: this.onImageClick }), images.length > 1 && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ className: 'Slider__label' }, { children: [images.length > 0 ? this.state.image + 1 : 0, " / ", images.length] }))), images.length > 1 && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: 'Slider__arrow left', onClick: this.onPrevClick }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_LeftIcon__WEBPACK_IMPORTED_MODULE_2__.LeftIcon, {}) }))), images.length > 1 && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: 'Slider__arrow right', onClick: this.onNextClick }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_RightIcon__WEBPACK_IMPORTED_MODULE_3__.RightIcon, {}) }))), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: 'Slider__close', onClick: this.onCloseClick }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_CloseIcon2__WEBPACK_IMPORTED_MODULE_4__.CloseIcon2, {}) }))] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.Slider = Slider;
}


/***/ }),

/***/ "./src/frontend/common/widget/Statusbar/Statusbar.tsx":
/*!************************************************************!*\
  !*** ./src/frontend/common/widget/Statusbar/Statusbar.tsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Statusbar": () => (/* binding */ Statusbar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");
/* harmony import */ var _Statusbar_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Statusbar.less */ "./src/frontend/common/widget/Statusbar/Statusbar.less");
/* harmony import */ var _Statusbar_less__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Statusbar_less__WEBPACK_IMPORTED_MODULE_2__);



class Statusbar extends _ReactComponent__WEBPACK_IMPORTED_MODULE_1__.ReactComponent {
    constructor(props) {
        // console.log('Statusbar.constructor', props);
        super(props);
        this.state = {};
    }
    setLastQueryTime(lastQueryTime) {
        this.setState({ lastQueryTime });
    }
    render() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: "Statusbar" }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { children: ["Last query time:", ' ', this.state.lastQueryTime ? `${this.state.lastQueryTime} ms` : '-'] }) })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.Statusbar = Statusbar;
}


/***/ }),

/***/ "./src/frontend/common/widget/Tab/Tab.tsx":
/*!************************************************!*\
  !*** ./src/frontend/common/widget/Tab/Tab.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tab": () => (/* binding */ Tab)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");
/* harmony import */ var _Tab_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tab.less */ "./src/frontend/common/widget/Tab/Tab.less");
/* harmony import */ var _Tab_less__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Tab_less__WEBPACK_IMPORTED_MODULE_2__);



class Tab extends _ReactComponent__WEBPACK_IMPORTED_MODULE_1__.ReactComponent {
    constructor(props) {
        super(props);
        this.onLiMouseDown = (e) => {
            // console.log('Tab.onLiMouseDown', e.target);
            if (e.target.classList.contains('close'))
                return;
            const i = parseInt(e.currentTarget.dataset.i);
            if (this.props.getActive) {
                if (this.props.onTabMouseDown)
                    this.props.onTabMouseDown(i);
            }
            else {
                if (i !== this.getActive()) {
                    this.selectTab(i);
                }
            }
        };
        this.onLiClick = (e) => {
            // console.log('Tab.onLiClick', e.target);
            if (e.target.classList.contains('close')) {
                const i = parseInt(e.currentTarget.dataset.i);
                // console.log('close tab:', i);
                if (this.props.onTabClose)
                    this.props.onTabClose(i);
            }
        };
        this.state = {
            active: 0,
        };
    }
    getActive() {
        if (this.props.getActive)
            return this.props.getActive();
        return this.state.active;
    }
    selectTab(i) {
        if (i === this.getActive())
            return;
        const start = Date.now();
        this.setState({ active: i }, () => console.log('selectTab time:', Date.now() - start));
    }
    renderTitles() {
        return this.props.tabs.map((tab, i) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", Object.assign({ className: i === this.getActive() ? 'active' : null, onMouseDown: this.onLiMouseDown, onClick: this.onLiClick, "data-i": i }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: tab.title }), this.props.canClose && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", Object.assign({ className: "close" }, { children: "\u00D7" }))] }), tab.name)));
    }
    renderContents() {
        return this.props.tabs.map((tab, i) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: i === this.getActive() ? 'active' : null }, { children: tab.content }), tab.name)));
    }
    render() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ className: this.getCssClassNames() }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ul", { children: this.props.tabs && this.renderTitles() }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { children: this.props.tabs && this.renderContents() })] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.Tab = Tab;
}


/***/ }),

/***/ "./src/frontend/common/widget/Tab2/Tab2.tsx":
/*!**************************************************!*\
  !*** ./src/frontend/common/widget/Tab2/Tab2.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tab2": () => (/* binding */ Tab2)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");
/* harmony import */ var _Tab2_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tab2.less */ "./src/frontend/common/widget/Tab2/Tab2.less");
/* harmony import */ var _Tab2_less__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Tab2_less__WEBPACK_IMPORTED_MODULE_2__);



class Tab2 extends _ReactComponent__WEBPACK_IMPORTED_MODULE_1__.ReactComponent {
    constructor(props) {
        super(props);
        this.onLiMouseDown = (e) => {
            // console.log('Tab.onLiMouseDown', e.target);
            if (e.target.classList.contains('close'))
                return;
            const i = parseInt(e.currentTarget.dataset.i);
            if (this.props.getActive) {
                if (this.props.onTabMouseDown)
                    this.props.onTabMouseDown(i);
            }
            else {
                if (i !== this.getActive()) {
                    this.selectTab(i);
                }
            }
        };
        this.onLiClick = (e) => {
            // console.log('Tab.onLiClick', e.target);
            if (e.target.classList.contains('close')) {
                const i = parseInt(e.currentTarget.dataset.i);
                // console.log('close tab:', i);
                if (this.props.onTabClose)
                    this.props.onTabClose(i);
            }
        };
        this.state = {
            active: 0,
        };
    }
    getActive() {
        if (this.props.getActive)
            return this.props.getActive();
        return this.state.active;
    }
    selectTab(i) {
        if (i === this.getActive())
            return;
        const start = Date.now();
        this.setState({ active: i }, () => console.log('selectTab time:', Date.now() - start));
    }
    renderTitles() {
        return this.props.tabs.map((tab, i) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", Object.assign({ className: `${this.getCssBlockName()}__button ${i === this.getActive() ? 'active' : ''}`, onMouseDown: this.onLiMouseDown, onClick: this.onLiClick, "data-i": i }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: tab.title }), this.props.canClose && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", Object.assign({ className: "close" }, { children: "\u00D7" }))] }), tab.name)));
    }
    renderContents() {
        return this.props.tabs.map((tab, i) => ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__page full ${i === this.getActive() ? 'active' : ''}` }, { children: tab.content }), tab.name)));
    }
    render() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ className: this.getCssClassNames() }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ul", Object.assign({ className: `${this.getCssBlockName()}__buttons` }, { children: this.props.tabs && this.renderTitles() })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__pages` }, { children: this.props.tabs && this.renderContents() }))] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.Tab2 = Tab2;
}


/***/ }),

/***/ "./src/frontend/common/widget/TextArea.tsx":
/*!*************************************************!*\
  !*** ./src/frontend/common/widget/TextArea.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextArea": () => (/* binding */ TextArea)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");


class TextArea extends _ReactComponent__WEBPACK_IMPORTED_MODULE_1__.ReactComponent {
    constructor(props) {
        // console.log('TextArea.constructor', props);
        super(props);
        this.onChange = (e) => {
            // console.log('TextArea.onChange', e.target.value);
            this.setState({ value: e.target.value });
            if (this.props.onChange) {
                this.props.onChange(e.target.value);
            }
        };
        this.state = {
            value: this.props.value || '',
        };
    }
    getValue() {
        return this.state.value;
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('TextArea.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        // @ts-ignore
        this.state.value = nextProps.value;
        return true;
    }
    render() {
        // console.log('TextArea.render');
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", { className: this.getCssClassNames(), readOnly: this.props.readOnly, disabled: this.props.disabled, placeholder: this.props.placeholder, rows: this.props.rows, cols: this.props.cols, value: this.state.value, onChange: this.onChange, onFocus: this.props.onFocus, onBlur: this.props.onBlur }));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.TextArea = TextArea;
}


/***/ }),

/***/ "./src/frontend/common/widget/TextBox.tsx":
/*!************************************************!*\
  !*** ./src/frontend/common/widget/TextBox.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextBox": () => (/* binding */ TextBox)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");



class TextBox extends _ReactComponent__WEBPACK_IMPORTED_MODULE_2__.ReactComponent {
    constructor(props) {
        // console.log('TextBox.constructor', props);
        super(props);
        this.onChange = (e) => {
            // console.log('TextBox.onChange', e.target.value);
            this._setValue(e.target.value);
        };
        this.el = (0,react__WEBPACK_IMPORTED_MODULE_1__.createRef)();
        this.state = {
            value: this.props.value || '',
        };
    }
    getValue() {
        return this.state.value;
    }
    _setValue(value) {
        // @ts-ignore
        this.state.value = value;
        // this.setState({value: this.state.value});   // rerender
        this.forceUpdate();
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('TextBox.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        // @ts-ignore
        this.state.value = nextProps.value;
        return true;
    }
    render() {
        // console.log('TextBox.render');
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", { ref: this.el, className: this.getCssClassNames(), type: this.props.type || 'text', id: this.props.id, name: this.props.name, readOnly: this.props.readOnly, disabled: this.isDisabled(), placeholder: this.props.placeholder, autoFocus: this.props.autoFocus, spellCheck: this.props.spellCheck, autoComplete: this.props.autocomplete, required: this.props.required, value: this.state.value, onFocus: this.props.onFocus, onBlur: this.props.onBlur, onChange: this.onChange }));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.TextBox = TextBox;
}


/***/ }),

/***/ "./src/frontend/common/widget/TimeBox/TimeBox.tsx":
/*!********************************************************!*\
  !*** ./src/frontend/common/widget/TimeBox/TimeBox.tsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimeBox": () => (/* binding */ TimeBox)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");



class TimeBox extends _ReactComponent__WEBPACK_IMPORTED_MODULE_2__.ReactComponent {
    constructor(props) {
        // console.log('TimeBox.constructor', props);
        super(props);
        this.onKeyPress = (event) => {
            // console.log('TimeBox.onKeyPress', event.key, event.target.value);
            if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(event.key)) {
                console.log('cancel', event.key);
                event.preventDefault();
            }
        };
        this.onChange = (e) => {
            // console.log('TimeBox.onChange', e.target.value);
            const target = e.target;
            const start = target.selectionStart;
            const end = target.selectionEnd;
            if (target.value.length > 5) {
                return;
            }
            const inEnd = start === end && start === target.value.length;
            const stringValue = this.formatValue(target.value);
            // console.log('before:', target.selectionStart, target.selectionEnd);
            this.setState({ value: stringValue }, () => {
                // console.log('after:', target.selectionStart, target.selectionEnd);
                // console.log('inEnd:', inEnd);
                if (!inEnd) {
                    target.selectionStart = start;
                    target.selectionEnd = end;
                }
                if (this.props.onChange) {
                    let nValue;
                    try {
                        nValue = this.getValue();
                    }
                    catch (err) {
                        console.log(err.message);
                        nValue = NaN;
                    }
                    // console.log('nValue:', nValue);
                    this.props.onChange(nValue);
                }
            });
        };
        this.onBlur = (e) => {
            // console.log('TimeBox.onBlur');
            if (this.props.onBlur) {
                let nValue;
                try {
                    nValue = this.getValue();
                }
                catch (err) {
                    console.log(err.message);
                    nValue = NaN;
                }
                // console.log('nValue:', nValue);
                this.props.onBlur(nValue);
            }
        };
        if (props.value && typeof props.value !== 'number') {
            throw new Error(`need number type, got ${typeof props.value}`);
        }
        this.state = {
            value: TimeBox.getStringValue(props.value),
        };
        this.el = react__WEBPACK_IMPORTED_MODULE_1___default().createRef();
    }
    formatValue(value) {
        let min = '';
        let sec = '';
        const pure = value.replace(':', '');
        switch (pure.length) {
            case 0:
                break;
            case 1:
                min = pure;
                break;
            case 2:
                min = pure;
                break;
            case 3:
                min = pure.substr(0, 2);
                sec = pure.substr(2, 1);
                break;
            case 4:
                min = pure.substr(0, 2);
                sec = pure.substr(2, 2);
                break;
        }
        return [min, ...(sec ? [sec] : [])].join(':');
    }
    getValue() {
        return TimeBox.getIntegerValue(this.state.value);
    }
    setValue(value) {
        this.setState({ value: TimeBox.getStringValue(value) });
    }
    /*onKeyDown = event => {
        console.log('TimeBox.onKeyDown', event.which, event.target.value.length, event.target.selectionStart, event.target.selectionEnd, event.key);
        const mask = '00:00';
        if ([8, 46, 37, 39, 36, 35].includes(event.which)) return;
        if (event.which < 96 || event.which > 105) {
            console.log('cancel');
            event.stopPropagation();
            event.preventDefault();
        }

        if (event.target.value.length + 1 > mask.length) {
            event.stopPropagation();
            event.preventDefault();
        }
    }*/
    /*onKeyUp = event => {
        console.log('TimeBox.onKeyUp', event.which, event.target.value.length, event.target.selectionStart, event.target.selectionEnd, event.target.value);
        event.stopPropagation();
        event.preventDefault();
    }*/
    static getStringValue(value) {
        // console.log('TimeBox.getStringValue', value);
        if (value === null)
            return '';
        if (value !== undefined) {
            let h = Math.floor(value / 60);
            let m = Math.floor(value - h * 60);
            if (h < 10)
                h = '0' + h;
            if (m < 10)
                m = '0' + m;
            return `${h}:${m}`;
        }
        return '';
    }
    static getIntegerValue(stringValue) {
        // console.log('TimeBox.getIntegerValue', stringValue);
        // try {
        if (stringValue === '')
            return null;
        const arr = stringValue.split(':');
        if (!arr[0])
            throw new Error(`no hours: ${stringValue}`);
        if (!arr[1])
            throw new Error(`no minutes: ${stringValue}`);
        if (arr[0].length !== 2)
            throw new Error(`hours incomplete: ${stringValue}`);
        if (arr[1].length !== 2)
            throw new Error(`minutes incomplete: ${stringValue}`);
        const hh = parseInt(arr[0]);
        const mm = parseInt(arr[1]);
        if (hh > 23)
            throw new Error(`hours out of range: ${mm}, ${stringValue}`);
        if (mm > 59)
            throw new Error(`minutes out of range: ${mm}, ${stringValue}`);
        return hh * 60 + mm;
        // } catch (err) {
        //     console.error(err.message);
        //     return NaN;
        // }
    }
    static splitTime(value) {
        const hours = Math.floor(value / 60);
        const minutes = value - hours * 60;
        return [hours, minutes];
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('TimeBox.shouldComponentUpdate', this.state, nextState);
        if (this.props.value !== nextProps.value) {
            // @ts-ignore
            this.state.value = TimeBox.getStringValue(nextProps.value);
            return true;
        }
        if (this.props.readOnly !== nextProps.readOnly)
            return true;
        if (this.props.placeholder !== nextProps.placeholder)
            return true;
        if (this.state.value !== nextState.value)
            return true;
        return false;
    }
    render() {
        // console.log('TimeBox.render', this.state.value);
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", { ref: this.el, className: this.getCssClassNames(), type: 'text', id: this.props.id, readOnly: this.props.readOnly, placeholder: this.props.placeholder, value: this.state.value, onChange: this.onChange, 
            // onKeyDown={this.onKeyDown}
            // onKeyUp={this.onKeyUp}
            onKeyPress: this.onKeyPress, onBlur: this.onBlur }));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.TimeBox = TimeBox;
}


/***/ }),

/***/ "./src/frontend/common/widget/TimeBox/TimeBox2/TimeBox2.tsx":
/*!******************************************************************!*\
  !*** ./src/frontend/common/widget/TimeBox/TimeBox2/TimeBox2.tsx ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimeBox2": () => (/* binding */ TimeBox2)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TimeBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../TimeBox */ "./src/frontend/common/widget/TimeBox/TimeBox.tsx");
/* harmony import */ var _icon_CloseIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../icon/CloseIcon */ "./src/frontend/common/icon/CloseIcon.tsx");
/* harmony import */ var _icon_TimeIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../icon/TimeIcon */ "./src/frontend/common/icon/TimeIcon.tsx");
/* harmony import */ var _TimeBox2_less__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TimeBox2.less */ "./src/frontend/common/widget/TimeBox/TimeBox2/TimeBox2.less");
/* harmony import */ var _TimeBox2_less__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_TimeBox2_less__WEBPACK_IMPORTED_MODULE_5__);






class TimeBox2 extends _TimeBox__WEBPACK_IMPORTED_MODULE_2__.TimeBox {
    constructor(props) {
        super(props);
        this.onClear = (e) => {
            // console.log('TimeBox2.onClear');
            this.setState({ value: '' }, () => {
                if (this.props.onClear) {
                    this.props.onClear();
                }
            });
        };
        this.inputEl = react__WEBPACK_IMPORTED_MODULE_1___default().createRef();
    }
    isCloseVisible() {
        return !!this.state.value;
    }
    getInputElement() {
        return this.inputEl.current;
    }
    render() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ ref: this.el, className: this.getCssClassNames() }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", { ref: this.inputEl, className: `${this.getCssBlockName()}__input`, type: 'text', 
                    // id={this.props.id}
                    readOnly: this.props.readOnly, placeholder: this.props.placeholder, value: this.state.value, onChange: this.onChange, 
                    // onKeyDown={this.onKeyDown}
                    // onKeyUp={this.onKeyUp}
                    onKeyPress: this.onKeyPress, onBlur: this.onBlur }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__close-icon ${this.isCloseVisible() ? 'visible' : ''}`, onMouseDown: this.onClear }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_CloseIcon__WEBPACK_IMPORTED_MODULE_3__.CloseIcon, {}) })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__time-icon` }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icon_TimeIcon__WEBPACK_IMPORTED_MODULE_4__.TimeIcon, {}) }))] })));
    }
}


/***/ }),

/***/ "./src/frontend/common/widget/Tooltip/Tooltip.tsx":
/*!********************************************************!*\
  !*** ./src/frontend/common/widget/Tooltip/Tooltip.tsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tooltip": () => (/* binding */ Tooltip)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ReactComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ReactComponent */ "./src/frontend/common/ReactComponent.tsx");
/* harmony import */ var _Tooltip_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tooltip.less */ "./src/frontend/common/widget/Tooltip/Tooltip.less");
/* harmony import */ var _Tooltip_less__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Tooltip_less__WEBPACK_IMPORTED_MODULE_2__);



class Tooltip extends _ReactComponent__WEBPACK_IMPORTED_MODULE_1__.ReactComponent {
    // constructor(props) {
    //     console.log('Tooltip.constructor', props);
    //     super(props);
    // }
    render() {
        // console.log('Tooltip.render', this.state, this.props);
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ className: `Tooltip ${this.props.type} ${this.props.hidden ? 'hidden' : ''}` }, { children: [this.props.type !== 'alert' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { children: "tooltip" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", Object.assign({ className: this.props.position }, { children: this.props.tip || 'tip' }))] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.Tooltip = Tooltip;
}


/***/ }),

/***/ "./src/frontend/viewer/Controller/Controller.ts":
/*!******************************************************!*\
  !*** ./src/frontend/viewer/Controller/Controller.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Controller": () => (/* binding */ Controller)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../EventEmitter */ "./src/frontend/viewer/EventEmitter.ts");


class Controller extends _EventEmitter__WEBPACK_IMPORTED_MODULE_1__.EventEmitter {
    constructor() {
        super(...arguments);
        this.view = null;
        /* constructor() {
            super();
        } */
        this.onViewCreate = (view) => {
            // console.log('Controller.onViewCreate');
            this.view = view;
        };
    }
    async rerender() {
        if (this.view) {
            return await this.view.rerender();
        }
        console.error(`${this.constructor.name}.rerender no view`);
    }
    getView() {
        return this.view;
    }
    getViewClass() {
        throw new Error(`${this.constructor.name}.getViewClass not implemented`);
    }
    createElement() {
        // @ts-ignore
        return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(this.getViewClass(), {
            ctrl: this,
            onCreate: this.onViewCreate,
        });
    }
}


/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/ApplicationController/ApplicationController.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/ApplicationController/ApplicationController.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApplicationController": () => (/* binding */ ApplicationController)
/* harmony export */ });
/* harmony import */ var _ModelController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ModelController */ "./src/frontend/viewer/Controller/ModelController/ModelController.ts");
/* harmony import */ var _Model_Page_Page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Model/Page/Page */ "./src/frontend/viewer/Model/Page/Page.ts");
/* harmony import */ var _ApplicationView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ApplicationView */ "./src/frontend/viewer/Controller/ModelController/ApplicationController/ApplicationView.tsx");
/* harmony import */ var _WebSocketClient__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../WebSocketClient */ "./src/frontend/viewer/WebSocketClient.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../common */ "./src/frontend/common/index.ts");
/* harmony import */ var _PageController_PageController__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../PageController/PageController */ "./src/frontend/viewer/Controller/ModelController/PageController/PageController.ts");






class ApplicationController extends _ModelController__WEBPACK_IMPORTED_MODULE_0__.ModelController {
    constructor(model, frontHostApp) {
        super(model, null);
        this.onRequest = async (e) => {
            console.log('onRequest', e);
            if (this.statusbar) {
                this.statusbar.setLastQueryTime(e.time);
            }
            // console.log('e.remoteAppVersion', e.remoteAppVersion);
            // console.log('this.getModel().getData().versions.app', this.getModel().getData().versions.app);
            if (this.getModel().getData().versions.app &&
                this.getModel().getData().versions.app !== e.remoteAppVersion) {
                this.createVersionNotificationIfNotExists();
            }
        };
        this.onStatusbarCreate = (statusbar) => {
            this.statusbar = statusbar;
        };
        this.onLogout = async () => {
            console.log('ApplicationController.onLogout');
            const result = await this.model.request({ action: 'logout' });
            location.href = this.getRootPath();
        };
        this.onMenuItemClick = async (menu, type, name) => {
            console.log('ApplicationController.onMenuItemClick', menu, type, name);
            if (type === 'page') {
                await this.openPage({ name: name, modal: false });
                history.pushState({ pageName: name }, '', _PageController_PageController__WEBPACK_IMPORTED_MODULE_5__.PageController.createLink({ page: name }));
            }
            else if (type === 'action') {
                try {
                    const result = await this.onActionClick(name);
                    if (!result) {
                        throw new Error(`no handler for action '${name}'`);
                    }
                }
                catch (err) {
                    console.error(err);
                    await this.alert({ message: err.message });
                }
            }
            else if (type === 'custom' && name === 'logout') {
                await this.onLogout();
            }
            else {
                throw new Error(`unknown menu type/name: ${type}/${name}`);
            }
        };
        console.log(`${this.constructor.name}.constructor`, model);
        this.frontHostApp = frontHostApp;
        this.lastId = 0;
        this.activePage = null; // active non modal page
        this.modals = [];
        this.statusbar = null;
        this.homePageName = null;
        this.webSocketClient = null;
    }
    static create(model, frontHostApp) {
        // console.log(
        //     'ApplicationController.create',
        //     'debug:',
        //     ApplicationController.isDebugMode(),
        //     model,
        // );
        const { ctrlClass } = model.data;
        if (ctrlClass) {
            const CustomClass = _common__WEBPACK_IMPORTED_MODULE_4__.FrontHostApp.getClassByName(ctrlClass);
            if (!CustomClass)
                throw new Error(`no class ${ctrlClass}`);
            return new CustomClass(model, frontHostApp);
        }
        return new ApplicationController(model, frontHostApp);
        // const CustomClass = FrontHostApp.getClassByName(`${model.getName()}ApplicationController`);
        // const Class = CustomClass ? CustomClass : ApplicationController;
        // return new Class(model, frontHostApp);
    }
    static isDebugMode() {
        return _common__WEBPACK_IMPORTED_MODULE_4__.Search.getObj()['debug'] === '1';
    }
    init() {
        // console.log('ApplicationController.init');
        super.init();
        // this.model.on('logout' , this.onLogout);
        this.model.on('request', this.onRequest);
        const pageData = this.model.data.pages[0];
        this.activePage = pageData
            ? this.createPage(pageData, {
                modal: false,
                params: this.getGlobalParams(),
            })
            : null;
        document.title = this.getTitle();
        document.documentElement.classList.add(_common__WEBPACK_IMPORTED_MODULE_4__.Helper.inIframe() ? 'iframe' : 'not-iframe');
        const activePageName = this.getActivePageName();
        this.homePageName = activePageName ? activePageName : document.title;
    }
    deinit() {
        // this.model.off('logout', this.onLogout);
        this.model.off('request', this.onRequest);
        super.deinit();
    }
    getViewClass() {
        return super.getViewClass() || _ApplicationView__WEBPACK_IMPORTED_MODULE_2__.ApplicationView;
    }
    createView(rootElement) {
        // console.log('ApplicationController.createView');
        this.view = _common__WEBPACK_IMPORTED_MODULE_4__.Helper.createReactComponent(rootElement, this.getViewClass(), {
            ctrl: this,
            key: this.getModel().getName(),
        });
        if (this.statusbar) {
            this.statusbar.setLastQueryTime(this.model.getAttr('time'));
        }
    }
    createVersionNotificationIfNotExists() {
        // console.log('ApplicationController.createVersionNotificationIfNotExists');
        if (!document.querySelector('.version-notification')) {
            const div = document.createElement('div');
            div.innerHTML = this.getModel().getText().application.versionNotification;
            div.className = 'version-notification';
            document.querySelector(`.${this.getView().getCssBlockName()}__body`).append(div);
        }
        else {
            // console.log(`version notification already exists`);
        }
    }
    getGlobalParams() {
        return {
        // foo: 'bar'
        };
    }
    // options
    // - modal      : boolean,
    // - newMode    : boolean,
    // - selectMode : boolean,
    // - selectedKey: string,
    // - onCreate   : function,
    // - onSelect   : function,
    // - onClose    : function,
    // - params     : object,
    createPage(pageData, options) {
        if (options.modal === undefined)
            throw new Error('no options.modal');
        // model
        const pageModel = new _Model_Page_Page__WEBPACK_IMPORTED_MODULE_1__.Page(pageData, this.model, options);
        pageModel.init();
        // controller
        const pc = _PageController_PageController__WEBPACK_IMPORTED_MODULE_5__.PageController.create(pageModel, this, `c${this.getNextId()}`);
        pc.init();
        return pc;
    }
    async openPage(options) {
        console.log('ApplicationController.openPage', options);
        if (!options.name)
            throw new Error('no name');
        if (options.key)
            throw new Error('openPage: key param is deprecated');
        // if this page with this key is already opened, then show it
        const pageController = this.findPageControllerByPageNameAndKey(options.name, null);
        // console.log('pageController:', pageController);
        if (pageController) {
            this.onPageSelect(pageController);
            return pageController;
        }
        const { page: pageData } = await this.model.request({
            action: 'page',
            page: options.name,
            newMode: !!options.newMode,
            params: options.params || {},
        });
        // modal by default
        if (options.modal === undefined) {
            options.modal = true;
        }
        if (!options.onClose) {
            const activeElement = document.activeElement;
            options.onClose = () => {
                // @ts-ignore
                if (activeElement)
                    activeElement.focus();
            };
        }
        const pc = this.createPage(pageData, options);
        // console.log('pc:', pc);
        // show
        pc.isModal() ? this.addModal(pc) : this.addPage(pc);
        await this.rerender();
        return pc;
    }
    addModal(ctrl) {
        this.modals.push(ctrl);
    }
    removeModal(ctrl) {
        // console.log('ApplicationController.removeModal', ctrl);
        const i = this.modals.indexOf(ctrl);
        if (i === -1)
            throw new Error(`cannot find modal: ${ctrl.getId()}`);
        this.modals.splice(i, 1);
    }
    getNextId() {
        this.lastId++;
        return this.lastId;
    }
    getNewId() {
        return `c${this.getNextId()}`;
    }
    addPage(pc) {
        if (this.activePage) {
            this.closePage(this.activePage);
        }
        this.activePage = pc;
        document.title = this.getTitle();
    }
    findPageControllerByPageNameAndKey(pageName, key) {
        if (this.activePage &&
            this.activePage.model.getName() === pageName &&
            this.activePage.model.getKey() === key) {
            return this.activePage;
        }
        return null;
    }
    onPageSelect(pc) {
        console.log('ApplicationController.onPageSelect', pc.model.getName());
    }
    async closePage(pageController) {
        console.log('ApplicationController.closePage', pageController.model.getFullName());
        if (this.modals.indexOf(pageController) > -1) {
            this.modals.splice(this.modals.indexOf(pageController), 1);
        }
        else if (this.activePage === pageController) {
            this.activePage = null;
            document.title = '';
        }
        else {
            throw new Error('page not found');
        }
        await this.rerender();
        pageController.deinit();
        pageController.model.deinit();
    }
    async onActionClick(name) {
        console.log('ApplicationController.onActionClick', name);
    }
    getMenuItemsProp() {
        // console.log('ApplicationController.getMenuItemsProp');
        return [
            // pages & actions
            ...(this.model.data.menu
                ? Object.keys(this.model.data.menu).map((key) => ({
                    name: key,
                    title: key,
                    items: this.model.data.menu[key].map((item) => ({
                        type: item.type,
                        name: item.page || item.action,
                        title: item.caption,
                    })),
                }))
                : []),
            // user
            ...(this.model.getUser()
                ? [
                    {
                        name: 'user',
                        title: `${this.model.getDomain()}/${this.model.getUser().login}`,
                        items: [
                            {
                                type: 'custom',
                                name: 'logout',
                                title: 'Logout',
                            },
                        ],
                    },
                ]
                : []),
        ];
    }
    /*getFocusCtrl() {
        if (this.modals.length > 0) {
            return this.modals[this.modals.length - 1];
        }
        return this.activePage;
    }*/
    getActivePageName() {
        if (this.activePage) {
            return this.activePage.getModel().getName();
        }
        return null;
    }
    async onWindowPopState(e) {
        console.log('ApplicationController.onWindowPopState', e.state);
        await this.openPage({
            name: e.state ? e.state.pageName : this.homePageName,
            modal: false,
        });
    }
    getTitle() {
        // console.log('ApplicationController.getTitle', this.activePage);
        if (this.activePage) {
            return `${this.activePage.getTitle()} - ${this.getModel().getCaption()}`;
        }
        return this.getModel().getCaption();
    }
    invalidate() {
        if (this.activePage)
            this.activePage.invalidate();
        this.modals
            .filter((ctrl) => ctrl instanceof _PageController_PageController__WEBPACK_IMPORTED_MODULE_5__.PageController)
            .forEach((page) => page.invalidate());
    }
    async alert(options) {
        if (!options.title) {
            options.title = this.getModel().getText().application.alert;
        }
        const activeElement = document.activeElement;
        try {
            return await this.frontHostApp.alert(options);
        }
        finally {
            // @ts-ignore
            if (activeElement)
                activeElement.focus();
        }
    }
    async confirm(options) {
        if (!options.title) {
            options.title = this.getModel().getText().application.confirm;
        }
        if (!options.yesButton) {
            options.yesButton = this.getModel().getText().confirm.yes;
        }
        if (!options.noButton) {
            options.noButton = this.getModel().getText().confirm.no;
        }
        const activeElement = document.activeElement;
        try {
            return await this.frontHostApp.confirm(options);
        }
        finally {
            // @ts-ignore
            if (activeElement)
                activeElement.focus();
        }
    }
    getRootPath() {
        return '/';
    }
    async openModal(ctrl) {
        this.addModal(ctrl);
        await this.rerender();
    }
    async closeModal(ctrl) {
        this.removeModal(ctrl);
        await this.rerender();
    }
    getHostApp() {
        return this.frontHostApp;
    }
    async connect() {
        const data = this.getModel().getData();
        this.webSocketClient = new _WebSocketClient__WEBPACK_IMPORTED_MODULE_3__.WebSocketClient({
            applicationController: this,
            protocol: window.location.protocol === 'https:' ? 'wss' : 'ws',
            route: data.route,
            uuid: data.uuid,
            userId: data.user ? data.user.id : null,
        });
        await this.webSocketClient.connect();
    }
    async rpc(name, params = {}) {
        const result = await this.getModel().rpc(name, params);
        /*if (result.errorMessage) {
            this.getHostApp().logError(new Error(result.errorMessage));
            await this.alert({
                title     : this.getModel().getText().application.error,
                titleStyle: {color: 'red'},
                message   : result.errorMessage
            });
        }*/
        return result;
    }
    getDomain() {
        return this.getModel().getDomain();
    }
    getBaseUrl() {
        return `/${this.getDomain()}`;
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.ApplicationController = ApplicationController;
}


/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/ApplicationController/ApplicationView.tsx":
/*!**************************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/ApplicationController/ApplicationView.tsx ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApplicationView": () => (/* binding */ ApplicationView)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ModelView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ModelView */ "./src/frontend/viewer/Controller/ModelController/ModelView.tsx");
/* harmony import */ var _PageController_PageController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../PageController/PageController */ "./src/frontend/viewer/Controller/ModelController/PageController/PageController.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../common */ "./src/frontend/common/index.ts");
/* harmony import */ var _ApplicationView_less__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ApplicationView.less */ "./src/frontend/viewer/Controller/ModelController/ApplicationController/ApplicationView.less");
/* harmony import */ var _ApplicationView_less__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ApplicationView_less__WEBPACK_IMPORTED_MODULE_5__);






class ApplicationView extends _ModelView__WEBPACK_IMPORTED_MODULE_2__.ModelView {
    renderActivePage() {
        const { ctrl } = this.props;
        if (ctrl.activePage) {
            return this.renderView(ctrl.activePage);
        }
        return null;
    }
    renderView(ctrl, props = {}) {
        return react__WEBPACK_IMPORTED_MODULE_1___default().createElement(ctrl.getViewClass(), Object.assign({ parent: this, ctrl: ctrl, onCreate: ctrl.onViewCreate }, props));
    }
    renderModals() {
        return this.props.ctrl.modals.map((ctrl) => {
            if (ctrl instanceof _PageController_PageController__WEBPACK_IMPORTED_MODULE_3__.PageController) {
                return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common__WEBPACK_IMPORTED_MODULE_4__.Modal, { children: this.renderView(ctrl) }, ctrl.getId());
            }
            return this.renderView(ctrl, { key: ctrl.getId() });
        });
    }
    renderHeader() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("header", Object.assign({ className: `${this.getCssBlockName()}__header` }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common__WEBPACK_IMPORTED_MODULE_4__.Menu, { items: this.getCtrl().getMenuItemsProp(), onClick: this.getCtrl().onMenuItemClick }) })));
    }
    renderMain() {
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("main", Object.assign({ className: `${this.getCssBlockName()}__main` }, { children: this.renderActivePage() }));
    }
    renderFooter() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("footer", Object.assign({ className: `${this.getCssBlockName()}__footer` }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common__WEBPACK_IMPORTED_MODULE_4__.Statusbar, { onCreate: this.getCtrl().onStatusbarCreate }) })));
    }
    render() {
        console.log(`${this.constructor.name}.render`, this.props.ctrl.model.getFullName());
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ className: `${this.getCssBlockName()}__container`, style: this.getStyle() }, { children: [this.renderHeader(), this.renderMain(), this.renderFooter(), this.renderModals()] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.ApplicationView = ApplicationView;
}


/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FieldController/FieldController.ts":
/*!*******************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FieldController/FieldController.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FieldController": () => (/* binding */ FieldController)
/* harmony export */ });
/* harmony import */ var _ModelController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ModelController */ "./src/frontend/viewer/Controller/ModelController/ModelController.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../common */ "./src/frontend/common/index.ts");


class FieldController extends _ModelController__WEBPACK_IMPORTED_MODULE_0__.ModelController {
    static create(model, parent) {
        // console.log('FieldController.create', model.getFullName(), parent.model.getClassName());
        const { ctrlClass } = model.getData();
        if (ctrlClass) {
            const CustomClass = _common__WEBPACK_IMPORTED_MODULE_1__.FrontHostApp.getClassByName(ctrlClass);
            if (!CustomClass)
                throw new Error(`no class ${ctrlClass}`);
            return new CustomClass(model, parent);
        }
        const generalClassName = `${parent
            .getModel()
            .getClassName()}${model.getClassName()}Controller`;
        const GeneralClass = _common__WEBPACK_IMPORTED_MODULE_1__.FrontHostApp.getClassByName(generalClassName);
        if (!GeneralClass)
            throw new Error(`no class ${generalClassName}`);
        return new GeneralClass(model, parent);
        /*const page = model.getPage();
        const form = model.getForm();
        const CustomClass = FrontHostApp.getClassByName(
            `${page.getName()}${form.getName()}${model.getName()}FieldController`,
        );
        const generalClassName = `${parent.model.getClassName()}${model.getClassName()}Controller`;
        const GeneralClass = FrontHostApp.getClassByName(generalClassName);
        if (!GeneralClass) throw new Error(`no class ${generalClassName}`);
        const Class = CustomClass || GeneralClass;
        return new Class(model, parent);*/
    }
    valueToString(value) {
        // console.log('Field.valueToString', this.model.getFullName(), typeof value, value);
        switch (typeof value) {
            case 'string':
                return value;
            case 'object':
                if (value === null)
                    return '';
                if (value instanceof Date)
                    return value.toISOString();
                return JSON.stringify(value, null, 4);
            case 'number':
            case 'boolean':
                return value.toString();
            case 'undefined':
                return '';
            default:
                throw new Error(`${this.model.getFullName()}: unknown value type: ${typeof value}, value: ${value}`);
        }
    }
    stringToValue(stringValue) {
        // console.log('FieldController.stringToValue', this.model.getFullName(), stringValue);
        // if (stringValue === undefined) return undefined;
        // if (stringValue === null) return null;
        const fieldType = this.model.getType();
        // console.log('fieldType:', fieldType);
        if (stringValue.trim() === '')
            return null;
        if (fieldType === 'object' || fieldType === 'boolean') {
            return JSON.parse(stringValue);
        }
        else if (fieldType === 'date') {
            const date = new Date(stringValue);
            if (date.toString() === 'Invalid Date')
                throw new Error(`${this.getApp().getModel().getText().error.invalidDate}: ${stringValue}`);
            return date;
        }
        else if (fieldType === 'number') {
            const num = Number(stringValue);
            if (isNaN(num))
                throw new Error(this.getApp().getModel().getText().error.notNumber);
            return num;
        }
        return stringValue;
    }
    getViewStyle(row) {
        return null;
    }
    async openPage(options) {
        return await this.getParent().openPage(options);
    }
    getParent() {
        return super.getParent();
    }
    getForm() {
        return this.parent;
    }
    getPage() {
        return this.parent.parent;
    }
    getApp() {
        return this.parent.parent.parent;
    }
    isVisible() {
        return this.getModel().getAttr('visible') === 'true';
    }
    isAutoFocus() {
        return this.getModel().getAttr('autoFocus') === 'true';
    }
    getAutocomplete() {
        return this.getModel().getAttr('autocomplete') || null;
    }
    getFormat() {
        return this.getModel().getAttr('format');
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.FieldController = FieldController;
}


/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FormController/FormController.ts":
/*!*****************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FormController/FormController.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormController": () => (/* binding */ FormController)
/* harmony export */ });
/* harmony import */ var _ModelController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ModelController */ "./src/frontend/viewer/Controller/ModelController/ModelController.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../common */ "./src/frontend/common/index.ts");
/* harmony import */ var _FieldController_FieldController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../FieldController/FieldController */ "./src/frontend/viewer/Controller/ModelController/FieldController/FieldController.ts");



class FormController extends _ModelController__WEBPACK_IMPORTED_MODULE_0__.ModelController {
    static create(model, parent) {
        // console.log('FormController.create', model.getFullName());
        const { ctrlClass } = model.getData();
        if (ctrlClass) {
            const CustomClass = _common__WEBPACK_IMPORTED_MODULE_1__.FrontHostApp.getClassByName(ctrlClass);
            if (!CustomClass)
                throw new Error(`no class ${ctrlClass}`);
            return new CustomClass(model, parent);
        }
        const GeneralClass = _common__WEBPACK_IMPORTED_MODULE_1__.FrontHostApp.getClassByName(`${model.getClassName()}Controller`);
        return new GeneralClass(model, parent);
    }
    constructor(model, parent) {
        super(model, parent);
        this.fields = {};
        console.log(`${this.constructor.name}.constructor`, model);
    }
    init() {
        for (const field of this.model.fields) {
            const ctrl = (this.fields[field.getName()] = _FieldController_FieldController__WEBPACK_IMPORTED_MODULE_2__.FieldController.create(field, this));
            ctrl.init();
        }
    }
    deinit() {
        // console.log('FormController.deinit:', this.model.getFullName());
        for (const name in this.fields) {
            this.fields[name].deinit();
        }
        super.deinit();
    }
    isValid() {
        return true;
    }
    async openPage(options) {
        return await this.getPage().openPage(options);
    }
    getPage() {
        return this.parent;
    }
    isChanged() {
        return false;
    }
    async onFieldChange(e) {
        // console.log('FormController.onFieldChange', this.model.getFullName());
        await this.getPage().onFormChange(e);
    }
    getUpdated() {
        return this.state.updated;
    }
    invalidate() {
        this.state.updated = Date.now();
    }
    async onActionClick(name, row) {
        console.log('FormController.onActionClick', name, row);
    }
    getField(name) {
        return this.fields[name];
    }
    getApp() {
        return this.parent.parent;
    }
    getSelectedRowKey() {
        return null;
    }
    isAutoFocus() {
        for (const name in this.fields) {
            if (this.fields[name].isAutoFocus()) {
                return true;
            }
        }
        return false;
    }
    isVisible() {
        return this.getModel().getAttr('visible') === 'true';
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.FormController = FormController;
}


/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FormController/FormView.tsx":
/*!************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FormController/FormView.tsx ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormView": () => (/* binding */ FormView)
/* harmony export */ });
/* harmony import */ var _ModelView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ModelView */ "./src/frontend/viewer/Controller/ModelController/ModelView.tsx");

class FormView extends _ModelView__WEBPACK_IMPORTED_MODULE_0__.ModelView {
    constructor(props) {
        super(props);
        this.onActionsClick = async (li) => {
            // console.log('FormView.onActionsClick:', li);
            const ctrl = this.props.ctrl;
            const name = li.dataset.action;
            try {
                const result = await ctrl.onActionClick(name, ctrl.getActiveRow(true));
                if (!result) {
                    throw new Error(`no handler for action '${name}'`);
                }
            }
            catch (err) {
                console.error(err);
                await this.getCtrl().getApp().alert({ message: err.message });
            }
        };
        this.checkParent();
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('FormView.shouldComponentUpdate', this.getCtrl().getModel().getFullName(), nextProps.updated - this.props.updated);
        if (nextProps.updated - this.props.updated)
            return true;
        return false;
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.FormView = FormView;
}


/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FormController/RowFormController/RowFormController.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FormController/RowFormController/RowFormController.ts ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RowFormController": () => (/* binding */ RowFormController)
/* harmony export */ });
/* harmony import */ var _FormController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FormController */ "./src/frontend/viewer/Controller/ModelController/FormController/FormController.ts");
/* harmony import */ var _RowFormView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RowFormView */ "./src/frontend/viewer/Controller/ModelController/FormController/RowFormController/RowFormView.tsx");


class RowFormController extends _FormController__WEBPACK_IMPORTED_MODULE_0__.FormController {
    constructor(model, parent) {
        super(model, parent);
        this.onModelRefresh = async (e) => {
            console.log('RowFormController.onModelRefresh', this.model.getFullName());
            if (!this.view)
                return;
            this.refill();
            this.invalidate();
            this.rerender();
        };
        this.onModelInsert = async (e) => {
            console.log('RowFormController.onModelInsert', this.model.getFullName());
            this.refill();
            this.invalidate();
            this.calcState();
            this.parent.onFormInsert(e);
        };
        this.onModelUpdate = async (e) => {
            console.log('RowFormController.onModelUpdate', this.model.getFullName(), e);
            this.refill();
            this.invalidate();
            this.calcState();
            this.parent.onFormUpdate(e);
        };
        this.onSaveClick = async () => {
            console.log('RowFormController.onSaveClick');
            this.validate();
            this.calcState();
            if (this.isValid()) {
                try {
                    this.getApp().getView().disableRerender();
                    await this.model.update();
                    this.state.mode = 'view';
                    console.log('form model updated', this.getModel().getFullName());
                }
                finally {
                    this.getApp().getView().enableRerender();
                    await this.getApp().getView().rerender();
                }
            }
            else {
                console.error(`cannot update invalid row form: ${this.model.getFullName()}`);
                await this.rerender();
            }
        };
        this.onDiscardClick = () => {
            console.log('RowFormController.onDiscardClick', this.model.getFullName());
            const changedFields = [];
            const row = this.model.getRow();
            for (const name in this.fields) {
                const field = this.fields[name];
                if (field.isChanged(row) || !field.isValid()) {
                    changedFields.push(name);
                }
            }
            // console.log('changedFields:', changedFields);
            this.model.discard(changedFields);
            // refill changed fields
            changedFields.forEach((name) => {
                this.fields[name].refill();
            });
            // ui
            this.calcState();
            if (this.getModel().hasDefaultPersistentDataSource()) {
                this.state.mode = 'view';
            }
            this.rerender();
            // event
            this.parent.onFormDiscard(this);
        };
        this.onRefreshClick = async () => {
            // console.log('RowFormController.onRefreshClick', this.model.getFullName());
            await this.model.refresh();
        };
        this.onEditClick = (e) => {
            console.log('RowFormController.onEditClick');
            this.state.mode = 'edit';
            this.rerender();
        };
        this.onCancelClick = (e) => {
            console.log('RowFormController.onCancelClick');
            this.state.mode = 'view';
            this.rerender();
        };
        this.state = {
            updated: Date.now(),
            mode: 'edit',
            hasNew: false,
            changed: false,
            valid: true,
        };
    }
    init() {
        super.init();
        this.model.on('refresh', this.onModelRefresh);
        this.model.on('insert', this.onModelInsert);
        this.model.on('update', this.onModelUpdate);
        if (this.model.getDefaultDataSource().isPersistent()) {
            this.state.mode = 'view';
        }
        this.calcState();
        if (this.state.hasNew) {
            this.state.mode = 'edit';
        }
    }
    deinit() {
        // console.log('RowFormController.deinit', this.model.getFullName());
        this.model.off('refresh', this.onModelRefresh);
        this.model.off('insert', this.onModelInsert);
        this.model.off('update', this.onModelUpdate);
        super.deinit();
    }
    calcState() {
        this.state.hasNew = this.model.hasNew();
        this.state.changed = this.isChanged();
        this.state.valid = this.isValid();
        // console.log('hasNew:', hasNew);
        // console.log('changed:', changed);
        // console.log('valid:', valid);
    }
    refill() {
        console.log('RowFormController.refill', this.model.getFullName());
        for (const name in this.fields) {
            this.fields[name].refill();
        }
    }
    isValid() {
        // console.log('RowFormController.isValid', this.model.getFullName());
        for (const name in this.fields) {
            const field = this.fields[name];
            if (!field.isValid())
                return false;
        }
        return true;
    }
    validate() {
        // console.log('RowFormController.validate', this.getModel().getFullName());
        for (const name in this.fields) {
            this.fields[name].validate();
        }
        this.invalidate();
    }
    clearFieldsError() {
        for (const name in this.fields) {
            this.fields[name].setError(null);
        }
    }
    isChanged() {
        // console.log('RowFormController.isChanged', this.model.getFullName());
        if (this.model.isChanged())
            return true;
        const row = this.model.getRow();
        for (const name in this.fields) {
            const field = this.fields[name];
            if (field.isChanged(row))
                return true;
        }
        return false;
    }
    async onFieldChange(e) {
        // console.log('RowFormController.onFieldChange', this.model.getFullName());
        this.calcState();
        this.invalidate();
        await super.onFieldChange(e);
    }
    getViewClass() {
        // console.log('RowFormController.getViewClass', this.model.getFullName());
        return super.getViewClass() || _RowFormView__WEBPACK_IMPORTED_MODULE_1__.RowFormView;
    }
    getActiveRow(withChanges) {
        return this.model.getRow(withChanges);
    }
    getMode() {
        return this.state.mode;
    }
    isActionEnabled(name) {
        return this.isViewMode();
    }
    isEditMode() {
        return this.getMode() === 'edit';
    }
    isViewMode() {
        return this.getMode() === 'view';
    }
    getField(name) {
        return this.fields[name];
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.RowFormController = RowFormController;
}


/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FormController/RowFormController/RowFormView.tsx":
/*!*********************************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FormController/RowFormController/RowFormView.tsx ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RowFormView": () => (/* binding */ RowFormView)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FormView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FormView */ "./src/frontend/viewer/Controller/ModelController/FormController/FormView.tsx");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../common */ "./src/frontend/common/index.ts");
/* harmony import */ var _RowFormView_less__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RowFormView.less */ "./src/frontend/viewer/Controller/ModelController/FormController/RowFormController/RowFormView.less");
/* harmony import */ var _RowFormView_less__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_RowFormView_less__WEBPACK_IMPORTED_MODULE_3__);




class RowFormView extends _FormView__WEBPACK_IMPORTED_MODULE_1__.FormView {
    renderToolbar() {
        // console.log('RowFormView.renderToolbar');
        const { ctrl } = this.props;
        const text = ctrl.getModel().getApp().getText();
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ className: `${this.getCssBlockName()}__toolbar flex grid-gap-5` }, { children: [ctrl.model.hasDefaultPersistentDataSource() && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common__WEBPACK_IMPORTED_MODULE_2__.Button, Object.assign({ classList: ['toolbar-button'], onClick: ctrl.onEditClick, visible: ctrl.getMode() === 'view' }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { children: text.form.edit }) }), "edit")), ctrl.model.hasDefaultPersistentDataSource() && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common__WEBPACK_IMPORTED_MODULE_2__.Button, Object.assign({ classList: ['toolbar-button'], enabled: (ctrl.state.changed || ctrl.state.hasNew) && ctrl.state.valid, onClick: ctrl.onSaveClick, visible: ctrl.getMode() === 'edit' }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { children: text.form.save }) }), "save")), ctrl.model.hasDefaultPersistentDataSource() && ctrl.model.getKey() && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common__WEBPACK_IMPORTED_MODULE_2__.Button, Object.assign({ classList: ['toolbar-button'], visible: ctrl.getMode() === 'edit' && !ctrl.state.changed && ctrl.state.valid, onClick: ctrl.onCancelClick }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { children: text.form.cancel }) }), "cancel")), ctrl.model.hasDefaultPersistentDataSource() && ctrl.model.getKey() && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common__WEBPACK_IMPORTED_MODULE_2__.Button, Object.assign({ classList: ['toolbar-button'], enabled: ctrl.state.changed || !ctrl.isValid(), onClick: ctrl.onDiscardClick, visible: ctrl.getMode() === 'edit' && (ctrl.state.changed || !ctrl.state.valid) }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { children: text.form.discard }) }), "discard")), ctrl.model.hasDefaultPersistentDataSource() &&
                    ctrl.getModel().getAttr('refreshButton') === 'true' && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common__WEBPACK_IMPORTED_MODULE_2__.Button, Object.assign({ classList: ['toolbar-button'], enabled: !ctrl.state.changed && !ctrl.state.hasNew, onClick: ctrl.onRefreshClick, visible: ctrl.getMode() === 'view' }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { children: text.form.refresh }) }), "refresh")), this.isActionsVisible() && ctrl.model.hasActions() && ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common__WEBPACK_IMPORTED_MODULE_2__.DropdownButton, Object.assign({ classList: ['toolbar-dropdown-button'], actions: this.getActionsForDropdownButton(), onClick: this.onActionsClick, enabled: this.isActionsEnabled() }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common__WEBPACK_IMPORTED_MODULE_2__.MoreVertIcon, {}) })))] })));
    }
    isActionsEnabled() {
        // return this.getCtrl().state.mode === 'view';
        return true;
    }
    isActionsVisible() {
        if (this.getCtrl().getModel().hasDefaultPersistentDataSource()) {
            return !!this.getCtrl().getModel().getKey();
        }
        return true;
    }
    renderLabel(fieldCtrl) {
        const model = fieldCtrl.getModel();
        const name = model.getName();
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ className: `${this.getCssBlockName()}__label` }, { children: [model.getCaption(), ":", model.isNotNull() && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", Object.assign({ style: { color: 'red' } }, { children: "*" }))] }), `label.${name}`));
    }
    renderField(fieldCtrl) {
        // console.log('RowFormView.renderField', fieldCtrl.model.getClassName());
        const name = fieldCtrl.getModel().getName();
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__field` }, { children: this.renderFieldView(fieldCtrl) }), `field.${name}`));
    }
    renderFieldView(fieldCtrl) {
        return RowFormView.renderFieldView(fieldCtrl);
    }
    static renderFieldView(fieldCtrl) {
        /*return React.createElement(fieldCtrl.getViewClass(), {
            onCreate: fieldCtrl.onViewCreate,
            ctrl: fieldCtrl,
        });*/
        return fieldCtrl.renderView();
    }
    renderError(fieldCtrl) {
        // console.log('RowFormView.renderError:', fieldCtrl.state);
        const name = fieldCtrl.getModel().getName();
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__error` }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common__WEBPACK_IMPORTED_MODULE_2__.Tooltip, { position: "left", type: "alert", hidden: fieldCtrl.getErrorMessage() === null, tip: fieldCtrl.getErrorMessage() }) }), `tooltip.${name}`));
    }
    renderGroup(fieldCtrl) {
        /*return (
            <>
                {this.renderLabel(fieldCtrl)}
                {this.renderField(fieldCtrl)}
                {this.renderError(fieldCtrl)}
            </>
        );*/
        return [
            this.renderLabel(fieldCtrl),
            this.renderField(fieldCtrl),
            this.renderError(fieldCtrl),
        ];
        /*return <div key={fieldCtrl.getModel().getName()} className={`${this.getCssClassNames()}__group`}>
            {this.renderLabel(fieldCtrl)}
            {this.renderField(fieldCtrl)}
            {this.renderError(fieldCtrl)}
        </div>;*/
    }
    renderGroups() {
        // console.log('RowFormView.renderGroups');
        const ctrl = this.getCtrl();
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__groups` }, { children: Object.keys(ctrl.fields)
                .filter((name) => ctrl.getField(name).isVisible())
                .map((name) => {
                return this.renderGroup(ctrl.getField(name));
            }) })));
    }
    render() {
        console.log('RowFormView.render', this.getCtrl().getModel().getFullName());
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ className: `${this.getCssClassNames()} flex-column grid-gap-5`, style: this.getStyle() }, { children: [(this.getCtrl().getModel().hasDefaultPersistentDataSource() ||
                    this.getCtrl().getModel().hasActions()) &&
                    this.renderToolbar(), this.renderGroups()] })));
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.RowFormView = RowFormView;
}


/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/ModelController.ts":
/*!***************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/ModelController.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModelController": () => (/* binding */ ModelController)
/* harmony export */ });
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Controller */ "./src/frontend/viewer/Controller/Controller.ts");
/* harmony import */ var _ModelView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModelView */ "./src/frontend/viewer/Controller/ModelController/ModelView.tsx");


class ModelController extends _Controller__WEBPACK_IMPORTED_MODULE_0__.Controller {
    constructor(model, parent) {
        super();
        this.model = model;
        this.parent = parent;
        this.deinited = false;
    }
    init() { }
    deinit() {
        if (this.deinited)
            throw new Error(`${this.model.getFullName()}: controller already deinited`);
        this.deinited = true;
    }
    getModel() {
        return this.model;
    }
    getParent() {
        return this.parent;
    }
    getTitle() {
        return this.getModel().getCaption();
    }
    getViewClass() {
        // console.log(`${this.constructor.name}.getViewClass`, this.getModel().getAttr('viewClass'));
        const model = this.getModel();
        if (!model.isAttr('viewClass')) {
            throw new Error(`${this.constructor.name} not supports view`);
        }
        const viewClassName = model.getAttr('viewClass');
        const viewClass = window[viewClassName];
        if (viewClass && !(viewClass.prototype instanceof _ModelView__WEBPACK_IMPORTED_MODULE_1__.ModelView)) {
            throw new Error(`view class ${viewClassName} is not inherited from ModelView`);
        }
        return viewClass;
    }
    isActionEnabled(name) {
        return false;
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.ModelController = ModelController;
}


/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/ModelView.tsx":
/*!**********************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/ModelView.tsx ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModelView": () => (/* binding */ ModelView)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../View */ "./src/frontend/viewer/Controller/View.tsx");
/* harmony import */ var _Model_Model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Model/Model */ "./src/frontend/viewer/Model/Model.ts");



class ModelView extends _View__WEBPACK_IMPORTED_MODULE_1__.View {
    constructor() {
        super(...arguments);
        this.renderActionIcon = undefined;
    }
    getActionsForDropdownButton() {
        return this.props.ctrl
            .getModel()
            .getCol('actions')
            .map((data) => {
            const actionName = _Model_Model__WEBPACK_IMPORTED_MODULE_2__.Model.getName(data);
            return {
                name: actionName,
                title: this.renderActionIcon
                    ? [
                        (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { children: this.renderActionIcon(actionName) }, 'icon'),
                        (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { children: _Model_Model__WEBPACK_IMPORTED_MODULE_2__.Model.getAttr(data, 'caption') }, 'title'),
                    ]
                    : _Model_Model__WEBPACK_IMPORTED_MODULE_2__.Model.getAttr(data, 'caption'),
                enabled: this.getCtrl().isActionEnabled(actionName),
            };
        });
    }
    getCssBlockName() {
        const model = this.props.ctrl.getModel();
        if (model.isAttr('cssBlock') && model.getAttr('cssBlock')) {
            return model.getAttr('cssBlock');
        }
        return super.getCssBlockName();
    }
    getStyle(row) { }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.ModelView = ModelView;
}


/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/PageController/PageController.ts":
/*!*****************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/PageController/PageController.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PageController": () => (/* binding */ PageController)
/* harmony export */ });
/* harmony import */ var _ModelController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ModelController */ "./src/frontend/viewer/Controller/ModelController/ModelController.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../common */ "./src/frontend/common/index.ts");
/* harmony import */ var _FormController_FormController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../FormController/FormController */ "./src/frontend/viewer/Controller/ModelController/FormController/FormController.ts");
/* harmony import */ var _Model_DataSource_DataSource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Model/DataSource/DataSource */ "./src/frontend/viewer/Model/DataSource/DataSource.ts");
/* harmony import */ var _FormController_RowFormController_RowFormController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../FormController/RowFormController/RowFormController */ "./src/frontend/viewer/Controller/ModelController/FormController/RowFormController/RowFormController.ts");
/* harmony import */ var _PageView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PageView */ "./src/frontend/viewer/Controller/ModelController/PageController/PageView.tsx");
/* harmony import */ var _ApplicationController_ApplicationController__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ApplicationController/ApplicationController */ "./src/frontend/viewer/Controller/ModelController/ApplicationController/ApplicationController.ts");







class PageController extends _ModelController__WEBPACK_IMPORTED_MODULE_0__.ModelController {
    constructor(model, parent, id) {
        super(model, parent);
        this.forms = [];
        this.onSaveAndCloseClick = async () => {
            console.log('PageController.onSaveAndCloseClick');
            this.validate();
            if (this.isValid()) {
                try {
                    this.getApp().getView().disableRerender();
                    await this.getModel().update();
                    console.log('page model updated', this.getModel().getFullName());
                }
                finally {
                    this.getApp().getView().enableRerender();
                }
                await this.getApp().closePage(this);
                if (this.getModel().getOptions().onClose) {
                    this.getModel().getOptions().onClose();
                }
            }
            else {
                await this.rerender();
            }
        };
        this.onClosePageClick = async (e) => {
            console.log('PageController.onClosePageClick', this.getModel().getFullName());
            await this.close();
        };
        this.onOpenPageClick = async (e) => {
            const name = this.getModel().getName();
            const key = this.getModel().getKey();
            const link = this.createOpenInNewLink(name, key);
            // console.log('link', link);
            window.open(link, '_blank');
        };
        this.onKeyDown = async (e) => {
            // console.log('PageController.onKeyDown', this.getModel().getFullName(), e);
            if (e.key === 'Escape') {
                if (this.isModal()) {
                    await this.close();
                }
            }
        };
        this.onSelectClick = async (e) => {
            console.log('PageController.onSelectClick');
            await this.selectRow(this.getSelectedRowKey());
        };
        this.onResetClick = async (e) => {
            console.log('PageController.onResetClick');
            await this.selectRow(null);
        };
        console.log(`${this.constructor.name}.constructor`, model, id);
        if (!id) {
            throw new Error('no id');
        }
        this.id = id;
    }
    static create(model, parent, id, options = null) {
        // console.log('PageController.create', model.getName());
        const { ctrlClass } = model.getData();
        if (ctrlClass) {
            const CustomClass = _common__WEBPACK_IMPORTED_MODULE_1__.FrontHostApp.getClassByName(ctrlClass);
            if (!CustomClass)
                throw new Error(`no class ${ctrlClass}`);
            return new CustomClass(model, parent, id, options);
        }
        // @ts-ignore
        return new PageController(model, parent, id, options);
        /*const CustomClass = FrontHostApp.getClassByName(`${model.getName()}PageController`);
        const Class = CustomClass ? CustomClass : PageController;
        return new Class(model, parent, id, options);*/
    }
    init() {
        for (const form of this.model.forms) {
            const ctrl = _FormController_FormController__WEBPACK_IMPORTED_MODULE_2__.FormController.create(form, this);
            ctrl.init();
            this.forms.push(ctrl);
        }
    }
    deinit() {
        console.log('PageController.deinit: ' + this.model.getFullName());
        for (const form of this.forms) {
            form.deinit();
        }
        super.deinit();
    }
    createOpenInNewLink(pageName, key) {
        return PageController.createLink(Object.assign({ page: pageName }, _Model_DataSource_DataSource__WEBPACK_IMPORTED_MODULE_3__.DataSource.keyToParams(key)));
    }
    async close() {
        // console.log('PageController.close', this.model.getFullName());
        const changed = this.isChanged();
        // console.log('changed:', changed);
        // const valid = this.isValid();
        // console.log('valid:', valid);
        if (this.model.hasRowFormWithDefaultSqlDataSource() && changed) {
            const result = await this.getApp().confirm({
                message: this.model.getApp().getText().form.areYouSure,
            });
            if (!result)
                return;
        }
        await this.getApp().closePage(this);
        if (this.getModel().getOptions().onClose) {
            this.getModel().getOptions().onClose();
        }
    }
    validate() {
        for (const form of this.forms) {
            if (form instanceof _FormController_RowFormController_RowFormController__WEBPACK_IMPORTED_MODULE_4__.RowFormController) {
                form.validate();
            }
        }
    }
    isValid() {
        // console.log('PageController.isValid', this.model.getFullName());
        for (const form of this.forms) {
            if (!form.isValid()) {
                return false;
            }
        }
        return true;
    }
    async onFormChange(e) {
        // console.log('PageController.onFormChange', this.model.getFullName());
        this.rerender();
    }
    onFormDiscard(formController) {
        console.log('PageController.onFormDiscard', this.model.getFullName());
        this.rerender();
    }
    onFormUpdate(e) {
        console.log('PageController.onFormUpdate:', this.model.getFullName(), e);
        this.rerender();
    }
    onFormInsert(e) {
        console.log('PageController.onFormInsert:', this.model.getFullName());
        // console.log('hasNew:', this.model.hasNew());
        for (const form of this.forms) {
            form.invalidate();
        }
        this.rerender();
    }
    async openPage(options) {
        if (!options.params) {
            options.params = {};
        }
        const params = this.getModel().getParams();
        for (const name in params) {
            if (!options.params[name]) {
                options.params[name] = params[name];
            }
        }
        return await this.getApp().openPage(options);
    }
    isChanged() {
        // console.log('PageController.isChanged', this.model.getFullName());
        for (const form of this.forms) {
            if (form.isChanged()) {
                // console.log(`FORM CHANGED: ${form.model.getFullName()}`);
                return true;
            }
        }
        return false;
    }
    getApp() {
        return this.parent;
    }
    getViewClass() {
        return super.getViewClass() || _PageView__WEBPACK_IMPORTED_MODULE_5__.PageView;
    }
    static createLink(params = null) {
        // const query = window.location.search.split('?')[1];
        // console.log('query:', query);
        if (params) {
            return [
                window.location.pathname,
                [
                    // ...(query ? query.split('&') : []),
                    ...(_ApplicationController_ApplicationController__WEBPACK_IMPORTED_MODULE_6__.ApplicationController.isDebugMode() ? ['debug=1'] : []),
                    ...Object.keys(params).map((name) => `${name}=${encodeURI(params[name])}`),
                ].join('&'),
            ].join('?');
        }
        return window.location.pathname;
    }
    getForm(name) {
        return this.forms.find((form) => form.model.getName() === name);
    }
    async onActionClick(name) {
        console.log('PageController.onActionClick', name);
    }
    getTitle() {
        const model = this.getModel();
        const key = model.getKey();
        let keyPart;
        if (key) {
            const arr = JSON.parse(key);
            if (arr.length === 1 && typeof arr[0] === 'number') {
                keyPart = `#${arr[0]}`;
            }
            else {
                keyPart = `${key}`;
            }
        }
        return [
            model.getCaption(),
            ...(_ApplicationController_ApplicationController__WEBPACK_IMPORTED_MODULE_6__.ApplicationController.isDebugMode() ? [`(${this.getId()})`] : []),
            ...(keyPart ? [keyPart] : []),
        ].join(' ');
    }
    getSelectedRowKey() {
        for (const form of this.forms) {
            const selectedRowKey = form.getSelectedRowKey();
            if (selectedRowKey)
                return selectedRowKey;
        }
        return null;
    }
    async selectRow(key) {
        console.log('PageController.selectRow', key);
        await this.close();
        await this.getModel().getOptions().onSelect(key);
    }
    invalidate() {
        this.forms.forEach((form) => form.invalidate());
    }
    getId() {
        return this.id;
    }
    isModal() {
        return this.getModel().isModal();
    }
    isAutoFocus() {
        for (const form of this.forms) {
            if (form.isAutoFocus()) {
                return true;
            }
        }
        return false;
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.PageController = PageController;
}


/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/PageController/PageView.tsx":
/*!************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/PageController/PageView.tsx ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PageView": () => (/* binding */ PageView)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ModelView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ModelView */ "./src/frontend/viewer/Controller/ModelController/ModelView.tsx");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../common */ "./src/frontend/common/index.ts");
/* harmony import */ var _PageView_less__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PageView.less */ "./src/frontend/viewer/Controller/ModelController/PageController/PageView.less");
/* harmony import */ var _PageView_less__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_PageView_less__WEBPACK_IMPORTED_MODULE_4__);





class PageView extends _ModelView__WEBPACK_IMPORTED_MODULE_2__.ModelView {
    constructor(props) {
        super(props);
        this.onActionsClick = async (li) => {
            // console.log('PageView.onActionsClick:', li);
            const ctrl = this.getCtrl();
            const name = li.dataset.action;
            try {
                const result = await ctrl.onActionClick(name);
                if (!result) {
                    throw new Error(`no handler for action '${name}'`);
                }
            }
            catch (err) {
                console.error(err);
                await this.getCtrl().getApp().alert({ message: err.message });
            }
        };
        this.checkParent();
        this.el = react__WEBPACK_IMPORTED_MODULE_1___default().createRef();
    }
    isToolbar() {
        const model = this.getCtrl().getModel();
        return model.hasActions();
        //|| (model.isModal() && model.hasRowFormWithDefaultSqlDataSource())
        //|| model.isSelectMode();
    }
    getFormTabs(forms) {
        return forms.map((form) => {
            return {
                name: form.getModel().getName(),
                title: form.getTitle(),
                content: this.renderForm(form),
            };
        });
    }
    getRowForms() {
        return this.getCtrl()
            .forms.filter((form) => form.getModel().getClassName() === 'RowForm')
            .filter((form) => form.isVisible());
    }
    getTableForms() {
        return this.getCtrl()
            .forms.filter((form) => form.getModel().getClassName() === 'TableForm')
            .filter((form) => form.isVisible());
    }
    renderForm(formCtrl, props = {}) {
        return react__WEBPACK_IMPORTED_MODULE_1___default().createElement(formCtrl.getViewClass(), Object.assign({ parent: this, key: formCtrl.getModel().getName(), ctrl: formCtrl, onCreate: formCtrl.onViewCreate, updated: formCtrl.getUpdated() }, props));
    }
    renderRowForms() {
        return this.getRowForms().map((form) => this.renderForm(form));
    }
    renderTitle() {
        const ctrl = this.getCtrl();
        const model = ctrl.getModel();
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h1", Object.assign({ className: `${this.getCssBlockName()}__title` }, { children: [ctrl.getTitle(), model.hasRowFormWithDefaultSqlDataSource() &&
                    (ctrl.isChanged() || model.hasNew()) && [
                    ' ',
                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", Object.assign({ className: `${this.getCssBlockName()}__star` }, { children: "*" }), 'star'),
                ]] })));
    }
    renderSelectButton() {
        const ctrl = this.getCtrl();
        const model = ctrl.getModel();
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common__WEBPACK_IMPORTED_MODULE_3__.Button, Object.assign({ classList: ['toolbar-button', 'default'], onClick: ctrl.onSelectClick, enabled: !!ctrl.getSelectedRowKey() }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { children: model.getApp().getText().page.select }) })));
    }
    renderSaveAndCloseButton() {
        const ctrl = this.getCtrl();
        const model = ctrl.getModel();
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common__WEBPACK_IMPORTED_MODULE_3__.Button, Object.assign({ classList: ['toolbar-button', 'default'], onClick: ctrl.onSaveAndCloseClick, enabled: ctrl.isValid() && (model.hasNew() || ctrl.isChanged()) }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { children: model.getApp().getText().page.saveAndClose }) })));
    }
    renderCloseButton() {
        const ctrl = this.getCtrl();
        const model = ctrl.getModel();
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common__WEBPACK_IMPORTED_MODULE_3__.Button, Object.assign({ classList: ['toolbar-button'], onClick: ctrl.onClosePageClick }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { children: model.getApp().getText().page.close }) })));
    }
    renderActionsDropdownButton() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common__WEBPACK_IMPORTED_MODULE_3__.DropdownButton, Object.assign({ classList: ['toolbar-dropdown-button'], actions: this.getActionsForDropdownButton(), onClick: this.onActionsClick }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common__WEBPACK_IMPORTED_MODULE_3__.MoreVertIcon, {}) })));
    }
    renderToolbar() {
        const ctrl = this.getCtrl();
        const model = ctrl.getModel();
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__toolbar` }, { children: model.hasActions() && this.renderActionsDropdownButton() })));
    }
    /*shouldComponentUpdate(nextProps, nextState) {
        return false;
    }*/
    renderTableForms() {
        const tableForms = this.getTableForms();
        if (tableForms.length === 1) {
            return this.renderForm(tableForms[0]);
        }
        else {
            return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__table-forms flex-max frame` }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: "frame__container" }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common__WEBPACK_IMPORTED_MODULE_3__.Tab2, { tabs: this.getFormTabs(tableForms), classList: ['Tab-blue', 'full'] }) })) })));
        }
    }
    renderOpenPageHeaderButton() {
        const ctrl = this.getCtrl();
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__open`, onClick: ctrl.onOpenPageClick }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common__WEBPACK_IMPORTED_MODULE_3__.OpenInNewIcon, {}) }), 'open'));
    }
    renderClosePageHeaderButton() {
        const ctrl = this.getCtrl();
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__close`, onClick: ctrl.onClosePageClick }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common__WEBPACK_IMPORTED_MODULE_3__.CloseIcon2, {}) }), 'close'));
    }
    renderHeader() {
        const model = this.getCtrl().getModel();
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ className: `${this.getCssBlockName()}__header` }, { children: [this.renderTitle(), model.isModal() && [
                    ...(model.getKey() ? [this.renderOpenPageHeaderButton()] : []),
                    this.renderClosePageHeaderButton(),
                ]] })));
    }
    renderMain() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__main flex-max frame` }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ className: 'frame__container flex-column grid-gap-10' }, { children: [this.isToolbar() && this.renderToolbar(), this.getCtrl().getModel().isFormInTab()
                        ? this.renderForms2()
                        : this.renderForms()] })) })));
    }
    renderForms() {
        const model = this.getCtrl().getModel();
        return [
            ...(model.hasRowForm() ? [this.renderRowForms()] : []),
            ...(model.hasTableForm() ? [this.renderTableForms()] : []),
        ];
    }
    renderForms2() {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common__WEBPACK_IMPORTED_MODULE_3__.Tab2, { tabs: this.getFormTabs(this.getCtrl().forms.filter((form) => form.isVisible())), classList: ['Tab-blue', 'full'] }));
    }
    renderFooter() {
        const model = this.getCtrl().getModel();
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ className: `${this.getCssBlockName()}__footer` }, { children: [this.renderCloseButton(), model.isModal() &&
                    model.hasRowFormWithDefaultSqlDataSource() &&
                    this.renderSaveAndCloseButton(), model.isSelectMode() && this.renderSelectButton()] })));
    }
    render() {
        console.log('PageView.render', this.getCtrl().getModel().getFullName());
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({ className: `${this.getCssClassNames()} ${this.getCtrl().isModal() ? '' : 'full'} flex-column`, style: this.getStyle(), ref: this.el, tabIndex: 0, onKeyDown: this.getCtrl().onKeyDown }, { children: [this.renderHeader(), this.renderMain(), this.getCtrl().isModal() && this.renderFooter()] })));
    }
    getStyle() {
        if (this.getCtrl().isModal()) {
            return {
                width: 1000,
                height: 750,
            };
        }
    }
    componentDidMount() {
        // console.log('PageView.componentDidMount', this.getCtrl().getModel().getFullName());
        if (this.getCtrl().isAutoFocus() && !this.getCtrl().getModel().getKey()) {
        }
        else {
            this.focus();
        }
    }
    focus() {
        // console.log('PageView.focus', this.getCtrl().getModel().getFullName());
        if (this.getElement()) {
            // console.log('focus', this.getElement());
            this.getElement().focus();
        }
        else {
            console.error(`${this.getCtrl().getModel().getFullName()}: el is null (ref={this.el})`);
        }
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.PageView = PageView;
}


/***/ }),

/***/ "./src/frontend/viewer/Controller/View.tsx":
/*!*************************************************!*\
  !*** ./src/frontend/viewer/Controller/View.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "View": () => (/* binding */ View)
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common */ "./src/frontend/common/index.ts");

class View extends _common__WEBPACK_IMPORTED_MODULE_0__.ReactComponent {
    constructor(props) {
        super(props);
        if (!props.ctrl)
            throw new Error(`${this.constructor.name}: no ctrl`);
        if (!props.onCreate)
            throw new Error(`${this.constructor.name}: no onCreate`);
    }
    getCtrl() {
        return this.props.ctrl;
    }
}


/***/ }),

/***/ "./src/frontend/viewer/EventEmitter.ts":
/*!*********************************************!*\
  !*** ./src/frontend/viewer/EventEmitter.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventEmitter": () => (/* binding */ EventEmitter)
/* harmony export */ });
class EventEmitter {
    constructor() {
        this.list = {};
    }
    on(name, cb) {
        // console.log('EventEmitter.on', name);
        if (!this.list[name]) {
            this.list[name] = [];
        }
        this.list[name].push(cb);
    }
    off(name, cb) {
        // console.log('EventEmitter.off', name);
        const i = this.list[name].indexOf(cb);
        if (i === -1) {
            throw new Error(`cannot find cb for ${name}`);
        }
        // console.log(i);
        this.list[name].splice(i, 1);
    }
    async emit(name, e) {
        // console.log('EventEmitter.emit', name, e);
        if (this.list[name] && this.list[name].length) {
            // @ts-ignore
            const results = await Promise.allSettled(this.list[name].map((cb) => cb(e)));
            // console.log('results:', results);
            for (const result of results) {
                if (result.status === 'rejected') {
                    throw result.reason;
                }
            }
        }
    }
}


/***/ }),

/***/ "./src/frontend/viewer/Model/Application/Application.ts":
/*!**************************************************************!*\
  !*** ./src/frontend/viewer/Model/Application/Application.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Application": () => (/* binding */ Application)
/* harmony export */ });
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model */ "./src/frontend/viewer/Model/Model.ts");
/* harmony import */ var _Database_Database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Database/Database */ "./src/frontend/viewer/Model/Database/Database.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common */ "./src/frontend/common/index.ts");



class Application extends _Model__WEBPACK_IMPORTED_MODULE_0__.Model {
    constructor() {
        super(...arguments);
        this.databases = [];
        this.dataSources = [];
    }
    /* constructor(data) {
        super(data);
    } */
    init() {
        // console.log('Application.init');
        if (!this.data.theme)
            throw new Error('no theme attr');
        // databases
        for (const data of this.data.databases) {
            const database = new _Database_Database__WEBPACK_IMPORTED_MODULE_1__.Database(data, this);
            database.init();
            this.addDatabase(database);
        }
        // data sources
        this.createDataSources();
    }
    deinit() {
        this.deinitDataSources();
        // TODO: add deinit on opened pages
        super.deinit();
    }
    addDatabase(database) {
        this.databases.push(database);
    }
    async logout() {
        const data = await this.request({
            action: 'logout',
        });
        this.emit('logout', { source: this });
    }
    async request(options) {
        // console.warn('Application.request', data);
        const start = Date.now();
        const [headers, body] = await _common__WEBPACK_IMPORTED_MODULE_2__.FrontHostApp.doHttpRequest2(options);
        if (!headers['qforms-platform-version'])
            throw new Error('no qforms-platform-version header');
        if (!headers['qforms-app-version'])
            throw new Error('no qforms-app-version header');
        this.emit('request', {
            time: Date.now() - start,
            remotePlatformVersion: headers['qforms-platform-version'],
            remoteAppVersion: headers['qforms-app-version'],
        });
        return body;
    }
    getDatabase(name) {
        // console.log('Application.getDatabase', name);
        const database = this.databases.find((database) => database.getName() === name);
        if (!database)
            throw new Error(`no database: ${name}`);
        return database;
    }
    getText() {
        return this.data.text;
    }
    getUser() {
        return this.data.user;
    }
    getDomain() {
        return this.getAttr('domain');
    }
    getVirtualPath() {
        return this.data.virtualPath;
    }
    async rpc(name, params) {
        console.log('Application.rpc', this.getFullName(), name, params);
        if (!name)
            throw new Error('no name');
        const response = await this.request({
            uuid: this.getAttr('uuid'),
            action: 'rpc',
            name: name,
            params: params,
        });
        if (response.errorMessage)
            throw new Error(response.errorMessage);
        return response;
    }
    emitResult(result, source = null) {
        console.log('Application.emitResult', result, source);
        const promises = [];
        for (const database in result) {
            promises.push(...this.getDatabase(database).emitResult(result[database], source));
        }
        // console.log('promises:', promises);
        // @ts-ignore
        return Promise.allSettled(promises);
    }
    getNodeEnv() {
        return this.data.nodeEnv;
    }
    isDevelopment() {
        return this.getNodeEnv() === 'development';
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.Application = Application;
}


/***/ }),

/***/ "./src/frontend/viewer/Model/Column/Column.ts":
/*!****************************************************!*\
  !*** ./src/frontend/viewer/Model/Column/Column.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Column": () => (/* binding */ Column)
/* harmony export */ });
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model */ "./src/frontend/viewer/Model/Model.ts");

class Column extends _Model__WEBPACK_IMPORTED_MODULE_0__.Model {
    constructor(data, parent) {
        super(data, parent);
        if (!this.getAttr('type'))
            throw new Error(`column ${this.getFullName()}: no type`);
        if (!['string', 'number', 'boolean', 'object', 'date'].includes(this.getAttr('type'))) {
            throw new Error(`${this.getFullName()}: wrong column type: ${this.getAttr('type')}`);
        }
    }
    init() {
        // console.log('Column.init', this.getFullName());
    }
    getType() {
        return this.getAttr('type');
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.Column = Column;
}


/***/ }),

/***/ "./src/frontend/viewer/Model/DataSource/DataSource.ts":
/*!************************************************************!*\
  !*** ./src/frontend/viewer/Model/DataSource/DataSource.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataSource": () => (/* binding */ DataSource)
/* harmony export */ });
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model */ "./src/frontend/viewer/Model/Model.ts");
/* harmony import */ var _Form_Form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Form/Form */ "./src/frontend/viewer/Model/Form/Form.ts");
/* harmony import */ var _Page_Page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Page/Page */ "./src/frontend/viewer/Model/Page/Page.ts");
/* harmony import */ var _Application_Application__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Application/Application */ "./src/frontend/viewer/Model/Application/Application.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common */ "./src/frontend/common/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../types */ "./src/types.ts");






class DataSource extends _Model__WEBPACK_IMPORTED_MODULE_0__.Model {
    constructor(data, parent) {
        super(data, parent);
        this.rows = null;
        this.rowsByKey = null;
        this.news = [];
        this.changes = new Map();
        this.frame = 1;
        this.count = null;
        this.lastFrame = 1;
        this.onTableInsert = async (e) => {
            if (this.deinited)
                throw new Error(`${this.getFullName()}: this data source deinited for onTableUpdate`);
            if (e.source === this) {
                // console.error('onTableInsert stop self insert', this.getFullName());
                return;
            }
            console.log('DataSource.onTableInsert', this.getFullName(), e);
            if (!e.inserts.length)
                throw new Error(`${this.getFullName()}: no inserts`);
            for (const key of e.inserts) {
                if (this.getRow(key)) {
                    console.log('rows:', this.rows);
                    console.log('rowsByKey:', this.rowsByKey);
                    throw new Error(`${this.getFullName()}: row already in this data source: ${key}`);
                }
                const newValues = e.source.getRow(key);
                const newRow = {};
                DataSource.copyNewValues(newRow, newValues);
                // console.log('newRow:', newRow);
                this.addRow(newRow);
            }
            // events
            if (this.parent.onDataSourceInsert) {
                this.parent.onDataSourceInsert(e);
            }
            this.emit('insert', e);
        };
        this.onTableUpdate = async (e) => {
            if (this.deinited)
                throw new Error(`${this.getFullName()}: this data source deinited for onTableUpdate`);
            if (e.source === this) {
                // console.error('onTableUpdate stop self update', this.getFullName());
                return;
            }
            console.log('DataSource.onTableUpdate', this.getFullName(), e);
            if (!Object.keys(e.updates).length)
                throw new Error(`${this.getFullName()}: no updates`);
            for (const key in e.updates) {
                if (this.getRow(key)) {
                    const newKey = e.updates[key];
                    const sourceRow = e.source.getRow(newKey);
                    this.updateRow(key, sourceRow);
                }
            }
            // events
            if (this.parent.onDataSourceUpdate) {
                this.parent.onDataSourceUpdate(e);
            }
            this.emit('update', e);
        };
        this.onTableDelete = async (e) => {
            if (this.deinited)
                throw new Error(`${this.getFullName()}: this data source deinited for onTableDelete`);
            if (e.source === this) {
                // console.error('onTableDelete stop self update', this.getFullName());
                return;
            }
            console.log('DataSource.onTableDelete', this.getFullName(), e);
            if (!e.deletes.length)
                throw new Error(`${this.getFullName()}: no deletes`);
            for (const key of e.deletes) {
                if (this.getRow(key)) {
                    this.removeRow(key);
                }
            }
            // events
            if (this.parent.onDataSourceDelete) {
                this.parent.onDataSourceDelete(e);
            }
            this.emit('delete', e);
        };
        this.onTableRefresh = async (e) => {
            throw new Error('DataSource.onTableRefresh: not implemented');
        };
        if (data.count !== undefined) {
            this.count = data.count;
        }
    }
    init() {
        // console.log('DataSource.init', this.getFullName(), this.getClassName());
        this.setRows(this.data.rows);
        if (this.getAttr('table')) {
            const table = this.getTable();
            table.on('insert', this.onTableInsert);
            table.on('update', this.onTableUpdate);
            table.on('delete', this.onTableDelete);
            table.on('refresh', this.onTableRefresh);
        }
    }
    deinit() {
        if (this.getAttr('table')) {
            const table = this.getTable();
            table.off('insert', this.onTableInsert);
            table.off('update', this.onTableUpdate);
            table.off('delete', this.onTableDelete);
            table.off('refresh', this.onTableRefresh);
        }
        super.deinit();
    }
    setRows(rows) {
        this.rows = rows;
        this.fillRowsByKey();
    }
    addRow(row) {
        this.rows.push(row);
        const key = this.getRowKey(row);
        this.rowsByKey[key] = row;
    }
    addRows(rows) {
        for (let i = 0; i < rows.length; i++) {
            this.rows.push(rows[i]);
        }
        this.fillRowsByKey();
    }
    getRowsLength() {
        return this.rows.length;
    }
    fillRowsByKey() {
        // console.log('DataSource.fillRowsByKey', this.getFullName())
        this.rowsByKey = {};
        for (let i = 0; i < this.rows.length; i++) {
            const row = this.rows[i];
            const key = this.getRowKey(row);
            this.rowsByKey[key] = row;
        }
        // console.log('this.rowsByKey:', this.getFullName(), this.rowsByKey);
    }
    // deinit() {
    //     console.log('DataSource.deinit', this.getFullName());
    //     super.deinit();
    // }
    /*getType(column) {
        // console.log('DataSource.getType', this.getClassName(), column);
        throw new Error('DataSource column type not implemented');
    }*/
    discardRowColumn(row, column) {
        if (this.changes.has(row) && this.changes.get(row)[column] !== undefined) {
            delete this.changes.get(row)[column];
        }
    }
    changeRowColumn(row, column, newValue) {
        if (!this.changes.has(row))
            this.changes.set(row, {});
        this.changes.get(row)[column] = newValue;
    }
    setValue(row, column, value) {
        // console.log('DataSource.setValue', this.getFullName(), column, value, typeof value);
        if (value === undefined)
            throw new Error(`${this.getFullName()}: undefined is wrong value for data source`);
        if (typeof value === 'object' && value !== null) {
            throw new Error(`setValue: ${this.getFullName()}.${column}: object must be in JSON format`);
        }
        if (row[column] !== value) {
            this.changeRowColumn(row, column, value);
            if (row[column] === undefined && value === null) {
                // workaround for new rows
                this.discardRowColumn(row, column);
            }
        }
        else {
            this.discardRowColumn(row, column);
        }
        if (this.changes.has(row) && !Object.keys(this.changes.get(row)).length)
            this.changes.delete(row);
        // console.log('changes:', this.changes);
    }
    isChanged() {
        // console.log('DataSource.isChanged', this.getFullName(), this.changes.size);
        return !!this.changes.size;
    }
    hasNew() {
        return !!this.news.length;
    }
    isRowColumnChanged(row, column) {
        // console.log('DataSource.isRowColumnChanged', this.getFullName());
        return row[column] !== this.getValue(row, column);
    }
    getValue(row, column) {
        // console.log('DataSource.getValue', column);
        let value;
        if (this.changes.has(row) && this.changes.get(row)[column] !== undefined) {
            value = this.changes.get(row)[column];
        }
        else {
            value = row[column];
        }
        if (value !== undefined && typeof value !== 'string') {
            throw new Error(`getValue: ${this.getFullName()}.${column}: object must be in JSON format, value: ${value}`);
        }
        // console.log('DataSource.getValue:', value);
        return value;
    }
    getKeyValues(row) {
        return this.data.keyColumns.reduce((keyValues, column) => {
            keyValues[column] = JSON.parse(row[column]);
            return keyValues;
        }, {});
    }
    getRowKey(row) {
        // console.log('DataSource.getRowKey', row);
        const arr = [];
        for (const column of this.data.keyColumns) {
            if (row[column] === undefined)
                return null;
            if (row[column] === null)
                throw new Error('wrong value null for data source value');
            try {
                const value = JSON.parse(row[column]);
                arr.push(value);
            }
            catch (err) {
                console.log('getRowKey: cannot parse: ', row[column]);
                throw err;
            }
        }
        return (0,_types__WEBPACK_IMPORTED_MODULE_5__.keyArrayToKey)(arr);
    }
    removeRow(key) {
        const row = this.getRow(key);
        if (!row)
            throw new Error(`${this.getFullName()}: no row with key ${key} to remove`);
        const i = this.rows.indexOf(row);
        if (i === -1)
            throw new Error(`${this.getFullName()}: no row with i ${i} to remove`);
        this.rows.splice(i, 1);
        delete this.rowsByKey[key];
    }
    newRow(row) {
        console.log('DataSource.newRow', this.getFullName(), row);
        if (this.rows.length > 0) {
            throw new Error('rows can be added to empty data sources only in new mode');
        }
        this.news.push(row);
    }
    getSingleRow(withChanges = false) {
        if (this.news[0])
            return this.news[0];
        const row = this.rows[0];
        if (!row)
            throw new Error('no single row');
        if (withChanges)
            return this.getRowWithChanges(row);
        return row;
    }
    getForm() {
        return this.parent instanceof _Form_Form__WEBPACK_IMPORTED_MODULE_1__.Form ? this.parent : null;
    }
    getPage() {
        if (this.parent instanceof _Page_Page__WEBPACK_IMPORTED_MODULE_2__.Page)
            return this.parent;
        if (this.parent instanceof _Form_Form__WEBPACK_IMPORTED_MODULE_1__.Form)
            return this.parent.getPage();
        return null;
    }
    getApp() {
        if (this.parent instanceof _Application_Application__WEBPACK_IMPORTED_MODULE_3__.Application)
            return this.parent;
        return this.parent.getApp();
    }
    /*getNamespace() {
        if (this.parent instanceof Form) {
            return this.parent.getPage().getName() + '.' + this.parent.getName() + '.' + this.getName();
        }
        if (this.parent instanceof Page) {
            return this.parent.getName() + '.' + this.getName();
        }
        return this.getName();
    }*/
    getRow(key) {
        return this.rowsByKey[key] || null;
    }
    /*getRowByKey(key) {
        return this.rowsByKey[key] || null;
    }*/
    getRows() {
        return this.rows;
    }
    getRowByIndex(i) {
        return this.rows[i];
    }
    discard() {
        console.log('DataSource.discard', this.getFullName());
        if (!this.isChanged())
            throw new Error(`no changes in data source ${this.getFullName()}`);
        this.changes.clear();
    }
    static keyToParams(key, paramName = 'key') {
        if (typeof key !== 'string')
            throw new Error('key not string');
        const params = {};
        const arr = JSON.parse(key);
        if (arr.length === 1) {
            params[paramName] = arr[0];
        }
        else if (arr.length > 1) {
            for (let i = 0; i < arr.length; i++) {
                params[`${paramName}${i + 1}`] = arr[i];
            }
        }
        else {
            throw new Error(`invalid key: ${key}`);
        }
        return params;
    }
    getChangesByKey() {
        const changes = {};
        for (const row of this.changes.keys()) {
            changes[this.getRowKey(row)] = this.changes.get(row);
        }
        return changes;
    }
    getRowWithChanges(row) {
        if (this.changes.has(row)) {
            return Object.assign(row, this.changes.get(row));
            // return { ...row, ...this.changes.get(row) };
        }
        return row;
    }
    hasNewRows() {
        return this.news.length > 0;
    }
    static copyNewValues(row, newValues) {
        for (const name in newValues) {
            row[name] = newValues[name];
        }
    }
    updateRow(key, newValues) {
        console.log('DataSource.updateRow', this.getFullName(), key, newValues);
        if (!key)
            throw new Error('no key');
        const row = this.getRow(key);
        if (!row)
            throw new Error(`${this.getFullName()}: no row with key ${key}`);
        const newKey = this.getRowKey(newValues);
        DataSource.copyNewValues(row, newValues); // copy new values to original row object
        if (key !== newKey) {
            delete this.rowsByKey[key];
            this.rowsByKey[newKey] = row;
        }
        // console.log(`key: ${key} to ${newKey}`);
        // console.log('this.rowsByKey:', this.rowsByKey);
        // console.log('this.data.rows:', this.data.rows);
    }
    getTable() {
        if (!this.getAttr('table'))
            throw new Error(`${this.getFullName()}: table attr empty`);
        return this.getDatabase().getTable(this.getAttr('table'));
    }
    getDatabase() {
        // console.log('DataSource.getDatabase', this.getFullName(), this.getAttr('database'));
        if (!this.getAttr('database'))
            throw new Error(`${this.getFullName()}: database attr empty`);
        return this.getApp().getDatabase(this.getAttr('database'));
    }
    getType(columnName) {
        // console.log('DataSource.getType', columnName);
        const type = this.getTable().getColumn(columnName).getType();
        // console.log('type:', type);
        return type;
    }
    async insert(row) {
        console.log('DataSource.insert', this.news);
        if (!this.news.length)
            throw new Error('no new rows to insert');
        const inserts = [];
        for (const row of this.news) {
            const newValues = this.getRowWithChanges(row);
            // console.log('newValues:', newValues);
            DataSource.copyNewValues(row, newValues);
            // console.log('row:', row);
            const key = this.getRowKey(row);
            if (!key)
                throw new Error('invalid insert row, no key');
            // console.log('key:', key);
            inserts.push(key);
        }
        this.changes.clear();
        for (const row of this.news) {
            this.addRow(row);
        }
        this.news = [];
        console.log('rows:', this.getRows());
        console.log('inserts:', inserts);
        // events
        if (this.parent.onDataSourceInsert) {
            this.parent.onDataSourceInsert({ source: this, inserts });
        }
        this.emit('insert', { source: this, inserts });
        const database = this.getAttr('database');
        const table = this.getAttr('table');
        if (database && table) {
            const result = {
                [database]: {
                    [table]: { insert: inserts },
                },
            };
            await this.getApp().emitResult(result, this);
            return result;
        }
        return null;
    }
    async delete(key) {
        console.log('DataSource.delete', key);
        if (!key)
            throw new Error('no key');
        this.removeRow(key);
        // events
        const deletes = [key];
        if (this.parent.onDataSourceDelete) {
            this.parent.onDataSourceDelete({ source: this, deletes });
        }
        this.emit('delete', { source: this, deletes });
        const database = this.getAttr('database');
        const table = this.getAttr('table');
        if (database && table) {
            const result = {
                [database]: {
                    [table]: { delete: deletes },
                },
            };
            await this.getApp().emitResult(result, this);
            return result;
        }
        return null;
    }
    async update() {
        console.log('DataSource.update', this.getFullName());
        if (this.news.length) {
            await this.insert();
            return;
        }
        if (!this.changes.size)
            throw new Error(`no changes: ${this.getFullName()}`);
        const changes = this.getChangesByKey();
        // console.log('changes:', changes);
        // apply changes to rows
        const updates = {};
        for (const key in changes) {
            // console.log('key:', key);
            const row = this.getRow(key);
            // console.log('row:', row);
            const newValues = this.getRowWithChanges(row);
            // console.log('newValues:', newValues);
            const newKey = this.getRowKey(newValues);
            // console.log('newKey:', newKey);
            this.updateRow(key, newValues);
            updates[key] = newKey;
        }
        this.changes.clear();
        // events
        if (this.parent.onDataSourceUpdate) {
            this.parent.onDataSourceUpdate({ source: this, updates });
        }
        this.emit('update', { source: this, updates });
        const database = this.getAttr('database');
        const table = this.getAttr('table');
        if (database && table) {
            const reuslt = {
                [database]: {
                    [table]: {
                        update: updates,
                    },
                },
            };
            await this.getApp().emitResult(reuslt, this);
            return reuslt;
        }
        return null;
    }
    isSurrogate() {
        return this.isAttr('database');
    }
    moveRow(row, offset) {
        console.log('DataSource.moveRow');
        _common__WEBPACK_IMPORTED_MODULE_4__.Helper.moveArrItem(this.rows, row, offset);
        // refresh event
        const event = { source: this };
        if (this.parent.onDataSourceRefresh) {
            this.parent.onDataSourceRefresh(event);
        }
        this.emit('refresh', event);
    }
    getLimit() {
        if (this.getAttr('limit')) {
            return parseInt(this.getAttr('limit'));
        }
        return null;
    }
    getCount() {
        if (this.count === null)
            throw new Error(`${this.getFullName()}: no count info`);
        return this.count;
    }
    getFrame() {
        return this.frame;
    }
    getLastFrame() {
        return this.lastFrame;
    }
    setFrame(frame) {
        this.frame = frame;
    }
    getFramesCount() {
        if (this.count === null)
            throw new Error(`${this.getFullName()}: no count info`);
        if (this.count === 0)
            return 1;
        if (this.getLimit())
            return Math.ceil(this.count / this.getLimit());
        return 1;
    }
    hasMore() {
        return this.lastFrame < this.getFramesCount();
    }
    isPersistent() {
        return false;
    }
    async refresh() {
        throw new Error('DataSource.refresh not implemented');
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.DataSource = DataSource;
}


/***/ }),

/***/ "./src/frontend/viewer/Model/Database/Database.ts":
/*!********************************************************!*\
  !*** ./src/frontend/viewer/Model/Database/Database.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Database": () => (/* binding */ Database)
/* harmony export */ });
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model */ "./src/frontend/viewer/Model/Model.ts");
/* harmony import */ var _Table_Table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Table/Table */ "./src/frontend/viewer/Model/Table/Table.ts");


class Database extends _Model__WEBPACK_IMPORTED_MODULE_0__.Model {
    constructor(data, parent = null) {
        super(data, parent);
        this.tables = [];
    }
    init() {
        // console.log('Database.init', this.getName());
        for (const data of this.data.tables) {
            const table = new _Table_Table__WEBPACK_IMPORTED_MODULE_1__.Table(data, this);
            table.init();
            this.addTable(table);
        }
    }
    addTable(table) {
        this.tables.push(table);
    }
    getTable(name) {
        const table = this.tables.find((table) => table.getName() === name);
        if (!table)
            throw new Error(`${this.getFullName()}: no table with name: ${name}`);
        return table;
    }
    emitResult(result, source = null) {
        console.log('Database.emitResult');
        const promises = [];
        for (const table in result) {
            promises.push(...this.getTable(table).emitResult(result[table], source));
        }
        return promises;
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.Database = Database;
}


/***/ }),

/***/ "./src/frontend/viewer/Model/Form/Form.ts":
/*!************************************************!*\
  !*** ./src/frontend/viewer/Model/Form/Form.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Form": () => (/* binding */ Form)
/* harmony export */ });
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model */ "./src/frontend/viewer/Model/Model.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common */ "./src/frontend/common/index.ts");


class Form extends _Model__WEBPACK_IMPORTED_MODULE_0__.Model {
    constructor(data, parent) {
        super(data, parent);
        this.dataSources = [];
        this.fields = [];
    }
    init() {
        // data sources
        this.createDataSources();
        // fields
        for (const data of this.data.fields) {
            const Class = _common__WEBPACK_IMPORTED_MODULE_1__.FrontHostApp.getClassByName(data.class);
            if (!Class)
                throw new Error(`no ${data.class} class`);
            const field = new Class(data, this);
            field.init();
            this.fields.push(field);
        }
    }
    deinit() {
        // console.log('Form.deinit:', this.getFullName());
        this.deinitDataSources();
        for (const field of this.fields) {
            field.deinit();
        }
        super.deinit();
    }
    fillDefaultValues(row) {
        for (const field of this.fields) {
            field.fillDefaultValue(row);
        }
    }
    onDataSourceRefresh(e) {
        // console.log('Form.onDataSourceRefresh', this.getFullName());
        this.emit('refresh', e);
    }
    onDataSourceInsert(e) {
        // console.log('Form.onDataSourceInsert', this.getFullName());
        this.parent.onFormInsert(e);
        this.emit('insert', e);
    }
    onDataSourceUpdate(e) {
        // console.log('Form.onDataSourceUpdate', this.getFullName());
        this.emit('update', e);
    }
    onDataSourceDelete(e) {
        // console.log('Form.onDataSourceDelete', this.getFullName());
        this.emit('delete', e);
    }
    async update() {
        console.log('Form.update', this.getFullName(), this.isChanged());
        if (this.getPage().deinited)
            throw new Error('page already deinited');
        if (!this.isChanged() && !this.getDefaultDataSource().hasNewRows())
            throw new Error(`form model not changed or does not have new rows: ${this.getFullName()}`);
        await this.getDefaultDataSource().update();
    }
    isChanged() {
        // console.log('Form.isChanged', this.getFullName());
        return this.getDefaultDataSource().isChanged();
    }
    hasNew() {
        // console.log('Form.hasNew', this.getFullName());
        return this.getDefaultDataSource().hasNew();
    }
    async rpc(name, params) {
        console.log('Form.rpc', this.getFullName(), name, params);
        if (!name)
            throw new Error('no name');
        const result = await this.getApp().request({
            uuid: this.getApp().getAttr('uuid'),
            action: 'rpc',
            page: this.getPage().getName(),
            form: this.getName(),
            name: name,
            params: params,
        });
        if (result.errorMessage)
            throw new Error(result.errorMessage);
        return result;
    }
    getKey() {
        return null;
    }
    getDefaultDataSource() {
        const dataSource = this.getDataSource('default');
        if (!dataSource)
            throw new Error(`${this.getFullName()}: no default data source`);
        return dataSource;
    }
    getPage() {
        return this.parent;
    }
    getApp() {
        return this.parent.parent;
    }
    async refresh() {
        await this.getDefaultDataSource().refresh();
    }
    getField(name) {
        return this.fields.find((field) => field.getName() === name);
    }
    hasDefaultPersistentDataSource() {
        return this.getDefaultDataSource().isPersistent();
    }
    decodeRow(row) {
        const values = {};
        for (const field of this.fields) {
            const column = field.getAttr('column');
            if (column) {
                values[column] = field.getValue(row);
            }
        }
        return values;
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.Form = Form;
}


/***/ }),

/***/ "./src/frontend/viewer/Model/Model.ts":
/*!********************************************!*\
  !*** ./src/frontend/viewer/Model/Model.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Model": () => (/* binding */ Model)
/* harmony export */ });
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EventEmitter */ "./src/frontend/viewer/EventEmitter.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common */ "./src/frontend/common/index.ts");


class Model extends _EventEmitter__WEBPACK_IMPORTED_MODULE_0__.EventEmitter {
    constructor(data, parent = null) {
        if (!data.name)
            throw new Error(`${data.class} no name`);
        super();
        this.data = data;
        this.parent = parent;
        this.deinited = false;
    }
    init() { }
    deinit() {
        if (this.deinited)
            throw new Error(`${this.getFullName()}: model already deinited`);
        this.deinited = true;
    }
    static getAttr(data, name) {
        return data[name];
    }
    static getCol(data, name) {
        return data[name];
    }
    static getName(data) {
        return Model.getAttr(data, 'name');
    }
    static getClassName(data) {
        return Model.getAttr(data, 'class');
    }
    isAttr(name) {
        // return this.data[name] !== undefined;
        return this.data.hasOwnProperty(name);
    }
    getAttr(name) {
        return this.data[name];
    }
    getCol(name) {
        return this.data[name];
    }
    getClassName() {
        return this.getAttr('class');
    }
    getName() {
        return this.getAttr('name');
    }
    getFullName() {
        if (this.parent) {
            return `${this.parent.getFullName()}.${this.getName()}`;
        }
        return this.getName();
    }
    getCaption() {
        return this.getAttr('caption');
    }
    getDataSource(name) {
        return this.dataSources.find((dataSource) => dataSource.getName() === name);
    }
    createDataSources() {
        for (const data of this.data.dataSources) {
            try {
                const Class = _common__WEBPACK_IMPORTED_MODULE_1__.FrontHostApp.getClassByName(data.class);
                if (!Class)
                    throw new Error(`no ${data.class} class`);
                const dataSource = new Class(data, this);
                dataSource.init();
                this.dataSources.push(dataSource);
            }
            catch (err) {
                err.message = `${this.getFullName()}.${data.name}: ${err.message}`;
                throw err;
            }
        }
    }
    deinitDataSources() {
        for (const dataSource of this.dataSources) {
            dataSource.deinit();
        }
    }
    hasActions() {
        return this.data.actions.length > 0;
    }
    getParent() {
        return this.parent;
    }
    getData() {
        return this.data;
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.Model = Model;
}


/***/ }),

/***/ "./src/frontend/viewer/Model/Page/Page.ts":
/*!************************************************!*\
  !*** ./src/frontend/viewer/Model/Page/Page.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Page": () => (/* binding */ Page)
/* harmony export */ });
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model */ "./src/frontend/viewer/Model/Model.ts");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common */ "./src/frontend/common/index.ts");
/* harmony import */ var _DataSource_DataSource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DataSource/DataSource */ "./src/frontend/viewer/Model/DataSource/DataSource.ts");



class Page extends _Model__WEBPACK_IMPORTED_MODULE_0__.Model {
    constructor(data, parent, options) {
        // console.log('Page.constructor', options);
        // if (!options.id) throw new Error('no page id');
        super(data, parent);
        this.options = options; // {id, modal, newMode, selectMode, params}
        this.dataSources = [];
        this.forms = [];
        this.params = {};
        if (options.onCreate) {
            options.onCreate(this);
        }
    }
    init() {
        this.createDataSources();
        this.createForms();
        console.log('page options:', this.options);
        console.log('page params:', this.getParams());
    }
    deinit() {
        // console.log('Page.deinit', this.getFullName());
        if (this.deinited)
            throw new Error(`page ${this.getFullName()} is already deinited`);
        this.deinitDataSources();
        this.deinitForms();
        super.deinit();
    }
    getOptions() {
        return this.options;
    }
    createForms() {
        // forms
        for (const data of this.data.forms) {
            const FormClass = _common__WEBPACK_IMPORTED_MODULE_1__.FrontHostApp.getClassByName(_Model__WEBPACK_IMPORTED_MODULE_0__.Model.getClassName(data));
            if (!FormClass)
                throw new Error(`no ${_Model__WEBPACK_IMPORTED_MODULE_0__.Model.getClassName(data)} class`);
            const form = new FormClass(data, this);
            form.init();
            this.forms.push(form);
        }
    }
    deinitForms() {
        for (const form of this.forms) {
            form.deinit();
        }
    }
    /*getId() {
        return this.options.id;
    }*/
    getParams() {
        return Object.assign(Object.assign({}, (this.options.params || {})), this.params);
    }
    setParam(name, value) {
        // console.log('Page.setParam', name);
        this.params[name] = value !== undefined ? value : null;
    }
    async update() {
        console.log('Page.update', this.getFullName());
        for (const form of this.forms) {
            if (form.isChanged() || form.hasNew()) {
                await form.update();
            }
        }
    }
    discard() {
        console.log('Page.discard', this.getFullName());
        for (const form of this.forms) {
            form.discard();
        }
    }
    getKey() {
        for (const form of this.forms) {
            if (form.getClassName() === 'RowForm') {
                return form.getKey();
            }
        }
        return null;
    }
    hasRowFormWithDefaultDs() {
        for (const form of this.forms) {
            if (form.getClassName() === 'RowForm' && form.getDefaultDataSource()) {
                return true;
            }
        }
        return false;
    }
    hasRowFormWithDefaultSqlDataSource() {
        for (const form of this.forms) {
            if (form.getClassName() === 'RowForm' && form.hasDefaultPersistentDataSource()) {
                return true;
            }
        }
        return false;
    }
    hasRowForm() {
        for (const form of this.forms) {
            if (form.getClassName() === 'RowForm' && form.getAttr('visible') === 'true') {
                return true;
            }
        }
        return false;
    }
    hasTableForm() {
        for (const form of this.forms) {
            if (form.getClassName() === 'TableForm' && form.getAttr('visible') === 'true') {
                return true;
            }
        }
        return false;
    }
    isNewMode() {
        return !!this.options.newMode;
    }
    hasNew() {
        for (const form of this.forms) {
            if (form.hasNew()) {
                return true;
            }
        }
        return false;
    }
    getApp() {
        return this.parent;
    }
    isModal() {
        return !!this.options.modal;
    }
    onFormInsert(e) {
        console.log('Page.onFormInsert', e);
        for (const key of e.inserts) {
            const keyParams = _DataSource_DataSource__WEBPACK_IMPORTED_MODULE_2__.DataSource.keyToParams(key); // key params to page params
            for (const name in keyParams) {
                this.setParam(name, keyParams[name]);
            }
        }
    }
    async rpc(name, params) {
        // console.log('Page.rpc', this.getFullName(), name, params);
        if (!name)
            throw new Error('no name');
        const result = await this.getApp().request({
            uuid: this.getApp().getAttr('uuid'),
            action: 'rpc',
            page: this.getName(),
            name: name,
            params: params,
        });
        if (result.errorMessage)
            throw new Error(result.errorMessage);
        return result;
    }
    getForm(name) {
        return this.forms.find((form) => form.getName() === name);
    }
    isSelectMode() {
        return !!this.options.selectMode;
    }
    isFormInTab() {
        return this.isAttr('formInTab') && this.getAttr('formInTab') === 'true';
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.Page = Page;
}


/***/ }),

/***/ "./src/frontend/viewer/Model/Table/Table.ts":
/*!**************************************************!*\
  !*** ./src/frontend/viewer/Model/Table/Table.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Table": () => (/* binding */ Table)
/* harmony export */ });
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model */ "./src/frontend/viewer/Model/Model.ts");
/* harmony import */ var _Column_Column__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Column/Column */ "./src/frontend/viewer/Model/Column/Column.ts");


class Table extends _Model__WEBPACK_IMPORTED_MODULE_0__.Model {
    constructor(data, parent) {
        super(data, parent);
        this.columns = [];
    }
    init() {
        // console.log('Table.init', this.getFullName());
        for (const data of this.data.columns) {
            const column = new _Column_Column__WEBPACK_IMPORTED_MODULE_1__.Column(data, this);
            column.init();
            this.addColumn(column);
        }
    }
    addColumn(column) {
        this.columns.push(column);
    }
    getColumn(name) {
        const column = this.columns.find((column) => column.getName() === name);
        if (!column)
            throw new Error(`table ${this.getFullName()}: no column ${name}`);
        return column;
    }
    emitResult(result, source = null) {
        console.log('Table.emitResult');
        return [
            ...(result.insert ? [this.emitInsert(source, result.insert)] : []),
            ...(result.update ? [this.emitUpdate(source, result.update)] : []),
            ...(result.delete ? [this.emitDelete(source, result.delete)] : []),
            ...(result.refresh ? [this.emitRefresh(source)] : []),
        ];
    }
    emitInsert(source, inserts) {
        return this.emit('insert', { source, inserts });
    }
    emitUpdate(source, updates) {
        return this.emit('update', { source, updates });
    }
    emitDelete(source, deletes) {
        return this.emit('delete', { source, deletes });
    }
    emitRefresh(source) {
        return this.emit('refresh', { source });
    }
}
if (typeof window === 'object') {
    // @ts-ignore
    window.Table = Table;
}


/***/ }),

/***/ "./src/frontend/viewer/WebSocketClient.ts":
/*!************************************************!*\
  !*** ./src/frontend/viewer/WebSocketClient.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebSocketClient": () => (/* binding */ WebSocketClient)
/* harmony export */ });
class WebSocketClient {
    constructor(options = {}) {
        // console.log('WebSocketClient.constructor', options);
        this.options = options;
        if (!options.applicationController)
            throw new Error('no options.applicationController');
        if (!options.protocol)
            throw new Error('no options.protocol');
        this.url = `${options.protocol}://${window.location.host}/?${this.createUriParamsString(options)}`;
        this.webSocket = null;
        this.refreshTimeoutId = null;
        this.RECONNECT_TIMEOUT = 10; // sec
        this.REFRESH_TIMEOUT = 60 * 60; // sec
    }
    createUriParamsString(options) {
        const params = {
            route: options.route,
            uuid: options.uuid,
            userId: options.userId,
            version: this.getApp().getModel().getData().versions.app,
        };
        return Object.keys(params)
            .map((key) => `${key}=${encodeURIComponent(params[key])}`)
            .join('&');
    }
    connect() {
        console.log('WebSocketClient.connect', this.url);
        return new Promise((resolve, reject) => {
            this.webSocket = new WebSocket(this.url);
            this.webSocket.onclose = async (e) => {
                this.webSocket = null;
                reject(new Error(`Connection failed ${e.code}`));
            };
            this.webSocket.onopen = (e) => {
                this.webSocket.onclose = this.onClose.bind(this);
                this.webSocket.onmessage = this.onMessage.bind(this);
                this.startRefreshTimeout();
                resolve(e);
            };
        });
    }
    async onRefreshTimeout() {
        // console.log('WebSocketClient.onRefreshTimeout');
        this.refreshTimeoutId = null;
        this.send('ping');
        this.startRefreshTimeout();
    }
    send(data) {
        console.log('WebSocketClient.send', data);
        this.webSocket.send(data);
    }
    startRefreshTimeout() {
        this.refreshTimeoutId = setTimeout(this.onRefreshTimeout.bind(this), this.REFRESH_TIMEOUT * 1000);
    }
    resetRefreshTimeout() {
        if (this.refreshTimeoutId) {
            clearTimeout(this.refreshTimeoutId);
            this.refreshTimeoutId = null;
        }
    }
    async reconnect() {
        console.log('WebSocketClient.reconnect');
        try {
            await this.connect();
        }
        catch (err) {
            console.error(err);
            console.log(`waiting ${this.RECONNECT_TIMEOUT} sec for socket reconnect...`);
            setTimeout(async () => await this.reconnect(), this.RECONNECT_TIMEOUT * 1000);
        }
    }
    async onClose(e) {
        console.error('WebSocketClient.onClose', e);
        this.getApp()
            .getHostApp()
            .logError(new Error(`websocket close ${this.getApp().getModel().getDomain()}/${this.getApp()
            .getModel()
            .getName()}`));
        this.resetRefreshTimeout();
        this.webSocket.onclose = null;
        this.webSocket.onmessage = null;
        this.webSocket = null;
        await this.reconnect();
    }
    async onMessage(e) {
        console.log('WebSocketClient.onMessage', JSON.parse(e.data));
        const packet = JSON.parse(e.data);
        if (packet.type === 'result') {
            this.getApp().getView().disableRerender();
            await this.getApp().getModel().emitResult(packet.data);
            this.getApp().getView().enableRerender();
            this.getApp().getView().rerender();
        }
    }
    getApp() {
        return this.options.applicationController;
    }
}


/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "keyArrayToKey": () => (/* binding */ keyArrayToKey)
/* harmony export */ });
const keyArrayToKey = (keyArray) => {
    return JSON.stringify(keyArray);
};


/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("body-parser");

/***/ }),

/***/ "colors":
/*!*************************!*\
  !*** external "colors" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("colors");

/***/ }),

/***/ "colors/safe":
/*!******************************!*\
  !*** external "colors/safe" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("colors/safe");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("cookie-parser");

/***/ }),

/***/ "ejs":
/*!**********************!*\
  !*** external "ejs" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("ejs");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("express-session");

/***/ }),

/***/ "glob":
/*!***********************!*\
  !*** external "glob" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("glob");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongodb");

/***/ }),

/***/ "mysql":
/*!************************!*\
  !*** external "mysql" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("mysql");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node-fetch");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("pg");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom/server");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "slash":
/*!************************!*\
  !*** external "slash" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("slash");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("uuid");

/***/ }),

/***/ "ws":
/*!*********************!*\
  !*** external "ws" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("ws");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"qforms","version":"0.2.1","description":"A platform for building Web UI for databases.","main":"lib/backend/index.js","dependencies":{"body-parser":"^1.19.1","colors":"^1.4.0","cookie-parser":"^1.4.6","ejs":"~2.5.5","express":"^4.17.2","express-session":"^1.17.2","glob":"^5.0.5","mongodb":"^4.13.0","mysql":"^2.18.1","node-fetch":"^2.6.7","pg":"^8.7.1","react":"^17.0.2","react-dom":"^17.0.2","slash":"^1.0.0","uuid":"^8.3.2","ws":"^2.3.1"},"devDependencies":{"@babel/cli":"^7.16.0","@babel/core":"^7.16.5","@babel/plugin-proposal-class-properties":"^7.16.5","@babel/plugin-transform-react-jsx":"^7.16.5","@babel/preset-react":"^7.18.6","@types/express":"^4.17.14","@types/express-session":"^1.17.6","@types/jest":"^29.4.0","@types/mysql":"^2.15.21","@types/node":"^14.18.34","@types/pg":"^8.6.6","@types/react":"^17.0.52","@types/react-dom":"^17.0.18","@typescript-eslint/eslint-plugin":"^5.45.1","@typescript-eslint/parser":"^5.45.1","babel-loader":"^9.1.0","babel-preset-react-app":"^3.1.2","chai":"^3.2.0","copy-webpack-plugin":"^11.0.0","css-loader":"^6.7.3","del":"^1.2.1","eslint":"^8.29.0","eslint-config-airbnb":"^19.0.4","eslint-config-airbnb-typescript":"^17.0.0","eslint-config-prettier":"^8.6.0","eslint-plugin-import":"^2.26.0","eslint-plugin-jsx-a11y":"^6.6.1","eslint-plugin-prettier":"^4.2.1","eslint-plugin-react":"^7.31.11","eslint-plugin-react-hooks":"^4.6.0","gulp":"^4.0.2","gulp-babel":"^8.0.0","gulp-clean-css":"^4.3.0","gulp-concat":"^2.6.0","gulp-hash-filename":"^3.0.0","gulp-less":"^4.0.1","gulp-minify":"^3.1.0","gulp-sourcemaps":"^3.0.0","gulp-typescript":"^6.0.0-alpha.1","gulp-uglify":"^3.0.2","jest":"^29.4.3","less-loader":"^11.1.0","mini-css-extract-plugin":"^2.7.2","nodemon":"^2.0.20","null-loader":"^4.0.1","prettier":"^2.8.4","should":"^7.0.4","terser-webpack-plugin":"^5.3.6","through":"^2.3.8","ts-jest":"^29.0.5","ts-loader":"^9.3.1","typescript":"^4.9.3","webpack":"^5.74.0","webpack-cli":"^4.10.0","webpack-node-externals":"^3.0.0"},"scripts":{"start":"NODE_ENV=development node dist/lib/backend/start.js","start2":"NODE_ENV=development APPS_DIR_PATH=~/projects/qforms-apps node dist/lib/backend/start.js","start3":"NODE_ENV=development node dist/lib/start.js","nodemon-start":"NODE_ENV=development nodemon --watch dist --watch apps dist/lib/backend/start.js","tsc-build-watch":"tsc --build tsconfig.back.json --watch","webpack-viewer-watch":"NODE_ENV=development webpack --config webpack.config.viewer.js --watch","webpack-editor-watch":"NODE_ENV=development webpack --config webpack.config.editor.js --watch","tsc-build":"tsc --build tsconfig.back.json","webpack-index":"NODE_ENV=development webpack --config webpack.config.index.js","webpack-monitor":"NODE_ENV=development webpack --config webpack.config.monitor.js","webpack-editor":"NODE_ENV=development webpack --config webpack.config.editor.js","webpack-viewer":"NODE_ENV=development webpack --config webpack.config.viewer.js","docker:build":"npx gulp docker-build","docker:run":"npx gulp docker-run","prettier:write":"npx prettier --write \\"src/**/*.{ts,tsx,less}\\"","test":"jest test/jest","webpack-back":"NODE_ENV=development webpack --config ./webpack.config.back.js"},"repository":{"type":"git","url":"https://github.com/alexn1/qforms.git"},"keywords":["web","ui","database"],"author":{"name":"Alexander Nesterenko","email":"alex140@gmail.com","url":"https://github.com/alexn1"},"license":"MIT","bugs":{"url":"https://github.com/alexn1/qforms/issues"},"homepage":"https://github.com/alexn1/qforms"}');

/***/ }),

/***/ "./src/backend/viewer/text/en.json":
/*!*****************************************!*\
  !*** ./src/backend/viewer/text/en.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"login":{"login":"Login","username":"Username","password":"Password","signIn":"Sign in","WrongUsernameOrPassword":"Wrong username or password"},"application":{"logout":"Logout","error":"Error","alert":"Alert","confirm":"Confirm","versionNotification":"New version is available. Please refresh page."},"page":{"create":"Create","cancel":"Cancel","saveAndClose":"Save and close","save":"Save","close":"Close","refresh":"Refresh","discard":"Discard","actions":"Actions","select":"Select","reset":"Reset"},"form":{"refresh":"Refresh","new":"New","delete":"Delete","areYouSure":"Are you sure?","count":"Count","previous":"Previous","next":"Next","edit":"Edit","save":"Save","cancel":"Cancel","discard":"Discard","actions":"Actions","required":"required","phoneNumberFormatError":"phone number format error"},"field":{"selectValue":"select value","fillValue":"fill in this field","timeNotValid":"time not valid","clear":"Clear"},"error":{"notNumber":"not a number","invalidDate":"invalid date"},"confirm":{"yes":"Yes","no":"No"}}');

/***/ }),

/***/ "./src/backend/viewer/text/ru.json":
/*!*****************************************!*\
  !*** ./src/backend/viewer/text/ru.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"login":{"login":"Вход","signIn":"Войти","username":"Логин","password":"Пароль","WrongUsernameOrPassword":"Неверный логин или пароль"},"application":{"logout":"Выйти","error":"Ошибка","alert":"Внимание!","confirm":"Подтверждение","versionNotification":"Доступна новая версия. Пожалуйста обновите страницу."},"page":{"create":"Создать","cancel":"Отмена","saveAndClose":"Сохранить и закрыть","save":"Сохранить","close":"Закрыть","refresh":"Обновить","discard":"Сбросить","actions":"Действия","select":"Выбрать","reset":"Сбросить"},"form":{"refresh":"Обновить","new":"Создать","delete":"Удалить","areYouSure":"Вы уверены?","count":"Количество","previous":"Предыдущая","next":"Следующая","edit":"Редактировать","save":"Сохранить","cancel":"Отменить","discard":"Сбросить","actions":"Действия","required":"обязательно","phoneNumberFormatError":"неверный формат номера"},"field":{"selectValue":"выберите значение","fillValue":"заполните поле","timeNotValid":"ошибка ввода времени","clear":"Очистить"},"error":{"notNumber":"требуется числовое значение","invalidDate":"неверный формат даты"},"confirm":{"yes":"Да","no":"Нет"}}');

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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************************!*\
  !*** ./src/backend/start.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/backend/index.ts");

async function main() {
    // console.log('main');
    const backHostApp = new _index__WEBPACK_IMPORTED_MODULE_0__.BackHostApp(Object.assign(Object.assign({}, _index__WEBPACK_IMPORTED_MODULE_0__.Helper.getCommandLineParams()), { monitor: {
            username: 'admin',
            password: '123qwe',
        } }));
    try {
        const result = await backHostApp.run();
        if (result) {
            process.exit(result);
        }
    }
    catch (err) {
        await backHostApp.logError(err);
    }
}
main();

})();

/******/ })()
;