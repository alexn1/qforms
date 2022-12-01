/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/frontend/editor/Editor/ApplicationEditor/ApplicationEditor.js":
/*!***************************************************************************!*\
  !*** ./src/frontend/editor/Editor/ApplicationEditor/ApplicationEditor.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApplicationEditor": () => (/* binding */ ApplicationEditor)
/* harmony export */ });
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Editor */ "./src/frontend/editor/Editor/Editor.js");
/* harmony import */ var _DatabaseEditor_DatabaseEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DatabaseEditor/DatabaseEditor */ "./src/frontend/editor/Editor/DatabaseEditor/DatabaseEditor.js");


class ApplicationEditor extends _Editor__WEBPACK_IMPORTED_MODULE_0__.Editor {
  constructor(data) {
    super(data);
    this.databases = [];
    this.dataSources = [];
    this.actions = [];
    this.pageLinks = [];
  }

  init() {
    console.log('ApplicationEditor.init', this.data); // databases

    for (const data of this.data.databases) {
      this.createDatabase(data);
    } // dataSources


    for (const data of this.data.dataSources) {
      this.createDataSource(data);
    } // actions


    for (const data of this.data.actions) {
      this.createAction(data);
    } // pageLinks


    for (const data of this.data.pageLinks) {
      this.createPageLink(data);
    }
  }

  createDatabase(data) {
    const database = new _DatabaseEditor_DatabaseEditor__WEBPACK_IMPORTED_MODULE_1__.DatabaseEditor(data, this);
    database.init();
    this.databases.push(database);
    return database;
  }

  createPageLink(data) {
    const pageLink = new PageLinkEditor(data, this);
    pageLink.init();
    this.pageLinks.push(pageLink);
    return pageLink;
  }

  removeDatabase(database) {
    console.log('ApplicationEditor.removeDatabase', database.getName());
    const i = this.databases.indexOf(database);
    if (i === -1) throw new Error('no such database');
    this.databases.splice(i, 1);
  }

  removePageLink(pageLink) {
    console.log('ApplicationEditor.removePageLink', pageLink.getName());
    const i = this.pageLinks.indexOf(pageLink);
    if (i === -1) throw new Error('no such pageLink');
    this.pageLinks.splice(i, 1);
  }

  async setValue(name, value) {
    //console.log(name + ' = ' + value);
    const data = await FrontHostApp.doHttpRequest({
      controller: 'Application',
      action: 'save',
      params: {
        attr: name,
        value: value
      }
    });
    this.setAttr(name, value);
    return data;
  }

  async newPageAndPageLinkData(params) {
    params['menu'] = params['startup'] === 'true' ? 'Pages' : '';
    return await FrontHostApp.doHttpRequest({
      controller: 'Page',
      action: '_new',
      params: params
    });
  }

  async newPage(params) {
    const {
      page: pageData,
      pageLink: pageLinkData
    } = await this.newPageAndPageLinkData(params);
    const pageLink = this.createPageLink(pageLinkData);
    return new PageEditor(pageData, pageLink);
  }

  async newDatabase(params) {
    const data = await FrontHostApp.doHttpRequest({
      controller: 'Database',
      action: '_new',
      params: params
    });
    return this.createDatabase(data);
  }

  async getView(view) {
    return await FrontHostApp.doHttpRequest({
      controller: 'Application',
      action: 'getView',
      params: {
        app: this.getName(),
        view: view
      }
    });
  }

  async saveView(text, view) {
    return await FrontHostApp.doHttpRequest({
      controller: 'Application',
      action: 'saveView',
      params: {
        app: this.getName(),
        view: view,
        text: text
      }
    });
  }

  async saveController(text) {
    return await FrontHostApp.doHttpRequest({
      controller: 'Application',
      action: 'saveController',
      params: {
        app: this.getName(),
        text: text
      }
    });
  }

  async createView() {
    return await FrontHostApp.doHttpRequest({
      controller: 'Application',
      action: 'createView',
      params: {
        app: this.getName()
      }
    });
  }

  async createController() {
    return await FrontHostApp.doHttpRequest({
      controller: 'Application',
      action: 'createController',
      params: {
        app: this.getName()
      }
    });
  }

