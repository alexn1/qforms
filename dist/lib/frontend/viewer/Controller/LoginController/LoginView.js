"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const View_1 = require("../View");
const common_1 = require("../../../common");
require("./LoginView.less");
class LoginView extends View_1.View {
    constructor(props) {
        super(props);
        this.onLoginFormSubmit = (e) => {
            // console.log('LoginView.onLoginFormSubmit');
            // @ts-ignore
            document.querySelector('.LoginView__button').disabled = true;
            // e.preventDefault();
        };
        this.onChange = (e) => {
            this.errMsgRef.current.innerHTML = '';
        };
        this.errMsgRef = react_1.default.createRef();
    }
    renderLogo() {
        return null;
    }
    renderTitle() {
        return this.getCtrl().getFrontHostApp().getData().title;
    }
    render() {
        // console.log('LoginView.render');
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__container` }, { children: (0, jsx_runtime_1.jsxs)("form", Object.assign({ className: `${this.getCssBlockName()}__form`, method: 'post', onSubmit: this.onLoginFormSubmit }, { children: [(0, jsx_runtime_1.jsx)("input", { type: 'hidden', name: 'tzOffset', value: JSON.stringify(new Date().getTimezoneOffset()) }), (0, jsx_runtime_1.jsx)("input", { type: 'hidden', name: 'action', value: 'login' }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssBlockName()}__logo-title` }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__logo` }, { children: this.renderLogo() })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${this.getCssBlockName()}__title` }, { children: this.renderTitle() }))] })), (0, jsx_runtime_1.jsx)(common_1.TextBox, { classList: [`${this.getCssBlockName()}__field`], name: 'username', placeholder: this.getCtrl().getText().login.username, required: true, autoFocus: true, spellCheck: false, value: this.getCtrl().getFrontHostApp().getData().username || '', onChange: this.onChange }), (0, jsx_runtime_1.jsx)(common_1.Password, { classList: [`${this.getCssBlockName()}__field2`], name: 'password', placeholder: this.getCtrl().getText().login.password, value: this.getCtrl().getFrontHostApp().getData().password || '', onChange: this.onChange }), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: `${this.getCssBlockName()}__err-msg`, ref: this.errMsgRef }, { children: this.getCtrl().getFrontHostApp().getData().errMsg })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: `${this.getCssBlockName()}__button`, type: 'submit' }, { children: this.getCtrl().getText().login.signIn }))] })) })));
    }
}
exports.LoginView = LoginView;
if (typeof window === 'object') {
    window.LoginView = LoginView;
}
