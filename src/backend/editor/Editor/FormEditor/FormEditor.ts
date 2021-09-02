const path = require('path');
const Editor = require('../Editor');

class FormEditor extends Editor {
    static createAttributes(params): any {
        console.log('FormEditor.createAttributes', params);
        return {
            '@class'     : 'Form',
            '@attributes': {
                name    : params.name,
                caption : params.caption  ? params.caption : params.name,
                visible : params.visible  ? params.visible : 'true',
            },
            dataSources: [
                ...(params.dataSources ? params.dataSources.map(Editor.createItemData) : [])
            ],
            actions    : [
                ...(params.actions ? params.actions.map(Editor.createItemData) : [])
            ],
            fields     : [
                ...(params.fields ? params.fields.map(Editor.createItemData) : [])
            ],
        };
    }
    async createJs(params) {
        const templateFilePath = path.join(__dirname, 'Form.js.ejs');
        const customJsFilePath = await this.getCustomFilePath('js');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            page  : this.parent.getName(),
            form  : this.getName(),
            _class: this.constructor.name.replace('Editor', '')
        });
        return js;
    }
    async createModelBackJs(params) {
        const filePath = path.join(await this.getCustomDirPath(), 'Model.back.js');
        const templateFilePath = path.join(__dirname, 'Model.back.js.ejs');
        const js = await this.createFileByParams(filePath, templateFilePath, {
            page  : this.parent.getName(),
            form  : this.getName(),
            _class: this.getClassName()
        });
        return js;
    }
    async getCollectionDirPath() {
        const customDirPath = await this.parent.getCustomDirPath();
        return path.join(customDirPath, 'forms');
    }
    getColName() {
        return 'forms';
    }
}

export = FormEditor;