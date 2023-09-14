import { GameProps } from '../../routes/gameRouter';
import GameQuestion from '../../components/common/GameQuestion';
import { Button, ButtonContainer } from '../../components/common/GameButton';
import { Container, Letter } from '../../components/games/ShownColor';
import { useColorGameLogic } from '../../hooks/useColorGameLogic';

function ShownColor({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: GameProps) {
  const { onClickButton, buttonRefs, candidates, letter, color } =
    useColorGameLogic(
      {
        gameData,
        onGameEnd,
        saveGameResult,
        isNextButtonClicked,
        setAnswerState,
        answerState,
      },
      false,
    );

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
