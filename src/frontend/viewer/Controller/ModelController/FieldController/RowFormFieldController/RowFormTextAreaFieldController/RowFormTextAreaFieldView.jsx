class RowFormTextAreaFieldView extends RowFormFieldView {
    constructor(props) {
        super(props);
        this.state = {
            classList: []
        };
    }
    onFocus = async e => {
        // console.log('RowFormTextAreaFieldView.onFocus');
        this.addCssClass('focus');
        await this.rerender();
    }
    onBlur = async e => {
        // console.log('RowFormTextAreaFieldView.onBlur');
        this.removeCssClass('focus');
        await this.rerender();
    }
    render() {
        // console.log('RowFormTextAreaFieldView.render', this.state);
        const ctrl = this.props.ctrl;
        return <div className={this.getCssClassNames()}>
            <TextArea
                classList={[`${this.getCssBlockName()}__textarea`]}
                onCreate={ctrl.onWidgetCreate}
                value={ctrl.getValueForWidget()}
                readOnly={!ctrl.isEditable()}
                disabled={!ctrl.isEditable()}
                onChange={ctrl.onChange}
                placeholder={ctrl.getPlaceholder()}
                rows={ctrl.model.getRows()}
                cols={ctrl.model.getCols()}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />
        </div>;
    }
}
window.QForms.RowFormTextAreaFieldView = RowFormTextAreaFieldView;
