import { ModelData } from './ModelData';

export interface ApplicationData extends ModelData {
    caption: string;

    lang: string;
    theme: string;
    cssBlock: string;
    viewClass: string;
    ctrlClass: string;
    route: string;
    domain: string;
    virtualPath: string;
    logErrorUrl: string;
    versions: {
        platform: string;
        app: string | null;
    };
    nodeEnv: string | null;
    time: number;
    uuid: string;
    user: {
        [name: string]: any; // user fields allowed
        id: number;
        login: string;
    };

    // any
    text: any;
    menu: any;
    nav: any;

    params: {
        [name: string]: any;
    };

    databases: any[];
    pages: any[];
}
