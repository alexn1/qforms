/// <reference types="react" />
import { TableFormFieldView } from '../TableFormFieldView';
import { TableFormTextBoxFieldController } from './TableFormTextBoxFieldController';
import './TableFormTextBoxFieldView.less';
export declare class TableFormTextBoxFieldView extends TableFormFieldView<TableFormTextBoxFieldController> {
    span: React.RefObject<any>;
    render(): JSX.Element;
}
