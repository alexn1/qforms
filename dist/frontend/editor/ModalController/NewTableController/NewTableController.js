"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewTableController = void 0;
const ModalController_1 = require("../ModalController");
const NewTableView_1 = require("./NewTableView");
class NewTableController extends ModalController_1.ModalController {
    getViewClass() {
        return NewTableView_1.NewTableView;
    }
}
exports.NewTableController = NewTableController;
