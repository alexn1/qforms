/// <reference types="react" />
import { ReactComponent } from '../../ReactComponent';
import './CheckBox.less';
export declare class CheckBox extends ReactComponent {
    constructor(props: any);
    getValue(): any;
    onChange: (e: any) => void;
    onClick: (e: any) => void;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    render(): JSX.Element;
}
