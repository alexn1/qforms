/// <reference types="react" />
import { ReactComponent } from '../ReactComponent';
export declare class CheckBoxList extends ReactComponent {
    constructor(props: any);
    getItems(): any;
    getValue(): any;
    onCheckBoxChange: (e: any) => void;
    isValueChecked(value: any): boolean;
    composeItemId(value: any): string;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    render(): JSX.Element;
}
