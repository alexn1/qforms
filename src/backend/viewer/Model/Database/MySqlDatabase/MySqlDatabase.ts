const mysql = require('mysql');
import Database from '../Database';

class MySqlDatabase extends Database {
    pool: any;
    constructor(data, parent?) {
        super(data, parent);
        //console.log('new MySqlDatabase');
        this.pool = null;
    }

    /*static async create(data, parent) {
        //console.log('MySqlDatabase.create');
        return new MySqlDatabase(data, parent);
    }*/

    async deinit(): Promise<void> {
        console.log('MySqlDatabase.deinit: ' + this.getName());
        if (this.pool !== null) {
            return new Promise(resolve => {
                this.pool.end(() => {
                    resolve();
                });
            });
        }
    }

    _getPool() {
        //console.log('MySqlDatabase._getPool');
        if (this.pool === null) {
            //console.log('creating connection pool for: ' + database);
            this.pool = mysql.createPool(this.getConfig());
        }
        //console.log('pool connections count: ' + this.pool._allConnections.length);
        return this.pool;
    }

    getConfig(): any {
        console.log('MySqlDatabase.getConfig');
        return {
            ...super.getConfig(),
            queryFormat: MySqlDatabase.queryFormat
        };
    }

    getDefaultPort(): number {
        return 3306;
    }

    getConnection(context): Promise<any> {
        //console.log('MySqlDatabase.getConnection');
        return new Promise((resolve, reject) => {
            if (context.connections[this.getName()] === undefined) {
                this._getPool().getConnection((err, cnn) => {
                    if (err) {
                        reject(err);
                    } else {
                        context.connections[this.getName()] = cnn;
                        resolve(context.connections[this.getName()]);
                    }
                });
            } else {
                resolve(context.connections[this.getName()]);
            }
        });
    }

    async queryRows(context, query, params): Promise<any[]> {
        console.log('MySqlDatabase.queryRows', query, params);
        Database.checkParams(query, params);
        const nest = true;
        const cnn = await this.getConnection(context);
        return new Promise((resolve, reject) => {
            cnn.query({sql: query, typeCast: MySqlDatabase.typeCast, nestTables: nest}, params, (err, result, fields) => {
                if (err) {
                    reject(err);
                } else {
                    if (nest) {
                        const rows = this._getRows(result, fields);   // for duplicate column names
                        resolve(rows);
                    } else {
                        resolve(result);
                    }
                }
            });
        });
    }

