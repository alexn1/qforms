import child_process from 'child_process';

const DB_CONTAINER_NAME = 'postgres';

export function exec(cmd: string, quiet = true, throwError = true): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        let exitCode: number | null;
        const childProcess = child_process.exec(cmd, (err, stdout, stderr) => {
            if (throwError && err) {
                err.code = exitCode ?? undefined;
                // @ts-ignore
                err.stdout = stdout;
                // @ts-ignore
                err.stderr = stderr;
                reject(err);
            } else {
                resolve(stdout);
            }
        });
        childProcess.on('exit', (code: number | null) => (exitCode = code));
        if (!quiet) {
            childProcess.stdout!.on('data', (data) => process.stdout.write(data));
            childProcess.stderr!.on('data', (data) => process.stderr.write(data));
        }
    });
}

export async function createDatabase(dbName: string): Promise<void> {
    await query('postgres', `create database "${dbName}"`);
}

export async function dropDatabase(dbName: string): Promise<void> {
    await query('postgres', `drop database if exists "${dbName}"`);
}

export async function query(dbName: string, sql: string): Promise<void> {
    await exec(`docker exec -i ${DB_CONTAINER_NAME} psql -U postgres -d "${dbName}" -c '${sql}'`);
}
