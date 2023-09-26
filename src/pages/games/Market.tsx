import { useEffect, useState } from 'react';
import {
  Wrapper,
  Coupon,
  Percent,
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
import { AnswerFeedback } from '../../components/common/AnswerFeedback.tsx';
import { styled } from 'styled-components';
import { getRandomFloat } from '../../utils/random.ts';
import { useGameLogic } from '../../hooks/useGameLogic.ts';

export default function Market({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: GameProps) {
  type Props = {
    contents: string;
    count: number;
    imgUrl: string;
    price: number;
  };
  const problemPool: Props[] = gameData.problemPool;
  const discountPercent = gameData.discountPercent;
  const [candidate, setCandidate] = useState<number[]>([]);
  const candidateCnt = 5;
  const difference = 500;
  const { onClickButton, setAnswer, buttonRefs, showAnswer, answer } =
    useGameLogic<number>(
      {
        gameData,
        onGameEnd,
        saveGameResult,
        isNextButtonClicked,
        setAnswerState,
        answerState,
      },
      undefined,
      true,
    );

  useEffect(() => {
    let calculatedAnswer = problemPool.reduce(
      (p, c) => p + c.price * c.count,
      0,
    );
    if (discountPercent) {
      calculatedAnswer = calculatedAnswer * (1 - discountPercent / 100);
      calculatedAnswer = Math.round(calculatedAnswer);
    }
    setAnswer(calculatedAnswer);

    let calculatedCandidate: number[] = [calculatedAnswer];
    while (calculatedCandidate.length < candidateCnt) {
      const price =
        calculatedAnswer +
        (getRandomFloat() > 0.5 ? 1 : -1) *
          Math.floor(getRandomFloat() * 5) *
          difference;
      if (price > 0 && !calculatedCandidate.includes(price))
        calculatedCandidate.push(price);
    }
    calculatedCandidate.sort(() => getRandomFloat() - 0.5);
    setCandidate(calculatedCandidate);
    // FIX: deps에 gameData 넣으면 다음 게임으로 넘어갔을 때에도 계속 렌더링되는 문제
  }, []);

  return (
    <>
      <Wrapper>
        {discountPercent ? (
          <Coupon>
            <Percent>{discountPercent}%</Percent>할인 쿠폰
          </Coupon>
        ) : null}
        <Memo>
          {problemPool.map((v) => (
            <span key={v.imgUrl}>
              {v.contents} {v.count}개
            </span>
          ))}
        </Memo>
      </Wrapper>
      <Container>
        {problemPool.map((item) => (
          <Item key={item.contents}>
            <Img src={item.imgUrl} />
            <Name>{item.contents}</Name>
            <Price>
              {item.price
                ? item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : null}
              원
            </Price>
          </Item>
        ))}
      </Container>
      <ButtonWrapper>
        {candidate.map((price) => (
          <Button
            ref={(el) => (buttonRefs.current[buttonRefs.current.length] = el)}
            key={price}
            onClick={(e) => onClickButton(price, e.target as HTMLElement)}>
            {price
              ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : null}
            원
          </Button>
        ))}
      </ButtonWrapper>
      {showAnswer && (
        <AnswerFeedback>
          <ShowAnswer>
            <p>정답은 [{answer}원]입니다.</p>
          </ShowAnswer>
        </AnswerFeedback>
      )}
    </>
  );
}

const ShowAnswer = styled.div`
  font-size: 5rem;
  width: 50rem;
  height: 50rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--main-bg-color);
  border-radius: 1.3rem;
  box-shadow: 15px 13px 28px 0px rgba(0, 0, 0, 0.06);
  padding: 4rem;
  word-break: keep-all;
  text-align: center;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 2.4rem;
    width: 25rem;
    height: 25rem;
    padding: 2rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 2rem;
    width: 20rem;
    height: 20rem;
    padding: 2rem;
  }
`;
