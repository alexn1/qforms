import { Editor } from '../Editor';
import { ColumnEditor } from '../ColumnEditor/ColumnEditor';
import { FrontHostApp } from '../../../common';

export class TableEditor extends Editor {
    database: any;
    columns: any[];

    constructor(data, database) {
        super(data, database);
        this.database = database;
        this.columns = [];
    }

    init() {
        for (const data of this.data.columns) {
            this.createColumn(data);
        }
    }

    createColumn(data) {
        const column = new ColumnEditor(data, this);
        column.init();
        this.columns.push(column);
        return column;
    }

    removeColumn(column) {
        console.debug('TableEditor.removeColumn', column.getName());
        const i = this.columns.indexOf(column);
        if (i === -1) throw new Error('no such column');
        this.columns.splice(i, 1);
    }

    async newColumn(name) {
        if (!name) throw new Error(`newColumn: no name`);
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Column',
            action: '_new',
            params: {
                database: this.database.getName(),
                table: this.getName(),
                name: name,
            },
        });
        return this.createColumn(data);
    }

    async deleteData() {
        await FrontHostApp.doHttpRequest({
            controller: 'Table',
            action: 'delete',
            params: {
                database: this.database.getName(),
                table: this.getName(),
            },
        });
    }

    async delete() {
        await this.deleteData();
        this.parent.removeTable(this);
    }

    moveUp() {
        return FrontHostApp.doHttpRequest({
            controller: 'Table',
            action: 'moveUp',
            params: {
                database: this.database.getName(),
                table: this.getName(),
            },
        });
    }

    moveDown() {
        return FrontHostApp.doHttpRequest({
            controller: 'Table',
            action: 'moveDown',
            params: {
                database: this.database.getName(),
                table: this.getName(),
            },
        });
    }

    async setValue(name, value) {
        //console.debug(name + ' = ' + value);
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Table',
            action: 'save',
            params: {
                database: this.database.getName(),
                table: this.getName(),
                attr: name,
                value: value,
            },
        });
        this.setAttr(name, value);
        return data;
    }
}
