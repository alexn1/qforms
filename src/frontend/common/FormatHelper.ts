import { Helper } from './Helper';

export class FormatHelper {
    static formatNumber(value: number): string {
        return new Intl.NumberFormat('ru-RU').format(value);
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

    static formatTime(_sec: number) {
        // debug('FormatHelper.formatTime', sec);
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
            return `${sign}${m}:${s}`;
        } else {
            return `${sign}${h}:${m}:${s}`;
        }
    }

    static formatTime2(_sec: number) {
        // debug('FormatHelper.formatTime', sec);
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

Helper.registerGlobalClass(FormatHelper);
