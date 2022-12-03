import * as React from 'react';
import { ReactComponent } from '../../ReactComponent';
export declare class Password extends ReactComponent {
    inputEl: React.RefObject<any>;
    constructor(props: any);
    getInputElement(): any;
    getValue(): any;
    _setValue(value: any): void;
    onChange: (e: any) => void;
    onCloseClick: (e: any) => void;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    isCloseVisible(): boolean;
    onIconClick: (e: any) => void;
    render(): JSX.Element;
}
