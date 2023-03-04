import { Field } from '../Field';

export class FileField extends Field {}

if (typeof window === 'object') {
    // @ts-ignore
    window.FileField = FileField;
}
