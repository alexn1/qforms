import { Field } from '../Field';

export class LabelField extends Field {}

if (typeof window === 'object') {
    // @ts-ignore
    window.LabelField = LabelField;
}
