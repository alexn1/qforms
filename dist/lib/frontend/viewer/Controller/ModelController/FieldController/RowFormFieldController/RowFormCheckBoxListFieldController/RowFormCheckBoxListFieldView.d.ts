/// <reference types="react" />
import { RowFormFieldView } from '../RowFormFieldView';
import { RowFormCheckBoxListFieldController } from './RowFormCheckBoxListFieldController';
import './RowFormCheckBoxListFieldView.less';
export declare class RowFormCheckBoxListFieldView<T extends RowFormCheckBoxListFieldController> extends RowFormFieldView<T> {
    getItems(): any;
    renderCheckBoxList(): JSX.Element;
    render(): JSX.Element;
}
