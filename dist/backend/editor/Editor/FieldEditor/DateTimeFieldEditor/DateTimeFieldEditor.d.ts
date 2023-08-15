import { FieldEditor } from '../FieldEditor';
export declare class DateTimeFieldEditor extends FieldEditor {
    static createData(params: any): {
        '@class': string;
        '@attributes': {
            readOnly: any;
            notNull: any;
            format: any;
            timezone: any;
            placeholder: any;
            validateOnChange: any;
            validateOnBlur: any;
            name: string;
            caption: string;
            column: string;
            defaultValue: string;
            value: string;
            param: "true" | "false";
            visible: "true" | "false";
            type: string;
            width: string;
            cssBlock: string;
            viewClass: string;
            ctrlClass: string;
            autoFocus: "true" | "false";
        };
    };
}
