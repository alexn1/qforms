/// <reference types="react" />
import { ReactComponent } from '../ReactComponent';
export declare class Radio extends ReactComponent {
    constructor(props: any);
    getInitialValue(): null;
    getValue(): any;
    onChange: (e: any) => Promise<void>;
    renderItem(item: any, i: any): JSX.Element[];
    isReadOnly(): any;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    render(): JSX.Element;
}
