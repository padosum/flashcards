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

    const actual = getters.learnset(state, '1');

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

    const [learnset] = getters.learnset(state, '1');

    const BASE_DATE = new Date('2023-02-27').getTime();
    const actual = getters.reviewCards(state, learnset)(BASE_DATE);
    const reviewCards = learnsets[0];
    reviewCards.cards = [CARD1];
    expect(actual).toEqual(reviewCards);
  });
});
