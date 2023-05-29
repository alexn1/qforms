import { FrontHostApp } from '../common';
import './style/application.less';
import './style/field.less';
import './style/form.less';
import './style/page.less';
import './style/paging.less';
import './style/toolbar-button.less';
import './style/toolbar-dropdown-button.less';
import './style/version-notification.less';
import '../common/style/ellipsis.less';
import '../common/style/flex.less';
import '../common/style/flex-column.less';
import '../common/style/flex-max.less';
import '../common/style/frame.less';
import '../common/style/full.less';
import '../common/style/global.less';
import '../common/style/grid-gap-5.less';
import '../common/style/grid-gap-10.less';
import '../common/style/wait.less';
export declare class ViewerFrontHostApp extends FrontHostApp {
    protected options: any;
    applicationController: any;
    constructor(options?: any);
    run(): Promise<void>;
    onWindowPopState(e: any): Promise<void>;
    logError(err: Error): void;
    getData(): any;
    alert(options: {
        message: string;
        title?: string;
    }): Promise<void>;
    confirm(options: any): Promise<unknown>;
}
