const through = require('through');

module.exports = function () {
    const files = [];
    const onFile = function(file) {
        console.log('onFile:', file.path);
        return files.push(file);
    };
    const onEnd = function() {
        console.log('onEnd');
        // files.reverse();
        files.forEach((file) => {
            return this.emit("data", file);
        });
        return this.emit('end');
    }
    return through(onFile, onEnd);
}
