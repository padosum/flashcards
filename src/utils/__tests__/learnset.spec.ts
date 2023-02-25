import { getLearnsetFromTokens } from '../learnset';
import markdownit from 'markdown-it';

describe('learnset: getLearnsetFromTokens', () => {
  const FILE_DATA = {
    questions: [
      `## 안녕하세요`,
      `## vuex는 무엇인가?`,
      `## CORS란 무엇인가?\n\n`,
    ],
    responses: [
      `\n\n- 반갑습니다\n- 하하하하\n\n\n`,
      `n\n상태관리를 위한 라이브러리다.\n`,
    ],
  };

  const { questions, responses } = FILE_DATA;
  const md = markdownit({});
  const tokens = md.parse(
    `${questions[0]}${responses[0]}${questions[1]}${responses[1]}${questions[2]}`,
    {}
  );

  const { cards } = getLearnsetFromTokens(tokens);

  it('markdown 파일로 답변이 있는 질문을 가져올 수 있다.', () => {
    expect(cards[0].title).toBe('안녕하세요');
    expect(cards[1].title).toBe('vuex는 무엇인가?');
    expect(cards[2]).toBeUndefined();
  });

  it(`markdown 파일로 card 뒷면을 렌더링하는 html 태그를 얻을 수 있다.`, () => {
    const { renderer } = md;

    const firstAnswerHtml = renderer.render(cards[0].back, {}, {});
    const secondAnswerHtml = renderer.render(cards[1].back, {}, {});

    expect(firstAnswerHtml).toBe(md.render(responses[0], {}));
    expect(secondAnswerHtml).toBe(md.render(responses[1], {}));
  });
});
