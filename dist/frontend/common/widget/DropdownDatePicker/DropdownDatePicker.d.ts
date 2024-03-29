/// <reference types="react" />
import { ReactComponent } from '../../ReactComponent';
import './DropdownDatePicker.less';
export declare class DropdownDatePicker extends ReactComponent {
    constructor(props: any);
    onInputClick: (e: any) => void;
    onInputKeyDown: (e: any) => void;
    onCloseDown: (e: any) => Promise<void>;
    onBlur: (e: any) => void;
    onDatePickerMouseDown: (e: any) => void;
    onDatePickerDateSelected: (date: any) => void;
    getFormat(): string;
    getStringValue(): string;
    getSelectedMonth(): any[] | null;
    getSelectedDate(): any[] | null;
    getValue(): any;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    getClassList(): string[];
    renderInput(): JSX.Element;
    renderCloseIcon(): JSX.Element;
    renderDateIcon(): JSX.Element;
    renderDatePicker(): JSX.Element;
    render(): JSX.Element;
    isDebugMode(): boolean;
}
