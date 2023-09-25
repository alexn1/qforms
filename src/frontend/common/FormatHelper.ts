import { Helper } from './Helper';

export class FormatHelper {
    static formatNumber(value: number): string {
        return new Intl.NumberFormat('ru-RU').format(value);
    }
}

Helper.registerGlobalClass(FormatHelper);
