import { ModelView } from '../ModelView';
import { FormController } from './FormController';
export declare class FormView<TFormController extends FormController> extends ModelView<TFormController> {
    constructor(props: any);
    onActionsClick: (li: any) => Promise<void>;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
}
