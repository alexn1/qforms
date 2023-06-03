const through = require('through');
const path = require('path');

class Folder {
    constructor(name) {
        this.name = name;
        this.folders = {};
        this.files   = {};
    }
    addFolder(folder) {
        return this.folders[folder.name] = folder;
    }
    addFile(file) {
        this.files[path.basename(file.path)] = file;
    }
    getFolders() {
        return Object.keys(this.folders).sort().map(name => this.folders[name]);
    }
    getFiles() {
        return Object.keys(this.files).sort().map(name => this.files[name]);
    }
}

function placeFile(rootFolder, file) {
    // console.log('placeFile', file.path);
    let folder = rootFolder;
    const items = file.path.split('/');
    for (let i = 1; i <= items.length-2; i++) {
        const name = items[i];
        // console.log('name:', name);
        if (folder.folders[name]) {
            folder = folder.folders[name];
        } else {
            folder = folder.addFolder(new Folder(name));
        }
        if (i === items.length-2) {
            folder.addFile(file);
        }
    }
}

function pushFiles(folder, files) {
    for (const f of folder.getFiles()) {
        files.push(f);
    }
    for (const f of folder.getFolders()) {
        pushFiles(f, files);
    }
}

module.exports = function () {
    const files = [];
    const files2 = [];
    const onFile = function(file) {
        // console.log('onFile:', file.path);
        return files.push(file);
    };
    const onEnd = function() {
        // console.log('onEnd');
        const rootFolder = new Folder('root');
        for (const file of files) {
            // console.log('file.path:', file.path.split('/'));
            placeFile(rootFolder, file);
        }
        pushFiles(rootFolder, files2);
        files2.forEach((file) => {
            return this.emit("data", file);
        });
        return this.emit('end');
    }
    return through(onFile, onEnd);
}
