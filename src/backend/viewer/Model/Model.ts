import Context from "../../Context";
import BaseModel from '../../BaseModel';

const backend  = require('../../../backend');

class Model extends BaseModel {
    fillCollections: any[];
    constructor(data: any, parent?: any) {
        super(data, parent);
        this.fillCollections = [];
    }

    async init(context: Context) {

    }

    async fill(context: Context): Promise<any> {
        // console.log('Model.fill', this.constructor.name, this.getName());
        const response = {};
        this.fillAttributes(response);
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

    async fillCollection(response: any, colName: string, context: Context) {
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

    async createColItems(colName: string, context: Context) {
        // console.log(`Model.createColItems ${this.getName()}.${colName}`);
        for (const data of this.getCol(colName)) {
            await this.createColItem(colName, data, context);
        }
    }

    async createColItem(colName: string, data: any, context: Context) {
        try {
            const model = await this.createChildModel(colName, data);
            await model.init(context);
            this[colName].push(model);
        } catch (err) {
            const name = BaseModel.getName(data);
            const className = BaseModel.getClassName(data);
            err.message = `${className}[${name}]: ${err.message}`;
            throw err;
        }
    }

    async getChildModelCustomClass(model: Model, colName: string, data: any) {
        /*let CustomClass = null;
        const dirPath = this.getDirPath();
        if (dirPath) {
            const modelName = BaseModel.getName(data);
            const customClassFilePath = path.join(dirPath, colName, modelName, 'Model.back.js');
            const exists = await Helper.exists(customClassFilePath);
            if (exists) {
                CustomClass = require(customClassFilePath);
            }
        }
        return CustomClass;*/
        return this.getParent() ? this.getParent().getChildModelCustomClass(model, colName, data) : null;
    }

    async createChildModel(colName: string, data: any) {
        const CustomClass = await this.getChildModelCustomClass(this, colName, data);
        const className = BaseModel.getClassName(data);
        const Class = CustomClass ? CustomClass : backend[className];
        return new Class(data, this);
    }

    getDirPath(): string {
        return null;
    }

    async rpc(name: string, context: Context) {
        throw new Error(`${this.constructor.name}.rpc not implemented`);
    }

}

export = Model;
