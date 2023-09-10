import { keyframes, styled } from 'styled-components';
let degree = 45;

function CompassDirection() {
  return (
    <Compass>
      <Needle $degree={degree}>
        <North />
        <South />
      </Needle>
    </Compass>
  );
}

const moveNeedle = keyframes`
  0%, 100% {
    transform: rotate(${degree}deg) translateX(-50%) translateY(-100%);
  }
  25% {
    transform: rotate(${degree - 5}deg) translateX(-50%) translateY(-100%);
  }
  50% {
    transform: rotate(${degree + 5}deg) translateX(-50%) translateY(-100%);
  }
  75% {
    transform: rotate(${degree - 5}deg) translateX(-50%) translateY(-100%);
  }
`;

const Compass = styled.div`
  width: 350px;
  height: 350px;
  background: url('/assets/images/clock.png');
  background-size: cover;
  border-radius: 50%;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    background: silver;
    border: 2px solid cornsilk;
    border-radius: 50%;
    z-index: 10;
  }
`;
const Needle = styled.div<{ $degree: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 50% 100%;
  transform: translate(-50%, -100%) rotate(${(props) => props.$degree}deg);
  animation: ${moveNeedle} 2s ease-in-out;
`;
const Base = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const North = styled(Base)`
  border-width: 0 25px 100px 25px;
  border-color: transparent transparent red transparent;
  bottom: 0;
`;

const South = styled(Base)`
  border-width: 100px 25px 0 25px;
  border-color: blue transparent transparent transparent;
  top: 0;
`;

export default CompassDirection;
