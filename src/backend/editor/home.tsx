export const home = (
    version: string,
    data: any,
    runAppLink: string,
    appDirName: string,
    appFileName: string,
    env: string,
    links: string,
    scripts: string,
) => {
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
