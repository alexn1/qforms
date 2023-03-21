import React from 'react';
import { FormView } from '../FormView';
import { Grid } from '../../../../../common';
import { TableFormController } from './TableFormController';
import './TableFormView.less';
export declare class TableFormView<TTableFormController extends TableFormController = TableFormController> extends FormView<TTableFormController> {
    renderToolbar(): JSX.Element;
    renderPaging(): JSX.Element;
    renderGridCellView: (row: any, column: any, onCreate: any, onUnmount: any) => React.CElement<{
        row: any;
        column: any;
        onCreate: any;
        onUnmount: any;
        ctrl: import("../../FieldController/TableFormFieldController/TableFormFieldController").TableFormFieldController<import("../../../../Model/Field/Field").Field>;
    }, React.Component<{
        row: any;
        column: any;
        onCreate: any;
        onUnmount: any;
        ctrl: import("../../FieldController/TableFormFieldController/TableFormFieldController").TableFormFieldController<import("../../../../Model/Field/Field").Field>;
    }, any, any>>;
    getGridColumns(): any[];
    getRows(): import("../../../..").RawRow[];
    getGridExtraColumn(): boolean;
    getGridClass(): typeof Grid;
    renderGrid(): React.CElement<any, Grid>;
    render(): JSX.Element;
    createLinkCallback: (key: any) => string;
}
