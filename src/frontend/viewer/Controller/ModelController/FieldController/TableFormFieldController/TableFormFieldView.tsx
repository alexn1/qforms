import React from 'react';
import { FieldView } from '../FieldView';
import { TableFormFieldController } from './TableFormFieldController';

export class TableFormFieldView<
    TTableFormFieldController extends TableFormFieldController = TableFormFieldController,
> extends FieldView<TTableFormFieldController> {
    span: React.RefObject<any>;

    constructor(props) {
        super(props);
        this.span = React.createRef();
    }

    getSpanOffsetWidth() {
        // console.debug('TableFormFieldView.getSpanOffsetWidth', this.span.current);
        if (!this.span.current) return 0;
        return this.span.current.offsetWidth;
    }
}
