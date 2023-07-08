"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.home = void 0;
const home = (version, data, runAppLink, appDirName, appFileName, env, links, scripts) => {
    return `<!DOCTYPE html>
<html class="editor" lang="en">
<head>
<!-- ${version} -->
<meta charset="utf-8">
<title>${appDirName}/${appFileName}[${env}] - QForms Editor</title>
<!-- links -->
${links}
<!-- scripts -->
${scripts}
<!--<script type="text/javascript">
    document.addEventListener('DOMContentLoaded', async () => {
        console.debug('editor.ejs DOMContentLoaded');
        const data = JSON.parse(document.querySelector('script[type="application/json"]').textContent);
        const runAppLink = "${runAppLink}";
        const editorFrontHostApp = new EditorFrontHostApp(data, runAppLink);
        editorFrontHostApp.init();
        await editorFrontHostApp.run();
    });
</script>-->
<script type="application/json">${JSON.stringify(data /*, null, 4*/)}</script>
</head>
<body class="editor__body">
<div class="editor__root"></div>
</body>
</html>
`;
};
exports.home = home;
