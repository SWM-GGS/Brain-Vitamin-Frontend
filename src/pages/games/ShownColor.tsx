import { useEffect, useState } from 'react';
import { GameProps } from '../../routes/gameRouter';
import { useGameLogic } from '../../hooks/useGameLogic';
import GameQuestion from '../../components/common/GameQuestion';
import { Button, ButtonContainer } from '../../components/common/GameButton';
import { Container, Letter } from '../../components/games/ShownColor';
import { getRandomFloat } from '../../utils/random';

function ShownColor({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: GameProps) {
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

    setAnswer(colorNameMatch[color]);
    setLetter(name);
    setColor(color);
    setCandidates(
      [name, colorNameMatch[color]].sort(() => getRandomFloat() - 0.5),
    );
  }, []);

  return (
    <Container>
      <GameQuestion text="다음 글자가 무슨색으로 쓰여있나요?" />
      <Letter $color={color}>{letter}</Letter>
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
    </Container>
  );
}

export default ShownColor;
