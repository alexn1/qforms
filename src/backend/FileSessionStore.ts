import path from 'path';
import session from 'express-session';
// import colors from 'colors/safe';

import { BkHelper } from './BkHelper';
import { debug } from '../console';

export class FileSessionStore extends session.Store {
    store: any;
    dirPath: string;

    constructor(dirPath: string) {
        // debug('FileSessionStore.constructor', dirPath);
        super();
        this.dirPath = dirPath;
        this.store = {};
    }

    set(sid, session, cb) {
        debug('FileSessionStore.set', sid, session);
        this.store[sid] = session;
        const sessionFilePath = path.join(this.dirPath, `${sid}.json`);
        const content = JSON.stringify(session, null, 4);
        BkHelper.writeFile(sessionFilePath, content).then(() => {
            cb(null);
        });
    }

    get(sid, cb) {
        // debug('FileSessionStore.get', sid);
        const session = this.store[sid];
        if (session) {
            cb(null, session);
        } else {
            const sessionFilePath = path.join(this.dirPath, `${sid}.json`);
            BkHelper.getFileContent(sessionFilePath).then((content) => {
                if (content) {
                    try {
                        const session = (this.store[sid] = JSON.parse(content));
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
        debug('FileSessionStore.destroy', sid);
        delete this.store[sid];
        cb(null);
    }
}
