class ViewerFrontHostApp extends FrontHostApp {
    run() {
        console.log('ViewerFrontHostApp.run', this.data);

        // application
        const application = new Application(this.data);
        application.init();

        // applicationController
        const applicationController = ApplicationController.create(application);
        applicationController.init();

        // view
        const rootElementName = `.${applicationController.getViewClass().name}__root`;
        const rootElement = document.querySelector(rootElementName);
        if (!rootElement) {
            throw new Error(`no root element: ${rootElementName}`);
        }
        applicationController.createView(rootElement);
    }
}

window.QForms.ViewerFrontHostApp = ViewerFrontHostApp;

class Controller extends EventEmitter {
    constructor(model, parent) {
        super();
        this.model    = model;
        this.parent   = parent;
        this.view     = null;
        this.deinited = false;
    }
    init() {
    }
    deinit() {
        if (this.deinited) throw new Error(`${this.model.getFullName()}: controller already deinited`);
        this.deinited = true;
    }
    onViewCreate = view => {
        // console.log('Controller.onViewCreate', this.model.getFullName());
        this.view = view;
    }
    rerender() {
        if (this.view) {
            this.view.rerender();
        } else {
            console.error(`Controller.rerender no view: ${this.model.getFullName()}`);
        }
    }
    getModel() {
        return this.model;
    }
    getParent() {
        return this.parent;
    }
}

window.QForms.Controller = Controller;

class ApplicationController extends Controller {
    static create(model) {
        // console.log('ApplicationController.create', 'debug:', ApplicationController.isInDebugMode());
        const CustomClass = FrontHostApp.getClassByName(`${model.getName()}ApplicationController`);
        const Class = CustomClass ? CustomClass : SdiApplicationController;
        return new Class(model);
    }
    static getSearchObj() {
        // console.log('ApplicationController.getSearchObj:', window.location);
        if (!window.location.search.split('?')[1]) return {};
        return window.location.search.split('?')[1].split('&').reduce((acc, item) => {
            const kv = item.split('=');
            acc[kv[0]] = kv[1];
            return acc;
        }, {});
    }
    static isInDebugMode() {
        return ApplicationController.getSearchObj()['debug'] === '1';
    }
    constructor(model) {
        // console.log('ApplicationController.constructor', model, view);
        super(model, null);
        this.lastPageId = 0;
        this.modalPages = [];
        this.activePage = null;
        this.statusbar  = null;
    }
    init() {
        // console.log('ApplicationController.init');
        super.init();
        // this.model.on('logout' , this.onLogout);
        this.model.on('request', this.onRequest);
        this.activePage = this.createPage();
    }
    deinit() {
        // this.model.off('logout', this.onLogout);
        this.model.off('request', this.onRequest);
        super.deinit();
    }
    getViewClass() {
        return ApplicationView;
    }
    createView(root) {
        // console.log('ApplicationController.createView');
        this.view = Helper.createReactComponent(root, this.getViewClass(), {ctrl: this});
        if (this.statusbar) {
            this.statusbar.setLastQueryTime(this.model.getAttr('time'));
        }
    }
    onRequest = e => {
        // console.log('onRequest', e);
        if (this.statusbar) {
            this.statusbar.setLastQueryTime(e.time);
        }
    }
    async openPage(options) {
        console.log('ApplicationController.openPage', options);
        const name       = options.name;
        const key        = options.key || null;
        const parentPage = options.parentPage;
        const isModal    = options.modal   !== undefined ? options.modal   : true;
        const isNewMode  = options.newMode !== undefined ? options.newMode : false;
        const params     = options.params || {};

        // if this page with this key is already opened, then show it
        const pageController = this.findPageControllerByPageNameAndKey(name, key);
        // console.log('pageController:', pageController);
        if (pageController) {
            this.onPageSelect(pageController);
            return;
        }

        //console.log('open ' + name + ' with key: ' + key);

        const {page: pageData} = await this.model.request({
            action        : 'page',
            page          : name,
            newMode       : isNewMode,
            parentPageName: parentPage ? parentPage.getName() : null,
            params        : Helper.encodeObject({
                ...(parentPage ? parentPage.getParams() : {}),
                ...params,
                ...(key ? DataSource.keyToParams(key) : {})
            })
        });

        const pageModel = new Page(pageData, this.model, {
            id            : `p${this.getNextPageId()}`,
            modal         : isModal,
            parentPage    : parentPage,
            params        : {
                ...params,
                ...(key ? DataSource.keyToParams(key) : {}),
            },
        });
        pageModel.init();
        const pc = PageController.create(pageModel, this);
        pc.init();
        isModal ? this.modalPages.push(pc) : this.onPageCreate(pc);
        this.rerender();
        // console.log('pc:', pc);
    }
    getNextPageId() {
        this.lastPageId++;
        return this.lastPageId;
    }
    createPage() {
        if (!this.model.data.pages[0]) return;
        const pageData = this.model.data.pages[0];

        // model
        const page = new Page(pageData, this.model, {
            id   : `p${this.getNextPageId()}`,
            modal: false
        });
        page.init();

        // controller
        const pc = PageController.create(page, this);
        pc.init();
        return pc;
    }
    onPageCreate(pc) {
        if (this.activePage) {
            this.closePage(this.activePage);
        }
        this.activePage = pc
        this.rerender();
    }
    findPageControllerByPageNameAndKey(pageName, key) {
        if (this.activePage && this.activePage.model.getName() === pageName && this.activePage.model.getKey() === key) {
            return this.activePage;
        }
        return null;
    }
    onPageSelect(pc) {
        console.log('SdiApplicationController.onPageSelect', pc.model.getName());
    }
    closePage(pageController) {
        console.log('SdiApplicationController.closePage', pageController.model.getFullName());
        if (this.modalPages.indexOf(pageController) > -1) {
            this.modalPages.splice(this.modalPages.indexOf(pageController), 1);
        } else if (this.activePage === pageController) {
            this.activePage = null;
        } else  {
            throw new Error('page not found');
        }
        this.rerender();
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
            ...(this.model.data.menu ? Object.keys(this.model.data.menu).map(key => ({
                name : key,
                title: key,
                items: this.model.data.menu[key].map(item => ({
                    type : item.type,
                    name : item.page || item.action,
                    title: item.caption
                }))
            })) : []),
            // user
            ...(this.model.getUser() ? [{
                name : 'user',
                title: `${this.model.getDomain()}/${this.model.getUser().name}`,
                items: [
                    {
                        type : 'custom',
                        name : 'logout',
                        title: 'Logout'
                    }
                ]
            }] : [])
        ];
    }
    onStatusbarCreate = statusbar => {
        this.statusbar = statusbar;
    }
    onLogout = async () => {
        console.log('ApplicationController.onLogout');
        const result = await this.model.request({action: 'logout'});
        location.reload();
    }
    onMenuItemClick = async (menu, type, name) => {
        console.log('ApplicationController.onMenuItemClick', menu, type, name);
        // try {
            if (type === 'page') {
                await this.openPage({name: name, modal: false});
            } else if (type === 'action') {
                const result = await this.onActionClick(name);
                if (!result) {
                    throw new Error(`no handler for action '${name}'`);
                }
            } else if (type === 'custom' && name === 'logout') {
                await this.onLogout();
            } else {
                throw new Error(`unknown menu type/name: ${type}/${name}`);
            }
        // } catch (err) {
        //     console.error(err);
        //     alert(err.message);
        // }
    }
}

window.QForms.ApplicationController = ApplicationController;

class MdiApplicationController extends ApplicationController {
    constructor(model) {
        super(model);
        this.pages = null;
        this.tab = null;
    }
    init() {
        super.init();
        this.pages = this.createPages();
        this.activePage = this.pages.length ? this.pages[0] : null;
    }
    deinit() {
        // TabWidget
        /*this.tabWidget.off('tabClosingByUser', this.listeners.tabClosingByUser);
        this.tabWidget.off('tabShow', this.listeners.tabShow);
        this.tabWidget.off('tabHide', this.listeners.tabHide);*/
        super.deinit();
    }
    getViewClass() {
        return MdiApplicationView;
    }
    /*onTabShow(e) {
        // console.log('ApplicationController.onTabShow', e.tab.pageController);
        if (e.tab.pageController) {
            e.tab.pageController.emit('show', {source: this});
        }
    }*/

