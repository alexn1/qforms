'use strict';

class Field extends Model {

    constructor(data, parent) {
        super(data);
        this.parent = parent;
        this.form   = parent;
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await QForms.doHttpRequest({
            controller: 'Field',
            action    : 'save',
            params    : {
                pageFileName: this.form.page.pageLink.data['@attributes'].fileName,
                form        : this.form.data['@attributes'].name,
                field       : this.data['@attributes'].name,
                attr        : name,
                value       : value
            }
        });
        this.data['@attributes'][name] = value;
        return data;
    }

    async delete() {
        return await QForms.doHttpRequest({
            controller : 'Field',
            action     : 'delete',
            params     : {
                pageFileName:this.form.page.pageLink.data['@attributes'].fileName,
                form        :this.form.data['@attributes'].name,
                field       :this.data['@attributes'].name
            }
        });
    }

    async getView(view) {
        return await QForms.doHttpRequest({
            controller: 'Field',
            action    : 'getView',
            params    : {
                view : view,
                page : this.data !== undefined ? this.form.page.data['@attributes'].name : null,
                form : this.data !== undefined ? this.form.data['@attributes'].name      : null,
                field: this.data !== undefined ? this.data['@attributes'].name           : null
            }
        });
    }

    async saveView(text, view) {
        return await QForms.doHttpRequest({
            controller: 'Field',
            action    : 'saveView',
            params    : {
                page : this.form.page.data['@attributes'].name,
                form : this.form.data['@attributes'].name,
                field: this.data['@attributes'].name,
                view : view,
                text : text
            }
        });
    }

    async saveController(text) {
        return await QForms.doHttpRequest({
            controller: 'Field',
            action    : 'saveController',
            params    : {
                page : this.form.page.data['@attributes'].name,
                form : this.form.data['@attributes'].name,
                field: this.data['@attributes'].name,
                text : text
            }
        });
    }

    async createView() {
        return await QForms.doHttpRequest({
            controller: 'Field',
            action    : 'createView',
            params    : {
                page : this.form.page.data['@attributes'].name,
                form : this.form.data['@attributes'].name,
                field: this.data['@attributes'].name,
                class: this.data['@class']
            }
        });
    }

    async createController() {
        return await QForms.doHttpRequest({
            controller: 'Field',
            action    : 'createController',
            params    : {
                page : this.form.page.data['@attributes'].name,
                form : this.form.data['@attributes'].name,
                field: this.data['@attributes'].name,
                class: this.data['@class']
            }
        });
    }

    async changeClass(params) {
        params['page']  = this.form.page.data['@attributes'].name;
        params['form']  = this.form.data['@attributes'].name;
        params['field'] = this.data['@attributes'].name;
        const data = await QForms.doHttpRequest({
            controller: 'Field',
            action    : 'changeClass',
            params    : params
        });
        return this.data = data;
    }

    moveUp() {
        const args = {
            controller : 'Field',
            action     : 'moveUp',
            params     : {
                pageFileName: this.form.page.pageLink.data['@attributes'].fileName,
                form        : this.form.data['@attributes'].name,
                field       : this.data['@attributes'].name
            }
        };
        return QForms.doHttpRequest(args);
    }

    moveDown() {
        const args = {
            controller : 'Field',
            action     : 'moveDown',
            params     : {
                pageFileName: this.form.page.pageLink.data['@attributes'].fileName,
                form        : this.form.data['@attributes'].name,
                field       : this.data['@attributes'].name
            }
        };
        return QForms.doHttpRequest(args);
    }

}
