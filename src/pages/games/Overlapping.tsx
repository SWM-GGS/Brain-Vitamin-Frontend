import { Num, NumBtn } from '../../components/games/Overlapping';

const answer = [1, 3, 6];

export default function Overlapping() {
  let cnt = 0;

  const checkAnswer = (num: number, el: HTMLButtonElement) => {
    if (!answer.includes(num)) {
      console.log('틀렸습니다. 다시 선택해주세요.');
      return;
    }
    console.log('정답입니다!');
    el.style.background = 'gray';
    el.disabled = true;
    cnt++;

    if (cnt === answer.length) {
      setTimeout(() => alert('축하드립니다! 모두 맞추셨습니다!'), 50);
    }
  };

  return (
    <>
      <h1>겹쳐진 {answer.length}개의 숫자를 보고 있습니다. 어떤 숫자인가요?</h1>
      {Array.from({ length: 10 }).map((_, index) => (
        <NumBtn
          key={index}
          onClick={(e) => checkAnswer(index, e.target as HTMLButtonElement)}>
          {index}
        </NumBtn>
      ))}
      {answer.map((num, index) => (
        <Num key={index}>{num}</Num>
      ))}
    </>
  );
}
