import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Context } from '../../Context';
import { BkApplication } from '../BkModel/BkApplication/BkApplication';
import { pConsole } from '../../../pConsole';
import { Links } from '../../Links';
import { Scripts } from '../../Scripts';
import { ViewerModule } from '../ViewerModule';
import { FrontHostApp, ApplicationController } from '../../../frontend';
import { Application } from '../../../frontend/viewer/Model/Application/Application';
import { login } from '../login';

const { version } = require('../../../../package.json');

export class BkApplicationController {
    constructor(private viewerModule: ViewerModule) {}

    // action (index page, action by default for GET request)
    async index(context: Context, bkApplication: BkApplication): Promise<void> {
        pConsole.debug('ViewerModule.index');
        const res = context.getRes();
        await bkApplication.connect(context);
        try {
            await bkApplication.initContext(context);
            const html = await this.renderHtml(bkApplication, context);
            res.setHeader('Content-Type', 'text/html; charset=utf-8').end(html);
        } finally {
            await bkApplication.release(context);
        }
    }

    async renderHtml(bkApplication: BkApplication, context: Context): Promise<string> {
        pConsole.debug('ViewerModule.renderHtml');

        const links = ReactDOMServer.renderToStaticMarkup(
            <Links links={[...this.viewerModule.getLinks(), ...bkApplication.links]} />,
        );
        const scripts = ReactDOMServer.renderToStaticMarkup(
            <Scripts scripts={[...this.viewerModule.getScripts(), ...bkApplication.scripts]} />,
        );
        const data = await bkApplication.fill(context);

        // frontHostApp
        const frontHostApp = new FrontHostApp({
            debug: context.isDebugMode(),
            url: context.getUrl(),
            cookies: context.getCookies(),
        });

        // application
        const application = new Application(data);
        application.init();

        // applicationController
        const applicationController = ApplicationController.create(application, frontHostApp);
        applicationController.init();

        const element = React.createElement(applicationController.getViewClass(), {
            ctrl: applicationController,
        });

        const appViewHtml = ReactDOMServer.renderToString(element);
        // debug('appViewHtml:', appViewHtml);

        const html = bkApplication.renderIndexHtml(
            context,
            applicationController,
            version,
            links,
            scripts,
            data,
            appViewHtml,
        );

        return html;
    }

    async loginGet(context: Context, application: BkApplication) {
        pConsole.debug('ViewerModule.loginGet');
        const links = ReactDOMServer.renderToStaticMarkup(
            <Links links={[...this.viewerModule.getLinks(), ...application.links]} />,
        );
        const scripts = ReactDOMServer.renderToStaticMarkup(
            <Scripts scripts={[...this.viewerModule.getScripts(), ...application.scripts]} />,
        );
        const html = login(version, context, application, links, scripts, {
            name: application.getName(),
            text: application.getText(),
            title: application.getTitle(context),
            errMsg: null,
            username: context.getQuery().username,
        });
        context.getRes().end(html);
    }
}
