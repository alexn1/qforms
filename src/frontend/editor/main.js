import {EditorFrontHostApp} from './EditorFrontHostApp/EditorFrontHostApp';

document.addEventListener('DOMContentLoaded', async () => {
    console.log('editor.ejs DOMContentLoaded');
    const data = JSON.parse(document.querySelector('script[type="application/json"]').textContent);
    const runAppLink = "<%=runAppLink%>";
    const editorFrontHostApp = new EditorFrontHostApp(data, runAppLink);
    await editorFrontHostApp.run();
});
