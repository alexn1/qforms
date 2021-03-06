import { BackHostApp } from './index';

function getCommandLineParams() {
    return process.argv
        .map(arg => arg.split('='))
        .reduce((acc, [name, value]) => {
            acc[name] = value;
            return acc;
    }, {});
}

main(); function main() {
    new BackHostApp(getCommandLineParams()).run();
}
