import path from 'path';

import { Editor } from '../Editor';
import { debug } from '../../../../console';
import { FormAttributes, FormScheme, FormItems } from '../../../common/Scheme/FormScheme';

export type FormParams = Partial<FormAttributes> &
    Partial<FormItems> & {
        name: string;
    };

export class FormEditor<T extends FormScheme = FormScheme> extends Editor<T> {
    static createAttributes(params: FormParams): FormAttributes {
        if (!params.name) throw new Error('no name');
        return {
            name: params.name,
            caption: params.caption !== undefined ? params.caption : params.name,
            visible: params.visible !== undefined ? params.visible : 'true',
            cssBlock: params.cssBlock !== undefined ? params.cssBlock : '',
            viewClass: params.viewClass !== undefined ? params.viewClass : '',
            ctrlClass: params.ctrlClass !== undefined ? params.ctrlClass : '',
            modelClass: params.modelClass !== undefined ? params.modelClass : '',
        };
    }

    static createData(params: FormParams): FormScheme {
        debug('FormEditor.createData', params);
        return {
            '@class': 'Form',
            '@attributes': {
                ...FormEditor.createAttributes(params),
            },
            dataSources: [
                ...(params.dataSources ? params.dataSources.map(Editor.createItemData) : []),
            ],
            actions: [...(params.actions ? params.actions.map(Editor.createItemData) : [])],
            fields: [...(params.fields ? params.fields.map(Editor.createItemData) : [])],
        };
    }

    async createJs(params) {
        const templateFilePath = path.join(this.getEditorPath(), 'Editor/FormEditor/Form.js.ejs');
        const customJsFilePath = await this.getCustomFilePath('js');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            page: this.getParent().getName(),
            form: this.getName(),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return js;
    }

    async createJsx(params) {
        const templateFilePath = path.join(this.getEditorPath(), 'Editor/FormEditor/Form.jsx.ejs');
        const customFilePath = await this.getCustomFilePath('jsx');
        const jsx = await this.createFileByParams(customFilePath, templateFilePath, {
            page: this.getParent().getName(),
            form: this.getName(),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return jsx;
    }

    async createLess(params) {
        const templateFilePath = path.join(this.getEditorPath(), 'Editor/FormEditor/Form.less.ejs');
        const customFilePath = await this.getCustomFilePath('less');
        const less = await this.createFileByParams(customFilePath, templateFilePath, {
            page: this.getParent().getName(),
            form: this.getName(),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return less;
    }

    async createModelBackJs(params) {
        const filePath = path.join(await this.getCustomDirPath(), 'Model.back.ts');
        const templateFilePath = path.join(
            this.getEditorPath(),
            'Editor/FormEditor/Model.back.ts.ejs',
        );
        const js = await this.createFileByParams(filePath, templateFilePath, {
            page: this.getParent().getName(),
            form: this.getName(),
            _class: this.getClassName(),
        });
        return js;
    }

    async getCollectionDirPath() {
        const customDirPath = await this.getParent<Editor>().getCustomDirPath();
        return path.join(customDirPath, 'forms');
    }

    getColName() {
        return 'forms';
    }
}
