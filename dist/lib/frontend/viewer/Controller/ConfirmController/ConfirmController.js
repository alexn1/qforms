"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmController = void 0;
const Controller_1 = require("../Controller");
const ConfirmView_1 = require("./ConfirmView");
class ConfirmController extends Controller_1.Controller {
    constructor(options) {
        super();
        this.onYesClick = (e) => {
            this.close(true);
        };
        this.onCloseClick = (e) => {
            this.close(false);
        };
        this.onKeyDown = async (e) => {
            if (e.key === 'Escape') {
                this.close(false);
            }
        };
        this.options = options;
        if (!options.message)
            throw new Error('no message');
        if (!options.onClose)
            throw new Error('no onClose');
    }
    getViewClass() {
        return ConfirmView_1.ConfirmView;
    }
    close(result) {
        this.options.onClose(result);
    }
}
exports.ConfirmController = ConfirmController;
