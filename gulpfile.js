// release
module.exports['release'] = require('./gulp/release');

// publish-npm-package
module.exports['publish-npm-package'] = require('./gulp/publish-npm-package');

// ejs
module.exports['ejs'] = require('./gulp/ejs');

// build
module.exports['build-dev'] = require('./gulp/build-dev');
module.exports['build-prod'] = require('./gulp/build-prod');

// docker
module.exports['docker-build'] = require('./gulp/docker-build');
module.exports['docker-run'] = require('./gulp/docker-run');
