import { keyTupleToKey, keyToKeyTuple, Key } from '../src/types';

describe('types', () => {
    test('keyTupleToKey', () => {
        expect(keyTupleToKey([1, 'abc', true])).toBe('[1,"abc",true]');
    });

    test('keyToKeyTuple', () => {
        expect(keyToKeyTuple('[1,"abc",true]' as Key)).toEqual([1, 'abc', true]);
    });
});
