async function convert() {
    console.debug('convert');
    const { Converter } = require('../../qforms');
    await Converter.reformat('./apps/mongo/mongo.json');
    await Converter.reformat('./apps/sample/sample.json');
    await Converter.reformat('./apps/test/test.json');
}

module.exports = convert;
