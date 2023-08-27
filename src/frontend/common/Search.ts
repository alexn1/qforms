export class Search {
    static getObj(): Record<string, string> {
        const params = new URLSearchParams(window.location.search);
        const obj: Record<string, string> = {};
        for (const [name, value] of params) {
            obj[name] = value;
        }
        return obj;
    }

    static objToString(obj: Record<string, string>) {
        const search = new URLSearchParams(obj).toString();
        if (!search) return '';
        return `?${search}`;
    }

    static filter(...names: string[]): string {
        const obj = Search.getObj();
        const newObj: Record<string, string> = {};
        for (const name of names) {
            if (obj.hasOwnProperty(name)) {
                newObj[name] = obj[name];
            }
        }
        return Search.objToString(newObj);
    }
}
