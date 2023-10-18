import GameQuestion from '../../components/common/GameQuestion';
import { GameProps } from '../../routes/gameRouter';
import { useGameLogic } from '../../hooks/useGameLogic';
import { NumberContainer } from '../../components/games/PatternNumber';
import { Container, PresentedFlag } from '../../components/games/FlagMatch';
import { useEffect, useState } from 'react';
import { ConnectLine, ItemsProps } from 'react-connect-line';

function FlagMatch({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: Readonly<GameProps>) {
  type Props = {
    imgUrl: string;
    contents: string;
  };
  const problemPool: Props[] = gameData.problemPool;
  const showNext = gameData.showNext;
  const isShowNext = showNext !== undefined;
  const isMobile = window.innerWidth <= 767;
  const [items, setItems] = useState<ItemsProps[]>([]);
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

  useEffect(() => {
    const items = problemPool.map((v) => {
      return { source: { imageURL: v.imgUrl }, target: { text: v.contents } };
    });

    setItems(items);
  }, []);

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
        <ConnectLine
          items={items}
          isLayoutUpAndDown={!isMobile}
          setIsCorrectMatch={setIsCorrectMatch}
          dotColor="var(--main-color)"
          lineColor="var(--main-color)"
        />
      )}
    </Container>
  );
}

export default FlagMatch;
