'use strict';
class testController extends ApplicationController {
    getViewClass() {
        return testView;
    }
    onButtonClick = async e => {
        console.log('testController.onButtonClick');
        /*QForms.startWait();
        setTimeout(() => QForms.stopWait(), 1000);*/

        const data = {abc:'xyz'};
        console.warn('QForms.postJson', data);
        const result = await QForms.postJson('/test', data);
        console.warn('result:', result);
    }
    readFile(file) {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsArrayBuffer(file);
        });
    }
    onFileChange = async e => {
        // console.log('testController.onFileChange', e.target.files);
        const file = e.target.files[0];
        console.log('file:', file instanceof File, file);

        /*
        const formData = new FormData();
        formData.append('field1', file);
        formData.append('__data', JSON.stringify({field2: 'abc'}));
        const result = await QForms.post('/test', formData);
        console.warn('result:', result);*/

        const buffer = await Helper.readFile(file);
        const img = document.createElement('img')
        img.src = `data:image/png;base64,${Helper.convertBufferToBase64string(buffer)}`;
        document.body.appendChild(img);

    }
}
testController;
