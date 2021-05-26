class Action extends Model {
    /*constructor(data, parent) {
        super(data, parent);
    }*/

    /*async getView(view) {
        return await FrontHostApp.doHttpRequest({
            controller: 'Action',
            action    : 'getView',
            params    : Helper.encodeObject({
                view : view,
                page : this.data !== undefined ? this.form.page.getName() : null,
                form : this.data !== undefined ? this.form.getName()      : null,
            })
        });
    }*/

    getParams() {
        if (this.parent instanceof Form) {
            return {
                pageFileName: this.parent.page.pageLink.getAttr('fileName'),
                form        : this.parent.getAttr('name'),
                action      : this.getAttr('name'),
            };
        } else if (this.parent instanceof Page) {
            return {
                pageFileName: this.parent.pageLink.getAttr('fileName'),
                action      : this.getAttr('name'),
            };
        }
        return {
            action: this.getAttr('name'),
        };
    }

    async setValue(name, value) {
        //console.log('Action.setValue', name + ' = ' + value);
        const data = await FrontHostApp.doHttpRequest({
            controller: 'Action',
            action    : 'save',
            params    : Helper.encodeObject({
                ...this.getParams(),
                attr        : name,
                value       : value
            })
        });
        this.setAttr(name, value);
        return data;
    }

    async deleteData() {
        await FrontHostApp.doHttpRequest({
            controller: 'Action',
            action    : 'delete',
            params    : Helper.encodeObject({
                ...this.getParams(),
            })
        });
    }
    async delete() {
        console.log('Action.delete', this.getName());
        await this.deleteData();
        this.parent.removeAction(this);
    }
    moveUp() {
        return FrontHostApp.doHttpRequest({
            controller : 'Action',
            action     : 'moveUp',
            params     : Helper.encodeObject({
                ...this.getParams(),
            })
        });
    }
    moveDown() {
        return FrontHostApp.doHttpRequest({
            controller : 'Action',
            action     : 'moveDown',
            params     : Helper.encodeObject({
                ...this.getParams(),
            })
        });
    }

}
