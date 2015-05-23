"use strict"

////////////////////////////////////////////////////////////////////////////////////////////////////
function Model(data) {
    this.data = data;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
Model.prototype.getFullName = function(splitter) {
    var name;
    if (this.form) {
        name = ("{page}" + splitter + "{form}" + splitter + "{field}")
            .replace("{page}",this.form.page.data["@attributes"].name)
            .replace("{form}",this.form.data["@attributes"].name)
            .replace("{field}",this.data["@attributes"].name);

    } else if (this.page) {
        name = ("{page}" + splitter + "{form}")
            .replace("{page}",this.page.data["@attributes"].name)
            .replace("{form}",this.data["@attributes"].name);

    } else {
        name = this.data["@attributes"].name;
    }
    return name;
}