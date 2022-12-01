/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/frontend/editor/ActionList/ActionList.jsx":
/*!*******************************************************!*\
  !*** ./src/frontend/editor/ActionList/ActionList.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ActionList": () => (/* binding */ ActionList)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");

class ActionList extends ReactComponent {
  constructor(props) {
    super(props);
    this.state = {
      item: null
    };
  }

  onClick = async li => {
    console.log('ActionList.onClick', li);
    await this.props.onClick(li.dataset.action);
  };

  render() {
    // console.log('ActionList.render', this.state.item);
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DropdownButton, {
      title: 'Actions',
      onClick: this.onClick,
      actions: this.state.item ? this.state.item.getActions().map(action => {
        return {
          name: action.action,
          title: action.caption
        };
      }) : []
    });
  }

}

/***/ }),

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
/* harmony import */ var _DataSourceEditor_DataSourceEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DataSourceEditor/DataSourceEditor */ "./src/frontend/editor/Editor/DataSourceEditor/DataSourceEditor.js");
/* harmony import */ var _PageLinkEditor_PageLinkEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../PageLinkEditor/PageLinkEditor */ "./src/frontend/editor/Editor/PageLinkEditor/PageLinkEditor.js");




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
    const pageLink = new _PageLinkEditor_PageLinkEditor__WEBPACK_IMPORTED_MODULE_3__.PageLinkEditor(data, this);
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

  createDataSource(data) {
    const dataSource = new _DataSourceEditor_DataSourceEditor__WEBPACK_IMPORTED_MODULE_2__.DataSourceEditor(data, this);
    dataSource.init();
    this.dataSources.push(dataSource);
    return dataSource;
  }

}

/***/ }),

/***/ "./src/frontend/editor/Editor/ColumnEditor/ColumnEditor.js":
/*!*****************************************************************!*\
  !*** ./src/frontend/editor/Editor/ColumnEditor/ColumnEditor.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColumnEditor": () => (/* binding */ ColumnEditor)
/* harmony export */ });
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Editor */ "./src/frontend/editor/Editor/Editor.js");

class ColumnEditor extends _Editor__WEBPACK_IMPORTED_MODULE_0__.Editor {
  constructor(data, table) {
    super(data, table);
    this.table = table;
  }

  async setValue(name, value) {
    //console.log('ColumnEditor.setValue', name + ' = ' + value);
    const data = await FrontHostApp.doHttpRequest({
      controller: 'Column',
      action: 'save',
      params: {
        database: this.table.database.getName(),
        table: this.table.getName(),
        column: this.getName(),
        attr: name,
        value: value
      }
    });
    this.setAttr(name, value);
    return data;
  }

  async deleteData() {
    await FrontHostApp.doHttpRequest({
      controller: 'Column',
      action: 'delete',
      params: {
        database: this.table.database.getName(),
        table: this.table.getName(),
        column: this.getName()
      }
    });
  }

  async delete() {
    await this.deleteData();
    this.parent.removeColumn(this);
  }

}

/***/ }),

/***/ "./src/frontend/editor/Editor/DataSourceEditor/DataSourceEditor.js":
/*!*************************************************************************!*\
  !*** ./src/frontend/editor/Editor/DataSourceEditor/DataSourceEditor.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataSourceEditor": () => (/* binding */ DataSourceEditor)
/* harmony export */ });
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Editor */ "./src/frontend/editor/Editor/Editor.js");
/* harmony import */ var _KeyColumnEditor_KeyColumnEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../KeyColumnEditor/KeyColumnEditor */ "./src/frontend/editor/Editor/KeyColumnEditor/KeyColumnEditor.js");


class DataSourceEditor extends _Editor__WEBPACK_IMPORTED_MODULE_0__.Editor {
  constructor(data, parent) {
    super(data, parent);
    this.keyColumns = [];
  }

  init() {
    for (const data of this.data.keyColumns) {
      this.createKeyColumn(data);
    }
  }

  createKeyColumn(data) {
    const keyColumn = new _KeyColumnEditor_KeyColumnEditor__WEBPACK_IMPORTED_MODULE_1__.KeyColumnEditor(data, this);
    keyColumn.init();
    this.keyColumns.push(keyColumn);
    return keyColumn;
  }

  removeKeyColumn(keyColumn) {
    console.log('DatabaseEditor.removeParam', keyColumn.getName());
    const i = this.keyColumns.indexOf(keyColumn);
    if (i === -1) throw new Error('no such keyColumn');
    this.keyColumns.splice(i, 1);
  }

  static async create(parent, params) {
    if (parent instanceof FormEditor) {
      const form = parent;
      params['page'] = form.page.pageLink.getFileName();
      params['form'] = form.getName();
    }

    if (parent instanceof PageEditor) {
      const page = parent;
      params['page'] = page.pageLink.getFileName();
    }

    return await FrontHostApp.doHttpRequest({
      controller: 'DataSource',
      action: '_new',
      params: params
    });
  }

  async setValue(name, value) {
    //console.log(name + ' = ' + value);
    const args = {
      controller: 'DataSource',
      action: 'save',
      params: {
        dataSource: this.getName(),
        attr: name,
        value: value
      }
    };

    if (this.parent instanceof PageEditor) {
      args.params.pageFileName = this.parent.pageLink.getFileName();
    }

    if (this.parent instanceof FormEditor) {
      args.params.form = this.parent.getName();
      args.params.pageFileName = this.parent.page.pageLink.getFileName();
    }

    const data = await FrontHostApp.doHttpRequest(args);
    this.setAttr(name, value);
    return data;
  }

  async deleteData() {
    const args = {
      controller: 'DataSource',
      action: 'delete',
      params: {
        dataSource: this.getName()
      }
    };

    if (this.parent instanceof PageEditor) {
      args.params.page = this.parent.pageLink.getFileName();
    }

    if (this.parent instanceof FormEditor) {
      args.params.form = this.parent.getName();
      args.params.page = this.parent.page.pageLink.getFileName();
    }

    await FrontHostApp.doHttpRequest(args);
  }

  async createModelBackJs() {
    return await FrontHostApp.doHttpRequest({
      controller: 'DataSource',
      action: 'createModelBackJs',
      params: { ...(this.parent instanceof PageEditor ? {
          page: this.parent.getName(),
          pageFileName: this.parent.pageLink.getFileName()
        } : {}),
        ...(this.parent instanceof FormEditor ? {
          form: this.parent.getName(),
          page: this.parent.page.getName(),
          pageFileName: this.parent.page.pageLink.getFileName()
        } : {}),
        dataSource: this.getName()
      }
    });
  }

  async delete() {
    await this.deleteData();
    this.parent.removeDataSource(this);
  }

  async moveUp() {
    const args = {
      controller: 'DataSource',
      action: 'moveUp',
      params: {
        dataSource: this.getName()
      }
    };

    if (this.parent instanceof PageEditor) {
      args.params.page = this.parent.pageLink.getFileName();
    }

    if (this.parent instanceof FormEditor) {
      args.params.form = this.parent.getName();
      args.params.page = this.parent.page.pageLink.getFileName();
    }

    return await FrontHostApp.doHttpRequest(args);
  }

  async moveDown() {
    const args = {
      controller: 'DataSource',
      action: 'moveDown',
      params: {
        dataSource: this.getName()
      }
    };

    if (this.parent instanceof PageEditor) {
      args.params.page = this.parent.pageLink.getFileName();
    }

    if (this.parent instanceof FormEditor) {
      args.params.form = this.parent.getName();
      args.params.page = this.parent.page.pageLink.getFileName();
    }

    return await FrontHostApp.doHttpRequest(args);
  }

  async newKeyColumnData(name) {
    const args = {
      controller: 'KeyColumn',
      action: '_new',
      params: {
        dataSource: this.getName(),
        class: 'KeyColumn',
        name: name
      }
    };

    if (this.parent instanceof FormEditor) {
      args.params.page = this.parent.page.pageLink.getFileName();
      args.params.form = this.parent.getName();
    }

    if (this.parent instanceof PageEditor) {
      args.params.page = this.parent.pageLink.getFileName();
    }

    return await FrontHostApp.doHttpRequest(args);
  }

