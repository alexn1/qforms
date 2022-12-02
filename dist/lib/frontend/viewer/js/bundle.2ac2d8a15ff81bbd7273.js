/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/frontend/viewer/Controller/Controller.js":
/*!******************************************************!*\
  !*** ./src/frontend/viewer/Controller/Controller.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Controller": () => (/* binding */ Controller)
/* harmony export */ });
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EventEmitter */ "./src/frontend/viewer/EventEmitter.js");

class Controller extends _EventEmitter__WEBPACK_IMPORTED_MODULE_0__.EventEmitter {
  constructor() {
    super();
    this.view = null;
  }

  onViewCreate = view => {
    // console.log('Controller.onViewCreate');
    this.view = view;
  };

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
    return React.createElement(this.getViewClass(), {
      ctrl: this,
      onCreate: this.onViewCreate
    });
  }

}

/***/ }),

/***/ "./src/frontend/viewer/Controller/LoginController/LoginController.js":
/*!***************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/LoginController/LoginController.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginController": () => (/* binding */ LoginController)
/* harmony export */ });
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Controller */ "./src/frontend/viewer/Controller/Controller.js");
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./View */ "./src/frontend/viewer/Controller/LoginController/View.jsx");


class LoginController extends _Controller__WEBPACK_IMPORTED_MODULE_0__.Controller {
  constructor(frontHostApp) {
    super();
    console.log(`${this.constructor.name}.constructor`);
    this.frontHostApp = frontHostApp;
  }

  static create(frontHostApp) {
    const data = frontHostApp.getData();
    if (!data.name) throw new Error('no app name');
    const CustomClass = FrontHostApp.getClassByName(`${data.name}LoginController`);
    const Class = CustomClass ? CustomClass : LoginController;
    return new Class(frontHostApp);
  }

  getViewClass() {
    return _View__WEBPACK_IMPORTED_MODULE_1__.LoginView;
  }

  getText() {
    return this.frontHostApp.getText();
  }

  getFrontHostApp() {
    return this.frontHostApp;
  }

  getViewClassCssBlockName() {
    return this.getViewClass().name;
  }

}

/***/ }),

/***/ "./src/frontend/viewer/Controller/LoginController/View.jsx":
/*!*****************************************************************!*\
  !*** ./src/frontend/viewer/Controller/LoginController/View.jsx ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginView": () => (/* binding */ LoginView)
/* harmony export */ });
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../View */ "./src/frontend/viewer/Controller/View.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



class LoginView extends _View__WEBPACK_IMPORTED_MODULE_0__.View {
  constructor(props) {
    super(props);
    this.errMsgRef = React.createRef();
  }

  onLoginFormSubmit = e => {
    // console.log('LoginView.onLoginFormSubmit');
    document.querySelector('.LoginView__button').disabled = true; // e.preventDefault();
  };

  renderLogo() {}

  renderTitle() {
    return this.getCtrl().getFrontHostApp().getData().title;
  }

  onChange = e => {
    this.errMsgRef.current.innerHTML = '';
  };

  render() {
    // console.log('LoginView.render');
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: `${this.getCssBlockName()}__container`,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("form", {
        className: `${this.getCssBlockName()}__form`,
        method: 'post',
        onSubmit: this.onLoginFormSubmit,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
          type: 'hidden',
          name: 'tzOffset',
          value: JSON.stringify(new Date().getTimezoneOffset())
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
          type: 'hidden',
          name: 'action',
          value: 'login'
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: `${this.getCssBlockName()}__logo-title`,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
            className: `${this.getCssBlockName()}__logo`,
            children: this.renderLogo()
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
            className: `${this.getCssBlockName()}__title`,
            children: this.renderTitle()
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TextBox, {
          classList: [`${this.getCssBlockName()}__field`],
          name: 'username',
          placeholder: this.getCtrl().getText().login.username,
          required: true,
          autoFocus: true,
          spellCheck: false,
          value: this.getCtrl().getFrontHostApp().getData().username || '',
          onChange: this.onChange
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Password, {
          classList: [`${this.getCssBlockName()}__field2`],
          name: 'password',
          placeholder: this.getCtrl().getText().login.password,
          value: this.getCtrl().getFrontHostApp().getData().password || '',
          onChange: this.onChange
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
          className: `${this.getCssBlockName()}__err-msg`,
          ref: this.errMsgRef,
          children: this.getCtrl().getFrontHostApp().getData().errMsg
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
          className: `${this.getCssBlockName()}__button`,
          type: 'submit',
          children: this.getCtrl().getText().login.signIn
        })]
      })
    });
  }

}

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/ApplicationController/ApplicationController.js":
/*!*******************************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/ApplicationController/ApplicationController.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApplicationController": () => (/* binding */ ApplicationController)
/* harmony export */ });
/* harmony import */ var _ModelController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ModelController */ "./src/frontend/viewer/Controller/ModelController/ModelController.js");
/* harmony import */ var _Model_Page_Page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Model/Page/Page */ "./src/frontend/viewer/Model/Page/Page.js");
/* harmony import */ var _ApplicationView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ApplicationView */ "./src/frontend/viewer/Controller/ModelController/ApplicationController/ApplicationView.jsx");



class ApplicationController extends _ModelController__WEBPACK_IMPORTED_MODULE_0__.ModelController {
  constructor(model, frontHostApp) {
    // console.log('ApplicationController.constructor', model, view);
    super(model, null);
    this.frontHostApp = frontHostApp;
    this.lastId = 0;
    this.activePage = null; // active non modal page

    this.modals = [];
    this.statusbar = null;
    this.homePageName = null;
    this.webSocketClient = null;
  }

  static create(model, frontHostApp) {
    // console.log('ApplicationController.create', 'debug:', ApplicationController.isDebugMode());
    const CustomClass = FrontHostApp.getClassByName(`${model.getName()}ApplicationController`);
    const Class = CustomClass ? CustomClass : ApplicationController;
    return new Class(model, frontHostApp);
  }

  static isDebugMode() {
    return Search.getObj()['debug'] === '1';
  }

  init() {
    // console.log('ApplicationController.init');
    super.init(); // this.model.on('logout' , this.onLogout);

    this.model.on('request', this.onRequest);
    const pageData = this.model.data.pages[0];
    this.activePage = pageData ? this.createPage(pageData, {
      modal: false,
      params: this.getGlobalParams()
    }) : null;
    document.title = this.getTitle();
    document.documentElement.classList.add(Helper.inIframe() ? 'iframe' : 'not-iframe');
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
    this.view = Helper.createReactComponent(rootElement, this.getViewClass(), {
      ctrl: this
    });

    if (this.statusbar) {
      this.statusbar.setLastQueryTime(this.model.getAttr('time'));
    }
  }

  onRequest = async e => {
    console.log('onRequest', e);

    if (this.statusbar) {
      this.statusbar.setLastQueryTime(e.time);
    } // console.log('e.remoteAppVersion', e.remoteAppVersion);
    // console.log('this.getModel().getData().versions.app', this.getModel().getData().versions.app);


    if (this.getModel().getData().versions.app && this.getModel().getData().versions.app !== e.remoteAppVersion) {
      this.createVersionNotificationIfNotExists();
    }
  };

  createVersionNotificationIfNotExists() {
    // console.log('ApplicationController.createVersionNotificationIfNotExists');
    if (!document.querySelector('.version-notification')) {
      const div = document.createElement('div');
      div.innerHTML = this.getModel().getText().application.versionNotification;
      div.className = 'version-notification';
      document.querySelector(`.${this.getView().getCssBlockName()}__body`).append(div);
    } else {// console.log(`version notification already exists`);
    }
  }

  getGlobalParams() {
    return {// foo: 'bar'
    };
  } // options
  // - modal      : boolean,
  // - newMode    : boolean,
  // - selectMode : boolean,
  // - selectedKey: string,
  // - onCreate   : function,
  // - onSelect   : function,
  // - onClose    : function,
  // - params     : object,


  createPage(pageData, options) {
    if (options.modal === undefined) throw new Error('no options.modal'); // model

    const pageModel = new _Model_Page_Page__WEBPACK_IMPORTED_MODULE_1__.Page(pageData, this.model, options);
    pageModel.init(); // controller

    const pc = PageController.create(pageModel, this, `c${this.getNextId()}`);
    pc.init();
    return pc;
  }

  async openPage(options) {
    console.log('ApplicationController.openPage', options);
    if (!options.name) throw new Error('no name');
    if (options.key) throw new Error('openPage: key param is deprecated'); // if this page with this key is already opened, then show it

    const pageController = this.findPageControllerByPageNameAndKey(options.name, null); // console.log('pageController:', pageController);

    if (pageController) {
      this.onPageSelect(pageController);
      return pageController;
    }

    const {
      page: pageData
    } = await this.model.request({
      action: 'page',
      page: options.name,
      newMode: !!options.newMode,
      params: options.params || {}
    }); // modal by default

    if (options.modal === undefined) {
      options.modal = true;
    }

    if (!options.onClose) {
      const activeElement = document.activeElement;

      options.onClose = () => {
        if (activeElement) activeElement.focus();
      };
    }

    const pc = this.createPage(pageData, options); // console.log('pc:', pc);
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
    if (i === -1) throw new Error(`cannot find modal: ${ctrl.getId()}`);
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
    if (this.activePage && this.activePage.model.getName() === pageName && this.activePage.model.getKey() === key) {
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
    } else if (this.activePage === pageController) {
      this.activePage = null;
      document.title = '';
    } else {
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
    return [// pages & actions
    ...(this.model.data.menu ? Object.keys(this.model.data.menu).map(key => ({
      name: key,
      title: key,
      items: this.model.data.menu[key].map(item => ({
        type: item.type,
        name: item.page || item.action,
        title: item.caption
      }))
    })) : []), // user
    ...(this.model.getUser() ? [{
      name: 'user',
      title: `${this.model.getDomain()}/${this.model.getUser().login}`,
      items: [{
        type: 'custom',
        name: 'logout',
        title: 'Logout'
      }]
    }] : [])];
  }

  onStatusbarCreate = statusbar => {
    this.statusbar = statusbar;
  };
  onLogout = async () => {
    console.log('ApplicationController.onLogout');
    const result = await this.model.request({
      action: 'logout'
    });
    location.href = this.getRootPath();
  };
  onMenuItemClick = async (menu, type, name) => {
    console.log('ApplicationController.onMenuItemClick', menu, type, name);

    if (type === 'page') {
      await this.openPage({
        name: name,
        modal: false
      });
      history.pushState({
        pageName: name
      }, '', PageController.createLink({
        page: name
      }));
    } else if (type === 'action') {
      try {
        const result = await this.onActionClick(name);

        if (!result) {
          throw new Error(`no handler for action '${name}'`);
        }
      } catch (err) {
        console.error(err);
        await this.alert({
          message: err.message
        });
      }
    } else if (type === 'custom' && name === 'logout') {
      await this.onLogout();
    } else {
      throw new Error(`unknown menu type/name: ${type}/${name}`);
    }
  };
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
      modal: false
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
    if (this.activePage) this.activePage.invalidate();
    this.modals.filter(ctrl => ctrl instanceof PageController).forEach(page => page.invalidate());
  }

  async alert(options) {
    if (!options.title) {
      options.title = this.getModel().getText().application.alert;
    }

    const activeElement = document.activeElement;

    try {
      return await this.frontHostApp.alert(options);
    } finally {
      if (activeElement) activeElement.focus();
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
    } finally {
      if (activeElement) activeElement.focus();
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
    this.webSocketClient = new WebSocketClient({
      applicationController: this,
      protocol: data.nodeEnv === 'development' ? 'ws' : 'wss',
      route: data.route,
      uuid: data.uuid,
      userId: data.user ? data.user.id : null
    });
    await this.webSocketClient.connect();
  }

  async rpc(name, params) {
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
window.ApplicationController = ApplicationController;

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/ApplicationController/ApplicationView.jsx":
/*!**************************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/ApplicationController/ApplicationView.jsx ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApplicationView": () => (/* binding */ ApplicationView),
/* harmony export */   "ModelView": () => (/* reexport safe */ _ModelView__WEBPACK_IMPORTED_MODULE_1__.ModelView)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _ModelView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ModelView */ "./src/frontend/viewer/Controller/ModelController/ModelView.jsx");



class ApplicationView extends ModelView {
  renderActivePage() {
    const ctrl = this.props.ctrl;

    if (ctrl.activePage) {
      return this.renderView(ctrl.activePage);
    }
  }

  renderView(ctrl, props = {}) {
    return React.createElement(ctrl.getViewClass(), {
      parent: this,
      ctrl: ctrl,
      onCreate: ctrl.onViewCreate,
      ...props
    });
  }

  renderModals() {
    return this.props.ctrl.modals.map(ctrl => {
      if (ctrl instanceof PageController) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Modal, {
          children: this.renderView(ctrl)
        }, ctrl.getId());
      }

      return this.renderView(ctrl, {
        key: ctrl.getId()
      });
    });
  }

  renderHeader() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("header", {
      className: `${this.getCssBlockName()}__header`,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Menu, {
        items: this.getCtrl().getMenuItemsProp(),
        onClick: this.getCtrl().onMenuItemClick
      })
    });
  }

  renderMain() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("main", {
      className: `${this.getCssBlockName()}__main`,
      children: this.renderActivePage()
    });
  }

  renderFooter() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("footer", {
      className: `${this.getCssBlockName()}__footer`,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Statusbar, {
        onCreate: this.getCtrl().onStatusbarCreate
      })
    });
  }

  render() {
    console.log(`${this.constructor.name}.render`, this.props.ctrl.model.getFullName());
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: `${this.getCssBlockName()}__container`,
      style: this.getStyle(),
      children: [this.renderHeader(), this.renderMain(), this.renderFooter(), this.renderModals()]
    });
  }

}
window.ApplicationView = ApplicationView;

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FieldController/FieldController.js":
/*!*******************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FieldController/FieldController.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FieldController": () => (/* binding */ FieldController)
/* harmony export */ });
/* harmony import */ var _ModelController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ModelController */ "./src/frontend/viewer/Controller/ModelController/ModelController.js");

class FieldController extends _ModelController__WEBPACK_IMPORTED_MODULE_0__.ModelController {
  /*constructor(model, parent) {
      super(model, parent);
  }*/
  static create(model, parent) {
    // console.log('FieldController.create', model.getFullName(), parent.model.getClassName());
    const page = model.getPage();
    const form = model.getForm();
    const CustomClass = FrontHostApp.getClassByName(`${page.getName()}${form.getName()}${model.getName()}FieldController`);
    const generalClassName = `${parent.model.getClassName()}${model.getClassName()}Controller`;
    const GeneralClass = FrontHostApp.getClassByName(generalClassName);
    if (!GeneralClass) throw new Error(`no class ${generalClassName}`);
    const Class = CustomClass ? CustomClass : GeneralClass;
    return new Class(model, parent);
  }

  valueToString(value) {
    // console.log('Field.valueToString', this.model.getFullName(), typeof value, value);
    switch (typeof value) {
      case 'string':
        return value;

      case 'object':
        if (value === null) return '';
        if (value instanceof Date) return value.toISOString();
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
    const fieldType = this.model.getType(); // console.log('fieldType:', fieldType);

    if (stringValue.trim() === '') return null;

    if (fieldType === 'object' || fieldType === 'boolean') {
      return JSON.parse(stringValue);
    } else if (fieldType === 'date') {
      const date = new Date(stringValue);
      if (date.toString() === 'Invalid Date') throw new Error(`${this.getApp().getModel().getText().error.invalidDate}: ${stringValue}`);
      return date;
    } else if (fieldType === 'number') {
      const num = Number(stringValue);
      if (isNaN(num)) throw new Error(this.getApp().getModel().getText().error.notNumber);
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
window.FieldController = FieldController;

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FieldController/FieldView.jsx":
/*!**************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FieldController/FieldView.jsx ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FieldView": () => (/* binding */ FieldView)
/* harmony export */ });
class FieldView extends ModelView {
  getStyle(row) {
    return this.getCtrl().getViewStyle(row);
  }

}

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormComboBoxFieldController/RowFormComboBoxFieldController.js":
/*!****************************************************************************************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormComboBoxFieldController/RowFormComboBoxFieldController.js ***!
  \****************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RowFormComboBoxFieldController": () => (/* binding */ RowFormComboBoxFieldController)
/* harmony export */ });
/* harmony import */ var _RowFormFieldController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../RowFormFieldController */ "./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormFieldController.js");
/* harmony import */ var _RowFormComboBoxFieldView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RowFormComboBoxFieldView */ "./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormComboBoxFieldController/RowFormComboBoxFieldView.jsx");


class RowFormComboBoxFieldController extends _RowFormFieldController__WEBPACK_IMPORTED_MODULE_0__.RowFormFieldController {
  init() {
    // console.log('RowFormComboBoxFieldController.init', this.getModel().getFullName());
    super.init();
    const dataSource = this.model.getComboBoxDataSource();
    dataSource.on('insert', this.onListInsert);
    dataSource.on('update', this.onListUpdate);
    dataSource.on('delete', this.onListDelete);
  }

  deinit() {
    const dataSource = this.model.getComboBoxDataSource();
    dataSource.off('insert', this.onListInsert);
    dataSource.off('update', this.onListUpdate);
    dataSource.off('delete', this.onListDelete);
    super.deinit();
  }

  getViewClass() {
    return super.getViewClass() || _RowFormComboBoxFieldView__WEBPACK_IMPORTED_MODULE_1__.RowFormComboBoxFieldView;
  }

  getItems() {
    try {
      return this.getRows().map(row => ({
        value: this.valueToString(this.getModel().getValueValue(row)),
        title: this.getModel().getDisplayValue(row)
      }));
    } catch (err) {
      err.message = `${this.getModel().getFullName()}: ${err.message}`;
      throw err;
    }
  }

  getRows() {
    return this.model.getComboBoxDataSource().getRows();
  }

  getPlaceholder() {
    if (this.model.getAttr('placeholder')) return this.model.getAttr('placeholder');
    return ApplicationController.isDebugMode() ? '[null]' : null;
  }

  onEditButtonClick = async e => {
    console.log('RowFormComboBoxFieldController.onEditButtonClick');
    const itemEditPage = this.getModel().getAttr('itemEditPage');
    const value = this.getValue(); // console.log('itemEditPage', itemEditPage);
    // console.log('value:', value);

    if (itemEditPage && value) {
      await this.openPage({
        name: itemEditPage,
        params: {
          key: value
        }
      });
    }
  };
  onCreateButtonClick = async e => {
    console.log('RowFormComboBoxFieldController.onCreateButtonClick');
    const newRowMode = this.getModel().getAttr('newRowMode');
    const itemCreateForm = this.getModel().getAttr('itemCreateForm');
    if (!itemCreateForm) throw new Error('no itemCreateForm');
    let createPageName;

    if (newRowMode === 'editPage') {
      createPageName = this.getModel().getAttr('itemEditPage');
    } else if (newRowMode === 'createPage') {
      createPageName = this.getModel().getAttr('itemCreatePage');
    } else {
      throw new Error(`wrong newRowMode value: ${newRowMode}`);
    } // page


    const pc = await this.openPage({
      name: createPageName,
      newMode: true
    }); // form

    const form = pc.getModel().getForm(itemCreateForm);

    const onInsert = async e => {
      form.off('insert', onInsert);
      const [key] = e.inserts;
      const [id] = Helper.decodeValue(key); // console.log('id:', id);

      await this.onChange(id.toString());
    };

    form.on('insert', onInsert);
  };
  onListInsert = async e => {
    console.log('RowFormComboBoxFieldController.onListInsert');
    await this.rerender();
  };
  onListUpdate = async e => {
    // console.log('RowFormComboBoxFieldController.onListUpdate');
    await this.rerender();
  };
  onListDelete = async e => {
    await this.rerender();
  };
  onItemSelect = async e => {
    // console.log('RowFormComboBoxFieldController.onItemSelect');
    if (e.button === 0) {
      e.preventDefault();
      const id = this.getValue();
      const selectedKey = id ? JSON.stringify([id]) : null;
      await this.openPage({
        name: this.getModel().getAttr('itemSelectPage'),
        selectMode: true,
        selectedKey: selectedKey,
        onSelect: async key => {
          if (key) {
            const [id] = Helper.decodeValue(key); // console.log('id:', id);

            if (this.getValue() !== id) {
              await this.getView().onChange(id.toString());
            }
          } else {
            if (this.getValue() !== null) {
              await this.getView().onChange('');
            }
          }
        }
      });
    }
  };
}
window.RowFormComboBoxFieldController = RowFormComboBoxFieldController;

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormComboBoxFieldController/RowFormComboBoxFieldView.jsx":
/*!***********************************************************************************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormComboBoxFieldController/RowFormComboBoxFieldView.jsx ***!
  \***********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RowFormComboBoxFieldView": () => (/* binding */ RowFormComboBoxFieldView)
/* harmony export */ });
/* harmony import */ var _RowFormFieldView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../RowFormFieldView */ "./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormFieldView.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



class RowFormComboBoxFieldView extends _RowFormFieldView__WEBPACK_IMPORTED_MODULE_0__.RowFormFieldView {
  onChange = async widgetValue => {
    // console.log('RowFormComboBoxFieldView.onChange', widgetValue);
    this.rerender();
    await this.props.ctrl.onChange(widgetValue);
  };

  isCreateButtonVisible() {
    if (this.getCtrl().getForm().getMode() !== 'edit') {
      return false;
    }

    if (this.getCtrl().getModel().getAttr('newRowMode') === 'disabled') {
      return false;
    }

    if (this.getCtrl().getModel().getAttr('newRowMode') === 'editPage') {
      return !!this.getCtrl().getModel().getAttr('itemEditPage') && !!this.getCtrl().getModel().getAttr('itemCreateForm');
    }

    if (this.getCtrl().getModel().getAttr('newRowMode') === 'createPage') {
      return !!this.getCtrl().getModel().getAttr('itemCreatePage') && !!this.getCtrl().getModel().getAttr('itemCreateForm');
    }
  }

  renderSelect() {
    const ctrl = this.getCtrl();
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Select, {
      classList: [`${this.getCssBlockName()}__select`],
      onCreate: this.onWidgetCreate // nullable={ctrl.getModel().isNullable()}
      ,
      value: ctrl.getValueForWidget(),
      readOnly: !ctrl.isEditable(),
      onChange: this.onChange,
      items: ctrl.getItems(),
      placeholder: ctrl.getPlaceholder(),
      onMouseDown: ctrl.getModel().getAttr('itemSelectPage') ? ctrl.onItemSelect : null
    });
  }

  renderEditButton() {
    const ctrl = this.getCtrl();
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Button, {
      classList: [`${this.getCssBlockName()}__edit-button`],
      onClick: ctrl.onEditButtonClick,
      enabled: !!ctrl.getValue(),
      children: "..."
    });
  }

  renderCreateButton() {
    const ctrl = this.getCtrl();
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Button, {
      classList: [`${this.getCssBlockName()}__create-button`],
      onClick: ctrl.onCreateButtonClick,
      children: "+"
    });
  }

  render() {
    // console.log('RowFormComboBoxFieldView.render', this.props.ctrl.getItems(), this.props.ctrl.getValue());
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: this.getCssClassNames(),
      children: [this.renderSelect(), this.getCtrl().getModel().getAttr('itemEditPage') && !!this.getCtrl().getValue() && this.renderEditButton(), this.isCreateButtonVisible() && this.renderCreateButton()]
    });
  }

}
window.RowFormComboBoxFieldView = RowFormComboBoxFieldView;

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormDateFieldController/RowFormDateFieldController.js":
/*!********************************************************************************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormDateFieldController/RowFormDateFieldController.js ***!
  \********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RowFormDateFieldController": () => (/* binding */ RowFormDateFieldController)
