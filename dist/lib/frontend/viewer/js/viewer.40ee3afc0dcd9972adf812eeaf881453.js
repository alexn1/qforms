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
            const results = await Promise.allSettled(this.list[name].map(cb => cb(e)));
            // console.log('results:', results);
            for (const result of results) {
                if (result.status === 'rejected') {
                    throw result.reason;
                }
            }
        }
    }
}

class LoginFrontHostApp extends FrontHostApp {
    constructor(data) {
        console.log('LoginFrontHostApp.constructor', data);
        super();
        this.data = data;
    }
    async run() {
        console.log('LoginFrontHostApp.run');
        const loginController = LoginController.create(this);
        const rootElement = document.querySelector(`.${loginController.getViewClassCssBlockName()}__root`);
        const loginView = Helper.createReactComponent(rootElement, loginController.getViewClass(), {ctrl: loginController});
    }
    getText() {
        return this.data.text;
    }
    getData() {
        return this.data;
    }
}

class ViewerFrontHostApp extends FrontHostApp {
    constructor(data) {
        if (!data) throw new Error('no data');
        super();
        this.data = data;
        this.applicationController = null;
        this.webSocketClient = null;
    }
    async run() {
        console.log('ViewerFrontHostApp.run', this.data);

        // application
        const application = new Application(this.data);
        application.init();

        // applicationController
        const applicationController = this.applicationController = ApplicationController.create(application, this);
        applicationController.init();

        // view
        const rootElementName = `.${applicationController.getViewClass().name}__root`;
        const rootElement = document.querySelector(rootElementName);
        if (!rootElement) {
            throw new Error(`no root element: ${rootElementName}`);
        }
        applicationController.createView(rootElement);

        // web socket client
        try {
            this.webSocketClient = new WebSocketClient({
                protocol: this.data.nodeEnv === 'development' ? 'ws' : 'wss',
                frontHostApp: this,
                route: this.data.route,
                uuid: this.data.uuid,
                userId: this.data.user ? this.data.user.id : null,
            });
            await this.webSocketClient.connect();
        } catch (err) {
            this.logError(err);
        }
    }
    async onWindowPopState(e) {
        // console.log('ViewerFrontHostApp.onWindowPopState', e.state);
        await this.applicationController.onWindowPopState(e);
    }
}

window.QForms.ViewerFrontHostApp = ViewerFrontHostApp;

