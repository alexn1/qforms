const Field  = require('../Field');

class TimeField extends Field {
    static async create(data, parent) {
        return new TimeField(data, parent);
    }
}

module.exports = TimeField;
