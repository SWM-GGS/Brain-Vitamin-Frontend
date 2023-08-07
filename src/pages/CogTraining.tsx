import axios from 'axios';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import GameRouter from '../routes/gameRouter';
import LayerPopup from '../components/common/LayerPopup';

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

  const goNextGame = () => {
    setGameIndex((prev) => prev + 1);
    setShowLayerPopup(true);
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
      <p>dsfsdfsdfsd</p>
      <GameRouter
        gameData={gameData}
        gameIndex={gameIndex}
        goNextGame={goNextGame}
      />
      {gameData.length && showLayerPopup ? (
        <LayerPopup
          label={gameData[gameIndex].trainingName}
          desc={gameData[gameIndex].explanation}
          buttonText="게임 시작"
          // path={`/cogTraining/${gameData[gameIndex].pathUri}`}
          path={path[gameIndex]}
          setShowLayerPopup={setShowLayerPopup}
        />
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  padding: 1.6rem;
`;

export default CogTraining;
