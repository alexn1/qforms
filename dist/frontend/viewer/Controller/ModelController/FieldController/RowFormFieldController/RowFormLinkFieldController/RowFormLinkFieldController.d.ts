import { RowFormFieldController } from '../RowFormFieldController';
import { LinkField } from '../../../../../Model/Field/LinkField/LinkField';
import { SyntheticEvent } from 'react';
export declare class RowFormLinkFieldController extends RowFormFieldController<LinkField> {
    getViewClass(): any;
    onClick: (e: SyntheticEvent) => void;
    getDisplayValue(): string | null;
}
