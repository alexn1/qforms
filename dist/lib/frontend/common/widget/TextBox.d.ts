/// <reference types="react" />
import { ReactComponent } from '../ReactComponent';
export declare class TextBox extends ReactComponent {
    constructor(props: any);
    getValue(): any;
    _setValue(value: any): void;
    onChange: (e: any) => void;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    render(): JSX.Element;
}
