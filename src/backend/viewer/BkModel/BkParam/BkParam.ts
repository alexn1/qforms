import { BkModel } from '../BkModel';
import { BkApplication } from '../BkApplication/BkApplication';

export class BkParam extends BkModel {
    getValue() {
        // console.log('Param.getValue', this.getName());
        const value = this.getAttr('value');
        /* const app = this.getApp();
        return value.replace(/\{([@\w.]+)\}/g, (text, name) => {
            return app.getEnvVarValue(name);
        }); */

        try {
            return JSON.parse(value);
        } catch (err) {
            err.message = `param parse error: ${err.message}, ${this.getName()} = ${value}`;
            throw err;
        }
    }

    getApp(): BkApplication {
        return this.parent.getApp();
    }
}
