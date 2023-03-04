"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormView = void 0;
const ModelView_1 = require("../ModelView");
class FormView extends ModelView_1.ModelView {
    constructor(props) {
        super(props);
        this.onActionsClick = async (li) => {
            // console.log('FormView.onActionsClick:', li);
            const ctrl = this.props.ctrl;
            const name = li.dataset.action;
            try {
                const result = await ctrl.onActionClick(name, ctrl.getActiveRow(true));
                if (!result) {
                    throw new Error(`no handler for action '${name}'`);
                }
            }
            catch (err) {
                console.error(err);
                await this.getCtrl().getApp().alert({ message: err.message });
            }
        };
        this.checkParent();
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('FormView.shouldComponentUpdate', this.getCtrl().getModel().getFullName(), nextProps.updated - this.props.updated);
        if (nextProps.updated - this.props.updated)
            return true;
        return false;
    }
}
exports.FormView = FormView;
if (typeof window === 'object') {
    // @ts-ignore
    window.FormView = FormView;
}