class WebSocketClient {
    constructor(options = {}) {
        this.options = options;
        if (!options.frontHostApp) throw new Error('no options.frontHostApp');
        if (!options.protocol) throw new Error('no options.protocol');
        this.url = `${options.protocol}://${window.location.host}/?route=${encodeURIComponent(options.route)}&uuid=${encodeURIComponent(options.uuid)}&userId=${encodeURIComponent(options.userId)}`;
        this.webSocket         = null;
        this.refreshTimeoutId  = null;
        this.RECONNECT_TIMEOUT = 10;        // sec
        this.REFRESH_TIMEOUT   = 60*60;     // sec
    }
    connect() {
        console.log('WebSocketClient.connect', this.url);
        return new Promise((resolve, reject) => {
            this.webSocket = new WebSocket(this.url);
            this.webSocket.onclose = async e => {
                this.webSocket = null;
                reject(new Error(`Connection failed ${e.code}`));
            };
            this.webSocket.onopen = e => {
                this.webSocket.onclose   = this.onClose.bind(this);
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
        } catch (err) {
            console.error(err);
            console.log(`waiting ${this.RECONNECT_TIMEOUT} sec...`);
            setTimeout(async () => await this.reconnect(), this.RECONNECT_TIMEOUT * 1000);
        }
    }

    async onClose(e) {
        console.error('WebSocketClient.onClose', e);
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
        return this.getFrontHostApp().applicationController;
    }
    getFrontHostApp() {
        return this.options.frontHostApp;
    }
}

class Controller extends EventEmitter {
    constructor() {
        super();
        this.view = null;
    }
    onViewCreate = view => {
        // console.log('Controller.onViewCreate');
        this.view = view;
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
}

class AlertController extends Controller {
    constructor(options) {
        super();
        this.options = options;
        if (!options.message) throw new Error('no message');
        if (!options.onClose) throw new Error('no onClose');
    }
    getViewClass() {
        return AlertView;
    }
    close(result) {
        this.options.onClose(result);
    }
    onOkButtonClick = async e => {
        this.close(true);
    }
    onCloseClick = async e => {
        this.close(false);
    }
    onKeyDown = async e => {
        if (e.key === 'Escape') {
            this.close(false);
        }
    }
}

class ConfirmController extends Controller {
    constructor(options) {
        super();
        this.options = options;
        if (!options.message) throw new Error('no message');
        if (!options.onClose) throw new Error('no onClose');
    }
    getViewClass() {
        return ConfirmView;
    }
    close(result) {
        this.options.onClose(result);
    }
    onYesClick = e => {
        this.close(true);
    }
    onCloseClick = e => {
        this.close(false);
    }
    onKeyDown = async e => {
        if (e.key === 'Escape') {
            this.close(false);
        }
    }
}

class LoginController extends Controller {
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
        return LoginView;
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

class ModalController extends Controller {
    constructor(options = {}) {
        super();
        if (!options.app) throw new Error('no app');
        if (!options.id) throw new Error('no id');
        this.options = options;
    }
    getId() {
        return this.options.id;
    }
    getApp() {
        return this.options.app;
    }
    async close() {
        await this.getApp().closeModal(this);
        if (this.options.onClose) {
            this.options.onClose();
        }
    }
}

class ImageDialogController extends ModalController {
    constructor(options) {
        // console.log('ImageDialogController.constructor', options);
        super(options);
        if (!options.src) throw new Error('no src');
    }
    getViewClass() {
        console.log('ImageDialogController.getViewClass');
        return ImageDialogView;
    }
    getSrc() {
        return this.options.src;
    }
    onCloseClick = async e => {
        await this.close();
    }
    onKeyDown = async e => {
        if (e.key === 'Escape') {
            await this.close();
        }
    }
}

class ModelController extends Controller {
    constructor(model, parent) {
        super();
        this.model    = model;
        this.parent   = parent;
        this.deinited = false;
    }
    init() {
    }
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

window.QForms.ModelController = ModelController;

class ApplicationController extends ModelController {
    constructor(model, frontHostApp) {
        // console.log('ApplicationController.constructor', model, view);
        super(model, null);
        this.frontHostApp = frontHostApp;
        this.lastId = 0;
        this.activePage = null;     // active non modal page
        this.modals = [];
        this.statusbar  = null;
        this.homePageName = null;
    }
    static create(model, frontHostApp) {
        // console.log('ApplicationController.create', 'debug:', ApplicationController.isDebugMode());
        const CustomClass = FrontHostApp.getClassByName(`${model.getName()}ApplicationController`);
        const Class = CustomClass ? CustomClass : ApplicationController;
        return new Class(model, frontHostApp);
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
    static isDebugMode() {
        return ApplicationController.getSearchObj()['debug'] === '1';
    }
    init() {
        // console.log('ApplicationController.init');
        super.init();
        // this.model.on('logout' , this.onLogout);
        this.model.on('request', this.onRequest);
        const pageData = this.model.data.pages[0];
        this.activePage = pageData ? this.createPage(pageData, {
            modal : false,
            params: this.getGlobalParams()
        }) : null;
        document.title = this.getTitle();
        this.homePageName = this.activePage.getModel().getName();
    }
    deinit() {
        // this.model.off('logout', this.onLogout);
        this.model.off('request', this.onRequest);
        super.deinit();
    }
    getViewClass() {
        return super.getViewClass() || ApplicationView;
    }
    createView(rootElement) {
        // console.log('ApplicationController.createView');
        this.view = Helper.createReactComponent(rootElement, this.getViewClass(), {ctrl: this});
        if (this.statusbar) {
            this.statusbar.setLastQueryTime(this.model.getAttr('time'));
        }
    }
    onRequest = async e => {
        // console.log('onRequest', e);
        if (this.statusbar) {
            this.statusbar.setLastQueryTime(e.time);
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
        if (options.modal === undefined) throw new Error('no options.modal');

        // model
        const pageModel = new Page(pageData, this.model, options);
        pageModel.init();

        // controller
        const pc = PageController.create(pageModel, this, `c${this.getNextId()}`);
        pc.init();

        return pc;
    }
    async openPage(options) {
        console.log('ApplicationController.openPage', options);
        if (!options.name) throw new Error('no name');
        if (options.key) throw new Error('openPage: key param is deprecated');

        // if this page with this key is already opened, then show it
        const pageController = this.findPageControllerByPageNameAndKey(options.name, null);
        // console.log('pageController:', pageController);
        if (pageController) {
            this.onPageSelect(pageController);
            return pageController;
        }

        const {page: pageData} = await this.model.request({
            action : 'page',
            page   : options.name,
            newMode: !!options.newMode,
            params : options.params || {}
        });

        // modal by default
        if (options.modal === undefined) {
            options.modal = true;
        }
        if (!options.onClose) {
            const activeElement = document.activeElement;
            options.onClose = () => {
                if (activeElement) activeElement.focus();
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
        } else  {
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
                title: `${this.model.getDomain()}/${this.model.getUser().login}`,
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
        location.href = this.getRootPath();
    }
    onMenuItemClick = async (menu, type, name) => {
        console.log('ApplicationController.onMenuItemClick', menu, type, name);
        if (type === 'page') {
            await this.openPage({name: name, modal: false});
            history.pushState({pageName: name}, '', PageController.createLink({page: name}));
        } else if (type === 'action') {
            try {
                const result = await this.onActionClick(name);
                if (!result) {
                    throw new Error(`no handler for action '${name}'`);
                }
            } catch (err) {
                await this.alert({message: err.message});
            }
        } else if (type === 'custom' && name === 'logout') {
            await this.onLogout();
        } else {
            throw new Error(`unknown menu type/name: ${type}/${name}`);
        }
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
            name : e.state ? e.state.pageName : this.homePageName,
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
            options.title = this.getModel().getText().application.error;
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
}

window.QForms.ApplicationController = ApplicationController;

class FieldController extends ModelController {
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
    getRow() {
        return this.model.getForm().getRow();
    }
    copyValueToModel() {
        // console.log('RowFormFieldController.copyValueToModel', this.model.getFullName());
        this.model.setValue(this.getRow(), this.getValue());
    }
    _onChange(widgetValue) {

    }
    putValue(widgetValue) {
        // console.log('RowFormFieldController.putValue', widgetValue);
        this.onChange(widgetValue, false);
    }
    onChange = async (widgetValue, fireEvent = true) => {
        // console.log('RowFormFieldController.onChange', widgetValue);
        this._onChange(widgetValue);
        this.resetErrors();
        try {
            this.setValueFromWidget(widgetValue);
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
                this.emit('change', {value: widgetValue});
            } catch (err) {
                console.error('unhandled change event error:', this.model.getFullName(), err);
            }
            this.parent.onFieldChange({source: this});
        }
    }
    onBlur = (widgetValue, fireEvent = true) => {
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
                    this.emit('change', {value: widgetValue});
                } catch (err) {
                    console.error('unhandled change event error:', this.model.getFullName(), err);
                }
                this.parent.onFieldChange({source: this});
            }
        }
    }
    getValueForWidget() {
        const value = this.getValue();
        // console.log('value:', this.model.getFullName(), value, typeof value);
        return this.valueToString(value);
    }
    setValueFromWidget(widgetValue) {
        // console.log('RowFormFieldController.setValueFromWidget', this.model.getFullName(), typeof widgetValue, widgetValue);
        if (typeof widgetValue !== 'string') throw new Error(`${this.model.getFullName()}: widgetValue must be string, but got ${typeof widgetValue}`);
        const value = this.stringToValue(widgetValue);
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
    refreshChanged() {
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
        }

        // null validator
        const value = this.getValue();
        if (this.model.isNotNull() && (value === null || value === undefined)) {
            return this.getModel().getApp().getText().form.required;
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
            const fieldRawValue = this.model.valueToRaw(this.getValue());
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
            console.log(`MODEL CHANGED ${this.model.getFullName()}:`, original, modified);
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
    getValueForWidget() {
        return this.getValue();
    }
    setValueFromWidget(widgetValue) {
        this.setValue(widgetValue);
    }

    getViewClass() {
        return super.getViewClass() || RowFormCheckBoxFieldView;
    }
}

window.QForms.RowFormCheckBoxFieldController = RowFormCheckBoxFieldController;

class RowFormComboBoxFieldController extends RowFormFieldController {
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

    getItems() {
        try {
            return this.getRows().map(row => ({
                value: this.model.getValueValue(row).toString(),
                title: this.model.getDisplayValue(row).toString()
            }));
        } catch (err) {
            err.message = `${this.getModel().getFullName()}: ${err.message}`;
            throw err;
        }
    }
    getRows() {
        return this.model.getComboBoxDataSource().getRows();
    }
    getViewClass() {
        return super.getViewClass() || RowFormComboBoxFieldView;
    }
    getPlaceholder() {
        if (this.model.getAttr('placeholder')) return this.model.getAttr('placeholder');
        return ApplicationController.isDebugMode() ? '[null]' : null;
    }
    onEditButtonClick = async e => {
        console.log('RowFormComboBoxFieldController.onEditButtonClick');
        const itemEditPage = this.getModel().getAttr('itemEditPage');
        const value = this.getValue();
        // console.log('itemEditPage', itemEditPage);
        // console.log('value:', value);
        if (itemEditPage && value) {
            await this.openPage({
                name: itemEditPage,
                params: {
                    key: value
                }
            });
        }
    }
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
        }

        // page
        const pc = await this.openPage({
            name: createPageName,
            newMode: true
        });

        // form
        const form = pc.getModel().getForm(itemCreateForm);
        const onInsert = async e => {
            form.off('insert', onInsert);
            const [key] = e.inserts;
            const [id] = Helper.decodeValue(key);
            // console.log('id:', id);
            await this.onChange(id.toString());
        }
        form.on('insert', onInsert);
    }
    onListInsert = async e => {
        console.log('RowFormComboBoxFieldController.onListInsert');
        await this.rerender();
    }
    onListUpdate = async e => {
        // console.log('RowFormComboBoxFieldController.onListUpdate');
        await this.rerender();
    }
    onListDelete = async e => {
        await this.rerender();
    }
    onItemSelect = async e => {
        // console.log('RowFormComboBoxFieldController.onItemSelect');
        if (e.button === 0) {
            e.preventDefault();
            const id = this.getValue();
            const selectedKey = id ? JSON.stringify([id]) : null;
            await this.openPage({
                name       : this.getModel().getAttr('itemSelectPage'),
                selectMode : true,
                selectedKey: selectedKey,
                onSelect   : async key => {
                    if (key) {
                        const [id] = Helper.decodeValue(key);
                        // console.log('id:', id);
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
    }
}

window.QForms.RowFormComboBoxFieldController = RowFormComboBoxFieldController;

class RowFormDateFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormDateFieldView;
    }
    getValueForWidget() {
        return this.getValue();
    }
    setValueFromWidget(widgetValue) {
        this.setValue(widgetValue);
    }
}
window.QForms.RowFormDateFieldController = RowFormDateFieldController;

class RowFormDateTimeFieldController extends RowFormFieldController {
    constructor(...args) {
        super(...args);
        this.widget2 = null;
        this.defaultValue = 0;
        this.state.parseError2 = null;
        this.state.error2 = null;
    }
    getViewClass() {
        return super.getViewClass() || RowFormDateTimeFieldView;
    }
    getValueForWidget() {
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
    setValueFromWidget(widgetValue) {
        if (widgetValue === null) {
            this.state.parseError2 = null;
            this.resetErrors2();
            if (this.widget2) this.widget2.setValue(null);
        } else {
            const [h, m] = TimeBox.splitTime(this.defaultValue);
            widgetValue.setHours(h, m);
        }
        this.setValue(widgetValue);
    }
    onView2Create = widget2 => {
        // console.log('RowFormDateTimeFieldController.onView2Create', widget2);
        this.widget2 = widget2;
    };
    _onChange(widgetValue) {
        // console.log('RowFormDateTimeFieldController._onChange', this.widget2);
        if (widgetValue !== null) {
            setTimeout(() => {
                const input = this.widget2.getElement();
                input.focus();
                input.setSelectionRange(0, input.value.length);
            }, 0);
        }
    }
    onChange2 = (widgetValue, fireEvent = true) => {
        // console.log('RowFormDateTimeFieldController.onChange2', widgetValue);
        this.resetErrors2();
        try {
            this.setValueFromView2(widgetValue);
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
                this.emit('change', {value: widgetValue});
            } catch (err) {
                console.error('unhandled change event error:', this.model.getFullName(), err);
            }
            this.parent.onFieldChange({source: this});
        }
    };
    onBlur2 = (widgetValue, fireEvent = false) => {
        console.log('RowFormDateTimeFieldController.onBlur2', widgetValue);
        if (!this.isEditable()) return;
        this.validate2();
        if (this.isValid()) {
            this.copyValueToModel();
        }
        this.refreshChanged();
        if (fireEvent) {
            try {
                this.emit('change', {value: widgetValue});
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
        // console.log('RowFormDateTimeFieldController.setDefaultValue', this.widget2 ? this.widget2.getValue() : null);
        if (typeof defaultValue === 'string') {
            this.defaultValue = TimeBox.getIntegerValue(defaultValue);
        } else {
            if (defaultValue >= 24 * 60) throw new Error(`wrong default value: ${defaultValue}`);
            this.defaultValue = defaultValue;
        }
        if (this.widget2 && this.widget2.getValue() === null && this.state.value) {
            this.setValue2(null);
        }
    }
    setValueFromView2(widgetValue) {
        if (isNaN(widgetValue)) throw new Error('wrong time');
        this.setValue2(widgetValue);
    }
    setValue2(widgetValue) {
        const value = widgetValue !== null ? widgetValue : this.defaultValue;
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
        if (this.widget2) {
            try {
                const widgetValue = this.widget2.getValue();
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
        return this.state.parseError2 === null && this.state.error2 === null;
    }
    refill() {
        // console.log('RowFormDateTimeFieldController.refill');
        if (!this.widget2) return;
        super.refill();
        this.widget2.setValue(this.getValueForTime());
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
        return super.getViewClass() || RowFormFileFieldView;
    }
}
window.QForms.RowFormFileFieldController = RowFormFileFieldController;

class RowFormImageFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormImageFieldView;
    }
}
window.QForms.RowFormImageFieldController = RowFormImageFieldController;

class RowFormLinkFieldController extends  RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormLinkFieldView;
    }
    onClick = e => {
        console.log('RowFormLinkFieldController.onClick', e);
        this.emit({source: this});
    }
}
window.QForms.RowFormLinkFieldController = RowFormLinkFieldController;

class RowFormPasswordFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormPasswordFieldView;
    }
}
window.QForms.RowFormPasswordFieldController = RowFormPasswordFieldController;

class RowFormPhoneFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormPhoneFieldView;
    }
}
window.QForms.RowFormPhoneFieldController = RowFormPhoneFieldController;

class RowFormTextAreaFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormTextAreaFieldView;
    }
}
window.QForms.RowFormTextAreaFieldController = RowFormTextAreaFieldController;

class RowFormTextBoxFieldController extends RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormTextBoxFieldView;
    }
}
window.QForms.RowFormTextBoxFieldController = RowFormTextBoxFieldController;

class RowFormTimeFieldController extends RowFormFieldController {
    constructor(...args) {
        super(...args);
        this.defaultValue = null;
    }
    getViewClass() {
        return super.getViewClass() || RowFormTimeFieldView;
    }
    getValueForWidget() {
        return this.getValue();
    }
    setValueFromWidget(widgetValue) {
        if (isNaN(widgetValue)) throw new Error('wrong time');
        this.setValue(widgetValue);
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
    getValueForWidget(row) {
        // console.log('TableFormFieldController.getValueForWidget');
        return this.valueToString(this.model.getValue(row));
    }
}
window.QForms.TableFormFieldController = TableFormFieldController;

class TableFormCheckBoxFieldController extends TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormCheckBoxFieldView;
    }
    getValueForWidget(row) {
        return this.model.getValue(row);
    }
}
window.QForms.TableFormCheckBoxFieldController = TableFormCheckBoxFieldController;

