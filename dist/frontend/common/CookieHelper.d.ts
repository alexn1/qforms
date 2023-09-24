import { Scalar } from '../../types';
export declare class CookieHelper {
    static setCookie(name: string, value: Scalar, time: number): void;
    static getCookie(name: string): string | undefined;
    static eraseCookie(name: string): void;
}
