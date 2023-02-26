import type { RootState } from './state';
import type { Learnset } from '@/types/interfaces';
import { useStorage } from '@vueuse/core';
import type { Ref } from 'vue';

const storage: Ref<Learnset[]> = useStorage('learnsets', []);

export enum MutationTypes {
  SET_LEARNSETS = 'SET_LEARNSETS',
  ADD_LEARNSETS = 'ADD_LEARNSETS',
}

export const mutations = {
  [MutationTypes.SET_LEARNSETS](state: RootState, learnsets: Learnset[]) {
    state.learnsets = learnsets;
    storage.value = state.learnsets;
  },
  [MutationTypes.ADD_LEARNSETS](state: RootState, learnsets: Learnset) {
    state.learnsets.push(learnsets);
    storage.value = state.learnsets;
  },
};

export type Mutations = typeof mutations;
