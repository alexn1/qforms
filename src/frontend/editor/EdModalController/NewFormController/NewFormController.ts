import { EdModalController } from '../EdModalController';
import { NewFormView } from './NewFormView';

export class NewFormController extends EdModalController {
    getViewClass() {
        return NewFormView;
    }
}
