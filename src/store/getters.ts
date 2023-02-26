import type { RootState } from './state';

export const getters = {
  learnset: (state: RootState, id: string) => {
    return state.learnsets.filter((learnset) => learnset.id === id);
  },
};

export type Getters = typeof getters;
