import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Container,
  Card,
  FlipWrapper,
  Flip,
  Front,
  Back,
} from '../../components/games/CardMatch.tsx';
import { GameProps } from '../../routes/gameRouter.tsx';

/**
 * 난도
 * 하 : 2 * 3
 * 중 : 2 * 4
 * 상 : 3 * 4
 */
export default function CardMatch({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
}: GameProps) {
  // type Props = {
  //   imgUrl: string;
  // };
  // const problemPool: Props[] = gameData.problemPool;
  const [clickedCards, setClickedCards] = useState<number[]>([]);
  const [clickable, setClickable] = useState<boolean>(true);
  let difficulty = gameData.difficulty;
  let cardCnt: number;
  if (difficulty === 1) {
    cardCnt = 6;
  } else if (difficulty === 2) {
    cardCnt = 8;
  } else {
    cardCnt = 12;
  }
  // const deck = problemPool.map((v) => v.imgUrl);
  const deck = [
    '/src/assets/images/cardMatch/1.svg',
    '/src/assets/images/cardMatch/2.svg',
    '/src/assets/images/cardMatch/3.svg',
    '/src/assets/images/cardMatch/4.svg',
    '/src/assets/images/cardMatch/5.svg',
    '/src/assets/images/cardMatch/6.svg',
    '/src/assets/images/cardMatch/7.svg',
    '/src/assets/images/cardMatch/8.svg',
    '/src/assets/images/cardMatch/9.svg',
    '/src/assets/images/cardMatch/10.svg',
    '/src/assets/images/cardMatch/11.svg',
    '/src/assets/images/cardMatch/12.svg',
    '/src/assets/images/cardMatch/13.svg',
    '/src/assets/images/cardMatch/14.svg',
    '/src/assets/images/cardMatch/15.svg',
    '/src/assets/images/cardMatch/16.svg',
    '/src/assets/images/cardMatch/17.svg',
    '/src/assets/images/cardMatch/18.svg',
    '/src/assets/images/cardMatch/19.svg',
    '/src/assets/images/cardMatch/20.svg',
    '/src/assets/images/cardMatch/21.svg',
    '/src/assets/images/cardMatch/22.svg',
    '/src/assets/images/cardMatch/23.svg',
    '/src/assets/images/cardMatch/24.svg',
    '/src/assets/images/cardMatch/25.svg',
  ];
  let randomDeck: string[] = [];
  while (randomDeck.length < cardCnt / 2) {
    randomDeck.push(deck[Math.floor(Math.random() * deck.length)]);
    randomDeck = [...new Set(randomDeck)];
  }
  const cards = [...randomDeck, ...randomDeck].map((card, i) => {
    return { idx: i, type: card, status: false };
  });
  const shuffle = () => cards.sort(() => 0.5 - Math.random());
  const mixedCards = useMemo(() => shuffle(), []);
  const startTimeRef = useRef<Date | null>(new Date());
  const endTimeRef = useRef<Date | null>(null);
  let duration = useRef(0);

  const checkAnswer = () => {
    // 모든 카드의 상태가 true면 게임 종료
    if (mixedCards.every((card) => card.status)) {
      alert('정답입니다!');
      saveGameResult(gameData.problemId, duration.current, 'SUCCESS', 10);
      onGameEnd();
    } else {
      alert('틀렸습니다 ㅜ.ㅜ');
      saveGameResult(gameData.problemId, duration.current, 'FAIL', 0);
      onGameEnd();
    }
  };

  useEffect(() => {
    if (isNextButtonClicked) {
      endTimeRef.current = new Date();
      if (startTimeRef.current && endTimeRef.current) {
        duration.current =
          (endTimeRef.current.getTime() - startTimeRef.current.getTime()) /
          1000;
      }
      checkAnswer();
    }
  }, [isNextButtonClicked]);

  useEffect(() => {
    // 클릭된 카드가 두 장인 경우, 매칭 여부 검사
    setClickable(false);
    if (clickedCards.length === 2) {
      setTimeout(() => {
        let firstCard = mixedCards.find((card) => card.idx === clickedCards[0])
          ?.type;
        let secondCard = mixedCards.find((card) => card.idx === clickedCards[1])
          ?.type;
        // 두 카드가 같지 않은 경우, 클릭된 두 장의 카드 다시 뒤집기
        if (firstCard !== secondCard) {
          mixedCards.forEach((card) => {
            if (card.idx === clickedCards[0] || card.idx === clickedCards[1]) {
              card.status = false;
            }
          });
          console.log('매칭에 실패하셨습니다ㅠㅠ');
        } else {
          // 매칭 성공
          console.log('매칭에 성공하셨습니다!');
        }
        setClickedCards([]);
        setClickable(true);
      }, 500);
    } else {
      setClickable(true);
    }
  }, [clickedCards]);

  const handleClick = (idx: number) => {
    setClickedCards((prev) => [...prev, idx]);
    mixedCards.forEach((card) => {
      if (card.idx === idx) {
        card.status = !card.status;
        return;
      }
    });
  };

  return (
    <>
      <Container $difficulty={difficulty}>
        {mixedCards.map((card) => (
          <FlipWrapper key={card.idx}>
            <Flip
              $status={card.status}
              $clickable={clickable}
              onClick={() => {
                !card.status ? handleClick(card.idx) : null;
              }}>
              <Card>
                <Front $status={card.status} $background={card.type} />
                <Back $status={card.status} />
              </Card>
            </Flip>
          </FlipWrapper>
        ))}
      </Container>
    </>
  );
}
