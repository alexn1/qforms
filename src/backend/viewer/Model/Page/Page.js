const path          = require('path');
// const fs            = require('fs');
// const child_process = require('child_process');
// const stream        = require('stream');
const qforms = require('../../../qforms');
const Model  = require('../Model');
const BaseModel = require('../../../BaseModel');
const Helper = require('../../../Helper');      // for eval

class Page extends Model {

    static async create(data, parent) {
        const name = BaseModel.getName(data);
        const customClassFilePath = path.join(
            parent.getDirPath(),
            'pages',
            name,
            'Model.back.js'
        );
        const content = await qforms.Helper.getFileContent(customClassFilePath);
        if (content) {
            const customClass = eval(content);
            return new customClass(data, parent);
        } else {
            return new Page(data, parent);
        }
    }

    constructor(data, parent) {
        super(data, parent);
        this.dataSources = {};
        this.forms       = {};
    }

    async init() {
        await this.createCollectionItems('dataSources');
        await this.createCollectionItems('forms');
    }

    getDirPath() {
        return path.join(this.parent.getDirPath(), 'pages', this.getName());
    }

    async fill(context) {
        // console.log('Page.fill', this.constructor.name, this.getFullName());
        const response = {
            class: this.getClassName()
        };
        // fill attributes
        for (const name in this.attributes()) {
            response[name] = this.getAttr(name);
        }
        await this.fillCollectionDefaultFirst(response, 'dataSources', context);
        await this.fillCollection(response, 'forms', context);

        delete response.formatVersion;
        delete response.width;
        delete response.height;
        response.newMode = !!context.newMode;
        return response;
    }

    async rpc(name, context) {
        console.log('Page.rpc', name);
        if (this[name]) return await this[name](context);
        return {errorMessage: `no rpc ${name}`};
    }

    getApp() {
        return this.parent;
    }

    async respond(res, context) {
        const data = await this.fill(context);
        await res.json({page: data});
    }
    getTitle(context, data) {
        return this.getAttr('caption');
    }
}

module.exports = Page;
