import { Field } from '../Field';

export class ImageField extends Field {}

if (typeof window === 'object') {
    // @ts-ignore
    window.ImageField = ImageField;
}
