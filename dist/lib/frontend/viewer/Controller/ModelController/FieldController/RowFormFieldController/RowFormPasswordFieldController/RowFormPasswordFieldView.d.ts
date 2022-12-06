/// <reference types="react" />
import { RowFormFieldView } from '../RowFormFieldView';
export declare class RowFormPasswordFieldView extends RowFormFieldView {
    constructor(props: any);
    onCloseClick: (e: any) => Promise<void>;
    isCloseVisible(): boolean;
    onFocus: (e: any) => Promise<void>;
    onBlur: (e: any) => Promise<void>;
    onIconClick: (e: any) => void;
    render(): JSX.Element;
}
