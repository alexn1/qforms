"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorHelper = void 0;
const MySqlFormWizard_1 = require("./FormWizard/MySqlFormWizard/MySqlFormWizard");
const PostgreSqlFormWizard_1 = require("./FormWizard/PostgreSqlFormWizard/PostgreSqlFormWizard");
class EditorHelper {
    static create(params) {
        console.debug('FormWizard.create', params);
        switch (params.model.database.getClassName()) {
            case 'MySqlDatabase':
                return new MySqlFormWizard_1.MySqlFormWizard(params);
            case 'PostgreSqlDatabase':
                return new PostgreSqlFormWizard_1.PostgreSqlFormWizard(params);
            default:
                throw new Error(`unknown database class: ${params.model.database.getClassName()}`);
        }
    }
}
exports.EditorHelper = EditorHelper;
