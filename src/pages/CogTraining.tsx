import axios from 'axios';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import GameRouter from '../routes/gameRouter';
import LayerPopup from '../components/common/LayerPopup';
import Timer from '../modules/Timer';
import { useNavigate } from 'react-router';
import Button from '../components/common/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';

export type CogTrainingProps = {
  cogArea: string;
  difficulty: number;
  explanation: string;
  problemId: number;
  problemPool: any[];
  timeLimit: number;
  trainingName: string;
  pathUri: string;
  discountPercent?: number;
};
function CogTraining() {
  const [gameData, setGameData] = useState<CogTrainingProps[]>([]);
  const [gameIndex, setGameIndex] = useState(0);
  const [showLayerPopup, setShowLayerPopup] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [exitGame, setExitGame] = useState(false);
  const navigate = useNavigate();
  type GameResultProps = {
    problemId: number;
    duration: number;
    result: string;
    score: number;
  };
  const [gameResults, setGameResults] = useState<GameResultProps[]>([]);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const [isNextButtonClicked, setIsNextButtonClicked] = useState(false);

  useEffect(() => {
    const getGameData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/patient/vitamins/cog-training`,
          { headers: { authorization: `Bearer ${accessToken}` } },
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

  const saveGameResult = (
    problemId: number,
    duration: number,
    result: string,
    score: number,
  ) => {
    setGameResults((prev) => [...prev, { problemId, duration, result, score }]);
  };

  const sendGameResults = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/patient/vitamins/cog-training`,
        { finish: true, cogTrainingDtos: gameResults },
        { headers: { authorization: `Bearer ${accessToken}` } },
      );
      // score: 맞으면 10점, 틀리면 0점
      const totalScore = gameResults.reduce((p, c) => p + c.score, 0);
      navigate('/cogTrainingResult', {
        state: { totalScore, result: data.result },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const goToNextGame = () => {
    if (gameIndex === gameData.length - 1) {
      alert('모든 게임이 종료되었습니다');
      sendGameResults();
    } else {
      setGameIndex((prev) => prev + 1);
    }
  };

  const onGameEnd = () => {
    goToNextGame();
    setShowLayerPopup(true);
    setIsTimerRunning(false);
    setIsNextButtonClicked(false);
  };

  const startGame = () => {
    setShowLayerPopup(false);
    setIsTimerRunning(true);
    navigate(`/cogTraining/${gameData[gameIndex].pathUri}`);
  };

  const handleNextButtonClick = () => {
    setIsNextButtonClicked(true);
  };

  return (
    <Container>
      {gameData.length ? (
        <>
          <Wrapper>
            <StatusWrapper>
              {isTimerRunning && (
                <Timer
                  timeLimit={gameData[gameIndex].timeLimit}
                  onTimeUp={onGameEnd}
                  gameData={gameData[gameIndex]}
                  saveGameResult={saveGameResult}
                />
              )}
              <Section>
                <Num>
                  {gameIndex + 1}/{gameData.length}
                </Num>
                <Button onClick={() => setExitGame(true)}>게임 종료</Button>
              </Section>
            </StatusWrapper>
            <GameWrapper>
              <GameRouter
                gameData={gameData[gameIndex]}
                onGameEnd={onGameEnd}
                saveGameResult={saveGameResult}
                isNextButtonClicked={isNextButtonClicked}
              />
            </GameWrapper>
            <ButtonWrapper>
              <Button onClick={handleNextButtonClick}>다음</Button>
            </ButtonWrapper>
          </Wrapper>
          {showLayerPopup && (
            <LayerPopup
              label={gameData[gameIndex].trainingName}
              desc={gameData[gameIndex].explanation}
              leftButtonText="종료"
              onClickLeftButton={() => navigate('/home')}
              rightButtonText="게임 시작"
              onClickRightButton={startGame}
            />
          )}
          {exitGame && (
            <LayerPopup
              label="게임을 정말 종료하시겠습니까?"
              leftButtonText="취소"
              onClickLeftButton={() => setExitGame(false)}
              rightButtonText="종료"
              onClickRightButton={() => navigate('/home')}
            />
          )}
        </>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  padding: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Wrapper = styled.div``;

const GameWrapper = styled.div`
  width: 146.3rem;
  height: 75rem;
  border-radius: 1.6rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  padding: 3rem;
  margin: 2.55rem 0;
  @media screen and (max-width: 767px) {
    width: 30rem;
    height: 40rem;
    padding: 1.6rem;
    margin: 0.5rem 0;
  }
`;

const StatusWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Num = styled.div`
  font-size: 3rem;
  @media screen and (max-width: 767px) {
    font-size: 1.8rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

export default CogTraining;