class TableFormComboBoxFieldController extends TableFormFieldController {

    init() {
        super.init();
        const dataSource = this.getModel().getComboBoxDataSource();
        dataSource.on('insert', this.onListUpdate);
        dataSource.on('update', this.onListUpdate);
        dataSource.on('delete', this.onListUpdate);
    }

    deinit() {
        const dataSource = this.getModel().getComboBoxDataSource();
        dataSource.off('insert', this.onListUpdate);
        dataSource.off('update', this.onListUpdate);
        dataSource.off('delete', this.onListUpdate);
        super.deinit();
    }

    getViewClass() {
        return super.getViewClass() || TableFormComboBoxFieldView;
    }

    getValueForWidget(row) {
        const value = this.model.getValue(row);
        const rawValue = this.model.valueToRaw(value);
        if (rawValue === undefined || rawValue === 'null') return '';
        const cbRow = this.model.findRowByRawValue(rawValue);
        if (cbRow) {
            return this.valueToString(this.model.getDisplayValue(cbRow));
        }
        return `[no row for id: ${rawValue}]`;
    }

    onListUpdate = async e => {
        // console.log('TableFormComboBoxFieldController.onListUpdate', this.getModel().getFullName());
        this.getForm().invalidate();
        await this.getForm().rerender();
    }

}
window.QForms.TableFormComboBoxFieldController = TableFormComboBoxFieldController;

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
window.QForms.TableFormDateFieldController = TableFormDateFieldController;

