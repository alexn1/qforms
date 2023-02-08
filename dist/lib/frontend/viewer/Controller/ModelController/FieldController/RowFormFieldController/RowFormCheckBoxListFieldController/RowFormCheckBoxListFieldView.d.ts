/// <reference types="react" />
import { RowFormFieldView } from '../RowFormFieldView';
import { RowFormCheckBoxListFieldController } from './RowFormCheckBoxListFieldController';
import './RowFormCheckBoxListFieldView.less';
export declare class RowFormCheckBoxListFieldView extends RowFormFieldView<RowFormCheckBoxListFieldController> {
    getItems(): any;
    renderCheckBoxList(): JSX.Element;
    render(): JSX.Element;
}
