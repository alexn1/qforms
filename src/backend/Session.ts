import { ServerUser } from './viewer';

export interface Session {
    user: { [route: string]: ServerUser };
    ip: string;
    tzOffset: number;
}

export function Session_deleteUser(session: Session, route: string) {
    delete session.user[route];
}


export function Session_save(session: any): Promise<void> {
    return new Promise((resolve, reject) => {
        session.save((err: any) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}