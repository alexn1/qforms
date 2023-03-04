import { Field } from '../Field';

export class LinkField extends Field {}

if (typeof window === 'object') {
    // @ts-ignore
    window.LinkField = LinkField;
}
