import { EditorFrontHostApp } from './EditorFrontHostApp/EditorFrontHostApp';

// style
import './style/editor.less';
import './style/error.less';
import './style/global.less';
import './style/tree-bar.less';

// common style
import '../common/style/ellipsis.less';
import '../common/style/flex.less';
import '../common/style/flex-column.less';
import '../common/style/flex-max.less';
import '../common/style/frame.less';
import '../common/style/full.less';
import '../common/style/global.less';
import '../common/style/grid-gap-5.less';
import '../common/style/grid-gap-10.less';
import '../common/style/wait.less';

document.addEventListener('DOMContentLoaded', async () => {
    console.log('editor.ejs DOMContentLoaded');
    const data = JSON.parse(document.querySelector('script[type="application/json"]').textContent);
    const editorFrontHostApp = new EditorFrontHostApp(data, data.runAppLink);
    editorFrontHostApp.init();
    await editorFrontHostApp.run();
});
