class Widget extends EventEmitter {
    constructor(el) {
        super();
        if (!el) throw new Error(`${this.constructor.name}: no el`);
        this.el = el;
        this.listeners = {};
    }
}
