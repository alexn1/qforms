"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const View_1 = require("../View");
const Model_1 = require("../../Model/Model");
class ModelView extends View_1.View {
    constructor() {
        super(...arguments);
        this.renderActionIcon = undefined;
    }
    getActionsForDropdownButton() {
        return this.getCtrl()
            .getModel()
            .getCol('actions')
            .map((data) => {
            const actionName = Model_1.Model.getName(data);
            return {
                name: actionName,
                title: this.renderActionIcon
                    ? [
                        (0, jsx_runtime_1.jsx)("div", { children: this.renderActionIcon(actionName) }, 'icon'),
                        (0, jsx_runtime_1.jsx)("div", { children: Model_1.Model.getAttr(data, 'caption') }, 'title'),
                    ]
                    : Model_1.Model.getAttr(data, 'caption'),
                enabled: this.getCtrl().isActionEnabled(actionName),
            };
        });
    }
    getCssBlockName() {
        const model = this.getCtrl().getModel();
        if (model.isAttr('cssBlock') && model.getAttr('cssBlock')) {
            return model.getAttr('cssBlock');
        }
        return super.getCssBlockName();
    }
    getStyle(row) { }
}
exports.ModelView = ModelView;
