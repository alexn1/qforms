/// <reference types="react" />
import { RowFormFieldView } from '../RowFormFieldView';
export declare class RowFormDateTimeFieldView extends RowFormFieldView {
    onClear2: () => Promise<void>;
    isCloseVisible(): boolean;
    renderDatePart(): JSX.Element;
    renderTimePart(): JSX.Element;
    getMode(): "date" | "datetime";
    render(): JSX.Element;
}
