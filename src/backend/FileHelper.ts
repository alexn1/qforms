import glob from 'glob';
import path from 'path';

export function _getFilePathsSync(dirPath: string, ext: string) {
    const filePaths = glob.sync(path.join(dirPath, '*.' + ext));
    glob.sync(path.join(dirPath, '*/')).forEach((subDirPath) => {
        _getFilePathsSync(subDirPath, ext).forEach((fileName) => {
            filePaths.push(fileName);
        });
    });
    return filePaths;
}

export async function _getFilePaths2(dirPath: string, ext: string, filePaths: string[]) {
    // debug('_getFilePaths2', dirPath);
    // all files from directory
    const files = await _glob(path.join(dirPath, '*.' + ext));

    // pushing files to output array
    files.forEach((item) => {
        filePaths.push(item);
    });
    // all directories from directory
    const dirs = await _glob(path.join(dirPath, '*/'));

    // for each dir push files to output array
    for (let i = 0; i < dirs.length; i++) {
        const subDirPath = dirs[i];
        await _getFilePaths2(subDirPath, ext, filePaths);
    }
}

export function _glob(path: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
        glob(path, (err, items) => {
            if (err) {
                reject(err);
            } else {
                resolve(items);
            }
        });
    });
}
