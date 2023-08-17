import { ModelAttributes, ModelScheme } from './ModelScheme';
export interface ActionAttributes extends ModelAttributes {
    name: string;
    caption: string;
}
export interface ActionScheme extends ModelScheme {
    '@class': 'Action';
    '@attributes': ActionAttributes;
}
