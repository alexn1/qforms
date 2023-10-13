const { Converter } = require('../dist');

main();

async function main() {
    await Converter.reformat('./apps/mongo/mongo.json');
    await Converter.reformat('./apps/test/test.json');
    await Converter.reformat('./apps-ts/sample/sample.json');
}
