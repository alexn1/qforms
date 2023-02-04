/// <reference types="react" />
import { RowFormFieldView } from '../RowFormFieldView';
import { RowFormTextAreaFieldController } from './RowFormTextAreaFieldController';
import './RowFormTextAreaFieldView.less';
export declare class RowFormTextAreaFieldView<T extends RowFormTextAreaFieldController> extends RowFormFieldView<T> {
    constructor(props: any);
    onFocus: (e: any) => Promise<void>;
    onBlur: (e: any) => Promise<void>;
    render(): JSX.Element;
}
