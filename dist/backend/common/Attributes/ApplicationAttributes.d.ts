export interface ApplicationAttributes {
    formatVersion: string;
    name: string;
    caption: string;
    authentication: 'true' | 'false';
    user: string;
    password: string;
    lang: 'en' | 'ru';
    theme: 'standard';
    cssBlock: string;
    viewClass: string;
    ctrlClass: string;
    modelClass: string;
}
