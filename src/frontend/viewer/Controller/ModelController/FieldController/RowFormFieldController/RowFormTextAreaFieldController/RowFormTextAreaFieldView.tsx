import { RowFormFieldView } from '../RowFormFieldView';
import { TextArea } from '../../../../../../common';
import { RowFormTextAreaFieldController } from './RowFormTextAreaFieldController';
import './RowFormTextAreaFieldView.less';

export class RowFormTextAreaFieldView extends RowFormFieldView<RowFormTextAreaFieldController> {
    constructor(props) {
        super(props);
        this.state = {
            classList: [],
        };
    }

    onFocus = async (e) => {
        // console.debug('RowFormTextAreaFieldView.onFocus');
        this.addCssClass('focus');
        await this.rerender();
    };

    onBlur = async (e) => {
        // console.debug('RowFormTextAreaFieldView.onBlur');
        this.removeCssClass('focus');
        await this.rerender();
    };

    render() {
        // console.debug('RowFormTextAreaFieldView.render', this.state);
        const ctrl = this.getCtrl();
        return (
            <div className={this.getCssClassNames()}>
                <TextArea
                    classList={[`${this.getCssBlockName()}__textarea`]}
                    onCreate={this.onWidgetCreate}
                    value={ctrl.getValueForWidget()}
                    readOnly={!ctrl.isEditable()}
                    disabled={!ctrl.isEditable()}
                    onChange={ctrl.onChange}
                    placeholder={ctrl.getPlaceholder()}
                    rows={ctrl.getModel().getRows()}
                    cols={ctrl.getModel().getCols()}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                />
            </div>
        );
    }
}
