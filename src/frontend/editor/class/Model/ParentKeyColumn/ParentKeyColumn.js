'use strict';

class ParentKeyColumn extends Model {

    constructor(data, dataSource) {
        super(data);
        this.dataSource = dataSource;
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await QForms.doHttpRequest({
            controller: 'ParentKeyColumn',
            action    : 'save',
            params    : Helper.encodeObject({
                form           : this.dataSource.parent.data['@attributes'].name,
                pageFileName   : this.dataSource.parent.page.pageLink.data['@attributes'].fileName,
                dataSource     : this.dataSource.data['@attributes'].name,
                parentKeyColumn: this.data['@attributes'].name,
                attr           : name,
                value          : value
            })
        });
        this.data['@attributes'][name] = value;
        return data;
    }

    async delete() {
        return await QForms.doHttpRequest({
            controller: 'ParentKeyColumn',
            action    : 'delete',
            params    : Helper.encodeObject({
                page           : this.dataSource.parent.page.pageLink.data['@attributes'].fileName,
                form           : this.dataSource.parent.data['@attributes'].name,
                dataSource     : this.dataSource.data['@attributes'].name,
                parentKeyColumn: this.data['@attributes'].name
            })
        });
    }

}
