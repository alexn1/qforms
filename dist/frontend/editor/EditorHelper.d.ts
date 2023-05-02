import { MySqlFormWizard } from './FormWizard/MySqlFormWizard/MySqlFormWizard';
import { PostgreSqlFormWizard } from './FormWizard/PostgreSqlFormWizard/PostgreSqlFormWizard';
export declare class EditorHelper {
    static create(params: any): MySqlFormWizard | PostgreSqlFormWizard;
}
