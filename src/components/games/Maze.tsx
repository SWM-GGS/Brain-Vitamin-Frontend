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
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 30rem;
    height: 30rem;
  }
  @media screen and (max-width: 768px) {
    width: 26rem;
    height: 26rem;
  }
`;

const Target = styled.div<{
  x: number;
  y: number;
  $bgColor: string;
  $difficulty: number;
}>`
  position: absolute;
  top: ${(props) => props.y * 63}rem;
  left: ${(props) => props.x * 63}rem;
  transform: translate(-50%, -50%);
  width: ${(props) => (props.$difficulty === 3 ? '3.5rem' : '5rem')};
  height: ${(props) => (props.$difficulty === 3 ? '3.5rem' : '5rem')};
  background: ${(props) => props.$bgColor};
  cursor: pointer;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    top: ${(props) => props.y * 30}rem;
    left: ${(props) => props.x * 30}rem;
    width: ${(props) => (props.$difficulty === 3 ? '1.6rem' : '2.1rem')};
    height: ${(props) => (props.$difficulty === 3 ? '1.6rem' : '2.1rem')};
  }
  @media screen and (max-width: 768px) {
    top: ${(props) => props.y * 26}rem;
    left: ${(props) => props.x * 26}rem;
    width: ${(props) => (props.$difficulty === 3 ? '1.5rem' : '2rem')};
    height: ${(props) => (props.$difficulty === 3 ? '1.5rem' : '2rem')};
  }
`;

export { Container, MazeBox, Target };
