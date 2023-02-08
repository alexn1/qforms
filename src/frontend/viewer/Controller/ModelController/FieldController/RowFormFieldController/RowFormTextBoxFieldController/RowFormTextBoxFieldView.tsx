import { RowFormFieldView } from '../RowFormFieldView';
import { TextBox, CloseIcon } from '../../../../../../common';
import { RowFormTextBoxFieldController } from './RowFormTextBoxFieldController';
import './RowFormTextBoxFieldView.less';

export class RowFormTextBoxFieldView extends RowFormFieldView<RowFormTextBoxFieldController> {
    constructor(props) {
        super(props);
        this.state = {
            classList: [],
        };
    }
    onClear = async e => {
        this.getCtrl().onChange('');
        setTimeout(() => {
            this.getWidget()
                .getElement()
                .focus();
        }, 0);
    };
    isCloseVisible() {
        // console.log('RowFormTextBoxFieldView.isCloseVisible', this.props.value);
        const ctrl = this.getCtrl();
        if (!ctrl.isEditable()) return false;
        return ctrl.getValueForWidget() !== '';
    }
    onFocus = async e => {
        // console.log('RowFormTextBoxFieldView.onFocus');
        this.addCssClass('focus');
        await this.rerender();
    };
    onBlur = async e => {
        // console.log('RowFormTextBoxFieldView.onBlur');
        const value = e.target.value;
        this.removeCssClass('focus');
        this.getCtrl().onBlur(value);
    };
    renderTextBox() {
        const ctrl = this.props.ctrl;
        return (
            <TextBox
                classList={[`${this.getCssBlockName()}__input`]}
                value={ctrl.getValueForWidget()}
                readOnly={!ctrl.isEditable()}
                enabled={ctrl.isEditable()}
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
    renderCloseIcon() {
        return (
            <div
                className={`${this.getCssBlockName()}__close ${
                    this.isCloseVisible() ? 'visible' : ''
                }`}
                onMouseDown={this.onClear}
            >
                <CloseIcon />
            </div>
        );
    }
    render() {
        return (
            <div className={this.getCssClassNames()}>
                {this.renderTextBox()}
                {this.renderCloseIcon()}
            </div>
        );
    }
}

// @ts-ignore
window.RowFormTextBoxFieldView = RowFormTextBoxFieldView;