class TableFormDateTimeFieldController extends TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormDateTimeFieldView;
    }
    getValueForWidget(row) {
        const value = this.model.getValue(row);
        if (value) return Helper.formatDate(value, this.getFormat() || '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}');
        return '';
    }
}
window.QForms.TableFormDateTimeFieldController = TableFormDateTimeFieldController;

class TableFormLinkFieldController extends TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormLinkFieldView;
    }
    onClick = e => {
        console.log('TableFormLinkFieldController.onClick', e);
        e.preventDefault();
        this.emit('click', {source: this});
    }
}
window.QForms.TableFormLinkFieldController = TableFormLinkFieldController;

class TableFormPhoneFieldController extends TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormPhoneFieldView;
    }
}

class TableFormTextAreaFieldController extends TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormTextAreaFieldView;
    }
}
window.QForms.TableFormTextAreaFieldController = TableFormTextAreaFieldController;

class TableFormTextBoxFieldController extends TableFormFieldController {
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
window.QForms.TableFormTextBoxFieldController = TableFormTextBoxFieldController;

class TableFormTimeFieldController extends TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormTimeFieldView;
    }
    getValueForWidget(row) {
        const value = this.model.getValue(row);
        return TimeBox.getStringValue(value);
    }
}
window.QForms.TableFormTimeFieldController = TableFormTimeFieldController;

