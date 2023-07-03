"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const ModelView_1 = require("../ModelView");
const PageController_1 = require("../PageController/PageController");
const common_1 = require("../../../../common");
require("./ApplicationView.less");
class ApplicationView extends ModelView_1.ModelView {
    renderActivePage() {
        const { ctrl } = this.props;
        if (ctrl.activePage) {
            return this.renderView(ctrl.activePage);
        }
        return null;
    }
    renderView(ctrl, props = {}) {
        return react_1.default.createElement(ctrl.getViewClass(), Object.assign({ parent: this, ctrl: ctrl, onCreate: ctrl.onViewCreate }, props));
    }
    renderModals() {
        return this.getCtrl().modals.map((ctrl) => {
            if (ctrl instanceof PageController_1.PageController) {
                return (0, jsx_runtime_1.jsx)(common_1.Modal, { children: this.renderView(ctrl) }, ctrl.getId());
            }
            return this.renderView(ctrl, { key: ctrl.getId() });
        });
    }
    renderHeader() {
        return ((0, jsx_runtime_1.jsx)("header", Object.assign({ className: `${this.getCssBlockName()}__header` }, { children: (0, jsx_runtime_1.jsx)(common_1.Menu, { items: this.getCtrl().getMenuItemsProp(), onClick: this.getCtrl().onMenuItemClick }) })));
    }
    renderMain() {
        return (0, jsx_runtime_1.jsx)("main", Object.assign({ className: `${this.getCssBlockName()}__main` }, { children: this.renderActivePage() }));
    }
    renderFooter() {
        return ((0, jsx_runtime_1.jsx)("footer", Object.assign({ className: `${this.getCssBlockName()}__footer` }, { children: (0, jsx_runtime_1.jsx)(common_1.Statusbar, { onCreate: this.getCtrl().onStatusbarCreate }) })));
    }
    render() {
        console.debug(`${this.constructor.name}.render`, this.getCtrl().getModel().getFullName());
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssBlockName()}__container`, style: this.getStyle() }, { children: [this.renderHeader(), this.renderMain(), this.renderFooter(), this.renderModals()] })));
    }
}
exports.ApplicationView = ApplicationView;