  async createModelBackJs() {
    return await FrontHostApp.doHttpRequest({
      controller: 'Application',
      action: 'createModelBackJs',
      params: {
        app: this.getName()
      }
    });
  }

  async newDataSource(params) {
    const data = await FrontHostApp.doHttpRequest({
      controller: 'DataSource',
      action: '_new',
      params: params
    });
    return this.createDataSource(data);
  }

  async newAction(params) {
    // params['pageFileName'] = this.page.pageLink.getFileName();
    // params['form']         = this.getName();
    const data = await FrontHostApp.doHttpRequest({
      controller: 'Action',
      action: '_new',
      params: params
    });
    return this.createAction(data);
  }

}

/***/ }),

/***/ "./src/frontend/editor/Editor/DatabaseEditor/DatabaseEditor.js":
/*!*********************************************************************!*\
  !*** ./src/frontend/editor/Editor/DatabaseEditor/DatabaseEditor.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DatabaseEditor": () => (/* binding */ DatabaseEditor)
/* harmony export */ });
class DatabaseEditor extends Editor {
  constructor(data, parent) {
    super(data, parent);
    this.params = [];
    this.tables = [];
  }

  init() {
    // params
    for (const data of this.data.params) {
      this.createParam(data);
    } // tables


    for (const data of this.data.tables) {
      this.createTable(data);
    }
  }

  createParam(data) {
    const param = new ParamEditor(data, this);
    param.init();
    this.params.push(param);
    return param;
  }

  createTable(data) {
    const table = new TableEditor(data, this);
    table.init();
    this.tables.push(table);
    return table;
  }

  removeParam(param) {
    console.log('DatabaseEditor.removeParam', param.getName());
    const i = this.params.indexOf(param);
    if (i === -1) throw new Error('no such param');
    this.params.splice(i, 1);
  }

  removeTable(table) {
    console.log('DatabaseEditor.removeTable', table.getName());
    const i = this.tables.indexOf(table);
    if (i === -1) throw new Error('no such table');
    this.tables.splice(i, 1);
  }

  async setValue(name, value) {
    //console.log(name + ' = ' + value);
    const data = await FrontHostApp.doHttpRequest({
      controller: 'Database',
      action: 'save',
      params: {
        database: this.getName(),
        attr: name,
        value: value
      }
    });
    this.setAttr(name, value);
    return data;
  }

  async deleteData() {
    return await FrontHostApp.doHttpRequest({
      controller: 'Database',
      action: 'delete',
      params: {
        database: this.getName()
      }
    });
  }

  async delete() {
    await this.deleteData();
    this.parent.removeDatabase(this);
  }

  async newParam(name) {
    const data = await FrontHostApp.doHttpRequest({
      controller: 'Param',
      action: '_new',
      params: {
        database: this.getName(),
        class: 'Param',
        name: name
      }
    });
    return this.createParam(data);
  }

  async newTable(params) {
    if (!params.name) throw new Error('newTable: no name');
    const data = await FrontHostApp.doHttpRequest({
      controller: 'Table',
      action: '_new',
      params: {
        database: this.getName(),
        class: 'Table',
        name: params.name,
        columns: params.columns
      }
    });
    return this.createTable(data);
  }

  async getView(view) {
    console.log('DatabaseEditor.getView', view);
    return await FrontHostApp.doHttpRequest({
      controller: 'Database',
      action: 'getView',
      params: {
        view: view,
        database: this.data !== undefined ? this.getName() : null
      }
    });
  }

  async getTableInfo(table) {
    return await FrontHostApp.doHttpRequest({
      controller: 'Database',
      action: 'getTableInfo',
      params: {
        database: this.data !== undefined ? this.getName() : null,
        table: table
      }
    });
  }

  moveUp() {
    return FrontHostApp.doHttpRequest({
      controller: 'Database',
      action: 'moveUp',
      params: {
        database: this.getName()
      }
    });
  }

  moveDown() {
    return FrontHostApp.doHttpRequest({
      controller: 'Database',
      action: 'moveDown',
      params: {
        database: this.getName()
      }
    });
  }

}

/***/ }),

/***/ "./src/frontend/editor/Editor/Editor.js":
/*!**********************************************!*\
  !*** ./src/frontend/editor/Editor/Editor.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Editor": () => (/* binding */ Editor)
