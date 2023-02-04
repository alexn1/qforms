/// <reference types="react" />
import { TableFormFieldView } from '../TableFormFieldView';
import { TableFormTextBoxFieldController } from './TableFormTextBoxFieldController';
export declare class TableFormTextBoxFieldView<T extends TableFormTextBoxFieldController> extends TableFormFieldView<T> {
    span: React.RefObject<any>;
    render(): JSX.Element;
}
