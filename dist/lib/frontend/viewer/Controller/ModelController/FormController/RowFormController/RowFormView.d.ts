import { ReactNode } from 'react';
import { FormView } from '../FormView';
import { RowFormController } from './RowFormController';
import './RowFormView.less';
import { RowFormFieldController } from '../../FieldController/RowFormFieldController/RowFormFieldController';
export declare class RowFormView<TRowFormController extends RowFormController = RowFormController> extends FormView<TRowFormController> {
    renderToolbar(): any;
    isActionsEnabled(): boolean;
    isActionsVisible(): boolean;
    renderLabel(fieldCtrl: RowFormFieldController): JSX.Element;
    renderField(fieldCtrl: RowFormFieldController): JSX.Element;
    renderFieldView(fieldCtrl: RowFormFieldController): any;
    static renderFieldView(fieldCtrl: RowFormFieldController): any;
    renderError(fieldCtrl: RowFormFieldController): JSX.Element;
    renderGroup(fieldCtrl: RowFormFieldController): ReactNode;
    renderGroups(): JSX.Element;
    render(): JSX.Element;
}
