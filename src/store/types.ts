import type { CommitOptions, Store } from 'vuex';
import type { Mutations } from './mutations';
import type { Getters } from './getters';
import type { RootState } from './state';

type MyMutations = {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
};

type MyGetters = {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

export type MyStore = Omit<Store<RootState>, 'getters' | 'commit'> &
  MyMutations &
  MyGetters;
