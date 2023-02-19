"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSessionStore = void 0;
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
// const colors = require('colors/safe');
const Helper_1 = require("./Helper");
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
        Helper_1.Helper.writeFile(sessionFilePath, content).then(() => {
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
            Helper_1.Helper.getFileContent(sessionFilePath).then((content) => {
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
