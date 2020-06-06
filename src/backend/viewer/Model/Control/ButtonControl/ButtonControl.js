'use strict';

const path    = require('path');
const Control  = require('../Control');

class ButtonControl extends Control {

    constructor(data, parent) {
        super(data, parent);
        this.viewFilePath = path.join(
            this.getApp().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/ControlController/ButtonControlController/view',
            this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
        );
    }

    static async create(data, parent) {
        return new ButtonControl(data, parent);
    }

}

module.exports = ButtonControl;
