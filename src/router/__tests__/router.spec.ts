import { render, waitFor } from '@testing-library/vue';
import App from '@/App.vue';
import DashboardView from '@/views/DashboardView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import vuetify from '@/utils/setupVuetify';
import type { RootState } from '@/store/state';
import { createStore, type StoreOptions } from 'vuex';
import { store } from '@/store';

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: DashboardView, name: 'Dashboard' }],
});

describe('routing', () => {
  it('처음 url에 접속했을 때 dashboard page가 렌더링된다.', async () => {
    const storeInstance = createStore(store);
    const { getByTestId } = render(App, {
      global: {
        plugins: [router, storeInstance, vuetify],
      },
    });

    await waitFor(() => {
      expect(getByTestId('toolbar-title')).toHaveTextContent('Dashboard');
    });
  });

  // it('navigation 링크 클릭시 해당되는 카드 뭉치 이름이 렌더링된다.', async () => {
  //   const learnsets: Learnset[] = [
  //     {
  //       cards: [],
  //       created: 1677390326088,
  //       id: 'a',
  //       name: 'cards 1',
  //     },
  //     {
  //       cards: [],
  //       created: 1677390326088,
  //       id: 'b',
  //       name: 'cards 2',
  //     },
  //   ];

  //   const { getByText, getByTestId } = renderVuexApp({
  //     state: {
  //       learnsets,
  //     },
  //   });

  //   await fireEvent.click(getByText('cards 1'));

  //   await waitFor(() => {
  //     expect(getByTestId('toolbar-title')).toHaveTextContent('cards 1');
  //   });
  // });
});

const renderVuexApp = (customStore: StoreOptions<RootState>) => {
  const mergedStoreInstance = createStore({ ...store, ...customStore });

  return render(App, {
    global: {
      plugins: [router, mergedStoreInstance, vuetify],
    },
  });
};
