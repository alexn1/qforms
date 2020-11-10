const path    = require('path');
const Control  = require('../Control');

class ButtonControl extends Control {

    static async create(data, parent) {
        return new ButtonControl(data, parent);
    }

    getViewFilePath() {
        return path.join(
            this.getApp().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/ControlController/ButtonControlController/view',
            this.parent.data['@class'] + this.data['@class'] + 'View.ejs'
        );
    }

}

module.exports = ButtonControl;
