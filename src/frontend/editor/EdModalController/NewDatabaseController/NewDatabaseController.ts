import { EdModalController } from '../EdModalController';
import { NewDatabaseView } from './NewDatabaseView';

export class NewDatabaseController extends EdModalController {
    getViewClass() {
        return NewDatabaseView;
    }
}
