"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewColumnController = void 0;
const EdModalController_1 = require("../EdModalController");
const NewColumnView_1 = require("./NewColumnView");
class NewColumnController extends EdModalController_1.EdModalController {
    getViewClass() {
        return NewColumnView_1.NewColumnView;
    }
}
exports.NewColumnController = NewColumnController;
