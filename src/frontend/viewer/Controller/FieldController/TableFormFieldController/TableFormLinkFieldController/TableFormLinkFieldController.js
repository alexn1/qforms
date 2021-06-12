class TableFormLinkFieldController extends TableFormFieldController {
    getViewClass() {
        return TableFormLinkFieldView;
    }
    onClick = e => {
        console.log('TableFormLinkFieldController.onClick', e);
        this.emit('click', {source: this});
    }
}
window.QForms.TableFormLinkFieldController = TableFormLinkFieldController;
