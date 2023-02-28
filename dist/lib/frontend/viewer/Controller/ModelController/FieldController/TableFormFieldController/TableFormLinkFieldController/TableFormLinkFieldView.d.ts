/// <reference types="react" />
import { TableFormFieldView } from '../TableFormFieldView';
import { TableFormLinkFieldController } from './TableFormLinkFieldController';
import './TableFormLinkFieldView.less';
export declare class TableFormLinkFieldView<T extends TableFormLinkFieldController> extends TableFormFieldView<T> {
    render(): JSX.Element;
}
