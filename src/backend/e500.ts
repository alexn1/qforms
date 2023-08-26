export function e500(status: number, message: string, stack: string): string {
    return `<!DOCTYPE html>
<html>
<title>${status} ${message}</title>
    <body>
        <h1>${message}</h1>
        <h2>${status}</h2>
        <pre>${stack}</pre>
    </body>
</html>`;
}
