import { useEffect, useRef } from 'react';
import { Container, MazeBox, Target } from '../../components/games/Maze';
import { GameProps } from '../../routes/gameRouter';

export default function Maze({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
}: GameProps) {
  type Props = {
    x: number;
    y: number;
    answer: boolean;
    imgUrl: string;
  };
  const problemPool: Props[] = gameData.problemPool;
  const answerCnt = problemPool.filter((item) => item.answer).length;
  let clickedTargets = useRef<number[]>([]);
  const startTimeRef = useRef<Date | null>(new Date());
  const endTimeRef = useRef<Date | null>(null);
  let duration = useRef(0);

  const checkAnswer = () => {
    for (let i = 0; i < clickedTargets.current.length; i++) {
      const index = clickedTargets.current[i];
      if (!problemPool[index].answer) {
        alert('틀렸습니다 ㅜ.ㅜ');
        saveGameResult(gameData.problemId, duration.current, 'FAIL', 0);
        onGameEnd();
        return;
      }
    }
    if (clickedTargets.current.length === answerCnt) {
      alert('정답입니다!');
      saveGameResult(gameData.problemId, duration.current, 'SUCCESS', 10);
      onGameEnd();
    }
  };

  useEffect(() => {
    if (isNextButtonClicked) {
      endTimeRef.current = new Date();
      if (startTimeRef.current && endTimeRef.current) {
        duration.current =
          (endTimeRef.current.getTime() - startTimeRef.current.getTime()) /
          1000;
      }
      checkAnswer();
    }
  }, [isNextButtonClicked]);

  const onClickTarget = (el: HTMLElement, index: number) => {
    if (clickedTargets.current.includes(index)) {
      el.style.border = 'none';
      clickedTargets.current = clickedTargets.current.filter(
        (v) => v !== index,
      );
    } else {
      if (clickedTargets.current.length === answerCnt) {
        alert(`${answerCnt}개의 정답만 선택해주세요.`);
        return;
      }
      el.style.border = '0.5rem solid var(--main-color)';
      clickedTargets.current.push(index);
    }
  };

  return (
    <Container>
      {problemPool[0] ? (
        <MazeBox $imgUrl={problemPool[0].imgUrl}>
          {problemPool.map((item, index) => (
            <Target
              key={index}
              x={item.x}
              y={item.y}
              $bgColor={'#' + Math.floor(Math.random() * 0xffffff).toString(16)}
              onClick={(e) => onClickTarget(e.target as HTMLElement, index)}
            />
          ))}
        </MazeBox>
      ) : null}
    </Container>
  );
}
