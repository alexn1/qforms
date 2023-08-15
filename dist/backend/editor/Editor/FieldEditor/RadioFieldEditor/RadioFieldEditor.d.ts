import { RadioFieldAttributes, RadioFieldScheme } from '../../../../common/Scheme/FieldScheme/RadioFieldScheme';
import { FieldEditor } from '../FieldEditor';
export type RadioFieldParams = Partial<RadioFieldAttributes> & {
    name: string;
};
export declare class RadioFieldEditor extends FieldEditor<RadioFieldScheme> {
    static createData(params: RadioFieldParams): RadioFieldScheme;
}
