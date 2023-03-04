import { Field } from '../Field';

export class TextBoxField extends Field {}

if (typeof window === 'object') {
    // @ts-ignore
    window.TextBoxField = TextBoxField;
}
