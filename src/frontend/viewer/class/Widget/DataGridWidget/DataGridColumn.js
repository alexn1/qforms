'use strict';

class DataGridColumn extends GridColumn {

    constructor(gridWidget, fieldName, headerCell, fieldController) {
        super(gridWidget, fieldName, headerCell);
        this.fieldController = fieldController;
    }

    renderView() {
        return this.fieldController.renderView();
    }

    setValue(view, value) {
        this.fieldController.setValue(value, view);
    }

    getValue(view) {
        return this.fieldController.getValue(view);
    }

    setViewStyle(view, row) {
        this.fieldController.setViewStyle(view, row);
    }

    beginEdit(bodyCell) {
        if (this.fieldController.beginEdit(bodyCell.firstElementChild)) {
            super.beginEdit.apply(this, arguments);
        }
    }

    endEdit(bodyCell) {
        this.fieldController.endEdit(bodyCell.firstElementChild);
        super.endEdit.apply(this, arguments);
    }

}
