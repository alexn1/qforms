import { ModalController } from '../EdModalController';
import { NewActionView } from './NewActionView';

export class NewActionController extends ModalController {
    getViewClass() {
        return NewActionView;
    }
}