/* harmony export */ });
class Editor {
  constructor(data, parent = null) {
    if (!data) throw new Error('no data');
    this.data = data;
    this.parent = parent;
  }

  init() {}

  getClassName() {
    return this.data['@class'];
  }

  getName() {
    return this.getAttr('name');
  }

  getFullName(splitter = '.') {
    let name;

    if (this.form) {
      name = `${this.form.page.getName()}${splitter}${this.form.getName()}${splitter}${this.getName()}`;
    } else if (this.page) {
      name = `${this.page.getName()}${splitter}${this.getName()}`;
    } else {
      name = this.getName();
    }

    return name;
  }

  async setValue(name, value) {
    throw new Error(`${this.constructor.name}.setValue not implemented`);
  }

  getAttr(name) {
    return this.data['@attributes'][name];
  }

  getAttributes() {
    return this.data['@attributes'];
  }

  setAttr(name, value) {
    this.data['@attributes'][name] = value;
  }
  /*getObject(col, name) {
      return this[col].find(obj => obj.getName() === name);
  }*/


  createDataSource(data) {
    const dataSource = new DataSourceEditor(data, this);
    dataSource.init();
    this.dataSources.push(dataSource);
    return dataSource;
  }

  removeDataSource(dataSource) {
    // console.log('Editor.removeDataSource', dataSource.getName());
    const i = this.dataSources.indexOf(dataSource);
    if (i === -1) throw new Error('no such dataSource');
    this.dataSources.splice(i, 1);
  }

  createAction(data) {
    const action = new ActionEditor(data, this);
    action.init();
    this.actions.push(action);
    return action;
  }

  removeAction(action) {
    // console.log('Editor.removeField', action.getName());
    const i = this.actions.indexOf(action);
    if (i === -1) throw new Error('no such action');
    this.actions.splice(i, 1);
  }

}

/***/ }),

/***/ "./src/frontend/editor/EditorFrontHostApp/EditorFrontHostApp.js":
/*!**********************************************************************!*\
  !*** ./src/frontend/editor/EditorFrontHostApp/EditorFrontHostApp.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditorFrontHostApp": () => (/* binding */ EditorFrontHostApp)
/* harmony export */ });
/* harmony import */ var _Editor_ApplicationEditor_ApplicationEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Editor/ApplicationEditor/ApplicationEditor */ "./src/frontend/editor/Editor/ApplicationEditor/ApplicationEditor.js");

class EditorFrontHostApp extends FrontHostApp {
  constructor(data, runAppLink) {
    console.log('EditorFrontHostApp.constructor', data);
    if (!data) throw new Error('no data');
    super();
    this.data = data;
    EditorFrontHostApp.editorApp = this;
    this.runAppLink = runAppLink;
    this.view = null;
    this.actionList = null;
    this.treeWidget2 = null;
    this.pg = null; // property grid

    this.items = null; // treeWidget2 items

    this.tabWidget = null;
    this.documents = [];
    this.modal = null;
  }

  async run() {
    console.log('EditorFrontHostApp.run'); // app

    const app = new _Editor_ApplicationEditor_ApplicationEditor__WEBPACK_IMPORTED_MODULE_0__.ApplicationEditor(this.data.app);
    app.init(); // console.log('app:', app);
    // application controller

    const applicationController = new ApplicationController(app, this);
    applicationController.init();
    this.items = [applicationController]; // view

    this.view = Helper.createReactComponent(document.querySelector('.editor__root'), EditorFrontHostAppView, {
      ctrl: this
    });
  }

  deinit() {}

  onItemOpen2 = async item => {
    console.log('EditorFrontHostApp.onItemOpen2', item.getTitle()); // console.log('parent:', item.view.parent);

    if (item instanceof PageLinkController && !item.hasPage()) {
      await item.loadPage();
    }
  };
  onItemSelect2 = async item => {
    console.log('EditorFrontHostApp.onItemSelect2', item ? item.getTitle() : null);

    if (item instanceof ModelController) {
      if (item instanceof PageLinkController && !item.hasPage()) {
        await item.loadPage();
      }

      this.fillActions(item);
      this.fillPropertyGrid(item);
    } else {
      this.clearActions();
      this.endEdit();
    }
  };

