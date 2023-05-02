import * as React from 'react';
import { ReactComponent } from '../../common';
export declare class TreeItem extends ReactComponent {
    li: React.RefObject<any>;
    parent: any;
    constructor(props: any);
    onDivMouseDown: (e: any) => void;
    onDivDoubleClick: (e: any) => void;
    onNodeMouseDown: (e: any) => void;
    isSelected(): boolean;
    isOpened(): any;
    getElement(): any;
    open(): void;
    render(): JSX.Element;
}
