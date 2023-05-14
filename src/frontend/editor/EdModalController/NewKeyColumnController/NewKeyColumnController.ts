import { EdModalController } from '../EdModalController';
import { NewKeyColumnView } from './NewKeyColumnView';

export class NewKeyColumnController extends EdModalController {
    getViewClass() {
        return NewKeyColumnView;
    }
}
