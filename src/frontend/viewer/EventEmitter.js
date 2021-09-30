class EventEmitter {
    constructor() {
        this.list = {};
    }
    on(name, cb) {
        // console.log('EventEmitter.on', name);
        if (!this.list[name]) {
            this.list[name] = [];
        }
        this.list[name].push(cb);
    }
    off(name, cb) {
        // console.log('EventEmitter.off', name);
        const i = this.list[name].indexOf(cb);
        if (i === -1) {
            throw new Error(`cannot find cb for ${name}`);
        }
        // console.log(i);
        this.list[name].splice(i, 1);
    }
    async emit(name, e) {
        console.log('EventEmitter.emit', name, e);
        if (this.list[name] && this.list[name].length) {
            const results = await Promise.allSettled(this.list[name].map(cb => cb(e)));
            // console.log('results:', results);
            for (const result of results) {
                if (result.status === 'rejected') {
                    throw result.reason;
                }
            }
        }
    }
}
