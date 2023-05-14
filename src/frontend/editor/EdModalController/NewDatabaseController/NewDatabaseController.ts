import { ModalController } from '../EdModalController';
import { NewDatabaseView } from './NewDatabaseView';

export class NewDatabaseController extends ModalController {
    getViewClass() {
        return NewDatabaseView;
    }
}
