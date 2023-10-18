import { useEffect, useState } from 'react';
import { Button, ButtonContainer } from '../../components/common/GameButton';
import { getRandomFloat } from '../../utils/random';
import { GameProps } from '../../routes/gameRouter';
import { useGameLogic } from '../../hooks/useGameLogic';
import { Container } from '../../components/games/SameColor';
import { NumberContainer } from '../../components/games/PatternNumber';
import { Img, Item, Name, Price } from '../../components/games/Market';
import Presented from '../../components/games/ChangeCalculate';

function ChangeCalculate({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: Readonly<GameProps>) {
  type Props = {
    contents: string;
    imgUrl: string;
  };
  const problemPool: Props[] = gameData.problemPool;
  const difficulty = gameData.difficulty;
  type ItemProps = {
    contents: string;
    imgUrl: string;
    price: number;
  };
  const [items, setItems] = useState<ItemProps[]>([]);
  const [candidates, setCandidates] = useState<number[]>([]);
  const [money, setMoney] = useState('');
  const { onClickButton, setAnswer, buttonRefs } = useGameLogic<number>({
    gameData,
    onGameEnd,
    saveGameResult,
    isNextButtonClicked,
    setAnswerState,
    answerState,
  });

  const isExceedLimit = (num: number, limit: number, arr: number[]) => {
    return (
      num > Math.floor(limit / 2) ||
      (arr.length && arr.reduce((p, c) => p + c) + num >= limit)
    );
  };

  const getRandomArr = (
    cnt: number,
    difference: number,
    limit?: number,
    answer?: number,
  ) => {
    const result = answer ? [answer] : [];

    while (result.length < cnt) {
      const randomDifference =
        (getRandomFloat() > 0.5 ? 1 : -1) *
        Math.floor(getRandomFloat() * (limit ? 11 : 5)) *
        difference;
      const randomNum = answer ? answer + randomDifference : randomDifference;

      if (limit && isExceedLimit(randomNum, limit, result)) {
        continue;
      }
      if (randomNum > 0 && !result.includes(randomNum)) {
        result.push(randomNum);
      }
    }
    result.sort(() => getRandomFloat() - 0.5);
    return result;
  };

  useEffect(() => {
    const candidateMoney =
      difficulty === 3 ? [5000, 10000, 50000, 10000] : [5000, 10000, 10000];
    const randomIndex = Math.floor(getRandomFloat() * candidateMoney.length);
    const money = candidateMoney[randomIndex];
    const prices = getRandomArr(difficulty, 500, money);
    const items = problemPool.map((v, i) => {
      return { ...v, price: prices[i] };
    });
    const answer = money - items.reduce((p, c) => p + c.price, 0);
    const candidates = getRandomArr(3, 500, undefined, answer);

    if (money === 5000) {
      setMoney('/assets/images/5000.svg');
    } else if (money === 10000) {
      setMoney('/assets/images/10000.svg');
    } else {
      setMoney('/assets/images/50000.svg');
    }
    setItems(items);
    setAnswer(answer);
    setCandidates(candidates);
  }, []);

  return (
    <Container>
      <Presented $imgUrl={money} />
      <NumberContainer>
        {items.map((item) => (
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
      </NumberContainer>
      <ButtonContainer>
        {candidates.map((v) => (
          <Button
            key={v}
            ref={(el) => (buttonRefs.current[buttonRefs.current.length] = el)}
            $isLong={true}
            onClick={(e) => onClickButton(v, e.target as HTMLButtonElement)}>
            {v ? v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null}원
          </Button>
        ))}
      </ButtonContainer>
    </Container>
  );
}

export default ChangeCalculate;
