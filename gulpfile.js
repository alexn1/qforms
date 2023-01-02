// module.exports.build = require('./gulp/build');
// module.exports.clean = require('./gulp/clean');
// module.exports.backend = require('./gulp/backend');
// module.exports.backend_ts = require('./gulp/backend_ts');
// module.exports.frontend_viewer = require('./gulp/frontend_viewer');

module.exports.inc = require('./gulp/inc');
module.exports.release = require('./gulp/release');
module.exports.publish = require('./gulp/publish');
module.exports.release_publish = require('./gulp/release-publish');
module.exports.docker_build = require('./gulp/docker-build');
module.exports.docker_run = require('./gulp/docker-run');
module.exports.build_prod = require('./gulp/build-prod');
