import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { CogTrainingProps } from '../pages/CogTraining';

type Props = {
  timeLimit: number;
  onTimeUp: () => void;
  gameData: CogTrainingProps;
  saveGameResult: (
    problemId: number,
    duration: number,
    result: string,
    score: number,
  ) => void;
};

function Timer({ timeLimit, onTimeUp, gameData, saveGameResult }: Props) {
  const [remainingTime, setRemainingTime] = useState(timeLimit);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      saveGameResult(gameData.problemId, gameData.timeLimit, 'FAIL', 0);
      alert('제한 시간을 초과하여 게임이 종료됩니다.');
      onTimeUp();
    }
  }, [remainingTime, onTimeUp]);

  return <Text>남은 시간: {remainingTime}초</Text>;
}

const Text = styled.p`
  font-size: 3rem;
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
  }
`;

export default Timer;
