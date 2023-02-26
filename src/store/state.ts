import type { Learnset } from '@/types/interfaces';
import { useStorage } from '@vueuse/core';
import type { Ref } from 'vue';

const savedLearnsets: Ref<Learnset[]> = useStorage('learnsets', []);

export const state: { learnsets: Learnset[] } = {
  learnsets: savedLearnsets.value || [],
};

export type RootState = typeof state;
