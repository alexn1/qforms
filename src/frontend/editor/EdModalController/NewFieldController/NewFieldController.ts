import { EdModalController } from '../EdModalController';
import { NewFieldView } from './NewFieldView';

export class NewFieldController extends EdModalController {
    getViewClass() {
        return NewFieldView;
    }
}
