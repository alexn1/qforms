import { Form } from '../Form';

export class TableForm extends Form {}

if (typeof window === 'object') {
    // @ts-ignore
    window.TableForm = TableForm;
}
