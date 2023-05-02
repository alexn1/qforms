import { FormWizard } from '../FormWizard';
export declare class PostgreSqlFormWizard extends FormWizard {
    getSingleQuery(): string;
    getMultipleQuery(): string;
    getCountQuery(): string;
}
