import { keyframes, styled } from 'styled-components';

const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  place-items: center;
  max-width: 100rem;
  height: 60rem;
  margin: 0 auto;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    height: 25rem;
  }
  @media screen and (max-width: 768px) {
    height: 25rem;
  }
`;
const Compass = ({ $degree }: { $degree: number }) => {
  return (
    <StyledCompass>
      <Needle $degree={$degree}>
        <North />
        <South />
      </Needle>
    </StyledCompass>
  );
};
const StyledCompass = styled.div`
  width: 350px;
  height: 350px;
  background: url('/assets/images/compass.svg');
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
    @media screen and (min-width: 768px) and (max-height: 1079px) {
      width: 20px;
      height: 20px;
    }
    @media screen and (max-width: 768px) {
      width: 20px;
      height: 20px;
    }
  }
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 160px;
    height: 160px;
  }
  @media screen and (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;
const moveNeedle = (degree: number) => keyframes`
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
const Needle = styled.div<{ $degree: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 50% 100%;
  transform: translate(-50%, -100%) rotate(${(props) => props.$degree}deg);
  animation: ${(props) => moveNeedle(props.$degree)} 2s ease-in-out;
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
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    border-width: 0 10px 50px 10px;
  }
  @media screen and (max-width: 768px) {
    border-width: 0 8px 40px 8px;
  }
`;
const South = styled(Base)`
  border-width: 100px 25px 0 25px;
  border-color: blue transparent transparent transparent;
  top: 0;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    border-width: 50px 10px 0 10px;
  }
  @media screen and (max-width: 768px) {
    border-width: 40px 8px 0 8px;
  }
`;

export { Body, Compass };
