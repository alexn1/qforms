'use strict';

class Application extends Model {

    constructor(data) {
        super(data);
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await QForms.doHttpRequest({
            controller: 'Application',
            action    : 'save',
            params    : {
                attr : name,
                value: value
            }
        });
        this.data['@attributes'][name] = value;
        return data;
    }

    async newPage(params) {
        params['menu'] = (params['startup'] === 'true') ? 'Pages' : '';
        const data = await QForms.doHttpRequest({
            controller: 'Page',
            action    : '_new',
            params    : params
        });
        return [data.page, data.pageLink];
    }

    async newDatabase(params) {
        const data = await QForms.doHttpRequest({
            controller: 'Database',
            action    : '_new',
            params    : params
        });
        return data;
    }

    async getView(view) {
        return await QForms.doHttpRequest({
            controller: 'Application',
            action    : 'getView',
            params    : {
                app : this.data['@attributes'].name,
                view: view
            }
        });
    }

    async saveView(text, view) {
        return await QForms.doHttpRequest({
            controller: 'Application',
            action    : 'saveView',
            params    : {
                app : this.data['@attributes'].name,
                view: view,
                text: text
            }
        });
    }

    async saveController(text) {
        return await QForms.doHttpRequest({
            controller: 'Application',
            action    : 'saveController',
            params    : {
                app : this.data['@attributes'].name,
                text: text
            }
        });
    }

    async createView() {
        return await QForms.doHttpRequest({
            controller: 'Application',
            action    : 'createView',
            params    : {
                app: this.data['@attributes'].name
            }
        });
    }

    async createController() {
        return await QForms.doHttpRequest({
            controller: 'Application',
            action    : 'createController',
            params    : {
                app: this.data['@attributes'].name
            }
        });
    }

    async newDataSource(params) {
        return await QForms.doHttpRequest({
            controller: 'DataSource',
            action    : '_new',
            params    : params
        });
    }

}
