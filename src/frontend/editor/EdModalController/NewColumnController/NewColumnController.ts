import { ModalController } from '../EdModalController';
import { NewColumnView } from './NewColumnView';

export class NewColumnController extends ModalController {
    getViewClass() {
        return NewColumnView;
    }
}