    /*onTabHide(e) {
        if (e.tab.pageController) {
            e.tab.pageController.emit('hide', {source: this});
        }
    }*/
    onTabCreate = tab => {
        // console.log('MdiApplicationController.onTabCreate', tab);
        this.tab = tab;
    }
    onTabMouseDown = i => {
        // console.log('MdiApplicationController.onTabMouseDown');
        if (this.activePage !== this.pages[i]) {
            this.activePage = this.pages[i];
            this.rerender();
        }
    }
    createPages() {
        return this.model.data.pages.map(pageData => {
            const page = new Page(pageData, this.model, {
                id   : `p${this.getNextPageId()}`,
                modal: false
            });
            page.init();

            // controller
            const pageController = PageController.create(page, this);
            pageController.init();
            return pageController;
        });
    }
    onPageSelect(pc) {
        console.log('ApplicationController.onPageSelect', pc.model.getName());
        const i = this.pages.indexOf(pc);
        if (i === -1) throw new Error(`no page controller ${pc.model.getName()} in pages`);
        this.activePage = pc;
        this.tab.rerender();
    }
    getActivePageIndex = () => {
        const i = this.activePage ? this.pages.indexOf(this.activePage) : null;
        if (i === -1) throw new Error('active page not in list');
        return i;
    }
    closePage(pageController) {
        // console.log('ApplicationController.closePage', pageController.model.getFullName());
        if (this.pages.indexOf(pageController) > -1) {
            this.pages.splice(this.pages.indexOf(pageController), 1);
            if (this.activePage === pageController) {
                this.activePage = this.pages[this.pages.length - 1];
            }
        } else if (this.modalPages.indexOf(pageController) > -1) {
            this.modalPages.splice(this.modalPages.indexOf(pageController), 1);
        } else {
            throw new Error('page not found');
        }
        this.rerender();
        pageController.deinit();
        pageController.model.deinit();
    }
    onTabClose = i => {
        console.log('ApplicationController.onTabClose', this.pages[i].model.getFullName());
        this.closePage(this.pages[i]);
    }
    findPageControllerByPageNameAndKey(pageName, key) {
        return this.pages.find(({model}) => model.getName() === pageName && model.getKey() === key);
    }
    onPageCreate(pc) {
        this.pages.push(this.activePage = pc);
    }
}

window.QForms.MdiApplicationController = MdiApplicationController;

class SdiApplicationController extends ApplicationController {
    getViewClass() {
        return SdiApplicationView;
    }
}

window.QForms.SdiApplicationController = SdiApplicationController;

class FieldController extends Controller {

    /*constructor(model, parent) {
        super(model, parent);
    }*/

    static create(model, parent) {
        // console.log('FieldController.create', model.getFullName(), parent.model.getClassName());
        const page = model.getPage();
        const form = model.getForm();
        const CustomClass = FrontHostApp.getClassByName(`${page.getName()}${form.getName()}${model.getName()}FieldController`);
        const GeneralClass = FrontHostApp.getClassByName(`${parent.model.getClassName()}${model.getClassName()}Controller`);
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
            default: throw new Error(`${this.model.getFullName()}: unknown value type: ${typeof value}, value: ${value}`);
        }
    }

    stringToValue(stringValue) {
        // console.log('FieldController.stringToValue', this.model.getFullName(), stringValue);
        // if (stringValue === undefined) return undefined;
        // if (stringValue === null) return null;
        const fieldType = this.model.getType();
        // console.log('fieldType:', fieldType);
        if (stringValue.trim() === '') return null;
        if (fieldType === 'object' || fieldType === 'boolean') {
            return JSON.parse(stringValue);
        } else if (fieldType === 'date') {
            const date = new Date(stringValue);
            if (date.toString() === 'Invalid Date') throw new Error(`invalid date: ${stringValue}`);
            return date;
        } else if (fieldType === 'number') {
            const num = Number(stringValue);
            if (isNaN(num)) throw new Error('not a number');
            return num;
        }
        return stringValue;
    }

    renderViewStyle(row) {
        return null;
    }

}
window.QForms.FieldController = FieldController;

class RowFormFieldController extends FieldController {
    constructor(model, parent) {
        super(model, parent);
        this.state = {
            value     : null,
            parseError: null,
            error     : null,
            changed   : false,
        };
    }
    init() {
        const row = this.getRow();
        const value = this.model.getValue(row);
        this.setValue(value);
        // console.log(this.model.getFullName(), value);
    }
    refill() {
        // console.log('RowFormFieldController.refill', this.model.getFullName());
        if (!this.view) return;
        const value = this.model.getValue(this.getRow());
        this.setValue(value);
        this.resetErrors();
        this.refreshChanged();
    }
    getViewClass() {
        return RowFormTextBoxFieldView;
    }
    getRow() {
        return this.model.getForm().getRow();
    }
    copyValueToModel() {
        // console.log('RowFormFieldController.copyValueToModel', this.model.getFullName());
        this.model.setValue(this.getRow(), this.getValue());
    }
    _onChange(viewValue) {

    }
    putValue(viewValue) {
        // console.log('RowFormFieldController.putValue', viewValue);
        this.onChange(viewValue, false);
    }
    onChange = async (viewValue, fireEvent = true) => {
        // console.log('RowFormFieldController.onChange', viewValue);
        this._onChange(viewValue);
        this.resetErrors();
        try {
            this.setValueFromView(viewValue);
        } catch (err) {
            console.error(`${this.model.getFullName()}: cannot parse view value: ${err.message}`);
            this.state.parseError = err.message;
        }

        if (this.model.validateOnChange()) {
            this.validate();
            if (this.isValid()) {
                this.copyValueToModel();
            }
        }
        this.refreshChanged();
        if (fireEvent) {
            try {
                this.emit('change', {value: viewValue});
            } catch (err) {
                console.error('unhandled change event error:', this.model.getFullName(), err);
            }
            this.parent.onFieldChange({source: this});
        }
    }
    onBlur = (viewValue, fireEvent = true) => {
        // console.log('RowFormFieldController.onBlur', this.model.getFullName());
        if (this.model.validateOnBlur()) {
            console.log('validateOnBlur');
            this.validate();
            if (this.isValid()) {
                this.model.setValue(this.getRow(), this.getValue());
            }
            this.refreshChanged();
            if (fireEvent) {
                try {
                    this.emit('change', {value: viewValue});
                } catch (err) {
                    console.error('unhandled change event error:', this.model.getFullName(), err);
                }
                this.parent.onFieldChange({source: this});
            }
        }
    }
    getValueForView() {
        const value = this.getValue();
        // console.log('value:', this.model.getFullName(), value, typeof value);
        return this.valueToString(value);
    }
    setValueFromView(viewValue) {
        // console.log('RowFormFieldController.setValueFromView', this.model.getFullName(), typeof viewValue, viewValue);
        if (typeof viewValue !== 'string') throw new Error(`${this.model.getFullName()}: viewValue must be string, but got ${typeof viewValue}`);
        const value = this.stringToValue(viewValue);
        // console.log('value:', value);
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
        return this.state.changed;
    }
    isValid() {
        return this.state.error === null;
    }
    validate() {
        // console.log('RowFormFieldController.validate', this.model.getFullName());
        this.state.error = this.getError();
    }
    refreshChanged() {
        this.state.changed = this.calcChangedState(this.getRow());
    }
    getPlaceholder() {
        // console.log('RowFormFieldController.getPlaceholder', this.model.getFullName(), this.model.getAttr('placeholder'));
        if (this.model.getAttr('placeholder')) return this.model.getAttr('placeholder');
        if (ApplicationController.isInDebugMode()) {
            const value = this.getValue();
            if (value === undefined) return 'undefined';
            if (value === null) return 'null';
            if (value === '') return 'empty string';
        }
    }
    getError() {
        // console.log('RowFormFieldController.getError', this.model.getFullName());

        // parse validator
        if (this.view) {
            try {
                const viewValue = this.view.getValue();
            } catch (err) {
                return `can't parse value: ${err.message}`;
            }
        }

        // null validator
        const value = this.getValue();
        if (this.model.isNotNull() && (value === null || value === undefined)) {
            return 'not null';
        }
        return null;
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
            const fieldRawValue = Helper.encodeValue(this.getValue());
            const dsRawValue = this.model.getRawValue(row);
            if (fieldRawValue !== dsRawValue) {
                console.log(`FIELD CHANGED ${this.model.getFullName()}`, dsRawValue, fieldRawValue);
                return true;
            }
        }
        if (this.model.isChanged(row)) {
            let original = row[this.model.getAttr('column')];
            let modified = this.model.getDefaultDataSource().getRowWithChanges(row)[this.model.getAttr('column')];
            if (original) original = original.substr(0, 100);
            if (modified) modified = modified.substr(0, 100);
            console.log(`FIELD MODEL CHANGED ${this.model.getFullName()}:`, original, modified);
            return true;
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
}
window.QForms.RowFormFieldController = RowFormFieldController;

class RowFormCheckBoxFieldController extends RowFormFieldController {
    getValueForView() {
        return this.getValue();
    }
    setValueFromView(viewValue) {
        this.setValue(viewValue);
    }

