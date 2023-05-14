import { EdModalController } from '../EdModalController';
import { NewPageView } from './NewPageView';

export class NewPageController extends EdModalController {
    getViewClass() {
        return NewPageView;
    }
}
