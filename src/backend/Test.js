const qforms = require('./qforms');

class Test {
    static async getUpdateQuery() {
        console.log('Test.getUpdateQuery');
        const query = qforms.PostgreSqlDatabase.getUpdateQuery('tableName', {field1: 'value1'}, {id: 1});
        console.log('query:', query);
        return {query};
    }

    static async mapObject() {
        console.log('Test.mapObject');
        const values = {
            field1: 'value1',
            field2: 'value2',
        };
        const values2 = qforms.Helper.mapObject(values, (name, value) => [`val_${name}`, value]);
        return {
            values,
            values2
        };
    }

    static async blob(req, res, context, application) {
        console.log('Test.blob', context.params, context.files);
        const db = application.getDatabase('default');
        await db.queryResult(context, 'insert into file(type, size, content) values ({type}, {size}, {content})', {
            type   : req.files.field2.type,
            size   : req.files.field2.size,
            content: context.files.field2,
        });
        return {abc: 'xyz'};
    }

    static async blob2(req, res, context, application) {
        console.log('Test.blob2', context.params, context.files);
        const db = application.getDatabase('default');
        const [row] = await db.queryRows(context, 'select id, type, size, content from file order by id desc limit 1');
        row.content     = row.content.toString('base64');
        // row.type    = JSON.stringify(row.type);
        // row.content = JSON.stringify(row.content);
        // console.log('row:', row);
        return {row};
    }

    static async blob3(req, res, context, application) {
        console.log('Test.blob3', context.params);
        const db = application.getDatabase('default');
        await db.queryResult(context, 'insert into file(content) values ({content})', context.params);
        return {abc: 'xyz'};
    }

}

module.exports = Test;
