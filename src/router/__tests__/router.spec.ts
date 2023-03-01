import { fireEvent, render, waitFor } from '@testing-library/vue';
import App from '@/App.vue';
import DashboardView from '@/views/DashboardView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import vuetify from '@/utils/setupVuetify';
import type { RootState } from '@/store/state';
import { createStore, type StoreOptions } from 'vuex';
import { store } from '@/store';
import type { Learnset } from '@/types/interfaces';
import LearnsetView from '@/views/LearnsetView.vue';
import LearnView from '@/views/LearnView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: DashboardView, name: 'Dashboard' },
    { path: '/learnset/:id', component: LearnsetView, name: 'LearnsetView' },
    {
      path: '/learn/:id',
      component: LearnView,
      name: 'Learn',
    },
  ],
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

  it('navigation 링크 클릭시 해당되는 카드 뭉치 이름이 렌더링된다.', async () => {
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

    const { getByRole, getByTestId } = renderVuexApp({
      state: {
        learnsets,
      },
    });

    await fireEvent.click(getByRole('link', { name: 'cards 1' }));

    await waitFor(() => {
      expect(getByTestId('toolbar-title')).toHaveTextContent('cards 1');
    });
  });

  it('카드 뭉치 이름 링크 클릭시 이름 수정 버튼과 삭제 버튼이 렌더링된다.', async () => {
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

    const { getByRole, getByTestId } = renderVuexApp({
      state: {
        learnsets,
      },
    });

    await fireEvent.click(getByRole('link', { name: 'cards 1' }));

    await waitFor(() => {
      expect(getByTestId('edit')).toBeInTheDocument();
      expect(getByTestId('delete')).toBeInTheDocument();
    });
  });
});

const renderVuexApp = (customStore: StoreOptions<RootState>) => {
  const mergedStoreInstance = createStore({ ...store, ...customStore });

  return render(App, {
    global: {
      plugins: [router, mergedStoreInstance, vuetify],
    },
  });
};
