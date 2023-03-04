import { Field } from '../Field';

export class PhoneField extends Field {}

if (typeof window === 'object') {
    // @ts-ignore
    window.PhoneField = PhoneField;
}
