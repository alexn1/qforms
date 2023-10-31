/// <reference types="react" />
import { ModelView } from '../ModelView';
import { ApplicationController } from './ApplicationController';
import './ApplicationView.less';
export declare class ApplicationView<TApplicationController extends ApplicationController = ApplicationController> extends ModelView<TApplicationController> {
    render(): JSX.Element;
    renderHeader(): JSX.Element;
    renderMain(): JSX.Element;
    renderActivePage(): any;
    renderView(ctrl: any, props?: {}): any;
    renderFooter(): JSX.Element;
    renderModals(): any[];
}
