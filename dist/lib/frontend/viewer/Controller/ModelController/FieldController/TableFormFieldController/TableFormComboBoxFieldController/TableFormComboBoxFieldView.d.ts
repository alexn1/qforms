import React from 'react';
import { TableFormFieldView } from '../TableFormFieldView';
import { TableFormComboBoxFieldController } from './TableFormComboBoxFieldController';
export declare class TableFormComboBoxFieldView<T extends TableFormComboBoxFieldController> extends TableFormFieldView<T> {
    span: React.RefObject<any>;
    render(): JSX.Element;
}
