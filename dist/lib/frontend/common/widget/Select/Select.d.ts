import React from 'react';
import { ReactComponent } from '../../ReactComponent';
import './Select.less';
export declare class Select extends ReactComponent {
    dropdown: React.RefObject<any>;
    constructor(props: any);
    isVisible(): any;
    getInitialValue(): any;
    getValue(): any;
    isNullable(): any;
    getVisibility(): "visible" | "hidden";
    getDisplay(): "none" | "block";
    onKeyDown: (e: any) => Promise<void>;
    onInputMouseDown: (e: any) => Promise<void>;
    onInputBlur: (e: any) => Promise<void>;
    onDropdownMouseDown: (e: any) => Promise<void>;
    onDropdownClick: (e: any) => Promise<void>;
    onCloseClick: (e: any) => Promise<void>;
    getItems(): any;
    getValueTitle(value: any): any;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    isCloseVisible(): boolean;
    renderInput(): JSX.Element;
    renderClose(): JSX.Element;
    renderIcon(): JSX.Element;
    renderDropdown(): JSX.Element;
    render(): JSX.Element;
}
