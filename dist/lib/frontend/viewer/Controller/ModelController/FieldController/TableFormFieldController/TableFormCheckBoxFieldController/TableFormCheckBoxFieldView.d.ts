import React from 'react';
import { TableFormFieldView } from '../TableFormFieldView';
import { TableFormCheckBoxFieldController } from './TableFormCheckBoxFieldController';
import './TableFormCheckBoxFieldView.less';
export declare class TableFormCheckBoxFieldView<T extends TableFormCheckBoxFieldController> extends TableFormFieldView<T> {
    span: React.RefObject<any>;
    render(): JSX.Element;
}
