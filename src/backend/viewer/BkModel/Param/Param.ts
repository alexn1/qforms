import { BkModel } from '../BkModel';
import { BkApplication } from '../Application/Application';

export class BkParam extends BkModel {
    getValue() {
        // console.log('Param.getValue', this.getName());
        const value = this.getAttr('value');
        const app = this.getApp();
        return value.replace(/\{([@\w\.]+)\}/g, (text, name) => {
            return app.getEnvVarValue(name);
        });
    }

    getApp(): BkApplication {
        return this.parent.getApp();
    }
}
