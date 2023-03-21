import { View } from '../View';
import { Model } from '../../Model/Model';
import { ModelController } from './ModelController';

export class ModelView<T extends ModelController<Model>> extends View<T> {
    renderActionIcon: any = undefined;

    getActionsForDropdownButton() {
        return this.getCtrl()
            .getModel()
            .getCol('actions')
            .map((data) => {
                const actionName = Model.getName(data);
                return {
                    name: actionName,
                    title: this.renderActionIcon
                        ? [
                              <div key={'icon'}>{this.renderActionIcon(actionName)}</div>,
                              <div key={'title'}>{Model.getAttr(data, 'caption')}</div>,
                          ]
                        : Model.getAttr(data, 'caption'),
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

    getStyle(row?: any): any {}
}
