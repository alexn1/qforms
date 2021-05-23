import Model from '../Model';
import Application from '../Application/Application';

class Param extends Model {
    getValue() {
        // console.log('Param.getValue', this.getName());
        const value = this.getAttr('value');
        const app = this.getApp();
        return value.replace(/\{([@\w\.]+)\}/g, (text, name) => {
            return app.getEnvVarValue(name);
        });
    }

    getApp(): Application {
        return this.parent.getApp();
    }

}

export = Param;
