import { useEffect, useMemo, useState } from 'react';
import Container from '../components/Container.tsx';
import {
  Card,
  Flip,
  Front,
  Back,
  RestartBtn,
} from '../components/cardMatch.tsx';

export default function CardMatch() {
  const [clickedCards, setClickedCards] = useState<number[]>([]);
  const [restarted, setRestarted] = useState<boolean>(false);
  const [clickable, setClickable] = useState<boolean>(true);
  const initialCards = [
    { idx: 1, color: '#FFC312', status: false },
    { idx: 2, color: '#FFC312', status: false },
    { idx: 3, color: '#C4E538', status: false },
    { idx: 4, color: '#C4E538', status: false },
    { idx: 5, color: '#12CBC4', status: false },
    { idx: 6, color: '#12CBC4', status: false },
    { idx: 7, color: '#ED4C67', status: false },
    { idx: 8, color: '#ED4C67', status: false },
    { idx: 9, color: '#FDA7DF', status: false },
    { idx: 10, color: '#FDA7DF', status: false },
    // { idx: 11, color: '#833471', status: false },
    // { idx: 12, color: '#833471', status: false },
  ];
  const cards = [...initialCards]; // 카드 복제
  const shuffle = () => cards.sort(() => 0.5 - Math.random());
  const mixedCards = useMemo(() => shuffle(), [restarted]);

  // 처음에 잠시 동안 카드 보여주고 뒤집기
  // useEffect(() => {});

  // 모든 카드의 상태가 true면 게임 종료
  useEffect(() => {
    if (mixedCards.every((card) => card.status === true)) {
      console.log('축하합니다! 모두 맞추셔서 게임이 종료되었습니다!');
    }
    // 클릭된 카드가 두 장인 경우, 매칭 여부 검사
    setClickable(false);
    setTimeout(() => {
      if (clickedCards.length === 2) {
        let firstCard = mixedCards.find((card) => card.idx === clickedCards[0])
          ?.color;
        let secondCard = mixedCards.find((card) => card.idx === clickedCards[1])
          ?.color;
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
      }
      setClickable(true);
    }, 500);
  }, [clickedCards]);

  const handleClick = (idx: number) => {
    console.log(idx);
    setClickedCards((prev) => [...prev, idx]);
    mixedCards.forEach((card) => {
      if (card.idx === idx) {
        card.status = !card.status;
        return;
      }
    });
  };

  return (
    <Container>
      {mixedCards.map((card) => (
        <Flip
          key={card.idx}
          $status={card.status}
          $clickable={clickable}
          onClick={() => {
            !card.status ? handleClick(card.idx) : null;
          }}>
          <Card>
            <Front $status={card.status} $background={card.color} />
            <Back $status={card.status} />
          </Card>
        </Flip>
      ))}
      <RestartBtn type="button" onClick={() => setRestarted((prev) => !prev)}>
        다시 시작하기
      </RestartBtn>
    </Container>
  );
}
