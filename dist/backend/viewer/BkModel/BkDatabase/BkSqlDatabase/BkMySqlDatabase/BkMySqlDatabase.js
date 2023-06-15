"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkMySqlDatabase = void 0;
const mysql_1 = require("mysql");
const BkSqlDatabase_1 = require("../BkSqlDatabase");
class BkMySqlDatabase extends BkSqlDatabase_1.BkSqlDatabase {
    constructor() {
        super(...arguments);
        this.pool = null;
    }
    /* constructor(data, parent?) {
        super(data, parent);
        console.log('new MySqlDatabase');
    } */
    async deinit() {
        console.log(`MySqlDatabase.deinit: ${this.getName()}`);
        await super.deinit();
        if (this.pool !== null) {
            await new Promise((resolve) => {
                this.pool.end(() => {
                    resolve();
                });
            });
            this.pool = null;
        }
    }
    getPool() {
        //console.log('MySqlDatabase.getPool');
        if (!this.pool) {
            //console.log('creating connection pool for: ' + database);
            this.pool = (0, mysql_1.createPool)(this.getConfig());
        }
        //console.log('pool connections count: ' + this.pool._allConnections.length);
        return this.pool;
    }
    getConfig() {
        console.log('MySqlDatabase.getConfig');
        return Object.assign(Object.assign({}, super.getConfig()), { queryFormat: BkMySqlDatabase.queryFormat });
    }
    /*getDefaultPort(): number {
        return 3306;
    }*/
    static async Pool_getConnection(pool) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, cnn) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(cnn);
                }
            });
        });
    }
    async queryRows(context, query, params = null) {
        console.log('MySqlDatabase.queryRows', query, params);
        BkSqlDatabase_1.BkSqlDatabase.checkParams(query, params);
        const nest = true;
        const cnn = await this.getConnection(context);
        return new Promise((resolve, reject) => {
            cnn.query({ sql: query, typeCast: BkMySqlDatabase.typeCast, nestTables: nest }, params, (err, result, fields) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (nest) {
                        const rows = this._getRows(result, fields); // for duplicate column names
                        resolve(rows);
                    }
                    else {
                        resolve(result);
                    }
                }
            });
        });
    }
    async queryResult(context, query, params = null) {
        console.log('MySqlDatabase.queryResult', query, params);
        BkSqlDatabase_1.BkSqlDatabase.checkParams(query, params);
        const nest = false;
        const cnn = await this.getConnection(context);
        return new Promise((resolve, reject) => {
            cnn.query({ sql: query, typeCast: BkMySqlDatabase.typeCast, nestTables: nest }, params, (err, result, fields) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    _getRows(result, fields) {
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
            for (let j = 0; j < fields.length; j++) {
                const f = fields[j];
                const column = f.name + (f.numb > 0 ? f.numb : '');
                row[column] = r[f.table][f.name];
            }
            rows.push(row);
        }
        return rows;
    }
    begin(context) {
        console.log('MySqlDatabase.begin');
        const cnn = this.getConnection(context);
        return new Promise((resolve, reject) => {
            cnn.beginTransaction((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    commit(context) {
        console.log('MySqlDatabase.commit');
        const cnn = this.getConnection(context);
        return new Promise((resolve, reject) => {
            cnn.commit((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    rollback(context, err) {
        console.log('MySqlDatabase.rollback:', this.getName(), err.message);
        const cnn = this.getConnection(context);
        return new Promise((resolve, reject) => {
            cnn.rollback(() => {
                resolve();
            });
        });
    }
    static queryFormat(query, params = {}) {
        console.log('MySqlDatabase.queryFormat', query, params);
        const sql = query.replace(/\{([\w\.@]+)\}/g, (text, name) => {
            if (params.hasOwnProperty(name)) {
                return (0, mysql_1.escape)(params[name]);
            }
            throw new Error(`no query param: ${name}`);
        });
        console.log('real db sql: ' + sql);
        return sql;
    }
    static typeCast(field, next) {
        if (['DATE', 'DATETIME', 'TIME', 'TIMESTAMP'].includes(field.type)) {
            return field.string();
        }
        return next();
    }
    async getTableList() {
        console.log('MySqlDatabase.getTableList');
        const config = this.getConfig();
        return new Promise((resolve, reject) => {
            const cnn = (0, mysql_1.createConnection)(config);
            cnn.connect();
            cnn.query('show tables', (err, rows, fields) => {
                cnn.end();
                if (err) {
                    reject(err);
                }
                else {
                    //console.log('rows:', rows);
                    const tables = rows.map((row) => row[fields[0].name]);
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
            const cnn = (0, mysql_1.createConnection)(config);
            cnn.connect();
            const query = `SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, COLUMN_KEY, COLUMN_DEFAULT, EXTRA, COLUMN_COMMENT \
FROM information_schema.columns \
WHERE table_schema = '${config.database}' and table_name = '${table}'`;
            cnn.query(query, (err, rows) => {
                cnn.end();
                if (err) {
                    reject(err);
                }
                else {
                    const tableInfo = rows.map((row) => {
                        // console.log('row:', row);
                        return {
                            name: row.COLUMN_NAME,
                            type: this.getColumnTypeByDataType(row.COLUMN_TYPE),
                            key: row.COLUMN_KEY === 'PRI',
                            auto: row.EXTRA === 'auto_increment',
                            nullable: row.IS_NULLABLE === 'YES',
                            comment: row.COLUMN_COMMENT,
                            dbType: row.COLUMN_TYPE,
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
    getColumnTypeByDataType(dataType) {
        switch (dataType) {
            case 'int(10) unsigned':
            case 'int unsigned':
                return 'number';
            case 'varchar(255)':
            case 'varchar(15)':
            case 'text':
                return 'string';
            case 'datetime':
                return 'date';
            default:
                return null;
        }
    }
    async insertRow(context, table, values, autoColumnTypes = {}) {
        console.log(`MySqlDatabase.insertRow ${table}`, values, autoColumnTypes);
        const autoColumns = Object.keys(autoColumnTypes);
        if (autoColumns.length > 1)
            throw new Error('mysql does not support more than one auto increment column');
        const query = this.getInsertQuery(table, values);
        // console.log('insert query:', query, values);
        const result = await this.queryResult(context, query, values);
        // console.log('insert result:', result);
        if (autoColumns.length === 1) {
            if (!result.insertId)
                throw new Error('no insertId');
            return Object.assign({ [autoColumns[0]]: result.insertId }, values);
        }
        return Object.assign({}, values);
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
    async connect(context) {
        console.log('MySqlDatabase.connect', this.getName());
        if (!context)
            throw new Error('no context');
        this.checkDeinited();
        const name = this.getName();
        if (context.connections[name]) {
            throw new Error(`already connected: ${name}`);
        }
        context.connections[name] = await BkMySqlDatabase.Pool_getConnection(this.getPool());
    }
    async release(context) {
        console.log('MySqlDatabase.release', this.getName());
        if (!context)
            throw new Error('no context');
        this.getConnection(context).release();
        context.connections[this.getName()] = null;
    }
}
exports.BkMySqlDatabase = BkMySqlDatabase;
