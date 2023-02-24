import AddLearnsetModal from '@/components/AddLearnsetModal.vue';
import { render, fireEvent } from '@testing-library/vue';
import vuetify from '@/utils/setupVuetify';

describe('AddLearnsetModal Component', () => {
  const title = '카드 뭉치 추가하기';
  const learnsetTitle = 'learnset title';

  it(`Modal이 전달한 text와 함께 렌더링된다.`, async () => {
    const { getByRole } = render(AddLearnsetModal, {
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

  it(`modal의 close 버튼을 클릭하면 modal이 닫힌다.`, async () => {
    const { queryByText, getByTestId, getByRole } = render(AddLearnsetModal, {
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

    // close
    await fireEvent.click(getByTestId('close'));
    expect(queryByText(title)).not.toBeInTheDocument();
  });
});
