import { MySqlFormWizard } from './FormWizard/MySqlFormWizard/MySqlFormWizard';
import { PostgreSqlFormWizard } from './FormWizard/PostgreSqlFormWizard/PostgreSqlFormWizard';

export class EditorHelper {
    static create(params) {
        console.debug('FormWizard.create', params);
        switch (params.model.database.getClassName()) {
            case 'MySqlDatabase':
                return new MySqlFormWizard(params);
            case 'PostgreSqlDatabase':
                return new PostgreSqlFormWizard(params);
            default:
                throw new Error(`unknown database class: ${params.model.database.getClassName()}`);
        }
    }
}
