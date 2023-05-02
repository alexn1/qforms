"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewParamController = void 0;
const ModalController_1 = require("../ModalController");
const NewParamView_1 = require("./NewParamView");
class NewParamController extends ModalController_1.ModalController {
    getViewClass() {
        return NewParamView_1.NewParamView;
    }
}
exports.NewParamController = NewParamController;
