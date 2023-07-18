import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  font-size: 5rem;
  margin: 2rem 0 0 0;
`;

function Timer() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const record = useRef<number>(0);
  record.current = timeElapsed;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((timeElapsed) => timeElapsed + 30);
    }, 30);

    return () => {
      alert('총 걸린 시간 : ' + record.current / 1000 + '초');
      clearInterval(timer);
    };
  }, []);

  return (
    <Container>
      <div>{Math.floor(timeElapsed / 1000)}:</div>
      <div>{(timeElapsed % 1000) / 10}</div>
    </Container>
  );
}

export default Timer;
