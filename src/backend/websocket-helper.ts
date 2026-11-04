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
export function getWebsocketUrl(webSocket: any, req?: { url?: string }): string {
    // Node.js (ws 2.x): webSocket.upgradeReq.url; Bun: second 'connection' argument (req)
    const url = req?.url || webSocket.upgradeReq?.url || webSocket.url;
    if (!url) throw new Error('getWebsocketUrl: cannot get webSocket url');
    return url;
}
