class DocumentController extends ModelController {

    constructor(model, parent) {
        super(model, parent);
        this.tab = null;
    }

    createTab(docs, element) {
        if (!element) throw new Error('no element');
        // const $div = $('<div style="height:100%;background-color:lightgoldenrodyellow;">sample tab</div>');
        const name = this.model.data['@attributes'].name;
        this.tab = docs.createTab(element, name, function(tab) {
            tab.ctrl.tab = undefined;
        });
        this.tab.ctrl = this;
        docs.selectTab(this.tab);
    }

}