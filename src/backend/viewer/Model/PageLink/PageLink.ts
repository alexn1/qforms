import path from 'path';
import Model from '../Model';

class PageLink extends Model {
    getPageFilePath() {
        const pageFilePath = path.join(this.getParent().getDirPath(), this.getAttr('fileName'));
        return pageFilePath;
    }
}

export = PageLink;
