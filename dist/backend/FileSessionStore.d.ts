import { Store, SessionData } from 'express-session';
export declare class FileSessionStore extends Store {
    store: Record<string, SessionData>;
    dirPath: string;
    constructor(dirPath: string);
    set(sid: string, session: SessionData, cb: (err?: any) => void): void;
    get(sid: string, cb: (err: any, session?: SessionData | null) => void): void;
    destroy(sid: string, cb: (err?: any) => void): void;
}
