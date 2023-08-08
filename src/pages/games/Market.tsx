import { useEffect, useState } from 'react';
import {
  Wrapper,
  Cupon,
  Item,
  Name,
  Price,
  Memo,
  Container,
  Img,
  Button,
} from '../../components/games/Market';
import { ButtonWrapper } from '../../components/games/Overlapping.tsx';
import { GameProps } from '../../routes/gameRouter.tsx';

export default function Market({ gameData, onGameEnd }: GameProps) {
  type Props = {
    contents: string;
    count: number;
    imgUrl: string;
    price: number;
  };
  const problemPool: Props[] = gameData.problemPool;
  const discountPercent = gameData.discountPercent;
  const [answer, setAnswer] = useState(0);
  const [candidate, setCandidate] = useState<number[]>([]);
  const candidateCnt = 5;
  const difference = 500;

  useEffect(() => {
    let calculatedAnswer = problemPool.reduce(
      (p, c) => p + c.price * c.count,
      0,
    );
    if (discountPercent) {
      calculatedAnswer = calculatedAnswer * (1 - discountPercent / 100);
    }
    setAnswer(calculatedAnswer);

    let calculatedCandidate: number[] = [calculatedAnswer];
    while (calculatedCandidate.length < candidateCnt) {
      const price =
        calculatedAnswer +
        (Math.random() > 0.5 ? 1 : -1) *
          Math.floor(Math.random() * 5) *
          difference;
      if (price > 0 && !calculatedCandidate.includes(price))
        calculatedCandidate.push(price);
    }
    calculatedCandidate.sort(() => Math.random() - 0.5);
    setCandidate(calculatedCandidate);
    // FIX: deps에 gameData 넣으면 다음 게임으로 넘어갔을 때에도 계속 렌더링되는 문제
  }, []);

  const checkAnswer = (el: HTMLElement) => {
    if (el.innerText === '' + answer + '원') {
      onGameEnd();
    } else {
      alert('틀렸습니다 ㅜ.ㅜ');
    }
  };

  return (
    <>
      <Wrapper>
        {discountPercent ? <Cupon>{discountPercent}% 할인 쿠폰</Cupon> : null}
        <Memo>
          {problemPool.map((v, i) => (
            <span key={i}>
              {v.contents} {v.count}개
            </span>
          ))}
        </Memo>
      </Wrapper>
      <Container>
        {problemPool.map((item, index) => (
          <Item key={index}>
            <Img src={item.imgUrl} />
            <Name>{item.contents}</Name>
            <Price>{item.price}원</Price>
          </Item>
        ))}
      </Container>
      <ButtonWrapper>
        {candidate.map((price, i) => (
          <Button key={i} onClick={(e) => checkAnswer(e.target as HTMLElement)}>
            {price}원
          </Button>
        ))}
      </ButtonWrapper>
    </>
  );
}
