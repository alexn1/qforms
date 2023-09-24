import { Helper } from '../frontend';

export class DateTimeHelper {
    /*
     * timeOffset number in minutes
     */
    static today(timeOffset: number) {
        // debug('DateTimeHelper.today', timeOffset);
        let ts = Date.now();
        if (timeOffset !== undefined && timeOffset !== null) {
            ts += DateTimeHelper.MINUTE() * timeOffset;
        }
        const date = new Date(ts);
        ts = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
        if (timeOffset !== undefined && timeOffset !== null) {
            ts -= DateTimeHelper.MINUTE() * timeOffset;
        }
        return new Date(ts);
    }

    static today2() {
        const now = new Date();
        // return new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return Helper.getStartOfDay(now);
    }

    static SECOND(): number {
        return 1000;
    }

    static MINUTE(): number {
        return 60 * DateTimeHelper.SECOND();
    }

    static HOUR(): number {
        return 60 * DateTimeHelper.MINUTE();
    }

    static DAY(): number {
        return 24 * DateTimeHelper.HOUR();
    }

    static WEEK(): number {
        return 7 * DateTimeHelper.DAY();
    }

    static addMinutes(date: Date, minutes: number): void {
        // debug('DateTimeHelper.addMinutes', date, minutes);
        date.setMinutes(date.getMinutes() + minutes);
    }

    static removeTimezoneOffset(date: Date): void {
        DateTimeHelper.addMinutes(date, -date.getTimezoneOffset());
    }

    static addTimezoneOffset(date: Date): void {
        DateTimeHelper.addMinutes(date, date.getTimezoneOffset());
    }

    static cloneDate(date: Date): Date {
        return new Date(date.getTime());
    }

    static formatTime2(_sec: number): string {
        // debug('DateTimeHelper.formatTime', sec);
        let sec = _sec;
        let sign = '';
        if (_sec < 0) {
            sec = -sec;
            sign = '-';
        }
        let h = Math.floor(sec / 3600);
        let m = Math.floor((sec - h * 3600) / 60);
        let s = Math.floor(sec - h * 3600 - m * 60);
        // @ts-ignore
        if (h < 10) h = '0' + h;
        // @ts-ignore
        if (m < 10) m = '0' + m;
        // @ts-ignore
        if (s < 10) s = '0' + s;
        if (Math.floor(sec / 3600) === 0) {
            return `${sign}${m}m:${s}s`;
        } else {
            return `${sign}${h}h:${m}m:${s}s`;
        }
    }

    static formatDate(date: Date, format: string) {
        const YYYY = date.getFullYear();
        const M = date.getMonth() + 1;
        const D = date.getDate();
        const h = date.getHours();
        const m = date.getMinutes();
        const s = date.getSeconds();
        const MM = M < 10 ? `0${M}` : M;
        const DD = D < 10 ? `0${D}` : D;
        const hh = h < 10 ? `0${h}` : h;
        const mm = m < 10 ? `0${m}` : m;
        const ss = s < 10 ? `0${s}` : s;
        const values = { YYYY, M, D, h, m, s, MM, DD, hh, mm, ss };
        return format.replace(/\{([\w.]+)\}/g, (text, name) =>
            // @ts-ignore
            values[name] ? values[name] : text,
        );
    }
}

Helper.registerGlobalClass(DateTimeHelper);
