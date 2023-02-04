import { TableFormFieldView } from '../TableFormFieldView';
import React from 'react';
import { TableFormDateTimeFieldController } from './TableFormDateTimeFieldController';
export declare class TableFormDateTimeFieldView<T extends TableFormDateTimeFieldController> extends TableFormFieldView<T> {
    span: React.RefObject<any>;
    render(): JSX.Element;
}
