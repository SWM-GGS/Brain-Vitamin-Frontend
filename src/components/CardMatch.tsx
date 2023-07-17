import styled from 'styled-components';

const Card = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: all 0.2s ease-in;
  transform-style: preserve-3d;
`;

const Flip = styled.div<{ $status: boolean; $clickable: boolean }>`
  width: 30rem;
  height: 35rem;
  perspective: 110rem;
  margin: 1rem;
  &:active ${Card} {
    transform: rotateY(180deg);
  }
  pointer-events: ${(props) =>
    props.$status || !props.$clickable ? 'none' : 'auto'};
`;

const Front = styled.div<{ $status: boolean; $background: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: ${(props) => props.$background};
  transform: ${(props) =>
    props.$status ? 'rotateY(0deg)' : 'rotateY(180deg)'};
`;

const Back = styled.div<{ $status: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: royalblue;
  transform: ${(props) =>
    props.$status ? 'rotateY(180deg)' : 'rotateY(0deg)'};
`;

const RestartBtn = styled.button`
  width: 80rem;
  height: 30rem;
  font-size: 10rem;
`;

export { Card, Flip, Front, Back, RestartBtn };
