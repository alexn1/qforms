import React from 'react';
import { FieldView } from '../FieldView';
import { TableFormFieldController } from './TableFormFieldController';
export declare class TableFormFieldView<TTableFormFieldController extends TableFormFieldController = TableFormFieldController> extends FieldView<TTableFormFieldController> {
    span: React.RefObject<any>;
    constructor(props: any);
    getSpanOffsetWidth(): any;
}
