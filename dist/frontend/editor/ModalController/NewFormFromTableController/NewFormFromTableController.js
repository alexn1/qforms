"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewFormFromTableController = void 0;
const ModalController_1 = require("../ModalController");
const NewFormFromTableView_1 = require("./NewFormFromTableView");
class NewFormFromTableController extends ModalController_1.ModalController {
    getViewClass() {
        return NewFormFromTableView_1.NewFormFromTableView;
    }
}
exports.NewFormFromTableController = NewFormFromTableController;
