declare class Context {
    options: any;
    query: any;
    params: any;
    files: any;
    connections: any;
    querytime: any;
    constructor(options: any);
    getRoute(): string;
    getUser(): any;
    getClientTimezoneOffset(): number;
    getTimeOffset(): number;
    getParams(): any;
    getReq(): any;
    getDomain(): any;
    getBody(): any;
    getAppDirName(): string;
    getAppFileName(): string;
    getEnv(): string;
    getUri(): string;
    getIp(): string;
    destroy(): void;
}
export = Context;
