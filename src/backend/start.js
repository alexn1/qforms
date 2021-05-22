const _ = require('underscore');
const HostApp = require('./HostApp');

function getCommandLineParams() {
    const params = process.argv.map(arg => {
        const param = arg.split('=');
        return {
            name  : param[0],
            value : param[1]
        }
    });
    return _.object(
        params.map(param => param.name),
        params.map(param => param.value)
    );
}

main(); function main() {
    HostApp.run(getCommandLineParams());
}
