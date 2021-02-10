class PageLink extends Model {

    constructor(data, parent) {
        super(data, parent);
        this.application = parent;
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await QForms.doHttpRequest({
            controller: 'PageLink',
            action    : 'save',
            params    : Helper.encodeObject({
                pageLink: this.getName(),
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
                page: this.getName()
            })
        });
    }

    async moveDown() {
        return await QForms.doHttpRequest({
            controller: 'PageLink',
            action    : 'moveDown',
            params    : Helper.encodeObject({
                page: this.getName()
            })
        });
    }

    getFileName() {
        return this.data['@attributes'].fileName;
    }
    remove() {
        console.log('PageLink.remove', this.getName());
        this.parent.removePageLink(this);
    }

}
