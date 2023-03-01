import type { Learnset } from '@/types/interfaces';
import Token from 'markdown-it/lib/token';
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

    const actual = getters.learnset(state)('1');

    expect(actual).toEqual([learnsets[0]]);
  });

  it('get learnset by date', () => {
    const TEMP_TOKEN = new Token('', '', 0);
    const CARD1 = {
      id: '1',
      front: [TEMP_TOKEN],
      back: [TEMP_TOKEN],
      title: '안녕하세요',
      efactor: 2.5,
      dueDate: new Date('2023-02-25').toISOString(),
      repetition: 0,
      interval: 0,
      reviewDate: '',
      correctCnt: 0,
      incorrectCnt: 0,
    };

    const CARD2 = {
      id: '1',
      front: [TEMP_TOKEN],
      back: [TEMP_TOKEN],
      title: '안녕하세요',
      efactor: 2.5,
      dueDate: new Date('2023-02-27').toISOString(),
      repetition: 0,
      interval: 0,
      reviewDate: '',
      correctCnt: 0,
      incorrectCnt: 0,
    };

    const learnsets: Learnset[] = [
      {
        cards: [CARD1, CARD2],
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

    const baseDate = new Date('2023-02-27').getTime();
    const actual = getters.reviewCards(state)({ id: '1', baseDate });
    const reviewCards = learnsets[0];
    reviewCards.cards = [CARD1];
    expect(actual).toEqual([reviewCards]);
  });

  it('get learnsets with efactor', () => {
    const TEMP_TOKEN = new Token('', '', 0);
    const CARD1 = {
      id: '1',
      front: [TEMP_TOKEN],
      back: [TEMP_TOKEN],
      title: '안녕하세요',
      efactor: 2.6,
      dueDate: new Date('2023-02-25').toISOString(),
      repetition: 0,
      interval: 0,
      reviewDate: '',
      correctCnt: 0,
      incorrectCnt: 0,
    };

    const CARD2 = {
      id: '2',
      front: [TEMP_TOKEN],
      back: [TEMP_TOKEN],
      title: '안녕하세요',
      efactor: 2.7,
      dueDate: new Date('2023-02-27').toISOString(),
      repetition: 0,
      interval: 0,
      reviewDate: '',
      correctCnt: 0,
      incorrectCnt: 0,
    };

    const CARD3 = {
      id: '3',
      front: [TEMP_TOKEN],
      back: [TEMP_TOKEN],
      title: '안녕하세요',
      efactor: 2.3,
      dueDate: new Date('2023-02-27').toISOString(),
      repetition: 0,
      interval: 0,
      reviewDate: '',
      correctCnt: 0,
      incorrectCnt: 0,
    };

    const learnsets: Learnset[] = [
      {
        cards: [CARD1, CARD2, CARD3],
        created: 0,
        id: '1',
        name: 'learnset 1',
      },
      {
        cards: [CARD3],
        created: 0,
        id: '2',
        name: 'learnset 2',
      },
    ];

    const state = { learnsets };

    const actual = getters.progress(state);

    expect(actual).toEqual([
      { type: 'know', label: '잘 안다', count: 2 },
      { type: 'learning', label: '잘 모른다', count: 2 },
    ]);
  });
});

it('get cards with efactor', () => {
  const TEMP_TOKEN = new Token('', '', 0);
  const CARD1 = {
    id: '1',
    front: [TEMP_TOKEN],
    back: [TEMP_TOKEN],
    title: '안녕하세요',
    efactor: 2.6,
    dueDate: new Date('2023-02-25').toISOString(),
    repetition: 0,
    interval: 0,
    reviewDate: '',
    correctCnt: 0,
    incorrectCnt: 0,
  };

  const CARD2 = {
    id: '2',
    front: [TEMP_TOKEN],
    back: [TEMP_TOKEN],
    title: '안녕하세요',
    efactor: 2.7,
    dueDate: new Date('2023-02-27').toISOString(),
    repetition: 0,
    interval: 0,
    reviewDate: '',
    correctCnt: 0,
    incorrectCnt: 0,
  };

  const CARD3 = {
    id: '3',
    front: [TEMP_TOKEN],
    back: [TEMP_TOKEN],
    title: '안녕하세요',
    efactor: 2.3,
    dueDate: new Date('2023-02-27').toISOString(),
    repetition: 0,
    interval: 0,
    reviewDate: '',
    correctCnt: 0,
    incorrectCnt: 0,
  };

  const learnsets: Learnset[] = [
    {
      cards: [CARD1, CARD2, CARD3],
      created: 0,
      id: '1',
      name: 'learnset 1',
    },
    {
      cards: [CARD3],
      created: 0,
      id: '2',
      name: 'learnset 2',
    },
  ];

  const state = { learnsets };

  const knownCards = getters.knowCards(state);
  const learningCards = getters.learningCards(state);

  expect(knownCards).toEqual([
    { learnsetId: learnsets[0].id, learnsetName: learnsets[0].name, ...CARD1 },
    { learnsetId: learnsets[0].id, learnsetName: learnsets[0].name, ...CARD2 },
  ]);

  expect(learningCards).toEqual([
    { learnsetId: learnsets[0].id, learnsetName: learnsets[0].name, ...CARD3 },
    { learnsetId: learnsets[1].id, learnsetName: learnsets[1].name, ...CARD3 },
  ]);
});
