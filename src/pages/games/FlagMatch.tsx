import GameQuestion from '../../components/common/GameQuestion';
import { GameProps } from '../../routes/gameRouter';
import { useGameLogic } from '../../hooks/useGameLogic';
import { NumberContainer } from '../../components/games/PatternNumber';
import {
  Container,
  PresentedFlag,
  MatchContainer,
} from '../../components/games/FlagMatch';
import { useState } from 'react';

function FlagMatch({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: GameProps) {
  type Props = {
    imgUrl: string;
    contents: string;
  };
  const problemPool: Props[] = gameData.problemPool;
  const showNext = gameData.showNext;
  const isShowNext = showNext !== undefined;
  const isMobile = window.innerWidth <= 767;
  const items = problemPool.map((v) => {
    return { source: { imageURL: v.imgUrl }, target: { text: v.contents } };
  });
  const [isCorrectMatch, setIsCorrectMatch] = useState(false);
  useGameLogic<string>(
    {
      gameData,
      onGameEnd,
      saveGameResult,
      isNextButtonClicked,
      setAnswerState,
      answerState,
    },
    isCorrectMatch,
    undefined,
    undefined,
    undefined,
    isShowNext,
  );

  return (
    <Container>
      <GameQuestion
        text={
          isShowNext
            ? `제시하는 국기와 나라를 최대한 기억하세요`
            : `국기와 나라를 올바르게 연결하세요`
        }
      />
      {isShowNext ? (
        <NumberContainer>
          {problemPool.map((v) => (
            <PresentedFlag
              key={v.contents}
              $imgUrl={v.imgUrl}
              $letter={v.contents}
            />
          ))}
        </NumberContainer>
      ) : (
        <MatchContainer
          items={items}
          isLayoutUpAndDown={!isMobile}
          setIsCorrectMatch={setIsCorrectMatch}
        />
      )}
    </Container>
  );
}

export default FlagMatch;
