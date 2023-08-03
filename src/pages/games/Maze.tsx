import { useEffect, useState } from 'react';
import { MazeBox, Target } from '../../components/games/Maze';
import { useLocation, useNavigate } from 'react-router';
import Timer from '../../modules/Timer';

export default function Maze() {
  const navigate = useNavigate();
  const location = useLocation();
  const gameData = location.state.gameData;
  const gameIndex = location.state.gameIndex;
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);

  type Props = {
    x: number;
    y: number;
    answer: boolean;
    imgUrl: string;
  };
  const [problemPool, setProblemPool] = useState<Props[]>(
    gameData[gameIndex].problemPool,
  );
  const answerCnt = problemPool.filter((item) => item.answer).length;
  let cnt = 0;

  const checkAnswer = (el: HTMLElement, index: number) => {
    if (!problemPool[index].answer) {
      console.log('틀렸습니다. 다시 선택해주세요.');
      return;
    }
    console.log('정답입니다!');
    el.style.display = 'none';
    cnt++;

    if (cnt === answerCnt) {
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
        navigate('/dateQuiz', {
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
          <MazeBox $imgUrl={problemPool[0].imgUrl}>
            {problemPool.map((item, index) => (
              <Target
                key={index}
                x={item.x}
                y={item.y}
                $bgColor={
                  '#' + Math.floor(Math.random() * 0xffffff).toString(16)
                }
                onClick={(e) => checkAnswer(e.target as HTMLElement, index)}
              />
            ))}
          </MazeBox>
        </>
      ) : (
        <button onClick={() => setIsGameStarted(true)}>Start Game</button>
      )}
    </>
  );
}
