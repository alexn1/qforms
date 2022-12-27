/// <reference types="react" />
import { RowFormFieldView } from '../RowFormFieldView';
import './RowFormComboBoxFieldView.less';
export declare class RowFormComboBoxFieldView extends RowFormFieldView {
    onChange: (widgetValue: any) => Promise<void>;
    isCreateButtonVisible(): boolean;
    renderSelect(): JSX.Element;
    renderEditButton(): JSX.Element;
    renderCreateButton(): JSX.Element;
    render(): JSX.Element;
}
