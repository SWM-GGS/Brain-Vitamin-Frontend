import { useRef } from 'react';
import { Container, MazeBox, Target } from '../../components/games/Maze';
import { GameProps } from '../../routes/gameRouter';

export default function Maze({
  gameData,
  onGameEnd,
  saveGameResult,
}: GameProps) {
  type Props = {
    x: number;
    y: number;
    answer: boolean;
    imgUrl: string;
  };
  const problemPool: Props[] = gameData.problemPool;
  const answerCnt = problemPool.filter((item) => item.answer).length;
  let cnt = 0;
  const startTimeRef = useRef<Date | null>(new Date());
  const endTimeRef = useRef<Date | null>(null);

  const checkAnswer = (el: HTMLElement, index: number) => {
    if (!problemPool[index].answer) {
      alert('틀렸습니다 ㅜ.ㅜ');
      endTimeRef.current = new Date();
      if (startTimeRef.current && endTimeRef.current) {
        const duration =
          (endTimeRef.current.getTime() - startTimeRef.current.getTime()) /
          1000;
        saveGameResult(gameData.problemId, duration, 'FAIL');
        onGameEnd();
      }
      return;
    }
    console.log('정답입니다!');
    el.style.display = 'none';
    cnt++;

    if (cnt === answerCnt) {
      alert('정답입니다!');
      endTimeRef.current = new Date();
      if (startTimeRef.current && endTimeRef.current) {
        const duration =
          (endTimeRef.current.getTime() - startTimeRef.current.getTime()) /
          1000;
        saveGameResult(gameData.problemId, duration, 'SUCCESS');
        onGameEnd();
      }
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
              onClick={(e) => checkAnswer(e.target as HTMLElement, index)}
            />
          ))}
        </MazeBox>
      ) : null}
    </Container>
  );
}
