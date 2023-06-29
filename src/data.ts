export interface ModelData {
    class: string;
    name: string;
    caption: string;

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
    nodeEnv: string;
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
