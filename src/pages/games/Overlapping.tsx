import { NumContainer, Num, NumBtn } from '../../components/games/Overlapping';
import { GameProps } from '../../routes/gameRouter.tsx';

/**
 * 난도별 겹쳐진 숫자의 개수 상이
 * 하 : 2
 * 중 : 3
 * 상 : 4
 */
export default function Overlapping({ gameData, onGameEnd }: GameProps) {
  let difficulty = gameData.difficulty;
  let answer: number[] = [];
  let cnt = 0;

  while (answer.length < difficulty + 1) {
    answer.push(Math.floor(Math.random() * 10));
    answer = [...new Set(answer)];
  }
  console.log(answer);

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
      onGameEnd();
    }
  };

  return (
    <>
      <h1>겹쳐진 {answer.length}개의 숫자를 보고 있습니다. 어떤 숫자인가요?</h1>
      <NumContainer>
        {answer.map((num, index) => (
          <Num
            key={index}
            $top={50 + Math.floor(Math.random() * 8)}
            $left={50 + Math.floor(Math.random() * 8)}>
            {num}
          </Num>
        ))}
      </NumContainer>
      {Array.from({ length: 10 }).map((_, index) => (
        <NumBtn
          key={index}
          onClick={(e) => checkAnswer(index, e.target as HTMLButtonElement)}>
          {index}
        </NumBtn>
      ))}
    </>
  );
}
