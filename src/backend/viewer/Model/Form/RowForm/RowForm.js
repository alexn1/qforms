'use strict';

const path    = require('path');
const qforms = require('../../../../qforms');
const Form   = require('../Form');

class RowForm extends Form {

    constructor(data, parent) {
        super(data, parent);
        // console.log('RowForm.constructor', this.name);
        this.viewFilePath = path.join(
            this.getApp().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FormController/RowFormController/view',
            this.data['@class'] + 'View.ejs'
        );
    }

    static async create(data, page) {
        const name = data['@attributes'].name;
        // console.log('RowForm.create', name);
        const customClassFilePath = path.join(
            page.app.dirPath,
            'pages',
            page.name,
            'forms',
            name,
            name + '.backend.js'
        );
        // console.log('customClassFilePath:', customClassFilePath);
        const content = await qforms.Helper.getFileContent(customClassFilePath);
        if (content) {
            // console.log('content:', content);
            const customClass = eval(content);
            return new customClass(data, page);
        } else {
            return new RowForm(data, page);
        }
    }

    // async fill(context) {
    //     console.log('RowForm.fill', this.constructor.name, this.name);
    //     return super.fill(context);
    // }

}

module.exports = RowForm;
