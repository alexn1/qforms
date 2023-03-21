import { TableFormFieldView } from '../TableFormFieldView';
import React from 'react';
import { TableFormDateTimeFieldController } from './TableFormDateTimeFieldController';

export class TableFormDateTimeFieldView extends TableFormFieldView<TableFormDateTimeFieldController> {
    span: React.RefObject<any>;

    render() {
        const row = this.props.row;
        const ctrl = this.getCtrl();
        return (
            <div className={`${this.getCssClassNames()} ellipsis`} style={this.getStyle(row)}>
                <span ref={this.span}>{ctrl.getValueForWidget(row)}</span>
            </div>
        );
    }
}

if (typeof window === 'object') {
    // @ts-ignore
    window.TableFormDateTimeFieldView = TableFormDateTimeFieldView;
}
