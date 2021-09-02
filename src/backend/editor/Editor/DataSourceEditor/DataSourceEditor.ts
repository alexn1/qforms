const path = require('path');
const Editor = require('../Editor');

class DataSourceEditor extends Editor {
    static createData(params): any {
        return {
            '@class'     : 'DataSource',
            '@attributes': {
                name    : params.name,
                database: params.database || 'default',
                table   : params.table    || '',
            },
            keyColumns: [
                ...(params.keyColumns ? params.keyColumns.map(Editor.createItemData) : [])
            ],
        };
    }
    async getCollectionDirPath() {
        const customDirPath = await this.parent.getCustomDirPath();
        return path.join(customDirPath, 'dataSources');
    }
    async createModelBackJs(params) {
        const filePath = path.join(await this.getCustomDirPath(), 'Model.back.js');
        const templateFilePath = path.join(__dirname, 'Model.back.js.ejs');
        const js = await this.createFileByParams(filePath, templateFilePath, {
            _class: this.getClassName(),
            page      : params.page ? params.page : '',
            form      : params.form ? params.form : '',
            dataSource: this.getName(),
        });
        return js;
    }
    getColName() {
        return 'dataSources';
    }
}

export = DataSourceEditor;
