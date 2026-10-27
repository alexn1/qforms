import React from 'react';
import { ModelView } from '../ModelView';
import { PageController } from '../PageController/PageController';
import { Modal, Menu, Statusbar } from '../../../../common';
import { ModalController } from '../../ModalController/ModalController';
import { ApplicationController } from './ApplicationController';
import { debug } from '../../../../../console';

import './ApplicationView.less';

export class ApplicationView<
    TApplicationController extends ApplicationController = ApplicationController,
> extends ModelView<TApplicationController> {
    render(): React.ReactElement {
        debug(`${this.constructor.name}.render`, this.getCtrl().getModel().getFullName());
        return (
            <div className={`${this.getCssBlockName()}__container`} style={this.getStyle()}>
                {this.renderHeader()}
                {this.renderMain()}
                {this.renderFooter()}
                {this.renderModals()}
            </div>
        );
    }

    renderHeader(): React.ReactElement {
        return (
            <header className={`${this.getCssBlockName()}__header`}>
                <Menu
                    items={this.getCtrl().getMenuItemsProp()}
                    onClick={this.getCtrl().onMenuItemClick}
                    hostApp={this.getCtrl().getHostApp()}
                />
            </header>
        );
    }

    renderMain(): React.ReactElement {
        return <main className={`${this.getCssBlockName()}__main`}>{this.renderActivePage()}</main>;
    }

    renderActivePage(): React.ReactElement | null {
        const { activePage } = this.getCtrl();
        if (activePage) {
            return this.renderView(activePage, { key: activePage.getId() });
        }
        return null;
    }

    renderView(
        ctrl: PageController | ModalController,
        props: Record<string, unknown> = {},
    ): React.ReactElement {
        return React.createElement(ctrl.getViewClass(), {
            parent: this,
            ctrl: ctrl,
            onCreate: ctrl.onViewCreate,
            ...props,
        });
    }

    renderFooter(): React.ReactElement {
        return (
            <footer className={`${this.getCssBlockName()}__footer`}>
                <Statusbar onCreate={this.getCtrl().onStatusbarCreate} />
            </footer>
        );
    }

    renderModals(): React.ReactElement[] {
        return this.getCtrl().modals.map((ctrl) => {
            if (ctrl instanceof PageController) {
                return <Modal key={ctrl.getId()}>{this.renderView(ctrl)}</Modal>;
            }
            return this.renderView(ctrl, { key: ctrl.getId() });
        });
    }
}
