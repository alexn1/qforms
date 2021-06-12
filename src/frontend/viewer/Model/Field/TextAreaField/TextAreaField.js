class TextAreaField extends Field {
    getRows() {
        return this.data.rows;
    }
    getCols() {
        return this.data.cols;
    }
}
window.QForms.TextAreaField = TextAreaField;
