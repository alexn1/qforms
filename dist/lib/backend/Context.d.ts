declare class Context {
    req: any;
    domain: string;
    uri: string;
    appFileName: string;
    env: string;
    route: string;
    query: any;
    params: any;
    connections: any;
    querytime: any;
    files: any;
    constructor(options: any);
    calcRoute(): string;
    destroy(): void;
    getUser(): any;
    getRoute(): string;
    getVirtualPath(): string;
    getClientTimezoneOffset(): any;
    getTimeOffset(): number;
    getParams(): any;
    getBody(): any;
    getModule(): any;
    getAppDirName(): any;
}
export = Context;
