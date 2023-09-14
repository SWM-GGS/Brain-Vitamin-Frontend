import { useEffect, useState } from 'react';
import { useGameLogic } from './useGameLogic';
import { GameProps } from '../routes/gameRouter';
import { getRandomFloat } from '../utils/random';

export const useColorGameLogic = (
  {
    gameData,
    onGameEnd,
    saveGameResult,
    isNextButtonClicked,
    setAnswerState,
    answerState,
  }: GameProps,
  isMeaningColor: boolean,
) => {
  const [candidates, setCandidates] = useState<string[]>([]);
  const [letter, setLetter] = useState('');
  const [color, setColor] = useState('');
  const { onClickButton, setAnswer, buttonRefs } = useGameLogic<string>({
    gameData,
    onGameEnd,
    saveGameResult,
    isNextButtonClicked,
    setAnswerState,
    answerState,
  });
  const colorNames = ['빨강', '파랑', '노랑', '검정'];
  const colors = ['red', 'blue', 'yellow', 'black'];
  const colorNameMatch: { [key: string]: string } = {
    red: '빨강',
    blue: '파랑',
    yellow: '노랑',
    black: '검정',
  };

  useEffect(() => {
    const randomIndex1 = Math.floor(getRandomFloat() * 3);
    const name = colorNames[randomIndex1];
    const newColors = colors.filter((_, i) => i !== randomIndex1);
    const randomIndex2 = Math.floor(getRandomFloat() * 2);
    const color = newColors[randomIndex2];

    if (isMeaningColor) {
      setAnswer(name);
    } else {
      setAnswer(colorNameMatch[color]);
    }
    setLetter(name);
    setColor(color);
    setCandidates(
      [name, colorNameMatch[color]].sort(() => getRandomFloat() - 0.5),
    );
  }, []);

  return { onClickButton, buttonRefs, candidates, letter, color };
};
