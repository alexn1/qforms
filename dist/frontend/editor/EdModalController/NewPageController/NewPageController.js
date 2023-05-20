"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewPageController = void 0;
const EdModalController_1 = require("../EdModalController");
const NewPageView_1 = require("./NewPageView");
class NewPageController extends EdModalController_1.EdModalController {
    getViewClass() {
        return NewPageView_1.NewPageView;
    }
}
exports.NewPageController = NewPageController;
