import path from 'path';
import { Store, SessionData } from 'express-session';
// import colors from 'colors/safe';

import { BkHelper } from './BkHelper';
import { debug } from '../console';
import { getFileContent } from './FileHelper';

export class FileSessionStore extends Store {
    store: Record<string, SessionData> = {};

    constructor(private dirPath: string) {
        // debug('FileSessionStore.constructor', dirPath);
        super();
    }

    set(sid: string, session: SessionData, cb: (err?: any) => void) {
        debug('FileSessionStore.set', sid, session);
        this.store[sid] = session;
        const sessionFilePath = path.join(this.dirPath, `${sid}.json`);
        const content = JSON.stringify(session, null, 4);
        BkHelper.writeFile(sessionFilePath, content)
            .then(() => cb(null))
            .catch((err) => cb(err));
    }

    get(sid: string, cb: (err: any, session?: SessionData | null) => void) {
        // debug('FileSessionStore.get', sid);
        const session = this.store[sid];
        if (session) {
            cb(null, session);
        } else {
            const sessionFilePath = path.join(this.dirPath, `${sid}.json`);
            getFileContent(sessionFilePath).then((content) => {
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

    destroy(sid: string, cb: (err?: any) => void) {
        debug('FileSessionStore.destroy', sid);
        delete this.store[sid];
        cb(null);
    }
}