/* harmony export */ });
/* harmony import */ var _RowFormFieldController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../RowFormFieldController */ "./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormFieldController.js");
/* harmony import */ var _RowFormDateFieldView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RowFormDateFieldView */ "./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormDateFieldController/RowFormDateFieldView.jsx");


class RowFormDateFieldController extends _RowFormFieldController__WEBPACK_IMPORTED_MODULE_0__.RowFormFieldController {
  getViewClass() {
    return super.getViewClass() || _RowFormDateFieldView__WEBPACK_IMPORTED_MODULE_1__.RowFormDateFieldView;
  }

  getValueForWidget() {
    return this.getValue();
  }

  setValueFromWidget(widgetValue) {
    this.setValue(widgetValue);
  }

}
window.RowFormDateFieldController = RowFormDateFieldController;

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormDateFieldController/RowFormDateFieldView.jsx":
/*!***************************************************************************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormDateFieldController/RowFormDateFieldView.jsx ***!
  \***************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RowFormDateFieldView": () => (/* binding */ RowFormDateFieldView),
/* harmony export */   "RowFormFieldView": () => (/* reexport safe */ _RowFormFieldView__WEBPACK_IMPORTED_MODULE_1__.RowFormFieldView)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _RowFormFieldView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../RowFormFieldView */ "./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormFieldView.jsx");


class RowFormDateFieldView extends RowFormFieldView {
  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: this.getCssClassNames(),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DropdownDatePicker, {
        classList: [`${this.getCssBlockName()}__date-picker`],
        onCreate: this.onWidgetCreate,
        value: ctrl.getValueForWidget(),
        readOnly: !ctrl.isEditable(),
        onChange: ctrl.onChange,
        placeholder: ctrl.getPlaceholder(),
        format: ctrl.getFormat(),
        oldDates: this.props.oldDates // getMinDate={this.props.getMinDate}
        ,
        minDate: this.props.minDate
      })
    });
  }

}
window.RowFormDateFieldView = RowFormDateFieldView;

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormFieldController.js":
/*!*************************************************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormFieldController.js ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RowFormFieldController": () => (/* binding */ RowFormFieldController)
/* harmony export */ });
/* harmony import */ var _FieldController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FieldController */ "./src/frontend/viewer/Controller/ModelController/FieldController/FieldController.js");

class RowFormFieldController extends _FieldController__WEBPACK_IMPORTED_MODULE_0__.FieldController {
  constructor(model, parent) {
    super(model, parent);
    this.state = {
      value: null,
      parseError: null,
      error: null,
      changed: false
    };
  }

  init() {
    const row = this.getRow();
    const value = this.model.getValue(row);
    this.setValue(value); // console.log(this.model.getFullName(), value);
  }

  refill() {
    // console.log('RowFormFieldController.refill', this.model.getFullName());
    if (!this.view) return;
    const value = this.model.getValue(this.getRow());
    this.setValue(value);
    this.resetErrors();
    this.refreshChangedState();
  }

  getRow() {
    return this.model.getForm().getRow();
  }

  copyValueToModel() {
    // console.log('RowFormFieldController.copyValueToModel', this.model.getFullName());
    this.getModel().setValue(this.getRow(), this.getValue());
  }
  /*_onChange(widgetValue) {
   }*/


  putValue(widgetValue) {
    // console.log('RowFormFieldController.putValue', widgetValue);
    this.onChange(widgetValue, false);
  }

  onChange = async (widgetValue, fireEvent = true) => {
    console.log('RowFormFieldController.onChange', JSON.stringify(typeof widgetValue === 'string' ? widgetValue.substring(0, 100) : widgetValue)); // this._onChange(widgetValue);

    this.resetErrors();
    this.rerender(); // get value from widget

    try {
      this.setValueFromWidget(widgetValue);
    } catch (err) {
      console.error(`${this.model.getFullName()}: cannot parse view value: ${err.message}`);
      this.state.parseError = err.message;
    } // validate


    if (!this.state.parseError && this.isValidateOnChange()) {
      this.validate();

      if (this.isValid()) {
        this.copyValueToModel();
      }
    } // changed


    this.refreshChangedState(); // event

    if (fireEvent) {
      try {
        this.emit('change', {
          value: widgetValue
        });
      } catch (err) {
        console.error('unhandled change event error:', this.model.getFullName(), err);
      }

      this.parent.onFieldChange({
        source: this
      });
    }
  };
  onBlur = (widgetValue, fireEvent = true) => {
    console.log('RowFormFieldController.onBlur', this.model.getFullName(), JSON.stringify(widgetValue));
    if (!this.isEditable()) return; // this.resetErrors();

    this.rerender(); // to clear field focus class

    if (!this.isValidateOnBlur()) return; // get value from widget

    try {
      this.setValueFromWidget(widgetValue);
    } catch (err) {
      console.error(`${this.model.getFullName()}: cannot parse view value: ${err.message}`);
      this.state.parseError = err.message;
    } // validate


    if (!this.state.parseError && this.isValidateOnBlur()) {
      this.validate();

      if (this.isValid()) {
        this.copyValueToModel();
      }
    } // changed


    this.refreshChangedState(); // event

    if (fireEvent) {
      try {
        this.emit('change', {
          value: widgetValue
        });
      } catch (err) {
        console.error('unhandled change event error:', this.model.getFullName(), err);
      }

      this.parent.onFieldChange({
        source: this
      });
    }
  };

  getValueForWidget() {
    const value = this.getValue(); // console.log('value:', this.model.getFullName(), value, typeof value);

    return this.valueToString(value);
  }

  setValueFromWidget(widgetValue) {
    // console.log('RowFormFieldController.setValueFromWidget', this.model.getFullName(), typeof widgetValue, widgetValue);
    if (typeof widgetValue !== 'string') throw new Error(`${this.model.getFullName()}: widgetValue must be string, but got ${typeof widgetValue}`);
    const value = this.stringToValue(widgetValue); // console.log('value:', value);

    this.setValue(value);
  }

  setValue(value) {
    // console.log('RowFormFieldController.setValue', this.model.getFullName(), value);
    this.state.value = value;
  }

  getValue() {
    return this.state.value;
  }

  isChanged() {
    // console.log('RowFormFieldController.isChanged', this.model.getFullName(), this.state);
    return this.state.changed;
  }

  isValid() {
    return this.state.parseError === null && this.state.error === null;
  }

  validate() {
    // console.log('RowFormFieldController.validate', this.model.getFullName());
    if (this.isVisible()) {
      this.state.error = this.getError();
    }
  }

  refreshChangedState() {
    this.state.changed = this.calcChangedState(this.getRow());
  }

  getPlaceholder() {
    // console.log('RowFormFieldController.getPlaceholder', this.model.getFullName(), this.model.getAttr('placeholder'));
    if (this.model.getAttr('placeholder')) return this.model.getAttr('placeholder');

    if (ApplicationController.isDebugMode()) {
      const value = this.getValue();
      if (value === undefined) return 'undefined';
      if (value === null) return 'null';
      if (value === '') return 'empty string';
    }
  }

  getError() {
    // console.log('RowFormFieldController.getError', this.model.getFullName());
    // parse validator
    if (this.view && this.view.getWidget()) {
      try {
        const widgetValue = this.view.getWidget().getValue();
      } catch (err) {
        return `can't parse value: ${err.message}`;
      }
    } // null validator


    const value = this.getValue();

    if (this.getModel().isNotNull() && (value === null || value === undefined)) {
      return this.getNullErrorText();
    }

    return null;
  }

  getNullErrorText() {
    return this.getModel().getApp().getText().form.required;
  }

  isEditable() {
    return this.parent.getMode() === 'edit' && !this.model.isReadOnly();
  }

  isParseError() {
    return this.state.parseError !== null;
  }

  calcChangedState(row) {
    // console.log('RowFormFieldController.calcChangedState', this.model.getFullName());
    if (!row) throw new Error('FieldController: no row');

    if (this.isParseError()) {
      console.log(`FIELD CHANGED ${this.model.getFullName()}: parse error: ${this.getErrorMessage()}`);
      return true;
    }

    if (!this.isValid()) {
      console.log(`FIELD CHANGED ${this.model.getFullName()}: not valid: ${this.getErrorMessage()}`);
      return true;
    }

    if (this.model.hasColumn()) {
      const fieldRawValue = this.model.valueToRaw(this.getValue());
      const dsRawValue = this.model.getRawValue(row);

      if (fieldRawValue !== dsRawValue) {
        console.log(`FIELD CHANGED ${this.model.getFullName()}`, JSON.stringify(dsRawValue), JSON.stringify(fieldRawValue));
        return true;
      }

      if (this.model.isChanged(row)) {
        let original = row[this.model.getAttr('column')];
        let modified = this.model.getDefaultDataSource().getRowWithChanges(row)[this.model.getAttr('column')];
        if (original) original = original.substr(0, 100);
        if (modified) modified = modified.substr(0, 100);
        console.log(`MODEL CHANGED ${this.model.getFullName()}:`, original, modified);
        return true;
      }
    }

    return false;
  }

  setError(error) {
    this.state.error = error;
  }

  resetErrors() {
    this.setError(null);
    this.state.parseError = null;
  }

  getErrorMessage() {
    if (this.state.parseError) {
      return this.state.parseError;
    }

    return this.state.error;
  }

  renderView() {
    return React.createElement(this.getViewClass(), {
      onCreate: this.onViewCreate,
      ctrl: this
    });
  }

  isValidateOnChange() {
    return this.getModel().validateOnChange();
  }

  isValidateOnBlur() {
    return this.getModel().validateOnBlur();
  }

  onChangePure = async (value, fireEvent = true) => {
    console.log('RowFormFieldController.onChangePure', JSON.stringify(value)); // value

    this.setValue(value);
    this.resetErrors();
    this.rerender(); // validate

    if (this.isValidateOnChange()) {
      this.validate();

      if (this.isValid()) {
        this.copyValueToModel();
      }
    } // changed


    this.refreshChangedState(); // event

    if (fireEvent) {
      try {
        this.emit('change', {
          value
        });
      } catch (err) {
        console.error('unhandled change event error:', this.getModel().getFullName(), err);
      }

      this.parent.onFieldChange({
        source: this
      });
    }
  };
}
window.RowFormFieldController = RowFormFieldController;

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormFieldView.jsx":
/*!********************************************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormFieldView.jsx ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RowFormFieldView": () => (/* binding */ RowFormFieldView)
/* harmony export */ });
/* harmony import */ var _FieldView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FieldView */ "./src/frontend/viewer/Controller/ModelController/FieldController/FieldView.jsx");

class RowFormFieldView extends _FieldView__WEBPACK_IMPORTED_MODULE_0__.FieldView {
  constructor(props) {
    super(props);
    this.widget = null;
  }

  getWidget() {
    return this.widget;
  }

  getClassList() {
    const ctrl = this.getCtrl();
    return [...super.getClassList(), ...(ctrl.isEditable() ? ['editable'] : []), ...(ctrl.isChanged() ? ['changed'] : []), ...(ctrl.getErrorMessage() !== null ? ['error'] : [])];
  }

  onWidgetCreate = widget => {
    this.widget = widget;
  };
}
window.RowFormFieldView = RowFormFieldView;

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormTextBoxFieldController/RowFormTextBoxFieldController.js":
/*!**************************************************************************************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormTextBoxFieldController/RowFormTextBoxFieldController.js ***!
  \**************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RowFormTextBoxFieldController": () => (/* binding */ RowFormTextBoxFieldController)
/* harmony export */ });
/* harmony import */ var _RowFormFieldController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../RowFormFieldController */ "./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormFieldController.js");
/* harmony import */ var _RowFormTextBoxFieldView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RowFormTextBoxFieldView */ "./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormTextBoxFieldController/RowFormTextBoxFieldView.jsx");


class RowFormTextBoxFieldController extends _RowFormFieldController__WEBPACK_IMPORTED_MODULE_0__.RowFormFieldController {
  getViewClass() {
    return super.getViewClass() || _RowFormTextBoxFieldView__WEBPACK_IMPORTED_MODULE_1__.RowFormTextBoxFieldView;
  }

}
window.RowFormTextBoxFieldController = RowFormTextBoxFieldController;

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormTextBoxFieldController/RowFormTextBoxFieldView.jsx":
/*!*********************************************************************************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormTextBoxFieldController/RowFormTextBoxFieldView.jsx ***!
  \*********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RowFormTextBoxFieldView": () => (/* binding */ RowFormTextBoxFieldView)
/* harmony export */ });
/* harmony import */ var _RowFormFieldView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../RowFormFieldView */ "./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormFieldView.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



class RowFormTextBoxFieldView extends _RowFormFieldView__WEBPACK_IMPORTED_MODULE_0__.RowFormFieldView {
  constructor(props) {
    super(props);
    this.state = {
      classList: []
    };
  }

  onClear = async e => {
    this.getCtrl().onChange('');
    setTimeout(() => {
      this.getWidget().getElement().focus();
    }, 0);
  };

  isCloseVisible() {
    // console.log('RowFormTextBoxFieldView.isCloseVisible', this.props.value);
    const ctrl = this.getCtrl();
    if (!ctrl.isEditable()) return false;
    return ctrl.getValueForWidget() !== '';
  }

  onFocus = async e => {
    // console.log('RowFormTextBoxFieldView.onFocus');
    this.addCssClass('focus');
    await this.rerender();
  };
  onBlur = async e => {
    // console.log('RowFormTextBoxFieldView.onBlur');
    const value = e.target.value;
    this.removeCssClass('focus');
    this.getCtrl().onBlur(value);
  };

  renderTextBox() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TextBox, {
      classList: [`${this.getCssBlockName()}__input`],
      value: ctrl.getValueForWidget(),
      readOnly: !ctrl.isEditable(),
      enabled: ctrl.isEditable(),
      autoFocus: ctrl.isAutoFocus(),
      placeholder: ctrl.getPlaceholder() || null,
      autocomplete: ctrl.getAutocomplete(),
      onCreate: this.onWidgetCreate,
      onChange: ctrl.onChange,
      onFocus: this.onFocus,
      onBlur: this.onBlur
    });
  }

  renderCloseIcon() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: `${this.getCssBlockName()}__close ${this.isCloseVisible() ? 'visible' : ''}`,
      onMouseDown: this.onClear,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CloseIcon, {})
    });
  }

  render() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: this.getCssClassNames(),
      children: [this.renderTextBox(), this.renderCloseIcon()]
    });
  }

}
window.RowFormTextBoxFieldView = RowFormTextBoxFieldView;

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FieldController/TableFormFieldController/TableFormDateFieldController/TableFormDateFieldController.js":
/*!**************************************************************************************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FieldController/TableFormFieldController/TableFormDateFieldController/TableFormDateFieldController.js ***!
  \**************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TableFormDateFieldController": () => (/* binding */ TableFormDateFieldController)
/* harmony export */ });
class TableFormDateFieldController extends TableFormFieldController {
  getViewClass() {
    return super.getViewClass() || TableFormDateFieldView;
  }

  getValueForWidget(row) {
    const value = this.model.getValue(row);
    if (value) return Helper.formatDate(value, this.getFormat() || '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}');
    return '';
  }

}
window.TableFormDateFieldController = TableFormDateFieldController;

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FieldController/TableFormFieldController/TableFormFieldController.js":
/*!*****************************************************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FieldController/TableFormFieldController/TableFormFieldController.js ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TableFormFieldController": () => (/* binding */ TableFormFieldController)
/* harmony export */ });
/* harmony import */ var _FieldController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FieldController */ "./src/frontend/viewer/Controller/ModelController/FieldController/FieldController.js");

class TableFormFieldController extends _FieldController__WEBPACK_IMPORTED_MODULE_0__.FieldController {
  getValueForWidget(row) {
    // console.log('TableFormFieldController.getValueForWidget');
    return this.valueToString(this.model.getValue(row));
  }

}
window.TableFormFieldController = TableFormFieldController;

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FieldController/TableFormFieldController/TableFormTextBoxFieldController/TableFormTextBoxFieldController.js":
/*!********************************************************************************************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FieldController/TableFormFieldController/TableFormTextBoxFieldController/TableFormTextBoxFieldController.js ***!
  \********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TableFormTextBoxFieldController": () => (/* binding */ TableFormTextBoxFieldController)
/* harmony export */ });
/* harmony import */ var _TableFormFieldController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TableFormFieldController */ "./src/frontend/viewer/Controller/ModelController/FieldController/TableFormFieldController/TableFormFieldController.js");

class TableFormTextBoxFieldController extends _TableFormFieldController__WEBPACK_IMPORTED_MODULE_0__.TableFormFieldController {
  getViewClass() {
    return super.getViewClass() || TableFormTextBoxFieldView;
  }
  /*beginEdit(view) {
      view.firstElementChild.style.MozUserSelect = 'text';
      view.firstElementChild.contentEditable = true;
      const range = document.createRange();
      range.selectNodeContents(view.firstElementChild);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      view.firstElementChild.focus();
      return true;
  }*/

  /*endEdit(view) {
      view.firstElementChild.style.MozUserSelect = 'none';
      view.firstElementChild.contentEditable = false;
  }*/


}
window.TableFormTextBoxFieldController = TableFormTextBoxFieldController;

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FormController/FormController.js":
/*!*****************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FormController/FormController.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormController": () => (/* binding */ FormController)
/* harmony export */ });
/* harmony import */ var _ModelController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ModelController */ "./src/frontend/viewer/Controller/ModelController/ModelController.js");

class FormController extends _ModelController__WEBPACK_IMPORTED_MODULE_0__.ModelController {
  static create(model, parent) {
    // console.log('FormController.create', model.getFullName());
    const page = model.getPage();
    const customClassName = `${page.getName()}${model.getName()}FormController`;
    const CustomClass = FrontHostApp.getClassByName(customClassName);
    const GeneralClass = FrontHostApp.getClassByName(`${model.getClassName()}Controller`);
    const Class = CustomClass ? CustomClass : GeneralClass;
    return new Class(model, parent);
  }

  constructor(model, parent) {
    super(model, parent);
    this.fields = {};
  }

  init() {
    for (const field of this.model.fields) {
      const ctrl = this.fields[field.getName()] = FieldController.create(field, this);
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
window.FormController = FormController;

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FormController/FormView.jsx":
/*!************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FormController/FormView.jsx ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormView": () => (/* binding */ FormView)
/* harmony export */ });
class FormView extends ModelView {
  constructor(props) {
    super(props);
    this.checkParent();
  }

  onActionsClick = async li => {
    // console.log('FormView.onActionsClick:', li);
    const ctrl = this.props.ctrl;
    const name = li.dataset.action;

    try {
      const result = await ctrl.onActionClick(name, ctrl.getActiveRow(true));

      if (!result) {
        throw new Error(`no handler for action '${name}'`);
      }
    } catch (err) {
      console.error(err);
      await this.getCtrl().getApp().alert({
        message: err.message
      });
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    console.log('FormView.shouldComponentUpdate', this.getCtrl().getModel().getFullName(), nextProps.updated - this.props.updated);
    if (nextProps.updated - this.props.updated) return true;
    return false;
  }

}
window.FormView = FormView;

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FormController/RowFormController/RowFormController.js":
/*!**************************************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FormController/RowFormController/RowFormController.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RowFormController": () => (/* binding */ RowFormController)
/* harmony export */ });
/* harmony import */ var _FormController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FormController */ "./src/frontend/viewer/Controller/ModelController/FormController/FormController.js");
/* harmony import */ var _RowFormView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RowFormView */ "./src/frontend/viewer/Controller/ModelController/FormController/RowFormController/RowFormView.jsx");


class RowFormController extends _FormController__WEBPACK_IMPORTED_MODULE_0__.FormController {
  constructor(model, parent) {
    super(model, parent);
    this.state = {
      updated: Date.now(),
      mode: 'edit',
      hasNew: false,
      changed: false,
      valid: true
    };
  }

  init() {
    super.init();
    this.model.on('refresh', this.onModelRefresh);
    this.model.on('insert', this.onModelInsert);
    this.model.on('update', this.onModelUpdate);

    if (this.model.getDefaultDataSource().getClassName() === 'SqlDataSource') {
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
    this.state.valid = this.isValid(); // console.log('hasNew:', hasNew);
    // console.log('changed:', changed);
    // console.log('valid:', valid);
  }

  refill() {
    console.log('RowFormController.refill', this.model.getFullName());

    for (const name in this.fields) {
      this.fields[name].refill();
    }
  }

  onModelRefresh = async e => {
    console.log('RowFormController.onModelRefresh', this.model.getFullName());
    if (!this.view) return;
    this.refill();
    this.invalidate();
    this.rerender();
  };
  onModelInsert = async e => {
    console.log('RowFormController.onModelInsert', this.model.getFullName());
    this.refill();
    this.invalidate();
    this.calcState();
    this.parent.onFormInsert(e);
  };
  onModelUpdate = async e => {
    console.log('RowFormController.onModelUpdate', this.model.getFullName(), e);
    this.refill();
    this.invalidate();
    this.calcState();
    this.parent.onFormUpdate(e);
  };

  isValid() {
    // console.log('RowFormController.isValid', this.model.getFullName());
    for (const name in this.fields) {
      const field = this.fields[name];
      if (!field.isValid()) return false;
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

  onSaveClick = async () => {
    console.log('RowFormController.onSaveClick');
    this.validate();
    this.calcState();

    if (this.isValid()) {
      try {
        this.getApp().getView().disableRerender();
        await this.model.update();
        this.state.mode = 'view';
        console.log('form model updated', this.getModel().getFullName());
      } finally {
        this.getApp().getView().enableRerender();
        await this.getApp().getView().rerender();
      }
    } else {
      console.error(`cannot update invalid row form: ${this.model.getFullName()}`);
      await this.rerender();
    }
  };
  onDiscardClick = () => {
    console.log('RowFormController.onDiscardClick', this.model.getFullName());
    const changedFields = [];
    const row = this.model.getRow();

    for (const name in this.fields) {
      const field = this.fields[name];

      if (field.isChanged(row) || !field.isValid()) {
        changedFields.push(name);
      }
    } // console.log('changedFields:', changedFields);


    this.model.discard(changedFields); // refill changed fields

    changedFields.forEach(name => {
      this.fields[name].refill();
    }); // ui

    this.calcState();

    if (this.getModel().hasDefaultSqlDataSource()) {
      this.state.mode = 'view';
    }

    this.rerender(); // event

    this.parent.onFormDiscard(this);
  };
  onRefreshClick = async () => {
    // console.log('RowFormController.onRefreshClick', this.model.getFullName());
    await this.model.refresh();
  };

  isChanged() {
    // console.log('RowFormController.isChanged', this.model.getFullName());
    if (this.model.isChanged()) return true;
    const row = this.model.getRow();

    for (const name in this.fields) {
      const field = this.fields[name];
      if (field.isChanged(row)) return true;
    }

    return false;
  }

  async onFieldChange(e) {
    // console.log('RowFormController.onFieldChange', this.model.getFullName());
    this.calcState();
    this.invalidate();
    await super.onFieldChange(e);
  }

  onEditClick = e => {
    console.log('RowFormController.onEditClick');
    this.state.mode = 'edit';
    this.rerender();
  };
  onCancelClick = e => {
    console.log('RowFormController.onCancelClick');
    this.state.mode = 'view';
    this.rerender();
  };

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

}
window.RowFormController = RowFormController;

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FormController/RowFormController/RowFormView.jsx":
/*!*********************************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FormController/RowFormController/RowFormView.jsx ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RowFormView": () => (/* binding */ RowFormView)
/* harmony export */ });
/* harmony import */ var _FormView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FormView */ "./src/frontend/viewer/Controller/ModelController/FormController/FormView.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



