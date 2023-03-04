"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertController = void 0;
const Controller_1 = require("../Controller");
const AlertView_1 = require("./AlertView");
class AlertController extends Controller_1.Controller {
    constructor(options) {
        super();
        this.onOkButtonClick = async (e) => {
            this.close(true);
        };
        this.onCloseClick = async (e) => {
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
        return AlertView_1.AlertView;
    }
    close(result) {
        this.options.onClose(result);
    }
}
exports.AlertController = AlertController;
