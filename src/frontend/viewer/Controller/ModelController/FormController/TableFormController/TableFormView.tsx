import React from 'react';
import { FormView } from '../FormView';
import { DataSource } from '../../../../Model/DataSource/DataSource';
import {
    Button,
    DropdownButton,
    MoreVertIcon,
    TextBox,
    LeftIcon,
    RightIcon,
    Grid,
} from '../../../../../common';
import { TableFormController } from './TableFormController';
import { Helper } from '../../../../../common/Helper';
import { PageController } from '../../PageController/PageController';

import './TableFormView.less';

export class TableFormView<
    TTableFormController extends TableFormController = TableFormController,
> extends FormView<TTableFormController> {
    renderToolbar() {
        const ctrl = this.getCtrl();
        const model = ctrl.getModel();
        const dataSource = model.getDefaultDataSource();
        return (
            <div className={`${this.getCssBlockName()}__toolbar flex grid-gap-5`}>
                {model.getData().newRowMode !== 'disabled' && (
                    <Button
                        key="new"
                        classList={['toolbar-button', 'default']}
                        onClick={ctrl.onNewClick}
                        enabled={!(ctrl.getParent() as PageController).getModel().hasNew()}>
                        {/*<AddIcon/>*/}
                        <div>{model.getApp().getText().form.new}</div>
                    </Button>
                )}
                {model.getData().refreshButton === 'true' && dataSource.isPersistent() && (
                    <Button
                        key="refresh"
                        classList={['toolbar-button']}
                        onClick={ctrl.onRefreshClick}
                        enabled={!(ctrl.getParent() as PageController).getModel().hasNew()}>
                        {/*<RefreshIcon/>*/}
                        <div>{model.getApp().getText().form.refresh}</div>
                    </Button>
                )}
                {model.getData().deleteRowMode !== 'disabled' && (
                    <Button
                        key="delete"
                        classList={['toolbar-button']}
                        onClick={ctrl.onDeleteClick}
                        enabled={ctrl.isRowSelected()}>
                        {/*<DeleteIcon/>*/}
                        <div>{model.getApp().getText().form.delete}</div>
                    </Button>
                )}
                {ctrl.getModel().hasActions() && (
                    <DropdownButton
                        classList={['toolbar-dropdown-button']}
                        actions={this.getActionsForDropdownButton()}
                        onClick={this.onActionsClick}>
                        <MoreVertIcon />
                    </DropdownButton>
                )}
            </div>
        );
    }

    renderPaging() {
        const ctrl = this.getCtrl();
        const model = this.getCtrl().getModel();
        const dataSource = model.getDefaultDataSource();

        return (
            <div className="paging">
                <div className="paging__countBlock">
                    <span className="count">
                        {dataSource.getRowsLength()}{' '}
                        {dataSource.getLimit() &&
                            `of ${Helper.formatNumber(dataSource.getCount())}`}
                    </span>
                </div>
                {dataSource.getLimit() && (
                    <div className="paging__gotoBlock">
                        <Button enabled={ctrl.canPrev()} onClick={ctrl.onPreviousClick}>
                            <LeftIcon size={18} />
                        </Button>
                        <TextBox
                            value={ctrl.getModel().getDefaultDataSource().getFrame().toString()}
                            onChange={ctrl.onFrameChanged}
                        />
                        <div className="paging__framesCount">
                            {' '}
                            / {Helper.formatNumber(dataSource.getFramesCount())}{' '}
                        </div>
                        <Button enabled={ctrl.canNext()} onClick={ctrl.onNextClick}>
                            <RightIcon size={18} />
                        </Button>
                    </div>
                )}
            </div>
        );
    }

    renderGridCellView = (row, column, onCreate, onUnmount) => {
        // console.log('TableFormView.renderGridCellView');
        const ctrl = this.getCtrl().getField(column.name);
        if (!ctrl) throw new Error(`no field: ${column.name}`);
        // console.log(column.name, ctrl.constructor.name);
        return React.createElement(ctrl.getViewClass(), { row, column, onCreate, onUnmount, ctrl });
    };

    getGridColumns(): any[] {
        const ctrl = this.getCtrl();
        return Object.keys(ctrl.fields)
            .filter((name) => ctrl.getField(name).isVisible())
            .map((name) => {
                const field = ctrl.getField(name);
                return {
                    name: field.getModel().getName(),
                    title: field.getModel().getCaption(),
                    width: field.getModel().getWidth(),
                    align: field.getAlign(),
                };
            });
    }

    getRows() {
        const ctrl = this.getCtrl();
        return ctrl.getModel().getDefaultDataSource().getRows();
    }

    getGridExtraColumn() {
        return true;
    }

    getGridClass() {
        return Grid;
    }

    renderGrid() {
        const ctrl = this.getCtrl();
        return React.createElement(this.getGridClass(), {
            classList: ['flex-max'],
            onCreate: ctrl.onGridCreate,
            name: ctrl.getModel().getFullName(),
            columns: this.getGridColumns(),
            rows: this.getRows(),
            getRowKey: (row) => ctrl.getModel().getDefaultDataSource().getRowKey(row),
            onDoubleClick: ctrl.onGridCellDblClick,
            onDeleteKeyDown: ctrl.onGridDeleteKeyDown,
            onSelectionChange: ctrl.onGridSelectionChange,
            onLinkClick: ctrl.onGridLinkClick,
            renderGridCellView: this.renderGridCellView,
            updated: ctrl.getUpdated(),
            extraColumn: this.getGridExtraColumn(),
            selectedKey: ctrl.getPage().getModel().getOptions().selectedKey,
            createLinkCallback: this.createLinkCallback,
        });
    }

    render() {
        console.log('TableFormView.render', this.getCtrl().getModel().getFullName());
        const ctrl = this.getCtrl();
        return (
            <div
                className={`${this.getCssClassNames()} full flex-column grid-gap-5`}
                style={this.getStyle()}>
                {this.renderToolbar()}
                {this.renderGrid()}
                {ctrl.getModel().hasDefaultPersistentDataSource() && this.renderPaging()}
            </div>
        );
    }

    createLinkCallback = (key) => {
        return this.getCtrl()
            .getApp()
            .getHostApp()
            .createLink({
                page: this.getCtrl().getModel().getAttr('itemEditPage'),
                ...DataSource.keyToParams(key),
            });
    };
}
