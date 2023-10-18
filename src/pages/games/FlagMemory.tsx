import { useEffect, useState } from 'react';
import GameQuestion from '../../components/common/GameQuestion';
import { GameProps } from '../../routes/gameRouter';
import { useGameLogic } from '../../hooks/useGameLogic';
import { Container } from '../../components/games/SameColor';
import { NumberContainer } from '../../components/games/PatternNumber';
import { PictureButton } from '../../components/common/GameButton';
import { getRandomFloat } from '../../utils/random';
import { Board, FlagImage } from '../../components/games/FlagMemory';

function FlagMemory({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: Readonly<GameProps>) {
  type Props = {
    imgUrl: string;
    answer: boolean;
  };
  const problemPool: Props[] = gameData.problemPool;
  const difficulty = gameData.difficulty;
  const [candidates, setCandidates] = useState<string[]>([]);
  const showNext = gameData.showNext;
  const isShowNext = showNext !== undefined;
  const [words, setWords] = useState<string[]>([]);
  const answers = problemPool.filter((v) => v.answer).map((v) => v.imgUrl);
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
    true,
    isShowNext,
    true,
  );

  useEffect(() => {
    if (isShowNext) {
      setWords(answers);
    } else {
      setAnswers(answers);
      setCandidates(
        problemPool.map((v) => v.imgUrl).sort(() => getRandomFloat() - 0.5),
      );
    }
  }, []);

  return (
    <Container>
      <GameQuestion
        text={
          isShowNext
            ? `제시하는 국기를 최대한 기억하세요`
            : `앞에서 제시된 국기 ${answers.length}개를 찾으세요`
        }
      />
      {isShowNext ? (
        <NumberContainer>
          {words.map((v) => (
            <FlagImage key={v} alt="" src={v} />
          ))}
        </NumberContainer>
      ) : (
        <Board $difficulty={difficulty}>
          {candidates.map((v) => (
            <PictureButton
              key={v}
              ref={(el) => (buttonRefs.current[buttonRefs.current.length] = el)}
              onClick={(e) => onClickButton(v, e.target as HTMLButtonElement)}
              $imgUrl={v}
              $isMedium={true}
            />
          ))}
        </Board>
      )}
    </Container>
  );
}

export default FlagMemory;
