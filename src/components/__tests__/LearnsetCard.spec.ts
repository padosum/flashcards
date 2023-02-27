import LearnsetCard from '@/components/LearnsetCard.vue';
import type { Card } from '@/types/interfaces';
import { fireEvent, render } from '@testing-library/vue';
import vuetify from '@/utils/setupVuetify';
import markdownit from 'markdown-it';

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
  };

  it('카드의 질문이 렌더링 된다.', () => {
    const { getByText } = render(LearnsetCard, {
      global: {
        plugins: [vuetify],
      },
      props: {
        card: CARD_DATA,
      },
    });

    expect(getByText('안녕하세요')).toBeInTheDocument();
  });

  it('정답 확인 버튼을 클릭하면 카드의 정답과 점수를 매길 수 있는 버튼이 렌더링 된다.', async () => {
    const { getByText, getAllByRole, getByRole, getByTestId } = render(
      LearnsetCard,
      {
        global: {
          plugins: [vuetify],
        },
        props: {
          card: CARD_DATA,
        },
        data() {
          return {
            submitted: true,
          };
        },
      }
    );
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

    it('점수를 매길 수 있는 버튼을 클릭하면 더 이상 버튼을 클릭할 수 없다.', async () => {
      await fireEvent.click(getByRole('button', { name: '5' }));

      scoreButtons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });
  });
});
