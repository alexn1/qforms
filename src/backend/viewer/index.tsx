import { Context } from '../Context';
import { BkApplication } from './BkModel/BkApplication/BkApplication';

export const index = (
    version: string,
    application: BkApplication,
    context: Context,
    data: any,
    links: string,
    scripts: string,
) => {
    return `<!DOCTYPE html>
<html class="${application.getViewClassName()} ${application.getAttr('theme')} ${
        context.query.debug === '1' ? 'debug' : ''
    }" lang="${application.getAttr('lang')}">
<head>
    <!-- qforms v${version} -->
    <!-- app v${application.getVersion()}  -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <!-- links -->
    ${links}
    <!-- scripts -->
    ${scripts}
    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            const data = JSON.parse(document.querySelector('script[type="application/json"]').textContent);
            const frontHostApp = new ViewerFrontHostApp({data});
            frontHostApp.init();
            await frontHostApp.run();
        });
    </script>
    <script type="application/json">${JSON.stringify(data /*, null, 4*/)}</script>
</head>
<body class="${application.getViewClassName()}__body">
    <div class="${application.getViewClassName()}__root"></div>
    <div class="alert-root"></div>
</body>
</html>`;
};
