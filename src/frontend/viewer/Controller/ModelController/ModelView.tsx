import {View} from '../View';
import {Model} from '../../Model/Model';

export class ModelView extends View {
    renderActionIcon?: any;
    getActionsForDropdownButton() {
        return this.props.ctrl.getModel().getCol('actions').map(data => {
            const actionName = Model.getName(data);
            return {
                name : actionName,
                title: this.renderActionIcon ? [
                    <div key={'icon'}>{this.renderActionIcon(actionName)}</div>,
                    <div key={'title'}>{Model.getAttr(data, 'caption')}</div>
                ] : Model.getAttr(data, 'caption'),
                enabled: this.getCtrl().isActionEnabled(actionName)
            };
        });
    }
    getCssBlockName() {
        const model = this.props.ctrl.getModel();
        if (model.isAttr('cssBlock') && model.getAttr('cssBlock')) {
            return model.getAttr('cssBlock');
        }
        return super.getCssBlockName();
    }
    getStyle() {

    }
}

// @ts-ignore
window.ModelView = ModelView;