/// <reference types="react" />
import { ReactComponent } from '../../../common';
export declare class NewDatabaseView extends ReactComponent {
    class: any;
    name: any;
    host: any;
    database: any;
    user: any;
    password: any;
    constructor(props: any);
    onCreate: (e: any) => Promise<void>;
    render(): JSX.Element;
}
