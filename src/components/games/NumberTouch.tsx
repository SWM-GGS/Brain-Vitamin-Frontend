import { styled } from 'styled-components';

const Box = styled.div<{ $width: number; $height: number }>`
  position: relative;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  margin: 0 auto;
  padding: 1rem;
`;

const Num = styled.span<{ $zIndex: number }>`
  font-size: 3rem;
  padding: 1rem;
  z-index: ${(props) => props.$zIndex};
`;

export { Box, Num };
