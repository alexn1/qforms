import { BkModel } from '../BkModel';
import { BkApplication } from '../BkApplication/BkApplication';
import { ParamScheme } from '../../../common/Scheme/ParamScheme';
import { Context } from '../../../Context';

export class BkParam extends BkModel<ParamScheme> {
    getValue(context?: Context) {
        // debug('Param.getValue', this.getName());
        const value = this.getAttr('value');
        /* const app = this.getApp();
        return value.replace(/\{([@\w.]+)\}/g, (text, name) => {
            return app.getEnvVarValue(name);
        }); */

        try {
            return eval(value);
        } catch (err) {
            err.message = `eval error: ${err.message}, ${this.getName()} = ${value}`;
            throw err;
        }
    }

    getApp(): BkApplication {
        return this.getParent().getApp();
    }
}
