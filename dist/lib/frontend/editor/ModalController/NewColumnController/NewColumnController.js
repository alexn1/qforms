"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewColumnController = void 0;
const ModalController_1 = require("../ModalController");
const NewColumnView_1 = require("./NewColumnView");
class NewColumnController extends ModalController_1.ModalController {
    getViewClass() {
        return NewColumnView_1.NewColumnView;
    }
}
exports.NewColumnController = NewColumnController;
