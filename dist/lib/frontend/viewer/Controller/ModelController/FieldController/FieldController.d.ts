import { ModelController } from '../ModelController';
export declare class FieldController extends ModelController {
    static create(model: any, parent: any): any;
    valueToString(value: any): string;
    stringToValue(stringValue: any): any;
    getViewStyle(row: any): any;
    openPage(options: any): Promise<any>;
    getForm(): any;
    getPage(): any;
    getApp(): any;
    isVisible(): boolean;
    isAutoFocus(): boolean;
    getAutocomplete(): any;
    getFormat(): any;
}
