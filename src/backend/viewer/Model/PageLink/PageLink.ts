const path = require('path');
import { Model } from '../Model';

export class PageLink extends Model {
    getPageFilePath() {
        const pageFilePath = path.join(this.getParent().getDirPath(), this.getAttr('fileName'));
        return pageFilePath;
    }
}
