import vuetify from '@/utils/setupVuetify';
import { render } from '@testing-library/vue';
import LearnsetList from '@/components/LearnsetList.vue';

describe(`LearnsetList Component`, () => {
  it(`카드 뭉치 이름과 삭제 버튼이 렌더링된다.`, () => {
    const learnsets = [
      {
        id: '',
        name: '카드 뭉치 1',
        created: 0,
        cards: [],
      },
      {
        id: '',
        name: '카드 뭉치 2',
        created: 0,
        cards: [],
      },
    ];

    const { getByText, getAllByRole } = render(LearnsetList, {
      global: {
        plugins: [vuetify],
      },
      props: {
        learnsets,
      },
    });

    expect(getByText(learnsets[0].name)).toBeInTheDocument();
    expect(getByText(learnsets[1].name)).toBeInTheDocument();

    expect(getAllByRole('button').length).toBe(2);
  });
});
