/// <reference types="react" />
import { RowFormFieldView } from '../RowFormFieldView';
import { RowFormComboBoxFieldController } from './RowFormComboBoxFieldController';
import './RowFormComboBoxFieldView.less';
export declare class RowFormComboBoxFieldView<T extends RowFormComboBoxFieldController> extends RowFormFieldView<T> {
    onChange: (widgetValue: any) => Promise<void>;
    isCreateButtonVisible(): boolean;
    renderSelect(): JSX.Element;
    renderEditButton(): JSX.Element;
    renderCreateButton(): JSX.Element;
    render(): JSX.Element;
}
