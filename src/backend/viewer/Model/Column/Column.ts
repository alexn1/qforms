import { BkModel } from '../Model';
import { BkApplication } from '../Application/Application';

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
        return this.parent.parent.parent;
    }

    /*getDbType() {
        return this.getAttr('dbType');
    }*/
}
