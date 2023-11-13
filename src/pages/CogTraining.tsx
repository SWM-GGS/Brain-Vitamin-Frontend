import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import GameRouter from '../routes/gameRouter';
import LayerPopup from '../components/common/LayerPopup';
import Timer from '../modules/Timer';
import { useNavigate } from 'react-router';
import Button from '../components/common/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import Splash from './Splash';
import {
  AnswerFeedback,
  Correct,
  Incorrect,
} from '../components/common/AnswerFeedback';
import correctSound from '/assets/sounds/correct.mp3';
import incorrectSound from '/assets/sounds/incorrect.mp3';
import startSound from '/assets/sounds/start.mp3';
import cardMatchSound from '/assets/sounds/questions/cardMatch.mp3';
import coloringSound from '/assets/sounds/questions/coloring.mp3';
import dateQuizSound from '/assets/sounds/questions/dateQuiz.mp3';
import marketSound from '/assets/sounds/questions/market.mp3';
import mazeSound from '/assets/sounds/questions/maze.mp3';
import overlappingSound from '/assets/sounds/questions/overlapping.mp3';
import wordPuzzleSound from '/assets/sounds/questions/wordPuzzle.mp3';
import { Container } from '../components/common/Container';
import { useModal } from '../hooks/useModal';
import { getErrorMessage } from '../utils/getErrorMessage';

