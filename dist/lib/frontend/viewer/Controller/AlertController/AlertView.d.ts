/// <reference types="react" />
import { View } from '../View';
import { AlertController } from './AlertController';
import './AlertView.less';
export declare class AlertView<TController extends AlertController = AlertController> extends View<TController> {
    constructor(props: any);
    getHeaderStyle(): any;
    render(): JSX.Element;
    componentDidMount(): void;
}
