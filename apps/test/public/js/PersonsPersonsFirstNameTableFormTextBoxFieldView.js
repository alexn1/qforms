console.log('PersonsPersonsFirstNameTableFormTextBoxFieldView');

class PersonsPersonsFirstNameTableFormTextBoxFieldView extends TableFormTextBoxFieldView {
    getStyle(row) {
        const value = this.getCtrl().getModel().getValue(row);
        let color = null;
        if (value === 'alex') {
            color = 'red';
        }
        return { color };
    }
}

Helper.registerGlobalClass(PersonsPersonsFirstNameTableFormTextBoxFieldView);
