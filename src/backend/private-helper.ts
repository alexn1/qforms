import { BkHelper } from './BkHelper';
import { getFileContentSync, writeFileSync } from './FileHelper';

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
    secret = BkHelper.getRandomString(20);
    writeFileSync(secretFilePath, secret);
    return secret;
}
