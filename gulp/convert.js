async function convert() {
    console.debug('convert');
    const { Converter } = require('../../qforms');
    // await Converter.reformat('./apps/demo/Application1.json');
    // await Converter.reformat('./apps/demo2/Application1.json');
    await Converter.reformat('./apps/mongo/mongo.json');
    // await Converter.reformat('./apps/test/test.json');
}

module.exports = convert;
