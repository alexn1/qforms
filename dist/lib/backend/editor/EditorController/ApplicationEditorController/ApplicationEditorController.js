"use strict";
const path = require('path');
const VisualEditorController = require('../VisualEditorController');
class ApplicationEditorController extends VisualEditorController {
    /*constructor(...args) {
        super(...args);
    }*/
    async save(params) {
        const appEditor = await this.createApplicationEditor();
        appEditor.setAttr(params.attr, params.value);
        await appEditor.save();
        return null;
    }
    async getView(params) {
        const result = await super.getView(params);
        if (params.view === 'VisualView.html') {
            const appEditor = await this.createApplicationEditor();
            result.data.js = await appEditor.getCustomFile('js');
        }
        return result;
    }
    /*async saveView(params) {
        const appEditor = await this.createApplicationEditor();
        switch (params.view) {
            case 'ejs':
                await appEditor.saveCustomFile('ejs', params.text);
                return null;
            case 'css':
                await appEditor.saveCustomFile('css', params.text);
                return null;
            default:
                throw new Error(`unknown view: ${params.view}`);
        }
    }*/
    async createController(params) {
        const appEditor = await this.createApplicationEditor();
        const js = await appEditor.createJs(params);
        return { js };
    }
    async createModelBackJs(params) {
        const appEditor = await this.createApplicationEditor();
        const js = await appEditor.createModelBackJs(params);
        return { js };
    }
    async saveController(params) {
        const appEditor = await this.createApplicationEditor();
        await appEditor.saveCustomFile('js', params.text);
        return null;
    }
}
module.exports = ApplicationEditorController;
