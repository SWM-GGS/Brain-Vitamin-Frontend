import { useEffect, useMemo, useRef, useState } from 'react';
import { Container, Text, Num } from '../../components/games/NumberTouch';
import { getRandomFloat } from '../../utils/random';
import { GameProps } from '../../routes/gameRouter';

export default function NumberTouch({
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
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const maxNum = (difficulty - 1) * 5 + 20;
  const [current, setCurrent] = useState(1);
  type RandomPositionsProps = { top: number; left: number };
  const [randomPositions, setRandomPositions] = useState<
    RandomPositionsProps[]
  >([]);
  let positionIndex = -1;
  const [randomColors, setRandomColors] = useState<string[]>([]);
  const numbers = useMemo(
    () => Array.from({ length: maxNum }, (_, i) => i + 1),
    [],
  );

  // 숫자가 처음 흩뿌려질 위치 배열 초기화
  useEffect(() => {
    const positions: RandomPositionsProps[] = [];

    while (positions.length < maxNum) {
      const newPosition = calculateRandomPosition();

      if (!newPosition) return;
      if (positions.some((position) => isOverlap(position, newPosition))) {
        continue;
      }
      positions.push(newPosition);
    }
    setRandomPositions(positions);
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
    if (containerRef.current && textRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const textRect = textRef.current.getBoundingClientRect();
      const randomTop =
        Math.floor(
          getRandomFloat() * (containerRect.bottom - textRect.bottom) +
            textRect.bottom,
        ) - 10;
      const randomLeft =
        Math.floor(
          getRandomFloat() * (containerRect.right - containerRect.left) +
            containerRect.left,
        ) - 40;

      return { top: randomTop, left: randomLeft };
    }
  };

  // 숫자 랜덤 색상 부여
  useEffect(() => {
    const colors: string[] = [];

    while (colors.length < maxNum) {
      const newColor =
        '#' + Math.floor(getRandomFloat() * 0xffffff).toString(16);

      colors.push(newColor);
    }
    setRandomColors(colors);
  }, []);

  const checkAnswer = async () => {
    if (current === maxNum) {
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

  const clickNum = async (el: HTMLElement, num: number) => {
    if (num === current) {
      if (current === maxNum) {
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
        return;
      }
      setCurrent((prev) => prev + 1);
      el.style.display = 'none';
    }
  };

  return (
    <Container ref={containerRef}>
      <Text ref={textRef}>
        {current - 1} / {(difficulty - 1) * 5 + 20}
      </Text>
      {numbers.map((num) => {
        positionIndex++;
        return (
          <Num
            key={num}
            style={{
              position: 'absolute',
              ...randomPositions[positionIndex],
              color: randomColors[positionIndex],
            }}
            onClick={(e) => clickNum(e.target as HTMLElement, num)}>
            {num}
          </Num>
        );
      })}
    </Container>
  );
}
