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
        await db.queryResult(context, 'insert into file("contentType", content) values ({contentType}, {content})', {
            contentType: req.files.field2.type,
            content    : context.files.field2,
        });
        return {abc: 'xyz'};
    }

    static async blob2(req, res, context, application) {
        console.log('Test.blob', context.params, context.files);
        const db = application.getDatabase('default');
        const [row] = await db.queryRows(context, 'select id, "contentType", content from file order by id desc limit 1');
        row.content = row.content.toString('base64');
        console.log('row:', row);
        return {row};
    }

}

module.exports = Test;
