const path = require('path');

import Model from '../Model';
import DataSource from '../DataSource/DataSource';
import Action from '../Action/Action';
import Application from '../Application/Application';
import Form from '../Form/Form';
import Context from '../../../Context';

class Page extends Model {
    dataSources: DataSource[];
    actions: Action[];
    forms: Form[];

    constructor(data, parent) {
        super(data, parent);
        this.dataSources = [];
        this.actions     = [];
        this.forms       = [];
    }

    async init(context): Promise<void> {
        await this.createColItems('dataSources', context);
        await this.createColItems('actions', context);
        await this.createColItems('forms', context);
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
        throw new Error(`no rpc ${name}`);
    }

    getApp(): Application {
        return this.parent;
    }

    getTitle(context: Context, response): string {
        return this.getAttr('caption');
    }
    getForm(name): Form {
        return this.forms.find(form => form.getName() === name);
    }

    getDataSource(name): DataSource {
        return this.dataSources.find(dataSource => dataSource.getName() === name);
    }
}

export = Page;
