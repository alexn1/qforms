import { BkModel } from '../BkModel';
import { BkApplication } from '../BkApplication/BkApplication';

export class BkColumn extends BkModel {
    fillAttributes(response: any): void {
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
        response.type = this.getAttr('type');
    }

    isKey(): boolean {
        return this.getAttr('key') === 'true';
    }

    isAuto(): boolean {
        return this.getAttr('auto') === 'true';
    }

    getApp(): BkApplication {
        return this.getParent().getParent().getParent();
    }

    /* getDbType() {
        return this.getAttr('dbType');
    } */
}
