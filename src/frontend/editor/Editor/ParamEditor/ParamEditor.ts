import { Editor } from '../Editor';
import { FrontHostApp } from '../../../common';

export class ParamEditor extends Editor {
    database: any;

    constructor(data, database) {
        super(data, database);
        this.database = database;
    }

    async setValue(name, value) {
        //console.debug(name + ' = ' + value);
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Param',
            action: 'save',
            params: {
                database: this.database.getName(),
                param: this.getName(),
                attr: name,
                value: value,
            },
        });
        this.setAttr(name, value);
        return data;
    }

    async deleteData() {
        await FrontHostApp.doHttpRequest({
            controller: 'Param',
            action: 'delete',
            params: {
                database: this.database.getName(),
                param: this.getName(),
            },
        });
    }

    async delete() {
        await this.deleteData();
        this.parent.removeParam(this);
    }
}
