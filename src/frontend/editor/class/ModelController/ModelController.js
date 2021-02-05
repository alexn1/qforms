class ModelController extends EventEmitter {

    constructor(model) {
        super();
        this.model = model;
        this.listeners = {};
        this.view = null;
    }
    init() {
    }
    getTitle() {
        return this.model.getName();
    }
    getPropList() {
        return {
            list   : this.model.data['@attributes'],
            options: {}
        };
    }

    async setProperty(name, value) {
        await this.model.setValue(name, value);
        /*if (name === 'name') {
            this.item.text.innerHTML = this.getCaption(this.model.data);
        }*/
    }

    getCaption(data) {
        return "<span class='green'>{name}</span>".replace('{name}', data['@attributes'].name);
    }

    async delete() {
        console.log('ModelController.delete', this.model.getName());
        await this.model.delete();
        // this.item.parent.removeItem(this.item);
    }

    /*getObject(col, name) {
        return this[col].find(obj => obj.model.getName() === name);
    }*/

    async doAction(name) {
        throw new Error(`${this.constructor.name}.doAction('${name}') not implemented`);
    }

}
