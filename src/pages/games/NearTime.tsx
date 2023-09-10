import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

function NearTime() {
  const deg = 6;
  const [hh, setHh] = useState(0);
  const [mm, setMm] = useState(0);
  const [ss, setSs] = useState(0);

  useEffect(() => {
    const day = new Date();
    setHh(day.getHours() * 30);
    setMm(day.getMinutes() * deg);
    setSs(day.getSeconds() * deg);
  }, []);

  return (
    <Clock>
      <Hour>
        <Hr style={{ transform: `rotateZ(${hh + mm / 12}deg)` }} />
      </Hour>
      <Min>
        <Mm style={{ transform: `rotateZ(${mm}deg)` }} />
      </Min>
      <Sec>
        <Sc style={{ transform: `rotateZ(${ss}deg)` }} />
      </Sec>
    </Clock>
  );
}

const Clock = styled.div`
  width: 350px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('/assets/images/clock.png');
  background-size: cover;
  border: 4px solid #091921;
  box-shadow:
    0 -15px 15px rgba(255, 255, 255, 0.05),
    inset 0 -15px 15px rgba(255, 255, 255, 0.05),
    0 -5px 15px rgba(0, 0, 0, 0.3),
    inset 0 15px 15px rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  &:before {
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    background: var(--black-color);
    border-radius: 50%;
    z-index: 10;
  }
`;
const Hour = styled.div`
  position: absolute;
`;
const Min = styled.div`
  position: absolute;
  width: 190px;
  height: 190px;
`;
const Sec = styled.div`
  position: absolute;
  width: 230px;
  height: 230px;
`;
const Hr = styled.div`
  width: 160px;
  height: 160px;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  &:before {
    content: '';
    position: absolute;
    width: 8px;
    height: 80px;
    background: var(--black-color);
    z-index: 10;
    border-radius: 6px 6px 0 0;
  }
`;
const Mm = styled.div`
  width: 190px;
  height: 190px;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  &:before {
    content: '';
    position: absolute;
    width: 4px;
    height: 90px;
    background: var(--black-color);
    z-index: 10;
    border-radius: 6px 6px 0 0;
  }
`;
const Sc = styled.div`
  width: 230px;
  height: 230px;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  &:before {
    content: '';
    position: absolute;
    width: 2px;
    height: 150px;
    background: #ff105e;
    z-index: 10;
    border-radius: 6px 6px 0 0;
  }
`;

export default NearTime;
