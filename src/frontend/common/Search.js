class Search {
    static getObj() {
        if (!window.location.search.split('?')[1]) return {};
        return window.location.search.split('?')[1].split('&').reduce((acc, item) => {
            const kv = item.split('=');
            acc[kv[0]] = kv[1];
            return acc;
        }, {});
    }
    static objToString(obj) {
        return Object.keys(obj).map(name => `${name}=${obj[name]}`).join('&');
    }
    static filter(names) {
        const newObj = {};
        const obj = Search.getObj();
        for (const name of names) {
            if (obj.hasOwnProperty(name)) {
                newObj[name] = obj[name];
            }
        }
        const search = Search.objToString(newObj);
        if (!search) return '';
        return `?${search}`;
    }
}