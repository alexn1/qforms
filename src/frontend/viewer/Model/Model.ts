import { EventEmitter } from '../EventEmitter';
import { DataSource } from './DataSource/DataSource';
import { Helper } from '../../common/Helper';

export class Model extends EventEmitter {
    deinited: boolean = false;
    dataSources: any[];

    constructor(public data, public parent = null) {
        if (!data.name) throw new Error(`${data.class} no name`);
        super();
    }

    init() {}

    deinit() {
        if (this.deinited) throw new Error(`${this.getFullName()}: model already deinited`);
        this.deinited = true;
    }

    static getAttr(data, name: string) {
        return data[name];
    }

    static getCol(data, name: string) {
        return data[name];
    }

    static getName(data) {
        return Model.getAttr(data, 'name');
    }

    static getClassName(data) {
        return Model.getAttr(data, 'class');
    }

    isAttr(name: string) {
        // return this.data[name] !== undefined;
        return this.data.hasOwnProperty(name);
    }

    getAttr(name: string) {
        return this.data[name];
    }

    getCol(name: string) {
        return this.data[name];
    }

    getClassName() {
        return this.getAttr('class');
    }

    getName() {
        return this.getAttr('name');
    }

    getFullName() {
        if (this.parent) {
            return `${this.parent.getFullName()}.${this.getName()}`;
        }
        return this.getName();
    }

    getCaption(): string {
        return this.getAttr('caption');
    }

    getDataSource(name: string): DataSource {
        return this.dataSources.find((dataSource) => dataSource.getName() === name);
    }

    createDataSources() {
        for (const data of this.data.dataSources) {
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
        return this.data.actions.length > 0;
    }

    getParent(): Model {
        return this.parent;
    }

    getData() {
        return this.data;
    }
}
