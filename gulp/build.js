const clean    = require('./clean');
const root     = require("./root");
const backend  = require("./backend");
const frontend = require("./frontend");

async function build() {
    await clean();
    await root();
    await backend();
    await frontend();
}

module.exports = build;