    getViewClass() {
        return RowFormCheckBoxFieldView;
    }
}

window.QForms.RowFormCheckBoxFieldController = RowFormCheckBoxFieldController;

class RowFormComboBoxFieldController extends RowFormFieldController {
    getItems() {
        return this.getRows().map(row => ({
            value: this.model.getValueValue(row).toString(),
            title: this.model.getDisplayValue(row).toString()
        }));
    }
    getRows() {
        return this.model.getComboBoxDataSource().getRows();
    }
    getViewClass() {
        return RowFormComboBoxFieldView;
    }
    getPlaceholder() {
        if (this.model.getAttr('placeholder')) return this.model.getAttr('placeholder');
        return ApplicationController.isInDebugMode() ? '[null]' : null;
    }
}

window.QForms.RowFormComboBoxFieldController = RowFormComboBoxFieldController;

class RowFormDatePickerFieldController extends RowFormFieldController {
    getViewClass() {
        return RowFormDatePickerFieldView;
    }
    getValueForView() {
        return this.getValue();
    }
    setValueFromView(viewValue) {
        this.setValue(viewValue);
    }
}
window.QForms.RowFormDatePickerFieldController = RowFormDatePickerFieldController;

class RowFormDateTimeFieldController extends RowFormFieldController {
    constructor(...args) {
        super(...args);
        this.view2 = null;
        this.defaultValue = 0;
        this.state.parseError2 = null;
        this.state.error2 = null;
    }
    getViewClass() {
        return RowFormDateTimeFieldView;
    }
    getValueForView() {
        return this.getValue();
    }
    getValueForTime() {
        // console.log('RowFormDateTimeFieldController.getValueForTime', this.model.getFullName(), this.defaultValue, TimeBox.getStringValue(this.defaultValue));
        const date = this.getValue();
        if (date) {
            const value = date.getHours() * 60 + date.getMinutes();
            // console.log('value:', value);
            if (value !== this.defaultValue) {
                // console.log('not equal to default value', value, this.defaultValue);
                return value;
            }
        }
        return null;
    }
    setValueFromView(viewValue) {
        if (viewValue === null) {
            this.state.parseError2 = null;
            this.resetErrors2();
            if (this.view2) this.view2.setValue(null);
        } else {
            const [h, m] = TimeBox.splitTime(this.defaultValue);
            viewValue.setHours(h, m);
        }
        this.setValue(viewValue);
    }
    onView2Create = view2 => {
        // console.log('RowFormDateTimeFieldController.onView2Create', view2);
        this.view2 = view2;
    };
    _onChange(viewValue) {
        // console.log('RowFormDateTimeFieldController._onChange', this.view2);
        if (viewValue !== null) {
            setTimeout(() => {
                const input = this.view2.getInput();
                input.focus();
                input.setSelectionRange(0, input.value.length);
            }, 0);
        }
    }
    onChange2 = (viewValue, fireEvent = true) => {
        // console.log('RowFormDateTimeFieldController.onChange2', viewValue);
        this.resetErrors2();
        try {
            this.setValueFromView2(viewValue);
        } catch (err) {
            console.log(`${this.model.getFullName()}: cannot parse time: ${err.message}`);
            this.state.parseError2 = err.message;
        }
        if (!this.state.parseError2) {
            this.validate2();
            if (this.isValid()) {
                this.copyValueToModel();
            }
        }
        this.refreshChanged();
        if (fireEvent) {
            try {
                this.emit('change', {value: viewValue});
            } catch (err) {
                console.error('unhandled change event error:', this.model.getFullName(), err);
            }
            this.parent.onFieldChange({source: this});
        }
    };
    onBlur2 = (viewValue, fireEvent = false) => {
        // console.log('RowFormDateTimeFieldController.onBlur2', viewValue);
        if (!this.isEditable()) return;
        this.validate2();
        if (this.isValid()) {
            this.copyValueToModel();
        }
        this.refreshChanged();
        if (fireEvent) {
            try {
                this.emit('change', {value: viewValue});
            } catch (err) {
                console.error('unhandled change event error:', this.model.getFullName(), err);
            }
        }
        this.parent.onFieldChange({source: this});
    };
    getPlaceholder2() {
        return TimeBox.getStringValue(this.defaultValue);
    }
    getDefaultValue() {
        return this.defaultValue;
    }
    setDefaultValue(defaultValue) {
        // console.log('RowFormDateTimeFieldController.setDefaultValue', this.view2 ? this.view2.getValue() : null);
        if (typeof defaultValue === 'string') {
            this.defaultValue = TimeBox.getIntegerValue(defaultValue);
        } else {
            if (defaultValue >= 24 * 60) throw new Error(`wrong default value: ${defaultValue}`);
            this.defaultValue = defaultValue;
        }
        if (this.view2 && this.view2.getValue() === null && this.state.value) {
            this.setValue2(null);
        }
    }
    setValueFromView2(viewValue) {
        if (isNaN(viewValue)) throw new Error('wrong time');
        this.setValue2(viewValue);
    }
    setValue2(viewValue) {
        const value = viewValue !== null ? viewValue : this.defaultValue;
        const [h, m] = TimeBox.splitTime(value);
        this.state.value.setHours(h, m);
    }
    validate2() {
        // console.log('RowFormFieldController.validate', this.model.getFullName());
        this.state.error2 = this.getError2();
    }
    getError2() {
        // console.log('RowFormFieldController.getError', this.model.getFullName());

        // parse validator
        if (this.view2) {
            try {
                const viewValue = this.view2.getValue();
            } catch (err) {
                return `can't parse time: ${err.message}`;
            }
        }

        return null;
    }
    isParseError2() {
        return this.state.parseError2 !== null;
    }
    resetErrors2() {
        this.setError2(null);
        this.state.parseError2 = null;
    }
    setError2(error2) {
        this.state.error2 = error2;
    }
    getErrorMessage2() {
        if (this.state.parseError2) {
            return this.state.parseError2;
        }
        return this.state.error2;
    }
    isValid2() {
        return this.state.error2 === null;
    }
    refill() {
        // console.log('RowFormDateTimeFieldController.refill');
        if (!this.view2) return;
        super.refill();
        this.view2.setValue(this.getValueForTime());
        this.resetErrors2();
        this.refreshChanged();
    }
    isParseError() {
        return super.isParseError() || this.isParseError2();
    }
    isValid() {
        return super.isValid() && this.isValid2();
    }
    getErrorMessage() {
        if (super.getErrorMessage() === null && this.getErrorMessage2() === null) return null;
        return [
            ...(super.getErrorMessage() ? [super.getErrorMessage()] : []),
            ...(this.getErrorMessage2() ? [this.getErrorMessage2()] : [])
        ].join(', ');
    }
}
window.QForms.RowFormDateTimeFieldController = RowFormDateTimeFieldController;

class RowFormFileFieldController extends RowFormFieldController {
    getViewClass() {
        return RowFormFileFieldView;
    }
}
window.QForms.RowFormFileFieldController = RowFormFileFieldController;

class RowFormImageFieldController extends RowFormFieldController {
    getViewClass() {
        return RowFormImageFieldView;
    }
}
window.QForms.RowFormImageFieldController = RowFormImageFieldController;

class RowFormLinkFieldController extends  RowFormFieldController {
    getViewClass() {
        return RowFormLinkFieldView;
    }
    onClick = e => {
        console.log('RowFormLinkFieldController.onClick', e);
        this.emit({source: this});
    }
}
window.QForms.RowFormLinkFieldController = RowFormLinkFieldController;

class RowFormTextAreaFieldController extends RowFormFieldController {
    getViewClass() {
        return RowFormTextAreaFieldView;
    }
}
window.QForms.RowFormTextAreaFieldController = RowFormTextAreaFieldController;

class RowFormTextBoxFieldController extends RowFormFieldController {
    getViewClass() {
        return RowFormTextBoxFieldView;
    }
}
window.QForms.RowFormTextBoxFieldController = RowFormTextBoxFieldController;

class RowFormTimeFieldController extends RowFormFieldController {
    constructor(...args) {
        super(...args);
        this.defaultValue = null;
    }
    getViewClass() {
        return RowFormTimeFieldView;
    }
    getValueForView() {
        return this.getValue();
    }
    setValueFromView(viewValue) {
        if (isNaN(viewValue)) throw new Error('wrong time');
        this.setValue(viewValue);
    }
    getDefaultValue() {
        return this.defaultValue;
    }
    setDefaultValue(defaultValue) {
        if (typeof defaultValue === 'string') {
            this.defaultValue = TimeBox.getIntegerValue(defaultValue);
        } else {
            if (defaultValue >= 24*60) throw new Error(`wrong default value: ${defaultValue}`);
            this.defaultValue = defaultValue;
        }
    }
    getPlaceholder() {
        // console.log('CarReservefromTimeController.getPlaceholder', this.defaultValue);
        if (this.defaultValue !== null) return TimeBox.getStringValue(this.defaultValue);
        return super.getPlaceholder();
    }
}
window.QForms.RowFormTimeFieldController = RowFormTimeFieldController;

class TableFormFieldController extends FieldController {
    getViewClass() {
        return TableFormTextBoxFieldView;
    }
    getValueForView(row) {
        // console.log('TableFormFieldController.getValueForView');
        return this.valueToString(this.model.getValue(row));
    }
    renderViewStyle(row) {
        return null;
    }
}
window.QForms.TableFormFieldController = TableFormFieldController;

class TableFormCheckBoxFieldController extends TableFormFieldController {
    getViewClass() {
        return TableFormCheckBoxFieldView;
    }
    getValueForView(row) {
        return this.model.getValue(row);
    }
}
window.QForms.TableFormCheckBoxFieldController = TableFormCheckBoxFieldController;

class TableFormComboBoxFieldController extends TableFormFieldController {
    getViewClass() {
        return TableFormComboBoxFieldView;
    }
    getValueForView(row) {
        const rawValue = this.model.getRawValue(row);
        if (rawValue === undefined || rawValue === 'null') return '';
        const cbRow = this.model.findRowByRawValue(rawValue);
        if (cbRow) {
            return this.valueToString(this.model.getDisplayValue(cbRow));
        }
        return `[no row for id: ${rawValue}]`;
    }


