'use strict';
class RowFormImageFieldController extends RowFormFieldController {
    getViewClass() {
        return RowFormImageFieldView;
    }
    renderValueForView() {
        // console.log('RowFormImageFieldController.renderValueForView', this.state.value);
        const buffer = Helper.base64ToArrayBuffer(this.state.value);
        return Helper.createObjectUrl(buffer);
    }
}
