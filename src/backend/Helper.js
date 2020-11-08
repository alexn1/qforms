'use strict';

const glob       = require('glob');
const path       = require('path');
const slash      = require('slash');
const fs         = require('fs');
// const fsPromises = require('fs').promises;       // node v12
const _          = require('underscore');
const Promise    = require('bluebird');
const BaseModel = require('./BaseModel');

const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
};

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

function getRandomString(length) {
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

String.prototype.template = function (values) {
    return this.replace(/\{([\w]+)\}/g, (text, name) => {
        return values.hasOwnProperty(name) ? values[name] : text;
    });
};

class Helper {
    static getFilePathsSync(publicDirPath, subDirPath, ext) {
        return _getFilePathsSync(path.join(publicDirPath, subDirPath), ext).map(filePath => {
            return slash(path.relative(publicDirPath, filePath));
        });
    }

    static _glob(path) {
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

    static async getFilePaths(publicDirPath, subDirPath, ext) {
        // console.log('Helper.getFilePaths');
        const filePaths = [];
        await _getFilePaths2(path.join(publicDirPath, subDirPath), ext, filePaths);
        const relativeFilePaths = filePaths.map(filePath => {
            return slash(path.relative(path.join(publicDirPath, subDirPath), filePath));
        });
        return relativeFilePaths;
    }


    static async getAppInfo(appFilePath, env) {
        // console.log('Helper.getAppInfo', appFilePath);
        const content = await Helper.readTextFile(appFilePath);
        const data = JSON.parse(content);
        if (data['@class'] && data['@class'] === 'Application') {
            const appInfo = Helper.getAppInfoFromData(appFilePath, data, env);
            return appInfo;
        }
        return null;
    }

    static getAppInfoFromData(appFilePath, data, env) {
        // console.log('getAppInfoFromData:', appFilePath, data);
        if (!env) throw new Error('no env');
        const fileName = path.basename(appFilePath, path.extname(appFilePath));
        const dirName  = path.basename(path.dirname(appFilePath));
        return {
            name        : BaseModel.getAttr(data, 'name'),
            caption     : BaseModel.getAttr(data, 'caption'),
            fullName    : [dirName, fileName].join('/'),
            envs        : BaseModel.getEnvList(data),
            route       : [dirName, fileName, env].join('/'),
            fileName    : fileName,
            dirName     : dirName,
            filePath    : path.resolve(appFilePath),
            fileNameExt : path.basename(appFilePath),
            extName     : path.extname(appFilePath),
            dirPath     : path.resolve(path.dirname(appFilePath))
        };
    }

    static async getAppInfos(appsDirPath) {
        console.log('Helper.getAppInfos', appsDirPath);
        const appFilesPaths = await Helper._glob(path.join(appsDirPath, '*/*.json'));
        const appInfos = [];
        for (let i = 0; i < appFilesPaths.length; i++) {
            const appFilePath = appFilesPaths[i];
            const appInfo = await Helper.getAppInfo(appFilePath, 'local');
            if (appInfo) {
                appInfos.push(appInfo);
            }
        }
        return appInfos;
    }

    static currentTime() {
        const now = new Date();
        let hh = now.getHours();   if (hh < 10) hh = '0' + hh;
        let mm = now.getMinutes(); if (mm < 10) mm = '0' + mm;
        let ss = now.getSeconds(); if (ss < 10) ss = '0' + ss;
        return [hh, mm, ss].join(':');
    }

    static currentDate() {
        const now = new Date();
        let dd   = now.getDate();      if (dd < 10) dd = '0' + dd;
        let mm   = now.getMonth() + 1; if (mm < 10) mm = '0' + mm;   /*January is 0!*/
        const yyyy = now.getFullYear();
        return [yyyy, mm, dd].join('-');
    }

    static currentDateTime() {
        return Helper.currentDate() + ' ' + Helper.currentTime();
    }

    static templateValue(value, params) {
        return value.replace(/\{([\w\.@]+)\}/g, (text, name) => {
            if (params.hasOwnProperty(name)) {
                return params[name];
            } else {
                return null;
            }
        });
    }

    static getCommandLineParams() {
        const params = process.argv.map(arg => {
            const param = arg.split('=');
            return {
                name  : param[0],
                value : param[1]
            }
        });
        return _.object(
            params.map(param => {
                return param.name;
            }),
            params.map(param => {
                return param.value;
            })
        );
    }

    static replaceKey(obj, key1, key2) {
        const keys   = Object.keys(obj);
        const values = _.filter(obj, () => {return true;});
        const index  = keys.indexOf(key1);
        if (index !== -1) {
            keys[index] = key2;
            obj = _.object(keys, values);
        }
        return obj;
    }

    static readTextFile(path) {
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

        // return new Promise((resolve, reject) => {
        //     fs.exists(filePath, exists => {
        //         if (exists) {
        //             Helper.readTextFile(filePath).then(resolve).catch(reject);
        //             /*
        //             fs.readFile(filePath, 'utf8', (err, content) => {
        //                 if (err) {
        //                     reject(err);
        //                 } else {
        //                     resolve(content);
        //                 }
        //             });*/
        //         } else {
        //             resolve(null);
        //         }
        //     });
        // });
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

    static putFileContent(filePath, content) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, content, 'utf8', (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static createDirIfNotExists(dirPath) {
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

    static moveObjProp(obj, prop, offset) {
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
    }

    static getTempSubDirPath3(tempDirPath) {
        return new Promise((resolve, reject) => {
            const subDirName = getRandomString(8);
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
    }

    static copyFile3(source, target) {
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
        //console.log('Helper.exists');
        return new Promise(resolve => {
            fs.exists(path, exists => {
                resolve(exists);
            });
        });
    }

    static writeFile(path, content) {
        //console.log('Helper.writeFile');
        return new Promise((resolve, reject) => {
            fs.writeFile(path, content, 'utf8', err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static escapeHtml(string) {
        if (typeof string !== 'string') throw new Error(`escapeHtml: value not string: ${string}`);
        return String(string).replace(/[&<>"'`=\/]/g, s => entityMap[s]);
    }

    static mapObject(object, cb) {
        return Object.keys(object).reduce((obj, key) => {
            const [newKey, newVal] = cb(key, object[key]);
            obj[newKey] = newVal;
            return obj;
        }, {});
    }

    static fsUnlink(filePath) {
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

    static today() {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    static dateTimeReviver(key, value) {
        if (typeof value === 'string') {
            const a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/.exec(value);
            if (a) return new Date(value);
        }
        return value;
    }

    static decodeValue(rawValue) {
        return JSON.parse(rawValue, Helper.dateTimeReviver);
    }
}

module.exports = Helper;
