import path from 'path';
import { Store, SessionData } from 'express-session';
import { debug } from '../console';
import { getFileContent, writeFile, getFileContentSync, writeFileSync } from './file-helper';

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
        writeFile(sessionFilePath, content)
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

export function getSecretSync(secretFilePath: string): string {
    let secret;
    secret = getFileContentSync(secretFilePath);
    if (secret) {
        return secret;
    }
    secret = getRandomString(20);
    writeFileSync(secretFilePath, secret);
    return secret;
}

export function getRandomString(length: number) {
    function getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const index = getRandomInt(0, chars.length - 1);
        result += chars.substr(index, 1);
    }
    return result;
}
