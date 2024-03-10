import child_process from 'child_process';

const DB_CONTAINER_NAME = 'qforms-postgres-test';

export async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

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

export async function restartLocalDb(port: number = 5433): Promise<void> {
    await exec(`docker stop ${DB_CONTAINER_NAME}`, true, false);
    await exec(`docker rm ${DB_CONTAINER_NAME}`, true, false);
    await exec(
        `docker run --name ${DB_CONTAINER_NAME} -p ${port}:5432 -e POSTGRES_PASSWORD=example -d postgres:12-alpine`,
    );
    await sleep(3500);
}

export async function createDatabase(dbName: string) {
    await query('postgres', `create database ${dbName}`);
}

export async function query(dbName: string, sql: string) {
    await exec(`docker exec -i ${DB_CONTAINER_NAME} psql -U postgres -d ${dbName} -c '${sql}'`);
}
