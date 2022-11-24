"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Param = void 0;
const Model_1 = require("../Model");
class Param extends Model_1.Model {
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
exports.Param = Param;
