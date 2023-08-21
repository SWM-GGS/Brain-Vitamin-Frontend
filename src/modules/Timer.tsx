import { useState, useEffect } from 'react';
import { styled } from 'styled-components';

type Props = {
  timeLimit: number;
  setAnswerState: React.Dispatch<React.SetStateAction<string>>;
};

function Timer({ timeLimit, setAnswerState }: Props) {
  const [remainingTime, setRemainingTime] = useState(timeLimit);
  const progressBarWidth =
    100 - ((timeLimit - remainingTime) / timeLimit) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      setAnswerState('incorrect');
    }
  }, [remainingTime]);

  return (
    <ProgressBarContainer>
      <ProgressBar $progress={progressBarWidth} />
    </ProgressBarContainer>
  );
}

const ProgressBarContainer = styled.div`
  width: 40rem;
  height: 4rem;
  background-color: #ccc;
  border-radius: 2rem;
  overflow: hidden;
  @media screen and (max-width: 767px) {
    width: 12.4rem;
    height: 2rem;
  }
`;
const ProgressBar = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background-color: ${({ $progress }) =>
    $progress < 30 ? '#FF3F3F' : 'var(--main-color)'};
  transition: width 1s linear;
`;

export default Timer;
