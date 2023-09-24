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
}

Helper.registerGlobalClass(DateTimeHelper);