    /*init() {
        //console.log('TableFormComboBoxFieldController.init: ' + this.model.getFullName());
        super.init();
        if (!this.model.data.dataSourceName) {
            throw new Error(`[${this.model.getFullName()}] no dataSourceName`);
        }
        const dataSource = this.model.getComboBoxDataSource();
        if (!dataSource) {
            throw new Error(`[${this.model.getFullName()}] cannot find data source '${this.model.data.dataSourceName}'`);
        }
        dataSource.on('update', this.listeners.rowUpdate = this.onRowUpdate.bind(this));
        dataSource.on('removeRow', this.listeners.removeRow = this.onRemoveRow.bind(this));
        dataSource.on('newRow'   , this.listeners.newRow    = this.onNewRow.bind(this));
        dataSource.on('moveRow'  , this.listeners.moveRow   = this.onMoveRow.bind(this));
    }*/

    /*deinit(row, view) {
        //console.log('TableFormComboBoxFieldController.deinit: ' + this.model.getFullName());
        const dataSource = this.model.getComboBoxDataSource();
        dataSource.off('update', this.listeners.rowUpdate);
        dataSource.off('removeRow', this.listeners.removeRow);
        dataSource.off('newRow'   , this.listeners.newRow);
        dataSource.off('moveRow'  , this.listeners.moveRow);
        // ReactDOM.unmountComponentAtNode(view);
        super.deinit();
    }*/

    /*getItems() {
        return this.model.getComboBoxDataSource().getRows().map(row => ({
            value: this.model.getValueValue(row),
            title: this.model.getDisplayValue(row)
        }));
    }*/

    /*getStringValue(view) {
        if (this.model.getForm().getClassName() === 'RowForm') {
            return this.comboBox.getValue();
        }
        return super.getStringValue(view);
    }*/

    /*setValue(value, view) {
        // console.log('TableFormComboBoxFieldController.setValue', this.model.getFullName(), value);
        if (this.model.getForm().getClassName() === 'RowForm') {
            throw new Error('TableFormComboBoxFieldController.setValue not implemented');
        } else if (this.model.getForm().getClassName() === 'TableForm') {
            view.firstElementChild.value = value;
            if (value) {
                const key = JSON.stringify([value]);
                const row = this.model.getComboBoxDataSource().getRow(key);
                if (row) {
                    view.firstElementChild.innerHTML = this.model.getDisplayValue(row);
                } else {
                    view.firstElementChild.innerHTML = '{id: ' + value + '}';
                }
            } else {
                view.firstElementChild.innerHTML = '';
            }
        }
    }*/

    /*_fillSelectOptions(view) {
        const nullOption = document.createElement('option');
        /!*if (this.model.data.notNull === 'true') {
            nullOption.innerHTML = `-- ${this.model.getApp().getText().field.selectValue} --`;
        }*!/
        view.firstElementChild.appendChild(nullOption);
        const rows = this.model.getComboBoxDataSource().getRows();
        for (let i = 0; i < rows.length; i++) {
            this._createOption(view, i);
        }
    }*/

    /*_createOption(view, i) {
        const dataSource = this.model.getComboBoxDataSource();
        const row = dataSource.getRowByIndex(i);
        const key = dataSource.getRowKey(row);
        const option = document.createElement('option');
        option.innerHTML = this.model.getDisplayValue(row);
        option.dbRow     = row;
        option.value     = JSON.parse(key)[0];
        FrontHostApp.insertNewNodeAt(view.firstElementChild, option, i + 1); // at 0 position always null-value
        view.keyToOption[key] = option;
        return option;
    }*/

    /*onRowUpdate(ea) {
        //console.log('TableFormComboBoxFieldController.onRowUpdate');
        //console.log(ea);
        const key = ea.key;
        if (this.model.getForm().getClassName() === 'RowForm') {
            for (const view in this.views.values()) {
                const option = view.keyToOption[key];
                this._refillRow(option);
            }
        }
    }*/

    /*_refillRow(option) {
        option.innerHTML = this.model.getDisplayValue(option.dbRow);
    }*/

    /*onRemoveRow(ea) {
        const key = ea.key;
        switch (this.model.getForm().getClassName()) {
            case 'RowForm':
                for (const k in this.views) {
                    const view = this.views[k];
                    const option = view.keyToOption[key];
                    view.firstElementChild.removeChild(option);
                    delete view.keyToOption[key];
                }
                break;
        }
    }*/

    /*onNewRow(ea) {
        //console.log('TableFormComboBoxFieldController.onNewRow');
        //console.log(ea);
        switch (this.model.getForm().getClassName()) {
            case 'RowForm':
                const key = this.model.getForm().getDefaultDataSource().getRowKey(this.model.getForm().row);
                const view = this.views[key];
                this._createOption(view, ea.i);
                break;
        }
    }*/

    /*onMoveRow(ea) {
        const newIndex = ea.newIndex;
        const oldIndex = ea.oldIndex;
        const key      = ea.key;
        switch (this.model.getForm().getClassName()) {
            case 'RowForm':
                for (const k in this.views) {
                    const view = this.views[k];
                    const option = view.keyToOption[key];
                    FrontHostApp.moveNode(view.firstElementChild, option, oldIndex, newIndex + 1);
                    this._refillRow(option);
                }
                break;
        }
    }*/
}
window.QForms.TableFormComboBoxFieldController = TableFormComboBoxFieldController;

class TableFormDatePickerFieldController extends TableFormFieldController {
    getViewClass() {
        return TableFormDatePickerFieldView;
    }
    getValueForView(row) {
        const value = this.model.getValue(row);
        if (value) return Helper.formatDate(value, this.model.getFormat() || '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}');
        return '';
    }
}
window.QForms.TableFormDatePickerFieldController = TableFormDatePickerFieldController;

class TableFormDateTimeFieldController extends TableFormFieldController {
    getViewClass() {
        return TableFormDatePickerFieldView;
    }
    getValueForView(row) {
        const value = this.model.getValue(row);
        if (value) return Helper.formatDate(value, this.model.getFormat() || '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}');
        return '';
    }
}
window.QForms.TableFormDateTimeFieldController = TableFormDateTimeFieldController;

class TableFormLinkFieldController extends TableFormFieldController {
    getViewClass() {
        return TableFormLinkFieldView;
    }
    onClick = e => {
        console.log('TableFormLinkFieldController.onClick', e);
        this.emit('click', {source: this});
    }
}
window.QForms.TableFormLinkFieldController = TableFormLinkFieldController;

class TableFormTextAreaFieldController extends TableFormFieldController {

}
window.QForms.TableFormTextAreaFieldController = TableFormTextAreaFieldController;

class TableFormTextBoxFieldController extends TableFormFieldController {
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
    /*getViewClass() {
        return TableFormTextBoxFieldView;
    }*/
}
window.QForms.TableFormTextBoxFieldController = TableFormTextBoxFieldController;

class TableFormTimeFieldController extends TableFormFieldController {
    /*getViewClass() {
        return TableFormTextBoxFieldView;
    }*/
    getValueForView(row) {
        const value = this.model.getValue(row);
        return TimeBox.getStringValue(value);
    }
}
window.QForms.TableFormTimeFieldController = TableFormTimeFieldController;

class FormController extends Controller {

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
        return this.getPageController().openPage(options);
    }
    getPageController() {
        return this.parent;
    }
    isChanged() {
        return false;
    }
    async onFieldChange(e) {
        // console.log('FormController.onFieldChange', this.model.getFullName());
        await this.getPageController().onFormChange(e);
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
}
window.QForms.FormController = FormController;

class RowFormController extends FormController {
    constructor(model, parent) {
        super(model, parent);
        this.state = {
            updated: Date.now(),
            mode   : 'edit',
            hasNew : false,
            changed: false,
            valid  : true
        };
    }

    init() {
        super.init();
        this.model.on('refresh', this.onModelRefresh);
        this.model.on('insert' , this.onModelInsert);
        this.model.on('update' , this.onModelUpdate);
        if (this.model.getDefaultDataSource().getClassName() === 'SqlDataSource') {
            this.state.mode = 'view';
        }
        this.calcState();
    }

    deinit() {
        // console.log('RowFormController.deinit', this.model.getFullName());
        this.model.off('refresh', this.onModelRefresh);
        this.model.off('insert' , this.onModelInsert);
        this.model.off('update' , this.onModelUpdate);
        super.deinit();
    }

    calcState() {
        this.state.hasNew  = this.model.hasNew();
        this.state.changed = this.isChanged();
        this.state.valid   = this.isValid();
        /*if (this.state.hasNew) {
            this.state.mode = 'edit';
        }*/
        // console.log('changed:', changed);
        // console.log('hasNew:', hasNew);
    }

    refill() {
        console.log('RowFormController.refill', this.model.getFullName());
        for (const name in this.fields) {
            this.fields[name].refill();
        }
    }

    onModelRefresh = e => {
        console.log('RowFormController.onModelRefresh', this.model.getFullName());
        if (!this.view) return;
        this.refill();
        this.invalidate();
        this.rerender();
    }

    onModelInsert = e => {
        console.log('RowFormController.onModelInsert', this.model.getFullName());
        this.refill();
        this.invalidate();
        this.calcState();
        this.parent.onFormInsert(e);
    }