class RowFormView extends _FormView__WEBPACK_IMPORTED_MODULE_0__.FormView {
  renderToolbar() {
    // console.log('RowFormView.renderToolbar');
    const ctrl = this.props.ctrl;
    const text = ctrl.getModel().getApp().getText();
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: `${this.getCssBlockName()}__toolbar flex grid-gap-5`,
      children: [ctrl.model.hasDefaultSqlDataSource() && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Button, {
        classList: ['toolbar-button'],
        onClick: ctrl.onEditClick,
        visible: ctrl.getMode() === 'view',
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          children: text.form.edit
        })
      }, "edit"), ctrl.model.hasDefaultSqlDataSource() && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Button, {
        classList: ['toolbar-button'],
        enabled: (ctrl.state.changed || ctrl.state.hasNew) && ctrl.state.valid,
        onClick: ctrl.onSaveClick,
        visible: ctrl.getMode() === 'edit',
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          children: text.form.save
        })
      }, "save"), ctrl.model.hasDefaultSqlDataSource() && ctrl.model.getKey() && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Button, {
        classList: ['toolbar-button'],
        visible: ctrl.getMode() === 'edit' && !ctrl.state.changed && ctrl.state.valid,
        onClick: ctrl.onCancelClick,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          children: text.form.cancel
        })
      }, "cancel"), ctrl.model.hasDefaultSqlDataSource() && ctrl.model.getKey() && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Button, {
        classList: ['toolbar-button'],
        enabled: ctrl.state.changed || !ctrl.isValid(),
        onClick: ctrl.onDiscardClick,
        visible: ctrl.getMode() === 'edit' && (ctrl.state.changed || !ctrl.state.valid),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          children: text.form.discard
        })
      }, "discard"), ctrl.model.hasDefaultSqlDataSource() && ctrl.getModel().getAttr('refreshButton') === 'true' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Button, {
        classList: ['toolbar-button'],
        enabled: !ctrl.state.changed && !ctrl.state.hasNew,
        onClick: ctrl.onRefreshClick,
        visible: ctrl.getMode() === 'view',
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          children: text.form.refresh
        })
      }, "refresh"), this.isActionsVisible() && ctrl.model.hasActions() && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DropdownButton, {
        classList: ['toolbar-dropdown-button'],
        actions: this.getActionsForDropdownButton(),
        onClick: this.onActionsClick,
        enabled: this.isActionsEnabled(),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MoreVertIcon, {})
      })]
    });
  }

  isActionsEnabled() {
    // return this.getCtrl().state.mode === 'view';
    return true;
  }

  isActionsVisible() {
    if (this.getCtrl().getModel().hasDefaultSqlDataSource()) {
      return !!this.getCtrl().getModel().getKey();
    }

    return true;
  }

  renderLabel(fieldCtrl) {
    const model = fieldCtrl.getModel();
    const name = model.getName();
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: `${this.getCssBlockName()}__label`,
      children: [model.getCaption(), ":", model.isNotNull() && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
        style: {
          color: 'red'
        },
        children: "*"
      })]
    }, `label.${name}`);
  }

  renderField(fieldCtrl) {
    // console.log('RowFormView.renderField', fieldCtrl.model.getClassName());
    const name = fieldCtrl.getModel().getName();
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: `${this.getCssBlockName()}__field`,
      children: this.renderFieldView(fieldCtrl)
    }, `field.${name}`);
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: `${this.getCssBlockName()}__error`,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Tooltip, {
        position: "left",
        type: "alert",
        hidden: fieldCtrl.getErrorMessage() === null,
        tip: fieldCtrl.getErrorMessage()
      })
    }, `tooltip.${name}`);
  }

  renderGroup(fieldCtrl) {
    return [this.renderLabel(fieldCtrl), this.renderField(fieldCtrl), this.renderError(fieldCtrl)];
    /*return <div key={fieldCtrl.getModel().getName()} className={`${this.getCssClassNames()}__group`}>
        {this.renderLabel(fieldCtrl)}
        {this.renderField(fieldCtrl)}
        {this.renderError(fieldCtrl)}
    </div>;*/
  }

  renderGroups() {
    // console.log('RowFormView.renderGroups');
    const ctrl = this.getCtrl();
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: `${this.getCssBlockName()}__groups`,
      children: Object.keys(ctrl.fields).filter(name => ctrl.getField(name).isVisible()).map(name => {
        return this.renderGroup(ctrl.getField(name));
      })
    });
  }

  render() {
    console.log('RowFormView.render', this.getCtrl().getModel().getFullName());
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: `${this.getCssClassNames()} flex-column grid-gap-5`,
      style: this.getStyle(),
      children: [(this.getCtrl().getModel().hasDefaultSqlDataSource() || this.getCtrl().getModel().hasActions()) && this.renderToolbar(), this.renderGroups()]
    });
  }
  /*renderActionIcon() {
      return <CancelIcon/>;
  }*/


}
window.RowFormView = RowFormView;

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FormController/TableFormController/TableFormController.js":
/*!******************************************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FormController/TableFormController/TableFormController.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TableFormController": () => (/* binding */ TableFormController)
/* harmony export */ });
/* harmony import */ var _TableFormView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TableFormView */ "./src/frontend/viewer/Controller/ModelController/FormController/TableFormController/TableFormView.jsx");

class TableFormController extends FormController {
  constructor(model, parent) {
    super(model, parent);
    this.state = {
      updated: Date.now()
    };
    this.grid = null;
  }

  getViewClass() {
    return super.getViewClass() || _TableFormView__WEBPACK_IMPORTED_MODULE_0__.TableFormView;
  }

  init() {
    super.init(); // this.parent.on('hide', this.onHidePage);
    // this.parent.on('show', this.onShowPage);

    this.model.on('refresh', this.onModelRefresh);
    this.model.on('update', this.onModelUpdate);
    this.model.on('delete', this.onModelDelete);
    this.model.on('insert', this.onModelInsert);
  }

  deinit() {
    // this.parent.off('hide', this.onHidePage);
    // this.parent.off('show', this.onShowPage);
    this.model.off('refresh', this.onModelRefresh);
    this.model.off('update', this.onModelUpdate);
    this.model.off('delete', this.onModelDelete);
    this.model.off('insert', this.onModelInsert);
    super.deinit();
  }

  onGridCreate = grid => {
    this.grid = grid;
  };
  onNewClick = async e => {
    console.log('TableFormController.onNewClick');
    await this.new();
  };
  onRefreshClick = async e => {
    console.log('TableFormController.onRefreshClick', this.model.getFullName());
    await this.model.refresh(); // console.error('refresh error handler:', err.message);
    // alert(err.message);
  };
  onDeleteClick = async e => {
    console.log('TableFormController.onDeleteClick', this.model.getFullName(), this.grid.getActiveRowKey());
    const result = await this.getApp().confirm({
      message: this.model.getApp().getText().form.areYouSure
    });

    if (result) {
      await this.model.getDefaultDataSource().delete(this.grid.getActiveRowKey());
    }
  };
  onGridCellDblClick = async (row, key) => {
    // console.log('TableFormController.onGridCellDblClick', row);
    // const bodyCell = e.bodyCell;
    // const row = bodyCell.bodyRow.dbRow;
    // console.log('row:', row);
    // const key = this.model.getDefaultDataSource().getRowKey(row);
    // console.log('key:', key);
    switch (this.model.getAttr('editMethod')) {
      // case 'table':
      //     this.grid.gridColumns[bodyCell.qFieldName].beginEdit(bodyCell);
      // break;
      case 'form':
        if (this.getPage().getModel().isSelectMode()) {
          await this.getPage().selectRow(key);
        } else {
          await this.edit(key);
        }

        break;
    }
  };
  onGridLinkClick = async key => {
    console.log('TableFormController.onGridLinkClick', key);
    await this.edit(key);
  };
  onGridDeleteKeyDown = async (row, key) => {
    console.log('TableFormController.onGridDeleteKeyDown', row, key);

    if (this.getModel().getAttr('deleteRowMode') !== 'disabled') {
      const result = await this.getApp().confirm({
        message: this.model.getApp().getText().form.areYouSure
      });

      if (result) {
        await this.model.getDefaultDataSource().delete(key);
      }
    }
  };
  /*onHidePage = async () => {
      this.grid.saveScroll();
  }*/

  /*onShowPage = async () => {
      console.log('TableFormController.onShowPage', this.model.getFullName());
      if (!this.grid.isHidden()) {
          this.grid.restoreScroll();
          this.grid.focus();
          // console.log('document.activeElement:', document.activeElement);
      }
  }*/

  async new() {
    if (this.model.getAttr('newRowMode') === 'oneclick') {
      const row = {};
      this.model.fillDefaultValues(row);
      await this.model.getDefaultDataSource().insert(row);
    } else if (this.model.getAttr('newRowMode') === 'editform') {
      if (!this.model.getAttr('itemEditPage')) {
        throw new Error(`[${this.model.getFullName()}] itemEditPage is empty`);
      }

      await this.openPage({
        name: this.model.getAttr('itemEditPage'),
        newMode: true,
        modal: true
      });
    } else if (this.model.getAttr('newRowMode') === 'createform') {
      if (!this.model.getAttr('itemCreatePage')) {
        throw new Error(`[${this.model.getFullName()}] itemCreatePage is empty`);
      }

      await this.openPage({
        name: this.model.getAttr('itemCreatePage'),
        newMode: true,
        modal: true
      });
    } else if (this.model.getAttr('newRowMode') === 'oneclick editform') {
      if (!this.model.getAttr('itemEditPage')) {
        throw new Error(`[${this.model.getFullName()}] itemEditPage is empty`);
      }

      const row = {};
      this.model.fillDefaultValues(row);
      const result = await this.model.getDefaultDataSource().insert(row);
      const database = this.model.getDefaultDataSource().getAttr('database');
      const table = this.model.getDefaultDataSource().getAttr('table');
      const [key] = result[database][table].insert;
      await this.openPage({
        name: this.model.getAttr('itemEditPage'),
        // key  : key,
        modal: true,
        params: { ...DataSource.keyToParams(key)
        }
      });
    } else if (this.model.getAttr('newRowMode') === 'oneclick createform') {
      if (!this.model.getAttr('itemCreatePage')) {
        throw new Error(`[${this.model.getFullName()}] itemCreatePage is empty`);
      }

      const row = {};
      this.model.fillDefaultValues(row);
      const result = await this.model.getDefaultDataSource().insert(row);
      const database = this.model.getDefaultDataSource().getAttr('database');
      const table = this.model.getDefaultDataSource().getAttr('table');
      const [key] = result[database][table].insert;
      await this.openPage({
        name: this.model.getAttr('itemCreatePage'),
        // key  : key,
        modal: true,
        params: { ...DataSource.keyToParams(key)
        }
      });
    }
  }

  async edit(key) {
    // console.log('TableForm.edit', this.model.getFullName(), key);
    if (!this.model.getAttr('itemEditPage')) {
      throw new Error(`${this.model.getFullName()}: itemEditPage is empty`);
    }

    try {
      await this.openPage({
        name: this.model.getAttr('itemEditPage'),
        modal: true,
        params: { ...DataSource.keyToParams(key)
        }
      });
    } catch (err) {
      // console.error(`${this.model.getFullName()}: edit form error handler:`, err);
      // alert(`${this.model.getFullName()}: ${err.message}`);
      err.message = `${this.model.getFullName()} edit: ${err.message}`;
      throw err;
    }
  }

  onModelRefresh = async e => {
    console.log('TableFormController.onModelRefresh', this.model.getFullName(), e);
    if (!this.view) return;
    this.invalidate();
    await this.rerender();
  };
  onModelInsert = async e => {
    console.log('TableFormController.onModelInsert', this.model.getFullName(), e);
    if (!this.view) return;

    if (this.grid && e.source) {
      for (const key of e.inserts) {
        this.grid.setActiveRowKey(key);
      }
    }

    this.invalidate();
    await this.rerender();
  };
  onModelUpdate = async e => {
    console.log('TableFormController.onModelUpdate', this.model.getFullName(), e, this.view);
    if (!this.view) return;

    if (this.grid) {
      for (const key in e.updates) {
        if (this.grid.getActiveRowKey() === key) {
          const newKey = e.updates[key];

          if (key !== newKey) {
            this.grid.setActiveRowKey(newKey);
          }
        }
      }
    }

    this.invalidate();
    await this.rerender();
  };
  onModelDelete = async e => {
    console.log('TableFormController.onModelDelete', this.model.getFullName(), e);
    if (!this.view) return;

    if (this.grid) {
      for (const key of e.deletes) {
        if (this.grid.getActiveRowKey() === key) {
          this.grid.setActiveRowKey(null);
        }
      }
    }

    this.invalidate();
    await this.rerender();
  };
  onGridSelectionChange = async key => {
    // console.log('TableFormController.onGridSelectionChange', key);
    this.invalidate();
    await this.getPage().rerender();
  };

  getActiveRow() {
    const key = this.grid.getActiveRowKey();
    if (!key) throw new Error(`${this.model.getFullName()}: no active row key`);
    return this.model.getDefaultDataSource().getRow(key);
  }

  isRowSelected = () => {
    // console.log('TableFormController.isRowSelected');
    return !!this.grid && !!this.grid.getActiveRowKey();
  };
  onFrameChanged = async value => {
    // console.log('TableFormController.onFrameChanged', parseInt(value));
    const frame = parseInt(value);
    this.model.getDefaultDataSource().setFrame(frame);
    this.model.getDefaultDataSource().refresh();
    await this.rerender();
  };
  onNextClick = async () => {
    console.log('TableFormController.onNextClick');
    const frame = this.model.getDefaultDataSource().getFrame() + 1;
    this.model.getDefaultDataSource().setFrame(frame);
    this.model.getDefaultDataSource().refresh();
    await this.rerender();
  };
  onPreviousClick = async () => {
    console.log('TableFormController.onPreviousClick');
    const frame = this.model.getDefaultDataSource().getFrame() - 1;
    this.model.getDefaultDataSource().setFrame(frame);
    this.model.getDefaultDataSource().refresh();
    this.rerender();
  };

  canPrev() {
    return this.model.getDefaultDataSource().getFrame() > 1;
  }

  canNext() {
    const ds = this.model.getDefaultDataSource();
    return ds.getFrame() < ds.getFramesCount();
  }

  getSelectedRowKey() {
    return this.grid ? this.grid.getActiveRowKey() : null;
  }

  isActionEnabled(name) {
    return this.isRowSelected();
  }

}
window.TableFormController = TableFormController;

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/FormController/TableFormController/TableFormView.jsx":
/*!*************************************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/FormController/TableFormController/TableFormView.jsx ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TableFormView": () => (/* binding */ TableFormView)
/* harmony export */ });
/* harmony import */ var _FormView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FormView */ "./src/frontend/viewer/Controller/ModelController/FormController/FormView.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



class TableFormView extends _FormView__WEBPACK_IMPORTED_MODULE_0__.FormView {
  renderToolbar() {
    const ctrl = this.props.ctrl;
    const model = ctrl.model;
    const dataSource = model.getDefaultDataSource();
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: `${this.getCssBlockName()}__toolbar flex grid-gap-5`,
      children: [model.data.newRowMode !== 'disabled' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Button, {
        classList: ['toolbar-button', 'default'],
        onClick: ctrl.onNewClick,
        enabled: !ctrl.parent.model.hasNew(),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          children: model.getApp().getText().form.new
        })
      }, "new"), model.data.refreshButton === 'true' && dataSource.constructor.name === 'SqlDataSource' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Button, {
        classList: ['toolbar-button'],
        onClick: ctrl.onRefreshClick,
        enabled: !ctrl.parent.model.hasNew(),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          children: model.getApp().getText().form.refresh
        })
      }, "refresh"), model.data.deleteRowMode !== 'disabled' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Button, {
        classList: ['toolbar-button'],
        onClick: ctrl.onDeleteClick,
        enabled: ctrl.isRowSelected(),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          children: model.getApp().getText().form.delete
        })
      }, "delete"), ctrl.model.hasActions() && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DropdownButton, {
        classList: ['toolbar-dropdown-button'],
        actions: this.getActionsForDropdownButton(),
        onClick: this.onActionsClick,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MoreVertIcon, {})
      })]
    });
  }

  renderPaging() {
    const ctrl = this.props.ctrl;
    const model = this.props.ctrl.model;
    const dataSource = model.getDefaultDataSource();
    const text = model.getApp().getText();
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "paging",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "paging__countBlock",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("span", {
          className: "count",
          children: [dataSource.getRowsLength(), " ", dataSource.getLimit() && `of ${dataSource.getCount()}`]
        })
      }), dataSource.getLimit() && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "paging__gotoBlock",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Button, {
          enabled: ctrl.canPrev(),
          onClick: ctrl.onPreviousClick,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(LeftIcon, {
            size: 18
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ComboBox, {
          value: ctrl.model.getDefaultDataSource().getFrame().toString(),
          onChange: ctrl.onFrameChanged,
          items: new Array(dataSource.getFramesCount()).fill().map((val, i) => ({
            value: (i + 1).toString(),
            title: (i + 1).toString()
          }))
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Button, {
          enabled: ctrl.canNext(),
          onClick: ctrl.onNextClick,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(RightIcon, {
            size: 18
          })
        })]
      })]
    });
  }

  renderGridCellView = (row, column, onCreate, onUnmount) => {
    // console.log('TableFormView.renderGridCellView');
    const ctrl = this.props.ctrl.getField(column.name);
    if (!ctrl) throw new Error(`no field: ${column.name}`); // console.log(column.name, ctrl.constructor.name);

    return React.createElement(ctrl.getViewClass(), {
      row,
      column,
      onCreate,
      onUnmount,
      ctrl
    });
  };

  getGridColumns() {
    const ctrl = this.props.ctrl;
    return Object.keys(ctrl.fields).filter(name => ctrl.getField(name).isVisible()).map(name => {
      const field = ctrl.getField(name);
      return {
        name: field.getModel().getName(),
        title: field.getModel().getCaption(),
        width: field.getModel().getWidth()
      };
    });
  }

  getRows() {
    const ctrl = this.props.ctrl;
    return ctrl.model.getDefaultDataSource().getRows();
  }

  getGridExtraColumn() {
    return true;
  }

  getGridClass() {
    return Grid;
  }

  renderGrid() {
    const ctrl = this.props.ctrl;
    return React.createElement(this.getGridClass(), {
      classList: ['flex-max'],
      onCreate: ctrl.onGridCreate,
      name: ctrl.model.getFullName(),
      columns: this.getGridColumns(),
      rows: this.getRows(),
      getRowKey: row => ctrl.model.getDefaultDataSource().getRowKey(row),
      onDoubleClick: ctrl.onGridCellDblClick,
      onDeleteKeyDown: ctrl.onGridDeleteKeyDown,
      onSelectionChange: ctrl.onGridSelectionChange,
      onLinkClick: ctrl.onGridLinkClick,
      renderGridCellView: this.renderGridCellView,
      updated: ctrl.getUpdated(),
      extraColumn: this.getGridExtraColumn(),
      selectedKey: ctrl.getPage().getModel().getOptions().selectedKey,
      createLinkCallback: this.createLinkCallback
    });
  }

  render() {
    console.log('TableFormView.render', this.props.ctrl.model.getFullName());
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: `${this.getCssClassNames()} full flex-column grid-gap-5`,
      style: this.getStyle(),
      children: [this.renderToolbar(), this.renderGrid(), ctrl.getModel().hasDefaultSqlDataSource() && this.renderPaging()]
    });
  }

  createLinkCallback = key => {
    return PageController.createLink({
      page: this.getCtrl().getModel().getAttr('itemEditPage'),
      ...DataSource.keyToParams(key)
    });
  };
}
window.TableFormView = TableFormView;

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/ModelController.js":
/*!***************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/ModelController.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModelController": () => (/* binding */ ModelController)
/* harmony export */ });
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Controller */ "./src/frontend/viewer/Controller/Controller.js");

class ModelController extends _Controller__WEBPACK_IMPORTED_MODULE_0__.Controller {
  constructor(model, parent) {
    super();
    this.model = model;
    this.parent = parent;
    this.deinited = false;
  }

  init() {}

  deinit() {
    if (this.deinited) throw new Error(`${this.model.getFullName()}: controller already deinited`);
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
    if (!model.isAttr('viewClass')) throw new Error(`${this.constructor.name} not supports view`);
    const viewClassName = model.getAttr('viewClass');
    return viewClassName ? eval(viewClassName) : null;
  }

}
window.ModelController = ModelController;

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/ModelView.jsx":
/*!**********************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/ModelView.jsx ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModelView": () => (/* binding */ ModelView)
/* harmony export */ });
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../View */ "./src/frontend/viewer/Controller/View.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


class ModelView extends _View__WEBPACK_IMPORTED_MODULE_0__.View {
  getActionsForDropdownButton() {
    return this.props.ctrl.getModel().getCol('actions').map(data => {
      const actionName = Model.getName(data);
      return {
        name: actionName,
        title: this.renderActionIcon ? [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          children: this.renderActionIcon(actionName)
        }, 'icon'), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          children: Model.getAttr(data, 'caption')
        }, 'title')] : Model.getAttr(data, 'caption'),
        enabled: this.getCtrl().isActionEnabled(actionName)
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

  getStyle() {}

}
window.ModelView = ModelView;

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/PageController/PageController.js":
/*!*****************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/PageController/PageController.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PageController": () => (/* binding */ PageController)
/* harmony export */ });
/* harmony import */ var _ModelController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ModelController */ "./src/frontend/viewer/Controller/ModelController/ModelController.js");

class PageController extends _ModelController__WEBPACK_IMPORTED_MODULE_0__.ModelController {
  constructor(model, parent, id) {
    //console.log('PageController.constructor', model);
    super(model, parent);
    if (!id) throw new Error('no id');
    this.id = id;
    this.forms = [];
  }

  static create(model, parent, id, options) {
    // console.log('PageController.create', model.getName());
    const CustomClass = FrontHostApp.getClassByName(`${model.getName()}PageController`);
    const Class = CustomClass ? CustomClass : PageController;
    return new Class(model, parent, id, options);
  }

