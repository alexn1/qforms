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
import { LoginDto } from '../../../types';
import { BkHelper } from '../../BkHelper';
import { Session_deleteUser, Session_save } from '../../Session';

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

    async loginPost(context: Context, application: BkApplication): Promise<void> {
        pConsole.debug('ViewerModule.loginPost');
        const { tzOffset, username, password } = context.getBody() as LoginDto;
        if (tzOffset === undefined) throw new Error('no tzOffset');
        if (username === undefined) throw new Error('no username');
        if (password === undefined) throw new Error('no password');

        const req = context.getReq()!;
        const res = context.getRes();

        await application.connect(context);
        try {
            const user = await application.authenticate(context, username, password);
            if (user) {
                if (!user.id) throw new Error('no user id');
                if (!user.name) throw new Error('no user name');
                const session = context.getSession();
                if (session.user === undefined) session.user = {};
                session.user[context.getRoute()] = user;
                session.ip = context.getIp();
                session.tzOffset = BkHelper.decodeValue(tzOffset);

                res.redirect(req.url);
                this.viewerModule
                    .getHostApp()
                    .logEvent(
                        context,
                        `login ${application.getName()}/${context.getDomain()} ${user.name}`,
                    );
            } else {
                // const users = await application.getUsers(context);
                const links = ReactDOMServer.renderToStaticMarkup(
                    <Links links={[...this.viewerModule.getLinks(), ...application.links]} />,
                );
                const scripts = ReactDOMServer.renderToStaticMarkup(
                    <Scripts
                        scripts={[...this.viewerModule.getScripts(), ...application.scripts]}
                    />,
                );
                const html = login(version, context, application, links, scripts, {
                    name: application.getName(),
                    text: application.getText(),
                    title: application.getTitle(context),
                    errMsg: application.getText().login.WrongUsernameOrPassword,
                    username: username,
                    password: password,
                });
                res.status(401).end(html);
            }
        } finally {
            await application.release(context);
        }
    }

    // action
    async logout(context: Context, application: BkApplication): Promise<void> {
        pConsole.debug('ViewerModule.logout');
        const user = context.getUser();
        const route = context.getRoute();
        if (!user) {
            throw new Error(`no user for route ${route}`);
        }
        const session = context.getSession();
        Session_deleteUser(session, route);
        await Session_save(session);
        context.getRes().json(null);
    }
}
