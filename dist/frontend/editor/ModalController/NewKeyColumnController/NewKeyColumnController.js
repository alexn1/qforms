"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewKeyColumnController = void 0;
const ModalController_1 = require("../ModalController");
const NewKeyColumnView_1 = require("./NewKeyColumnView");
class NewKeyColumnController extends ModalController_1.ModalController {
    getViewClass() {
        return NewKeyColumnView_1.NewKeyColumnView;
    }
}
exports.NewKeyColumnController = NewKeyColumnController;
