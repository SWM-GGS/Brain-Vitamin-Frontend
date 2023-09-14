import { forwardRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1.6rem;
  margin: 0 auto;
  height: 100%;
  font-size: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 5rem;
    gap: 2rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 3rem;
  }
`;
const Board = styled.div<{ $difficulty: number }>`
  display: grid;
  grid-gap: 2rem;
  place-items: center;
  ${(props) => {
    if (props.$difficulty === 1) {
      return `
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  max-width: 100rem;
  margin: 0 auto;
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }`;
    }
    if (props.$difficulty === 2) {
      return `
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  max-width: 140rem;
  margin: 0 auto;
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }`;
    }
    if (props.$difficulty === 3) {
      return `
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 800px;
  margin: 0 auto;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 410px;
  }
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    width: 270px;
  }`;
    }
  }}
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    grid-gap: 1.5rem;
  }
  @media screen and (max-width: 767px) {
    grid-gap: 1rem;
  }
`;
const StyledButton = styled.button<{ $color: string }>`
  width: 170px;
  height: 170px;
  border-radius: 1rem;
  background: #e7e8ea;
  font-size: 6rem;
  font-family: Pretendard-Bold;
  color: ${(props) => props.$color};
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 85px;
    height: 85px;
    font-size: 3rem;
  }
  @media screen and (max-width: 767px) {
    width: 80px;
    height: 80px;
    font-size: 2.6rem;
  }
`;
const Button = forwardRef<
  HTMLButtonElement,
  {
    $letter: string;
    $color: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  }
>(({ $letter, $color, onClick }, ref) => (
  <StyledButton ref={ref} $color={$color} onClick={onClick}>
    {$letter}
  </StyledButton>
));

export { Container, Board, Button };
