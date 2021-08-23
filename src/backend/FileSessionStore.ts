const session  = require('express-session');

class FileSessionStore extends session.Store {
    store: any;
    dirPath: string;
    constructor(dirPath: string) {
        console.log('FileSessionStore.constructor', dirPath);
        super();
        this.dirPath = dirPath;
        this.store = {};
    }
    set(sid, session, cb) {
        console.log('FileSessionStore.set', sid, session);
        this.store[sid] = session;
        cb(null);
    }
    get(sid, cb) {
        console.log('FileSessionStore.get', sid);
        cb(null, this.store[sid]);
    }
    destroy(sid, cb) {
        console.log('FileSessionStore.destroy', sid);
        delete this.store[sid];
        cb(null);
    }
}
export = FileSessionStore;
