import { keyTupleToKey, keyToKeyTuple, Key } from '../src/types';

describe('types', () => {
    test('keyTupleToKey', () => {
        expect(keyTupleToKey([1, 2])).toBe('[1,2]');
    });

    test('keyToKeyTuple', () => {
        expect(keyToKeyTuple('[1]' as Key)).toEqual([1]);
    });
});
