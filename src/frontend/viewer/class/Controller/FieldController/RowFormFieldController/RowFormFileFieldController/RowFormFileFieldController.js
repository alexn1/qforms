'use strict';
class RowFormFileFieldController extends RowFormFieldController {
    getViewClass() {
        return RowFormFileFieldView;
    }
    onFileChange = async e => {
        console.log('RowFormFileFieldController.onFileChange', e.target.files[0]);
        const file = e.target.files[0];
        const dataUrl = await Helper.readFileAsDataURL(file);
        // console.log('dataUrl:', dataUrl);
        this.onChange(dataUrl);
    }
}
