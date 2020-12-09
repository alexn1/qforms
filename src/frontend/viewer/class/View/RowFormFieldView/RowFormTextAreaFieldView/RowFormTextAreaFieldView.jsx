class RowFormTextAreaFieldView extends RowFormFieldView {
    render() {
        const ctrl = this.props.ctrl;
        return <div className={this.getClassName()}>
            <TextArea
                onCreate={ctrl.onViewCreate}
                value={ctrl.getValueForView()}
                readOnly={!ctrl.isEditable()}
                onChange={ctrl.onChange}
                placeholder={ctrl.getPlaceholder()}
                rows={ctrl.model.getRows()}
                cols={ctrl.model.getCols()}
            />
        </div>;
    }
}
