import { FormatHelper } from '../src/frontend';

describe('FormatHelper', () => {
    test('FormatHelper.formatNumber', async () => {
        expect(FormatHelper.formatNumber(10000)).toBe('10\u00A0000');
    });
});
