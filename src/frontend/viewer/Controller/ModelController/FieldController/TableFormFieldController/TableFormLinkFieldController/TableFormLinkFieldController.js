class TableFormLinkFieldController extends TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormLinkFieldView;
    }
    onClick = e => {
        console.log('TableFormLinkFieldController.onClick', e);
        e.preventDefault();
        this.emit('click', {source: this});
    }
}
window.QForms.TableFormLinkFieldController = TableFormLinkFieldController;
