import type { Card, Learnset } from '@/types/interfaces';
import type { RootState } from './state';

export const getters = {
  learnset: (state: RootState, id: string): Learnset[] => {
    return state.learnsets.filter((learnset) => learnset.id === id);
  },
  reviewCards:
    (state: RootState, learnset: Learnset) =>
    (baseDate = new Date().getTime()): Learnset => {
      const cards: Card[] = learnset.cards.filter(
        (card: Card) => new Date(card.dueDate).getTime() < baseDate
      );

      learnset.cards = cards;

      return learnset;
    },
};

export type Getters = typeof getters;
