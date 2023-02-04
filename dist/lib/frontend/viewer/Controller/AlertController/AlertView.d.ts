/// <reference types="react" />
import { View } from '../View';
import './AlertView.less';
import { AlertController } from './AlertController';
export declare class AlertView<T extends AlertController> extends View<T> {
    constructor(props: any);
    getHeaderStyle(): any;
    render(): JSX.Element;
    componentDidMount(): void;
}
