import { ModalController } from '../EdModalController';
import { NewKeyColumnView } from './NewKeyColumnView';

export class NewKeyColumnController extends ModalController {
    getViewClass() {
        return NewKeyColumnView;
    }
}
