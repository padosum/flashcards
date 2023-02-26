import { getters } from '../getters';

describe('getters', () => {
  it('get learnset by id', () => {
    const learnsets = [
      {
        cards: [],
        created: 0,
        id: '1',
        name: 'learnset 1',
      },
      {
        cards: [],
        created: 0,
        id: '2',
        name: 'learnset 2',
      },
    ];

    const state = { learnsets };

    const actual = getters.learnset(state, '1');

    expect(actual).toEqual([learnsets[0]]);
  });
});
