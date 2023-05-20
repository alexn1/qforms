"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewDatabaseController = void 0;
const EdModalController_1 = require("../EdModalController");
const NewDatabaseView_1 = require("./NewDatabaseView");
class NewDatabaseController extends EdModalController_1.EdModalController {
    getViewClass() {
        return NewDatabaseView_1.NewDatabaseView;
    }
}
exports.NewDatabaseController = NewDatabaseController;
