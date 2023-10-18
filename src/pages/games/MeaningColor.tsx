import { GameProps } from '../../routes/gameRouter';
import GameQuestion from '../../components/common/GameQuestion';
import { Button, ButtonContainer } from '../../components/common/GameButton';
import { Container, Letter } from '../../components/games/ShownColor';
import { useColorGameLogic } from '../../hooks/useColorGameLogic';

function MeaningColor({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: Readonly<GameProps>) {
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
      true,
    );

  return (
    <Container>
      <GameQuestion text="다음 글자가 뜻하는 색이 무엇인가요?" />
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

export default MeaningColor;
