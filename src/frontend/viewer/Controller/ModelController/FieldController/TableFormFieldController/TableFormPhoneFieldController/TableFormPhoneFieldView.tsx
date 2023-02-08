import { TableFormFieldView } from '../TableFormFieldView';
import { PhoneBox } from '../../../../../../common';
import { TableFormPhoneFieldController } from './TableFormPhoneFieldController';

export class TableFormPhoneFieldView extends TableFormFieldView<TableFormPhoneFieldController> {
    span: React.RefObject<any>;
    render() {
        const row = this.props.row;
        return (
            <div className={`${this.getCssClassNames()} ellipsis`} style={this.getStyle(row)}>
                <span ref={this.span}>
                    {PhoneBox.formatPhoneNumber(this.getCtrl().getValueForWidget(row))}
                </span>
            </div>
        );
    }
}
