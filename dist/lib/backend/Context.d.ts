declare class Context {
    options: any;
    query: any;
    params: any;
    connections: any;
    querytime: any;
    files: any;
    constructor(options: any);
    getRoute(): string;
    destroy(): void;
    getUser(): any;
    getClientTimezoneOffset(): number;
    getTimeOffset(): number;
    getParams(): any;
    getReq(): any;
    getDomain(): any;
    getBody(): any;
    getModule(): string;
    getAppDirName(): string;
    getAppFileName(): string;
    getEnv(): string;
    getUri(): string;
    getIp(): string;
}
export = Context;
