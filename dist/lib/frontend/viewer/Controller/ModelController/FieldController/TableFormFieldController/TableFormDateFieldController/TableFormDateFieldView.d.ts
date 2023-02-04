import React from 'react';
import { TableFormFieldView } from '../TableFormFieldView';
import { TableFormDateFieldController } from './TableFormDateFieldController';
export declare class TableFormDateFieldView<T extends TableFormDateFieldController> extends TableFormFieldView<T> {
    span: React.RefObject<any>;
    render(): JSX.Element;
}
