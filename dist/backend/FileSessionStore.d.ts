import { Store, SessionData } from 'express-session';
export declare class FileSessionStore extends Store {
    private dirPath;
    store: Record<string, SessionData>;
    constructor(dirPath: string);
    set(sid: string, session: SessionData, cb: (err?: any) => void): void;
    get(sid: string, cb: (err: any, session?: SessionData | null) => void): void;
    destroy(sid: string, cb: (err?: any) => void): void;
}
export declare function getSecretSync(secretFilePath: string): string;
export declare function getRandomString(length: number): string;
