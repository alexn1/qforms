import path from 'path';
import { BkModel } from '../BkModel';
import { BkApplication } from '../BkApplication/BkApplication';
import { PageLinkScheme } from '../../../common/Scheme/PageLinkScheme';

export class BkPageLink extends BkModel<PageLinkScheme> {
    getPageFilePath() {
        const pageFilePath = path.join(
            this.getParent<BkApplication>().getDirPath(),
            this.getAttr('fileName'),
        );
        return pageFilePath;
    }
}
