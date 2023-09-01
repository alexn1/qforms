class testController extends ApplicationController {
    getViewClass() {
        return testView;
    }
    onButtonClick = async e => {
        console.log('testController.onButtonClick');
        /*QForms.startWait();
        setTimeout(() => QForms.stopWait(), 1000);*/
        /*const data = {abc:'xyz'};
        console.warn('QForms.postJson', data);
        const result = await QForms.postJson('/test', data);
        console.warn('result:', result);*/
        // this.model.request({action: 'test', name: 'blob'});
    }
    onFileChange = async e => {
        // console.log('testController.onFileChange', e.target.files);
        /*const name = e.target.name;
        const file = e.target.files[0];
        console.log('name:', name);
        console.log('file:', file instanceof File, file);
        const url = Helper.createObjectUrl(await Helper.readFile(file));
        // const url = await Helper.readFileAsDataURL(file);
        const img = document.createElement('img');
        img.src = url
        document.body.appendChild(img);
        const result = await QForms.post('/test', Helper.createFormData({
            field1: 'abc',
            field2: file,
        }));
        console.warn('result:', result);*/
    }
}
testController;
