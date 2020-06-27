'use strict';

class Form extends Model {

    constructor(data, page) {
        super(data);
        this.parent = page;
        this.page   = page;
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await QForms.doHttpRequest({
            controller: 'Form',
            action    : 'save',
            params    : {
                pageFileName: this.page.pageLink.data['@attributes'].fileName,
                form        : this.data['@attributes'].name,
                attr        : name,
                value       : value
            }
        });
        this.data['@attributes'][name] = value;
        return data;
    }

    async delete() {
        return await QForms.doHttpRequest({
            controller: 'Form',
            action    : 'delete',
            params    : {
                pageFileName: this.page.pageLink.data['@attributes'].fileName,
                form        : this.data['@attributes'].name
            }
        });
    }

    moveUp() {
        const args = {
            controller: 'Form',
            action    : 'moveUp',
            params    : {
                pageFileName: this.page.pageLink.data['@attributes'].fileName,
                form        : this.data['@attributes'].name
            }
        };
        return QForms.doHttpRequest(args);
    }

    moveDown() {
        const args = {
            controller: 'Form',
            action    : 'moveDown',
            params    : {
                pageFileName: this.page.pageLink.data['@attributes'].fileName,
                form        : this.data['@attributes'].name
            }
        };
        return QForms.doHttpRequest(args);
    }

    async newField(params) {
        params['pageFileName'] = this.page.pageLink.data['@attributes'].fileName;
        params['form']         = this.data['@attributes'].name;
        return await QForms.doHttpRequest({
            controller: 'Field',
            action    : '_new',
            params    : params
        });
    }

    async newControl(params) {
        params['pageFileName'] = this.page.pageLink.data['@attributes'].fileName;
        params['form']         = this.data['@attributes'].name;
        return await QForms.doHttpRequest({
            controller: 'Control',
            action    : '_new',
            params    : params
        });
    }

    async newAction(params) {
        params['pageFileName'] = this.page.pageLink.getFileName();
        params['form']         = this.getName();
        return await QForms.doHttpRequest({
            controller: 'Action',
            action    : '_new',
            params    : params
        });
    }

    async newDataSource(params) {
        params['page']  = this.page.pageLink.data['@attributes'].fileName;
        params['form']  = this.data['@attributes'].name;
        return await QForms.doHttpRequest({
            controller: 'DataSource',
            action    : '_new',
            params    : params
        });
    }

    async getView(view) {
        return await QForms.doHttpRequest({
            controller: 'Form',
            action    : 'getView',
            params    : {
                view: view,
                page: this.data !== undefined ? this.page.data['@attributes'].name : null,
                form: this.data !== undefined ? this.data['@attributes'].name      : null
            }
        });
    }

    async saveView(text, view) {
        return await QForms.doHttpRequest({
            controller: 'Form',
            action    : 'saveView',
            params    : {
                page: this.page.data['@attributes'].name,
                form: this.data['@attributes'].name,
                view: view,
                text: text
            }
        });
    }

    async saveController(text) {
        return await QForms.doHttpRequest({
            controller: 'Form',
            action    : 'saveController',
            params    : {
                page: this.page.data['@attributes'].name,
                form: this.data['@attributes'].name,
                text: text
            }
        });
    }

    async createView() {
        return await QForms.doHttpRequest({
            controller: 'Form',
            action    : 'createView',
            params    : {
                page : this.page.data['@attributes'].name,
                form : this.data['@attributes'].name,
                class: this.data['@class']
            }
        });
    }

    async createController() {
        return await QForms.doHttpRequest({
            controller: 'Form',
            action    : 'createController',
            params    : {
                page : this.page.data['@attributes'].name,
                form : this.data['@attributes'].name,
                class: this.data['@class']
            }
        });
    }

}
