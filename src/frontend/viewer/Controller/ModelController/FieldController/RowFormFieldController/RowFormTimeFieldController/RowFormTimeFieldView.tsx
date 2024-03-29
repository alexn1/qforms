import { RowFormFieldView } from '../RowFormFieldView';
import { RowFormTimeFieldController } from './RowFormTimeFieldController';
import { TimeBox, CloseIcon } from '../../../../../../common';

import './RowFormTimeFieldView.less';

export class RowFormTimeFieldView extends RowFormFieldView<RowFormTimeFieldController> {
    onCloseClick = async (e) => {
        console.debug('RowFormTimeFieldView.onCloseClick');
        /*const ctrl = this.getCtrl();
        this.getWidget().state.value = '';
        this.getWidget().setState({value: ''});
        ctrl.onChange(null);*/
    };

    isCloseVisible() {
        // console.debug('RowFormTimeFieldView.isCloseVisible', this.props.value);
        if (this.props.readOnly) return false;
        if (!this.getWidget()) {
            return this.props.value !== undefined;
        }
        // console.debug('this.getWidget().state.value:', ctrl.view.state.value);
        return this.getWidget().state.value !== '';
    }

    render() {
        const ctrl = this.getCtrl();
        return (
            <div className={this.getCssClassNames()}>
                <TimeBox
                    onCreate={this.onWidgetCreate}
                    value={ctrl.getValueForWidget()}
                    readOnly={!ctrl.isEditable()}
                    onChange={ctrl.onChange}
                    onBlur={ctrl.onBlur}
                    placeholder={ctrl.getPlaceholder()}
                />
                <div
                    className={`close ${this.isCloseVisible() ? 'visible' : ''}`}
                    onClick={this.onCloseClick}>
                    <CloseIcon />
                </div>
            </div>
        );
    }
}
