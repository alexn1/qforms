import { Field } from '../Field';

export class TimeField extends Field {}

if (typeof window === 'object') {
    // @ts-ignore
    window.TimeField = TimeField;
}
