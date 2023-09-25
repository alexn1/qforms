export function registerGlobal(fn: Function): void {
    // debug('registerGlobal', fn.name);
    if (typeof window === 'object') {
        // @ts-ignore
        if (window[fn.name]) throw new Error(`window.${fn.name} already used`);
        // @ts-ignore
        window[fn.name] = fn;
    } else {
        // @ts-ignore
        if (global[fn.name]) throw new Error(`global.${fn.name} already used`);
        // @ts-ignore
        global[fn.name] = fn;
    }
}

export function getGlobal(name: string): any {
    // debug('getGlobal', className);
    // @ts-ignore
    return typeof window === 'object' ? window[name] : global[name];
}
