"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkParam = void 0;
const BkModel_1 = require("../BkModel");
class BkParam extends BkModel_1.BkModel {
    getValue() {
        // console.log('Param.getValue', this.getName());
        const value = this.getAttr('value');
        /* const app = this.getApp();
        return value.replace(/\{([@\w.]+)\}/g, (text, name) => {
            return app.getEnvVarValue(name);
        }); */
        try {
            return JSON.parse(value);
        }
        catch (err) {
            err.message = `param parse error: ${err.message}, ${this.getName()} = ${value}`;
            throw err;
        }
    }
    getApp() {
        return this.parent.getApp();
    }
}
exports.BkParam = BkParam;
