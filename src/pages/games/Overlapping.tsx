import { useEffect, useRef, useState } from 'react';
import {
  Container,
  Text,
  NumWrapper,
  Num,
  ButtonWrapper,
  NumBtn,
} from '../../components/games/Overlapping';
import { GameProps } from '../../routes/gameRouter.tsx';
import { AnswerFeedback } from '../../components/common/AnswerFeedback.tsx';
import { styled } from 'styled-components';

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
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: GameProps) {
  let difficulty = gameData.difficulty;
  const [answer, setAnswer] = useState<number[]>([]);
  const startTimeRef = useRef<Date | null>(new Date());
  const endTimeRef = useRef<Date | null>(null);
  let duration = useRef(0);
  let clickedNums = useRef<number[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    let newAnswer: number[] = [];
    while (newAnswer.length < difficulty + 1) {
      newAnswer.push(Math.floor(Math.random() * 10));
      newAnswer = [...new Set(newAnswer)];
    }
    setAnswer(newAnswer);
  }, []);
  console.log(answer);

  const checkAnswer = async () => {
    const answerSet = new Set(answer);
    const clickedNumSet = new Set(clickedNums.current);
    if (
      clickedNums.current.length === answer.length &&
      [...answerSet].every((num) => clickedNumSet.has(num))
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

  const onClickNum = (num: number, el: HTMLButtonElement) => {
    if (clickedNums.current.includes(num)) {
      el.style.background = '#c6c6c6';
      el.style.border = '0.2rem solid var(--gray-bg-color)';
      el.style.color = 'var(--black-color)';
      clickedNums.current = clickedNums.current.filter((v) => v !== num);
    } else {
      if (clickedNums.current.length === answer.length) {
        alert(`${answer.length}개의 정답만 선택해주세요.`);
        return;
      }
      el.style.background = 'var(--main-bg-color)';
      el.style.border = '0.2rem solid var(--main-color)';
      el.style.color = 'var(--main-color)';
      clickedNums.current.push(num);
    }
  };

  return (
    <>
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
              onClick={(e) => onClickNum(index, e.target as HTMLButtonElement)}>
              {index}
            </NumBtn>
          ))}
        </ButtonWrapper>
      </Container>
      {showAnswer && (
        <AnswerFeedback>
          <ShowAnswer>
            <p>
              정답은 [
              {answer.map((v, i) => {
                if (i === answer.length - 1) return v;
                return `${v}, `;
              })}
              ]입니다.
            </p>
          </ShowAnswer>
        </AnswerFeedback>
      )}
    </>
  );
}

const ShowAnswer = styled.div`
  font-size: 5rem;
  width: 50rem;
  height: 50rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--main-bg-color);
  border-radius: 1.3rem;
  box-shadow: 15px 13px 28px 0px rgba(0, 0, 0, 0.06);
  padding: 4rem;
  word-break: keep-all;
  text-align: center;
  @media screen and (max-width: 767px) {
    font-size: 2rem;
    width: 20rem;
    height: 20rem;
    padding: 2rem;
  }
`;
