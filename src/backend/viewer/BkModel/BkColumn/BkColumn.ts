import { BkModel } from '../BkModel';
import { BkApplication } from '../BkApplication/BkApplication';
import { ColumnScheme } from '../../../common/Scheme/ColumnScheme';

export class BkColumn extends BkModel<ColumnScheme> {
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
