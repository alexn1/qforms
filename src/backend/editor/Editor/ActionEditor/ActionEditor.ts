import { Editor } from '../Editor';
import { ActionAttributes, ActionScheme } from '../../../common/Scheme/ActionScheme';

export type ActionParams = Partial<ActionAttributes> & {
    name: string;
};

export class ActionEditor extends Editor<ActionScheme> {
    static createData(params: ActionParams): ActionScheme {
        if (!params.name) throw new Error('no name');
        return {
            '@class': 'Action',
            '@attributes': {
                name: params.name,
                caption: params.caption || params.name,
            },
        };
    }

    getColName() {
        return 'actions';
    }
}
