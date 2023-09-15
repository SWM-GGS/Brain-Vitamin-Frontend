import { useEffect, useState } from 'react';
import { Button, ButtonContainer } from '../../components/common/GameButton';
import GameQuestion from '../../components/common/GameQuestion';
import { getRandomFloat } from '../../utils/random';
import { GameProps } from '../../routes/gameRouter';
import { useGameLogic } from '../../hooks/useGameLogic';
import Letter from '../../components/games/Synonym';
import { Container } from '../../components/games/SameColor';

function Synonym({
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
  const [candidates, setCandidates] = useState<string[]>([]);
  const [letter, setLetter] = useState('');
  const { onClickButton, setAnswer, buttonRefs } = useGameLogic<string>({
    gameData,
    onGameEnd,
    saveGameResult,
    isNextButtonClicked,
    setAnswerState,
    answerState,
  });

  useEffect(() => {
    const synonymPair = problemPool.filter((v) => v.answer);
    const candidates = problemPool
      .filter((v) => !v.answer)
      .map((v) => v.contents);
    const letter = synonymPair[0].contents;
    const answer = synonymPair[1].contents;

    setAnswer(answer);
    setLetter(letter);
    setCandidates([answer, ...candidates].sort(() => getRandomFloat() - 0.5));
  }, []);

  return (
    <Container>
      <GameQuestion text="아래의 단어와 유사한 의미의 단어를 고르세요" />
      <Letter>{letter}</Letter>
      <ButtonContainer>
        {candidates.map((v) => (
          <Button
            key={v}
            ref={(el) => (buttonRefs.current[buttonRefs.current.length] = el)}
            $isLong={true}
            onClick={(e) => onClickButton(v, e.target as HTMLButtonElement)}>
            {v}
          </Button>
        ))}
      </ButtonContainer>
    </Container>
  );
}

export default Synonym;
