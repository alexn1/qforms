"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySqlFormWizard = void 0;
const FormWizard_1 = require("../FormWizard");
class MySqlFormWizard extends FormWizard_1.FormWizard {
    getSingleQuery() {
        const columns = this.tableColumns.map((column) => column.name);
        return 'select\n{columns}\nfrom `{table}`\nwhere id = {key}'
            .replace('{table}', this.tableName)
            .replace('{columns}', columns
            .map((column) => {
            return '    `' + column + '`';
        })
            .join(',\n'));
    }
    getMultipleQuery() {
        const columns = this.tableColumns.map((column) => column.name);
        return 'select\n{columns}\nfrom `{table}`\nlimit {offset}, {limit}'
            .replace('{table}', this.tableName)
            .replace('{columns}', columns
            .map((column) => {
            return '    `' + column + '`';
        })
            .join(',\n'));
    }
    getCountQuery() {
        console.debug('MySqlFormWizard.getCountQuery');
        return 'select count(*) from `{table}`'.replace('{table}', this.tableName);
    }
}
exports.MySqlFormWizard = MySqlFormWizard;
