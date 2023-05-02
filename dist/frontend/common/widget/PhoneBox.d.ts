/// <reference types="react" />
import { ReactComponent } from '../ReactComponent';
export declare class PhoneBox extends ReactComponent {
    constructor(props: any);
    getValue(): any;
    onKeyPress: (e: any) => void;
    onChange: (e: any) => void;
    onBlur: (e: any) => void;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    render(): JSX.Element;
    static clearValue(value: any): any;
    static ifNoCodeAddRussianCode(value: any): any;
    static formatPhoneNumber(_value: any): any;
}
