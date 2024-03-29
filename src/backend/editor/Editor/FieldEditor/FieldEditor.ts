import path from 'path';

import { Editor } from '../Editor';
import * as backend from '../../../../backend';
import { FieldAttributes, FieldScheme } from '../../../common/Scheme/FieldScheme/FieldScheme';

export type FieldParams = Partial<FieldAttributes> & {
    name: string;
};

export class FieldEditor<T extends FieldScheme = FieldScheme> extends Editor<T> {
    static createAttributes(params: FieldParams): FieldAttributes {
        if (!params.name) throw new Error('no name');
        return {
            name: params.name,
            caption: params.caption !== undefined ? params.caption : params.name,
            column: params.column !== undefined ? params.column : params.name,
            defaultValue: params.defaultValue !== undefined ? params.defaultValue : '',
            value: params.value !== undefined ? params.value : '',
            param: params.param !== undefined ? params.param : 'false',
            visible: params.visible !== undefined ? params.visible : 'true',
            type: params.type !== undefined ? params.type : '',
            width: params.width !== undefined ? params.width : '',
            cssBlock: params.cssBlock !== undefined ? params.cssBlock : '',
            viewClass: params.viewClass !== undefined ? params.viewClass : '',
            ctrlClass: params.ctrlClass !== undefined ? params.ctrlClass : '',
            autoFocus: params.autoFocus !== undefined ? params.autoFocus : 'false',
        };
    }

    changeClass(newClassName: string) {
        const newData = backend[`${newClassName}Editor`].createData(this.attributes());
        this.setColData(this.getColName(), newData);
        return newData;
    }

    async createJs(params) {
        const templateFilePath = path.join(this.getEditorPath(), 'Editor/FieldEditor/Field.js.ejs');
        const customJsFilePath = await this.getCustomFilePath('js');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            page: this.getParent().getParent().getName(),
            form: this.getParent().getName(),
            field: this.getName(),
            formClass: this.getParent().constructor.name.replace('Editor', ''),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return js;
    }

    async createJsx(params) {
        const templateFilePath = path.join(this.getEditorPath(), 'Editor/FieldEditor/View.jsx.ejs');
        const customJsxFilePath = await this.getCustomFilePath('jsx');
        const jsx = await this.createFileByParams(customJsxFilePath, templateFilePath, {
            page: this.getParent().getParent().getName(),
            form: this.getParent().getName(),
            field: this.getName(),
            formClass: this.getParent().constructor.name.replace('Editor', ''),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return jsx;
    }

    async createLess(params) {
        const templateFilePath = path.join(
            this.getEditorPath(),
            'Editor/FieldEditor/View.less.ejs',
        );
        const customLessFilePath = await this.getCustomFilePath('less');
        const less = await this.createFileByParams(customLessFilePath, templateFilePath, {
            page: this.getParent().getParent().getName(),
            form: this.getParent().getName(),
            field: this.getName(),
            formClass: this.getParent().constructor.name.replace('Editor', ''),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return less;
    }

    async getCollectionDirPath() {
        const customDirPath = await this.getParent<Editor>().getCustomDirPath();
        const dirPath = path.join(customDirPath, 'fields');
        return dirPath;
    }

    getColName() {
        return 'fields';
    }
}
