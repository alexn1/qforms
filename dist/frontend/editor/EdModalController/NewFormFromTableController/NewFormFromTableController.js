"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewFormFromTableController = void 0;
const EdModalController_1 = require("../EdModalController");
const NewFormFromTableView_1 = require("./NewFormFromTableView");
class NewFormFromTableController extends EdModalController_1.EdModalController {
    getViewClass() {
        return NewFormFromTableView_1.NewFormFromTableView;
    }
}
exports.NewFormFromTableController = NewFormFromTableController;
