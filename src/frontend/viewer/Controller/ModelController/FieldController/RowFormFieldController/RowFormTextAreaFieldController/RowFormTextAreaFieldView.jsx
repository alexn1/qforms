class RowFormTextAreaFieldView extends RowFormFieldView {
    render() {
        const ctrl = this.props.ctrl;
        return <div className={this.getCssClassNames()}>
            <TextArea
                cssBlockName={`${this.getCssBlockName()}__textarea`}
                onCreate={ctrl.onWidgetCreate}
                value={ctrl.getValueForWidget()}
                readOnly={!ctrl.isEditable()}
                onChange={ctrl.onChange}
                placeholder={ctrl.getPlaceholder()}
                rows={ctrl.model.getRows()}
                cols={ctrl.model.getCols()}
            />
        </div>;
    }
}
window.QForms.RowFormTextAreaFieldView = RowFormTextAreaFieldView;
