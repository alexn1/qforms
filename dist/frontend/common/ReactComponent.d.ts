import { Component, RefObject } from 'react';
import { Controller } from '../viewer/Controller/Controller';
export interface ReactComponentProps {
    ctrl?: Controller;
    name?: string;
    parent?: any;
    classList?: string[];
    enabled?: boolean;
    disabled?: boolean;
    onCreate?: any;
    onUnmount?: any;
}
export interface ReactComponentState {
    classList: string[];
    enabled: boolean;
    disabled: boolean;
}
export declare class ReactComponent<P extends ReactComponentProps = any, S extends ReactComponentState = any> extends Component<P, S> {
    allowRerender: boolean;
    el: RefObject<any>;
    constructor(props: P);
    getElement(): any;
    getParent(): P["parent"] | undefined;
    checkParent(): void;
    getClassList(): string[];
    addCssClass(className: string): void;
    removeCssClass(className: string): void;
    getCssBlockName(): string;
    getCssClassNames(): string;
    rerender(logTime?: boolean): Promise<void>;
    canRerender(): any;
    disableRerender(): void;
    enableRerender(): void;
    componentWillUnmount(): void;
    isEnabled(): boolean;
    isDisabled(): boolean | S["disabled"] | (P["disabled"] & {});
    disable(): void;
    enable(): void;
}
