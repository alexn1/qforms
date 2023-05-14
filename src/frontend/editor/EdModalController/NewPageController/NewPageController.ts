import { ModalController } from '../EdModalController';
import { NewPageView } from './NewPageView';

export class NewPageController extends ModalController {
    getViewClass() {
        return NewPageView;
    }
}
