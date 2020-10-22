document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded');

    // Аналог $(document).ready(function() {
    // Если должен быть найден один элемент
    // if ((e = document.querySelector("#form_error_message_frontend + div > div:last-child label")) !== null) {
    //     e.classList.add('last'); // Аналог выборки и присвоения класса
    // }

    // Если элементов будет много
    // "#form_error_message_frontend + div > div:last-child label"

    const elements = document.querySelectorAll('.checkmark');
    console.log('elements:', elements);
    elements.forEach(e => {
        e.classList.add('last');
        /*e.onmouseover = () => {
            console.log('onmouseover');
        };*/
    });

    const box = document.querySelector('.box');
    box.onclick = () => {
        console.log('click');
    }
    box.onmousedown = () => {
        console.log('down');
    }
    box.onmouseup = () => {
        console.log('up');
    }
    /*const textarea = document.querySelector('textarea');
    const isoString = '2020-09-04T17:00:00.000Z';
    const date = new Date(isoString);
    console.log('date:', date);
    console.log('date.toString():', date.toString());
    console.log('JSON.stringify(date):', JSON.stringify(date));
    console.log('date.toISOString():', date.toISOString());
    console.log('date instanceof Date', date instanceof Date);
    // textarea.value = JSON.stringify({field: date});
    textarea.value = date.toISOString();*/

    console.log('date:', formatDate(new Date(), '{YYYY}-{MM}-{DD}'));
    console.log('date:', formatDate(new Date(), '{DD}.{MM}.{YYYY} {hh}:{mm}:{ss}'));

    dateTimeReviver = function (key, value) {
        if (typeof value === 'string') {
            const a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/.exec(value);
            if (a) return new Date(value);
        }
        return value;
    }

    const value = [new Date(), 1, null];
    console.log('value:', value);
    const json = JSON.stringify(value.map(val => JSON.stringify(val)));
    console.log('json:', json);

    const value2 = JSON.parse(json);
    console.log('value2:', value2);
    console.log("parsed:", value2.map(val => JSON.parse(val, dateTimeReviver)));

    // console.log(JSON.parse("{\"abc\": \"2020-10-22T19:41:41.043Z\"}"));
    //
    // console.log(JSON.parse("{\"abc\": \"2020-10-22T19:41:41.043Z\"}", dateTimeReviver));

});

function formatDate(date, format) {
    const YYYY = date.getFullYear();
    const M    = date.getMonth();
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
