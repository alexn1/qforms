"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbDatabase = void 0;
const Database_1 = require("../Database");
class MongoDbDatabase extends Database_1.Database {
    async connect(context) {
        const config = this.getConfig();
        console.log('config', config);
        throw new Error('MongoDbDatabase.connect not implemented 2');
    }
}
exports.MongoDbDatabase = MongoDbDatabase;
