/// <reference types="react" />
import { RowFormFieldView } from '../RowFormFieldView';
import { RowFormImageFieldController } from './RowFormImageFieldController';
import './RowFormImageFieldView.less';
export declare class RowFormImageFieldView extends RowFormFieldView<RowFormImageFieldController> {
    onImageClick: (e: any) => Promise<void>;
    render(): JSX.Element;
}