  fillPropertyGrid(ctrl) {
    const propList = ctrl.getPropList();
    this.beginEdit(propList['list'], propList['options']);
  }

  onPropertyGrid2Change = (name, value) => {
    console.log('EditorFrontHostApp.onPropertyGrid2Change', name, value);
    const controller = this.treeWidget2.getSelectedItem(); // console.log('controller', controller);

    controller.setProperty(name, value);
  };

  beginEdit(obj, options) {
    console.log('EditorFrontHostApp.beginEdit', obj, options);
    this.pg.setState({
      object: {
        obj,
        options
      }
    });
  }

  endEdit() {
    console.log('EditorFrontHostApp.endEdit');
    this.pg.setState({
      object: null
    });
  }

  static async fetchPageData(fileName) {
    console.log('EditorFrontHostApp.fetchPageData', fileName);
    return await FrontHostApp.doHttpRequest({
      controller: 'Page',
      action: 'get',
      params: {
        fileName
      }
    });
  }

  fillActions(item) {
    // console.log('EditorFrontHostApp.fillActions');
    this.actionList.setState({
      item
    });
  }

  clearActions() {
    // console.log('EditorFrontHostApp.clearActions');
    this.actionList.setState({
      item: null
    });
  }

  onItemDoubleClick2 = async item => {
    console.log('EditorFrontHostApp.onItemDoubleClick2', item.getTitle());
    const controller = item instanceof PageLinkController ? item.pageController : item;
    if (!controller || !(controller instanceof DocumentController)) return;
    await this.openDocument(controller);
  };

  async openDocument(controller) {
    console.log('EditorFrontHostApp.openDocument', controller.getTitle());
    let document = this.findDocument(controller);

    if (!document) {
      document = await controller.createDocument();
      this.documents.push(document); // console.log('document:', document);
    }

    this.tabWidget.state.active = this.documents.indexOf(document);
    await this.view.rerender();
  }

  findDocument(controller) {
    return this.documents.find(document => document.controller === controller) || null;
  }

  onDocumentClose = i => {
    console.log('EditorFrontHostApp.onDocumentClose', i, this.tabWidget.state.active);
    const document = this.documents[i];
    const activeDocument = this.documents[this.tabWidget.state.active];
    this.documents.splice(i, 1);
    document.controller.onDocumentClose();

    if (document === activeDocument) {
      if (this.documents.length) {
        if (this.tabWidget.state.active >= this.documents.length) {
          this.tabWidget.state.active = this.documents.length - 1;
        }
      } else {
        this.tabWidget.state.active = null;
      }
    } else {
      this.tabWidget.state.active = this.documents.indexOf(activeDocument);
    }

    this.view.rerender();
  };

  async openModal(modalController) {
    console.log('EditorFrontHostApp.openModal');
    this.modal = modalController;
    await this.view.rerender();
  }

  async onModalClose() {
    console.log('EditorFrontHostApp.onModalClose');
    this.modal = null;
    await this.view.rerender();
  }

  onActionClick = async actionName => {
    console.log('EditorFrontHostApp.onActionClick', actionName);
    const item = this.treeWidget2.getSelectedItem(); // console.log('item', item);

    const controller = item instanceof PageLinkController ? item.pageController : item;
    await controller.doAction(actionName);
  };
}

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
/*!*************************************!*\
  !*** ./src/frontend/editor/main.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditorFrontHostApp_EditorFrontHostApp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditorFrontHostApp/EditorFrontHostApp */ "./src/frontend/editor/EditorFrontHostApp/EditorFrontHostApp.js");

document.addEventListener('DOMContentLoaded', async () => {
  console.log('editor.ejs DOMContentLoaded');
  const data = JSON.parse(document.querySelector('script[type="application/json"]').textContent);
  const runAppLink = "<%=runAppLink%>";
  const editorFrontHostApp = new _EditorFrontHostApp_EditorFrontHostApp__WEBPACK_IMPORTED_MODULE_0__.EditorFrontHostApp(data, runAppLink);
  await editorFrontHostApp.run();
});
})();

/******/ })()
;