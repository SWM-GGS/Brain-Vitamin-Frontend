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
  const difficulty = gameData.difficulty;
  const clickedTarget = useRef(-1);
  const targetRefs = useRef<HTMLDivElement[] | null[]>([]);
  const startTimeRef = useRef<Date | null>(new Date());
  const endTimeRef = useRef<Date | null>(null);
  let duration = useRef(0);

  const checkAnswer = () => {
    if (problemPool[clickedTarget.current].answer) {
      alert('정답입니다!');
      saveGameResult(gameData.problemId, duration.current, 'SUCCESS', 10);
      onGameEnd();
    } else {
      alert('틀렸습니다 ㅜ.ㅜ');
      saveGameResult(gameData.problemId, duration.current, 'FAIL', 0);
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
    if (clickedTarget.current === index) {
      el.style.border = 'none';
      clickedTarget.current = -1;
    } else {
      for (let i = 0; i < targetRefs.current.length; i++) {
        const targetRef = targetRefs.current[i];
        if (targetRef?.style.border === '0.5rem solid var(--main-color)') {
          targetRef.style.border = 'none';
          break;
        }
      }
      el.style.border = '0.5rem solid var(--main-color)';
      clickedTarget.current = index;
    }
  };

  return (
    <Container>
      {problemPool[0] ? (
        <MazeBox $imgUrl={problemPool[0].imgUrl}>
          {problemPool.map((item, index) => (
            <Target
              ref={(el) => (targetRefs.current[targetRefs.current.length] = el)}
              key={index}
              x={item.x}
              y={item.y}
              $bgColor={'#' + Math.floor(Math.random() * 0xffffff).toString(16)}
              difficulty={difficulty}
              onClick={(e) => onClickTarget(e.target as HTMLElement, index)}
            />
          ))}
        </MazeBox>
      ) : null}
    </Container>
  );
}
