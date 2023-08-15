import { useEffect, useRef, useState } from 'react';
import { Container, MazeBox, Target } from '../../components/games/Maze';
import { GameProps } from '../../routes/gameRouter';

export default function Maze({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: GameProps) {
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
  const startTimeRef = useRef<Date | null>(new Date());
  const endTimeRef = useRef<Date | null>(null);
  let duration = useRef(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const checkAnswer = async () => {
    if (
      clickedTarget.current !== -1 &&
      problemPool[clickedTarget.current].answer
    ) {
      // 정답
      saveGameResult(gameData.problemId, duration.current, 'SUCCESS', 10);
      setAnswerState('correct');
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          setAnswerState('');
          resolve();
        }, 2000);
      });
      onGameEnd();
    } else {
      // 오답
      setAnswerState('incorrect');
    }
  };

  useEffect(() => {
    if (answerState === 'incorrect') {
      const handleIncorrect = async () => {
        saveGameResult(gameData.problemId, duration.current, 'FAIL', 0);
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            setAnswerState('');
            resolve();
          }, 2000);
        });
        setShowAnswer(true);
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            setShowAnswer(false);
            resolve();
          }, 2000);
        });
        onGameEnd();
      };
      handleIncorrect();
    }
  }, [answerState]);

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
        <MazeBox
          $imgUrl={
            showAnswer ? problemPool[0].answerImgUrl : problemPool[0].imgUrl
          }>
          {problemPool.map((item, index) => (
            <Target
              ref={(el) => (targetRefs.current[targetRefs.current.length] = el)}
              key={index}
              x={item.x}
              y={item.y}
              $bgColor={'#' + Math.floor(Math.random() * 0xffffff).toString(16)}
              $difficulty={difficulty}
              onClick={(e) => onClickTarget(e.target as HTMLElement, index)}
            />
          ))}
        </MazeBox>
      ) : null}
    </Container>
  );
}
