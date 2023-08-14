import { Editor } from '../Editor';
import { ColumnAttributes, ColumnScheme } from '../../../common/Scheme/ColumnScheme';

export type ColumnParams = Partial<ColumnAttributes> & {
    name: string;
};

export class ColumnEditor extends Editor<ColumnScheme> {
    static createData(params: ColumnParams): ColumnScheme {
        if (!params.name) throw new Error('no name');
        if (params.key !== undefined && typeof params.key !== 'string') {
            throw new Error('key not string');
        }
        if (params.auto !== undefined && typeof params.auto !== 'string') {
            throw new Error('auto not string');
        }
        if (params.nullable !== undefined && typeof params.nullable !== 'string') {
            throw new Error('nullable not string');
        }
        return {
            '@class': 'Column',
            '@attributes': {
                name: params.name,
                caption: params.caption || params.name,
                type: params.type || '',
                dbType: params.dbType || '',
                key: params.key || 'false',
                auto: params.auto || 'false',
                nullable: params.nullable || 'true',
            },
        };
    }

    getColName() {
        return 'columns';
    }
}