  init() {
    for (const form of this.model.forms) {
      const ctrl = FormController.create(form, this);
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

  onSaveAndCloseClick = async () => {
    console.log('PageController.onSaveAndCloseClick');
    this.validate();

    if (this.isValid()) {
      try {
        this.getApp().getView().disableRerender();
        await this.getModel().update();
        console.log('page model updated', this.getModel().getFullName());
      } finally {
        this.getApp().getView().enableRerender();
      }

      await this.getApp().closePage(this);

      if (this.getModel().getOptions().onClose) {
        this.getModel().getOptions().onClose();
      }
    } else {
      await this.rerender();
    }
  };
  onClosePageClick = async e => {
    console.log('PageController.onClosePageClick', this.getModel().getFullName());
    await this.close();
  };
  onOpenPageClick = async e => {
    const name = this.getModel().getName();
    const key = this.getModel().getKey();
    const link = this.createOpenInNewLink(name, key); // console.log('link', link);

    window.open(link, '_blank');
  };

  createOpenInNewLink(name, key) {
    return PageController.createLink({
      page: name,
      ...DataSource.keyToParams(key)
    });
  }

  async close() {
    // console.log('PageController.close', this.model.getFullName());
    const changed = this.isChanged(); // console.log('changed:', changed);
    // const valid = this.isValid();
    // console.log('valid:', valid);

    if (this.model.hasRowFormWithDefaultSqlDataSource() && changed) {
      const result = await this.getApp().confirm({
        message: this.model.getApp().getText().form.areYouSure
      });
      if (!result) return;
    }

    await this.getApp().closePage(this);

    if (this.getModel().getOptions().onClose) {
      this.getModel().getOptions().onClose();
    }
  }

  validate() {
    for (const form of this.forms) {
      if (form instanceof RowFormController) {
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
    console.log('PageController.onFormInsert:', this.model.getFullName()); // console.log('hasNew:', this.model.hasNew());

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
    return super.getViewClass() || PageView;
  }

  static createLink(params = null) {
    // const query = window.location.search.split('?')[1];
    // console.log('query:', query);
    if (params) {
      return [window.location.pathname, [// ...(query ? query.split('&') : []),
      ...(ApplicationController.isDebugMode() ? ['debug=1'] : []), ...Object.keys(params).map(name => `${name}=${encodeURI(params[name])}`)].join('&')].join('?');
    }

    return window.location.pathname;
  }

  getForm(name) {
    return this.forms.find(form => form.model.getName() === name);
  }

  async onActionClick(name) {
    console.log('PageController.onActionClick', name);
  }

  onKeyDown = async e => {
    // console.log('PageController.onKeyDown', this.getModel().getFullName(), e);
    if (e.key === 'Escape') {
      if (this.isModal()) {
        await this.close();
      }
    }
  };

  getTitle() {
    const model = this.getModel();
    const key = model.getKey();
    let keyPart;

    if (key) {
      const arr = JSON.parse(key);

      if (arr.length === 1 && typeof arr[0] === 'number') {
        keyPart = `#${arr[0]}`;
      } else {
        keyPart = `${key}`;
      }
    }

    return [model.getCaption(), ...(ApplicationController.isDebugMode() ? [`(${this.getId()})`] : []), ...(keyPart ? [keyPart] : [])].join(' ');
  }

  getSelectedRowKey() {
    for (const form of this.forms) {
      const selectedRowKey = form.getSelectedRowKey();
      if (selectedRowKey) return selectedRowKey;
    }

    return null;
  }

  onSelectClick = async e => {
    console.log('PageController.onSelectClick');
    await this.selectRow(this.getSelectedRowKey());
  };
  onResetClick = async e => {
    console.log('PageController.onResetClick');
    await this.selectRow(null);
  };

  async selectRow(key) {
    console.log('PageController.selectRow', key);
    await this.close();
    await this.getModel().getOptions().onSelect(key);
  }

  invalidate() {
    this.forms.forEach(form => form.invalidate());
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
window.PageController = PageController;

/***/ }),

/***/ "./src/frontend/viewer/Controller/ModelController/PageController/PageView.jsx":
/*!************************************************************************************!*\
  !*** ./src/frontend/viewer/Controller/ModelController/PageController/PageView.jsx ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PageView": () => (/* binding */ PageView)
/* harmony export */ });
/* harmony import */ var _ModelView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ModelView */ "./src/frontend/viewer/Controller/ModelController/ModelView.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



class PageView extends _ModelView__WEBPACK_IMPORTED_MODULE_0__.ModelView {
  constructor(props) {
    super(props);
    this.checkParent();
    this.el = React.createRef();
  }

  onActionsClick = async li => {
    // console.log('PageView.onActionsClick:', li);
    const ctrl = this.getCtrl();
    const name = li.dataset.action;

    try {
      const result = await ctrl.onActionClick(name);

      if (!result) {
        throw new Error(`no handler for action '${name}'`);
      }
    } catch (err) {
      console.error(err);
      await this.getCtrl().getApp().alert({
        message: err.message
      });
    }
  };

  isToolbar() {
    const model = this.getCtrl().getModel();
    return model.hasActions(); //|| (model.isModal() && model.hasRowFormWithDefaultSqlDataSource())
    //|| model.isSelectMode();
  }

  getFormTabs(forms) {
    return forms.map(form => {
      return {
        name: form.getModel().getName(),
        title: form.getTitle(),
        content: this.renderForm(form)
      };
    });
  }

  getRowForms() {
    return this.getCtrl().forms.filter(form => form.getModel().getClassName() === 'RowForm').filter(form => form.isVisible());
  }

  getTableForms() {
    return this.getCtrl().forms.filter(form => form.getModel().getClassName() === 'TableForm').filter(form => form.isVisible());
  }

  renderForm(formCtrl, props = {}) {
    return React.createElement(formCtrl.getViewClass(), {
      parent: this,
      key: formCtrl.getModel().getName(),
      ctrl: formCtrl,
      onCreate: formCtrl.onViewCreate,
      updated: formCtrl.getUpdated(),
      ...props
    });
  }

  renderRowForms() {
    return this.getRowForms().map(form => this.renderForm(form));
  }

  renderTitle() {
    const ctrl = this.getCtrl();
    const model = ctrl.getModel();
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("h1", {
      className: `${this.getCssBlockName()}__title`,
      children: [ctrl.getTitle(), model.hasRowFormWithDefaultSqlDataSource() && (ctrl.isChanged() || model.hasNew()) && [' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
        className: `${this.getCssBlockName()}__star`,
        children: "*"
      }, 'star')]]
    });
  }

  renderSelectButton() {
    const ctrl = this.getCtrl();
    const model = ctrl.getModel();
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Button, {
      classList: ['toolbar-button', 'default'],
      onClick: ctrl.onSelectClick,
      enabled: !!ctrl.getSelectedRowKey(),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        children: model.getApp().getText().page.select
      })
    });
  }

  renderSaveAndCloseButton() {
    const ctrl = this.getCtrl();
    const model = ctrl.getModel();
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Button, {
      classList: ['toolbar-button', 'default'],
      onClick: ctrl.onSaveAndCloseClick,
      enabled: ctrl.isValid() && (model.hasNew() || ctrl.isChanged()),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        children: model.getApp().getText().page.saveAndClose
      })
    });
  }

  renderCloseButton() {
    const ctrl = this.getCtrl();
    const model = ctrl.getModel();
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Button, {
      classList: ['toolbar-button'],
      onClick: ctrl.onClosePageClick,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        children: model.getApp().getText().page.close
      })
    });
  }

  renderActionsDropdownButton() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DropdownButton, {
      classList: ['toolbar-dropdown-button'],
      actions: this.getActionsForDropdownButton(),
      onClick: this.onActionsClick,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MoreVertIcon, {})
    });
  }

  renderToolbar() {
    const ctrl = this.getCtrl();
    const model = ctrl.getModel();
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: `${this.getCssBlockName()}__toolbar`,
      children: model.hasActions() && this.renderActionsDropdownButton()
    });
  }
  /*shouldComponentUpdate(nextProps, nextState) {
      return false;
  }*/


  renderTableForms() {
    const tableForms = this.getTableForms();

    if (tableForms.length === 1) {
      return this.renderForm(tableForms[0]);
    } else {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: `${this.getCssBlockName()}__table-forms flex-max frame`,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "frame__container",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Tab2, {
            tabs: this.getFormTabs(tableForms),
            classList: ['Tab-blue', 'full']
          })
        })
      });
    }
  }

  renderOpenPageHeaderButton() {
    const ctrl = this.getCtrl();
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: `${this.getCssBlockName()}__open`,
      onClick: ctrl.onOpenPageClick,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(OpenInNewIcon, {})
    }, 'open');
  }

  renderClosePageHeaderButton() {
    const ctrl = this.getCtrl();
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: `${this.getCssBlockName()}__close`,
      onClick: ctrl.onClosePageClick,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CloseIcon2, {})
    }, 'close');
  }

  renderHeader() {
    const model = this.getCtrl().getModel();
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: `${this.getCssBlockName()}__header`,
      children: [this.renderTitle(), model.isModal() && [...(model.getKey() ? [this.renderOpenPageHeaderButton()] : []), this.renderClosePageHeaderButton()]]
    });
  }

  renderMain() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: `${this.getCssBlockName()}__main flex-max frame`,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: 'frame__container flex-column grid-gap-10',
        children: [this.isToolbar() && this.renderToolbar(), this.renderForms()]
      })
    });
  }

  renderForms() {
    const model = this.getCtrl().getModel();
    return [...(model.hasRowForm() ? [this.renderRowForms()] : []), ...(model.hasTableForm() ? [this.renderTableForms()] : [])];
  }

  renderForms2() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Tab2, {
      tabs: this.getFormTabs(this.getCtrl().forms.filter(form => form.isVisible())),
      classList: ['Tab-blue', 'full']
    });
  }

  renderFooter() {
    const model = this.getCtrl().getModel();
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: `${this.getCssBlockName()}__footer`,
      children: [this.renderCloseButton(), model.isModal() && model.hasRowFormWithDefaultSqlDataSource() && this.renderSaveAndCloseButton(), model.isSelectMode() && this.renderSelectButton()]
    });
  }

  render() {
    console.log('PageView.render', this.getCtrl().getModel().getFullName());
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: `${this.getCssClassNames()} ${this.getCtrl().isModal() ? '' : 'full'} flex-column`,
      style: this.getStyle(),
      ref: this.el,
      tabIndex: 0,
      onKeyDown: this.getCtrl().onKeyDown,
      children: [this.renderHeader(), this.renderMain(), this.getCtrl().isModal() && this.renderFooter()]
    });
  }

  getStyle() {
    if (this.getCtrl().isModal()) {
      return {
        width: 1000,
        height: 750
      };
    }
  }

  componentDidMount() {
    // console.log('PageView.componentDidMount', this.getCtrl().getModel().getFullName());
    if (this.getCtrl().isAutoFocus() && !this.getCtrl().getModel().getKey()) {} else {
      this.focus();
    }
  }

  focus() {
    // console.log('PageView.focus', this.getCtrl().getModel().getFullName());
    if (this.getElement()) {
      // console.log('focus', this.getElement());
      this.getElement().focus();
    } else {
      console.error(`${this.getCtrl().getModel().getFullName()}: el is null (ref={this.el})`);
    }
  }

}
window.PageView = PageView;

/***/ }),

/***/ "./src/frontend/viewer/Controller/View.jsx":
/*!*************************************************!*\
  !*** ./src/frontend/viewer/Controller/View.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "View": () => (/* binding */ View)
/* harmony export */ });
class View extends ReactComponent {
  constructor(props) {
    super(props);
    if (!props.ctrl) throw new Error(`${this.constructor.name}: no ctrl`);
    if (!props.onCreate) throw new Error(`${this.constructor.name}: no onCreate`);
  }

  getCtrl() {
    return this.props.ctrl;
  }

}

/***/ }),

/***/ "./src/frontend/viewer/EventEmitter.js":
/*!*********************************************!*\
  !*** ./src/frontend/viewer/EventEmitter.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
    } // console.log(i);


    this.list[name].splice(i, 1);
  }

  async emit(name, e) {
    // console.log('EventEmitter.emit', name, e);
    if (this.list[name] && this.list[name].length) {
      const results = await Promise.allSettled(this.list[name].map(cb => cb(e))); // console.log('results:', results);

      for (const result of results) {
        if (result.status === 'rejected') {
          throw result.reason;
        }
      }
    }
  }

}

/***/ }),

/***/ "./src/frontend/viewer/LoginFrontHostApp.js":
/*!**************************************************!*\
  !*** ./src/frontend/viewer/LoginFrontHostApp.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginFrontHostApp": () => (/* binding */ LoginFrontHostApp)
/* harmony export */ });
/* harmony import */ var _Controller_LoginController_LoginController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Controller/LoginController/LoginController */ "./src/frontend/viewer/Controller/LoginController/LoginController.js");

class LoginFrontHostApp extends FrontHostApp {
  constructor(data) {
    console.log('LoginFrontHostApp.constructor', data);
    super();
    this.data = data;
  }

  async run() {
    console.log('LoginFrontHostApp.run');
    const loginController = _Controller_LoginController_LoginController__WEBPACK_IMPORTED_MODULE_0__.LoginController.create(this);
    const rootElement = document.querySelector(`.${loginController.getViewClassCssBlockName()}__root`);
    const loginView = Helper.createReactComponent(rootElement, loginController.getViewClass(), {
      ctrl: loginController
    });
  }

  getText() {
    return this.data.text;
  }

  getData() {
    return this.data;
  }

}
window.LoginFrontHostApp = LoginFrontHostApp;

/***/ }),

/***/ "./src/frontend/viewer/Model/Application/Application.js":
/*!**************************************************************!*\
  !*** ./src/frontend/viewer/Model/Application/Application.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Application": () => (/* binding */ Application)
/* harmony export */ });
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model */ "./src/frontend/viewer/Model/Model.js");
/* harmony import */ var _Database_Database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Database/Database */ "./src/frontend/viewer/Model/Database/Database.js");


class Application extends _Model__WEBPACK_IMPORTED_MODULE_0__.Model {
  constructor(data) {
    super(data);
    this.databases = [];
    this.dataSources = [];
  }

  init() {
    // console.log('Application.init');
    if (!this.data.theme) throw new Error('no theme attr'); // databases

    for (const data of this.data.databases) {
      const database = new _Database_Database__WEBPACK_IMPORTED_MODULE_1__.Database(data, this);
      database.init();
      this.addDatabase(database);
    } // data sources


    this.createDataSources();
  }

  deinit() {
    this.deinitDataSources(); // TODO: add deinit on opened pages

    super.deinit();
  }

  addDatabase(database) {
    this.databases.push(database);
  }

  async logout() {
    const data = await this.request({
      'action': 'logout'
    });
    this.emit('logout', {
      source: this
    });
  }

  async request(options) {
    // console.warn('Application.request', data);
    const start = Date.now();
    const [headers, body] = await FrontHostApp.doHttpRequest2(options);
    if (!headers['qforms-platform-version']) throw new Error('no qforms-platform-version header');
    if (!headers['qforms-app-version']) throw new Error('no qforms-app-version header');
    this.emit('request', {
      time: Date.now() - start,
      remotePlatformVersion: headers['qforms-platform-version'],
      remoteAppVersion: headers['qforms-app-version']
    });
    return body;
  }

  getDatabase(name) {
    // console.log('Application.getDatabase', name);
    const database = this.databases.find(database => database.getName() === name);
    if (!database) throw new Error(`no database: ${name}`);
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
    if (!name) throw new Error('no name');
    const result = await this.request({
      uuid: this.getAttr('uuid'),
      action: 'rpc',
      name: name,
      params: params
    });
    if (result.errorMessage) throw new Error(result.errorMessage);
    return result;
  }

  emitResult(result, source = null) {
    console.log('Application.emitResult', result, source);
    const promises = [];

    for (const database in result) {
      promises.push(...this.getDatabase(database).emitResult(result[database], source));
    } // console.log('promises:', promises);


    return Promise.allSettled(promises);
  }

  getNodeEnv() {
    return this.data.nodeEnv;
  }

  isDevelopment() {
    return this.getNodeEnv() === 'development';
  }

}
window.Application = Application;

/***/ }),

/***/ "./src/frontend/viewer/Model/Column/Column.js":
/*!****************************************************!*\
  !*** ./src/frontend/viewer/Model/Column/Column.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Column": () => (/* binding */ Column)
/* harmony export */ });
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model */ "./src/frontend/viewer/Model/Model.js");

class Column extends _Model__WEBPACK_IMPORTED_MODULE_0__.Model {
  constructor(data, parent) {
    super(data, parent);
    if (!this.getAttr('type')) throw new Error(`column ${this.getFullName()}: no type`);

    if (!['string', 'number', 'boolean', 'object', 'date'].includes(this.getAttr('type'))) {
      throw new Error(`${this.getFullName()}: wrong column type: ${this.getAttr('type')}`);
    }
  }

  init() {// console.log('Column.init', this.getFullName());
  }

  getType() {
    return this.getAttr('type');
  }

}
window.Column = Column;

/***/ }),

/***/ "./src/frontend/viewer/Model/DataSource/DataSource.js":
/*!************************************************************!*\
  !*** ./src/frontend/viewer/Model/DataSource/DataSource.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataSource": () => (/* binding */ DataSource)
/* harmony export */ });
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model */ "./src/frontend/viewer/Model/Model.js");

class DataSource extends _Model__WEBPACK_IMPORTED_MODULE_0__.Model {
  constructor(data, parent) {
    super(data, parent);
    this.rows = null;
    this.rowsByKey = null; // for row search by key

    this.news = []; // new rows

    this.changes = new Map();
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
    } // console.log('this.rowsByKey:', this.getFullName(), this.rowsByKey);

  } // deinit() {
  //     console.log('DataSource.deinit', this.getFullName());
  //     super.deinit();
  // }


  getType(column) {
    // console.log('DataSource.getType', this.getClassName(), column);
    throw new Error('DataSource column type not implemented');
  }

  discardRowColumn(row, column) {
    if (this.changes.has(row) && this.changes.get(row)[column] !== undefined) {
      delete this.changes.get(row)[column];
    }
  }

  changeRowColumn(row, column, newValue) {
    if (!this.changes.has(row)) this.changes.set(row, {});
    this.changes.get(row)[column] = newValue;
  }

  setValue(row, column, value) {
    // console.log('DataSource.setValue', this.getFullName(), column, value, typeof value);
    if (value === undefined) throw new Error(`${this.getFullName()}: undefined is wrong value for data source`);

    if (typeof value === 'object' && value !== null) {
      throw new Error(`setValue: ${this.getFullName()}.${column}: object must be in JSON format`);
    }

    if (row[column] !== value) {
      this.changeRowColumn(row, column, value);

      if (row[column] === undefined && value === null) {
        // workaround for new rows
        this.discardRowColumn(row, column);
      }
    } else {
      this.discardRowColumn(row, column);
    }

    if (this.changes.has(row) && !Object.keys(this.changes.get(row)).length) this.changes.delete(row); // console.log('changes:', this.changes);
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
    } else {
      value = row[column];
    }

    if (value !== undefined && typeof value !== 'string') {
      throw new Error(`getValue: ${this.getFullName()}.${column}: object must be in JSON format, value: ${value}`);
    } // console.log('DataSource.getValue:', value);


    return value;
  }

  getKeyValues(row) {
    return this.data.keyColumns.reduce((key, column) => {
      key[column] = JSON.parse(row[column]);
      return key;
    }, {});
  }

  getRowKey(row) {
    // console.log('DataSource.getRowKey', row);
    const arr = [];

    for (const column of this.data.keyColumns) {
      if (row[column] === undefined) return null;
      if (row[column] === null) throw new Error('wrong value null for data source value');

      try {
        const value = JSON.parse(row[column]);
        arr.push(value);
      } catch (err) {
        console.log('getRowKey: cannot parse: ', row[column]);
        throw err;
      }
    }

    return JSON.stringify(arr);
  }

  removeRow(key) {
    const row = this.getRow(key);
    if (!row) throw new Error(`${this.getFullName()}: no row with key ${key} to remove`);
    const i = this.rows.indexOf(row);
    if (i === -1) throw new Error(`${this.getFullName()}: no row with i ${i} to remove`);
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
    if (this.news[0]) return this.news[0];
    const row = this.rows[0];
    if (!row) throw new Error('no single row');
    if (withChanges) return this.getRowWithChanges(row);
    return row;
  }

  getForm() {
    return this.parent instanceof Form ? this.parent : null;
  }

  getPage() {
    if (this.parent instanceof Page) return this.parent;
    if (this.parent instanceof Form) return this.parent.getPage();
    return null;
  }

  getApp() {
    if (this.parent instanceof Application) return this.parent;
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
    if (!this.isChanged()) throw new Error(`no changes in data source ${this.getFullName()}`);
    this.changes.clear();
  }

  static keyToParams(key, paramName = 'key') {
    if (typeof key !== 'string') throw new Error('key not string');
    const params = {};
    const arr = JSON.parse(key);

    if (arr.length === 1) {
      params[paramName] = arr[0];
    } else if (arr.length > 1) {
      for (let i = 0; i < arr.length; i++) {
        params[`${paramName}${i + 1}`] = arr[i];
      }
    } else {
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
      return { ...row,
        ...this.changes.get(row)
      };
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
    if (!key) throw new Error('no key');
    const row = this.getRow(key);
    if (!row) throw new Error(`${this.getFullName()}: no row with key ${key}`);
    const newKey = this.getRowKey(newValues);
    DataSource.copyNewValues(row, newValues); // copy new values to original row object

    if (key !== newKey) {
      delete this.rowsByKey[key];
      this.rowsByKey[newKey] = row;
    } // console.log(`key: ${key} to ${newKey}`);
    // console.log('this.rowsByKey:', this.rowsByKey);
    // console.log('this.data.rows:', this.data.rows);

  }

  getTable() {
    if (!this.getAttr('table')) throw new Error(`${this.getFullName()}: table attr empty`);
    return this.getDatabase().getTable(this.getAttr('table'));
  }

  getDatabase() {
    // console.log('DataSource.getDatabase', this.getFullName(), this.getAttr('database'));
    if (!this.getAttr('database')) throw new Error(`${this.getFullName()}: database attr empty`);
    return this.getApp().getDatabase(this.getAttr('database'));
  }

  getType(columnName) {
    // console.log('DataSource.getType', columnName);
    const type = this.getTable().getColumn(columnName).getType(); // console.log('type:', type);

    return type;
  }

  async insert() {
    console.log('DataSource.insert', this.news);
    if (!this.news.length) throw new Error('no new rows to insert');
    const inserts = [];

    for (const row of this.news) {
      const newValues = this.getRowWithChanges(row); // console.log('newValues:', newValues);

      DataSource.copyNewValues(row, newValues); // console.log('row:', row);

      const key = this.getRowKey(row);
      if (!key) throw new Error('invalid insert row, no key'); // console.log('key:', key);

      inserts.push(key);
    }

    this.changes.clear();

    for (const row of this.news) {
      this.addRow(row);
    }

    this.news = [];
    console.log('rows:', this.getRows());
    console.log('inserts:', inserts); // events

    if (this.parent.onDataSourceInsert) {
      this.parent.onDataSourceInsert({
        source: this,
        inserts
      });
    }

    this.emit('insert', {
      source: this,
      inserts
    });
    const database = this.getAttr('database');
    const table = this.getAttr('table');

    if (database && table) {
      const result = {
        [database]: {
          [table]: {
            insert: inserts
          }
        }
      };
      await this.getApp().emitResult(result, this);
      return result;
    }

    return null;
  }

  async delete(key) {
    console.log('DataSource.delete', key);
    if (!key) throw new Error('no key');
    this.removeRow(key); // events

    const deletes = [key];

    if (this.parent.onDataSourceDelete) {
      this.parent.onDataSourceDelete({
        source: this,
        deletes
      });
    }

    this.emit('delete', {
      source: this,
      deletes
    });
    const database = this.getAttr('database');
    const table = this.getAttr('table');

    if (database && table) {
      const result = {
        [database]: {
          [table]: {
            delete: deletes
          }
        }
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

    if (!this.changes.size) throw new Error(`no changes: ${this.getFullName()}`);
    const changes = this.getChangesByKey(); // console.log('changes:', changes);
    // apply changes to rows

    const updates = {};

    for (const key in changes) {
      // console.log('key:', key);
      const row = this.getRow(key); // console.log('row:', row);

      const newValues = this.getRowWithChanges(row); // console.log('newValues:', newValues);

      const newKey = this.getRowKey(newValues); // console.log('newKey:', newKey);

      this.updateRow(key, newValues);
      updates[key] = newKey;
    }

    this.changes.clear(); // events

    if (this.parent.onDataSourceUpdate) {
      this.parent.onDataSourceUpdate({
        source: this,
        updates
      });
    }

    this.emit('update', {
      source: this,
      updates
    });
    const database = this.getAttr('database');
    const table = this.getAttr('table');

    if (database && table) {
      const reuslt = {
        [database]: {
          [table]: {
            update: updates
          }
        }
      };
      await this.getApp().emitResult(reuslt, this);
      return reuslt;
    }

    return null;
  }

  onTableInsert = async e => {
    if (this.deinited) throw new Error(`${this.getFullName()}: this data source deinited for onTableUpdate`);

    if (e.source === this) {
      // console.error('onTableInsert stop self insert', this.getFullName());
      return;
    }

    console.log('DataSource.onTableInsert', this.getFullName(), e);
    if (!e.inserts.length) throw new Error(`${this.getFullName()}: no inserts`);

    for (const key of e.inserts) {
      if (this.getRow(key)) {
        console.log('rows:', this.rows);
        console.log('rowsByKey:', this.rowsByKey);
        throw new Error(`${this.getFullName()}: row already in this data source: ${key}`);
      }

      const newValues = e.source.getRow(key);
      const newRow = {};
      DataSource.copyNewValues(newRow, newValues); // console.log('newRow:', newRow);

      this.addRow(newRow);
    } // events


    if (this.parent.onDataSourceInsert) {
      this.parent.onDataSourceInsert(e);
    }

    this.emit('insert', e);
  };
  onTableUpdate = async e => {
    if (this.deinited) throw new Error(`${this.getFullName()}: this data source deinited for onTableUpdate`);

    if (e.source === this) {
      // console.error('onTableUpdate stop self update', this.getFullName());
      return;
    }

    console.log('DataSource.onTableUpdate', this.getFullName(), e);
    if (!Object.keys(e.updates).length) throw new Error(`${this.getFullName()}: no updates`);

    for (const key in e.updates) {
      if (this.getRow(key)) {
        const newKey = e.updates[key];
        const sourceRow = e.source.getRow(newKey);
        this.updateRow(key, sourceRow);
      }
    } // events


    if (this.parent.onDataSourceUpdate) {
      this.parent.onDataSourceUpdate(e);
    }

    this.emit('update', e);
  };
  onTableDelete = async e => {
    if (this.deinited) throw new Error(`${this.getFullName()}: this data source deinited for onTableDelete`);

    if (e.source === this) {
      // console.error('onTableDelete stop self update', this.getFullName());
      return;
    }

    console.log('DataSource.onTableDelete', this.getFullName(), e);
    if (!e.deletes.length) throw new Error(`${this.getFullName()}: no deletes`);

    for (const key of e.deletes) {
      if (this.getRow(key)) {
        this.removeRow(key);
      }
    } // events


    if (this.parent.onDataSourceDelete) {
      this.parent.onDataSourceDelete(e);
    }

    this.emit('delete', e);
  };
  onTableRefresh = async e => {
    throw new Error('DataSource.onTableRefresh: not implemented');
  };

  isSurrogate() {
    return this.isAttr('database');
  }

  moveRow(row, offset) {
    console.log('DataSource.moveRow');
    Helper.moveArrItem(this.rows, row, offset); // refresh event

    const event = {
      source: this
    };

    if (this.parent.onDataSourceRefresh) {
      this.parent.onDataSourceRefresh(event);
    }

    this.emit('refresh', event);
  }

}
window.DataSource = DataSource;

/***/ }),

