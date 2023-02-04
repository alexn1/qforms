/// <reference types="react" />
import { RowFormFieldView } from '../RowFormFieldView';
import { RowFormRadioFieldController } from './RowFormRadioFieldController';
import './RowFormRadioFieldView.less';
export declare class RowFormRadioFieldView<T extends RowFormRadioFieldController> extends RowFormFieldView<T> {
    onClick: (e: any) => Promise<void>;
    render(): JSX.Element;
}
