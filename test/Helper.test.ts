import { Helper } from '../src/common/Helper';

describe('Helper', () => {
    test('Helper.formatNumber', async () => {
        expect(Helper.formatNumber(10000)).toBe('10\u00A0000');
    });
});
