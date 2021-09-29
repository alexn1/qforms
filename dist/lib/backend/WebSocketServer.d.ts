import BackHostApp from "./BackHostApp";
declare class WebSocketServer {
    backHostApp: BackHostApp;
    server: any;
    constructor(options: any);
    onError(err: any): void;
    onConnection(webSocket: any): Promise<void>;
    onClose(webSocket: any, code: any, reason: any): void;
    onMessage(webSocket: any, data: any, flags: any): void;
}
export = WebSocketServer;
