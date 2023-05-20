"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewKeyColumnController = void 0;
const EdModalController_1 = require("../EdModalController");
const NewKeyColumnView_1 = require("./NewKeyColumnView");
class NewKeyColumnController extends EdModalController_1.EdModalController {
    getViewClass() {
        return NewKeyColumnView_1.NewKeyColumnView;
    }
}
exports.NewKeyColumnController = NewKeyColumnController;
