/// <reference types="react" />
import { View } from '../../View';
import './ImageDialogView.less';
import { ImageDialogController } from './ImageDialogController';
export declare class ImageDialogView<T extends ImageDialogController> extends View<T> {
    constructor(props: any);
    render(): JSX.Element;
    componentDidMount(): void;
}
