import { BkApplication } from './viewer/BkModel/BkApplication/BkApplication';
import { BkModelScheme } from './viewer/BkModelScheme/BkModelScheme';

export class BaseModel<TBkModelData extends BkModelScheme = BkModelScheme> {
    constructor(protected data: TBkModelData, private parent?: BaseModel) {
        if (!data) throw new Error(`new ${this.constructor.name}: no data`);
    }

    static getClassName(data: BkModelScheme): string {
        return data['@class'];
    }

    static getAttr(data: BkModelScheme, name: string): string {
        return data['@attributes'][name];
    }

    static getName(data: BkModelScheme): string {
        return BaseModel.getAttr(data, 'name');
    }

    getClassName(): string {
        return this.data['@class'];
    }

    getName(): string {
        return BaseModel.getName(this.data);
    }

    static attributes(data: BkModelScheme) {
        return data['@attributes'];
    }

    attributes() {
        return this.data['@attributes'];
    }

    getAttr(name: string): string {
        if (!this.isAttr(name)) throw new Error(`no attribute '${name}'`);
        return this.data['@attributes'][name];
    }

    setAttr(name: string, value: string): void {
        this.data['@attributes'][name] = value;
    }

    isAttr(name: string): boolean {
        return this.data['@attributes'][name] !== undefined;
    }

    isData(colName: string, name: string): boolean {
        if (!colName) throw new Error('isData: no colName');
        if (!name) throw new Error('isData: no name');
        return !!this.getColItemData(colName, name);
    }

    getData(): TBkModelData {
        return this.data;
    }

    getCol(name: string) {
        if (!name) throw new Error('getCol: no name');
        const arr = this.data[name];
        if (!arr) {
            // console.debug('this.data', this.data);
            throw new Error(`getCol: no col ${name}`);
        }
        return arr;
    }

    getItemNames(colName: string) {
        return this.getCol(colName).map((data: BkModelScheme) => BaseModel.getName(data));
    }

    getColItemData(colName: string, name: string) {
        const data = BaseModel.findColDataByName(this.getCol(colName), name);
        if (data) return data;
        return null;
    }

    removeColData(colName: string, name: string) {
        const col = this.getCol(colName);
        const data = BaseModel.findColDataByName(col, name);
        if (!data) throw new Error(`removeColData: no ${name} in ${colName}`);
        col.splice(col.indexOf(data), 1);
        return data;
    }

    static findColDataByName(col: any[], name: string) {
        return col.find((data) => BaseModel.getName(data) === name);
    }

    addModelData(colName: string, data: BkModelScheme) {
        const name = BaseModel.getName(data);
        if (this.getColItemData(colName, name))
            throw new Error(`${name} already exists in ${colName}`);
        this.getCol(colName).push(data);
    }

    getApp(): BkApplication {
        throw new Error('getApp: not implemented');
    }

    replaceDataColItem(colName: string, oldData: BkModelScheme, newData: BkModelScheme) {
        const dataCol = this.getCol(colName);
        const i = dataCol.indexOf(oldData);
        if (i === -1)
            throw new Error(`replaceDataColItem: no ${BaseModel.getName(oldData)} in ${colName}`);
        dataCol[i] = newData;
        return i;
    }

    getParent<T extends BaseModel = BaseModel>(): T {
        if (!this.parent) throw new Error('no parent');
        return this.parent as T;
    }
}
