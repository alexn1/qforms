"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewDatabaseView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const common_1 = require("../../../common");
class NewDatabaseView extends common_1.ReactComponent {
    constructor(props) {
        super(props);
        this.onCreate = async (e) => {
            // console.debug('NewDatabaseView.onCreate');
            await this.props.ctrl.onCreate({
                class: this.class.getValue(),
                name: this.name.getValue(),
                host: this.host.getValue(),
                database: this.database.getValue(),
                user: this.user.getValue(),
                password: this.password.getValue(),
            });
        };
        this.onKeyDown = (e) => {
            if (e.key === 'Escape') {
                this.props.ctrl.onClose();
            }
            else if (e.key === 'Enter') {
                this.onCreate();
            }
        };
        this.el = (0, react_1.createRef)();
        this.class = null;
        this.name = null;
        this.host = null;
        this.database = null;
        this.user = null;
        this.password = null;
    }
    render() {
        const ctrl = this.props.ctrl;
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssClassNames()} NewModelView`, ref: this.el, tabIndex: 0, onKeyDown: this.onKeyDown }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `NewModelView__header` }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: `NewModelView__title` }, { children: "New Database" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "close", onClick: ctrl.onClose }, { children: (0, jsx_runtime_1.jsx)("span", { children: "\u00D7" }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `NewModelView__body` }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "class" }, { children: "Class" })), (0, jsx_runtime_1.jsx)(common_1.ComboBox, { id: 'class', items: [
                                        { value: 'MySqlDatabase', title: 'MySqlDatabase' },
                                        { value: 'PostgreSqlDatabase', title: 'PostgreSqlDatabase' },
                                        { value: 'MongoDbDatabase', title: 'MongoDbDatabase' },
                                    ], onCreate: (c) => (this.class = c), value: 'PostgreSqlDatabase' })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "name" }, { children: "Name" })), (0, jsx_runtime_1.jsx)(common_1.TextBox, { id: 'name', value: 'default', onCreate: (c) => (this.name = c), autocomplete: 'off' })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "host" }, { children: "Host" })), (0, jsx_runtime_1.jsx)(common_1.TextBox, { id: 'host', value: 'localhost', onCreate: (c) => (this.host = c), autocomplete: 'off' })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "database" }, { children: "Database" })), (0, jsx_runtime_1.jsx)(common_1.TextBox, { id: 'database', value: 'test', onCreate: (c) => (this.database = c), autocomplete: 'off' })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "user" }, { children: "User" })), (0, jsx_runtime_1.jsx)(common_1.TextBox, { id: 'user', value: 'test', onCreate: (c) => (this.user = c), autocomplete: 'off' })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "user" }, { children: "Password" })), (0, jsx_runtime_1.jsx)(common_1.TextBox, { id: 'password', value: '123qwe', onCreate: (c) => (this.password = c), autocomplete: 'off' })] })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `NewModelView__footer` }, { children: [(0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ onClick: ctrl.onClose }, { children: "Close" })), (0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ name: "create", onClick: this.onCreate }, { children: "Create" }))] }))] })));
    }
}
exports.NewDatabaseView = NewDatabaseView;
