import React from 'react';
import { TableFormFieldView } from '../TableFormFieldView';
import { CheckBox } from '../../../../../../common';
import { TableFormCheckBoxFieldController } from './TableFormCheckBoxFieldController';
import './TableFormCheckBoxFieldView.less';

export class TableFormCheckBoxFieldView<
    T extends TableFormCheckBoxFieldController
> extends TableFormFieldView<T> {
    span: React.RefObject<any>;

    render() {
        const row = this.props.row;
        const ctrl = this.props.ctrl;
        return (
            <div className={this.getCssClassNames()} style={this.getStyle(row)}>
                <CheckBox
                    ref={this.span}
                    checked={ctrl.getValueForWidget(row)}
                    readOnly={true}
                    disabled={true}
                />
            </div>
        );
    }
}

// @ts-ignore
window.TableFormCheckBoxFieldView = TableFormCheckBoxFieldView;
