const Model = require('../Model');

class Param extends Model {

    getValue() {
        // console.log('Param.getValue', this.getName());
        const value = this.getAttr('value');
        const app = this.getApp();
        return value.replace(/\{([@\w\.]+)\}/g, (text, name) => {
            return app.getEnvVarValue(name);
        });
    }

    getApp() {
        return this.parent.getApp();
    }

}

module.exports = Param;
