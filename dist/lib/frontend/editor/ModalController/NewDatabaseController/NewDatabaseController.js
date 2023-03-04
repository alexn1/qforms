"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewDatabaseController = void 0;
const ModalController_1 = require("../ModalController");
const NewDatabaseView_1 = require("./NewDatabaseView");
class NewDatabaseController extends ModalController_1.ModalController {
    getViewClass() {
        return NewDatabaseView_1.NewDatabaseView;
    }
}
exports.NewDatabaseController = NewDatabaseController;
