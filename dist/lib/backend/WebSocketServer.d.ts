declare class WebSocketServer {
    server: any;
    clients: any;
    constructor(options: any);
    onError(err: any): void;
    onConnection(webSocket: any): void;
    onClose(webSocket: any, code: any, reason: any): void;
    onMessage(webSocket: any, data: any, flags: any): void;
}
export = WebSocketServer;
