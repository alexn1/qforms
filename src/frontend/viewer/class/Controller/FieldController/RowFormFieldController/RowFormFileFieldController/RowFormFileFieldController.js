'use strict';
class RowFormFileFieldController extends RowFormFieldController {
    getViewClass() {
        return RowFormFileFieldView;
    }
    onFileChange = async e => {
        // console.log('RowFormFileFieldController.onFileChange', e.target.files[0]);
        const dataUrl = await Helper.readFileAsDataURL(e.target.files[0]);
        // console.log('dataUrl:', dataUrl);
        this.onChange(dataUrl);
    }
}
