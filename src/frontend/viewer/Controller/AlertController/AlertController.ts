import { Controller } from '../Controller';
import { AlertView } from './AlertView';

export class AlertController extends Controller {
    options: any;

    constructor(options) {
        super();
        this.options = options;
        if (!options.message) throw new Error('no message');
        if (!options.onClose) throw new Error('no onClose');
    }

    getViewClass() {
        return AlertView;
    }

    close() {
        this.options.onClose();
    }

    onOkButtonClick = async (e) => {
        this.close();
    };

    onCloseClick = async (e) => {
        this.close();
    };

    onKeyDown = async (e) => {
        if (e.key === 'Escape') {
            this.close();
        }
    };
}
