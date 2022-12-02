export {LoginFrontHostApp} from './LoginFrontHostApp';
export {ViewerFrontHostApp} from './ViewerFrontHostApp';
export {DataSource} from './Model/DataSource/DataSource';
export {PageView} from './Controller/ModelController/PageController/PageView';
export {RowFormController} from './Controller/ModelController/FormController/RowFormController/RowFormController';
export {TableFormTextBoxFieldController} from './Controller/ModelController/FieldController/TableFormFieldController/TableFormTextBoxFieldController/TableFormTextBoxFieldController';
export {PageController} from './Controller/ModelController/PageController/PageController';

/*
document.addEventListener('DOMContentLoaded', async () => {
    const data = JSON.parse(document.querySelector('script[type="application/json"]').textContent);
    const frontHostApp = new ViewerFrontHostApp({data});
    await frontHostApp.run();
});
*/
