"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const index = (version, data, runAppLink, appDirName, appFileName, env, links, scripts) => {
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
        console.log('editor.ejs DOMContentLoaded');
        const data = JSON.parse(document.querySelector('script[type="application/json"]').textContent);
        const runAppLink = "${runAppLink}";
        const editorFrontHostApp = new EditorFrontHostApp(data, runAppLink);
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
exports.index = index;