class FormController extends ModelController {
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
        if (this.state.hasNew) {
            this.state.mode = 'edit';
        }
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

    onModelRefresh = async e => {
        console.log('RowFormController.onModelRefresh', this.model.getFullName());
        if (!this.view) return;
        this.refill();
        this.invalidate();
        this.rerender();
    }

    onModelInsert = async e => {
        console.log('RowFormController.onModelInsert', this.model.getFullName());
        this.refill();
        this.invalidate();
        this.calcState();
        this.parent.onFormInsert(e);
    }

    onModelUpdate = async e => {
        console.log('RowFormController.onModelUpdate', this.model.getFullName(), e);
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
            this.state.mode = 'view';
            try {
                this.getApp().getView().disableRerender();
                await this.model.update();
                console.log('form model updated', this.getModel().getFullName());
            } finally {
                this.getApp().getView().enableRerender();
                await this.getApp().getView().rerender();
            }
        } else {
            console.error(`cannot update invalid row form: ${this.model.getFullName()}`);
            await this.rerender();
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
        console.log('RowFormController.onEditClick');
        this.state.mode = 'edit';
        this.rerender();
    }
    onCancelClick = e => {
        console.log('RowFormController.onCancelClick');
        this.state.mode = 'view';
        this.rerender();
    }
    getViewClass() {
        // console.log('RowFormController.getViewClass', this.model.getFullName());
        return super.getViewClass() || RowFormView;
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
window.QForms.RowFormController = RowFormController;

class TableFormController extends FormController {
    constructor(model, parent) {
        super(model, parent);
        this.state = {
            updated: Date.now()
        };
        this.grid = null;
    }
    getViewClass() {
        return super.getViewClass() || TableFormView;
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
    onGridCreate = grid => {
        this.grid = grid;
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
    onDeleteClick = async e => {
        console.log('TableFormController.onDeleteClick', this.model.getFullName(), this.grid.getActiveRowKey());
        const result = await this.getApp().confirm({message: this.model.getApp().getText().form.areYouSure});
        if (result) {
            await this.model.getDefaultDataSource().delete(this.grid.getActiveRowKey());
        }
    }
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
                if (this.getPage().getModel().getOptions().selectMode) {
                    await this.getPage().selectRow(key);
                } else {
                    await this.edit(key);
                }
            break;
        }
    }
    onGridLinkClick = async key => {
        console.log('TableFormController.onGridLinkClick', key);
        await this.edit(key);
    }
    onGridDeleteKeyDown = async (row, key) => {
        console.log('TableFormController.onGridDeleteKeyDown', row, key);
        if (this.getModel().getAttr('deleteRowMode') !== 'disabled') {
            const result = await this.getApp().confirm({message: this.model.getApp().getText().form.areYouSure});
            if (result) {
                await this.model.getDefaultDataSource().delete(key);
            }
        }
    }
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
            const result = await this.model.getDefaultDataSource().insert(row);
            const database = this.model.getDefaultDataSource().getAttr('database');
            const table = this.model.getDefaultDataSource().getAttr('table');
            const [key] = result[database][table].insert;
            await this.openPage({
                name : this.model.getAttr('itemEditPage'),
                // key  : key,
                modal: true,
                params: {
                    ...DataSource.keyToParams(key)
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
                name : this.model.getAttr('itemCreatePage'),
                // key  : key,
                modal: true,
                params: {
                    ...DataSource.keyToParams(key)
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
                name : this.model.getAttr('itemEditPage'),
                modal: true,
                params: {
                    ...DataSource.keyToParams(key)
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
    }
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
    }
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
    }
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
    }

    onGridSelectionChange = async key => {
        // console.log('TableFormController.onGridSelectionChange', key);
        this.invalidate();
        await this.getPage().rerender();
    }
    getActiveRow() {
        const key = this.grid.getActiveRowKey();
        if (!key) throw new Error(`${this.model.getFullName()}: no active row key`);
        return this.model.getDefaultDataSource().getRow(key);
    }
    isRowSelected = () => {
        // console.log('TableFormController.isRowSelected');
        return !!this.grid && !!this.grid.getActiveRowKey();
    }
    onFrameChanged = async value => {
        // console.log('TableFormController.onFrameChanged', parseInt(value));
        const frame = parseInt(value);
        this.model.getDefaultDataSource().setFrame(frame);
        this.model.getDefaultDataSource().refresh();
        await this.rerender();
    }
    onNextClick = async () => {
        console.log('TableFormController.onNextClick');
        const frame = this.model.getDefaultDataSource().getFrame() + 1;
        this.model.getDefaultDataSource().setFrame(frame);
        this.model.getDefaultDataSource().refresh();
        await this.rerender();
    }

    onPreviousClick = async () => {
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
    getSelectedRowKey() {
        return this.grid ? this.grid.getActiveRowKey() : null;
    }
    isActionEnabled(name) {
        return this.isRowSelected();
    }
}
window.QForms.TableFormController = TableFormController;

class PageController extends ModelController {
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
    }

    onClosePageClick = async e => {
        console.log('PageController.onClosePageClick', this.getModel().getFullName());
        await this.close();
    }

    onOpenPageClick = async e => {
        const name = this.getModel().getName();
        const key = this.getModel().getKey();
        const link = this.createOpenInNewLink(name, key);
        // console.log('link', link);
        window.open(link, '_blank');
    }
    createOpenInNewLink(name, key) {
        return PageController.createLink({
            page: name,
            ...DataSource.keyToParams(key)
        });
    }
    async close() {
        // console.log('PageController.close', this.model.getFullName());
        const changed = this.isChanged();
        // console.log('changed:', changed);
        // const valid = this.isValid();
        // console.log('valid:', valid);
        if (this.model.hasRowFormWithDefaultSqlDataSource() && changed) {
            const result = await this.getApp().confirm({message: this.model.getApp().getText().form.areYouSure})
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
        const params =  this.getModel().getParams();
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
            return [
                window.location.pathname,
                [
                    // ...(query ? query.split('&') : []),
                    ...(ApplicationController.isDebugMode() ? ['debug=1'] : []),
                    ...Object.keys(params).map(name => `${name}=${encodeURI(params[name])}`)
                ].join('&')
            ].join('?');
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
    }
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
        return [
            model.getCaption(),
            ...(ApplicationController.isDebugMode() ? [`(${this.getId()})`] : []),
            ...(keyPart ? [keyPart] : [])
        ].join(' ');
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
    }
    onResetClick = async e => {
        console.log('PageController.onResetClick');
        await this.selectRow(null);
    }
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
        return this.data.domain;
    }
    getVirtualPath() {
        return this.data.virtualPath;
    }
    async rpc(name, params) {
        console.log('Application.rpc', this.getFullName(), name, params);
        if (!name) throw new Error('no name');
        const result = await this.request({
            uuid  : this.getAttr('uuid'),
            action: 'rpc',
            name  : name,
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
        }
        // console.log('promises:', promises);
        return Promise.allSettled(promises);
    }
}
window.QForms.Application = Application;

class Column  extends Model {
    constructor(data, parent) {
        super(data, parent);
        if (!this.getAttr('type')) throw new Error(`column ${this.getFullName()}: no type`);
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
        if (this.getAttr('table')) {
            const table = this.getTable();
            table.on('insert' , this.onTableInsert);
            table.on('update' , this.onTableUpdate);
            table.on('delete' , this.onTableDelete);
            table.on('refresh', this.onTableRefresh);
        }
    }

    deinit() {
        if (this.getAttr('table')) {
            const table = this.getTable();
            table.off('insert' , this.onTableInsert);
            table.off('update' , this.onTableUpdate);
            table.off('delete' , this.onTableDelete);
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
        DataSource.copyNewValues(row, newValues);// copy new values to original row object
        if (key !== newKey) {
            delete this.rowsByKey[key];
            this.rowsByKey[newKey] = row;
        }
        // console.log(`key: ${key} to ${newKey}`);
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
        const type = this.getTable().getColumn(columnName).getType();
        // console.log('type:', type);
        return type;
    }

    async insert() {
        console.log('DataSource.insert', this.news);
        if (!this.news.length) throw new Error('no new rows to insert');
        const inserts = [];
        for (const row of this.news) {
            const newValues = this.getRowWithChanges(row);
            // console.log('newValues:', newValues);
            DataSource.copyNewValues(row, newValues);
            // console.log('row:', row);
            const key = this.getRowKey(row);
            if (!key) throw new Error('invalid insert row, no key');
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
            this.parent.onDataSourceInsert({source: this, inserts});
        }
        this.emit('insert', {source: this, inserts});
        const database = this.getAttr('database');
        const table = this.getAttr('table');
        if (database && table) {
            const result = {[database]: {
                    [table]: {insert: inserts}
                }};
            await this.getApp().emitResult(result, this);
            return result;
        }
        return null;
    }

    async delete(key) {
        console.log('DataSource.delete', key);
        if (!key) throw new Error('no key');
        this.removeRow(key);

        // events
        const deletes = [key];
        if (this.parent.onDataSourceDelete) {
            this.parent.onDataSourceDelete({source: this, deletes});
        }
        this.emit('delete', {source: this, deletes});
        const database = this.getAttr('database');
        const table = this.getAttr('table');
        if (database && table) {
            const result = {[database]: {
                    [table]: {delete: deletes}
                }};
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
            this.parent.onDataSourceUpdate({source: this, updates});
        }
        this.emit('update', {source: this, updates});

        const database = this.getAttr('database');
        const table    = this.getAttr('table');
        if (database && table) {
            const reuslt = {[database]: {
                    [table]: {
                        update: updates
                    }
                }};
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
            DataSource.copyNewValues(newRow, newValues);
            // console.log('newRow:', newRow);
            this.addRow(newRow);
        }

        // events
        if (this.parent.onDataSourceInsert) {
            this.parent.onDataSourceInsert(e);
        }
        this.emit('insert', e);
    }

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
        }

        // events
        if (this.parent.onDataSourceUpdate) {
            this.parent.onDataSourceUpdate(e);
        }
        this.emit('update', e);
    }

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
        }

        // events
        if (this.parent.onDataSourceDelete) {
            this.parent.onDataSourceDelete(e);
        }
        this.emit('delete', e);
    }

