export {LoginFrontHostApp} from './LoginFrontHostApp';
export {ViewerFrontHostApp} from './ViewerFrontHostApp';
export {DataSource} from './Model/DataSource/DataSource';
export {PageView} from './Controller/ModelController/PageController/PageView';
export {RowFormController} from './Controller/ModelController/FormController/RowFormController/RowFormController';
export {TableFormTextBoxFieldController} from './Controller/ModelController/FieldController/TableFormFieldController/TableFormTextBoxFieldController/TableFormTextBoxFieldController';
export {PageController} from './Controller/ModelController/PageController/PageController';
export {RowForm} from './Model/Form/RowForm/RowForm';
export {TableForm} from './Model/Form/TableForm/TableForm';
export {DateField} from './Model/Field/DateField/DateField';
export {ComboBoxField} from './Model/Field/ComboBoxField/ComboBoxField';
export {TextBoxField} from './Model/Field/TextBoxField/TextBoxField';
export {SqlDataSource} from './Model/DataSource/SqlDataSource/SqlDataSource';
export {RowFormDateFieldController} from './Controller/ModelController/FieldController/RowFormFieldController/RowFormDateFieldController/RowFormDateFieldController';
export {RowFormComboBoxFieldController} from './Controller/ModelController/FieldController/RowFormFieldController/RowFormComboBoxFieldController/RowFormComboBoxFieldController';
export {RowFormTextBoxFieldController} from './Controller/ModelController/FieldController/RowFormFieldController/RowFormTextBoxFieldController/RowFormTextBoxFieldController';
export {TableFormController} from './Controller/ModelController/FormController/TableFormController/TableFormController';
export {TableFormDateFieldController} from './Controller/ModelController/FieldController/TableFormFieldController/TableFormDateFieldController/TableFormDateFieldController';


/*
document.addEventListener('DOMContentLoaded', async () => {
    const data = JSON.parse(document.querySelector('script[type="application/json"]').textContent);
    const frontHostApp = new ViewerFrontHostApp({data});
    await frontHostApp.run();
});
*/
