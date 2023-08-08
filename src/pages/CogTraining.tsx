import axios from 'axios';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import GameRouter from '../routes/gameRouter';
import LayerPopup from '../components/common/LayerPopup';
import Timer from '../modules/Timer';
import { useNavigate } from 'react-router';

export type CogTrainingProps = {
  cogArea: string;
  difficulty: number;
  explanation: string;
  problemId: number;
  problemPool: any[];
  timeLimit: number;
  trainingName: string;
  discountPercent?: number;
};
function CogTraining() {
  const [gameData, setGameData] = useState<CogTrainingProps[]>([]);
  const [gameIndex, setGameIndex] = useState(0);
  const [showLayerPopup, setShowLayerPopup] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getGameData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/patient/vitamins/cog-training`,
        );
        console.log(data);
        setGameData(data.result);
        setShowLayerPopup(true);
      } catch (error) {
        console.error(error);
      }
    };
    getGameData();
  }, []);

  const goToNextGame = () => {
    if (gameIndex === gameData.length - 1) {
      alert('모든 게임이 종료되었습니다');
      return;
    }
    setGameIndex((prev) => prev + 1);
  };

  const onGameEnd = () => {
    goToNextGame();
    setShowLayerPopup(true);
    setIsTimerRunning(false);
  };

  const startGame = () => {
    setShowLayerPopup(false);
    setIsTimerRunning(true);
    // navigate(`/cogTraining/${gameData[gameIndex].pathUri}`);
    navigate(path[gameIndex]);
  };

  const path = [
    '/cogTraining/cardMatch',
    '/cogTraining/coloring',
    '/cogTraining/overlapping',
    '/cogTraining/wordPuzzle',
    '/cogTraining/market',
    '/cogTraining/maze',
    '/cogTraining/dateQuiz',
  ];

  return (
    <Container>
      {gameData.length ? (
        <>
          {showLayerPopup && (
            <LayerPopup
              label={gameData[gameIndex].trainingName}
              desc={gameData[gameIndex].explanation}
              buttonText="게임 시작"
              onClickButton={startGame}
              cancelButtonText="검사 종료"
              onClickCancelButton={() => navigate('/home')}
            />
          )}
          {isTimerRunning && (
            <Timer
              timeLimit={gameData[gameIndex].timeLimit}
              onTimeUp={onGameEnd}
            />
          )}
          <GameRouter gameData={gameData[gameIndex]} onGameEnd={onGameEnd} />
        </>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  padding: 1.6rem;
`;

export default CogTraining;
