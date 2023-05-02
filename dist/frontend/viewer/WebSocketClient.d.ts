export declare class WebSocketClient {
    options: any;
    url: string;
    webSocket: any;
    refreshTimeoutId: any;
    RECONNECT_TIMEOUT: number;
    REFRESH_TIMEOUT: number;
    constructor(options?: any);
    createUriParamsString(options: any): string;
    connect(): Promise<unknown>;
    onRefreshTimeout(): Promise<void>;
    send(data: any): void;
    startRefreshTimeout(): void;
    resetRefreshTimeout(): void;
    reconnect(): Promise<void>;
    onClose(e: any): Promise<void>;
    onMessage(e: any): Promise<void>;
    getApp(): any;
}
