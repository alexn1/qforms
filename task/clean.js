const del = require('del');
module.exports = async () => {
    return del(['build']);
};
