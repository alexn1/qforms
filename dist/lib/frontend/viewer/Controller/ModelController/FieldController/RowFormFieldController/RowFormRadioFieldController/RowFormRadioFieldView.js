"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFormRadioFieldView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const RowFormFieldView_1 = require("../RowFormFieldView");
require("./RowFormRadioFieldView.less");
class RowFormRadioFieldView extends RowFormFieldView_1.RowFormFieldView {
    constructor() {
        /*onChange = async widgetValue => {
            // console.log('RowFormRadioFieldView.onChange', widgetValue);
            this.rerender();
            await this.getCtrl().onChange(widgetValue);
        }*/
        super(...arguments);
        this.onClick = async (e) => {
            console.log('RowFormRadioFieldView.onClick', e.currentTarget.dataset.value);
            let value = JSON.parse(e.currentTarget.dataset.value);
            if (this.getCtrl().getValue() !== value) {
                await this.getCtrl().onChangePure(value);
            }
        };
    }
    /*render() {
        return <div className={this.getCssClassNames()}>
            <Radio  classList={[
                        `${this.getCssBlockName()}__radio`,
                        ...(!this.getCtrl().isEditable() ? ['readOnly'] : [])
                    ]}
                    name={this.getCtrl().getModel().getFullName()}
                    items={this.getCtrl().getItems()}
                    value={this.getCtrl().getValueForWidget()}
                    readOnly={!this.getCtrl().isEditable()}
                    onChange={this.onChange}
            />
        </div>;
    }*/
    render() {
        // console.log('RowFormRadioFieldView.render', this.getCtrl().getItems(), this.getCtrl().getValue());
        const value = this.getCtrl().getValue();
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: this.getCssClassNames() }, { children: this.getCtrl()
                .getItems()
                .map((item) => {
                return ((0, jsx_runtime_1.jsx)("input", { className: `${this.getCssBlockName()}__toggle ${value === item.value ? 'selected' : ''}`, type: 'button', value: item.title || item.value, disabled: !this.getCtrl().isEditable(), "data-value": JSON.stringify(item.value), onClick: this.onClick }, item.value));
            }) })));
    }
}
exports.RowFormRadioFieldView = RowFormRadioFieldView;
