/// <reference types="react" />
import { ReactComponent } from '../../ReactComponent';
import './Tab2.less';
export declare class Tab2 extends ReactComponent {
    constructor(props: any);
    getActive(): any;
    onLiMouseDown: (e: any) => void;
    onLiClick: (e: any) => void;
    selectTab(i: any): void;
    renderTitles(): any;
    renderContents(): any;
    render(): JSX.Element;
}
