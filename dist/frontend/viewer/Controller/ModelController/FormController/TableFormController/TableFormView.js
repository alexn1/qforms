"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFormView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const FormView_1 = require("../FormView");
const DataSource_1 = require("../../../../Model/DataSource/DataSource");
const common_1 = require("../../../../../common");
const Helper_1 = require("../../../../../common/Helper");
require("./TableFormView.less");
class TableFormView extends FormView_1.FormView {
    constructor() {
        super(...arguments);
        this.renderGridCellView = (row, column, onCreate, onUnmount) => {
            // console.log('TableFormView.renderGridCellView');
            const ctrl = this.getCtrl().getField(column.name);
            if (!ctrl)
                throw new Error(`no field: ${column.name}`);
            // console.log(column.name, ctrl.constructor.name);
            return react_1.default.createElement(ctrl.getViewClass(), { row, column, onCreate, onUnmount, ctrl });
        };
        this.createLinkCallback = (key) => {
            return this.getCtrl()
                .getApp()
                .getHostApp()
                .createLink(Object.assign({ page: this.getCtrl().getModel().getAttr('itemEditPage') }, DataSource_1.DataSource.keyToParams(key)));
        };
    }
    renderToolbar() {
        const ctrl = this.getCtrl();
        const model = ctrl.getModel();
        const dataSource = model.getDefaultDataSource();
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssBlockName()}__toolbar flex grid-gap-5` }, { children: [model.getData().newRowMode !== 'disabled' && ((0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ classList: ['toolbar-button', 'default'], onClick: ctrl.onNewClick, enabled: !ctrl.getParent().getModel().hasNew() }, { children: (0, jsx_runtime_1.jsx)("div", { children: model.getApp().getText().form.new }) }), "new")), model.getData().refreshButton === 'true' && dataSource.isPersistent() && ((0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ classList: ['toolbar-button'], onClick: ctrl.onRefreshClick, enabled: !ctrl.getParent().getModel().hasNew() }, { children: (0, jsx_runtime_1.jsx)("div", { children: model.getApp().getText().form.refresh }) }), "refresh")), model.getData().deleteRowMode !== 'disabled' && ((0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ classList: ['toolbar-button'], onClick: ctrl.onDeleteClick, enabled: ctrl.isRowSelected() }, { children: (0, jsx_runtime_1.jsx)("div", { children: model.getApp().getText().form.delete }) }), "delete")), ctrl.getModel().hasActions() && ((0, jsx_runtime_1.jsx)(common_1.DropdownButton, Object.assign({ classList: ['toolbar-dropdown-button'], actions: this.getActionsForDropdownButton(), onClick: this.onActionsClick }, { children: (0, jsx_runtime_1.jsx)(common_1.MoreVertIcon, {}) })))] })));
    }
    renderPaging() {
        const ctrl = this.getCtrl();
        const model = this.getCtrl().getModel();
        const dataSource = model.getDefaultDataSource();
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "paging" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "paging__countBlock" }, { children: (0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "count" }, { children: [dataSource.getRowsLength(), ' ', dataSource.getLimit() &&
                                `of ${Helper_1.Helper.formatNumber(dataSource.getCount())}`] })) })), dataSource.getLimit() && ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "paging__gotoBlock" }, { children: [(0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ enabled: ctrl.canPrev(), onClick: ctrl.onPreviousClick }, { children: (0, jsx_runtime_1.jsx)(common_1.LeftIcon, { size: 18 }) })), (0, jsx_runtime_1.jsx)(common_1.TextBox, { value: ctrl.getModel().getDefaultDataSource().getFrame().toString(), onChange: ctrl.onFrameChanged }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "paging__framesCount" }, { children: [' ', "/ ", Helper_1.Helper.formatNumber(dataSource.getFramesCount()), ' '] })), (0, jsx_runtime_1.jsx)(common_1.Button, Object.assign({ enabled: ctrl.canNext(), onClick: ctrl.onNextClick }, { children: (0, jsx_runtime_1.jsx)(common_1.RightIcon, { size: 18 }) }))] })))] })));
    }
    getGridColumns() {
        const ctrl = this.getCtrl();
        return Object.keys(ctrl.fields)
            .filter((name) => ctrl.getField(name).isVisible())
            .map((name) => {
            const field = ctrl.getField(name);
            return {
                name: field.getModel().getName(),
                title: field.getModel().getCaption(),
                width: field.getModel().getWidth(),
                align: field.getAlign(),
            };
        });
    }
    getRows() {
        const ctrl = this.getCtrl();
        return ctrl.getModel().getDefaultDataSource().getRows();
    }
    getGridExtraColumn() {
        return true;
    }
    getGridClass() {
        return common_1.Grid;
    }
    renderGrid() {
        const ctrl = this.getCtrl();
        return react_1.default.createElement(this.getGridClass(), {
            classList: ['flex-max'],
            onCreate: ctrl.onGridCreate,
            name: ctrl.getModel().getFullName(),
            columns: this.getGridColumns(),
            rows: this.getRows(),
            getRowKey: (row) => ctrl.getModel().getDefaultDataSource().getRowKey(row),
            onDoubleClick: ctrl.onGridCellDblClick,
            onDeleteKeyDown: ctrl.onGridDeleteKeyDown,
            onSelectionChange: ctrl.onGridSelectionChange,
            onLinkClick: ctrl.onGridLinkClick,
            renderGridCellView: this.renderGridCellView,
            updated: ctrl.getUpdated(),
            extraColumn: this.getGridExtraColumn(),
            selectedKey: ctrl.getPage().getModel().getOptions().selectedKey,
            createLinkCallback: this.createLinkCallback,
        });
    }
    render() {
        console.log('TableFormView.render', this.getCtrl().getModel().getFullName());
        const ctrl = this.getCtrl();
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `${this.getCssClassNames()} full flex-column grid-gap-5`, style: this.getStyle() }, { children: [this.renderToolbar(), this.renderGrid(), ctrl.getModel().hasDefaultPersistentDataSource() && this.renderPaging()] })));
    }
}
exports.TableFormView = TableFormView;
