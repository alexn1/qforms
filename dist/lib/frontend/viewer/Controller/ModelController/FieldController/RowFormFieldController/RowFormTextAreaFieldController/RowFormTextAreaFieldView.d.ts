/// <reference types="react" />
import { RowFormFieldView } from '../RowFormFieldView';
export declare class RowFormTextAreaFieldView extends RowFormFieldView {
    constructor(props: any);
    onFocus: (e: any) => Promise<void>;
    onBlur: (e: any) => Promise<void>;
    render(): JSX.Element;
}
