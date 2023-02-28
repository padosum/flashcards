import { state } from './state';
import { mutations } from './mutations';
import { getters } from './getters';

export const store = {
  state() {
    return state;
  },
  getters,
  mutations,
};
