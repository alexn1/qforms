class ModelController extends EventEmitter {

    constructor(model) {
        super();
        this.model     = model;
        this.listeners = {};
        this.c = null;
    }

    getPropList() {
        return {
            list   : this.model.data['@attributes'],
            options: {}
        };
    }

    async setProperty(name, value) {
        await this.model.setValue(name, value);
        if (name === 'name') {
            this.item.text.innerHTML = this.getCaption(this.model.data);
        }
    }

    getCaption(data) {
        return "<span class='green'>{name}</span>".replace('{name}', data['@attributes'].name);
    }

    async delete() {
        console.log('ModelController.delete', this.name);
        await this.model.delete();
        this.item.parent.removeItem(this.item);
    }

    getItem() {
        return {
            ctrl : this,
            title: this.model.getName()
        };
    }

}
