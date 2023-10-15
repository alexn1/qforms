import { Helper } from '../../src/frontend/common/Helper';

test('queryToString', () => {
    const queryString = Helper.queryToString({
        action: 'read',
        page: 'Company',
        form: 'Company',
        ds: 'default',
        params: {},
    });
    console.log(queryString);
});