  async newKeyColumn(name) {
    const data = await this.newKeyColumnData(name);
    return this.createKeyColumn(data);
  }

  async getView(view) {
    const args = {
      controller: 'DataSource',
      action: 'getView',
      params: {
        dataSource: this instanceof DataSourceEditor ? this.getName() : undefined,
        view: view
      }
    };

    if (this.parent instanceof PageEditor) {
      args.params.pageFileName = this instanceof DataSourceEditor ? this.parent.pageLink.getFileName() : undefined;
    }

    if (this.parent instanceof FormEditor) {
      args.params.pageFileName = this instanceof DataSourceEditor ? this.parent.page.pageLink.getFileName() : undefined;
      args.params.form = this instanceof DataSourceEditor ? this.parent.getName() : undefined;
    }

    return await FrontHostApp.doHttpRequest(args);
  }

  async saveController(text) {
    const args = {
      controller: 'DataSource',
      action: 'saveController',
      params: {
        dataSource: this.getName(),
        text: text
      }
    };

    if (this.parent instanceof PageEditor) {
      args.params.pageFileName = this.parent.pageLink.getFileName();
    }

    if (this.parent instanceof FormEditor) {
      args.params.pageFileName = this.parent.page.pageLink.getFileName();
      args.params.form = this.parent.getName();
    }

    return await FrontHostApp.doHttpRequest(args);
  }

  async createController() {
    const args = {
      controller: 'DataSource',
      action: 'createController',
      params: {
        page: this.parent.page.getName(),
        pageFileName: this.parent.page.pageLink.getFileName(),
        form: this.parent.getName(),
        dataSource: this.getName()
      }
    };
    return await FrontHostApp.doHttpRequest(args);
  }

  getFullName() {
    if (this.parent instanceof FormEditor) {
      return [this.parent.parent.getName(), this.parent.getName(), this.getName()].join('.');
    } else if (this.parent instanceof PageEditor) {
      return [this.parent.getName(), this.getName()].join('.');
    } else if (this.parent instanceof ApplicationEditor) {
      return this.getName();
    }
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
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Editor */ "./src/frontend/editor/Editor/Editor.js");
/* harmony import */ var _ParamEditor_ParamEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ParamEditor/ParamEditor */ "./src/frontend/editor/Editor/ParamEditor/ParamEditor.js");
/* harmony import */ var _TableEditor_TableEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../TableEditor/TableEditor */ "./src/frontend/editor/Editor/TableEditor/TableEditor.js");



class DatabaseEditor extends _Editor__WEBPACK_IMPORTED_MODULE_0__.Editor {
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
    const param = new _ParamEditor_ParamEditor__WEBPACK_IMPORTED_MODULE_1__.ParamEditor(data, this);
    param.init();
    this.params.push(param);
    return param;
  }

  createTable(data) {
    const table = new _TableEditor_TableEditor__WEBPACK_IMPORTED_MODULE_2__.TableEditor(data, this);
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

  /*createDataSource(data) {
      const dataSource = new DataSourceEditor(data, this);
      dataSource.init();
      this.dataSources.push(dataSource);
      return dataSource;
  }*/


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

/***/ "./src/frontend/editor/Editor/KeyColumnEditor/KeyColumnEditor.js":
/*!***********************************************************************!*\
  !*** ./src/frontend/editor/Editor/KeyColumnEditor/KeyColumnEditor.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeyColumnEditor": () => (/* binding */ KeyColumnEditor)
/* harmony export */ });
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Editor */ "./src/frontend/editor/Editor/Editor.js");

class KeyColumnEditor extends _Editor__WEBPACK_IMPORTED_MODULE_0__.Editor {
  constructor(data, dataSource) {
    super(data, dataSource);
    this.dataSource = dataSource;
  }

  async setValue(name, value) {
    //console.log(name + ' = ' + value);
    const data = await FrontHostApp.doHttpRequest({
      controller: 'KeyColumn',
      action: 'save',
      params: {
        form: this.dataSource.parent.getName(),
        pageFileName: this.dataSource.parent.page.pageLink.getFileName(),
        dataSource: this.dataSource.getName(),
        keyColumn: this.getName(),
        attr: name,
        value: value
      }
    });
    this.setAttr(name, value);
    return data;
  }

  async deleteData() {
    await FrontHostApp.doHttpRequest({
      controller: 'KeyColumn',
      action: 'delete',
      params: { // page      : this.dataSource.parent.page.pageLink.getFileName(),
        ...(this.getPage() ? {
          page: this.getPage().pageLink.getFileName()
        } : {}),
        // form      : this.dataSource.parent.getName(),
        ...(this.getForm() ? {
          form: this.getForm().getName()
        } : {}),
        dataSource: this.dataSource.getName(),
        keyColumn: this.getName()
      }
    });
  }

  getPage() {
    if (this.dataSource.parent.constructor.name === 'FormEditor') {
      return this.dataSource.parent.page;
    }

    if (this.dataSource.parent.constructor.name === 'PageEditor') {
      return this.dataSource.parent;
    }

    return null;
  }

  getForm() {
    if (this.dataSource.parent.constructor.name === 'FormEditor') {
      return this.dataSource.parent;
    }

    return null;
  }

  async delete() {
    await this.deleteData();
    this.parent.removeKeyColumn(this);
  }

}

/***/ }),

/***/ "./src/frontend/editor/Editor/PageLinkEditor/PageLinkEditor.js":
/*!*********************************************************************!*\
  !*** ./src/frontend/editor/Editor/PageLinkEditor/PageLinkEditor.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PageLinkEditor": () => (/* binding */ PageLinkEditor)
/* harmony export */ });
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Editor */ "./src/frontend/editor/Editor/Editor.js");

class PageLinkEditor extends _Editor__WEBPACK_IMPORTED_MODULE_0__.Editor {
  constructor(data, parent) {
    super(data, parent);
    this.application = parent;
  }

  async setValue(name, value) {
    //console.log(name + ' = ' + value);
    const data = await FrontHostApp.doHttpRequest({
      controller: 'PageLink',
      action: 'save',
      params: {
        pageLink: this.getName(),
        attr: name,
        value: value
      }
    });
    this.setAttr(name, value);
    return data;
  }

  async moveUp() {
    return await FrontHostApp.doHttpRequest({
      controller: 'PageLink',
      action: 'moveUp',
      params: {
        page: this.getName()
      }
    });
  }

  async moveDown() {
    return await FrontHostApp.doHttpRequest({
      controller: 'PageLink',
      action: 'moveDown',
      params: {
        page: this.getName()
      }
    });
  }

  getFileName() {
    return this.data['@attributes'].fileName;
  }

  remove() {
    console.log('PageLinkEditor.remove', this.getName());
    this.parent.removePageLink(this);
  }

}

/***/ }),

/***/ "./src/frontend/editor/Editor/ParamEditor/ParamEditor.js":
/*!***************************************************************!*\
  !*** ./src/frontend/editor/Editor/ParamEditor/ParamEditor.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParamEditor": () => (/* binding */ ParamEditor)
/* harmony export */ });
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Editor */ "./src/frontend/editor/Editor/Editor.js");

class ParamEditor extends _Editor__WEBPACK_IMPORTED_MODULE_0__.Editor {
  constructor(data, database) {
    super(data, database);
    this.database = database;
  }

  async setValue(name, value) {
    //console.log(name + ' = ' + value);
    const data = await FrontHostApp.doHttpRequest({
      controller: 'Param',
      action: 'save',
      params: {
        database: this.database.getName(),
        param: this.getName(),
        attr: name,
        value: value
      }
    });
    this.setAttr(name, value);
    return data;
  }

  async deleteData() {
    await FrontHostApp.doHttpRequest({
      controller: 'Param',
      action: 'delete',
      params: {
        database: this.database.getName(),
        param: this.getName()
      }
    });
  }

  async delete() {
    await this.deleteData();
    this.parent.removeParam(this);
  }

}

/***/ }),

/***/ "./src/frontend/editor/Editor/TableEditor/TableEditor.js":
/*!***************************************************************!*\
  !*** ./src/frontend/editor/Editor/TableEditor/TableEditor.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TableEditor": () => (/* binding */ TableEditor)
