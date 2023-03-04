/// <reference types="react" />
import { ModelView } from '../ModelView';
import './ApplicationView.less';
import { ApplicationController } from './ApplicationController';
export declare class ApplicationView extends ModelView<ApplicationController> {
    renderActivePage(): any;
    renderView(ctrl: any, props?: {}): any;
    renderModals(): any;
    renderHeader(): JSX.Element;
    renderMain(): JSX.Element;
    renderFooter(): JSX.Element;
    render(): JSX.Element;
}
