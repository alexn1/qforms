/// <reference types="react" />
import { RowFormFieldView } from '../RowFormFieldView';
import { RowFormDateTimeFieldController } from './RowFormDateTimeFieldController';
import './RowFormDateTimeFieldView.less';
export declare class RowFormDateTimeFieldView<T extends RowFormDateTimeFieldController> extends RowFormFieldView<T> {
    onClear2: () => Promise<void>;
    isCloseVisible(): boolean;
    renderDatePart(): JSX.Element;
    renderTimePart(): JSX.Element;
    getMode(): "date" | "datetime";
    render(): JSX.Element;
}
