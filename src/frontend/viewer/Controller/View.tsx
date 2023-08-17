import { ReactComponent, ReactComponentProps } from '../../common';
import { Controller } from './Controller';

export abstract class View<TController extends Controller = Controller> extends ReactComponent {
    constructor(props: ReactComponentProps) {
        super(props);
        if (!props.ctrl) throw new Error(`${this.constructor.name}: no ctrl`);
        // if (!props.onCreate) throw new Error(`${this.constructor.name}: no onCreate`);
    }

    getCtrl(): TController {
        return this.props.ctrl;
    }
}
