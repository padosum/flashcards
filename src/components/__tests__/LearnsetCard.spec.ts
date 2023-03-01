import LearnsetCard from '@/components/LearnsetCard.vue';
import type { Card } from '@/types/interfaces';
import {
  findAllByTestId,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/vue';
import vuetify from '@/utils/setupVuetify';
import markdownit from 'markdown-it';
import { markdownItPlugin } from '@/plugins/markdownit';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

describe('LearnsetCard Component', () => {
  const md = markdownit({});
  const FRONT_TOKEN = md.parse(`## 안녕하세요\n\n`, {});
  const BACK_TOKEN = md.parse(`- 반갑습니다\n- 하하하하\n\n\n`, {});

  const CARD_DATA: Card = {
    id: '1',
    front: FRONT_TOKEN,
    back: BACK_TOKEN,
    title: '안녕하세요',
    efactor: 2.5,
    dueDate: '',
    repetition: 0,
    interval: 0,
    reviewDate: '',
    correctCnt: 0,
    incorrectCnt: 0,
  };

  it('카드의 질문이 렌더링 된다.', () => {
    const { getByText } = render(LearnsetCard, {
      global: {
        plugins: [router, vuetify, markdownItPlugin],
      },
      props: {
        card: CARD_DATA,
      },
    });

    expect(getByText('안녕하세요')).toBeInTheDocument();
  });

  it('정답 확인 버튼을 클릭하면 카드의 정답과 점수를 매길 수 있는 버튼이 렌더링 된다.', async () => {

    const { getByText, getAllByRole, getByTestId } = render(LearnsetCard, {
      global: {
        plugins: [router, vuetify, markdownItPlugin],
      },
      props: {
        card: CARD_DATA,
        review: true,
      },
      data() {
        return {
          showBack: false,
          submitted: false,
        };
      },
    });

    await fireEvent.click(getByTestId('show-answer-btn'));

    expect(getByText('반갑습니다')).toBeInTheDocument();
    expect(getByText('하하하하')).toBeInTheDocument();

    const scores = Array.from({ length: 6 }, (v, i) => i);
    const scoreButtons: HTMLButtonElement[] = getAllByRole('button', {
      name: /^[0-9]$/,
    });
    scoreButtons.forEach(({ name }) => {
      expect(scores.includes(Number(name))).toBeTruthy();
    });
  });

  it('점수를 매길 수 있는 버튼을 클릭하면 더 이상 버튼을 클릭할 수 없다.', async () => {
    const { getAllByRole, getByRole, getByTestId } = render(LearnsetCard, {
      global: {
        plugins: [router, vuetify, markdownItPlugin],
      },
      props: {
        card: CARD_DATA,
        review: true,
      },
      data() {
        return {
          showBack: false,
          submitted: false,
        };
      },
    });

    await fireEvent.click(getByTestId('show-answer-btn'));

    await fireEvent.click(getByRole('button', { name: '5' }));

    waitFor(() => {
      const scoreButtons: HTMLButtonElement[] = getAllByRole('button', {
        name: /^[0-9]$/,
      });

      scoreButtons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });
  });

  it('리뷰가 필요하지 않는 항목은 점수를 매길 수 없다.', () => {
    const { queryByRole } = render(LearnsetCard, {
      global: {
        plugins: [router, vuetify, markdownItPlugin],
      },
      props: {
        card: CARD_DATA,
        review: false,
      },
      data() {
        return {
          showBack: false,
          submitted: false,
        };
      },
    });

    expect(queryByRole('button', { name: '5' })).not.toBeInTheDocument();
  });
});