/* harmony export */ });
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Editor */ "./src/frontend/editor/Editor/Editor.js");
/* harmony import */ var _ColumnEditor_ColumnEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ColumnEditor/ColumnEditor */ "./src/frontend/editor/Editor/ColumnEditor/ColumnEditor.js");


class TableEditor extends _Editor__WEBPACK_IMPORTED_MODULE_0__.Editor {
  constructor(data, database) {
    super(data, database);
    this.database = database;
    this.columns = [];
  }

  init() {
    for (const data of this.data.columns) {
      this.createColumn(data);
    }
  }

  createColumn(data) {
    const column = new _ColumnEditor_ColumnEditor__WEBPACK_IMPORTED_MODULE_1__.ColumnEditor(data, this);
    column.init();
    this.columns.push(column);
    return column;
  }

  removeColumn(column) {
    console.log('TableEditor.removeColumn', column.getName());
    const i = this.columns.indexOf(column);
    if (i === -1) throw new Error('no such column');
    this.columns.splice(i, 1);
  }

  async newColumn(name) {
    if (!name) throw new Error(`newColumn: no name`);
    const data = await FrontHostApp.doHttpRequest({
      controller: 'Column',
      action: '_new',
      params: {
        database: this.database.getName(),
        table: this.getName(),
        name: name
      }
    });
    return this.createColumn(data);
  }

  async deleteData() {
    await FrontHostApp.doHttpRequest({
      controller: 'Table',
      action: 'delete',
      params: {
        database: this.database.getName(),
        table: this.getName()
      }
    });
  }

  async delete() {
    await this.deleteData();
    this.parent.removeTable(this);
  }

  moveUp() {
    return FrontHostApp.doHttpRequest({
      controller: 'Table',
      action: 'moveUp',
      params: {
        database: this.database.getName(),
        table: this.getName()
      }
    });
  }

  moveDown() {
    return FrontHostApp.doHttpRequest({
      controller: 'Table',
      action: 'moveDown',
      params: {
        database: this.database.getName(),
        table: this.getName()
      }
    });
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
/* harmony import */ var _ModelController_DocumentController_VisualController_ApplicationController_ApplicationController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ModelController/DocumentController/VisualController/ApplicationController/ApplicationController */ "./src/frontend/editor/ModelController/DocumentController/VisualController/ApplicationController/ApplicationController.js");
/* harmony import */ var _EditorFrontHostAppView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EditorFrontHostAppView */ "./src/frontend/editor/EditorFrontHostApp/EditorFrontHostAppView.jsx");
/* harmony import */ var _ModelController_PageLinkController_PageLinkController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ModelController/PageLinkController/PageLinkController */ "./src/frontend/editor/ModelController/PageLinkController/PageLinkController.js");
/* harmony import */ var _ModelController_ModelController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ModelController/ModelController */ "./src/frontend/editor/ModelController/ModelController.js");
/* harmony import */ var _ModelController_DocumentController_DocumentController__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ModelController/DocumentController/DocumentController */ "./src/frontend/editor/ModelController/DocumentController/DocumentController.js");






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

    const applicationController = new _ModelController_DocumentController_VisualController_ApplicationController_ApplicationController__WEBPACK_IMPORTED_MODULE_1__.ApplicationController(app, this);
    applicationController.init();
    this.items = [applicationController]; // view

    this.view = Helper.createReactComponent(document.querySelector('.editor__root'), _EditorFrontHostAppView__WEBPACK_IMPORTED_MODULE_2__.EditorFrontHostAppView, {
      ctrl: this
    });
  }

  deinit() {}

  onItemOpen2 = async item => {
    console.log('EditorFrontHostApp.onItemOpen2', item.getTitle()); // console.log('parent:', item.view.parent);

    if (item instanceof _ModelController_PageLinkController_PageLinkController__WEBPACK_IMPORTED_MODULE_3__.PageLinkController && !item.hasPage()) {
      await item.loadPage();
    }
  };
  onItemSelect2 = async item => {
    console.log('EditorFrontHostApp.onItemSelect2', item ? item.getTitle() : null);

    if (item instanceof _ModelController_ModelController__WEBPACK_IMPORTED_MODULE_4__.ModelController) {
      if (item instanceof _ModelController_PageLinkController_PageLinkController__WEBPACK_IMPORTED_MODULE_3__.PageLinkController && !item.hasPage()) {
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
    const controller = item instanceof _ModelController_PageLinkController_PageLinkController__WEBPACK_IMPORTED_MODULE_3__.PageLinkController ? item.pageController : item;
    if (!controller || !(controller instanceof _ModelController_DocumentController_DocumentController__WEBPACK_IMPORTED_MODULE_5__.DocumentController)) return;
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

    const controller = item instanceof _ModelController_PageLinkController_PageLinkController__WEBPACK_IMPORTED_MODULE_3__.PageLinkController ? item.pageController : item;
    await controller.doAction(actionName);
  };
}

/***/ }),

/***/ "./src/frontend/editor/EditorFrontHostApp/EditorFrontHostAppView.jsx":
/*!***************************************************************************!*\
  !*** ./src/frontend/editor/EditorFrontHostApp/EditorFrontHostAppView.jsx ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditorFrontHostAppView": () => (/* binding */ EditorFrontHostAppView)
/* harmony export */ });
/* harmony import */ var _ActionList_ActionList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ActionList/ActionList */ "./src/frontend/editor/ActionList/ActionList.jsx");
/* harmony import */ var _TreeWidget_TreeWidget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../TreeWidget/TreeWidget */ "./src/frontend/editor/TreeWidget/TreeWidget.jsx");
/* harmony import */ var _PropertyGrid_PropertyGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../PropertyGrid/PropertyGrid */ "./src/frontend/editor/PropertyGrid/PropertyGrid.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





class EditorFrontHostAppView extends ReactComponent {
  renderDocumentView(document) {
    if (!document.controller.getDocumentViewClass()) return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      children: ["no document view for ", document.controller.constructor.name]
    });
    return React.createElement(document.controller.getDocumentViewClass(), {
      onCreate: c => document.view = c,
      document: document,
      ctrl: document.controller
    });
  }

  getTabs() {
    console.log('EditorFrontHostAppView.getTabs', this.props.ctrl.documents);
    return this.props.ctrl.documents.map(document => ({
      name: document.controller.model.getFullName(),
      title: document.controller.model.getFullName(),
      content: this.renderDocumentView(document)
    }));
  }

  render() {
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "EditorFrontHostAppView",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: 'EditorFrontHostAppView__sidebar',
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: 'tree-bar',
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
            href: ctrl.runAppLink,
            target: "_blank",
            children: "Run Application"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_ActionList_ActionList__WEBPACK_IMPORTED_MODULE_0__.ActionList, {
              onCreate: c => ctrl.actionList = c,
              onClick: ctrl.onActionClick
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: 'frame full',
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: 'frame__container',
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_TreeWidget_TreeWidget__WEBPACK_IMPORTED_MODULE_1__.TreeWidget, {
              classList: ['full'],
              onCreate: c => ctrl.treeWidget2 = c,
              items: ctrl.items,
              onItemSelect: ctrl.onItemSelect2,
              onItemDoubleClick: ctrl.onItemDoubleClick2,
              onItemOpen: ctrl.onItemOpen2
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Tab, {
          classList: ['Tab-blue', 'full'],
          tabs: [{
            name: 'properties',
            title: 'Properties',
            content: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_PropertyGrid_PropertyGrid__WEBPACK_IMPORTED_MODULE_2__.PropertyGrid, {
              onCreate: c => ctrl.pg = c,
              onChange: ctrl.onPropertyGrid2Change
            })
          }]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: 'EditorFrontHostAppView__client',
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Tab, {
          classList: ['full'],
          canClose: true,
          onTabClose: ctrl.onDocumentClose,
          onCreate: c => ctrl.tabWidget = c,
          tabs: this.getTabs()
        })
      }), ctrl.modal && React.createElement(ModalView, {
        ctrl: ctrl.modal
      })]
    });
  }

}

/***/ }),

