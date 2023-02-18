/// <reference types="react" />
import { RowFormFieldView } from '../RowFormFieldView';
import { RowFormCheckBoxListFieldController } from './RowFormCheckBoxListFieldController';
import './RowFormCheckBoxListFieldView.less';
export declare class RowFormCheckBoxListFieldView extends RowFormFieldView<RowFormCheckBoxListFieldController> {
    getItems(): {
        value: string;
        title: any;
    }[];
    renderCheckBoxList(): JSX.Element;
    render(): JSX.Element;
}
