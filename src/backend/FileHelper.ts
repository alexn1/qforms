import colors from 'colors/safe';
import path from 'path';
import fs from 'fs';
import glob from 'glob';
import { access } from 'node:fs/promises';
import { pConsole } from '../pConsole';
// import slash from 'slash';

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

export function getFilePathsSync(publicDirPath: string, subDirPath: string, ext: string) {
    return _getFilePathsSync(path.join(publicDirPath, subDirPath), ext) /* .map((filePath) => {
        return slash(path.relative(publicDirPath, filePath));
    }) */;
}

export async function getFilePaths(dirPath: string, ext: string): Promise<string[]> {
    // debug('getFilePaths');
    const filePaths: string[] = [];
    await _getFilePaths2(dirPath, ext, filePaths);
    const relativeFilePaths = filePaths; /* .map((filePath) => {
        return slash(path.relative(dirPath, filePath));
    }) */
    return relativeFilePaths;
}

export function readTextFile(path: string): Promise<string> {
    // debug(colors.blue('readTextFile'), path);
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, content) => {
            if (err) {
                reject(err);
            } else {
                resolve(content);
            }
        });
    });
}

export async function exists2(path: fs.PathLike): Promise<boolean> {
    try {
        await access(path);
        return true;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        } else {
            throw err;
        }
    }
}

export async function getFileContent(filePath: string) {
    if (await exists2(filePath)) {
        return readTextFile(filePath);
    }
    return null;
}

export function getFileContentSync(filePath: string) {
    // debug(colors.blue('getFileContentSync'), filePath);
    if (!fs.existsSync(filePath)) {
        return null;
    }
    return fs.readFileSync(filePath, 'utf8');
}

export function readBinaryFile(filePath: string) {
    pConsole.debug(colors.blue('readBinaryFile'), filePath);
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

export function createPath(arr: string[]) {
    if (arr.length === 0) throw new Error('no path elements');
    if (arr.length === 1) return '/';
    return arr.join('/');
}

export function getDirPath(filePath: string) {
    const arr = filePath.split('/');
    return createPath(arr.slice(0, arr.length - 1));
}

export function createDirIfNotExists(dirPath: string): Promise<void> {
    pConsole.debug(colors.blue('createDirIfNotExists'), dirPath);
    return new Promise((resolve, reject) => {
        fs.exists(dirPath, (exists) => {
            if (exists) {
                resolve();
            } else {
                fs.mkdir(dirPath, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }
        });
    });
}

export async function createDirIfNotExists2(originalDirPath: string) {
    // debug('createDirIfNotExists2', originalDirPath);
    const arr = originalDirPath.split('/');
    for (let i = 1; i <= arr.length; i++) {
        const dirPath = createPath(arr.slice(0, i));
        const exists = await exists2(dirPath);
        if (!exists) {
            await createDirIfNotExists(dirPath);
        }
    }
}


export function createDirIfNotExistsSync(dirPath: string) {
    // debug(colors.blue('createDirIfNotExistsSync'), dirPath);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
}