import { useEffect, useRef, useState } from 'react';
import { Button, ButtonContainer } from '../../components/common/GameButton';
import GameQuestion from '../../components/common/GameQuestion';
import {
  Container,
  NumberContainer,
} from '../../components/games/PatternNumber';
import { getRandomFloat } from '../../utils/random';
import { GameProps } from '../../routes/gameRouter';
import { Num } from '../../components/games/BasicCalculate';

function PatternNumber({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: GameProps) {
  const difficulty = gameData.difficulty;
  const startTimeRef = useRef<Date | null>(new Date());
  const endTimeRef = useRef<Date | null>(null);
  const duration = useRef(0);
  const clickedNum = useRef(10000);
  const buttonRefs = useRef<HTMLButtonElement[] | null[]>([]);
  const [answer, setAnswer] = useState<number>();
  const [quizPosition, setQuizPosition] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [candidates, setCandidates] = useState<number[]>([]);

  useEffect(() => {
    const n = Math.floor(getRandomFloat() * 4 + 1);
    let x: number;
    let y: number;
    let answer: number;

    if (difficulty === 1) {
      // x + (n-1)*y -> 등차수열, 1 ≤ x ≤ 100, 1 ≤ y ≤ 100
      x = Math.floor(getRandomFloat() * 99 + 1);
      y = Math.floor(getRandomFloat() * 99 + 1);
      answer = x + (n - 1) * y;
    } else if (difficulty === 2) {
      // x + (n-1)*y -> 등차수열, 1 ≤ x ≤ 100, -100 ≤ y ≤ -1
      x = Math.floor(getRandomFloat() * 99 + 1);
      y = -Math.floor(getRandomFloat() * 99 + 1);
      answer = x + (n - 1) * y;
    } else {
      // x * y^(n-1) -> 등비수열, 1 ≤ x ≤ 10, 2 ≤ y ≤ 10
      x = Math.floor(getRandomFloat() * 9 + 1);
      y = Math.floor(getRandomFloat() * 8 + 2);
      answer = x * y ** (n - 1);
    }
    setAnswer(answer);
    setX(x);
    setY(y);
    setQuizPosition(n);
    setCandidates(
      [answer, getRandomFloat() < 0.5 ? answer + 2 : answer - 2].sort(
        () => getRandomFloat() - 0.5,
      ),
    );
  }, []);

  const checkAnswer = async () => {
    if (clickedNum.current === answer) {
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

  const onClickButton = (num: number, el: HTMLElement) => {
    if (clickedNum.current === num) {
      el.style.background = 'var(--button-bg-color)';
      el.style.border = '0.2rem solid var(--gray-bg-color)';
      el.style.color = 'white';
      clickedNum.current = 10000;
    } else {
      for (const buttonRef of buttonRefs.current) {
        if (buttonRef?.style.background === 'var(--main-bg-color)') {
          buttonRef.style.background = 'var(--button-bg-color)';
          buttonRef.style.border = '0.2rem solid var(--gray-bg-color)';
          buttonRef.style.color = 'white';
          break;
        }
      }
      el.style.background = 'var(--main-bg-color)';
      el.style.border = '0.2rem solid var(--main-color)';
      el.style.color = 'var(--main-color)';
      clickedNum.current = num;
    }
  };

  return (
    <Container>
      <GameQuestion text="규칙에 맞는 숫자를 고르세요" />
      <NumberContainer>
        {Array.from({ length: 5 }, (_, i) => i + 1).map((v) => (
          <div key={v}>
            {difficulty === 3 ? (
              <Num $num={quizPosition !== v ? x * y ** (v - 1) : null} />
            ) : (
              <Num $num={quizPosition !== v ? x + (v - 1) * y : null} />
            )}
          </div>
        ))}
      </NumberContainer>
      {answer && (
        <ButtonContainer>
          {candidates.map((v) => (
            <Button
              key={v}
              ref={(el) => (buttonRefs.current[buttonRefs.current.length] = el)}
              onClick={(e) => onClickButton(v, e.target as HTMLButtonElement)}>
              {v}
            </Button>
          ))}
        </ButtonContainer>
      )}
    </Container>
  );
}

export default PatternNumber;
