/// <reference types="react" />
import { ReactComponent } from '../ReactComponent';
export declare class ComboBox extends ReactComponent {
    constructor(props: any);
    getInitialValue(): any;
    getValue(): any;
    onChange: (e: any) => Promise<void>;
    onMouseDown: (e: any) => Promise<void>;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    render(): JSX.Element;
}
