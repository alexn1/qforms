import React from 'react';
import { TableFormFieldView } from '../TableFormFieldView';
import { TableFormDateFieldController } from './TableFormDateFieldController';
import './TableFormDateFieldView.less';
export declare class TableFormDateFieldView extends TableFormFieldView<TableFormDateFieldController> {
    span: React.RefObject<any>;
    render(): JSX.Element;
}
