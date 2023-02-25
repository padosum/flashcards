import type Token from 'markdown-it/lib/token';
import type { Card } from '@/types/interfaces';
import { v4 as uuid } from 'uuid';

const CARD_INITIAL_VALUE: Card = {
  id: '',
  front: [],
  back: [],
  title: '',
  efactor: 2.5,
  dueDate: '',
  repetition: 0,
  interval: 0,
  reviewDate: '',
};

const getLearnsetFromTokens = (tokens: Token[]) => {
  const cards: Card[] = [];
  const card: Card = CARD_INITIAL_VALUE;

  let front = true;

  for (const token of Object.values(tokens)) {
    const { type, tag } = token;

    if (type === 'heading_open' && tag === 'h2' && !front) {
      card.title = card.front[1].content;
      cards.push({ ...card, id: uuid() });
      front = true;

      card['front'] = [];
      card['back'] = [];
    }

    card[front ? 'front' : 'back'].push(token);

    if (type === 'heading_close' && tag === 'h2') {
      front = false;
    }
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
