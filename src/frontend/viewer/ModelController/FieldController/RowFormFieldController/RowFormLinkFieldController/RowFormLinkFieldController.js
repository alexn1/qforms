class RowFormLinkFieldController extends  RowFormFieldController {
    getViewClass() {
        return RowFormLinkFieldView;
    }
    onClick = e => {
        console.log('RowFormLinkFieldController.onClick', e);
        this.emit({source: this});
    }
}
window.QForms.RowFormLinkFieldController = RowFormLinkFieldController;
