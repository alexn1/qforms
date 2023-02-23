import { Helper } from '../../src/backend/Helper';

describe('Helper.ts tests', () => {
    test('Helper.formatNumber', async () => {
        expect(Helper.formatNumber(10000)).toBe('10\u00A0000');
    });

    /* test('Helper.test', () => {
        Helper.test();
    }); */
});
