import path from 'path';

import { ApplicationEditor } from '../ApplicationEditor/ApplicationEditor';
import { JsonFile } from '../../../JsonFile';
import { Editor } from '../Editor';
import { BkPageScheme } from '../../../common/BkModelScheme/BkPageScheme/BkPageScheme';
import { debug } from '../../../../console';

export class PageEditor extends Editor<BkPageScheme> {
    constructor(
        private appEditor: ApplicationEditor,
        public pageFile: JsonFile,
        editorPath: string,
    ) {
        super(pageFile.data, appEditor, editorPath);
    }

    static createData(params) {
        return {
            '@class': 'Page',
            '@attributes': {
                formatVersion: '0.1',
                name: params.name,
                caption: params.caption !== undefined ? params.caption : params.name,
                cssBlock: params.cssBlock !== undefined ? params.cssBlock : '',
                viewClass: params.viewClass !== undefined ? params.viewClass : '',
                ctrlClass: params.ctrlClass !== undefined ? params.ctrlClass : '',
                modelClass: params.modelClass !== undefined ? params.modelClass : '',
                formInTab: params.formInTab !== undefined ? params.formInTab : 'false',
            },
            dataSources: [
                ...(params.dataSources ? params.dataSources.map(Editor.createItemData) : []),
            ],
            actions: [...(params.actions ? params.actions.map(Editor.createItemData) : [])],
            forms: [...(params.forms ? params.forms.map(Editor.createItemData) : [])],
        };
    }

    setAttr(name: string, value: string) {
        debug('PageEditor.setAttr', name, value);
        if (name === 'name') {
            const pageLinkEditor = this.appEditor.createItemEditor('pageLinks', this.getName());
            pageLinkEditor.setAttr(name, value);
        }
        super.setAttr(name, value);
    }

    async save() {
        await this.pageFile.save();
    }

    async createJs(params) {
        const templateFilePath = path.join(this.getEditorPath(), 'Editor/PageEditor/Page.js.ejs');
        const customJsFilePath = await this.getCustomFilePath('js');
        const js = await this.createFileByParams(customJsFilePath, templateFilePath, {
            page: this.getName(),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return js;
    }

    async createJsx(params) {
        const templateFilePath = path.join(this.getEditorPath(), 'Editor/PageEditor/Page.jsx.ejs');
        const customJsxFilePath = await this.getCustomFilePath('jsx');
        const jsx = await this.createFileByParams(customJsxFilePath, templateFilePath, {
            page: this.getName(),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return jsx;
    }

    async createLess(params) {
        const templateFilePath = path.join(this.getEditorPath(), 'Editor/PageEditor/Page.less.ejs');
        const customLessFilePath = await this.getCustomFilePath('less');
        const less = await this.createFileByParams(customLessFilePath, templateFilePath, {
            page: this.getName(),
            _class: this.constructor.name.replace('Editor', ''),
        });
        return less;
    }

    async createModelBackJs(params) {
        const filePath = path.join(await this.getCustomDirPath(), 'Model.back.ts');
        const templateFilePath = path.join(
            this.getEditorPath(),
            'Editor/PageEditor/Model.back.ts.ejs',
        );
        const js = await this.createFileByParams(filePath, templateFilePath, {
            name: this.getName(),
        });
        return js;
    }

    async getCustomDirPath() {
        debug('PageEditor.getCustomDirPath');
        const customDirPath = await this.getParent<Editor>().getCustomDirPath();
        return path.join(customDirPath, 'pages', this.getName());
    }

    reformat() {
        this.data = this.pageFile.data = PageEditor.createData({
            ...this.attributes(),
            dataSources: this.data.dataSources,
            actions: this.data.actions,
            forms: this.data.forms,
        });
    }
}
