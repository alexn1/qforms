import { Editor } from '../Editor';
import { ParamAttributes, ParamScheme } from '../../../common/Scheme/ParamScheme';
import { JSONString } from '../../../../types';

export type ParamParams = Partial<ParamAttributes> & {
    name: string;
};

export class ParamEditor extends Editor<ParamScheme> {
    static createData(params: ParamParams): ParamScheme {
        if (!params.name) throw new Error('no name');
        return {
            '@class': 'Param',
            '@attributes': {
                name: params.name,
                value: `"${params.value || ''}"` as JSONString,
            },
        };
    }

    getColName() {
        return 'params';
    }
}
