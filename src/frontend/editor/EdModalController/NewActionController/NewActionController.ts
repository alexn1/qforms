import { EdModalController } from '../EdModalController';
import { NewActionView } from './NewActionView';

export class NewActionController extends EdModalController {
    getViewClass() {
        return NewActionView;
    }
}
