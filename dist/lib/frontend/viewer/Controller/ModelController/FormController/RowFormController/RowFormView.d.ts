/// <reference types="react" />
import { FormView } from '../FormView';
export declare class RowFormView extends FormView {
    renderToolbar(): JSX.Element;
    isActionsEnabled(): boolean;
    isActionsVisible(): boolean;
    renderLabel(fieldCtrl: any): JSX.Element;
    renderField(fieldCtrl: any): JSX.Element;
    renderFieldView(fieldCtrl: any): any;
    static renderFieldView(fieldCtrl: any): any;
    renderError(fieldCtrl: any): JSX.Element;
    renderGroup(fieldCtrl: any): JSX.Element[];
    renderGroups(): JSX.Element;
    render(): JSX.Element;
}
