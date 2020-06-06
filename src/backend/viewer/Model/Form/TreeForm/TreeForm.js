'use strict';

const path    = require('path');
const Form   = require('../Form');

class TreeForm extends Form {

    constructor(data, parent) {
        super(data, parent);
        this.viewFilePath = path.join(
            this.getApp().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FormController/TreeFormController/view',
            this.data['@class'] + 'View.ejs'
        );
    }

    static async create(data, parent) {
        return new TreeForm(data, parent);
    }

    async fill(context) {
        console.log('TreeForm.fill', this.constructor.name, this.name);
        return super.fill(context);
    }
}

module.exports = TreeForm;
