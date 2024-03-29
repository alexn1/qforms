import React from 'react';
import { TableFormFieldView } from '../TableFormFieldView';
import { TableFormComboBoxFieldController } from './TableFormComboBoxFieldController';

export class TableFormComboBoxFieldView extends TableFormFieldView<TableFormComboBoxFieldController> {
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
