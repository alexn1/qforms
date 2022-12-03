/// <reference types="react" />
import { ReactComponent } from '../../ReactComponent';
export declare class Tab extends ReactComponent {
    constructor(props: any);
    getActive(): any;
    onLiMouseDown: (e: any) => void;
    onLiClick: (e: any) => void;
    selectTab(i: any): void;
    renderTitles(): any;
    renderContents(): any;
    render(): JSX.Element;
}
