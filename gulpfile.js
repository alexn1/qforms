// gulp task
module.exports['copy-ejs'] = require('./gulp/copy-ejs');
module.exports['copy-lib'] = require('./gulp/copy-lib');
module.exports['copy-img'] = require('./gulp/copy-img');

// task
module.exports['build-prod'] = require('./task/build-prod');
module.exports['release'] = require('./task/release');
module.exports['deploy'] = require('./task/deploy');