export type GameResultProps = {
  problemId: number;
  duration: number;
  result: string;
  score: number;
};
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
  showNext?: number;
};
function CogTraining() {
  const [gameData, setGameData] = useState<CogTrainingProps[]>([]);
  const [gameIndex, setGameIndex] = useState(0);
  const [showLayerPopup, setShowLayerPopup] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [exitGame, setExitGame] = useState(false);
  const navigate = useNavigate();
  const [gameResults, setGameResults] = useState<GameResultProps[]>([]);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const [isNextButtonClicked, setIsNextButtonClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [answerState, setAnswerState] = useState('');
  const [showDescription, setShowDescription] = useState(false);
  const { isModalOpen, modalText, openModal, closeModal } = useModal();

  const getNewData = (data: CogTrainingProps[]) => {
    const newData = [...data];

    for (let i = 0; i < newData.length; i++) {
      const currentItem = newData[i];

      if (currentItem.showNext !== undefined) {
        const showNextValue = currentItem.showNext;
        const newObject = { ...currentItem };

        delete newObject.showNext;
        if (i + showNextValue + 1 > newData.length) {
          newData.splice(newData.length, 0, newObject);
        } else {
          newData.splice(i + showNextValue + 1, 0, newObject);
        }
      }
    }
    return newData;
  };

  useEffect(() => {
    const getGameData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/patient/vitamins/cog-training`,
          { headers: { authorization: `Bearer ${accessToken}` } },
        );
        if (!data.isSuccess) {
          openModal(data.message);
          return;
        }
        setGameData(getNewData(data.result));
        setShowLayerPopup(true);
      } catch (error) {
        console.error(error);
        const axiosError = error as AxiosError;
        const errorMessage = getErrorMessage(axiosError);
        openModal(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    getGameData();
    const audio = new Audio(startSound);
    audio.play();
  }, []);

  useEffect(() => {
    if (answerState === 'correct') {
      const audio = new Audio(correctSound);
      audio.play();
    } else if (answerState === 'incorrect') {
      const audio = new Audio(incorrectSound);
      audio.play();
    }
  }, [answerState]);

  const saveGameResult = (
    problemId: number,
    duration: number,
    result: string,
    score: number,
  ) => {
    setGameResults((prev) => [...prev, { problemId, duration, result, score }]);
  };

  const sendGameResults = async (
    finish: boolean,
    totalResults: GameResultProps[],
  ) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/patient/vitamins/cog-training`,
        { finish, cogTrainingDtos: totalResults },
        { headers: { authorization: `Bearer ${accessToken}` } },
      );
      if (!data.isSuccess) {
        openModal(data.message);
        return;
      }
      // score: 맞으면 10점, 틀리면 0점, 안 풀면 -1점
      if (finish) {
        const totalScore = totalResults.reduce((p, c) => p + c.score, 0);
        navigate('/cogTrainingResult', {
          state: { totalScore, result: data.result },
        });
      } else {
        navigate('/home');
      }
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError;
      const errorMessage = getErrorMessage(axiosError);
      openModal(errorMessage);
    }
  };

  const goToNextGame = () => {
    setGameIndex((prev) => prev + 1);
  };

  const onGameEnd = (lastGameResult?: GameResultProps) => {
    setIsTimerRunning(false);
    setIsNextButtonClicked(false);
    if (gameIndex === gameData.length - 1 && lastGameResult) {
      // 마지막 게임인 경우 바로 결과 전송
      sendGameResults(true, [...gameResults, lastGameResult]);
    } else {
      setShowLayerPopup(true);
      goToNextGame();
    }
  };

  const startGame = () => {
    setShowLayerPopup(false);
    setIsTimerRunning(true);
    navigate(`/cogTraining/${gameData[gameIndex].pathUri}`);
  };

  const handleNextButtonClick = () => {
    setIsNextButtonClicked(true);
  };

  const handleExitGame = () => {
    const restResults: GameResultProps[] = [];
    for (let i = gameIndex; i < gameData.length; i++) {
      restResults.push({
        problemId: gameData[i].problemId,
        duration: 0,
        result: 'DONOT',
        score: -1,
      });
    }
    sendGameResults(false, [...gameResults, ...restResults]);
  };

  const getSound = (gameIndex: number) => {
    switch (gameData[gameIndex].pathUri) {
      case 'cardMatch':
        return cardMatchSound;
      case 'coloring':
        return coloringSound;
      case 'wordPuzzle':
        return wordPuzzleSound;
      case 'market':
        return marketSound;
      case 'overlapping':
        return overlappingSound;
      case 'dateQuiz':
        return dateQuizSound;
      case 'maze':
        return mazeSound;
    }
  };

  if (loading) return <Splash />;
  return (
    <Container>
      {gameData.length ? (
        <>
          <Wrapper>
            <StatusWrapper>
              {isTimerRunning && (
                <Timer
                  timeLimit={gameData[gameIndex].timeLimit}
                  setAnswerState={setAnswerState}
                />
              )}
              <Section>
                <Description onClick={() => setShowDescription(true)}>
                  ?
                </Description>
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
                setAnswerState={setAnswerState}
                answerState={answerState}
              />
            </GameWrapper>
            <ButtonWrapper>
              <Button
                disabled={isNextButtonClicked}
                onClick={handleNextButtonClick}>
                다음
              </Button>
            </ButtonWrapper>
          </Wrapper>
          <AnswerFeedback>{renderAnswerState(answerState)}</AnswerFeedback>
          {showLayerPopup && (
            <LayerPopup
              label={gameData[gameIndex].trainingName}
              desc={gameData[gameIndex].explanation}
              leftButtonText="종료"
              onClickLeftButton={handleExitGame}
              rightButtonText="게임 시작"
              onClickRightButton={startGame}
              sound={getSound(gameIndex)}
            />
          )}
          {showDescription && (
            <LayerPopup
              label={gameData[gameIndex].trainingName}
              desc={gameData[gameIndex].explanation}
              centerButtonText="닫기"
              onClickCenterButton={() => setShowDescription(false)}
            />
          )}
          {exitGame && (
            <LayerPopup
              label="게임을 정말 종료하시겠습니까?"
              leftButtonText="취소"
              onClickLeftButton={() => setExitGame(false)}
              rightButtonText="종료"
              onClickRightButton={handleExitGame}
            />
          )}
          {isModalOpen && (
            <LayerPopup
              label={modalText}
              centerButtonText="확인"
              onClickCenterButton={closeModal}
              closeModal={closeModal}
            />
          )}
        </>
      ) : null}
    </Container>
  );
}

export const renderAnswerState = (answerState: string) => {
  if (answerState === 'correct') {
    return <Correct />;
  }
  if (answerState === 'incorrect') {
    return <Incorrect />;
  }
};

const Wrapper = styled.div``;

const GameWrapper = styled.div`
  width: 146.3rem;
  height: 75rem;
  border-radius: 1.6rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  padding: 3rem;
  margin: 2.55rem 0;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 80rem;
    height: 33rem;
    margin: 2rem 0;
  }
  @media screen and (max-width: 767px) {
    width: 30rem;
    height: 50rem;
    padding: 1.6rem;
    margin: 2rem 0;
  }
`;

const StatusWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const Num = styled.div`
  font-size: 3rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 2.4rem;
  }
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
  @media screen and (max-width: 767px) {
    gap: 1rem;
  }
`;
const Description = styled.button`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  border: 0.4rem solid #ccc;
  font-size: 3rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 4.8rem;
    height: 4.8rem;
    font-size: 2rem;
  }
  @media screen and (max-width: 767px) {
    width: 4.5rem;
    height: 2.8rem;
    border: 0.2rem solid #ccc;
    font-size: 1.4rem;
  }
`;

export default CogTraining;
