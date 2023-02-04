import React from 'react';
import { FieldView } from '../FieldView';
import { TableFormFieldController } from './TableFormFieldController';
export declare class TableFormFieldView<T extends TableFormFieldController> extends FieldView<T> {
    span: React.RefObject<any>;
    constructor(props: any);
    getSpanOffsetWidth(): any;
}
