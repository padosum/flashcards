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

    mutations.ADD_LEARNSET(state, learnset);

    expect(state).toEqual({ learnsets: [learnset] });
  });
});

describe('DELETE_LEARNSET', () => {
  it(`delete learnset from the state`, () => {
    const LEARNSET_1 = {
      id: '1',
      name: '',
      created: 0,
      cards: [],
    };
    const LEARNSET_2 = {
      id: '2',
      name: '',
      created: 0,
      cards: [],
    };

    const learnsets = [LEARNSET_1, LEARNSET_2];

    const state = {
      learnsets,
    };

    mutations.DELETE_LEARNSET(state, LEARNSET_1);

    expect(state).toEqual({
      learnsets: [LEARNSET_2],
    });
  });
});

describe('UPDATE_LEARNSET', () => {
  it(`update learnset from the state`, () => {
    const LEARNSET_1 = {
      id: '1',
      name: '',
      created: 0,
      cards: [],
    };
    const LEARNSET_2 = {
      id: '2',
      name: '',
      created: 0,
      cards: [],
    };

    const learnsets = [LEARNSET_1, LEARNSET_2];

    const state = {
      learnsets,
    };

    const name = 'newName';
    const updatedLearnset = {
      ...LEARNSET_1,
      name,
    };
    mutations.UPDATE_LEARNSET(state, updatedLearnset);

    expect(state.learnsets[0].name).toEqual(name);
  });
});
