import path from 'path';
const ejs = require('ejs');

import { BaseModel } from '../../BaseModel';
import { BkHelper } from '../../BkHelper';
import * as backend from '../../../backend';
import { BkModelScheme } from '../../viewer/BkModelScheme/BkModelScheme';
import { debug } from '../../../console';

export class Editor<
    TBkModelData extends BkModelScheme = BkModelScheme,
> extends BaseModel<TBkModelData> {
    constructor(data: TBkModelData, parent: Editor | undefined, private editorPath: string) {
        super(data, parent);
    }

    getEditorPath(): string {
        if (!this.editorPath) throw new Error(`${this.constructor.name}: no editorPath`);
        return this.editorPath;
    }

    /* async createFileByReplace(newFilePath, templateFilePath, replaceFrom, replaceTo, emptyTemplate) {
        debug('Editor.createFileByReplace');
        emptyTemplate = emptyTemplate || '';
        const exists = await BkHelper.exists(newFilePath);
        if (exists) {
            throw new Error(`File ${path.basename(newFilePath)} already exist.`);
        }
        const template = await BkHelper.readTextFile(templateFilePath);
        let text = template.replace(new RegExp(replaceFrom, 'g'), replaceTo);
        if (text === '') {
            text = emptyTemplate;
        }
        await BkHelper.writeFile2(newFilePath, text);
        return text;
    } */

    async createFileByParams(newFilePath: string, templateFilePath: string, params) {
        const exists = await BkHelper.exists(newFilePath);
        if (exists) {
            throw new Error(`File ${path.basename(newFilePath)} already exists.`);
        }
        const template = await BkHelper.readTextFile(templateFilePath);
        const content = ejs.render(template, params);
        await BkHelper.writeFile2(newFilePath, content);
        return content;
    }

    /* getViewName() {
        return this.constructor.name.replace('Editor', '') + 'View';
    } */

    async getFile(filePath: string) {
        debug('Editor.getFile', filePath);
        const exists = await BkHelper.exists(filePath);
        if (exists) {
            return await BkHelper.readTextFile(filePath);
        }
    }

    async saveFile(filePath: string, content: string): Promise<void> {
        const exists = await BkHelper.exists(filePath);
        if (!exists) {
            throw new Error(`File {path.basename(filePath)} doesn't exist.`);
        }
        await BkHelper.writeFile2(filePath, content);
    }

    async getCustomFile(ext: string) {
        debug('Editor.getCustomFile', ext);
        const customFilePath = await this.getCustomFilePath(ext);
        return this.getFile(customFilePath);
    }

    async saveCustomFile(ext: string, text: string): Promise<void> {
        const customFilePath = await this.getCustomFilePath(ext);
        await this.saveFile(customFilePath, text);
    }

    /* moveDataSourceUp(name) {
        this.moveDataColItem('dataSources', name, -1);
    } */

    /* moveDataSourceDown(name) {
        this.moveDataColItem('dataSources', name, 1);
    } */

    /* moveActionUp(name) {
        this.moveDataColItem('actions', name, -1);
    } */

    /* moveActionDown(name) {
        this.moveDataColItem('actions', name, 1);
    } */

    async getCustomFilePath(ext) {
        const customDirPath = await this.getCustomDirPath();
        if (ext === 'js') {
            return path.join(customDirPath, 'Controller.front.ts');
        } else if (ext === 'jsx') {
            return path.join(customDirPath, 'View.tsx');
        } else if (ext === 'less') {
            return path.join(customDirPath, 'View.less');
        }
        return path.join(customDirPath, this.getName() + '.' + ext);
    }

    /* createDataSourceEditor(name) {
        const data = this.getColItemData('dataSources', name);
        const className = BaseModel.getClassName(data);
        const DataSourceClass = backend[`${className}Editor`];
        return new DataSourceClass(data, this);
    } */

    moveDataColItem(colName, name, offset) {
        BkHelper.moveArrItem(this.getCol(colName), this.getColItemData(colName, name), offset);
    }

    /* async newActionData(params) {
        if (!params.name) throw new Error('no name');
        const name = params.name;
        if (this.getColItemData('actions', name)) {
            throw new Error(`action ${name} already exists`);
        }
        const data = backend.ActionEditor.createData(params);
        this.addModelData('actions', data);
        return data;
    } */

    /* createActionEditor(name) {
        return new backend.ActionEditor(this.getColItemData('actions', name), this);
    } */

    setColData(colName: string, newData: BkModelScheme) {
        // debug('Editor.setData', newData);
        return this.getParent().replaceDataColItem(colName, this.data, newData);
    }

    createItemEditor(colName: string, itemName: string): any {
        const data = this.getColItemData(colName, itemName);
        const className = BaseModel.getClassName(data);
        const Class = backend[`${className}Editor`];
        return new Class(data, this, this.editorPath);
    }

    async getCustomDirPath() {
        const collectionDirPath = await this.getCollectionDirPath();
        return path.join(collectionDirPath, this.getName());
    }

    async getCollectionDirPath(): Promise<string> {
        throw new Error('Editor.getCollectionDirPath not implemented');
    }

    moveItemUp(colName, itemName): void {
        this.moveDataColItem(colName, itemName, -1);
    }

    moveItemDown(colName, itemName): void {
        this.moveDataColItem(colName, itemName, 1);
    }

    newItemData(className, colName, params) {
        debug('Editor.newItemData', className, colName, params);
        const { name } = params;
        if (!name) throw new Error('no name');
        const editorClassName = `${className}Editor`;
        const Class = backend[editorClassName];
        if (!Class) throw new Error(`no class ${editorClassName}`);
        const data = Class.createData(params);
        this.addModelData(colName, data);
        return data;
    }

    getColName() {
        throw new Error(`${this.constructor.name}.getColName not implemented`);
    }

    static createItemData(data) {
        // debug('Editor.createItemData', data);
        try {
            const params = data['@attributes']
                ? {
                      class: BaseModel.getClassName(data),
                      ...BaseModel.attributes(data),
                      ...data,
                  }
                : data;
            if (!params.class) {
                const name = data['@attributes'] ? BaseModel.getName(data) : data.name;
                throw new Error(`${name}: no class in data`);
            }
            return backend[`${params.class}Editor`].createData(params);
        } catch (err) {
            const name = data['@attributes'] ? BaseModel.getName(data) : data.name;
            err.message = `${name}: ${err.message}`;
            throw err;
        }
    }
}
