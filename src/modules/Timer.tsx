import { useState, useEffect } from 'react';
import { styled } from 'styled-components';

type Props = {
  timeLimit: number;
  onTimeUp: () => void;
};

function Timer({ timeLimit, onTimeUp }: Props) {
  const [remainingTime, setRemainingTime] = useState(timeLimit);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      onTimeUp();
    }
  }, [remainingTime, onTimeUp]);

  return <Text>남은 시간: {remainingTime}초</Text>;
}

const Text = styled.p`
  font-size: 3rem;
  @media screen and (max-width: 767px) {
    font-size: 2rem;
  }
`;

export default Timer;
