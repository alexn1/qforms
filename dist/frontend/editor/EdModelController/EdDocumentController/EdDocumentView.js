"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdDocumentView = void 0;
const common_1 = require("../../../common");
class EdDocumentView extends common_1.ReactComponent {
    static createCM(textarea, value) {
        // @ts-ignore
        const cm = CodeMirror.fromTextArea(textarea, {
            lineNumbers: true,
            styleActiveLine: true,
            matchBrackets: true,
        });
        cm.setOption('theme', 'cobalt');
        cm.setValue(value);
        return cm;
    }
}
exports.EdDocumentView = EdDocumentView;
