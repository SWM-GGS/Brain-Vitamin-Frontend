import { useEffect, useRef, useState } from 'react';
import { GameProps } from '../routes/gameRouter';
import { getRandomFloat } from '../utils/random';

export const useGameLogic = <T>(
  {
    gameData,
    onGameEnd,
    saveGameResult,
    isNextButtonClicked,
    setAnswerState,
    answerState,
  }: GameProps,
  isCorrect?: boolean,
  showCorrectAnswer?: boolean,
  randomPositionCount?: number,
  isButtonBorderBlack?: boolean,
  isShowNext?: boolean,
  isClickedButtonArray?: boolean,
) => {
  const startTimeRef = useRef<Date | null>(new Date());
  const endTimeRef = useRef<Date | null>(null);
  const duration = useRef(0);
  const clickedTarget = useRef<T | null>(null);
  const clickedTargets = useRef<T[]>([]);
  const buttonRefs = useRef<HTMLButtonElement[] | null[]>([]);
  const [answer, setAnswer] = useState<T>();
  const [answers, setAnswers] = useState<T[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  type RandomPositionsProps = { top: number; left: number };
  const [randomPositions, setRandomPositions] = useState<
    RandomPositionsProps[]
  >([]);

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

  const isCorrectAnswerArray = () => {
    if (clickedTargets.current.length !== answers.length) {
      return false;
    }
    const sortedClickedTargets = [...clickedTargets.current].sort((a, b) =>
      a > b ? 1 : -1,
    );
    const sortedAnswers = [...answers].sort((a, b) => (a > b ? 1 : -1));

    return (
      JSON.stringify(sortedClickedTargets) === JSON.stringify(sortedAnswers)
    );
  };

  const isCorrectAnswer = () => {
    if (isClickedButtonArray) {
      return isCorrectAnswerArray();
    }
    return clickedTarget.current === answer;
  };

  const checkAnswer = () => {
    if (isCorrect || isCorrectAnswer()) {
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
      if (isShowNext) {
        onGameEnd();
      } else {
        endTimeRef.current = new Date();
        if (startTimeRef.current && endTimeRef.current) {
          duration.current =
            (endTimeRef.current.getTime() - startTimeRef.current.getTime()) /
            1000;
        }
        checkAnswer();
      }
    }
  }, [isNextButtonClicked]);

  const initButtonStyle = (el: HTMLElement) => {
    el.style.backgroundColor = 'var(--button-bg-color)';
    if (isButtonBorderBlack) {
      el.style.border = '0.2rem solid var(--black-color)';
    } else {
      el.style.border = '0.2rem solid var(--gray-bg-color)';
    }
    el.style.color = 'white';
  };

  const activateButtonStyle = (el: HTMLElement) => {
    el.style.backgroundColor = 'var(--main-bg-color)';
    el.style.border = '0.2rem solid var(--main-color)';
    el.style.color = 'var(--main-color)';
  };

  const onClickButtonArray = (target: T, el: HTMLElement) => {
    if (clickedTargets.current.includes(target)) {
      initButtonStyle(el);
      clickedTargets.current = clickedTargets.current.filter(
        (v) => v !== target,
      );
      return;
    }
    if (clickedTargets.current.length === answers.length) {
      buttonRefs.current.forEach((el) => {
        if (el) {
          initButtonStyle(el);
        }
      });
      clickedTargets.current = [];
    }
    activateButtonStyle(el);
    clickedTargets.current.push(target);
  };

  const onClickButton = (target: T, el: HTMLElement) => {
    if (isClickedButtonArray) {
      onClickButtonArray(target, el);
      return;
    }
    if (clickedTarget.current === target) {
      initButtonStyle(el);
      clickedTarget.current = null;
    } else {
      for (const buttonRef of buttonRefs.current) {
        if (buttonRef?.style.backgroundColor === 'var(--main-bg-color)') {
          initButtonStyle(buttonRef);
          break;
        }
      }
      activateButtonStyle(el);
      clickedTarget.current = target;
    }
  };

  // 숫자가 처음 흩뿌려질 위치 배열 초기화
  useEffect(() => {
    if (randomPositionCount) {
      const positions: RandomPositionsProps[] = [];

      while (positions.length < randomPositionCount) {
        const newPosition = calculateRandomPosition();

        if (!newPosition) return;
        if (positions.some((position) => isOverlap(position, newPosition))) {
          continue;
        }
        positions.push(newPosition);
      }
      setRandomPositions(positions);
    }
  }, []);

  // 위치가 겹치는지 확인하는 함수
  const isOverlap = (
    positionA: RandomPositionsProps,
    positionB: RandomPositionsProps,
  ) => {
    const dx = Math.abs(positionA.left - positionB.left);
    const dy = Math.abs(positionA.top - positionB.top);

    return dx < 60 && dy < 60;
  };

  // 숫자가 처음 흩뿌려질 위치 조정
  const calculateRandomPosition = () => {
    if (containerRef.current && topRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const textRect = topRef.current.getBoundingClientRect();
      const randomTop =
        Math.floor(
          getRandomFloat() * (containerRect.bottom - textRect.bottom) +
            textRect.bottom,
        ) - 10;
      const randomLeft =
        Math.floor(
          getRandomFloat() * (containerRect.right - containerRect.left) +
            containerRect.left,
        ) - 20;

      return { top: randomTop, left: randomLeft };
    }
  };

  return {
    onClickButton,
    setAnswer,
    setAnswers,
    buttonRefs,
    handleCorrect,
    showAnswer,
    containerRef,
    topRef,
    randomPositions,
  };
};
