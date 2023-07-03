"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkParam = void 0;
const BkModel_1 = require("../BkModel");
class BkParam extends BkModel_1.BkModel {
    getValue() {
        // console.debug('Param.getValue', this.getName());
        const value = this.getAttr('value');
        /* const app = this.getApp();
        return value.replace(/\{([@\w.]+)\}/g, (text, name) => {
            return app.getEnvVarValue(name);
        }); */
        try {
            return eval(value);
        }
        catch (err) {
            err.message = `eval error: ${err.message}, ${this.getName()} = ${value}`;
            throw err;
        }
    }
    getApp() {
        return this.getParent().getApp();
    }
}
exports.BkParam = BkParam;
