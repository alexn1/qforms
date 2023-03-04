"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const react_1 = __importDefault(require("react"));
const EventEmitter_1 = require("../EventEmitter");
class Controller extends EventEmitter_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.view = null;
        /* constructor() {
            super();
        } */
        this.onViewCreate = (view) => {
            // console.log('Controller.onViewCreate');
            this.view = view;
        };
    }
    async rerender() {
        if (this.view) {
            return await this.view.rerender();
        }
        console.error(`${this.constructor.name}.rerender no view`);
    }
    getView() {
        return this.view;
    }
    getViewClass() {
        throw new Error(`${this.constructor.name}.getViewClass not implemented`);
    }
    createElement() {
        // @ts-ignore
        return react_1.default.createElement(this.getViewClass(), {
            ctrl: this,
            onCreate: this.onViewCreate,
        });
    }
}
exports.Controller = Controller;