/***/ "./src/frontend/editor/ModelController/ColumnController/ColumnController.js":
/*!**********************************************************************************!*\
  !*** ./src/frontend/editor/ModelController/ColumnController/ColumnController.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColumnController": () => (/* binding */ ColumnController)
/* harmony export */ });
/* harmony import */ var _ModelController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ModelController */ "./src/frontend/editor/ModelController/ModelController.js");

class ColumnController extends _ModelController__WEBPACK_IMPORTED_MODULE_0__.ModelController {
  /*constructor(model, parent) {
      super(model, parent);
  }*/
  getActions() {
    return [{
      'action': 'delete',
      'caption': 'Delete'
    }];
  }

  async doAction(name) {
    switch (name) {
      case 'delete':
        await this.delete();
        break;
    }
  }

  static async getView(view) {
    return await FrontHostApp.doHttpRequest({
      controller: 'Column',
      action: 'getView',
      params: {
        view: view
      }
    });
  }

  getPropList() {
    const propList = super.getPropList();
    propList.options['key'] = ['true', 'false'];
    propList.options['auto'] = ['true', 'false'];
    propList.options['nullable'] = ['true', 'false'];
    propList.options['type'] = ['', 'string', 'number', 'boolean', 'object', 'date'];
    /*propList.options['dbType']   = [
        '',
        'integer',
        'character varying',
        'boolean',
        'timestamp with time zone',
        'text',
        'json',
    ];*/

    return propList;
  }

  async delete() {
    await this.model.delete();
    this.parent.removeColumn(this);
    EditorFrontHostApp.editorApp.treeWidget2.select(null);
    EditorFrontHostApp.editorApp.treeWidget2.rerender();
  }

}

/***/ }),

/***/ "./src/frontend/editor/ModelController/DocumentController/DataSourceController/DataSourceController.js":
/*!*************************************************************************************************************!*\
  !*** ./src/frontend/editor/ModelController/DocumentController/DataSourceController/DataSourceController.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataSourceController": () => (/* binding */ DataSourceController)
/* harmony export */ });
/* harmony import */ var _DocumentController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DocumentController */ "./src/frontend/editor/ModelController/DocumentController/DocumentController.js");
/* harmony import */ var _KeyColumnController_KeyColumnController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../KeyColumnController/KeyColumnController */ "./src/frontend/editor/ModelController/KeyColumnController/KeyColumnController.js");


class DataSourceController extends _DocumentController__WEBPACK_IMPORTED_MODULE_0__.DocumentController {
  constructor(model, parent) {
    super(model, parent);
    this.keyColumns = [];
    this.items = [{
      getTitle: () => 'Key Columns',
      items: this.keyColumns
    }];
  }

  getTitle() {
    return `${this.model.getClassName()}: ${this.model.getName()}`;
  }

  getStyle() {
    return {
      // fontWeight: 'bold',
      color: 'brown'
    };
  }

  init() {
    this.model.keyColumns.forEach(keyColumn => this.createKeyColumn(keyColumn));
  }

  createKeyColumn(model) {
    const keyColumn = new _KeyColumnController_KeyColumnController__WEBPACK_IMPORTED_MODULE_1__.KeyColumnController(model, this);
    keyColumn.init();
    this.keyColumns.push(keyColumn);
    return keyColumn;
  }

  removeKeyColumn(keyColumnController) {
    console.log('DataSourceController.removeKeyColumn', keyColumnController.getTitle());
    const i = this.keyColumns.indexOf(keyColumnController);
    if (i === -1) throw new Error('no such keyColumnController');
    this.keyColumns.splice(i, 1);
  }

  getActions() {
    return [{
      'action': 'newItem',
      'caption': 'New Key Column'
    }, {
      'action': 'moveUp',
      'caption': 'Move Up'
    }, {
      'action': 'moveDown',
      'caption': 'Move Down'
    }, {
      'action': 'delete',
      'caption': 'Delete'
    }];
  }

  async doAction(name) {
    switch (name) {
      case 'newItem':
        await this.actionNewKeyColumn();
        break;

      case 'delete':
        await this.delete();
        break;

      case 'moveUp':
        await this.model.moveUp();
        this.parent.moveColItem('dataSources', this, -1);
        EditorFrontHostApp.editorApp.treeWidget2.rerender();
        break;

      case 'moveDown':
        await this.model.moveDown();
        this.parent.moveColItem('dataSources', this, 1);
        EditorFrontHostApp.editorApp.treeWidget2.rerender();
        break;
    }
  }

  async actionNewKeyColumn() {
    await EditorFrontHostApp.editorApp.openModal(new NewKeyColumnController({
      onCreate: async values => {
        const keyColumn = await this.model.newKeyColumn(values.name);
        const keyColumnController = this.createKeyColumn(keyColumn);
        await EditorFrontHostApp.editorApp.treeWidget2.select(keyColumnController);
        keyColumnController.view.parent.open();
        this.view.rerender();
        EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
      }
    }));
  }

  getPropList() {
    const propList = {
      list: {},
      options: {}
    }; // list

    for (const name in this.model.data['@attributes']) {
      if (!['countQuery', 'singleQuery', 'multipleQuery'].includes(name)) {
        propList.list[name] = this.model.data['@attributes'][name];
      }
    }

    return propList;
  }

  getDocumentViewClass() {
    if (this.model.getClassName() === 'SqlDataSource') return SqlDataSourceView;
    return super.getDocumentViewClass();
  }

  async onSaveClick(name, value) {
    // console.log('DataSourceController.onSaveClick', name, value);
    await this.model.setValue(name, value);
  }

  async delete() {
    await this.model.delete();
    this.parent.removeDataSource(this);
    EditorFrontHostApp.editorApp.treeWidget2.select(null);
    EditorFrontHostApp.editorApp.treeWidget2.rerender();
  }

  onCreateModelBack = async e => {
    const data = await this.model.createModelBackJs();
  };
}

/***/ }),

/***/ "./src/frontend/editor/ModelController/DocumentController/DatabaseController/DatabaseController.js":
/*!*********************************************************************************************************!*\
  !*** ./src/frontend/editor/ModelController/DocumentController/DatabaseController/DatabaseController.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DatabaseController": () => (/* binding */ DatabaseController)
/* harmony export */ });
/* harmony import */ var _DocumentController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DocumentController */ "./src/frontend/editor/ModelController/DocumentController/DocumentController.js");
/* harmony import */ var _ParamController_ParamController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ParamController/ParamController */ "./src/frontend/editor/ModelController/ParamController/ParamController.js");
/* harmony import */ var _TableController_TableController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../TableController/TableController */ "./src/frontend/editor/ModelController/DocumentController/TableController/TableController.js");
/* harmony import */ var _DatabaseView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DatabaseView */ "./src/frontend/editor/ModelController/DocumentController/DatabaseController/DatabaseView.jsx");




class DatabaseController extends _DocumentController__WEBPACK_IMPORTED_MODULE_0__.DocumentController {
  constructor(model, parent) {
    super(model, parent);
    this.tableName = null;
    this.tableInfo = null;
    this.params = [];
    this.tables = [];
    this.items = [{
      getTitle: () => 'Params',
      items: this.params
    }, {
      getTitle: () => 'Tables',
      items: this.tables
    }];
  }

  getTitle() {
    return `${this.model.getClassName()}: ${this.model.getName()}`;
  }

  getStyle() {
    return {
      // fontWeight: 'bold',
      color: 'purple'
    };
  }

  init() {
    this.model.params.forEach(param => this.createParam(param));
    this.model.tables.forEach(table => this.createTable2(table));
  }

  createParam(model) {
    const param = new _ParamController_ParamController__WEBPACK_IMPORTED_MODULE_1__.ParamController(model, this);
    param.init();
    this.params.push(param);
    return param;
  }

  createTable2(model) {
    const table = new _TableController_TableController__WEBPACK_IMPORTED_MODULE_2__.TableController(model, this);
    table.init();
    this.tables.push(table);
    return table;
  }

  removeParam(paramController) {
    console.log('DatabaseController.removeParam', paramController.getTitle());
    const i = this.params.indexOf(paramController);
    if (i === -1) throw new Error('no such paramController');
    this.params.splice(i, 1);
  }

