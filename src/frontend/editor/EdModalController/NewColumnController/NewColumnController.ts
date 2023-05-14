import { EdModalController } from '../EdModalController';
import { NewColumnView } from './NewColumnView';

export class NewColumnController extends EdModalController {
    getViewClass() {
        return NewColumnView;
    }
}
