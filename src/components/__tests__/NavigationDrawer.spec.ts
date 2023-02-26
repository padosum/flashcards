import NavigationDrawer from '../NavigationDrawer.vue';
import { render } from '@testing-library/vue';
import { store } from '@/store';
import { createStore, type StoreOptions } from 'vuex';
import type { RootState } from '@/store/state';
import type { Learnset } from '@/types/interfaces';
import { createRouter, createWebHistory } from 'vue-router';
import vuetify from '@/utils/setupVuetify';

describe('NavigationDrawer Component', () => {
  it(`카드 뭉치 목록이 렌더링된다.`, () => {
    const learnsets: Learnset[] = [
      {
        cards: [],
        created: 1677390326088,
        id: 'a',
        name: 'cards 1',
      },
      {
        cards: [],
        created: 1677390326088,
        id: 'b',
        name: 'cards 2',
      },
    ];

    const { getByText } = renderComponentWithStore(NavigationDrawer, {
      state: {
        learnsets,
      },
    });

    expect(getByText('cards 1')).toBeInTheDocument();
    expect(getByText('cards 2')).toBeInTheDocument();
  });
});

const renderComponentWithStore = (
  component: any,
  customStore: StoreOptions<RootState>
) => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [],
  });

  const mergedStoreInstance = createStore({ ...store, ...customStore });

  return render(component, {
    global: {
      plugins: [router, mergedStoreInstance, vuetify],
    },
  });
};