  removeTable2(tableController) {
    console.log('DatabaseController.removeTable2', tableController.getTitle());
    const i = this.tables.indexOf(tableController);
    if (i === -1) throw new Error('no such tableController');
    this.tables.splice(i, 1);
  }

  getActions() {
    return [{
      'action': 'newParam',
      'caption': 'New Param'
    }, {
      'action': 'newTable',
      'caption': 'New Table'
    }, {
      'action': 'moveUp',
      'caption': 'Move Up'
    }, {
      'action': 'moveDown',
      'caption': 'Move Down'
    }, {
      'action': 'delete',
      'caption': 'Delete'
    }];
  }

  async doAction(name) {
    switch (name) {
      case 'newParam':
        await this.actionNewParam();
        break;

      case 'newTable':
        await this.actionNewTable();
        break;

      case 'delete':
        await this.delete();
        break;

      case 'moveUp':
        await this.model.moveUp();
        this.parent.moveColItem('databases', this, -1);
        EditorFrontHostApp.editorApp.treeWidget2.rerender();
        break;

      case 'moveDown':
        await this.model.moveDown();
        this.parent.moveColItem('databases', this, 1);
        EditorFrontHostApp.editorApp.treeWidget2.rerender();
        break;

      default:
        throw new Error(`unknown action: ${name}`);
    }
  }

  async actionNewParam() {
    await EditorFrontHostApp.editorApp.openModal(new NewParamController({
      onCreate: async values => {
        const param = await this.model.newParam(values.name);
        const paramController = this.createParam(param);
        await EditorFrontHostApp.editorApp.treeWidget2.select(paramController);
        paramController.view.parent.open();
        this.view.rerender();
        EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
      }
    }));
  }

  async actionNewTable() {
    await EditorFrontHostApp.editorApp.openModal(new NewTableController({
      onCreate: async values => {
        const table = await this.model.newTable({
          name: values.name
        });
        const tableController = this.createTable2(table);
        await EditorFrontHostApp.editorApp.treeWidget2.select(tableController);
        tableController.view.parent.open();
        this.view.rerender();
        EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
      }
    }));
  }

  async createDocument() {
    const document = await super.createDocument();
    const result = await this.model.getView('DatabaseView/DatabaseView.html'); // console.log('data:', result.data);

    document.treeWidgetItems = result.data.tables.sort().map(tableName => ({
      getTitle: () => tableName
    }));
    return document;
  }

  onTableSelect2 = async item => {
    console.log('DatabaseController.onTableSelect2', item.getTitle());
    const tableName = item.getTitle();
    this.tableName = tableName;
    const data = await this.model.getTableInfo(tableName);
    this.tableInfo = data.tableInfo;
    this.document.view.rerender(); // console.log('tableInfo:', this.tableInfo);
  };
  onCreateTableClick = e => {
    console.log('DatabaseController.onCreateTableClick');
    this.newTableAction(this.tableName, this.tableInfo);
  };

  async newTableAction(tableName, tableInfo) {
    console.log('DatabaseController.newTableAction', tableName, tableInfo);
    const table = await this.model.newTable({
      class: 'Table',
      name: tableName,
      columns: tableInfo.map(column => ({
        class: 'Column',
        name: column.name,
        caption: column.name,
        type: column.type,
        dbType: column.dbType,
        key: column.key.toString(),
        auto: column.auto.toString(),
        nullable: column.nullable.toString()
      }))
    });
    const tableController = this.createTable2(table);
    await EditorFrontHostApp.editorApp.treeWidget2.select(tableController);
    tableController.view.parent.open();
    this.view.rerender(); // EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
  }

  async delete() {
    console.log('DatabaseController.delete', this.getTitle());
    await this.model.delete();
    this.parent.removeDatabase(this);
    EditorFrontHostApp.editorApp.treeWidget2.select(null);
    EditorFrontHostApp.editorApp.treeWidget2.rerender();
  }

  getDocumentViewClass() {
    return _DatabaseView__WEBPACK_IMPORTED_MODULE_3__.DatabaseView;
  }

}

/***/ }),

/***/ "./src/frontend/editor/ModelController/DocumentController/DatabaseController/DatabaseView.jsx":
/*!****************************************************************************************************!*\
  !*** ./src/frontend/editor/ModelController/DocumentController/DatabaseController/DatabaseView.jsx ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DatabaseView": () => (/* binding */ DatabaseView)
/* harmony export */ });
/* harmony import */ var _TreeWidget_TreeWidget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../TreeWidget/TreeWidget */ "./src/frontend/editor/TreeWidget/TreeWidget.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



class DatabaseView extends ReactComponent {
  renderGrid() {
    // console.log('DatabaseView.renderGrid');
    const ctrl = this.props.ctrl;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Grid, {
      classList: ['flex-max'],
      columns: [{
        name: 'name',
        title: 'name',
        width: 100
      }, {
        name: 'type',
        title: 'type',
        width: 60
      }, {
        name: 'key',
        title: 'key',
        width: 60
      }, {
        name: 'auto',
        title: 'auto',
        width: 60
      }, {
        name: 'nullable',
        title: 'nullable',
        width: 60
      }, {
        name: 'dbType',
        title: 'dbType',
        width: 200
      }, {
        name: 'comment',
        title: 'comment',
        width: 100
      }],
      rows: ctrl.tableInfo,
      getRowKey: row => row.name
    });
  }

  render() {
    // console.log('DatabaseView.render');
    const ctrl = this.props.ctrl;
    const document = this.props.document;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: 'DatabaseView frame',
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: 'client frame',
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: 'frame__container',
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: 'divTableInfo full flex-column',
            children: [ctrl.tableInfo && this.renderGrid(), ctrl.tableInfo && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Button, {
              onClick: ctrl.onCreateTableClick,
              children: "Create Table"
            })]
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_TreeWidget_TreeWidget__WEBPACK_IMPORTED_MODULE_0__.TreeWidget, {
        classList: ['sidebar'],
        items: document.treeWidgetItems,
        onItemSelect: ctrl.onTableSelect2
      })]
    });
  }

}

/***/ }),

/***/ "./src/frontend/editor/ModelController/DocumentController/DocumentController.js":
/*!**************************************************************************************!*\
  !*** ./src/frontend/editor/ModelController/DocumentController/DocumentController.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DocumentController": () => (/* binding */ DocumentController)
/* harmony export */ });
/* harmony import */ var _ModelController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ModelController */ "./src/frontend/editor/ModelController/ModelController.js");

class DocumentController extends _ModelController__WEBPACK_IMPORTED_MODULE_0__.ModelController {
  constructor(model, parent) {
    super(model, parent);
    this.document = null;
  }

  async createDocument() {
    const document = {
      controller: this,
      view: null
    };
    return this.document = document;
  }

  onDocumentClose() {
    console.log('DocumentController.onDocumentClose', this.getTitle());
    this.document = null;
  }

}

/***/ }),

/***/ "./src/frontend/editor/ModelController/DocumentController/TableController/TableController.js":
/*!***************************************************************************************************!*\
  !*** ./src/frontend/editor/ModelController/DocumentController/TableController/TableController.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TableController": () => (/* binding */ TableController)
/* harmony export */ });
/* harmony import */ var _DocumentController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DocumentController */ "./src/frontend/editor/ModelController/DocumentController/DocumentController.js");
/* harmony import */ var _ColumnController_ColumnController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ColumnController/ColumnController */ "./src/frontend/editor/ModelController/ColumnController/ColumnController.js");


class TableController extends _DocumentController__WEBPACK_IMPORTED_MODULE_0__.DocumentController {
  constructor(model, parent) {
    super(model, parent);
    this.columns = [];
    this.items = [{
      getTitle: () => 'Columns',
      items: this.columns
    }];
  }

  init() {
    this.model.columns.forEach(column => this.createColumn(column));
  }

  createColumn(model) {
    const column = new _ColumnController_ColumnController__WEBPACK_IMPORTED_MODULE_1__.ColumnController(model, this);
    column.init();
    this.columns.push(column);
    return column;
  }

