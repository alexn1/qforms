import path from 'path';

import { BkModel } from '../BkModel';
import { BkDataSource } from '../BkDataSource/BkDataSource';
import { BkAction } from '../BkAction/BkAction';
import { BkApplication } from '../BkApplication/BkApplication';
import { BkForm } from '../BkForm/BkForm';
import { Context } from '../../../Context';
import { HttpError } from '../../../HttpError';
import { debug } from '../../../../console';
import { PageScheme } from '../../../common/Scheme/PageScheme';
import { PageData } from '../../../../common/ModelData/PageData';
import { Optional, PageActionDto } from '../../../../types';

export class BkPage<
    TBkApplication extends BkApplication = BkApplication,
> extends BkModel<PageScheme> {
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

    fillAttributes(response: PageData): void {
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
        response.cssBlock = this.getAttr('cssBlock');
        response.viewClass = this.getAttr('viewClass');
        response.ctrlClass = this.getAttr('ctrlClass');
        if (this.isAttr('formInTab')) {
            response.formInTab = this.getAttr('formInTab');
        }
    }

    async fill(context: Context): Promise<PageData> {
        // debug('Page.fill', this.constructor.name, this.getFullName());
        const response = (await super.fill(context)) as PageData;
        await this.fillCollection(response, 'dataSources', context);
        await this.fillCollection(response, 'actions', context);
        await this.fillCollection(response, 'forms', context);
        const body = context.getBody() as PageActionDto;
        response.newMode = !!body.newMode;
        return response;
    }

    async rpc(name: string, context: Context): Promise<any> {
        debug('BkPage.rpc', name, context.getBody());
        if ((this as any)[name]) {
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

    findForm(name: string): Optional<BkForm> {
        return this.forms.find((form) => form.getName() === name);
    }

    getForm(name: string): BkForm {
        const form = this.findForm(name);
        if (!form) throw new Error(`${this.getName()}: no form ${name}`);
        return form;
    }

    findDataSource(name: string): Optional<BkDataSource> {
        return this.dataSources.find((dataSource) => dataSource.getName() === name);
    }

    getDataSource(name: string): BkDataSource {
        const ds = this.findDataSource(name);
        if (!ds) throw new Error(`${this.getName()}: no form ${name}`);
        return ds;
    }
}
