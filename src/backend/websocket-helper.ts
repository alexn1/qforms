export function getWebSocketIP(webSocket: any) {
    return webSocket.upgradeReq.headers['x-real-ip']
        ? webSocket.upgradeReq.headers['x-real-ip']
        : webSocket.upgradeReq.socket.remoteAddress;
}

export function getWebSocketPort(webSocket: any) {
    return webSocket.upgradeReq.headers['x-real-port']
        ? webSocket.upgradeReq.headers['x-real-port']
        : webSocket.upgradeReq.socket.remotePort;
}

/*
 * for Node.js and Bun compatibility
 */
export function getWebsocketUrl(webSocket: any): string {
    const url = webSocket.url || webSocket.upgradeReq?.url;
    if (!url) throw new Error('getWebsocketUrl: cannot get webSocket url');
    return url;
}
