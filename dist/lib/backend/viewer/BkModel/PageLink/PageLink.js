"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkPageLink = void 0;
const path_1 = __importDefault(require("path"));
const BkModel_1 = require("../BkModel");
class BkPageLink extends BkModel_1.BkModel {
    getPageFilePath() {
        const pageFilePath = path_1.default.join(this.getParent().getDirPath(), this.getAttr('fileName'));
        return pageFilePath;
    }
}
exports.BkPageLink = BkPageLink;