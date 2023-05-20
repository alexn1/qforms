"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeClassController = void 0;
const EdModalController_1 = require("../EdModalController");
const ChangeClassView_1 = require("./ChangeClassView");
class ChangeClassController extends EdModalController_1.EdModalController {
    getViewClass() {
        return ChangeClassView_1.ChangeClassView;
    }
}
exports.ChangeClassController = ChangeClassController;
