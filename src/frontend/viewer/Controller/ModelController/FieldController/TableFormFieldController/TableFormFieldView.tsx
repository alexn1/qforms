import React from 'react';
import {FieldView} from '../FieldView';

export class TableFormFieldView extends FieldView {
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
