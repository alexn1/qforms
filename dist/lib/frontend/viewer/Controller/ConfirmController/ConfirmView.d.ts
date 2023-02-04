/// <reference types="react" />
import { View } from '../View';
import './ConfirmView.less';
import { ConfirmController } from './ConfirmController';
export declare class ConfirmView<T extends ConfirmController> extends View<T> {
    constructor(props: any);
    render(): JSX.Element;
    componentDidMount(): void;
}
