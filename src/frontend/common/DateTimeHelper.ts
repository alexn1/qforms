import { Helper } from './Helper';

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
        return DateTimeHelper.getStartOfDay(now);
    }

    static getStartOfDay(date: Date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
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

    static currentTime() {
        const now = new Date();
        const arrN = [now.getHours(), now.getMinutes(), now.getSeconds()];
        const arrS = arrN.map((n) => n.toString());
        for (let i = 0; i < arrN.length; i++) {
            if (arrN[i] < 10) {
                arrS[i] = '0' + arrS[i];
            }
        }
        return arrS.join(':');
    }
}

Helper.registerGlobalClass(DateTimeHelper);
