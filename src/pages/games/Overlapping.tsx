import { NumContainer, Num, NumBtn } from '../../components/games/Overlapping';
import { useLocation, useNavigate } from 'react-router';
import Timer from '../../modules/Timer.tsx';
import { useEffect, useState } from 'react';

/**
 * 난도별 겹쳐진 숫자의 개수 상이
 * 하 : 2
 * 중 : 3
 * 상 : 4
 */
export default function Overlapping() {
  const navigate = useNavigate();
  const location = useLocation();
  const gameData = location.state.gameData;
  const gameIndex = location.state.gameIndex;
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);

  let difficulty = gameData[gameIndex].difficulty;
  let answer: number[] = [];
  let cnt = 0;

  while (answer.length < difficulty + 1) {
    answer.push(Math.floor(Math.random() * 10));
    answer = [...new Set(answer)];
  }
  console.log(answer);

  const checkAnswer = (num: number, el: HTMLButtonElement) => {
    if (!answer.includes(num)) {
      console.log('틀렸습니다. 다시 선택해주세요.');
      return;
    }
    console.log('정답입니다!');
    el.style.background = 'gray';
    el.disabled = true;
    cnt++;

    if (cnt === answer.length) {
      setIsGameEnded(true);
    }
  };

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
        navigate('/wordPuzzle', {
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
            겹쳐진 {answer.length}개의 숫자를 보고 있습니다. 어떤 숫자인가요?
          </h1>
          <NumContainer>
            {answer.map((num, index) => (
              <Num
                key={index}
                $top={50 + Math.floor(Math.random() * 8)}
                $left={50 + Math.floor(Math.random() * 8)}>
                {num}
              </Num>
            ))}
          </NumContainer>
          {Array.from({ length: 10 }).map((_, index) => (
            <NumBtn
              key={index}
              onClick={(e) =>
                checkAnswer(index, e.target as HTMLButtonElement)
              }>
              {index}
            </NumBtn>
          ))}
        </>
      ) : (
        <button onClick={() => setIsGameStarted(true)}>Start Game</button>
      )}
    </>
  );
}
