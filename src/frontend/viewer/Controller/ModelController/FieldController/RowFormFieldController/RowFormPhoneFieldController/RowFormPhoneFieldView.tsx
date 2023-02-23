import { RowFormFieldView } from '../RowFormFieldView';
import { PhoneBox, CloseIcon, PhoneIcon } from '../../../../../../common';
import { RowFormPhoneFieldController } from './RowFormPhoneFieldController';
import './RowFormPhoneFieldView.less';

export class RowFormPhoneFieldView extends RowFormFieldView<RowFormPhoneFieldController> {
    constructor(props) {
        super(props);
        this.state = {
            classList: [],
        };
    }

    onClear = async (e) => {
        this.getCtrl().onChange('');
        setTimeout(() => {
            this.getWidget().getElement().focus();
        }, 0);
    };

    isCloseVisible() {
        const ctrl = this.getCtrl();
        if (!ctrl.isEditable()) return false;
        return ctrl.getValueForWidget() !== '';
    }

    onFocus = async (e) => {
        this.addCssClass('focus');
        await this.rerender();
    };

    onBlur = async (value) => {
        // console.log('RowFormPhoneFieldView.onBlur', value);
        this.removeCssClass('focus');
        this.getCtrl().onBlur(value);
    };

    renderPhoneBox() {
        const ctrl = this.getCtrl();
        return (
            <PhoneBox
                classList={[`${this.getCssBlockName()}__input`]}
                value={ctrl.getValueForWidget()}
                readOnly={!ctrl.isEditable()}
                disabled={!ctrl.isEditable()}
                autoFocus={ctrl.isAutoFocus()}
                placeholder={ctrl.getPlaceholder() || null}
                autocomplete={ctrl.getAutocomplete()}
                onCreate={this.onWidgetCreate}
                onChange={ctrl.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />
        );
    }

    renderClearButton() {
        return (
            <div
                className={`${this.getCssBlockName()}__close ${
                    this.isCloseVisible() ? 'visible' : ''
                }`}
                onMouseDown={this.onClear}>
                <CloseIcon />
            </div>
        );
    }

    renderPhoneIcon() {
        return (
            <div className={`${this.getCssBlockName()}__icon`}>
                <PhoneIcon />
            </div>
        );
    }

    render() {
        // console.log('RowFormPhoneFieldView.render');
        return (
            <div className={this.getCssClassNames()}>
                {this.renderPhoneBox()}
                {this.renderClearButton()}
                {this.renderPhoneIcon()}
            </div>
        );
    }
}

// @ts-ignore
window.RowFormPhoneFieldView = RowFormPhoneFieldView;
