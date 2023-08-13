import { useEffect, useRef, useState } from 'react';
import { Container, MazeBox, Target } from '../../components/games/Maze';
import { GameProps } from '../../routes/gameRouter';
import { styled } from 'styled-components';
import {
  AnswerFeedback,
  Correct,
} from '../../components/common/AnswerFeedback';

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
    answerImgUrl: string;
  };
  const problemPool: Props[] = gameData.problemPool;
  const difficulty = gameData.difficulty;
  const clickedTarget = useRef(-1);
  const targetRefs = useRef<HTMLDivElement[] | null[]>([]);
  const startTimeRef = useRef<Date | null>(new Date());
  const endTimeRef = useRef<Date | null>(null);
  let duration = useRef(0);
  const [answerState, setAnswerState] = useState('');

  const checkAnswer = async () => {
    if (problemPool[clickedTarget.current].answer) {
      // 정답
      setAnswerState('correct');
      saveGameResult(gameData.problemId, duration.current, 'SUCCESS', 10);
    } else {
      // 오답
      setAnswerState('incorrect');
      saveGameResult(gameData.problemId, duration.current, 'FAIL', 0);
    }
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        setAnswerState('');
        resolve();
      }, 2000);
    });
    onGameEnd();
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
    <>
      <Container>
        {problemPool[0] ? (
          <MazeBox $imgUrl={problemPool[0].imgUrl}>
            {problemPool.map((item, index) => (
              <Target
                ref={(el) =>
                  (targetRefs.current[targetRefs.current.length] = el)
                }
                key={index}
                x={item.x}
                y={item.y}
                $bgColor={
                  '#' + Math.floor(Math.random() * 0xffffff).toString(16)
                }
                $difficulty={difficulty}
                onClick={(e) => onClickTarget(e.target as HTMLElement, index)}
              />
            ))}
          </MazeBox>
        ) : null}
      </Container>
      <AnswerFeedback>
        {answerState === 'correct' ? (
          <Correct />
        ) : answerState === 'incorrect' ? (
          <ShowAnswer>
            <p>미로의 입구에서 도착지점까지의 경로는 다음과 같습니다.</p>
            <AnswerImage alt="" src={problemPool[0].answerImgUrl} />
          </ShowAnswer>
        ) : null}
      </AnswerFeedback>
    </>
  );
}

const ShowAnswer = styled.div`
  font-size: 4rem;
  width: 50rem;
  height: 50rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--main-bg-color);
  border-radius: 1.3rem;
  box-shadow: 15px 13px 28px 0px rgba(0, 0, 0, 0.06);
  padding: 4rem;
  word-break: keep-all;
  text-align: center;
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
    width: 20rem;
    height: 20rem;
    padding: 2rem;
  }
`;

const AnswerImage = styled.img`
  width: 28rem;
  height: 28rem;
  margin: 1rem 0 0 0;
  @media screen and (max-width: 767px) {
    width: 10rem;
    height: 10rem;
    margin: 0.5rem 0 0 0;
  }
`;
