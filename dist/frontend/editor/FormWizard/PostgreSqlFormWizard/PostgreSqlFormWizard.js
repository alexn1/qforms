"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgreSqlFormWizard = void 0;
const FormWizard_1 = require("../FormWizard");
class PostgreSqlFormWizard extends FormWizard_1.FormWizard {
    getSingleQuery() {
        console.debug('PostgreSqlFormWizard.getSingleQuery');
        const columns = this.getColumns().map((column) => column.name);
        return 'select\n{columns}\nfrom "{table}"\nwhere id = {key}'
            .replace('{table}', this.tableName)
            .replace('{columns}', columns.map((column) => `    "${column}"`).join(',\n'));
    }
    getMultipleQuery() {
        console.debug('PostgreSqlFormWizard.getMultipleQuery');
        const columns = this.getColumns().map((column) => column.name);
        const _columns = columns.map((column) => `    "${column}"`).join(',\n');
        return `select\n${_columns}\nfrom "${this.tableName}"\norder by "id"\nlimit {limit}\noffset {offset}`;
    }
    getCountQuery() {
        console.debug('PostgreSqlFormWizard.getCountQuery');
        return `select count(*) from "${this.tableName}"`;
    }
}
exports.PostgreSqlFormWizard = PostgreSqlFormWizard;
