class TableFormTextBoxFieldController extends TableFormFieldController {
    getViewClass() {
        return super.getViewClass() || TableFormTextBoxFieldView;
    }
    /*beginEdit(view) {
        view.firstElementChild.style.MozUserSelect = 'text';
        view.firstElementChild.contentEditable = true;
        const range = document.createRange();
        range.selectNodeContents(view.firstElementChild);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        view.firstElementChild.focus();
        return true;
    }*/

    /*endEdit(view) {
        view.firstElementChild.style.MozUserSelect = 'none';
        view.firstElementChild.contentEditable = false;
    }*/
}
window.QForms.TableFormTextBoxFieldController = TableFormTextBoxFieldController;