declare const session: any;
declare class FileSessionStore extends session.Store {
    store: any;
    dirPath: string;
    constructor(dirPath: string);
    set(sid: any, session: any, cb: any): void;
    get(sid: any, cb: any): void;
    destroy(sid: any, cb: any): void;
}
export = FileSessionStore;
