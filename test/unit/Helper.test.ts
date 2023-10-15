import { Helper } from '../../src/frontend/common/Helper';

test('queryToString', () => {
    const queryString = Helper.queryToString({
        action: 'read',
        page: 'Company',
        form: 'Company',
        ds: 'default',
        params: {},
    });
    expect(queryString).toBe('action=read&page=Company&form=Company&ds=default');
});