/***/ "./src/frontend/viewer/Model/DataSource/SqlDataSource/SqlDataSource.js":
/*!*****************************************************************************!*\
  !*** ./src/frontend/viewer/Model/DataSource/SqlDataSource/SqlDataSource.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SqlDataSource": () => (/* binding */ SqlDataSource)
/* harmony export */ });
/* harmony import */ var _DataSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DataSource */ "./src/frontend/viewer/Model/DataSource/DataSource.js");

class SqlDataSource extends _DataSource__WEBPACK_IMPORTED_MODULE_0__.DataSource {
  constructor(data, parent) {
    super(data, parent);
    this.frame = 1;
    this.count = data.count !== undefined ? data.count : null;
    this.lastFrame = 1;
  }
  /*init() {
      super.init();
  }*/

  /*deinit() {
      super.deinit();
  }*/


  async insert(row) {
    console.log('SqlDataSource.insert', row);
    const database = this.getAttr('database');
    const table = this.getAttr('table');
    if (table === '') throw new Error('no data source table to insert');
    const result = await this.getApp().request({
      uuid: this.getApp().getAttr('uuid'),
      action: 'insert',
      page: this.getForm().getPage().getName(),
      form: this.getForm().getName(),
      row: this.getRowWithChanges(row)
    }); // key & values

    const [key] = Object.keys(result[database][table].insertEx);
    if (!key) throw new Error('no inserted row key');
    const values = result[database][table].insertEx[key];

    for (const column in values) {
      row[column] = values[column];
    } // console.log('key:', key);
    // console.log('row:', row);
    // clear news & changes


    this.news.splice(this.news.indexOf(row), 1); // console.log('this.news:', this.news);

    this.changes.clear(); // add new row to rows

    this.addRow(row); // events

    const event = {
      source: this,
      inserts: result[database][table].insert
    };

    if (this.parent.onDataSourceInsert) {
      this.parent.onDataSourceInsert(event);
    }

    this.emit('insert', event);
    await this.getApp().emitResult(result, this);
    return result;
  }

  async update() {
    console.log('SqlDataSource.update', this.getFullName());
    const database = this.getAttr('database');
    const table = this.getAttr('table');
    if (table === '') throw new Error('no data source table to update');

    if (this.news[0]) {
      return await this.insert(this.news[0]);
    }

    if (!this.changes.size) throw new Error(`no changes: ${this.getFullName()}`); // specific to SqlDataSource

    const result = await this.getApp().request({
      uuid: this.getApp().getAttr('uuid'),
      action: 'update',
      page: this.getForm().getPage().getName(),
      form: this.getForm().getName(),
      changes: this.getChangesByKey()
    });
    const [key] = Object.keys(result[database][table].updateEx);
    if (!key) throw new Error('no updated row');
    const newValues = result[database][table].updateEx[key]; // const newKey = this.getRowKey(newValues);

    this.changes.clear();
    this.updateRow(key, newValues); // events

    const event = {
      source: this,
      updates: result[database][table].update
    };

    if (this.parent.onDataSourceUpdate) {
      this.parent.onDataSourceUpdate(event);
    }

    this.emit('update', event);
    await this.getApp().emitResult(result, this);
    return result;
  }

  async delete(key) {
    console.log('SqlDataSource.delete:', this.getFullName(), key);
    if (!key) throw new Error('no key');
    const database = this.getAttr('database');
    const table = this.getAttr('table');

    if (!table) {
      throw new Error(`no table in SqlDataSource: ${this.getFullName()}`);
    }

    const result = await this.getApp().request({
      uuid: this.getApp().getAttr('uuid'),
      action: '_delete',
      page: this.getForm().getPage().getName(),
      form: this.getForm().getName(),
      params: {
        key
      }
    });
    await this.refill(); // events

    const event = {
      source: this,
      deletes: result[database][table].delete
    };

    if (this.parent.onDataSourceDelete) {
      this.parent.onDataSourceDelete(event);
    }

    this.emit('delete', event);
    await this.getApp().emitResult(result, this);
    return result;
  }

  onTableUpdate = async e => {
    console.log('SqlDataSource.onTableUpdate', this.getFullName(), e);
    if (this.deinited) throw new Error(`${this.getFullName()}: this data source deinited for onTableUpdate`);

    if (e.source === this) {
      // console.error('onTableUpdate stop self update', this.getFullName());
      return;
    } // console.log('updates:', e.updates);


    if (!Object.keys(e.updates).length) throw new Error(`${this.getFullName()}: no updates`); // update rows

    await this.refill(); // events

    if (this.parent.onDataSourceUpdate) {
      this.parent.onDataSourceUpdate(e);
    }

    this.emit('update', e);
  };
  onTableInsert = async e => {
    console.log('SqlDataSource.onTableInsert', this.getFullName(), e);
    if (this.deinited) throw new Error(`${this.getFullName()}: this data source deinited for onTableInsert`);

    if (e.source === this) {
      // console.error('onTableInsert stop self insert', this.getFullName());
      return;
    } // update rows


    await this.refill(); // events

    if (this.parent.onDataSourceInsert) {
      this.parent.onDataSourceInsert(e);
    }

    this.emit('insert', e);
  };
  onTableDelete = async e => {
    console.log('SqlDataSource.onTableDelete', this.getFullName(), e);
    if (this.deinited) throw new Error(`${this.getFullName()}: this data source deinited for onTableDelete`);

    if (e.source === this) {
      // console.error('onTableDelete stop self delete', this.getFullName());
      return;
    }

    await this.refill();

    if (this.parent.onDataSourceDelete) {
      this.parent.onDataSourceDelete(e);
    }

    this.emit('delete', e);
  };
  onTableRefresh = async e => {
    console.log('SqlDataSource.onTableRefresh', this.getFullName(), e);
    if (this.deinited) throw new Error(`${this.getFullName()}: this data source deinited for onTableDelete`);
    if (e.source) throw new Error('refresh is foreign result so source must be null');
    await this.refill();

    if (this.parent.onDataSourceRefresh) {
      this.parent.onDataSourceRefresh(e);
    }

    this.emit('refresh', e);
  };

  getPageParams() {
    const page = this.getPage();
    return page ? page.getParams() : {};
  }

  async refresh() {
    console.log('SqlDataSource.refresh', this.getFullName());
    await this.refill();

    if (this.parent.onDataSourceRefresh) {
      this.parent.onDataSourceRefresh({
        source: this
      });
    }
  }

  async refill() {
    console.log('SqlDataSource.refill', this.getFullName());
    if (this.isChanged()) throw new Error(`cannot refill changed data source: ${this.getFullName()}`);
    const data = await this.select(this.getLimit() ? {
      frame: this.frame
    } : {});
    this.count = data.count;
    this.setRows(data.rows);
    this.lastFrame = 1;
  }

  async fill(frame) {
    if (this.isChanged()) throw new Error(`cannot fill changed data source: ${this.getFullName()}`);
    const data = await this.select(this.getLimit() ? {
      frame
    } : {});
    this.count = data.count;
    this.addRows(data.rows);
  }

  async more() {
    if (!this.hasMore()) throw new Error(`${this.getFullName()}: no more rows`);
    this.lastFrame++;
    await this.fill(this.lastFrame);
  }

  async select(params = {}) {
    console.log('SqlDataSource.select', this.getFullName(), params);
    const page = this.getPage();
    const form = this.getForm();
    const data = await this.getApp().request({
      action: 'select',
      page: page ? page.getName() : null,
      form: form ? form.getName() : null,
      ds: this.getName(),
      params: { ...this.getPageParams(),
        ...params
      }
    });
    if (!(data.rows instanceof Array)) throw new Error('rows must be array'); // if (data.time) console.log(`select time of ${this.getFullName()}:`, data.time);

    return data;
  }
  /*async selectSingle(params = {}) {
      console.log('SqlDataSource.selectSingle', this.getFullName(), params);
      const page = this.getPage();
      const form = this.getForm();
      const data = await this.getApp().request({
          action: 'selectSingle',
          page  : page ? page.getName()           : null,
          form  : form ? form.getName()           : null,
          ds    : this.getName(),
          params: {
              ...this.getPageParams(),
              ...params,
          }
      });
      if (!data.row) throw new Error('selectSingle must return row');
      // if (data.time) console.log(`select time of ${this.getFullName()}:`, data.time);
      return data;
  }*/


  getFramesCount() {
    if (this.count === null) throw new Error(`${this.getFullName()}: no count info`);
    if (this.count === 0) return 1;
    if (this.getLimit()) return Math.ceil(this.count / this.getLimit());
    return 1;
  }

  getLimit() {
    if (this.getAttr('limit')) return parseInt(this.getAttr('limit'));
    return null;
  }

  getCount() {
    if (this.count === null) throw new Error(`${this.getFullName()}: no count info`);
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

  hasMore() {
    return this.lastFrame < this.getFramesCount();
  }

}
window.SqlDataSource = SqlDataSource;

/***/ }),

/***/ "./src/frontend/viewer/Model/Database/Database.js":
/*!********************************************************!*\
  !*** ./src/frontend/viewer/Model/Database/Database.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Database": () => (/* binding */ Database)
/* harmony export */ });
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model */ "./src/frontend/viewer/Model/Model.js");
/* harmony import */ var _Table_Table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Table/Table */ "./src/frontend/viewer/Model/Table/Table.js");


class Database extends _Model__WEBPACK_IMPORTED_MODULE_0__.Model {
  constructor(...args) {
    super(...args);
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
    const table = this.tables.find(table => table.getName() === name);
    if (!table) throw new Error(`${this.getFullName()}: no table with name: ${name}`);
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
window.Database = Database;

/***/ }),

/***/ "./src/frontend/viewer/Model/Field/ComboBoxField/ComboBoxField.js":
/*!************************************************************************!*\
  !*** ./src/frontend/viewer/Model/Field/ComboBoxField/ComboBoxField.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComboBoxField": () => (/* binding */ ComboBoxField)
/* harmony export */ });
/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Field */ "./src/frontend/viewer/Model/Field/Field.js");

class ComboBoxField extends _Field__WEBPACK_IMPORTED_MODULE_0__.Field {
  getDisplayValue(row) {
    let value = null;

    if (row[this.data.displayColumn]) {
      try {
        value = Helper.decodeValue(row[this.data.displayColumn]);
      } catch (err) {
        console.log('cannot parse:', row[this.data.displayColumn]);
        throw err;
      }
    } else {
      value = this.data.displayColumn;
      value = value.replace(/\{([\w\.]+)\}/g, (text, name) => {
        return row.hasOwnProperty(name) ? row[name] || '' : text;
      });
    }

    return value;
  }

  getValueValue(row) {
    if (!row[this.data.valueColumn]) {
      throw new Error('no valueColumn in ComboBox data source');
    }

    return Helper.decodeValue(row[this.data.valueColumn]);
  }

  getComboBoxDataSource() {
    const name = this.data.dataSourceName;
    if (!name) throw new Error(`${this.getFullName()}: no dataSourceName`);

    if (this.getForm().getDataSource(name)) {
      return this.getForm().getDataSource(name);
    }

    if (this.getPage().getDataSource(name)) {
      return this.getPage().getDataSource(name);
    }

    if (this.getApp().getDataSource(name)) {
      return this.getApp().getDataSource(name);
    }

    throw new Error(`${this.getFullName()}: no data source: ${name}`);
  }

  findRowByRawValue(rawValue) {
    return this.getComboBoxDataSource().getRows().find(row => row[this.data.valueColumn] === rawValue);
  }

}
window.ComboBoxField = ComboBoxField;

/***/ }),

/***/ "./src/frontend/viewer/Model/Field/DateField/DateField.js":
/*!****************************************************************!*\
  !*** ./src/frontend/viewer/Model/Field/DateField/DateField.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DateField": () => (/* binding */ DateField)
/* harmony export */ });
/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Field */ "./src/frontend/viewer/Model/Field/Field.js");

class DateField extends _Field__WEBPACK_IMPORTED_MODULE_0__.Field {
  getFormat() {
    return this.getAttr('format');
  }

  rawToValue(raw) {
    // console.log('DateField.rawToValue', this.getFullName(), raw);
    const value = Helper.decodeValue(raw);

    if (value && this.getAttr('timezone') === 'false') {
      Helper.addTimezoneOffset(value);
    } // console.log('DateField.rawToValue:', raw, value);


    return value;
  }

  valueToRaw(value) {
    let rawValue;

    if (value && this.getAttr('timezone') === 'false') {
      const v = Helper.cloneDate(value);
      Helper.removeTimezoneOffset(v);
      rawValue = Helper.encodeValue(v);
    } else {
      rawValue = Helper.encodeValue(value);
    } // console.log('DateField.valueToRaw', rawValue);


    return rawValue;
  }

}
window.DateField = DateField;

/***/ }),

/***/ "./src/frontend/viewer/Model/Field/Field.js":
/*!**************************************************!*\
  !*** ./src/frontend/viewer/Model/Field/Field.js ***!
  \**************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Field": () => (/* binding */ Field)
/* harmony export */ });
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model */ "./src/frontend/viewer/Model/Model.js");
/* module decorator */ module = __webpack_require__.hmd(module);

class Field extends _Model__WEBPACK_IMPORTED_MODULE_0__.Model {
  // constructor(data, parent) {
  //     super(data, parent);
  // }
  init() {}

  replaceThis(value) {
    return value.replace(/\{([@\w\.]+)\}/g, (text, name) => {
      if (name.indexOf('.') === -1) return text;
      let arr = name.split('.');
      if (arr[0] === 'this') arr[0] = this.getPage().getName();
      return `{${arr.join('.')}}`;
    });
  }

  fillDefaultValue(row) {
    // console.log('Field.fillDefaultValue', this.getFullName());
    const column = this.getAttr('column');
    if (!column) return;
    const defaultValue = this.replaceThis(this.getAttr('defaultValue'));
    const js = Helper.templateToJsString(defaultValue, this.getPage().getParams());
    if (typeof js !== 'string') throw new Error(`${this.getFullName()}: defaultValue must be templated to js string`); // console.log('js', this.getFullName(), js);

    module.Helper;

    try {
      const value = eval(js);

      if (value !== undefined) {
        row[column] = this.valueToRaw(value);
      }
    } catch (err) {
      throw new Error(`[${this.getFullName()}] fillDefaultValue: ${err.toString()}`);
    }
  }

  valueToPageParams(row) {
    // console.log('Field.valueToPageParams', this.getFullName());
    if (this.isParam()) {
      // we need to dump value to param without meta info such as timezone prop
      const value = this.getValue(row);
      const rawValue = this.valueToRaw(value); // console.log('value:', value);
      // console.log('rawValue:', rawValue);

      const paramValue = rawValue !== undefined ? Helper.decodeValue(rawValue) : undefined;
      this.getPage().setParam(this.getFullName(), paramValue);
    }
  }

  isChanged(row) {
    // console.log('Field.isChanged', this.getFullName());
    if (!this.getAttr('column')) throw new Error(`${this.getFullName()}: field has no column`);
    return this.getDefaultDataSource().isRowColumnChanged(row, this.getAttr('column'));
  }

  hasColumn() {
    return !!this.getAttr('column');
  }

  getValue(row) {
    // console.log('Field.getValue', this.getFullName(), row);
    if (!row && this.parent instanceof RowForm) {
      row = this.parent.getRow();
    }

    if (!row) {
      throw new Error(`${this.getFullName()}: need row`);
    }

    let rawValue;

    if (this.getAttr('column')) {
      rawValue = this.getRawValue(row);
    } else if (this.getAttr('value')) {
      const js = this.getAttr('value');

      try {
        rawValue = eval(js);
      } catch (err) {
        console.error(err);
        throw new Error(`${this.getFullName()}: value eval error: ${err.message}`);
      }
    } else {
      throw new Error(`${this.getFullName()}: no column and no value in field`);
    } // use rawValue


    if (rawValue === undefined) return undefined;
    if (rawValue === null) throw new Error(`[${this.getFullName()}]: null is wrong raw value`);

    try {
      return this.rawToValue(rawValue);
    } catch (err) {
      console.log('raw value decode error:', this.getFullName(), rawValue);
      throw err;
    }
  }

  setValue(row, value) {
    // console.log('Field.setValue', this.getFullName(), value);
    if (!this.getAttr('column')) throw new Error(`field has no column: ${this.getFullName()}`);
    const rawValue = this.valueToRaw(value);
    this.getForm().getDefaultDataSource().setValue(row, this.getAttr('column'), rawValue);
    this.valueToPageParams(row);
  }

  rawToValue(rawValue) {
    return Helper.decodeValue(rawValue);
  }

  valueToRaw(value) {
    return Helper.encodeValue(value);
  }

  getRawValue(row) {
    if (!this.hasColumn()) throw new Error(`${this.getFullName()}: no column`);
    return this.getForm().getDefaultDataSource().getValue(row, this.getAttr('column'));
  }

  getDefaultDataSource() {
    return this.getForm().getDefaultDataSource();
  }

  getType() {
    if (this.getAttr('type')) {
      return this.getAttr('type');
    }

    if (this.getAttr('column')) {
      const dataSource = this.getDefaultDataSource();

      if (dataSource.isSurrogate()) {
        return dataSource.getType(this.getAttr('column'));
      }

      throw new Error('field type empty');
    }

    throw new Error('field type and column empty');
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

  isReadOnly() {
    return this.data.readOnly === 'true';
  }

  isNotNull() {
    return this.data.notNull === 'true';
  }

  isNullable() {
    return this.data.notNull === 'false';
  }

  getWidth() {
    const width = parseInt(this.data.width);
    if (isNaN(width)) return null;
    if (width === 0) return 100;
    return width;
  }

  getFullName() {
    return `${this.getPage().getName()}.${this.getForm().getName()}.${this.getName()}`;
  }

  isParam() {
    return this.data.param === 'true';
  }

  validateOnChange() {
    if (this.data.validateOnChange !== undefined) {
      return this.data.validateOnChange === 'true';
    }

    return true;
  }

  validateOnBlur() {
    if (this.data.validateOnBlur !== undefined) {
      return this.data.validateOnBlur === 'true';
    }

    return false;
  }

  getCaption() {
    const caption = this.getAttr('caption');

    if (caption === '') {
      const columnName = this.getAttr('column');

      if (columnName && this.parent.hasDefaultSqlDataSource()) {
        const ds = this.parent.getDataSource('default');

        if (ds.getAttr('table')) {
          const column = ds.getTable().getColumn(columnName);
          return column.getCaption();
        }
      }
    }

    return caption;
  }

}
window.Field = Field;

/***/ }),

/***/ "./src/frontend/viewer/Model/Field/TextBoxField/TextBoxField.js":
/*!**********************************************************************!*\
  !*** ./src/frontend/viewer/Model/Field/TextBoxField/TextBoxField.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextBoxField": () => (/* binding */ TextBoxField)
/* harmony export */ });
/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Field */ "./src/frontend/viewer/Model/Field/Field.js");

class TextBoxField extends _Field__WEBPACK_IMPORTED_MODULE_0__.Field {}
window.TextBoxField = TextBoxField;

/***/ }),

/***/ "./src/frontend/viewer/Model/Form/Form.js":
/*!************************************************!*\
  !*** ./src/frontend/viewer/Model/Form/Form.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Form": () => (/* binding */ Form)
/* harmony export */ });
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model */ "./src/frontend/viewer/Model/Model.js");

class Form extends _Model__WEBPACK_IMPORTED_MODULE_0__.Model {
  constructor(data, parent) {
    super(data, parent);
    this.dataSources = [];
    this.fields = [];
  }

