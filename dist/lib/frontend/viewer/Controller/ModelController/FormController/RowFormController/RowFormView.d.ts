import { ReactNode } from 'react';
import { FormView } from '../FormView';
import { RowFormController } from './RowFormController';
import './RowFormView.less';
export declare class RowFormView extends FormView<RowFormController> {
    renderToolbar(): any;
    isActionsEnabled(): boolean;
    isActionsVisible(): boolean;
    renderLabel(fieldCtrl: any): JSX.Element;
    renderField(fieldCtrl: any): JSX.Element;
    renderFieldView(fieldCtrl: any): any;
    static renderFieldView(fieldCtrl: any): any;
    renderError(fieldCtrl: any): JSX.Element;
    renderGroup(fieldCtrl: any): ReactNode;
    renderGroups(): JSX.Element;
    render(): JSX.Element;
}
