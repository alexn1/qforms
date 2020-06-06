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
}
