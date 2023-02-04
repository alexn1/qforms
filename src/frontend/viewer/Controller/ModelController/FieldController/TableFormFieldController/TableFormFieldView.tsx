import React from 'react';
import { FieldView } from '../FieldView';
import { TableFormFieldController } from './TableFormFieldController';

export class TableFormFieldView<T extends TableFormFieldController> extends FieldView<T> {
    span: React.RefObject<any>;
    constructor(props) {
        super(props);
        this.span = React.createRef();
    }
    getSpanOffsetWidth() {
        // console.log('TableFormFieldView.getSpanOffsetWidth', this.span.current);
        if (!this.span.current) return 0;
        return this.span.current.offsetWidth;
    }
}

// @ts-ignore
window.TableFormFieldView = TableFormFieldView;
