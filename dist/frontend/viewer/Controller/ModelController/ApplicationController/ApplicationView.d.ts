import React from 'react';
import { ModelView } from '../ModelView';
import { PageController } from '../PageController/PageController';
import { ModalController } from '../../ModalController/ModalController';
import { ApplicationController } from './ApplicationController';
import './ApplicationView.less';
export declare class ApplicationView<TApplicationController extends ApplicationController = ApplicationController> extends ModelView<TApplicationController> {
    render(): React.ReactElement;
    renderHeader(): React.ReactElement;
    renderMain(): React.ReactElement;
    renderActivePage(): React.ReactElement | null;
    renderView(ctrl: PageController | ModalController, props?: Record<string, unknown>): React.ReactElement;
    renderFooter(): React.ReactElement;
    renderModals(): React.ReactElement[];
}
