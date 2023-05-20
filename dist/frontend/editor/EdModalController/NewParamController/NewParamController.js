"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewParamController = void 0;
const EdModalController_1 = require("../EdModalController");
const NewParamView_1 = require("./NewParamView");
class NewParamController extends EdModalController_1.EdModalController {
    getViewClass() {
        return NewParamView_1.NewParamView;
    }
}
exports.NewParamController = NewParamController;
