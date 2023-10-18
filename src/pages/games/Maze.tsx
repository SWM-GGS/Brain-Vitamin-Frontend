import { useRef } from 'react';
import { Container, MazeBox, Target } from '../../components/games/Maze';
import { GameProps } from '../../routes/gameRouter';
import { getRandomFloat } from '../../utils/random';
import { useGameLogic } from '../../hooks/useGameLogic';

export default function Maze({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: Readonly<GameProps>) {
  type Props = {
    x: number;
    y: number;
    answer: boolean;
    imgUrl: string;
    answerImgUrl: string;
  };
  const problemPool: Props[] = gameData.problemPool;
  const difficulty = gameData.difficulty;
  const clickedTarget = useRef(-1);
  const targetRefs = useRef<HTMLDivElement[] | null[]>([]);
  const isCorrect = () => {
    return (
      clickedTarget.current !== -1 && problemPool[clickedTarget.current]?.answer
    );
  };
  const { showAnswer } = useGameLogic<number>(
    {
      gameData,
      onGameEnd,
      saveGameResult,
      isNextButtonClicked,
      setAnswerState,
      answerState,
    },
    isCorrect(),
    true,
  );

  const onClickTarget = (index: number, el: HTMLElement) => {
    if (clickedTarget.current === index) {
      el.style.border = 'none';
      clickedTarget.current = -1;
    } else {
      for (let targetRef of targetRefs.current) {
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
        <MazeBox
          $imgUrl={
            showAnswer ? problemPool[0].answerImgUrl : problemPool[0].imgUrl
          }>
          {problemPool.map((item, index) => (
            <Target
              ref={(el) => (targetRefs.current[targetRefs.current.length] = el)}
              key={`(${item.x},${item.y})`}
              x={item.x}
              y={item.y}
              $bgColor={
                '#' + Math.floor(getRandomFloat() * 0xffffff).toString(16)
              }
              $difficulty={difficulty}
              onClick={(e) => onClickTarget(index, e.target as HTMLElement)}
            />
          ))}
        </MazeBox>
      ) : null}
    </Container>
  );
}
