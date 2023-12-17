import { useState, useEffect, useRef } from 'react';
import { styled } from 'styled-components';

type Props = {
  timeLimit: number;
  setAnswerState: React.Dispatch<React.SetStateAction<string>>;
};

function Timer({ timeLimit, setAnswerState }: Readonly<Props>) {
  const [remainingTime, setRemainingTime] = useState(timeLimit);
  const progressBarWidth =
    100 - ((timeLimit - remainingTime) / timeLimit) * 100;
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);
    timerRef.current = timer;
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      setAnswerState('incorrect');
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [remainingTime]);

  return (
    <Container>
      <ProgressBarContainer>
        <ProgressBar $progress={progressBarWidth} />
      </ProgressBarContainer>
      <Time $progress={progressBarWidth}>{remainingTime}</Time>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  @media screen and (max-width: 767px) {
    gap: 0.5rem;
  }
`;
const ProgressBarContainer = styled.div`
  width: 40rem;
  height: 4rem;
  background-color: #ccc;
  border-radius: 2rem;
  overflow: hidden;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 330px;
  }
  @media screen and (max-width: 767px) {
    width: 90px;
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
const Time = styled.span<{ $progress: number }>`
  font-size: 1.8rem;
  color: ${({ $progress }) =>
    $progress < 30 ? '#FF3F3F' : 'var(--black-color)'};
  @media screen and (max-width: 767px) {
    font-size: 1.4rem;
  }
`;

export default Timer;
