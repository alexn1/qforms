export interface ApplicationData {
    class: string;
    name: string;
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
        app: string;
    };
    nodeEnv: string;
    time: number;
    uuid: string;
    user: {
        id: number;
        login: string;
    };
    text: any;
    menu: any;
    nav: any;
    actions: any[];
    pages: any[];
}
