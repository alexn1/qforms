class TableFormTextBoxFieldController extends TableFormFieldController {
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
    /*getViewClass() {
        return TableFormTextBoxFieldView;
    }*/
}
window.QForms.TableFormTextBoxFieldController = TableFormTextBoxFieldController;
