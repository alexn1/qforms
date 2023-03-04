import { Field } from '../Field';

export class PasswordField extends Field {}

if (typeof window === 'object') {
    // @ts-ignore
    window.PasswordField = PasswordField;
}
