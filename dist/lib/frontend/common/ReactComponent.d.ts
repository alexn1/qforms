import { Component, RefObject } from 'react';
export declare class ReactComponent extends Component<any, any> {
    allowRerender: boolean;
    el: RefObject<any>;
    constructor(props: any);
    getElement(): any;
    getParent(): any;
    checkParent(): void;
    getClassList(): string[];
    addCssClass(className: any): void;
    removeCssClass(className: any): void;
    getCssBlockName(): string;
    getCssClassNames(): string;
    rerender(logTime?: boolean): Promise<void>;
    canRerender(): any;
    disableRerender(): void;
    enableRerender(): void;
    componentWillUnmount(): void;
    isEnabled(): boolean;
    isDisabled(): any;
    disable(): void;
    enable(): void;
}
