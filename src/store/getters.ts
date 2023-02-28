import type { Card, Learnset } from '@/types/interfaces';
import type { RootState } from './state';

export const getters = {
  learnset:
    (state: RootState) =>
    (id: string): Learnset[] => {
      const items = state.learnsets.filter((learnset) => learnset.id === id);
      return items;
    },
  reviewCards:
    (state: RootState) =>
    ({
      id,
      baseDate = new Date().getTime(),
    }: {
      id: string;
      baseDate?: number;
    }) => {
      const filteredLearnset = state.learnsets.find(
        (learnset) => learnset.id === id
      ) as Learnset;

      const learnset = Object.assign({}, filteredLearnset);
      const cards: Card[] = learnset?.cards.filter(
        (card: Card) =>
          card.dueDate === '' || new Date(card.dueDate).getTime() < baseDate
      );

      learnset.cards = cards;

      return [learnset];
    },
};

export type Getters = typeof getters;
