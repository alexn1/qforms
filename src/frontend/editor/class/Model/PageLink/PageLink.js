class PageLink extends Model {

    constructor(data, parent) {
        super(data);
        this.parent      = parent;
        this.application = parent;
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await QForms.doHttpRequest({
            controller: 'PageLink',
            action    : 'save',
            params    : Helper.encodeObject({
                pageLink: this.data['@attributes'].name,
                attr    : name,
                value   : value
            })
        });
        this.data['@attributes'][name] = value;
        return data;
    }

    async moveUp() {
        return await QForms.doHttpRequest({
            controller: 'PageLink',
            action    : 'moveUp',
            params    : Helper.encodeObject({
                page: this.data['@attributes'].name
            })
        });
    }

    async moveDown() {
        return await QForms.doHttpRequest({
            controller: 'PageLink',
            action    : 'moveDown',
            params    : Helper.encodeObject({
                page: this.data['@attributes'].name
            })
        });
    }

    getFileName() {
        return this.data['@attributes'].fileName;
    }

}
