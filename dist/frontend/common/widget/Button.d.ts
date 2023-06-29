/// <reference types="react" />
import { ReactComponent } from '../ReactComponent';
export declare class Button extends ReactComponent {
    constructor(props: any);
    isVisible(): any;
    getStyle(): {
        display: string | undefined;
        width: any;
    };
    render(): JSX.Element;
}
