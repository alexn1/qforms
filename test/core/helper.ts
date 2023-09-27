import child_process from 'child_process';

export async function exec(cmd: string, quiet = true) {
    console.log(cmd);
    return new Promise<void>((resolve, reject) => {
        const childProcess = child_process.exec(cmd, (err, stdout, stderr) => {
            if (err) {
                console.error('callback:', JSON.stringify({ err, stdout, stderr }, null, 4));
                reject(err);
            } else {
                resolve();
            }
        });
        if (!quiet) childProcess.stdout!.on('data', (data) => process.stdout.write(data));
        if (!quiet) childProcess.stderr!.on('data', (data) => process.stderr.write(data));
        childProcess.on('exit', (code) => {
            // console.debug('exit:', code, typeof code);
            if (code) {
                const err = new Error(`"${cmd}" process exited with code: ${code}`);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
