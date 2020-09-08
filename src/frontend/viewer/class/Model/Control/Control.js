'use strict';

class Control extends Model {

    // constructor(data, parent) {
    //     super(data, parent);
    // }

    init() {
    }

    deinit() {
    }

    getForm() {
        return this.parent;
    }

    getPage() {
        return this.parent.parent;
    }

    getApp() {
        return this.parent.parent.parent;
    }
}
