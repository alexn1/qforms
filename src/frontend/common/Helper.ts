import { JSONString, Query, QueryRecord, KeyTuple, Key } from '../../types';

export class Helper {
    static formatNumber(value: number): string {
        return new Intl.NumberFormat('ru-RU').format(value);
    }

    static encodeObject(obj: Record<string, any>): Record<string, JSONString> {
        const eObj = {} as Record<string, any>;
        for (const name in obj) {
            eObj[name] = Helper.encodeValue(obj[name]);
        }
        return eObj;
    }

    static encodeValue<T>(value: T): JSONString<T> {
        return JSON.stringify(value) as JSONString<T>;
    }

    static decodeObject(eObj: Record<string, JSONString>): Record<string, any> {
        if (!eObj) throw new Error('Helper.decodeObject: no object');
        const obj = {} as Record<string, any>;
        for (const name in eObj) {
            if (typeof eObj[name] !== 'string') {
                throw new Error(
                    `decodeObject: cannot decode field: ${name}, type: ${typeof eObj[
                        name
                    ]}, value: ${eObj[name]}`,
                );
            }
            obj[name] = Helper.decodeValue(eObj[name]);
        }
        return obj;
    }

    /* static decodeValue(raw: JSONString): any {
        // try {
        return JSON.parse(raw, Helper.dateTimeReviver);
        // } catch (err) {
        //     // debug('raw:', raw);
        //     throw err;
        // }
    } */

    static decodeValue(raw: JSONString): any {
        if (raw === undefined) throw new Error('decodeValue: undefined');
        if (raw === null) throw new Error('decodeValue: null');
        if (raw === '') throw new Error('decodeValue: empty string');
        try {
            return JSON.parse(raw, Helper.dateTimeReviver);
        } catch (err) {
            throw new Error(`decodeValue failed: ${err.message}, raw: "${raw}"`);
        }
    }

    static dateTimeReviver(key: string, value: any) {
        if (typeof value === 'string') {
            const a =
                /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{3})?(Z|([+-])(\d{2}):(\d{2}))?$/.exec(
                    value,
                );
            if (a) return new Date(value);
        }
        return value;
    }

    static moveArrItem(arr: any[], item: any, offset: number) {
        const oldIndex = arr.indexOf(item);
        if (oldIndex === -1) throw new Error('cannot find element');
        const newIndex = oldIndex + offset;
        if (newIndex < 0) throw new Error('cannot up top element');
        if (newIndex > arr.length - 1) throw new Error('cannot down bottom element');
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    }

    static fillArray(n: number): number[] {
        return Array.from(Array(n).keys());
    }

    // static inIframe(): boolean {
    //     return false;
    //     /* try {
    //         return window.self !== window.top;
    //     } catch (e) {
    //         return false;
    //     } */
    // }

    static sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    static registerGlobalClass(Class: any) {
        // debug('Helper.registerGlobalClass', Class.name);
        if (typeof window === 'object') {
            if (window[Class.name]) throw new Error(`window.${Class.name} already used`);
            window[Class.name] = Class;
        } else {
            // @ts-ignore
            if (global[Class.name]) throw new Error(`global.${Class.name} already used`);
            // @ts-ignore
            global[Class.name] = Class;
        }
    }

    static getGlobalClass(className: string): any {
        // debug('Helper.getGlobalClass', className);
        // @ts-ignore
        return typeof window === 'object' ? window[className] : global[className];
    }

    static addClassToDocumentElement(className: string) {
        if (typeof document === 'object') {
            document.documentElement.classList.add(className);
        }
    }

    static headersToRecord(headers: Headers): Record<string, string> {
        return Array.from(headers.entries()).reduce(
            (acc: Record<string, string>, header: [string, string]) => {
                const [name, value] = header;
                acc[name] = value;
                return acc;
            },
            {} as Record<string, string>,
        );
    }

    static queryToString(query: Query) {
        // pConsole.debug('Helper.queryToString', query);
        return Object.keys(query)
            .filter((name: keyof Query) => query[name] !== undefined)
            .map((name: keyof Query) => {
                const value = query[name];
                if (typeof value === 'string') {
                    return `${name}=${encodeURIComponent(value)}`;
                }
                return Helper.queryRecordToString(name, value);
            })
            .join('&');
    }

    static queryRecordToString(name: string, record: QueryRecord) {
        // pConsole.debug('Helper.queryRecordToString', name, record);
        return Object.keys(record)
            .filter((field: keyof QueryRecord) => record[field] !== undefined)
            .map((field: keyof QueryRecord) => {
                const val = encodeURIComponent(record[field])
                    .replace(/^%22/, '"')
                    .replace(/%22$/, '"')
                    .replace(/%20/g, '+');
                return `${name}[${field}]=${val}`;
            })
            .join('&');
    }

    static keyTupleToKey(keyArray: KeyTuple): Key {
        return JSON.stringify(keyArray) as Key;
    }

    static keyToKeyTuple(key: Key): KeyTuple {
        return JSON.parse(key);
    }

    static getFirstField(object: any) {
        const [key] = Object.keys(object);
        if (!key) throw new Error('getFirstField: no fields');
        return object[key];
    }

    static mapObject(object: any, cb: any) {
        return Object.keys(object).reduce((obj: any, key) => {
            const [newKey, newVal] = cb(key, object[key]) as [string, any];
            obj[newKey] = newVal;
            return obj;
        }, {});
    }

    static templateArray(arr: any[]) {
        return arr.map((item) => {
            const type = typeof item;
            if (type === 'number' || type === 'boolean') {
                return item;
            }
            if (type === 'string') {
                return `'${item}'`;
            }
            throw new Error(`wrong type for array item: ${type}`);
        });
    }

    static templateToJsString(value: string, params: Record<string, any>) {
        return value.replace(/\$\{([\w.@]+)\}/g, (text, name) => {
            if (params.hasOwnProperty(name)) {
                return `Helper.decodeValue('${Helper.encodeValue(params[name])}')`;
            }
            return 'undefined';
        });
    }
}

Helper.registerGlobalClass(Helper);
