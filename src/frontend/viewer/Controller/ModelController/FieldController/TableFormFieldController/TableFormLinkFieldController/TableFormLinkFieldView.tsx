import { TableFormFieldView } from '../TableFormFieldView';
import { TableFormLinkFieldController } from './TableFormLinkFieldController';
import './TableFormLinkFieldView.less';

export class TableFormLinkFieldView extends TableFormFieldView<TableFormLinkFieldController> {
    render() {
        const row = this.props.row;
        const ctrl = this.props.ctrl;
        return (
            <div className={`${this.getCssClassNames()} ellipsis`} style={this.getStyle(row)}>
                <a href="#" onClick={ctrl.onClick}>
                    {ctrl.getValueForWidget(row)}
                </a>
            </div>
        );
    }
}

if (typeof window === 'object') {
    // @ts-ignore
    window.TableFormLinkFieldView = TableFormLinkFieldView;
}
