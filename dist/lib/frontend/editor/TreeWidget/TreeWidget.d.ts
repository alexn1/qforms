/// <reference types="react" />
import { ReactComponent } from '../../common';
import './TreeWidget.less';
export declare class TreeWidget extends ReactComponent {
    constructor(props: any);
    select(item: any): Promise<void>;
    onDoubleClick(item: any): void;
    onOpen(item: any): void;
    isSelected(item: any): boolean;
    getSelectedItem(): any;
    scrollToSelected(): void;
    render(): JSX.Element;
}
