import {ModalController} from '../ModalController';
import {NewDatabaseView} from './NewDatabaseView';

export class NewDatabaseController extends ModalController {
    getViewClass() {
        return NewDatabaseView;
    }
}