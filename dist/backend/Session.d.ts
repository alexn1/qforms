import { ServerUser } from './viewer';
export interface Session {
    user: {
        [route: string]: ServerUser;
    };
    ip: string;
    tzOffset: number;
}
export declare function Session_deleteUser(session: Session, route: string): void;
export declare function Session_save(session: any): Promise<void>;
