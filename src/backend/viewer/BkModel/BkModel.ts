import { Context } from '../../Context';
import { BaseModel } from '../../BaseModel';
import { BkModelScheme } from '../BkModelScheme/BkModelScheme';

export class BkModel<
    TBkModelData extends BkModelScheme = BkModelScheme,
> extends BaseModel<TBkModelData> {
    deinited = false;
    fillCollections: string[] = [];

    async init(context: Context): Promise<void> {}

    async deinit(): Promise<void> {
        this.checkDeinited();
        this.deinited = true;
    }

    checkDeinited() {
        if (this.deinited) {
            throw new Error(`${this.getName()} is already deinited and cannot be used`);
        }
    }

    async fill(context: Context): Promise<any> {
        // console.debug('Model.fill', this.constructor.name, this.getName());
        const response = {};

        // attributes
        this.fillAttributes(response);

        // collections
        for (const colName of this.fillCollections) {
            await this.fillCollection(response, colName, context);
        }

        return response;
    }

    fillAttributes(response: any): void {
        throw new Error(`${this.constructor.name}.fillAttributes not implemented`);
        /*response.class = this.getClassName();
        for (const name in this.attributes()) {
            response[name] = this.getAttr(name);
        }*/
    }

    isBackOnly(): boolean {
        return this.isAttr('backOnly') && this.getAttr('backOnly') === 'true';
    }

    async fillCollection(response: any, colName: string, context: Context): Promise<void> {
        if (!this[colName]) return;
        response[colName] = [];
        for (const model of this[colName]) {
            if (model.isBackOnly()) {
                continue;
            }
            const itemResponse = await model.fill(context);
            response[colName].push(itemResponse);
        }
    }

    async createColItems(colName: string, context: Context): Promise<void> {
        // console.debug(`Model.createColItems ${this.getName()}.${colName}`);
        for (const itemData of this.getCol(colName)) {
            await this.createColItem(colName, itemData, context);
        }
    }

    async createColItem(colName: string, itemData: any, context: Context): Promise<void> {
        try {
            const model = await this.createChildModel(colName, itemData);
            await model.init(context);
            this[colName].push(model);
        } catch (err) {
            const name = BaseModel.getName(itemData);
            const className = BaseModel.getClassName(itemData);
            err.message = `${className}[${name}]: ${err.message}`;
            throw err;
        }
    }

    async createChildModel(colName: string, itemData: any): Promise<any> {
        // app custom class
        const modelClass = BaseModel.getAttr(itemData, 'modelClass');
        if (modelClass) {
            const CustomClass = global[modelClass];
            if (!CustomClass) throw new Error(`no global class ${modelClass}`);
            return new CustomClass(itemData, this);
        }

        // lib class
        const className = BaseModel.getClassName(itemData);
        const backend = require('../../../backend');
        const Class = backend[`Bk${className}`];
        if (!Class) throw new Error(`no class backend.${className}`);
        return new Class(itemData, this);
    }

    getDirPath(): string | null {
        return null;
    }

    async rpc(name: string, context: Context): Promise<any> {
        throw new Error(`${this.constructor.name}.rpc not implemented`);
    }
}
