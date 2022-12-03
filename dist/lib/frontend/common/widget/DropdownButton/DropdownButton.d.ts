/// <reference types="react" />
import { ReactComponent } from '../../ReactComponent';
export declare class DropdownButton extends ReactComponent {
    constructor(props: any);
    onButtonClick: (e: any) => void;
    onButtonBlur: (e: any) => void;
    onKeyDown: (e: any) => void;
    onUlMouseDown: (e: any) => void;
    onLiClick: (e: any) => Promise<void>;
    isEnabled(): any;
    render(): JSX.Element;
}
