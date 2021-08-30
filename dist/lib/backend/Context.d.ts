declare class Context {
    req: any;
    domain: string;
    query: any;
    params: any;
    connections: any;
    querytime: any;
    files: any;
    constructor(options: any);
    getRoute(): string;
    destroy(): void;
    getUser(): any;
    getVirtualPath(): string;
    getClientTimezoneOffset(): number;
    getTimeOffset(): number;
    getParams(): any;
    getBody(): any;
    getModule(): string;
    getAppDirName(): string;
    getAppFileName(): string;
    getEnv(): string;
    getUri(): string;
}
export = Context;
