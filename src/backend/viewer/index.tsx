import { ApplicationController } from '../../frontend/viewer/Controller/ModelController/ApplicationController/ApplicationController';
import { Context } from '../Context';
import { BkApplication } from './BkModel/BkApplication/BkApplication';

export const index = (
    qformsVersion: string,
    application: BkApplication,
    context: Context,
    data: any,
    links: string,
    scripts: string,
    appViewHtml: string,
    applicationController: ApplicationController,
) => {
    return `<!DOCTYPE html>
<html class="${application.getViewClassName()} ${application.getAttr('theme')} ${
        context.query.debug === '1' ? 'debug' : ''
    }" lang="${application.getAttr('lang')}">
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
            const data = JSON.parse(document.querySelector('script[type="application/json"]').textContent);
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
