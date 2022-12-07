import { TableFormFieldView } from '../TableFormFieldView';

export class TableFormLinkFieldView extends TableFormFieldView {
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

// @ts-ignore
window.TableFormLinkFieldView = TableFormLinkFieldView;
