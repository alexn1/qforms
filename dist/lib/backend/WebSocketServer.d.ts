declare class WebSocketServer {
    server: any;
    constructor(options: any);
    onError(err: any): void;
    onConnection(webSocket: any): void;
}
export = WebSocketServer;
