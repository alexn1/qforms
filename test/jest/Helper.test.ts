import { BkHelper } from '../../src/backend/BkHelper';

describe('Helper.ts tests', () => {
    test('Helper.formatNumber', async () => {
        expect(BkHelper.formatNumber(10000)).toBe('10\u00A0000');
    });

    /* test('Helper.test', () => {
        Helper.test();
    }); */
});
