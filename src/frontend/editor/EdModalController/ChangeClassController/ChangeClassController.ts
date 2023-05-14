import { ModalController } from '../EdModalController';
import { ChangeClassView } from './ChangeClassView';

export class ChangeClassController extends ModalController {
    getViewClass() {
        return ChangeClassView;
    }
}
