const Lib = require('./Lib');

module.exports = async () => {
    await Lib.exec('git checkout release');
    await Lib.exec('npx gulp build-prod');
    await Lib.exec('npm publish');
    await Lib.exec('git add .');
    await Lib.exec('git reset --hard');
    await Lib.exec('git checkout master');
};
