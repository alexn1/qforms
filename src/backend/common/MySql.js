'use strict';

var mysql = require('mysql');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class MySql {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(config) {
        //console.log('new MySql', config);
        this.config = config;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getTableList() {
        console.log('MySql.getTableList');
        return new Promise((resolve, reject) => {
            var cnn = mysql.createConnection(this.config);
            cnn.connect();
            cnn.query('show tables', (err, rows, fields) => {
                cnn.end();
                if (err) {
                    reject(err);
                } else {
                    console.log('rows:', rows);
                    var tables = rows.map(row => ({
                        0: row[fields[0].name]
                    }));
                    resolve(tables);
                }
            });
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getTableInfo(table) {
        console.log('MySql.getTableInfo:', table);
        return new Promise((resolve, reject) => {
            var cnn = mysql.createConnection(this.config);
            cnn.connect();
            var query =
                `SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, COLUMN_KEY, COLUMN_DEFAULT, EXTRA, COLUMN_COMMENT \
FROM information_schema.columns \
WHERE table_schema = '${this.config.database}' and table_name = '${table}'`;
            cnn.query(query, (err, rows) => {
                cnn.end();
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }


}

module.exports = MySql;