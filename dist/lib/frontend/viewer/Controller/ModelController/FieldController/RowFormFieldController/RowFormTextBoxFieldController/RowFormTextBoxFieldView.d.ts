/// <reference types="react" />
import { RowFormFieldView } from '../RowFormFieldView';
import { RowFormTextBoxFieldController } from './RowFormTextBoxFieldController';
import './RowFormTextBoxFieldView.less';
export declare class RowFormTextBoxFieldView<T extends RowFormTextBoxFieldController> extends RowFormFieldView<T> {
    constructor(props: any);
    onClear: (e: any) => Promise<void>;
    isCloseVisible(): boolean;
    onFocus: (e: any) => Promise<void>;
    onBlur: (e: any) => Promise<void>;
    renderTextBox(): JSX.Element;
    renderCloseIcon(): JSX.Element;
    render(): JSX.Element;
}
