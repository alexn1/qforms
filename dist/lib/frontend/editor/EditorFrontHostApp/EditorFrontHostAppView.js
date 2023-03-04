"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorFrontHostAppView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const common_1 = require("../../common");
const ActionList_1 = require("../ActionList/ActionList");
const TreeWidget_1 = require("../TreeWidget/TreeWidget");
const PropertyGrid_1 = require("../PropertyGrid/PropertyGrid");
const ModalView_1 = require("../ModalController/ModalView");
require("./EditorFrontHostAppView.less");
class EditorFrontHostAppView extends common_1.ReactComponent {
    renderDocumentView(document) {
        if (!document.controller.getDocumentViewClass()) {
            return (0, jsx_runtime_1.jsxs)("div", { children: ["no document view for ", document.controller.constructor.name] });
        }
        return React.createElement(document.controller.getDocumentViewClass(), {
            // @ts-ignore
            onCreate: (c) => (document.view = c),
            document: document,
            ctrl: document.controller,
        });
    }
    getTabs() {
        console.log('EditorFrontHostAppView.getTabs', this.props.ctrl.documents);
        return this.props.ctrl.documents.map((document) => ({
            name: document.controller.model.getFullName(),
            title: document.controller.model.getFullName(),
            content: this.renderDocumentView(document),
        }));
    }
    render() {
        const { ctrl } = this.props;
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "EditorFrontHostAppView" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'EditorFrontHostAppView__sidebar' }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'tree-bar' }, { children: [(0, jsx_runtime_1.jsx)("a", Object.assign({ href: ctrl.runAppLink, target: "_blank" }, { children: "Run Application" })), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(ActionList_1.ActionList, { onCreate: (c) => (ctrl.actionList = c), onClick: ctrl.onActionClick }) })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'frame full' }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'frame__container' }, { children: (0, jsx_runtime_1.jsx)(TreeWidget_1.TreeWidget, { classList: ['full'], onCreate: (c) => (ctrl.treeWidget2 = c), items: ctrl.items, onItemSelect: ctrl.onItemSelect2, onItemDoubleClick: ctrl.onItemDoubleClick2, onItemOpen: ctrl.onItemOpen2 }) })) })), (0, jsx_runtime_1.jsx)(common_1.Tab, { classList: ['Tab-blue', 'full'], tabs: [
                                {
                                    name: 'properties',
                                    title: 'Properties',
                                    content: ((0, jsx_runtime_1.jsx)(PropertyGrid_1.PropertyGrid, { onCreate: (c) => (ctrl.pg = c), onChange: ctrl.onPropertyGrid2Change })),
                                },
                            ] })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'EditorFrontHostAppView__client' }, { children: (0, jsx_runtime_1.jsx)(common_1.Tab, { classList: ['full'], canClose: true, onTabClose: ctrl.onDocumentClose, onCreate: (c) => (ctrl.tabWidget = c), tabs: this.getTabs() }) })), ctrl.modal && React.createElement(ModalView_1.ModalView, { ctrl: ctrl.modal })] })));
    }
}
exports.EditorFrontHostAppView = EditorFrontHostAppView;
