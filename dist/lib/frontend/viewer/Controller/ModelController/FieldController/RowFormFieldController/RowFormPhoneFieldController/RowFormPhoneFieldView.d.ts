/// <reference types="react" />
import { RowFormFieldView } from '../RowFormFieldView';
import './RowFormPhoneFieldView.less';
export declare class RowFormPhoneFieldView extends RowFormFieldView {
    constructor(props: any);
    onClear: (e: any) => Promise<void>;
    isCloseVisible(): boolean;
    onFocus: (e: any) => Promise<void>;
    onBlur: (value: any) => Promise<void>;
    renderPhoneBox(): JSX.Element;
    renderClearButton(): JSX.Element;
    renderPhoneIcon(): JSX.Element;
    render(): JSX.Element;
}
