import { mutations } from '../mutations';

describe('SET_LEARNSETS', () => {
  it(`set learnsets to the state`, () => {
    const learnsets = [
      {
        id: '',
        name: '',
        created: 0,
        cards: [],
      },
      {
        id: '',
        name: '',
        created: 0,
        cards: [],
      },
    ];

    const state = {
      learnsets: [],
    };

    mutations.SET_LEARNSETS(state, learnsets);

    expect(state).toEqual({ learnsets });
  });
});

describe('ADD_LEARNSET', () => {
  it(`add learnset to the state`, () => {
    const learnset = {
      id: '',
      name: '',
      created: 0,
      cards: [],
    };

    const state = {
      learnsets: [],
    };

    mutations.ADD_LEARNSETS(state, learnset);

    expect(state).toEqual({ learnsets: [learnset] });
  });
});
