"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EditorFrontHostApp_1 = require("./EditorFrontHostApp/EditorFrontHostApp");
// style
require("./style/editor.less");
require("./style/error.less");
require("./style/global.less");
require("./style/tree-bar.less");
// common style
require("../common/style/ellipsis.less");
require("../common/style/flex.less");
require("../common/style/flex-column.less");
require("../common/style/flex-max.less");
require("../common/style/frame.less");
require("../common/style/full.less");
require("../common/style/global.less");
require("../common/style/grid-gap-5.less");
require("../common/style/grid-gap-10.less");
require("../common/style/wait.less");
document.addEventListener('DOMContentLoaded', async () => {
    console.log('editor.ejs DOMContentLoaded');
    const data = JSON.parse(document.querySelector('script[type="application/json"]').textContent);
    const editorFrontHostApp = new EditorFrontHostApp_1.EditorFrontHostApp(data, data.runAppLink);
    editorFrontHostApp.init();
    await editorFrontHostApp.run();
});
