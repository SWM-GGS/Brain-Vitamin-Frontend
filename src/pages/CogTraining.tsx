import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';

function CogTraining() {
  const [gameData, setGameData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getGameData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/patient/vitamins/cog-training`,
        );
        console.log(data);
        setGameData(data.result);
      } catch (error) {
        console.error(error);
      }
    };
    getGameData();
  }, []);

  const startGame = () => {
    // navigate(gameData[0].pathUri, { state: { gameData, gameIndex: 0 } });
    navigate('/cardMatch', { state: { gameData, gameIndex: 0 } });
  };

  return (
    <Container>
      <h1>Ready Page</h1>
      <button onClick={startGame}>Start Game</button>
    </Container>
  );
}

const Container = styled.div`
  padding: 1.6rem;
`;

export default CogTraining;
