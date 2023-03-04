import { Field } from '../Field';

export class CheckBoxField extends Field {}

if (typeof window === 'object') {
    // @ts-ignore
    window.CheckBoxField = CheckBoxField;
}
