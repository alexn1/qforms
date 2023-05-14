import { EdModalController } from '../EdModalController';
import { ChangeClassView } from './ChangeClassView';

export class ChangeClassController extends EdModalController {
    getViewClass() {
        return ChangeClassView;
    }
}
