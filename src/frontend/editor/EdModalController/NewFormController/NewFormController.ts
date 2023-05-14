import { ModalController } from '../EdModalController';
import { NewFormView } from './NewFormView';

export class NewFormController extends ModalController {
    getViewClass() {
        return NewFormView;
    }
}
