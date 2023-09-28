const Lib = require('./Lib');

module.exports = async () => {
    await Lib.exec('git checkout release');
    await Lib.exec('npm publish', false);
    await Lib.exec('git checkout master');
};
