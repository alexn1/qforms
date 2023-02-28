import { ModelView } from '../ModelView';
import { FormController } from './FormController';
export declare class FormView<T extends FormController> extends ModelView<T> {
    constructor(props: any);
    onActionsClick: (li: any) => Promise<void>;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
}
