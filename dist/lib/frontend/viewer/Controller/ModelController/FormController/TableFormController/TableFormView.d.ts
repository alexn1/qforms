import React from 'react';
import { FormView } from '../FormView';
import { Grid } from '../../../../../common';
import { TableFormController } from './TableFormController';
import './TableFormView.less';
export declare class TableFormView<T extends TableFormController> extends FormView<T> {
    renderToolbar(): JSX.Element;
    renderPaging(): JSX.Element;
    renderGridCellView: (row: any, column: any, onCreate: any, onUnmount: any) => React.CElement<{
        row: any;
        column: any;
        onCreate: any;
        onUnmount: any;
        ctrl: any;
    }, React.Component<{
        row: any;
        column: any;
        onCreate: any;
        onUnmount: any;
        ctrl: any;
    }, any, any>>;
    getGridColumns(): any[];
    getRows(): any;
    getGridExtraColumn(): boolean;
    getGridClass(): typeof Grid;
    renderGrid(): React.CElement<any, Grid>;
    render(): JSX.Element;
    createLinkCallback: (key: any) => string;
}
