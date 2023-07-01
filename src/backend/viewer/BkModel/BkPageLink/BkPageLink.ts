import path from 'path';
import { BkModel } from '../BkModel';
import { BkApplication } from '../BkApplication/BkApplication';

export class BkPageLink extends BkModel {
    getPageFilePath() {
        const pageFilePath = path.join(
            this.getParent<BkApplication>().getDirPath(),
            this.getAttr('fileName'),
        );
        return pageFilePath;
    }
}
