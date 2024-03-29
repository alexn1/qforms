import React from 'react';
import { ModelView } from '../ModelView';
import { PageController } from '../PageController/PageController';
import { Modal, Menu, Statusbar } from '../../../../common';
import { ApplicationController } from './ApplicationController';
import { debug } from '../../../../../console';

import './ApplicationView.less';

export class ApplicationView<
    TApplicationController extends ApplicationController = ApplicationController,
> extends ModelView<TApplicationController> {
    render() {
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

    renderHeader() {
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

    renderMain() {
        return <main className={`${this.getCssBlockName()}__main`}>{this.renderActivePage()}</main>;
    }

    renderActivePage(): any {
        const { ctrl } = this.props;
        if (ctrl.activePage) {
            return this.renderView(ctrl.activePage);
        }
        return null;
    }

    renderView(ctrl, props = {}): any {
        return React.createElement(ctrl.getViewClass(), {
            parent: this,
            ctrl: ctrl,
            onCreate: ctrl.onViewCreate,
            ...props,
        });
    }

    renderFooter() {
        return (
            <footer className={`${this.getCssBlockName()}__footer`}>
                <Statusbar onCreate={this.getCtrl().onStatusbarCreate} />
            </footer>
        );
    }

    renderModals() {
        return this.getCtrl().modals.map((ctrl) => {
            if (ctrl instanceof PageController) {
                return <Modal key={ctrl.getId()}>{this.renderView(ctrl)}</Modal>;
            }
            return this.renderView(ctrl, { key: ctrl.getId() });
        });
    }
}
