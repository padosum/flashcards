import { render } from '@testing-library/vue';
import App from '@/App.vue';
import DashboardView from '@/views/DashboardView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import vuetify from '@/utils/setupVuetify';

describe('routing', () => {
  it('처음 url에 접속했을 때 dashboard page가 렌더링된다.', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/', component: DashboardView }],
    });

    const { findByText, getByTestId } = render(App, {
      global: {
        plugins: [router, vuetify],
      },
    });

    expect(await findByText('Dashboard')).toBeInTheDocument();
    expect(getByTestId('location-display')).toHaveTextContent('Dashboard');
  });
});
