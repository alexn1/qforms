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
            `${name}.backend.js`
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
        this.createCollections  = ['dataSources', 'forms'];
        this.fillCollections    = ['dataSources', 'forms'];
        this.dataSources        = {};
        this.forms              = {};
    }

    getCustomViewFilePath() {
        return path.join(this.getDirPath(), `${this.getName()}.ejs`);
    }

    getViewFilePath() {
        return path.join(
            this.getApp().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/PageController/view',
            this.data['@class'] + 'View.ejs'
        );
    }

    getDirPath() {
        return path.join(this.parent.getDirPath(), 'pages', this.getName());
    }

    async fill(context) {
        // console.log('Page.fill', this.constructor.name, this.getFullName());
        const data = await super.fill(context);
        delete data.formatVersion;
        delete data.width;
        delete data.height;
        data.newMode = !!context.newMode;
        return data;
    }

    async rpc(context, name, params) {
        console.log('Page.rpc', name, params);
        if (this[name]) return await this[name](params);
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
