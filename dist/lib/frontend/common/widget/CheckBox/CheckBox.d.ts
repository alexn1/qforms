/// <reference types="react" />
import { ReactComponent } from '../../ReactComponent';
export declare class CheckBox extends ReactComponent {
    constructor(props: any);
    getValue(): any;
    onChange: (e: any) => void;
    onClick: (e: any) => void;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    render(): JSX.Element;
}
