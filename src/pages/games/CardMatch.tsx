import { useEffect, useMemo, useState } from 'react';
import {
  Container,
  Card,
  FlipWrapper,
  Flip,
  Front,
  Back,
} from '../../components/games/CardMatch.tsx';
import { GameProps } from '../../routes/gameRouter.tsx';
import { getRandomFloat } from '../../utils/random.ts';
import { useGameLogic } from '../../hooks/useGameLogic.ts';

/**
 * 난도별 카드 개수 상이
 * 하 : 2 * 3
 * 중 : 2 * 4
 * 상 : 3 * 4
 */
export default function CardMatch({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: GameProps) {
  type Props = {
    imgUrl: string;
  };
  const problemPool: Props[] = gameData.problemPool;
  const [clickedCards, setClickedCards] = useState<number[]>([]);
  const [clickable, setClickable] = useState<boolean>(true);
  const difficulty = gameData.difficulty;
  const deck = problemPool.map((v) => v.imgUrl);
  const cards = [...deck, ...deck].map((card, i) => {
    return { idx: i, type: card, status: false };
  });
  const shuffle = () => [...cards].sort(() => 0.5 - getRandomFloat());
  const mixedCards = useMemo(() => shuffle(), []);
  const isCorrect = () => {
    return mixedCards.every((card) => card.status);
  };
  const { checkAnswer } = useGameLogic<number>(
    {
      gameData,
      onGameEnd,
      saveGameResult,
      isNextButtonClicked,
      setAnswerState,
      answerState,
    },
    isCorrect(),
  );

  useEffect(() => {
    // 클릭된 카드가 두 장인 경우, 매칭 여부 검사
    setClickable(false);
    if (clickedCards.length < 2) {
      setClickable(true);
      return;
    }
    setTimeout(() => {
      let firstCard = mixedCards.find((card) => card.idx === clickedCards[0])
        ?.type;
      let secondCard = mixedCards.find((card) => card.idx === clickedCards[1])
        ?.type;
      // 두 카드가 같지 않은 경우, 클릭된 두 장의 카드 다시 뒤집기
      if (firstCard !== secondCard) {
        const card1 = mixedCards.find((card) => card.idx === clickedCards[0]);
        const card2 = mixedCards.find((card) => card.idx === clickedCards[1]);
        if (card1 && card2) {
          card1.status = false;
          card2.status = false;
        }
        console.log('매칭에 실패하셨습니다ㅠㅠ');
      } else {
        // 매칭 성공
        console.log('매칭에 성공하셨습니다!');
        // 카드가 모두 매칭된 경우 자동 정답 처리
        if (isCorrect()) {
          checkAnswer();
        }
      }
      setClickedCards([]);
      setClickable(true);
    }, 500);
  }, [clickedCards]);

  const handleClick = (idx: number) => {
    setClickedCards((prev) => [...prev, idx]);
    const card = mixedCards.find((card) => card.idx === idx);
    if (card) {
      card.status = !card.status;
    }
  };

  return (
    <Container $difficulty={difficulty}>
      {mixedCards.map((card) => (
        <FlipWrapper key={card.idx}>
          <Flip
            $status={card.status}
            $clickable={clickable}
            onClick={() => (!card.status ? handleClick(card.idx) : null)}>
            <Card>
              <Front $status={card.status} $background={card.type} />
              <Back $status={card.status} />
            </Card>
          </Flip>
        </FlipWrapper>
      ))}
    </Container>
  );
}
