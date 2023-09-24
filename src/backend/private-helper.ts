import { BkHelper } from './BkHelper';
import { getFileContentSync, writeFileSync } from './file-helper';

export function getRandomString(length: number) {
    function getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const index = getRandomInt(0, chars.length - 1);
        result += chars.substr(index, 1);
    }
    return result;
}

export function checkNodeVersion(minNodeVersion: number): void {
    const [majorNodeVersion] = process.versions.node.split('.');
    if (parseInt(majorNodeVersion) < minNodeVersion) {
        throw new Error(`min node version required ${minNodeVersion}, current ${majorNodeVersion}`);
    }
}

export function getSecretSync(secretFilePath: string): string {
    let secret;
    secret = getFileContentSync(secretFilePath);
    if (secret) {
        return secret;
    }
    secret = getRandomString(20);
    writeFileSync(secretFilePath, secret);
    return secret;
}
