import { styled } from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const MazeBox = styled.div<{ $imgUrl: string }>`
  position: relative;
  background: url(${(props) => props.$imgUrl}) no-repeat;
  background-size: cover;
  width: 63rem;
  height: 63rem;
  @media screen and (max-width: 768px) {
    width: 26rem;
    height: 26rem;
  }
`;

const Target = styled.div<{ x: number; y: number; $bgColor: string }>`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  width: 5rem;
  height: 5rem;
  background: ${(props) => props.$bgColor};
  cursor: pointer;
  @media screen and (max-width: 768px) {
    width: 2rem;
    height: 2rem;
  }
`;

export { Container, MazeBox, Target };
