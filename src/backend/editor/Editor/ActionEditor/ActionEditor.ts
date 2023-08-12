import { Editor } from '../Editor';

export interface ActionAttributes {
    name: string;
    caption: string;
}

export class ActionEditor extends Editor {
    static createData(params: ActionAttributes) {
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
