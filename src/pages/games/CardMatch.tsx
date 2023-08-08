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

/**
 * 난도
 * 하 : 2 * 3
 * 중 : 2 * 4
 * 상 : 3 * 4
 */
export default function CardMatch({ gameData, onGameEnd }: GameProps) {
  type Props = {
    imgUrl: string;
  };
  const problemPool: Props[] = gameData.problemPool;
  // const problemPool = [
  //   {
  //     imgUrl:
  //       'https://i.namu.wiki/i/HU1gqPTOGoPCjf9po5cSTGVmI3W_1MDEQfw9hRMlufPzZYG9KkRU10m_IE7P2qx79V63hPnot-eRCF9OpCns9Xrs_Wyhqtv82-53ZpaxkNI0ZgNcmlw8hKh6X3uXI0Q43LW2YHvVTRQxMNmQC2yuQQ.webp',
  //   },
  //   {
  //     imgUrl:
  //       'https://i.namu.wiki/i/wcD0bWhb6uhlo6GvSSiAX0jRsGiAZqW5GmJc76vZv3fM6RqeIB8xdjzZv779QtOr2uGsK2EzI7o8MET_rxbnFw.webp',
  //   },
  //   ,
  //   {
  //     imgUrl:
  //       'https://i.namu.wiki/i/Bjxggs5ixnGrz1UKXgd7asU4LvO8…5QFAqIw_sR9HJPXowv2EME4-SDrVo0Fsa14kWhSM3dIA.webp',
  //   },
  // ];
  const [clickedCards, setClickedCards] = useState<number[]>([]);
  const [clickable, setClickable] = useState<boolean>(true);
  let difficulty = gameData.difficulty;
  // let difficulty = 1;
  let cardCnt: number;

  if (difficulty === 1) {
    cardCnt = 6;
  } else if (difficulty === 2) {
    cardCnt = 8;
  } else {
    cardCnt = 12;
  }

  // const deck = Array.from(
  //   { length: cardCnt / 2 },
  //   () => '#' + Math.floor(Math.random() * 0xffffff).toString(16),
  // );
  const deck = problemPool.map((v) => v.imgUrl);
  const cards = [...deck, ...deck].map((card, i) => {
    return { idx: i, type: card, status: false };
  });
  const shuffle = () => cards.sort(() => 0.5 - Math.random());
  const mixedCards = useMemo(() => shuffle(), []);

  const checkAnswer = () => {
    // 모든 카드의 상태가 true면 게임 종료
    if (mixedCards.every((card) => card.status)) {
      onGameEnd();
    }
  };

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
        checkAnswer();
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
