import Field from '../Field';

class LinkField extends Field {
    fillAttributes(response: any): void {
        super.fillAttributes(response);
        response.notNull  = this.getAttr('notNull');
    }
}

export = LinkField;
