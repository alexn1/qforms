import {TableFormFieldView} from '../TableFormFieldView';
import {PhoneBox} from '../../../../../../common';

export class TableFormPhoneFieldView extends TableFormFieldView {
    span: React.RefObject<any>;
    render() {
        const row = this.props.row;
        return <div className={`${this.getCssClassNames()} ellipsis`} style={this.getStyle(row)}>
            <span ref={this.span}>{PhoneBox.formatPhoneNumber(this.getCtrl().getValueForWidget(row))}</span>
        </div>;
    }
}
