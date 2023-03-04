"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewPageController = void 0;
const ModalController_1 = require("../ModalController");
const NewPageView_1 = require("./NewPageView");
class NewPageController extends ModalController_1.ModalController {
    getViewClass() {
        return NewPageView_1.NewPageView;
    }
}
exports.NewPageController = NewPageController;
