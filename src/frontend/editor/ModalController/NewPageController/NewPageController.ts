import { ModalController } from '../ModalController';
import { NewPageView } from './NewPageView';

export class NewPageController extends ModalController {
    getViewClass() {
        return NewPageView;
    }
}
