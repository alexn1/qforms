/// <reference types="react" />
import { ReactComponent } from '../../../common';
export declare class NewFormView extends ReactComponent {
    name: any;
    caption: any;
    class: any;
    constructor(props: any);
    onCreate: (e?: any) => Promise<void>;
    onKeyDown: (e: any) => void;
    render(): JSX.Element;
}