    onModelUpdate = e => {
        console.log('RowFormController.onModelUpdate', this.model.getFullName());
        this.refill();
        this.invalidate();
        this.calcState();
        this.parent.onFormUpdate(e);
    }

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
    }
    clearFieldsError() {
        for (const name in this.fields) {
            this.fields[name].setError(null);
        }
    }
    onSaveClick = async () => {
        console.log('RowFormController.onSaveClick');
        this.validate();
        if (this.isValid()) {
            this.state.mode = 'view';
            await this.model.update();
        } else {
            console.error(`cannot update invalid row form: ${this.model.getFullName()}`);
            this.rerender();
        }
    }

    onDiscardClick = () => {
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
        changedFields.forEach(name => {
            this.fields[name].refill();
        });

        // ui
        this.calcState();
        this.state.mode = 'view';
        this.rerender();

        // event
        this.parent.onFormDiscard(this);
    }

    onRefreshClick = async () => {
        // console.log('RowFormController.onRefreshClick', this.model.getFullName());
        await this.model.refresh();
    }

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
        // console.log('RowFormController.onEditClick', this);
        this.state.mode = 'edit';
        this.rerender();
    }
    onCancelClick = e => {
        // console.log('RowFormController.onCancelClick', this);
        this.state.mode = 'view';
        this.rerender();
    }
    getViewClass() {
        // console.log('RowFormController.getViewClass', this.model.getFullName());
        return RowFormView;
    }
    getActiveRow(withChanges) {
        return this.model.getRow(withChanges);
    }
    getMode() {
        return this.state.mode;
    }
}
window.QForms.RowFormController = RowFormController;

class TableFormController extends FormController {
    constructor(model, parent) {
        super(model, parent);
        this.state = {
            updated     : Date.now(),
            activeRowKey: null
        };
    }
    getViewClass() {
        return TableFormView;
    }
    init() {
        super.init();
        // this.parent.on('hide', this.onHidePage);
        // this.parent.on('show', this.onShowPage);
        this.model.on('refresh', this.onModelRefresh);
        this.model.on('update' , this.onModelUpdate);
        this.model.on('delete' , this.onModelDelete);
        this.model.on('insert' , this.onModelInsert);
    }
    deinit() {
        // this.parent.off('hide', this.onHidePage);
        // this.parent.off('show', this.onShowPage);
        this.model.off('refresh', this.onModelRefresh);
        this.model.off('update' , this.onModelUpdate);
        this.model.off('delete' , this.onModelDelete);
        this.model.off('insert' , this.onModelInsert);
        super.deinit();
    }
    onNewClick = async e => {
        console.log('TableFormController.onNewClick');
        await this.new();
    }
    onRefreshClick = async e => {
        console.log('TableFormController.onRefreshClick', this.model.getFullName());
        await this.model.refresh();
        // console.error('refresh error handler:', err.message);
        // alert(err.message);
    }
    onDeleteClick = e => {
        console.log('TableFormController.onDeleteClick', this.model.getFullName(), this.state.activeRowKey);
        if (confirm(this.model.getApp().getText().form.areYouSure)) {
            this.model.getDefaultDataSource().delete(this.state.activeRowKey);
        }
    }
    onGridCellDblClick = async (row) => {
        // console.log('TableFormController.onGridCellDblClick', row);
        // const bodyCell = e.bodyCell;
        // const row = bodyCell.bodyRow.dbRow;
        // console.log('row:', row);
        const key = this.model.getDefaultDataSource().getRowKey(row);
        // console.log('key:', key);
        switch (this.model.getAttr('editMethod')) {
            // case 'table':
            //     this.grid.gridColumns[bodyCell.qFieldName].beginEdit(bodyCell);
            // break;
            case 'form':
                await this.edit(key);
            break;
        }
    }
    onHidePage = () => {
        // this.grid.saveScroll();
    }
    onShowPage = () => {
        console.log('TableFormController.onShowPage', this.model.getFullName());
        /*if (!this.grid.isHidden()) {
            this.grid.restoreScroll();
            this.grid.focus();
            // console.log('document.activeElement:', document.activeElement);
        }*/
    }
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
                name   : this.model.getAttr('itemEditPage'),
                newMode: true,
                modal  : true
            });
        } else if (this.model.getAttr('newRowMode') === 'createform') {
            if (!this.model.getAttr('itemCreatePage')) {
                throw new Error(`[${this.model.getFullName()}] itemCreatePage is empty`);
            }
            await this.openPage({
                name   : this.model.getAttr('itemCreatePage'),
                newMode: true,
                modal  : true
            });
        } else if (this.model.getAttr('newRowMode') === 'oneclick editform') {
            if (!this.model.getAttr('itemEditPage')) {
                throw new Error(`[${this.model.getFullName()}] itemEditPage is empty`);
            }
            const row = {};
            this.model.fillDefaultValues(row);
            const key = await this.model.getDefaultDataSource().insert(row);
            await this.openPage({
                name : this.model.getAttr('itemEditPage'),
                key  : key,
                modal: true
            });
        } else if (this.model.getAttr('newRowMode') === 'oneclick createform') {
            if (!this.model.getAttr('itemCreatePage')) {
                throw new Error(`[${this.model.getFullName()}] itemCreatePage is empty`);
            }
            const row = {};
            this.model.fillDefaultValues(row);
            const key2 = await this.model.getDefaultDataSource().insert(row);
            await this.openPage({
                name : this.model.getAttr('itemCreatePage'),
                key  : key2,
                modal: true
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
                name : this.model.getAttr('itemEditPage'),
                key  : key,
                modal: true
            });
        } catch (err) {
            // console.error(`${this.model.getFullName()}: edit form error handler:`, err);
            // alert(`${this.model.getFullName()}: ${err.message}`);
            err.message = `${this.model.getFullName()} edit: ${err.message}`;
            throw err;
        }
    }
    onModelRefresh = e => {
        console.log('TableFormController.onModelRefresh', this.model.getFullName(), e);
        if (!this.view) return;
        this.invalidate();
        this.rerender();
    }
    onModelUpdate = e => {
        console.log('TableFormController.onModelUpdate', this.model.getFullName(), e.key);
        this.invalidate();
        this.rerender();
    }
    onModelDelete = e => {
        console.log('TableFormController.onModelDelete', this.model.getFullName(), e.key);
        if (this.state.activeRowKey === e.key) {
            this.state.activeRowKey = null;
        }
        this.invalidate();
        this.rerender();
    }
    onModelInsert = e => {
        console.log('TableFormController.onModelInsert', this.model.getFullName(), e.key);
        this.state.activeRowKey = e.key;
        this.invalidate();
        this.rerender();
    }
    onSelectionChange = i => {
        // console.log('TableFormController.onSelectionChange', i);
        const rows = this.model.getDefaultDataSource().getRows();
        this.state.activeRowKey = this.model.getDefaultDataSource().getRowKey(rows[i]);
        this.invalidate();
        this.rerender();
    }
    getActiveRowIndex = () => {
        // console.log('TableFormController.getActiveRowIndex', this.state.activeRowKey);
        if (this.state.activeRowKey) {
            const rows = this.model.getDefaultDataSource().getRows();
            const row = this.model.getDefaultDataSource().getRowByKey(this.state.activeRowKey);
            if (row) {
                const i = rows.indexOf(row);
                if (i === -1) throw new Error('cannot find active row')
                return i;
            } else {
                // console.log('rows:', rows);
                // console.log('this.rowsByKey:', this.model.getDefaultDataSource().rowsByKey);
                console.error('no active row in rows');
            }
        }
        return null;
    }
    getActiveRow() {
        if (!this.state.activeRowKey) throw new Error(`${this.model.getFullName()}: no active row key`);
        return this.model.getDefaultDataSource().getRowByKey(this.state.activeRowKey);
    }
    isRowSelected = () => {
        // console.log('TableFormController.isRowSelected');
        if (this.state.activeRowKey !== null) {
            const row = this.model.getDefaultDataSource().getRowByKey(this.state.activeRowKey);
            if (row) return true;
        }
        return false;
    }
    onFrameChanged = value => {
        // console.log('TableFormController.onFrameChanged', parseInt(value));
        const frame = parseInt(value);
        this.model.getDefaultDataSource().setFrame(frame);
        this.model.getDefaultDataSource().refresh();
        this.rerender();
    }
    onNextClick = () => {
        console.log('TableFormController.onNextClick');
        const frame = this.model.getDefaultDataSource().getFrame() + 1;
        this.model.getDefaultDataSource().setFrame(frame);
        this.model.getDefaultDataSource().refresh();
        this.rerender();
    }

    onPreviousClick = () => {
        console.log('TableFormController.onPreviousClick');
        const frame = this.model.getDefaultDataSource().getFrame() - 1;
        this.model.getDefaultDataSource().setFrame(frame);
        this.model.getDefaultDataSource().refresh();
        this.rerender();
    }
    canPrev() {
        return this.model.getDefaultDataSource().getFrame() > 1;
    }
    canNext() {
        const ds = this.model.getDefaultDataSource();
        return ds.getFrame() < ds.getFramesCount();
    }
}
window.QForms.TableFormController = TableFormController;

class PageController extends Controller {

    static create(model, parent) {
        // console.log('PageController.create', model.getName());
        const CustomClass = FrontHostApp.getClassByName(`${model.getName()}PageController`);
        const Class = CustomClass ? CustomClass : PageController;
        return new Class(model, parent);
    }

