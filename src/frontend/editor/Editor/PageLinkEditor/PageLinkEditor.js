class PageLinkEditor extends Editor {

    constructor(data, parent) {
        super(data, parent);
        this.application = parent;
    }

    async setValue(name, value) {
        //console.log(name + ' = ' + value);
        const data = await FrontHostApp.doHttpRequest({
            controller: 'PageLink',
            action    : 'save',
            params    : {
                pageLink: this.getName(),
                attr    : name,
                value   : value
            }
        });
        this.setAttr(name, value);
        return data;
    }

    async moveUp() {
        return await FrontHostApp.doHttpRequest({
            controller: 'PageLink',
            action    : 'moveUp',
            params    : {
                page: this.getName()
            }
        });
    }

    async moveDown() {
        return await FrontHostApp.doHttpRequest({
            controller: 'PageLink',
            action    : 'moveDown',
            params    : {
                page: this.getName()
            }
        });
    }

    getFileName() {
        return this.data['@attributes'].fileName;
    }
    remove() {
        console.log('PageLinkEditor.remove', this.getName());
        this.parent.removePageLink(this);
    }

}
