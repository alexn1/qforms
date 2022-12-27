/// <reference types="react" />
import { RowFormFieldView } from '../RowFormFieldView';
import './RowFormCheckBoxFieldView.less';
export declare class RowFormCheckBoxFieldView extends RowFormFieldView {
    onCheckBoxChange: (checked: any, e: any) => void;
    render(): JSX.Element;
}
