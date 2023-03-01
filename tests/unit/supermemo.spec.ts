import type { Card } from '@/types/interfaces';
import { practice } from '@/utils/supermemo';

describe('supermemo', () => {
  const card: Card = {
    id: '',
    front: [],
    back: [],
    title: '',
    efactor: 2.5,
    dueDate: '',
    repetition: 0,
    interval: 0,
    reviewDate: '',
    correctCnt: 0,
    incorrectCnt: 0,
  };

  it(`점수가 3점 이상이면 correctCnt 값이 1 증가 하고 3점 미만이면 incorrectCnt 값이 1 증가 한다.`, () => {
    const scoreFive = practice(card, 5);
    expect(scoreFive.correctCnt).toBe(1);

    const scoreFour = practice(scoreFive, 4);
    expect(scoreFour.correctCnt).toBe(2);

    const scoreThree = practice(scoreFour, 3);
    expect(scoreThree.correctCnt).toBe(3);

    const scoreTwo = practice(scoreThree, 2);
    expect(scoreTwo.incorrectCnt).toBe(1);

    const scoreOne = practice(scoreTwo, 1);
    expect(scoreOne.incorrectCnt).toBe(2);

    const scoreZero = practice(scoreOne, 1);
    expect(scoreZero.incorrectCnt).toBe(3);
  });
});
