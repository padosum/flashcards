import type { Card, Learnset } from '@/types/interfaces';
import type { RootState } from './state';

type cardWithLearnset = Card & { learnsetId: string; learnsetName: string };

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

  progress: (state: RootState) => {
    const progress = state.learnsets.reduce(
      (acc, curr) => {
        const known = curr.cards.filter((card) => card.efactor > 2.5).length;
        const learning = curr.cards.filter(
          (card) => card.efactor <= 2.5
        ).length;

        acc[0].count = acc[0].count + known;
        acc[1].count = acc[1].count + learning;

        return acc;
      },
      [
        { type: 'know', label: '잘 안다', count: 0 },
        { type: 'learning', label: '잘 모른다', count: 0 },
      ]
    );

    return progress;
  },

  progressById: (state: RootState) => (id: string) => {
    const progress = state.learnsets
      .filter((learnset) => learnset.id === id)
      .reduce(
        (acc, curr) => {
          const known = curr.cards.filter((card) => card.efactor > 2.5).length;
          const learning = curr.cards.filter(
            (card) => card.efactor <= 2.5
          ).length;

          acc[0].count = acc[0].count + known;
          acc[1].count = acc[1].count + learning;

          return acc;
        },
        [
          { type: 'know', label: '잘 안다', count: 0 },
          { type: 'learning', label: '잘 모른다', count: 0 },
        ]
      );

    return progress;
  },

  knowCards: (state: RootState) => {
    const knownCards = state.learnsets.reduce((acc, curr) => {
      const cards = curr.cards.filter((card) => card.efactor > 2.5);
      cards.forEach((card) => {
        acc.push({ learnsetId: curr.id, learnsetName: curr.name, ...card });
      });
      return acc;
    }, [] as cardWithLearnset[]);

    return knownCards;
  },

  learningCards: (state: RootState) => {
    const learningCards = state.learnsets.reduce((acc, curr) => {
      const cards = curr.cards.filter((card) => card.efactor <= 2.5);
      cards.forEach((card) => {
        acc.push({ learnsetId: curr.id, learnsetName: curr.name, ...card });
      });
      return acc;
    }, [] as cardWithLearnset[]);

    return learningCards;
  },
};

export type Getters = typeof getters;
