"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.home = void 0;
const home = (application, context, applicationController, qformsVersion, links, scripts, data, appViewHtml) => {
    return `<!DOCTYPE html>
<html class="${application.getViewClassName()} ${application.getAttr('theme')} ${context.query.debug === '1' ? 'debug' : ''} ${context.query.frame === '1' ? 'iframe' : 'not-iframe'}" lang="${application.getAttr('lang')}">
<head>
    <!-- qforms v${qformsVersion} -->
    <!-- app v${application.getVersion()}  -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${applicationController.getTitle()}</title>
    <!-- links -->
    ${links}
    <!-- scripts -->
    ${scripts}
    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            const dataScriptElement = document.querySelector('script[type="application/json"]');
            const data = JSON.parse(dataScriptElement.textContent);
            const frontHostApp = new ViewerFrontHostApp({data});
            frontHostApp.init();
            await frontHostApp.run();
        });
    </script>
    <script type="application/json">${JSON.stringify(data /*, null, 4*/)}</script>
</head>
<body class="${application.getViewClassName()}__body">
    <div class="${application.getViewClassName()}__root">${appViewHtml}</div>
    <div class="alert-root"></div>
</body>
</html>`;
};
exports.home = home;
