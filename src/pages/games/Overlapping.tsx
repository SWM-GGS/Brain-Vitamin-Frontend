import { useRef } from 'react';
import {
  Container,
  Text,
  NumWrapper,
  Num,
  ButtonWrapper,
  NumBtn,
} from '../../components/games/Overlapping';
import { GameProps } from '../../routes/gameRouter.tsx';

/**
 * 난도별 겹쳐진 숫자의 개수 상이
 * 하 : 2
 * 중 : 3
 * 상 : 4
 */
export default function Overlapping({
  gameData,
  onGameEnd,
  saveGameResult,
}: GameProps) {
  let difficulty = gameData.difficulty;
  let answer: number[] = [];
  let cnt = 0;
  const startTimeRef = useRef<Date | null>(new Date());
  const endTimeRef = useRef<Date | null>(null);

  while (answer.length < difficulty + 1) {
    answer.push(Math.floor(Math.random() * 10));
    answer = [...new Set(answer)];
  }
  console.log(answer);

  const checkAnswer = (num: number, el: HTMLButtonElement) => {
    if (!answer.includes(num)) {
      alert('틀렸습니다 ㅜ.ㅜ');
      endTimeRef.current = new Date();
      if (startTimeRef.current && endTimeRef.current) {
        const duration =
          (endTimeRef.current.getTime() - startTimeRef.current.getTime()) /
          1000;
        saveGameResult(gameData.problemId, duration, 'FAIL', 0);
        onGameEnd();
      }
      return;
    }
    console.log('정답입니다!');
    el.style.background = 'var(--main-bg-color)';
    el.style.border = '0.2rem solid var(--main-color)';
    el.style.color = 'var(--main-color)';
    el.disabled = true;
    cnt++;

    if (cnt === answer.length) {
      alert('정답입니다!');
      endTimeRef.current = new Date();
      if (startTimeRef.current && endTimeRef.current) {
        const duration =
          (endTimeRef.current.getTime() - startTimeRef.current.getTime()) /
          1000;
        saveGameResult(gameData.problemId, duration, 'SUCCESS', 10);
        onGameEnd();
      }
    }
  };

  return (
    <Container>
      <Text>
        겹쳐진 {answer.length}개의 숫자를 보고 있습니다. 어떤 숫자인가요?
      </Text>
      <NumWrapper>
        {answer.map((num, index) => (
          <Num
            key={index}
            $top={50 + Math.floor(Math.random() * 8)}
            $left={50 + Math.floor(Math.random() * 8)}>
            {num}
          </Num>
        ))}
      </NumWrapper>
      <ButtonWrapper>
        {Array.from({ length: 10 }).map((_, index) => (
          <NumBtn
            key={index}
            onClick={(e) => checkAnswer(index, e.target as HTMLButtonElement)}>
            {index}
          </NumBtn>
        ))}
      </ButtonWrapper>
    </Container>
  );
}
