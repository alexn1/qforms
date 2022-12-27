import { RowFormFieldView } from '../RowFormFieldView';
import './RowFormLinkFieldView.less';

export class RowFormLinkFieldView extends RowFormFieldView {
    render() {
        const ctrl = this.props.ctrl;
        return (
            <div className={this.getCssClassNames()}>
                <a href={ctrl.getValueForWidget()} onClick={ctrl.onClick} target={'_blank'}>
                    {ctrl.getValueForWidget()}
                </a>
            </div>
        );
    }
}

// @ts-ignore
window.RowFormLinkFieldView = RowFormLinkFieldView;
