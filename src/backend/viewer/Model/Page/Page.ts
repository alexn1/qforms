const path = require('path');

import Model from '../Model';
import DataSource from '../DataSource/DataSource';
import Action from '../Action/Action';
import Application from '../Application/Application';

class Page extends Model {
    dataSources: DataSource[];
    actions: Action[];
    forms: any[];

    constructor(data, parent) {
        super(data, parent);
        this.dataSources = [];
        this.actions     = [];
        this.forms       = [];
    }

    async init(): Promise<void> {
        await this.createColItems('dataSources');
        await this.createColItems('actions');
        await this.createColItems('forms');
    }

    getDirPath(): string {
        return path.join(this.parent.getDirPath(), 'pages', this.getName());
    }

    async fill(context): Promise<any> {
        // console.log('Page.fill', this.constructor.name, this.getFullName());
        const response = await super.fill(context);
        await this.fillCollection(response, 'dataSources', context);
        await this.fillCollection(response, 'actions', context);
        await this.fillCollection(response, 'forms', context);

        delete response.formatVersion;
        delete response.width;
        delete response.height;
        response.newMode = !!context.newMode;
        return response;
    }

    async rpc(name, context): Promise<any> {
        console.log('Page.rpc', name, context.params);
        if (this[name]) return await this[name](context);
        return {errorMessage: `no rpc ${name}`};
    }

    getApp(): Application {
        return this.parent;
    }

    getTitle(): string {
        return this.getAttr('caption');
    }
    getForm(name) {
        return this.forms.find(form => form.getName() === name);
    }

    getDataSource(name): DataSource {
        return this.dataSources.find(dataSource => dataSource.getName() === name);
    }
}

export = Page;
