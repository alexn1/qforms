import { ClientUser } from '../../types';
import { Nullable } from '../../types';
import { DatabaseData } from './DatabaseData';
import { ModelData } from './ModelData';
import { PageData } from './PageData';

export interface MenuItem {
    type: string;
    caption: string;
    page?: string;
    action?: string;
}

export interface NavItem {
    page: string;
    caption: string;
}

export interface ApplicationData extends ModelData {
    class: string;
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
    uuid: string; // clientId
    user: Nullable<ClientUser>;

    // any
    text: any;
    menu: Record<string, MenuItem[]>;
    nav: Record<string, NavItem[]>;

    params?: {
        [name: string]: any;
    };

    databases: DatabaseData[];
    pages: PageData[];
}
