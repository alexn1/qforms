/// <reference types="react" />
import { RowFormFieldView } from '../RowFormFieldView';
import { RowFormLinkFieldController } from './RowFormLinkFieldController';
import './RowFormLinkFieldView.less';
export declare class RowFormLinkFieldView<T extends RowFormLinkFieldController> extends RowFormFieldView<T> {
    render(): JSX.Element;
}