    onTableRefresh = async e => {
        throw new Error('DataSource.onTableRefresh: not implemented');
    }

    isSurrogate() {
        return this.isAttr('database');
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
            uuid   : this.getApp().getAttr('uuid'),
            action: 'insert',
            page  : this.getForm().getPage().getName(),
            form  : this.getForm().getName(),
            row   : this.getRowWithChanges(row),
        });

        // key & values
        const [key] = Object.keys(result[database][table].insertEx);
        if (!key) throw new Error('no inserted row key');
        const values = result[database][table].insertEx[key];
        for (const column in values) {
            row[column] = values[column];
        }
        // console.log('key:', key);
        // console.log('row:', row);

        // clear news & changes
        this.news.splice(this.news.indexOf(row), 1);
        // console.log('this.news:', this.news);
        this.changes.clear();

        // add new row to rows
        this.addRow(row);

        // events
        const event = {source : this, inserts: result[database][table].insert};
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
        if (!this.changes.size) throw new Error(`no changes: ${this.getFullName()}`);

        // specific to SqlDataSource
        const result = await this.getApp().request({
            uuid   : this.getApp().getAttr('uuid'),
            action : 'update',
            page   : this.getForm().getPage().getName(),
            form   : this.getForm().getName(),
            changes: this.getChangesByKey(),
        });


        const [key] = Object.keys(result[database][table].updateEx);
        if (!key) throw new Error('no updated row');
        const newValues = result[database][table].updateEx[key];
        // const newKey = this.getRowKey(newValues);

        this.changes.clear();
        this.updateRow(key, newValues);

        // events
        const event = {source: this, updates: result[database][table].update};
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
            uuid   : this.getApp().getAttr('uuid'),
            action: '_delete',
            page  : this.getForm().getPage().getName(),
            form  : this.getForm().getName(),
            params: {key},
        });
        await this.refill();

        // events
        const event = {source: this, deletes: result[database][table].delete};
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
        }
        // console.log('updates:', e.updates);
        if (!Object.keys(e.updates).length) throw new Error(`${this.getFullName()}: no updates`);

        // update rows
        await this.refill();

        // events
        if (this.parent.onDataSourceUpdate) {
            this.parent.onDataSourceUpdate(e);
        }
        this.emit('update', e);
    }

    onTableInsert = async (e) => {
        console.log('SqlDataSource.onTableInsert', this.getFullName(), e);
        if (this.deinited) throw new Error(`${this.getFullName()}: this data source deinited for onTableInsert`);
        if (e.source === this) {
            // console.error('onTableInsert stop self insert', this.getFullName());
            return;
        }

        // update rows
        await this.refill();

        // events
        if (this.parent.onDataSourceInsert) {
            this.parent.onDataSourceInsert(e);
        }
        this.emit('insert', e);
    }

    onTableDelete = async (e) => {
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
    }

    onTableRefresh = async e => {
        console.log('SqlDataSource.onTableRefresh', this.getFullName(), e);
        if (this.deinited) throw new Error(`${this.getFullName()}: this data source deinited for onTableDelete`);
        if (e.source) throw new Error('refresh is foreign result so source must be null');
        await this.refill();
        if (this.parent.onDataSourceDelete) {
            this.parent.onDataSourceDelete(e);
        }
        this.emit('refresh', e);
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
            page          : page ? page.getName()           : null,
            form          : form ? form.getName()           : null,
            ds            : this.getName(),
            params        : {
                ...this.getPageParams(),
                ...params,
            }
        });
        if (!(data.rows instanceof Array)) throw new Error('rows must be array');
        // if (data.time) console.log(`select time of ${this.getFullName()}:`, data.time);
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
                row[column] = this.valueToRaw(value);
            }
        } catch (err) {
            throw new Error(`[${this.getFullName()}] fillDefaultValue: ${err.toString()}`);
        }
    }

    valueToPageParams(row) {
        // console.log('Field.valueToPageParams', this.getFullName());
        if (this.isParam()) {
            this.getPage().addParam(this.getFullName(), this.getValue(row));
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
        // console.log('Field.getValue', this.getFullName());
        if (!row && this.parent instanceof RowForm) {
            row = this.parent.getRow();
        }
        if (!row) {
            console.log(`${this.getFullName()}: need row`);
        }
        let rawValue;
        if (this.getAttr('column')) {
            rawValue = this.getRawValue(row);
        } else if (this.getAttr('value')) {
            const js = this.getAttr('value');
            try {
                rawValue = eval(js);
            } catch (err) {
                throw new Error(`${this.getFullName()}: value eval error: ${err.message}`);
            }
        } else {
            throw new Error(`${this.getFullName()}: no column and no value in field`);
        }

        // use rawValue
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
window.QForms.ComboBoxField = ComboBoxField;

class DateField extends Field {
    getFormat() {
        return this.getAttr('format');
    }

    rawToValue(raw) {
        // console.log('DateField.rawToValue', this.getFullName(), raw);
        const value = Helper.decodeValue(raw);
        if (value && this.getAttr('timezone') === 'false') {
            Helper.addMinutes(value, value.getTimezoneOffset());
        }
        // console.log('DateField.rawToValue:', raw, value);
        return value;
    }

    valueToRaw(value) {
        let rawValue;
        if (value && this.getAttr('timezone') === 'false') {
            const v = new Date(value.getTime());
            Helper.addMinutes(v, -v.getTimezoneOffset());
            rawValue = Helper.encodeValue(v);
        } else {
            rawValue = Helper.encodeValue(value);
        }
        // console.log('DateField.valueToRaw', rawValue);
        return rawValue;
    }
}
window.QForms.DateField = DateField;

class DateTimeField extends Field {
    getFormat() {
        return this.getAttr('format');
    }
    rawToValue(rawValue) {
        const value = Helper.decodeValue(rawValue);
        if (value && this.getAttr('timezone') === 'false') {
            Helper.addMinutes(value, value.getTimezoneOffset());
        }
        // console.log('DateTimeField.rawToValue:', value);
        return value;
    }
    valueToRaw(value) {
        let rawValue;
        if (value && this.getAttr('timezone') === 'false') {
            const v = new Date(value.getTime());
            Helper.addMinutes(v, -v.getTimezoneOffset());
            rawValue = Helper.encodeValue(v);
        } else {
            rawValue = Helper.encodeValue(value);
        }
        // console.log('DateTimeField.valueToRaw', rawValue);
        return rawValue;
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

class PasswordField extends Field {

}
window.QForms.PasswordField = PasswordField;

class PhoneField extends Field {
}
window.QForms.PhoneField = PhoneField;

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
            uuid  : this.getApp().getAttr('uuid'),
            action: 'rpc',
            page  : this.getPage().getName(),
            form  : this.getName(),
            name  : name,
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
        // if (!options.id) throw new Error('no page id');
        super(data, parent);
        this.options     = options; // {id, modal, newMode, selectMode, params}
        this.dataSources = [];
        this.forms       = [];
        this.params      = {};
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
            const FormClass = FrontHostApp.getClassByName(Model.getClassName(data));
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
        return {
            ...(this.options.params || {}),
            ...this.params,
        };
    }

    addParam(name, value) {
        // console.log('Page.addParam', name);
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
            const keyParams = DataSource.keyToParams(key);// key params to page params
            for (const name in keyParams) {
                this.addParam(name, keyParams[name]);
            }
        }
    }
    async rpc(name, params) {
        // console.log('Page.rpc', this.getFullName(), name, params);
        if (!name) throw new Error('no name');
        const result =  await this.getApp().request({
            uuid  : this.getApp().getAttr('uuid'),
            action: 'rpc',
            page  : this.getName(),
            name  : name,
            params: params
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
    constructor(data, parent) {
        super(data, parent);
        this.columns = [];
    }
    init() {
        // console.log('Table.init', this.getFullName());
        for (const data of this.data.columns) {
            const column = new Column(data, this);
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
        return [
            ...(result.insert  ? [this.emitInsert(source, result.insert)] : []),
            ...(result.update  ? [this.emitUpdate(source, result.update)] : []),
            ...(result.delete  ? [this.emitDelete(source, result.delete)] : []),
            ...(result.refresh ? [this.emitRefresh(source              )] : [])
        ];
    }
    emitInsert(source, inserts) {
        return this.emit('insert', {source, inserts});
    }
    emitUpdate(source, updates) {
        return this.emit('update', {source, updates});
    }
    emitDelete(source, deletes) {
        return this.emit('delete', {source, deletes});
    }
    emitRefresh(source) {
        return this.emit('refresh', {source});
    }
}
window.QForms.Table = Table;