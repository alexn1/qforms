import React from 'react';
import { TableFormFieldView } from '../TableFormFieldView';
import { TableFormCheckBoxFieldController } from './TableFormCheckBoxFieldController';
import './TableFormCheckBoxFieldView.less';
export declare class TableFormCheckBoxFieldView extends TableFormFieldView<TableFormCheckBoxFieldController> {
    span: React.RefObject<any>;
    render(): JSX.Element;
}
