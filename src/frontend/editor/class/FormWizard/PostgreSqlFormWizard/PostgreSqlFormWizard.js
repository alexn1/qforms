'use strict';
class PostgreSqlFormWizard extends FormWizard {
    // getQuery() {
    //     console.log('PostgreSqlFormWizard.getQuery');
    //     switch (this.params.className) {
    //         case 'RowForm':
    //             return this.getSingleQuery();
    //         case 'TableForm':
    //         case 'TreeForm':
    //                 return this.getMultipleQuery();
    //         default:
    //             throw new Error(`unknown form class: ${this.params.className}`);
    //     }
    // }

    getSingleQuery() {
        const columns = this.tableColumns.map(column => column.name);
        console.log('PostgreSqlFormWizard.getSingleQuery');
        return 'select\n{columns}\nfrom "{table}"\nwhere id = {key}'
            .replace('{table}',   this.tableName)
            .replace('{columns}', columns.map(column => `    "${column}"`).join(',\n'));
    }

    getMultipleQuery() {
        const columns = this.tableColumns.map(column => column.name);
        console.log('PostgreSqlFormWizard.getMultipleQuery');
        const _columns = columns.map(column => `    "${column}"`).join(',\n');
        return `select\n${_columns}\nfrom "${this.tableName}"\nlimit {limit}\noffset {offset}`;
    }

    getCountQuery() {
        console.log('PostgreSqlFormWizard.getCountQuery');
        return `select count(*) from "${this.tableName}"`;
    }
}
