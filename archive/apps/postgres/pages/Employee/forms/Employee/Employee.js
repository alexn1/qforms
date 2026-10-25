class EmployeeEmployeeController extends RowFormController {

    constructor(...args) {
        super(...args);
    }

    init() {
        super.init();
    }

    deinit() {
        super.deinit();
    }

    getCaption() {
        console.log('EmployeeEmployeeController.getCaption', this.row);
        return this.model.data.caption + ': ' + this.row.first_name + ' ' + this.row.last_name;
    }

    /*
    setRowStyle(bodyRow, row) {
        //var fieldView = this.fields.field.views[bodyRow.qKey];
        //if (row.column === 'value') {
        //    $(fieldView).css('color', 'red');
        //} else {
        //    $(fieldView).css('color', '');
        //}
    }
    */

}