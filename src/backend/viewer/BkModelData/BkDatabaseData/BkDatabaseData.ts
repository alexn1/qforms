import { BkModelScheme } from '../BkModelData';

export interface BkDatabaseScheme extends BkModelScheme {
    params: any[];
    tables: any[];
}
