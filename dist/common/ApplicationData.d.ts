import { DatabaseData } from './DatabaseData';
import { ModelData } from './ModelData';
import { PageData } from './PageData';
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
        [name: string]: any;
        id: number;
        login: string;
    };
    text: any;
    menu: any;
    nav: any;
    params: {
        [name: string]: any;
    };
    databases: DatabaseData[];
    pages: PageData[];
}