  init() {
    // data sources
    this.createDataSources(); // fields

    for (const data of this.data.fields) {
      const Class = FrontHostApp.getClassByName(data.class);
      if (!Class) throw new Error(`no ${data.class} class`);
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
    if (this.getPage().deinited) throw new Error('page already deinited');
    if (!this.isChanged() && !this.getDefaultDataSource().hasNewRows()) throw new Error(`form model not changed or does not have new rows: ${this.getFullName()}`);
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
    if (!name) throw new Error('no name');
    const result = await this.getApp().request({
      uuid: this.getApp().getAttr('uuid'),
      action: 'rpc',
      page: this.getPage().getName(),
      form: this.getName(),
      name: name,
      params: params
    });
    if (result.errorMessage) throw new Error(result.errorMessage);
    return result;
  }

  getKey() {
    return null;
  }

  getDefaultDataSource() {
    const dataSource = this.getDataSource('default');
    if (!dataSource) throw new Error(`${this.getFullName()}: no default data source`);
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
    return this.fields.find(field => field.getName() === name);
  }

  hasDefaultSqlDataSource() {
    return this.getDefaultDataSource().getClassName() === 'SqlDataSource';
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
window.Form = Form;

/***/ }),

/***/ "./src/frontend/viewer/Model/Form/RowForm/RowForm.js":
/*!***********************************************************!*\
  !*** ./src/frontend/viewer/Model/Form/RowForm/RowForm.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RowForm": () => (/* binding */ RowForm)
/* harmony export */ });
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Form */ "./src/frontend/viewer/Model/Form/Form.js");

class RowForm extends _Form__WEBPACK_IMPORTED_MODULE_0__.Form {
  init() {
    super.init();

    if (this.isNewMode()) {
      this.getDefaultDataSource().newRow(this.createRow());
    }

    this.fillParams(this.getRow()); // dump row values to page params
  }

  isNewMode() {
    const newMode = this.getAttr('newMode');
    if (newMode === 'true') return true;
    if (newMode === 'false') return false;
    return this.getPage().isNewMode();
  }

  fillParams(row) {
    for (const field of this.fields) {
      field.valueToPageParams(row);
    }
  }

  onDataSourceUpdate(e) {
    this.fillParams(this.getRow());
    super.onDataSourceUpdate(e);
  }

  onDataSourceInsert(e) {
    this.fillParams(this.getRow());
    super.onDataSourceInsert(e);
  }

  getRow(withChanges) {
    return this.getDefaultDataSource().getSingleRow(withChanges);
  }

  getKey() {
    // console.log('RowForm.getKey', this.getFullName());
    const dataSource = this.getDefaultDataSource();

    if (dataSource.getClassName() === 'SqlDataSource') {
      const row = this.getRow();
      return dataSource.getRowKey(row);
    }

    return null;
  }

  createRow() {
    const row = {};
    this.fillDefaultValues(row);
    return row;
  }

  discard(fields) {
    console.log('RowForm.discard', fields);

    if (this.getDefaultDataSource().isChanged()) {
      this.getDefaultDataSource().discard();
      fields.forEach(name => {
        this.getField(name).valueToPageParams(this.getRow());
      });
    }
  }

}
window.RowForm = RowForm;

/***/ }),

/***/ "./src/frontend/viewer/Model/Form/TableForm/TableForm.js":
/*!***************************************************************!*\
  !*** ./src/frontend/viewer/Model/Form/TableForm/TableForm.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TableForm": () => (/* binding */ TableForm)
/* harmony export */ });
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Form */ "./src/frontend/viewer/Model/Form/Form.js");

class TableForm extends _Form__WEBPACK_IMPORTED_MODULE_0__.Form {}
window.TableForm = TableForm;

/***/ }),

/***/ "./src/frontend/viewer/Model/Model.js":
/*!********************************************!*\
  !*** ./src/frontend/viewer/Model/Model.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Model": () => (/* binding */ Model)
/* harmony export */ });
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EventEmitter */ "./src/frontend/viewer/EventEmitter.js");

class Model extends _EventEmitter__WEBPACK_IMPORTED_MODULE_0__.EventEmitter {
  constructor(data, parent) {
    if (!data.name) throw new Error(`${data.class} no name`);
    super();
    this.data = data;
    this.parent = parent;
    this.deinited = false;
  }

  init() {}

  deinit() {
    if (this.deinited) throw new Error(`${this.getFullName()}: model already deinited`);
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
    return this.dataSources.find(dataSource => dataSource.getName() === name);
  }

  createDataSources() {
    for (const data of this.data.dataSources) {
      try {
        const Class = FrontHostApp.getClassByName(data.class);
        if (!Class) throw new Error(`no ${data.class} class`);
        const dataSource = new Class(data, this);
        dataSource.init();
        this.dataSources.push(dataSource);
      } catch (err) {
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
window.Model = Model;

/***/ }),

/***/ "./src/frontend/viewer/Model/Page/Page.js":
/*!************************************************!*\
  !*** ./src/frontend/viewer/Model/Page/Page.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Page": () => (/* binding */ Page)
/* harmony export */ });
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model */ "./src/frontend/viewer/Model/Model.js");

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
    if (this.deinited) throw new Error(`page ${this.getFullName()} is already deinited`);
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
      const FormClass = FrontHostApp.getClassByName(_Model__WEBPACK_IMPORTED_MODULE_0__.Model.getClassName(data));
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
    return { ...(this.options.params || {}),
      ...this.params
    };
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
      if (form.getClassName() === 'RowForm' && form.hasDefaultSqlDataSource()) {
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
      const keyParams = DataSource.keyToParams(key); // key params to page params

      for (const name in keyParams) {
        this.setParam(name, keyParams[name]);
      }
    }
  }

  async rpc(name, params) {
    // console.log('Page.rpc', this.getFullName(), name, params);
    if (!name) throw new Error('no name');
    const result = await this.getApp().request({
      uuid: this.getApp().getAttr('uuid'),
      action: 'rpc',
      page: this.getName(),
      name: name,
      params: params
    });
    if (result.errorMessage) throw new Error(result.errorMessage);
    return result;
  }

  getForm(name) {
    return this.forms.find(form => form.getName() === name);
  }

  isSelectMode() {
    return !!this.options.selectMode;
  }

}
window.Page = Page;

/***/ }),

/***/ "./src/frontend/viewer/Model/Table/Table.js":
/*!**************************************************!*\
  !*** ./src/frontend/viewer/Model/Table/Table.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Table": () => (/* binding */ Table)
/* harmony export */ });
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model */ "./src/frontend/viewer/Model/Model.js");
/* harmony import */ var _Column_Column__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Column/Column */ "./src/frontend/viewer/Model/Column/Column.js");


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
    const column = this.columns.find(column => column.getName() === name);
    if (!column) throw new Error(`table ${this.getFullName()}: no column ${name}`);
    return column;
  }

  emitResult(result, source = null) {
    console.log('Table.emitResult');
    return [...(result.insert ? [this.emitInsert(source, result.insert)] : []), ...(result.update ? [this.emitUpdate(source, result.update)] : []), ...(result.delete ? [this.emitDelete(source, result.delete)] : []), ...(result.refresh ? [this.emitRefresh(source)] : [])];
  }

  emitInsert(source, inserts) {
    return this.emit('insert', {
      source,
      inserts
    });
  }

  emitUpdate(source, updates) {
    return this.emit('update', {
      source,
      updates
    });
  }

  emitDelete(source, deletes) {
    return this.emit('delete', {
      source,
      deletes
    });
  }

  emitRefresh(source) {
    return this.emit('refresh', {
      source
    });
  }

}
window.Table = Table;

/***/ }),

/***/ "./src/frontend/viewer/ViewerFrontHostApp.js":
/*!***************************************************!*\
  !*** ./src/frontend/viewer/ViewerFrontHostApp.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewerFrontHostApp": () => (/* binding */ ViewerFrontHostApp)
/* harmony export */ });
/* harmony import */ var _Model_Application_Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Model/Application/Application */ "./src/frontend/viewer/Model/Application/Application.js");
/* harmony import */ var _Controller_ModelController_ApplicationController_ApplicationController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Controller/ModelController/ApplicationController/ApplicationController */ "./src/frontend/viewer/Controller/ModelController/ApplicationController/ApplicationController.js");


class ViewerFrontHostApp extends FrontHostApp {
  constructor(options = {}) {
    if (!options.data) throw new Error('no data');
    super();
    this.options = options;
    this.applicationController = null;
  }

  async run() {
    console.log('ViewerFrontHostApp.run', this.getData()); // application

    const application = new _Model_Application_Application__WEBPACK_IMPORTED_MODULE_0__.Application(this.getData());
    application.init(); // applicationController

    const applicationController = this.applicationController = _Controller_ModelController_ApplicationController_ApplicationController__WEBPACK_IMPORTED_MODULE_1__.ApplicationController.create(application, this);
    applicationController.init(); // view

    const rootElementName = `.${applicationController.getViewClass().name}__root`;
    const rootElement = document.querySelector(rootElementName);

    if (!rootElement) {
      throw new Error(`no root element: ${rootElementName}`);
    }

    applicationController.createView(rootElement); // connect

    try {
      await applicationController.connect();
    } catch (err) {
      this.logError(err);
    }
  }

  async onWindowPopState(e) {
    // console.log('ViewerFrontHostApp.onWindowPopState', e.state);
    await this.applicationController.onWindowPopState(e);
  }

  logError(err) {
    console.error('FrontHostApp.logError', err);
    const values = {
      type: 'error',
      source: 'client',
      message: err.message,
      stack: err.stack,
      data: {
        href: window.location.href,
        platformVersion: this.getData().versions.platform,
        appVersion: this.getData().versions.app
      }
    };
    console.log(`POST ${this.getData().logErrorUrl}`, values);
    fetch(this.getData().logErrorUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(values)
    }).catch(err => {
      console.error(err.message);
    });
  }

  getData() {
    if (!this.options.data) throw new Error('no data');
    return this.options.data;
  }

  alert(options) {
    console.log('ViewerFrontHostApp.alert', options);
    return new Promise((resolve, reject) => {
      try {
        const root = document.querySelector('.alert-root');

        if (root.childElementCount === 0) {
          const ctrl = this.alertCtrl = new AlertController({ ...options,
            onClose: result => {
              this.alertCtrl = null;
              ReactDOM.unmountComponentAtNode(root);
              resolve(result);
            }
          }); // console.log('ctrl:', ctrl);

          const view = Helper.createReactComponent(root, ctrl.getViewClass(), {
            ctrl
          }); // console.log('view', view);
        } else {
          reject(new Error('alert already exists'));
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  confirm(options) {
    console.log('ViewerFrontHostApp.confirm', options);
    return new Promise((resolve, reject) => {
      try {
        const root = document.querySelector('.alert-root');

        if (root.childElementCount === 0) {
          const ctrl = this.alertCtrl = new ConfirmController({ ...options,
            onClose: result => {
              this.alertCtrl = null;
              ReactDOM.unmountComponentAtNode(root);
              resolve(result);
            }
          }); // console.log('ctrl:', ctrl);

          const view = Helper.createReactComponent(root, ctrl.getViewClass(), {
            ctrl
          }); // console.log('view', view);
        } else {
          reject(new Error('confirm already exists'));
        }
      } catch (err) {
        reject(err);
      }
    });
  }

}
window.ViewerFrontHostApp = ViewerFrontHostApp;

/***/ }),

/***/ "./node_modules/react/cjs/react-jsx-runtime.development.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react/cjs/react-jsx-runtime.development.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/** @license React v17.0.2
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {
'use strict';

var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var _assign = __webpack_require__(/*! object-assign */ "./node_modules/react/node_modules/object-assign/index.js");

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_ELEMENT_TYPE = 0xeac7;
var REACT_PORTAL_TYPE = 0xeaca;
exports.Fragment = 0xeacb;
var REACT_STRICT_MODE_TYPE = 0xeacc;
var REACT_PROFILER_TYPE = 0xead2;
var REACT_PROVIDER_TYPE = 0xeacd;
var REACT_CONTEXT_TYPE = 0xeace;
var REACT_FORWARD_REF_TYPE = 0xead0;
var REACT_SUSPENSE_TYPE = 0xead1;
var REACT_SUSPENSE_LIST_TYPE = 0xead8;
var REACT_MEMO_TYPE = 0xead3;
var REACT_LAZY_TYPE = 0xead4;
var REACT_BLOCK_TYPE = 0xead9;
var REACT_SERVER_BLOCK_TYPE = 0xeada;
var REACT_FUNDAMENTAL_TYPE = 0xead5;
var REACT_SCOPE_TYPE = 0xead7;
var REACT_OPAQUE_ID_TYPE = 0xeae0;
var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
var REACT_OFFSCREEN_TYPE = 0xeae2;
var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

if (typeof Symbol === 'function' && Symbol.for) {
  var symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor('react.element');
  REACT_PORTAL_TYPE = symbolFor('react.portal');
  exports.Fragment = symbolFor('react.fragment');
  REACT_STRICT_MODE_TYPE = symbolFor('react.strict_mode');
  REACT_PROFILER_TYPE = symbolFor('react.profiler');
  REACT_PROVIDER_TYPE = symbolFor('react.provider');
  REACT_CONTEXT_TYPE = symbolFor('react.context');
  REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
  REACT_SUSPENSE_TYPE = symbolFor('react.suspense');
  REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
  REACT_MEMO_TYPE = symbolFor('react.memo');
  REACT_LAZY_TYPE = symbolFor('react.lazy');
  REACT_BLOCK_TYPE = symbolFor('react.block');
  REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
  REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
  REACT_SCOPE_TYPE = symbolFor('react.scope');
  REACT_OPAQUE_ID_TYPE = symbolFor('react.opaque.id');
  REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
  REACT_OFFSCREEN_TYPE = symbolFor('react.offscreen');
  REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
}

var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }

  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function error(format) {
  {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    printWarning('error', format, args);
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    }

    var argsWithFormat = args.map(function (item) {
      return '' + item;
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

// Filter certain DOM attributes (e.g. src, href) if their values are empty strings.

var enableScopeAPI = false; // Experimental Create Event Handle API.

function isValidElementType(type) {
  if (typeof type === 'string' || typeof type === 'function') {
    return true;
  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


  if (type === exports.Fragment || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI ) {
    return true;
  }

  if (typeof type === 'object' && type !== null) {
    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
      return true;
    }
  }

  return false;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var functionName = innerType.displayName || innerType.name || '';
  return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
}

function getContextName(type) {
  return type.displayName || 'Context';
}

function getComponentName(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  {
    if (typeof type.tag === 'number') {
      error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case exports.Fragment:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case REACT_PROFILER_TYPE:
      return 'Profiler';

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';

    case REACT_SUSPENSE_TYPE:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        var context = type;
        return getContextName(context) + '.Consumer';

      case REACT_PROVIDER_TYPE:
        var provider = type;
        return getContextName(provider._context) + '.Provider';

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        return getComponentName(type.type);

      case REACT_BLOCK_TYPE:
        return getComponentName(type._render);

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            return getComponentName(init(payload));
          } catch (x) {
            return null;
          }
        }
    }
  }

  return null;
}

// Helpers to patch console.logs to avoid logging during side-effect free
// replaying on render function. This currently only patches the object
// lazily which won't cover if the log function was extracted eagerly.
// We could also eagerly patch the method.
var disabledDepth = 0;
var prevLog;
var prevInfo;
var prevWarn;
var prevError;
var prevGroup;
var prevGroupCollapsed;
var prevGroupEnd;

function disabledLog() {}

disabledLog.__reactDisabledLog = true;
function disableLogs() {
  {
    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      prevLog = console.log;
      prevInfo = console.info;
      prevWarn = console.warn;
      prevError = console.error;
      prevGroup = console.group;
      prevGroupCollapsed = console.groupCollapsed;
      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

      var props = {
        configurable: true,
        enumerable: true,
        value: disabledLog,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        info: props,
        log: props,
        warn: props,
        error: props,
        group: props,
        groupCollapsed: props,
        groupEnd: props
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    disabledDepth++;
  }
}
function reenableLogs() {
  {
    disabledDepth--;

    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      var props = {
        configurable: true,
        enumerable: true,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        log: _assign({}, props, {
          value: prevLog
        }),
        info: _assign({}, props, {
          value: prevInfo
        }),
        warn: _assign({}, props, {
          value: prevWarn
        }),
        error: _assign({}, props, {
          value: prevError
        }),
        group: _assign({}, props, {
          value: prevGroup
        }),
        groupCollapsed: _assign({}, props, {
          value: prevGroupCollapsed
        }),
        groupEnd: _assign({}, props, {
          value: prevGroupEnd
        })
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    if (disabledDepth < 0) {
      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
    }
  }
}

var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
var prefix;
function describeBuiltInComponentFrame(name, source, ownerFn) {
  {
    if (prefix === undefined) {
      // Extract the VM specific prefix used by each line.
      try {
        throw Error();
      } catch (x) {
        var match = x.stack.trim().match(/\n( *(at )?)/);
        prefix = match && match[1] || '';
      }
    } // We use the prefix to ensure our stacks line up with native stack frames.


    return '\n' + prefix + name;
  }
}
var reentry = false;
var componentFrameCache;

{
  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
  componentFrameCache = new PossiblyWeakMap();
}

function describeNativeComponentFrame(fn, construct) {
  // If something asked for a stack inside a fake render, it should get ignored.
  if (!fn || reentry) {
    return '';
  }

  {
    var frame = componentFrameCache.get(fn);

    if (frame !== undefined) {
      return frame;
    }
  }

  var control;
  reentry = true;
  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

  Error.prepareStackTrace = undefined;
  var previousDispatcher;

  {
    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
    // for warnings.

    ReactCurrentDispatcher.current = null;
    disableLogs();
  }

  try {
    // This should throw.
    if (construct) {
      // Something should be setting the props in the constructor.
      var Fake = function () {
        throw Error();
      }; // $FlowFixMe


      Object.defineProperty(Fake.prototype, 'props', {
        set: function () {
          // We use a throwing setter instead of frozen or non-writable props
          // because that won't throw in a non-strict mode function.
          throw Error();
        }
      });

      if (typeof Reflect === 'object' && Reflect.construct) {
        // We construct a different control for this case to include any extra
        // frames added by the construct call.
        try {
          Reflect.construct(Fake, []);
        } catch (x) {
          control = x;
        }

        Reflect.construct(fn, [], Fake);
      } else {
        try {
          Fake.call();
        } catch (x) {
          control = x;
        }

        fn.call(Fake.prototype);
      }
    } else {
      try {
        throw Error();
      } catch (x) {
        control = x;
      }

      fn();
    }
  } catch (sample) {
    // This is inlined manually because closure doesn't do it for us.
    if (sample && control && typeof sample.stack === 'string') {
      // This extracts the first frame from the sample that isn't also in the control.
      // Skipping one frame that we assume is the frame that calls the two.
      var sampleLines = sample.stack.split('\n');
      var controlLines = control.stack.split('\n');
      var s = sampleLines.length - 1;
      var c = controlLines.length - 1;

      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
        // We expect at least one stack frame to be shared.
        // Typically this will be the root most one. However, stack frames may be
        // cut off due to maximum stack limits. In this case, one maybe cut off
        // earlier than the other. We assume that the sample is longer or the same
        // and there for cut off earlier. So we should find the root most frame in
        // the sample somewhere in the control.
        c--;
      }

      for (; s >= 1 && c >= 0; s--, c--) {
        // Next we find the first one that isn't the same which should be the
        // frame that called our sample function and the control.
        if (sampleLines[s] !== controlLines[c]) {
          // In V8, the first line is describing the message but other VMs don't.
          // If we're about to return the first line, and the control is also on the same
          // line, that's a pretty good indicator that our sample threw at same line as
          // the control. I.e. before we entered the sample frame. So we ignore this result.
          // This can happen if you passed a class to function component, or non-function.
          if (s !== 1 || c !== 1) {
            do {
              s--;
              c--; // We may still have similar intermediate frames from the construct call.
              // The next one that isn't the same should be our match though.

              if (c < 0 || sampleLines[s] !== controlLines[c]) {
                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at ');

                {
                  if (typeof fn === 'function') {
                    componentFrameCache.set(fn, _frame);
                  }
                } // Return the line we found.


                return _frame;
              }
            } while (s >= 1 && c >= 0);
          }

          break;
        }
      }
    }
  } finally {
    reentry = false;

    {
      ReactCurrentDispatcher.current = previousDispatcher;
      reenableLogs();
    }

    Error.prepareStackTrace = previousPrepareStackTrace;
  } // Fallback to just using the name if we couldn't make it throw.


  var name = fn ? fn.displayName || fn.name : '';
  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

  {
    if (typeof fn === 'function') {
      componentFrameCache.set(fn, syntheticFrame);
    }
  }

  return syntheticFrame;
}
function describeFunctionComponentFrame(fn, source, ownerFn) {
  {
    return describeNativeComponentFrame(fn, false);
  }
}

function shouldConstruct(Component) {
  var prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}

function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

  if (type == null) {
    return '';
  }

  if (typeof type === 'function') {
    {
      return describeNativeComponentFrame(type, shouldConstruct(type));
    }
  }

  if (typeof type === 'string') {
    return describeBuiltInComponentFrame(type);
  }

  switch (type) {
    case REACT_SUSPENSE_TYPE:
      return describeBuiltInComponentFrame('Suspense');

    case REACT_SUSPENSE_LIST_TYPE:
      return describeBuiltInComponentFrame('SuspenseList');
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        return describeFunctionComponentFrame(type.render);

      case REACT_MEMO_TYPE:
        // Memo may contain any component type so we recursively resolve it.
        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

      case REACT_BLOCK_TYPE:
        return describeFunctionComponentFrame(type._render);

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            // Lazy may contain any component type so we recursively resolve it.
            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
          } catch (x) {}
        }
    }
  }

  return '';
}

var loggedTypeFailures = {};
var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame.setExtraStackFrame(null);
    }
  }
}

function checkPropTypes(typeSpecs, values, location, componentName, element) {
  {
    // $FlowFixMe This is okay but Flow doesn't know it.
    var has = Function.call.bind(Object.prototype.hasOwnProperty);

    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
        } catch (ex) {
          error$1 = ex;
        }

        if (error$1 && !(error$1 instanceof Error)) {
          setCurrentlyValidatingElement(element);

          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

          setCurrentlyValidatingElement(null);
        }

        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error$1.message] = true;
          setCurrentlyValidatingElement(element);

          error('Failed %s type: %s', location, error$1.message);

          setCurrentlyValidatingElement(null);
        }
      }
    }
  }
}

var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
var specialPropKeyWarningShown;
var specialPropRefWarningShown;
var didWarnAboutStringRefs;

{
  didWarnAboutStringRefs = {};
}

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.key !== undefined;
}

function warnIfStringRefCannotBeAutoConverted(config, self) {
  {
    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
      var componentName = getComponentName(ReactCurrentOwner.current.type);

      if (!didWarnAboutStringRefs[componentName]) {
        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentName(ReactCurrentOwner.current.type), config.ref);

        didWarnAboutStringRefs[componentName] = true;
      }
    }
  }
}

function defineKeyPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingKey = function () {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;

        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, 'key', {
      get: warnAboutAccessingKey,
      configurable: true
    });
  }
}

function defineRefPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingRef = function () {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;

        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingRef.isReactWarning = true;
    Object.defineProperty(props, 'ref', {
      get: warnAboutAccessingRef,
      configurable: true
    });
  }
}
/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */


