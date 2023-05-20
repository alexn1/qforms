"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewDataSourceController = void 0;
const EdModalController_1 = require("../EdModalController");
const NewDataSourceView_1 = require("./NewDataSourceView");
class NewDataSourceController extends EdModalController_1.EdModalController {
    getViewClass() {
        return NewDataSourceView_1.NewDataSourceView;
    }
}
exports.NewDataSourceController = NewDataSourceController;
