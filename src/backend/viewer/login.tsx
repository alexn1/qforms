import { Context } from '../Context';
import { BkApplication } from './BkModel/BkApplication/BkApplication';

export const login = (
    version: string,
    context: Context,
    application: BkApplication,
    links: string,
    scripts: string,
    data: any,
) => {
    return `<!DOCTYPE html>
<html class="${application.getLoginViewClassName()}" lang="${application.getAttr('lang')}">
<head>
<!-- qforms v${version} -->
<!-- app v${application.getVersion()}  -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${application.getTitle(context)} - ${application.getText().login.login}</title>
<!-- links -->
${links}
<!-- scripts -->
${scripts}
<script>
    document.addEventListener('DOMContentLoaded', async () => {
        const data = JSON.parse(document.querySelector('script[type="application/json"]').textContent);
        const frontHostApp = new LoginFrontHostApp(data);
        frontHostApp.init();
        await frontHostApp.run();
    });
</script>
<script type="application/json">${JSON.stringify(data /*, null, 4*/)}</script>
</head>
<body class="${application.getLoginViewClassName()}__body">
<div class="${application.getLoginViewClassName()}__root"></div>
</body>
</html>`;
};
