const through = require('through');

class Folder {
    constructor(name) {
        this.name = name;
        this.folders = {};
        this.files   = {};
    }
    addFolder(folder) {
        return this.folders[folder.name] = folder;
    }
    addFile(name, file) {
        this.files[name] = file;
    }
}

const rootFolder = new Folder('root');

function placeFile(file) {
    console.log('placeFile', file.name);
    const items = file.path.split('/');
    let folder = rootFolder;
    for (let i = 1; i <= items.length-2; i++) {
        const name = items[i];
        console.log('name:', name);


        if (folder.folders[name]) {
            folder = folder.folders[name];
        } else {
            folder = folder.addFolder(new Folder(name));
        }
        if (i === items.length-2) {
            folder.addFile(items[items.length-1], file);
        }
    }

}

module.exports = function () {
    const files = [];
    const onFile = function(file) {
        console.log('onFile:', file.path);
        return files.push(file);
    };
    const onEnd = function() {
        console.log('onEnd');
        // files.reverse();

        // const file = files[0];

        for (const file of files) {
            // console.log('file.path:', file.path.split('/'));
            placeFile(file);
        }

        console.log(
            rootFolder
                .folders['home']
                .folders['user']
                .folders['projects']
                .folders['qforms']
                .folders['src']
                .folders['frontend']
                .folders['viewer']
        );







        files.forEach((file) => {
            return this.emit("data", file);
        });
        return this.emit('end');
    }
    return through(onFile, onEnd);
}
