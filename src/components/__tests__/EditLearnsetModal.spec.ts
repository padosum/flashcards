import EditLearnsetModal from '@/components/EditLearnsetModal.vue';
import { render, fireEvent } from '@testing-library/vue';
import vuetify from '@/utils/setupVuetify';

describe('EditLearnsetModal Component', () => {
  const title = '카드 뭉치 추가하기';
  const learnsetTitle = 'learnset title';

  it(`Modal이 전달한 text와 함께 렌더링된다.`, async () => {
    const { getByRole } = render(EditLearnsetModal, {
      global: {
        plugins: [vuetify],
      },
      props: {
        title,
        learnsetTitle,
      },
    });

    // open
    await fireEvent.click(getByRole('button'));
    const input = getByRole('textbox', { name: '카드 뭉치 이름' });
    expect(input).toHaveValue(learnsetTitle);
  });
});
