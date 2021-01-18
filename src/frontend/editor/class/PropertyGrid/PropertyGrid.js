class PropertyGrid extends EventEmitter {

    constructor(el, parent) {
        super();
        this.el      = el;
        this.parent  = parent;
        this.id      = el.id;
        this.tbody   = null;
        // this.obj     = null;
        // this.options = null;
    }

    init() {
        this.tbody = $(this.el).children('table').children('tbody').get(0);
    }

    beginEdit(obj, options) {
        // this.obj     = obj;
        // this.options = options;
        this.fill();
    }

    getObj() {
        // return this.obj;
        if (!this.parent) return null;
        return this.parent.editObj;
    }

    getOptions() {
        // return this.options;
        if (!this.parent) return null;
        return this.parent.editOptions;
    }

    fill() {
        const self = this;
        this.clear();
        for (const name in this.getObj()) {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.innerHTML = name;
            const td2 = document.createElement('td');
            let input;
            if (this.getOptions() && this.getOptions()[name] !== undefined) {
                input = document.createElement('select');
                this.getOptions()[name].forEach(function(value) {
                    const option = document.createElement('option');
                    option.innerHTML = value;
                    input.appendChild(option);
                });
            } else {
                input = document.createElement('input');
            }
            input.name       = name;
            input.spellcheck = false;
            input.value      = this.getObj()[name];
            $(input).change(function () {
                self.emit('changed', {source: self, name: this.name, value: this.value});
            });
            td2.appendChild(input);
            tr.appendChild(td1);
            tr.appendChild(td2);
            this.tbody.appendChild(tr);
        }
    }

    clear() {
        this.tbody.innerHTML = '';
    }

    endEdit() {
        // this.obj     = null;
        // this.options = null;
        this.clear();
    }

}
