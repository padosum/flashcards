import type { RootState } from './state';
import type { Learnset } from '@/types/interfaces';

export enum MutationTypes {
  SET_LEARNSETS = 'SET_LEARNSETS',
}

export const mutations = {
  [MutationTypes.SET_LEARNSETS](state: RootState, learnsets: Learnset) {
    state.learnsets.push(learnsets);
  },
};

export type Mutations = typeof mutations;
