import { useEffect, useRef, useState } from 'react';
import { GameProps } from '../routes/gameRouter';

export const useGameLogic = <T>(
  {
    gameData,
    onGameEnd,
    saveGameResult,
    isNextButtonClicked,
    setAnswerState,
    answerState,
  }: GameProps,
  answerExpression?: boolean,
  showCorrectAnswer?: boolean,
) => {
  const startTimeRef = useRef<Date | null>(new Date());
  const endTimeRef = useRef<Date | null>(null);
  const duration = useRef(0);
  const clickedTarget = useRef<T | null>(null);
  const buttonRefs = useRef<HTMLButtonElement[] | null[]>([]);
  const [answer, setAnswer] = useState<number>();
  const [showAnswer, setShowAnswer] = useState(false);

  const handleCorrect = async () => {
    saveGameResult(gameData.problemId, duration.current, 'SUCCESS', 10);
    setAnswerState('correct');
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        setAnswerState('');
        resolve();
      }, 2000);
    });
    onGameEnd({
      problemId: gameData.problemId,
      duration: duration.current,
      result: 'SUCCESS',
      score: 10,
    });
  };

  const handleIncorrect = async () => {
    saveGameResult(gameData.problemId, duration.current, 'FAIL', 0);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        setAnswerState('');
        resolve();
      }, 2000);
    });
    if (showCorrectAnswer) {
      setShowAnswer(true);
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          setShowAnswer(false);
          resolve();
        }, 2000);
      });
    }
    onGameEnd({
      problemId: gameData.problemId,
      duration: duration.current,
      result: 'FAIL',
      score: 0,
    });
  };

  const checkAnswer = () => {
    if (answerExpression || clickedTarget.current === answer) {
      // 정답
      handleCorrect();
    } else {
      // 오답
      setAnswerState('incorrect');
    }
  };

  useEffect(() => {
    if (answerState === 'incorrect') {
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

  const onClickButton = (target: T, el: HTMLElement) => {
    if (clickedTarget.current === target) {
      el.style.background = 'var(--button-bg-color)';
      el.style.border = '0.2rem solid var(--gray-bg-color)';
      el.style.color = 'white';
      clickedTarget.current = null;
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
      clickedTarget.current = target;
    }
  };

  return { onClickButton, setAnswer, buttonRefs, handleCorrect, showAnswer };
};
