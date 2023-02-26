import { state } from './state';
import { mutations } from './mutations';

export const store = {
  state() {
    return state;
  },
  mutations,
};
