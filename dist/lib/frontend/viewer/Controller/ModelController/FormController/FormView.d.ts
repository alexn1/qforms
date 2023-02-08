import { ModelView } from '../ModelView';
import { FormController } from './FormController';
import { Form } from '../../../Model/Form/Form';
export declare class FormView<T extends FormController<Form>> extends ModelView<T> {
    constructor(props: any);
    onActionsClick: (li: any) => Promise<void>;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
}
