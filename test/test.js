const Helper = require('../dist/lib/backend/Helper');
function dateTimeReviver(key, value) {
    if (typeof value === 'string') {
        // x* опоставляется с предшествующим элементом x ноль или более раз.
        // x? Сопоставляется с предшествующим элементом x ноль или один раз.
        const a =
            /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{3})?(Z|([+-])(\d{2}):(\d{2}))?$/
                .exec(value);
        console.log('a:', a);
        if (a) return new Date(value);
    }
    return value;
}

main(); async function main() {
    // const json = '"2021-04-08T09:45:48.594Z"';
    const json = '"2021-08-08T12:00:00"';
    const value = JSON.parse(json, dateTimeReviver);
    console.log('value:', value);
}
