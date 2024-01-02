import { BkModel } from '../BkModel';
import { BkDataSource } from '../BkDataSource/BkDataSource';
import { BkAction } from '../BkAction/BkAction';
import { BkApplication } from '../BkApplication/BkApplication';
import { BkForm } from '../BkForm/BkForm';
import { Context } from '../../../Context';
import { PageScheme } from '../../../common/Scheme/PageScheme';
import { PageData } from '../../../../common/ModelData/PageData';
import { Link, Optional } from '../../../../types';
import { ApplicationData } from '../../../../common';
export declare class BkPage<TBkApplication extends BkApplication = BkApplication> extends BkModel<PageScheme> {
    dataSources: BkDataSource[];
    actions: BkAction[];
    forms: BkForm[];
    init(context: Context): Promise<void>;
    getDirPath(): string;
    fillAttributes(response: PageData): void;
    fill(context: Context): Promise<PageData>;
    static getNewModeFromContext(context: Context): boolean;
    rpc(name: string, context: Context): Promise<any>;
    getApp(): TBkApplication;
    findForm(name: string): Optional<BkForm>;
    getForm(name: string): BkForm;
    findDataSource(name: string): Optional<BkDataSource>;
    getDataSource(name: string): BkDataSource;
    getLinks(ctx: Context): (string | Link)[];
    getScripts(ctx: Context): string[];
    renderIndexResponse(context: Context, appData: ApplicationData): [contentType: string, response: string];
}
