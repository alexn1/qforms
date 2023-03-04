"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeClassController = void 0;
const ModalController_1 = require("../ModalController");
const ChangeClassView_1 = require("./ChangeClassView");
class ChangeClassController extends ModalController_1.ModalController {
    getViewClass() {
        return ChangeClassView_1.ChangeClassView;
    }
}
exports.ChangeClassController = ChangeClassController;
