export interface PageLinkAttributes {
    name: string;
    fileName: string;
    menu: string;
    startup: 'true' | 'false';
}
export type PageLinkScheme = {
    '@class': 'PageLink';
    '@attributes': PageLinkAttributes;
};
