import React from 'react';
import { FieldView } from '../FieldView';
import { TableFormFieldController } from './TableFormFieldController';
import { Field } from '../../../../Model/Field/Field';
export declare class TableFormFieldView<T extends TableFormFieldController<Field>> extends FieldView<T> {
    span: React.RefObject<any>;
    constructor(props: any);
    getSpanOffsetWidth(): any;
}
