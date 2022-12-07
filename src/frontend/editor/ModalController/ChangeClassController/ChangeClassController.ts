import { ModalController } from '../ModalController';
import { ChangeClassView } from './ChangeClassView';

export class ChangeClassController extends ModalController {
    getViewClass() {
        return ChangeClassView;
    }
}
