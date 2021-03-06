class KeyColumnEditor extends Editor {

    constructor(data, dataSource) {
        super(data, dataSource);
        this.dataSource = dataSource;
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await FrontHostApp.doHttpRequest({
            controller: 'KeyColumn',
            action    : 'save',
            params    : Helper.encodeObject({
                form        : this.dataSource.parent.getName(),
                pageFileName: this.dataSource.parent.page.pageLink.getFileName(),
                dataSource  : this.dataSource.getName(),
                keyColumn   : this.getName(),
                attr        : name,
                value       : value
            })
        });
        this.setAttr(name, value);
        return data;
    }

    async deleteData() {
        await FrontHostApp.doHttpRequest({
            controller: 'KeyColumn',
            action    : 'delete',
            params    : Helper.encodeObject({
                page      : this.dataSource.parent.page.pageLink.getFileName(),
                form      : this.dataSource.parent.getName(),
                dataSource: this.dataSource.getName(),
                keyColumn : this.getName()
            })
        });
    }
    async delete() {
        await this.deleteData();
        this.parent.removeKeyColumn(this);
    }


}
