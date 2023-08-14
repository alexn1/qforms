import { JSONString } from '../../../types';
export interface ParamAttributes {
    name: string;
    value: JSONString;
}
export type ParamScheme = {
    '@class': 'Param';
    '@attributes': ParamAttributes;
};