  removeColumn(columnController) {
    console.log('TableController.removeColumn', columnController.getTitle());
    const i = this.columns.indexOf(columnController);
    if (i === -1) throw new Error('no such columnController');
    this.columns.splice(i, 1);
  }

  getActions() {
    return [{
      'action': 'newColumn',
      'caption': 'New Column'
    }, {
      'action': 'moveUp',
      'caption': 'Move Up'
    }, {
      'action': 'moveDown',
      'caption': 'Move Down'
    }, {
      'action': 'delete',
      'caption': 'Delete'
    }];
  }

  async doAction(name) {
    switch (name) {
      case 'delete':
        await this.delete();
        break;

      case 'newColumn':
        await this.actionNewColumn();
        break;

      case 'moveUp':
        await this.model.moveUp();
        this.parent.moveColItem('tables', this, -1);
        EditorFrontHostApp.editorApp.treeWidget2.rerender();
        break;

      case 'moveDown':
        await this.model.moveDown();
        this.parent.moveColItem('tables', this, 1);
        EditorFrontHostApp.editorApp.treeWidget2.rerender();
        break;

      default:
        throw new Error(`unknown action: ${name}`);
    }
  }

  static async getView(view) {
    return await FrontHostApp.doHttpRequest({
      controller: 'Table',
      action: 'getView',
      params: {
        view: view
      }
    });
  }

  async actionNewColumn() {
    await EditorFrontHostApp.editorApp.openModal(new NewColumnController({
      onCreate: async values => {
        const column = await this.model.newColumn(values.name);
        const columnController = this.createColumn(column);
        await EditorFrontHostApp.editorApp.treeWidget2.select(columnController);
        columnController.view.parent.open();
        this.view.rerender();
        EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
      }
    }));
  }

  onCreateFormButtonClick = async e => {
    console.log('TableController.onCreateFormButtonClick');
    await this.createFormAction();
  };

  static async getView(view) {
    console.log('TableController.getView', view);
    return FrontHostApp.doHttpRequest({
      controller: 'Table',
      action: 'getView',
      params: {
        view: view
      }
    });
  }

  async createFormAction() {
    console.log('TableController.createFormAction');
    await EditorFrontHostApp.editorApp.openModal(new NewFormFromTableController({
      tableController: this,
      onCreate: async values => {
        const formWizard = FormWizard.create({
          model: this.model,
          pageName: values.page,
          className: values.class,
          formName: values.name,
          formCaption: values.caption || values.name
        });
        const params = formWizard.getFormParams(); // console.log('params:', params);

        const databaseController = this.parent;
        const applicationController = databaseController.parent;
        const pageLinkController = applicationController.findPageLink(values.page);

        if (!pageLinkController.pageController) {
          await pageLinkController.loadPage();
        }

        const pageController = pageLinkController.pageController; // console.log('pageController:', pageController);

        const form = await pageController.model.newForm(params); // console.log('form:', form);

        const formController = pageController.createForm(form);
        await EditorFrontHostApp.editorApp.treeWidget2.select(formController);
        formController.view.parent.open();
        pageLinkController.view.rerender();
        EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
      }
    }));
  }

  async delete() {
    console.log('TableController.delete', this.getTitle());
    await this.model.delete();
    this.parent.removeTable2(this);
    EditorFrontHostApp.editorApp.treeWidget2.select(null);
    EditorFrontHostApp.editorApp.treeWidget2.rerender();
  }

  getDocumentViewClass() {
    return TableView;
  }

}

/***/ }),

/***/ "./src/frontend/editor/ModelController/DocumentController/VisualController/ApplicationController/ApplicationController.js":
/*!********************************************************************************************************************************!*\
  !*** ./src/frontend/editor/ModelController/DocumentController/VisualController/ApplicationController/ApplicationController.js ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApplicationController": () => (/* binding */ ApplicationController)
/* harmony export */ });
/* harmony import */ var _VisualController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VisualController */ "./src/frontend/editor/ModelController/DocumentController/VisualController/VisualController.js");
/* harmony import */ var _DatabaseController_DatabaseController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../DatabaseController/DatabaseController */ "./src/frontend/editor/ModelController/DocumentController/DatabaseController/DatabaseController.js");
/* harmony import */ var _PageLinkController_PageLinkController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../PageLinkController/PageLinkController */ "./src/frontend/editor/ModelController/PageLinkController/PageLinkController.js");



class ApplicationController extends _VisualController__WEBPACK_IMPORTED_MODULE_0__.VisualController {
  constructor(model, editorApp) {
    super(model);
    this.editorApp = editorApp;
    this.databases = [];
    this.dataSources = [];
    this.actions = [];
    this.pageLinks = []; // items

    this.opened = true;
    this.items = [{
      getTitle: () => 'Databases',
      items: this.databases
    }, {
      getTitle: () => 'Data Sources',
      items: this.dataSources
    }, {
      getTitle: () => 'Actions',
      items: this.actions
    }, {
      getTitle: () => 'Pages',
      items: this.pageLinks,
      opened: true
    }];
  }

  init() {
    this.model.databases.forEach(database => this.createDatabase(database));
    this.model.dataSources.forEach(dataSource => this.createDataSource(dataSource));
    this.model.actions.forEach(action => this.createAction(action));
    this.model.pageLinks.forEach(pageLink => this.createPageLink(pageLink));
  }

  createDatabase(model) {
    const database = new _DatabaseController_DatabaseController__WEBPACK_IMPORTED_MODULE_1__.DatabaseController(model, this);
    database.init();
    this.databases.push(database);
    return database;
  }

  createPageLink(model) {
    const pageLink = new _PageLinkController_PageLinkController__WEBPACK_IMPORTED_MODULE_2__.PageLinkController(model, this);
    pageLink.init();
    this.pageLinks.push(pageLink);
    return pageLink;
  }

  removeDatabase(databaseController) {
    console.log('ApplicationController.removeDatabase', databaseController.getTitle());
    const i = this.databases.indexOf(databaseController);
    if (i === -1) throw new Error('no such databaseController');
    this.databases.splice(i, 1);
  }

  removePageLink(pageLinkController) {
    const i = this.pageLinks.indexOf(pageLinkController);
    if (i === -1) throw new Error('no such pageLinkController');
    this.pageLinks.splice(i, 1);
  }

  getActions() {
    return [{
      'action': 'newDatabase',
      'caption': 'New Database'
    }, {
      'action': 'newDataSource',
      'caption': 'New Data Source'
    }, {
      'action': 'newAction',
      'caption': 'New Action'
    }, {
      'action': 'newPage',
      'caption': 'New Page'
    }];
  }

  async doAction(name) {
    switch (name) {
      case 'newDatabase':
        await this.newDatabaseAction();
        break;

      case 'newDataSource':
        await this.newDataSourceAction();
        break;

      case 'newPage':
        await this.newPageAction();
        break;

      case 'newAction':
        await this.actionNewAction();
        break;

      default:
        console.log(name);
    }
  }

  async newDatabaseAction() {
    console.log('ApplicationController.newDatabaseAction');
    await EditorFrontHostApp.editorApp.openModal(new NewDatabaseController({
      onCreate: async values => {
        // console.log('values: ', values);
        const database = await this.model.newDatabase({
          class: values.class,
          name: values.name,
          params: [{
            class: 'Param',
            name: 'host',
            value: values.host
          }, {
            class: 'Param',
            name: 'database',
            value: values.database
          }, {
            class: 'Param',
            name: 'user',
            value: values.user
          }, {
            class: 'Param',
            name: 'password',
            value: values.password
          }]
        });
        const databaseController = this.createDatabase(database);
        await EditorFrontHostApp.editorApp.treeWidget2.select(databaseController);
        databaseController.view.parent.open();
        this.view.rerender();
        EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
      }
    }));
  }

  async newDataSourceAction() {
    await EditorFrontHostApp.editorApp.openModal(new NewDataSourceController({
      onCreate: async values => {
        const dataSource = await this.model.newDataSource({
          name: values.name,
          class: values.class
        });
        const dataSourceController = this.createDataSource(dataSource);
        await EditorFrontHostApp.editorApp.treeWidget2.select(dataSourceController);
        dataSourceController.view.parent.open();
        this.view.rerender();
        EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
      }
    }));
  }

