import BackHostApp = require("./BackHostApp");
declare class WebSocketServer {
    options: any;
    server: any;
    constructor(options: any);
    onError(err: any): Promise<void>;
    onConnection(webSocket: any): Promise<void>;
    onClose(webSocket: any, code: any, reason: any): Promise<void>;
    onMessage(webSocket: any, data: any, flags: any): Promise<void>;
    getHostApp(): BackHostApp;
}
export = WebSocketServer;
