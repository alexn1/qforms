import { ModelView } from '../ModelView';
import { FormController } from './FormController';
import { Form } from '../../../Model/Form/Form';

export class FormView<T extends FormController<Form>> extends ModelView<T> {
    constructor(props) {
        super(props);
        this.checkParent();
    }

    onActionsClick = async (li) => {
        // console.log('FormView.onActionsClick:', li);
        const ctrl = this.props.ctrl;
        const name = li.dataset.action;
        try {
            const result = await ctrl.onActionClick(name, ctrl.getActiveRow(true));
            if (!result) {
                throw new Error(`no handler for action '${name}'`);
            }
        } catch (err) {
            console.error(err);
            await this.getCtrl().getApp().alert({ message: err.message });
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        console.log(
            'FormView.shouldComponentUpdate',
            this.getCtrl().getModel().getFullName(),
            nextProps.updated - this.props.updated,
        );
        if (nextProps.updated - this.props.updated) return true;
        return false;
    }
}

// @ts-ignore
window.FormView = FormView;
