import { EventEmitter } from '../EventEmitter';
import { DataSource } from './DataSource/DataSource';
import { Helper } from '../../../common/Helper';
import { ModelData } from '../../../common/ModelData/ModelData';

export class Model<TModelData extends ModelData = ModelData> extends EventEmitter {
    deinited: boolean = false;
    dataSources: DataSource[];

    constructor(private data: TModelData, private parent?: Model) {
        if (!data.name) throw new Error(`name required for model`);
        super();
    }

    init() {}

    deinit() {
        if (this.deinited) throw new Error(`${this.getFullName()}: model already deinited`);
        this.deinited = true;
    }

    static getAttr(data: ModelData, name: string): string {
        // @ts-ignore
        return data[name];
    }

    static getCol(data: ModelData, name: string) {
        // @ts-ignore
        return data[name];
    }

    static getName(data: ModelData) {
        return Model.getAttr(data, 'name');
    }

    static getClassName(data: ModelData) {
        return Model.getAttr(data, 'class');
    }

    isAttr(name: string) {
        return this.data.hasOwnProperty(name);
    }

    getAttr(name: string): string {
        // @ts-ignore
        return this.data[name];
    }

    getCol(name: string) {
        // @ts-ignore
        return this.data[name];
    }

    getClassName(): string {
        return this.getAttr('class');
    }

    getName(): string {
        return this.getAttr('name');
    }

    getFullName(): string {
        if (this.parent) {
            return `${this.parent.getFullName()}.${this.getName()}`;
        }
        return this.getName();
    }

    getCaption(): string {
        return this.getAttr('caption');
    }

    findDataSource(name: string): DataSource | undefined {
        return this.dataSources.find((dataSource) => dataSource.getName() === name);
    }

    getDataSource(name: string): DataSource {
        const ds = this.findDataSource(name);
        if (!ds) throw new Error(`${this.getFullName()}: no data source ${name}`);
        return ds;
    }

    createDataSources() {
        for (const data of this.data.dataSources!) {
            try {
                const Class = Helper.getGlobalClass(data.class);
                if (!Class) throw new Error(`no ${data.class} class`);
                const dataSource = new Class(data, this);
                dataSource.init();
                this.dataSources.push(dataSource);
            } catch (err) {
                err.message = `${this.getFullName()}.${data.name}: ${err.message}`;
                throw err;
            }
        }
    }

    deinitDataSources() {
        for (const dataSource of this.dataSources) {
            dataSource.deinit();
        }
    }

    hasActions() {
        return this.data.actions!.length > 0;
    }

    getParent<TModel extends Model = Model>(): TModel {
        if (!this.parent) throw new Error('np parent');
        return this.parent as TModel;
    }

    getData(): TModelData {
        return this.data;
    }
}