var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.

    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    }); // self and source are DEV only properties.

    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    }); // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.

    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};
/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */

function jsxDEV(type, config, maybeKey, source, self) {
  {
    var propName; // Reserved names are extracted

    var props = {};
    var key = null;
    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
    // but as an intermediary step, we will use jsxDEV for everything except
    // <div {...props} key="Hi" />, because we aren't currently able to tell if
    // key is explicitly declared to be undefined or not.

    if (maybeKey !== undefined) {
      key = '' + maybeKey;
    }

    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    if (hasValidRef(config)) {
      ref = config.ref;
      warnIfStringRefCannotBeAutoConverted(config, self);
    } // Remaining properties are added to a new props object


    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    } // Resolve default props


    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;

      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }

    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }

      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }

    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
  }
}

var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement$1(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
    }
  }
}

var propTypesMisspellWarningShown;

{
  propTypesMisspellWarningShown = false;
}
/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */

function isValidElement(object) {
  {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
}

function getDeclarationErrorAddendum() {
  {
    if (ReactCurrentOwner$1.current) {
      var name = getComponentName(ReactCurrentOwner$1.current.type);

      if (name) {
        return '\n\nCheck the render method of `' + name + '`.';
      }
    }

    return '';
  }
}

function getSourceInfoErrorAddendum(source) {
  {
    if (source !== undefined) {
      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
      var lineNumber = source.lineNumber;
      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
    }

    return '';
  }
}
/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */


var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  {
    var info = getDeclarationErrorAddendum();

    if (!info) {
      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

      if (parentName) {
        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
      }
    }

    return info;
  }
}
/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */


function validateExplicitKey(element, parentType) {
  {
    if (!element._store || element._store.validated || element.key != null) {
      return;
    }

    element._store.validated = true;
    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }

    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
    // property, it may be the creator of the child that's responsible for
    // assigning it a key.

    var childOwner = '';

    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
      // Give the component that originally created this child.
      childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
    }

    setCurrentlyValidatingElement$1(element);

    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

    setCurrentlyValidatingElement$1(null);
  }
}
/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */


function validateChildKeys(node, parentType) {
  {
    if (typeof node !== 'object') {
      return;
    }

    if (Array.isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];

        if (isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement(node)) {
      // This element was passed in a valid location.
      if (node._store) {
        node._store.validated = true;
      }
    } else if (node) {
      var iteratorFn = getIteratorFn(node);

      if (typeof iteratorFn === 'function') {
        // Entry iterators used to provide implicit keys,
        // but now we print a separate warning for them later.
        if (iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step;

          while (!(step = iterator.next()).done) {
            if (isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      }
    }
  }
}
/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */


function validatePropTypes(element) {
  {
    var type = element.type;

    if (type === null || type === undefined || typeof type === 'string') {
      return;
    }

    var propTypes;

    if (typeof type === 'function') {
      propTypes = type.propTypes;
    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
    // Inner props are checked in the reconciler.
    type.$$typeof === REACT_MEMO_TYPE)) {
      propTypes = type.propTypes;
    } else {
      return;
    }

    if (propTypes) {
      // Intentionally inside to avoid triggering lazy initializers:
      var name = getComponentName(type);
      checkPropTypes(propTypes, element.props, 'prop', name, element);
    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

      var _name = getComponentName(type);

      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
    }

    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
    }
  }
}
/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */


function validateFragmentProps(fragment) {
  {
    var keys = Object.keys(fragment.props);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== 'children' && key !== 'key') {
        setCurrentlyValidatingElement$1(fragment);

        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

        setCurrentlyValidatingElement$1(null);
        break;
      }
    }

    if (fragment.ref !== null) {
      setCurrentlyValidatingElement$1(fragment);

      error('Invalid attribute `ref` supplied to `React.Fragment`.');

      setCurrentlyValidatingElement$1(null);
    }
  }
}

function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
  {
    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.

    if (!validType) {
      var info = '';

      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
      }

      var sourceInfo = getSourceInfoErrorAddendum(source);

      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      var typeString;

      if (type === null) {
        typeString = 'null';
      } else if (Array.isArray(type)) {
        typeString = 'array';
      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
        typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
        info = ' Did you accidentally export a JSX literal instead of a component?';
      } else {
        typeString = typeof type;
      }

      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    }

    var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.

    if (element == null) {
      return element;
    } // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)


    if (validType) {
      var children = props.children;

      if (children !== undefined) {
        if (isStaticChildren) {
          if (Array.isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              validateChildKeys(children[i], type);
            }

            if (Object.freeze) {
              Object.freeze(children);
            }
          } else {
            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
          }
        } else {
          validateChildKeys(children, type);
        }
      }
    }

    if (type === exports.Fragment) {
      validateFragmentProps(element);
    } else {
      validatePropTypes(element);
    }

    return element;
  }
} // These two functions exist to still get child warnings in dev
// even with the prod transform. This means that jsxDEV is purely
// opt-in behavior for better messages but that we won't stop
// giving you warnings if you use production apis.

function jsxWithValidationStatic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, true);
  }
}
function jsxWithValidationDynamic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, false);
  }
}

var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
// for now we can ship identical prod functions

var jsxs =  jsxWithValidationStatic ;

exports.jsx = jsx;
exports.jsxs = jsxs;
  })();
}


/***/ }),

/***/ "./node_modules/react/cjs/react.development.js":
/*!*****************************************************!*\
  !*** ./node_modules/react/cjs/react.development.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/** @license React v17.0.2
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {
'use strict';

var _assign = __webpack_require__(/*! object-assign */ "./node_modules/react/node_modules/object-assign/index.js");

// TODO: this is special because it gets imported during build.
var ReactVersion = '17.0.2';

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_ELEMENT_TYPE = 0xeac7;
var REACT_PORTAL_TYPE = 0xeaca;
exports.Fragment = 0xeacb;
exports.StrictMode = 0xeacc;
exports.Profiler = 0xead2;
var REACT_PROVIDER_TYPE = 0xeacd;
var REACT_CONTEXT_TYPE = 0xeace;
var REACT_FORWARD_REF_TYPE = 0xead0;
exports.Suspense = 0xead1;
var REACT_SUSPENSE_LIST_TYPE = 0xead8;
var REACT_MEMO_TYPE = 0xead3;
var REACT_LAZY_TYPE = 0xead4;
var REACT_BLOCK_TYPE = 0xead9;
var REACT_SERVER_BLOCK_TYPE = 0xeada;
var REACT_FUNDAMENTAL_TYPE = 0xead5;
var REACT_SCOPE_TYPE = 0xead7;
var REACT_OPAQUE_ID_TYPE = 0xeae0;
var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
var REACT_OFFSCREEN_TYPE = 0xeae2;
var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

if (typeof Symbol === 'function' && Symbol.for) {
  var symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor('react.element');
  REACT_PORTAL_TYPE = symbolFor('react.portal');
  exports.Fragment = symbolFor('react.fragment');
  exports.StrictMode = symbolFor('react.strict_mode');
  exports.Profiler = symbolFor('react.profiler');
  REACT_PROVIDER_TYPE = symbolFor('react.provider');
  REACT_CONTEXT_TYPE = symbolFor('react.context');
  REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
  exports.Suspense = symbolFor('react.suspense');
  REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
  REACT_MEMO_TYPE = symbolFor('react.memo');
  REACT_LAZY_TYPE = symbolFor('react.lazy');
  REACT_BLOCK_TYPE = symbolFor('react.block');
  REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
  REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
  REACT_SCOPE_TYPE = symbolFor('react.scope');
  REACT_OPAQUE_ID_TYPE = symbolFor('react.opaque.id');
  REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
  REACT_OFFSCREEN_TYPE = symbolFor('react.offscreen');
  REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
}

var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }

  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}

/**
 * Keeps track of the current dispatcher.
 */
var ReactCurrentDispatcher = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

/**
 * Keeps track of the current batch's configuration such as how long an update
 * should suspend for if it needs to.
 */
var ReactCurrentBatchConfig = {
  transition: 0
};

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var ReactDebugCurrentFrame = {};
var currentExtraStackFrame = null;
function setExtraStackFrame(stack) {
  {
    currentExtraStackFrame = stack;
  }
}

{
  ReactDebugCurrentFrame.setExtraStackFrame = function (stack) {
    {
      currentExtraStackFrame = stack;
    }
  }; // Stack implementation injected by the current renderer.


  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var stack = ''; // Add an extra top frame while an element is being validated

    if (currentExtraStackFrame) {
      stack += currentExtraStackFrame;
    } // Delegate to the injected renderer-specific implementation


    var impl = ReactDebugCurrentFrame.getCurrentStack;

    if (impl) {
      stack += impl() || '';
    }

    return stack;
  };
}

/**
 * Used by act() to track whether you're inside an act() scope.
 */
var IsSomeRendererActing = {
  current: false
};

var ReactSharedInternals = {
  ReactCurrentDispatcher: ReactCurrentDispatcher,
  ReactCurrentBatchConfig: ReactCurrentBatchConfig,
  ReactCurrentOwner: ReactCurrentOwner,
  IsSomeRendererActing: IsSomeRendererActing,
  // Used by renderers to avoid bundling object-assign twice in UMD bundles:
  assign: _assign
};

{
  ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
}

// by calls to these methods by a Babel plugin.
//
// In PROD (or in packages without access to React internals),
// they are left as they are instead.

function warn(format) {
  {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    printWarning('warn', format, args);
  }
}
function error(format) {
  {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    printWarning('error', format, args);
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    }

    var argsWithFormat = args.map(function (item) {
      return '' + item;
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

var didWarnStateUpdateForUnmountedComponent = {};

function warnNoop(publicInstance, callerName) {
  {
    var _constructor = publicInstance.constructor;
    var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
    var warningKey = componentName + "." + callerName;

    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }

    error("Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);

    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}
/**
 * This is the abstract API for an update queue.
 */


var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

var emptyObject = {};

{
  Object.freeze(emptyObject);
}
/**
 * Base class helpers for the updating state of a component.
 */


function Component(props, context, updater) {
  this.props = props;
  this.context = context; // If a component has string refs, we will assign a different object later.

  this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
  // renderer.

  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};
/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */

Component.prototype.setState = function (partialState, callback) {
  if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {
    {
      throw Error( "setState(...): takes an object of state variables to update or a function which returns an object of state variables." );
    }
  }

  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};
/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */


Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};
/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */


{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };

  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        warn('%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);

        return undefined;
      }
    });
  };

  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

function ComponentDummy() {}

ComponentDummy.prototype = Component.prototype;
/**
 * Convenience component with default shallow equality check for sCU.
 */

function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context; // If a component has string refs, we will assign a different object later.

  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

_assign(pureComponentPrototype, Component.prototype);

pureComponentPrototype.isPureReactComponent = true;

// an immutable object with a single mutable value
function createRef() {
  var refObject = {
    current: null
  };

  {
    Object.seal(refObject);
  }

  return refObject;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var functionName = innerType.displayName || innerType.name || '';
  return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
}

function getContextName(type) {
  return type.displayName || 'Context';
}

function getComponentName(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  {
    if (typeof type.tag === 'number') {
      error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case exports.Fragment:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case exports.Profiler:
      return 'Profiler';

    case exports.StrictMode:
      return 'StrictMode';

    case exports.Suspense:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        var context = type;
        return getContextName(context) + '.Consumer';

      case REACT_PROVIDER_TYPE:
        var provider = type;
        return getContextName(provider._context) + '.Provider';

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        return getComponentName(type.type);

      case REACT_BLOCK_TYPE:
        return getComponentName(type._render);

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            return getComponentName(init(payload));
          } catch (x) {
            return null;
          }
        }
    }
  }

  return null;
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;

{
  didWarnAboutStringRefs = {};
}

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;

        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    }
  };

  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;

        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    }
  };

  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

function warnIfStringRefCannotBeAutoConverted(config) {
  {
    if (typeof config.ref === 'string' && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
      var componentName = getComponentName(ReactCurrentOwner.current.type);

      if (!didWarnAboutStringRefs[componentName]) {
        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);

        didWarnAboutStringRefs[componentName] = true;
      }
    }
  }
}
/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */


var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.

    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    }); // self and source are DEV only properties.

    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    }); // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.

    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};
/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */

function createElement(type, config, children) {
  var propName; // Reserved names are extracted

  var props = {};
  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;

      {
        warnIfStringRefCannotBeAutoConverted(config);
      }
    }

    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  } // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.


  var childrenLength = arguments.length - 2;

  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);

    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }

    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }

    props.children = childArray;
  } // Resolve default props


  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;

    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  {
    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }

      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }
  }

  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}
function cloneAndReplaceKey(oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
  return newElement;
}
/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */

function cloneElement(element, config, children) {
  if (!!(element === null || element === undefined)) {
    {
      throw Error( "React.cloneElement(...): The argument must be a React element, but you passed " + element + "." );
    }
  }

  var propName; // Original props are copied

  var props = _assign({}, element.props); // Reserved names are extracted


  var key = element.key;
  var ref = element.ref; // Self is preserved since the owner is preserved.

  var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.

  var source = element._source; // Owner will be preserved, unless ref is overridden

  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }

    if (hasValidKey(config)) {
      key = '' + config.key;
    } // Remaining properties override existing props


    var defaultProps;

    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }

    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  } // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.


  var childrenLength = arguments.length - 2;

  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);

    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }

    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
}
/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */

function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}

var SEPARATOR = '.';
var SUBSEPARATOR = ':';
/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = key.replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });
  return '$' + escapedString;
}
/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */


var didWarnAboutMaps = false;
var userProvidedKeyEscapeRegex = /\/+/g;

function escapeUserProvidedKey(text) {
  return text.replace(userProvidedKeyEscapeRegex, '$&/');
}
/**
 * Generate a key string that identifies a element within a set.
 *
 * @param {*} element A element that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */


function getElementKey(element, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof element === 'object' && element !== null && element.key != null) {
    // Explicit key
    return escape('' + element.key);
  } // Implicit key determined by the index in the set


  return index.toString(36);
}

function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  var invokeCallback = false;

  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true;
        break;

      case 'object':
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }

    }
  }

  if (invokeCallback) {
    var _child = children;
    var mappedChild = callback(_child); // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows:

    var childKey = nameSoFar === '' ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;

    if (Array.isArray(mappedChild)) {
      var escapedChildKey = '';

      if (childKey != null) {
        escapedChildKey = escapeUserProvidedKey(childKey) + '/';
      }

      mapIntoArray(mappedChild, array, escapedChildKey, '', function (c) {
        return c;
      });
    } else if (mappedChild != null) {
      if (isValidElement(mappedChild)) {
        mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
        // traverseAllChildren used to do for objects as children
        escapedPrefix + ( // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
        mappedChild.key && (!_child || _child.key !== mappedChild.key) ? // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
        escapeUserProvidedKey('' + mappedChild.key) + '/' : '') + childKey);
      }

      array.push(mappedChild);
    }

    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.

  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getElementKey(child, i);
      subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
    }
  } else {
    var iteratorFn = getIteratorFn(children);

    if (typeof iteratorFn === 'function') {
      var iterableChildren = children;

      {
        // Warn about using Maps as children
        if (iteratorFn === iterableChildren.entries) {
          if (!didWarnAboutMaps) {
            warn('Using Maps as children is not supported. ' + 'Use an array of keyed ReactElements instead.');
          }

          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(iterableChildren);
      var step;
      var ii = 0;

      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getElementKey(child, ii++);
        subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
      }
    } else if (type === 'object') {
      var childrenString = '' + children;

      {
        {
          throw Error( "Objects are not valid as a React child (found: " + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + "). If you meant to render a collection of children, use an array instead." );
        }
      }
    }
  }

  return subtreeCount;
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenmap
 *
 * The provided mapFunction(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }

  var result = [];
  var count = 0;
  mapIntoArray(children, result, '', '', function (child) {
    return func.call(context, child, count++);
  });
  return result;
}
/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrencount
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */


function countChildren(children) {
  var n = 0;
  mapChildren(children, function () {
    n++; // Don't return anything
  });
  return n;
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  mapChildren(children, function () {
    forEachFunc.apply(this, arguments); // Don't return anything.
  }, forEachContext);
}
/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
 */


function toArray(children) {
  return mapChildren(children, function (child) {
    return child;
  }) || [];
}
/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenonly
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */


function onlyChild(children) {
  if (!isValidElement(children)) {
    {
      throw Error( "React.Children.only expected to receive a single React element child." );
    }
  }

  return children;
}

