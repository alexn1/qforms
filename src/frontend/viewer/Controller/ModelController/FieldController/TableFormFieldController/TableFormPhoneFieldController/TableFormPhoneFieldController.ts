import { TableFormFieldController } from '../TableFormFieldController';
import { TableFormPhoneFieldView } from './TableFormPhoneFieldView';
import { PhoneField } from '../../../../../Model/Field/PhoneField/PhoneField';
import { Helper } from '../../../../../../common/Helper';

export class TableFormPhoneFieldController extends TableFormFieldController<PhoneField> {
    getViewClass() {
        return super.getViewClass() || TableFormPhoneFieldView;
    }
}

Helper.registerGlobalClass(TableFormPhoneFieldController);
