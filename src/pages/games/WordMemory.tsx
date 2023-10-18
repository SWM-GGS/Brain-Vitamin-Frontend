import { useEffect, useState } from 'react';
import GameQuestion from '../../components/common/GameQuestion';
import { GameProps } from '../../routes/gameRouter';
import { useGameLogic } from '../../hooks/useGameLogic';
import Letter from '../../components/games/Synonym';
import { Container } from '../../components/games/SameColor';
import { NumberContainer } from '../../components/games/PatternNumber';
import { Button } from '../../components/common/GameButton';
import { getRandomFloat } from '../../utils/random';
import Board from '../../components/games/WordMemory';

function WordMemory({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: Readonly<GameProps>) {
  type Props = {
    contents: string;
    answer: boolean;
  };
  const problemPool: Props[] = gameData.problemPool;
  const difficulty = gameData.difficulty;
  const [candidates, setCandidates] = useState<string[]>([]);
  const showNext = gameData.showNext;
  const isShowNext = showNext !== undefined;
  const [words, setWords] = useState<string[]>([]);
  const answers = problemPool.filter((v) => v.answer).map((v) => v.contents);
  const { setAnswers, onClickButton, buttonRefs } = useGameLogic<string>(
    {
      gameData,
      onGameEnd,
      saveGameResult,
      isNextButtonClicked,
      setAnswerState,
      answerState,
    },
    undefined,
    undefined,
    undefined,
    undefined,
    isShowNext,
    true,
  );

  useEffect(() => {
    if (isShowNext) {
      setWords(answers);
    } else {
      setAnswers(answers);
      setCandidates(
        problemPool.map((v) => v.contents).sort(() => getRandomFloat() - 0.5),
      );
    }
  }, []);

  return (
    <Container>
      <GameQuestion
        text={
          isShowNext
            ? `제시하는 단어를 최대한 기억하세요`
            : `앞에서 제시된 단어 ${answers.length}개를 찾으세요`
        }
      />
      {isShowNext ? (
        <NumberContainer>
          {words.map((v) => (
            <Letter key={v}>{v}</Letter>
          ))}
        </NumberContainer>
      ) : (
        <Board $difficulty={difficulty}>
          {candidates.map((v) => (
            <Button
              key={v}
              ref={(el) => (buttonRefs.current[buttonRefs.current.length] = el)}
              onClick={(e) => onClickButton(v, e.target as HTMLButtonElement)}
              $isLongMobileSmall={true}>
              {v}
            </Button>
          ))}
        </Board>
      )}
    </Container>
  );
}

export default WordMemory;
