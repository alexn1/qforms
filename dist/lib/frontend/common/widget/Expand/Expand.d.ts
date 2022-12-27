/// <reference types="react" />
import { ReactComponent } from '../../ReactComponent';
import './Expand.less';
export declare class Expand extends ReactComponent {
    constructor(props: any);
    isOpened(): any;
    isHighlighted(): boolean;
    onTitleClick: (e: any) => void;
    render(): JSX.Element;
}
