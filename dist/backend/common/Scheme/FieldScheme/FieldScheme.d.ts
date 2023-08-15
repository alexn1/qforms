export interface FieldAttributes {
    name: string;
    caption: string;
    column: string;
    defaultValue: string;
    value: string;
    param: 'true' | 'false';
    visible: 'true' | 'false';
    type: string;
    width: string;
    cssBlock: string;
    viewClass: string;
    ctrlClass: string;
    autoFocus: 'true' | 'false';
}
export type FieldScheme = {
    '@class': 'Field' | 'CheckBoxField';
    '@attributes': FieldAttributes;
};
