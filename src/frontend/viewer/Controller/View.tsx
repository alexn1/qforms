import { ReactComponent } from '../../common';
import { Controller } from './Controller';

export abstract class View<T extends Controller> extends ReactComponent {
    constructor(props) {
        super(props);
        if (!props.ctrl) throw new Error(`${this.constructor.name}: no ctrl`);
        if (!props.onCreate) throw new Error(`${this.constructor.name}: no onCreate`);
    }
    getCtrl(): T {
        return this.props.ctrl;
    }
}
