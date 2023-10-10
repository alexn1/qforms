import child_process from 'child_process';

export async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function exec(cmd: string, quiet = true, throwError = true): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const childProcess = child_process.exec(cmd, (err, stdout, stderr) => {
            if (throwError && err) {
                reject(err);
            } else {
                resolve();
            }
        });
        if (!quiet) childProcess.stdout!.on('data', (data) => process.stdout.write(data));
        if (!quiet) childProcess.stderr!.on('data', (data) => process.stderr.write(data));
    });
}

export async function restartLocalDb(port: number = 5433): Promise<void> {
    await exec('docker stop postgres-test', true, false);
    await exec('docker rm postgres-test', true, false);
    await exec(
        `docker run --name postgres-test -p ${port}:5432 -e POSTGRES_PASSWORD=example -d postgres:12-alpine`,
    );
    await sleep(3500);
}

export async function createDatabase(dbName: string) {
    await query('postgres', `create database ${dbName}`);
}

export async function query(dbName: string, sql: string) {
    await exec(`docker exec -i postgres-test psql -U postgres -d ${dbName} -c '${sql}'`);
}
