const path = require('path');
const session  = require('express-session');
import Helper from './Helper';

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
        const sessionFilePath = path.join(this.dirPath, `${sid}.json`);
        const content = JSON.stringify(session, null, 4);
        Helper.writeFile(sessionFilePath, content).then(() => {
            cb(null);
        });
    }
    get(sid, cb) {
        console.log('FileSessionStore.get', sid);
        const session = this.store[sid];
        if (session) {
            cb(null, session);
        } else {
            const sessionFilePath = path.join(this.dirPath, `${sid}.json`);
            console.log('getFileContent:', sessionFilePath);
            Helper.getFileContent(sessionFilePath).then(content => {
                if (content) {
                    try {
                        const session = this.store[sid] = JSON.parse(content);
                        cb(null, session);
                    } catch (err) {
                        cb(err);
                    }
                } else {
                    cb(null, null);
                }
            });
        }
    }
    destroy(sid, cb) {
        console.log('FileSessionStore.destroy', sid);
        delete this.store[sid];
        cb(null);
    }
}
export = FileSessionStore;
