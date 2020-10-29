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
        const name = e.target.name;
        const file = e.target.files[0];
        console.log('name:', name);
        console.log('file:', file instanceof File, file);


        const img = document.createElement('img');
        img.src = await Helper.readImage(file);
        document.body.appendChild(img);

        const formData = new FormData();
        formData.append('json', JSON.stringify({field1: 'abc'}));
        formData.append(`_${name}`, file);
        const result = await QForms.post('/test', formData);
        console.warn('result:', result);


    }
}
testController;
