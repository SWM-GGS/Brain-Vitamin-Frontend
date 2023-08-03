import axios from 'axios';
import { useEffect, useState } from 'react';
import { Memo, Container, Img, Button } from '../../components/games/Market';
import { useLocation, useNavigate } from 'react-router';
import Timer from '../../modules/Timer.tsx';

export default function Market() {
  const navigate = useNavigate();
  const location = useLocation();
  const gameData = location.state.gameData;
  const gameIndex = location.state.gameIndex;
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);

  type Props = {
    contents: string;
    count: number;
    imgUrl: string;
    price: number;
  };
  const [problemPool, setProblemPool] = useState<Props[]>(
    gameData[gameIndex].problemPool,
  );
  const discountPercent = gameData[gameIndex].discountPercent;

  const checkAnswer = (el: HTMLElement) => {
    if (+el.innerText === answer) {
      setIsGameEnded(true);
    } else {
      alert('틀렸습니다 ㅜ.ㅜ');
    }
  };

  let answer = problemPool.reduce((p, c) => p + c.price * c.count, 0);
  if (discountPercent) {
    answer = answer * (1 - discountPercent / 100);
  }

  useEffect(() => {
    if (isGameEnded) {
      alert('게임이 종료되었습니다.');
      const nextGamePath = gameData[gameIndex + 1].pathUri;
      if (nextGamePath) {
        navigate(nextGamePath, {
          state: { gameData, gameIndex: gameIndex + 1 },
        });
      } else {
        // navigate('/cogTraining');
        navigate('/maze', {
          state: { gameData, gameIndex: gameIndex + 1 },
        });
      }
    }
  }, [isGameEnded, gameData, navigate]);

  const handleTimeUp = () => {
    setIsGameEnded(true);
  };

  return (
    <>
      {isGameStarted ? (
        <>
          <Timer
            timeLimit={gameData[gameIndex].timeLimit}
            onTimeUp={handleTimeUp}
          />
          <h1>
            시장에서 장을 보기 위해, 구매할 품목을 메모지에 적어놓았습니다.
            <br />총 얼마를 지불해야 할까요?
          </h1>
          <Memo>
            {problemPool.map((v, i) => (
              <span key={i}>
                {v.contents} {v.count}개
              </span>
            ))}
          </Memo>
          {problemPool.map((item, index) => (
            <Container key={index}>
              <Img src={item.imgUrl} />
              <div>
                <p>{item.contents}</p>
                <p>{item.price}원</p>
              </div>
            </Container>
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <Button
              key={i}
              onClick={(e) => checkAnswer(e.target as HTMLElement)}>
              {answer + i * 1000}
            </Button>
          ))}
        </>
      ) : (
        <button onClick={() => setIsGameStarted(true)}>Start Game</button>
      )}
    </>
  );
}
