/// <reference types="react" />
import { RowFormFieldView } from '../RowFormFieldView';
import { RowFormDateTimeFieldController } from './RowFormDateTimeFieldController';
import './RowFormDateTimeFieldView.less';
export declare class RowFormDateTimeFieldView extends RowFormFieldView<RowFormDateTimeFieldController> {
    onClear2: () => Promise<void>;
    isCloseVisible(): boolean;
    renderDatePart(): JSX.Element;
    renderTimePart(): JSX.Element;
    getMode(): 'datetime' | 'date';
    render(): JSX.Element;
}
