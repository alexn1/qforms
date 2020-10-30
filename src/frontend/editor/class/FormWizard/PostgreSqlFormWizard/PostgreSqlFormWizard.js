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
        console.log('PostgreSqlFormWizard.getSingleQuery');
        const columns = this.getColumns().map(column => column.name);
        return 'select\n{columns}\nfrom "{table}"\nwhere id = {key}'
            .replace('{table}',   this.tableName)
            .replace('{columns}', columns.map(column => `    "${column}"`).join(',\n'));
    }

    getMultipleQuery() {
        console.log('PostgreSqlFormWizard.getMultipleQuery');
        const columns = this.getColumns().map(column => column.name);
        const _columns = columns.map(column => `    "${column}"`).join(',\n');
        return `select\n${_columns}\nfrom "${this.tableName}"\nlimit {limit}\noffset {offset}`;
    }

    getCountQuery() {
        console.log('PostgreSqlFormWizard.getCountQuery');
        return `select count(*) from "${this.tableName}"`;
    }
}
