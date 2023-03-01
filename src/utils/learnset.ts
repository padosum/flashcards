import type Token from 'markdown-it/lib/token';
import type { Card } from '@/types/interfaces';
import { v4 as uuid } from 'uuid';

const getLearnsetFromTokens = (tokens: Token[]) => {
  const cards: Card[] = [];
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

  let front = true;

  for (const token of Object.values(tokens)) {
    const { type, tag } = token;

    if (type === 'heading_open' && tag === 'h2' && !front) {
      card.title = card.front[1].content;

      if (card.back.length) {
        cards.push({ ...card, id: uuid() });
      }

      front = true;

      card['front'] = [];
      card['back'] = [];
    }

    card[front ? 'front' : 'back'].push(token);

    if (type === 'heading_close' && tag === 'h2') {
      front = false;
    }
  }

  if (card.back.length > 0) {
    card.title = card.front[1].content;
    cards.push({ ...card, id: uuid() });
  }

  const id = uuid();
  const created = Date.now();

  return {
    cards,
    id,
    created,
  };
};

export { getLearnsetFromTokens };
