/// <reference types="react" />
import { RowFormFieldView } from '../RowFormFieldView';
import { RowFormTimeFieldController } from './RowFormTimeFieldController';
import './RowFormTimeFieldView.less';
export declare class RowFormTimeFieldView extends RowFormFieldView<RowFormTimeFieldController> {
    onCloseClick: (e: any) => Promise<void>;
    isCloseVisible(): boolean;
    render(): JSX.Element;
}
