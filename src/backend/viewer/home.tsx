import { ApplicationController } from '../../frontend/viewer/Controller/ModelController/ApplicationController/ApplicationController';
import { Context } from '../Context';
import { BkApplication } from './BkModel/BkApplication/BkApplication';
import { ApplicationData } from '../../common/ModelData/ApplicationData';

export interface HomeProps {
    context: Context;
    platformVersion: string;
    application: BkApplication;
    appData: ApplicationData;
    applicationController: ApplicationController;
    linksMarkup: string;
    scriptsMarkup: string;
    appViewMarkup: string;
}

export function home({
    context,
    platformVersion,
    application,
    appData,
    applicationController,
    linksMarkup,
    scriptsMarkup,
    appViewMarkup,
}: HomeProps) {
    return `<!DOCTYPE html>
<html class="${application.getViewClassName()} ${application.getAttr('theme')} ${
        context.getQuery().debug === '1' ? 'debug' : ''
    } ${context.getQuery().frame === '1' ? 'iframe' : 'not-iframe'}" lang="${application.getAttr(
        'lang',
    )}">
<head>
    <!-- qforms v${platformVersion} -->
    <!-- app v${application.getVersion()}  -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${applicationController.getTitle()}</title>
    <!-- links -->
    ${linksMarkup}
    <!-- scripts -->
    ${scriptsMarkup}
    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            const dataScriptElement = document.querySelector('script[type="application/json"]');
            const data = JSON.parse(dataScriptElement.textContent);
            const frontHostApp = new ViewerFrontHostApp({data});
            frontHostApp.init();
            await frontHostApp.run();
        });
    </script>
    <script type="application/json">${JSON.stringify(appData)}</script>
</head>
<body class="${application.getViewClassName()}__body">
    <div class="${application.getViewClassName()}__root">${appViewMarkup}</div>
    <div class="alert-root"></div>
</body>
</html>`;
}
