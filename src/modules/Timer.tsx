import { useState, useEffect } from 'react';

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

  return <div>남은 시간: {remainingTime}초</div>;
}

export default Timer;
