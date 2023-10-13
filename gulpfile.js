// build
module.exports['build-dev'] = require('./task/build-dev');
module.exports['build-prod'] = require('./gulp/build-prod');

// release/deploy
module.exports['release'] = require('./gulp/release');
module.exports['deploy'] = require('./gulp/deploy');

// docker
module.exports['docker-build'] = require('./gulp/docker-build');
module.exports['docker-run'] = require('./gulp/docker-run');

// convert
module.exports['convert'] = require('./gulp/convert');

// clean
module.exports['clean'] = require('./gulp/clean');

// copy
module.exports['copy-ejs'] = require('./gulp/copy-ejs');
module.exports['copy-lib'] = require('./gulp/copy-lib');
module.exports['copy-img'] = require('./gulp/copy-img');
