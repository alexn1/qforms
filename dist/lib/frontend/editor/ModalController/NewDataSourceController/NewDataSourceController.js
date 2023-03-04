"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewDataSourceController = void 0;
const ModalController_1 = require("../ModalController");
const NewDataSourceView_1 = require("./NewDataSourceView");
class NewDataSourceController extends ModalController_1.ModalController {
    getViewClass() {
        return NewDataSourceView_1.NewDataSourceView;
    }
}
exports.NewDataSourceController = NewDataSourceController;
