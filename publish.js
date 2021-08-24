const child_process = require('child_process');

main(); async function main() {
    // release branch
    await exec('git checkout release');
    await exec('cd build');
    await exec('npm publish');
    await exec('git checkout master');
}
async function exec(cmd) {
    console.log(cmd);
    return new Promise(function(resolve, reject) {
        const childProcess = child_process.exec(cmd, function(err, stdout, stderr) {
            // console.log('stderr:', stderr);
            if (err) {
                reject(err);
            // } else if (stderr) {
            //     reject(new Error(stderr));
            } else {
                resolve(stderr);
            }
        });
        childProcess.stdout.on('data', data => process.stdout.write(data));
        childProcess.stderr.on('data', data => process.stderr.write(data));
        // childProcess.on('exit', code => console.log(`child process exited with code: ${code}`);
    });
}
