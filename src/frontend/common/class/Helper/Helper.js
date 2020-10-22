'use strict';

class Helper {
    static currentDate() {
        const now = new Date();
        let dd = now.getDate();if (dd < 10) dd = '0' + dd;
        let mm = now.getMonth()+1;if (mm < 10) mm = '0' + mm;   /*January is 0!*/
        const yyyy = now.getFullYear();
        return [yyyy, mm, dd].join('-');
    }

    static currentDateTime() {
        return Helper.currentDate() + ' ' + Helper.currentTime();
    }

    static currentTime() {
        const now = new Date();
        let hh = now.getHours();if (hh < 10) hh = '0' + hh;
        let mm = now.getMinutes();if (mm < 10) mm = '0' + mm;
        let ss = now.getSeconds();if (ss < 10) ss = '0' + ss;
        return [hh, mm, ss].join(':');
    }

    static formatDate(date, format) {
        const YYYY = date.getFullYear();
        const M    = date.getMonth() + 1;
        const D    = date.getDate();
        const h    = date.getHours();
        const m    = date.getMinutes();
        const s    = date.getSeconds();
        const MM = M < 10 ? `0${M}` : M;
        const DD = D < 10 ? `0${D}` : D;
        const hh = h < 10 ? `0${h}` : h;
        const mm = m < 10 ? `0${m}` : m;
        const ss = s < 10 ? `0${s}` : s;
        const values = {YYYY, M, D, h, m, s, MM, DD, hh, mm, ss};
        return format.replace(/\{([\w\.]+)\}/g, (text, name) => values[name] ? values[name] : text);
    }

    static today() {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

}
