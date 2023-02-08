/// <reference types="react" />
import { RowFormFieldView } from '../RowFormFieldView';
import { RowFormCheckBoxFieldController } from './RowFormCheckBoxFieldController';
import './RowFormCheckBoxFieldView.less';
export declare class RowFormCheckBoxFieldView extends RowFormFieldView<RowFormCheckBoxFieldController> {
    onCheckBoxChange: (checked: any, e: any) => void;
    render(): JSX.Element;
}
