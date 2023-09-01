// release
module.exports['release'] = require('./gulp/release');

// deploy
module.exports['deploy'] = require('./gulp/deploy');

// copy
module.exports['copy-ejs'] = require('./gulp/copy-ejs');
module.exports['copy-lib'] = require('./gulp/copy-lib');
module.exports['copy-img'] = require('./gulp/copy-img');

// clean
module.exports['clean'] = require('./gulp/clean');

// build
module.exports['build-dev'] = require('./gulp/build-dev');
module.exports['build-prod'] = require('./gulp/build-prod');

// docker
module.exports['docker-build'] = require('./gulp/docker-build');
module.exports['docker-run'] = require('./gulp/docker-run');

// convert
module.exports['convert'] = require('./gulp/convert');
