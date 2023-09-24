import { Query, ReadActionQuery, Action } from '../types';
import { Helper } from './Helper';

export class DtoHelper {
    static createReadQuery(
        page: string,
        form: string,
        ds: string,
        params?: Record<string, any>,
    ): Query {
        const query: ReadActionQuery = {
            action: Action.read,
            page,
            form,
            ds,
        };
        if (params) {
            query.params = Helper.encodeObject(params);
        }
        return query as Query;
    }
}
