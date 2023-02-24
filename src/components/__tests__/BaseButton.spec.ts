import { render, fireEvent } from '@testing-library/vue';
import BaseButton from '@/components/BaseButton.vue';
import vuetify from '@/utils/setupVuetify';
describe('BaseButton Component', () => {
  it(`버튼을 전달한 text와 함께 렌더링한다.`, () => {
    const text = 'click me';
    const { getByRole } = render(BaseButton, {
      global: {
        plugins: [vuetify],
      },
      props: { text },
    });

    const button = getByRole('button');

    expect(button).toHaveTextContent(text);
  });

  it(`버튼을 클릭하면 클릭 이벤트가 발생된다.`, async () => {
    const text = 'click me';
    const { getByRole, emitted } = render(BaseButton, {
      global: {
        plugins: [vuetify],
      },
      props: { text },
    });

    await fireEvent.click(getByRole('button'));

    expect(emitted()).toHaveProperty('click');
  });
});
