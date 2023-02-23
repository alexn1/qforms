import { TableFormFieldView } from '../TableFormFieldView';
import { TableFormTextBoxFieldController } from './TableFormTextBoxFieldController';

export class TableFormTextBoxFieldView<
    T extends TableFormTextBoxFieldController,
> extends TableFormFieldView<T> {
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

// @ts-ignore
window.TableFormTextBoxFieldView = TableFormTextBoxFieldView;
