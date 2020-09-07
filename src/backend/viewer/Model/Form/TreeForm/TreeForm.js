'use strict';

const path    = require('path');
const Form   = require('../Form');

class TreeForm extends Form {

    constructor(data, parent) {
        super(data, parent);
        this.viewFilePath = this.getViewFilePath();
    }

    static async create(data, parent) {
        return new TreeForm(data, parent);
    }

    getViewFilePath() {
        return path.join(
            this.getApp().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FormController/TreeFormController/view',
            this.data['@class'] + 'View.ejs'
        );
    }

    async fill(context) {
        console.log('TreeForm.fill', this.constructor.name, this.name);
        return super.fill(context);
    }
}

module.exports = TreeForm;
