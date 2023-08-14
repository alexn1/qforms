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
        [name: string]: any;
        id: number;
        login: string;
    };
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
