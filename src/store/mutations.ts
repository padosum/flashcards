import type { RootState } from './state';
import type { Learnset } from '@/types/interfaces';
import { useStorage } from '@vueuse/core';
import type { Ref } from 'vue';

const storage: Ref<Learnset[]> = useStorage('learnsets', []);

export enum MutationTypes {
  SET_LEARNSETS = 'SET_LEARNSETS',
  ADD_LEARNSET = 'ADD_LEARNSET',
  DELETE_LEARNSET = 'DELETE_LEARNSET',
  UPDATE_LEARNSET = 'UPDATE_LEARNSET',
  RESET_LEARNSET = 'RESET_LEARNSET',
}

export const mutations = {
  [MutationTypes.SET_LEARNSETS](state: RootState, learnsets: Learnset[]) {
    state.learnsets = learnsets;
    storage.value = state.learnsets;
  },
  [MutationTypes.ADD_LEARNSET](state: RootState, learnset: Learnset) {
    state.learnsets.push(learnset);
    storage.value = state.learnsets;
  },
  [MutationTypes.DELETE_LEARNSET](state: RootState, learnset: Learnset) {
    state.learnsets.splice(
      state.learnsets.findIndex((l) => l.id === learnset.id),
      1
    );
    storage.value = state.learnsets;
  },
  [MutationTypes.UPDATE_LEARNSET](state: RootState, learnset: Learnset) {
    state.learnsets[state.learnsets.findIndex((l) => l.id === learnset.id)] =
      learnset;

    storage.value = state.learnsets;
  },
  [MutationTypes.RESET_LEARNSET](state: RootState, id: string) {
    state.learnsets[
      state.learnsets.findIndex((l) => l.id === id)
    ].cards.forEach((card) => {
      card.efactor = 2.5;
      card.dueDate = '';
      card.repetition = 0;
      card.interval = 0;
      card.reviewDate = '';
      card.correctCnt = 0;
      card.incorrectCnt = 0;
    });

    storage.value = state.learnsets;
  },
};

export type Mutations = typeof mutations;
