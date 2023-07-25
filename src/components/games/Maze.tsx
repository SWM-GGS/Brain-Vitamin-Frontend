import { styled } from 'styled-components';

const MazeBox = styled.div<{ $imgUrl: string }>`
  position: relative;
  background: url(${(props) => props.$imgUrl}) no-repeat;
  background-size: cover;
  width: 100rem;
  height: 100rem;
  margin: 0 auto;
`;

const Target = styled.div<{ x: number; y: number; $bgColor: string }>`
  position: absolute;
  top: ${(props) => props.y * 20}rem;
  left: ${(props) => props.x * 20}rem;
  width: 5rem;
  height: 5rem;
  background: ${(props) => props.$bgColor};
  cursor: pointer;
`;

export { MazeBox, Target };
