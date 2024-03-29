/// <reference types="react" />
import { ReactComponent } from '../../../common';
export declare class NewActionView extends ReactComponent {
    name: any;
    caption: any;
    constructor(props: any);
    onCreate: (e?: any) => Promise<void>;
    onKeyDown: (e: any) => void;
    render(): JSX.Element;
}
