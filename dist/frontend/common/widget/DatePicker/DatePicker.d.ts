/// <reference types="react" />
import { ReactComponent } from '../../ReactComponent';
import './DatePicker.less';
export declare class DatePicker extends ReactComponent {
    MONTH: string[];
    constructor(props: any);
    static createDateFromArr(arr: any): Date;
    isVisible(): boolean;
    calcSelectedMonth(): any[];
    static getTodayArr(): any[];
    static dateToArray(date: any): any[];
    static getDay(date: any): number;
    createSelectedDate(): Date;
    isDateSelected(): boolean;
    getFirstDateOfTable(): Date;
    createMinDate(): Date;
    isMinDate(): boolean;
    isPrevAllowed(): boolean;
    isMonthAllowed(month: any): boolean;
    onClick: (e: any) => void;
    onMouseDown: (e: any) => any;
    onDateClick(target: any): void;
    onNextClick: (e: any) => void;
    onPrevClick: (e: any) => void;
    render(): JSX.Element;
    isSelectToday(): boolean;
}
