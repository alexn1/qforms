"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewFormController = void 0;
const ModalController_1 = require("../ModalController");
const NewFormView_1 = require("./NewFormView");
class NewFormController extends ModalController_1.ModalController {
    getViewClass() {
        return NewFormView_1.NewFormView;
    }
}
exports.NewFormController = NewFormController;
