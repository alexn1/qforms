import { Editor } from '../Editor';
import { FrontHostApp } from '../../../common';

export class KeyColumnEditor extends Editor {
    dataSource: any;

    constructor(data, dataSource) {
        super(data, dataSource);
        this.dataSource = dataSource;
    }

    async setValue(name, value) {
        //console.debug(name + ' = ' + value);
        const data = await FrontHostApp.doHttpRequest({
            controller: 'KeyColumn',
            action: 'save',
            params: {
                form: this.dataSource.parent.getName(),
                pageFileName: this.dataSource.parent.page.pageLink.getFileName(),
                dataSource: this.dataSource.getName(),
                keyColumn: this.getName(),
                attr: name,
                value: value,
            },
        });
        this.setAttr(name, value);
        return data;
    }

    async deleteData() {
        await FrontHostApp.doHttpRequest({
            controller: 'KeyColumn',
            action: 'delete',
            params: {
                // page      : this.dataSource.parent.page.pageLink.getFileName(),
                ...(this.getPage() ? { page: this.getPage().pageLink.getFileName() } : {}),
                // form      : this.dataSource.parent.getName(),
                ...(this.getForm() ? { form: this.getForm().getName() } : {}),
                dataSource: this.dataSource.getName(),
                keyColumn: this.getName(),
            },
        });
    }

    getPage() {
        if (this.dataSource.parent.constructor.name === 'FormEditor') {
            return this.dataSource.parent.page;
        }
        if (this.dataSource.parent.constructor.name === 'PageEditor') {
            return this.dataSource.parent;
        }
        return null;
    }

    getForm() {
        if (this.dataSource.parent.constructor.name === 'FormEditor') {
            return this.dataSource.parent;
        }
        return null;
    }

    async delete() {
        await this.deleteData();
        this.parent.removeKeyColumn(this);
    }
}
