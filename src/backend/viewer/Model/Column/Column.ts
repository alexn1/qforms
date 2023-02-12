import { Model } from '../Model';
import { Application } from '../Application/Application';

export class BkColumn extends Model {
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

    getApp(): Application {
        return this.parent.parent.parent;
    }

    /*getDbType() {
        return this.getAttr('dbType');
    }*/
}
