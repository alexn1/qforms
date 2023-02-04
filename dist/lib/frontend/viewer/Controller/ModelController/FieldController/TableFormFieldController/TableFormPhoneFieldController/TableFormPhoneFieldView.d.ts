/// <reference types="react" />
import { TableFormFieldView } from '../TableFormFieldView';
import { TableFormPhoneFieldController } from './TableFormPhoneFieldController';
export declare class TableFormPhoneFieldView<T extends TableFormPhoneFieldController> extends TableFormFieldView<T> {
    span: React.RefObject<any>;
    render(): JSX.Element;
}