  async newPageAction() {
    await EditorFrontHostApp.editorApp.openModal(new NewPageController({
      onCreate: async values => {
        const page = await this.model.newPage({
          name: values.name,
          caption: values.caption || values.name,
          startup: values.startup
        });
        const pageLinkController = this.createPageLink(page.pageLink);
        const pageController = new PageController(page, pageLinkController);
        pageController.init();
        pageLinkController.setPageController(pageController);
        EditorFrontHostApp.editorApp.treeWidget2.select(pageLinkController);
        EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
      }
    }));
  }

  getPropList() {
    const propList = super.getPropList();
    propList.options['authentication'] = ['true', 'false'];
    propList.options['lang'] = ['en', 'ru'];
    return propList;
  }

  findPageLink(name) {
    return this.pageLinks.find(pageLink => pageLink.model.getName() === name);
  }

  getDocumentViewClass() {
    return VisualView;
  }

}

/***/ }),

/***/ "./src/frontend/editor/ModelController/DocumentController/VisualController/VisualController.js":
/*!*****************************************************************************************************!*\
  !*** ./src/frontend/editor/ModelController/DocumentController/VisualController/VisualController.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VisualController": () => (/* binding */ VisualController)
/* harmony export */ });
/* harmony import */ var _DocumentController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DocumentController */ "./src/frontend/editor/ModelController/DocumentController/DocumentController.js");
/* harmony import */ var _DataSourceController_DataSourceController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DataSourceController/DataSourceController */ "./src/frontend/editor/ModelController/DocumentController/DataSourceController/DataSourceController.js");


class VisualController extends _DocumentController__WEBPACK_IMPORTED_MODULE_0__.DocumentController {
  constructor(model, parent) {
    super(model, parent);
    this.data = null;
  }

  async createDocument() {
    console.log('VisualController.createDocument');
    const document = await super.createDocument();
    const result = await this.model.getView('VisualView.html');
    this.data = result.data;
    return document;
  }

  async onControllerSave(value) {
    console.log('ApplicationController.onControllerSave'
    /*, value*/
    );
    const result = await this.model.saveController(value);
    this.data.js = result.js;
    this.document.view.rerender();
  }

  onCreateCustomController = async e => {
    console.log('ApplicationController.onCreateCustomController');
    const data = await this.model.createController();
    this.data.js = data.js;
    this.document.view.rerender();
  };
  onCreateCustomView = async e => {
    console.log('VisualController.onCreateCustomView');
    const data = await this.model.createView();
    this.data.jsx = data.jsx;
    this.document.view.rerender();
  };
  onCreateCustomStyle = async e => {
    console.log('VisualController.onCreateCustomStyle');
    const data = await this.model.createStyle();
    this.data.less = data.less;
    this.document.view.rerender();
  };
  onCreateModelBack = async e => {
    const data = await this.model.createModelBackJs();
  };

  createDataSource(model) {
    const dataSource = new _DataSourceController_DataSourceController__WEBPACK_IMPORTED_MODULE_1__.DataSourceController(model, this);
    dataSource.init();
    this.dataSources.push(dataSource);
    return dataSource;
  }

  removeDataSource(dataSourceController) {
    // console.log('VisualController.removeDataSource', dataSourceController.getTitle());
    const i = this.dataSources.indexOf(dataSourceController);
    if (i === -1) throw new Error('no such dataSourceController');
    this.dataSources.splice(i, 1);
  }

  createAction(model) {
    const action = new ActionController(model, this);
    action.init();
    this.actions.push(action);
    return action;
  }

  removeAction(actionController) {
    // console.log('VisualController.removeAction', actionController.getTitle());
    const i = this.actions.indexOf(actionController);
    if (i === -1) throw new Error('no such actionController');
    this.actions.splice(i, 1);
  }

  async actionNewAction() {
    console.log('VisualController.actionNewAction');
    await EditorFrontHostApp.editorApp.openModal(new NewActionController({
      onCreate: async values => {
        const action = await this.model.newAction({
          name: values.name,
          caption: values.caption
        });
        const actionController = this.createAction(action);
        await EditorFrontHostApp.editorApp.treeWidget2.select(actionController);
        actionController.view.parent.open();

        if (this.pageLinkController) {
          this.pageLinkController.view.rerender();
        } else {
          this.view.rerender();
        }

        EditorFrontHostApp.editorApp.treeWidget2.scrollToSelected();
      }
    }));
  }

}

/***/ }),

/***/ "./src/frontend/editor/ModelController/KeyColumnController/KeyColumnController.js":
/*!****************************************************************************************!*\
  !*** ./src/frontend/editor/ModelController/KeyColumnController/KeyColumnController.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeyColumnController": () => (/* binding */ KeyColumnController)
/* harmony export */ });
/* harmony import */ var _ModelController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ModelController */ "./src/frontend/editor/ModelController/ModelController.js");

class KeyColumnController extends _ModelController__WEBPACK_IMPORTED_MODULE_0__.ModelController {
  /*constructor(model, parent) {
      super(model, parent);
  }*/
  getActions() {
    return [{
      'action': 'delete',
      'caption': 'Delete'
    }];
  }

  async doAction(name) {
    switch (name) {
      case 'delete':
        await this.delete();
        break;
    }
  }

  static async getView(view) {
    return await FrontHostApp.doHttpRequest({
      controller: 'KeyColumn',
      action: 'getView',
      params: {
        view: view
      }
    });
  }

  async delete() {
    await this.model.delete();
    this.parent.removeKeyColumn(this);
    EditorFrontHostApp.editorApp.treeWidget2.select(null);
    EditorFrontHostApp.editorApp.treeWidget2.rerender();
  }

}

/***/ }),

/***/ "./src/frontend/editor/ModelController/ModelController.js":
/*!****************************************************************!*\
  !*** ./src/frontend/editor/ModelController/ModelController.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModelController": () => (/* binding */ ModelController)
/* harmony export */ });
class ModelController {
  constructor(model, parent = null) {
    // super();
    this.model = model;
    this.parent = parent;
    this.view = null;
  }

  init() {}

  getTitle() {
    return this.model.getName();
  }

  getStyle() {
    return {// fontWeight: 'bold',
    };
  }

  getPropList() {
    return {
      list: this.model.data['@attributes'],
      options: {}
    };
  }

  async setProperty(name, value) {
    await this.model.setValue(name, value);
  }
  /*getObject(col, name) {
      return this[col].find(obj => obj.model.getName() === name);
  }*/


  async doAction(name) {
    throw new Error(`${this.constructor.name}.doAction('${name}') not implemented`);
  }

  getDocumentViewClass() {
    console.log(`${this.constructor.name}.getDocumentViewClass`);
    return null;
  }

  moveColItem(colName, item, offset) {
    Helper.moveArrItem(this[colName], item, offset);
  }

}

/***/ }),

/***/ "./src/frontend/editor/ModelController/PageLinkController/PageLinkController.js":
/*!**************************************************************************************!*\
  !*** ./src/frontend/editor/ModelController/PageLinkController/PageLinkController.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PageLinkController": () => (/* binding */ PageLinkController)
/* harmony export */ });
/* harmony import */ var _ModelController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ModelController */ "./src/frontend/editor/ModelController/ModelController.js");

class PageLinkController extends _ModelController__WEBPACK_IMPORTED_MODULE_0__.ModelController {
  constructor(model, parent) {
    super(model, parent);
    this.node = true;
    this.pageController = null;
    this.items = null;
  }

  getTitle() {
    if (this.pageController) return this.pageController.getTitle();
    return super.getTitle();
  }

  getStyle() {
    return {
      // fontWeight: 'bold',
      color: 'red'
    };
  }

  hasPage() {
    return this.pageController != null;
  }

  async loadPage() {
    console.log('PageLinkController.loadPage', this.getTitle());
    if (this.pageController) throw new Error('page already loaded');
    const pageLink = this.model;
    const pageData = await EditorFrontHostApp.fetchPageData(pageLink.getFileName()); // page

    const page = new PageEditor(pageData, pageLink);
    page.init(); // pageController

    const pageController = new PageController(page, this);
    pageController.init();
    this.setPageController(pageController); // console.log('pageController:', pageController);

    this.view.rerender();
  }

