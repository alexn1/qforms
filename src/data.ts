export interface BkModelData {
    '@class': string;
    '@attributes': {};
}

export interface BkApplicationData extends BkModelData {
    '@attributes': {
        formatVersion: string;
        name: string;
        caption: string;
        authentication: string;
        user: string;
        password: string;
        lang: string;
        theme: string;
        cssBlock: string;
        viewClass: string;
        ctrlClass: string;
        modelClass: string;
    };
    env: Record<string, any>;
    databases: any[];
    dataSources: any[];
    actions: any[];
    pageLinks: any[];
}

export interface BkPageData extends BkModelData {
    '@attributes': {
        formatVersion: string;
        name: string;
        caption: string;
        cssBlock: string;
        viewClass: string;
        ctrlClass: string;
        modelClass: string;
        formInTab: string;
    };
    dataSources: any[];
    actions: any[];
    forms: any[];
}

export interface ModelData {
    class: string;
    name: string;
    caption: string;
    ctrlClass: string;

    dataSources: any[];
    actions: any[];
}

export interface ApplicationData extends ModelData {
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

    databases: any[];
    pages: any[];
    params: {
        [name: string]: any;
    };
}

export interface PageData extends ModelData {
    forms: any[];
}
