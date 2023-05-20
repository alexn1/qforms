"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewFormController = void 0;
const EdModalController_1 = require("../EdModalController");
const NewFormView_1 = require("./NewFormView");
class NewFormController extends EdModalController_1.EdModalController {
    getViewClass() {
        return NewFormView_1.NewFormView;
    }
}
exports.NewFormController = NewFormController;
