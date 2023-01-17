import { Database } from '../Database';
import { Context } from '../../../../Context';

export class MongoDbDatabase extends Database {
    async connect(context: Context): Promise<void> {
        const config = this.getConfig();
        console.log('config', config);

        throw new Error('MongoDbDatabase.connect not implemented 2');
    }
}
