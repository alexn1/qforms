import { ModelView } from '../ModelView';
export declare class FormView extends ModelView {
    constructor(props: any);
    onActionsClick: (li: any) => Promise<void>;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
}
