// dist is a CommonJS bundle without statically detectable named exports,
// so named ESM imports from it fail under node, hence require
const { BkApplication, BkHelper } = require('../../dist') as typeof import('../../dist');

class SampleBkApplication extends BkApplication {}

BkHelper.registerGlobalClass(SampleBkApplication);

module.exports = { SampleBkApplication };
