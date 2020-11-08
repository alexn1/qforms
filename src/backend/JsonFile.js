'use strict';

const Helper = require('./Helper');

class JsonFile {
    constructor(filePath, data) {
        this.filePath = filePath;
        this.content  = null;
        this.data     = data || null;
    }

    async create() {
        const exists = await Helper.exists(this.filePath);
        if (exists) throw new Error(`File ${this.filePath} already exists`);
        if (this.data) {
        } else if (this.content) {
            this.data = JSON.parse(this.content);
        } else {
            this.data = {};
        }
        this.content = JSON.stringify(this.data, null, 4);
        await Helper.writeFile(this.filePath, this.content);
    }

    async read() {
        const content = await Helper.readTextFile(this.filePath);
        this.content = content;
        this.data = JSON.parse(content);
    }

    async save() {
        console.log('JsonFile.save');
        this.content = JSON.stringify(this.data, null, 4);
        await Helper.writeFile(this.filePath, this.content);
    }

    getAttr(name) {
        if (this.data['@attributes'][name] === undefined) throw new Error(`no attribute '${name}'`);
        return this.data['@attributes'][name];
    }
}

module.exports = JsonFile;
