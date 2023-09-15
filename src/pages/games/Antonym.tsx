import { useEffect, useState } from 'react';
import { Button, ButtonContainer } from '../../components/common/GameButton';
import GameQuestion from '../../components/common/GameQuestion';
import { Container } from '../../components/games/PatternNumber';
import { GameProps } from '../../routes/gameRouter';
import { useGameLogic } from '../../hooks/useGameLogic';
import { getRandomFloat } from '../../utils/random';

function Antonym({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: GameProps) {
  type Props = {
    contents: string;
    answer: boolean;
  };
  const problemPool: Props[] = gameData.problemPool;
  const [candidates, setCandidates] = useState<Props[]>([]);
  const { onClickButton, setAnswer, buttonRefs } = useGameLogic<string>({
    gameData,
    onGameEnd,
    saveGameResult,
    isNextButtonClicked,
    setAnswerState,
    answerState,
  });

  useEffect(() => {
    setAnswer(problemPool.filter((v) => v.answer)[0].contents);
    setCandidates([...problemPool].sort(() => getRandomFloat() - 0.5));
  }, []);

  return (
    <Container>
      <GameQuestion text="의미가 다른 단어를 고르세요" />
      <ButtonContainer>
        {candidates.map((v) => (
          <Button
            key={v.contents}
            ref={(el) => (buttonRefs.current[buttonRefs.current.length] = el)}
            $isLong={true}
            onClick={(e) =>
              onClickButton(v.contents, e.target as HTMLButtonElement)
            }>
            {v.contents}
          </Button>
        ))}
      </ButtonContainer>
    </Container>
  );
}

export default Antonym;
