const SCORES = [
  { score: '5', tooltip: '완벽한 응답' },
  { score: '4', tooltip: '망설임 끝에 올바른 응답' },
  { score: '3', tooltip: '올바른 응답이지만 기억해 내기 어려움' },
  { score: '2', tooltip: '잘못된 응답, 정답을 쉽게 기억할 수는 있음' },
  { score: '1', tooltip: '잘못된 응답, 올바른 응답을 기억함' },
  { score: '0', tooltip: '전혀 기억이 안남' },
];

const TIME_ZONE = 9 * 60 * 60 * 1000;

const SAMPLE_TEXT =
  '## 문제 1\n\n답변 내용입니다.\n\n## 문제 2\n\n- 답변 내용입니다.\n- 답변 내용입니다.';

export { SCORES, TIME_ZONE, SAMPLE_TEXT };
