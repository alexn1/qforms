'use strict';

class Control extends Model {

    constructor(data, form) {
        super(data);
        this.form = form;
    }

    async getView(view) {
        return await QForms.doHttpRequest({
            controller: 'Control',
            action    : 'getView',
            params    : {
                view : view,
                page : this.data !== undefined ? this.form.page.data['@attributes'].name : null,
                form : this.data !== undefined ? this.form.data['@attributes'].name      : null,
                field: this.data !== undefined ? this.data['@attributes'].name           : null
            }
        });
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await QForms.doHttpRequest({
            controller: 'Control',
            action    : 'save',
            params    : {
                pageFileName: this.form.page.pageLink.data['@attributes'].fileName,
                form        : this.form.data['@attributes'].name,
                control     : this.data['@attributes'].name,
                attr        : name,
                value       : value
            }
        });
        this.setAttr(name, value);
        return data;
    }

    async delete() {
        return await QForms.doHttpRequest({
            controller: 'Control',
            action    : 'delete',
            params    : {
                pageFileName: this.form.page.pageLink.data['@attributes'].fileName,
                form        : this.form.data['@attributes'].name,
                control     : this.data['@attributes'].name
            }
        });
    }

}