    constructor(model, parent) {
        //console.log('PageController.constructor', model);
        super(model, parent);
        this.forms = [];
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
            await this.model.update();
            console.log('page model updated', this.model.getFullName());
            this.getAppController().closePage(this);
        } else {
            this.rerender();
        }
    }

    onClosePageClick = () => {
        // console.log('PageController.onClosePageClick', this.model.getFullName());
        this.close();
    }

    close() {
        // console.log('PageController.close', this.model.getFullName());
        const changed = this.isChanged();
        // console.log('changed:', changed);
        // const valid = this.isValid();
        // console.log('valid:', valid);
        if (this.model.hasRowFormWithDefaultSqlDataSource() && changed) {
            const result = confirm(this.model.getApp().getText().form.areYouSure);
            if (!result) return;
        }
        this.getAppController().closePage(this);
    }
    validate() {
        for (const form of this.forms) {
            if (form instanceof RowFormController) {
                form.validate();
                form.invalidate();
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
        console.log('PageController.onFormUpdate:', this.model.getFullName());
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
        options.parentPage = this.model;
        return await this.getAppController().openPage(options);
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

    getAppController() {
        return this.parent;
    }
    getViewClass() {
        return PageView;
    }
    getCaption() {
        return this.model.getCaption();
    }
    static createLink(params = {}) {
        // const query = window.location.search.split('?')[1];
        // console.log('query:', query);
        return [
            window.location.pathname,
            [
                // ...(query ? query.split('&') : []),
                ...(ApplicationController.isInDebugMode() ? ['debug=1'] : []),
                ...Object.keys(params).map(name => `${name}=${encodeURI(Helper.encodeValue(params[name]))}`)
            ].join('&')
        ].join('?');
    }
    getForm(name) {
        return this.forms.find(form => form.model.getName() === name);
    }
    async onActionClick(name) {
        console.log('PageController.onActionClick', name);
    }
}
window.QForms.PageController = PageController;

class Model extends EventEmitter {
    constructor(data, parent) {
        if (!data.name) throw new Error(`${data.class} no name`);
        super();
        this.data     = data;
        this.parent   = parent;
        this.deinited = false;
    }

    init() {
    }

    deinit() {
        if (this.deinited) throw new Error(`${this.getFullName()}: model already deinited`);
        this.deinited = true;
    }

    static getAttr(data, name) {
        return data[name];
    }
    static getName(data) {
        return Model.getAttr(data, 'name');
    }
    static getClassName(data) {
        return Model.getAttr(data, 'class');
    }

    getAttr(name) {
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
}
window.QForms.Model = Model;

class Application extends Model {
    constructor(data) {
        super(data);
        this.databases   = [];
        this.dataSources = [];
    }

    init() {
        // console.log('Application.init');
        if (!this.data.theme) throw new Error('no theme attr');

        // databases
        for (const data of this.data.databases) {
            const database = new Database(data, this);
            database.init();
            this.databases.push(database);
        }

        // data sources
        this.createDataSources();
    }

    deinit() {
        this.deinitDataSources();
        // TODO: add deinit on opened pages
        super.deinit();
    }

    async logout() {
        const data = await this.request({
            'action': 'logout'
        });
        this.emit('logout', {source: this});
    }

    async request(options) {
        // console.warn('Application.request', data);
        const start = Date.now();
        const response = await FrontHostApp.doHttpRequest(options);
        this.emit('request', {time: Date.now() - start});
        return response;
    }

    getDatabase(name) {
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
        return this.data.domain;
    }
    getVirtualPath() {
        return this.data.virtualPath;
    }
    async rpc(name, params) {
        console.log('Application.rpc', this.getFullName(), name, params);
        if (!name) throw new Error('no name');
        const result = await this.request({
            action: 'rpc',
            name  : name,
            params: Helper.encodeObject(params)
        });
        if (result.errorMessage) throw new Error(result.errorMessage);
        return result;
    }
}
window.QForms.Application = Application;

class Column  extends Model {
    init() {
        // console.log('Column.init', this.getFullName());
    }

    getType() {
        if (!this.data.type) throw new Error(`column ${this.getFullName()}: no type`);
        return this.data.type;
    }
    getDbType() {
        return this.data.dbType;
    }
}
window.QForms.Column = Column;

class DataSource extends Model {

    constructor(data, parent) {
        super(data, parent);
        this.rows      = null;
        this.rowsByKey = null;						// for row search by key
        this.news      = [];                        // new rows
        this.changes   = new Map();
    }

    init() {
        // console.log('DataSource.init', this.getFullName(), this.getClassName());
        this.setRows(this.data.rows);
    }

    setRows(rows) {
        this.rows = rows;
        this.fillRowsByKey();
    }

    addRows(rows) {
        for (let i = 0; i < rows.length; i++) {
            this.rows.push(rows[i]);
        }
        this.fillRowsByKey();
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
            if (row[column] === undefined && value === null) {  // workaround for new rows
                this.discardRowColumn(row, column);
            }
        } else {
            this.discardRowColumn(row, column);
        }
        if (this.changes.has(row) && !Object.keys(this.changes.get(row)).length) this.changes.delete(row);
        // console.log('changes:', this.changes);
    }

    isChanged() {
        // console.log('DataSource.isChanged', this.getFullName());
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
        }
        // console.log('DataSource.getValue:', value);
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
        for (let i = 0; i < this.data.keyColumns.length; i++) {
            const column = this.data.keyColumns[i];
            if (row[column] === undefined) return null;
            if (row[column] === null) throw new Error('wrong value null for data source value');
            try {
                const value = JSON.parse(row[column]);
                arr.push(value);
            } catch (err) {
                console.log('cannot parse: ', row[column]);
                throw err;
            }
        }
        return JSON.stringify(arr);
    }

    // copy new values to data source row
    copyNewValues(oldRow, newRow) {
        for (const columnName in newRow) {
            oldRow[columnName] = newRow[columnName];
        }
    }

    removeRow(key) {
        const row = this.rowsByKey[key];
        if (!row) throw new Error(`${this.getFullName()}: no row with key ${key} to remove`);
        const i = this.rows.indexOf(row);
        if (i === -1) throw new Error(`${this.getFullName()}: no row with i ${i} to remove`);
        this.rows.splice(i, 1);
        delete this.rowsByKey[key];
    }

    newRow(row) {
        console.log('DataSource.newRow', this.getFullName(), row);
        if (this.data.rows.length > 0) {
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

    getNamespace() {
        if (this.parent instanceof Form) {
            return this.parent.getPage().getName() + '.' + this.parent.getName() + '.' + this.getName();
        }
        if (this.parent instanceof Page) {
            return this.parent.getName() + '.' + this.getName();
        }
        return this.getName();
    }

    getRow(key) {
        return this.rowsByKey[key];
    }

    getRows() {
        return this.rows;
    }

    getRowByIndex(i) {
        return this.rows[i];
    }

    getRowByKey(key) {
        return this.rowsByKey[key] || null;
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
        } else  if (arr.length > 1) {
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
            return {...row, ...this.changes.get(row)};
        }
        return row;
    }

    hasNewRows() {
        return this.news.length > 0;
    }

}
window.QForms.DataSource = DataSource;

class SqlDataSource extends DataSource {
    constructor(data, parent) {
        super(data, parent);
        this.frame  = 1;
        this.count  = data.count !== undefined ? data.count : null;
        this.lastFrame = 1;
    }

    init() {
        super.init();
        if (this.getAttr('table') !== '') {
            const table = this.getTable();
            table.on('update', this.onTableUpdated);
            table.on('insert', this.onTableInsert);
            table.on('delete', this.onTableDelete);
        }
    }

    deinit() {
        // console.log('SqlDataSource.deinit', this.getFullName(), this.getTableName());
        if (this.getAttr('table') !== '') {
            const table = this.getTable();
            table.removeListener('update', this.onTableUpdated);
            table.removeListener('insert', this.onTableInsert);
            table.removeListener('delete', this.onTableDelete);
        }
        super.deinit();
    }

    getType(columnName) {
        // console.log('SqlDataSource.getType', columnName);
        const type = this.getTable().getColumn(columnName).getType();
        // console.log('type:', type);
        return type;
    }

    getDbType(columnName) {
        return this.getTable().getColumn(columnName).getDbType();
    }

    async update() {
        console.log('SqlDataSource.update', this.getFullName());
        if (this.getAttr('table') === '') throw new Error(`data source has no table: ${this.getFullName()}`);
        if (this.news[0]) return this.insert(this.news[0]);
        if (!this.changes.size) throw new Error(`no changes: ${this.getFullName()}`);
        const result = await this.getApp().request({
            action        : 'update',
            page          : this.getForm().getPage().getName(),
            form          : this.getForm().getName(),
            changes       : this.getChangesByKey(),
        });
        const [key] = Object.keys(result);
        if (!key) throw new Error('no updated row');
        const newValues = result[key];
        const newKey = this.getRowKey(newValues);
        this.changes.clear();
        this.updateRow(key, newValues);
        if (this.parent.onDataSourceUpdate) {
            this.parent.onDataSourceUpdate({source: this, key: key});
        }
        this.getTable().emit('update', {source: this, changes: {[key]: newKey}});
        return newKey;
    }

    updateRow(key, newValues) {
        console.log('SqlDataSource.updateRow', this.getFullName(), key, newValues);
        if (!key) throw new Error('no key');
        const row = this.rowsByKey[key];
        if (!row) throw new Error(`${this.getFullName()}: no row with key ${key}`);
        /*const i = this.data.rows.indexOf(row);
        if (i === -1) {
            console.log('this.data.rows:', this.data.rows);
            throw new Error(`${this.getFullName()}: cannot find row with key ${key}`);
        }*/
        const newKey = this.getRowKey(newValues);

        // copy new values to original row object
        for (const column in row) row[column] = newValues[column];
        if (key !== newKey) {
            delete this.rowsByKey[key];
            this.rowsByKey[newKey] = row;
        }
        // console.log(`key: ${key} to ${newKey}`);
        // console.log('this.rowsByKey:', this.rowsByKey);
        // console.log('this.data.rows:', this.data.rows);

        return {source: this, key};
    }

    getTable() {
        if (!this.getAttr('table')) throw new Error(`${this.getFullName()}: table attr empty`);
        return this.getDatabase().getTable(this.getAttr('table'));
    }

    getDatabase() {
        if (!this.getAttr('database')) throw new Error(`${this.getFullName()}: database attr empty`);
        return this.getApp().getDatabase(this.getAttr('database'));
    }

    onTableUpdated = async (e) => {
        console.log('SqlDataSource.onTableUpdated', this.getFullName(), this.getTableName(), e);
        if (this.deinited) throw new Error(`${this.getFullName()}: this data source deinited for onTableUpdated`);
        if (e.source === this) {
            // console.error('onTableUpdated stop self update', this.getFullName());
            return;
        }
        // console.log('changes:', e.changes);
        if (!Object.keys(e.changes).length) throw new Error(`${this.getFullName()}: no changes`);
        const key = Object.keys(e.changes)[0];

        // check if updated row exists in this ds
        if (this.rowsByKey[key]) {
            const newKey = e.changes[key];
            // console.log(`key: ${key} to ${newKey}`);
            const keyParams = DataSource.keyToParams(newKey);
            const result = await this.selectSingle(keyParams);
            this.updateRow(key, result.row);
            if (this.parent.onDataSourceUpdate) {
                this.parent.onDataSourceUpdate({source: this, key: key});
            }
        }
    }

    onTableInsert = async (e) => {
        console.log('SqlDataSource.onTableInsert', this.getFullName(), e);
        if (this.deinited) throw new Error(`${this.getFullName()}: this data source deinited for onTableInsert`);
        if (e.source === this) {
            // console.error('onTableInsert stop self insert', this.getFullName());
            return;
        }
        await this.refill();
        if (this.parent.onDataSourceInsert) {
            this.parent.onDataSourceInsert(e);
        }
    }

    onTableDelete = async (e) => {
        console.log('SqlDataSource.onTableDelete', this.getFullName(), this.getTableName(), e);
        if (this.deinited) throw new Error(`${this.getFullName()}: this data source deinited for onTableDelete`);
        if (e.source === this) {
            // console.error('onTableDelete stop self delete', this.getFullName());
            return;
        }
        await this.refill();
        if (this.parent.onDataSourceDelete) {
            this.parent.onDataSourceDelete(e);
        }
    }

    getPageParams() {
        const page = this.getPage();
        return page ? page.getParams() : {};
    }

    async refresh() {
        console.log('SqlDataSource.refresh', this.getFullName());
        await this.refill();
        if (this.parent.onDataSourceRefresh) {
            this.parent.onDataSourceRefresh({source: this});
        }
    }

    async refill() {
        if (this.isChanged()) throw new Error(`cannot refill changed data source: ${this.getFullName()}`);
        const data = await this.select(this.getLimit() ? {frame : this.frame} : {});
        this.count = data.count;
        this.setRows(data.rows);
        this.lastFrame = 1;
    }

    async fill(frame) {
        if (this.isChanged()) throw new Error(`cannot fill changed data source: ${this.getFullName()}`);
        const data = await this.select(this.getLimit() ? {frame} : {});
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
            action        : 'select',
            parentPageName: page ? page.getParentPageName() : null,
            page          : page ? page.getName()           : null,
            form          : form ? form.getName()           : null,
            ds            : this.getName(),
            params        : Helper.encodeObject({
                ...this.getPageParams(),
                ...params,
            })
        });
        if (!(data.rows instanceof Array)) throw new Error('rows must be array');
        // if (data.time) console.log(`select time of ${this.getFullName()}:`, data.time);
        return data;
    }

    async selectSingle(params = {}) {
        console.log('SqlDataSource.selectSingle', this.getFullName(), params);
        const page = this.getPage();
        const form = this.getForm();
        const data = await this.getApp().request({
            action        : 'selectSingle',
            parentPageName: page ? page.getParentPageName() : null,
            page          : page ? page.getName()           : null,
            form          : form ? form.getName()           : null,
            ds            : this.getName(),
            params        : Helper.encodeObject({
                ...this.getPageParams(),
                ...params,
            })
        });
        if (!data.row) throw new Error('selectSingle must return row');
        // if (data.time) console.log(`select time of ${this.getFullName()}:`, data.time);
        return data;
    }


    async insert(row) {
        console.log('SqlDataSource.insert', this.getTableName(), row);
        const table = this.getAttr('table');
        if (table === '') throw new Error('no data source table to insert');

        const result = await this.getApp().request({
            action        : 'insert',
            page          : this.getForm().getPage().getName(),
            form          : this.getForm().getName(),
            parentPageName: this.getPage().getParentPageName(),
            params        : this.getRowWithChanges(row),
        });

        // key & values
        const [key] = Object.keys(result.insert[table]);
        if (!key) throw new Error('no inserted row key');
        const values = result.insert[table][key];
        for (const column in values) row[column] = values[column];
        // console.log('key:', key);
        // console.log('row:', row);

        // add new row to rows
        this.news.splice(this.news.indexOf(row), 1);
        // console.log('this.news:', this.news);
        this.changes.clear();
        this.addRow(row);

        // events
        if (this.parent.onDataSourceInsert) {
            this.parent.onDataSourceInsert({source: this, key});
        }
        this.getDatabase().emitResult(result, this);
        return key;
    }

    addRow(row) {
        this.rows.push(row);
        const key = this.getRowKey(row);
        this.rowsByKey[key] = row;
    }

    async delete(key) {
        console.log('SqlDataSource.delete:', this.getFullName(), key);
        if (!this.getAttr('table')) {
            throw new Error(`no table in data source: ${this.getFullName()}`);
        }
        const page = this.getPage();
        const result = await this.getApp().request({
            action        : '_delete',
            page          : this.getForm().getPage().getName(),
            form          : this.getForm().getName(),
            params        : Helper.encodeObject({key}),
            parentPageName: page ? page.getParentPageName() : null
        });
        await this.refill();
        if (this.parent.onDataSourceDelete) {
            this.parent.onDataSourceDelete({source: this, key: key});
        }
        this.getDatabase().emitResult(result, this);
        return result;
    }

    getTableName() {
        if (!this.getAttr('database')) throw new Error('no database');
        if (!this.getAttr('table')) throw new Error('no table');
        return `${this.getAttr('database')}.${this.getAttr('table')}`;
    }

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
    getRowsLength() {
        return this.rows.length;
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
window.QForms.SqlDataSource = SqlDataSource;

class Database extends Model {
    constructor(...args) {
        super(...args);
        this.tables = [];
    }

    init() {
        // console.log('Database.init', this.getName());
        for (const data of this.data.tables) {
            const table = new Table(data, this);
            table.init();
            this.tables.push(table);
        }
    }

    getTable(name) {
        const table = this.tables.find(table => table.getName() === name);
        if (!table) throw new Error(`${this.getFullName()}: no table with name: ${name}`);
        return table;
    }

    emitResult(result, source) {
        this.emitDelete(result, source);
        this.emitUpdate(result, source);
        this.emitInsert(result, source);
    }

    emitInsert(result, source = null) {
        if (!result.insert) return;
        for (const tableName in result.insert) {
            const table = this.getTable(tableName);
            for (const key in result.insert[tableName]) {
                table.emit('insert', {source: source, key: key});
            }
        }
    }

    emitUpdate(result, source = null) {
        if (!result.update) return;
        for (const tableName in result.update) {
            const table = this.getTable(tableName);
            for (const key in result.update[tableName]) {
                const oldKey = result.update[tableName][key];
                table.emit('update', {source: source, changes: {[key]: oldKey}});
            }
        }
    }
    emitDelete(result, source = null) {
        if (!result.delete) return;
        for (const tableName in result.delete) {
            const table = this.getTable(tableName);
            for (const key of result.delete[tableName]) {
                table.emit('delete', {source: source, key: key});
            }
        }
    }
}
window.QForms.Database = Database;

class Field extends Model {
    // constructor(data, parent) {
    //     super(data, parent);
    // }

    init() {
    }

    replaceThis(value) {
        return value.replace(/\{([@\w\.]+)\}/g, (text, name) => {
            if (name.indexOf('.') === -1) return text;
            let arr = name.split('.');
            if (arr[0] === 'this') arr[0] = this.getPage().getName();
            if (arr[0] === 'parent' && this.getPage().getParentPageName()) {
                arr[0] = this.getPage().getParentPageName();
            }
            return `{${arr.join('.')}}`;
        });
    }

    fillDefaultValue(row) {
        // console.log('Field.fillDefaultValue', this.getFullName());
        const column = this.getAttr('column');
        if (!column) return;
        const defaultValue = this.replaceThis(this.getAttr('defaultValue'));
        const js = Helper.templateToJsString(defaultValue, this.getPage().getParams());
        if (typeof js !== 'string') throw new Error(`${this.getFullName()}: defaultValue must be templated to js string`);
        // console.log('js', this.getFullName(), js);
        try {
            const value = eval(js);
            if (value !== undefined) {
                row[column] = Helper.encodeValue(value);
            }
        } catch (err) {
            throw new Error(`[${this.getFullName()}] fillDefaultValue: ${err.toString()}`);
        }
    }

    valueToPageParams(row) {
        // console.log('Field.valueToPageParams', this.getFullName(), this.getDbType());
        // if (this.getDbType() === 'text') return;
        if (this.isParam()) {
            this.getPage().addPageParam(this.getFullName(), this.getValue(row));
        }
    }

    setValue(row, value) {
        // console.log('Field.setValue', this.getFullName(), value);
        if (!this.getAttr('column')) throw new Error(`field has no column: ${this.getFullName()}`);
        const rawValue = Helper.encodeValue(value);
        this.getForm().getDefaultDataSource().setValue(row, this.getAttr('column'), rawValue);
        this.valueToPageParams(row);
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
        // console.log('Field.getValue', this.getFullName());
        if (this.getAttr('column')) {
            if (!row && this.parent instanceof RowForm) {
                row = this.parent.getRow();
            }
            let rawValue = this.getRawValue(row);
            if (rawValue === undefined) return undefined;
            if (rawValue === null) throw new Error(`[${this.getFullName()}]: null is wrong raw value`);
            try {
                return Helper.decodeValue(rawValue);
            } catch (err) {
                console.log('raw value decode error:', this.getFullName(), rawValue);
                throw err;
            }
        }
        if (this.data.value) return eval(this.data.value);
        throw new Error(`${this.getFullName()}: no column and no value in field`);
    }

    getRawValue(row) {
        if (!this.hasColumn()) throw new Error(`${this.getFullName()}: no column`);
        return this.getForm().getDefaultDataSource().getValue(row, this.getAttr('column'));
    }

    getDefaultDataSource() {
        return this.getForm().getDefaultDataSource();
    }

    getType() {
        const dataSource = this.getDefaultDataSource();
        if (dataSource.getClassName() === 'SqlDataSource' && this.getAttr('column')) {
            return this.getDefaultDataSource().getType(this.getAttr('column'));
        }
        if (this.getAttr('type')) return this.getAttr('type');
        throw new Error(`field type empty`);
    }

    getDbType() {
        const dataSource = this.getDefaultDataSource();
        if (dataSource.getClassName() === 'SqlDataSource' && this.getAttr('column')) {
            return this.getDefaultDataSource().getDbType(this.getAttr('column'));
        }
        return null;
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
    isVisible() {
        return this.data.isVisible === 'true';
    }
    getWidth() {
        return this.data.width !== '0' ? parseInt(this.data.width) : 100;
    }
    getFullName() {
        return `${this.getPage().getName()}.${this.getForm().getName()}.${this.getName()}`;
    }
    isParam() {
        return this.data.param === 'true';
    }
    /*getPlaceholder() {
        return this.getAttr('placeholder');
    }*/
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
window.QForms.Field = Field;

class CheckBoxField extends Field {

}
window.QForms.CheckBoxField = CheckBoxField;

class ComboBoxField extends Field {

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
                return row.hasOwnProperty(name) ? (row[name] || '') : text;
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
        } else if (this.getPage().getDataSource(name)) {
            return this.getPage().getDataSource(name);
        } else if (this.getApp().getDataSource(name)) {
            return this.getApp().getDataSource(name);
        }
        return null;
    }

    findRowByRawValue(rawValue) {
        return this.getComboBoxDataSource().getRows().find(row => row[this.data.valueColumn] === rawValue);
    }
}
window.QForms.ComboBoxField = ComboBoxField;

class DatePickerField extends Field {
    getFormat() {
        return this.data.format;
    }
}
window.QForms.DatePickerField = DatePickerField;

class DateTimeField extends Field {
    getFormat() {
        return this.data.format;
    }
}
window.QForms.DateTimeField = DateTimeField;

class FileField extends Field {
}
window.QForms.FileField = FileField;

class ImageField extends Field {
}
window.QForms.ImageField = ImageField;

class LabelField extends Field {
}
window.QForms.LabelField = LabelField;

class LinkField extends Field {
}
window.QForms.LinkField = LinkField;

class TextAreaField extends Field {
    getRows() {
        return this.data.rows;
    }
    getCols() {
        return this.data.cols;
    }
}
window.QForms.TextAreaField = TextAreaField;

class TextBoxField extends Field {

}
window.QForms.TextBoxField = TextBoxField;

class TimeField extends Field {

}
window.QForms.TimeField = TimeField;

class Form extends Model {
    constructor(data, parent) {
        super(data, parent);
        this.dataSources = [];
        this.fields      = [];
    }

    init() {
        // data sources
        this.createDataSources();

        // fields
        for (const data of this.data.fields) {
            const Class = FrontHostApp.getClassByName(data.class);
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
            action: 'rpc',
            page  : this.getPage().getName(),
            form  : this.getName(),
            name  : name,
            params: Helper.encodeObject(params)
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
}
window.QForms.Form = Form;

class RowForm extends Form {
    init() {
        super.init();
        if (this.isNewMode()) {
            this.getDefaultDataSource().newRow(this.createRow());
        }
        this.fillParams(this.getRow()); // dump row values to page params
    }

    isNewMode() {
        const newMode = this.getAttr('newMode');
        if (newMode ===  'true') return  true;
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
                this.getField(name).valueToPageParams(this.getRow())
            });
        }
    }

}
window.QForms.RowForm = RowForm;

class TableForm extends Form {

}
window.QForms.TableForm = TableForm;

class Page extends Model {
    constructor(data, parent, options) {
        // console.log('Page.constructor', options);
        if (!options.id) throw new Error('no page id');
        super(data, parent);
        this.options     = options; // {id, parentPage, modal, params}
        this.dataSources = [];
        this.forms       = [];
        this.params      = {};
    }

    init() {
        this.createDataSources();

        // forms
        for (const data of this.data.forms) {
            const FormClass = FrontHostApp.getClassByName(Model.getClassName(data));
            const form = new FormClass(data, this);
            form.init();
            this.forms.push(form);
        }
        console.log('page params:', this.getFullName(), this.getParams());
    }

    deinit() {
        // console.log('Page.deinit', this.getFullName());
        if (this.deinited) throw new Error(`page ${this.getFullName()} is already deinited`);
        this.deinitDataSources();
        for (const form of this.forms) {
            form.deinit();
        }
        super.deinit();
    }

    getId() {
        return this.options.id;
    }

    getParentPageName() {
        return this.options.parentPage ? this.options.parentPage.getName() : null;
    }

    getParams() {
        return {
            ...(this.options.parentPage ? this.options.parentPage.getParams() : {}),
            ...(this.options.params !== undefined ? this.options.params : {}),
            ...this.params,
        };
    }

    addPageParam(name, value) {
        // console.log('Page.addPageParam', name);
        this.params[name] = value !== undefined ? value : null;
    }

    async update() {
        console.log('Page.update', this.getFullName());
        for (const form of this.forms) {
            if (form.isChanged() || form.hasNew()) await form.update();
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
            if (form.getClassName() === 'RowForm') return true;
        }
        return false;
    }

    hasTableForm() {
        for (const form of this.forms) {
            if (form.getClassName() === 'TableForm') {
                return true;
            }
        }
        return false;
    }

    isNewMode() {
        return this.getAttr('newMode');
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

    getFullName() {
        return `${this.getName()}(${this.getId()})`;
    }

    isModal() {
        // return this.modal;
        return !!this.options.modal;
    }

    onFormInsert(e) {
        console.log('Page.onFormInsert', e);
        if (!e.key) throw new Error('no key of inserted row');

        // key params to page params
        const keyParams = DataSource.keyToParams(e.key);
        for (const name in keyParams) {
            this.addPageParam(name, keyParams[name]);
        }
    }
    async rpc(name, params) {
        // console.log('Page.rpc', this.getFullName(), name, params);
        if (!name) throw new Error('no name');
        const result =  await this.getApp().request({
            action: 'rpc',
            page  : this.getName(),
            name  : name,
            params: Helper.encodeObject(params)
        });
        if (result.errorMessage) throw new Error(result.errorMessage);
        return result;
    }
    getForm(name) {
        return this.forms.find(form => form.getName() === name);
    }
}
window.QForms.Page = Page;

class Table extends Model {
    constructor(...args) {
        super(...args);
        this.columns = [];
    }
    init() {
        // console.log('Table.init', this.getFullName());
        for (const data of this.data.columns) {
            const column = new Column(data, this);
            column.init();
            this.columns.push(column);
        }
    }

    getColumn(name) {
        const column = this.columns.find(column => column.getName() === name);
        if (!column) throw new Error(`table ${this.getFullName()}: no column ${name}`);
        return column;
    }
}
window.QForms.Table = Table;
