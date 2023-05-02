/// <reference types="react" />
import { ModelView } from '../ModelView';
import { ApplicationController } from './ApplicationController';
import './ApplicationView.less';
export declare class ApplicationView<TApplicationController extends ApplicationController = ApplicationController> extends ModelView<TApplicationController> {
    renderActivePage(): any;
    renderView(ctrl: any, props?: {}): any;
    renderModals(): any[];
    renderHeader(): JSX.Element;
    renderMain(): JSX.Element;
    renderFooter(): JSX.Element;
    render(): JSX.Element;
}
