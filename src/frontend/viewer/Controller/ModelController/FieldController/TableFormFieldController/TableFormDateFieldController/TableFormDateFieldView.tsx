import React from 'react';
import { TableFormFieldView } from '../TableFormFieldView';
import { TableFormDateFieldController } from './TableFormDateFieldController';

export class TableFormDateFieldView extends TableFormFieldView<TableFormDateFieldController> {
    span: React.RefObject<any>;

    render() {
        const row = this.props.row;
        const ctrl = this.props.ctrl;
        return (
            <div className={`${this.getCssClassNames()} ellipsis`} style={this.getStyle(row)}>
                <span ref={this.span}>{ctrl.getValueForWidget(row)}</span>
            </div>
        );
    }
}

if (typeof window === 'object') {
    // @ts-ignore
    window.TableFormDateFieldView = TableFormDateFieldView;
}
