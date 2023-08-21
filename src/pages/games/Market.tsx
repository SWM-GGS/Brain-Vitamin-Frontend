import { useEffect, useRef, useState } from 'react';
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
  const [answer, setAnswer] = useState(0);
  const [candidate, setCandidate] = useState<number[]>([]);
  const candidateCnt = 5;
  const difference = 500;
  const buttonRefs = useRef<HTMLButtonElement[] | null[]>([]);
  const startTimeRef = useRef<Date | null>(new Date());
  const endTimeRef = useRef<Date | null>(null);
  let duration = useRef(0);
  let clickedPrice = useRef(0);
  const [showAnswer, setShowAnswer] = useState(false);

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

  const checkAnswer = async () => {
    if (clickedPrice.current === answer) {
      // 정답
      saveGameResult(gameData.problemId, duration.current, 'SUCCESS', 10);
      setAnswerState('correct');
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          setAnswerState('');
          resolve();
        }, 2000);
      });
      onGameEnd();
    } else {
      // 오답
      setAnswerState('incorrect');
    }
  };

  useEffect(() => {
    if (answerState === 'incorrect') {
      const handleIncorrect = async () => {
        saveGameResult(gameData.problemId, duration.current, 'FAIL', 0);
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            setAnswerState('');
            resolve();
          }, 2000);
        });
        setShowAnswer(true);
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            setShowAnswer(false);
            resolve();
          }, 2000);
        });
        onGameEnd();
      };
      handleIncorrect();
    }
  }, [answerState]);

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

  const onClickPrice = (price: number, el: HTMLElement) => {
    if (clickedPrice.current === price) {
      el.style.background = '#c6c6c6';
      el.style.border = '0.2rem solid var(--gray-bg-color)';
      el.style.color = 'var(--black-color)';
      clickedPrice.current = 0;
    } else {
      for (let i = 0; i < buttonRefs.current.length; i++) {
        const buttonRef = buttonRefs.current[i];
        if (buttonRef?.style.background === 'var(--main-bg-color)') {
          buttonRef.style.background = '#c6c6c6';
          buttonRef.style.border = '0.2rem solid var(--gray-bg-color)';
          buttonRef.style.color = 'var(--black-color)';
          break;
        }
      }
      el.style.background = 'var(--main-bg-color)';
      el.style.border = '0.2rem solid var(--main-color)';
      el.style.color = 'var(--main-color)';
      clickedPrice.current = price;
    }
  };

  return (
    <>
      <Wrapper>
        {discountPercent ? (
          <Coupon>
            <Percent>{discountPercent}%</Percent>할인 쿠폰
          </Coupon>
        ) : null}
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
        {candidate.map((price, i) => (
          <Button
            ref={(el) => (buttonRefs.current[buttonRefs.current.length] = el)}
            key={i}
            onClick={(e) => onClickPrice(price, e.target as HTMLElement)}>
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
  @media screen and (max-width: 767px) {
    font-size: 2rem;
    width: 20rem;
    height: 20rem;
    padding: 2rem;
  }
`;
