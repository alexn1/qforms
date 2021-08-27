const glob       = require('glob');
const path       = require('path');
const slash      = require('slash');
const fs         = require('fs');

function _getFilePathsSync(dirPath, ext) {
    const filePaths = glob.sync(path.join(dirPath, '*.' + ext));
    glob.sync(path.join(dirPath, '*/')).forEach(subDirPath => {
        _getFilePathsSync(subDirPath, ext).forEach(fileName => {
            filePaths.push(fileName);
        });
    });
    return filePaths;
}

async function _getFilePaths2(dirPath, ext, filePaths) {
    // console.log('_getFilePaths2', dirPath);
    // all files from directory
    const files = await Helper._glob(path.join(dirPath, '*.' + ext));

    // pushing files to output array
    files.forEach(item => {
        filePaths.push(item);
    });
    // all directories from directory
    const dirs = await Helper._glob(path.join(dirPath, '*/'));

    // for each dir push files to output array
    for (let i = 0; i < dirs.length; i++) {
        const subDirPath = dirs[i];
        await _getFilePaths2(subDirPath, ext, filePaths);
    }
}

class Helper {
    static getRandomString(length) {
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const index = getRandomInt(0, chars.length - 1);
            result += chars.substr(index, 1);
        }
        return result;
    }

    static getFilePathsSync(publicDirPath, subDirPath, ext) {
        return _getFilePathsSync(path.join(publicDirPath, subDirPath), ext).map(filePath => {
            return slash(path.relative(publicDirPath, filePath));
        });
    }

    static _glob(path): Promise<any[]> {
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

    static async getFilePaths(dirPath, ext): Promise<string[]> {
        // console.log('Helper.getFilePaths');
        const filePaths = [];
        await _getFilePaths2(dirPath, ext, filePaths);
        const relativeFilePaths = filePaths.map(filePath => {
            return slash(path.relative(dirPath, filePath));
        });
        return relativeFilePaths;
    }

    static currentTime() {
        const now = new Date();
        const arrN = [now.getHours(), now.getMinutes(), now.getSeconds()];
        const arrS = arrN.map(n => n.toString());
        for (let i = 0; i < arrN.length; i++) {
            if (arrN[i] < 10) {
                arrS[i] = '0' + arrS[i];
            }
        }

        /*
        let hh = now.getHours();
        let mm = now.getMinutes();
        let ss = now.getSeconds();

        let _hh = hh.toString();
        let _mm = mm.toString();
        let _ss = ss.toString();

        if (hh < 10) _hh = '0' + _hh;
        if (mm < 10) _mm = '0' + mm;
        if (ss < 10) _ss = '0' + ss;


        return [_hh, _mm, _ss].join(':');*/
        return arrS.join(':');
    }

    /*static currentDate() {
        const now = new Date();
        let dd   = now.getDate();      if (dd < 10) dd = '0' + dd;
        let mm   = now.getMonth() + 1; if (mm < 10) mm = '0' + mm;   /!*January is 0!*!/
        const yyyy = now.getFullYear();
        return [yyyy, mm, dd].join('-');
    }*/

    /*static currentDateTime() {
        return Helper.currentDate() + ' ' + Helper.currentTime();
    }*/

    static templateToJsString(value, params) {
        return value.replace(/\$\{([\w\.@]+)\}/g, (text, name) => {
            if (params.hasOwnProperty(name)) {
                return `Helper.decodeValue('${Helper.encodeValue(params[name])}')`;
            }
            return 'undefined';
        });
    }

    /*static replaceKey(obj, key1, key2) {
        const keys   = Object.keys(obj);
        const values = _.filter(obj, () => {return true;});
        const index  = keys.indexOf(key1);
        if (index !== -1) {
            keys[index] = key2;
            obj = _.object(keys, values);
        }
        return obj;
    }*/

    static readTextFile(path): Promise<string> {
        // console.log('Helper.readTextFile', path);
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', (err, content) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(content);
                }
            });
        });
    }

    static async getFileContent(filePath) {
        if (await Helper.exists(filePath)) {
            return Helper.readTextFile(filePath);
        }
        return null;
    }
    static getFileContentSync(filePath) {
        if (!fs.existsSync(filePath)) {
            return null;
        }
        return fs.readFileSync(filePath, 'utf8');
    }

    static readBinaryFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data);
                }
            });
        });
    }

    static createPath(arr) {
        if (arr.length === 0) throw new Error('no path elements');
        if (arr.length === 1) return '/';
        return arr.join('/');
    }

    static getDirPath(filePath) {
        const arr = filePath.split('/');
        return Helper.createPath(arr.slice(0, arr.length - 1));
    }

    static async createDirIfNotExists2(originalDirPath) {
        console.log('Helper.createDirIfNotExists2', originalDirPath);
        const arr = originalDirPath.split('/');
        for (let i = 1; i <= arr.length; i++) {
            const dirPath = Helper.createPath(arr.slice(0, i));
            const exists = await Helper.exists(dirPath);
            // console.log('dirPath', i, dirPath, exists);
            if (!exists) {
                await Helper.createDirIfNotExists(dirPath);
            }
        }
    }

    static createDirIfNotExists(dirPath): Promise<void> {
        console.log('Helper.createDirIfNotExists', dirPath);
        return new Promise((resolve, reject) => {
            fs.exists(dirPath, exists => {
                if (exists) {
                    resolve();
                } else {
                    fs.mkdir(dirPath, err => {
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

    static createDirIfNotExistsSync(dirPath) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
    }

    /*static moveObjProp(obj, prop, offset) {
        const keys     = _.keys(obj);
        const values   = _.values(obj);
        const oldIndex = keys.indexOf(prop);
        if (oldIndex === -1) {
            throw new Error('cannot find element');
        }
        const newIndex = oldIndex + offset;
        if (newIndex < 0) {
            throw new Error('cannot up top element');
        }
        if (newIndex > values.length - 1) {
            throw new Error('cannot down bottom element');
        }
        keys.splice(newIndex, 0,   keys.splice(oldIndex, 1)[0]);
        values.splice(newIndex, 0, values.splice(oldIndex, 1)[0]);
        return _.object(keys, values);
    }*/

    static moveArrItem(arr, item, offset) {
        const oldIndex = arr.indexOf(item);
        if (oldIndex === -1) throw new Error('cannot find element');
        const newIndex = oldIndex + offset;
        if (newIndex < 0) throw new Error('cannot up top element');
        if (newIndex > arr.length - 1) throw new Error('cannot down bottom element');
        arr.splice(newIndex, 0,   arr.splice(oldIndex, 1)[0]);
    }

    /*static getTempSubDirPath3(tempDirPath) {
        return new Promise((resolve, reject) => {
            const subDirName = Helper.getRandomString(8);
            const tempSubSirPath = path.join(tempDirPath, subDirName);
            fs.exists(tempSubSirPath, exists => {
                if (!exists) {
                    fs.mkdir(tempSubSirPath, err => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(tempSubSirPath);
                        }
                    });
                } else {
                    Helper.getTempSubDirPath(tempDirPath, () => {
                        resolve();
                    });
                }
            });
        });
    }*/

    static copyFile3(source, target): Promise<void> {
        return new Promise((resolve, reject) => {
            const rd = fs.createReadStream(source);
            rd.on('error', err => {
                reject(err);
            });
            const wr = fs.createWriteStream(target);
            wr.on('error', err => {
                reject(err);
            });
            wr.on('close', () => {
                resolve();
            });
            rd.pipe(wr);
        });
    }

    static exists(path) {
        // console.log('Helper.exists', path);
        return new Promise(resolve => {
            fs.exists(path, exists => {
                resolve(exists);
            });
        });
    }

    static writeFile(filePath, content): Promise<void> {
        // console.log('Helper.writeFile', filePath);
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, content, 'utf8', err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
    static writeFileSync(filePath, content) {
        // console.log('writeFileSync', filePath, content);
        return fs.writeFileSync(filePath, content, 'utf8');
    }

    static async writeFile2(filePath, content) {
        const dirPath = Helper.getDirPath(filePath);
        await Helper.createDirIfNotExists2(dirPath);
        return await Helper.writeFile(filePath, content);
    }

    static mapObject(object, cb) {
        return Object.keys(object).reduce((obj, key) => {
            const [newKey, newVal] = cb(key, object[key]);
            obj[newKey] = newVal;
            return obj;
        }, {});
    }

    static fsUnlink(filePath): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.unlink(filePath, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    // timeOffset number in minutes
    static today(timeOffset) {
        console.log('Helper.today', timeOffset);
        let ts = Date.now();
        if (timeOffset !== undefined && timeOffset !== null) {
            ts += Helper.MINUTE() * timeOffset;
        }
        const date = new Date(ts);
        ts = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
        if (timeOffset !== undefined && timeOffset !== null) {
            ts -= Helper.MINUTE() * timeOffset;
        }
        return new Date(ts);
    }

    static dateTimeReviver(key, value) {
        if (typeof value === 'string') {
            const a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/.exec(value);
            if (a) return new Date(value);
        }
        return value;
    }

    static decodeValue(rawValue) {
        if (rawValue === undefined) throw new Error('decodeValue undefined');
        if (rawValue === null) throw new Error('decodeValue null');
        try {
            return JSON.parse(rawValue, Helper.dateTimeReviver);
        } catch (err) {
            throw new Error(`decodeValue failed: ${rawValue}`);
        }
    }
    static encodeValue(value) {
        return JSON.stringify(value);
    }
    static decodeObject(obj) {
        const dObj = {};
        for (const name in obj) {
            if (typeof obj[name] !== 'string') throw new Error(`cannot decode: ${name}, type: ${typeof obj[name]}`);
            dObj[name] = Helper.decodeValue(obj[name]);
        }
        return dObj;
    }
    static decodeChanges(changes) {
        const dChanges = {};
        for (const key in changes) {
            dChanges[key] = Helper.decodeObject(changes[key]);
        }
        return dChanges;
    }
    static SECOND() {
        return 1000;
    }
    static MINUTE() {
        return 60 * Helper.SECOND();
    }
    static HOUR() {
        return 60*Helper.MINUTE();
    }
    static DAY() {
        return 24*Helper.HOUR();
    }
    static Session_save(session): Promise<void> {
        return new Promise((resolve, reject) => {
            session.save(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        })
    }
}

export = Helper;
