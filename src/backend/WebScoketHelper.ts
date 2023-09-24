import { v4 as uuidv4 } from 'uuid';

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

export function newClientId() {
    return uuidv4();
}
