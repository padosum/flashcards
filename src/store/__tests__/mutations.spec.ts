import Token from 'markdown-it/lib/token';
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

describe('RESET_LEARNSET', () => {
  it(`reset learnset from the state`, () => {
    const TEMP_TOKEN = [new Token('', '', 0)];
    const LEARNSET_1 = {
      id: '1',
      name: '',
      created: 0,
      cards: [
        {
          id: '1',
          front: TEMP_TOKEN,
          back: TEMP_TOKEN,
          title: '안녕하세요',
          efactor: 2.1,
          dueDate: '2023-03-01',
          repetition: 1,
          interval: 2,
          reviewDate: '2023-04-01',
          correctCnt: 10,
          incorrectCnt: 2,
        },
        {
          id: '2',
          front: TEMP_TOKEN,
          back: TEMP_TOKEN,
          title: '반갑습니다',
          efactor: 1.0,
          dueDate: '2023-03-02',
          repetition: 10,
          interval: 3,
          reviewDate: '2023-04-13',
          correctCnt: 12,
          incorrectCnt: 16,
        },
      ],
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

    mutations.RESET_LEARNSET(state, '1');

    state.learnsets[0].cards.forEach(
      ({
        efactor,
        dueDate,
        repetition,
        interval,
        reviewDate,
        correctCnt,
        incorrectCnt,
      }) => {
        expect(efactor).toBe(2.5);
        expect(dueDate).toBe('');
        expect(repetition).toBe(0);
        expect(interval).toBe(0);
        expect(reviewDate).toBe('');
        expect(correctCnt).toBe(0);
        expect(incorrectCnt).toBe(0);
      }
    );
  });
});
