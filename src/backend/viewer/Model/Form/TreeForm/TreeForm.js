const path    = require('path');
const Form   = require('../Form');

class TreeForm extends Form {

    static async create(data, parent) {
        return new TreeForm(data, parent);
    }

    async fill(context) {
        console.log('TreeForm.fill', this.constructor.name, this.getName());
        return super.fill(context);
    }
}

module.exports = TreeForm;