  getActions() {
    return this.pageController.getActions();
  }

  getPropList() {
    return this.pageController.getPropList();
  }

  async setProperty(name, value) {
    this.pageController.setProperty(name, value);
  }

  setPageController(pageController) {
    if (this.pageController) throw new Error('pageLinkController already has pageController');
    this.pageController = pageController;
    this.items = pageController.items;
  }

  remove() {
    console.log('PageLinkController.remove', this.getTitle());
    this.parent.removePageLink(this);
  }

}

/***/ }),

/***/ "./src/frontend/editor/ModelController/ParamController/ParamController.js":
/*!********************************************************************************!*\
  !*** ./src/frontend/editor/ModelController/ParamController/ParamController.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParamController": () => (/* binding */ ParamController)
/* harmony export */ });
/* harmony import */ var _ModelController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ModelController */ "./src/frontend/editor/ModelController/ModelController.js");

class ParamController extends _ModelController__WEBPACK_IMPORTED_MODULE_0__.ModelController {
  /*constructor(model, parent) {
      super(model, parent);
  }*/
  getActions() {
    return [{
      'action': 'delete',
      'caption': 'Delete'
    }];
  }

  async doAction(name) {
    switch (name) {
      case 'delete':
        await this.delete();
        break;
    }
  }

  static async getView(view) {
    return await FrontHostApp.doHttpRequest({
      controller: 'Param',
      action: 'getView',
      params: {
        view: view
      }
    });
  }

  async delete() {
    await this.model.delete();
    this.parent.removeParam(this);
    EditorFrontHostApp.editorApp.treeWidget2.select(null);
    EditorFrontHostApp.editorApp.treeWidget2.rerender();
  }

}

/***/ }),

/***/ "./src/frontend/editor/PropertyGrid/PropertyGrid.jsx":
/*!***********************************************************!*\
  !*** ./src/frontend/editor/PropertyGrid/PropertyGrid.jsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PropertyGrid": () => (/* binding */ PropertyGrid)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


class PropertyGrid extends ReactComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getObj() {
    if (this.state.object) {
      return this.state.object.obj;
    }

    return null;
  }

  getOptions() {
    if (this.state.object) {
      return this.state.object.options;
    }

    return null;
  }

  onChange = (name, value) => {
    // console.log('PropertyGrid.onChange', name, value);
    if (this.props.onChange) {
      this.props.onChange(name, value);
    }
  };

  renderInput(name) {
    const obj = this.getObj();
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TextBox, {
      name: name,
      value: obj[name],
      spellCheck: "false",
      onChange: value => this.onChange(name, value),
      autocomplete: 'off'
    });
  }

  renderSelect(name) {
    const obj = this.getObj();
    const options = this.getOptions();
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ComboBox, {
      name: name,
      value: obj[name],
      items: options[name].map(value => ({
        value: value,
        title: value
      })),
      onChange: value => this.onChange(name, value)
    });
  }

  renderRows() {
    const obj = this.getObj();
    const options = this.getOptions();
    return Object.keys(obj).map(name => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
        children: name
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
        children: options[name] !== undefined ? this.renderSelect(name) : this.renderInput(name)
      })]
    }, name));
  }

  render() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: 'PropertyGrid full frame',
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: 'frame__container',
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("table", {
          className: 'PropertyGrid__table',
          cellPadding: 0,
          cellSpacing: 0,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tbody", {
            children: this.getObj() && this.renderRows()
          })
        })
      })
    });
  }

}

/***/ }),

/***/ "./src/frontend/editor/TreeWidget/TreeItem.jsx":
/*!*****************************************************!*\
  !*** ./src/frontend/editor/TreeWidget/TreeItem.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TreeItem": () => (/* binding */ TreeItem)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


class TreeItem extends ReactComponent {
  constructor(props) {
    super(props);
    this.state = {
      opened: props.item.opened !== undefined ? props.item.opened : false
    };
    this.li = React.createRef();
  }

  onDivMouseDown = e => {
    // console.log('TreeItem.onDivMouseDown', e.currentTarget);
    const item = this.props.item;
    const tree = this.props.tree;
    tree.select(item);
  };
  onDivDoubleClick = e => {
    // console.log('TreeItem.onDivDoubleClick');
    const item = this.props.item;
    const tree = this.props.tree;
    tree.onDoubleClick(item);
  };
  onNodeMouseDown = e => {
    // console.log('TreeItem.onNodeMouseDown', e.currentTarget);
    const item = this.props.item;
    const tree = this.props.tree;
    const opened = this.state.opened;
    e.stopPropagation();
    this.setState(prevState => {
      return {
        opened: !prevState.opened
      };
    });

    if (!opened) {
      tree.onOpen(item);
    }
  };

  isSelected() {
    return this.props.tree.getSelectedItem() === this.props.item;
  }

  isOpened() {
    return this.state.opened;
  }

  getElement() {
    return this.li.current;
  }

  open() {
    console.log('TreeItem.open', this.props.item.getTitle());
    this.state.opened = true;

    if (this.parent) {
      this.parent.open();
    } else {
      console.log('this.parent', this.parent);
    }
  }

  render() {
    // console.log('TreeItem.render', this.props.item.getTitle());
    const tree = this.props.tree;
    const item = this.props.item;
    const items = item.items;
    const hasItems = !!(items && items.length);
    const isNode = item.node || hasItems;
    const style = item.getStyle ? item.getStyle() : null;
    const title = item.getTitle();
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
      ref: this.li,
      className: this.isOpened() ? 'opened' : null,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: this.isSelected() ? 'active' : null,
        style: {
          paddingLeft: this.props.paddingLeft
        },
        onMouseDown: this.onDivMouseDown,
        onDoubleClick: this.onDivDoubleClick,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: isNode ? 'node' : 'leaf',
          onMouseDown: this.onNodeMouseDown
        }), "\xA0", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          style: style,
          children: title
        })]
      }), hasItems && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ul", {
        children: items.map(item => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TreeItem, {
          tree: tree,
          item: item,
          paddingLeft: this.props.paddingLeft + 15,
          onCreate: c => {
            // console.log('onCreate', this.props.item.getTitle(), item.getTitle());
            c.parent = this;
            item.view = c;
          }
        }, item.getTitle()))
      })]
    }, title);
  }

}

/***/ }),

/***/ "./src/frontend/editor/TreeWidget/TreeWidget.jsx":
/*!*******************************************************!*\
  !*** ./src/frontend/editor/TreeWidget/TreeWidget.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TreeWidget": () => (/* binding */ TreeWidget)
/* harmony export */ });
/* harmony import */ var _TreeItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TreeItem */ "./src/frontend/editor/TreeWidget/TreeItem.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


class TreeWidget extends ReactComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null
    };
  }

  async select(item) {
    console.log('TreeWidget.select', item ? item.getTitle() : null);
    if (this.isSelected(item)) return;
    return new Promise(resolve => {
      this.setState({
        selectedItem: item
      }, () => {
        if (this.props.onItemSelect) this.props.onItemSelect(item);
        resolve();
      });
    });
  }

  onDoubleClick(item) {
    // console.log('TreeWidget.onDoubleClick', item);
    if (this.props.onItemDoubleClick) this.props.onItemDoubleClick(item);
  }

  onOpen(item) {
    if (this.props.onItemOpen) this.props.onItemOpen(item);
  }

  isSelected(item) {
    return this.state.selectedItem === item;
  }

  getSelectedItem() {
    return this.state.selectedItem;
  }

  scrollToSelected() {
    console.log('TreeWidget.scrollToSelected', this.getSelectedItem().getTitle());
    this.getSelectedItem().view.getElement().scrollIntoView();
  }

  render() {
    console.log('TreeWidget.render'
    /*, this.props.items*/
    );
    const items = this.props.items;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: this.getCssClassNames(),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("ul", {
        children: items.map(item => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_TreeItem__WEBPACK_IMPORTED_MODULE_0__.TreeItem, {
          tree: this,
          item: item,
          paddingLeft: 5,
          onCreate: c => item.view = c
        }, item.getTitle()))
      })
    });
  }

}

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