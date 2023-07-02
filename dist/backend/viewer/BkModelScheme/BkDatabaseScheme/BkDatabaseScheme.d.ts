import { BkModelScheme } from '../BkModelScheme';
export interface BkDatabaseScheme extends BkModelScheme {
    params: any[];
    tables: any[];
}
