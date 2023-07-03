export class EventEmitter {
    list: any;

    constructor() {
        this.list = {};
    }

    on(name, cb) {
        // console.debug('EventEmitter.on', name);
        if (!this.list[name]) {
            this.list[name] = [];
        }
        this.list[name].push(cb);
    }

    off(name, cb) {
        // console.debug('EventEmitter.off', name);
        const i = this.list[name].indexOf(cb);
        if (i === -1) {
            throw new Error(`cannot find cb for ${name}`);
        }
        // console.debug(i);
        this.list[name].splice(i, 1);
    }

    async emit(name: string, e) {
        // console.debug('EventEmitter.emit', name, e);
        if (this.list[name] && this.list[name].length) {
            // @ts-ignore
            const results = await Promise.allSettled(this.list[name].map((cb) => cb(e)));
            // console.debug('results:', results);
            for (const result of results) {
                if (result.status === 'rejected') {
                    throw result.reason;
                }
            }
        }
    }
}
