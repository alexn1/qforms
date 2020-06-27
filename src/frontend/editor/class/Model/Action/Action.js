'use strict';

class Action extends Model {
    constructor(data, form) {
        super(data);
        this.form = form;
    }

    async getView(view) {
        return await QForms.doHttpRequest({
            controller: 'Action',
            action    : 'getView',
            params    : {
                view : view,
                page : this.data !== undefined ? this.form.page.getName() : null,
                form : this.data !== undefined ? this.form.getName()      : null,
            }
        });
    }

    async setValue(name, value) {
        //console.log('Action.setValue', name + ' = ' + value);
        const data = await QForms.doHttpRequest({
            controller: 'Action',
            action    : 'save',
            params    : {
                pageFileName: this.form.page.pageLink.getAttr('fileName'),
                form        : this.form.getAttr('name'),
                action      : this.getAttr('name'),
                attr        : name,
                value       : value
            }
        });
        this.setAttr(name, value);
        return data;
    }
}
