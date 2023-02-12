import path from 'path';
import { Model } from '../Model';

export class BkPageLink extends Model {
    getPageFilePath() {
        const pageFilePath = path.join(this.getParent().getDirPath(), this.getAttr('fileName'));
        return pageFilePath;
    }
}
