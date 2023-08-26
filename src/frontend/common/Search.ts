export class Search {
    static getObj(): Record<string, string> {
        if (!window.location.search.split('?')[1]) return {};
        return window.location.search
            .split('?')[1]
            .split('&')
            .reduce((acc, item) => {
                const kv = item.split('=');
                acc[kv[0]] = decodeURIComponent(kv[1]);
                return acc;
            }, {} as Record<string, string>);
    }

    /* static objToString(obj) {
        const search = Object.keys(obj)
            .map((name) => `${name}=${encodeURIComponent(obj[name])}`)
            .join('&');
        if (!search) return '';
        return `?${search}`;
    } */

    static filter(...names: string[]): string {
        const newObj: Record<string, string> = {};
        const obj = Search.getObj();
        for (const name of names) {
            if (obj.hasOwnProperty(name)) {
                newObj[name] = obj[name];
            }
        }
        // return Search.objToString(newObj);
        return new URLSearchParams(newObj).toString();
    }
}
