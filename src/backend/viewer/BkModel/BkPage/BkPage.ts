import path from 'path';

import { BkModel } from '../BkModel';
import { BkDataSource } from '../BkDataSource/BkDataSource';
import { BkAction } from '../BkAction/BkAction';
import { BkApplication } from '../BkApplication/BkApplication';
import { BkForm } from '../BkForm/BkForm';
import { Context } from '../../../Context';
import { HttpError } from '../../../HttpError';
import { BkPageScheme } from '../../../common/BkModelScheme/BkPageScheme/BkPageScheme';
import { debug } from '../../../../console';

export class BkPage<
    TBkApplication extends BkApplication = BkApplication,
> extends BkModel<BkPageScheme> {
    dataSources: BkDataSource[] = [];
    actions: BkAction[] = [];
    forms: BkForm[] = [];

    async init(context: Context): Promise<void> {
        await this.createColItems('dataSources', context);
        await this.createColItems('actions', context);
        await this.createColItems('forms', context);
    }

    getDirPath(): string {
        return path.join(this.getParent<BkApplication>().getDirPath(), 'pages', this.getName());
    }

    fillAttributes(response: any): void {
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
        response.cssBlock = this.getAttr('cssBlock');
        response.viewClass = this.getAttr('viewClass');
        response.ctrlClass = this.getAttr('ctrlClass');
        if (this.isAttr('formInTab')) {
            response.formInTab = this.getAttr('formInTab');
        }
    }

    async fill(context: Context): Promise<any> {
        // debug('Page.fill', this.constructor.name, this.getFullName());
        const response = await super.fill(context);
        await this.fillCollection(response, 'dataSources', context);
        await this.fillCollection(response, 'actions', context);
        await this.fillCollection(response, 'forms', context);
        response.newMode = !!context.getBody().newMode;
        return response;
    }

    async rpc(name: string, context: Context): Promise<any> {
        debug('BkPage.rpc', name, context.getBody());
        if (this[name]) {
            return await (this as any)[name](context);
        }
        throw new HttpError({
            message: `no remote proc ${this.constructor.name}.${name}`,
            data: { method: `${this.constructor.name}.rpc` },
            context,
        });
    }

    getApp(): TBkApplication {
        return this.getParent();
    }

    findForm(name: string): BkForm | undefined {
        return this.forms.find((form) => form.getName() === name);
    }

    getForm(name: string): BkForm {
        const form = this.findForm(name);
        if (!form) throw new Error(`${this.getName()}: no form ${name}`);
        return form;
    }

    findDataSource(name: string): BkDataSource | undefined {
        return this.dataSources.find((dataSource) => dataSource.getName() === name);
    }

    getDataSource(name: string): BkDataSource {
        const ds = this.findDataSource(name);
        if (!ds) throw new Error(`${this.getName()}: no form ${name}`);
        return ds;
    }
}
