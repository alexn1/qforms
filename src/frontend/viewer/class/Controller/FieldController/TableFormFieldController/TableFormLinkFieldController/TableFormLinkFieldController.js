'use strict';

class TableFormLinkFieldController extends TableFormFieldController {

    /*constructor(model, parent) {
        super(model, parent);
    }*/

    /*getStringValue(view) {
        // console.log('LinkFieldController.getStringValue', view.firstElementChild);
        return view.firstElementChild.innerHTML;
    }*/

    /*setStringValue(stringValue, view) {
        view.firstElementChild.innerHTML = stringValue;
    }*/

    onClick = e => {
        console.log('TableFormLinkFieldController.onClick', e);
        this.emit('click', {source: this});
    }
    getViewClass() {
        return TableFormLinkFieldView;
    }
}
