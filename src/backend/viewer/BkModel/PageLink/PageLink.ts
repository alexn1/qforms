import path from 'path';
import { BkModel } from '../BkModel';

export class BkPageLink extends BkModel {
    getPageFilePath() {
        const pageFilePath = path.join(this.getParent().getDirPath(), this.getAttr('fileName'));
        return pageFilePath;
    }
}
