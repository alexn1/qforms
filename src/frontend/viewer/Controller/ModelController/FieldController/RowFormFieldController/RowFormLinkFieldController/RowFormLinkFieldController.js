class RowFormLinkFieldController extends  RowFormFieldController {
    getViewClass() {
        return super.getViewClass() || RowFormLinkFieldView;
    }
    onClick = e => {
        console.log('RowFormLinkFieldController.onClick', e);
        this.emit({source: this});
    }
}
window.QForms.RowFormLinkFieldController = RowFormLinkFieldController;
