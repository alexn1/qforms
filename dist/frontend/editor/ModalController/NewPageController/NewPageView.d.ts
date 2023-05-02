/// <reference types="react" />
import { ReactComponent } from '../../../common';
export declare class NewPageView extends ReactComponent {
    name: any;
    caption: any;
    startup: any;
    constructor(props: any);
    onCreate: (e?: any) => Promise<void>;
    onKeyDown: (e: any) => void;
    render(): JSX.Element;
}
