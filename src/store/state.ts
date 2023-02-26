import type { Learnset } from '@/types/interfaces';

export const state: { learnsets: Learnset[] } = {
  learnsets: [],
};

export type RootState = typeof state;
