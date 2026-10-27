import { TableFormFieldView } from '../TableFormFieldView';
import { TableFormLinkFieldController } from './TableFormLinkFieldController';
import './TableFormLinkFieldView.less';

export class TableFormLinkFieldView extends TableFormFieldView<TableFormLinkFieldController> {
    render() {
        const row = this.props.row;
        const ctrl = this.getCtrl();
        return (
            <div className={`${this.getCssClassNames()} ellipsis`} style={this.getStyle(row)}>
                <span
                    className={`${this.getCssBlockName()}__link`}
                    role="link"
                    onClick={ctrl.onClick}>
                    {ctrl.getValueForWidget(row)}
                </span>
            </div>
        );
    }
}
