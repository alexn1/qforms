/// <reference types="react" />
import { ReactComponent } from '../ReactComponent';
export declare class TextArea extends ReactComponent {
    constructor(props: any);
    getValue(): any;
    onChange: (e: any) => void;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    render(): JSX.Element;
}
