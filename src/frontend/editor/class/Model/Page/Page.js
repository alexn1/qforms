'use strict';

class Page extends Model {

    constructor(data, parent, pageLink) {
        super(data);
        this.parent      = parent;
        this.pageLink    = pageLink;
        this.application = parent;
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await QForms.doHttpRequest({
            controller: 'Page',
            action    : 'save',
            params    : {
                fileName: this.pageLink.data['@attributes'].fileName,
                attr    : name,
                value   : value
            }
        });
        this.data['@attributes'][name] = value;
        return data;
    }

    async delete() {
        return await QForms.doHttpRequest({
            controller: 'Page',
            action    : 'delete',
            params    : {
                page: this.data['@attributes'].name
            }
        });
    }

    async newForm(params) {
        params['pageFileName'] = this.pageLink.data['@attributes'].fileName;
        return await QForms.doHttpRequest({
            controller: 'Form',
            action    : '_new',
            params    : params
        });
    }

    async getView(view) {
        return await QForms.doHttpRequest({
            controller: 'Page',
            action    : 'getView',
            params    : {
                view: view,
                page: this.data !== undefined ? this.data['@attributes'].name : null
            }
        });
    }

    async saveView(text, view) {
        return await QForms.doHttpRequest({
            controller: 'Page',
            action    : 'saveView',
            params    : {
                page: this.data['@attributes'].name,
                view: view,
                text: text
            }
        });
    }

    async saveController(text) {
        return await QForms.doHttpRequest({
            controller: 'Page',
            action    : 'saveController',
            params    : {
                page: this.data['@attributes'].name,
                text: text
            }
        });
    }

    async createView() {
        return await QForms.doHttpRequest({
            controller: 'Page',
            action    : 'createView',
            params    : {
                page: this.data['@attributes'].name
            }
        });
    }

    async createController() {
        return await QForms.doHttpRequest({
            controller: 'Page',
            action    : 'createController',
            params    : {
                page: this.data['@attributes'].name
            }
        });
    }

}