function createContext(defaultValue, calculateChangedBits) {
  if (calculateChangedBits === undefined) {
    calculateChangedBits = null;
  } else {
    {
      if (calculateChangedBits !== null && typeof calculateChangedBits !== 'function') {
        error('createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits);
      }
    }
  }

  var context = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    // As a workaround to support multiple concurrent renderers, we categorize
    // some renderers as primary and others as secondary. We only expect
    // there to be two concurrent renderers at most: React Native (primary) and
    // Fabric (secondary); React DOM (primary) and React ART (secondary).
    // Secondary renderers store their context values on separate fields.
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    // Used to track how many concurrent renderers this context currently
    // supports within in a single renderer. Such as parallel server rendering.
    _threadCount: 0,
    // These are circular
    Provider: null,
    Consumer: null
  };
  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context
  };
  var hasWarnedAboutUsingNestedContextConsumers = false;
  var hasWarnedAboutUsingConsumerProvider = false;
  var hasWarnedAboutDisplayNameOnConsumer = false;

  {
    // A separate object, but proxies back to the original context object for
    // backwards compatibility. It has a different $$typeof, so we can properly
    // warn for the incorrect usage of Context as a Consumer.
    var Consumer = {
      $$typeof: REACT_CONTEXT_TYPE,
      _context: context,
      _calculateChangedBits: context._calculateChangedBits
    }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here

    Object.defineProperties(Consumer, {
      Provider: {
        get: function () {
          if (!hasWarnedAboutUsingConsumerProvider) {
            hasWarnedAboutUsingConsumerProvider = true;

            error('Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
          }

          return context.Provider;
        },
        set: function (_Provider) {
          context.Provider = _Provider;
        }
      },
      _currentValue: {
        get: function () {
          return context._currentValue;
        },
        set: function (_currentValue) {
          context._currentValue = _currentValue;
        }
      },
      _currentValue2: {
        get: function () {
          return context._currentValue2;
        },
        set: function (_currentValue2) {
          context._currentValue2 = _currentValue2;
        }
      },
      _threadCount: {
        get: function () {
          return context._threadCount;
        },
        set: function (_threadCount) {
          context._threadCount = _threadCount;
        }
      },
      Consumer: {
        get: function () {
          if (!hasWarnedAboutUsingNestedContextConsumers) {
            hasWarnedAboutUsingNestedContextConsumers = true;

            error('Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
          }

          return context.Consumer;
        }
      },
      displayName: {
        get: function () {
          return context.displayName;
        },
        set: function (displayName) {
          if (!hasWarnedAboutDisplayNameOnConsumer) {
            warn('Setting `displayName` on Context.Consumer has no effect. ' + "You should set it directly on the context with Context.displayName = '%s'.", displayName);

            hasWarnedAboutDisplayNameOnConsumer = true;
          }
        }
      }
    }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty

    context.Consumer = Consumer;
  }

  {
    context._currentRenderer = null;
    context._currentRenderer2 = null;
  }

  return context;
}

var Uninitialized = -1;
var Pending = 0;
var Resolved = 1;
var Rejected = 2;

function lazyInitializer(payload) {
  if (payload._status === Uninitialized) {
    var ctor = payload._result;
    var thenable = ctor(); // Transition to the next state.

    var pending = payload;
    pending._status = Pending;
    pending._result = thenable;
    thenable.then(function (moduleObject) {
      if (payload._status === Pending) {
        var defaultExport = moduleObject.default;

        {
          if (defaultExport === undefined) {
            error('lazy: Expected the result of a dynamic import() call. ' + 'Instead received: %s\n\nYour code should look like: \n  ' + // Break up imports to avoid accidentally parsing them as dependencies.
            'const MyComponent = lazy(() => imp' + "ort('./MyComponent'))", moduleObject);
          }
        } // Transition to the next state.


        var resolved = payload;
        resolved._status = Resolved;
        resolved._result = defaultExport;
      }
    }, function (error) {
      if (payload._status === Pending) {
        // Transition to the next state.
        var rejected = payload;
        rejected._status = Rejected;
        rejected._result = error;
      }
    });
  }

  if (payload._status === Resolved) {
    return payload._result;
  } else {
    throw payload._result;
  }
}

function lazy(ctor) {
  var payload = {
    // We use these fields to store the result.
    _status: -1,
    _result: ctor
  };
  var lazyType = {
    $$typeof: REACT_LAZY_TYPE,
    _payload: payload,
    _init: lazyInitializer
  };

  {
    // In production, this would just set it on the object.
    var defaultProps;
    var propTypes; // $FlowFixMe

    Object.defineProperties(lazyType, {
      defaultProps: {
        configurable: true,
        get: function () {
          return defaultProps;
        },
        set: function (newDefaultProps) {
          error('React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');

          defaultProps = newDefaultProps; // Match production behavior more closely:
          // $FlowFixMe

          Object.defineProperty(lazyType, 'defaultProps', {
            enumerable: true
          });
        }
      },
      propTypes: {
        configurable: true,
        get: function () {
          return propTypes;
        },
        set: function (newPropTypes) {
          error('React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');

          propTypes = newPropTypes; // Match production behavior more closely:
          // $FlowFixMe

          Object.defineProperty(lazyType, 'propTypes', {
            enumerable: true
          });
        }
      }
    });
  }

  return lazyType;
}

function forwardRef(render) {
  {
    if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
      error('forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
    } else if (typeof render !== 'function') {
      error('forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
    } else {
      if (render.length !== 0 && render.length !== 2) {
        error('forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.');
      }
    }

    if (render != null) {
      if (render.defaultProps != null || render.propTypes != null) {
        error('forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?');
      }
    }
  }

  var elementType = {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render: render
  };

  {
    var ownName;
    Object.defineProperty(elementType, 'displayName', {
      enumerable: false,
      configurable: true,
      get: function () {
        return ownName;
      },
      set: function (name) {
        ownName = name;

        if (render.displayName == null) {
          render.displayName = name;
        }
      }
    });
  }

  return elementType;
}

// Filter certain DOM attributes (e.g. src, href) if their values are empty strings.

var enableScopeAPI = false; // Experimental Create Event Handle API.

function isValidElementType(type) {
  if (typeof type === 'string' || typeof type === 'function') {
    return true;
  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


  if (type === exports.Fragment || type === exports.Profiler || type === REACT_DEBUG_TRACING_MODE_TYPE || type === exports.StrictMode || type === exports.Suspense || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI ) {
    return true;
  }

  if (typeof type === 'object' && type !== null) {
    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
      return true;
    }
  }

  return false;
}

function memo(type, compare) {
  {
    if (!isValidElementType(type)) {
      error('memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
    }
  }

  var elementType = {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: compare === undefined ? null : compare
  };

  {
    var ownName;
    Object.defineProperty(elementType, 'displayName', {
      enumerable: false,
      configurable: true,
      get: function () {
        return ownName;
      },
      set: function (name) {
        ownName = name;

        if (type.displayName == null) {
          type.displayName = name;
        }
      }
    });
  }

  return elementType;
}

function resolveDispatcher() {
  var dispatcher = ReactCurrentDispatcher.current;

  if (!(dispatcher !== null)) {
    {
      throw Error( "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem." );
    }
  }

  return dispatcher;
}

function useContext(Context, unstable_observedBits) {
  var dispatcher = resolveDispatcher();

  {
    if (unstable_observedBits !== undefined) {
      error('useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\n\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at https://reactjs.org/link/rules-of-hooks' : '');
    } // TODO: add a more generic warning for invalid values.


    if (Context._context !== undefined) {
      var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs
      // and nobody should be using this in existing code.

      if (realContext.Consumer === Context) {
        error('Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
      } else if (realContext.Provider === Context) {
        error('Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
      }
    }
  }

  return dispatcher.useContext(Context, unstable_observedBits);
}
function useState(initialState) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}
function useReducer(reducer, initialArg, init) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useReducer(reducer, initialArg, init);
}
function useRef(initialValue) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useRef(initialValue);
}
function useEffect(create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useEffect(create, deps);
}
function useLayoutEffect(create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useLayoutEffect(create, deps);
}
function useCallback(callback, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useCallback(callback, deps);
}
function useMemo(create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useMemo(create, deps);
}
function useImperativeHandle(ref, create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useImperativeHandle(ref, create, deps);
}
function useDebugValue(value, formatterFn) {
  {
    var dispatcher = resolveDispatcher();
    return dispatcher.useDebugValue(value, formatterFn);
  }
}

// Helpers to patch console.logs to avoid logging during side-effect free
// replaying on render function. This currently only patches the object
// lazily which won't cover if the log function was extracted eagerly.
// We could also eagerly patch the method.
var disabledDepth = 0;
var prevLog;
var prevInfo;
var prevWarn;
var prevError;
var prevGroup;
var prevGroupCollapsed;
var prevGroupEnd;

function disabledLog() {}

disabledLog.__reactDisabledLog = true;
function disableLogs() {
  {
    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      prevLog = console.log;
      prevInfo = console.info;
      prevWarn = console.warn;
      prevError = console.error;
      prevGroup = console.group;
      prevGroupCollapsed = console.groupCollapsed;
      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

      var props = {
        configurable: true,
        enumerable: true,
        value: disabledLog,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        info: props,
        log: props,
        warn: props,
        error: props,
        group: props,
        groupCollapsed: props,
        groupEnd: props
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    disabledDepth++;
  }
}
function reenableLogs() {
  {
    disabledDepth--;

    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      var props = {
        configurable: true,
        enumerable: true,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        log: _assign({}, props, {
          value: prevLog
        }),
        info: _assign({}, props, {
          value: prevInfo
        }),
        warn: _assign({}, props, {
          value: prevWarn
        }),
        error: _assign({}, props, {
          value: prevError
        }),
        group: _assign({}, props, {
          value: prevGroup
        }),
        groupCollapsed: _assign({}, props, {
          value: prevGroupCollapsed
        }),
        groupEnd: _assign({}, props, {
          value: prevGroupEnd
        })
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    if (disabledDepth < 0) {
      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
    }
  }
}

var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
var prefix;
function describeBuiltInComponentFrame(name, source, ownerFn) {
  {
    if (prefix === undefined) {
      // Extract the VM specific prefix used by each line.
      try {
        throw Error();
      } catch (x) {
        var match = x.stack.trim().match(/\n( *(at )?)/);
        prefix = match && match[1] || '';
      }
    } // We use the prefix to ensure our stacks line up with native stack frames.


    return '\n' + prefix + name;
  }
}
var reentry = false;
var componentFrameCache;

{
  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
  componentFrameCache = new PossiblyWeakMap();
}

function describeNativeComponentFrame(fn, construct) {
  // If something asked for a stack inside a fake render, it should get ignored.
  if (!fn || reentry) {
    return '';
  }

  {
    var frame = componentFrameCache.get(fn);

    if (frame !== undefined) {
      return frame;
    }
  }

  var control;
  reentry = true;
  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

  Error.prepareStackTrace = undefined;
  var previousDispatcher;

  {
    previousDispatcher = ReactCurrentDispatcher$1.current; // Set the dispatcher in DEV because this might be call in the render function
    // for warnings.

    ReactCurrentDispatcher$1.current = null;
    disableLogs();
  }

  try {
    // This should throw.
    if (construct) {
      // Something should be setting the props in the constructor.
      var Fake = function () {
        throw Error();
      }; // $FlowFixMe


      Object.defineProperty(Fake.prototype, 'props', {
        set: function () {
          // We use a throwing setter instead of frozen or non-writable props
          // because that won't throw in a non-strict mode function.
          throw Error();
        }
      });

      if (typeof Reflect === 'object' && Reflect.construct) {
        // We construct a different control for this case to include any extra
        // frames added by the construct call.
        try {
          Reflect.construct(Fake, []);
        } catch (x) {
          control = x;
        }

        Reflect.construct(fn, [], Fake);
      } else {
        try {
          Fake.call();
        } catch (x) {
          control = x;
        }

        fn.call(Fake.prototype);
      }
    } else {
      try {
        throw Error();
      } catch (x) {
        control = x;
      }

      fn();
    }
  } catch (sample) {
    // This is inlined manually because closure doesn't do it for us.
    if (sample && control && typeof sample.stack === 'string') {
      // This extracts the first frame from the sample that isn't also in the control.
      // Skipping one frame that we assume is the frame that calls the two.
      var sampleLines = sample.stack.split('\n');
      var controlLines = control.stack.split('\n');
      var s = sampleLines.length - 1;
      var c = controlLines.length - 1;

      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
        // We expect at least one stack frame to be shared.
        // Typically this will be the root most one. However, stack frames may be
        // cut off due to maximum stack limits. In this case, one maybe cut off
        // earlier than the other. We assume that the sample is longer or the same
        // and there for cut off earlier. So we should find the root most frame in
        // the sample somewhere in the control.
        c--;
      }

      for (; s >= 1 && c >= 0; s--, c--) {
        // Next we find the first one that isn't the same which should be the
        // frame that called our sample function and the control.
        if (sampleLines[s] !== controlLines[c]) {
          // In V8, the first line is describing the message but other VMs don't.
          // If we're about to return the first line, and the control is also on the same
          // line, that's a pretty good indicator that our sample threw at same line as
          // the control. I.e. before we entered the sample frame. So we ignore this result.
          // This can happen if you passed a class to function component, or non-function.
          if (s !== 1 || c !== 1) {
            do {
              s--;
              c--; // We may still have similar intermediate frames from the construct call.
              // The next one that isn't the same should be our match though.

              if (c < 0 || sampleLines[s] !== controlLines[c]) {
                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at ');

                {
                  if (typeof fn === 'function') {
                    componentFrameCache.set(fn, _frame);
                  }
                } // Return the line we found.


                return _frame;
              }
            } while (s >= 1 && c >= 0);
          }

          break;
        }
      }
    }
  } finally {
    reentry = false;

    {
      ReactCurrentDispatcher$1.current = previousDispatcher;
      reenableLogs();
    }

    Error.prepareStackTrace = previousPrepareStackTrace;
  } // Fallback to just using the name if we couldn't make it throw.


  var name = fn ? fn.displayName || fn.name : '';
  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

  {
    if (typeof fn === 'function') {
      componentFrameCache.set(fn, syntheticFrame);
    }
  }

  return syntheticFrame;
}
function describeFunctionComponentFrame(fn, source, ownerFn) {
  {
    return describeNativeComponentFrame(fn, false);
  }
}

function shouldConstruct(Component) {
  var prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}

function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

  if (type == null) {
    return '';
  }

  if (typeof type === 'function') {
    {
      return describeNativeComponentFrame(type, shouldConstruct(type));
    }
  }

  if (typeof type === 'string') {
    return describeBuiltInComponentFrame(type);
  }

  switch (type) {
    case exports.Suspense:
      return describeBuiltInComponentFrame('Suspense');

    case REACT_SUSPENSE_LIST_TYPE:
      return describeBuiltInComponentFrame('SuspenseList');
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        return describeFunctionComponentFrame(type.render);

      case REACT_MEMO_TYPE:
        // Memo may contain any component type so we recursively resolve it.
        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

      case REACT_BLOCK_TYPE:
        return describeFunctionComponentFrame(type._render);

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            // Lazy may contain any component type so we recursively resolve it.
            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
          } catch (x) {}
        }
    }
  }

  return '';
}

var loggedTypeFailures = {};
var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
    }
  }
}

function checkPropTypes(typeSpecs, values, location, componentName, element) {
  {
    // $FlowFixMe This is okay but Flow doesn't know it.
    var has = Function.call.bind(Object.prototype.hasOwnProperty);

    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
        } catch (ex) {
          error$1 = ex;
        }

        if (error$1 && !(error$1 instanceof Error)) {
          setCurrentlyValidatingElement(element);

          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

          setCurrentlyValidatingElement(null);
        }

        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error$1.message] = true;
          setCurrentlyValidatingElement(element);

          error('Failed %s type: %s', location, error$1.message);

          setCurrentlyValidatingElement(null);
        }
      }
    }
  }
}

function setCurrentlyValidatingElement$1(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      setExtraStackFrame(stack);
    } else {
      setExtraStackFrame(null);
    }
  }
}

var propTypesMisspellWarningShown;

{
  propTypesMisspellWarningShown = false;
}

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = getComponentName(ReactCurrentOwner.current.type);

    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }

  return '';
}

function getSourceInfoErrorAddendum(source) {
  if (source !== undefined) {
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }

  return '';
}

function getSourceInfoErrorAddendumForProps(elementProps) {
  if (elementProps !== null && elementProps !== undefined) {
    return getSourceInfoErrorAddendum(elementProps.__source);
  }

  return '';
}
/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */


var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

    if (parentName) {
      info = "\n\nCheck the top-level render call using <" + parentName + ">.";
    }
  }

  return info;
}
/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */


function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }

  element._store.validated = true;
  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }

  ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.

  var childOwner = '';

  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
  }

  {
    setCurrentlyValidatingElement$1(element);

    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

    setCurrentlyValidatingElement$1(null);
  }
}
/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */


function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }

  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];

      if (isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);

    if (typeof iteratorFn === 'function') {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;

        while (!(step = iterator.next()).done) {
          if (isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}
/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */


function validatePropTypes(element) {
  {
    var type = element.type;

    if (type === null || type === undefined || typeof type === 'string') {
      return;
    }

    var propTypes;

    if (typeof type === 'function') {
      propTypes = type.propTypes;
    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
    // Inner props are checked in the reconciler.
    type.$$typeof === REACT_MEMO_TYPE)) {
      propTypes = type.propTypes;
    } else {
      return;
    }

    if (propTypes) {
      // Intentionally inside to avoid triggering lazy initializers:
      var name = getComponentName(type);
      checkPropTypes(propTypes, element.props, 'prop', name, element);
    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

      var _name = getComponentName(type);

      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
    }

    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
    }
  }
}
/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */


function validateFragmentProps(fragment) {
  {
    var keys = Object.keys(fragment.props);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== 'children' && key !== 'key') {
        setCurrentlyValidatingElement$1(fragment);

        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

        setCurrentlyValidatingElement$1(null);
        break;
      }
    }

    if (fragment.ref !== null) {
      setCurrentlyValidatingElement$1(fragment);

      error('Invalid attribute `ref` supplied to `React.Fragment`.');

      setCurrentlyValidatingElement$1(null);
    }
  }
}
function createElementWithValidation(type, props, children) {
  var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.

  if (!validType) {
    var info = '';

    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendumForProps(props);

    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    var typeString;

    if (type === null) {
      typeString = 'null';
    } else if (Array.isArray(type)) {
      typeString = 'array';
    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
      typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
      info = ' Did you accidentally export a JSX literal instead of a component?';
    } else {
      typeString = typeof type;
    }

    {
      error('React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    }
  }

  var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.

  if (element == null) {
    return element;
  } // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)


  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  if (type === exports.Fragment) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}
var didWarnAboutDeprecatedCreateFactory = false;
function createFactoryWithValidation(type) {
  var validatedFactory = createElementWithValidation.bind(null, type);
  validatedFactory.type = type;

  {
    if (!didWarnAboutDeprecatedCreateFactory) {
      didWarnAboutDeprecatedCreateFactory = true;

      warn('React.createFactory() is deprecated and will be removed in ' + 'a future major release. Consider using JSX ' + 'or use React.createElement() directly instead.');
    } // Legacy hook: remove it


    Object.defineProperty(validatedFactory, 'type', {
      enumerable: false,
      get: function () {
        warn('Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');

        Object.defineProperty(this, 'type', {
          value: type
        });
        return type;
      }
    });
  }

  return validatedFactory;
}
function cloneElementWithValidation(element, props, children) {
  var newElement = cloneElement.apply(this, arguments);

  for (var i = 2; i < arguments.length; i++) {
    validateChildKeys(arguments[i], newElement.type);
  }

  validatePropTypes(newElement);
  return newElement;
}

{

  try {
    var frozenObject = Object.freeze({});
    /* eslint-disable no-new */

    new Map([[frozenObject, null]]);
    new Set([frozenObject]);
    /* eslint-enable no-new */
  } catch (e) {
  }
}

var createElement$1 =  createElementWithValidation ;
var cloneElement$1 =  cloneElementWithValidation ;
var createFactory =  createFactoryWithValidation ;
var Children = {
  map: mapChildren,
  forEach: forEachChildren,
  count: countChildren,
  toArray: toArray,
  only: onlyChild
};

exports.Children = Children;
exports.Component = Component;
exports.PureComponent = PureComponent;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
exports.cloneElement = cloneElement$1;
exports.createContext = createContext;
exports.createElement = createElement$1;
exports.createFactory = createFactory;
exports.createRef = createRef;
exports.forwardRef = forwardRef;
exports.isValidElement = isValidElement;
exports.lazy = lazy;
exports.memo = memo;
exports.useCallback = useCallback;
exports.useContext = useContext;
exports.useDebugValue = useDebugValue;
exports.useEffect = useEffect;
exports.useImperativeHandle = useImperativeHandle;
exports.useLayoutEffect = useLayoutEffect;
exports.useMemo = useMemo;
exports.useReducer = useReducer;
exports.useRef = useRef;
exports.useState = useState;
exports.version = ReactVersion;
  })();
}


/***/ }),

/***/ "./node_modules/react/index.js":
/*!*************************************!*\
  !*** ./node_modules/react/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react.development.js */ "./node_modules/react/cjs/react.development.js");
}


/***/ }),

/***/ "./node_modules/react/jsx-runtime.js":
/*!*******************************************!*\
  !*** ./node_modules/react/jsx-runtime.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-jsx-runtime.development.js */ "./node_modules/react/cjs/react-jsx-runtime.development.js");
}


/***/ }),

/***/ "./node_modules/react/node_modules/object-assign/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/react/node_modules/object-assign/index.js ***!
  \****************************************************************/
/***/ ((module) => {

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
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
/*!*************************************!*\
  !*** ./src/frontend/viewer/main.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComboBoxField": () => (/* reexport safe */ _Model_Field_ComboBoxField_ComboBoxField__WEBPACK_IMPORTED_MODULE_10__.ComboBoxField),
/* harmony export */   "DataSource": () => (/* reexport safe */ _Model_DataSource_DataSource__WEBPACK_IMPORTED_MODULE_2__.DataSource),
/* harmony export */   "DateField": () => (/* reexport safe */ _Model_Field_DateField_DateField__WEBPACK_IMPORTED_MODULE_9__.DateField),
/* harmony export */   "LoginFrontHostApp": () => (/* reexport safe */ _LoginFrontHostApp__WEBPACK_IMPORTED_MODULE_0__.LoginFrontHostApp),
/* harmony export */   "PageController": () => (/* reexport safe */ _Controller_ModelController_PageController_PageController__WEBPACK_IMPORTED_MODULE_6__.PageController),
/* harmony export */   "PageView": () => (/* reexport safe */ _Controller_ModelController_PageController_PageView__WEBPACK_IMPORTED_MODULE_3__.PageView),
/* harmony export */   "RowForm": () => (/* reexport safe */ _Model_Form_RowForm_RowForm__WEBPACK_IMPORTED_MODULE_7__.RowForm),
/* harmony export */   "RowFormComboBoxFieldController": () => (/* reexport safe */ _Controller_ModelController_FieldController_RowFormFieldController_RowFormComboBoxFieldController_RowFormComboBoxFieldController__WEBPACK_IMPORTED_MODULE_14__.RowFormComboBoxFieldController),
/* harmony export */   "RowFormController": () => (/* reexport safe */ _Controller_ModelController_FormController_RowFormController_RowFormController__WEBPACK_IMPORTED_MODULE_4__.RowFormController),
/* harmony export */   "RowFormDateFieldController": () => (/* reexport safe */ _Controller_ModelController_FieldController_RowFormFieldController_RowFormDateFieldController_RowFormDateFieldController__WEBPACK_IMPORTED_MODULE_13__.RowFormDateFieldController),
/* harmony export */   "RowFormTextBoxFieldController": () => (/* reexport safe */ _Controller_ModelController_FieldController_RowFormFieldController_RowFormTextBoxFieldController_RowFormTextBoxFieldController__WEBPACK_IMPORTED_MODULE_15__.RowFormTextBoxFieldController),
/* harmony export */   "SqlDataSource": () => (/* reexport safe */ _Model_DataSource_SqlDataSource_SqlDataSource__WEBPACK_IMPORTED_MODULE_12__.SqlDataSource),
/* harmony export */   "TableForm": () => (/* reexport safe */ _Model_Form_TableForm_TableForm__WEBPACK_IMPORTED_MODULE_8__.TableForm),
/* harmony export */   "TableFormController": () => (/* reexport safe */ _Controller_ModelController_FormController_TableFormController_TableFormController__WEBPACK_IMPORTED_MODULE_16__.TableFormController),
/* harmony export */   "TableFormDateFieldController": () => (/* reexport safe */ _Controller_ModelController_FieldController_TableFormFieldController_TableFormDateFieldController_TableFormDateFieldController__WEBPACK_IMPORTED_MODULE_17__.TableFormDateFieldController),
/* harmony export */   "TableFormTextBoxFieldController": () => (/* reexport safe */ _Controller_ModelController_FieldController_TableFormFieldController_TableFormTextBoxFieldController_TableFormTextBoxFieldController__WEBPACK_IMPORTED_MODULE_5__.TableFormTextBoxFieldController),
/* harmony export */   "TextBoxField": () => (/* reexport safe */ _Model_Field_TextBoxField_TextBoxField__WEBPACK_IMPORTED_MODULE_11__.TextBoxField),
/* harmony export */   "ViewerFrontHostApp": () => (/* reexport safe */ _ViewerFrontHostApp__WEBPACK_IMPORTED_MODULE_1__.ViewerFrontHostApp)
/* harmony export */ });
/* harmony import */ var _LoginFrontHostApp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LoginFrontHostApp */ "./src/frontend/viewer/LoginFrontHostApp.js");
/* harmony import */ var _ViewerFrontHostApp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewerFrontHostApp */ "./src/frontend/viewer/ViewerFrontHostApp.js");
/* harmony import */ var _Model_DataSource_DataSource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Model/DataSource/DataSource */ "./src/frontend/viewer/Model/DataSource/DataSource.js");
/* harmony import */ var _Controller_ModelController_PageController_PageView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Controller/ModelController/PageController/PageView */ "./src/frontend/viewer/Controller/ModelController/PageController/PageView.jsx");
/* harmony import */ var _Controller_ModelController_FormController_RowFormController_RowFormController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Controller/ModelController/FormController/RowFormController/RowFormController */ "./src/frontend/viewer/Controller/ModelController/FormController/RowFormController/RowFormController.js");
/* harmony import */ var _Controller_ModelController_FieldController_TableFormFieldController_TableFormTextBoxFieldController_TableFormTextBoxFieldController__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Controller/ModelController/FieldController/TableFormFieldController/TableFormTextBoxFieldController/TableFormTextBoxFieldController */ "./src/frontend/viewer/Controller/ModelController/FieldController/TableFormFieldController/TableFormTextBoxFieldController/TableFormTextBoxFieldController.js");
/* harmony import */ var _Controller_ModelController_PageController_PageController__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Controller/ModelController/PageController/PageController */ "./src/frontend/viewer/Controller/ModelController/PageController/PageController.js");
/* harmony import */ var _Model_Form_RowForm_RowForm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Model/Form/RowForm/RowForm */ "./src/frontend/viewer/Model/Form/RowForm/RowForm.js");
/* harmony import */ var _Model_Form_TableForm_TableForm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Model/Form/TableForm/TableForm */ "./src/frontend/viewer/Model/Form/TableForm/TableForm.js");
/* harmony import */ var _Model_Field_DateField_DateField__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Model/Field/DateField/DateField */ "./src/frontend/viewer/Model/Field/DateField/DateField.js");
/* harmony import */ var _Model_Field_ComboBoxField_ComboBoxField__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Model/Field/ComboBoxField/ComboBoxField */ "./src/frontend/viewer/Model/Field/ComboBoxField/ComboBoxField.js");
/* harmony import */ var _Model_Field_TextBoxField_TextBoxField__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Model/Field/TextBoxField/TextBoxField */ "./src/frontend/viewer/Model/Field/TextBoxField/TextBoxField.js");
/* harmony import */ var _Model_DataSource_SqlDataSource_SqlDataSource__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Model/DataSource/SqlDataSource/SqlDataSource */ "./src/frontend/viewer/Model/DataSource/SqlDataSource/SqlDataSource.js");
/* harmony import */ var _Controller_ModelController_FieldController_RowFormFieldController_RowFormDateFieldController_RowFormDateFieldController__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Controller/ModelController/FieldController/RowFormFieldController/RowFormDateFieldController/RowFormDateFieldController */ "./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormDateFieldController/RowFormDateFieldController.js");
/* harmony import */ var _Controller_ModelController_FieldController_RowFormFieldController_RowFormComboBoxFieldController_RowFormComboBoxFieldController__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Controller/ModelController/FieldController/RowFormFieldController/RowFormComboBoxFieldController/RowFormComboBoxFieldController */ "./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormComboBoxFieldController/RowFormComboBoxFieldController.js");
/* harmony import */ var _Controller_ModelController_FieldController_RowFormFieldController_RowFormTextBoxFieldController_RowFormTextBoxFieldController__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Controller/ModelController/FieldController/RowFormFieldController/RowFormTextBoxFieldController/RowFormTextBoxFieldController */ "./src/frontend/viewer/Controller/ModelController/FieldController/RowFormFieldController/RowFormTextBoxFieldController/RowFormTextBoxFieldController.js");
/* harmony import */ var _Controller_ModelController_FormController_TableFormController_TableFormController__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Controller/ModelController/FormController/TableFormController/TableFormController */ "./src/frontend/viewer/Controller/ModelController/FormController/TableFormController/TableFormController.js");
/* harmony import */ var _Controller_ModelController_FieldController_TableFormFieldController_TableFormDateFieldController_TableFormDateFieldController__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./Controller/ModelController/FieldController/TableFormFieldController/TableFormDateFieldController/TableFormDateFieldController */ "./src/frontend/viewer/Controller/ModelController/FieldController/TableFormFieldController/TableFormDateFieldController/TableFormDateFieldController.js");


















/*
document.addEventListener('DOMContentLoaded', async () => {
    const data = JSON.parse(document.querySelector('script[type="application/json"]').textContent);
    const frontHostApp = new ViewerFrontHostApp({data});
    await frontHostApp.run();
});
*/
})();

/******/ })()
;