    async queryResult(context, query, params): Promise<any> {
        console.log('MySqlDatabase.queryResult', query, params);
        Database.checkParams(query, params);
        const nest = false;
        const cnn = await this.getConnection(context);
        return new Promise((resolve, reject) => {
            cnn.query({sql: query, typeCast: MySqlDatabase.typeCast, nestTables: nest}, params, (err, result, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    _getRows(result, fields): any[] {
        //console.log('MySqlDatabase._getRows');
        const fieldCount = {};
        for (let j = 0; j < fields.length; j++) {
            const f = fields[j];
            if (!fieldCount[f.name]) {
                fieldCount[f.name] = 0;
            }
            fieldCount[f.name]++;
            f.numb = fieldCount[f.name] - 1;
        }
        const rows = [];
        for (let i = 0; i < result.length; i++) {
            const r = result[i];
            const row = {};
            for (let j=0; j < fields.length; j++) {
                const f = fields[j];
                const column = f.name + (f.numb > 0 ? f.numb : '');
                row[column] = r[f.table][f.name];
            }
            rows.push(row);
        }
        return rows;
    }

    beginTransaction(cnn): Promise<void> {
        console.log('MySqlDatabase.beginTransaction');
        return new Promise((resolve, reject) => {
            cnn.beginTransaction(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    commit(cnn): Promise<void> {
        console.log('MySqlDatabase.commit');
        return new Promise((resolve, reject) => {
            cnn.commit(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    rollback(cnn, err): Promise<void> {
        console.log('MySqlDatabase.rollback:', err.message);
        return new Promise((resolve, reject) => {
            cnn.rollback(() => {
                // reject(err);
                resolve();
            });
        });
    }

    static queryFormat(query, params = {}): string {
        console.log('MySqlDatabase.queryFormat', query, params);
        const sql = query.replace(/\{([\w\.@]+)\}/g, (text, name) => {
            if (params.hasOwnProperty(name)) {
                return mysql.escape(params[name]);
            }
            throw new Error(`no query param: ${name}`);
        });
        console.log('real db sql: ' + sql);
        return sql;
    }

    static typeCast(field, next) {
        if (
            field.type === 'DATE'      ||
            field.type === 'DATETIME'  ||
            field.type === 'TIME'      ||
            field.type === 'TIMESTAMP'
        ) {
            return field.string();
        } else {
            return next();
        }
    }

    async getTableList(): Promise<string[]> {
        console.log('MySqlDatabase.getTableList');
        const config = this.getConfig();
        return new Promise((resolve, reject) => {
            const cnn = mysql.createConnection(config);
            cnn.connect();
            cnn.query('show tables', (err, rows, fields) => {
                cnn.end();
                if (err) {
                    reject(err);
                } else {
                    //console.log('rows:', rows);
                    const tables = rows.map(row => row[fields[0].name]);
                    console.log('tables:', tables);
                    resolve(tables);
                }
            });
        });
    }

    async getTableInfo(table) {
        console.log('MySqlDatabase.getTableInfo:', table);
        const config = this.getConfig();
        return new Promise((resolve, reject) => {
            const cnn = mysql.createConnection(config);
            cnn.connect();
            const query =
                `SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, COLUMN_KEY, COLUMN_DEFAULT, EXTRA, COLUMN_COMMENT \
FROM information_schema.columns \
WHERE table_schema = '${config.database}' and table_name = '${table}'`;
            cnn.query(query, (err, rows) => {
                cnn.end();
                if (err) {
                    reject(err);
                } else {
                    const tableInfo = rows.map(row => {
                        // console.log('row:', row);
                        return {
                            name    : row.COLUMN_NAME,
                            type    : this.getColumnTypeByDataType(row.COLUMN_TYPE),
                            key     : row.COLUMN_KEY === 'PRI',
                            auto    : row.EXTRA === 'auto_increment',
                            nullable: row.IS_NULLABLE === 'YES',
                            comment : row.COLUMN_COMMENT,
                            dbType  : row.COLUMN_TYPE
                            // COLUMN_TYPE   : row.COLUMN_TYPE,
                            // COLUMN_DEFAULT: row.COLUMN_DEFAULT,
                            // EXTRA         : row.EXTRA,
                        };
                    });
                    console.log('tableInfo:', tableInfo);
                    resolve(tableInfo);
                }
            });
        });
    }

    getColumnTypeByDataType(dataType): string {
        switch (dataType) {
            case 'int(10) unsigned':
                return 'number';
            case 'varchar(255)':
                return 'string';
            default:
                return null;
        }
    }

    async insertRow(context, table, autoColumns, values) {
        console.log(`MySqlDatabase.insertRow ${table}`, autoColumns, values);
        if (autoColumns.length > 1) throw new Error('mysql does not support more than one auto increment column');

        const query = this.getInsertQuery(table, values);
        // console.log('insert query:', query, values);

        const result = await this.queryResult(context, query,  values);
        // console.log('insert result:', result);
        if (autoColumns.length === 1) {
            if (!result.insertId) throw new Error('no insertId');
            return {
                [autoColumns[0]]: result.insertId,
                ...values
            };
        }
        return {
            ...values
        };
        /*const key = JSON.stringify([result.insertId]);
        return key;*/
        /*
        const _row = {};
        const files = {};
        for (const column in row) {
            if (row[column] instanceof Object) {
                _row[column] = '{' + column + '}';
                files[column] = row[column];
                console.error(row[column]);
            } else if (this.table.columns[column] && !this.table.columns[column].isAuto()) {
                _row[column] = row[column];
            }
        }
        console.log('_row:', _row);
        */

        /*
        const buffers = {};
        const names = Object.keys(files);
        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            const file = files[name];
            const buffer = await this.getBuffer(context, file);
            buffers[name] = buffer;
        }
        */
    }
}

export = MySqlDatabase;
