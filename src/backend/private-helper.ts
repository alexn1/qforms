export function checkNodeVersion(minNodeVersion: number): void {
    const [majorNodeVersion] = process.versions.node.split('.');
    if (parseInt(majorNodeVersion) < minNodeVersion) {
        throw new Error(`min node version required ${minNodeVersion}, current ${majorNodeVersion}`);
    }
}

export function isDev() {
    return process.env.NODE_ENV === 'dev';
}
