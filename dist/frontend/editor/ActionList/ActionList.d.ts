/// <reference types="react" />
import { ReactComponent } from '../../common';
export declare class ActionList extends ReactComponent {
    constructor(props: any);
    onClick: (li: any) => Promise<void>;
    render(): JSX.Element;
}
