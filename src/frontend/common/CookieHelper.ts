import { Scalar } from '../../types';

export class CookieHelper {
    static setCookie(name: string, value: Scalar, time: number) {
        let expires = '';
        if (time) {
            const date = new Date(time);
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (encodeURIComponent(value) || '') + expires + '; path=/';
    }

    static getCookie(name: string): string | undefined {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return undefined;
    }

    static eraseCookie(name: string) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}
