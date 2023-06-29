/// <reference types="react" />
import { ReactComponent } from '../../ReactComponent';
export declare class TimeBox extends ReactComponent {
    constructor(props: any);
    onKeyPress: (event: any) => void;
    formatValue(value: any): string;
    onChange: (e: any) => void;
    getValue(): number | null;
    setValue(value: any): void;
    onBlur: (e: any) => void;
    static getStringValue(value: any): string;
    static getIntegerValue(stringValue: string): number | null;
    static splitTime(value: any): number[];
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    render(): JSX.Element;
}
