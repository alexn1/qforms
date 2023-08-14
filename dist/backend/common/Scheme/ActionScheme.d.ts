export interface ActionAttributes {
    name: string;
    caption: string;
}
export type ActionScheme = {
    '@class': 'Action';
    '@attributes': ActionAttributes;
};
