class MySqlFormWizard extends FormWizard {
    // getQuery() {
    //     console.log('MySqlFormWizard.getQuery');
    //     switch (this.params.className) {
    //         case 'RowForm':
    //             return this.getSingleQuery();
    //         case 'TableForm':
    //         case 'TreeForm':
    //             return this.getMultipleQuery();
    //         default:
    //             throw new Error(`unknown form class: ${this.params.className}`);
    //     }
    // }

    getSingleQuery() {
        const columns = this.tableColumns.map(column => column.name);
        return 'select\n{columns}\nfrom `{table}`\nwhere id = {key}'
            .replace('{table}',   this.tableName)
            .replace('{columns}', columns.map(column => {return '    `' + column + '`';}).join(',\n'));
    }

    getMultipleQuery() {
        const columns = this.tableColumns.map(column => column.name);
        return 'select\n{columns}\nfrom `{table}`\nlimit {offset}, {limit}'
            .replace('{table}',   this.tableName)
            .replace('{columns}', columns.map(column => {return '    `' + column + '`';}).join(',\n'));
    }

    getCountQuery() {
        console.log('MySqlFormWizard.getCountQuery');
        return 'select count(*) from `{table}`'.replace('{table}', this.tableName);
    }
}
