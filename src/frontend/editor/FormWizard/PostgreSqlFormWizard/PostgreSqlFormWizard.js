class PostgreSqlFormWizard extends FormWizard {

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
