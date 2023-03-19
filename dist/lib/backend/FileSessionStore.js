"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSessionStore = void 0;
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
// import colors from 'colors/safe';
const BkHelper_1 = require("./BkHelper");
class FileSessionStore extends express_session_1.default.Store {
    constructor(dirPath) {
        // console.log('FileSessionStore.constructor', dirPath);
        super();
        this.dirPath = dirPath;
        this.store = {};
    }
    set(sid, session, cb) {
        console.log('FileSessionStore.set', sid, session);
        this.store[sid] = session;
        const sessionFilePath = path_1.default.join(this.dirPath, `${sid}.json`);
        const content = JSON.stringify(session, null, 4);
        BkHelper_1.BkHelper.writeFile(sessionFilePath, content).then(() => {
            cb(null);
        });
    }
    get(sid, cb) {
        // console.log('FileSessionStore.get', sid);
        const session = this.store[sid];
        if (session) {
            cb(null, session);
        }
        else {
            const sessionFilePath = path_1.default.join(this.dirPath, `${sid}.json`);
            BkHelper_1.BkHelper.getFileContent(sessionFilePath).then((content) => {
                if (content) {
                    try {
                        const session = (this.store[sid] = JSON.parse(content));
                        cb(null, session);
                    }
                    catch (err) {
                        cb(err);
                    }
                }
                else {
                    cb(null, null);
                }
            });
        }
    }
    destroy(sid, cb) {
        console.log('FileSessionStore.destroy', sid);
        delete this.store[sid];
        cb(null);
    }
}
exports.FileSessionStore = FileSessionStore;
