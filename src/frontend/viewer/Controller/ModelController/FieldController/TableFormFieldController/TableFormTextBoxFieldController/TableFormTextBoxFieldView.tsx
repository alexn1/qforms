import { TableFormFieldView } from '../TableFormFieldView';
import { TableFormTextBoxFieldController } from './TableFormTextBoxFieldController';

export class TableFormTextBoxFieldView extends TableFormFieldView<TableFormTextBoxFieldController> {
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
