import { BkHelper } from './BkHelper';

export function getSecretSync(secretFilePath: string): string {
    let secret;
    secret = BkHelper.getFileContentSync(secretFilePath);
    if (secret) {
        return secret;
    }
    secret = BkHelper.getRandomString(20);
    BkHelper.writeFileSync(secretFilePath, secret);
    return secret;
}
