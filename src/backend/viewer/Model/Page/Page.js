const path          = require('path');
// const fs            = require('fs');
// const child_process = require('child_process');
// const stream        = require('stream');
const Model  = require('../Model');
// const BaseModel = require('../../../BaseModel');
// const Helper = require('../../../Helper');      // for eval

class Page extends Model {

    constructor(data, parent) {
        super(data, parent);
        this.dataSources = [];
        this.actions     = [];
        this.forms       = [];
    }

    async init() {
        await this.createColItems('dataSources');
        await this.createColItems('actions');
        await this.createColItems('forms');
    }

    getDirPath() {
        return path.join(this.parent.getDirPath(), 'pages', this.getName());
    }

    async fill(context) {
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

    async rpc(name, context) {
        console.log('Page.rpc', name, context.params);
        if (this[name]) return await this[name](context);
        return {errorMessage: `no rpc ${name}`};
    }

    getApp() {
        return this.parent;
    }

    getTitle() {
        return this.getAttr('caption');
    }
    getForm(name) {
        return this.forms.find(form => form.getName() === name);
    }

    getDataSource(name) {
        return this.dataSources.find(dataSource => dataSource.getName() === name);
    }
}

module.exports = Page;
