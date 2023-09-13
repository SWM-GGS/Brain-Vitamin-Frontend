import { useEffect, useMemo, useState } from 'react';
import { Container, Text, Num } from '../../components/games/NumberTouch';
import { getRandomFloat } from '../../utils/random';
import { GameProps } from '../../routes/gameRouter';
import { useGameLogic } from '../../hooks/useGameLogic';

export default function NumberTouch({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: GameProps) {
  const difficulty = gameData.difficulty;
  const maxNum = (difficulty - 1) * 5 + 20;
  const [current, setCurrent] = useState(1);
  let positionIndex = -1;
  const [randomColors, setRandomColors] = useState<string[]>([]);
  const numbers = useMemo(
    () => Array.from({ length: maxNum }, (_, i) => i + 1),
    [],
  );
  const { handleCorrect, containerRef, topRef, randomPositions } =
    useGameLogic<number>(
      {
        gameData,
        onGameEnd,
        saveGameResult,
        isNextButtonClicked,
        setAnswerState,
        answerState,
      },
      current === maxNum,
      false,
      maxNum,
    );

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

  const clickNum = async (el: HTMLElement, num: number) => {
    if (num === current) {
      if (current === maxNum) {
        // 정답
        handleCorrect();
        return;
      }
      setCurrent((prev) => prev + 1);
      el.style.display = 'none';
    }
  };

  return (
    <Container ref={containerRef}>
      <Text>
        {current - 1} / {(difficulty - 1) * 5 + 20}
      </Text>
      <div ref={topRef}></div>
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
