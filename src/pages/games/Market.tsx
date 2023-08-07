import { useEffect, useState } from 'react';
import { Memo, Container, Img, Button } from '../../components/games/Market';
import Timer from '../../modules/Timer.tsx';
import { GameProps } from '../../routes/gameRouter.tsx';

export default function Market({ gameData, onGameEnd }: GameProps) {
  const [isGameEnded, setIsGameEnded] = useState(false);

  type Props = {
    contents: string;
    count: number;
    imgUrl: string;
    price: number;
  };
  const problemPool: Props[] = gameData.problemPool;
  const discountPercent = gameData.discountPercent;
  let answer = problemPool.reduce((p, c) => p + c.price * c.count, 0);
  if (discountPercent) {
    answer = answer * (1 - discountPercent / 100);
  }
  const difference = 500;
  const candidateCnt = 5;
  let candidate = [answer];
  while (candidate.length < candidateCnt) {
    const price =
      answer +
      (Math.random() > 0.5 ? 1 : -1) *
        Math.floor(Math.random() * 5) *
        difference;
    if (price > 0 && !candidate.includes(price)) candidate.push(price);
  }
  candidate.sort(() => Math.random() - 0.5);

  const checkAnswer = (el: HTMLElement) => {
    if (+el.innerText === answer) {
      setIsGameEnded(true);
    } else {
      alert('틀렸습니다 ㅜ.ㅜ');
    }
  };

  useEffect(() => {
    if (isGameEnded) {
      alert('게임이 종료되었습니다.');
      onGameEnd();
    }
  }, [isGameEnded]);

  const handleTimeUp = () => {
    setIsGameEnded(true);
  };

  return (
    <>
      <Timer timeLimit={gameData.timeLimit} onTimeUp={handleTimeUp} />
      <h1>
        시장에서 장을 보기 위해, 구매할 품목을 메모지에 적어놓았습니다.
        <br />
        {discountPercent ? `${discountPercent}% 할인 쿠폰을 사용할 때, ` : null}
        총 얼마를 지불해야 할까요?
      </h1>
      <Memo>
        {problemPool.map((v, i) => (
          <span key={i}>
            {v.contents} {v.count}개
          </span>
        ))}
      </Memo>
      <Container>
        {problemPool.map((item, index) => (
          <div key={index}>
            <Img src={item.imgUrl} />
            <div>
              <p>{item.contents}</p>
              <p>{item.price}원</p>
            </div>
          </div>
        ))}
      </Container>
      {candidate.map((price, i) => (
        <Button key={i} onClick={(e) => checkAnswer(e.target as HTMLElement)}>
          {price}
        </Button>
      ))}
    </>
  );
}
