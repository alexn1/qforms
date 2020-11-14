const path    = require('path');
const qforms = require('../../../../qforms');
const Form   = require('../Form');
const BaseModel = require('../../../../BaseModel');

class RowForm extends Form {

    // constructor(data, parent) {
    //     super(data, parent);
    //     // console.log('RowForm.constructor', this.getFullName());
    // }

    /*getViewFilePath() {
        return path.join(
            this.getApp().hostApp.publicDirPath,
            'viewer/class/Controller/ModelController/FormController/RowFormController/view',
            this.data['@class'] + 'View.ejs'
        );
    }*/

    static async create(data, page) {
        const name = BaseModel.getName(data);
        // console.log('RowForm.create', name);
        const customClassFilePath = path.join(
            page.getApp().getDirPath(),
            'pages',
            page.getName(),
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
    //     console.log('RowForm.fill', this.constructor.name, this.getFullName());
    //     return super.fill(context);
    // }

    isNewMode(context) {
        if (this.isAttr('newMode')) {
            const newMode = this.getAttr('newMode');
            if (newMode ===  'true') return  true;
            if (newMode === 'false') return false;
        }
        return super.isNewMode(context);
    }

}

module.exports = RowForm;
