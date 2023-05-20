"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewActionController = void 0;
const EdModalController_1 = require("../EdModalController");
const NewActionView_1 = require("./NewActionView");
class NewActionController extends EdModalController_1.EdModalController {
    getViewClass() {
        return NewActionView_1.NewActionView;
    }
}
exports.NewActionController = NewActionController;
