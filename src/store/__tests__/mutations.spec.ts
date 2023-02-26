import mutations from '../mutations';

describe('SET_LEARNSETS', () => {
  it(`add learnsets to the state`, () => {
    const learnsets = {
      cards: [],
      created: 1677390326088,
      id: 'dd9c893f-277a-4c22-bcb3-4755ad58a2a2',
      name: 'test',
    };

    const state = {
      learnsets: [],
    };

    mutations.SET_LEARNSETS(state, learnsets);

    expect(state).toEqual({ learnsets: [learnsets] });
  });
});
