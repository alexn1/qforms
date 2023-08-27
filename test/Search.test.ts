import { Search } from '../src/frontend/common/Search';

describe('Search', () => {
    beforeAll(() => {
        // @ts-ignore
        global.window = {
            // @ts-ignore
            location: {
                // @ts-ignore
                search: '',
            },
        };
    });

    test('filter empty string', () => {
        window.location.search = '';
        const search = Search.filter('city');
        expect(search).toBe('');
    });

    test('filter question', () => {
        window.location.search = '?';
        const search = Search.filter('city');
        expect(search).toBe('');
    });

    test('filter empty city', () => {
        window.location.search = '?city';
        const search = Search.filter('city');
        expect(search).toBe('?city=');
    });

    test('filter only city', () => {
        window.location.search = '?city=abc';
        const search = Search.filter('city');
        expect(search).toBe('?city=abc');
    });

    test('filter city & param1', () => {
        window.location.search = '?city=abc&param1=value1';
        const search = Search.filter('city');
        expect(search).toBe('?city=abc');
    });

    test('empty objToString', () => {
        const search = Search.objToString({});
        expect(search).toBe('');
    });

    test('not empty objToString', () => {
        const search = Search.objToString({ abc: '123' });
        expect(search).toBe('?abc=123');
    });
});
