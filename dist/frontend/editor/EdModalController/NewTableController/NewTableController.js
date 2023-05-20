"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewTableController = void 0;
const EdModalController_1 = require("../EdModalController");
const NewTableView_1 = require("./NewTableView");
class NewTableController extends EdModalController_1.EdModalController {
    getViewClass() {
        return NewTableView_1.NewTableView;
    }
}
exports.NewTableController = NewTableController;
