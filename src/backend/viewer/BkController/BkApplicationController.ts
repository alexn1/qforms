import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Context } from '../../Context';
import { BkApplication } from '../BkModel/BkApplication/BkApplication';
import { pConsole } from '../../../pConsole';
import { ViewerModule } from '../ViewerModule';
import { login } from '../login';
import { LoginActionDto, RpcActionDto } from '../../../frontend';
import { Session_deleteUser, Session_save } from '../../Session';
import { Result } from '../../../Result';
import { BkModel } from '../BkModel/BkModel';
import { Helper } from '../../../frontend';
import { Links } from '../../Links';
import { Scripts } from '../../Scripts';

export class BkApplicationController {
    constructor(private viewerModule: ViewerModule) {}

    // action (index page, action by default for GET request)
    async index(context: Context, bkApplication: BkApplication): Promise<void> {
        pConsole.debug('BkApplicationController.index');
        const res = context.getRes();
        await bkApplication.connect(context);
        try {
            await bkApplication.initContext(context);
            const appData = await bkApplication.fill(context);
            const [contentType, response] = bkApplication.renderIndexResponse(context, appData);
            res.setHeader('Content-Type', contentType).end(response);
        } finally {
            await bkApplication.release(context);
        }
    }

    async loginGet(context: Context, application: BkApplication) {
        pConsole.debug('BkApplicationController.loginGet');
        const linksMarkup = ReactDOMServer.renderToStaticMarkup(
            React.createElement(Links, { links: application.getLinks(context) }),
        );
        const scriptsMarkup = ReactDOMServer.renderToStaticMarkup(
            React.createElement(Scripts, { scripts: application.getScripts(context) }),
        );
        const html = login(
            this.viewerModule.getHostApp().getPlatformVersion(),
            context,
            application,
            linksMarkup,
            scriptsMarkup,
            {
                name: application.getName(),
                text: application.getText(),
                title: application.getTitle(context),
                errMsg: null,
                username: context.getQuery().username,
            },
        );
        context.getRes().end(html);
    }

    async loginPost(context: Context, application: BkApplication): Promise<void> {
        pConsole.debug('BkApplicationController.loginPost');
        const { tzOffset, username, password } = context.getBody() as LoginActionDto;
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
                session.tzOffset = Helper.decodeValue(tzOffset);

                res.redirect(req.url);
                this.viewerModule
                    .getHostApp()
                    .logEvent(
                        context,
                        `login ${application.getName()}/${context.getDomain()} ${user.name}`,
                    );
            } else {
                // const users = await application.getUsers(context);
                const linksMakrup = ReactDOMServer.renderToStaticMarkup(
                    React.createElement(Links, { links: application.getLinks(context) }),
                );
                const scriptsMakrup = ReactDOMServer.renderToStaticMarkup(
                    React.createElement(Scripts, { scripts: application.getLinks(context) }),
                );
                const html = login(
                    this.viewerModule.getHostApp().getPlatformVersion(),
                    context,
                    application,
                    linksMakrup,
                    scriptsMakrup,
                    {
                        name: application.getName(),
                        text: application.getText(),
                        title: application.getTitle(context),
                        errMsg: application.getText().login.WrongUsernameOrPassword,
                        username: username,
                        password: password,
                    },
                );
                res.status(401).end(html);
            }
        } finally {
            await application.release(context);
        }
    }

    // action
    async logout(context: Context, application: BkApplication): Promise<void> {
        pConsole.debug('BkApplicationController.logout');
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

    // action
    async rpc(context: Context, application: BkApplication): Promise<void> {
        pConsole.debug('BkApplicationController.rpc', context.getReq()!.body);
        const dto = context.getBody() as RpcActionDto;
        const res = context.getRes();
        const model = await BkApplicationController.getModel(context, application);
        try {
            const result = await model.rpc(dto.name, context);
            if (result === undefined) throw new Error('rpc action: result is undefined');
            if (Array.isArray(result)) {
                const [response, _result] = result;
                res.json(response);
                if (!(_result instanceof Result)) {
                    throw new Error('_result is not Result');
                }
                this.viewerModule.getHostApp().broadcastResult(application, context, _result);
            } else {
                res.json(result);
                if (result instanceof Result) {
                    this.viewerModule.getHostApp().broadcastResult(application, context, result);
                }
            }
        } catch (err: any) {
            const errorMessage = err.message;
            err.message = `rpc error ${dto.name}: ${err.message}`;
            err.context = context;
            await this.viewerModule.getHostApp().logError(err, context.getReq());
            res.json({ errorMessage });
        }
    }

    static async getModel(context: Context, application: BkApplication): Promise<BkModel> {
        const body = context.getBody() as RpcActionDto;
        if (body.page) {
            const page = await application.createPageIfNotExists(context, body.page);
            if (body.form) {
                return page.getForm(body.form);
            }
            return page;
        }
        return application;
    }
}
